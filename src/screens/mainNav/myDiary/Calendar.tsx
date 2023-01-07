// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { MyDiaryListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { getCalendarMonthlyData, getCalendarMonthlyDataVariables } from "../../../__generated__/getCalendarMonthlyData";
import getTodayYearAndMonth from "../../../logic/calendar/getTodayYearAndMonth";
import { GET_CALENDAR_MONTHLY_DATA } from "../../../gql/manyWriteQuery";
// import CalendarVerticalView from "../../../components/calendar/CalendarVerticalView";
// import CalendarHorizontalView from "../../../components/calendar/CalendarHorizontalView";
// import useCustomOrientationListener from "../../../hooks/useCustomOrientationListener";
// import BaseContainer from "../../../components/shared/BaseContainer";
import CalendarPicker from "../../../components/calendar/CalendarPicker";
import { colors } from "../../../js-assets/color";
import { View } from "react-native";
import AgendaList from "../../../components/calendar/AgendaList";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
// import { useIsFocused } from "@react-navigation/core";
// import { isFromCalendarVar } from "../../../apollo";

// type CalendarListProps = NativeStackScreenProps<MyDiaryListTabStackParamsList, "Calendar">;

// 그전에 썻던거 ReCalendar 에 파일 넣어놓음. 쓸 일 있으면 가져와

const BaseScrollView = styled.ScrollView`
  background-color: ${props=>props.theme.backgroundColor};
  flex: 1;
`;

// const Calendar = ({navigation,route}:CalendarListProps) => {
const Calendar = () => {

  // Calendar 화면으로 오면 isFromCalendarVar false. 아니면 MyDiary 에서 뒤로가기 할때 처리해도 됨.
  // 굳이 안해도 될듯
  // const isFocused = useIsFocused();

  // useEffect(()=>{
  //   if(isFocused) {
  //     isFromCalendarVar(false);
  //   }
  // },[isFocused]);

  const { yearToday, monthToday } = getTodayYearAndMonth();
  
  // 헤더에 보여줄 날짜 년월
  const [showedYear,setShowedYear] = useState(yearToday);
  const [showedMonth,setShowedMonth] = useState(monthToday);

  const [getCalendarMonthlyData,{data,loading}] = useLazyQuery<getCalendarMonthlyData,getCalendarMonthlyDataVariables>(GET_CALENDAR_MONTHLY_DATA);

  useEffect(()=>{
    // 얘는 캐시에 미리 받아서 fetchPolicy cache-first
    getCalendarMonthlyData({
      variables:{
        year: yearToday,
        month: monthToday,
      },
      // fetchPolicy: "cache-first",
      fetchPolicy: "cache-only",
    });
  },[]);

  const onMonthChange = async ({year,month}:{year:number,month:number})=>{
    setShowedYear(year);
    setShowedMonth(month);
    // data = undefined;
    await getCalendarMonthlyData({
      variables:{
        year,
        month,
      },
      fetchPolicy: "cache-and-network",
      // nextFetchPolicy: "cache-first",
      nextFetchPolicy: "cache-only",
    });
  };

  useEffect(()=>{
    console.log("loading  : "+ loading)
  },[loading])

  // console.log("data")
  // console.log(data)

  const dateObj: {[key:string]:any} = {};

  // loading false 인 경우에만?
  // 이거는 형식 따라서 바꿔
  data?.getCalendarMonthlyData?.forEach(singleDayData => {

    // const date = singleDayData.date;
    // dateObj[date] = singleDayData.title;
    const date = singleDayData?.date; // 타입 맞출라고 쓴거. 걍 위에 써도 됨.
    // date && (dateObj[date] = singleDayData?.title);
    if(date) {
      const diaryNumberOnDate = dateObj[date];
      dateObj[date] = diaryNumberOnDate ? diaryNumberOnDate + 1 : 1; 
    }
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

  const monthData = data?.getCalendarMonthlyData;
  const dateData = monthData && monthData.filter(data => data?.date === selectedDay);

  // const [viewOrientation,setViewOrientation] = useState<"PORTRAIT"|"LANDSCAPE">("PORTRAIT");
  // useDeviceOrientationChange((orientation)=>{
  //   console.log("orientation"+ orientation);
  //   // LANDSCAPE-RIGHT
  //   // PORTRAIT
  //   // LANDSCAPE-LEFT
  //   // PORTRAIT-UPSIDEDOWN 도 있긴 한데 얘는 빼
  //   setViewOrientation(orientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
  // });
  // const orientationCallback = (orientation:OrientationType) => setViewOrientation(orientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
  
  // useCustomOrientationListener(orientationCallback);

  // const viewOrientation = useCustomOrientationListener();

  // const isPortrait = viewOrientation === "PORTRAIT";

  return (
    // 얘는 단점이 중간에 돌리면 리렌더링 되는거라 이전게 아니고 처음으로 감.
    // viewOrientation === "PORTRAIT" ?
    //   <CalendarVerticalView
    //     minDate={minDate}
    //     maxDate={maxDate}
    //     onMonthChange={onMonthChange}
    //     setSelectedDay={setSelectedDay}
    //     dateObj={dateObj}
    //     dateData={dateData}
    //     selectedDate={selectedDate}
    //   />
    // :
    //   <CalendarHorizontalView
    //     minDate={minDate}
    //     maxDate={maxDate}
    //     onMonthChange={onMonthChange}
    //     setSelectedDay={setSelectedDay}
    //     dateObj={dateObj}
    //     dateData={dateData}
    //     selectedDate={selectedDate}
    //   />
    // <BaseContainer>
    // 이건 그냥 캘린더까지 스크롤됨. 걍 이걸로 함. 다른 애들도 결국 리렌더링됨
    <BaseScrollView
      // scrollEnabled={viewOrientation !== "PORTRAIT"}
      // disableScrollViewPanResponder={viewOrientation === "PORTRAIT"}
      // nestedScrollEnabled={viewOrientation === "PORTRAIT"}
    >
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
      <View
        style={{
          padding: 20,
        }}
      >
        <AgendaList
          dateData={dateData}
          selectedDate={selectedDate}
        />
      </View>
    </BaseScrollView>
    // </BaseContainer>
  )
};

export default Calendar;
