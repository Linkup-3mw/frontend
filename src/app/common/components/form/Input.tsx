import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
  name: string;
  type?: string;
  placeholder?: string;
  isError: boolean;
  readOnly?: boolean;
  validation?: RegisterOptions<FieldValues, string>;
  register?: UseFormRegister<FieldValues>;
}
export default function Input({
  name,
  type,
  placeholder,
  isError,
  readOnly,
  validation = {},
  register,
}: Props) {
  return (
    <input
      className={`block my-[1rem] px-[1.5rem] w-full h-[3.5rem] bg-white border-[1.5px] border-[#d0d0d8] box-border focus-visible:outline-none focus-visible:border-blue-500  autofill:border-solid rounded-[0.5rem] text-[0.875rem] font-bold placeholder:text-[#a3a3af]  
        max-md:mt-[1rem] max-md:mb-[0.5rem] max-md:px-[1rem] max-md:h-[3.5rem] max-md:text-[0.75rem] max-md:font-normal max-md:border-[1px]
        ${isError ? '!border-[#FF1000] border-[1.5px] max-md:border-[1px]' : ''}
      `}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      autoComplete={type === 'password' ? 'off' : 'on'}
      {...(register && { ...register(name, validation) })}
    />
  );
}
