import { useRef, useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components/native";
import fetchSearch from "../../../logic/upload/searchYoutube/fetchSearch";
import { FontAppliedBaseTextInputNeedFontSize } from "../../../styled-components/FontAppliedComponents";

const Container = styled.View`
  /* background-color: white; */
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
  flex-direction: row;
  border-width: 3px;
  border-radius: 50px;
  border-color: ${props=>props.theme.textColor};
  /* background-color: ${props=>props.theme.textInputBackgroundColor}; */
`;
const SearchIcon = styled.TouchableOpacity`
  /* position: absolute;
  top: 37;
  left: 20; */
  margin-left: 15px;
`;
// const Search = styled.TextInput`
//   padding: 10px 15px 10px 10px;
//   border-color: gray;
//   flex: 1;
//   color: ${props=>props.theme.textColor};
//   font-size: 15px;
// `;
const Search = styled(FontAppliedBaseTextInputNeedFontSize)`
  padding: 12px 15px 12px 10px;
  border-color: gray;
  flex: 1;
  /* font-size: 15px; */
`;

type SearchBarType = {
  setSearchData: React.Dispatch<React.SetStateAction<any[]>>,
  setNowSearchingKeyword: React.Dispatch<React.SetStateAction<string>>,
  pageToken: React.MutableRefObject<string>,
};

const SearchBar = ({
  setSearchData,
  setNowSearchingKeyword,
  pageToken,
}: SearchBarType) => {

  const [searchKeyword,setSearchKeyword] = useState("");
  const loading = useRef(false);

  const onSearch = async () => {
    if(loading.current) return;

    loading.current = true;
    setNowSearchingKeyword(searchKeyword);

    await fetchSearch({
      searchKeyword,
      setSearchData,
      pageToken,
      fetchState: "new",
    });
    
    loading.current = false;
  };

  return (
    <Container>
      <SearchIcon onPress={onSearch}>
        <FontAwesome name="search" size={25} color="#900" />
      </SearchIcon>
      <Search
        fontSize={15}
        onChangeText={(text:string) => {
          setSearchKeyword(text);
          loading.current = false;
        }}
        value={searchKeyword}
        returnKeyType='search'
        returnKeyLabel='search'
        onSubmitEditing={onSearch}
        placeholder="유튜브에서 찾기"
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
      />
    </Container>
  );
};


export default SearchBar;