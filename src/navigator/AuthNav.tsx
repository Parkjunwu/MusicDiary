import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from '../screens/authNav/CreateAccount';
import LogIn from '../screens/authNav/LogIn';
import Welcome from '../screens/authNav/Welcome';
import { colors } from '../js-assets/color';
import useIsDarkMode from '../hooks/useIsDarkMode';
import { isAndroid } from '../utils';


type RootStackParamList = {
  Welcome: undefined;
  LogIn: undefined;
  CreateAccount: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNav = () => {
  const isDarkMode = useIsDarkMode();
  return (
    <Stack.Navigator screenOptions={{
      headerBackTitleVisible:false,
      headerTransparent:true,
      headerTitle:()=>false,
      headerTintColor:isDarkMode ? "white" : colors.darkYellow,
      animation: isAndroid ? 'none' : "default",
    }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LogIn" component={LogIn}/>
      <Stack.Screen name="CreateAccount" component={CreateAccount}/>
    </Stack.Navigator>
  );
}
export default AuthNav;