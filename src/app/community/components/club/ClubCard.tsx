import React, { useState } from 'react';
import Link from 'next/link';

export interface ClubCardProps {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  currentMembers: number;
  maxMembers: number;
  category: string;
  meetingDday: string;
  isHost?: boolean;
  isAdmin?: boolean;
  showCancelButton?: boolean;
  showManageButton?: boolean;
  clubId?: number; // 필수로 수정 예정
}

export default function ClubCard({
  title,
  description,
  imageUrl,
  location,
  currentMembers,
  maxMembers,
  category,
  meetingDday,
  isHost,
  isAdmin,
  showCancelButton,
  showManageButton,
  clubId,
}: ClubCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div>
      {/* 모바일 화면 */}
      <div
        className={`bg-white ${showCancelButton || showManageButton ? 'rounded-t-2xl' : 'rounded-2xl'} relative p-4 block md:hidden`}
      >
        <div className="overflow-hidden relative flex">
          <div className="w-24 h-24 relative mb:mr-3 mr-2 flex-shrink-0">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded-md"
            />
            {isHost && (
              <div className="h-[1.5rem] w-[1.5rem] absolute top-2 left-2 bg-yellow-600 p-[0.25rem] rounded-full z-10">
                <img src="/svg/club/crownIcon.svg" alt="Host Badge Icon" />
              </div>
            )}
            {isAdmin && !isHost && (
              <div className="h-[1.5rem] w-[1.5rem] absolute top-2 left-2 bg-main-blue p-[0.25rem] rounded-full z-10">
                <img src="/svg/club/crownIcon.svg" alt="Admin Badge Icon" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center pb-1">
              <h3 className="font-bold text-sm truncate ...">{title}</h3>
            </div>
            <p className="text-ellipsis overflow-hidden ... text-sm line-clamp-2">
              {description}
            </p>

            <div className="text-sm mt-2 flex gap-2">
              <div className="flex items-center">
                <img
                  src="/svg/club/locationIcon.svg"
                  alt="Location Icon"
                  className="mr-[.25rem] w-4"
                />
                <div className="font-bold">{location}</div>
              </div>
              <div className="flex items-center font-bold">
                <img
                  src="/svg/club/peoplesIcon.svg"
                  alt="Peoples Icon"
                  className="mr-[.25rem] w-4"
                />
                {currentMembers}/{maxMembers}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm mt-4 font-semibold">
          <div className="flex gap-4">
            <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
              {category}
            </div>
            <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
              모임 {meetingDday}
            </div>
          </div>
          <button onClick={handleBookmarkToggle} className="mr-2">
            <img
              src={
                isBookmarked
                  ? '/svg/club/bookmarkedHeart.svg'
                  : '/svg/club/unbookmarkedHeart.svg'
              }
              alt="Heart Icon"
              className="w-7 h-7"
            />
          </button>
        </div>
      </div>
      {showCancelButton && (
        <button className="w-full bg-red-cancel text-white py-[1.3rem] leading-none text-xl font-medium rounded-b-2xl md:hidden">
          신청 취소
        </button>
      )}
      {showManageButton && (
        <Link href={`/community/club/manage/${clubId}`}>
          <button className="w-full bg-blue-400 text-white py-[1.3rem] leading-none text-xl font-medium rounded-b-2xl md:hidden">
            관리하기
          </button>
        </Link>
      )}
      {/* PC 화면 */}
      <div
        className={`hidden md:block bg-white ${showCancelButton || showManageButton ? 'rounded-t-lg' : 'rounded-lg'} overflow-hidden relative`}
      >
        <div className="h-[22.4rem] relative">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover absolute inset-0 "
          />
          {isHost && (
            <div className="h-[3rem] w-[3rem] absolute top-2 left-2 bg-yellow-600 p-2 rounded-full z-10">
              <img src="/svg/club/crownIcon.svg" alt="Host Badge Icon" />
            </div>
          )}
          {isAdmin && !isHost && (
            <div className="h-[3rem] w-[3rem] absolute top-2 left-2 bg-main-blue p-2 rounded-full z-10">
              <img src="/svg/club/crownIcon.svg" alt="Admin Badge Icon" />
            </div>
          )}
          <div className="absolute bottom-0 w-full p-4 bg-white backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={handleBookmarkToggle}>
                <img
                  src={
                    isBookmarked
                      ? '/svg/club/bookmarkedHeart.svg'
                      : '/svg/club/unbookmarkedHeart.svg'
                  }
                  alt="Heart Icon"
                  className="w-6 h-6"
                />
              </button>
            </div>
            <p className="mt-2 overflow-hidden overflow-ellipsis">
              {description}
            </p>
            <div className="text-sm mt-2 flex gap-4">
              <div className="flex items-center">
                <img
                  src="/svg/club/locationIcon.svg"
                  alt="Location Icon"
                  className="mr-1"
                />
                <div>{location}</div>
              </div>
              <div className="flex items-center">
                <img
                  src="/svg/club/peoplesIcon.svg"
                  alt="Peoples Icon"
                  className="mr-1"
                />
                {currentMembers}/{maxMembers}
              </div>
            </div>
            <div className="flex justify-between items-center text-sm mt-2 font-semibold">
              <div className="flex gap-4">
                <div className="bg-yellow-600 p-[0.5rem] rounded">
                  {category}
                </div>
                <div className="bg-yellow-600 p-[0.5rem] rounded">
                  모임 {meetingDday}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCancelButton && (
        <button className="w-full bg-red-cancel text-white py-[1.3rem] leading-none text-xl rounded-b-lg font-medium hidden md:block">
          신청 취소
        </button>
      )}
      {showManageButton && (
        <Link href={`/community/club/manage/${clubId}`}>
          <button className="w-full bg-blue-400 text-white py-[1.3rem] leading-none text-xl rounded-b-lg font-medium hidden md:block">
            관리하기
          </button>
        </Link>
      )}
    </div>
  );
}
