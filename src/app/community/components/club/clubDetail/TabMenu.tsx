'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ITabList } from '@/types/club/detail/clubDetail';
import { useRecoilState } from 'recoil';
import { clubCurrentTabState } from '@/app/community/atoms/clubDetail';
import { useEffect } from 'react';

interface Props {
  tabList: ITabList[];
  clubId: number;
  current: string;
}

export default function TabMenu({ tabList, clubId, current }: Props) {
  const router = useRouter();
  const [tab, setTab] = useRecoilState(clubCurrentTabState);

  const handleClick = (path: string) => {
    if (path === undefined) {
      path = 'notice';
    }

    setTab(path);
    router.push(`/community/club/${clubId}/${path}`);
  };
  return (
    <div className="flex justify-between text-center [&_button]:w-[5.3125rem] [&_button]:h-[2.5rem] [&_button]:leading-[2.5rem] max-md:[&_button]:w-[3.8125rem] max-md:[&_button]:h-[2.5625rem] max-md:[&_button]:leading-[2.5625rem]">
      {tabList.map(({ id, name, path }, index) => (
        <button
          className={`
            ${
              (current === undefined && index === 0) || current === path
                ? 'text-blue-400 max-md:relative max-md:text-main-black max-md:font-bold max-md:after:absolute max-md:after:bottom-[-1px] max-md:after:w-full max-md:after:h-[1px] max-md:after:block max-md:after:bg-main-black'
                : 'text-main-black max-md:text-gray-800'
            }`}
          key={id}
          onClick={() => handleClick(path)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
