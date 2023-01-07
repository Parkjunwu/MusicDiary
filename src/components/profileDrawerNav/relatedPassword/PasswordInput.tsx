import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const PasswordContainer = styled.View<{passwordWidth:number}>`
  flex: 1;
  width: ${props=>props.passwordWidth}px;
  align-self: center;
`;
const ShowPasswordInputContainer = styled.View`
  /* flex: 1; */
  flex-direction: row;
  padding-left: 30px;
  padding-right: 30px;
`;
// StartPasswordScreen 에서도 쓰는데 여기는 ThemeProvider 전이라 따로 받아서 씀
const ShowPasswordInput = styled.Text<{textColor:string}>`
  color: ${props=>props.textColor};
  text-align: center;
  font-size: 35px;
`;
const Flex1Container = styled.View`
  flex: 1;
`;
const PasswordRowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  /* background-color: red; */
  /* min-height: 50px; */
`;
const PasswordColumnContainer = styled.View`
  flex: 1;
`;
const PasswordTouchable = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const PasswordText = styled.Text<{textColor:string}>`
  font-size: 30px;
  color: ${props=>props.textColor};
`;

type PasswordInputProps = {
  password: number[];
  writePassword: (nowNumber:number)=>void;
  deletePassword: ()=>void;
};

const PasswordInput = ({
  password,
  writePassword,
  deletePassword,
}: PasswordInputProps) => {

  const { width } = useWindowDimensions();
  const widthMinusPadding = width - 40;
  const passwordWidth = widthMinusPadding > 600 ? 600 : widthMinusPadding;

  const showPasswordInput: boolean[] = [];

  for(let i=0;i<6;i++) {
    showPasswordInput.push(typeof password[i] === "number");
  }

  const { textColor } = useBackgroundColorAndTextColor();

  return (
    <PasswordContainer passwordWidth={passwordWidth}>

      <ShowPasswordInputContainer>
        {showPasswordInput.map((isWrite,index) => (
          <Flex1Container key={index} >
            {isWrite ?
              <ShowPasswordInput textColor={textColor}>*</ShowPasswordInput>
              :
              <Ionicons name="remove-outline" size={50} color={textColor} />
            }
          </Flex1Container>
        ))}
      </ShowPasswordInputContainer>

      {[0,1,2].map(rowNumber=><PasswordRowContainer key={rowNumber}>
        {[1,2,3].map(columnNumber=>{
          const nowNumber = rowNumber * 3 + columnNumber;
          return <PasswordColumnContainer key={nowNumber}>
            <PasswordTouchable onPress={()=>writePassword(nowNumber)}>
              <PasswordText textColor={textColor}>{nowNumber}</PasswordText>
            </PasswordTouchable>
          </PasswordColumnContainer>
        })}
        </PasswordRowContainer>
      )}

      <PasswordRowContainer>
        <PasswordColumnContainer/>
        <PasswordColumnContainer>
          <PasswordTouchable onPress={()=>writePassword(0)}>
            <PasswordText textColor={textColor}>0</PasswordText>
          </PasswordTouchable>
        </PasswordColumnContainer>
        <PasswordColumnContainer>
          <PasswordTouchable onPress={deletePassword}>
            <Feather name="delete" size={28} color={textColor} />
          </PasswordTouchable>
        </PasswordColumnContainer>
      </PasswordRowContainer>
    </PasswordContainer>
  )
};

export default PasswordInput;