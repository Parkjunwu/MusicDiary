import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { seeUserNotificationList_seeUserNotificationList_notification } from "../../__generated__/seeUserNotificationList";
import getNotificationMessage from "../../logic/notification/getNotificationMessage";
import getPassedTime from "../../logic/getPassedTime";
import { NotificationList } from "../../types/navigation/homeNavStackParamsList";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { remoteNotificationChannelList } from "../../pushNotification/constants";


const TouchableContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 5px 20px;
`;
// const TouchableAvatarContainer = styled.TouchableOpacity``;
// const UserAvatar = styled.Image`
//   height: 40px;
//   width: 40px;
//   border-radius: 20px;
//   margin: 10px;
// `;
const ContentsContainer = styled.View`
  justify-content: center;
`;
const NotificationContents = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
// const NotificationContentsText = styled.Text`
//   color: ${props=>props.theme.textColor};
//   text-align: center;
// `;
const NotificationContentsText = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
`;

// const UserLink = styled.TouchableOpacity``;
// const UserLinkText = styled.Text`
//   color: ${props=>props.theme.textColor};
//   font-weight: 600;
//   font-size: 16px;
// `;
// const PublishTime = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
const PublishTime = styled(FontAppliedBaseTextNeedFontSize)`
  
`;

type Props = NativeStackScreenProps<NotificationList, 'Notification'>;

const NotificationLayout = (data:seeUserNotificationList_seeUserNotificationList_notification,navigation:Props['navigation']) => {

  // 알림 메세지 내용
  const notificationMessage = getNotificationMessage(data.which);
  // 알림 발생한 시간
  const passedTime = getPassedTime(data.createdAt)
  

  const onPressContainer = () => {
    console.log(data.which)
    switch(data.which) {
      // case 'FOLLOW_ME':
      //   navigation.navigate("Profile", { id: data.publishUser.id, userName:  data.publishUser.userName })
      //   break;

      // case 'FOLLOWING_WRITE_POST':
      // case 'MY_POST_GET_LIKE':
      //   navigation.navigate("Photo", { photoId: data.postId })
      //   break;

      // case 'MY_POST_GET_COMMENT':
      // case 'MY_COMMENT_GET_LIKE':
      //   // Photo 를 가고 Comments 를 가서 Comments 에서 뒤로가기 하면 해당 Photo 로 가짐.
      //   navigation.navigate("Photo", { photoId: data.postId });
      //   navigation.navigate("Comments", { postId: data.postId, commentId: data.commentId });
      //   break;

      // case 'MY_COMMENT_GET_COMMENT':
      // case 'MY_COMMENT_OF_COMMENT_GET_LIKE':
      //   navigation.navigate("Photo", { photoId: data.postId });
      //   navigation.navigate("Comments", { postId: data.postId, commentId: data.commentId, commentOfCommentId: data.commentOfCommentId });
      //   break;

      
      case "FOLLOWING_WRITE_BOARD":
      case "MY_BOARD_GET_LIKE":
      case "MY_BOARD_GET_COMMENT":
      case "MY_BOARD_COMMENT_GET_LIKE":
      case "MY_BOARD_COMMENT_GET_COMMENT":
      case "MY_BOARD_COMMENT_OF_COMMENT_GET_LIKE":
        navigation.navigate("NotificationBoard",{
          boardId:Number(data.boardId),
          // 아마 commentId 랑 commentOfCommentId 로 받을듯. boardcommentId 로 받으면 변경
          ...(data.commentId && {commentId: Number(data.commentId)}),
          ...(data.commentOfCommentId && {commentOfCommentId: Number(data.commentOfCommentId)})
        });
        break;

      // case  "MUSIC_CHANGED":
      // case  "MUSIC_SELECTED":
      case remoteNotificationChannelList.MUSIC_CHANGED:
      case remoteNotificationChannelList.MUSIC_SELECTED:
        // navigation.navigate("NotificationDiary",{
        navigation.navigate("NotificationDiaryDrawerNav",{
          id:Number(data.diaryId),
        })
        break;

      default:
        Alert.alert("잘못된 접근 입니다.","지속적으로 같은 문제가 발생할 시 문의주시면 감사드리겠습니다.",[{text:"확인"}])
        break;
    }
  }

  // const onPressAvatar = () => {
  //   navigation.navigate("Profile", { id: data.publishUser.id, userName:  data.publishUser.userName });
  // }

  return <TouchableContainer onPress={onPressContainer}>
    {/* <TouchableAvatarContainer onPress={onPressAvatar}>
      <FastImage
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          margin: 10,
        }}
        // source={data.publishUser.avatar?{uri:data.publishUser.avatar}:require("../../../assets/no_user.png")}
        // source={data.publishUser.avatar?{uri:data.publishUser.avatar}:image.no_user}
        // source={{uri: data.publishUser.avatar ? data.publishUser.avatar : noUserUriVar()}}
        source={{uri: data.publishUser.avatar ? data.publishUser.avatar : noUserUri}}
      />
    </TouchableAvatarContainer> */}
    <ContentsContainer>
      <NotificationContents>
        {/* <UserLink onPress={onPressAvatar}>
          <UserLinkText>{data.publishUser.userName}</UserLinkText>
        </UserLink> */}
        <NotificationContentsText>{notificationMessage}</NotificationContentsText>
      </NotificationContents>
      <PublishTime>{passedTime}</PublishTime>
    </ContentsContainer>
  </TouchableContainer>;
};
export default NotificationLayout;