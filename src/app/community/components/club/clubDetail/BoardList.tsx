'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { useClubBoardListQuery } from '@/hooks/useClubDetail';
import { clubUserTypeState } from '@/app/community/atoms/clubDetail';
import { BlackRightArrow } from '@/app/common/components/icons/BlackArrow';
import CircleLoader from '@/app/common/components/frame/CircleLoader';
import BoardCard from './BoardCard';
import NoDataMessage from './NoDataMessage';
import Alert from '@/app/common/components/modal/Alert';

interface Props {
  type: string;
  clubId: number;
}

export default function BoardList({ clubId, type }: Props) {
  const router = useRouter();
  const [userType] = useRecoilState(clubUserTypeState);
  const { data, isPending } = useClubBoardListQuery(clubId, type);
  const queryClient = useQueryClient();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  // const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // console.log(data);

  // useEffect(() => {
  //   //페이지 이탈 시 캐시 삭제
  //   return () => {
  //     queryClient.removeQueries({ queryKey: ['clubBoardList', clubId, type] });
  //   };
  // }, [clubId, queryClient]);

  const handleNonMemberListclick = () => {
    // 여기서 멤버십 여부에 따라 다른 알림을 띄우기

    setAlertMsg('상세 내용은 모임 가입 후 확인 가능합니다.');
    setShowAlert(true);
  };

  // useEffect(() => {
  //   const io = new IntersectionObserver((entries) => {
  //     entries.forEach(async (entry) => {
  //       if (entry.isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     });
  //   });
  //   if (loadMoreRef.current) io.observe(loadMoreRef.current);

  //   return () => io.disconnect();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (isPending) {
    return <CircleLoader />;
  }

  if (userType === 'NONE_MEMBER' || userType === 'VISITOR') {
    return (
      <>
        {data?.content.length === 0 ? (
          <NoDataMessage />
        ) : (
          <>
            <div className="overflow-y-auto mt-[1.5rem] h-[calc(100%_-_6.9rem)]  max-md:mt-0 max-md:h-full max-md:overflow-y-visible">
              <ul className="px-[2.5rem] max-md:px-[1rem]">
                {data?.content.map(({ id, title }) => (
                  <li
                    className="flex items-center justify-between gap-[0.5rem] h-[4.5rem] border-b-[1.5px] border-blue-100 max-md:h-[3.5rem] cursor-pointer"
                    key={'noneMember' + id}
                    onClick={handleNonMemberListclick}
                  >
                    <b className="flex-grow text-[1rem] dot_three  max-md:px-[0.5rem] max-md:text-[0.75rem]">
                      {title}
                    </b>
                    <button className="flex-shrink-0">
                      <BlackRightArrow />
                      <span className="hide">더보기</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {showAlert && <Alert message={alertMsg} setIsShow={setShowAlert} />}
          </>
        )}
      </>
    );
  }

  return (
    <>
      {data?.content.length === 0 ? (
        <NoDataMessage />
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-[1.5rem] px-[2.5rem] max-md:px-[1rem] max-md:grid-cols-1 max-md:gap-[1rem]">
            {/* <BoardCard isDetail /> */}
            {data?.content.map((item) => (
              <BoardCard
                key={'member' + item.id}
                boardContent={item}
                onClick={() =>
                  router.push(
                    `/community/club/${clubId}/${type}/detail?post=${item.id}`,
                  )
                }
              />
            ))}
          </ul>
          {/* <span
            ref={loadMoreRef}
            className={`${hasNextPage ? 'block' : 'hidden'} text-red`}
          >
            loading...
          </span> */}
        </>
      )}
    </>
  );
}
