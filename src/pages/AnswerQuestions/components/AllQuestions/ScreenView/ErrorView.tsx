import React from "react";
import { QuestionsViewTypes } from "../AllQuestions.tsx";
import Title from "../../../../../components/Texts/Title.tsx";
import CustomBtn from "../../../../../components/CustomBtn/CustomBtn.tsx";

const ErrorView = ({ setView }: { setView: (view: QuestionsViewTypes) => void }) => {
  return (
    <div>
      <Title text={"Error. Permissions are not provided"} />
      <CustomBtn title='Try again' onClick={() => setView('main')}/>
    </div>
  );
};

export default ErrorView;
