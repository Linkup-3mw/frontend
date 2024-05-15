import Check from '../icons/Check';

interface Props {
  children: React.ReactNode;
}
const Checkbox = ({ children }: Props) => {
  return (
    <>
      <label className="flex items-center">
        <input type="checkbox" className="peer hide" />
        <span className="peer-checked:inline-block hidden mr-[0.5rem]">
          <Check color="#97BAFE" />
        </span>
        <span className="peer-checked:hidden inline-block mr-[0.5rem]">
          <Check />
        </span>
        {children}
      </label>
    </>
  );
};

export default Checkbox;
