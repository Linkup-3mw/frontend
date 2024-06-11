'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import XIcon from '../icons/XIcon';
import BlueSquareBtn from '../form/BlueSquareBtn';
import Portal from './Portal';

export interface IAlert {
  message: string;
  buttonName?: string;
  showCloseButton?: boolean;
  onClick?: () => void;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

export default function Alert({
  message,
  buttonName = '확인',
  showCloseButton = true,
  onClick,
  setIsShow,
}: IAlert) {
  const handleClick = () => {
    onClick && onClick();
    setIsShow(false);
  };

  return (
    <Portal>
      <div className="fixed left-0 right-0 top-0 bottom-0 z-[999] flex items-center justify-center  bg-[rgba(0,0,0,0.6)]">
        <div className="p-[2.5rem] max-w-[46.75rem] w-full bg-blue-50 rounded-[1rem] max-md:w-[18rem] max-md:p-[1rem] max-md:pb-[1.5rem]">
          {showCloseButton && (
            <button
              className="block ml-auto w-[1.5rem] h-[1.5rem]"
              onClick={() => setIsShow(false)}
            >
              <XIcon size="14" className="inline-block" />
            </button>
          )}
          <p className="flex items-center justify-center h-[11.6rem] text-[1.5rem] text-blue-400 font-bold max-md:h-[2.625rem] max-md:text-[0.875rem] max-md:items-baseline">
            {message}
          </p>
          <BlueSquareBtn onClick={handleClick} name={buttonName} />
        </div>
      </div>
    </Portal>
  );
}
