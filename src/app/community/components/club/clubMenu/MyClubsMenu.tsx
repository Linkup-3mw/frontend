import MyClubsSubMenu from '@components/club/MyClubsSubMenu';
import AddClubButton from '@components/club/common/AddClubButton';
import SearchInput from '@components/club/SearchInput';
import { useState } from 'react';
import AllMyClubs from '@/app/community/components/club/clubMenu/AllMyClubs';
import ManageableClubs from '@/app/community/components/club/clubMenu/ManageableClubs';
import UnapprovedClubs from '@/app/community/components/club/clubMenu/UnapprovedClubs';

export default function MyClubsMenu() {
  const [subMenuSelection, setSubMenuSelection] = useState('myClubs');

  const handleSubMenuSelect = (selection: string) => {
    setSubMenuSelection(selection);
  };

  const renderSubMenuComponent = (selection: string) => {
    switch (selection) {
      case 'myClubs':
        return <AllMyClubs />;
      case 'unapprovedClubs':
        return <UnapprovedClubs />;
      case 'manageableClubs':
        return <ManageableClubs />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="md:flex items-center justify-between mt-5 relative z-10">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="flex space-x-4">
            <MyClubsSubMenu onSelect={handleSubMenuSelect} />
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
          <AddClubButton className="h-[2.5rem] w-[2.5rem] items-center justify-center hidden md:flex" />
        </div>
      </div>
      {renderSubMenuComponent(subMenuSelection)}
    </>
  );
}
