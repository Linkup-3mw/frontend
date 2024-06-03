import { ChangeEvent } from 'react';
import Check from '@common/components/icons/Check';

interface Props {
  name: string;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}
export default function Checkbox({
  name,
  children,
  isChecked,
  onChange,
}: Props) {
  return (
    <>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="peer hide"
          onChange={onChange}
          name={name}
          checked={isChecked || false}
        />
        <span className="peer-checked:inline-block hidden mr-[0.5rem] max-md:w-[1.66rem] max-md:h-[1.66rem]">
          <Check color="#97BAFE" />
        </span>
        <span className="peer-checked:hidden inline-block mr-[0.5rem] max-md:w-[1.66rem] max-md:h-[1.66rem]">
          <Check />
        </span>
        {children}
      </label>
    </>
  );
}
