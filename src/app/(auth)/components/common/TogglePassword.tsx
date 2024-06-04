import { useState } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { EyesOff, EyesOn } from '@/app/common/components/icons/Eyes';
import Input from '@common/components/form/Input';

interface Props {
  name: string;
  isError: boolean;
  type?: string;
  placeholder?: string;
  validation?: RegisterOptions<FieldValues, string>;
  register: UseFormRegister<FieldValues> | any;
}
export default function TogglePassword({
  name,
  placeholder,
  register,
  isError,
  validation,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const pwToggleFn = () => {
    setShowPassword(!showPassword);
  };
  return (
    <span className="relative block">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        register={register}
        name={name}
        isError={isError}
        validation={validation}
      />
      <button
        type="button"
        onClick={pwToggleFn}
        className="absolute right-[1.5rem] top-1/2 -translate-y-1/2 max-md:w-[1.5rem] max-md:h-[1.5rem] max-md:right-[1rem]"
      >
        {showPassword ? <EyesOn /> : <EyesOff />}
      </button>
    </span>
  );
}
