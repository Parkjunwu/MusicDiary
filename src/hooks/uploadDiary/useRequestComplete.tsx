import useUploadDiaryMutation, { useUploadDiaryMutationProps } from "./useUploadDiaryMutation";

type useRequestCompleteProps = {
  showDiary: boolean,
  requestMessage?: string,
} & useUploadDiaryMutationProps;

const useRequestComplete = (props: useRequestCompleteProps) => {

  const {
    showDiary,
    requestMessage,
    ...rest
  } = props;

  const { loading, executeUploadDiary } = useUploadDiaryMutation(rest);
  
  const uploadDiaryWithRequest = () => executeUploadDiary({
    requestMusic: true,
    showDiary,
    ...(requestMessage && { requestMessage }),
  });

  const uploadDiaryWithoutRequest = () => executeUploadDiary({
    requestMusic: false,
  });

  // // 버튼 누르면 upload 실행. async 안써도 될듯 await 하나씩이라
  // const onPressUpload = () => Alert.alert("음악 지정을 요청하시겠습니까?","운영자가 일기에 어울리는 음악을 직접 지정해줍니다.",[
  //   {
  //     text:"신청",
  //     onPress:()=>uploadDiaryWithRequest(),
  //   },
  //   {
  //     text:"취소",
  //     style:"destructive"
  //   },
  // ]);
  
  return {
    loading,
    onPressComplete: uploadDiaryWithRequest,
    onPressCompleteWithoutRequest: uploadDiaryWithoutRequest,
  };
};

export default useRequestComplete;