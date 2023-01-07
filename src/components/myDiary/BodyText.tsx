import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

// const BodyText = styled.Text<{index:number}>`
//   padding: ${props=>props.index === 0 ? "0px 5px 20px 5px" : "20px 5px"};
//   color: ${props=>props.theme.textColor};
// `;
const BodyText = styled(FontAppliedBaseTextNeedFontSize)<{index:number}>`
  padding: ${props=>props.index === 0 ? "0px 5px 20px 5px" : "20px 5px"};
  line-height: 26px;
  /* font-size: 13px; */
`;

export default BodyText;