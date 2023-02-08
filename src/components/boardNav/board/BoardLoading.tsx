import styled from "styled-components/native";
import BoardHeaderComponent from "./BoardHeaderComponent";

const Container = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
  padding: 10px;
`;
const ActivityIndicatorContainer = styled.ActivityIndicator`
  margin: 100px auto;
`

type BoardHeaderComponentType = {
  id: number;
  title: string;
  createdAt: string;
  user: {
    id: number,
    userName: string,
    avatar: string,
  };
  likes:number;
  commentNumber:number;
};

const BoardLoading = (props:BoardHeaderComponentType) => {
  return (
    <Container>
      <BoardHeaderComponent {...props}/>
      <ActivityIndicatorContainer />
    </Container>
  );
};

export default BoardLoading;