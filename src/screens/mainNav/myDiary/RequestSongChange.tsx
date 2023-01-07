import { gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import BaseContainer from "../../../components/shared/BaseContainer";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import { colors } from "../../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBaseTextInputNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { MyDiaryDrawerNavParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { requestSongChange, requestSongChangeVariables } from "../../../__generated__/requestSongChange";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const REQUEST_SONG_CHANGE = gql`
  mutation requestSongChange(
    $id:Int!,
    $showDiary:Boolean!,
    $requestMessage:String,
  ) {
    requestSongChange(
      id:$id,
      showDiary:$showDiary,
      requestMessage:$requestMessage,
    ) {
      ok
      error
    }
  }
`;

const RequestBtn = styled.TouchableOpacity`

`;
// const RequestBtnText = styled.Text`
//   color:${props=>props.theme.textColor};
//   font-weight: bold;
//   margin-right: 10px;
//   font-size: 15px;
// `;
const RequestBtnText = styled(FontAppliedBoldTextNeedFontSize)`
  margin-right: 10px;
  /* font-size: 15px; */
`;
// const Title = styled.Text`
//   color:${props=>props.theme.textColor};
//   font-weight: bold;
//   text-align: center;
//   font-size: 19px;
//   margin-top: 30px;
// `;
const Title = styled(FontAppliedBoldTextNeedFontSize)`
  text-align: center;
  /* font-size: 19px; */
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
  /* font-size: 15px; */
  box-shadow: ${props=>props.isDarkMode ? "0px 0px 5px rgb(255,255,255)" : "1px 1px 2px rgba(0,0,0,0.5)"};
  elevation: 5;
`;
// const ExplainText = styled.Text`
//   color:${props=>props.theme.textColor};
//   /* font-weight: bold; */
//   text-align: center;
//   font-size: 17px;
//   margin-top: 30px;
// `;
const ExplainText = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
  /* font-size: 17px; */
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
// const SubmitText = styled.Text`
//   color: white;
//   font-weight: bold;
//   font-size: 15px;
// `;
const SubmitText = styled(FontAppliedBaseTextNeedFontSize)`
  color: white;
  /* font-weight: bold; */
  /* font-size: 15px; */
`;
const SeeDirectContainer = styled.View`
  flex-direction: row;
  /* margin-bottom: 14px; */
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const SeeDirectText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 13px; */
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

type RequestSongChangeProps = NativeStackScreenProps<MyDiaryDrawerNavParamsList, 'RequestSongChange'>;

const RequestSongChange = ({navigation,route}:RequestSongChangeProps) => {

  const diaryId = route.params.diaryId;

  const [requestMessage,setRequestMessage] = useState<string>();

  const [requestSongChange,{error,loading}] = useMutation<requestSongChange,requestSongChangeVariables>(REQUEST_SONG_CHANGE,{
    onCompleted:(data)=>{
      const result = data.requestSongChange;
      if(result.ok){
        Alert.alert("변경 신청이 완료되었습니다.",undefined,[
          {
            text:"확인",
          },
        ]);
        navigation.goBack();
      } else {
        Alert.alert(result.error ?? "알 수 없는 오류가 발생하였습니다.","지속적으로 같은 문제가 발생한다면 문의 주시면 감사드리겠습니다.",[
          {
            text:"확인",
          },
        ]);
      }
    },
    // // 에러 링크때문에 에러가 안뜸. 근데 그렇다고 에러링크에서 Alert 도 안떠. 뭐여이게
    // onError:(error)=>{
    //   console.error("error is : "+error)
    //   Alert.alert("알 수 없는 오류가 발생하였습니다.","지속적으로 같은 문제가 발생한다면 문의 주시면 감사드리겠습니다.",[
    //     {
    //       text:"확인",
    //     },
    //   ]);
    // },
  });
// // 에러 링크때문에 에러가 안뜸. 근데 그렇다고 링크에서 Alert 도 안떠. 뭐여이게
//   useEffect(()=>{
//     if(error) {
//       console.error("error is : "+error)
//       Alert.alert("알 수 없는 오류가 발생하였습니다.","지속적으로 같은 문제가 발생한다면 문의 주시면 감사드리겠습니다.",[
//         {
//           text:"확인",
//         },
//       ]);
//     }
//   },[error]);
//   console.log("error")
//   console.log(error)

  const [isSeeDirect,setIsSeeDirect] = useState(false);
  const [isNotCheckSeeDirect,setIsNotCheckSeeDirect] = useState(false);
  // const [seeDirect,setSeeDirect] = useState(false);

  const onPressSeeDirect = () => {
    setIsSeeDirect(prev=>!prev);
    setIsNotCheckSeeDirect(false);
  };

  const onPressSubmit = () => {
    if(loading) return;
    // 조건 넣어
    if(!isSeeDirect && !requestMessage) {
      return Alert.alert("음악 추천을 위해 참고할 내용이 없습니다.","요청사항 작성, 일기 내용 보내기 중 한 가지 이상이 필요합니다.");
    }
    Alert.alert("음악 변경 신청하시겠습니까?",undefined,[
      {
        text:"변경 신청",
        onPress:async()=>{
          await requestSongChange({
            variables:{
              id:diaryId,
              requestMessage,
              showDiary:isSeeDirect,
            },
          });
        },
      },
      {
        text:"취소",
        style:"cancel",
      },
    ]);
  };

  const onPressCancel = () => {
    const goBack = () => navigation.goBack();

    if(!requestMessage) return goBack();

    Alert.alert("변경 신청을 취소하시겠습니까?","작성 중인 내용은 유실됩니다.",[
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

  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=><RequestBtn onPress={onPressSubmit}>
        <RequestBtnText fontSize={15}>신청</RequestBtnText>
      </RequestBtn>
    })
  },[requestMessage]);

  const isDarkMode = useIsDarkMode();

  return (
    <BaseContainer>
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
        {/* <SeeDirectText fontSize={13}>일기 내용을 보고 추천할 수 있도록 하시겠습니까?</SeeDirectText> */}
        <SeeDirectText fontSize={13}>[선택] 일기 내용을 보고 추천할 수 있도록 합니다.</SeeDirectText>
      </SeeDirectContainer>
      <ExplainText fontSize={17}>음악 변경 신청 하시겠습니까?</ExplainText>
      <BtnRowView>
        <SubmitBtn
          isDarkMode={isDarkMode}
          onPress={onPressSubmit}
        >
          <SubmitText fontSize={15}>신청</SubmitText>
        </SubmitBtn>
        <SubmitBtn
          isDarkMode={isDarkMode}
          onPress={onPressCancel}
        >
          <SubmitText fontSize={15}>취소</SubmitText>
        </SubmitBtn>
      </BtnRowView>
    </BaseContainer>
  );
};

export default RequestSongChange;