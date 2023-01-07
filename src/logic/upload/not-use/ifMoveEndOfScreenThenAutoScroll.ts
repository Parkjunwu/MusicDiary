import { ScrollView } from "react-native";
import { CopiedFileInfo, FileInfo } from "../../../types/upload/fileType";
import findPosition from "./findPosition";

const ifMoveEndOfScreenThenAutoScroll = (
  setScrollViewMoveState: React.Dispatch<React.SetStateAction<string>>,
  setNowScrollViewPosition: React.Dispatch<React.SetStateAction<number>>,
  canScrollDownHeight: React.MutableRefObject<number>,
  scrollRef: React.MutableRefObject<ScrollView>,
  setAutoScrollMoveLength: React.Dispatch<React.SetStateAction<number>>,
  setNowChangingFileIndex: React.Dispatch<React.SetStateAction<number>>,
  setComponentPositionY: any,
  nowDy: React.MutableRefObject<number>,
  // files:  FileInfo[],
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>,
  setCopiedFiles:  React.Dispatch<React.SetStateAction<CopiedFileInfo[]>>,
  setBody: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setScrollViewMoveState(moveState => {
    setNowScrollViewPosition(scrollViewPosition => {
      // const isEndTopPosition = scrollViewPosition < 10;
      // let moveToPosition;
      // const isEndBottomPosition = scrollViewPosition > maxScrollDown;
      const isEndBottomPosition = scrollViewPosition > canScrollDownHeight.current;
      const isEndTopPosition = scrollViewPosition < 0;
      let toMoveLength;
      if(moveState === "fastUpPosition") {
        if(isEndTopPosition) {
          return scrollViewPosition;
        }
        toMoveLength = -10;
      } else if (moveState === "slowUpPosition") {
        if(isEndTopPosition) {
          return scrollViewPosition;
        }
        toMoveLength = -5;
      } else if (moveState === "fastDownPosition") {
        if(isEndBottomPosition) {
          return scrollViewPosition;
        }
        toMoveLength = 10
      } else if (moveState === "slowDownPosition") {
        if(isEndBottomPosition) {
          return scrollViewPosition;
        }
        toMoveLength = 5;
      }

      let moveToPosition = toMoveLength ? scrollViewPosition+toMoveLength : null;
  
      if(moveToPosition){
        scrollRef.current.scrollTo({y:moveToPosition});

        setAutoScrollMoveLength(prevAutoScrollHeight => {

          setNowChangingFileIndex(nowIndex =>{
          // setDy(nowDy => {
            setFiles(files =>{
              setComponentPositionY(prevPositionYArr=>{
                const inScrollViewPosition = prevAutoScrollHeight + nowDy.current;
                return findPosition(inScrollViewPosition,prevPositionYArr,files[nowIndex].uri,setCopiedFiles,setBody);
              });
              return files;
            });
          //   return nowDy;
          // });
          return nowIndex;
        });

          return prevAutoScrollHeight + toMoveLength;
        });
      }

      return moveToPosition ?? scrollViewPosition;
    });
    return moveState;
  });


    // useRef 말고 useState 쓴 애. 문제 없으면 걍 지워
  // setCanScrollDownHeight(maxScrollDown => {
  //   setScrollViewMoveState(moveState => {
  //     setNowScrollViewPosition(scrollViewPosition => {
  //       // const isEndTopPosition = scrollViewPosition < 10;
  //       // let moveToPosition;
  //       // const isEndBottomPosition = scrollViewPosition > maxScrollDown;
  //       const isEndBottomPosition = scrollViewPosition > maxScrollDown;
  //       const isEndTopPosition = scrollViewPosition < 0;
  //       let toMoveLength;
  //       // let moveToPosition;
  //       if(moveState === "fastUpPosition") {
  //         if(isEndTopPosition) {
  //           return scrollViewPosition;
  //         }
  //         // moveToPosition = scrollViewPosition-10;
  //         toMoveLength = -10;
  //       } else if (moveState === "slowUpPosition") {
  //         if(isEndTopPosition) {
  //           return scrollViewPosition;
  //         }
  //         // moveToPosition = scrollViewPosition-5;
  //         toMoveLength = -5;
  //       } else if (moveState === "fastDownPosition") {
  //         if(isEndBottomPosition) {
  //           return scrollViewPosition;
  //         }
  //         // moveToPosition = scrollViewPosition+10;
  //         toMoveLength = 10
  //       } else if (moveState === "slowDownPosition") {
  //         if(isEndBottomPosition) {
  //           return scrollViewPosition;
  //         }
  //         // moveToPosition = scrollViewPosition+5;
  //         toMoveLength = 5;
  //       }

  //       let moveToPosition = toMoveLength ? scrollViewPosition+toMoveLength : null;
    
  //       if(moveToPosition){
  //         scrollRef.current.scrollTo({y:moveToPosition});

  //         setAutoScrollMoveLength(prevAutoScrollHeight => {

  //           setNowChangingFileIndex(nowIndex =>{
  //           setDy(nowDy => {
  //             setComponentPositionY(prevPositionYArr=>{
  //               const inScrollViewPosition = prevAutoScrollHeight + nowDy;
  //               return findPosition(inScrollViewPosition,prevPositionYArr,files[nowIndex].uri,setCopiedFiles,setBody);
  //             });
  //             return nowDy;
  //           });
  //           return nowIndex;
  //         });

  //           return prevAutoScrollHeight + toMoveLength;
  //         });
  //       }

  //       return moveToPosition ?? scrollViewPosition;
  //     });
  //     return moveState;
  //   });
  //   return maxScrollDown;
  // });
};

export default ifMoveEndOfScreenThenAutoScroll;