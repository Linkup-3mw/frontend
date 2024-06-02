import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  name: string;
  text: string;
  value: string;
  errMsg: string;
  classname?: string;
  register: UseFormRegister<FieldValues>;
}
export default function RadioButton({
  name,
  text,
  value,
  errMsg,
  classname,
  register,
}: Props) {
  return (
    <label
      className={`${classname} flex-1 shrink-0 inline-block px-[0.32rem] min-w-[4.34375rem] h-[2.5rem] leading-[2.5rem] box-border bg-white has-[:checked]:bg-blue-400 border-[1px] border-[#D0D0Db] rounded-[0.5rem] text-center text-[0.875rem] has-[:checked]:text-white font-medium max-md:text-[0.75rem] max-md:font-normal max-md:min-w-[4.0625rem]`}
    >
      <input
        type="radio"
        {...register(name, { required: errMsg })}
        value={value}
        className="hide"
      />
      {text}
    </label>
  );
}
