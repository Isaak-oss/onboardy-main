import React from "react";

type ModalProps = {
  isOpen: boolean;
  canClose?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children, canClose = true }: ModalProps) => {
  if (!isOpen) return;

  const onCloseHandler = () => {
    if (canClose) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCloseHandler}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-96 relative max-h-[85%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {canClose && (
          <button
            onClick={onCloseHandler}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
