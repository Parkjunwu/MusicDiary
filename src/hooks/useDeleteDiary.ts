import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { deleteDiary, deleteDiaryVariables } from "../__generated__/deleteDiary";

const DELETE_DIARY = gql`
  mutation deleteDiary($id: Int!){
    deleteDiary(id: $id) {
      ok
      error
    }
  }
`;

const useDeleteDiary = (diaryId:number) => {

  const navigation = useNavigation();

  const [deleteDiary] = useMutation<deleteDiary,deleteDiaryVariables>(DELETE_DIARY,{
    variables:{
      id:diaryId,
    },
    update:(cache,data)=>{
      // update:(cache,data,{variables})=>{  이래 써서 variables 받을 수 있음.
      // 그러면 const newDeleteDiary = async(id) => {await deleteDiary(id)}
      // return newDeleteDiary
      // 이렇게 해서 useDeleteDiary 에서 id 받는게 아니고 newDeleteDiary 에서 id 받을 수 있게 됨. 근데 굳이 필요는 없을듯?
      if(data.data?.deleteDiary.ok){
        cache.evict({ id: `Diary:${diaryId}` });
        cache.evict({ id: `Calendar:${diaryId}` });
        // useUploadDiaryMutation 에서 ref 가 아니고 쌩데이터를 넣어서 getMyDiaryList 가 안바뀜. 다른 애는 updateQuery 라서 되는듯. 근데 얘는 쓰기 애매함. 쓸거면 백엔드에서 isNotFetchMore 받아서 쓰던가 해야함.
        // cache.modify({ // modify 로 하고 rareDiary 넣으면 cache.evict 가 안먹음. 근데 어쩔수 없어서 이래 씀
        //   id:"ROOT_QUERY",
        //   fields:{
        //     getMyDiaryList(prev){
        //       if(!prev) return null;
        //       const { diaries, ...rest } = prev;
        //       if(!diaries) return prev;
        //       const filteredDiaries = diaries.filter(diary=>diary.id !== diaryId);
        //       return { diaries: [ ...filteredDiaries ], ...rest };
        //     },
        //   },
        // });
        
        // cache.gc();
        navigation.goBack();
        Alert.alert("삭제가 완료되었습니다.",undefined,[
          {
            text:"확인",
          }
        ]);
      } else if (data.data?.deleteDiary.error === "post not found") {
        Alert.alert("존재하지 않는 게시물입니다.","같은 오류가 지속적으로 발생 시 문의 주시면 감사드리겠습니다.",[
          {
            text:"확인",
          }
        ]);
      } else if (data.data?.deleteDiary.error === "Not authorized") {
        Alert.alert("다른 유저의 게시물을 삭제할 수 없습니다.",undefined,[
          {
            text:"확인",
          }
        ]);
      }
    }
  });

  return deleteDiary;
};

export default useDeleteDiary;