import { Project } from "../../types/rawTypes.ts";
import { PersonalQuestionScheme, ProjectScheme, QuestionScheme } from "../../types/formTypes.ts";
import { projectFormDefaultValues } from "../../pages/Projects/Overview/components/ProjectForm/useProjectForm.ts";

// Project
export const serializePersonalQuestionsForServer = (personalQuestions: PersonalQuestionScheme[]) =>
  personalQuestions
    .map((question) => ({
      field: question.field,
      fieldType: question.fieldType,
      isRequired: question.isRequired,
    }))
    .filter((question) => question.field);

export const serializeQuestionsForServer = (questions: QuestionScheme[]) =>
  questions
    .map((question) => ({
      question: question.question,
      note: question.note,
    }))
    .filter((question) => question.question);

export const serializeProjectDataForForm = (data: Project): ProjectScheme => ({
  name: data.name,
  description: data.description,
  duration: data.duration,
  questions: data.questions.length > 0 ? data.questions : projectFormDefaultValues.questions,
  personalQuestions: data.personalQuestions,
});

export const serializeProjectDataForServer = (data: ProjectScheme) => ({
  ...data,
  duration: data.duration ? Number(data.duration) : 20,
  personalQuestions: serializePersonalQuestionsForServer(data.personalQuestions),
  questions: serializeQuestionsForServer(data.questions),
});

// Answers
