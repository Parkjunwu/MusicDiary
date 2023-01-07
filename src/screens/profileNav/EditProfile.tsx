import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useLazyQuery, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react"; 
import { Alert, TouchableOpacity, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import ImagePicker from 'react-native-image-crop-picker';
import { ReactNativeFile } from "apollo-upload-client";
import { noUserUri } from "../../localImage/preloadLocalImageAndSetReactiveVar";
import FastImage from 'react-native-fast-image';
import DismissKeyboard from "../../components/shared/DismissKeyboard";
import { userNameCheck } from "../../logic/userInfoFormCheck";
import useMe from "../../hooks/useMe";
import { ProfileListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";
import { colors } from "../../js-assets/color";
import { checkUserName, checkUserNameVariables } from "../../__generated__/checkUserName";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBaseTextInputNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { ME_QUERY } from "../../gql/manyWriteQuery";
import ScrollViewWithoutBounce from "../../components/shared/ScrollViewWithoutBounce";
import KeyboardAwareScrollViewWithoutBounce from "../../components/shared/KeyboardAwareScrollViewWithoutBounce";

const CHECK_USER_NAME = gql`
  query checkUserName(
    $userName: String!
  ) {
    checkUserName(
      userName: $userName
    )
  }
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $userName: String,
    $avatar: Upload,
    $deleteAvatar: Boolean,
  ) {
    editProfile(
      userName: $userName,
      avatar: $avatar,
      deleteAvatar: $deleteAvatar,
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  flex: 1;
`;
const AvatarContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ImageContainer = styled.View`
  position: relative;
  /* background-color: green; */
`;
const DeleteImageTouchable = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  /* align-items: center;
  justify-content: center; */
  z-index: 10;
`;
const ChangeAvatarBtn = styled.TouchableOpacity`

`;
const ChangeAvatarBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;
const UnderLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: grey;
`;
const UserInfoContainer = styled.View`
  flex:1.5;
  margin: 15px;
`;
const UserName = styled(FontAppliedBaseTextNeedFontSize)`

`;
const UserNameInputContainer = styled.View`
  flex-direction: row;
  /* background-color: red; */
  justify-content: space-between;
`;
const UserNameInput = styled(FontAppliedBaseTextInputNeedFontSize)`
  padding: 10px 0px;
  /* background-color: red; */
  flex: 1;
`;
const CheckUserNameBtn = styled.TouchableOpacity`
  /* background-color: green; */
  justify-content: center;
`;
const CheckUserNameText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;
// const Bio = styled(FontAppliedBaseText)`
//   margin-top: 8px;
// `;
// const BioInput = styled(UserNameInput)``;

type Props = NativeStackScreenProps<ProfileListTabStackParamsList, 'EditProfile'>;

const EditProfile = ({navigation,route}:Props) => {
  // 기존 유저 데이터
  const { data } = useMe();
  const userId = data?.me.id;
  const prevUserName = data?.me.userName;
  // const prevBio = data?.me.bio;
  const prevAvatar = data?.me.avatar;
  console.log("prevAvatar : "+ prevAvatar)
  // TextInput 데이터
  const [userNameValue,setUserNameValue] = useState("");
  // const [bioValue,setBioValue] = useState("");
  // const [bioAlert,setBioAlert] = useState(false);
  // const setBioValueUnder100 = (text:string) => {
  //   setBioValue(prev=>{
  //     if(prev && prev.length > 100 && text.length > 100) {
  //       setBioAlert(true);
  //       return prev;
  //     } else {
  //       setBioAlert(false);
  //       return text;
  //     }
  //   });
  // };
  
  // Mutation
  const [editProfile,{error,loading}] = useMutation<editProfile,editProfileVariables>(EDIT_PROFILE_MUTATION);


  ////
  // ImagePicker
  const [avatar, setAvatar] = useState(data?.me?.avatar ?? null);

  const pickAvatarImage = () => {
    ImagePicker.openPicker({
      width: 640,
      height: 640,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setAvatar(image.path);
      // sourceURL 이 file:// 인데 얘는 ios 만 된대
      // setAvatar(image.sourceURL);
    });

  };

  // avatar 달라 > 
  const onlyChangedData = {
    // 바뀐 애들만
    ...( userNameValue !== prevUserName && { userName: userNameValue } ),
    // ...( bioValue !== prevBio && { bio: bioValue } ),
    // avatar
    ...( avatar !== prevAvatar && {
      avatar: avatar ?
        new ReactNativeFile({
          uri: avatar,
          name: "1.jpg",
          type: "image/jpeg",
        })
      :
        null
    }),
  };

  const cacheUpdateMeData:MutationUpdaterFunction<editProfile, editProfileVariables, DefaultContext, ApolloCache<any>> = async (cache,data) => {
    if(data.data?.editProfile.ok) {
      // useMe 에 캐시
      // cache.modify({
      //   id:"ROOT_QUERY",
      //   fields:{
      //     me(prev){
      //       return {
      //         ...prev,
      //         ...(userNameValue !== prevUserName && { userName:userNameValue}),
      //         ...(avatar !== prevAvatar && { avatar }),
      //       };
      //     },
      //     // 캘린더 데이터 변경
      //   },
      // });
      
      cache.updateQuery({ // options object
        query: ME_QUERY
      }, (data) => ({ // update function
        me: {
          ...data.me,
          ...(userNameValue !== prevUserName && { userName:userNameValue}),
          ...(avatar !== prevAvatar && { avatar }),
        }
      }));
    } else {
      return Alert.alert(data.data?.editProfile.error?? "");
    }
  };


  
  // 프로필 변경 완료 시
  const onPressComplete = async() => {
    
    if(loading) return;
    // 이름 안썼을 때 알림창
    if(!userNameValue) return Alert.alert("이름은 필수 항목입니다. 이름을 작성해 주세요.");
    if(!userNameCheck(userNameValue)) return Alert.alert("닉네임에는 20자 이하의 영어, 한글, 숫자만 사용 가능합니다.");
    // 기존 데이터랑 똑같으면 그냥 돌아감.
    // if(userNameValue === prevUserName && bioValue === prevBio && prevAvatar === avatar) return navigation.goBack();
    if(userNameValue === prevUserName && prevAvatar === avatar) return navigation.goBack();

    const deleteAvatar = prevAvatar && prevAvatar !== avatar;
    // Mutation 실행
    const result = await editProfile({
      variables:{
        ...onlyChangedData,
        ...(deleteAvatar && { deleteAvatar:true }),
      },
      // refetch 대신.
      update:cacheUpdateMeData
    });
    // Mutation 자체 에러 시에도 유저한테 보여줘야 하는데 일단은 콘솔 찍음.
    if(error) {
      console.log(error);
    }
    // 백엔드에서 에러 뜰 시 에러메세지 보여줌.
    if(!result.data?.editProfile.ok) return Alert.alert(result.data?.editProfile.error?? "");
    // 완료시 뒤로 감.
    if(result.data.editProfile.ok) {
      // refetch 대신 위에cache 변경 로직 넣음
      navigation.goBack();
      Alert.alert("정보가 변경되었습니다.");
    };
  };

  const darkModeSubscription = useColorScheme();

  // 헤더에 완료 버튼 넣음
  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=><TouchableOpacity onPress={onPressComplete}><Ionicons name="md-checkmark-sharp" size={30} color={darkModeSubscription === "light" ? "black" : "white"} /></TouchableOpacity>
    })
  // },[userNameValue,bioValue,avatar]);
  },[userNameValue,avatar]);

  // 기본으로 기존 유저 데이터 넣음.
  useEffect(()=>{
    setUserNameValue(prevUserName?? "");
    // setBioValue(prevBio);
  },[data]);

  const [checkUserName] = useLazyQuery<checkUserName,checkUserNameVariables>(CHECK_USER_NAME,{
    onCompleted:(data)=>Alert.alert(data.checkUserName ? "이미 존재하는 유저명 입니다." : "사용 가능한 이름입니다."),
  });
  
  // 얘를 써야함.
  const onPressCheckUserName = async() => {
    if(userNameValue === data?.me.userName) {
      return Alert.alert("기존 이름과 동일합니다.");
    }
    if(userNameValue === "") {
      return Alert.alert("이름을 입력해주세요.");
    }
    if(!userNameCheck(userNameValue)) {
      return Alert.alert("이름에는 20자 이하의 영어, 한글, 숫자만 사용 가능합니다.");
    }
    await checkUserName({
      variables:{
        userName: userNameValue,
      },
    });
  };

  const onPressDeleteImage = () => setAvatar("");

  return (
    <KeyboardAwareScrollViewWithoutBounce>
      <DismissKeyboard>
        <Container>
          <AvatarContainer>
            <ImageContainer>
              {avatar && <DeleteImageTouchable onPress={onPressDeleteImage}>
                <Octicons name="x-circle-fill" size={20} color={colors.darkYellow} />
              </DeleteImageTouchable>}
              <FastImage
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 65,
                  marginBottom: 20,
                }}
                source={{ uri: avatar ? avatar : noUserUri }}
              />
            </ImageContainer>
            <ChangeAvatarBtn onPress={pickAvatarImage}>
              <ChangeAvatarBtnText>프로필 사진 변경</ChangeAvatarBtnText>
            </ChangeAvatarBtn>
          </AvatarContainer>
          <UserInfoContainer>
            <UserName>이름</UserName>
            <UserNameInputContainer>
              <UserNameInput
                value={userNameValue}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text=>setUserNameValue(text)}
                maxLength={20}
              />
              <CheckUserNameBtn onPress={onPressCheckUserName}>
                <CheckUserNameText>중복확인</CheckUserNameText>
              </CheckUserNameBtn>
            </UserNameInputContainer>
            <UnderLine/>
            {/* <Bio>소개</Bio>
            <BioInput value={bioValue} autoCapitalize="none" autoCorrect={false} onChangeText={text=>setBioValueUnder100(text)} />
            <UnderLine/>
            {bioAlert && <Bio>소개는 100자 이하로 작성하셔야 합니다.</Bio>} */}
          </UserInfoContainer>
        </Container>
      </DismissKeyboard>
    </KeyboardAwareScrollViewWithoutBounce>
  );
};

export default EditProfile;