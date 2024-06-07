import PlaceDropdown from '@components/club/PlaceDropdown';
import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import CategoryDropdown from '@components/club/CategoryDropdown';
import TeamExclusionButton from '@components/club/TeamExclusionButton';
import AddClubButton from '@components/club/common/AddClubButton';
import SearchInput from '@components/club/SearchInput';
import RenderClubs from '../../RenderClubs';
import { allClubs, hotClubs } from '@/app/community/data/clubs';

export default function AllMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dropdownOptions = ['이용 지점', '주변 지점', '전체 지점'];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleOptionSelect = (value: string) => {
    const formattedValue = value.replace(/\s/g, '');
    setSelectedOption(value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    params.set('location', formattedValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <PlaceDropdown
        options={dropdownOptions}
        selectedOption={selectedOption}
        onSelect={handleOptionSelect}
      />
      <div className="md:flex items-center justify-between mt-5 relative z-10">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="flex md:space-x-4 space-x-2">
            <CategoryDropdown />
            <TeamExclusionButton />
          </div>
          <AddClubButton className="ml-auto leading-none h-[2rem] w-[2rem] md:hidden" />
        </div>
        <SearchInput
          placeholder="찾고 싶은 소모임을 검색하세요."
          className="md:hidden w-full text-xs"
        />
        <div className="flex items-center space-x-4">
          <SearchInput
            placeholder="찾고 싶은 소모임 제목, 내용 등을 입력해 주세요."
            className="md:w-[30rem] w-full hidden md:flex"
          />
          <AddClubButton className="hidden md:flex items-center justify-center h-[2.5rem] w-[2.5rem]" />
        </div>
      </div>
      <div>
        {currentPage === 1 && (
          <div className="md:block hidden">
            <div className="font-bold text-2xl mt-8">이 달의 인기 소모임!</div>
            <RenderClubs
              clubs={allClubs}
              totalItems={allClubs.length}
              showPagination={true}
            />
            <RenderClubs
              clubs={hotClubs.slice(0, 8)}
              totalItems={hotClubs.length}
              showPagination={false}
            />
          </div>
        )}
        {currentPage === 1 && (
          <div className="font-bold text-2xl pt-20 leading-none md:block hidden">
            전체 소모임
          </div>
        )}
        <div>
          <RenderClubs
            clubs={allClubs}
            totalItems={allClubs.length}
            showPagination={true}
          />
        </div>
      </div>
    </>
  );
}
