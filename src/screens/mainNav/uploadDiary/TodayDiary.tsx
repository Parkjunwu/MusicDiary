import styled from "styled-components/native";
import BaseContainer from "../../../components/shared/BaseContainer";
import { FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import useMe from "../../../hooks/useMe";
import NotificationBtn from "../../../components/todayDiary/NotificationBtn";
import WriteDiaryBtn from "../../../components/todayDiary/WriteDiaryBtn";
import TodayDiaryListItem from "../../../components/todayDiary/TodayDiaryListItem";
import SafeAreaContainer from "../../../components/upload/SafeAreaContainer";
import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "../../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";

const NoDiaryTopContainer = styled.View`
  flex-direction: row;
  flex: 6;
`;
const RowContainer = styled.View`
  flex: 1;
`;
const MainTextView = styled.View`
  /* flex: 1; */
`;
const ColumnContainer = styled.View`
  flex: 1;
`;
const ColumnEmptyContainer = styled.View`
  flex: 2;
`;
const TopContainer = styled.View`
  flex-direction: row;
  min-height: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
  /* background-color: tomato; */
`;
const TodayDiaryText = styled(FontAppliedBoldTextNeedFontSize)`
  
`;
const TodayDiaryFlatList = styled.FlatList`
  flex: 9;
`;
const NoDiaryTodayText = styled(FontAppliedBoldTextNeedFontSize)`
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
`;
const WriteDiaryContainer = styled.View`
  flex: 9;
`;

type TodayDiaryProps = {
  numberOfUnreadIfZeroIsNull?: number|null;
};
// & NativeStackScreenProps<UploadDiaryTabStackParamsList,"TodayDiary">;

const TodayDiary = ({numberOfUnreadIfZeroIsNull}:TodayDiaryProps) => {

  // 오늘 작성한 일기가 있을 때의 화면 만들어야함. 아직 안만듦
  const { data } = useMe();
  
  const todayDiaries = data?.me?.todayDiaries;
  // console.log("todayDiaries : " + JSON.stringify(todayDiaries))
  const isTodayDiaries = todayDiaries && todayDiaries.length !== 0;

  const diaryImageMarginHorizontal = 6;
  const diaryImagePaddingHorizontal = 20;
  const spaceHorizontal = diaryImageMarginHorizontal*2 + diaryImagePaddingHorizontal*2;
  const {layoutWidth,imageWidth} = useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20(spaceHorizontal);

  return(
    <SafeAreaContainer>
      <BaseContainer>
        {isTodayDiaries ?
          <>
            <TopContainer>
              <ColumnContainer/>
              <TodayDiaryText fontSize={18}>오늘의 일기</TodayDiaryText>
              <ColumnContainer>
                <NotificationBtn
                  numberOfUnreadIfZeroIsNull={numberOfUnreadIfZeroIsNull}
                />
              </ColumnContainer>
            </TopContainer>
            <TodayDiaryFlatList
              data={todayDiaries}
              renderItem={({item})=><TodayDiaryListItem
                item={item}
                imageWidth={imageWidth}
                imageMarginHorizontal={diaryImageMarginHorizontal}
                imagePaddingHorizontal={diaryImagePaddingHorizontal}
                maxWidth={layoutWidth}
              />}
              keyExtractor={(item)=>item?.id + ""}
            />
            <WriteDiaryBtn
              size="small"
            />
          </>
        :
          <>
            <NoDiaryTopContainer>
              <RowContainer/>
              <MainTextView>
                <NoDiaryTodayText fontSize={20}>오늘의 일기를 작성해주세요!</NoDiaryTodayText>
              </MainTextView>
              <RowContainer>
                <ColumnContainer>
                  <NotificationBtn
                    numberOfUnreadIfZeroIsNull={numberOfUnreadIfZeroIsNull}
                  />
                </ColumnContainer>
                <ColumnEmptyContainer/>
              </RowContainer>
            </NoDiaryTopContainer>
            <WriteDiaryContainer>
              <WriteDiaryBtn
                size="big"
              />
            </WriteDiaryContainer>
          </>
        }
      </BaseContainer>
    </SafeAreaContainer>
  );
};

export default TodayDiary;


// import styled from "styled-components/native";
// import BaseContainer from "../../../components/shared/BaseContainer";
// import { FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
// import useMe from "../../../hooks/useMe";
// import NotificationBtn from "../../../components/todayDiary/NotificationBtn";
// import WriteDiaryBtn from "../../../components/todayDiary/WriteDiaryBtn";
// import { FlatList } from "react-native";
// import TodayDiaryListItem from "../../../components/todayDiary/TodayDiaryListItem";
// import SafeAreaContainer from "../../../components/upload/SafeAreaContainer";

// const EmptyView = styled.View`
//   height: 55px;
// `;
// const NotificationView = styled(EmptyView)`
//   position: relative;
//   /* background-color: red; */
//   align-items: center;
//   justify-content: center;
// `;
// const TodayDiaryText = styled(FontAppliedBoldTextNeedFontSize)`
//   /* font-size: 18px; */
// `;
// const NoDiaryToday = styled.View`
//   flex: 4;
//   align-items: center;
//   text-align: center;
// `;
// const NoDiaryTodayText = styled(FontAppliedBoldTextNeedFontSize)`
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   /* font-size: 20px; */
//   margin: auto;
// `;
// const WriteDiaryContainer = styled.View`
//   flex: 9;
// `;

// type TodayDiaryProps = {
//   numberOfUnreadIfZeroIsNull?: number|null;
// };
// // & NativeStackScreenProps<UploadDiaryTabStackParamsList,"TodayDiary">;

// const TodayDiary = ({numberOfUnreadIfZeroIsNull}:TodayDiaryProps) => {

//   // 오늘 작성한 일기가 있을 때의 화면 만들어야함. 아직 안만듦
//   const { data } = useMe();
  
//   const todayDiaries = data?.me?.todayDiaries;
//   // console.log("todayDiaries : " + JSON.stringify(todayDiaries))
//   const isTodayDiaries = todayDiaries && todayDiaries.length !== 0;

//   return(
//     <SafeAreaContainer>
//       <BaseContainer>
//         <NotificationView>
//           {isTodayDiaries && <TodayDiaryText fontSize={18}>오늘의 일기</TodayDiaryText>}
//           <NotificationBtn
//             numberOfUnreadIfZeroIsNull={numberOfUnreadIfZeroIsNull}
//           />
//         </NotificationView>
//         {isTodayDiaries ?
//           <>
//             <FlatList
//               data={todayDiaries}
//               renderItem={({item})=><TodayDiaryListItem item={item}/>}
//               keyExtractor={(item)=>item?.id + ""}
//             />
//             <WriteDiaryBtn
//               size="small"
//             />
//           </>
//           :
//           <>
//             <NoDiaryToday>
//               <NoDiaryTodayText fontSize={20}>오늘의 일기를 작성해주세요!</NoDiaryTodayText>
//             </NoDiaryToday>
//             <EmptyView/>
//             <WriteDiaryContainer>
//               <WriteDiaryBtn
//                 size="big"
//               />
//             </WriteDiaryContainer>
//           </>
//         }
//       </BaseContainer>
//     </SafeAreaContainer>
//   );
// };

// export default TodayDiary;