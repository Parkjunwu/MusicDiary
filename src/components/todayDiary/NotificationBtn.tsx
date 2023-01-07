import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import { useNavigation } from "@react-navigation/core";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1; /* 안드로이드 넣음. ios 확인 */
`;
const NotificationPressable = styled.TouchableOpacity`
  position: relative;
`;
const NotificationNumberView = styled.View`
  position: absolute;
  top: -2px;
  left: 13px;
  background-color: rgb(255,69,0);
  border-radius: 30px;
`;
const NotificationNumber = styled.Text`
  padding: 1px 5px;
  font-size: 12px;
`;

type NotificationBtnProps = {
  numberOfUnreadIfZeroIsNull: number | null | undefined,
};

const NotificationBtn = ({
  numberOfUnreadIfZeroIsNull,
}: NotificationBtnProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<UploadDiaryTabStackParamsList>>();

  const onPressNotificationPressable = () => {
    navigation.navigate("Notification",{
      numberOfUnreadIfZeroIsNull,
    });
  };

  const isDarkMode = useIsDarkMode();

  const notificationBellColor = isDarkMode ? `rgba(255,255,255,${numberOfUnreadIfZeroIsNull ? 1 : 0.3})` : `rgba(0,0,0,${numberOfUnreadIfZeroIsNull ? 0.6 : 0.2})`;

  return (
    <Container>
      <NotificationPressable onPress={onPressNotificationPressable}>
        <MaterialCommunityIcons name="bell-outline" size={25} color={notificationBellColor} />
        {numberOfUnreadIfZeroIsNull && <NotificationNumberView>
          <NotificationNumber>{numberOfUnreadIfZeroIsNull}</NotificationNumber>
        </NotificationNumberView>}
      </NotificationPressable>
    </Container>
  );
};

export default NotificationBtn;