import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNativeFile } from "apollo-upload-client";
import { useRef } from "react";
import { Alert } from "react-native";
import { GET_MY_DIARY_LIST } from "../../gql/forCodeGen";
import { GET_CALENDAR_MONTHLY_DATA, ME_QUERY } from "../../gql/manyWriteQuery";
import ifErrorThenBaseAlert from "../../logic/ifErrorThenBaseAlert";
import compressImageVideoFileByWidth from "../../logic/upload/compressImageVideoFileByWidth";
import getOrResizeThumbNail from "../../logic/upload/getOrResizeThumbNail";
import getToday from "../../logic/upload/getToday";
import { TEMPORARY_UPLOAD_DIARY } from "../../temporaryDiary/constant";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../types/upload/fileType";
import { uploadDiary, uploadDiaryVariables } from "../../__generated__/uploadDiary";

const UPLOAD_DIARY = gql`
  mutation uploadDiary(
    $title: String!,
    $fileArr: [Upload!]!,
    $body: [String!]!,
    # $body: JSON!,
    # $thumbNail: Upload,
    $thumbNailArr:[Upload!], # 추가함
    $isFirstVideo: Boolean!, # 추가함
    $dateTime: String!,
    $youtubeId: String,
    $requestMusic: Boolean!,
    $showDiary: Boolean,
    $requestMessage: String,
    $summaryBody: String,
  ) {
    uploadDiary(
      title: $title, 
      fileArr: $fileArr,
      body: $body,
      # thumbNail: $thumbNail,
      thumbNailArr: $thumbNailArr,
      isFirstVideo: $isFirstVideo,
      dateTime: $dateTime,
      youtubeId: $youtubeId,
      requestMusic: $requestMusic,
      showDiary: $showDiary,
      requestMessage: $requestMessage,
      summaryBody: $summaryBody,
    ) {
      ok
      error
      uploadedDiary {
        id
        createdAt
      }
    }
  }
`;

type UploadDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"UploadDiary">;

export type useUploadDiaryMutationProps = {
  files: FileInfo[],
  title: string,
  body: string[],
  // youtubeIdRef: React.MutableRefObject<string | undefined>,
  youtubeIdRef: React.MutableRefObject<string | null>,
};

type executeUploadDiaryProps = {
  requestMusic: boolean,
  showDiary?: boolean,
  requestMessage?: string,
}

const useUploadDiaryMutation = ({
  files,
  title,
  body,
  youtubeIdRef,
}: useUploadDiaryMutationProps) => {

  const todayDate = getToday();
  // const thumbNailRef = useRef(null);
  const thumbNailRef = useRef<string>();

  const navigation = useNavigation<UploadDiaryProps["navigation"]>();

  let summaryBody = "";
  
  // const {data:meData} = useMe()

  // mutation 후 캐시 변경
  const updateUploadDiary: MutationUpdaterFunction<uploadDiary, uploadDiaryVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {
    
    const { data } = result;
    if(!data) return;

    const { uploadDiary: { ok, error, uploadedDiary }} = data;
    
    // 파일 업로드 오류시 에러메세지 보여줌, !uploadedDiary 는 타입 체크
    if(error || !uploadedDiary) {
      return ifErrorThenBaseAlert(error);
    };

    // 임시저장 삭제
    AsyncStorage.removeItem(TEMPORARY_UPLOAD_DIARY);
    
    // 캐시 변경 작성
    const newFileUriArr = files.map(fileObj => fileObj.uri);

    // __typeName 도 받아서 따로 빼서 넣음
    const {
      id: uploadedDiaryId,
      createdAt: uploadedDiaryCreatedAt,
    } = uploadedDiary;

    // // 캐시에 넣을 거
    const uploadDiaryCache = {
      id: uploadedDiaryId,
      createdAt: uploadedDiaryCreatedAt,
      title,
      body: body.map(value=>value ?? ""),
      file: newFileUriArr,
      // thumbNail: thumbNailRef.current,
      thumbNail: thumbNailRef.current ?? null,
      // 이게 undefined 면 캐시에 안들어가지네....
      // youtubeId: youtubeIdRef.current ?? null,
      youtubeId: youtubeIdRef.current ?? null,
      dateTime: todayDate,
      summaryBody,
    };

    // console.log('thumbNailRef.current : '+ thumbNailRef.current);

    // console.log("uploadDiaryCache")
    // console.log(uploadDiaryCache)

    // // > 됬다 안됬다 함. 걍 데이터로 넣음
    // const diaryRef = cache.writeFragment({
    //   id: `Diary:${uploadedDiaryId}`,
    //   fragment: gql`
    //     fragment MyDiary on Diary {
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
    //   data: uploadDiaryCache,
    // });

    // console.log("diaryRef")
    // console.log(diaryRef)

    // 캐시에 넣을 거. ref 말고 그냥 데이터
    // 이러면 잘 되기는 하는데 Diary 라는걸 인식 못하고 걍 데이터 통으로 들어감. 흠..
    // const uploadDiaryCache = {
    //   // post 의 id, createdAt, __typename
    //   ...uploadedDiary,
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

    // seeNewDiaryList, seeFollowersDiaryList, getMyDiaryList, getUserDiaryList
    // 캐시 변경
    // console.log("diaryRef : "+ diaryRef)

    const rareDiary = {
      "__typename":"Diary",
      ...uploadDiaryCache,
    };

    // getMyDiaryList 는 updateQuery 하면 pagination 에 걸림. isNotFetchMore 넣어서 해결
    cache.updateQuery({
      query: GET_MY_DIARY_LIST,
    }, (data)=>{
      // console.log("GET_MY_DIARY_LIST data : "+JSON.stringify(data))
      if(!data) return null;
      const prevTodayDiaries = data.getMyDiaryList.diaries;
      return {
        getMyDiaryList:{
          ...data.getMyDiaryList,
          diaries: prevTodayDiaries ? [rareDiary,...prevTodayDiaries] : [rareDiary],
          isNotFetchMore: true,
        }
      };
    });

    cache.updateQuery({ // 이래해야 되는듯.
      query: ME_QUERY
    }, (data) => {
      if(!data) return null;
      // console.log("ME_QUERY data : " + JSON.stringify(data))
      const prevTodayDiaries = data.me.todayDiaries;
      return { 
        me: {
          ...data.me,
          // todayDiaries: prevTodayDiaries ? [ diaryRef, ...prevTodayDiaries ] : [diaryRef],
          todayDiaries: prevTodayDiaries ? [ ...prevTodayDiaries,rareDiary ] : [rareDiary], // 뒤에가 맞았네. 얘도 이렇게 넣어야 에러가 안생김. ref 로 넣으면 데이터가 안받아져. 근데 삭제해도 잘되네?
        },
      };
    });


    // 캘린더 데이터 변경
    const date = new Date();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth()+1;

    const calendarData = {
      id: uploadedDiaryId,
      title,
      date: +todayDate.slice(-2),
      summaryBody,
    }

    // const calendarRef = cache.writeFragment({
    //   id: `Calendar:${uploadedDiaryId}`,
    //   fragment: gql`
    //     fragment MyCalendar on Calendar {
    //       id
    //       title
    //       date
    //       summaryBody
    //     }
    //   `,
    //   data: calendarData,
    // });

    const rareCalendar = {
      "__typename":"Calendar",
      ...calendarData,
    };
    // console.log("calendarRef : "+calendarRef);
    // console.log("calendarRef : "+JSON.stringify(calendarRef));

    // 캘린더 데이터 넣음
    cache.updateQuery({
      query: GET_CALENDAR_MONTHLY_DATA,
      variables: {
        year: nowYear,
        month: nowMonth,
      }
    }, (data) => {
      if(!data) return null;
      // console.log("GET_CALENDAR_MONTHLY_DATA data : " + JSON.stringify(data))
      const prevData = data.getCalendarMonthlyData ?? []
      return { 
        getCalendarMonthlyData: [
          ...prevData,
          // {
          //    __typename: "Calendar",
          //   id: uploadedDiaryId,
          //   title,
          //   date: +todayDate.slice(-2),
          //   summaryBody,
          // }
          // calendarRef,  // 얘는 뒤에 작성. 여기는 시간순임
          rareCalendar, // 얘도 이렇게 넣어야 에러가 안생김. ref 로 넣으면 데이터가 안받아져. 근데 삭제해도 잘되네?
        ],
      }
    });

    // 확인메세지
    Alert.alert("오늘의 일기가 작성되었습니다.");
    // 홈 화면으로 이동
    navigation.navigate("TodayDiary",{
      // 다이어리 캐시 넣어줄애 + 타입에도 작성
    });
  };


  // mutation
  const [uploadDiary,{loading}] = useMutation<uploadDiary,uploadDiaryVariables>(UPLOAD_DIARY,{
    update: updateUploadDiary,
  });


  // Alert 중간에 있으면 얘 결과를 받고 다음이 실행되는게 아니고 그냥 다음게 실행됨. 그래서 따로 빼서 onPress 에 넣어야함.
  const executeUploadDiary = async({
    requestMusic,
    showDiary,
    requestMessage,
  }:executeUploadDiaryProps) => {

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

    await uploadDiary({
      variables:{
        title,
        fileArr: resizedFileArr,
        // 변수에 넣으니까 안받아져 걍 통으로 넣어
        // body: convertedBody,
        body: body.map(value=>value ?? ""),
        // ...(getThumbNail && { thumbNail: convertedThumbNail }),
        thumbNailArr,
        isFirstVideo,
        dateTime: todayDate,
        youtubeId: youtubeIdRef.current,
        requestMusic,
        ...(showDiary !== undefined && { showDiary }),
        ...(requestMessage && { requestMessage }),
        summaryBody: summaryBody.length === 0 ? null : summaryBody,
      },
    });
  };

  return {
    loading,
    executeUploadDiary,
  };
};

export default useUploadDiaryMutation;






// import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
// import { useNavigation } from "@react-navigation/core";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { ReactNativeFile } from "apollo-upload-client";
// import { useRef } from "react";
// import { Alert } from "react-native";
// import { MAX_FILE_NUMBER } from "../../components/upload/PlusPhotoBtn";
// import { GET_MY_DIARY_LIST } from "../../gql/forCodeGen";
// import { GET_CALENDAR_MONTHLY_DATA, ME_QUERY } from "../../gql/manyWriteQuery";
// import ifErrorThenBaseAlert from "../../logic/ifErrorThenBaseAlert";
// import compressImageVideoFileByWidth from "../../logic/upload/compressImageVideoFileByWidth";
// import getOrResizeThumbNail from "../../logic/upload/getOrResizeThumbNail";
// import getToday from "../../logic/upload/getToday";
// // import resizeImageNeedUriWidthHeight from "../../logic/upload/resizeImageNeedUriWidthHeight";
// import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
// import { FileInfo } from "../../types/upload/fileType";
// import { uploadDiary, uploadDiaryVariables } from "../../__generated__/uploadDiary";

// const UPLOAD_DIARY = gql`
//   mutation uploadDiary(
//     $title: String!,
//     $fileArr: [Upload!]!,
//     $body: [String!]!,
//     # $body: JSON!,
//     # $thumbNail: Upload,
//     $thumbNailArr:[Upload!], # 추가함
//     $isFirstVideo: Boolean!, # 추가함
//     $dateTime: String!,
//     $youtubeId: String,
//     $requestMusic: Boolean!,
//     $showDiary: Boolean,
//     $requestMessage: String,
//     $summaryBody: String,
//   ) {
//     uploadDiary(
//       title: $title, 
//       fileArr: $fileArr,
//       body: $body,
//       # thumbNail: $thumbNail,
//       thumbNailArr: $thumbNailArr,
//       isFirstVideo: $isFirstVideo,
//       dateTime: $dateTime,
//       youtubeId: $youtubeId,
//       requestMusic: $requestMusic,
//       showDiary: $showDiary,
//       requestMessage: $requestMessage,
//       summaryBody: $summaryBody,
//     ) {
//       ok
//       error
//       uploadedDiary {
//         id
//         createdAt
//       }
//     }
//   }
// `;

// type UploadDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"UploadDiary">;

// export type useUploadDiaryMutationProps = {
//   files: FileInfo[],
//   title: string,
//   body: string[],
//   // youtubeIdRef: React.MutableRefObject<string | undefined>,
//   youtubeIdRef: React.MutableRefObject<string | null>,
// };

// const useUploadDiaryMutation = ({
//   files,
//   title,
//   body,
//   youtubeIdRef,
// }: useUploadDiaryMutationProps) => {

//   const todayDate = getToday();
//   // const thumbNailRef = useRef(null);
//   const thumbNailRef = useRef<string>();

//   const navigation = useNavigation<UploadDiaryProps["navigation"]>();

//   let summaryBody = "";
  
//   // const {data:meData} = useMe()

//   // mutation 후 캐시 변경
//   const updateUploadDiary: MutationUpdaterFunction<uploadDiary, uploadDiaryVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {
    
//     const { data } = result;
//     if(!data) return;

//     const { uploadDiary: { ok, error, uploadedDiary }} = data;
    
//     // 파일 업로드 오류시 에러메세지 보여줌, !uploadedDiary 는 타입 체크
//     if(error || !uploadedDiary) {
//       return ifErrorThenBaseAlert(error);
//     };
    
//     // 캐시 변경 작성
//     const newFileUriArr = files.map(fileObj => fileObj.uri);

//     // __typeName 도 받아서 따로 빼서 넣음
//     const {
//       id: uploadedDiaryId,
//       createdAt: uploadedDiaryCreatedAt,
//     } = uploadedDiary;

//     // // 캐시에 넣을 거
//     const uploadDiaryCache = {
//       id: uploadedDiaryId,
//       createdAt: uploadedDiaryCreatedAt,
//       title,
//       body: body.map(value=>value ?? ""),
//       file: newFileUriArr,
//       // thumbNail: thumbNailRef.current,
//       thumbNail: thumbNailRef.current ?? null,
//       // 이게 undefined 면 캐시에 안들어가지네....
//       // youtubeId: youtubeIdRef.current ?? null,
//       youtubeId: youtubeIdRef.current ?? null,
//       dateTime: todayDate,
//       summaryBody,
//     };

//     // console.log('thumbNailRef.current : '+ thumbNailRef.current);

//     // console.log("uploadDiaryCache")
//     // console.log(uploadDiaryCache)

//     // // > 됬다 안됬다 함. 걍 데이터로 넣음
//     // const diaryRef = cache.writeFragment({
//     //   id: `Diary:${uploadedDiaryId}`,
//     //   fragment: gql`
//     //     fragment MyDiary on Diary {
//     //       id
//     //       createdAt
//     //       title
//     //       body
//     //       file
//     //       thumbNail
//     //       youtubeId
//     //       dateTime
//     //       summaryBody
//     //     }
//     //   `,
//     //   data: uploadDiaryCache,
//     // });

//     // console.log("diaryRef")
//     // console.log(diaryRef)

//     // 캐시에 넣을 거. ref 말고 그냥 데이터
//     // 이러면 잘 되기는 하는데 Diary 라는걸 인식 못하고 걍 데이터 통으로 들어감. 흠..
//     // const uploadDiaryCache = {
//     //   // post 의 id, createdAt, __typename
//     //   ...uploadedDiary,
//     //   // user: meData?.me,
//     //   title,
//     //   // 변수 넣으니까 이상해져서 걍 각각 따로 받음
//     //   // body: convertedBody,
//     //   body: body.map(value=>value ?? ""),
//     //   file: newFileUriArr,
//     //   // thumbNail: thumbNail ?? null,
//     //   thumbNail: thumbNail.current,
//     //   // likes: 0,
//     //   // commentNumber: 0,
//     //   // isLiked: false,
//     //   // isMine: true,
//     // };

//     // seeNewDiaryList, seeFollowersDiaryList, getMyDiaryList, getUserDiaryList
//     // 캐시 변경
//     // console.log("diaryRef : "+ diaryRef)

//     const rareDiary = {
//       "__typename":"Diary",
//       ...uploadDiaryCache,
//     };

//     // getMyDiaryList 는 updateQuery 하면 pagination 에 걸림. isNotFetchMore 넣어서 해결
//     cache.updateQuery({
//       query: GET_MY_DIARY_LIST,
//     }, (data)=>{
//       // console.log("GET_MY_DIARY_LIST data : "+JSON.stringify(data))
//       if(!data) return null;
//       const prevTodayDiaries = data.getMyDiaryList.diaries;
//       return {
//         getMyDiaryList:{
//           ...data.getMyDiaryList,
//           diaries: prevTodayDiaries ? [rareDiary,...prevTodayDiaries] : [rareDiary],
//           isNotFetchMore: true,
//         }
//       };
//     });

//     cache.updateQuery({ // 이래해야 되는듯.
//       query: ME_QUERY
//     }, (data) => {
//       if(!data) return null;
//       // console.log("ME_QUERY data : " + JSON.stringify(data))
//       const prevTodayDiaries = data.me.todayDiaries;
//       return { 
//         me: {
//           ...data.me,
//           // todayDiaries: prevTodayDiaries ? [ diaryRef, ...prevTodayDiaries ] : [diaryRef],
//           todayDiaries: prevTodayDiaries ? [ ...prevTodayDiaries,rareDiary ] : [rareDiary], // 뒤에가 맞았네. 얘도 이렇게 넣어야 에러가 안생김. ref 로 넣으면 데이터가 안받아져. 근데 삭제해도 잘되네?
//         },
//       };
//     });


//     // 캘린더 데이터 변경
//     const date = new Date();
//     const nowYear = date.getFullYear();
//     const nowMonth = date.getMonth()+1;

//     const calendarData = {
//       id: uploadedDiaryId,
//       title,
//       date: +todayDate.slice(-2),
//       summaryBody,
//     }

//     // const calendarRef = cache.writeFragment({
//     //   id: `Calendar:${uploadedDiaryId}`,
//     //   fragment: gql`
//     //     fragment MyCalendar on Calendar {
//     //       id
//     //       title
//     //       date
//     //       summaryBody
//     //     }
//     //   `,
//     //   data: calendarData,
//     // });

//     const rareCalendar = {
//       "__typename":"Calendar",
//       ...calendarData,
//     };
//     // console.log("calendarRef : "+calendarRef);
//     // console.log("calendarRef : "+JSON.stringify(calendarRef));

//     // 캘린더 데이터 넣음
//     cache.updateQuery({
//       query: GET_CALENDAR_MONTHLY_DATA,
//       variables: {
//         year: nowYear,
//         month: nowMonth,
//       }
//     }, (data) => {
//       if(!data) return null;
//       // console.log("GET_CALENDAR_MONTHLY_DATA data : " + JSON.stringify(data))
//       const prevData = data.getCalendarMonthlyData ?? []
//       return { 
//         getCalendarMonthlyData: [
//           ...prevData,
//           // {
//           //    __typename: "Calendar",
//           //   id: uploadedDiaryId,
//           //   title,
//           //   date: +todayDate.slice(-2),
//           //   summaryBody,
//           // }
//           // calendarRef,  // 얘는 뒤에 작성. 여기는 시간순임
//           rareCalendar, // 얘도 이렇게 넣어야 에러가 안생김. ref 로 넣으면 데이터가 안받아져. 근데 삭제해도 잘되네?
//         ],
//       }
//     });

//     // 확인메세지
//     Alert.alert("오늘의 일기가 작성되었습니다.");
//     // 홈 화면으로 이동
//     navigation.navigate("TodayDiary",{
//       // 다이어리 캐시 넣어줄애 + 타입에도 작성
//     });
//   };


//   // mutation
//   const [uploadDiary,{loading}] = useMutation<uploadDiary,uploadDiaryVariables>(UPLOAD_DIARY,{
//     // update: updateUploadDiary,
//   });


//   // Alert 중간에 있으면 얘 결과를 받고 다음이 실행되는게 아니고 그냥 다음게 실행됨. 그래서 따로 빼서 onPress 에 넣어야함.
//   const executeUploadDiary = async({requestMusic}:{requestMusic:boolean}) => {

//     let isFirstVideo = false;

//     const resizedFileArr: ReactNativeFile[] = [];
//     const thumbNailArr: ReactNativeFile[] = []; // 추가
    
//     const photoArr = files.map(async(file,index) => {
      
//       const isVideo = file.isVideo;
      
//       if(index === 0){
//         isFirstVideo = isVideo;
//       }

//       const uploadFileUri = await compressImageVideoFileByWidth(file);
      
//       const convertedFile = new ReactNativeFile({
//         uri: uploadFileUri,
//         // 이거 이름 다르게 해줘야 함. 안그럼 덮어쓸 수 있음.
//         name: `${index}.${isVideo ? "mp4" : "jpg"}`,
//         //   name: "1.jpg",
//         type: isVideo ? "video/mp4" : "image/jpeg",
//       });

//       // console.log("photoArr + uploadFileUri : " + uploadFileUri)

//       resizedFileArr[index] = convertedFile;
    
//       // 추가
//       if(isVideo) {
//         const videoThumbNail = await getOrResizeThumbNail(file);
        
//         // index === 0 && (thumbNailRef.current = videoThumbNail);
//         if(index === 0) {
//           thumbNailRef.current = videoThumbNail;
//         }

//         const convertedThumbNail = new ReactNativeFile({
//           uri: videoThumbNail,
//           // convertedFile 랑 파일 명 똑같아야함.
//           name: `${index}.jpg`,
//           type: "image/jpeg",
//         });

//         thumbNailArr.push(convertedThumbNail);
//       } else if (index === 0) { // 처음 파일이 사진인 경우
//         thumbNailRef.current = uploadFileUri;
//       }

//     });

//     // 썸넬 따로 보낼 필요 없음
//     // // 썸넬을 사진으로 일단 씀. 걍 동영상으로 넣어도 되고
//     // // 이유는 모르겠으나 thumbNail getThumbNail 변수 따로 해놔야 잘됨.
//     // let getThumbNail;

//     // if(files.length !== 0) {
//     //   getThumbNail = isFirstVideo ?
//     //     // await getOrResizeThumbNail(files[0])
//     //     thumbNailArr[0]
//     //   :
//     //     await resizeImageNeedUriWidthHeight(files[0].uri,800,800);
        
//     //   // thumbNail = getThumbNail;
//     //   thumbNailRef.current = getThumbNail;
//     // }

//     // const convertedThumbNail = new ReactNativeFile({
//     //   uri: getThumbNail,
//     //   name: "videoThumbNail.jpg",
//     //   type: "image/jpeg",
//     // });

//     await Promise.all(photoArr);

//     // 바깥에 선언. 캐시에도 쓰임
//     // const convertedBody = body.map(value=>value ?? "");
//     // convertedBody = body.map(value=>value ?? "");

//     // 이렇게 쓰니까 안받아짐.
//     // setConvertedBody(body.map(value=>value ?? ""));
//     // const newBody = body.map(value=>value ?? "");

//     // setConvertedBody(newBody);

//     // console.log("thumbNailRef.current : "+ thumbNailRef.current)
    
//     // let summaryBody = "";
//     for(var i = 0; i < body.length; i++) {
//       summaryBody += body[i];
//       if(summaryBody.length > 40) {
//         summaryBody = summaryBody.substring(0,37) + "...";
//         break;
//       }
//     }
    
//     // console.log("resizedFileArr : "+JSON.stringify(resizedFileArr))

//     await uploadDiary({
//       variables:{
//         title,
//         fileArr: resizedFileArr,
//         // 변수에 넣으니까 안받아져 걍 통으로 넣어
//         // body: convertedBody,
//         body: body.map(value=>value ?? ""),
//         // ...(getThumbNail && { thumbNail: convertedThumbNail }),
//         thumbNailArr,
//         isFirstVideo,
//         dateTime: todayDate,
//         youtubeId: youtubeIdRef.current,
//         requestMusic,
//         summaryBody: summaryBody.length === 0 ? null : summaryBody,
//       },
//     });
//   };

  
//   const uploadDiaryWithRequest = () => executeUploadDiary({
//     requestMusic: true,
//   });

//   const uploadDiaryWithoutRequest = () => executeUploadDiary({
//     requestMusic: false,
//   });

//   // 버튼 누르면 upload 실행. async 안써도 될듯 await 하나씩이라
//   const onPressUpload = () => {

//     if(title === "") return Alert.alert("제목을 입력해 주세요.");

//     const noFileAndBody = files.length === 0 && body.length === 1 && body[0] === "";

//     if(noFileAndBody) return Alert.alert("내용을 입력해 주세요.");

//     // 이걸 할 필요가 있을 지는 모르겠지만 걍 넣음.
//     if(files.length > MAX_FILE_NUMBER) return Alert.alert("10장 이상의 사진을 업로드 하실 수 없습니다.");

//     if(!youtubeIdRef.current) {

//       Alert.alert("음악 지정을 요청하시겠습니까?","운영자가 일기에 어울리는 음악을 직접 지정해줍니다.",[
//         {
//           text:"신청",
//           onPress: uploadDiaryWithRequest,
//         },
//         {
//           text:"신청 안함",
//           onPress: uploadDiaryWithoutRequest,
//         },
//         {
//           text:"돌아가기",
//         },
//       ]);
//     } else {
//       uploadDiaryWithoutRequest();
//     }
//   };

  
//   return {
//     loading,
//     onPressUpload,
//   };
// };

// export default useUploadDiaryMutation;