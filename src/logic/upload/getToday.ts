// import moment from "moment";
import momentSeoulTZ from "../momentSeoul/momentSeoulTZ";

const getToday = () => momentSeoulTZ().format("YYYYMMDD");

export default getToday;