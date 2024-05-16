import XIcon from '@/app/common/components/icons/XIcon';
import { ChangeEvent, useRef, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  text: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
}
export default function LoginInput({
  text,
  name,
  type = 'text',
  placeholder,
  register,
}: Props) {
  return (
    <div className="mb-[2.06rem]">
      <label
        className={`block text-[1.5rem] leading-[2.125rem] font-bold  text-main-black`}
      >
        {text}
        <input
          className={`text_input mt-[1.2rem] !text-[1.25rem]`}
          type={type}
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
    </div>
  );
}
