'use client';
import React, { useState } from 'react';
import ContentWrap from '@common/components/frame/ContentWrap';
import Dropdown from '@/app/community/components/club/PlaceDropdown';
import MenuButtons from '@components/club/MenuButtons';
import CategoryDropdown from '@components/club/CategoryDropdown';
import TeamExclusionButton from '@components/club/TeamExclusionButton';
import SearchInput from '@components/club/SearchInput';
import ClubCard from '@components/club/ClubCard';
import Pagination from '@components/club/Pagination';

export default function Club() {
  const dropdownOptions = ['이용 지점', '주변 지점', '전체 지점'];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [menuSelection, setMenuSelection] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleMenuSelect = (value: string) => {
    setMenuSelection(value);
  };

  const hotClubs = [
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
  ];

  const allClubs = [
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[15] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[16] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[24] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[25] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
    {
      title: '[무비앤톡] 리브 더 월드 비하인드',
      description:
        '이번주 영화는 <리브더월드 비하인드>입니다 클럽회원분이 아니셔도 신청 가능합니다 !',
      imageUrl: '/images/club/example.jpg',
      location: '역삼 2호점',
      currentMembers: 5,
      maxMembers: 12,
      category: '미디어 관람',
      meetingDday: 'D-7',
    },
  ];

  // 페이지네이션 관련 코드
  const indexOfLastClub = currentPage * itemsPerPage;
  const indexOfFirstClub = indexOfLastClub - itemsPerPage;
  const currentClubs = allClubs.slice(indexOfFirstClub, indexOfLastClub);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="pt-[1.25rem] pb-[1.19rem] px-[1.25rem]">
      <ContentWrap>
        <div className="bg-blue-50 rounded-2xl p-[2rem] relative z-10">
          <div className="relative z-20">
            <Dropdown
              options={dropdownOptions}
              selectedOption={selectedOption}
              onSelect={handleOptionSelect}
            />
          </div>
          {/* 전체, 찜, 내 소모임 */}
          <MenuButtons
            menuSelection={menuSelection}
            handleMenuSelect={handleMenuSelect}
          />

          <div className="flex items-center justify-between mt-5 relative z-10">
            <div className="flex items-center space-x-4">
              <CategoryDropdown />
              <TeamExclusionButton />
            </div>
            <div className="flex items-center space-x-4">
              <SearchInput />
              <button className="bg-blue-400 text-white px-4 py-2 rounded-full">
                +
              </button>
            </div>
          </div>

          <div className="font-semibold text-2xl mt-8">
            이 달의 인기 소모임!
          </div>
          <div className="grid grid-cols-4 gap-[2.5rem] mt-8">
            {hotClubs.map((club, index) => (
              <ClubCard
                key={index}
                title={club.title}
                description={club.description}
                imageUrl={club.imageUrl}
                location={club.location}
                currentMembers={club.currentMembers}
                maxMembers={club.maxMembers}
                category={club.category}
                meetingDday={club.meetingDday}
              />
            ))}
          </div>

          <div className="font-semibold text-2xl mt-8">전체 소모임</div>
          <div className="grid grid-cols-4 gap-[2.5rem] mt-8">
            {currentClubs.map((club, index) => (
              <ClubCard
                key={index}
                title={club.title}
                description={club.description}
                imageUrl={club.imageUrl}
                location={club.location}
                currentMembers={club.currentMembers}
                maxMembers={club.maxMembers}
                category={club.category}
                meetingDday={club.meetingDday}
              />
            ))}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={allClubs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </ContentWrap>
    </div>
  );
}
