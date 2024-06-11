'use client';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Rtab,
  selectedSeatAllState,
  MembershipChoose,
  selectedSpaceAllState,
  seatListReservation,
  spaceListReservation,
} from '@/app/(search)/atom/office';
import { Membership } from '@/types/office/reservation';
import Image from 'next/image';
import OnePassMembership from './OnePassMembership';
import MonthPassMembership from './MonthPassMembership';
import EnterPriseMembership from './EnterPriseMembership';

export default function ReservationInfo() {
  const [RTab, setRTab] = useRecoilState(Rtab);
  const [membershipChoose, setMembershipChoose] =
    useRecoilState(MembershipChoose);

  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );

  const seatTypes = ['오픈테이블', '포커스데스크', '1인실', '모니터 데스크'];
  const spaceTypes = ['회의실 (4인)', '회의실 (8인)', '세미나실', '스튜디오'];
  const seatList = useSetRecoilState(seatListReservation);
  const spaceList = useSetRecoilState(spaceListReservation);

  const memberships: Membership[] = [
    {
      type: '1일 패스',
      description: ['1개 지점 자율 좌석'],
      price: 20000,
      duration: 1,
    },
    {
      type: '30일 패스',
      description: ['1개 지점 지정 좌석', '1전 지점 자율 좌석'],
      price: 200000,
      duration: 30,
    },
    {
      type: '기업 전용 멤버십',
      description: [
        '기업 전용 지정 좌석',
        '전 지점 자율 좌석',
        '회의실 예약 크레딧 제공',
      ],
      price: 1000000,
      duration: null,
    },
  ];
  // useEffect(() => {
  //   seatList([]);
  //   spaceList([]);
  // }, [membershipChoose]);

  const RenderMembershipUI = (membership: Membership) => {
    switch (membership.type) {
      case '1일 패스':
        return (
          <OnePassMembership seatType={seatTypes} spaceType={spaceTypes} />
        );
      case '30일 패스':
        return (
          <MonthPassMembership seatType={seatTypes} spaceType={spaceTypes} />
        );
      case '기업 전용 멤버십':
        return (
          <EnterPriseMembership seatType={seatTypes} spaceType={spaceTypes} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col  bg-[#E4EEFF] md:px-8 md:w-[30.6875rem] mb:w-[90%] mb:px-4  overflow-y-scroll scrollbar-hide rounded-3xl pt-4 h-[51.25rem]">
      <div className="h-[48px] text-[20px] font-bold mt-3 text-gray-300 cursor-pointer">
        <div className="flex justify-start items-center h-[48px] w-full mx-auto">
          <div className="h-[40px] w-[122.5px] text-center">
            <div
              className={`${
                RTab === '좌석'
                  ? 'leading-10 text-black border-b-2 border-gray-500'
                  : 'leading-10 text-gray-300'
              }`}
              onClick={() => setRTab('좌석')}
            >
              좌석
            </div>
          </div>
          <div className="h-[40px] w-[122.5px] text-center">
            <div
              className={`${
                RTab === '공간'
                  ? 'leading-10 text-black border-b-2 border-gray-500'
                  : 'leading-10 text-gray-300'
              }`}
              onClick={() => {
                if (selectedSeatAll) setRTab('공간');
              }}
            >
              공간
            </div>
          </div>
        </div>
      </div>
      <>
        {RTab === '좌석' ? (
          <div className="mt-4">
            {memberships.map((membership) => (
              <div
                key={membership.type}
                className={`mb:w-full mb:h-[7.5rem] md:h-[10rem] md:w-[26.6875rem] mb-2 grid grid-cols-2 items-center rounded-2xl cursor-pointer
                ${
                  membershipChoose?.type === membership.type
                    ? 'bg-[#688AF2]'
                    : 'bg-white'
                }
              `}
                onClick={() => setMembershipChoose(membership)}
              >
                <div className="flex flex-col justify-start w-[15.75rem] h-[8rem] p-4">
                  <p
                    className={`md:text-[1.25rem] mb:text-[0.875rem] font-bold mb-3 ${
                      membershipChoose?.type === membership.type
                        ? 'text-white'
                        : 'text-black'
                    }`}
                  >
                    {membership.type}
                  </p>
                  <div className="flex flex-col ">
                    {membership.description.map((des, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Image
                          src="/svg/reservation/check.svg"
                          width={12}
                          height={12}
                          alt="체크표시"
                        />
                        <p
                          className={`md:text-sm mb:text-[0.625rem] leading-4 ${
                            membershipChoose?.type === membership.type
                              ? 'text-white'
                              : 'text-black'
                          }`}
                        >
                          {des}
                        </p>
                      </div>
                    ))}
                    <div className="p-2  flex-end">
                      {membership.type !== '기업 전용 멤버십' && (
                        <p
                          className={`md:text-sm mb:text-[0.625rem] ${
                            membershipChoose?.type === membership.type
                              ? 'text-white'
                              : 'text-black'
                          }`}
                        >
                          이용기간 {membership.duration} 일
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-1 rounded-xl p-4">
                  <p
                    className={`md:text-[1.25rem] mb:text-[0.875rem]  text-center font-bold mb-3 ${
                      membershipChoose?.type === membership.type
                        ? 'text-white'
                        : 'text-black'
                    }`}
                  >
                    {membership.price}
                  </p>
                </div>
              </div>
            ))}
            {membershipChoose ? (
              RenderMembershipUI(membershipChoose)
            ) : (
              <div>멤버십을 선택해주세요.</div>
            )}
          </div>
        ) : (
          <div className="mt-4">
            {membershipChoose ? (
              RenderMembershipUI(membershipChoose)
            ) : (
              <div>멤버십을 선택해주세요.</div>
            )}
          </div>
        )}
      </>
    </div>
  );
}
