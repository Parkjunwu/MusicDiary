import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootNavStackParamsList from "../types/navigation/rootNavStackParamsList";

// type BoardType = {
//   boardId: string,
//   commentId: string,
//   commentOfCommentId: string,
// }

type BaseDataType = {
  channelId: string,
  diaryId?: string,
  boardId?: string,
  commentId?: string,
  commentOfCommentId?: string,
};

const useOnPressPushNotification = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootNavStackParamsList>>();
  
  const notificationNavigate = (data:BaseDataType) => {
    const channelId = data.channelId;
    // console.log("channelId "+channelId);
    switch (channelId) {
      // RootNav 의 컴포넌트를 보여줄거임.
      // case 'follow':
      //   console.log("useOnPressPushNotification 에 PushNotification 으로 들어왔을 때 로직 작성해야함. 보통 navigate");
      //   // return navigation.navigate("PushNotificationUser",{
      //   //   id: Number(data.userId),
      //   //   userName: data.userName
      //   // });
      case "MUSIC_SELECTED":
      case "MUSIC_CHANGED":
        // 될라나?
        return navigation.navigate("PushNotificationDiaryNav",{
          id: Number(data.diaryId),
        });
        
      
      case "MY_BOARD_GET_LIKE":
      case 'MY_BOARD_GET_COMMENT':
      case "MY_BOARD_COMMENT_GET_LIKE":
      case "MY_BOARD_COMMENT_GET_COMMENT":
      case "MY_BOARD_COMMENT_OF_COMMENT_GET_LIKE":
        return navigation.navigate("PushNotificationBoard",{
          boardId:Number(data.boardId),
          // 아마 commentId 랑 commentOfCommentId 로 받을듯. boardcommentId 로 받으면 변경
          ...(data.commentId && {commentId: Number(data.commentId)}),
          ...(data.commentOfCommentId && {commentOfCommentId: Number(data.commentOfCommentId)})
        });

      default:
        console.log("알 수 없는 체널입니다.");
        return "Unknown Channel";
    }
  };

  return notificationNavigate;
};

export default useOnPressPushNotification;