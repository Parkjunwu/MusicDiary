import { ListRenderItem } from "react-native";
import { useWindowDimensions } from 'react-native';
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import DiaryLoading from "../../../components/myDiary/DiaryLoading";
import BodyText from "../../../components/myDiary/BodyText";
import DiaryVideoOrImage from "../../../components/myDiary/DiaryVideoOrImage";
import { NotificationTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { seeNotifiedMyDiary, seeNotifiedMyDiaryVariables } from "../../../__generated__/seeNotifiedMyDiary";
import { DIARY_FRAGMENT } from "../../../gql/fragment";
// import DiaryHeaderComponent from "../../../components/diary/DiaryHeaderComponent";
// import DiaryFooterComponent from "../../../components/diary/DiaryFooterComponent";
// import DiaryDropDown from "../../../components/diary/DiaryDropDown";

const SEE_NOTIFIED_MY_DIARY = gql`
  query seeNotifiedMyDiary($id: Int!) {
    seeNotifiedMyDiary(id:$id) {
      diary {
        ...DiaryFragment
      }
      error
    }
  }
  ${DIARY_FRAGMENT}
`;

type NotificationDiaryProps = NativeStackScreenProps<NotificationTabStackParamsList,"NotificationDiary">;

// Diary 랑 똑같고 title 이랑 createdAt 을 더 받음.

const NotificationDiary = ({navigation,route}:NotificationDiaryProps) => {

  // 이게 navigate 로 param 받은거라 캐시 업데이트가 안됨. 여기서 또 받든지 아님 캐시에서 받든지 근데 캐시에서 받은 애를 또 state 에 넣으니까 똑같이 또 안받아져. 걍 여기서 받자
  // const id = route.params.id;
  // const title = route.params.title;
  // const isLiked = route.params.isLiked;
  // const createdAt = route.params.createdAt;
  // const user = route.params.user;
  // const likes = route.params.likes;
  // const commentNumber = route.params.commentNumber;

  // useEffect(()=>{
  //   navigation.setOptions({
  //     title,
  //   });
  // },[]);

  const { loading, error, data } = useQuery<seeNotifiedMyDiary,seeNotifiedMyDiaryVariables>(SEE_NOTIFIED_MY_DIARY, {
    // fetchPolicy: 'network-only', 이 pagination 에 걸릴 수 있음. 만약 그러면 걍 refetch. 얘는 근데 pagination 안쓰니 괜찮을듯.
    // fetchPolicy: 'network-only',
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    variables: {
      id: route.params.id,
    },
  });
  console.log(data)
  
  useEffect(()=>{
    if(data){
      const diaryInfo = data.seeNotifiedMyDiary;
      navigation.setOptions({
        title:diaryInfo?.diary?.title,
        // headerRight:()=><DiaryDropDown
        //   diaryId={diaryInfo.id}
        //   isMine={diaryInfo.isMine}
        //   file={diaryInfo.file}
        //   body={diaryInfo.body}
        //   title={title}
        // />
      });
    }
  },[data]);
  
  const { width:windowWidth } = useWindowDimensions();

  const isDarkMode = useIsDarkMode();

  if(loading) {
    return <DiaryLoading {...route.params} />;
  }

  // 에러인 경우도 생성해야함

  const sortedData = data && data.seeNotifiedMyDiary?.diary?.body.map((bodyString:string,index:number) => ({body:bodyString,file:data.seeNotifiedMyDiary?.diary?.file[index]}));


  const renderItem:ListRenderItem<{body?:string,file?:string}> = ({item}) => {
    const file = item.file;
    const body = item.body;
    const fileWidth = windowWidth - 20;
    return (
      <>
        {body !== "" && <BodyText>{body}</BodyText>}
        {file && <DiaryVideoOrImage uri={file} fileWidth={fileWidth} />}
      </>
    );
  };

  return (
    <KeyboardAwareFlatList
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "black" : "white",
        padding: 10,
      }}
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item,index)=>index+""}
        // ListHeaderComponent={<DiaryHeaderComponent {...data?.seeDiary} title={title} user={user} createdAt={createdAt} />}
        // ListFooterComponent={<DiaryFooterComponent {...data?.seeDiary} user={user} />}
    />
  );
};

export default NotificationDiary;