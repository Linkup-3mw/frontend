import {
  mobileReservationLayoutState,
  showMobileTableState,
} from '@/app/(search)/atom/media';
import {
  confirmModalState,
  rsInfoState,
  selectedMembershipId,
  selectedOfficeId,
  userUpdateRlistPutState,
  yesOrNoState,
} from '@/app/(search)/atom/membership';
import {
  confirmedState,
  searchRemainingState,
  selectedSeatAllState,
} from '@/app/(search)/atom/office';
import { modalState } from '@/app/(search)/atom/search';
import ConfirmModal from '@/app/(search)/map/components/Loader/ConfirmModal';
import { SeatReservation } from '@/types/office/reservation';
import API from '@/utils/axios';
import { addDays, addMonths, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function ReservedList({ seatTypes }: { seatTypes: string[] }) {
  const [showMobileTable, setShowMobileTable] =
    useRecoilState(showMobileTableState);
  const [rsInfo, setRsInfo] = useRecoilState(rsInfoState);
  const [searchRemaining, setSearchRemaining] =
    useRecoilState(searchRemainingState);
  const [confirmModal, setConfirmModal] = useRecoilState(confirmModalState);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const officeId = useRecoilValue(selectedOfficeId);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const yesOrNo = useRecoilValue(yesOrNoState);

  const seatImages: Record<string, string> = {
    오픈데스크: '/svg/reservation/opendesk.svg',
    포커스데스크: '/svg/reservation/focusdesk.svg',
    '1인실': '/svg/reservation/oneroom.svg',
    모니터데스크: '/svg/reservation/monitordesk.svg',
  };
  const [seatReservationList, setSeatReservationList] = useRecoilState(
    userUpdateRlistPutState,
  );
  const [mid, setMid] = useState<number | null>(null);

  const removeUpdateReservation = () => {
    setSelectedSeatAll(null);
  };

  useEffect(() => {
    if (rsInfo?.seat_type === '지정좌석') {
      handleSeatStyleClick(rsInfo.seat_type);
    }
  }, [rsInfo]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const parts = currentUrl.split('/');
      const lastPart = parts[parts.length - 1];
      const parsedMid = parseInt(lastPart);
      setMid(parsedMid);
    }
  }, []);

  const handleSeatStyleClick = async (seatStyle: string) => {
    setSeatReservationList(true);

    const fetchSeatReservationListData = async () => {
      try {
        const res = await API.get(
          `reservation/${officeId}?type=${seatStyle}&start=${rsInfo?.start_date}&end=${rsInfo?.end_date}`,
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

  const fetchSeatReservationUpdate = async () => {
    setConfirmModal(true);
    if (!mid) return;

    if (yesOrNo) {
      const updateMembership = {
        type: rsInfo?.type,
        start_date: rsInfo?.start_date,
        start_time: rsInfo?.start_time,
        end_date: rsInfo?.end_date,
        end_time: rsInfo?.end_time,
        price: null,
        seat_id: selectedSeatAll?.code,
      };

      try {
        console.log('seatID', rsInfo?.id);
        console.log('updateMembership,', updateMembership);
        const res = await API.put(
          `reservation/individual/my-membership/${mid}/reservation/${rsInfo?.id}`,
          updateMembership,
        );
        console.log(
          'SeatReservationList에서의  풋풋풋풋풋풋 요청',
          res.data.data,
        );
        setSearchRemaining(res.data.data);
      } catch (error) {
        console.error('Error updating seat reservation:', error);
      }
    } else {
    }
  };

  // useEffect(() => {

  // }, [confirm]);

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    const formattedDate = format(day, 'yyyy-MM-dd');

    const newSelectedSeatAll: SeatReservation = {
      start_date: formattedDate,
      end_date: format(addDays(day, 1), 'yyyy-MM-dd'),
      type: selectedSeatAll?.type ?? '',
      code: selectedSeatAll?.code ?? '',
    };

    setSelectedSeatAll(newSelectedSeatAll);
  };

  const today = {
    today: {
      color: 'white',
      backgroundColor: '#007bff',
      borderRadius: '50%',
    },
  };

  return (
    <div className="flex md:flex-col items-center ">
      <div className="flex flex-col gap-4 justify-start h-48px w-full mx-auto">
        <p className="mt-5 text-xl font-bold text-black">지정 좌석 변경</p>
        <p className="text-lg font-bold text-black">
          기존 예약 정보를 확인하세요.
        </p>
        <div className="bg-white h-auto mb-4 rounded-lg cursor-pointer">
          <div className="p-4 flex justify-start mx-auto">
            <div className="flex flex-col pr-4 border-r-2">
              <div className="text-black font-normal">{rsInfo?.seat_type}</div>
              <div className="font-bold text-lg text-black">
                {rsInfo?.seat_code}
              </div>
            </div>
            <div className="text-black font-normal pl-4">
              {rsInfo?.start_date}
            </div>
          </div>
        </div>
        <div className="leading-4">
          <p className="text-lg font-bold text-black">
            변경할 날짜를 선택하세요.
          </p>
          <p className="text-gray-300 text-xs">
            선택한 날짜부터 좌석이 변경됩니다.
          </p>
        </div>
        <DayPicker
          selected={selectedDate}
          locale={ko}
          onDayClick={handleDayClick}
          modifiers={{ today: new Date() }}
          modifiersStyles={today}
          disabled={{
            before: new Date(),
            after: addMonths(new Date(), 1),
          }}
        />
        <div className="flex flex-col mb-4 justify-between">
          <div className="flex w-full">
            {rsInfo?.seat_type !== '지정좌석' &&
              seatTypes.map((seatStyle) => (
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
                    width={isMobile ? 44 : 64}
                    height={isMobile ? 44 : 64}
                    alt={seatStyle}
                    src={seatImages[seatStyle]}
                  />
                  <p className="md:text-sm mb:text-[0.525rem] mb:font-bold">
                    {seatStyle}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {selectedSeatAll && confirm && (
          <>
            <div>
              <p>수정하신 예약 정보를 확인해주세요.</p>
            </div>
            <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between bg-white rounded-2xl">
              <div className="pr-4 border-gray-300 flex">
                <div className="pr-4 border-r-2">
                  <p className="mb:text-sm md:text-[1rem] md:leading-7 mb:leading-5">
                    {selectedSeatAll?.type}
                  </p>
                  <p className="mb:text-[0.875rem] md:text-[1.25rem] font-bold">
                    {selectedSeatAll?.code}
                  </p>
                </div>
                <div className="pl-4 md:font-normal md:text-lg mb:text-sm">
                  <p>{selectedSeatAll?.start_date}</p>
                </div>
              </div>
              <div className="flex items-center">
                {isMobile ? (
                  <button
                    className="rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                    onClick={() => removeUpdateReservation()}
                  >
                    X
                  </button>
                ) : (
                  <button
                    className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                    onClick={() => removeUpdateReservation()}
                  >
                    선택 취소
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        <div
          onClick={() => setShowMobileTable(true)}
          className="hidden-desk w-full text-center my-4"
        >
          <button className=" w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]">
            좌석 선택
          </button>
        </div>
      </div>
    </div>
  );
}
