import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubName: string;
  shortDescription: string;
  message: string;
  subMessage: string;
  buttonText: string;
}

export default function Modal({
  isOpen,
  onClose,
  clubName,
  shortDescription,
  message,
  subMessage,
  buttonText,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-blue-50 p-[2rem] rounded-lg w-[60rem] shadow-md">
        <div className="text-left">
          <h2 className="text-2xl font-bold mb-[1rem] leading-none">
            {clubName}
          </h2>
          <p className="mb-4 leading-none font-medium">{shortDescription}</p>
        </div>
        <hr className="border-gray-300 my-[2rem]" />
        <div className="text-center">
          <p className="pt-6 text-2xl text-blue-400 font-bold leading-none">
            {message}
          </p>
          <p className="my-[2rem] text-gray-500 leading-none">{subMessage}</p>
          <button
            onClick={onClose}
            className="p-[1rem] w-[8rem] bg-blue-400 text-white rounded-lg leading-none"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
