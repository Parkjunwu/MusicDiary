import { createDrawerNavigator } from '@react-navigation/drawer';
import HamburgerBtn from '../components/myDiary/HamburgerBtn';
import Profile_CustomDrawerContent from '../components/profileDrawerNav/Profile_CustomDrawerContent';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useGetFontFamily from '../hooks/useGetFontFamily';
import useIsDarkMode from '../hooks/useIsDarkMode';
import ProfileScreen from '../screens/profileNav/profileDrawerNav/ProfileScreen';
import { ProfileDrawerNavParamsList } from '../types/navigation/homeNavStackParamsList';

const Drawer = createDrawerNavigator<ProfileDrawerNavParamsList>();

// type ProfileType = NativeStackScreenProps<ProfileListTabStackParamsList, "ProfileDrawerNav">;

const ProfileDrawerNav = () => {

  const fontFamily = useGetFontFamily("Medium");
  const isDarkMode = useIsDarkMode();

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      screenOptions={{
        drawerStyle:{
          backgroundColor: isDarkMode ? "rgba(0,0,0,0.8)" : "white",
        },
        headerStyle:{
          backgroundColor: isDarkMode ? "black" : "white",
        },
        headerTitle:()=>undefined,
        headerTransparent:true,
        drawerPosition:"right",
        headerTintColor:isDarkMode ? "white" : "black",
        // headerLeft:({tintColor})=><GoBackBtn tintColor={tintColor}/>,
        
        headerLeft:()=>undefined,
        headerRight:({tintColor})=><HamburgerBtn tintColor={tintColor}/>,

        swipeEnabled:false,
        headerTitleStyle: {
          fontSize: 17,
          fontFamily,
          padding: 3,
        },
      }}
      // 이게 그릴 애고
      drawerContent={() => <Profile_CustomDrawerContent/>}
    >
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Drawer.Navigator>
  );
};

export default ProfileDrawerNav;