interface Props {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}
export default function ButtonInInput({ text, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="absolute right-[1.5rem] top-1/2 -translate-y-1/2 px-[0.72rem] min-w-[4.5rem] h-[2.125rem] bg-blue-400 disabled:bg-[#d0d0d8] rounded-[0.25rem] text-white disabled:text-main-black text-[0.875rem] font-bold max-md:right-[1rem] max-md:px-[0.5rem] max-md:min-w-[4.0625rem] max-md:h-[2.125rem] max-md:text-[0.875rem]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
