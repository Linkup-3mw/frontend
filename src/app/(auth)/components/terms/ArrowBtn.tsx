interface Props {
  handleClick: () => void;
  isActive: boolean;
}

export default function ArrowBtn({ handleClick, isActive }: Props) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-[1.5rem] h-[1.5rem] max-md:w-[1rem] max-md:h-[1rem]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={`transition-all ${isActive ? 'rotate-180' : ''} w-full h-full`}
      >
        <path d="M4 8L12 16L20 8" stroke="#B9B9C3" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
