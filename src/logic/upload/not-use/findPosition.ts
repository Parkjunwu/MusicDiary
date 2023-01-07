import { CopiedFileInfo } from "../../../types/upload/fileType";

const findPosition = (
  dy: number,
  prevPositionYArr: ({ bottomHeight:number, uri:string, } | number[])[],
  file: string,
  setCopiedFiles: React.Dispatch<React.SetStateAction<CopiedFileInfo[]>>,
  setBody: React.Dispatch<React.SetStateAction<string[]>>
) => {

  // console.log("prevPositionYArr")
  // console.log(prevPositionYArr)

  const isFileNotMoveFromFirstPosition = dy === 0;
  const isFileMoveDownFromFirstPosition = dy < 0;
  
  if(isFileNotMoveFromFirstPosition) {
    return prevPositionYArr;
  }

  // setComponentPositionY 에 uri 넣고 걔로 받음. fileIndex 업데이트가 안됨.
  const thisFileIndex = (prevPositionYArr.findIndex(element=>element.uri === file) - 1) / 2;
  const updatedComponentIndexOnComponentPositionY = (thisFileIndex * 2) + 1;

  // 라인은 나중에 구현
  let whereFilePutOn: { index:number };
  for(let index = 0; index < prevPositionYArr.length; index++) {
    const isPutOnFile = index%2 === 1;
    // if(dy < 0) {
    // 위로 올라간 경우. 
    if(isFileMoveDownFromFirstPosition) {
      const isIndexAfterThanComponentIndex = index > updatedComponentIndexOnComponentPositionY || index === updatedComponentIndexOnComponentPositionY;
      if(isIndexAfterThanComponentIndex) {
        break;
      }
      // 얘는 컴포넌트의 바닥쪽보다 파일의 상단이 넘어왔느냐로 판단.
      // 위의 TextInput 바닥 높이 === 파일의 위쪽 높이
      const rightAboveTextInput = prevPositionYArr[updatedComponentIndexOnComponentPositionY-1];
      const releaseFilePosition = rightAboveTextInput[rightAboveTextInput.length-1] + dy;
      const filePutOnPosition = prevPositionYArr[index];
      // 컴포넌트의 바닥보다 파일이 위로 넘어왔느냐
      // 넘은 컴포넌트가 이미지일 경우
      // if(index%2 === 1) {
      if(isPutOnFile) {
        // 안넘으면 넘어감.
        if(!(filePutOnPosition.bottomHeight > releaseFilePosition)) continue;
        // 아래 있는 File 의 절반을 넘었냐
        const putOnFilePosition = prevPositionYArr[index].bottomHeight;
        const putOnFileAboveTextInput = prevPositionYArr[index-1];
        const putOnFileAboveTextInputPosition = putOnFileAboveTextInput[putOnFileAboveTextInput.length-1];
        const putOnFileHeight = putOnFilePosition - putOnFileAboveTextInputPosition;
        const divideHalfHeight = putOnFileAboveTextInputPosition + (putOnFileHeight/2);
        // 절반보다 위면 해당 index, 아래면 아래 index. 인데 아래는 TextInput 이라서 line:0 까지 줘
        const isReleasePositionMoreThanHalf = releaseFilePosition < divideHalfHeight;

        whereFilePutOn = isReleasePositionMoreThanHalf ? { index } : { index:index+2 };
        break;

      // 넘은 컴포넌트가 TextInput일 경우
      } else {
        // 안넘으면 넘어감.
        const putOnTextInputPosition = filePutOnPosition[filePutOnPosition.length-1];
        if(!(putOnTextInputPosition > releaseFilePosition)) continue;

        whereFilePutOn = { index:index+1 };
        break;
        // 이건 아래 있는 TextInput 의 몇째줄에 있느냐
        // if(!(filePutOnPosition[filePutOnPosition.length-1] > releaseFilePosition))  continue;
        // const putOnTextInput = prevPositionYArr[index];
        // const putOnLine = putOnTextInput.findIndex(bottomPosition => bottomPosition > releaseFilePosition);
        // // 걸친 줄의 절반을 넘었느냐
        // const halfOfLine = putOnTextInput[putOnLine] - marginBottom - halfLineHeight;
        // // 못넘으면 다음줄, 다음줄이 없으면 다음 이미지 위에
        // if(releaseFilePosition < halfOfLine) {
        //   whereFilePutOn = { index, line: putOnLine};
        //   break;
        // } else {
        //   whereFilePutOn = putOnTextInput.length === putOnLine+1 ? { index:index+1 } : { index, line:putOnLine+1 };
        //   break;
        // }
      }

    // 아래로 내려간 경우 (dy > 0)
    } else {
      const isIndexBeforeThanComponentIndex = index < updatedComponentIndexOnComponentPositionY || index === updatedComponentIndexOnComponentPositionY;

      if(isIndexBeforeThanComponentIndex) {
        continue;
      }
      const releaseFilePosition = prevPositionYArr[updatedComponentIndexOnComponentPositionY].bottomHeight + dy;
      // 얘는 컴포넌트의 위쪽보다 이미지의 바닥이 넘어왔느냐로 판단
      const nowPutOnComponent = prevPositionYArr[index];
      // 넘은 컴포넌트가 이미지일 경우
      // if(index%2 === 1) {
      if(isPutOnFile) {
        // console.log("index%2 === 1");
        // return componentTopPosition < releaseFilePosition;
        // 현재 컴포넌트에 걸쳐있는지는 바닥 높이로 확인
        const putOnFilePosition = prevPositionYArr[index].bottomHeight;
        if(putOnFilePosition < releaseFilePosition) continue;

        const putOnFileAboveTextInput = prevPositionYArr[index-1];
        const putOnFileAboveTextInputPosition = putOnFileAboveTextInput[putOnFileAboveTextInput.length-1];
        const putOnFileHeight = putOnFilePosition - putOnFileAboveTextInputPosition;
        const divideHalfHeight = putOnFileAboveTextInputPosition + (putOnFileHeight/2);
        // 절반보다 위면 해당 index, 아래면 아래 index. 인데 아래는 TextInput 이라서 line:0 까지 줘
        const isReleasePositionLessThanHalf = divideHalfHeight > releaseFilePosition;
        whereFilePutOn = isReleasePositionLessThanHalf ? { index:index-2 } : { index:index };
        break;
      // 넘은 컴포넌트가 TextInput일 경우
      } else {
        // console.log("index%2 !!!!!== 1")
        const putOnTextInputPosition = nowPutOnComponent[nowPutOnComponent.length-1];
        // 현재 컴포넌트에 걸쳐있는지는 바닥 높이로 확인
        // 넘은 경우
        if(putOnTextInputPosition < releaseFilePosition) {
          // 마지막을 넘은 경우 끝냄
          if(prevPositionYArr.length-1 === index) {
            whereFilePutOn = { index:index-1 };
            break;
          // 그외 다음 컴포넌트 높이로 넘어가
          } else {
            continue;
          }
        }

        whereFilePutOn = { index:index-1 };
        break;

        
        // 이건 아래 있는 TextInput 의 몇째줄에 있느냐
        // if(nowComponentBottomY < releaseFilePosition) continue;
        // const putOnTextInput = prevPositionYArr[index];
        // const putOnLine = putOnTextInput.findIndex(bottomPosition => bottomPosition > releaseFilePosition);
        // // 걸친 줄의 절반을 넘었느냐
        // const halfOfLine = putOnTextInput[putOnLine] - marginBottom - halfLineHeight;
        // // 못넘으면 그줄 index(포함 안하는거)
        // if(releaseFilePosition < halfOfLine) {
        //   whereFilePutOn = { index, line:putOnLine };
        //   break;
        // } else {
        //   whereFilePutOn = putOnLine === putOnTextInput.length-1 ? { index:index+1 } : { index, line:putOnLine+1 };
        //   break;
        // }
      }
    }
  }

  // console.log("whereFilePutOn")
  // console.log(whereFilePutOn)

  
  const indexWhereFilePutOn = whereFilePutOn.index;
  setCopiedFiles(prevPositionYArr=>{
    const filteredArr = prevPositionYArr.filter((element) => element.uri !== "empty");
    // fileIndex 대신 따로 받음. panResponder 에서 업데이트 안됨.
    // let thisFileIndex;
    // const newArr = filteredArr.map((element,index) => {
    //   const uri = element.uri;
    //   if(uri === file) { thisFileIndex = index };
    //   return {...element,animatedIndex:false};
    // });
    const newArr = filteredArr.map((element) => ({...element,animatedIndex:false}));
    // 아래로 내려갈때 body 도 하나 추가해서 다시 세팅함.
    setBody(prevPositionYArr=>prevPositionYArr.filter((element) => element !== 0));
    // if(indexWhereFilePutOn % 2 === 1){
    const putOnIndex = (indexWhereFilePutOn - 1) / 2;
    if(putOnIndex === thisFileIndex) {
      // newArr[thisFileIndex].animatedIndex = true;
      newArr[thisFileIndex] = {
        ...newArr[thisFileIndex],
        animatedIndex:true,
        isEditingFile:true,
      };
    } else {
      // 이거 중요할듯? 아래로 내려갈때 줄을 하나 아래에 추가 + body 도 하나 추가해야 맞음.
      const inputIndexPosition = isFileMoveDownFromFirstPosition ? putOnIndex : putOnIndex + 1;
      // 키를 uri 로 받아서 uri 도 넣어줌
      newArr.splice(inputIndexPosition, 0, { uri:"empty", animatedIndex:true, isVideo:false, });
      isFileMoveDownFromFirstPosition && setBody(prevPositionYArr => {
        const newArr = [...prevPositionYArr];
        // string 아닌 값을 추가해서 렌더링은 안되나 배열은 늘어남. 여기선 0.
        newArr.splice(putOnIndex, 0, 0);
        return newArr;
      });
    }
    // } else {
    //   const putOnIndex = indexWhereFilePutOn / 2;
    //   if(putOnIndex !== fileIndex) {
    //     newArr.splice(putOnIndex, 0, {uri:"empty",animatedIndex:true});
    //   }
    // }
    return newArr;
  });
  return prevPositionYArr;
};

export default findPosition;
