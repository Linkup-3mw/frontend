interface Props {
  onClick: () => void;
  className: string;
}
export default function WriteBtn({ onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-full bg-blue-400 max-md:w-[1.5rem] max-md:h-[1.5rem] ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="w-[40%]"
      >
        <path d="M8 1V15M1 8H15" stroke="white" strokeWidth="1.5" />
      </svg>
      <span className="hide">작성하기</span>
    </button>
  );
}
