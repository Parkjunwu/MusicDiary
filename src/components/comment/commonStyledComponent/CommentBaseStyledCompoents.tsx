import { FontAppliedBaseTextInputLittlePaddingNeedFontSize, FontAppliedBaseTextLittlePaddingNeedFontSize, FontAppliedBoldTextInputLittlePaddingNeedFontSize, FontAppliedBoldTextLittlePaddingNeedFontSize, FontAppliedLightTextInputLittlePaddingNeedFontSize, FontAppliedLightTextLittlePaddingNeedFontSize } from "../../../styled-components/FontAppliedComponents";

// const CommentBaseText = ({children}:{children: React.ReactNode}) => <FontAppliedBaseTextLittlePaddingNeedFontSize fontSize={12}>{children}</FontAppliedBaseTextLittlePaddingNeedFontSize>;
// const CommentBoldText = ({children}:{children: React.ReactNode}) => <FontAppliedBoldTextLittlePaddingNeedFontSize fontSize={12}>{children}</FontAppliedBoldTextLittlePaddingNeedFontSize>;
// const CommentLightText = ({children}:{children: React.ReactNode}) => <FontAppliedLightTextLittlePaddingNeedFontSize fontSize={12}>{children}</FontAppliedLightTextLittlePaddingNeedFontSize>;

// const CommentBaseTextInput = ({children}:{children: React.ReactNode}) => <FontAppliedBaseTextInputLittlePaddingNeedFontSize fontSize={12}>{children}</FontAppliedBaseTextInputLittlePaddingNeedFontSize>;
// const CommentBoldTextInput = ({children}:{children: React.ReactNode}) => <FontAppliedBoldTextInputLittlePaddingNeedFontSize fontSize={12}>{children}</FontAppliedBoldTextInputLittlePaddingNeedFontSize>;
// const CommentLightTextInput = ({children}:{children: React.ReactNode}) => <FontAppliedLightTextInputLittlePaddingNeedFontSize fontSize={12}>{children}</FontAppliedLightTextInputLittlePaddingNeedFontSize>;

const getBaseText = ({
  fontSize
}: {fontSize: number;}) => ({children}:{children: React.ReactNode}) => <FontAppliedBaseTextLittlePaddingNeedFontSize fontSize={fontSize}>{children}</FontAppliedBaseTextLittlePaddingNeedFontSize>;
const getBoldText = ({
  fontSize
}: {fontSize: number;}) => ({children}:{children: React.ReactNode}) => <FontAppliedBoldTextLittlePaddingNeedFontSize fontSize={fontSize}>{children}</FontAppliedBoldTextLittlePaddingNeedFontSize>;
const getLightText = ({
  fontSize
}: {fontSize: number;}) => ({children}:{children: React.ReactNode}) => <FontAppliedLightTextLittlePaddingNeedFontSize fontSize={fontSize}>{children}</FontAppliedLightTextLittlePaddingNeedFontSize>;

const getBaseTextInput = ({
  fontSize
}: {fontSize: number;}) => ({children}:{children: React.ReactNode}) => <FontAppliedBaseTextInputLittlePaddingNeedFontSize fontSize={fontSize}>{children}</FontAppliedBaseTextInputLittlePaddingNeedFontSize>;
const getBoldTextInput = ({
  fontSize
}: {fontSize: number;}) => ({children}:{children: React.ReactNode}) => <FontAppliedBoldTextInputLittlePaddingNeedFontSize fontSize={fontSize}>{children}</FontAppliedBoldTextInputLittlePaddingNeedFontSize>;
const getLightTextInput = ({
  fontSize
}: {fontSize: number;}) => ({children}:{children: React.ReactNode}) => <FontAppliedLightTextInputLittlePaddingNeedFontSize fontSize={fontSize}>{children}</FontAppliedLightTextInputLittlePaddingNeedFontSize>;

export {
  // CommentBaseText,
  // CommentBoldText,
  // CommentLightText,
  // CommentBaseTextInput,
  // CommentBoldTextInput,
  // CommentLightTextInput,
  getBaseText,
  getBoldText,
  getLightText,
  getBaseTextInput,
  getBoldTextInput,
  getLightTextInput,
};