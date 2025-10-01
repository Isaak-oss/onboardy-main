export type LoginScheme = {
  email: string;
  password: string;
};

export type QuestionScheme = {
  question: string;
  note?: string;
};

export type ProjectScheme = {
  name: string;
  description?: string;
  questions: QuestionScheme[];
};
