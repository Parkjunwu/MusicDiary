import { useNavigation } from '@react-navigation/native';
// import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Dropdown } from 'react-native-material-dropdown';
import Ionicons from "react-native-vector-icons/Ionicons"
import { Alert } from "react-native";
import { ProcessingManager } from 'react-native-video-processing';
import useColorsChangedByDarkMode from '../../../hooks/useColorsChangedByDarkMode';
import { isIOS } from '../../../utils';
import isImage from '../../../logic/isImage';
import { FileInfo } from '../../../types/upload/fileType';
import useDeleteBoard from '../../../hooks/board/useDeleteBoard';
import { fontFamilyVar } from '../../../apollo';

const dropdownList = [
  {
    value: '신고',
  }
];

const isMineDropdownList = [
  {
    value: '수정',
  },
  {
    value: '삭제',
  }
];

type PostDropdownProps = {
  boardId:number,
  isMine:boolean,
  file?:string[],
  body?:string[],
  title:string,
};

const BoardDropDown = ({boardId,isMine,file,body,title}:PostDropdownProps) => {

  const deleteBoard = useDeleteBoard(boardId);

  const { textColor } = useColorsChangedByDarkMode();
  const navigation = useNavigation();

  const onChangeText = (value: string, index: number, data: any) => {
    
    if (value === "신고") {
      Alert.alert("해당 게시물을 신고하시겠습니까?",undefined,[
        {
          text:"신고",
          onPress:() => {
            navigation.navigate("AccuseBoard",{
              boardId,
            })
          }
        },
        {
          text:"취소",
          style:"cancel",
        }
      ]);
    } else if (value === "수정") {
      Alert.alert("해당 게시물을 수정하시겠습니까?",undefined,[
        {
          text:"수정",
          onPress:async() => {
            const fileInfoArr: FileInfo[] = [];
            const asyncGetFileInfo = file?.map(async(singleFile,index) => {
              if(isImage(singleFile)) {
                fileInfoArr[index] = {
                  uri:singleFile,
                  isVideo:false,
                };
              } else {
                const maximumSize = { width: 200, height: 200 };
                const thumbNail = isIOS ?
                  (await ProcessingManager.getPreviewForSecond(singleFile, 0, maximumSize, "JPEG")).uri
                  :
                  undefined;
                fileInfoArr[index] = {
                  uri:singleFile,
                  isVideo:true,
                  thumbNail,
                };
              }
            });

            await Promise.all(asyncGetFileInfo);
            
            // UploadForm 말고 컴포넌트 따로 만들어야할듯. 너무 복잡해
            navigation.navigate("EditBoard",{
              boardId,
              title,
              fileInfoArr,
              body,
            })
          }
        },
        {
          text:"취소",
          style:"cancel",
        }
      ]);
    } else if (value === "삭제") {
      Alert.alert("해당 게시물을 삭제하시겠습니까?",undefined,[
        {
          text:"삭제",
          onPress:async() => {
            await deleteBoard();
          },
        },
        {
          text:"취소",
          style:"cancel",
        }
      ]);
    }
  };

  return (
    <Dropdown
      data={isMine ? isMineDropdownList : dropdownList}
      pickerStyle={{borderRadius:10,width:60}}
      renderBase={()=><Ionicons name="ellipsis-vertical-outline" size={24} color={textColor} />}
      dropdownOffset={{left:-15, top: isMine ? 41 : 5}} 
      onChangeText={onChangeText}
      itemTextStyle={{fontFamily:fontFamilyVar()}}
    />
  );
};

export default BoardDropDown;