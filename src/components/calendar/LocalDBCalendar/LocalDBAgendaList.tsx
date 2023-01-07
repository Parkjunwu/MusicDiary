import { realmYearMonthType } from "../../../types/realm/realmDiaryType";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import AgendaItem from "../AgendaItem";

type LocalDBAgendaListProps = {
  dateData: realmYearMonthType[],
  selectedDate: string,
};

const LocalDBAgendaList = ({
  dateData,
  selectedDate,
}:LocalDBAgendaListProps) => {

  return (
    <>
      <FontAppliedBaseTextNeedFontSize>{selectedDate}</FontAppliedBaseTextNeedFontSize>
      {dateData?.map(data => {
        const { body, ...rest } = data;
        const summaryBody = body.length > 40 ? body.substring(0,40) + "..." : body;
        const newData = {
          summaryBody,
          ...rest,
        };
        return (
          <AgendaItem key={data?.id} {...newData} />
        )
      })}
    </>
  )
};

export default LocalDBAgendaList;