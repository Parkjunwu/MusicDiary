import { useEffect, useState } from "react";
import getTodayYearAndMonth from "../../logic/calendar/getTodayYearAndMonth";
import { getRealmYearMonthDiariesWithDate } from "../../realm";
import { realmYearMonthType } from "../../types/realm/realmDiaryType";
import useCustomOrientationListener from "../../hooks/useCustomOrientationListener";
import styled from "styled-components/native";
import { View } from "react-native";
import AgendaList from "../../components/calendar/AgendaList";
import { colors } from "../../js-assets/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import CalendarPicker from "../../components/calendar/CalendarPicker";
import LocalDBAgendaList from "../../components/calendar/LocalDBCalendar/LocalDBAgendaList";

const BaseScrollView = styled.ScrollView`
  background-color: ${props=>props.theme.backgroundColor};
  flex: 1;
`;

// type LocalDBCalendarListProps = NativeStackScreenProps<MyDiaryListTabStackParamsList, "Calendar">;

// 그전에 썻던거 ReCalendar 에 파일 넣어놓음. 쓸 일 있으면 가져와

// const LocalDBCalendar = ({navigation,route}:LocalDBCalendarListProps) => {
const LocalDBCalendar = () => {

  const { yearToday, monthToday } = getTodayYearAndMonth();
  
  // 헤더에 보여줄 날짜 년월
  // ref 로 쓰면 안나올라나?
  const [showedYear,setShowedYear] = useState(yearToday);
  const [showedMonth,setShowedMonth] = useState(monthToday);

  const [data,setData] = useState<realmYearMonthType[]>([]);

  // const getYearMonthData = () => setData(getRealmYearMonthDiariesWithDate({
  //   year: yearToday,
  //   month: monthToday,
  // }));

  // useEffect(()=>{
  //   getYearMonthData();
  // },[]);

  // const onMonthChange = async ({year,month}:{year:number,month:number})=>{
    
  //   console.log("onMonthChange")
    
  //   setShowedYear(year);
  //   setShowedMonth(month);
  //   // data = undefined;
  //   getYearMonthData();
  // };
  const getYearMonthData = (year:number,month:number) => setData(getRealmYearMonthDiariesWithDate({
    year,
    month,
  }));

  useEffect(()=>{
    getYearMonthData(yearToday,monthToday);
  },[]);

  const onMonthChange = async ({year,month}:{year:number,month:number})=>{
    setShowedYear(year);
    setShowedMonth(month);
    // data = undefined;
    getYearMonthData(year,month);
  };

  const dateObj: {[key:string]:any} = {};

  // loading false 인 경우에만?
  // 이거는 형식 따라서 바꿔
  data.forEach(singleDayData => {

    const date = singleDayData.date;
    // dateObj[date] = singleDayData.title;
    const diaryNumberOnDate = dateObj[date];
    dateObj[date] = diaryNumberOnDate ? diaryNumberOnDate + 1 : 1; 
    // const dateOnObj = dateObj[date];
    
    // if(dateOnObj) {
    //   dateObj[date] = 
    // } else {
    //   markedData[dateTitle] = {dots:[{color:"red"}]};
    // }

  });

  const minDate = new Date(1970,1);
  const maxDate = new Date();

  const [selectedDay,setSelectedDay] = useState(maxDate.getDate());

  const selectedDate = `${showedYear}년 ${showedMonth}월 ${selectedDay}일`

  const dateData = data.filter(monthData => monthData.date === selectedDay);

  // const [viewOrientation,setViewOrientation] = useState<"PORTRAIT"|"LANDSCAPE">("PORTRAIT");
  
  // const screenRenderFirst = useRef(true);

  // // 얘가 처음엔 디바이스 시작? orientation 을 받는듯. 커스텀으로 따로 만들까?
  // useDeviceOrientationChange((orientation)=>{
  //   console.log("orientation"+ orientation);
  //   // LANDSCAPE-RIGHT
  //   // PORTRAIT
  //   // LANDSCAPE-LEFT
  //   // PORTRAIT-UPSIDEDOWN 도 있긴 한데 얘는 빼
  //   !screenRenderFirst.current && setViewOrientation(orientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
  // });

  // useEffect(()=>{
  //   orientation.getDeviceOrientation((orientation)=>{
  //     setViewOrientation(orientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
  //   });
  //   screenRenderFirst.current = false;
  // },[]);
  // const orientationCallback = (orientation:OrientationType) => setViewOrientation(orientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
  
  // useCustomOrientationListener(orientationCallback);
  const viewOrientation = useCustomOrientationListener();

  // return (
  // <BaseContainer
  // >
  //   <CalendarPicker
  //     // startFromMonday={true}
  //     // allowRangeSelection={true}
  //     minDate={minDate}
  //     maxDate={maxDate}
  //     // customDatesStyles={(date)=>{
  //     //   const eachDate = date.date();
  //     //   // if(dateArr.includes(eachDate)){
  //     //   if(dateObj[eachDate]){
  //     //     return {
  //     //       style:{
  //     //         backgroundColor:"hotpink"
  //     //       },
  //     //       textStyle:{
  //     //         color: "white"
  //     //       }
  //     //     }
  //     //   }
  //     // }}
  //     todayBackgroundColor={colors.blue}
  //     selectedDayColor="#7300e6"
  //     selectedDayTextColor="#FFFFFF"
  //     previousComponent={<Ionicons name="chevron-back" size={23} color={colors.blue} />}
  //     nextComponent={<Ionicons name="chevron-forward" size={23} color={colors.blue} />}
  //     // weekdays={["일", "월", "화", "수", "목", "금", "토"]}

  //     onMonthChange={(date,type)=>{
  //       onMonthChange({year:date.year(),month:date.month()+1})
  //     }}
  //     onDateChange={(date,type)=>{
  //       // setSelectedDay(date.date())
  //       setSelectedDay(date);
  //     }}
  //     showDayStragglers={true}
  //     // selectMonthTitle=""
  //     // selectYearTitle=""
      
  //     scrollable={true}
  //     // 얘 꼭 넣어야함!!!!!
  //     restrictMonthNavigation={true}
  //     // dateParamsObject={{ 1 : "soso", 3 : "good", }}
  //     dateParamsObject={dateObj}
  //     selectedStartDate={maxDate}
  //   />
  //   <AgendaList
  //     dateData={dateData}
  //     selectedDate={selectedDate}
  //   />
  // </BaseContainer>

  //   // 얘는 단점이 중간에 돌리면 리렌더링 되는거라 이전게 아니고 처음으로 감.
  //   viewOrientation === "PORTRAIT" ?
  //     <LocalDBCalendarVerticalView
  //       minDate={minDate}
  //       maxDate={maxDate}
  //       onMonthChange={onMonthChange}
  //       setSelectedDay={setSelectedDay}
  //       dateObj={dateObj}
  //       dateData={dateData}
  //       selectedDate={selectedDate}
  //     />
  //   :
  //     <LocalDBCalendarHorizontalView
  //       minDate={minDate}
  //       maxDate={maxDate}
  //       onMonthChange={onMonthChange}
  //       setSelectedDay={setSelectedDay}
  //       dateObj={dateObj}
  //       dateData={dateData}
  //       selectedDate={selectedDate}
  //     />
  // )
  return (
    <BaseScrollView>
      <CalendarPicker
        minDate={minDate}
        maxDate={maxDate}
        // customDatesStyles={(date)=>{
        //   const eachDate = date.date();
        //   // if(dateArr.includes(eachDate)){
        //   if(dateObj[eachDate]){
        //     return {
        //       style:{
        //         backgroundColor:"hotpink"
        //       },
        //       textStyle:{
        //         color: "white"
        //       }
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
          setSelectedDay(date);
        }}
        showDayStragglers={true}
        scrollable={true}
        // 얘 꼭 넣어야함!!!!!
        restrictMonthNavigation={true}
        dateParamsObject={dateObj}
        selectedStartDate={maxDate}
      />
      <View
        style={{
          padding: 20,
        }}
      >
        <LocalDBAgendaList
          dateData={dateData}
          selectedDate={selectedDate}
        />
      </View>
    </BaseScrollView>
  )
};

export default LocalDBCalendar;
