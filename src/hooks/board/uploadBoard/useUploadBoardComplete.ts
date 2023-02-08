import { Alert } from "react-native";
import { MAX_FILE_NUMBER } from "../../../components/upload/PlusPhotoBtn";
import useUploadBoardMutation, { useUploadBoardMutationProps } from "./useUploadBoardMutation";

// type UploadBoardProps = NativeStackScreenProps<BoardTabStackParamsList,"UploadBoard">;

const useUploadBoardComplete = (props: useUploadBoardMutationProps) => {

  const { loading, executeUploadBoard } = useUploadBoardMutation(props);
  
  // const uploadBoardWithoutRequest = () => executeUploadBoard({
  //   requestMusic: false,
  // });

  // const navigation = useNavigation<UploadBoardProps["navigation"]>();

  // 버튼 누르면 upload 실행. async 안써도 될듯 await 하나씩이라
  const onPressUpload = () => {

    const {
      files,
      title,
      body,
      // youtubeIdRef,
    } = props;

    if(title === "") return Alert.alert("제목을 입력해 주세요.");

    const noFileAndBody = files.length === 0 && body.length === 1 && body[0] === "";

    if(noFileAndBody) return Alert.alert("내용을 입력해 주세요.");

    // 이걸 할 필요가 있을 지는 모르겠지만 걍 넣음.
    if(files.length > MAX_FILE_NUMBER) return Alert.alert("10장 이상의 사진을 업로드 하실 수 없습니다.");

    // if(!youtubeIdRef.current) {

    //   Alert.alert("음악 지정을 요청하시겠습니까?","운영자가 일기에 어울리는 음악을 직접 지정해줍니다.",[
    //     {
    //       text:"신청",
    //       onPress:()=>navigation.navigate("RequestSong",props),
    //     },
    //     {
    //       text:"신청 안함",
    //       onPress: uploadBoardWithoutRequest,
    //     },
    //     {
    //       text:"돌아가기",
    //     },
    //   ]);
    // } else {
    //   uploadBoardWithoutRequest();
    // }
    executeUploadBoard();
  };

  
  return {
    loading,
    onPressUpload,
  };
};

export default useUploadBoardComplete;