import { ApolloQueryResult } from "@apollo/client";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  margin: 30px auto;
  align-items: center;
  justify-content: center;
`;
const SeeBoardText = styled.Text`
  color: ${props=>props.theme.textColor};
`;

type PushNotificationBoardListEmptyComponentProps = {
  boardRefetch:(variables?: Partial<{
    boardId: number;
  }>) => Promise<ApolloQueryResult<any>>,
  loading:boolean
}

const PushNotificationBoardListEmptyComponent = ({boardRefetch,loading}: PushNotificationBoardListEmptyComponentProps) => {

  const onPressSeeBoard = () => {
    boardRefetch();
  };

  return (
    <Container>
      {loading ?
        <ActivityIndicator/>
        :
        <TouchableOpacity onPress={onPressSeeBoard}>
          <SeeBoardText>게시물 보기</SeeBoardText>
        </TouchableOpacity>
      }
    </Container>
  )
};

export default PushNotificationBoardListEmptyComponent;