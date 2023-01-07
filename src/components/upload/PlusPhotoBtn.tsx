import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { isAndroid } from "../../utils";
// react-native-multi-image-picker 로 해야할듯. crop 은 순서가 랜덤으로 받아짐
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from '@baronha/react-native-multiple-image-picker';
import { ProcessingManager } from 'react-native-video-processing';
import { DiaryPlusPhotoAndVideoFileInfo } from "../../types/upload/fileType";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

const PlusPhotoPressable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
// const PlusPhotoText = styled.Text<{tintColor:string}>`
//   color: ${props=>props.tintColor};
//   font-size: 16px;
// `;
const PlusPhotoText = styled(FontAppliedBaseTextNeedFontSize)<{tintColor:string}>`
  /* font-size: 15px; */
`;

export const MAX_FILE_NUMBER = 10;

export const FILE_NUMBER_EXCEED_MESSAGE = "최대 10장 이상의 사진을 선택하실 수 없습니다.";

type PlusPhotoBtnProps = {
  tintColor: string,
  from: "UploadDiary" | "EditDiary" | "EditDiaryForTemporaryDiaryData",
  nowFileNumber: number,
}

const PlusPhotoBtn = ({
  tintColor,
  from,
  nowFileNumber,
}:PlusPhotoBtnProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<UploadDiaryTabStackParamsList>>();

  const onPressPlusPhoto = () => {
    if(nowFileNumber === MAX_FILE_NUMBER) return Alert.alert(FILE_NUMBER_EXCEED_MESSAGE);

    if(isAndroid) {
      return navigation.navigate("DiarySelectPhotoAndVideo",{
        from,
        nowFileNumber,
      });
    } else {
      ImagePicker.openPicker({
        // multiple: true
        mediaType: "image", // 사진만 넣도록
        maxSelectedAssets: MAX_FILE_NUMBER - nowFileNumber,
        maximumMessageTitle: "알림",
        maximumMessage: FILE_NUMBER_EXCEED_MESSAGE,
      }).then(async(files) => {
        
        if(files.length === 0) return;

        const uploadFileUriArr:DiaryPlusPhotoAndVideoFileInfo[] = [];

        await Promise.all(
          files.map(
            async(file,index) => {
              const { path:localUri, type } = file;
              // const isVideo = file.mime === "video/mp4";
              const isVideo = type === "video";
              let forIOSThumbNailUri:string | undefined;
              if(isVideo) {
                const maximumSize = { width: 500, height: 500 };
                forIOSThumbNailUri = (await ProcessingManager.getPreviewForSecond(localUri, 0, maximumSize, "JPEG")).uri;
              }
              uploadFileUriArr[index] = {
                uri: localUri,
                isVideo,
                forIOSThumbNailUri,
              };
            }
          )
        );

        return navigation.navigate("DiaryPlusPhotoAndVideo",{
          file:uploadFileUriArr,
          from,
        });
      });
      // return navigation.navigate("SearchYoutube");
    }
  };

  return (
    <PlusPhotoPressable
      onPress={onPressPlusPhoto}
    >
      <PlusPhotoText fontSize={15} tintColor={tintColor} >사진 추가</PlusPhotoText>
      {/* <PlusPhotoText fontSize={15} tintColor={tintColor} >사진/동영상</PlusPhotoText> */}
      <Ionicons name="ios-add-sharp" size={23} color={tintColor}/>
    </PlusPhotoPressable>
  );
};

export default PlusPhotoBtn;



// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// // import styled from "styled-components/native";
// // import Ionicons from "react-native-vector-icons/Ionicons";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
// import { isAndroid } from "../../utils";
// // react-native-multi-image-picker 로 해야할듯. crop 은 순서가 랜덤으로 받아짐
// // import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from '@baronha/react-native-multiple-image-picker';
// import { ProcessingManager } from 'react-native-video-processing';
// import { DiaryPlusPhotoAndVideoFileInfo } from "../../types/upload/fileType";
// import SelectDropdown from 'react-native-select-dropdown'
// import useIsDarkMode from "../../hooks/useIsDarkMode";

// // const PlusPhotoPressable = styled.TouchableOpacity`
// //   flex-direction: row;
// //   align-items: center;
// // `;
// // const PlusPhotoText = styled.Text<{tintColor:string}>`
// //   color: ${props=>props.tintColor};
// //   font-size: 16px;
// // `;

// type PlusPhotoBtnProps = {
//   tintColor: string,
//   from: "UploadDiary" | "EditDiary",
// }

// const PlusPhotoBtn = ({tintColor,from}:PlusPhotoBtnProps) => {

//   const list = ["사진 추가", "음악 지정"];

//   const navigation = useNavigation<NativeStackNavigationProp<UploadDiaryTabStackParamsList>>();

//   const onPressPlusPhoto = () => {
//     if(isAndroid) {
//       return navigation.navigate("DiarySelectPhotoAndVideo",{
//         from,
//       });
//     } else {
//       ImagePicker.openPicker({
//         // multiple: true
//       }).then(async(files) => {
        
//         const uploadFileUriArr:DiaryPlusPhotoAndVideoFileInfo[] = [];

//         await Promise.all(
//           files.map(
//             async(file,index) => {
//               const { path:localUri, type } = file;
//               // const isVideo = file.mime === "video/mp4";
//               const isVideo = type === "video";
//               let forIOSThumbNailUri:string | undefined;
//               if(isVideo) {
//                 const maximumSize = { width: 500, height: 500 };
//                 forIOSThumbNailUri = (await ProcessingManager.getPreviewForSecond(localUri, 0, maximumSize, "JPEG")).uri;
//               }
//               uploadFileUriArr[index] = {
//                 uri: localUri,
//                 isVideo,
//                 forIOSThumbNailUri,
//               };
//             }
//           )
//         );

//         return navigation.navigate("DiaryPlusPhotoAndVideo",{
//           file:uploadFileUriArr,
//           from,
//         });
//       });
//       // return navigation.navigate("SearchYoutube");
//     }
//   };

//   const isDarkMode = useIsDarkMode();
//   const buttonBackgroundColor = isDarkMode ? "black" : "white";
//   const rowBackgroundColor = isDarkMode ? "rgba(0,0,0,0.8)" : "white";
//   // const rowOpacity = isDarkMode ? "0.3" : "white";
//   const textColor = isDarkMode ? "white" : "black";

//   return (
//     <SelectDropdown
//       data={list}
//       onSelect={(selectedItem) => {
//         if(selectedItem === "사진 추가") {
//           onPressPlusPhoto()
//         } else {
//           navigation.navigate("SearchYoutube");
//         }
//       }}
//       defaultButtonText="+ 미디어 추가"
//       buttonTextAfterSelection={() => "+ 미디어 추가"}
//       rowTextForSelection={(item) => item}
//       // dropdownStyle={{
//       //   width: 100,
//       // }}
//       buttonStyle={{
//         backgroundColor: buttonBackgroundColor,
//         height: 40,
//       }}
//       buttonTextStyle={{
//         fontSize: 16,
//         color: textColor,
//       }}
//       rowStyle={{
//         backgroundColor: rowBackgroundColor,
//         height: 40,
//         // borderWidth: 1,
//       }}
//       rowTextStyle={{
//         fontSize: 16,
//         color: textColor,
//       }}
//     />
//   );
// };

// export default PlusPhotoBtn;