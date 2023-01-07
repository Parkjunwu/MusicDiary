import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, useWindowDimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components/native";
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isAndroid } from "../../../utils";
import VideoIconPositionAbsolute from "../../../components/video/VideoIconPositionAbsolute";
import { colors } from "../../../js-assets/color";
import androidGetThumbNail from "../../../logic/upload/androidGetThumbNail";
import BaseContainer from "../../../components/shared/BaseContainer";
import { BaseSharedStackNavStackParamsList, UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { DiaryPlusPhotoAndVideoFileInfo } from "../../../types/upload/fileType";
import { CompositeScreenProps } from "@react-navigation/core";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";

const FullImageContainer = styled.View`
  position: relative;
  align-items: center;
  margin: 0px auto;
`;
const FullImageDeleteBtn = styled.TouchableOpacity`
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 10px;
`;
const FullImageCropBtn = styled.TouchableOpacity`
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 40px;
`;
const FullImageFullScreenBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const ImageContainer = styled.View`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;
const SelectedIconContainer = styled.View`
  position: absolute;
  bottom: 10%;
  right: 10%;
`;
const SelectedPhotoComponent = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: yellow;
`;
const SelectedPhotoComponentText = styled.Text`
  font-size: 12px;
  text-align: center;
`;
// const AnnounceText = styled.Text`
//   font-size: 15px;
//   text-align: center;
//   color: ${props=>props.theme.textColor};
//   margin-top: 3px;
// `;
const AnnounceText = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
  margin-top: 3px;
`;
const HeaderRightText = styled(FontAppliedBaseTextNeedFontSize)`
  color:${colors.blue};
  /* font-size: 16px; */
  margin-right: 7px;
`;

// type Props = NativeStackScreenProps<BaseSharedStackNavStackParamsList | UploadDiaryTabStackParamsList,"DiaryPlusPhotoAndVideo">;
type Props = CompositeScreenProps<
  NativeStackScreenProps<UploadDiaryTabStackParamsList,"DiaryPlusPhotoAndVideo">,
  NativeStackScreenProps<BaseSharedStackNavStackParamsList>
>;


// socutie PlusFileFormPetLog 랑 같음

const DiaryPlusPhotoAndVideo = gestureHandlerRootHOC(({navigation,route}:Props) => {

  // const whereToRoute = route.params?.whichComponent;
  // const isFromUploadPetLog = whereToRoute === "UploadPetLog";
  // const isFromEditPetLog = whereToRoute === "EditPetLog";

  const files = route.params.file;

  console.log(route.params)

  const [purePhotoArr,setPurePhotoArr] = useState(files);
  const [croppedPhotoArr,setCroppedPhotoArr] = useState(files);
  
  useEffect(()=>{
    const beforeEditVideo = route.params.pureVideoFile;
    // const editedVideo = route.params.newVideoFile;
    const editedVideo = route.params.newVideoFile ?? "";
    const editedVideoThumbNail = route.params.forIOSThumbNailUri;
    
    const editedFileObj = {
      uri:editedVideo,
      isVideo:true,
      forIOSThumbNailUri:editedVideoThumbNail,
    };
    
    const changePhotoArrayWithEdittedVideo = (prev:DiaryPlusPhotoAndVideoFileInfo[]) => {
      const newArray = prev.map(file=>{
        if(file.uri === beforeEditVideo) {
          return editedFileObj;
        } else {
          return file;
        }
      });
      return newArray;
    };

    if(editedVideo) {
      setPurePhotoArr(prev=>changePhotoArrayWithEdittedVideo(prev));
      setCroppedPhotoArr(prev=>changePhotoArrayWithEdittedVideo(prev));
      setBigImage(editedFileObj);
    }
  },[route]);

  const [bigImage,setBigImage] = useState<DiaryPlusPhotoAndVideoFileInfo>(croppedPhotoArr[0]);

  const onValid = async() => {

    // animation:"none" option 에 넣어도 안됨. 걍 써야 할듯. 아니면 UploadFormNav 에 있는 애들을 HomeNav 로 옮겨야 할듯. 근데 뭐가 필요해서 UploadFormNav 로 만들었던 것 같은데
    // navigation.setOptions({
    //   animation:"none",
    // });

    const resizedPhotoArr:DiaryPlusPhotoAndVideoFileInfo[] = [];
    
    const photoArr = croppedPhotoArr.map(async(file,index) => {
      // const uploadFileUri = await compressImageVideoFile(file);
      // resizedPhotoArr[index] = uploadFileUri;
      const isVideo = file.isVideo;
      resizedPhotoArr[index] = {
        // uri: uploadFileUri,
        uri: file.uri,
        isVideo,
        ...(isVideo && {
          thumbNail: file.forIOSThumbNailUri ?? await androidGetThumbNail(file.uri)
        }),
      };
    });

    await Promise.all(photoArr);

    // navigate resizedPhotoArr 랑 같이.
    // 이게 렌더링이 두번 됨. Select 갔다가 UploadPetLog 로 가서 좀 이상함.
    // UploadFormNav 가 밖에 있어서 그런듯. 아 이름 다 바꿔야겠네. 구분이 안감

    const navigateScreenName = route.params.from;
    
    navigation.navigate(navigateScreenName,{
      // file:resizedPhotoArr,
      plusFiles:resizedPhotoArr,
    });

  };

  // 네비게이션 헤더 설정
  const HeaderRight = () => <TouchableOpacity onPress={onValid}>
    <HeaderRightText fontSize={16}>완료</HeaderRightText>
  </TouchableOpacity>

  useEffect(() => {
    navigation.setOptions({
      headerLeft:({tintColor}) => <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="chevron-back-sharp" color={tintColor} size={30} />
      </TouchableOpacity>,
      headerRight: HeaderRight,
    });
    // croppedPhotoArr 의존성 받아야 하네.
  },[croppedPhotoArr])

  const [fullImageIndex,setFullImageIndex] = useState(0);
  // 현재 화면 넓이
  const {width} = useWindowDimensions();
  // 각각의 사진 높이/넓이
  const arrayImageWidth = width/4;

  // 올릴 사진 목록 보여줌.
  const renderItem = ({ item:photo, index, drag, isActive }: RenderItemParams<DiaryPlusPhotoAndVideoFileInfo>) => {
    if(index === undefined) return // 타입 체크용

    const onPressIn = () => {
      // setBigImage(photo.uri)
      setBigImage(photo)
      setFullImageIndex(index);
    }
    // fullImageIndex = index;
    const displayIndex = index + 1;

    const photoUri = () => {
      // 사진은 체크 안해도 되나? 왜 그냥 넘어갔지?
      const thumbNail = photo.forIOSThumbNailUri;
    //    console.log("thumbNail")
    // console.log(thumbNail)
      if(isAndroid){
        return thumbNail ? `data:image/jpeg;base64,${thumbNail}` : photo.uri;
      } else {
        return thumbNail ?? photo.uri;
      }
    };
   
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          onPressIn={onPressIn}
        >
          <FastImage
            style={{ width:arrayImageWidth, height:arrayImageWidth }}
            source={{ uri: photoUri() }}
            // source={{ uri: `data:image/jpeg;base64,${photo.forIOSThumbNailUri}` ?? photo.uri }}
          />
          <SelectedIconContainer>
            <SelectedPhotoComponent>
              <SelectedPhotoComponentText>{displayIndex}</SelectedPhotoComponentText>
            </SelectedPhotoComponent>
          </SelectedIconContainer>
          {/* {photo.isVideo && <IsVideoIconContainer>
            <Entypo name="video-camera" size={14} color="white" />
          </IsVideoIconContainer>} */}
          {photo.isVideo && <VideoIconPositionAbsolute top="7%" left="7%" iconSize={14} />}
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };



  // 큰 사진에서 사진 삭제 버튼 눌렀을 떄
  const onFullPhotoDeleteBtnClick = () => {
    const onPressDeleteOk = () => {

      const setNewPhotoArray = (prev:DiaryPlusPhotoAndVideoFileInfo[]) => {
        const newArr = [...prev];
        newArr.splice(fullImageIndex,1);
        return newArr;
      };

      // setBigImage(croppedPhotoArr[0].uri)
      setBigImage(croppedPhotoArr[fullImageIndex === 0 ? 1 : 0]) // setCroppedPhotoArr 가 비동기라서 얘 뒤에서 setBigImage(croppedPhotoArr[0]) 하면 0번째를 뺏을 때 그대로 나옴
      // 두개 다 해줌.
      setCroppedPhotoArr(prev => setNewPhotoArray(prev));
      setPurePhotoArr(prev => setNewPhotoArray(prev));
      setFullImageIndex(0);
    };

    Alert.alert("해당 사진을 업로드 목록에서 제외하시겠습니까?",undefined,[
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: onPressDeleteOk }
    ]);
  };

  // 큰 사진에서 사진 자르기 버튼 눌렀을 떄
  const onFullPhotoCropBtnClick = () => {
    const selectedImage = purePhotoArr[fullImageIndex];
    if(selectedImage.isVideo) {

      navigation.navigate("EditVideo",{
        file:selectedImage.uri,
        
        // 
        from:"petLog",
        // 
        
      });

    } else {
      ImagePicker.openCropper({
        // 짜른거 말고 원래 사진을 가져옴.
        cropping: true,
        path: selectedImage.uri,
        width: 1200,
        height: 1500,
        mediaType: 'photo',
        // 이게 문서에는 안쓰여 있는데 ios only 라고 나와서 안드로이드 확인 필요
        freeStyleCropEnabled: true,
      }).then(image => {
        const newFileInfo = {
          uri: image.path,
          isVideo: false,
        };
        setCroppedPhotoArr(prev => {
          const newPhotoArray = [...prev];
          newPhotoArray[fullImageIndex] = newFileInfo;
          return newPhotoArray;
        });

        setBigImage(newFileInfo);
      });
    }
  };

  const bigImageWidth = width * 0.9;

  const onDragEnd = ({ data, to }:{ data:DiaryPlusPhotoAndVideoFileInfo[], to:number }) => {
    setPurePhotoArr(data);
    setCroppedPhotoArr(data);
    setFullImageIndex(to);
  };

  const onPressFullScreen = async() => {
    navigation.navigate("FullScreenVideo",{
      uri: bigImage.uri,
    });
  };

  const bigImageUri = () => {
    const thumbNail = bigImage.forIOSThumbNailUri;
    console.log("thumbNail")
    console.log(thumbNail)
    if(isAndroid){
      // base64 image 는 uri 를 밑에 형식으로 받아야 함.
      return thumbNail ? `data:image/jpeg;base64,${thumbNail}` : bigImage.uri;
    } else {
      return thumbNail ?? bigImage.uri;
    }
  };

  // 화면
  return (
    <BaseContainer>
      <KeyboardAwareScrollView>
        {/* 이미지 업로드 안해도 되면 얘랑 밑에 수정 */}
        <FullImageContainer>
          {/* 큰 이미지 위에 삭제 버튼 만듦. 1개 이상일때. */}
          {purePhotoArr.length !== 1 && <FullImageDeleteBtn onPress={onFullPhotoDeleteBtnClick}>
            <Ionicons name="trash" size={24} color="white" />
          </FullImageDeleteBtn>}
          <FullImageCropBtn onPress={onFullPhotoCropBtnClick}>
            <Ionicons name={bigImage.isVideo ? "ios-cut-sharp" : "ios-crop-sharp"} size={24} color="white" />
          </FullImageCropBtn>
          {/* <Photo source={{uri:bigImage}} resizeMode="contain" /> */}
          <FastImage
            style={{ height:bigImageWidth, width:bigImageWidth }}
            source={{ uri:bigImageUri() }}
            resizeMode={FastImage.resizeMode.cover}
          />
          {bigImage.isVideo && <VideoIconPositionAbsolute top="10px" left="10px" iconSize={26} />}
          {bigImage.isVideo && <FullImageFullScreenBtn onPress={onPressFullScreen} >
            <MaterialIcons name="fullscreen" size={28} color="white" />
          </FullImageFullScreenBtn>}
        </FullImageContainer>

        <ImageContainer>
          <DraggableFlatList
            data={croppedPhotoArr}
            onDragEnd={onDragEnd}
            // 근데 옮기면 키가 index 라 바뀌는데 괜찮을라나? 되는데 깜빡거림. index 쓰지마
            keyExtractor={(item) => item.uri}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={{
              // 얘를 해야지 세로로 사진이 움직임.
              flexDirection: 'row',
            }}
            bounces={false}
          />
        </ImageContainer>
        <AnnounceText>길게 눌러서 순서를 변경하실 수 있습니다.</AnnounceText>
        
      </KeyboardAwareScrollView>
    </BaseContainer>
  );
})
export default DiaryPlusPhotoAndVideo;