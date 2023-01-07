import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, FlatList, Image, ListRenderItem, TouchableOpacity, useWindowDimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from "../../../js-assets/color";
import PermissionRequestView from "./diarySelectPhoto/PermissionRequestView";
import storagePermissionCheck from "../../../logic/diarySelectPhoto/storagePermissionCheck";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { FILE_NUMBER_EXCEED_MESSAGE, MAX_FILE_NUMBER } from "../../../components/upload/PlusPhotoBtn";

const Container = styled.View`
  flex:1;
  background-color: ${props=>props.theme.backgroundColor};
`;
const Top = styled.View`
  flex: 1;
`;
const TopVideoIconContainer = styled.View`
  position: absolute;
  top: 5%;
  right: 5%;
`;
const TopFullScreenIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 5%;
`;
const Bottom = styled.View`
  flex: 1;
`;
const ImageContainer = styled.TouchableOpacity``;

const VideoIconContainer = styled.View`
  position: absolute;
  top: 10%;
  right: 10%;
`;
const IndexIconContainer = styled.View`
  position: absolute;
  bottom: 10%;
  right: 10%;
`;
// const HeaderRightText = styled.Text`
const HeaderRightText = styled(FontAppliedBaseTextNeedFontSize)`
  color:${colors.blue};
  /* font-size: 16px; */
  /* font-weight: 600; */
  margin-right: 7px;
`;

const NotSelectedPhotoComponent = styled.View`
  width: 20px;
  height: 20px;
  border: 2px;
  border-color: grey;
  border-radius: 10px;
`;
const SelectedPhotoComponent = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 12px;
  background-color: yellow;
  justify-content: center;
  align-items: center;
`;
const SelectedPhotoComponentText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 14px; */
`;

type FileInfo = {
  uri: string,
  isVideo: boolean,
}

type DiarySelectPhotoAndVideoProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"DiarySelectPhotoAndVideo">;

// 지금 ios 는 camera-roll 이 localUrl 을 못받아서 그냥 UploadDiaryNav 의 PlusPhotoBtn 에서 imagePicker 띄워서 보냄. 얘는 안드로이드만 쓰는 중

const DiarySelectPhotoAndVideo = ({navigation,route}:DiarySelectPhotoAndVideoProps) => {
  
  // const isUploadPetLog = route.params?.from === "uploadPetLog";
  // const isEditPetLog = route.params?.from === "editPetLog";

  // 카메라 설정.. 어디다 쓰는거지?
  const [permissionOk,setPermissionOk] = useState<boolean|null>(null);
  // 전체 사진 uri 목록
  // const [photos,setPhotos] = useState<string[]>([]);
  const [photos,setPhotos] = useState<FileInfo[]>([]);
  // 현재 선택 사진
  const [chosenPhoto,setChosenPhoto] = useState<FileInfo>();
  // 업로드할 선택 사진 전ㅔ
  const [allChosenPhotosArr,setAllChosenPhotosArr] = useState<FileInfo[]>([]);

  const [endCursorName,setEndCursorName] = useState<string>();
  const [isHaveNextPage,setIsHaveNextPage] = useState<boolean>(true);

  // 사진들 가져옴
  const getPhotos = async() => {
    if(!isHaveNextPage) return;
    const {edges,page_info:{end_cursor,has_next_page}} = await CameraRoll.getPhotos({
      first: 30,
      ...(endCursorName && { after: endCursorName }),
    });
    const photos = edges.map(photo=>{
      // const {uri} = photo.node.image;
      const {image:{uri},type} = photo.node;
      return {
        uri,
        isVideo: type === "video/mp4",
      };
    });

    // 맨처음 가져왔을 땐 큰 화면을 제일 처음 사진으로 지정
    // if(!endCursorName && photos.length !== 0){
    const isFirstGetPhotos = !endCursorName && photos.length !== 0
    if(isFirstGetPhotos){
      // setChosenPhoto(photos[0]?.uri);
      // video 도 uri 넣으면 되는지 확인. 아님 비디오를 재생하거나
      setChosenPhoto(photos[0]);
    }
    setEndCursorName(end_cursor);
    setIsHaveNextPage(has_next_page);
    setPhotos(prev=>[...prev,...photos]);
  };
  
  // 권한 확인 & 요청 후 사진 가져오기
  const checkPermissionAndGetPhotos = async() => {
    const isPermissionOk = await storagePermissionCheck();
    
    if(isPermissionOk) {
      setPermissionOk(true);
      getPhotos();
    }
  };

  // 처음 시작하자마자 권한 확인
  useEffect(()=>{
    checkPermissionAndGetPhotos();
  },[]);
  

  // 다음 화면으로 넘어가기. 파일 받아서 넘어감.
  const HeaderRight = () => <TouchableOpacity onPress={async() => {
    // 사진을 하나도 선택 안했을 경우.
    if(allChosenPhotosArr.length === 0){
      // 지금은 사진이 있어야만 업로드 할거라 알림 띄움. 트위터처럼 텍스트만 보내도 되면 변경.
      Alert.alert("사진을 선택해 주세요.")
    } else {
      navigation.navigate("DiaryPlusPhotoAndVideo",{
        file:allChosenPhotosArr,
        from:route.params.from,
      });
    };
  }}>
    <HeaderRightText fontSize={16}>Next</HeaderRightText>
  </TouchableOpacity>

  // 헤더 설정. 다음 화면 넘어가는 버튼
  useEffect(()=>{
    if(permissionOk){
      navigation.setOptions({
        headerRight:HeaderRight,
      });
    }
  // 의존성이 있어야 함. 안그러면 처음에만 실행되서 allChosenPhotosArr 바뀐걸 안받음.
  },[permissionOk,allChosenPhotosArr])

  // FlatList 설정
  const numColumns = 4;
  const {width} = useWindowDimensions();
  // 각각의 사진 높이/넓이
  const imageWidth = width/numColumns;

  const nowFileNumber = route.params.nowFileNumber;
  // 사진 클릭 시
  const selectPhoto = (file:FileInfo) => {
    // const index = allChosenPhotosArr.indexOf(file);
    const index = allChosenPhotosArr.findIndex(singleChosenPhoto=>singleChosenPhoto.uri === file.uri);
    if(index === -1) {
      // 처음 선택하는 사진일 때
      // 10장 이상은 선택 안됨.
      // if(allChosenPhotosArr.length === 10) {
      if(allChosenPhotosArr.length === MAX_FILE_NUMBER - nowFileNumber) {
        return Alert.alert(FILE_NUMBER_EXCEED_MESSAGE);
      }
      // 큰 이미지에 넣음, 동영상일땐?
      // setChosenPhoto(file);
      setChosenPhoto(file);

      setAllChosenPhotosArr(prev => {
        const newArr = [...prev]
        newArr.push(file);
        return newArr;
      })

    } else {
      // 이미 선택했던 사진일 때
      setAllChosenPhotosArr(prev=>{
        const newArr = [...prev]
        newArr.splice(index,1);
        return newArr;
      })
    }
  };

  // 각각의 사진 렌더링
  const renderItem: ListRenderItem<FileInfo> = ({item:photo}) => {
    // 선택한 사진이 있는지, 있다면 걔의 인덱스를 넣음.
    // const index = allChosenPhotosArr.indexOf(photo);
    const index = allChosenPhotosArr.findIndex(singleChosenPhoto=>singleChosenPhoto.uri === photo.uri);
    return (
      <ImageContainer onPress={()=>selectPhoto(photo)} >
        {/* FastImage 안씀. 로컬이미지는 Image 가 더 빠른듯 */}
        {/* <Image source={{uri:photo}} style={{width:imageWidth,height:imageWidth}}/> */}
        <Image source={{uri:photo.uri}} style={{width:imageWidth,height:imageWidth}}/>
        <IndexIconContainer>
          {/* 선택한 사진이면 걔의 index 나오게. 아니면 그냥 비어있는 걸로 */}
          {index === -1 ? <NotSelectedPhotoComponent /> : <SelectedPhotoComponent>
            <SelectedPhotoComponentText>{index+1}</SelectedPhotoComponentText>
          </SelectedPhotoComponent>}
        </IndexIconContainer>
        {photo.isVideo && <VideoIconContainer>
          <Entypo name="video-camera" size={20} color="white" />
        </VideoIconContainer>}
      </ImageContainer>
    )
  };

  const onEndReached = async() => {
    await getPhotos();
  };

  if(permissionOk === null) {
    return <Container />;
  }
  if(permissionOk === false) {
    return <PermissionRequestView permissionKind="사진 파일" />;
  }

  const isVideo = chosenPhoto && chosenPhoto.isVideo;

  const onPressFullScreen = () => {
    // navigation.navigate("UploadFormNav",{
    //   screen: 'FullScreenVideo',
    //   params: {uri: chosenPhoto.uri,},
    // });
    if(chosenPhoto){
      navigation.navigate("FullScreenVideo",{
        uri: chosenPhoto.uri,
      });
    }
  };

  return (
    <Container>
      <Top>
        {(chosenPhoto && chosenPhoto.uri !== "") && <Image
          style={{ width:"100%",height:"100%" }}
          source={{ uri:chosenPhoto.uri }}
        />
        }
        {isVideo && <TopVideoIconContainer>
          <Entypo name="video-camera" size={30} color="white" />
        </TopVideoIconContainer>}
        {/* android 동영상 확인 넣어야함. */}
        {/* {isVideo && <TopFullScreenIconContainer> */}
        {isVideo && <TopFullScreenIconContainer onPress={onPressFullScreen}>
          <MaterialIcons name="fullscreen" size={30} color="white" />
        </TopFullScreenIconContainer>}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          keyExtractor={(photo,index) => index+""}
          renderItem={renderItem}
          numColumns={numColumns}
          onEndReached={onEndReached}
          onEndReachedThreshold={1}
        />
      </Bottom>
    </Container>
  )
};

export default DiarySelectPhotoAndVideo;


// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import AndroidSelectPhoto from "./diarySelectPhoto/AndroidSelectPhoto";
// import IOSSelectPhoto from "./diarySelectPhoto/IOSSelectPhoto";
// import { isAndroid } from "../../../utils";

// // 타입도 바꿔야 할듯. AndroidSelectPhoto 에서 배껴옴

// type FileInfo = {
//   uri: string,
//   isVideo: boolean,
// }

// type INavProps = {
//   Select: {
//     from?: string
//   };
//   // 얘는 파일 uri 만 넘길 때
//   // UploadForm: {file:string[]};
//   // uri, isVideo 같이 넘길 때
//   UploadFormNav:{
//     screen: 'UploadForm',
//     params: {file: FileInfo[]}
//   } | {
//     screen: 'FullScreenVideo',
//     params: {uri: string}
//   }
//   // UploadForm: {file:FileInfo[]};
//   FullScreenVideo: {uri:string};
// };

// type Props = NativeStackScreenProps<INavProps, 'Select'>;

// const DiarySelectPhoto = (props:Props) => {
//   return isAndroid ? <AndroidSelectPhoto {...props}/> : <IOSSelectPhoto {...props}/>
// };

// export default DiarySelectPhoto;