import { ClientToolTip } from "../types/rawTypes.ts";

export const dashBoardDataSerializer = (data: ClientToolTip) => ({
  btnStyles: data.btnStyles,
  btnText: data.btnText,
  containerStyles: data.containerStyles,
  text: data.text,
  textStyles: data.textStyles,
  url: data.url,
  rect: data.rect,
  skipBtnStyles: data.skipBtnStyles,
  skipBtnText: data.skipBtnText,
  stagesStyle: data.stagesStyle,
  withStages: data.withStages,
  index: data.index,
  withRedirect: data.withRedirect || false,
  cssSelector: data.cssSelector,
});
