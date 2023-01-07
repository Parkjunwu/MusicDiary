import { gql } from "@apollo/client";
import { ME_FRAGMENT } from "./fragment";

const GET_CALENDAR_MONTHLY_DATA = gql`
  query getCalendarMonthlyData ($year:Int!,$month:Int!) {
    getCalendarMonthlyData (year:$year,month:$month) {
      id
      date
      title
      summaryBody
    }
  }
`;

const ME_QUERY = gql`
  query me {
    me {
      ...MeFragment
    }
  }
  ${ME_FRAGMENT}
`;

export {
  GET_CALENDAR_MONTHLY_DATA,
  ME_QUERY,
};