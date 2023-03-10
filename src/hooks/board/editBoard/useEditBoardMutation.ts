import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNativeFile } from "apollo-upload-client";
import { Alert } from "react-native";
import { MAX_FILE_NUMBER } from "../../../components/upload/PlusPhotoBtn";
import getUnknownErrorThenAlert from "../../../logic/getUnknownErrorThenAlert";
import compressImageVideoFile from "../../../logic/upload/compressImageVideoFile";
import getOrResizeThumbNail from "../../../logic/upload/getOrResizeThumbNail";
import resizeImageNeedUriWidthHeight from "../../../logic/upload/resizeImageNeedUriWidthHeight";
import { TEMPORARY_EDIT_BOARD } from "../../../temporaryBoard/constant";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../../types/upload/fileType";
import { editBoard, editBoardVariables } from "../../../__generated__/editBoard";

const EDIT_BOARD = gql`
  mutation editBoard(
    $id:Int!
    $title: String,
    $body: [String!],
    $changeThumbNail: Boolean,
    $addFileArr: [Upload!],
    $addFileIndexArr: [Int!],
    $deleteFileArr: [String!],
    $wholeFileArr: [String!],
    $addThumbNailArr: [Upload!],
  ) {
    editBoard(
      id: $id,
      title: $title, 
      body: $body,
      changeThumbNail: $changeThumbNail
      addFileArr: $addFileArr
      addFileIndexArr: $addFileIndexArr
      deleteFileArr: $deleteFileArr
      wholeFileArr: $wholeFileArr
      addThumbNailArr: $addThumbNailArr
    ) {
      ok
      error
    }
  }
`;

// type EditBoardProps = NativeStackScreenProps<MyBoardListTabStackParamsList|NotificationTabStackParamsList,"EditBoard">;
type EditBoardProps = NativeStackScreenProps<BoardTabStackParamsList,"EditBoard">;

type useEditBoardMutationProps = {
  boardId: number | undefined,
  files: FileInfo[],
  title: string,
  body: string[],
  prevFiles: FileInfo[],
  // prevYoutubeId: string,
  // youtubeId: string | null,
  // ?????? ??? ???????????????? ????????? onPressEdit ??? ????????? ????????????
  // ??? ??????? ????????? ?????? ???????????? ????????? ??????
  getChangeStatus: () => {
    isFileChanged: boolean;
    isTitleChanged: boolean;
    isBodyChanged: boolean;
    // isYoutubeChanged: boolean;
    isNothingChanged: boolean;
  },
}

const useEditBoardMutation = ({
  files,
  title,
  body,
  boardId,
  prevFiles,
  // prevYoutubeId,
  // youtubeId,
  getChangeStatus,
}: useEditBoardMutationProps) => {

  const navigation = useNavigation<EditBoardProps["navigation"]>();

  // mutation, ?????? update ?????? ??????
  let changedThumbNail:string|null|undefined = undefined;
  // let deletePrevThumbNail = false;
  let summaryBody: string = "";

  const updateEditBoard:MutationUpdaterFunction<editBoard, editBoardVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {

    const { data } = result;
    if(!data) return;

    const { editBoard: { ok, error }} = data;
    
    // ?????? ????????? ????????? ??????????????? ?????????
    if(error) {
      return Alert.alert(error,"?????? ????????? ??????????????? ??????????????? ?????? ????????? ????????????????????????.")
    };

    // ?????? ?????? ?????? ??????
    AsyncStorage.removeItem(TEMPORARY_EDIT_BOARD);

    const getOnlyUriFromArr = files.map(file=>file.uri);

    const isBodyChanged = getChangeStatus().isBodyChanged;

    // ?????? ??????
    cache.modify({
      id:`Board:${boardId}`,
      fields:{
        title(){
          return title;
        },
        file(){
          return getOnlyUriFromArr;
        },
        body(){
          return body;
        },
        // youtubeId(){
        //   return youtubeId;
        // },
        thumbNail(prev){
          return changedThumbNail === undefined ? prev : changedThumbNail;
        },
        summaryBody(prev){
          return isBodyChanged ? summaryBody : prev;
        },
      }
    });

    // // ?????? ??????
    // cache.modify({
    //   id:`Calendar:${boardId}`,
    //   fields:{
    //     title(){
    //       return title;
    //     },
    //     summaryBody(prev){
    //       return isBodyChanged ? summaryBody : prev;
    //     },
    //   }
    // });
    
    // // me ??? ?????? ????????? ?????????. Before ?????? ????????? ?????????
    // cache.modify({
    //   id:"ROOT_QUERY",
    //   fields:{
    //     me(prev){
    //       // console.log("prev me : "+ JSON.stringify(prev))
    //       const newDiaries = [...prev.todayDiaries];
    //       const nowBoardIndex = newDiaries.findIndex(board=>board.id === boardId);
    //       newDiaries[nowBoardIndex] = {
    //         ...newDiaries[nowBoardIndex],
    //         title,
    //         body,
    //       }
    //       return {
    //         ...prev,
    //         todayDiaries: newDiaries,
    //       };
    //     },
    //   },
    // });

    //???????????????
    Alert.alert("???????????? ?????????????????????.");

    navigation.goBack();

  };

  const [ editBoard, { loading } ] = useMutation<editBoard,editBoardVariables>(EDIT_BOARD,{
    update: updateEditBoard,
  });



  // ?????? ?????? ?????????. ????????? ????????? ?????????.
  if(!boardId) {
    return {
      loading: false,
      onPressEdit: ()=>{
        console.error("useEditBoardMutation // boardId ????????? ??? ?????????. ?????? ????????? ??????????????? ?????? ????????? ??????.");
        getUnknownErrorThenAlert();
      },
    };
  }

  // getChangeStatus ??? ????????? ??????????????? props ?????? ?????? ????????? ?????????
  const onPressEdit = async() => {
    
    if(title === "") {
      return Alert.alert("????????? ????????? ?????????.");
    }
    if(files.length === 0 && body.length === 1 && body[0] === "") {
      return Alert.alert("????????? ????????? ?????????.");
    }

    // ?????? ??? ????????? ?????? ?????? ??????????????? ??? ??????.
    if(files.length > MAX_FILE_NUMBER) return Alert.alert("10??? ????????? ????????? ????????? ?????? ??? ????????????.");

    const {
      isFileChanged,
      isTitleChanged,
      isBodyChanged,
      // isYoutubeChanged,
      isNothingChanged,
    } = getChangeStatus();

    
    if(isNothingChanged) {
      return navigation.goBack();
    };

    const addFileBeforeConvertedArr:FileInfo[] = [];
    const addFileArr:ReactNativeFile[] = [];
    const addFileIndexArr:number[] = [];
    const wholeFileArr:string[] = [];
    const addThumbNailArr: ReactNativeFile[] = []; // ??????

    const isFirstFileChanged = files[0]?.uri !== prevFiles[0]?.uri;

    // if(prevFiles.length !== 0 && isFirstFileChanged) {
    //   deletePrevThumbNail = true;
    // } 

    let isFirstVideo = false;
    let ifFirstVideoThenThumbNailElseNull:string|null = null;
    // addFunctionArr ??? ??? ?????? ????????? ?????? ?????? ????????? ?????? ???. foreach ??? ??????.
    const addFunctionArr = files.map(async(file,index)=>{
      const fileUri = file.uri;
      const isVideo = file.isVideo;

      const isNewPhoto = !prevFiles.some(prevFile => prevFile.uri === fileUri);

      if(isNewPhoto){
        if(index === 0){
          isFirstVideo = isVideo;
        }
        // console.log("isNewPhoto : true + fileUri : " + fileUri)
        addFileBeforeConvertedArr.push({
          uri: fileUri,
          isVideo: isVideo,
        });
        addFileIndexArr.push(index);
        wholeFileArr.push("");

        // ??????
        if(isVideo) {
          const videoThumbNail = await getOrResizeThumbNail(file);

          // index === 0 && (ifFirstVideoThenThumbNailElseNull = videoThumbNail);
          if(index === 0) {
            ifFirstVideoThenThumbNailElseNull = videoThumbNail;
            // console.log("inner : "+ ifFirstVideoThenThumbNailElseNull)
            // console.log("videoThumbNail : "+ videoThumbNail)
          }

          const convertedThumbNail = new ReactNativeFile({
            uri: videoThumbNail,
            // convertedFile ??? ?????? ??? ???????????????.
            name: `${index}.jpg`,
            type: "image/jpeg",
          });

          addThumbNailArr.push(convertedThumbNail);
        }
      } else {
        wholeFileArr.push(fileUri);
      }
    });

    await Promise.all(addFunctionArr);

    // console.log("ifFirstVideoThenThumbNailElseNull : "+ ifFirstVideoThenThumbNailElseNull)
    
    let changeThumbNailForBackend:boolean|null = false;
    // ?????? await ???????????? addFunctionArr ????????? ???.
    if(isFirstFileChanged) {
      if(isFirstVideo){
        // thumbNail = files[0].thumbNail ?? null;
        changedThumbNail = ifFirstVideoThenThumbNailElseNull;
        changeThumbNailForBackend = true;
        // thumbNail = files[0].thumbNail
          // ??
          // await androidGetThumbNail(files[0].uri); // ?????????. ????????? ?????? ??????
      } else {
        if(files.length === 0) {
          changedThumbNail = null;
          changeThumbNailForBackend = null;
        } else {
          changedThumbNail = await resizeImageNeedUriWidthHeight(files[0].uri,800,800);
          changeThumbNailForBackend = true;
        }
        // changedThumbNail = files.length === 0 ? 
        //   null
        // :
        //   await resizeImageNeedUriWidthHeight(files[0].uri,800,800);
      }
    }
    
    const deleteFileArr: string[] = [];
    // findDeletedFile ??? ????????? ????????? ??? ????????? ?????? ???
    const findDeletedFiles = prevFiles.map(prevFile=>{
      if (!(files.some(file=>file.uri === prevFile.uri))){
        deleteFileArr.push(prevFile.uri);
      };
    })
    
    // ???????????? ????????? ReactNativeFile ??? ????????? ?????? addFileArr ??? ?????? ?????? ??????.
    const convertFileFn = addFileBeforeConvertedArr.map(async(file,index) => {
      
      const uploadFileUri = await compressImageVideoFile(file);
      
      const convertedFile = new ReactNativeFile({
        uri: uploadFileUri,
        name: `${index}.${file.isVideo ? "mp4" : "jpg"}`,
        type: file.isVideo ? "video/mp4" : "image/jpeg",
      });
      
      addFileArr[index] = convertedFile;
      
    });
    
    // let convertedFirstVideoPhoto;
    
    // if(thumbNail) {
    //   convertedFirstVideoPhoto = new ReactNativeFile({
    //     uri: thumbNail,
    //     name: "videoThumbNail.jpg",
    //     type: "image/jpeg",
    //   });
    // }
    
    await Promise.all(convertFileFn);

    const isAddFile = addFileArr.length !== 0;
    const isDeleteFile = deleteFileArr.length !== 0;
    const isAddThumbNail = addThumbNailArr.length !== 0;
    const isThumbNailChanged = changedThumbNail !== undefined;
    // console.log("youtubeId")
    // console.log(youtubeId)
    if(isBodyChanged){
      for(var i = 0; i < body.length; i++) {
        summaryBody += body[i];
        if(summaryBody.length > 40) {
          // summaryBody = summaryBody.substring(0,40);
          summaryBody = summaryBody.substring(0,37) + "...";
          break;
        }
      }
    }

    await editBoard({
      variables:{
        id:boardId,
        ...(isAddFile && {
          // ?????? ????????? ???????????? ?????? ????????? ??????
          addFileArr,
          addFileIndexArr
        }),
        ...(isThumbNailChanged && {changeThumbNail:changeThumbNailForBackend}),
        ...(isAddThumbNail && {addThumbNailArr}),
        // ...(thumbNail && {thumbNail:convertedFirstVideoPhoto}),
        ...(isDeleteFile && {deleteFileArr}),
        ...(isFileChanged && {wholeFileArr}),
        ...(isTitleChanged && {title}),
        // ...(deletePrevThumbNail && {deletePrevThumbNail}),
        // ...(isYoutubeChanged && {youtubeId}),
        // ...(isBodyChanged && {body}),
        ...(isBodyChanged && {
          body,
          summaryBody: summaryBody.length === 0 ? null : summaryBody,
        }),
      },
    });
  };

  return {
    loading,
    onPressEdit,
  };
};

export default useEditBoardMutation;