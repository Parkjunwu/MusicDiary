import styled from "styled-components/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from "react-native";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import { BaseSharedStackNavStackParamsList, UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import React from "react";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
// const StateContainer = styled.TouchableOpacity`
const StateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
const StateText = styled(FontAppliedBaseTextNeedFontSize)<{youtubeTitle:string|undefined}>`
  width: 80%;
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
`;
const BtnContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const PressBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;
const PressBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;

type MusicStateProps = {
  youtubeTitle: string | undefined,
  youtubeId: string | null,
  deleteMusic?: ()=>void,
  whichComponent: "UploadDiary" | "EditDiary" | "EditDiaryForTemporaryDiaryData",
};

const MusicState = ({
  youtubeTitle,
  youtubeId,
  deleteMusic,
  whichComponent,
}: MusicStateProps) => {

  console.log("MusicState")

  const navigation = useNavigation<CompositeNavigationProp<NativeStackNavigationProp<UploadDiaryTabStackParamsList>,NativeStackNavigationProp<BaseSharedStackNavStackParamsList>>>();

  // 이거 확인. 아마 EditDiaryForTemporaryDiaryData 랑 UploadDiary 가 둘 다 UploadNav 에 있어서 이래 쓰면 맞을듯
  const routeName = whichComponent === "EditDiary" ? "ChangeYoutubeSong" : "SearchYoutube";

  const navigateToSearchYoutube = () => navigation.navigate(routeName,{
    routeFrom: whichComponent,
  });

  // const navigateToWatchYoutube = () => {
  //   if(youtubeId && youtubeTitle){
  //     navigation.navigate("WatchYoutube",{
  //       vId: youtubeId,
  //       title: youtubeTitle,
  //     });
  //   }
  // };

  const onPressSelectOrEditMusic = () => {
    if(youtubeTitle) {
      Alert.alert("다른 음악으로 변경하시겠습니까?",undefined,[
        {
          text: "변경",
          onPress: navigateToSearchYoutube,
        },
        {
          text: "취소",
          style: "cancel",
        },
      ]);
    } else {
      navigateToSearchYoutube();
    }
  };

  const onPressDeleteMusic = () => {
    if(youtubeTitle) {
      Alert.alert("지정한 음악을 삭제하시겠습니까?",undefined,[
        {
          text: "삭제",
          onPress: deleteMusic,
        },
        {
          text: "취소",
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert("지정된 음악이 없습니다.");
    }
  };

  const stateText = youtubeTitle ?? "지정된 음악이 없습니다.";
  const selectOrEditText = youtubeTitle ? "변경" : "지정";

  const isDarkMode = useIsDarkMode();
  
  return (
    <Container>
      {/* <StateContainer
        disabled={!youtubeTitle}
        onPress={navigateToWatchYoutube}
      > */}
      <StateContainer>
        <MaterialCommunityIcons name={youtubeTitle ? "music-circle" : "music-circle-outline"} size={24} color={isDarkMode ? "white" : "black"} />
        <StateText
          fontSize={13}
          numberOfLines={1}
          ellipsizeMode="tail"
          youtubeTitle={youtubeTitle}
        >{stateText}</StateText>
      </StateContainer>
      <BtnContainer>
        <PressBtn
          onPress={onPressSelectOrEditMusic}
        >
          <PressBtnText fontSize={13}>{selectOrEditText}</PressBtnText>
        </PressBtn>
        <PressBtn
          onPress={onPressDeleteMusic}
        >
          <PressBtnText fontSize={13}>삭제</PressBtnText>
        </PressBtn>
      </BtnContainer>
    </Container>
  );
};


// export default MusicState;
// 얘는 전부 다 똑같은게 조건이라 걍 넣으면 될듯?
// 근데 deleteMusic 가 함수인데 이거 같은지 비교가 있나?
// 아님 deleteMusic 는 어차피 youtubeTitle,youtubeId 애들이랑 같이 바뀌니까 비교 안해도 같이 바뀌지 않을라나?
// 근데 그냥 뭘하든 안됨. 왜지? > 리로드를 안해서 그런듯.
export default React.memo(
  MusicState,
  (prevProps, nextProps) => (
    prevProps.youtubeTitle === nextProps.youtubeTitle
    // &&
    // prevProps.youtubeId === nextProps.youtubeId &&
    // prevProps.deleteMusic === nextProps.deleteMusic
  )
);