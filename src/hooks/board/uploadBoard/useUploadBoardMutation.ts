import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNativeFile } from "apollo-upload-client";
import { useRef } from "react";
import { Alert } from "react-native";
import { GET_MY_BOARD_LIST, SEE_NEW_BOARD_LIST } from "../../../gql/forCodeGen";
import ifErrorThenBaseAlert from "../../../logic/ifErrorThenBaseAlert";
import compressImageVideoFileByWidth from "../../../logic/upload/compressImageVideoFileByWidth";
import getOrResizeThumbNail from "../../../logic/upload/getOrResizeThumbNail";
import { TEMPORARY_UPLOAD_BOARD } from "../../../temporaryBoard/constant";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../../types/upload/fileType";
import { uploadBoard, uploadBoardVariables } from "../../../__generated__/uploadBoard";

const UPLOAD_BOARD = gql`
  mutation uploadBoard(
    $title: String!,
    $fileArr: [Upload!]!,
    $body: [String!]!,
    $thumbNailArr: [Upload!],
    $isFirstVideo: Boolean!,
  ) {
    uploadBoard(
      title: $title, 
      fileArr: $fileArr,
      body: $body,
      thumbNailArr: $thumbNailArr,
      isFirstVideo: $isFirstVideo,
    ) {
      ok
      error
      uploadedBoard {
        id
        createdAt
      }
    }
  }
`;

type UploadBoardProps = NativeStackScreenProps<BoardTabStackParamsList,"UploadBoard">;

export type useUploadBoardMutationProps = {
  files: FileInfo[],
  title: string,
  body: string[],
  // youtubeIdRef: React.MutableRefObject<string | undefined>,
  // youtubeIdRef: React.MutableRefObject<string | null>,
};

const useUploadBoardMutation = ({
  files,
  title,
  body,
  // youtubeIdRef,
}: useUploadBoardMutationProps) => {

  // const todayDate = getToday();
  // const thumbNailRef = useRef(null);
  const thumbNailRef = useRef<string>();

  const navigation = useNavigation<UploadBoardProps["navigation"]>();

  let summaryBody = "";
  
  // const {data:meData} = useMe()

  // mutation 후 캐시 변경
  const updateUploadBoard: MutationUpdaterFunction<uploadBoard, uploadBoardVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {
    
    const { data } = result;
    if(!data) return;

    const { uploadBoard: { ok, error, uploadedBoard }} = data;
    
    // 파일 업로드 오류시 에러메세지 보여줌, !uploadedBoard 는 타입 체크
    if(error || !uploadedBoard) {
      return ifErrorThenBaseAlert(error);
    };

    // 임시저장 삭제
    AsyncStorage.removeItem(TEMPORARY_UPLOAD_BOARD);
    
    // 캐시 변경 작성
    const newFileUriArr = files.map(fileObj => fileObj.uri);

    // __typeName 도 받아서 따로 빼서 넣음
    const {
      id: uploadedBoardId,
      createdAt: uploadedBoardCreatedAt,
    } = uploadedBoard;

    // // 캐시에 넣을 거
    const uploadBoardCache = {
      id: uploadedBoardId,
      createdAt: uploadedBoardCreatedAt,
      title,
      body: body.map(value=>value ?? ""),
      file: newFileUriArr,
      // thumbNail: thumbNailRef.current,
      thumbNail: thumbNailRef.current ?? null,
    };

    // console.log('thumbNailRef.current : '+ thumbNailRef.current);

    // console.log("uploadBoardCache")
    // console.log(uploadBoardCache)

    // // > 됬다 안됬다 함. 걍 데이터로 넣음
    // const boardRef = cache.writeFragment({
    //   id: `Board:${uploadedBoardId}`,
    //   fragment: gql`
    //     fragment MyBoard on Board {
    //       id
    //       createdAt
    //       title
    //       body
    //       file
    //       thumbNail
    //       youtubeId
    //       dateTime
    //       summaryBody
    //     }
    //   `,
    //   data: uploadBoardCache,
    // });

    // console.log("boardRef")
    // console.log(boardRef)

    // 캐시에 넣을 거. ref 말고 그냥 데이터
    // 이러면 잘 되기는 하는데 Board 라는걸 인식 못하고 걍 데이터 통으로 들어감. 흠..
    // const uploadBoardCache = {
    //   // post 의 id, createdAt, __typename
    //   ...uploadedBoard,
    //   // user: meData?.me,
    //   title,
    //   // 변수 넣으니까 이상해져서 걍 각각 따로 받음
    //   // body: convertedBody,
    //   body: body.map(value=>value ?? ""),
    //   file: newFileUriArr,
    //   // thumbNail: thumbNail ?? null,
    //   thumbNail: thumbNail.current,
    //   // likes: 0,
    //   // commentNumber: 0,
    //   // isLiked: false,
    //   // isMine: true,
    // };

    // seeNewBoardList, seeFollowersBoardList, getMyBoardList, getUserBoardList
    // 캐시 변경
    // console.log("boardRef : "+ boardRef)

    const rareBoard = {
      "__typename":"Board",
      ...uploadBoardCache,
    };

    // getMyBoardList 는 updateQuery 하면 pagination 에 걸림. isNotFetchMore 넣어서 해결
    cache.updateQuery({
      query: GET_MY_BOARD_LIST,
    }, (data)=>{
      // console.log("GET_MY_DIARY_LIST data : "+JSON.stringify(data))
      if(!data) return null;
      const prevTodayBoards = data.getMyBoardList.boards;
      return {
        getMyBoardList:{
          ...data.getMyBoardList,
          boards: prevTodayBoards ? [rareBoard,...prevTodayBoards] : [rareBoard],
          isNotFetchMore: true,
        }
      };
    });

    cache.updateQuery({
      query: SEE_NEW_BOARD_LIST,
    }, (data)=>{
      // console.log("GET_MY_DIARY_LIST data : "+JSON.stringify(data))
      if(!data) return null;
      const prevTodayBoards = data.seeNewBoardList.boards;
      return {
        seeNewBoardList:{
          ...data.seeNewBoardList,
          boards: prevTodayBoards ? [rareBoard,...prevTodayBoards] : [rareBoard],
          isNotFetchMore: true,
        }
      };
    });

    // cache.updateQuery({ // 이래해야 되는듯.
    //   query: ME_QUERY
    // }, (data) => {
    //   if(!data) return null;
    //   // console.log("ME_QUERY data : " + JSON.stringify(data))
    //   const prevTodayBoards = data.me.todayBoards;
    //   return { 
    //     me: {
    //       ...data.me,
    //       // todayBoards: prevTodayBoards ? [ boardRef, ...prevTodayBoards ] : [boardRef],
    //       todayBoards: prevTodayBoards ? [ ...prevTodayBoards,rareBoard ] : [rareBoard], // 뒤에가 맞았네. 얘도 이렇게 넣어야 에러가 안생김. ref 로 넣으면 데이터가 안받아져. 근데 삭제해도 잘되네?
    //     },
    //   };
    // });

    // 확인메세지
    Alert.alert("게시물이 작성되었습니다.");
    // 홈 화면으로 이동
    // navigation.navigate("TodayBoard",{
    //   // 다이어리 캐시 넣어줄애 + 타입에도 작성
    // });
    navigation.goBack();
  };


  // mutation
  const [uploadBoard,{loading}] = useMutation<uploadBoard,uploadBoardVariables>(UPLOAD_BOARD,{
    update: updateUploadBoard,
  });


  // Alert 중간에 있으면 얘 결과를 받고 다음이 실행되는게 아니고 그냥 다음게 실행됨. 그래서 따로 빼서 onPress 에 넣어야함.
  const executeUploadBoard = async() => {

    let isFirstVideo = false;

    const resizedFileArr: ReactNativeFile[] = [];
    const thumbNailArr: ReactNativeFile[] = []; // 추가
    
    const photoArr = files.map(async(file,index) => {
      
      const isVideo = file.isVideo;
      
      if(index === 0){
        isFirstVideo = isVideo;
      }

      const uploadFileUri = await compressImageVideoFileByWidth(file);
      
      const convertedFile = new ReactNativeFile({
        uri: uploadFileUri,
        // 이거 이름 다르게 해줘야 함. 안그럼 덮어쓸 수 있음.
        name: `${index}.${isVideo ? "mp4" : "jpg"}`,
        //   name: "1.jpg",
        type: isVideo ? "video/mp4" : "image/jpeg",
      });

      // console.log("photoArr + uploadFileUri : " + uploadFileUri)

      resizedFileArr[index] = convertedFile;
    
      // 추가
      if(isVideo) {
        const videoThumbNail = await getOrResizeThumbNail(file);
        
        // index === 0 && (thumbNailRef.current = videoThumbNail);
        if(index === 0) {
          thumbNailRef.current = videoThumbNail;
        }

        const convertedThumbNail = new ReactNativeFile({
          uri: videoThumbNail,
          // convertedFile 랑 파일 명 똑같아야함.
          name: `${index}.jpg`,
          type: "image/jpeg",
        });

        thumbNailArr.push(convertedThumbNail);
      } else if (index === 0) { // 처음 파일이 사진인 경우
        thumbNailRef.current = uploadFileUri;
      }

    });

    // 썸넬 따로 보낼 필요 없음
    // // 썸넬을 사진으로 일단 씀. 걍 동영상으로 넣어도 되고
    // // 이유는 모르겠으나 thumbNail getThumbNail 변수 따로 해놔야 잘됨.
    // let getThumbNail;

    // if(files.length !== 0) {
    //   getThumbNail = isFirstVideo ?
    //     // await getOrResizeThumbNail(files[0])
    //     thumbNailArr[0]
    //   :
    //     await resizeImageNeedUriWidthHeight(files[0].uri,800,800);
        
    //   // thumbNail = getThumbNail;
    //   thumbNailRef.current = getThumbNail;
    // }

    // const convertedThumbNail = new ReactNativeFile({
    //   uri: getThumbNail,
    //   name: "videoThumbNail.jpg",
    //   type: "image/jpeg",
    // });

    await Promise.all(photoArr);

    // 바깥에 선언. 캐시에도 쓰임
    // const convertedBody = body.map(value=>value ?? "");
    // convertedBody = body.map(value=>value ?? "");

    // 이렇게 쓰니까 안받아짐.
    // setConvertedBody(body.map(value=>value ?? ""));
    // const newBody = body.map(value=>value ?? "");

    // setConvertedBody(newBody);

    // console.log("thumbNailRef.current : "+ thumbNailRef.current)
    
    // let summaryBody = "";
    for(var i = 0; i < body.length; i++) {
      summaryBody += body[i];
      if(summaryBody.length > 40) {
        summaryBody = summaryBody.substring(0,37) + "...";
        break;
      }
    }
    
    // console.log("resizedFileArr : "+JSON.stringify(resizedFileArr))

    await uploadBoard({
      variables:{
        title,
        fileArr: resizedFileArr,
        // 변수에 넣으니까 안받아져 걍 통으로 넣어
        // body: convertedBody,
        body: body.map(value=>value ?? ""),
        // ...(getThumbNail && { thumbNail: convertedThumbNail }),
        // thumbNailArr,
        isFirstVideo,
      },
    });
  };

  return {
    loading,
    executeUploadBoard,
  };
};

export default useUploadBoardMutation;