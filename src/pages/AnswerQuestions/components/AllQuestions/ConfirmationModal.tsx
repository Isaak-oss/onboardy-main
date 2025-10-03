import React from "react";
import Modal from "../../../../components/Modal/Modal.tsx";
import Title from "../../../../components/Texts/Title.tsx";
import CustomBtn from "../../../../components/CustomBtn/CustomBtn.tsx";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
};

const ConfirmationModal = ({ isOpen, onClose, onAccept }: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title text={"You are ready to turn on the camera and answer all questions"} />
      <div className="flex gap-2 items-center">
        <CustomBtn title={"Cancel"} onClick={onClose} className="bg-red-500 flex-1" />
        <CustomBtn title={"Ready"} onClick={onAccept} className="flex-1" />
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
