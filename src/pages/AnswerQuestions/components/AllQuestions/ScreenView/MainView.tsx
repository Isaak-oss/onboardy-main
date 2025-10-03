import React, { useState } from "react";
import ConfirmationModal from "../ConfirmationModal.tsx";
import Title from "../../../../../components/Texts/Title.tsx";
import CustomBtn from "../../../../../components/CustomBtn/CustomBtn.tsx";
import { QuestionsViewTypes } from "../AllQuestions.tsx";

const MainView = ({ setView }: { setView: (view: QuestionsViewTypes) => void }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-center flex-col">
      <ConfirmationModal
        onClose={() => setIsConfirmModalOpen(false)}
        isOpen={isConfirmModalOpen}
        onAccept={() => setView("camera")}
      />
      <Title text={"On your ready click 'Start conversation' button"} />
      <CustomBtn
        title="Start conversation"
        type={"button"}
        onClick={() => setIsConfirmModalOpen(true)}
      />
    </div>
  );
};

export default MainView;
