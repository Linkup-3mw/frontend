interface Props {
  onClick?: () => void;
  className: string;
}
export default function EnterButton({ onClick, className }: Props) {
  return (
    <button type="submit" className={`w-[1.5rem] h-[1.5rem] ${className}`}>
      <span className="hide">입력하기</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="inline-block w-full h-full"
      >
        <path d="M4 18H20V2" stroke="#171717" strokeWidth="1.5" />
        <path d="M2 18L8 14.5359L8 21.4641L2 18Z" fill="#171717" />
      </svg>
    </button>
  );
}
