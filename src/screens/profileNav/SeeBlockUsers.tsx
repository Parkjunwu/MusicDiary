import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation, useQuery } from "@apollo/client";
import { ListRenderItemInfo, View } from "react-native";
import styled from "styled-components/native";
import BlockUserRow from "../../components/profileNav/seeBlockUsers/BlockUserRow";
import NoBlockUserView from "../../components/profileNav/seeBlockUsers/NoBlockUserView";
import ScreenLayout from "../../components/shared/ScreenLayout";
import { SEE_BLOCK_USERS } from "../../gql/forCodeGen";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import cursorPaginationFetchMore from "../../logic/cursorPaginationFetchMore";
import { seeBlockUsers, seeBlockUsersVariables, seeBlockUsers_seeBlockUsers_users } from "../../__generated__/seeBlockUsers";

const UN_BLOCK_USER = gql`
  mutation unblockUser($id:Int!){
    unblockUser(id:$id) {
      ok
      error
    }
  }
`;

const BlockUsersFlatList = styled.FlatList`
  background-color:${props=>props.theme.backgroundColor} ;
`;

// type SeeBlockUsersProps = NativeStackScreenProps<ProfileListTabStackParamsList, 'SeeBlockUsers'>;

// const SeeBlockUsers = ({navigation}:SeeBlockUsersProps) => {
const SeeBlockUsers = () => {
  
  const {data,loading,fetchMore,updateQuery} = useQuery<seeBlockUsers,seeBlockUsersVariables>(SEE_BLOCK_USERS,{
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
  });

  const updateUnblockUser: MutationUpdaterFunction<unblockUser,unblockUserVariables, DefaultContext, ApolloCache<any>>= (cache,result,{variables}) => {
    const ok = result.data?.unblockUser.ok;
    const userId = variables.id;
    if(ok) {
      // updateQuery 로 해야함. cache.modify 말고.
      updateQuery((prev)=>{
        const {seeBlockUsers:{ users:prevUsers, isNotFetchMore, ...prevRest }} = prev;
        // isNotFetchMore 없어도 잘 됨. 안되면 확인
        const filteredUsers = prevUsers.filter(user => user.id !== userId);
        const result = {
          seeBlockUsers:{
            users:filteredUsers,
            isNotFetchMore:true,
            ...prevRest,
          },
        };
        return result;
      });
    }
  };

  const [unblockUserNeedVariable] = useMutation<unblockUser,unblockUserVariables>(UN_BLOCK_USER,{
    // variables 을 BlockUserRow 에서 받음.
    update:updateUnblockUser,
  });


  // const darkModeSubscription = useColorScheme();
  // const isDarkMode = darkModeSubscription === "dark";
  const isDarkMode = useIsDarkMode();

  // 각 항목 렌더링
  const renderUser = ({item:user}:ListRenderItemInfo<seeBlockUsers_seeBlockUsers_users>) => {
    return <BlockUserRow user={user} unblockUserNeedVariable={unblockUserNeedVariable} />;
  };

  const fetchMoreFn = async() => {
    await fetchMore({
      variables:{
        cursorId:data.seeBlockUsers.cursorId,
      },
    });
  };

  const onEndReached = async() => {
    await cursorPaginationFetchMore(data?.seeBlockUsers,fetchMoreFn);
  };

  return (
    <ScreenLayout loading={loading}>
      <BlockUsersFlatList
        data={data?.seeBlockUsers.users}
        renderItem={renderUser}
        keyExtractor={(item:seeBlockUsers_seeBlockUsers_users)=>item?.id + ""}
        ListEmptyComponent={NoBlockUserView}
        ItemSeparatorComponent={()=><View style={{width:"100%",height:2,backgroundColor: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </ScreenLayout>
  );
};

export default SeeBlockUsers;