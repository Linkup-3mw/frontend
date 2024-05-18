import { ChangeEvent } from 'react';
import CircleWithCheck from '../icons/CircleWithCheck';

interface Props {
  name: string;
  children: React.ReactNode;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const RoundedCheckbox = ({ name, children, onChange, isChecked }: Props) => {
  return (
    <>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="peer hide"
          onChange={onChange}
          checked={isChecked}
          name={name}
        />
        <span className="peer-checked:inline-block hidden mr-[0.5rem] w-[2rem] h-[2rem]">
          <CircleWithCheck fillColor="#688AF2" />
        </span>
        <span className="peer-checked:hidden inline-block mr-[0.5rem] w-[2rem] h-[2rem]">
          <CircleWithCheck />
        </span>
        {children}
      </label>
    </>
  );
};

export default RoundedCheckbox;
