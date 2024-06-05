'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import ContentWrap from '@common/components/frame/ContentWrap';
import PlaceDropdown from '@/app/community/components/club/PlaceDropdown';
import MenuButtons from '@components/club/MenuButtons';
import CategoryDropdown from '@components/club/CategoryDropdown';
import TeamExclusionButton from '@components/club/TeamExclusionButton';
import SearchInput from '@components/club/SearchInput';
import { ClubCardProps } from '@components/club/ClubCard';
import Pagination from '@components/club/Pagination';
import CreateGroupForm from '@components/club/CreateGroupForm';
import {
  hotClubs,
  allClubs,
  bookmarkedClubs,
  myClubs,
  unapprovedClubs,
  manageableClubs,
} from '../../data/clubs.js';
import ClubList from '@components/club/ClubList';
import MyClubsSubMenu from '@components/club/MyClubsSubMenu';

export default function Club() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dropdownOptions = ['이용 지점', '주변 지점', '전체 지점'];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [menuSelection, setMenuSelection] = useState<string | null>('전체');
  const [subMenuSelection, setSubMenuSelection] = useState<string>('myClubs');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleOptionSelect = (value: string) => {
    const formattedValue = value.replace(/\s/g, '');
    setSelectedOption(value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    params.set('location', formattedValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleMenuSelect = (value: string) => {
    const formattedValue = value.replace(/\s/g, '');
    setMenuSelection(value);
    setCurrentPage(1);
    router?.push(`?menu=${formattedValue}`);
  };

  const handleSubMenuSelect = (selection: string) => {
    const formattedSelection = selection.replace(/Clubs$/, '');
    setSubMenuSelection(selection);
    const params = new URLSearchParams(searchParams);
    params.set('submenu', `${formattedSelection}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  // 페이지네이션 관련 코드
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`?page=${pageNumber}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', `${pageNumber}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPaginatedClubs = (clubs: ClubCardProps[]) => {
    const indexOfLastClub = currentPage * itemsPerPage;
    const indexOfFirstClub = indexOfLastClub - itemsPerPage;
    return clubs.slice(indexOfFirstClub, indexOfLastClub);
  };

  const renderClubs = (
    clubs: ClubCardProps[],
    totalItems: number,
    showPagination: boolean,
  ) => (
    <>
      <ClubList clubs={clubs} />
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );

  let displayedClubs: ClubCardProps[] = [];
  let totalItems = 0;

  if (menuSelection === '내 소모임') {
    if (subMenuSelection === 'myClubs') {
      displayedClubs = getPaginatedClubs(myClubs);
      totalItems = myClubs.length;
    } else if (subMenuSelection === 'unapprovedClubs') {
      displayedClubs = getPaginatedClubs(unapprovedClubs);
      totalItems = unapprovedClubs.length;
    } else if (subMenuSelection === 'manageableClubs') {
      displayedClubs = getPaginatedClubs(manageableClubs);
      totalItems = manageableClubs.length;
    }
  }

  return (
    <div className="pt-[1.25rem] pb-[1.19rem] px-[1.25rem] relative">
      {isFormVisible ? (
        <CreateGroupForm onClose={handleCloseForm} />
      ) : (
        <ContentWrap>
          <div className="bg-blue-50 rounded-2xl md:p-[2rem] p-4 relative z-10">
            {menuSelection === '전체' && (
              <>
                <PlaceDropdown
                  options={dropdownOptions}
                  selectedOption={selectedOption}
                  onSelect={handleOptionSelect}
                />
                {/* 전체, 찜, 내 소모임 메뉴 */}
                <MenuButtons
                  menuSelection={menuSelection}
                  handleMenuSelect={handleMenuSelect}
                />
                <div className="md:flex items-center justify-between mt-5 relative z-10">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="flex md:space-x-4 space-x-2">
                      <CategoryDropdown />
                      <TeamExclusionButton />
                    </div>
                    <button
                      className="md:hidden text-2xl bg-blue-400 text-white h-[2rem] w-[2rem] rounded-full ml-auto leading-none"
                      onClick={handleButtonClick}
                    >
                      +
                    </button>
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
                    <button
                      className="bg-blue-400 text-white text-2xl h-[2.5rem] w-[2.5rem] rounded-full items-center justify-center hidden md:flex"
                      onClick={handleButtonClick}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  {currentPage === 1 && (
                    <div className="md:block hidden">
                      <div className="font-bold text-2xl mt-8">
                        이 달의 인기 소모임!
                      </div>
                      {renderClubs(
                        getPaginatedClubs(hotClubs.slice(0, 8)),
                        hotClubs.length,
                        false,
                      )}
                    </div>
                  )}
                  {currentPage === 1 && (
                    <div className="font-bold text-2xl pt-20 leading-none md:block hidden">
                      전체 소모임
                    </div>
                  )}
                  <div>
                    {renderClubs(
                      getPaginatedClubs(allClubs),
                      allClubs.length,
                      true,
                    )}
                  </div>
                </div>
              </>
            )}
            {menuSelection === '찜' && (
              <>
                {/* 전체, 찜, 내 소모임 메뉴 */}
                <MenuButtons
                  menuSelection={menuSelection}
                  handleMenuSelect={handleMenuSelect}
                />
                <div className="md:flex items-center justify-between mt-5 relative z-10">
                  <div className="flex items-center mb-4 md:mb-0">
                    <CategoryDropdown />
                    <button
                      className="md:hidden text-2xl bg-blue-400 text-white h-[2rem] w-[2rem] rounded-full ml-auto leading-none"
                      onClick={handleButtonClick}
                    >
                      +
                    </button>
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
                    <button
                      className="bg-blue-400 text-white text-2xl h-[2.5rem] w-[2.5rem] rounded-full items-center justify-center hidden md:flex"
                      onClick={handleButtonClick}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  {renderClubs(
                    getPaginatedClubs(bookmarkedClubs),
                    bookmarkedClubs.length,
                    true,
                  )}
                </div>
              </>
            )}
            {menuSelection === '내 소모임' && (
              <>
                {/* 전체, 찜, 내 소모임 메뉴 */}
                <MenuButtons
                  menuSelection={menuSelection}
                  handleMenuSelect={handleMenuSelect}
                />

                <div className="md:flex items-center justify-between mt-5 relative z-10">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="flex space-x-4">
                      <MyClubsSubMenu onSelect={handleSubMenuSelect} />
                    </div>
                    <button
                      className="md:hidden text-2xl bg-blue-400 text-white h-[2rem] w-[2rem] rounded-full ml-auto leading-none"
                      onClick={handleButtonClick}
                    >
                      +
                    </button>
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
                    <button
                      className="bg-blue-400 text-white text-2xl h-[2.5rem] w-[2.5rem] rounded-full items-center justify-center hidden md:flex"
                      onClick={handleButtonClick}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>{renderClubs(displayedClubs, totalItems, true)}</div>
              </>
            )}
          </div>
        </ContentWrap>
      )}
    </div>
  );
}
