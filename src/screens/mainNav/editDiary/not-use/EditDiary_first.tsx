import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ReactNativeFile } from "apollo-upload-client";
import { CopiedFileInfo, FileInfo } from "../../../../types/upload/fileType";
import { colors } from "../../../../js-assets/color";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyDiaryListTabStackParamsList, NotificationTabStackParamsList } from "../../../../types/navigation/homeNavStackParamsList";
import androidGetThumbNail from "../../../../logic/upload/androidGetThumbNail";
import resizeImageNeedUriWidthHeight from "../../../../logic/upload/resizeImageNeedUriWidthHeight";
import compressImageVideoFile from "../../../../logic/upload/compressImageVideoFile";
import UploadGoBackBtn from "../../../../components/upload/UploadGoBackBtn";
import useMaterialTabGetInnerLayoutHeight from "../../../../hooks/useMaterialTabGetInnerLayoutHeight";
import ifMoveEndOfScreenThenAutoScroll from "../../../../logic/upload/not-use/ifMoveEndOfScreenThenAutoScroll";
import useRefInterval from "../../../../hooks/useRefInterval";
import useIsDarkMode from "../../../../hooks/useIsDarkMode";
import TitleInput from "../../../../components/upload/TitleInput";
import BodyInput from "../../../../components/upload/BodyInput";
import DiaryImageWithRealHeight from "../../../../components/upload/DiaryImageWithRealHeight";
import CanChangePositionFile from "../../../../components/upload/not-use/CanChangePositionFile";
import PlusPhotoBtn from "../../../../components/upload/PlusPhotoBtn";
import { editDiary, editDiaryVariables } from "../../../../__generated__/editDiary";

// const EDIT_DIARY = gql`
//   mutation editDiary(
//     $id:Int!
//     $title: String,
//     $body: JSON,
//     $thumbNail: Upload
//     $addFileArr: [Upload],
//     $addFileIndexArr: JSON,
//     $deleteFileArr: JSON,
//     $wholeFileArr: JSON,
//     $deletePrevThumbNail: Boolean,
//   ) {
//     editDiary(
//       id: $id,
//       title: $title, 
//       body: $body,
//       thumbNail: $thumbNail
//       addFileArr: $addFileArr
//       addFileIndexArr: $addFileIndexArr
//       deleteFileArr: $deleteFileArr
//       wholeFileArr: $wholeFileArr
//       deletePrevThumbNail: $deletePrevThumbNail
//     ) {
//       ok
//       error
//     }
//   }
// `;

const EditBtnText = styled.Text`
  color:${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const Input = styled.TextInput`
  padding: 20px 5px;
  line-height: 18px;
  color: ${props=>props.theme.textColor};
`;

// let scrollViewSetInterval:NodeJS.Timer;

type EditDiaryProps = NativeStackScreenProps<MyDiaryListTabStackParamsList|NotificationTabStackParamsList,"EditDiary">;


// UI 는 UploadDiary, 로직은 EditDiary 랑 거의 비슷
const EditDiary = ({navigation,route}:EditDiaryProps) => {

  // SharedStackNav 에 넣으면 안받아져서 여기에 넣음
  useEffect(()=>{
    navigation.setOptions({
      headerTitle:({tintColor}) => <PlusPhotoBtn
        tintColor={tintColor ?? ""}
        from="EditDiary"
      />,
    });
  },[]);

  // 사진 추가되면 route 사라지니까 state 로 넣어줌
  const routeParams = route.params;
  // const [diaryId,setDiaryId] = useState(routeParams.diaryId);
  // const [prevFiles,setPrevFiles] = useState(routeParams.fileInfoArr);
  // const [prevBody,setPrevBody] = useState(routeParams.body);
  // const [prevTitle,setPrevTitle] = useState(routeParams.title);
  const diaryId = useRef(routeParams.diaryId).current;
  const prevFiles = useRef(routeParams.fileInfoArr).current;
  const prevBody = useRef(routeParams.body).current;
  const prevTitle = useRef(routeParams.title).current;


  const [title,setTitle] = useState(routeParams.title ?? "");

  const [body,setBody] = useState(routeParams.body ?? []);

  // 지금은 TextInput 의 bottom 값 + 변화값 을 배열로 받음.
  //   [ [5241,], [5668, 5685,],] 머 이런 식
  const [componentPositionY,setComponentPositionY] = useState([]);
  
  // 지금은 라인 바뀌었을 때에 이전 줄의 텍스트 길이들만 받음.
  const [eachLineTextLength,setEachLineTextLength] = useState([]);

  const [nowChangingInputIndex,setNowChangingInputIndex] = useState(0);
  
  const [nowChangingFileIndex,setNowChangingFileIndex] = useState(0);
  
  const [opacityForAnimation,setOpacityForAnimation] = useState(false);

  const [files,setFiles] = useState<FileInfo[]>(routeParams.fileInfoArr);

  const [copiedFiles,setCopiedFiles] = useState<CopiedFileInfo[]>(()=>{
    const newCopiedFileArr = routeParams.fileInfoArr.map(data=>({
      ...data,
      animatedIndex:false,
    }));
    return newCopiedFileArr;
  });

  // console.log("files")
  // console.log(files)
  // console.log("copiedFiles")
  // console.log(copiedFiles)

  const [fileAddingPosition,setFileAddingPosition] = useState<{fileIndex:number,insertFront:boolean}>({
    fileIndex:0,
    insertFront:true,
  });

  useEffect(()=>{
    // const addedFiles:FileInfo[] | undefined = route.params?.file;
    // console.log("route.params.files");
    const addedFiles:FileInfo[] | undefined = route.params?.plusFiles;
    console.log("route.params.plusFiles");
    console.log(addedFiles);
    if(addedFiles) {
      const fileIndex = fileAddingPosition.fileIndex;
      const insertFront = fileAddingPosition.insertFront;
      setFiles(prev=>{
        if(prev.length === 0) return [...addedFiles];
        // 맞나?
        const inputFilesIndex = insertFront ? fileIndex : fileIndex + 1;
        const frontFileArr = prev.slice(0,inputFilesIndex);
        const endFileArr = prev.slice(inputFilesIndex,prev.length);
        return [...frontFileArr,...addedFiles,...endFileArr];
      });
      setCopiedFiles(prev=>{
        const withPropertyAddedFiles = addedFiles.map(fileInfo=>({
          ...fileInfo,
          animatedIndex:false,
        }));
        if(prev.length === 0) return [...withPropertyAddedFiles];
        // 맞나?
        const inputFilesIndex = insertFront ? fileIndex : fileIndex + 1;
        const frontFileArr = prev.slice(0,inputFilesIndex);
        const endFileArr = prev.slice(inputFilesIndex,prev.length);
        return [...frontFileArr,...withPropertyAddedFiles,...endFileArr];
      });
      setFileAddingPosition(prev=>({
        fileIndex: prev.fileIndex + addedFiles.length,
        insertFront: prev.insertFront,
      }));
      // TextInput 들도 다 바꿔
      setBody(prev=>{
        const inputEmptyStringIndex = fileIndex + 1;
        const frontFileArr = prev.slice(0,inputEmptyStringIndex);
        const endFileArr = prev.slice(inputEmptyStringIndex,prev.length);
        const emptyStringArr = new Array(addedFiles.length).fill("");
        return [...frontFileArr,...emptyStringArr,...endFileArr];
      });
    }
  },[route]);

  // mutation, 캐시 update 에서 쓰임
  let thumbNail:string|null = null;
  // let isFirstVideoForCache;
  let deletePrevThumbNail = false;

  const updateEditDiary:MutationUpdaterFunction<editDiary, editDiaryVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {
    const {data:{editDiary:{ok,error}}} = result;
    
    // 파일 업로드 오류시 에러메세지 보여줌
    if(!ok) {
      return Alert.alert(error,"같은 문제가 지속적으로 발생한다면 문의 주시면 감사드리겠습니다.")
    };

    const getOnlyUriFromArr = files.map(file=>file.uri);
    
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
        thumbNail(prev){
          if(thumbNail === null) {
            // 펫로그에 업로드하는 파일이 아예 없는 경우
            if(deletePrevThumbNail) {
              return null;
            // 이전과 thumbNail이 동일한 경우
            } else {
              return prev;
            }
          // thumbNail이 다른 파일로 변경된 경우
          } else {
            return thumbNail;
          }
        }
      }
    });


    //확인메세지
    Alert.alert("게시물이 수정되었습니다.");

    navigation.goBack();

  };

  const [editDiary,{loading}] = useMutation(EDIT_DIARY);

  console.log("loading")
  console.log(loading)

  const getChangeStatus = () => {
    // 순서 바뀐것도 반영. 사진 부분에 뭐든 변경사항 있는지 확인.
    const isFileChanged = JSON.stringify(files) !== JSON.stringify(prevFiles);
    const isTitleChanged = title !== prevTitle;
    const isBodyChanged = JSON.stringify(body) !== JSON.stringify(prevBody);
    
    const isNothingChanged = !isFileChanged && !isTitleChanged && !isBodyChanged;

    return {
      isFileChanged,
      isTitleChanged,
      isBodyChanged,
      isNothingChanged,
    };
  };

  const onPressEdit = async() => {
    console.log(1);
    if(title === "") {
      return Alert.alert("제목을 입력해 주세요.");
    }
    if(files.length === 0 && body.length === 1 && body[0] === "") {
      return Alert.alert("내용을 입력해 주세요.");
    }


    // // 순서 바뀐것도 반영. 사진 부분에 뭐든 변경사항 있는지 확인.
    // const isFileChanged = JSON.stringify(files) !== JSON.stringify(prevFiles);
    // const isTitleChanged = title !== prevTitle;
    // const isBodyChanged = JSON.stringify(body) !== JSON.stringify(prevBody);
    
    // const nothingChanged = !isFileChanged && !isTitleChanged && !isBodyChanged;

    // // 변경사항 없을 시 돌아감.
    // if(nothingChanged) {
    //   return navigation.goBack();
    // };
    const {
      isFileChanged,
      isTitleChanged,
      isBodyChanged,
      isNothingChanged,
    } = getChangeStatus();
    console.log(2);
    if(isNothingChanged) {
      return navigation.goBack();
    };

    const addFileBeforeConvertedArr:FileInfo[] = [];
    const addFileArr:ReactNativeFile[] = [];
    const addFileIndexArr:number[] = [];
    const wholeFileArr:string[] = [];

    let isFirstVideo;
    console.log(3);
    const isFirstFileChanged = files[0]?.uri !== prevFiles[0]?.uri;

    if(prevFiles.length !== 0 && isFirstFileChanged) {
      deletePrevThumbNail = true;
    } 
    console.log(4);
    // addFunctionArr 는 쓸 애는 아니고 그냥 로직 실행을 위한 애. foreach 는 안됨.
    const addFunctionArr = files.map((file,index)=>{
      const isNewPhoto = !prevFiles.some(prevFile => prevFile.uri === file.uri);
      if(isNewPhoto){
        if(index === 0){
          isFirstVideo = file.isVideo ? true : false;
          // isFirstVideoForCache = isFirstVideo;
        }
        addFileBeforeConvertedArr.push({
          uri: file.uri,
          isVideo: file.isVideo,
        });
        addFileIndexArr.push(index);
        wholeFileArr.push("");
      } else {
        wholeFileArr.push(file.uri);
      }
    });
    console.log(5);
    // 얘만 await 들어가서 addFunctionArr 밖으로 뺌.
    if(isFirstFileChanged) {
      if(isFirstVideo){
        thumbNail = files[0].thumbNail
          ??
          await androidGetThumbNail(files[0].uri);
      } else {
        thumbNail = files.length === 0 ? 
          null
        :
          await resizeImageNeedUriWidthHeight(files[0].uri,200,200);
      }
    }
    console.log(6);
    const deleteFileArr: string[] = [];
    // findDeletedFile 도 쓰는건 아니고 걍 로직을 위한 애
    const findDeletedFiles = prevFiles.map(prevFile=>{
      if (!(files.some(file=>file.uri === prevFile.uri))){
        deleteFileArr.push(prevFile.uri);
      };
    })
    console.log(7);
    // 업로드할 파일을 ReactNativeFile 로 만들어 주고 addFileArr 에 순서 맞게 넣음.
    const convertFileFn = addFileBeforeConvertedArr.map(async(file,index) => {
      console.log("convertFileFn 0");
      const uploadFileUri = await compressImageVideoFile(file);
      console.log("convertFileFn 1");
      const convertedFile = new ReactNativeFile({
        uri: uploadFileUri,
        name: `${index}.${file.isVideo ? "mp4" : "jpg"}`,
        type: file.isVideo ? "video/mp4" : "image/jpeg",
      });
      console.log("convertFileFn 2");
      addFileArr[index] = convertedFile;
      console.log("convertFileFn 3");
    });
    console.log(8);
    let convertedFirstVideoPhoto;
    
    if(thumbNail) {
      convertedFirstVideoPhoto = new ReactNativeFile({
        uri: thumbNail,
        name: "videoThumbNail.jpg",
        type: "image/jpeg",
      });
    }
    console.log(9);
    await Promise.all(convertFileFn);

    const isAddFile = addFileArr.length !== 0;
    const isDeleteFile = deleteFileArr.length !== 0;

    await editDiary({
      variables:{
        id:diaryId,
        ...(isAddFile && {
          // 얘는 쌍으로 가야해서 그냥 쌍으로 넣음
          addFileArr,
          addFileIndexArr
        }),
        ...(thumbNail && {thumbNail:convertedFirstVideoPhoto}),
        ...(isDeleteFile && {deleteFileArr}),
        ...(isFileChanged && {wholeFileArr}),
        ...(isTitleChanged && {title}),
        ...(isBodyChanged && {body}),
        ...(deletePrevThumbNail && {deletePrevThumbNail}),
      },
      update:updateEditDiary,
    });

  };

  useEffect(()=>{
    const isSomethingWrite = files.length !== 0 || !(body.length === 1 && body[0] === "") || title !== "";
    const { isNothingChanged } = getChangeStatus();

    navigation.setOptions({
      headerRight:({tintColor})=>(
        loading ? 
          <EditBtnText>업로드중..</EditBtnText>
        :
          <TouchableOpacity onPress={onPressEdit}>
            <EditBtnText>수정</EditBtnText>
          </TouchableOpacity>
      ),
      headerLeft:({tintColor}) => <UploadGoBackBtn
        tintColor={tintColor+""}
        whichComponent="EditDiary"
        alertCheck={isSomethingWrite && !isNothingChanged}
      />
    });
  },[body,files,title,loading]);

  const { width:windowWidth } = useWindowDimensions();

  const paddingLeftAndRight = 20;

  const imageWidth = windowWidth - paddingLeftAndRight;

  // UploadDiary 와 다르게 여기서만 필요해서 여기서 state 로 씀
  const [isPhotoTranslateActive,setIsPhotoTranslateActive] = useState(false);

  // useRef 안됨
  const [scrollViewMoveState,setScrollViewMoveState] = useState("");

  const { height:deviceHeight } = useWindowDimensions();

  // useRef 안됨
  const [nowScrollViewPosition,setNowScrollViewPosition] = useState(0);

  const scrollRef = useRef<ScrollView>();
  const keyboardAwareScrollRef = useRef<KeyboardAwareScrollView>();

  const scrollPositionSetFn = ({nativeEvent:{contentOffset:{y}}}) => {
    setNowScrollViewPosition(y);
    scrollRef.current.scrollTo({y,animated:false});
  };

  // useRef 로
  // const [canScrollDownHeight,setCanScrollDownHeight] = useState(0);
  const canScrollDownHeight = useRef(0);

  const innerLayoutHeight = useMaterialTabGetInnerLayoutHeight();

  const paddingTopAndBottom = 20;

  const onContentSizeChange = (w:number,h:number) => {
    // ScrollView padding 위아래 10씩 있어서 20 더함
    if(h) {
      // return setCanScrollDownHeight(h + paddingTopAndBottom - innerLayoutHeight);
      return canScrollDownHeight.current = h + paddingTopAndBottom - innerLayoutHeight;
    }
  };

  // useRef 안됨
  const [autoScrollMoveLength,setAutoScrollMoveLength] = useState(0);

  // useRef 로
  // const [dy,setDy] = useState(0);
  const nowDy = useRef(0);

  const delay = scrollViewMoveState === "" ? null : 50;

  // const ifMoveEndOfScreenThenAutoScroll = () => {
  //     setScrollViewMoveState(moveState => {
  //       setNowScrollViewPosition(scrollViewPosition => {
  //         // const isEndTopPosition = scrollViewPosition < 10;
  //         // let moveToPosition;
  //         // const isEndBottomPosition = scrollViewPosition > maxScrollDown;
  //         const isEndBottomPosition = scrollViewPosition > canScrollDownHeight.current;
  //         const isEndTopPosition = scrollViewPosition < 0;
  //         let toMoveLength;
  //         if(moveState === "fastUpPosition") {
  //           if(isEndTopPosition) {
  //             return scrollViewPosition;
  //           }
  //           toMoveLength = -10;
  //         } else if (moveState === "slowUpPosition") {
  //           if(isEndTopPosition) {
  //             return scrollViewPosition;
  //           }
  //           toMoveLength = -5;
  //         } else if (moveState === "fastDownPosition") {
  //           if(isEndBottomPosition) {
  //             return scrollViewPosition;
  //           }
  //           toMoveLength = 10
  //         } else if (moveState === "slowDownPosition") {
  //           if(isEndBottomPosition) {
  //             return scrollViewPosition;
  //           }
  //           toMoveLength = 5;
  //         }

  //         let moveToPosition = toMoveLength ? scrollViewPosition+toMoveLength : null;
      
  //         if(moveToPosition){
  //           scrollRef.current.scrollTo({y:moveToPosition});

  //           setAutoScrollMoveLength(prevAutoScrollHeight => {

  //             setNowChangingFileIndex(nowIndex =>{
  //             // setDy(nowDy => {
  //               setComponentPositionY(prevPositionYArr=>{
  //                 const inScrollViewPosition = prevAutoScrollHeight + nowDy.current;
  //                 return findPosition(inScrollViewPosition,prevPositionYArr,files[nowIndex].uri,setCopiedFiles,setBody);
  //               });
  //             //   return nowDy;
  //             // });
  //             return nowIndex;
  //           });

  //             return prevAutoScrollHeight + toMoveLength;
  //           });
  //         }

  //         return moveToPosition ?? scrollViewPosition;
  //       });
  //       return moveState;
  //     });


  //     // useRef 말고 useState 쓴 애. 문제 없으면 걍 지워
  //   // setCanScrollDownHeight(maxScrollDown => {
  //   //   setScrollViewMoveState(moveState => {
  //   //     setNowScrollViewPosition(scrollViewPosition => {
  //   //       // const isEndTopPosition = scrollViewPosition < 10;
  //   //       // let moveToPosition;
  //   //       // const isEndBottomPosition = scrollViewPosition > maxScrollDown;
  //   //       const isEndBottomPosition = scrollViewPosition > maxScrollDown;
  //   //       const isEndTopPosition = scrollViewPosition < 0;
  //   //       let toMoveLength;
  //   //       // let moveToPosition;
  //   //       if(moveState === "fastUpPosition") {
  //   //         if(isEndTopPosition) {
  //   //           return scrollViewPosition;
  //   //         }
  //   //         // moveToPosition = scrollViewPosition-10;
  //   //         toMoveLength = -10;
  //   //       } else if (moveState === "slowUpPosition") {
  //   //         if(isEndTopPosition) {
  //   //           return scrollViewPosition;
  //   //         }
  //   //         // moveToPosition = scrollViewPosition-5;
  //   //         toMoveLength = -5;
  //   //       } else if (moveState === "fastDownPosition") {
  //   //         if(isEndBottomPosition) {
  //   //           return scrollViewPosition;
  //   //         }
  //   //         // moveToPosition = scrollViewPosition+10;
  //   //         toMoveLength = 10
  //   //       } else if (moveState === "slowDownPosition") {
  //   //         if(isEndBottomPosition) {
  //   //           return scrollViewPosition;
  //   //         }
  //   //         // moveToPosition = scrollViewPosition+5;
  //   //         toMoveLength = 5;
  //   //       }

  //   //       let moveToPosition = toMoveLength ? scrollViewPosition+toMoveLength : null;
      
  //   //       if(moveToPosition){
  //   //         scrollRef.current.scrollTo({y:moveToPosition});

  //   //         setAutoScrollMoveLength(prevAutoScrollHeight => {

  //   //           setNowChangingFileIndex(nowIndex =>{
  //   //           setDy(nowDy => {
  //   //             setComponentPositionY(prevPositionYArr=>{
  //   //               const inScrollViewPosition = prevAutoScrollHeight + nowDy;
  //   //               return findPosition(inScrollViewPosition,prevPositionYArr,files[nowIndex].uri,setCopiedFiles,setBody);
  //   //             });
  //   //             return nowDy;
  //   //           });
  //   //           return nowIndex;
  //   //         });

  //   //           return prevAutoScrollHeight + toMoveLength;
  //   //         });
  //   //       }

  //   //       return moveToPosition ?? scrollViewPosition;
  //   //     });
  //   //     return moveState;
  //   //   });
  //   //   return maxScrollDown;
  //   // });
  // };

  const ifMoveEndOfScreenThenAutoScrollFn = () => ifMoveEndOfScreenThenAutoScroll(
    setScrollViewMoveState,
    setNowScrollViewPosition,
    canScrollDownHeight,
    scrollRef,
    setAutoScrollMoveLength,
    setNowChangingFileIndex,
    setComponentPositionY,
    nowDy,
    // files,
    setFiles,
    setCopiedFiles,
    setBody
  );
  
  useRefInterval(ifMoveEndOfScreenThenAutoScrollFn,delay);


  const bodyInputPropsArr = {
    value:body,
    setValue:setBody,
    setFileAddingPosition,
    setEachLineTextLength,
    nowChangingInputIndex,
    setNowChangingInputIndex,
    setComponentPositionY,
    opacityForAnimation,
  };
  
  const canChangePositionFilePropsArr = {
    setBody,
    imageWidth,
    setFiles,
    setIsPhotoTranslateActive,
    setComponentPositionY,
    setOpacityForAnimation,
    setCopiedFiles,
    setNowChangingFileIndex,
    setFileAddingPosition,
    setScrollViewMoveState,
    deviceHeight,
    setAutoScrollMoveLength,
    setNowScrollViewPosition,
    // setDy,
    nowDy,
    keyboardAwareScrollRef,
    scrollRef,
  };

  const isDarkMode = useIsDarkMode();


  return (
    <View 
      style={{
        position: "relative",
        backgroundColor: isDarkMode ? "black" : "white",
        flex: 1,
      }}
    >
      {/* {keyboardAwareScrollRef.current &&  */}
      <ScrollView
        style={{
          padding: 10,
          // backgroundColor: "rgba(200,200,0,0.3)",
          position: "absolute",
          // absolute 일때 top bottom 을 넣어야 스크롤이 됨. 왠진 모름
          top: 0,
          bottom: 0,
        }}
        scrollEnabled={false}
        ref={scrollRef}
        // scrollView 움직이게 할라고 넣음. 이게 문제 생길수도 있다하니 문제 있으면 얘 확인
        disableScrollViewPanResponder={true}
      >
        <View
          style={{
            // 
            opacity: opacityForAnimation ? 1 : 0,
            // 
          }}
        >
          <TitleInput
            value={title}
            setValue={setTitle}
          />
          <BodyInput
            inputIndex={0}
            {...bodyInputPropsArr}
          />
          {copiedFiles.length > 0 && copiedFiles.map((file,index) => {
            const uri = file.uri;
            const animatedIndex = file.animatedIndex;
            const isEditingFile = file.isEditingFile;
            const thumbNail = file.thumbNail;
            return (
              <React.Fragment
                key={uri}
              >
                {isEditingFile ?
                  <DiaryImageWithRealHeight
                    uri={thumbNail ?? uri}
                    fileWidth={imageWidth}
                    imageStyle={{
                      borderColor : animatedIndex ? "orange" : "grey",
                      borderWidth: 5,
                      opacity: animatedIndex ? 1 : 0.4,
                    }}
                  />
                :
                  animatedIndex ?
                    <View
                      style={{
                        height: 4,
                        width: "100%",
                        backgroundColor: "orange",
                      }}
                    />
                  :
                    <DiaryImageWithRealHeight
                      uri={uri}
                      fileWidth={imageWidth}
                      thumbNail={thumbNail}
                    />
                }
                
                <Input
                  value={body[(index+1)]}
                  placeholder="본문"
                  // autoCapitalize="none"
                  // autoCorrect={false}
                  // placeholderTextColor={placeholderTextColor}
                  multiline={true}
                />
              </React.Fragment>
            )}
          )}
        </View>
      </ScrollView>
      {/* } */}
      <KeyboardAwareScrollView
        style={{
          padding: 10,

          // opacity: 0.5,

        }}
        // onScroll={onScroll}
        onContentSizeChange={onContentSizeChange}
        scrollEnabled={!isPhotoTranslateActive}
        onScrollBeginDrag={scrollPositionSetFn}
        onScrollEndDrag={scrollPositionSetFn}
        onMomentumScrollBegin={scrollPositionSetFn}
        onMomentumScrollEnd={scrollPositionSetFn}
        ref={keyboardAwareScrollRef}
        // disableScrollViewPanResponder={true}
      >
        <TitleInput
          value={title}
          setValue={setTitle}
          opacityForAnimation={opacityForAnimation}
        />
        <BodyInput
          inputIndex={0}
          {...bodyInputPropsArr}
        />
        {files.length > 0 && files.map((file,index) =>
          <React.Fragment
            key={file.uri}
          >
            <CanChangePositionFile
              file={file}
              fileIndex={index}
              fileOpacityForAnimation={opacityForAnimation && nowChangingFileIndex !== index}
              {...canChangePositionFilePropsArr}
            />
            <BodyInput
              inputIndex={index+1}
              {...bodyInputPropsArr}
            />
          </React.Fragment>
        )}
      </KeyboardAwareScrollView>
      
    </View>
  );
};

export default EditDiary;


    // 
    // <KeyboardAwareScrollView
    // // <ScrollView
    //   style={{
    //     padding: 10,
    //     backgroundColor: isDarkMode ? "black" : "white",
    //     position: "relative",
    //   }}
    //   scrollEnabled={!isPhotoTranslateActive}
    //   onMomentumScrollEnd={onMomentumScrollEnd}
    //   ref={scrollRef}
    //   // scrollView 움직이게 할라고 넣음. 이게 문제 생길수도 있다하니 문제 있으면 얘 확인
    //   disableScrollViewPanResponder={true}
    // >
    //   <TitleInput
    //     value={title}
    //     setValue={setTitle}
    //     opacityForAnimation={opacityForAnimation}
    //   />
    //   <BodyInput
    //     inputIndex={0}
    //     {...bodyInputPropsArr}
    //   />
    //   {files.length > 0 && files.map((file,index) =>
    //     <React.Fragment
    //       key={file.uri}
    //     >
    //       <CanChangePositionFile
    //         file={file}
    //         fileIndex={index}
    //         fileOpacityForAnimation={opacityForAnimation && nowChangingFileIndex !== index}
    //         deviceHeight={deviceHeight}
    //         setNowScrollViewPosition={setNowScrollViewPosition}
    //         // setScrollViewMoveState={setScrollViewMoveState}
    //         scrollRef={scrollRef}
    //         {...canChangePositionFilePropsArr}
    //       />
    //       <BodyInput
    //         inputIndex={index+1}
    //         {...bodyInputPropsArr}
    //       />
    //     </React.Fragment>
    //   )}

    //   {/* 애니메이션을 위해 겹쳐놓음. 이걸 상황따라 불러오니까 버퍼링있음. 걍 opacity 주는게 나을듯 */}
    //   <View
    //     style={{
    //       position: "absolute",
    //       opacity: opacityForAnimation ? 1 : 0,
    //     }}
    //   >
    //     <TitleInput
    //       value={title}
    //       setValue={setTitle}
    //     />
    //     <BodyInput
    //       inputIndex={0}
    //       {...bodyInputPropsArr}
    //     />
    //     {copiedFiles.length > 0 && copiedFiles.map((file,index) => {
    //       const uri = file.uri;
    //       const animatedIndex = file.animatedIndex;
    //       const isEditingFile = file.isEditingFile;
    //       const thumbNail = file.thumbNail;
    //       return (
    //         <React.Fragment
    //           key={uri}
    //         >
    //           {isEditingFile ?
    //             <DiaryImageWithRealHeight
    //               uri={thumbNail ?? uri}
    //               fileWidth={imageWidth}
    //               imageStyle={{
    //                 borderColor : animatedIndex ? "orange" : "grey",
    //                 borderWidth: 5,
    //                 opacity: animatedIndex ? 1 : 0.4,
    //               }}
    //             />
    //           :
    //             animatedIndex ?
    //               <View
    //                 style={{
    //                   height: 4,
    //                   width: "100%",
    //                   backgroundColor: "orange",
    //                 }}
    //               />
    //             :
    //               <DiaryImageWithRealHeight
    //                 uri={uri}
    //                 fileWidth={imageWidth}
    //                 thumbNail={thumbNail}
    //               />
    //           }
              
    //           <Input
    //             value={body[(index+1)]}
    //             placeholder="본문"
    //             // autoCapitalize="none"
    //             // autoCorrect={false}
    //             // placeholderTextColor={placeholderTextColor}
    //             multiline={true}
    //           />
    //         </React.Fragment>
    //       )}
    //     )}
    //   </View>
    // </KeyboardAwareScrollView>
    // // </ScrollView>