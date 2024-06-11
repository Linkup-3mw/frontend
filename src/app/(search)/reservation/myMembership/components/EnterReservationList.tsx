import { mobileReservationLayoutState } from '@/app/(search)/atom/media';
import {
  rsInfoState,
  selectedMembershipId,
  userUpdateRlistPutState,
} from '@/app/(search)/atom/membership';
import {
  confirmedState,
  searchRemainingState,
  selectedSeatAllState,
} from '@/app/(search)/atom/office';
import API from '@/utils/axios';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function EnterReservationList({
  seatTypes,
}: {
  seatTypes: string[];
}) {
  const [rsInfo, setRsInfo] = useRecoilState(rsInfoState);
  const [searchRemaining, setSearchRemaining] =
    useRecoilState(searchRemainingState);
  // const mid = useRecoilValue(selectedMembershipId);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const currentUrl = window.location.href;
  const parts = currentUrl.split('/');
  const lastPart = parts[parts.length - 1];
  const mid = parseInt(lastPart);
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const seatImages: Record<string, string> = {
    오픈데스크: '/svg/reservation/opendesk.svg',
    포커스데스크: '/svg/reservation/focusdesk.svg',
    '1인실': '/svg/reservation/oneroom.svg',
    모니터데스크: '/svg/reservation/monitordesk.svg',
  };
  const [seatReservationList, setSeatReservationList] = useRecoilState(
    userUpdateRlistPutState,
  );
  const handleSeatStyleClick = async (seatStyle: string) => {
    setSeatReservationList(true);
    const office_id = rsInfo?.id;
    console.log('seatreservation에서 오피스아이디', office_id);
    const fetchSeatReservationListData = async () => {
      try {
        const res = await API.get(
          `reservation/${office_id}?type=${seatStyle}&start=${rsInfo?.start_date}&end=${rsInfo?.end_date}`,
        );
        console.log('SeatReservationList에서의 요청', res.data.data);
        setSearchRemaining(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    setErrorMessage(null);
    setSelectedSeatAll((prev) => ({
      ...prev,
      type: seatStyle,
      start_date: rsInfo?.start_date,
      end_date: rsInfo?.end_date,
    }));

    fetchSeatReservationListData();
  };
  console.log('dldidkdkdkdkdk이야아아아ㅏ아아앙', selectedSeatAll?.code);
  console.log('왜그래', confirm);

  const fetchSeatReservationUpdate = async () => {
    const updateMembership = {
      type: rsInfo?.type,
      start_date: rsInfo?.start_date,
      start_time: rsInfo?.start_time,
      end_time: rsInfo?.end_date,
      prise: null,
      seat_id: selectedSeatAll?.code,
    };

    try {
      console.log('seatID', rsInfo?.id);
      const res = await API.put(
        `reservation/individual/my-membership/${mid}/reservation/${rsInfo?.id}`,
        updateMembership,
      );
      console.log('SeatReservationList에서의 요청', res.data.data);
      setSearchRemaining(res.data.data);
    } catch (error) {
      console.error('Error updating seat reservation:', error);
    }
  };
  if (confirm) {
    fetchSeatReservationUpdate();
    setConfirm(false);
  }

  return (
    <div>
      <div className="h-48px text-20px font-bold mt-3 text-gray-300 cursor-pointer">
        <div className="flex flex-col gap-4 justify-start h-48px w-full mx-auto">
          <p className="text-xl font-bold text-black">자율 좌석 변경</p>

          <p className="text-lg font-bold text-black">
            기존 예약 정보를 확인하세요.
          </p>
          <div className="bg-white w-full h-auto mb-4 rounded-lg cursor-pointer">
            <div className="p-4 flex justify-start">
              <div className="flex flex-col pr-4 border-r-2">
                <div className="text-black font-normal">
                  {rsInfo?.seat_type}
                </div>
                <div className="font-bold text-lg text-black">
                  {rsInfo?.seat_code}
                </div>
              </div>
              <div className="text-black font-normal pl-4">
                {rsInfo?.start_date}
              </div>
            </div>
          </div>
          <p className="text-lg font-bold text-black">
            좌석 유형을 선택하세요.
          </p>
          <div className="flex flex-col mb-4 justify-between">
            <div className="flex w-full">
              {seatTypes.map((seatStyle) => (
                <div
                  key={seatStyle}
                  onClick={() => handleSeatStyleClick(seatStyle)}
                  className={`mb:w-full mr-2 mb:h-auto md:w-[6.29688rem] md:h-[7.75rem] flex flex-col justify-center items-center p-2 gap-2 rounded-lg ${
                    seatStyle === selectedSeatAll?.type
                      ? 'bg-blue-400 text-white'
                      : 'bg-white'
                  }`}
                >
                  <Image
                    width={`${isMobile ? 44 : 64}`}
                    height={`${isMobile ? 44 : 64}`}
                    alt={`${seatStyle}`}
                    src={seatImages[seatStyle]}
                  />
                  <p className="md:text-sm mb:text-[0.525rem] mb:font-bold">
                    {seatStyle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
