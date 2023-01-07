import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import ScrollPicker from "../../calendar/ScrollViewPicker";

type timeType = string | number | "오전" | "오후";

type TimeScrollPickerProps = {
  timeArr: timeType[];
  time: timeType;
  setTime: (value: React.SetStateAction<any>) => void;
};

const TimeScrollPicker = ({
  timeArr,
  time,
  setTime,
}: TimeScrollPickerProps) => {

  const { backgroundColor } = useBackgroundColorAndTextColor();

  return (<ScrollPicker
    dataSource={timeArr}
    selectedIndex={timeArr.indexOf(time)}
    renderItem={(data, index) => <FontAppliedBaseTextNeedFontSize>{data}</FontAppliedBaseTextNeedFontSize>}
    onValueChange={(data, selectedIndex) => setTime(data)}
    wrapperHeight={50}
    // wrapperHeight={150}
    // wrapperWidth={150}
    wrapperColor={backgroundColor}
    itemHeight={50}
    highlightColor='#d8d8d8'
    highlightBorderWidth={2}
  />);
};

export default TimeScrollPicker;