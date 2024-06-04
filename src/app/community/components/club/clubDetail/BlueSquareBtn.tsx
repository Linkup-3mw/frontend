interface Props {
  name: string;
  onClick: () => void;
  disabled?: boolean;
}
export default function BlueSquareBtn({
  name,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="min-w-[7.375rem] h-[3rem] rounded-[0.5rem] bg-blue-400 text-[1.25rem] font-bold text-white
      disabled:bg-gray-400 max-md:min-w-[4.0625rem] max-md:h-[2.125rem] max-md:rounded-[0.25rem] max-md:text-[0.875rem]
      "
    >
      {name}
    </button>
  );
}
