interface Props {
  name: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  classname?: string;
  onClick?: () => void;
}

export default function BlueSquareBtn({
  name,
  type = 'button',
  disabled,
  classname,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full h-[3.875rem] bg-blue-400 disabled:bg-[#d0d0d8] rounded-[0.5rem] text-white disabled:text-main-black text-[1.25rem] font-bold ${classname} max-md:h-[2.75rem] max-md:rounded-[0.5rem] max-md:text-[1rem]`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
