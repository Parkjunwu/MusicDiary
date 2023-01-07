import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import Ionicons from "react-native-vector-icons/Ionicons";

const SubmitBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  color: ${colors.blue};
  /* font-size: 16px; */
  margin-right: 7px;
`;

type LocalDBUploadDiaryProps = NativeStackNavigationProp<UploadDiaryTabStackParamsList,"UploadDiary">;

type useLocalDBUploadMakeSubmitBtnAndCancelBtnOnHeaderProps = {
  body: string;
  title: string;
  youtubeId: string | null;
  onPressSubmit: () => Promise<void>;
  onPressCancel: () => true;
};

const useLocalDBUploadMakeSubmitBtnAndCancelBtnOnHeader = ({
  body,
  title,
  youtubeId,
  onPressSubmit,
  onPressCancel,
}:useLocalDBUploadMakeSubmitBtnAndCancelBtnOnHeaderProps) => {

  const navigation = useNavigation<LocalDBUploadDiaryProps>();
  const [loading,setLoading] = useState(false);
  
  // whichComponent 안받아도 되겠지? 쓰는 곳에선 변경될 일이 없으니
  const onPressSubmitWithLoading = async() => {
    setLoading(true);
    await onPressSubmit();
    setLoading(false);
  };

  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=>(
        loading ? 
          <SubmitBtnText fontSize={16}>작성중..</SubmitBtnText>
        :
          <TouchableOpacity onPress={onPressSubmitWithLoading}>
            <SubmitBtnText fontSize={16}>{"작성"}</SubmitBtnText>
          </TouchableOpacity>
      ),
      headerLeft:({tintColor}) => <TouchableOpacity onPress={onPressCancel}>
        <Ionicons name={"chevron-back"} size={24} color={tintColor}/>
      </TouchableOpacity>
    });
  },[body,title,youtubeId,loading]); // headerRight 의존성
};

export default useLocalDBUploadMakeSubmitBtnAndCancelBtnOnHeader;

// 안씀