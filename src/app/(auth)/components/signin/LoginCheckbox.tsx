import CircleWithCheck, {
  CircleBorderCheck,
} from '@/app/common/components/icons/CircleWithCheck';

interface Props {
  children: React.ReactNode;
}
const LoginCheckbox = ({ children }: Props) => {
  return (
    <>
      <label className="inline-flex items-center">
        <input type="checkbox" className="peer hide" />
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
