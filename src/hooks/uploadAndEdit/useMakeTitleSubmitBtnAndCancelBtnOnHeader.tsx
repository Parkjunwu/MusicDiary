import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PlusPhotoBtn from "../../components/upload/PlusPhotoBtn";
// import UploadGoBackBtn from "../../components/upload/UploadGoBackBtn";
import { colors } from "../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../types/upload/fileType";
import Ionicons from "react-native-vector-icons/Ionicons";

// const SubmitBtnText = styled.Text`
//   color: ${colors.blue};
//   font-size: 16px;
//   font-weight: 600;
//   margin-right: 7px;
// `;
const SubmitBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  color: ${colors.blue};
  /* font-size: 16px; */
  margin-right: 7px;
`;

type UploadDiaryProps = NativeStackNavigationProp<UploadDiaryTabStackParamsList,"UploadDiary">;

type useMakeTitleSubmitBtnAndCancelBtnOnHeaderProps = {
  files: FileInfo[];
  body: string[];
  title: string;
  loading: boolean;
  // youtubeId: string | undefined | null,
  youtubeId: string | null,
  onPressSubmit: () => void;
  onPressCancel: () => boolean;
  whichComponent: "UploadDiary"|"EditDiary"|"EditDiaryForTemporaryDiaryData"|"UploadBoard"|"EditBoard";
  // getChangeStatus?: () => {
  //   isFileChanged: boolean;
  //   isTitleChanged: boolean;
  //   isBodyChanged: boolean;
  //   isNothingChanged: boolean;
  // };
};

const useMakeTitleSubmitBtnAndCancelBtnOnHeader = ({
  files,
  body,
  title,
  loading,
  youtubeId,
  onPressSubmit,
  onPressCancel,
  whichComponent,
  // getChangeStatus,
}:useMakeTitleSubmitBtnAndCancelBtnOnHeaderProps) => {

  const navigation = useNavigation<UploadDiaryProps>();

  useEffect(()=>{
    // const isSomethingWrite = files.length !== 0 || !(body.length === 1 && body[0] === "") || title !== "" || Boolean(youtubeId);

    // const alertCheck = getChangeStatus === undefined ? isSomethingWrite : isSomethingWrite && !getChangeStatus().isNothingChanged;

    const isUploadComponent = whichComponent === "UploadDiary" ||  whichComponent === "UploadBoard";
    
    const submitText = isUploadComponent ? "업로드" : "수정";

    navigation.setOptions({
      headerRight:()=>(
        loading ? 
          <SubmitBtnText fontSize={16}>업로드중..</SubmitBtnText>
        :
          <TouchableOpacity onPress={onPressSubmit}>
            <SubmitBtnText fontSize={16}>{submitText}</SubmitBtnText>
          </TouchableOpacity>
      ),
      // headerLeft:({tintColor}: {tintColor:string}) => <UploadGoBackBtn
      //   tintColor={tintColor}
      //   whichComponent={whichComponent}
      //   alertCheck={alertCheck}
      // />,
      headerLeft:({tintColor}) => <TouchableOpacity onPress={onPressCancel}>
        <Ionicons name={isUploadComponent ? "chevron-back" : "close"} size={24} color={tintColor}/>
      </TouchableOpacity>,
      headerTitle:({tintColor}) => <PlusPhotoBtn
        tintColor={tintColor ?? ""} from={whichComponent} nowFileNumber={files.length}
      />,
    });
  },[body,files,title,loading,youtubeId]);
};

export default useMakeTitleSubmitBtnAndCancelBtnOnHeader;