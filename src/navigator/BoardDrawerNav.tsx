import { createDrawerNavigator } from '@react-navigation/drawer';
import Board_CustomDrawerContent from '../components/boardNav/board/boardDrawerNav/Board_CustomDrawerContent';
import HamburgerBtn from '../components/myDiary/HamburgerBtn';
import useGetFontFamily from '../hooks/useGetFontFamily';
import useIsDarkMode from '../hooks/useIsDarkMode';
import NewBoardList from '../screens/boardNav/BoardList';
import { BoardDrawerNavParamsList } from '../types/navigation/homeNavStackParamsList';

const Drawer = createDrawerNavigator<BoardDrawerNavParamsList>();

// type ProfileType = NativeStackScreenProps<ProfileListTabStackParamsList, "BoardDrawerNav">;

const BoardDrawerNav = () => {

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
        // headerTitle:()=>undefined,
        // headerTransparent:true,
        drawerPosition:"right",
        headerTintColor:isDarkMode ? "white" : "black",
        // headerLeft:({tintColor})=><GoBackBtn tintColor={tintColor}/>,
        headerTitleAlign:"center",
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
      drawerContent={() => <Board_CustomDrawerContent/>}
    >
      <Drawer.Screen
        name="NewBoardList"
        component={NewBoardList}
        options={{
          title: "게시판"
        }}
      />
    </Drawer.Navigator>
  );
};

export default BoardDrawerNav;