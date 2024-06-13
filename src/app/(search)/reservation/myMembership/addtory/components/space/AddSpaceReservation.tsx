'use client';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DayPicker } from 'react-day-picker';
import Image from 'next/image';
import {
  rsInfoState,
  selectedMembershipId,
  selectedOfficeId,
} from '@/app/(search)/atom/membership';
import {
  selectedSeatAllState,
  seatListReservation,
  spaceListReservation,
  searchRemainingState,
  selectedSpaceAllState,
  mobileConfirmedState,
  confirmedState,
  Rtab,
} from '@/app/(search)/atom/office';
import {
  mobileReservationLayoutState,
  showMobileTableState,
} from '@/app/(search)/atom/media';
import API from '@/utils/axios';
import { SeatReservation, SpaceReservation } from '@/types/office/reservation';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { modalState } from '@/app/(search)/atom/search';

export default function AddSeatReservation() {
  const [reservationInfo, setReservationInfo] = useRecoilState(rsInfoState);
  const office_Id = useRecoilValue(selectedOfficeId);
  const [seatList, setSeatList] = useRecoilState(seatListReservation);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [spaceList, setSpaceList] = useRecoilState(spaceListReservation);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const [modal, setModal] = useRecoilState(modalState);
  const mobileConfirm = useRecoilValue(mobileConfirmedState);
  const [searchRemaining, setSearchRemaining] =
    useRecoilState(searchRemainingState);
  const [isMobile, setIsMobile] = useRecoilState(mobileReservationLayoutState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [RTab, setRTab] = useRecoilState(Rtab);
  const MembershipId = useRecoilValue(selectedMembershipId);
  const setShowMobileTable = useSetRecoilState(showMobileTableState);
  const spaceTypes = ['미팅룸(4인)', '미팅룸(8인)', '컨퍼런스룸', '스튜디오'];
  const spaceImages: Record<string, string> = {
    '미팅룸(4인)': '/svg/reservation/mettingRoom4.svg',
    '미팅룸(8인)': '/svg/reservation/mettingRoom8.svg',
    컨퍼런스룸: '/svg/reservation/seminar.svg',
    스튜디오: '/svg/reservation/studio.svg',
  };
  const removeReservation = (number: number) => {
    setSeatList(seatList.filter((_, index) => index !== number));
  };
  //예약하기 버튼 누를때
  const handleSpaceReservationClick = async () => {
    const st = seatList.length > 0 ? seatList[0].start_date : null;

    const seatReservations = seatList.map((seat) => ({
      type: '자율 좌석',
      start_date: seat.start_date,
      start_time: '00:00',
      end_date: seat.end_date,
      end_time: '00:00',
      price: 20000,
      seat_id: seat.code,
    }));
    const spaceReservations = spaceList.map((space) => ({
      type: '공간',
      start_date: space.start_date,
      start_time: space.start_time,
      end_date: space.end_date,
      end_time: space.end_time,
      price: 20000,
      seat_id: space.code,
    }));
    const allAdd = [...seatReservations, ...spaceReservations];
    // 주소창에서 멤버십 번호 가져오기
    console.log('sdfsdfds', seatReservations);
    const fetchSeatReservation = async () => {
      try {
        const res = await API.post(
          `reservation/individual/my-membership/${MembershipId}`,
          allAdd,
        );

        console.log('dndpdpdpdfsdkjflsd우에에엥', res);
      } catch (error) {
        console.log('예약에러', error);
      }
    };
    fetchSeatReservation();
    setModal(true);
  };
  // 공간 탭에서
  const handleSpaceStyleClick = async (spaceStyle: string) => {
    console.log('우쒸발', spaceStyle);
    console.log('officeId', office_Id);
    console.log('selectedSpaceAll', selectedSpaceAll?.start_date);
    console.log('selectedSpaceAll', selectedSpaceAll?.end_date);
    try {
      const res = await API.get(
        `reservation/${office_Id}?type=${spaceStyle}&start=${selectedSpaceAll?.start_date}&end=${selectedSpaceAll?.end_date}`,
      );
      setSearchRemaining(res.data.data);
      console.log('성공?');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    // setSelectedSeatAll({});

    const formmatedDate = format(day, 'yyyy-MM-dd');

    const newSelectedSeatAll: SeatReservation = {
      start_date: formmatedDate,
      end_date: format(addDays(day, 1), 'yyyy-MM-dd'),
      type: selectedSpaceAll?.type ?? '',
      code: selectedSpaceAll?.code ?? '',
    };

    const newSelectedSpaceAll: SpaceReservation = {
      ...selectedSpaceAll,
      start_date: formmatedDate,
      end_date: formmatedDate,
      type: selectedSpaceAll?.type ?? '',
      code: selectedSpaceAll?.code ?? '',
      start_time: selectedSpaceAll?.start_time ?? '',
      end_time: selectedSpaceAll?.end_time ?? '',
    };

    setSelectedSpaceAll(newSelectedSpaceAll);
    console.log('확인용', selectedSpaceAll);
  };
  const today = {
    today: {
      color: 'white',
      backgroundColor: '#007bff',
      borderRadius: '50%',
    },
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold text-black">
          이용할 날짜를 선택하세요.
        </p>
        <div>
          멤버십 이용 기간 : {reservationInfo?.start_date} -{' '}
          {reservationInfo?.end_date}
        </div>
      </div>
      <DayPicker locale={ko} onDayClick={handleDayClick} disabled={true} />
      <div className="text-[#6377E9]">{errorMessage}</div>
      <p className="text-lg font-bold text-black">좌석 유형을 선택하세요.</p>
      <div className="flex flex-col mb-4 justify-between">
        <div className="flex w-full">
          {spaceTypes.map((spaceStyle) => (
            <div
              key={spaceStyle}
              onClick={() => {
                setErrorMessage(null);
                setSelectedSpaceAll((prev) => ({
                  ...prev,
                  start_date: selectedSeatAll?.start_date,
                  end_date: selectedSeatAll?.end_date,
                  type: spaceStyle,
                }));
                handleSpaceStyleClick(spaceStyle);
              }}
              className={`mb:w-full mr-2 mb:h-auto md:w-[6.29688rem] md:h-[7.75rem] flex flex-col justify-center items-center p-2 gap-2 rounded-lg ${
                spaceStyle === selectedSpaceAll?.type
                  ? 'bg-blue-400 text-white'
                  : 'bg-white'
              }`}
            >
              <Image
                width={isMobile ? 44 : 64}
                height={isMobile ? 44 : 64}
                alt={spaceStyle}
                src={spaceImages[spaceStyle]}
              />
              <p className="md:text-sm mb:text-[0.525rem] mb:font-bold">
                {spaceStyle}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-hidden w-full text-center my-4">
        <button
          disabled={!selectedSeatAll?.start_date || !selectedSeatAll.type}
          onClick={() => setShowMobileTable(true)}
          className={`${
            selectedSeatAll?.start_date && selectedSeatAll?.type
              ? 'w-[5.5rem] h-[2.5rem]  bg-blue-400 text-white rounded-lg leading-[1.375rem]'
              : 'w-[5.5rem] h-[2.5rem]  bg-gray-400 text-main-black rounded-lg leading-[1.375rem]'
          } `}
        >
          좌석 선택
        </button>
      </div>
      {spaceList.length > 0 && (
        <div className="">
          <div className="">
            <p className="mb:text-sm md:text-lg font-bold mb-2">
              예약 정보를 확인하세요
            </p>
            <p className="text-gray-400">
              예약을 추가하려면 위에서 날짜와 좌석 유형을 선택해 주세요.
            </p>
          </div>
          <div className="mb:text-[0.625rem] md:text-sm mb-4 mb:w-full md:w-[20.8125rem] text-[#8D8D9B]">
            {/* info 를 여기에 정의해야 할 것 같습니다 */}
          </div>
          {seatList.map((seat, index) => (
            <div
              key={index}
              className="mb:w-full md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
            >
              <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                <div className="pr-4 border-gray-300 flex">
                  <div className="pr-4 border-r-2 ">
                    <p className="mb:text-sm md:text-[1rem] md:leading-7 mb:leading-5">
                      {seat.type}
                    </p>
                    <p className="mb:text-[0.875rem] md:text-[1.25rem] font-bold ">
                      {seat.code}
                    </p>
                  </div>
                  <div className="pl-4 md:font-normal md:text-lg mb:text-sm">
                    <p>{seat.start_date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {isMobile ? (
                    <button
                      className="rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                      onClick={() => removeReservation(index)}
                    >
                      X
                    </button>
                  ) : (
                    <button
                      className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                      onClick={() => removeReservation(index)}
                    >
                      선택 취소
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {spaceList.map((seat, index) => (
            <div
              key={index}
              className="mb:w-full md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
            >
              <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                <div className="pr-4 border-gray-300 flex">
                  <div className="pr-4 border-r-2 ">
                    <p className="mb:text-sm md:text-[1rem] md:leading-7 mb:leading-5">
                      {seat.type}
                    </p>
                    <p className="mb:text-[0.875rem] md:text-[1.25rem] font-bold ">
                      {seat.code}
                    </p>
                  </div>
                  <div className="pl-4 md:font-normal md:text-lg mb:text-sm">
                    <p>{seat.start_date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {isMobile ? (
                    <button
                      className="rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                      onClick={() => removeReservation(index)}
                    >
                      X
                    </button>
                  ) : (
                    <button
                      className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                      onClick={() => removeReservation(index)}
                    >
                      선택 취소
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {(mobileConfirm || confirm) && (
            <div className="flex text-xs h-[2.25rem] items-center gap-2 my-4 justify-between">
              <p>
                미팅룸, 컨퍼런스 룸, 스튜디오 등 다양한 공간이 필요하신가요?
              </p>
              <div>
                <button
                  onClick={() => selectedSeatAll?.start_date && setRTab('공간')}
                  className="w-[9.875rem] h-[2.5rem] leading-6 p-2 bg-[#688AF2] text-[0.875rem] text-white rounded-lg"
                >
                  공간 예약 하러 가기
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-full text-center my-4">
          {spaceList.length > 0 && (
            <button
              onClick={() => handleSpaceReservationClick()}
              className="w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]"
            >
              예약 하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
