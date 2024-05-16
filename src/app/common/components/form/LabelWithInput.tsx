import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
  text: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error: FieldValues | undefined;
  validation: RegisterOptions<FieldValues, string>;
  register: UseFormRegister<FieldValues>;
}
export default function LabelWithInput({
  text,
  name,
  type = 'text',
  placeholder,
  error,
  validation,
  register,
}: Props) {
  return (
    <div className="mb-[2.06rem]">
      <label
        className={`block text-[1rem] font-bold  text-main-black leading-none`}
      >
        {text}
        <input
          className={`text_input mt-[1rem]
              ${
                error !== undefined
                  ? 'border-[#ff513f] border-[1.5px] text-main-black'
                  : ''
              }
            `}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      </label>
      {error !== undefined && (
        <i className={`text-[#ff513f] not-italic`}>{error.message}</i>
      )}
    </div>
  );
}
