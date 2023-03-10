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
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";

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
  /* background-color: ${props => props.theme.backgroundColor}; */
  flex: 1;
  /* ?????? ?????? ???????????? ???????????? ?????? */
  margin-top: 10%;
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
  // ?????? ?????? ?????????
  const { data } = useMe();
  const userId = data?.me.id;
  const prevUserName = data?.me.userName;
  // const prevBio = data?.me.bio;
  const prevAvatar = data?.me.avatar;
  console.log("prevAvatar : "+ prevAvatar)
  // TextInput ?????????
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
      // sourceURL ??? file:// ?????? ?????? ios ??? ??????
      // setAvatar(image.sourceURL);
    });

  };

  // avatar ?????? > 
  const onlyChangedData = {
    // ?????? ?????????
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
      // useMe ??? ??????
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
      //     // ????????? ????????? ??????
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


  
  // ????????? ?????? ?????? ???
  const onPressComplete = async() => {
    
    if(loading) return;
    // ?????? ????????? ??? ?????????
    if(!userNameValue) return Alert.alert("????????? ?????? ???????????????. ????????? ????????? ?????????.");
    if(!userNameCheck(userNameValue)) return Alert.alert("??????????????? 20??? ????????? ??????, ??????, ????????? ?????? ???????????????.");
    // ?????? ???????????? ???????????? ?????? ?????????.
    // if(userNameValue === prevUserName && bioValue === prevBio && prevAvatar === avatar) return navigation.goBack();
    if(userNameValue === prevUserName && prevAvatar === avatar) return navigation.goBack();

    const deleteAvatar = prevAvatar && prevAvatar !== avatar;
    // Mutation ??????
    const result = await editProfile({
      variables:{
        ...onlyChangedData,
        ...(deleteAvatar && { deleteAvatar:true }),
      },
      // refetch ??????.
      update:cacheUpdateMeData
    });
    // Mutation ?????? ?????? ????????? ???????????? ???????????? ????????? ????????? ?????? ??????.
    if(error) {
      console.log(error);
    }
    // ??????????????? ?????? ??? ??? ??????????????? ?????????.
    if(!result.data?.editProfile.ok) return Alert.alert(result.data?.editProfile.error?? "");
    // ????????? ?????? ???.
    if(result.data.editProfile.ok) {
      // refetch ?????? ??????cache ?????? ?????? ??????
      navigation.goBack();
      Alert.alert("????????? ?????????????????????.");
    };
  };

  const darkModeSubscription = useColorScheme();

  // ????????? ?????? ?????? ??????
  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=><TouchableOpacity onPress={onPressComplete}><Ionicons name="md-checkmark-sharp" size={30} color={darkModeSubscription === "light" ? "black" : "white"} /></TouchableOpacity>
    })
  // },[userNameValue,bioValue,avatar]);
  },[userNameValue,avatar]);

  // ???????????? ?????? ?????? ????????? ??????.
  useEffect(()=>{
    setUserNameValue(prevUserName?? "");
    // setBioValue(prevBio);
  },[data]);

  const [checkUserName] = useLazyQuery<checkUserName,checkUserNameVariables>(CHECK_USER_NAME,{
    onCompleted:(data)=>Alert.alert(data.checkUserName ? "?????? ???????????? ????????? ?????????." : "?????? ????????? ???????????????."),
  });
  
  // ?????? ?????????.
  const onPressCheckUserName = async() => {
    if(userNameValue === data?.me.userName) {
      return Alert.alert("?????? ????????? ???????????????.");
    }
    if(userNameValue === "") {
      return Alert.alert("????????? ??????????????????.");
    }
    if(!userNameCheck(userNameValue)) {
      return Alert.alert("???????????? 20??? ????????? ??????, ??????, ????????? ?????? ???????????????.");
    }
    await checkUserName({
      variables:{
        userName: userNameValue,
      },
    });
  };

  const onPressDeleteImage = () => setAvatar("");

  return (
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
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
              <ChangeAvatarBtnText>????????? ?????? ??????</ChangeAvatarBtnText>
            </ChangeAvatarBtn>
          </AvatarContainer>
          <UserInfoContainer>
            <UserName>??????</UserName>
            <UserNameInputContainer>
              <UserNameInput
                value={userNameValue}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text=>setUserNameValue(text)}
                maxLength={20}
              />
              <CheckUserNameBtn onPress={onPressCheckUserName}>
                <CheckUserNameText>????????????</CheckUserNameText>
              </CheckUserNameBtn>
            </UserNameInputContainer>
            <UnderLine/>
            {/* <Bio>??????</Bio>
            <BioInput value={bioValue} autoCapitalize="none" autoCorrect={false} onChangeText={text=>setBioValueUnder100(text)} />
            <UnderLine/>
            {bioAlert && <Bio>????????? 100??? ????????? ??????????????? ?????????.</Bio>} */}
          </UserInfoContainer>
        </Container>
      </DismissKeyboard>
    </KeyboardAwareScrollViewWithoutBounce>
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default EditProfile;