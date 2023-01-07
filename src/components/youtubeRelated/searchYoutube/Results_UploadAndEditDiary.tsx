import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BaseSharedStackNavStackParamsList, UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import Results from "./Results";
import { OnFinishSelectionType, ResultsUploadAndEditDiaryProps } from "./resultsType";

const Results_UploadAndEditDiary = (props:ResultsUploadAndEditDiaryProps) => {

  const {
    routeFrom,
    ...rest
  } = props;

  const navigation = useNavigation<CompositeNavigationProp<NativeStackNavigationProp<UploadDiaryTabStackParamsList>,NativeStackNavigationProp<BaseSharedStackNavStackParamsList>>>();

  const onFinishSelection: OnFinishSelectionType = ({youtubeId,youtubeTitle} :{youtubeId:string,youtubeTitle:string}) => {
    // navigation.navigate("UploadDiary",{
    navigation.navigate(routeFrom,{
      youtubeId,
      youtubeTitle,
    });
    return true;
  };
  
  return (
    <Results
      {...rest}
      onFinishSelection={onFinishSelection}
    />
  );
};

export default Results_UploadAndEditDiary;