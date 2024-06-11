'use client';
import { useRouter } from 'next/navigation';
import { ITabList } from '@/types/club/detail/clubDetail';
import { useRecoilState } from 'recoil';
import { clubCurrentTabState } from '@/app/community/atoms/clubDetail';
// import { useState } from 'react';

interface Props {
  tabList: ITabList[];
  clubId: number;
}

export default function TabMenu({ tabList, clubId }: Props) {
  const router = useRouter();

  const [tab, setTab] = useRecoilState(clubCurrentTabState);
  // const [currentTab, setCurrentTab] = useState('notice');

  const handleClick = (path: string) => {
    if (!path) {
      path = 'notice';
    }

    setTab(path);
    router.push(`/community/club/${clubId}/${path}`);
    // setCurrentTab(() => tab);
    // console.log('TAB', currentTab);
  };
  return (
    <div className="flex justify-between text-center [&_button]:w-[5.3125rem] [&_button]:h-[2.5rem] [&_button]:leading-[2.5rem] max-md:[&_button]:w-[3.8125rem] max-md:[&_button]:h-[2.5625rem] max-md:[&_button]:leading-[2.5625rem]">
      {tabList.map(({ id, name, path }, index) => (
        <button
          className={`
            ${
              (tab === '' && index === 0) || tab === path
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
