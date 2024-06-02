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
  clubId?: number; // 필수로 수정 에정
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
    <div className="bg-white rounded-lg overflow-hidden relative">
      <div className="h-[22.4rem] relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover absolute inset-0"
        />
        {isHost && (
          <div className="absolute top-2 left-2 bg-yellow-600 p-2 rounded-full z-10">
            <img src="/svg/club/crownIcon.svg" alt="Host Badge Icon" />
          </div>
        )}
        {isAdmin && !isHost && (
          <div className="absolute top-2 left-2 bg-main-blue p-2 rounded-full z-10">
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
          <div className="flex gap-4 items-center text-sm mt-2 font-semibold">
            <div className="bg-yellow-600 p-[0.5rem] rounded">{category}</div>
            <div className="bg-yellow-600 p-[0.5rem] rounded">
              모임 {meetingDday}
            </div>
          </div>
        </div>
      </div>
      {showCancelButton && (
        <button className="w-full bg-red-cancel text-white py-[1.3rem] leading-none text-xl font-medium">
          신청 취소
        </button>
      )}
      {showManageButton && (
        <Link href={`/community/club/manage/${clubId}`}>
          <button className="w-full bg-blue-400 text-white py-[1.3rem] leading-none text-xl font-medium">
            관리하기
          </button>
        </Link>
      )}
    </div>
  );
}
