import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootNavStackParamsList from "../types/navigation/rootNavStackParamsList";

type DataType = {
  channelId:string,
  userId:number,
  userName:string,
}

const useOnPressPushNotification = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootNavStackParamsList>>();
  
  const notificationNavigate = (data:{ [key: string]: string } | undefined) => {
    const channelId = data?.channelId;
    console.log("channelId "+channelId);
    switch (channelId) {
      // RootNav 의 컴포넌트를 보여줄거임.
      case 'follow':
        console.log("useOnPressPushNotification 에 PushNotification 으로 들어왔을 때 로직 작성해야함. 보통 navigate");
        // return navigation.navigate("PushNotificationUser",{
        //   id: Number(data.userId),
        //   userName: data.userName
        // });
      
      default:
        console.log("알 수 없는 체널입니다.");
        return "Unknown Channel";
    }
  };

  return notificationNavigate;
};

export default useOnPressPushNotification;