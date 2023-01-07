import { colors } from "../../js-assets/color";
import { getCalendarMonthlyData_getCalendarMonthlyData } from "../../__generated__/getCalendarMonthlyData";
import BaseContainer from "../shared/BaseContainer";
import AgendaList from "./AgendaList";
import CalendarPicker from "./CalendarPicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native"

type CalendarVerticalViewProps = {
  minDate: Date;
  maxDate: Date;
  onMonthChange: (props: { year: number, month: number }) => Promise<void>;
  setSelectedDay: (value: React.SetStateAction<number>) => void;
  dateObj: { [key: string]: any };
  dateData: (getCalendarMonthlyData_getCalendarMonthlyData | null)[] | null | undefined;
  selectedDate: string;
};

const CalendarVerticalView = ({
  minDate,
  maxDate,
  onMonthChange,
  setSelectedDay,
  dateObj,
  dateData,
  selectedDate,
}:CalendarVerticalViewProps) => (
  <BaseContainer>
    <CalendarPicker
      // startFromMonday={true}
      // allowRangeSelection={true}
      minDate={minDate}
      maxDate={maxDate}
      // 지금은 안써서 뺌. 나중에 넣어도 됨.
      // customDatesStyles={(date)=>{
      //   const eachDate = date.date();
      //   // if(dateArr.includes(eachDate)){
      //   if(dateObj[eachDate]){
      //     return {
      //       // style:{
      //       //   backgroundColor: colors.blue
      //       // },
      //       // textStyle:{
      //       //   color: "white"
      //       // }
      //     }
      //   }
      // }}
      todayBackgroundColor={colors.blue}
      selectedDayColor="#7300e6"
      selectedDayTextColor="#FFFFFF"
      previousComponent={<Ionicons name="chevron-back" size={23} color={colors.blue} />}
      nextComponent={<Ionicons name="chevron-forward" size={23} color={colors.blue} />}
      // weekdays={["일", "월", "화", "수", "목", "금", "토"]}

      onMonthChange={(date,type)=>{
        onMonthChange({year:date.year(),month:date.month()+1})
      }}
      onDateChange={(date,type)=>{
        // setSelectedDay(date.date())
        setSelectedDay(date);
      }}
      showDayStragglers={true}
      // selectMonthTitle=""
      // selectYearTitle=""
      
      scrollable={true}
      // 얘 꼭 넣어야함!!!!!
      restrictMonthNavigation={true}
      // dateParamsObject={{ 1 : "soso", 3 : "good", }}
      dateParamsObject={dateObj}
      selectedStartDate={maxDate}
    />
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <AgendaList
        dateData={dateData}
        selectedDate={selectedDate}
      />
    </ScrollView>
  </BaseContainer>
);

export default CalendarVerticalView;