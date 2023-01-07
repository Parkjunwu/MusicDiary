import styled from "styled-components/native";
import DiaryHeaderComponent from "./DiaryHeaderComponent";

const Container = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
  padding: 10px;
`;
const ActivityIndicatorContainer = styled.ActivityIndicator`
  margin: 100px auto;
`

type DiaryHeaderComponentType = {
  id: number;
  title?: string;
  createdAt?: string;
  // user: {
  //   id: number,
  //   userName: string,
  //   avatar: string,
  // };
  // likes:number;
  // commentNumber:number;
};

const DiaryLoading = (props:DiaryHeaderComponentType) => {
  return (
    <Container>
      {/* <DiaryHeaderComponent {...props}/> */}
      <ActivityIndicatorContainer />
    </Container>
  );
};

export default DiaryLoading;