'use client';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  selectedMembershipId,
  useMembershipState,
  selectedOfficeId,
  isEnterState,
} from '../../atom/membership';
import API from '@/utils/axios';
import { useRouter } from 'next/navigation';

export default function MyMembership() {
  const [useMembership, setUserMembership] = useRecoilState(useMembershipState);
  const setMembershipId = useSetRecoilState(selectedMembershipId);
  const [officeId, setOfficeId] = useRecoilState(selectedOfficeId);
  const [isEnter, setIsEnter] = useRecoilState(isEnterState);
  const router = useRouter();

  //처음 들어올때 조회
  const fetchAllMembershipData = async () => {
    try {
      const res = await API.get('reservation/my-membership');
      console.log('멤버십조회 res', res.data.data);
      setUserMembership(res.data.data);
    } catch (error) {
      console.error('allmymembership req error', error);
    }
  };

  useEffect(() => {
    fetchAllMembershipData();
  }, []);

  useEffect(() => {
    const isCorporateMembership = useMembership.some(
      (membership) => membership.type === '기업 멤버십',
    );
    setIsEnter(isCorporateMembership);
  }, [useMembership, setIsEnter]);

  const handleGoClick = (membershipId: number, officeId: number) => {
    setOfficeId(officeId);
    router.push(`/reservation/myMembership/resertory/${membershipId}`);
    setMembershipId(membershipId);
  };
  const handleReservationAddClick = (
    membershipId: number,
    office_id: number,
  ) => {
    console.log('membershipId', membershipId); //
    //잔여좌석 조회할때 쓸 오피스아이디
    setOfficeId(office_id);
    console.log(officeId);
    router.push(`/reservation/myMembership/addtory/${membershipId}`);
    setMembershipId(membershipId);
  };

  // 기업일때
  const handleEnterGoClick = (membershipId: number, officeId: number) => {
    router.push(`/reservation/myMembership/enterResertory/${membershipId}`);
    setMembershipId(membershipId);
    setOfficeId(officeId);
  };
  const handleEnterReservationAddClick = (
    membershipId: number,
    office_id: number,
  ) => {
    console.log('membershipId', membershipId); //
    //잔여좌석 조회할때 쓸 오피스아이디
    setOfficeId(office_id);
    console.log(officeId);
    router.push(
      `/reservation/myMembership/enterResertory/addEntertory/${membershipId}`,
    );
    setMembershipId(membershipId);
  };
  // 기업 전용 멤버십 필터링
  const corporateMemberships = useMembership.filter(
    (membership) => membership.type === '기업 멤버십',
  );

  return (
    <div>
      {corporateMemberships.map((membership, i) => (
        <div
          key={i}
          className="flex flex-col justify-center gap-5 bg-white rounded-xl mb-10 w-[50%] p-4"
        >
          <h1 className="text-2xl font-bold">채서영님 반갑습니다.</h1>
          <div>
            <button className="p-1 inline-block bg-black text-white rounded-2xl">
              {membership.location}
            </button>
          </div>
          <p className="text-xl font-bold">{membership.type} 사용중</p>

          <p>
            이용기간
            {membership.start_date} ~ {membership.end_date}
          </p>
          <p>sdf: {membership.member_id}</p>
          {isEnter && (
            <>
              <p>Staff Count: {membership.staff_count}</p>
              <p>Member ID: {membership.member_id}</p>
              <p>Company ID: {membership.company_id}</p>
              <div> 기업기업 </div>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    handleEnterGoClick(membership.id, membership.office_id)
                  }
                  className="w-full bg-blue-300 rounded-lg p-2 text-white text-lg"
                >
                  기업 예약 멤버십 수정
                </button>

                <button
                  onClick={() =>
                    handleEnterReservationAddClick(
                      membership.id,
                      membership.office_id,
                    )
                  }
                  className="w-full bg-blue-300 rounded-lg p-2 text-white text-lg"
                >
                  기업 예약 추가
                </button>
              </div>
            </>
          )}
          {!isEnter && (
            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleGoClick(membership.id, membership.office_id)
                }
                className="w-full bg-blue-300 rounded-lg p-2 text-white text-lg"
              >
                예약 내역 및 수정
              </button>

              <button
                onClick={() =>
                  handleReservationAddClick(membership.id, membership.office_id)
                }
                className="w-full bg-blue-300 rounded-lg p-2 text-white text-lg"
              >
                예약 추가
              </button>
            </div>
          )}
        </div>
      ))}

      {/* 기업 전용 멤버십이 아닌 경우 */}
      {useMembership
        .filter((membership) => membership.type !== '기업 멤버십')
        .map((membership, i) => (
          <div
            key={i}
            className="flex flex-col justify-center gap-5 bg-white rounded-xl mb-10 w-[50%] p-4"
          >
            <h1 className="text-2xl font-bold">채서영님 반갑습니다.</h1>
            <div>
              <button className="p-1 inline-block bg-black text-white rounded-2xl">
                {membership.location}
              </button>
            </div>
            <p className="text-xl font-bold">{membership.type} 사용중</p>

            <p>
              이용기간
              {membership.start_date} ~ {membership.end_date}
            </p>
            <p>sdf: {membership.member_id}</p>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleGoClick(membership.id, membership.office_id)
                }
                className="w-full bg-blue-300 rounded-lg p-2 text-white text-lg"
              >
                예약 내역 및 수정
              </button>

              <button
                onClick={() =>
                  handleReservationAddClick(membership.id, membership.office_id)
                }
                className="w-full bg-blue-300 rounded-lg p-2 text-white text-lg"
              >
                예약 추가
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
