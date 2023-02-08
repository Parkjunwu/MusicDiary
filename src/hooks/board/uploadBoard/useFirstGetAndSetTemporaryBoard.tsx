import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { TEMPORARY_UPLOAD_BOARD } from "../../../temporaryBoard/constant";
import { FileInfo } from "../../../types/upload/fileType";

type useFirstGetAndSetTemporaryBoardProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>;
};

const useFirstGetAndSetTemporaryBoard = ({
  setTitle,
  setBody,
  setFiles,
}: useFirstGetAndSetTemporaryBoardProps) => {
  useEffect(()=>{
    const getAndSetLocalDBTemporaryBoard = async () => {
      const TemporaryBoard = await AsyncStorage.getItem(TEMPORARY_UPLOAD_BOARD);
      // console.log("TemporaryBoard : " + TemporaryBoard);
      if(TemporaryBoard) {
        Alert.alert("임시 저장 되어있는 일기를 불러오시겠습니까?",undefined,[
          {
            text:"불러오기",
            onPress:()=>{
              const { title, body, files } = JSON.parse(TemporaryBoard);
              setTitle(title);
              setBody(body);
              // const sources = files.map(file=>{
              //   const {uri,...rest} = file;
              //   return {
              //     ...rest,
              //     uri:uri.substring(37,uri.length)
              //   }
              // });
              // const sources = files.map(file=>{
              //   return Image.resolveAssetSource(require(file))
              // });
              setFiles(files);
              // setFiles(sources);
              // 에러나면 ImageWithRealHeight 에서 변경함
            },
          },
          {
            text:"아니오",
            style:"destructive"
          },
        ]);
      }
    };

    getAndSetLocalDBTemporaryBoard();
  },[]);
};

export default useFirstGetAndSetTemporaryBoard;