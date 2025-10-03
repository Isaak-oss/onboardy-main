import React, { useEffect, useState } from "react";
import Modal from "../../../../components/Modal/Modal.tsx";
import PersonalForm from "./PersonalForm.tsx";
import Title from "../../../../components/Texts/Title.tsx";
import { PersonalQuestion } from "../../../../types/rawTypes.ts";
import { useParams } from "next/navigation";

const personalAnswers = sessionStorage.getItem("personalAnswers");

const PersonalFormModal = ({ personalQuestions }: { personalQuestions: PersonalQuestion[] }) => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (personalAnswers) {
      const parsedPersonalAnswers = JSON.parse(personalAnswers);
      if (parsedPersonalAnswers.projectId === params!.projectId) {
        setIsOpen(false);
      }
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} canClose={false}>
      <div>
        <Title text={"Complete Personal Information"} />
        <PersonalForm personalQuestions={personalQuestions} onClose={() => setIsOpen(false)} />
      </div>
    </Modal>
  );
};

export default PersonalFormModal;
