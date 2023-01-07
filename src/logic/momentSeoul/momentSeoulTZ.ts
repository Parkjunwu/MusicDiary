import moment from "moment-timezone";

const momentSeoulTZ = (inp?: moment.MomentInput, strict?: boolean | undefined) => moment(inp,strict).tz("Asia/Seoul");

export default momentSeoulTZ;