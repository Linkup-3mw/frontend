import React, { useState } from 'react';

interface ClubCardProps {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  currentMembers: number;
  maxMembers: number;
  category: string;
  meetingDday: string;
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
}: ClubCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[22.4rem] relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full object-cover absolute inset-0"
      />
      <div className="absolute bottom-0 w-full p-4 p-4 bg-white backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
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
        <p className="mt-2 overflow-hidden overflow-ellipsis">{description}</p>
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
  );
}
