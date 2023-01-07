import { FlatList, ListRenderItem } from "react-native";
// import styled from "styled-components/native";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
// import { colors } from "../../js-assets/color";
import GoToSearchDiaryBtn from "../../components/myDiaryList/GoToSearchDiaryBtn";
import DiarySummary from "../../components/myDiaryList/DiarySummary";
// import randomGoodWord from "../../quotesAboutAnimal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyDiaryListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import CalenderBtn from "../../components/myDiary/CalenderBtn";
import BaseContainer from "../../components/shared/BaseContainer";
import { allRealmDiariesVar, fromWhere } from "../../apollo";
// import { FontAppliedBaseText } from "../../styled-components/FontAppliedComponents";
import { realmDiaryType } from "../../types/realm/realmDiaryType";
import { getRealmAllDiaries } from "../../realm";


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

type LocalDBMyDiaryListProps = NativeStackScreenProps<MyDiaryListTabStackParamsList, 'MyDiaryList'>;

// PetLogFlatList > Me 에서 PetLog, NewPetLogList > Feed 에서 PetLog. 지금은 NewPetLogList 가져왓는데 PetLogFlatList 도 참고해서 만들어

const LocalDBMyDiaryList = ({navigation}:LocalDBMyDiaryListProps) => {

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
  
  // const quoteWord = randomGoodWord.quote;
  // const quotePersonName = randomGoodWord.name;

  const [refreshing,setRefreshing] = useState(false);
  const onRefresh = async() => {
    setRefreshing(true);
    await getRealmAllDiaries();
    setRefreshing(false);
  };
  
  // const setFromWhere = () => fromWhere("LocalDBMyDiaryList");
  const setFromWhere = () => fromWhere("MyDiaryList");

  const renderItem:ListRenderItem<realmDiaryType> = ({item}) => {
    // 똑같은 걸로 보여줄건지. 사진이 없어서 무조건 logo 가 나옴.
    return <DiarySummary
      {...item}
      summaryBody={item.body}
      setFromWhere={setFromWhere}
    />
  };

  const dbData = useReactiveVar(allRealmDiariesVar);
  
  return (
    <BaseContainer>
      <FlatList
        style={{
          flex: 9,
        }}
        data={dbData}
        renderItem={renderItem}
        keyExtractor={(item:realmDiaryType)=>item.id+""}
        onRefresh={onRefresh}
        refreshing={refreshing}
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

export default LocalDBMyDiaryList;