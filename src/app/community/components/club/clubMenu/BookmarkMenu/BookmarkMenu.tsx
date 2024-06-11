import CategoryDropdown from '@components/club/CategoryDropdown';
import AddClubButton from '@components/club/common/AddClubButton';
import SearchInput from '@components/club/SearchInput';
import { useEffect, useState } from 'react';
import API from '@/utils/axios';
import { ClubCardProps } from '@/app/api/club/fetchClubs';

export default function BookmarkMenu() {
  const [clubs, setClubs] = useState<ClubCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarkClubsData = async (categories: string[] = []) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      categories.forEach((category) => params.append('category', category));

      console.log('Fetching clubs with params:', params.toString());

      const response = await API.get(`/club/authenticated/search`, { params });
      const data = response.data;
      console.log('API Response:', data);

      const fetchedClubs = data.data.content.map((club: any) => ({
        id: club.id,
        member_id: club.member_id,
        member_name: club.member_name,
        profile_image: club.profile_image,
        title: club.title,
        introduction: club.introduction,
        detail_introduction: club.detail_introduction,
        club_thumbnail: club.thumbnail,
        club_type: club.club_type,
        recruit_count: club.recruit_count,
        club_members: club.club_members,
        club_meetings: club.club_meetings
          ? club.club_meetings.map((meeting: any) => ({
              ...meeting,
              dateDiff: calculateDateDiff(meeting.date),
            }))
          : [],
        liked: club.liked,
      }));
      const likedClubs: ClubCardProps[] = fetchedClubs.filter(
        (club: ClubCardProps) => club.liked,
      );

      setClubs(likedClubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (selectedCategories: string[]) => {
    await fetchBookmarkClubsData(selectedCategories);
  };

  useEffect(() => {
    fetchBookmarkClubsData();
  }, []);

  function calculateDateDiff(meetingDate: string): string {
    const meetingDateTime = new Date(meetingDate).getTime();
    const currentDateTime = new Date().getTime();
    const diffInMilliseconds = meetingDateTime - currentDateTime;
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return '오늘';
    } else if (diffInDays > 0) {
      return `모임 D-${diffInDays}`;
    } else {
      return `일정 없음`;
    }
  }

  return (
    <>
      <div className="md:flex items-center justify-between mt-5 relative z-10">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="flex md:space-x-4 space-x-2">
            <CategoryDropdown onSearch={handleSearch} />
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[2rem] gap-4 md:mt-8 mt-4">
          {clubs.map((club) => (
            <div key={club.id}>
              {/* 모바일 화면 */}
              <div
                className={`bg-white rounded-2xl relative p-4 block md:hidden`}
              >
                <div className="overflow-hidden relative flex">
                  <div className="w-24 h-24 relative mb:mr-3 mr-2 flex-shrink-0">
                    <img
                      src="/images/club/example.jpg"
                      alt={club.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center pb-1">
                      <h3 className="font-bold text-sm truncate">
                        {club.title}
                      </h3>
                    </div>
                    <p className="text-ellipsis overflow-hidden text-xs line-clamp-2">
                      {club.introduction}
                    </p>
                    <div className="text-xs mt-2 flex gap-2">
                      <div className="flex items-center font-bold">
                        <img
                          src="/svg/club/peoplesIcon.svg"
                          alt="Peoples Icon"
                          className="mr-[.25rem] w-4"
                        />
                        {club.club_members?.length || 0}/{club.recruit_count}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs mt-4 font-semibold">
                  <div className="flex gap-4">
                    <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
                      {club.club_type}
                    </div>
                    {club.club_meetings.length > 0 && (
                      <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
                        {calculateDateDiff(club.club_meetings[0].date)}
                      </div>
                    )}
                  </div>
                  <button className="mr-2">
                    <img
                      src={'/svg/club/bookmarkedHeart.svg'}
                      alt="Heart Icon"
                      className="w-7 h-7"
                    />
                  </button>
                </div>
              </div>
              {/* PC 화면 */}
              <div
                className={`hidden md:block bg-white rounded-lg overflow-hidden relative`}
              >
                <div className="h-[22.4rem] relative">
                  <img
                    src="/images/club/example.jpg"
                    alt={club.title}
                    className="object-cover absolute inset-0 "
                  />
                  <div className="absolute bottom-0 w-full p-4 bg-white backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold"> {club.title}</h3>
                      <button>
                        <img
                          src={'/svg/club/bookmarkedHeart.svg'}
                          alt="Heart Icon"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                    <p className="mt-2 overflow-hidden overflow-ellipsis">
                      {club.introduction}
                    </p>
                    <div className="text-xs mt-2 flex gap-4">
                      <div className="flex items-center">
                        <img
                          src="/svg/club/peoplesIcon.svg"
                          alt="Peoples Icon"
                          className="mr-1"
                        />
                        {club.club_members?.length || 0}/{club.recruit_count}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-2 font-semibold">
                      <div className="flex gap-4">
                        <div className="bg-yellow-600 p-[0.5rem] rounded">
                          {club.club_type}
                        </div>
                        {club.club_meetings.length > 0 && (
                          <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
                            {calculateDateDiff(club.club_meetings[0].date)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
