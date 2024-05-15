import CircleWithCheck from '../icons/CircleWithCheck';

interface Props {
  children: React.ReactNode;
}
const RoundedCheckbox = ({ children }: Props) => {
  return (
    <>
      <label className="flex items-center">
        <input type="checkbox" className="peer hide" />
        <span className="peer-checked:inline-block hidden mr-[0.5rem]">
          <CircleWithCheck fillColor="#97BAFE" />
        </span>
        <span className="peer-checked:hidden inline-block mr-[0.5rem]">
          <CircleWithCheck />
        </span>
        {children}
      </label>
    </>
  );
};

export default RoundedCheckbox;
