import { ID } from "./rawTypes.ts";

export type LoginScheme = {
  email: string;
  password: string;
};

export type QuestionScheme = {
  question: string;
  note?: string;
};

export type PersonalQuestionFieldType = "text" | "number" | "link";

export type PersonalQuestionScheme = {
  field: string;
  fieldType: PersonalQuestionFieldType;
  isRequired: boolean;
  //local value
  disabled?: boolean;
};

export type ProjectScheme = {
  name: string;
  description?: string;
  duration: number;
  questions: QuestionScheme[];
  personalQuestions: PersonalQuestionScheme[];
};

export type AnswerQuestionsScheme = {
  questionsAnswer: string;
  personalAnswers: { id: ID; answer: string }[];
};
