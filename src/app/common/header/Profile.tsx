import Link from 'next/link';

export default function Profile({ session, loading }: any) {
  if (loading) {
    return <div className="flex items-center shrink-0 mr-4"></div>;
  }

  return (
    <div className="flex items-center shrink-0 mr-4">
      {session ? (
        <>
          <div className="md:h-6 md:w-6 h-5 w-5 border border-[#45AD56] rounded-full overflow-hidden">
            {session.user.profile_image ? (
              <img
                src={session.user.profile_image}
                alt={`${session.user.name} 프로필 이미지`}
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src="/svg/header/profileDefault.svg"
                alt="Profile Default"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex md:mx-2 mx-[0.44rem] font-bold md:text-base text-xs">
            {session?.user.name} 님
          </div>
        </>
      ) : (
        <Link href="/signin" className="flex font-bold items-center">
          <span className="whitespace-nowrap md:text-base text-xs">
            로그인 하기
          </span>
        </Link>
      )}
    </div>
  );
}
