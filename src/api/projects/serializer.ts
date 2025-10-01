import { Project } from "../../types/rawTypes.ts";
import { ProjectScheme } from "../../types/formTypes.ts";

export const serializeProjectDataForForm = (data: Project): ProjectScheme => ({
  name: data.name,
  description: data.description,
  questions:
    data.questions.length > 0
      ? data.questions.map((question) => ({
          question: question.question,
          note: question.note,
        }))
      : [{ question: "", note: "" }],
});
