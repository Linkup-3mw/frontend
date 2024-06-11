import CategoryDropdown from '@components/club/CategoryDropdown';
import AddClubButton from '@components/club/common/AddClubButton';
import SearchInput from '@components/club/SearchInput';
import RenderClubs from '../../RenderClubs';
import { bookmarkedClubs } from '@/app/community/data/clubs';

export default function BookmarkMenu() {
  return (
    <>
      <div className="md:flex items-center justify-between mt-5 relative z-10">
        <div className="flex items-center mb-4 md:mb-0">
          <CategoryDropdown />
          <AddClubButton className="md:hidden h-[2rem] w-[2rem] ml-auto leading-none" />
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
      <div>
        <RenderClubs
          clubs={bookmarkedClubs}
          totalItems={bookmarkedClubs.length}
          showPagination={true}
        />
      </div>
    </>
  );
}
