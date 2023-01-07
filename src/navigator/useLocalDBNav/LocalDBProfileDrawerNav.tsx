import { createDrawerNavigator } from '@react-navigation/drawer';
import HamburgerBtn from '../../components/myDiary/HamburgerBtn';
import LocalDB_Profile_CustomDrawerContent from '../../components/useLocalDBNav/localDBProfileDrawerNav/LocalDB_Profile_CustomDrawerContent';
import useGetFontFamily from '../../hooks/useGetFontFamily';
import useIsDarkMode from '../../hooks/useIsDarkMode';
import LocalDBProfileScreen from '../../screens/useLocalDBNav/localDBProfileNav/LocalDBProfileScreen';
import { ProfileDrawerNavParamsList } from '../../types/navigation/homeNavStackParamsList';

const Drawer = createDrawerNavigator<ProfileDrawerNavParamsList>();

// type ProfileType = NativeStackScreenProps<ProfileListTabStackParamsList, "ProfileDrawerNav">;

const LocalDBProfileDrawerNav = () => {

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
      drawerContent={() => <LocalDB_Profile_CustomDrawerContent/>}
    >
      <Drawer.Screen
        name="ProfileScreen"
        component={LocalDBProfileScreen}
      />
    </Drawer.Navigator>
  );
};

export default LocalDBProfileDrawerNav;