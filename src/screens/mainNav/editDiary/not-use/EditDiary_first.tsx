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


// UI ??? UploadDiary, ????????? EditDiary ??? ?????? ??????
const EditDiary = ({navigation,route}:EditDiaryProps) => {

  // SharedStackNav ??? ????????? ??????????????? ????????? ??????
  useEffect(()=>{
    navigation.setOptions({
      headerTitle:({tintColor}) => <PlusPhotoBtn
        tintColor={tintColor ?? ""}
        from="EditDiary"
      />,
    });
  },[]);

  // ?????? ???????????? route ??????????????? state ??? ?????????
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

  // ????????? TextInput ??? bottom ??? + ????????? ??? ????????? ??????.
  //   [ [5241,], [5668, 5685,],] ??? ?????? ???
  const [componentPositionY,setComponentPositionY] = useState([]);
  
  // ????????? ?????? ???????????? ?????? ?????? ?????? ????????? ???????????? ??????.
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
        // ???????
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
        // ???????
        const inputFilesIndex = insertFront ? fileIndex : fileIndex + 1;
        const frontFileArr = prev.slice(0,inputFilesIndex);
        const endFileArr = prev.slice(inputFilesIndex,prev.length);
        return [...frontFileArr,...withPropertyAddedFiles,...endFileArr];
      });
      setFileAddingPosition(prev=>({
        fileIndex: prev.fileIndex + addedFiles.length,
        insertFront: prev.insertFront,
      }));
      // TextInput ?????? ??? ??????
      setBody(prev=>{
        const inputEmptyStringIndex = fileIndex + 1;
        const frontFileArr = prev.slice(0,inputEmptyStringIndex);
        const endFileArr = prev.slice(inputEmptyStringIndex,prev.length);
        const emptyStringArr = new Array(addedFiles.length).fill("");
        return [...frontFileArr,...emptyStringArr,...endFileArr];
      });
    }
  },[route]);

  // mutation, ?????? update ?????? ??????
  let thumbNail:string|null = null;
  // let isFirstVideoForCache;
  let deletePrevThumbNail = false;

  const updateEditDiary:MutationUpdaterFunction<editDiary, editDiaryVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {
    const {data:{editDiary:{ok,error}}} = result;
    
    // ?????? ????????? ????????? ??????????????? ?????????
    if(!ok) {
      return Alert.alert(error,"?????? ????????? ??????????????? ??????????????? ?????? ????????? ????????????????????????.")
    };

    const getOnlyUriFromArr = files.map(file=>file.uri);
    
    // ?????? ??????
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
            // ???????????? ??????????????? ????????? ?????? ?????? ??????
            if(deletePrevThumbNail) {
              return null;
            // ????????? thumbNail??? ????????? ??????
            } else {
              return prev;
            }
          // thumbNail??? ?????? ????????? ????????? ??????
          } else {
            return thumbNail;
          }
        }
      }
    });


    //???????????????
    Alert.alert("???????????? ?????????????????????.");

    navigation.goBack();

  };

  const [editDiary,{loading}] = useMutation(EDIT_DIARY);

  console.log("loading")
  console.log(loading)

  const getChangeStatus = () => {
    // ?????? ???????????? ??????. ?????? ????????? ?????? ???????????? ????????? ??????.
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
      return Alert.alert("????????? ????????? ?????????.");
    }
    if(files.length === 0 && body.length === 1 && body[0] === "") {
      return Alert.alert("????????? ????????? ?????????.");
    }


    // // ?????? ???????????? ??????. ?????? ????????? ?????? ???????????? ????????? ??????.
    // const isFileChanged = JSON.stringify(files) !== JSON.stringify(prevFiles);
    // const isTitleChanged = title !== prevTitle;
    // const isBodyChanged = JSON.stringify(body) !== JSON.stringify(prevBody);
    
    // const nothingChanged = !isFileChanged && !isTitleChanged && !isBodyChanged;

    // // ???????????? ?????? ??? ?????????.
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
    // addFunctionArr ??? ??? ?????? ????????? ?????? ?????? ????????? ?????? ???. foreach ??? ??????.
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
    // ?????? await ???????????? addFunctionArr ????????? ???.
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
    // findDeletedFile ??? ????????? ????????? ??? ????????? ?????? ???
    const findDeletedFiles = prevFiles.map(prevFile=>{
      if (!(files.some(file=>file.uri === prevFile.uri))){
        deleteFileArr.push(prevFile.uri);
      };
    })
    console.log(7);
    // ???????????? ????????? ReactNativeFile ??? ????????? ?????? addFileArr ??? ?????? ?????? ??????.
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
          // ?????? ????????? ???????????? ?????? ????????? ??????
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
          <EditBtnText>????????????..</EditBtnText>
        :
          <TouchableOpacity onPress={onPressEdit}>
            <EditBtnText>??????</EditBtnText>
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

  // UploadDiary ??? ????????? ???????????? ???????????? ????????? state ??? ???
  const [isPhotoTranslateActive,setIsPhotoTranslateActive] = useState(false);

  // useRef ??????
  const [scrollViewMoveState,setScrollViewMoveState] = useState("");

  const { height:deviceHeight } = useWindowDimensions();

  // useRef ??????
  const [nowScrollViewPosition,setNowScrollViewPosition] = useState(0);

  const scrollRef = useRef<ScrollView>();
  const keyboardAwareScrollRef = useRef<KeyboardAwareScrollView>();

  const scrollPositionSetFn = ({nativeEvent:{contentOffset:{y}}}) => {
    setNowScrollViewPosition(y);
    scrollRef.current.scrollTo({y,animated:false});
  };

  // useRef ???
  // const [canScrollDownHeight,setCanScrollDownHeight] = useState(0);
  const canScrollDownHeight = useRef(0);

  const innerLayoutHeight = useMaterialTabGetInnerLayoutHeight();

  const paddingTopAndBottom = 20;

  const onContentSizeChange = (w:number,h:number) => {
    // ScrollView padding ????????? 10??? ????????? 20 ??????
    if(h) {
      // return setCanScrollDownHeight(h + paddingTopAndBottom - innerLayoutHeight);
      return canScrollDownHeight.current = h + paddingTopAndBottom - innerLayoutHeight;
    }
  };

  // useRef ??????
  const [autoScrollMoveLength,setAutoScrollMoveLength] = useState(0);

  // useRef ???
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


  //     // useRef ?????? useState ??? ???. ?????? ????????? ??? ??????
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
          // absolute ?????? top bottom ??? ????????? ???????????? ???. ?????? ??????
          top: 0,
          bottom: 0,
        }}
        scrollEnabled={false}
        ref={scrollRef}
        // scrollView ???????????? ????????? ??????. ?????? ?????? ???????????? ???????????? ?????? ????????? ??? ??????
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
                  placeholder="??????"
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
    //   // scrollView ???????????? ????????? ??????. ?????? ?????? ???????????? ???????????? ?????? ????????? ??? ??????
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

    //   {/* ?????????????????? ?????? ????????????. ?????? ???????????? ??????????????? ???????????????. ??? opacity ????????? ????????? */}
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
    //             placeholder="??????"
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