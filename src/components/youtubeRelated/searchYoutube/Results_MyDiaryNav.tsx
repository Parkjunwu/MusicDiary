import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { Alert } from "react-native";
import getUnknownErrorThenAlert from "../../../logic/getUnknownErrorThenAlert";
import { editOrDeleteYoutubeMusic, editOrDeleteYoutubeMusicVariables } from "../../../__generated__/editOrDeleteYoutubeMusic";
import Results from "./Results";
import { BaseResultsProps, OnFinishSelectionType } from "./resultsType";

const EDIT_OR_DELETE_YOUTUBE_MUSIC = gql`
  mutation editOrDeleteYoutubeMusic(
    $id:Int!,
    $youtubeId:String,
  ) {
    editOrDeleteYoutubeMusic(
      id:$id,
      youtubeId:$youtubeId,
    ) {
      ok
      error
    }
  }
`;

const Results_MyDiaryNav = (props:BaseResultsProps) => {

  const navigation = useNavigation();

  const [editOrDeleteYoutubeMusic] = useMutation<editOrDeleteYoutubeMusic,editOrDeleteYoutubeMusicVariables>(EDIT_OR_DELETE_YOUTUBE_MUSIC);

  const onFinishSelection: OnFinishSelectionType = async({diaryId,youtubeId}:{diaryId: number,youtubeId: string | null}) => {
    try {
      await editOrDeleteYoutubeMusic({
        variables:{
          id: diaryId,
          youtubeId,
        },
        update: (cache,result) => {
          const resultForm = result.data?.editOrDeleteYoutubeMusic;
          if(!resultForm) {
            return getUnknownErrorThenAlert();
          }
          const error = resultForm.error;
          if(error) {
            return Alert.alert(error);
          }
          cache.modify({
            id:`Diary:${diaryId}`,
            fields:{
              youtubeId(){
                return youtubeId;
              },
            },
          });
        },
      });

      navigation.goBack();

      return true;
    } catch (e) {
      console.error("Results_MyDiaryNav // editOrDeleteYoutubeMusic 에러 : "+e)
      return false;
    }
  };

  return (
    <Results
      {...props}
      onFinishSelection={onFinishSelection}
    />
  );
};

export default Results_MyDiaryNav;