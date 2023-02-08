import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Alert, useColorScheme } from "react-native";
// import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Dropdown } from 'react-native-material-dropdown';
import { getBaseText } from "../commonStyledComponent/CommentBaseStyledCompoents";
import { fontFamilyVar } from "../../../apollo";

const BtnText = getBaseText({fontSize:13})

const BaseContainer = styled.View`
  width: 30px;
`;
const EditBtn = styled.TouchableOpacity`
  /* margin: 5px; */
  margin-left: 7px;
`;
const CancelBtn = styled(EditBtn)`
`;
// const BtnText = styled.Text`
//   color: ${props => props.theme.textColor};
//   font-weight: 600;
// `;
// const BtnText = styled(FontAppliedBoldTextNeedFontSize)``;

const dropdown = [
  {
    value: '수정',
  },
  {
    value: '삭제',
  }
];


type EditBtnProps = {
  id:string,
  isMine:boolean,
  nowEditingIndex:string,
  setNowEditingIndex:Function,
  editMutation:Function,
  deleteMutation:Function,
  setUserWhichWriting: React.Dispatch<React.SetStateAction<string|{userName:string}>>,
  // edit mutation, delete mutation 받으면 될듯.
}

const EditBtnIfCommentOwner = ({id,isMine,nowEditingIndex,
  setNowEditingIndex,editMutation,deleteMutation,setUserWhichWriting}:EditBtnProps) => {

  const darkModeSubscription = useColorScheme();
  // ios 시뮬레이터에서는 외부 클릭하면 dropdown 이 사라짐. 실제에선 TouchableWithoutFeedback 을 써야 할진 모르겠으나 일단 그대로 씀.

  const onChangeText = (value: string, index: number, data: any) => {
    if(value === "수정"){
      setNowEditingIndex(id);
      setUserWhichWriting("editComment")
    } else if (value === "삭제") {
      Alert.alert("댓글을 삭제하시겠습니까?",undefined,[
      {
        text:"삭제",
        onPress:async() => {
          await deleteMutation();
        }
      },
      {
        text:"취소",
        style:"cancel",
      }
    ]);
    }
  };

  const onPressEditOk = async() => {
    Alert.alert("댓글을 변경하시겠습니까?",undefined,[
      {
        text:"변경",
        onPress:async() => {
          await editMutation();
          setNowEditingIndex("");
          setUserWhichWriting("comment")
        }
      },
      {
        text:"취소",
        style:"cancel",
      }
    ]);
  };

  const onPressCancel = () => {
    Alert.alert("댓글 변경을 취소하시겠습니까?",undefined,[
      {
        text:"취소하기",
        onPress:() => {
          setNowEditingIndex("");
          setUserWhichWriting("comment")
        }
      },
      {
        text:"계속 작성하기",
      }
    ]);
  };

  // 현재 댓글을 수정중일 때
  const nowThisCommentEditing = nowEditingIndex === id;
  // 아무 댓글도 수정중이 아닐 때
  const nowNothingIsOnEditing = nowEditingIndex === "";

  // 내꺼 아니면 수정 버튼 안나오게
  if(!isMine) {
    return <BaseContainer/>;
  }

  if(nowThisCommentEditing) {
    // 현재 댓글을 수정중일 때
    return <>
      <EditBtn onPress={onPressEditOk}>
        <BtnText>완료</BtnText>
      </EditBtn>
      <CancelBtn onPress={onPressCancel}>
        <BtnText>취소</BtnText>
      </CancelBtn>
    </>
  } else if (nowNothingIsOnEditing) {
    // 아무 댓글도 수정중이 아닐 때 수정버튼 보여줌
    return (
      <BaseContainer>
        <Dropdown
          data={dropdown}
          pickerStyle={{borderRadius:10,width:60}}
          renderBase={()=><Ionicons name="ellipsis-vertical-outline" size={24} color={darkModeSubscription === 'light' ? "black" : "white"} />}
          dropdownOffset={{left:-15,top:40}}
          onChangeText={onChangeText}
          itemTextStyle={{fontFamily:fontFamilyVar()}}
        />
      </BaseContainer>
    )
  } else {
    // 다른 댓글이 수정중이라는 뜻. 수정 버튼 안나오도록.
    return <BaseContainer/>;
  }
};

export default EditBtnIfCommentOwner ;