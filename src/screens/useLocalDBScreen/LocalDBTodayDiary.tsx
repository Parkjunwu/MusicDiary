import styled from "styled-components/native";
import BaseContainer from "../../components/shared/BaseContainer";
import { FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { getTodayDiaries } from "../../realm";
import SafeAreaContainer from "../../components/upload/SafeAreaContainer";
import { FlatList } from "react-native";
import WriteDiaryBtn from "../../components/todayDiary/WriteDiaryBtn";
import LocalDBTodayDiaryListItem from "../../components/useLocalDBScreen/localDBTodayDiary/LocalDBTodayDiaryListItem";

const EmptyView = styled.View`
  height: 55px;
`;
const NotificationView = styled(EmptyView)`
  position: relative;
  /* background-color: red; */
  align-items: center;
  justify-content: center;
`;
const TodayDiaryText = styled(FontAppliedBoldTextNeedFontSize)`
  /* font-size: 18px; */
`;
const NoDiaryToday = styled.View`
  flex: 4;
  align-items: center;
  text-align: center;
`;
const NoDiaryTodayText = styled(FontAppliedBoldTextNeedFontSize)`
  justify-content: center;
  align-items: center;
  text-align: center;
  /* font-size: 20px; */
  margin: auto;
`;
const WriteDiaryContainer = styled.View`
  flex: 9;
`;

// type LocalDBTodayDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"TodayDiary">;

const LocalDBTodayDiary = () => {

  // 오늘 작성한 일기가 있을 때의 화면 만들어야함
  const todayDiaries = getTodayDiaries();
  const isTodayDiaries = todayDiaries.length !== 0;

  return(
    <SafeAreaContainer>
      <BaseContainer>
        <NotificationView>
          {isTodayDiaries && <TodayDiaryText fontSize={18}>오늘의 일기</TodayDiaryText>}
        </NotificationView>
        {isTodayDiaries ?
          <>
            <FlatList
              data={todayDiaries}
              renderItem={({item})=><LocalDBTodayDiaryListItem item={item}/>}
              keyExtractor={(item)=>item?.id + ""}
            />
            <WriteDiaryBtn
              size="small"
            />
          </>
          :
          <>
            <NoDiaryToday>
              <NoDiaryTodayText fontSize={20}>오늘의 일기를 작성해주세요!</NoDiaryTodayText>
            </NoDiaryToday>
            <EmptyView/>
            <WriteDiaryContainer>
              <WriteDiaryBtn
                size="big"
              />
            </WriteDiaryContainer>
          </>
        }
      </BaseContainer>
    </SafeAreaContainer>
  )
};

export default LocalDBTodayDiary;