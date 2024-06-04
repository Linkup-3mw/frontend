import React, { ChangeEventHandler } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import CircleWithCheck, {
  CircleBorderCheck,
} from '@common/components/icons/CircleWithCheck';

interface CheckboxProps {
  label: React.ReactNode;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
}

const ConsentCheckbox = ({ label, onChange }: CheckboxProps) => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className="peer hidden" onChange={onChange} />
      <span className="peer-checked:inline-block hidden mr-[0.5rem] w-[1.5rem] h-[1.5rem]">
        <CircleWithCheck fillColor="#688AF2" size="24" />
      </span>
      <span className="peer-checked:hidden inline-block mr-[0.5rem] w-[1.5rem] h-[1.5rem]">
        <CircleBorderCheck />
      </span>
      {label}
    </label>
  );
};

export default ConsentCheckbox;
