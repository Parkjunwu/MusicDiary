// 안됨

import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import momentSeoulTZ from '../../../logic/momentSeoul/momentSeoulTZ';

type Props = {
  data: any;
  renderMonth: (props: any) => JSX.Element;
  renderMonthParams: any;
  maxSimultaneousMonths: any;
  initialRenderIndex: any;
  minDate: any;
  maxDate: any;
  restrictMonthNavigation: any;
  updateMonthYear: any;
  onMonthChange: any;
  horizontal: any;
}

const ScrollerFC = ({
  // ref,
  data:propsData,
  renderMonth,
  renderMonthParams,
  maxSimultaneousMonths,
  initialRenderIndex,
  minDate,
  maxDate,
  restrictMonthNavigation,
  updateMonthYear,
  onMonthChange,
  horizontal,
}: Props) => {

  const rlvRef = useRef();
  const [data,setData] = useState(propsData);
  const [currentIndex,setCurrentIndex] = useState();
  const [numVisibleItems,setNumVisibleItems] = useState(1);
  const [numMonths,setNumMonths] = useState(data.length);
  const [shifting,setShifting] = useState(false);
  const [dataProvider,setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  );
  const [layoutProvider,setLayoutProvider] = useState();
  const [itemHeight,setItemHeight] = useState();
  const [itemWidth,setItemWidth] = useState();
  const [currentMonth,setCurrentMonth] = useState();
  
  const updateLayout = (dims) => {
    const itemWidth = dims.containerWidth;
    let itemHeight = dims.containerHeight;
    if (dims.dayWrapper && dims.dayWrapper.height) {
      itemHeight = dims.dayWrapper.height * 6; // max 6 row weeks per month
    }

    const layoutProviders = new LayoutProvider(
      () => 0, // only 1 view type
      (type, dim) => {
        dim.width = itemWidth;
        dim.height = itemHeight;
      }
    );

    setLayoutProvider(layoutProviders)
    setItemHeight(itemHeight)
    setItemWidth(itemWidth)
    // return { layoutProvider, itemHeight, itemWidth };
  };

  useEffect(()=>{
    updateLayout(renderMonthParams.styles)
  },[]);

  const rlv = rlvRef.current;

  const goToDate = (date, delay) => {
    // const data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].isSame(date, 'month')) {
        if (delay) {
          setTimeout(() => rlv?.scrollToIndex(i, false), delay);
        }
        else {
          rlv?.scrollToIndex(i, false);
        }
        break;
      }
    }
  }

  // Scroll left, guarding against start index.
  const scrollLeft = () => {
    if (currentIndex === 0) {
      return;
    }
    const newIndex = Math.max(currentIndex - numVisibleItems, 0);
    rlv?.scrollToIndex(newIndex, true);
  }

  // Scroll right, guarding against end index.
  const scrollRight = () => {
    const newIndex = Math.min(currentIndex + numVisibleItems, numMonths - 1);
    rlv?.scrollToIndex(newIndex, true);
  }

  // Shift dates when end of list is reached.
  const shiftMonthsForward = (currentMonth) => {
    shiftMonths(currentMonth, numMonths / 3);
  }

  // Shift dates when beginning of list is reached.
  const shiftMonthsBackward = (currentMonth) => {
    shiftMonths(currentMonth, numMonths * 2/3);
  }

  const shiftMonths = (currentMonth, offset) => {
    const prevVisMonth = currentMonth.clone();
    const newStartMonth = prevVisMonth.clone().subtract(Math.floor(offset), 'months');
    updateMonths(prevVisMonth, newStartMonth);
  }

  const updateMonths = (prevVisMonth, newStartMonth) => {
    if (shifting) {
      return;
    }
    const datas = [];
    let _newStartMonth = newStartMonth;
    if (minDate && restrictMonthNavigation && newStartMonth.isBefore(minDate, 'month')) {
      _newStartMonth = momentSeoulTZ(minDate);
    }
    for (let i = 0; i < numMonths; i++) {
      let date = _newStartMonth.clone().add(i, 'months');
      if (maxDate && restrictMonthNavigation && date.isAfter(maxDate, 'month')) {
        break;
      }
      datas.push(date);
    }
    // Prevent reducing range when the minDate - maxDate range is small.
    if (datas.length < maxSimultaneousMonths) {
      return;
    }

    // Scroll to previous date
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].isSame(prevVisMonth, 'month')) {
        setShifting(true);
        rlv?.scrollToIndex(i, false);
        // RecyclerListView sometimes returns position to old index after
        // moving to the new one. Set position again after delay.
        setTimeout(() => {
          rlv?.scrollToIndex(i, false);
          setShifting(false); // debounce
        }, 800);
        break;
      }
    }
    
    setData(datas);
    setDataProvider(prev=>prev.cloneWithRows(datas));
  }

  // Track which dates are visible.
  const onVisibleIndicesChanged = (all, now) => {
    

    // "now" contains the inflight indices, whereas "all" reflects indices
    // after scrolling has settled. Prioritize "now" for faster header updates.
    const newCurrentIndex = now[0] || all[0];
    const newCurrentMonth = data[newCurrentIndex]; // a Moment date

    // Fire month/year update on month changes.  This is
    // necessary for the header and onMonthChange updates.
    if (!currentMonth || !currentMonth.isSame(newCurrentMonth, 'month')) {
      const currMonth = newCurrentMonth && newCurrentMonth.clone();
      onMonthChange && onMonthChange(currMonth);
    }

    updateMonthYear && updateMonthYear(newCurrentMonth, true);

    if (newCurrentIndex === 0) {
      shiftMonthsBackward(newCurrentMonth);
    } else if (newCurrentIndex > numMonths - 3) {
      shiftMonthsForward(newCurrentMonth);
    }

    setCurrentMonth(newCurrentMonth)
    setCurrentIndex(newCurrentIndex)
  }

  const onLayout = event => {
    const containerWidth = event.nativeEvent.layout.width;
    setNumVisibleItems(Math.floor(containerWidth / itemWidth));
    updateLayout(renderMonthParams.styles)
  }

  const rowRenderer = (type, rowMonth, i, extState) => {
    const { currentMonth: month, currentYear: year } = updateMonthYear(rowMonth);
    return renderMonth && renderMonth({...extState, month, year});
  }

  if (!data || numMonths === 0 || !itemHeight || !layoutProvider) {
    return null;
  }
  
  return (
    <View style={{ width:itemWidth, height:itemHeight, alignSelf:"center" }} onLayout={onLayout}>
      <RecyclerListView
        // ref={rlv => this.rlv = rlv}
        ref={rlv}
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
        extendedState={renderMonthParams}
        initialRenderIndex={initialRenderIndex}
        onVisibleIndicesChanged={onVisibleIndicesChanged}
        isHorizontal={horizontal}
        scrollViewProps={{
          showsHorizontalScrollIndicator: false,
          snapToInterval: horizontal ? itemWidth : itemHeight,
          // 스크롤 할라고 추가한거
          // pagingEnabled: true,
          // snapToInterval: width,
          decelerationRate: "fast",
          disableIntervalMomentum: true,
        }}
      />
    </View>
  )
};

export default React.forwardRef(ScrollerFC);