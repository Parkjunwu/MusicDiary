import styled from "styled-components/native";

const NoDataView = styled.View`
  margin-top:100px;
  align-items: center;
`;
const NoDataText = styled.Text`
  color: ${props=>props.theme.textColor};
  font-size: 17px;
  font-weight: 600;
`;

const NoBlockUserView = () => {
  return <NoDataView><NoDataText>차단한 유저가 없습니다.</NoDataText></NoDataView>;
};

export default NoBlockUserView;