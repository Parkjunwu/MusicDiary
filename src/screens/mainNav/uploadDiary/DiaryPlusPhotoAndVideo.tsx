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


// socutie PlusFileFormPetLog ??? ??????

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

    // animation:"none" option ??? ????????? ??????. ??? ?????? ??????. ????????? UploadFormNav ??? ?????? ????????? HomeNav ??? ????????? ??????. ?????? ?????? ???????????? UploadFormNav ??? ???????????? ??? ?????????
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

    // navigate resizedPhotoArr ??? ??????.
    // ?????? ???????????? ?????? ???. Select ????????? UploadPetLog ??? ?????? ??? ?????????.
    // UploadFormNav ??? ?????? ????????? ?????????. ??? ?????? ??? ???????????????. ????????? ??????

    const navigateScreenName = route.params.from;
    
    navigation.navigate(navigateScreenName,{
      // file:resizedPhotoArr,
      plusFiles:resizedPhotoArr,
    });

  };

  // ??????????????? ?????? ??????
  const HeaderRight = () => <TouchableOpacity onPress={onValid}>
    <HeaderRightText fontSize={16}>??????</HeaderRightText>
  </TouchableOpacity>

  useEffect(() => {
    navigation.setOptions({
      headerLeft:({tintColor}) => <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="chevron-back-sharp" color={tintColor} size={30} />
      </TouchableOpacity>,
      headerRight: HeaderRight,
    });
    // croppedPhotoArr ????????? ????????? ??????.
  },[croppedPhotoArr])

  const [fullImageIndex,setFullImageIndex] = useState(0);
  // ?????? ?????? ??????
  const {width} = useWindowDimensions();
  // ????????? ?????? ??????/??????
  const arrayImageWidth = width/4;

  // ?????? ?????? ?????? ?????????.
  const renderItem = ({ item:photo, index, drag, isActive }: RenderItemParams<DiaryPlusPhotoAndVideoFileInfo>) => {
    if(index === undefined) return // ?????? ?????????

    const onPressIn = () => {
      // setBigImage(photo.uri)
      setBigImage(photo)
      setFullImageIndex(index);
    }
    // fullImageIndex = index;
    const displayIndex = index + 1;

    const photoUri = () => {
      // ????????? ?????? ????????? ??????? ??? ?????? ?????????????
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



  // ??? ???????????? ?????? ?????? ?????? ????????? ???
  const onFullPhotoDeleteBtnClick = () => {
    const onPressDeleteOk = () => {

      const setNewPhotoArray = (prev:DiaryPlusPhotoAndVideoFileInfo[]) => {
        const newArr = [...prev];
        newArr.splice(fullImageIndex,1);
        return newArr;
      };

      // setBigImage(croppedPhotoArr[0].uri)
      setBigImage(croppedPhotoArr[fullImageIndex === 0 ? 1 : 0]) // setCroppedPhotoArr ??? ??????????????? ??? ????????? setBigImage(croppedPhotoArr[0]) ?????? 0????????? ?????? ??? ????????? ??????
      // ?????? ??? ??????.
      setCroppedPhotoArr(prev => setNewPhotoArray(prev));
      setPurePhotoArr(prev => setNewPhotoArray(prev));
      setFullImageIndex(0);
    };

    Alert.alert("?????? ????????? ????????? ???????????? ?????????????????????????",undefined,[
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: onPressDeleteOk }
    ]);
  };

  // ??? ???????????? ?????? ????????? ?????? ????????? ???
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
        // ????????? ?????? ?????? ????????? ?????????.
        cropping: true,
        path: selectedImage.uri,
        width: 1200,
        height: 1500,
        mediaType: 'photo',
        // ?????? ???????????? ????????? ????????? ios only ?????? ????????? ??????????????? ?????? ??????
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
      // base64 image ??? uri ??? ?????? ???????????? ????????? ???.
      return thumbNail ? `data:image/jpeg;base64,${thumbNail}` : bigImage.uri;
    } else {
      return thumbNail ?? bigImage.uri;
    }
  };

  // ??????
  return (
    <BaseContainer>
      <KeyboardAwareScrollView>
        {/* ????????? ????????? ????????? ?????? ?????? ?????? ?????? */}
        <FullImageContainer>
          {/* ??? ????????? ?????? ?????? ?????? ??????. 1??? ????????????. */}
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
            // ?????? ????????? ?????? index ??? ???????????? ???????????????? ????????? ????????????. index ?????????
            keyExtractor={(item) => item.uri}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={{
              // ?????? ????????? ????????? ????????? ?????????.
              flexDirection: 'row',
            }}
            bounces={false}
          />
        </ImageContainer>
        <AnnounceText>?????? ????????? ????????? ???????????? ??? ????????????.</AnnounceText>
        
      </KeyboardAwareScrollView>
    </BaseContainer>
  );
})
export default DiaryPlusPhotoAndVideo;