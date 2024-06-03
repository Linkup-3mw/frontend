import React, { ChangeEvent } from 'react';
import CircleWithCheck from '../icons/CircleWithCheck';

interface Props {
  name: string;
  children: React.ReactNode;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function RoundedCheckbox({
  name,
  children,
  onChange,
  isChecked,
}: Props) {
  return (
    <>
      <label className="inline-flex items-center [&_>_span]:mr-[0.5rem] [&_>_span]:w-[2rem] [&_>_span]:h-[2rem] [&_>_span]:max-md:mr-[1rem] [&_>_span]:max-md:w-[1.66rem] [&_>_span]:max-md:h-[1.66rem]">
        <input
          type="checkbox"
          className="peer hide"
          onChange={onChange}
          checked={isChecked}
          name={name}
        />
        <span className="peer-checked:inline-block hidden ">
          <CircleWithCheck fillColor="#688AF2" />
        </span>
        <span className="peer-checked:hidden inline-block">
          <CircleWithCheck />
        </span>
        {children}
      </label>
    </>
  );
}
