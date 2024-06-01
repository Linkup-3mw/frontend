'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from '@/utils/params';
import { MouseEvent } from 'react';

interface Props {
  tabList: {
    id: number;
    name: string;
  }[];
}

export default function TabMenu({ tabList }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabName = searchParams.get('tab');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    router.push(
      pathname +
        '?' +
        createQueryString('tab', (e.target as any).textContent, searchParams),
    );
  };
  return (
    <div className="flex justify-between [&_button]:w-[5.3125rem] [&_button]:h-[2.5rem] max-md:[&_button]:w-[3.8125rem] max-md:[&_button]:h-[2.5625rem]">
      {tabList.map(({ id, name }, index) => (
        <button
          className={`
            ${
              (!tabName && index === 0) || name === tabName
                ? 'text-blue-400 max-md:relative max-md:text-main-black max-md:font-bold max-md:after:absolute max-md:after:bottom-[-1px] max-md:after:w-full max-md:after:h-[1px] max-md:after:block max-md:after:bg-main-black'
                : 'text-main-black max-md:text-gray-800'
            }`}
          key={id}
          onClick={handleClick}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
