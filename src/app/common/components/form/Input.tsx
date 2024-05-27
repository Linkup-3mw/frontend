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
      className={`block px-[1.5rem] w-full h-[3.5rem] bg-white border-[1.5px] border-[#d0d0d8] box-border focus-visible:outline-none focus-visible:border-blue-500  autofill:border-white autofill:border-solid autofill:border-[2px] rounded-[0.5rem] text-[0.875rem] font-bold placeholder:text-[#a3a3af] my-[1rem] 
        ${isError ? '!border-[#FF1000] border-[1.5px]' : ''}
      `}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      {...(register && { ...register(name, validation) })}
    />
  );
}
