import React from "react";
import useIsUsingCache from "../hooks/useIsUsingCache";
import MainNav_useCache from "./MainNav_useCache";
import MainNav_useLocalDB from "./MainNav_useLocalDB";

const MainNav = () => {

  const isUsingCache = useIsUsingCache();

  // 이렇게 나눠놔야 로그인 할때 subscription 다시 받을듯.
  return isUsingCache ? <MainNav_useCache/> : <MainNav_useLocalDB/>;
};

export default MainNav;

// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useColorScheme } from "react-native";
// import Feather from "react-native-vector-icons/Feather";
// import TabIcon from "../components/mainNav/TabIcon";
// import ForResetSharedNavScreen from "../components/sharedStackNav/ForResetSharedNavScreen";
// import NotLoggedInUserView from "../components/mainNav/NotLoggedInUserView";
// // import NotificationStackNav from "./NotificationStackNav";
// import SharedStackNav from "./SharedStackNav";
// import { MainNavTabParamsList } from "../types/navigation/homeNavStackParamsList";
// import UploadDiaryNav from "./UploadDiaryNav";
// import ProfileNav from "./ProfileNav";
// import useIsUsingCache from "../hooks/useIsUsingCache";
// import useMe from "../hooks/useMe";
// import { UpdateQueryFn } from "@apollo/client/core/watchQueryOptions";
// import { me } from "../__generated__/me";
// import { userNotificationUpdate } from "../__generated__/userNotificationUpdate";
// import { USER_NOTIFICATION_UPDATE } from "../gql/forCodeGen";
// import subscribeToMoreExecuteOnlyOnceNeedWholeSubscribeToMoreFnAndQueryData from "../logic/subscribeToMoreExcuteOnlyOnce";


// const Tab = createBottomTabNavigator<MainNavTabParamsList>();

// const MainNav = () => {

//   const isUsingCache = useIsUsingCache();

//   // subscription 을 MainNav 에서 받아야함. Today 에 놓으면 Today 화면에서만 subscription 받아짐. 그럼 결국 앱을 쓸 때 subscription 을 못받는 거랑 마찬가지임.
//   // 글고 이렇게 쓸라면 isUsingCache 으로 확실하게 화면을 나눠버려야 함. MainNav 자체를
//   const { data, subscribeToMore } = useMe();

//   const updateQuery:UpdateQueryFn<me,null,userNotificationUpdate> = (prev,{subscriptionData}) => {
//     if(!subscriptionData.data.userNotificationUpdate?.id) {
//       return prev;
//     }
//     const isMeData = prev.me;
//     let prevTotalUnreadNotification = 0;
//     let prevRest;
//     if(isMeData){
//       const { totalUnreadNotification, ...rest } = isMeData;
//       prevTotalUnreadNotification = totalUnreadNotification;
//       prevRest = rest;
//     }
//     return Object.assign({}, prev, {
//       me: {
//         totalUnreadNotification: isMeData ? prevTotalUnreadNotification + 1 : 1,
//         ...prevRest,
//       },
//     });
//   };

//   // 캐시 바뀌면 렌더링 되서 걍 변수로 씀
//   const totalUnreadNotification = data?.me?.totalUnreadNotification;
//   // 0 이거나 null, undefined 인 경우 전부 null
//   const numberOfUnreadIfZeroIsNull = totalUnreadNotification ? totalUnreadNotification : null;

//   // notification subscribe 하고 캐시까지 변경하는 함수
//   const wholeSubscribeToMoreFn = () => {
//     console.log("subscribe")
//     subscribeToMore({
//       document:USER_NOTIFICATION_UPDATE,
//       updateQuery,
//       onError:(err) => console.error("error is "+err),
//     });
//   };
  
//   // subscription 한번만 실행되게 하기 위함
//   subscribeToMoreExecuteOnlyOnceNeedWholeSubscribeToMoreFnAndQueryData(wholeSubscribeToMoreFn,data?.me?.totalUnreadNotification);

//   const darkModeSubscription = useColorScheme();

//   // Upload, List, Notification, Me
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         // headerTransparent:true
//         headerShown:false,
//         tabBarStyle:{
//           backgroundColor: darkModeSubscription === "light" ? "white" : "black",
//           borderTopColor: darkModeSubscription === "light" ? "rgba(0,0,0,0.5)":"rgba(255,255,255,0.5)",
//         },
//         tabBarActiveTintColor: darkModeSubscription === "light" ? "rgba(0,0,0,0.7)" : "white",
//         tabBarShowLabel:false,
//       }}
//       // initialRouteName="NotificationTab"
//     >

//       <Tab.Screen
//         name="MyDiaryListTab"
//         options={{
//           tabBarIcon:({focused,color})=>
//           <TabIcon iconName="md-book" focused={focused} color={color}/>
//         }}
//       >
//         {() => (
//           <ForResetSharedNavScreen>
//             <SharedStackNav screenName="MyDiaryList"/>
//           </ForResetSharedNavScreen>
//         )} 
//       </Tab.Screen>

//       <Tab.Screen
//         name="UploadDiaryTab"
//         component={UploadDiaryNav}
//         options={{
//           tabBarIcon:({focused, color})=>
//           <Feather name="edit-3" size={24} color={color} />
//           // <TabIcon iconName="camera" focused={focused} color={color}/>
//         }}
//       />

//       <Tab.Screen
//         // 이름도 바꿔야 함.
//         name="NotificationTab"
//         // 원래는 여기에 알림 갯수를 띄웠었음.
//         // options={{
//         //   tabBarIcon:({focused,color})=>
//         //   <TabIcon iconName="heart" focused={focused} color={color}/>,
//         //   tabBarBadge:numberOfUnreadIfZeroIsNull
//         // }}
//       >
//         {/* NotificationStackNav는 다른 컴포넌트 갔다 돌아오면 Notification 화면 보여줌. */}
//         {/* 로그인 여부에 따라 보여주는 화면이 다름 */}
//         {/* {isLoggedIn ? */}
//         {isUsingCache ?
//           // ()=><NotificationStackNav />
//           ()=><ProfileNav/>
//           :
//           ()=><NotLoggedInUserView />
//         }
//       </Tab.Screen>
      
//     </Tab.Navigator>
//   );
// };

// export default MainNav;










// <Tab.Screen name="FeedTab" options={{tabBarIcon:({focused,color})=>
//       // <TabIcon iconName="home" focused={focused} color={color}/>}}>
//       <Entypo name="documents" size={24} color={color}/>}}>
//         {()=><SharedStackNav screenName="Feed"/>}
//       </Tab.Screen>
//       {/* <Tab.Screen name="SearchTab" options={{tabBarIcon:({focused,color})=><TabIcon iconName="search" focused={focused} color={color}/>}}>
//         {()=><SharedStackNav screenName="Search"/>} 
//       </Tab.Screen> */}
//       <Tab.Screen name="NewPetLogListTab" options={{tabBarIcon:({focused,color})=><TabIcon iconName="md-book" focused={focused} color={color}/>}}>
//         {/* {()=><SharedStackNav screenName="NewPetLogList"/>}  */}
//         {()=><ForResetSharedNavScreen>
//           <SharedStackNav screenName="NewPetLogList"/>
//         </ForResetSharedNavScreen>} 
//       </Tab.Screen>
      

//       {/* <Tab.Screen name="PetLogTab" options={{tabBarIcon:({focused,color})=><TabIcon iconName="ios-book" focused={focused} color={color}/>}}>
//         {()=><SharedStackNav screenName="PetLog"/>} 
//       </Tab.Screen> */}

      // <Tab.Screen
      //   name="CameraTab"
      //   component={View}
      //   listeners={({navigation}:Props) => {
      //     if(isLoggedIn) {
      //       return {
      //         // 카메라 nav 로 이동
      //         tabPress:(e) => {
      //           e.preventDefault();
      //           navigation.navigate("Upload");
      //         }
      //       }
      //     } else {
      //       return {
      //         // 로그인 / 회원가입 물어봄
      //         tabPress:(e) => {
      //           e.preventDefault();
      //           Alert.alert("회원가입하고 다른 사람들과 나의 취향을 공유하세요!","회원가입 / 로그인 페이지로 이동하시겠습니까?",[
      //             {
      //               text:"이동",
      //               onPress:()=>navigation.navigate("AuthNav"),
      //             },
      //             {
      //               text:"취소",
      //             }
      //           ]);
      //         }
      //       }
      //     }
      //   }}
        
      //   options={{
      //     tabBarIcon:({focused, color})=>
      //     <TabIcon iconName="camera" focused={focused} color={color}/>
      //   }}
      // />
      
//       <Tab.Screen name="NotificationTab" options={{tabBarIcon:({focused,color})=><TabIcon iconName="heart" focused={focused} color={color}/>, tabBarBadge:numberOfUnreadIfZeroIsNull }}>
//         {/* NotificationStackNav는 다른 컴포넌트 갔다 돌아오면 Notification 화면 보여줌. */}
//         {/* 로그인 여부에 따라 보여주는 화면이 다름 */}
//         {isLoggedIn ? ()=><NotificationStackNav /> : ()=><NotLoggedInUserView/>}
//       </Tab.Screen>

//       {/* 얘는 만약 각 알림 클릭 시 해당 컴포넌트를 Notification 탭에서가 아닌 Home 탭에서 화면 보여주기 위함. */}
//       {/* <Tab.Screen name="Notification" component={Notification} options={{tabBarIcon:({focused,color})=><TabIcon iconName="heart" focused={focused} color={color}/>, tabBarBadge:numberOfUnreadIfZeroIsNull }} /> */}
//       <Tab.Screen name="MeTab" options={{tabBarIcon:({focused,color})=>
//       // {return meData?.me?.avatar ?
//       //   // <UserImg source={{uri:meData.me.avatar}} focused={focused} />
//       //   <FastImage
//       //     style={{
//       //       width: 26,
//       //       height: 26,
//       //       borderRadius: 13,
//       //       ...(focused && {
//       //         borderColor: "rgba(255,255,255,0.8)",
//       //         borderWidth: 2,
//       //       })
//       //     }}
//       //     source={{uri:meData.me.avatar}}
//       //   />
//       //   :
//       //   <TabIcon iconName="person" focused={focused} color={color}/>
//       // }
//         <TabIcon iconName="person" focused={focused} color={color}/>
//       }}>
//         {/* 로그인 여부에 따라 보여주는 화면이 다름 */}
//         {isLoggedIn ? ()=><SharedStackNav screenName="Me"/> : ()=><NotLoggedInUserView/>}
//       </Tab.Screen>