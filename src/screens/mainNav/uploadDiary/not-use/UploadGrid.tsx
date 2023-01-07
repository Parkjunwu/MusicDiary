import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity, useWindowDimensions, View } from "react-native";
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
import DraggableGridView from "../../../../components/upload/DraggableGridView";

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
  background-color: red;
`;

type UploadDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"UploadDiary">;

// https://github.com/5up-okamura/react-native-draggable-gridview/blob/master/src/index.tsx 보고 만들었으나 textInput 의 높이를 지정하기 빡세서 걍 지금 있는애 씀.

// isPhotoTranslateActive,setIsPhotoTranslateActive 이 UploadNav >  UploadDiary 로 들어와서 AddedImageWithTextInput 까지 감. 헷갈리면 걍 전역으로 빼자
const UploadDiary = ({isPhotoTranslateActive,setIsPhotoTranslateActive}:UploadDiaryShareType) => {

  const route = useRoute<UploadDiaryProps["route"]>();
  const navigation = useNavigation<UploadDiaryProps["navigation"]>();

  const [title,setTitle] = useState("");

  
  const [body,setBody] = useState([""]);

  // 지금은 TextInput 의 bottom 값 + 변화값 을 배열로 받음.
  //   [ [5241,], [5668, 5685,],] 머 이런 식
  // const [componentPositionY,setComponentPositionY] = useState([]);
  // // console.log("componentPositionY")
  // // console.log(componentPositionY)
  // // 지금은 라인 바뀌었을 때에 이전 줄의 텍스트 길이들만 받음.
  // const [eachLineTextLength,setEachLineTextLength] = useState([]);

  // const [nowChangingInputIndex,setNowChangingInputIndex] = useState(0);
  
  // const [nowChangingFileIndex,setNowChangingFileIndex] = useState(0);
  
  // const [opacityForAnimation,setOpacityForAnimation] = useState(false);

  // const [files,setFiles] = useState<FileInfo[]>(DiaryMockData.map(data=>({uri:data.titleImage,isVideo:false})));
  const [files,setFiles] = useState<FileInfo[]>([]);

  // const [copiedFiles,setCopiedFiles] = useState<CopiedFileInfo[]>(DiaryMockData.map(data=>({ uri:data.titleImage, animatedIndex:false ,isVideo:false })));
  // const [copiedFiles,setCopiedFiles] = useState<CopiedFileInfo[]>([]);

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
        // 맞나?
        const inputFilesIndex = insertFront ? fileIndex : fileIndex + 1;
        const frontFileArr = prev.slice(0,inputFilesIndex);
        const endFileArr = prev.slice(inputFilesIndex,prev.length);
        return [...frontFileArr,...addedFiles,...endFileArr];
      });
      // setCopiedFiles(prev=>{
      //   const withPropertyAddedFiles = addedFiles.map(fileInfo=>({
      //     ...fileInfo,
      //     animatedIndex:false,
      //   }));
      //   if(prev.length === 0) return [...withPropertyAddedFiles];
      //   // 맞나?
      //   const inputFilesIndex = insertFront ? fileIndex : fileIndex + 1;
      //   const frontFileArr = prev.slice(0,inputFilesIndex);
      //   const endFileArr = prev.slice(inputFilesIndex,prev.length);
      //   return [...frontFileArr,...withPropertyAddedFiles,...endFileArr];
      // });
      // setFileAddingPosition(prev=>({
      //   fileIndex: prev.fileIndex + addedFiles.length,
      //   insertFront: prev.insertFront,
      // }));
      // TextInput 들도 다 바꿔
      setBody(prev=>{
        const inputEmptyStringIndex = fileIndex + 1;
        const frontFileArr = prev.slice(0,inputEmptyStringIndex);
        const endFileArr = prev.slice(inputEmptyStringIndex,prev.length);
        const emptyStringArr = new Array(addedFiles.length).fill("");
        return [...frontFileArr,...emptyStringArr,...endFileArr];
        // 이건 텍스트 어딨는지 받아서 넣는거. 근데 못쓸듯
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

  // music 위해 추가한 부분
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
          <UploadBtnText>업로드중..</UploadBtnText>
        :
          <TouchableOpacity onPress={onPressUpload}>
            <UploadBtnText>업로드</UploadBtnText>
          </TouchableOpacity>
      ),
      headerLeft:({tintColor}) => <UploadGoBackBtn tintColor={tintColor+""} whichComponent="UploadDiary" alertCheck={isSomethingWrite} />
    });
  },[body,files,title,loading]);

  // const { width:windowWidth } = useWindowDimensions();

  // const imageWidth = windowWidth - 20;



  // // useRef 안됨
  // const [scrollViewMoveState,setScrollViewMoveState] = useState("");

  // const { height:deviceHeight } = useWindowDimensions();

  // // useRef 안됨
  // const [nowScrollViewPosition,setNowScrollViewPosition] = useState(0);

  // const scrollRef = useRef<ScrollView>();
  // const keyboardAwareScrollRef = useRef<KeyboardAwareScrollView>();

  // const scrollPositionSetFn = ({nativeEvent:{contentOffset:{y}}}) => {
  //   setNowScrollViewPosition(y);
  //   scrollRef.current.scrollTo({y,animated:false});
  // };

  // useRef 로
  // const [canScrollDownHeight,setCanScrollDownHeight] = useState(0);
  // const canScrollDownHeight = useRef(0);
  
  // const innerLayoutHeight = useMaterialTabGetInnerLayoutHeight();

  // const paddingTopAndBottom = 20;

  // const onContentSizeChange = (w:number,h:number) => {
  //   // ScrollView padding 위아래 10씩 있어서 20 더함
  //   if(h) {
  //     // return setCanScrollDownHeight(h + paddingTopAndBottom - innerLayoutHeight);
  //     return canScrollDownHeight.current = h + paddingTopAndBottom - innerLayoutHeight;
  //   }
  // };

  // // useRef 안됨
  // const [autoScrollMoveLength,setAutoScrollMoveLength] = useState(0);

  // // useRef 로
  // // const [dy,setDy] = useState(0);
  // const nowDy = useRef(0);

  // const delay = scrollViewMoveState === "" ? null : 50;

  // const ifMoveEndOfScreenThenAutoScrollFn = () => ifMoveEndOfScreenThenAutoScroll(
  //   setScrollViewMoveState,
  //   setNowScrollViewPosition,
  //   canScrollDownHeight,
  //   scrollRef,
  //   setAutoScrollMoveLength,
  //   setNowChangingFileIndex,
  //   setComponentPositionY,
  //   nowDy,
  //   // files,
  //   setFiles,
  //   setCopiedFiles,
  //   setBody
  // );
  
  // useRefInterval(ifMoveEndOfScreenThenAutoScrollFn,delay);


  // const bodyInputPropsArr = {
  //   value:body,
  //   setValue:setBody,
  //   setFileAddingPosition,
  //   setEachLineTextLength,
  //   nowChangingInputIndex,
  //   setNowChangingInputIndex,
  //   setComponentPositionY,
  //   opacityForAnimation,
  // };
  
  // const canChangePositionFilePropsArr = {
  //   setBody,
  //   imageWidth,
  //   setFiles,
  //   setIsPhotoTranslateActive,
  //   setComponentPositionY,
  //   setOpacityForAnimation,
  //   setCopiedFiles,
  //   setNowChangingFileIndex,
  //   setFileAddingPosition,
  //   setScrollViewMoveState,
  //   deviceHeight,
  //   setAutoScrollMoveLength,
  //   setNowScrollViewPosition,
  //   // setDy,
  //   nowDy,
  //   keyboardAwareScrollRef,
  //   scrollRef,
  // };

  // const { backgroundColor } = useBackgroundColorAndTextColor();

  const [editing, setEditing] = useState(false)
  // const [data, setData] = useState<Data[]>(
  //   Array.from(new Array(14)).map((v, i) => newData(i))
  // )

  // const onPressEdit = useCallback(() => {
  //   setEditing(!editing)
  // }, [editing])

  const { width:windowWidth } = useWindowDimensions();

  const imageWidth = windowWidth - 20;

  // const locked = useCallback((item) => item == '+', [])

  const renderLockedItem = useCallback(
    (item: any, index: number) => <Input
        value={body[(index+1)]}
        placeholder="본문"
        multiline={true}
      />,
    [editing, body]
  )

  const renderItem = useCallback(
    (file: any, index?: number | undefined) => {
      const uri = file.uri;
      const thumbNail = file.thumbNail;
      return(
        // <DiaryImageWithRealHeight
        //   uri={thumbNail ?? file}
        //   fileWidth={imageWidth}
        //   thumbNail={thumbNail}
        // />
        <Image
          style={{
            width: imageWidth,
            height: imageWidth,
          }}
          source={{uri:thumbNail ?? uri}}
        />
      )
    },
    [editing, files]
  )

  const onBeginDragging = useCallback(() => setEditing(true), []);

  // const onPressCell = useCallback((item) => !editing && alert(item.color), [
  //   editing,
  // ])

  // const onPressAdd = useCallback(
  //   () => !editing && setData([newData(data.length + 1), ...data]),
  //   [editing, data]
  // )

  const onReleaseCell = useCallback(
    (items: any[]) => {
      // const data1 = items.slice(1)
      // if (!_.isEqual(data, data1)) setData(data1)
      const newFileArr = items.filter((allData)=>typeof allData !== "string");
      setFiles(newFileArr);
      setEditing(false);
    },
    []
  )

  // const onPressDelete = useCallback(
  //   (item: Data) => setData(data.filter((v) => v.id != item.id)),
  //   [data]
  // )

  // console.log("files")
  // console.log(files)
  const getRenderData = () => {
    const allData: Array<string|FileInfo> = [""];

    console.log("allData")
    console.log(allData)
    for(let i=0; i<files.length; i++) {
      allData.push(files[i]);
      allData.push(body[i+1]);
    }
    console.log("allData")
    console.log(allData)
    return allData;
  };

  const renderData = useMemo(()=>getRenderData(),[files])

  return (

    <DraggableGridView
      data={renderData}
      keyExtractor={(item,index) => (typeof item === "string" ? index : item.uri)}
      renderItem={renderItem}
      renderLockedItem={renderLockedItem}
      locked={(item) => (typeof item === "string")}
      onBeginDragging={onBeginDragging}
      // onPressCell={onPressCell}
      onReleaseCell={onReleaseCell}
      // numColumns={3}
      delayLongPress={500}
      // containerMargin={{ top: 60 + top, bottom, left: 2, right: 2 }}
    />
    // <View 
    //   style={{
    //     position: "relative",
    //     backgroundColor,
    //     flex: 1,
    //   }}
    // >
    //   {/* {keyboardAwareScrollRef.current &&  */}
    //   <ScrollView
    //     style={{
    //       padding: 10,
    //       // backgroundColor: "rgba(200,200,0,0.3)",
    //       position: "absolute",
    //       // absolute 일때 top bottom 을 넣어야 스크롤이 됨. 왠진 모름
    //       top: 0,
    //       bottom: 0,
    //     }}
    //     scrollEnabled={false}
    //     ref={scrollRef}
    //     // scrollView 움직이게 할라고 넣음. 이게 문제 생길수도 있다하니 문제 있으면 얘 확인
    //     disableScrollViewPanResponder={true}
    //   >
    //     <View
    //       style={{
    //         // 
    //         opacity: opacityForAnimation ? 1 : 0,
    //         // 
    //       }}
    //     >

    //       {/* 추가 */}
    //       <MusicState
    //         youtubeId={youtubeIdRef.current}
    //         // youtubeId={youtubeId}
    //         youtubeTitle={youtubeTitle}
    //       />
    //       {/* 추가 */}

    //       <TitleInput
    //         value={title}
    //         setValue={setTitle}
    //       />
    //       <BodyInput
    //         inputIndex={0}
    //         {...bodyInputPropsArr}
    //       />
    //       {copiedFiles.length > 0 && copiedFiles.map((file,index) => {
    //         const uri = file.uri;
    //         const animatedIndex = file.animatedIndex;
    //         const isEditingFile = file.isEditingFile;
    //         const thumbNail = file.thumbNail;
    //         return (
    //           <React.Fragment
    //             key={uri}
    //           >
    //             {isEditingFile ?
    //               <DiaryImageWithRealHeight
    //                 uri={thumbNail ?? uri}
    //                 fileWidth={imageWidth}
    //                 imageStyle={{
    //                   borderColor : animatedIndex ? "orange" : "grey",
    //                   borderWidth: 5,
    //                   opacity: animatedIndex ? 1 : 0.4,
    //                 }}
    //               />
    //             :
    //               animatedIndex ?
    //                 <View
    //                   style={{
    //                     height: 4,
    //                     width: "100%",
    //                     backgroundColor: "orange",
    //                   }}
    //                 />
    //               :
    //                 <DiaryImageWithRealHeight
    //                   uri={uri}
    //                   fileWidth={imageWidth}
    //                   thumbNail={thumbNail}
    //                 />
    //             }
                
    //             <Input
    //             // <TextInput
    //             //   style={{
    //             //     paddingVertical: 20,
    //             //     paddingHorizontal: 5,
    //             //     lineHeight: 18,
    //             //     color: textColor,
    //             //   }}
    //               value={body[(index+1)]}
    //               placeholder="본문"
    //               // autoCapitalize="none"
    //               // autoCorrect={false}
    //               // placeholderTextColor={placeholderTextColor}
    //               multiline={true}
    //             />
    //           </React.Fragment>
    //         )}
    //       )}
    //     </View>
    //   </ScrollView>
    //   {/* } */}
    //   <KeyboardAwareScrollView
    //     style={{
    //       padding: 10,

    //       // opacity: 0.5,

    //     }}
    //     // onScroll={onScroll}
    //     onContentSizeChange={onContentSizeChange}
    //     scrollEnabled={!isPhotoTranslateActive}
    //     onScrollBeginDrag={scrollPositionSetFn}
    //     onScrollEndDrag={scrollPositionSetFn}
    //     onMomentumScrollBegin={scrollPositionSetFn}
    //     onMomentumScrollEnd={scrollPositionSetFn}
    //     ref={keyboardAwareScrollRef}
    //     // disableScrollViewPanResponder={true}
    //   >

    //     {/* 추가 */}
    //     <MusicState
    //       youtubeId={youtubeIdRef.current}
    //       // youtubeId={youtubeId}
    //       youtubeTitle={youtubeTitle}
    //       deleteMusic={deleteMusic}
    //     />
    //     {/* 추가 */}

    //     <TitleInput
    //       value={title}
    //       setValue={setTitle}
    //       opacityForAnimation={opacityForAnimation}
    //     />
    //     <BodyInput
    //       inputIndex={0}
    //       {...bodyInputPropsArr}
    //     />
    //     {files.length > 0 && files.map((file,index) =>
    //       <React.Fragment
    //         key={file.uri}
    //       >
    //         <CanChangePositionFile
    //           file={file}
    //           fileIndex={index}
    //           fileOpacityForAnimation={opacityForAnimation && nowChangingFileIndex !== index}
    //           {...canChangePositionFilePropsArr}
    //         />
    //         <BodyInput
    //           inputIndex={index+1}
    //           {...bodyInputPropsArr}
    //         />
    //       </React.Fragment>
    //     )}
    //   </KeyboardAwareScrollView>
      
    // </View>
  );
};
  
export default UploadDiary;

// import React, { memo, useState, useCallback } from 'react'
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
// import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context'
// import _ from 'lodash'
// import DraggableGridView from '../../../../components/upload/DraggableGridView'
// // import GridView from 'react-native-draggable-gridview'

// /**
//  * App
//  */
// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <Container />
//     </SafeAreaProvider>
//   )
// }

// /**
//  * Container
//  */
// const Container = memo(() => {
//   const { top, bottom } = useSafeArea()
//   const [editing, setEditing] = useState(false)
//   const [data, setData] = useState<Data[]>(
//     Array.from(new Array(14)).map((v, i) => newData(i))
//   )

//   const onPressEdit = useCallback(() => {
//     setEditing(!editing)
//   }, [editing])

//   const locked = useCallback((item) => item == '+', [])

//   const renderLockedItem = useCallback(
//     () => <LockedItem editing={editing} onPress={onPressAdd} />,
//     [editing, data]
//   )

//   const renderItem = useCallback(
//     (item) => (
//       <Item item={item} editing={editing} onPressDelete={onPressDelete} />
//     ),
//     [editing, data]
//   )

//   const onBeginDragging = useCallback(() => !editing && setEditing(true), [
//     editing,
//   ])

//   const onPressCell = useCallback((item) => !editing && alert(item.color), [
//     editing,
//   ])

//   const onPressAdd = useCallback(
//     () => !editing && setData([newData(data.length + 1), ...data]),
//     [editing, data]
//   )

//   const onReleaseCell = useCallback(
//     (items: any[]) => {
//       const data1 = items.slice(1)
//       if (!_.isEqual(data, data1)) setData(data1)
//     },
//     [data]
//   )

//   const onPressDelete = useCallback(
//     (item: Data) => setData(data.filter((v) => v.id != item.id)),
//     [data]
//   )

//   return (
//     <View style={{ flex: 1 }}>
//       <DraggableGridView
//         data={['+', ...data]}
//         keyExtractor={(item) => (item == '+' ? item : item.id)}
//         renderItem={renderItem}
//         renderLockedItem={renderLockedItem}
//         locked={locked}
//         onBeginDragging={onBeginDragging}
//         onPressCell={onPressCell}
//         onReleaseCell={onReleaseCell}
//         numColumns={3}
//         delayLongPress={editing ? 50 : 500}
//         containerMargin={{ top: 60 + top, bottom, left: 2, right: 2 }}
//       />
//       <Header top={top} editing={editing} onPress={onPressEdit} />
//     </View>
//   )
// })

// /**
//  * Data
//  */
// const colors = ['red', 'orange', 'green', 'cyan', 'blue', 'purple', 'pink']

// interface Data {
//   id: string
//   color?: string
// }

// const newData = (i: number): Data => ({
//   id: uuid(),
//   color: colors[i % colors.length],
// })

// /**
//  * Item
//  */
// interface ItemProps {
//   item: Data
//   editing: boolean
//   onPressDelete: (item: Data) => void
// }

// const Item = memo(({ item, editing, onPressDelete }: ItemProps) => {
//   return (
//     <View style={[styles.item, { backgroundColor: item.color || 'gray' }]}>
//       <Text style={{ color: '#fff', fontSize: 18 }}>{item.color}</Text>
//       {editing && <DeleteButton onPress={() => onPressDelete(item)} />}
//     </View>
//   )
// })

// const DeleteButton = memo(({ onPress }: { onPress: () => void }) => (
//   <TouchableOpacity style={styles.delete} onPress={onPress}>
//     <View style={styles.deleteContainer}>
//       <Text style={{ color: '#fff' }}>x</Text>
//     </View>
//   </TouchableOpacity>
// ))

// /**
//  * LockedItem
//  */
// interface LockedItemProps {
//   editing: boolean
//   onPress: () => void
// }

// const LockedItem = memo(({ editing, onPress }: LockedItemProps) => (
//   <TouchableOpacity
//     style={{ flex: 1 }}
//     activeOpacity={editing ? 1 : 0.5}
//     onPress={onPress}
//   >
//     <View style={[styles.item, { opacity: editing ? 0.25 : 1 }]}>
//       <Text style={{ fontSize: 48 }}>+</Text>
//     </View>
//   </TouchableOpacity>
// ))

// /**
//  * Header
//  */
// interface HeaderProps {
//   top: number
//   editing: boolean
//   onPress: () => void
// }

// const Header = memo(({ top, editing, onPress }: HeaderProps) => (
//   <View style={[styles.header, { height: 60 + top }]}>
//     <View style={styles.headerContainer}>
//       <Text style={styles.headerTitle}>GRID</Text>
//       <TouchableOpacity onPress={onPress}>
//         <Text style={styles.headerItem}>{editing ? 'DONE' : 'EDIT'}</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// ))

// /**
//  * UUID
//  */
// const uuid = (): string => {
//   // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
//   // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
//   let chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('')
//   for (let i = 0, len = chars.length; i < len; i++) {
//     switch (chars[i]) {
//       case 'x':
//         chars[i] = Math.floor(Math.random() * 16).toString(16)
//         break
//       case 'y':
//         chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16)
//         break
//     }
//   }
//   return chars.join('')
// }

// /**
//  * Style
//  */
// const styles = StyleSheet.create({
//   item: {
//     flex: 1,
//     margin: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   delete: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   deleteContainer: {
//     width: 20,
//     height: 20,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0009',
//   },
//   header: {
//     position: 'absolute',
//     width: '100%',
//     backgroundColor: '#fffe',
//     justifyContent: 'flex-end',
//   },
//   headerTitle: {
//     position: 'absolute',
//     width: '100%',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   headerItem: { fontSize: 18, color: 'gray' },
//   headerContainer: {
//     height: 60,
//     paddingHorizontal: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
// })