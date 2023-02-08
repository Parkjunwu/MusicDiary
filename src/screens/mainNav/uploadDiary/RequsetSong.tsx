import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import BaseContainer from "../../../components/shared/BaseContainer";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import { colors } from "../../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBaseTextInputNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useRequestComplete from "../../../hooks/uploadDiary/useRequestComplete";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";

const RequestBtn = styled.TouchableOpacity`

`;
const RequestBtnText = styled(FontAppliedBoldTextNeedFontSize)`
  margin-right: 10px;
`;
const Title = styled(FontAppliedBoldTextNeedFontSize)`
  text-align: center;
  margin-top: 30px;
`;
// const RequestInput = styled.TextInput<{isDarkMode:boolean}>`
//   color:${props=>props.theme.textColor};
const RequestInput = styled(FontAppliedBaseTextInputNeedFontSize)<{isDarkMode:boolean}>`
  color: black;
  margin: 30px 15px;
  border-radius: 10px;
  padding: 20px 12px;
  background-color: ${colors.beige};
  height: 150px;
  box-shadow: ${props=>props.isDarkMode ? "0px 0px 5px rgb(255,255,255)" : "1px 1px 2px rgba(0,0,0,0.5)"};
  elevation: 5;
`;
const ExplainText = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
  margin-top: 30px;
  /* margin-top: 10px; */
`;
const BtnRowView = styled.View`
  flex-direction: row;
  margin: 20px 60px;
  justify-content: space-between;
`;
const SubmitBtn = styled.TouchableOpacity<{isDarkMode:boolean}>`
  border-radius: 10px;
  background-color: ${colors.darkYellow};
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  box-shadow: ${props=>props.isDarkMode ? "0px 0px 3px rgba(255,255,255,0.6)" : "1px 1px 5px rgba(0,0,0,0.5)"};
  elevation: 3;
`;
const SubmitText = styled(FontAppliedBaseTextNeedFontSize)`
  color: white;
`;
const SeeDirectContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const SeeDirectText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;
// CreateAccount 의 AgreeBtn 랑 똑같음
const SeeDirectBtn = styled.TouchableOpacity<{isDarkMode:boolean,isNotCheckSeeDirect:boolean}>`
  margin-right: 7px;
  width: 17px;
  height: 17px;
  border-radius: 3px;
  border: ${props=>props.isNotCheckSeeDirect ? "3px" : "1px"};
  border-color: ${props => props.isNotCheckSeeDirect ? "tomato" :
    props.isDarkMode ? "white" : "black"
  };
  background-color: ${props=>props.isDarkMode? "rgba(255,255,255,0.8)" : "white"};
  align-items: center;
  justify-content: center;
`;

type RequestSongProps = NativeStackScreenProps<UploadDiaryTabStackParamsList, 'RequestSong'>;

const RequestSong = ({navigation,route}:RequestSongProps) => {

  const {
    files,
    title,
    body,
    youtubeIdRef,
  } = route.params;

  const [requestMessage,setRequestMessage] = useState<string>("");

  const [isSeeDirect,setIsSeeDirect] = useState(false);
  const [isNotCheckSeeDirect,setIsNotCheckSeeDirect] = useState(false);
  // const [seeDirect,setSeeDirect] = useState(false);

  const onPressSeeDirect = () => {
    setIsSeeDirect(prev=>!prev);
    setIsNotCheckSeeDirect(false);
  };

  const { loading, onPressComplete, onPressCompleteWithoutRequest } = useRequestComplete({
    showDiary: isSeeDirect,
    requestMessage,
    files,
    title,
    body,
    youtubeIdRef,
  });

  const goBack = () => navigation.goBack();
  const onPressGoBack = () => alertGoBack(goBack,requestMessage);
  const onPressSubmit = () => alertSubmit(isSeeDirect,requestMessage,onPressComplete,loading);
  const onPressNotRequest = () => alertNotRequest(onPressCompleteWithoutRequest,loading);

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:()=><TouchableOpacity
          onPress={onPressGoBack}
        >
          <RequestBtnText fontSize={15}>돌아가기</RequestBtnText>
        </TouchableOpacity>,
      headerRight:()=>loading ? 
          <RequestBtnText fontSize={15}>업로드중..</RequestBtnText>
        :
          <RequestBtn onPress={onPressSubmit}>
        <RequestBtnText fontSize={15}>완료</RequestBtnText>
      </RequestBtn>
    })
  },[requestMessage,isSeeDirect]);

  const isDarkMode = useIsDarkMode();

  return (
    // <BaseContainer>
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
      <Title fontSize={19}>요청 사항</Title>
      <RequestInput
        placeholder="요청 사항이 있으시다면 100자 이내로 작성해 주세요."
        placeholderTextColor="rgba(0,0,0,0.4)"
        autoCapitalize="none"
        autoCorrect={false}
        multiline={true}
        maxLength={60}
        // numberOfLines={3}
        value={requestMessage}
        onChangeText={(text:string)=>setRequestMessage(text)}
        isDarkMode={isDarkMode}
      />
      <SeeDirectContainer>
        <SeeDirectBtn onPress={onPressSeeDirect} isDarkMode={isDarkMode} isNotCheckSeeDirect={isNotCheckSeeDirect} >
          {isSeeDirect && <FontAwesome name="check" size={15} color={colors.darkYellow} />}
        </SeeDirectBtn>
        <SeeDirectText fontSize={13}>[선택] 일기 내용을 보고 추천할 수 있도록 합니다.</SeeDirectText>
      </SeeDirectContainer>
      <ExplainText fontSize={17}>음악 요청과 함께 업로드 하시겠습니까?</ExplainText>
      <BtnRowView>
        <SubmitBtn
          isDarkMode={isDarkMode}
          onPress={onPressSubmit}
        >
          <SubmitText fontSize={15}>완료</SubmitText>
        </SubmitBtn>
        <SubmitBtn
          isDarkMode={isDarkMode}
          onPress={onPressNotRequest}
        >
          <SubmitText fontSize={15}>추천 없이 업로드</SubmitText>
        </SubmitBtn>
      </BtnRowView>
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
    // </BaseContainer>
  );
};

export default RequestSong;





const alertSubmit = (isSeeDirect:boolean,requestMessage:string,onPressComplete:() => Promise<void>,loading:boolean) => {
  if(loading) return;
  // 조건 넣어
  if(!isSeeDirect && !requestMessage) {
    return Alert.alert("음악 추천을 위해 참고할 내용이 없습니다.","요청 사항 작성, 일기 내용 보내기 중 한 가지 이상이 필요합니다.");
  }
  // Alert.alert("음악 신청하시겠습니까?",undefined,[
  //   {
  //     text:"신청",
  //     onPress:onPressComplete,
  //   },
  //   {
  //     text:"취소",
  //     style:"destructive",
  //   },
  // ]);
  onPressComplete();
};

const alertNotRequest = (onPressCompleteWithoutRequest:() => Promise<void>,loading:boolean) => {
  if(loading) return;
  Alert.alert("음악 추천 받지 않고 일기를 업로드 하시겠습니까?","추후 일기에서도 음악 추천 요청을 하실 수 있습니다.",[
    {
      text:"업로드",
      onPress:onPressCompleteWithoutRequest,
    },
    {
      text:"취소",
      style:"destructive",
    },
  ]);
};

const alertGoBack = (goBack:() => void,requestMessage:string) => {
  // const goBack = () => navigation.goBack();

  if(!requestMessage) return goBack();

  Alert.alert("음악 요청을 취소하시겠습니까?","작성 중인 내용은 유실됩니다.",[
    {
      text:"신청 취소",
      onPress:()=>goBack(),
    },
    {
      text:"계속 작성하기",
      style:"cancel",
    },
  ]);
};





  // const onPressSubmit = () => {
  //   // 조건 넣어
  //   if(!isSeeDirect && !requestMessage) {
  //     return Alert.alert("음악 추천을 위해 참고할 내용이 없습니다.","요청사항 작성, 일기 내용 보내기 중 한 가지 이상이 필요합니다.");
  //   }
  //   Alert.alert("음악 신청하시겠습니까?",undefined,[
  //     {
  //       text:"신청",
  //       onPress:onPressComplete,
  //     },
  //     {
  //       text:"취소",
  //       style:"destructive",
  //     },
  //   ]);
  // };

  // const onPressNotRequest = () => {
  //   Alert.alert("음악 추천 받지 않고 일기를 업로드 하시겠습니까?","추후 일기에서도 음악 추천 요청을 보내실 수 있습니다.",[
  //     {
  //       text:"업로드",
  //       onPress:onPressCompleteWithoutRequest,
  //     },
  //     {
  //       text:"취소",
  //       style:"destructive",
  //     },
  //   ]);
  // };

  // const onPressGoBack = () => {
  //   const goBack = () => navigation.goBack();

  //   if(!requestMessage) return goBack();

  //   Alert.alert("음악 요청을 취소하시겠습니까?","작성 중인 내용은 유실됩니다.",[
  //     {
  //       text:"신청 취소",
  //       onPress:()=>goBack(),
  //     },
  //     {
  //       text:"계속 작성하기",
  //       style:"cancel",
  //     },
  //   ]);
  // };
