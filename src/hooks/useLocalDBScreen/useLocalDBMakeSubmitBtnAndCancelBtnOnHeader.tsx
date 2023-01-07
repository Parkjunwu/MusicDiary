import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import Ionicons from "react-native-vector-icons/Ionicons";

const SubmitBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  color: ${colors.blue};
  margin-right: 7px;
`;

type LocalDBUploadDiaryProps = NativeStackNavigationProp<UploadDiaryTabStackParamsList,"UploadDiary" | "EditDiary">;

type useLocalDBMakeSubmitBtnAndCancelBtnOnHeaderProps = {
  body: string;
  title: string;
  youtubeId: string | null;
  onPressSubmit: () => Promise<void>;
  onPressCancel: () => boolean;
  whichComponent: "LocalDBUploadDiary"|"LocalDBEditDiary" | "LocalDBEditDiaryForTemporaryDiaryData";
};

const useLocalDBMakeSubmitBtnAndCancelBtnOnHeader = ({
  body,
  title,
  youtubeId,
  onPressSubmit,
  onPressCancel,
  whichComponent,
}:useLocalDBMakeSubmitBtnAndCancelBtnOnHeaderProps) => {

  const isLocalDBUploadDiary = whichComponent === "LocalDBUploadDiary";

  const [loading,setLoading] = useState(false);
  
  // whichComponent 안받아도 되겠지? 쓰는 곳에선 변경될 일이 없으니
  const onPressSubmitWithLoading = async() => {
    setLoading(true);
    await onPressSubmit();
    setLoading(false);
  };

  const navigation = useNavigation<LocalDBUploadDiaryProps>();

  useEffect(()=>{
    const submitText = isLocalDBUploadDiary ? "작성" : "수정";

    navigation.setOptions({
      headerRight:()=>(
        loading ? 
          <SubmitBtnText fontSize={16}>작성중..</SubmitBtnText>
        :
          <TouchableOpacity onPress={onPressSubmitWithLoading}>
            <SubmitBtnText fontSize={16}>{submitText}</SubmitBtnText>
          </TouchableOpacity>
      ),
      headerLeft:({tintColor}) => <TouchableOpacity onPress={onPressCancel}>
        <Ionicons name={isLocalDBUploadDiary ? "chevron-back" : "close"} size={24} color={tintColor}/>
      </TouchableOpacity>
    });
  },[body,title,loading,youtubeId]);
};

export default useLocalDBMakeSubmitBtnAndCancelBtnOnHeader;