import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { Alert } from "react-native";
import { TEMPORARY_UPLOAD_BOARD } from "../../../temporaryBoard/constant";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../../types/upload/fileType";

type UploadBoardProps = NativeStackNavigationProp<BoardTabStackParamsList,"UploadBoard">;

type useUploadBoardCancelLogicProps = {
  setFiles: (value: React.SetStateAction<FileInfo[]>) => void;
  setTitle: (value: React.SetStateAction<string>) => void;
  setBody: (value: React.SetStateAction<string[]>) => void;
};

const useUploadBoardCancelLogic = ({
  setFiles,
  setTitle,
  setBody,
}: useUploadBoardCancelLogicProps) => {

  const navigation = useNavigation<UploadBoardProps>();

  const onPressCancel = useCallback(
    () => {
      const goBack = () => navigation.goBack();
      // BackHandler state 못받아서 setState 씀
      setFiles(prevFile=>{
        setTitle(prevTitle=>{
          setBody(prevBody=>{
            
            const isSomethingWrite = prevFile.length !== 0 || !(prevBody.length === 1 && prevBody[0] === "") || prevTitle !== "";
            
            // 실제 로직
            if(isSomethingWrite) {
              Alert.alert("일기 작성을 취소하시겠습니까?",undefined,[
                {
                  text:"취소하고 뒤로가기",
                  onPress:()=>{
                    goBack();
                    const temporaryData = {
                      title: prevTitle,
                      body: prevBody,
                      files: prevFile,
                    };
                    AsyncStorage.setItem(TEMPORARY_UPLOAD_BOARD,JSON.stringify(temporaryData));
                  },
                  style:"destructive"
                },
                {
                  text:"계속 작성",
                }]
              );
            } else {
              goBack();
            }
            // 실제 로직 여기까지

            return prevBody;
          });
          return prevTitle;
        });
        return prevFile;
      });
      
      return true; // BackHandler 위한 애
    },
    // [youtubeIdRef.current]
    []
  );

  return onPressCancel;
};

export default useUploadBoardCancelLogic;