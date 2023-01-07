import { FlatList, ListRenderItem } from "react-native";
// import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
// import { colors } from "../../../js-assets/color";
import GoToSearchDiaryBtn from "../../../components/myDiaryList/GoToSearchDiaryBtn";
import DiarySummary from "../../../components/myDiaryList/DiarySummary";
import cursorPaginationFetchMore from "../../../logic/cursorPaginationFetchMore";
// import randomGoodWord from "../../../quotesAboutAnimal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyDiaryListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { getMyDiaryList, getMyDiaryListVariables, getMyDiaryList_getMyDiaryList_diaries } from "../../../__generated__/getMyDiaryList";
import CalenderBtn from "../../../components/myDiary/CalenderBtn";
import BaseContainer from "../../../components/shared/BaseContainer";
import { fromWhere } from "../../../apollo";
import { GET_MY_DIARY_LIST } from "../../../gql/forCodeGen";
// import { FontAppliedBaseText } from "../../../styled-components/FontAppliedComponents";
// import { getIsUseLocalDB } from "../../../dbUsingState";



// const FlatListDiary = styled.FlatList`
//   flex: 9;
// `;
// const QuoteContainer = styled.View`
//   padding: 10px 10px;
// `;
// const Quote = styled.View`
//   padding: 10px 20px;
//   border-width: 3px;
//   border-color: ${colors.darkYellow};
//   border-radius: 10px;
// `;
// const QuoteWordText = styled(FontAppliedBaseText)`
  
// `;
// const QuotePersonNameText = styled(FontAppliedBaseText)`
//   text-align: right;
// `;

type MyDiaryListProps = NativeStackScreenProps<MyDiaryListTabStackParamsList, 'MyDiaryList'>;

// PetLogFlatList > Me 에서 PetLog, NewPetLogList > Feed 에서 PetLog. 지금은 NewPetLogList 가져왓는데 PetLogFlatList 도 참고해서 만들어

const MyDiaryList = ({navigation}:MyDiaryListProps) => {

  useEffect(()=>{
    navigation.setOptions({
      // GoToSearchDiaryBtn CalenderBtn 아직 다 안만듦
      headerLeft:({tintColor})=><GoToSearchDiaryBtn
        tintColor={tintColor}
      />,
      headerRight:({tintColor})=><CalenderBtn
        tintColor={tintColor}
      />
    })
  },[]);

  const { error, data, refetch, fetchMore } = useQuery<getMyDiaryList,getMyDiaryListVariables>(GET_MY_DIARY_LIST, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    // 네트워크 연결 안된 상태면 로그인 안했더라도 캐시에서 받게.
    // skip: getIsUseLocalDB(),
    // skip:!isLoggedInVar(),
  });

  useEffect(()=>{
    if(error) {
      // console.error, warn 하니까 뭐가 존나 많이 뜸. log 로 해
      console.log("getMyDiaryList : " + error.message)
    }
  },[error]);
  
  // const quoteWord = randomGoodWord.quote;
  // const quotePersonName = randomGoodWord.name;

  const [refreshing,setRefreshing] = useState(false);
  const onRefresh = async() => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // infinite scroll
  const fetchMoreFn = async() => {
    await fetchMore({
      variables:{
        cursorId:data?.getMyDiaryList.cursorId,
      },
    });
  };
  const onEndReached = async() => {
    if(!data) return;  // 없으면 onEndReached 가 바로 실행됨.
    await cursorPaginationFetchMore(data.getMyDiaryList,fetchMoreFn);
  };

  const setFromWhere = () => fromWhere("MyDiaryList");

  const renderItem:ListRenderItem<getMyDiaryList_getMyDiaryList_diaries> = ({item}) => {
    return <DiarySummary
      {...item}
      setFromWhere={setFromWhere}
    />
  };

  // console.log("MyDiaryList")
  // console.log("data")
  // console.log(data)
  
  return (
    <BaseContainer>
      <FlatList
        style={{
          flex: 9,
        }}
        data={data?.getMyDiaryList.diaries}
        renderItem={renderItem}
        keyExtractor={(item:getMyDiaryList_getMyDiaryList_diaries)=>item?.id+""}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
      {/* <QuoteContainer>
        <Quote>
          <QuoteWordText>
            {quoteWord}
          </QuoteWordText>
          <QuotePersonNameText>
            - {quotePersonName}
          </QuotePersonNameText>
        </Quote>
      </QuoteContainer> */}
    </BaseContainer>
  );
};

export default MyDiaryList;