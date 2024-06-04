import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex-1 mx-3 items-center shrink-0">
      {session ? (
        <>
          <div className="h-6 w-6 border border-[#45AD56] rounded-full overflow-hidden">
            {session.user.profile_image ? (
              <img
                src={session.user.profile_image}
                alt={`${session.user.name} 프로필 이미지`}
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src="svg/header/profileDefault.svg"
                alt="Profile Default"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex mx-2 font-bold text-sm md:text-base">
            {session?.user.name} 님
          </div>
        </>
      ) : (
        <Link href="/signin" className="flex mx-2 font-bold items-center">
          <span className="whitespace-nowrap">로그인 하기</span>
        </Link>
      )}
    </div>
  );
}
