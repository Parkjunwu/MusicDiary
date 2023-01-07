// import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { getCalendarMonthlyData_getCalendarMonthlyData } from "../../__generated__/getCalendarMonthlyData";
import AgendaItem from "./AgendaItem";

// const Container = styled.ScrollView`
//   /* background-color: red; */
//   padding: 20px;
// `;

type AgendaListProps = {
  dateData: (getCalendarMonthlyData_getCalendarMonthlyData | null)[],
  selectedDate: string,
};

const AgendaList = ({
  dateData,
  selectedDate,
}:AgendaListProps) => {

  return (
    // <Container>
    <>
      <FontAppliedBaseTextNeedFontSize>{selectedDate}</FontAppliedBaseTextNeedFontSize>
      {dateData?.map(data => (
        <AgendaItem key={data?.id} {...data} />
      ))}
      {/* {dateData ? 
        dateData.map(data => (
          <AgendaItem {...data} />
        ))
      :
        <View>
          <Text></Text>
        </View>
      } */}
    </>
    // </Container>
  )
};

export default AgendaList;