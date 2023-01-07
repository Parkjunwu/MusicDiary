import { gql, useMutation, useQuery } from "@apollo/client";
import { UpdateQueryFn } from "@apollo/client/core/watchQueryOptions";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import NotificationLayout from "../../../components/notification/NotificationLayout";
import cursorPaginationFetchMore from "../../../logic/cursorPaginationFetchMore";
import subscribeToMoreExecuteOnlyOnceNeedWholeSubscribeToMoreFnAndQueryData from "../../../logic/subscribeToMoreExcuteOnlyOnce";
import { readNotification, readNotificationVariables } from "../../../__generated__/readNotification";
import { seeUserNotificationList, seeUserNotificationListVariables } from "../../../__generated__/seeUserNotificationList";
import { userNotificationUpdate } from "../../../__generated__/userNotificationUpdate";
import ScreenLayout from "../../../components/shared/ScreenLayout";
import { NotificationTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { NOTIFICATION_FRAGMENT } from "../../../gql/fragment";
import useMe from "../../../hooks/useMe";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { ME_QUERY } from "../../../gql/manyWriteQuery";
import { SEE_USER_NOTIFICATION_LIST } from "../../../gql/forCodeGen";


// 로그인 안했을 때 설정은 MainNav 에 있음.

// const SEE_USER_NOTIFICATION_LIST = gql`
//   query seeUserNotificationList($cursorId:Int) {
//     seeUserNotificationList(cursorId:$cursorId) {
//       cursorId
//       hasNextPage
//       notification {
//         ...NotificationFragment
//       }
//       error
//       isNotFetchMore
//     }
//   }
//   ${NOTIFICATION_FRAGMENT}
// `;

const READ_NOTIFICATION = gql`
  mutation readNotification($lastReadNotificationId:Int!) {
    readNotification(lastReadNotificationId:$lastReadNotificationId) {
      ok
      error
    }
  }
`;

const USER_NOTIFICATION_UPDATE = gql`
  subscription userNotificationUpdate {
    userNotificationUpdate {
      ...NotificationFragment
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

const NotiListContainer = styled.FlatList`
  background-color: ${props=>props.theme.backgroundColor};
`;
const ItemSeparatorComponent = styled.View`
  background-color: grey;
  opacity: 0.2;
  width: 100%;
  height: 1px;
`;
const ListFooterComponents = styled.TouchableOpacity`

`;
// const ListFooterComponentText = styled.Text`
const ListFooterComponentText = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const ListEmptyComponents = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
// const ListEmptyComponentText = styled.Text`
const ListEmptyComponentText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 15px; */
`;

// let cursorId;

type NotificationProps = NativeStackScreenProps<NotificationTabStackParamsList, 'Notification'>;

const Notification = ({navigation,route}:NotificationProps) => {

  // notification 데이터 받기
  // 그럼 notification 있으면 받는 걸로 할까? 근데 이러면 네트워크 안되면 에러 뜨지 않나? 에러는 안뜨네.
  // numberOfUnreadIfZeroIsNull TodayDiary 에서 받음
  const isNewNotification = route.params?.numberOfUnreadIfZeroIsNull;
  // console.log("isNewNotification : "+isNewNotification)

  const {data,loading,fetchMore,refetch,subscribeToMore} = useQuery<seeUserNotificationList,seeUserNotificationListVariables>(SEE_USER_NOTIFICATION_LIST,{
    fetchPolicy: isNewNotification ? "cache-and-network" : "cache-first",
    nextFetchPolicy:"cache-first",
  });
  
  // 안읽은 notification 있을 시 읽음 처리
  const [readNotification] = useMutation<readNotification,readNotificationVariables>(READ_NOTIFICATION);
  
  const isFocused = useIsFocused();

  const { data: meData } = useMe();

  useEffect(()=>{

    const unreadNotification = meData?.me?.totalUnreadNotification;
    const lastReadNotificationId = data?.seeUserNotificationList?.notification?.[0]?.id;

    // loading 안넣으면 cache-and-network 일 때 캐시 받은 애를 먼저 readNotification 해서 체크해야됨.
    if(isFocused && unreadNotification && lastReadNotificationId && !loading) {
      // console.log("readNotification !!")
      readNotification({
        variables:{
          lastReadNotificationId,
        },
        update: (cache,result) => {
          if(result.data?.readNotification.ok) {
            // cache.modify({
            //   id:"ROOT_QUERY",
            //   fields:{
            //     me(prev){
            //       // console.log("prev?.__ref : "+prev?.__ref)
            //       if(prev?.__ref) return prev;
            //       return {
            //         ...prev,
            //         totalUnreadNotification: 0,
            //       };
            //     },
            //   },
            // });
            // // subscription 으로 들어왔을 때 ROOT_QUERY me 가 ref 로 되있어서 이걸로 바꿔줘야함.
            // cache.modify({
            //   id:`LogInUser:${meData.me?.id}`,
            //   fields:{
            //     totalUnreadNotification(){
            //       return 0;
            //     }
            //   }
            // }); 
            cache.updateQuery({ // 걍 이걸로 되는듯.
              query: ME_QUERY
            }, (data) => ({ 
              me: {
                ...data.me,
                totalUnreadNotification: 0,
              }
            }));
          }
        }
      });
    };
    // meData 를 안받아. meData 가 lastReadNotificationId 보다 먼저 바뀌어서 한번 더 실행됨.
  },[isFocused,data]);

  // subscription 을 캐시에 반영
  const updateQuery:UpdateQueryFn<seeUserNotificationList,null, userNotificationUpdate> | undefined = (prev, {subscriptionData}) => {
    // console.log("Notification 에서 받았다!!!")
    if(!subscriptionData.data){
      return prev;
    }
    const { data:{ userNotificationUpdate:newNoti }} = subscriptionData;
    // const { seeUserNotificationList: { notification: prevNoti, isNotFetchMore, ...prevRest } } = prev;
    const { seeUserNotificationList: { notification: prevNoti, ...prevRest } } = prev;
    const notification = prevNoti ? [ newNoti, ...prevNoti ] : [ newNoti ];
    return {
      seeUserNotificationList:{
        notification,
        isNotFetchMore: true,
        ...prevRest,
      }
    }
  };

  // 전체 subscribeToMore 함수
  // 근데 화면을 보고 있으면 들어 오자 마자 read 를 해야 할거 같은데...
  const wholeSubscribeToMoreFn = () => {
    subscribeToMore({
      document:USER_NOTIFICATION_UPDATE,
      updateQuery,
      onError:(err) => console.error("Notification // subscribeToMore : "+err),
    });
  };
  
  // subscription 한번만 등록되게 하기 위함.
  subscribeToMoreExecuteOnlyOnceNeedWholeSubscribeToMoreFnAndQueryData(wholeSubscribeToMoreFn,data?.seeUserNotificationList);

  const [refreshing,setRefreshing] = useState(false);
  const onRefresh = async() => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // infinite scroll, 얘는 더보기 누를때 실행
  const fetchMoreFn = async() => {
    await fetchMore({
      variables:{
        cursorId:data?.seeUserNotificationList?.cursorId,
      },
    });
  };

  const onPress더보기 = async() => {
    await cursorPaginationFetchMore(data?.seeUserNotificationList,fetchMoreFn);
  };

  const ListFooterComponent = () => {
    return (<>
        {data?.seeUserNotificationList?.hasNextPage && <ListFooterComponents onPress={onPress더보기}>
          <ListFooterComponentText>더 보기</ListFooterComponentText>
        </ListFooterComponents>}
      </>
    );
  };

  const ListEmptyComponent = () => (
    <ListEmptyComponents>
      <ListEmptyComponentText fontSize={15}>알림이 없습니다.</ListEmptyComponentText>
    </ListEmptyComponents>
  )

  return (
    // 오류가 styled component 쓰면 나옴. 신경 안써도 됨.
    <ScreenLayout loading={loading}>
      {data?.seeUserNotificationList?.notification?.length !== 0 ?
        <NotiListContainer
          data={data?.seeUserNotificationList?.notification}
          renderItem={({item})=>NotificationLayout(item,navigation)}
          keyExtractor={(item) => item.id + ""}
          ListFooterComponent={ListFooterComponent}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ItemSeparatorComponent={()=><ItemSeparatorComponent />}
        />
        :
        <ListEmptyComponent/>
      }
    </ScreenLayout>
  );
};

export default Notification;