import { FieldValues, UseFormRegister } from 'react-hook-form';
import CircleWithCheck, {
  CircleBorderCheck,
} from '@common/components/icons/CircleWithCheck';

interface Props {
  children: React.ReactNode;
  register: UseFormRegister<FieldValues>;
}
const LoginCheckbox = ({ children, register }: Props) => {
  return (
    <>
      <label className="inline-flex items-center max-md:text-[0.875rem]">
        <input
          type="checkbox"
          className="peer hide"
          {...register('remember_me')}
        />
        <span className="peer-checked:inline-block hidden mr-[0.5rem] w-[1.5rem] h-[1.5rem]">
          <CircleWithCheck fillColor="#688AF2" size="24" />
        </span>
        <span className="peer-checked:hidden inline-block mr-[0.5rem] w-[1.5rem] h-[1.5rem]">
          <CircleBorderCheck />
        </span>
        {children}
      </label>
    </>
  );
};

export default LoginCheckbox;
