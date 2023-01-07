import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNativeFile } from "apollo-upload-client";
import { Alert } from "react-native";
import { MAX_FILE_NUMBER } from "../../components/upload/PlusPhotoBtn";
import getUnknownErrorThenAlert from "../../logic/getUnknownErrorThenAlert";
// import androidGetThumbNail from "../../logic/upload/androidGetThumbNail";
import compressImageVideoFile from "../../logic/upload/compressImageVideoFile";
import getOrResizeThumbNail from "../../logic/upload/getOrResizeThumbNail";
import resizeImageNeedUriWidthHeight from "../../logic/upload/resizeImageNeedUriWidthHeight";
import { TEMPORARY_EDIT_DIARY } from "../../temporaryDiary/constant";
// import { MyDiaryListTabStackParamsList, NotificationTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { MyDiaryListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../types/upload/fileType";
import { editDiary, editDiaryVariables } from "../../__generated__/editDiary";

const EDIT_DIARY = gql`
  mutation editDiary(
    $id:Int!
    $title: String,
    # $body: JSON,
    $body: [String!],
    $changeThumbNail: Boolean, # 추가
    # $thumbNail: Upload
    $addFileArr: [Upload!],
    # $addFileIndexArr: JSON,
    $addFileIndexArr: [Int!],
    $addThumbNailArr: [Upload!], # 추가
    # $deleteFileArr: JSON,
    # $wholeFileArr: JSON,
    $deleteFileArr:[String!],
    $wholeFileArr:[String!],
    # $deletePrevThumbNail: Boolean,
    $youtubeId: String,
    $summaryBody: String,
  ) {
    editDiary(
      id: $id,
      title: $title, 
      body: $body,
      changeThumbNail: $changeThumbNail,
      # thumbNail: $thumbNail
      addFileArr: $addFileArr
      addFileIndexArr: $addFileIndexArr
      addThumbNailArr: $addThumbNailArr,
      deleteFileArr: $deleteFileArr
      wholeFileArr: $wholeFileArr
      # deletePrevThumbNail: $deletePrevThumbNail
      youtubeId: $youtubeId,
      summaryBody: $summaryBody
    ) {
      ok
      error
    }
  }
`;

// type EditDiaryProps = NativeStackScreenProps<MyDiaryListTabStackParamsList|NotificationTabStackParamsList,"EditDiary">;
type EditDiaryProps = NativeStackScreenProps<MyDiaryListTabStackParamsList,"EditDiary">;

type useEditDiaryMutationProps = {
  diaryId: number | undefined,
  files: FileInfo[],
  title: string,
  body: string[],
  prevFiles: FileInfo[],
  // prevYoutubeId: string,
  youtubeId: string | null,
  // 이게 잘 동작할라나? 안되면 onPressEdit 에 인자로 줘야겠네
  // 잘 되네? 나중에 로직 바꾸고도 되는지 확인
  getChangeStatus: () => {
    isFileChanged: boolean;
    isTitleChanged: boolean;
    isBodyChanged: boolean;
    isYoutubeChanged: boolean;
    isNothingChanged: boolean;
  },
}

const useEditDiaryMutation = ({
  files,
  title,
  body,
  diaryId,
  prevFiles,
  // prevYoutubeId,
  youtubeId,
  getChangeStatus,
}: useEditDiaryMutationProps) => {

  const navigation = useNavigation<EditDiaryProps["navigation"]>();

  // mutation, 캐시 update 에서 쓰임
  let changedThumbNail:string|null|undefined = undefined;
  // let deletePrevThumbNail = false;
  let summaryBody: string = "";

  const updateEditDiary:MutationUpdaterFunction<editDiary, editDiaryVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {

    const { data } = result;
    if(!data) return;

    const { editDiary: { ok, error }} = data;
    
    // 파일 업로드 오류시 에러메세지 보여줌
    if(error) {
      return Alert.alert(error,"같은 문제가 지속적으로 발생한다면 문의 주시면 감사드리겠습니다.")
    };

    // 임시 저장 수정 삭제
    AsyncStorage.removeItem(TEMPORARY_EDIT_DIARY);

    const getOnlyUriFromArr = files.map(file=>file.uri);

    const isBodyChanged = getChangeStatus().isBodyChanged;

    // 캐시 변경
    cache.modify({
      id:`Diary:${diaryId}`,
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
        youtubeId(){
          return youtubeId;
        },
        thumbNail(prev){
          return changedThumbNail === undefined ? prev : changedThumbNail;
        },
        summaryBody(prev){
          return isBodyChanged ? summaryBody : prev;
        },
      }
    });

    // 캐시 변경
    cache.modify({
      id:`Calendar:${diaryId}`,
      fields:{
        title(){
          return title;
        },
        summaryBody(prev){
          return isBodyChanged ? summaryBody : prev;
        },
      }
    });
    
    // // me 는 따로 해줘야 적용됨. Before 에서 받아서 그런듯
    // cache.modify({
    //   id:"ROOT_QUERY",
    //   fields:{
    //     me(prev){
    //       // console.log("prev me : "+ JSON.stringify(prev))
    //       const newDiaries = [...prev.todayDiaries];
    //       const nowDiaryIndex = newDiaries.findIndex(diary=>diary.id === diaryId);
    //       newDiaries[nowDiaryIndex] = {
    //         ...newDiaries[nowDiaryIndex],
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

    //확인메세지
    Alert.alert("게시물이 수정되었습니다.");

    navigation.goBack();

  };

  const [ editDiary, { loading } ] = useMutation<editDiary,editDiaryVariables>(EDIT_DIARY,{
    update: updateEditDiary,
  });



  // 타입 체크 위한거. 없어도 작동은 똑같음.
  if(!diaryId) {
    return {
      loading: false,
      onPressEdit: ()=>{
        console.error("useEditDiaryMutation // diaryId 이상한 값 들어옴. 말이 안되는 상황이지만 일단 로직은 넣음.");
        getUnknownErrorThenAlert();
      },
    };
  }

  // getChangeStatus 가 제대로 안받아지면 props 말고 여기 인자로 넣어줘
  const onPressEdit = async() => {
    
    if(title === "") {
      return Alert.alert("제목을 입력해 주세요.");
    }
    if(files.length === 0 && body.length === 1 && body[0] === "") {
      return Alert.alert("내용을 입력해 주세요.");
    }

    // 이걸 할 필요가 있을 지는 모르겠지만 걍 넣음.
    if(files.length > MAX_FILE_NUMBER) return Alert.alert("10장 이상의 사진을 업로드 하실 수 없습니다.");

    const {
      isFileChanged,
      isTitleChanged,
      isBodyChanged,
      isYoutubeChanged,
      isNothingChanged,
    } = getChangeStatus();

    
    if(isNothingChanged) {
      return navigation.goBack();
    };

    const addFileBeforeConvertedArr:FileInfo[] = [];
    const addFileArr:ReactNativeFile[] = [];
    const addFileIndexArr:number[] = [];
    const wholeFileArr:string[] = [];
    const addThumbNailArr: ReactNativeFile[] = []; // 추가

    const isFirstFileChanged = files[0]?.uri !== prevFiles[0]?.uri;

    // if(prevFiles.length !== 0 && isFirstFileChanged) {
    //   deletePrevThumbNail = true;
    // } 

    let isFirstVideo = false;
    let ifFirstVideoThenThumbNailElseNull:string|null = null;
    // addFunctionArr 는 쓸 애는 아니고 그냥 로직 실행을 위한 애. foreach 는 안됨.
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

        // 추가
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
            // convertedFile 랑 파일 명 똑같아야함.
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
    // 얘만 await 들어가서 addFunctionArr 밖으로 뺌.
    if(isFirstFileChanged) {
      if(isFirstVideo){
        // thumbNail = files[0].thumbNail ?? null;
        changedThumbNail = ifFirstVideoThenThumbNailElseNull;
        changeThumbNailForBackend = true;
        // thumbNail = files[0].thumbNail
          // ??
          // await androidGetThumbNail(files[0].uri); // 지울듯. 안쓰면 아예 삭제
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
    // findDeletedFile 도 쓰는건 아니고 걍 로직을 위한 애
    const findDeletedFiles = prevFiles.map(prevFile=>{
      if (!(files.some(file=>file.uri === prevFile.uri))){
        deleteFileArr.push(prevFile.uri);
      };
    })
    
    // 업로드할 파일을 ReactNativeFile 로 만들어 주고 addFileArr 에 순서 맞게 넣음.
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

    await editDiary({
      variables:{
        id:diaryId,
        ...(isAddFile && {
          // 얘는 쌍으로 가야해서 그냥 쌍으로 넣음
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
        ...(isYoutubeChanged && {youtubeId}),
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

export default useEditDiaryMutation;