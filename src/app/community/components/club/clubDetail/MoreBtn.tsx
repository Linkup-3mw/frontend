import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function MoreBtn({ children, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button className={className} onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="4"
          viewBox="0 0 20 4"
          fill="none"
          className="inline-block"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H4V4H0V0ZM8 0H12V4H8V0ZM20 0H16V4H20V0Z"
            fill="#171717"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="overflow-hidden absolute top-[100%] left-1/2 -translate-x-1/2 min-w-[3.75rem] rounded-[0.25rem] bg-white [&_button]:block [&_button]:w-full [&_button]:h-[2.5rem] [&_button]:font-bold [&_button]:border-b-blue-100 [&_button]:border-b-[1.5px]">
          {children}
        </div>
      )}
    </div>
  );
}
