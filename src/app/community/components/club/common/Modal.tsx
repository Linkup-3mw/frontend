import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubName: string;
  shortDescription: string;
  message: string;
  subMessage: string;
  buttonText?: string;
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
      <div className="bg-blue-50 rounded-2xl md:w-[60rem] w-[20rem] shadow-md">
        <div className="text-left md:p-[2rem] p-[1.5rem]">
          <h2 className="md:text-xl text-sm font-bold md:mb-[1rem] mb-2 leading-none">
            {clubName}
          </h2>
          <p className="leading-none md:text-sm text-xs">{shortDescription}</p>
        </div>
        <hr className="border-gray-300" />
        <div className="text-center md:p-[2rem] p-[1.5rem]">
          <p className="md:pt-6 pt-[2.88rem] md:text-xl text-sm text-blue-400 font-bold leading-none">
            {message}
          </p>
          <p className="md:my-[2rem] my-4 text-gray-500 leading-none md:text-sm text-xs">
            {subMessage}
          </p>
          {buttonText && (
            <div className="mb-4">
              <button
                onClick={onClose}
                className="p-[1rem] w-full bg-blue-400 text-white rounded-lg leading-none md:text-sm text-xs"
              >
                {buttonText}
              </button>
            </div>
          )}
          {!buttonText && (
            <div className="mb-4">
              <div className="p-[1rem] w-full  text-white rounded-lg leading-none md:text-sm text-xs"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
