'use client';
import {
  FillHeartIcon,
  HeartIcon,
} from '@/app/common/components/icons/HeartIcon';
import { useState } from 'react';

interface Props {
  className?: string;
  isLike: boolean;
  onClick: () => Promise<boolean>;
}
export default function HeartBtn({ className, onClick, isLike }: Props) {
  const [bookmark, setBookmark] = useState(isLike);

  const handleClick = async () => {
    setBookmark(!bookmark);

    if (!(await onClick())) {
      //false일 경우 rollback
      setBookmark(!!bookmark);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-[3.75rem] h-[3rem] rounded-[0.5rem] bg-white text-center max-md:bg-transparent max-md:h-[2.125rem] ${className}`}
    >
      {bookmark ? (
        <FillHeartIcon className="inline-block stroke-[1.5px] max-md:stroke-1" />
      ) : (
        <HeartIcon className="inline-block stroke-[1.5px] max-md:stroke-1" />
      )}
    </button>
  );
}
