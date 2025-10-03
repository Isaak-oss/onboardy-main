import { CSSProperties } from "react";
import { PersonalQuestionFieldType } from "./formTypes.ts";

export type ID = string;

export type ClientRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  xScroll: number;
  yScroll: number;
  id: string;
};

export type ClientToolTip = {
  rect?: ClientRect | null;
  url?: string;
  id?: string;
  text?: string;
  btnText?: string;
  btnStyles?: CSSProperties;
  textStyles?: CSSProperties;
  containerStyles?: CSSProperties;
  skipBtnStyles?: CSSProperties;
  skipBtnText?: string;
  stagesStyle?: CSSProperties;
  withStages?: boolean;
  withRedirect?: boolean;
  index?: number;
  cssSelector?: string;
  baseUrl?: string;
};

export type ComponentNames = "tooltip";

export type TooltipStylesComponent =
  | "btnStyles"
  | "containerStyles"
  | "textStyles"
  | "skipBtnStyles"
  | "stagesStyle";

export type User = {
  email: string;
  apiKey: string;
  id: string;
};

export type AuthResponse = {
  access_token: string;
};

export type Settings = {
  defaultTooltipStyles: { containerStyles: string; textStyles: string; btnStyles: string };
};

export type Questions = {
  questions: Question[]
  personalQuestions: PersonalQuestion[]
  duration: number
};

export type Question = {
  id: ID;
  question: string;
  note?: string;
};

export type PersonalQuestion = {
  id: ID;
  field: string;
  fieldType: PersonalQuestionFieldType;
  answer?: string;
  isRequired: boolean;
};

export type Project = {
  id: ID;
  name: string;
  description: string;
  questions: Question[];
  duration: number;
  personalQuestions: PersonalQuestion[];
};
