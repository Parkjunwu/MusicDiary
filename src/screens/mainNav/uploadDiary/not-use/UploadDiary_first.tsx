import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from "@react-navigation/native";
import UploadGoBackBtn from "../../../../components/upload/UploadGoBackBtn";
import useMaterialTabGetInnerLayoutHeight from "../../../../hooks/useMaterialTabGetInnerLayoutHeight";
import ifMoveEndOfScreenThenAutoScroll from "../../../../logic/upload/not-use/ifMoveEndOfScreenThenAutoScroll";
import useRefInterval from "../../../../hooks/useRefInterval";
import TitleInput from "../../../../components/upload/TitleInput";
import BodyInput from "../../../../components/upload/BodyInput";
import CanChangePositionFile from "../../../../components/upload/not-use/CanChangePositionFile";
import DiaryImageWithRealHeight from "../../../../components/upload/DiaryImageWithRealHeight";
import { colors } from "../../../../js-assets/color";
import { UploadDiaryShareType } from "../../../../types/upload/uploadDiaryShareType";
import { CopiedFileInfo, FileInfo } from "../../../../types/upload/fileType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UploadDiaryTabStackParamsList } from "../../../../types/navigation/homeNavStackParamsList";
import MusicState from "../../../../components/youtubeRelated/uploadOrEdit/MusicState";
import useSetYoutubeStateNeedRoute from "../../../../hooks/uploadDiary/useSetYoutubeStateNeedRoute";
import useUploadDiaryMutation from "../../../../hooks/uploadDiary/useUploadDiaryMutation";
import useBackgroundColorAndTextColor from "../../../../hooks/useBackgroundColorAndTextColor";

const UploadBtnText = styled.Text`
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

type UploadDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"UploadDiary">;

// isPhotoTranslateActive,setIsPhotoTranslateActive ??? UploadNav >  UploadDiary ??? ???????????? AddedImageWithTextInput ?????? ???. ???????????? ??? ???????????? ??????
const UploadDiary = ({isPhotoTranslateActive,setIsPhotoTranslateActive}:UploadDiaryShareType) => {

  const route = useRoute<UploadDiaryProps["route"]>();
  const navigation = useNavigation<UploadDiaryProps["navigation"]>();

  const [title,setTitle] = useState("");

  
  const [body,setBody] = useState([""]);

  // ????????? TextInput ??? bottom ??? + ????????? ??? ????????? ??????.
  //   [ [5241,], [5668, 5685,],] ??? ?????? ???
  const [componentPositionY,setComponentPositionY] = useState([]);
  // console.log("componentPositionY")
  // console.log(componentPositionY)
  // ????????? ?????? ???????????? ?????? ?????? ?????? ????????? ???????????? ??????.
  const [eachLineTextLength,setEachLineTextLength] = useState([]);

  const [nowChangingInputIndex,setNowChangingInputIndex] = useState(0);
  
  const [nowChangingFileIndex,setNowChangingFileIndex] = useState(0);
  
  const [opacityForAnimation,setOpacityForAnimation] = useState(false);

  // const [files,setFiles] = useState<FileInfo[]>(DiaryMockData.map(data=>({uri:data.titleImage,isVideo:false})));
  const [files,setFiles] = useState<FileInfo[]>([]);

  // const [copiedFiles,setCopiedFiles] = useState<CopiedFileInfo[]>(DiaryMockData.map(data=>({ uri:data.titleImage, animatedIndex:false ,isVideo:false })));
  const [copiedFiles,setCopiedFiles] = useState<CopiedFileInfo[]>([]);

  // console.log("files")
  // console.log(files)
  // console.log("copiedFiles")
  // console.log(copiedFiles)

  const [fileAddingPosition,setFileAddingPosition] = useState<{fileIndex:number,insertFront:boolean}>({
    fileIndex:0,
    insertFront:true,
  });

  useEffect(()=>{
    // const addedFiles:FileInfo[] = route.params?.files;
    // const addedFiles:FileInfo[]|undefined = route.params?.file;
    // console.log("route.params.files");
    const addedFiles:FileInfo[]|undefined = route.params?.plusFiles;
    console.log("route.params.plusFiles");
    console.log(addedFiles);
    if(addedFiles) {
      const fileIndex = fileAddingPosition.fileIndex;
      const insertFront = fileAddingPosition.insertFront;
      // console.log("fileIndex")
      // console.log(fileIndex)
      // console.log("insertFront")
      // console.log(insertFront)
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
        // ?????? ????????? ???????????? ????????? ?????????. ?????? ?????????
        // const indexString = prev[inputIndex];
        // const prevStringLength = indexString.length;
        // const frontString = indexString.substring(0,prevStringLength);
        // const behindString = indexString.substring(prevStringLength,prevStringLength);
        // const newArr = [];
        // for(let i=0;i<inputIndex;i++){
        //   newArr[i] = prev[i];
        // }
        // newArr[inputIndex] = frontString;
        // newArr[inputIndex+1] = behindString;
        // const prevStringArrLength = prev.length;
        // for(let i=inputIndex+2;i<prevStringArrLength;i++){
        //   newArr[i] = prev[i-1];
        // }
        // return newArr;
      });
    }
  },[route]);

  // music ?????? ????????? ??????
  const {
    youtubeTitle,
    youtubeIdRef,
    deleteMusic,
  } = useSetYoutubeStateNeedRoute(route);

  // mutation
  const { loading, onPressUpload } = useUploadDiaryMutation({
    files,
    title,
    body,
    youtubeIdRef,
  });

  useEffect(()=>{
    const isSomethingWrite = files.length !== 0 || !(body.length === 1 && body[0] === "") || title !== "";
    navigation.setOptions({
      headerRight:({tintColor})=>(
        loading ?
          <UploadBtnText>????????????..</UploadBtnText>
        :
          <TouchableOpacity onPress={onPressUpload}>
            <UploadBtnText>?????????</UploadBtnText>
          </TouchableOpacity>
      ),
      headerLeft:({tintColor}) => <UploadGoBackBtn tintColor={tintColor+""} whichComponent="UploadDiary" alertCheck={isSomethingWrite} />
    });
  },[body,files,title,loading]);

  const { width:windowWidth } = useWindowDimensions();

  const imageWidth = windowWidth - 20;



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

  const { backgroundColor } = useBackgroundColorAndTextColor();

  return (
    <View 
      style={{
        position: "relative",
        backgroundColor,
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

          {/* ?????? */}
          <MusicState
            youtubeId={youtubeIdRef.current}
            // youtubeId={youtubeId}
            youtubeTitle={youtubeTitle}
          />
          {/* ?????? */}

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
                // <TextInput
                //   style={{
                //     paddingVertical: 20,
                //     paddingHorizontal: 5,
                //     lineHeight: 18,
                //     color: textColor,
                //   }}
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

        {/* ?????? */}
        <MusicState
          youtubeId={youtubeIdRef.current}
          // youtubeId={youtubeId}
          youtubeTitle={youtubeTitle}
          deleteMusic={deleteMusic}
        />
        {/* ?????? */}

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
  
export default UploadDiary;


  
  //   const bodyInputPropsArr = {
  //     value:body,
  //     setValue:setBody,
  //     setFileAddingPosition,
  //     setEachLineTextLength,
  //     nowChangingInputIndex,
  //     setNowChangingInputIndex,
  //     setComponentPositionY,
  //     opacityForAnimation,
  //   };
    
  //   const canChangePositionFilePropsArr = {
  //     setBody,
  //     imageWidth,
  //     setFiles,
  //     setIsPhotoTranslateActive,
  //     setComponentPositionY,
  //     setOpacityForAnimation,
  //     setCopiedFiles,
  //     setNowChangingFileIndex,
  //     setFileAddingPosition,
  //   };
  
  //   const isDarkMode = useIsDarkMode();
  
  
  //   return (
  //     <KeyboardAwareScrollView
  //       style={{
  //         padding: 10,
  //         backgroundColor: isDarkMode ? "black" : "white",
  //         position: "relative",
  //       }}
  //       scrollEnabled={!isPhotoTranslateActive}
  //     >
  //       <TitleInput
  //         value={title}
  //         setValue={setTitle}
  //         opacityForAnimation={opacityForAnimation}
  //       />
  //       <BodyInput
  //         inputIndex={0}
  //         {...bodyInputPropsArr}
  //       />
  //       {files.length > 0 && files.map((file,index) =>
  //         <React.Fragment
  //           key={file.uri}
  //         >
  //           <CanChangePositionFile
  //             file={file}
  //             fileIndex={index}
  //             fileOpacityForAnimation={opacityForAnimation && nowChangingFileIndex !== index}
  //             {...canChangePositionFilePropsArr}
  //           />
  //           <BodyInput
  //             inputIndex={index+1}
  //             {...bodyInputPropsArr}
  //           />
  //         </React.Fragment>
  //       )}
  
  //       {/* ?????????????????? ?????? ????????????. ?????? ???????????? ??????????????? ???????????????. ??? opacity ????????? ????????? */}
  //       {<View
  //         style={{
  //           position: "absolute",
  //           opacity: opacityForAnimation ? 1 : 0,
  //         }}
  //       >
  //         <TitleInput
  //           value={title}
  //           setValue={setTitle}
  //         />
  //         <BodyInput
  //           inputIndex={0}
  //           {...bodyInputPropsArr}
  //         />
  //         {copiedFiles.length > 0 && copiedFiles.map((file,index) => {
  //           const uri = file.uri;
  //           const animatedIndex = file.animatedIndex;
  //           const isEditingFile = file.isEditingFile;
  //           const thumbNail = file.thumbNail;
  //           return (
  //             <React.Fragment
  //               key={uri}
  //             >
  //               {isEditingFile ?
  //                 <DiaryImageWithRealHeight
  //                   uri={thumbNail ?? uri}
  //                   fileWidth={imageWidth}
  //                   imageStyle={{
  //                     borderColor : animatedIndex ? "orange" : "grey",
  //                     borderWidth: 5,
  //                     opacity: animatedIndex ? 1 : 0.4,
  //                   }}
  //                 />
  //               :
  //                 animatedIndex ?
  //                   <View
  //                     style={{
  //                       height: 4,
  //                       width: "100%",
  //                       backgroundColor: "orange",
  //                     }}
  //                   />
  //                 :
  //                   <DiaryImageWithRealHeight
  //                     uri={uri}
  //                     fileWidth={imageWidth}
  //                     thumbNail={thumbNail}
  //                   />
  //               }
                
  //               <Input
  //                 value={body[(index+1)]}
  //                 placeholder="??????"
  //                 // autoCapitalize="none"
  //                 // autoCorrect={false}
  //                 // placeholderTextColor={placeholderTextColor}
  //                 multiline={true}
  //               />
  //             </React.Fragment>
  //           )}
  //         )}
  //       </View>}
  //     </KeyboardAwareScrollView>
  //   );
  // };