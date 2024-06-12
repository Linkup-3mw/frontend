'use client';
import { Dispatch, SetStateAction } from 'react';
import BlueSquareBtn from '../form/BlueSquareBtn';
import Portal from './Portal';

interface Props {
  message: string;
  buttonName?: string;
  showCloseButton?: boolean;
  callback: () => void;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

export default function Confirm({
  message,
  buttonName = '예',
  callback,
  setIsShow,
}: Props) {
  const handleClick = () => {
    callback && callback();
    setIsShow(false);
  };

  return (
    <Portal>
      <div className="fixed left-0 right-0 top-0 bottom-0 z-[999] flex items-center justify-center  bg-[rgba(0,0,0,0.6)]">
        <div className="p-[2.5rem] max-w-[46.75rem] w-full bg-blue-50 rounded-[1rem] max-md:w-[18rem] max-md:p-[1rem] max-md:pb-[1.5rem]">
          <p className="flex items-center justify-center h-[11.6rem] text-[1.5rem] text-blue-400 font-bold max-md:h-[2.625rem] max-md:text-[0.875rem] max-md:items-baseline">
            {message}
          </p>
          <div className="flex gap-[1.5rem]">
            <BlueSquareBtn
              onClick={() => setIsShow(false)}
              name="아니오"
              classname="bg-transparent !text-blue-400 !border-blue-400 border-[1px]"
            />
            <BlueSquareBtn onClick={handleClick} name={buttonName} />
          </div>
        </div>
      </div>
    </Portal>
  );
}
