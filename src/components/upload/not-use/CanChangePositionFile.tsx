import { useRef, useState } from "react";
import { Alert, Animated, LayoutChangeEvent, PanResponder, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import DiaryImageWithRealHeight from "../DiaryImageWithRealHeight";
import useTimeout from "../../../hooks/useTimeOut";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CopiedFileInfo, FileInfo } from "../../../types/upload/fileType";
import findPosition from "../../../logic/upload/not-use/findPosition";

type CanChangePositionFileProps = {
  file: FileInfo;
  setBody: React.Dispatch<React.SetStateAction<string[]>>;
  fileIndex: number;
  imageWidth: number;
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>;
  setIsPhotoTranslateActive: React.Dispatch<React.SetStateAction<boolean>>;
  setComponentPositionY: React.Dispatch<React.SetStateAction<({ bottomHeight:number, uri:string, } | number[])[]>>;
  fileOpacityForAnimation: boolean
  setOpacityForAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setCopiedFiles: React.Dispatch<React.SetStateAction<CopiedFileInfo[]>>;
  setNowChangingFileIndex: React.Dispatch<React.SetStateAction<number>>;
  setFileAddingPosition: React.Dispatch<React.SetStateAction<{fileIndex:number,insertFront:boolean}>>;
  deviceHeight: number;
  setNowScrollViewPosition: React.Dispatch<React.SetStateAction<number>>;
  setScrollViewMoveState: React.Dispatch<React.SetStateAction<string>>;
  setAutoScrollMoveLength: React.Dispatch<React.SetStateAction<number>>;
  keyboardAwareScrollRef: React.MutableRefObject<KeyboardAwareScrollView>;
  scrollRef: React.MutableRefObject<ScrollView>;
  // setDy: React.Dispatch<React.SetStateAction<number>>;
  nowDy:React.MutableRefObject<number>;
};

// let longPressActive = false;
// let onLongPressTimeout;

const CanChangePositionFile = ({
  file:fileInfo,
  setBody,
  fileIndex,
  imageWidth,
  setFiles,
  setIsPhotoTranslateActive,
  setComponentPositionY,
  fileOpacityForAnimation,
  setOpacityForAnimation,
  setCopiedFiles,
  setNowChangingFileIndex,
  setFileAddingPosition,
  deviceHeight,
  setNowScrollViewPosition,
  setScrollViewMoveState,
  setAutoScrollMoveLength,
  keyboardAwareScrollRef,
  scrollRef,
  // setDy,
  nowDy
}: CanChangePositionFileProps) => {

  const file = fileInfo.uri;

  const componentIndexOnComponentPositionY = (fileIndex * 2) + 1;

  const onLayout:(event: LayoutChangeEvent) => void = (event) => {
    console.log("CanChangePositionFile onLayout")
    // console.log(event.nativeEvent.layout)
    // const componentIndexOnComponentPositionY = (fileIndex * 2) + 1;
    const onLayoutValue = event.nativeEvent.layout;
    const nowComponentBottomY = onLayoutValue.height + onLayoutValue.y;
    // 아마 setValue 변경 -> 걔를 보고 TextInput 의 UI 변경 -> 변경된게 onLayout 호출 이런 식 아닐까? eachLineTextLength 도 받을라면 setValue 된거 이후에 되는게 보장되야 하는데 확인 해봐야함.
    // 얜 근데 글을 붙여넣기 해서 여러줄 한번에 늘었을 때, 즁간에 띄어쓰기 있어서 띄어쓰기 이후가 통째로 넘어갔을 때, 여러줄을 한번에 지웠을 때는 안됨.
    // line-height 쓰면 몇줄인 지는 알 수 있는데 한줄에 몇자 있는지를 모름. 걍 이게 나을듯.
    setComponentPositionY(prev=>{
      const newArr = [...prev];
      // newArr[componentIndexOnComponentPositionY] = nowComponentBottomY;
      // panResponder 에서 fileIndex 변한거를 못받아서 여기에서 uri 같이 보내고 그걸로 확인.
      newArr[componentIndexOnComponentPositionY] = {
        bottomHeight:nowComponentBottomY,
        uri:file,
      };
      return newArr;
    });
  };

  // 초기 위치 0 말고 지정... 안해도 될듯.
  const position = useRef(new Animated.Value(0)).current;

  const slowUpPosition = 170;
  const fastUpPosition = 90;
  const slowDownPosition = deviceHeight-170;
  const fastDownPosition = deviceHeight-90;

  const [longPressActive,setLongPressActive] = useState(false);
  // let onLongPressTimeout;

  // 이러면 longPressActive true 될 때마다 실행되는건가?
  useTimeout(() => {
    console.log("useTimeout")
    setIsPhotoTranslateActive(true);

    setOpacityForAnimation(true);
    
    setCopiedFiles(prev=>{
      const filteredArr = prev.filter((element,index) => {
        return element.uri !== "empty"
      });
      const newArr = filteredArr.map(prevFileInfo => ({ ...prevFileInfo, animatedIndex:false }));
      // newArr[thisFileIndex] = {
      //   ...newArr[thisFileIndex],
      newArr[fileIndex] = {
        ...newArr[fileIndex],
        animatedIndex: true,
        isEditingFile: true,
      };
      return newArr;
    });
    // setNowChangingFileIndex(thisFileIndex);
    
  }, longPressActive ? 400 : null);

  
  
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder:()=>true,
    onPanResponderGrant: () => {
      console.log("onPanResponderGrant")
      // file 이 바뀌어도 fileIndex 가 안바뀜. 그래서 따로 받아야함.
      // 이건 좀 안좋을지도? 누르면 파일 넣는 위치 세팅되는데 너무 잘 눌릴듯?
      // 이렇게 쓰면 setTimeout 에서도 접근할 수 있을라나? 되네
      
      setCopiedFiles(prev=>{
        let thisFileIndex;
        thisFileIndex = prev.findIndex(element=>element.uri === file);
        setFileAddingPosition({
          fileIndex:thisFileIndex,
          insertFront:false,
        });
        setNowChangingFileIndex(thisFileIndex);
        return prev;
      });

      setLongPressActive(true);
      
    },

    onPanResponderMove:(_,{dy,moveY,y0})=>{
      // console.log("moveY");
      // console.log(moveY);
      // console.log("y0");
      // console.log(y0);

      setLongPressActive(false);

      setNowScrollViewPosition(prevScrollViewPosition=>{
        setScrollViewMoveState((moveState)=>{
          let nowMoveState;

          if(y0 > moveY) {
            console.log("y0 > moveY")

            const isEndPosition = prevScrollViewPosition < 6;
            if(isEndPosition) {
              // return "";
              nowMoveState = "";
            }

            if (moveY < fastUpPosition) {
              // return "fastUpPosition";
              nowMoveState = "fastUpPosition";
            } else if (moveY < slowUpPosition) {
              // return "slowUpPosition"
              nowMoveState = "slowUpPosition";
            }
          // 아래로 움직일때
          } else if (y0 < moveY) {
            console.log("y0 < moveY")

            const isEndPosition = prevScrollViewPosition + 6 > deviceHeight;
            if(isEndPosition) {
              // return "";
              nowMoveState = "";
            }

            
            if(moveY > fastDownPosition) {
              // return "fastDownPosition";
              nowMoveState = "fastDownPosition";
            } else if (moveY > slowDownPosition) {
              // return "slowDownPosition"
              nowMoveState = "slowDownPosition";
            }
          } else {
            // return moveState;
            nowMoveState = moveState;
          }

          
          setAutoScrollMoveLength(autoScrollHeight => {
            setComponentPositionY(prevPositionYArr=>{
              if(nowMoveState !== "") {

                const totalHeight = autoScrollHeight + dy;
                return findPosition(totalHeight,prevPositionYArr,file,setCopiedFiles,setBody);
              }

              return prevPositionYArr;
            });

            return autoScrollHeight;
          });

          return nowMoveState;
        });

        return prevScrollViewPosition;
      });


      
      setIsPhotoTranslateActive(prev=>{
        if(prev){
          position.setValue(dy);
          // setDy(dy);
          nowDy.current = dy;
        }
        return prev;
      });

    },
    onPanResponderRelease:(_,gestureState)=>{
      // clearTimeout(onLongPressTimeout);
      setLongPressActive((longPressActive)=>{
        if(longPressActive) {
          setCopiedFiles(prev=>{
            const setBaseCopiedFile = prev.map(prevCopiedFile => {
              const { animatedIndex, isEditingFile, ...rest } = prevCopiedFile;
              return { animatedIndex: false, ...rest, };
            });
            return setBaseCopiedFile;
          });
        } else {
          
          setCopiedFiles(prev=>{
            // console.log("setCopiedFiles prev")
            // console.log(prev)
            
            // 여기도 fileIndex 대신 thisFileIndex 로 받음.
            const thisFileIndex = prev.findIndex(element => element.uri === file);
            const editFile = prev[thisFileIndex];
            const isFilePositionNotChange = editFile.isEditingFile && editFile.animatedIndex;
            // console.log("thisFileIndex")
            // console.log(thisFileIndex)
            // console.log("editFile")
            // console.log(editFile)
            // console.log("isFilePositionNotChange")
            // console.log(isFilePositionNotChange)
            if(isFilePositionNotChange) {
              // // 화면 맞춤
              setNowScrollViewPosition(nowPosition => {
                keyboardAwareScrollRef.current.scrollToPosition(0,nowPosition,false);
                
                // // 
                // scrollRef.current.scrollTo({y:nowPosition,animated:false});
                // // 

                return nowPosition;
              });

              const forSetCopiedFilesArr = prev.map(prevFileInfo => {
                const { animatedIndex, isEditingFile, ...rest } = prevFileInfo;
                return { ...rest, animatedIndex:false };
              });
              // console.log("forSetCopiedFilesArr")
              // console.log(forSetCopiedFilesArr)
              const nothingChangedArr = forSetCopiedFilesArr.filter(element=>element.uri !== "empty");
              // console.log("nothingChangedArr")
              // console.log(nothingChangedArr)
              return nothingChangedArr;
            }
    
    
            let emptyIndex;
    
            const forSetFilesArr = prev.map((prevFileInfo,index)=>{
              const { uri, animatedIndex, isEditingFile, ...rest } = prevFileInfo;
              // const isEditingFile = prevFileInfo.isEditingFile;
              if(isEditingFile) {
                return { uri: "empty", ...rest };
              }
              // if(animatedIndex) {
              if(uri === "empty") {
                emptyIndex = index;
                return fileInfo;
              }
              // return prevFileInfo;
              return { uri, ...rest };
            });

            // 화면 맞춤
            setNowScrollViewPosition(nowPosition => {
              // lineViewHeight 4 + padding top bottom 20 + 20 + textLineHeight 18 = 62
              const emptyViewHeight = (emptyIndex && emptyIndex < thisFileIndex) ? 62 : 0;
              if(emptyViewHeight && nowPosition < emptyViewHeight){
                const moveToHeight = nowPosition -  emptyViewHeight;
                
                scrollRef.current.scrollTo({y:moveToHeight,animated:false});
              }
              keyboardAwareScrollRef.current.scrollToPosition(0,nowPosition,false);
              
              return nowPosition;
            });
            

            const orderChangedSetFilesArr = forSetFilesArr.filter(prevFileInfo => prevFileInfo.uri !== "empty");
            // console.log("orderChangedSetFilesArr")
            // console.log(orderChangedSetFilesArr)
            setFiles(orderChangedSetFilesArr);
            const orderChangedSetCopiedFilesArr = orderChangedSetFilesArr.map(prevFileInfo => {
    
              return {...prevFileInfo, animatedIndex:false}
            });
            // console.log("orderChangedSetFilesArr")
            // console.log(orderChangedSetFilesArr)
            // console.log("orderChangedSetCopiedFilesArr")
            // console.log(orderChangedSetCopiedFilesArr)
            return orderChangedSetCopiedFilesArr;
            // setFiles 에 animated 있는 데로 현재 이미지를 옮겨
            // 얘는 empty 삭제하고 객체 배열로 반환, isEditingFile 은 Granted 에서 바꿔줘서 굳이 안바꿔도 될듯
          });
        }
        setBody(prev=>prev.filter((element) => element !== 0));
        // longPressActive = false;
        setIsPhotoTranslateActive(false);
        position.setValue(0);
        setOpacityForAnimation(false);
        setScrollViewMoveState("");

        setAutoScrollMoveLength(0);
  
        console.log("touch Finished")
        
        return false;
      });
      

    },
    
    onPanResponderTerminate: () => {
      setLongPressActive(false);
      setIsPhotoTranslateActive(false);
      position.setValue(0);
      setScrollViewMoveState("");
      setAutoScrollMoveLength(0);
    },
  })).current;

  const onPressDeletePhoto = () => {
    Alert.alert("해당 파일을 제외 시키시겠습니까?",null,[
      {
        text:"제외",
        style:'destructive',
        onPress:()=>{
          setBody(prev=>{
            const newArr = [...prev];
            if(newArr[fileIndex+1]){
              newArr[fileIndex] += newArr[fileIndex+1];
            }
            newArr.splice(fileIndex+1,1);
            return newArr;
          });
          setFiles(prev=>{
            const newArr = [...prev];
            newArr.splice(fileIndex,1);
            return newArr;
          });
        },
      },
      {
        text:"취소",
      },
    ]);
  };

  const thumbNail = fileInfo.thumbNail;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        position: "relative",
        transform: [{translateY:position}],
        zIndex: 100,
        opacity: fileOpacityForAnimation ? 0 : 1,
      }}
      onLayout={onLayout}
    >
      <DiaryImageWithRealHeight
        uri={thumbNail ?? file}
        fileWidth={imageWidth}
        thumbNail={thumbNail}
      />
      <TouchableOpacity
        onPress={onPressDeletePhoto}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          zIndex: 5,
        }}
      >
        <Ionicons name="close" color="rgba(255,0,0,0.7)" size={30} />
      </TouchableOpacity>
    </Animated.View>
  )
};

export default CanChangePositionFile;




// let whereFilePutOn: { index:number };
// for(let index = 0; index < prev.length; index++) {
//   // 위로 올라간 경우. 
//   if(dy < 0) {
    
//     if(index > componentIndexOnComponentPositionY || index === componentIndexOnComponentPositionY) {
//       break;
//     }
//     // 얘는 컴포넌트의 바닥쪽보다 파일의 상단이 넘어왔느냐로 판단.
//     // 위의 TextInput 바닥 높이 === 파일의 위쪽 높이
//     const prevComponent = prev[componentIndexOnComponentPositionY-1];
//     const releaseFilePosition = prevComponent[prevComponent.length-1] + dy;
//     const filePutOnPosition = prev[index];
//     // 컴포넌트의 바닥보다 파일이 위로 넘어왔느냐
//     // 넘은 컴포넌트가 이미지일 경우
//     if(index%2 === 1) {
//       // 안넘으면 넘어감.
//       // return filePutOnPosition > releaseFilePosition;
//       if(!(filePutOnPosition > releaseFilePosition)) continue;
//       // 아래 있는 File 의 절반을 넘었냐
//       const putOnFilePosition = prev[index];
//       const putOnFileAboveTextInput = prev[index-1];
//       const putOnFileAboveTextInputPosition = putOnFileAboveTextInput[putOnFileAboveTextInput.length-1];
//       const putOnFileHeight = putOnFilePosition - putOnFileAboveTextInputPosition;
//       const divideHalfHeight = putOnFileAboveTextInputPosition + (putOnFileHeight/2);
//       // 절반보다 위면 해당 index, 아래면 아래 index. 인데 아래는 TextInput 이라서 line:0 까지 줘
//       whereFilePutOn = releaseFilePosition < divideHalfHeight ? { index } : { index:index+1 , line:0 };
//       break;

//     // 넘은 컴포넌트가 TextInput일 경우
//     } else {
//       // 안넘으면 넘어감.
//       if(!(filePutOnPosition[filePutOnPosition.length-1] > releaseFilePosition)) 
//       continue;

//       // 아래 있는 TextInput 의 몇째줄에 있느냐
//       const putOnTextInput = prev[index];
//       const putOnLine = putOnTextInput.findIndex(bottomPosition => bottomPosition > releaseFilePosition);
//       // 걸친 줄의 절반을 넘었느냐
//       const halfOfLine = putOnTextInput[putOnLine] - marginBottom - halfLineHeight;
//       // 못넘으면 다음줄, 다음줄이 없으면 다음 이미지 위에
//       if(releaseFilePosition < halfOfLine) {
//         whereFilePutOn = { index, line: putOnLine};
//         break;
//       } else {
//         whereFilePutOn = putOnTextInput.length === putOnLine+1 ? { index:index+1 } : { index, line:putOnLine+1 };
//         break;
//       }
//     }

//   // 아래로 내려간 경우 (dy > 0)
//   } else {
//     if(index < componentIndexOnComponentPositionY || index === componentIndexOnComponentPositionY) {
//       continue;
//     }
//     const releaseFilePosition = prev[componentIndexOnComponentPositionY] + dy;
//     // 얘는 컴포넌트의 위쪽보다 이미지의 바닥이 넘어왔느냐로 판단
//     const prevComponentHeightOrArr = prev[index-1];
//     const nowComponentBottomY = prev[index];
//     // 넘은 컴포넌트가 이미지일 경우
//     if(index%2 === 1) {
//       console.log("index%2 === 1")
//       const componentTopPosition = prevComponentHeightOrArr[prevComponentHeightOrArr.length-1];
//       // return componentTopPosition < releaseFilePosition;
//       // 현재 컴포넌트에 걸쳐있는지는 바닥 높이로 확인
//       if(nowComponentBottomY < releaseFilePosition) continue;

//       const putOnFilePosition = prev[index];
//       const putOnFileAboveTextInput = prev[index-1];
//       const putOnFileAboveTextInputPosition = putOnFileAboveTextInput[putOnFileAboveTextInput.length-1];
//       const putOnFileHeight = putOnFilePosition - putOnFileAboveTextInputPosition;
//       const divideHalfHeight = putOnFileAboveTextInputPosition + (putOnFileHeight/2);
//       console.log("putOnFilePosition")
//       console.log(putOnFilePosition)
//       console.log("putOnFileAboveTextInput")
//       console.log(putOnFileAboveTextInput)
//       console.log("putOnFileAboveTextInputPosition")
//       console.log(putOnFileAboveTextInputPosition)
//       console.log("putOnFileHeight")
//       console.log(putOnFileHeight)
//       console.log("divideHalfHeight")
//       console.log(divideHalfHeight)
//       // 절반보다 위면 해당 index, 아래면 아래 index. 인데 아래는 TextInput 이라서 line:0 까지 줘
//       whereFilePutOn = divideHalfHeight > releaseFilePosition ? { index } : { index:index+1 , line:0 };
//       break;
//     // 넘은 컴포넌트가 TextInput일 경우
//     } else {
//       console.log("index%2 !!!!!== 1")
//       // return componentTopPosition < releaseFilePosition;
//       // 현재 컴포넌트에 걸쳐있는지는 바닥 높이로 확인
//       if(nowComponentBottomY < releaseFilePosition) continue;

//       const putOnTextInput = prev[index];
//       const putOnLine = putOnTextInput.findIndex(bottomPosition => bottomPosition > releaseFilePosition);
//       // 걸친 줄의 절반을 넘었느냐
//       const halfOfLine = putOnTextInput[putOnLine] - marginBottom - halfLineHeight;
//       console.log("putOnTextInput")
//       console.log(putOnTextInput)
//       console.log("putOnLine")
//       console.log(putOnLine)
//       console.log("halfOfLine")
//       console.log(halfOfLine)
//       // 못넘으면 그줄 index(포함 안하는거)
//       if(releaseFilePosition < halfOfLine) {
//         whereFilePutOn = { index, line:putOnLine };
//         break;
//       } else {
//         whereFilePutOn = putOnLine === putOnTextInput.length-1 ? { index:index+1 } : { index, line:putOnLine+1 };
//         break;
//       }
//     }
//   }
// }









// const panResponder = useMemo(()=>PanResponder.create({
  //   onStartShouldSetPanResponder:()=>true,
  //   onPanResponderGrant: () => {

  //     setFileAddingPosition({
  //       fileIndex: fileIndex,
  //       insertFront: false,
  //     });

  //     setLongPressActive(true);
  //   },

  //   onPanResponderMove:(_,{dy,moveY,y0})=>{
  //     // position.setOffset(position._value)
  //     // clearTimeout(onLongPressTimeout);
  //     setLongPressActive(false);


  //     // 화면 끝으로 가면 이동하게 하기 위함
  //     // nowScrollViewPosition 는 state 라 못씀
  //     setNowScrollViewPosition(prev=>{
  //       // 이건 setInterval 로 줄때. ScrollView 는 움직이는데 panResponder 가 안따라옴. 만약 쓸거면 View 따로 만들어서 거기에 panResponder 넣어야 할듯
  //       setScrollViewMoveState(()=>{
  //         if(y0 > moveY) {
  //           console.log("y0 > moveY")

  //           const isEndPosition = prev < 4;
  //           if(isEndPosition) {
  //             return "";
  //           }

  //           if (moveY < fastUpPosition) {
  //             return "fastUpPosition";
  //           } else if (moveY < slowUpPosition) {
  //             return "slowUpPosition"
  //           }
  //         // 아래로 움직일때
  //         } else if (y0 < moveY) {
  //           console.log("y0 < moveY")

  //           const isEndPosition = prev + 4 > deviceHeight;
  //           if(isEndPosition) {
  //             return "";
  //           }

            
  //           if(moveY > fastDownPosition) {
  //             return "fastDownPosition"
  //           } else if (moveY > slowDownPosition) {
  //             return "slowDownPosition"
  //           }
  //         }
  //         return ""
  //       });

  //     // return prev;


  //     // 이건 panResponder 안에서 움직일 때. 잘 되나 위치에 잇어도 움직이지 않으면 멈춤. onPanResponderGrant 에 넣어야 하나?
  //       let moveToPosition;
  //       // 위로 움직일때
  //       if(y0 > moveY) {
  //         console.log("y0 > moveY")

  //         const isEndPosition = prev < 20;
  //         if(isEndPosition) {
  //           return prev;
  //         }

          
  //         if (moveY < fastUpPosition) {
  //           console.log("moveY > fastUpPosition")
  //           moveToPosition = prev-20
  //           // scrollRef.current.scrollTo({y:prev+20});
  //         } else if (moveY < slowUpPosition) {
  //           console.log("moveY > slowUpPosition")
  //           moveToPosition = prev-10
  //           // scrollRef.current.scrollTo({y:prev+10});
  //         }
  //       // 아래로 움직일때
  //       } else if (y0 < moveY) {
  //         console.log("y0 < moveY")

  //         const isEndPosition = prev + 20 > deviceHeight;
  //         if(isEndPosition) {
  //           return prev;
  //         }

          
  //         if(moveY > fastDownPosition) {
  //           console.log("moveY < fastDownPosition")
  //           moveToPosition = prev+20;
  //           // scrollRef.current.scrollTo({y:prev-20});
  //         } else if (moveY > slowDownPosition) {
  //           console.log("moveY < slowDownPosition")
  //           moveToPosition = prev+10
  //           // scrollRef.current.scrollTo({y:prev-10});
  //         }
  //       }

  //       if(moveToPosition){
  //         // scrollRef.current.scrollToPosition(0,moveToPosition);
  //         scrollRef.current.scrollTo({y:moveToPosition});
  //       }
  //       return moveToPosition ?? prev;
  //     });
      



      

  //     if(longPressActive){
  //       position.setValue(dy)
  //     }


  //     setComponentPositionY(prev=>{
  //       const isFileNotMoveFromFirstPosition = dy === 0;
  //       const isFileMoveDownFromFirstPosition = dy < 0;
        
  //       if(isFileNotMoveFromFirstPosition) {
  //         return prev;
  //       }

  //       // setComponentPositionY 에 uri 넣고 걔로 받음. fileIndex 업데이트가 안됨.
  //       // const thisFileIndex = (prev.findIndex(element=>element.uri === file) - 1) / 2;
  //       const updatedComponentIndexOnComponentPositionY = (fileIndex * 2) + 1;

  //       // 라인은 나중에 구현
  //       let whereFilePutOn: { index:number };
  //       for(let index = 0; index < prev.length; index++) {
  //         const isPutOnFile = index%2 === 1;
  //         // if(dy < 0) {
  //         // 위로 올라간 경우. 
  //         if(isFileMoveDownFromFirstPosition) {
  //           const isIndexAfterThanComponentIndex = index > updatedComponentIndexOnComponentPositionY || index === updatedComponentIndexOnComponentPositionY;
  //           if(isIndexAfterThanComponentIndex) {
  //             break;
  //           }
  //           // 얘는 컴포넌트의 바닥쪽보다 파일의 상단이 넘어왔느냐로 판단.
  //           // 위의 TextInput 바닥 높이 === 파일의 위쪽 높이
  //           const rightAboveTextInput = prev[updatedComponentIndexOnComponentPositionY-1];
  //           const releaseFilePosition = rightAboveTextInput[rightAboveTextInput.length-1] + dy;
  //           const filePutOnPosition = prev[index];
  //           // 컴포넌트의 바닥보다 파일이 위로 넘어왔느냐
  //           // 넘은 컴포넌트가 이미지일 경우
  //           // if(index%2 === 1) {
  //           if(isPutOnFile) {
  //             // 안넘으면 넘어감.
  //             if(!(filePutOnPosition.bottomHeight > releaseFilePosition)) continue;
  //             // 아래 있는 File 의 절반을 넘었냐
  //             const putOnFilePosition = prev[index].bottomHeight;
  //             const putOnFileAboveTextInput = prev[index-1];
  //             const putOnFileAboveTextInputPosition = putOnFileAboveTextInput[putOnFileAboveTextInput.length-1];
  //             const putOnFileHeight = putOnFilePosition - putOnFileAboveTextInputPosition;
  //             const divideHalfHeight = putOnFileAboveTextInputPosition + (putOnFileHeight/2);
  //             // 절반보다 위면 해당 index, 아래면 아래 index. 인데 아래는 TextInput 이라서 line:0 까지 줘
  //             const isReleasePositionMoreThanHalf = releaseFilePosition < divideHalfHeight;

  //             whereFilePutOn = isReleasePositionMoreThanHalf ? { index } : { index:index+2 };
  //             break;

  //           // 넘은 컴포넌트가 TextInput일 경우
  //           } else {
  //             // 안넘으면 넘어감.
  //             const putOnTextInputPosition = filePutOnPosition[filePutOnPosition.length-1];
  //             if(!(putOnTextInputPosition > releaseFilePosition)) continue;

  //             whereFilePutOn = { index:index+1 };
  //             break;
  //           }

  //         // 아래로 내려간 경우 (dy > 0)
  //         } else {
  //           const isIndexBeforeThanComponentIndex = index < updatedComponentIndexOnComponentPositionY || index === updatedComponentIndexOnComponentPositionY;

  //           if(isIndexBeforeThanComponentIndex) {
  //             continue;
  //           }
  //           const releaseFilePosition = prev[updatedComponentIndexOnComponentPositionY].bottomHeight + dy;
  //           // 얘는 컴포넌트의 위쪽보다 이미지의 바닥이 넘어왔느냐로 판단
  //           const nowPutOnComponent = prev[index];
  //           // 넘은 컴포넌트가 이미지일 경우
  //           // if(index%2 === 1) {
  //           if(isPutOnFile) {
  //             // console.log("index%2 === 1");
  //             // return componentTopPosition < releaseFilePosition;
  //             // 현재 컴포넌트에 걸쳐있는지는 바닥 높이로 확인
  //             const putOnFilePosition = prev[index].bottomHeight;
  //             if(putOnFilePosition < releaseFilePosition) continue;

  //             const putOnFileAboveTextInput = prev[index-1];
  //             const putOnFileAboveTextInputPosition = putOnFileAboveTextInput[putOnFileAboveTextInput.length-1];
  //             const putOnFileHeight = putOnFilePosition - putOnFileAboveTextInputPosition;
  //             const divideHalfHeight = putOnFileAboveTextInputPosition + (putOnFileHeight/2);
  //             // 절반보다 위면 해당 index, 아래면 아래 index. 인데 아래는 TextInput 이라서 line:0 까지 줘
  //             const isReleasePositionLessThanHalf = divideHalfHeight > releaseFilePosition;
  //             whereFilePutOn = isReleasePositionLessThanHalf ? { index:index-2 } : { index:index };
  //             break;
  //           // 넘은 컴포넌트가 TextInput일 경우
  //           } else {
  //             // console.log("index%2 !!!!!== 1")
  //             const putOnTextInputPosition = nowPutOnComponent[nowPutOnComponent.length-1];
  //             // 현재 컴포넌트에 걸쳐있는지는 바닥 높이로 확인
  //             // 넘은 경우
  //             if(putOnTextInputPosition < releaseFilePosition) {
  //               // 마지막을 넘은 경우 끝냄
  //               if(prev.length-1 === index) {
  //                 whereFilePutOn = { index:index-1 };
  //                 break;
  //               // 그외 다음 컴포넌트 높이로 넘어가
  //               } else {
  //                 continue;
  //               }
  //             }

  //             whereFilePutOn = { index:index-1 };
  //             break;

  //           }
  //         }
  //       }

  //       // console.log("whereFilePutOn")
  //       // console.log(whereFilePutOn)

        
  //       const indexWhereFilePutOn = whereFilePutOn.index;
  //       setCopiedFiles(prev=>{
  //         const filteredArr = prev.filter((element) => element.uri !== "empty");
  //         // fileIndex 대신 따로 받음. panResponder 에서 업데이트 안됨.
  //         // let thisFileIndex;
  //         // const newArr = filteredArr.map((element,index) => {
  //         //   const uri = element.uri;
  //         //   if(uri === file) { thisFileIndex = index };
  //         //   return {...element,animatedIndex:false};
  //         // });
  //         const newArr = filteredArr.map((element) => ({...element,animatedIndex:false}));
  //         // 아래로 내려갈때 body 도 하나 추가해서 다시 세팅함.
  //         setBody(prev=>prev.filter((element) => element !== 0));
  //         // if(indexWhereFilePutOn % 2 === 1){
  //         const putOnIndex = (indexWhereFilePutOn - 1) / 2;
  //         if(putOnIndex === fileIndex) {
  //           newArr[fileIndex].animatedIndex = true;
  //         } else {
  //           // 이거 중요할듯? 아래로 내려갈때 줄을 하나 아래에 추가 + body 도 하나 추가해야 맞음.
  //           const inputIndexPosition = isFileMoveDownFromFirstPosition ? putOnIndex : putOnIndex + 1;
  //           // 키를 uri 로 받아서 uri 도 넣어줌
  //           newArr.splice(inputIndexPosition, 0, { uri:"empty", animatedIndex:true, isVideo:false, });
  //           isFileMoveDownFromFirstPosition && setBody(prev => {
  //             const newArr = [...prev];
  //             // string 아닌 값을 추가해서 렌더링은 안되나 배열은 늘어남. 여기선 0.
  //             newArr.splice(putOnIndex, 0, 0);
  //             return newArr;
  //           });
  //         }
  //         return newArr;
  //       });


  //       return prev;
  //     })
  //   },
  //   onPanResponderRelease:(_,gestureState)=>{
  //     // clearTimeout(onLongPressTimeout);
  //     setLongPressActive(false);

  //     // setScrollViewMoveState("");
  //     setCopiedFiles(prev=>{
  //       // 여기도 fileIndex 대신 thisFileIndex 로 받음.
  //       // const thisFileIndex = prev.findIndex(element => element.uri === file);
  //       const editFile = prev[fileIndex];
  //       // const editFile = prev[fileIndex];
  //       const isFilePositionNotChange = editFile.isEditingFile && editFile.animatedIndex;
  //       if(isFilePositionNotChange) {
  //         // console.log("isFilePositionNotChange")
  //         // const forSetCopiedFilesArr = prev.map(element=>({uri:element.uri,animatedIndex:false}));
  //         const forSetCopiedFilesArr = prev.map(prevFileInfo => ({ ...prevFileInfo, animatedIndex:false }));
  //         const nothingChangedArr = forSetCopiedFilesArr.filter(element=>element.uri !== "empty");
  //         // console.log("nothingChangedArr")
  //         // console.log(nothingChangedArr)
  //         return nothingChangedArr;
  //       }
  //       // console.log("not not not isFilePositionNotChange")
  //       const forSetFilesArr = prev.map(prevFileInfo=>{
  //         const { uri, animatedIndex, isEditingFile, ...empty } = prevFileInfo;
  //         // const isEditingFile = prevFileInfo.isEditingFile;
  //         if(isEditingFile) {
  //           return { uri: "empty", ...empty };
  //         }
  //         // if(animatedIndex) {
  //         if(uri === "empty") {
  //           return fileInfo;
  //         }
  //         // return prevFileInfo;
  //         return { uri, ...empty };
  //       });
  //       const orderChangedSetFilesArr = forSetFilesArr.filter(prevFileInfo => prevFileInfo.uri !== "empty");
  //       // console.log("orderChangedSetFilesArr")
  //       // console.log(orderChangedSetFilesArr)
  //       setFiles(orderChangedSetFilesArr);
  //       const orderChangedSetCopiedFilesArr = orderChangedSetFilesArr.map(prevFileInfo => ({...prevFileInfo, animatedIndex:false}));
  //       // console.log("orderChangedSetCopiedFilesArr")
  //       // console.log(orderChangedSetCopiedFilesArr)
  //       return orderChangedSetCopiedFilesArr;
  //       // setFiles 에 animated 있는 데로 현재 이미지를 옮겨
  //       // 얘는 empty 삭제하고 객체 배열로 반환, isEditingFile 은 Granted 에서 바꿔줘서 굳이 안바꿔도 될듯
  //     });
  //     setBody(prev=>prev.filter((element) => element !== 0));

  //     // longPressActive = false;
  //     setLongPressActive(false);

  //     setIsPhotoTranslateActive(false);
  //     position.setValue(0);
  //     setOpacityForAnimation(false);

  //     console.log("touch Finished")
      

  //   },
  //   onPanResponderTerminate(e, gestureState) {
  //     setLongPressActive(false);
  //   },
  // }),[longPressActive,componentPositionY,fileIndex,copiedFiles])