'use client';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  selectedMembershipId,
  useMembershipState,
  selectedOfficeId,
} from '../../atom/membership';
import API from '@/utils/axios';
import { useRouter } from 'next/navigation';

export default function MyMembership() {
  const [useMembership, setUserMembership] = useRecoilState(useMembershipState);
  const setMembershipId = useSetRecoilState(selectedMembershipId);
  const [officeId, setOfficeId] = useRecoilState(selectedOfficeId);
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
  const router = useRouter();

  const handleGoClick = (membershipId: number, officeId: number) => {
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
  return (
    <div>
      {useMembership.map((membershiip, i) => (
        <div
          key={i}
          className="flex flex-col justify-center gap-5 bg-white rounded-xl mb-10 w-[50%] p-4"
        >
          <h1 className="text-2xl font-bold">채서영님 반갑습니다.</h1>
          <div>
            <button className="p-1 inline-block bg-black text-white rounded-2xl">
              {membershiip.location}
            </button>
          </div>
          <p className="text-xl font-bold">{membershiip.type} 사용중</p>

          <p>
            이용기간
            {membershiip.start_date} ~ {membershiip.end_date}
          </p>
          <p>sdf: {membershiip.member_id}</p>
          {membershiip.type === '기업 전용' && (
            <>
              <p>Staff Count: {membershiip.staff_count}</p>
              <p>Member ID: {membershiip.member_id}</p>
              <p>Company ID: {membershiip.company_id}</p>
            </>
          )}

          <div className="flex gap-4">
            <button
              onClick={() =>
                handleGoClick(membershiip.id, membershiip.office_id)
              }
              className="w-full bg-blue-300 rounded-lg p-2 text-white text-lg"
            >
              예약 내역 및 수정
            </button>

            <button
              onClick={() =>
                handleReservationAddClick(membershiip.id, membershiip.office_id)
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
