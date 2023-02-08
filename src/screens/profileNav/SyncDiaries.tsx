import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import styled from "styled-components/native";
import { allRealmDiariesVar } from "../../apollo";
import { APP_PASSWORD } from "../../appPassword";
import updateMeCache from "../../cache/updateMeCache";
import updateThisMonthCalendarData from "../../cache/updateThisMonthCalendarData";
import PasswordInput from "../../components/profileDrawerNav/relatedPassword/PasswordInput";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
import { alreadyFetchedQuerySet } from "../../cursorPagination";
import { GET_MY_DIARY_LIST } from "../../gql/forCodeGen";
import { ME_QUERY } from "../../gql/manyWriteQuery";
import useSetPasswordFn from "../../hooks/profileDrawerNav/relatedPassword/useSetPasswordFn";
import { colors } from "../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { ProfileListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { getMyDiaryList, getMyDiaryListVariables } from "../../__generated__/getMyDiaryList";
import { me } from "../../__generated__/me";
import { synchronizeDiary, synchronizeDiaryVariables } from "../../__generated__/synchronizeDiary";

const SYNCHRONIZE_DIARY = gql`
  mutation synchronizeDiary($uploadDiaries:[diaryFormat]!) {
    synchronizeDiary(uploadDiaries:$uploadDiaries) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  /* background-color: ${props=>props.theme.backgroundColor}; */
  padding: 40px 20px;
  flex: 1;
`;
const TitleText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 20px; */
  margin-bottom: 20px;
`;
const SubText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 16px; */
`;
const BottomContainer = styled.View`
  flex: 1;
  padding-top: 40px;
  align-items: center;
`;
const IsPasswordBtn = styled.TouchableOpacity`
  border-radius: 10px;
  /* border-width: 2px;
  border-color: ${props=>props.theme.textColor}; */
  background-color: ${colors.brown};
  box-shadow: 2px 2px ${props=>props.theme.textColor};
`;
const IsPasswordBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 30px; */
  padding: 3px 10px;
`;
const SyncBtn = styled.TouchableOpacity<{disabled:boolean}>`
  opacity: ${props=>props.disabled ? 0.4 : 1};
`;
const SyncBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;

type SyncDiariesProp = NativeStackScreenProps<ProfileListTabStackParamsList,"SyncDiaries">;

const SyncDiaries = ({navigation,route}:SyncDiariesProp) => {

  const diaryNumber = route.params.allDiaryNumber;

  // 일기 있는지는 들어올때 체크해서 그냥 getRealmAllDiaries() 쓰면 될듯.
  const [synchronizeDiary] = useMutation<synchronizeDiary,synchronizeDiaryVariables>(SYNCHRONIZE_DIARY);

  const [showPassword,setShowPassword] = useState(false);

  const onPressIsPasswordBtn = async() => {
    const appPassword = await EncryptedStorage.getItem(APP_PASSWORD);
    appPassword ? setShowPassword(true) : Alert.alert("앱의 비밀번호가 지정되어있지 않습니다. 동기화를 위해선 비밀번호를 지정해야 합니다.","비밀번호 지정화면으로 이동하시겠습니까?",[
      {
        text:"이동",
        onPress:()=>navigation.navigate("SettingAppPassword"),
      },
      {
        text:"취소",
        style:"cancel",
      },
    ]);
  };

  const [password,setPassword] = useState<number[]>([]);

  const [getMeQuery,{data:meData}] = useLazyQuery<me,undefined>(ME_QUERY,{
    fetchPolicy:"network-only",
  });
  // 얘는 refetch 로.
  const {refetch:refetchGetMyDiaryList} = useQuery<getMyDiaryList,getMyDiaryListVariables>(GET_MY_DIARY_LIST, {
    fetchPolicy: "cache-only",
  });

  const onPressSync = async() => {
    let inputPassword = "";
    password.forEach(singleNumber => inputPassword += singleNumber);
    const appPassword = await EncryptedStorage.getItem(APP_PASSWORD);
    if(inputPassword === appPassword) {
      const diaryList = allRealmDiariesVar();
      const reformDiaryList = diaryList.map(diary=>{
        const { id, ...rest } = diary;
        return { ...rest };
      });
      await synchronizeDiary({
        variables:{
          uploadDiaries:reformDiaryList,
        },
        update: async(cache,data)=>{
          const error = data.data?.synchronizeDiary.error;
          if(error) {
            return Alert.alert(error);
          }

          cache.evict({id: "ROOT_QUERY", fieldName: "getCalendarMonthlyData"}); // 이게 그건듯. 근데 캘린더가 보고 잇는 상태면 한번 더 받아지느데 뭐 그건 상관없을듯.

          // getMyDiaryList 의 cursor pagination 안되게 할라고 if 넣음. refetch 는 pagination 안들어가는듯
          // if(!isFirstFetchMap.getMyDiaryList) refetchGetMyDiaryList();
          if(alreadyFetchedQuerySet.has("getMyDiaryList")) refetchGetMyDiaryList();
          
          // 걍 me 를 한번 더 받아서 업데이트함.
          await getMeQuery();
          if(meData?.me) {
            const loggedInUser = meData.me;
            updateMeCache(cache,loggedInUser);
            updateThisMonthCalendarData(cache,loggedInUser);
          }

          Alert.alert("동기화 완료 되었습니다.");
          navigation.navigate("ProfileDrawerNav");
        },
        // update:(cache,data)=>{
        //   const result = data.data?.synchronizeDiary;
        //   const error = result?.error;
        //   if(data.data?.synchronizeDiary.error) {
        //     return Alert.alert(error + "");
        //   }
        //   const diaryCacheList = diaryList.map(diary=>{
        //     const { body, dateTime, youtubeId, title } = diary;
        //     const stringDateTime = dateTime + "";
        //     // id 를 못넣네. id 를 받아야함.
        //     // 아 근데 얘는 받아도 이번달 / 오늘 이란 보장이 없네. 걍 데이터를 다시 받을까?
        //     // getMonthCalendar 뭐시기 다 지우고 Me 업데이트 하면 될 거 같은데
        //     cache.evict({id: "ROOT_QUERY", fieldName: "getCalendarMonthlyData"}); // 이게 그건듯. 근데 캘린더가 보고 잇는 상태면 한번 더 받아지느데 뭐 그건 상관없을듯.
        //     return {
        //       "__typename":"Diary",
        //       title,
        //       file: [],
        //       body: [body],
        //       thumbNail: null,
        //       isFirstVideo: false,
        //       youtubeId: youtubeId ?? null,
        //       summaryBody: body,
        //       // dateTime: stringDateTime,
        //       // createdAt: momentSeoulTZ(stringDateTime).toISOString(),
        //     };
        //   });
        //   // 여기 캐시 변경을 따로 빼서 쓰면 되겠네
        //   // useUploadDiaryMutation 에서 써있는거
        //   // diary 추가 GET_MY_DIARY_LIST 등등 + 캘린더
        //   // cache.updateQuery({

        //   // })
        // }
      });
    }
  };

  useEffect(()=>{
    if(showPassword) {
      navigation.setOptions({
        headerRight:()=><SyncBtn onPress={onPressSync} disabled={password.length !== 6}>
          <SyncBtnText fontSize={15}>완료</SyncBtnText>
        </SyncBtn>
      })
    }
  },[showPassword,password]);

  const {
    writePassword,
    deletePassword,
  } = useSetPasswordFn(setPassword);

  return (
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
      <Container>
        <TitleText fontSize={20}>현재 {diaryNumber} 개의 일기가 저장되어 있습니다. 모든 일기를 동기화 하시겠습니까?</TitleText>
        <SubText fontSize={16}>동기화 하기 위해서는 비밀번호 설정이 필요합니다.</SubText>
        <BottomContainer>
          {showPassword ?
            <PasswordInput
              password={password}
              writePassword={writePassword}
              deletePassword={deletePassword}
            />
          :
            <IsPasswordBtn onPress={onPressIsPasswordBtn}>
              <IsPasswordBtnText fontSize={30}>동기화하기</IsPasswordBtnText>
            </IsPasswordBtn>
          }
        </BottomContainer>
      </Container>
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default SyncDiaries;