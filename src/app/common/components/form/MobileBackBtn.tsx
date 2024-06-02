'use client';

import { useRouter } from 'next/navigation';

export default function MobileBackBtn({ className }: { className: string }) {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <button
      className={`max-md:block hidden w-[1.5rem] h-[1.5rem] ${className}`}
      onClick={handleClick}
    >
      <span className="hide">뒤로가기</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="inline-block"
      >
        <path d="M16 20L8 12L16 4" stroke="#171717" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
