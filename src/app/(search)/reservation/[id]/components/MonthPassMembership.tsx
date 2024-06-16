import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';
import {
  seatListReservation,
  selectedSeatAllState,
  confirmedState,
  Rtab,
  infoMsgState,
  selectedSpaceAllState,
  spaceListReservation,
  mobileConfirmedState,
  searchRemainingState,
} from '@/app/(search)/atom/office';
import { DayPicker } from 'react-day-picker';
import { useEffect, useState } from 'react';
import { format, addMonths, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { SeatReservation, SpaceReservation } from '@/types/office/reservation';
import {
  mobileReservationLayoutState,
  showMobileTableState,
} from '@/app/(search)/atom/media';
import { useLineBreak } from '@/app/(search)/map/hooks/useLineBreak';
import { currentBuildingState, modalState } from '@/app/(search)/atom/search';
import API from '@/utils/axios';

interface MonthMembershipProps {
  seatType: string[];
  spaceType: string[];
}

export default function MonthPassMembership({
  seatType,
  spaceType,
}: MonthMembershipProps) {
  const [RTab, setRTab] = useRecoilState(Rtab);
  const infoMsg = useRecoilValue(infoMsgState);
  const [seatList, setSeatList] = useRecoilState(seatListReservation);
  const [spaceList, setSpaceList] = useRecoilState(spaceListReservation);
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const [modal, setModal] = useRecoilState(modalState);
  const [searchRemaining, setSearchRemaining] =
    useRecoilState(searchRemainingState);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(1);
  const content = `멤버십 구매 후 모든 지점에서 자율 좌석을 자유롭게 예약할 수 있습니다.`;
  const currentOffice = useRecoilValue(currentBuildingState);
  const spaceImages: Record<string, string> = {
    '미팅룸(4인)': '/svg/reservation/mettingRoom4.svg',
    '미팅룸(8인)': '/svg/reservation/mettingRoom8.svg',
    컨퍼런스룸: '/svg/reservation/seminar.svg',
    스튜디오: '/svg/reservation/studio.svg',
  };
  const id = currentOffice?.id;
  //좌석 조회
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      RTab === '좌석' &&
      selectedSeatAll?.type &&
      selectedSeatAll?.start_date
    ) {
      const fetchSeatData = async () => {
        try {
          const res = await API.get(
            `reservation/${id}?type=${selectedSeatAll?.type}&start=${selectedSeatAll?.start_date}&end=${selectedSeatAll?.end_date}`,
          );
          console.log('요청', res.data.data);
          setSearchRemaining(res.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchSeatData();
    }
  }, [RTab, id, selectedSeatAll, setSearchRemaining]);
  //공간 조회

  useEffect(() => {
    if (
      RTab === '공간' &&
      selectedSpaceAll?.type &&
      selectedSpaceAll?.start_date
    ) {
      const fetchSpaceData = async () => {
        try {
          const res = await API.get(
            `reservation/${id}?type=${selectedSpaceAll?.type}&start=${selectedSpaceAll?.start_date}&end=${selectedSpaceAll?.end_date}`,
          );
          console.log('지정좌석 공간요청', res.data.data);
          setSearchRemaining(res.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchSpaceData();
    }
  }, [RTab, id, selectedSpaceAll, setSearchRemaining]);
  // 지정좌석 예약
  const handleReservedReservationClick = () => {
    const st = seatList.length > 0 ? seatList[0].start_date : null;
    const end = seatList.length > 0 ? seatList[0].end_date : null;
    console.log('선택된 좌석', selectedSeatAll);
    const membership = {
      location: currentOffice?.location,
      type: '30일 패스',
      duration: null,
      start_date: st,
      end_date: end,
      price: 100000,
    };

    const seatReservations = seatList.map((seat) => ({
      type: '지정석',
      start_date: seat.start_date,
      start_time: '00:00',
      end_date: seat.end_date,
      end_time: '00:00',
      price: 20000,
      seat_id: seat.code,
    }));
    const fetchSeatReserved = async () => {
      try {
        const res = await API.post(`reservation/individual/${id}`, {
          membership,
          reservations: seatReservations,
        });
        console.log('dndpdpdpdfsdkjflsd우에에엥', res);
      } catch (error) {
        console.log('예약에러', error);
      }
    };
    fetchSeatReserved();
    setModal(true);
  };
  const handleSpaceReservedReservationClick = () => {
    const st = seatList.length > 0 ? seatList[0].start_date : null;
    const end = seatList.length > 0 ? seatList[0].end_date : null;
    console.log('선택된 좌석', selectedSeatAll);
    const membership = {
      location: currentOffice?.location,
      type: '30일 패스',
      duration: null,
      start_date: st,
      end_date: end,
      price: 100000,
    };

    const seatReservations = seatList.map((seat) => ({
      type: '지정석',
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
      end_date: space.start_date,
      end_time: space.end_time,
      price: 15000,
      seat_id: space.code,
    }));
    const all = [...seatReservations, ...spaceReservations];
    console.log('씻 레저베이션@@@@@@', seatReservations);
    const fetchSpaceReserved = async () => {
      try {
        const res = await API.post(`reservation/individual/${id}`, {
          membership,
          reservations: all,
        });
        console.log('dndpdpdpdfsdkjflsd우에에엥뿌뿌부', res);
      } catch (error) {
        console.log('예약에러', error);
      }
    };
    fetchSpaceReserved();
    setModal(true);
  };

  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
    const startDate = new Date();
    const endDate = format(addMonths(startDate, month), 'yyyy-MM-dd');
    setSelectedDate(startDate);
  };

  const handleDayClick = (day: Date) => {
    const endDate = addDays(day, selectedMonth! * 30);
    setSelectedDate(day);

    const newSelectedSeatAll: SeatReservation = {
      ...selectedSeatAll,
      start_date: format(day, 'yyyy-MM-dd', { locale: ko }),
      end_date: format(endDate, 'yyyy-MM-dd', { locale: ko }),
      type: '지정좌석', // DESIGNATED_SEAT("지정좌석"),
      code: selectedSeatAll?.code ?? '',
    };
    const newSelectedSpaceAll: SpaceReservation = {
      ...selectedSpaceAll,
      start_date: format(day, 'yyyy-MM-dd', { locale: ko }),
      end_date: format(endDate, 'yyyy-MM-dd', { locale: ko }),
      type: selectedSpaceAll?.type ?? '',
      code: selectedSpaceAll?.code ?? '',
      start_time: selectedSpaceAll?.start_time ?? '',
      end_time: selectedSpaceAll?.end_time ?? '',
    };

    setSelectedSeatAll(newSelectedSeatAll);
    setSelectedSpaceAll(newSelectedSpaceAll);
  };

  const removeReservation = (number: number) => {
    setSeatList(seatList.filter((_, index) => index !== number));
    setSpaceList(spaceList.filter((_, index) => index !== number));
  };
  const [showMobileTable, setShowMobileTable] =
    useRecoilState(showMobileTableState);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const mobileConfirm = useRecoilValue(mobileConfirmedState);
  const info = useLineBreak({ content });

  return (
    <>
      <div className="">
        {RTab === '좌석' && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="mb:text-sm md:text-lg font-bold mb-2">
              예약 기간을 선택하세요.
            </div>
            <div className="flex md:gap-2 mb:gap-1 mb:w-full md:w-full h-[6rem] flex-wrap mx-auto">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                (month, index) => (
                  <div
                    className="mb:w-[2.79617rem] mb:h-[2rem] md:w-[4.03125rem] md:h-[2.5rem]"
                    key={index}
                  >
                    <button
                      onClick={() => handleMonthClick(month)}
                      className={`w-full h-full  ${
                        selectedMonth === month
                          ? 'bg-blue-400 text-white  border-blue-500'
                          : 'bg-white text-[#171717] border-gray-300'
                      } rounded-lg md:text-sm mb:text-[0.75rem] font-normal md:p-[0.63rem]`}
                    >
                      {month}개월
                    </button>
                  </div>
                ),
              )}
            </div>
            {RTab === '좌석' ? (
              <DayPicker
                selected={selectedDate}
                locale={ko}
                onDayClick={handleDayClick}
                toMonth={addMonths(new Date(), selectedMonth ?? 0)}
                disabled={{
                  before: new Date(),
                  after: new Date(
                    new Date().setMonth(new Date().getMonth() + 1),
                  ),
                }}
              />
            ) : (
              <DayPicker
                locale={ko}
                onDayClick={handleDayClick}
                disabled={true}
              />
            )}

            {isMobile ? (
              <div className="hidden-desk w-full text-center my-4">
                <button
                  onClick={() => setShowMobileTable(true)}
                  className=" w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]"
                >
                  좌석 선택
                </button>
              </div>
            ) : null}

            {!selectedSeatAll?.start_date && (
              <p className="mb-4 text-[#6377E9] text-sm">
                시작 날짜를 선택하세요.
              </p>
            )}
            {seatList.length > 0 && (
              <>
                <div className="">
                  <div className="mb:text-sm md:text-lg font-bold mb-2">
                    예약 정보를 확인하세요
                  </div>
                  <div className="mb:text-[0.625rem] md:text-sm mb-4 mb:w-[17.5rem] md:w-[20.8125rem] text-[#8D8D9B]">
                    {info}
                  </div>
                  {seatList.map((seat, index) => (
                    <div
                      key={index}
                      className="mb:w-full md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
                    >
                      <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                        <div className="flex justify-start">
                          <div className="flex flex-col pr-4 border-r-2">
                            <div className="text-sm text-black font-normal">
                              {seat?.type}
                            </div>
                            <div className="font-bold text-lg text-black">
                              {seat?.code}
                            </div>
                          </div>
                          <div className="text-black font-normal pl-4">
                            {seat?.start_date}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {!isMobile ? (
                            <div className="">
                              <button
                                className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                                onClick={() => removeReservation(index)}
                              >
                                선택 취소
                              </button>
                            </div>
                          ) : (
                            <button
                              className="rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                              onClick={() => removeReservation(index)}
                            >
                              X
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex text-xs h-[2.25rem] items-center gap-2 my-4 justify-between">
                    <p>
                      미팅룸, 컨퍼런스 룸, 스튜디오 등 다양한 공간이
                      필요하신가요?
                    </p>
                    <div>
                      <button
                        onClick={() =>
                          selectedSeatAll?.start_date && setRTab('공간')
                        }
                        className="w-[9.875rem] h-[2.5rem] leading-6 p-2 bg-[#688AF2] text-[0.875rem] text-white rounded-lg"
                      >
                        공간 예약 하러 가기
                      </button>
                    </div>
                  </div>

                  {selectedSeatAll && (
                    <div className="py-4">
                      <div className="mb:text-sm md:text-lg font-bold mb-4">
                        결제 금액을 확인하세요
                      </div>
                      <div className="bg-white p-6 text-lg rounded-xl">
                        <div>
                          {seatList?.map((seat, index) => (
                            <p
                              key={index}
                              className="text-[#688AF2] text-[0.75rem] pb-2"
                            >
                              + {seat.type} 450,000원
                            </p>
                          ))}
                        </div>

                        <p className="border-b-2"></p>
                        <p className="pt-2 font-semibold">
                          총{' '}
                          {seatList.length * 20000 + spaceList.length * 15000}원
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {!isMobile ? (
                  <Link href="">
                    <div
                      className="flex justify-center items-center"
                      onClick={() => handleReservedReservationClick()}
                    >
                      <button className="left-0 bottom-0 right-0 w-[7.375rem] h-[3rem] font-normal text-xl leading bg-blue-400 px-6 py-3 mt-6 text-white rounded-md">
                        예약하기
                      </button>
                    </div>
                  </Link>
                ) : (
                  <Link href="">
                    <div
                      onClick={() => handleReservedReservationClick()}
                      className="flex justify-center items-center"
                    >
                      <button className="left-0 bottom-0 right-0 w-[5.5rem] h-[2.5rem] bg-blue-400  mt-6 text-white rounded-md">
                        예약하기
                      </button>
                    </div>
                  </Link>
                )}
              </>
            )}
          </div>
        )}
        {RTab === '공간' && (
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <p className="text-lg font-bold mb-4">
                이용할 날짜를 선택하세요.
              </p>
            </div>

            <DayPicker
              selected={selectedDate}
              locale={ko}
              onDayClick={handleDayClick}
              toMonth={addMonths(new Date(), selectedMonth ?? 0)}
              disabled={{
                before: new Date(),
                after: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              }}
            />
            <div className="flex flex-col">
              <div className="text-lg font-bold mb-4">
                공간 유형을 선택해주세요
              </div>
              <div className="flex gap-2 mb-4 justify-between">
                {spaceType.map((spaceStyle) => (
                  <div
                    key={spaceStyle}
                    onClick={() => {
                      setSelectedSpaceAll((prev) => ({
                        ...prev,
                        type: spaceStyle,
                      }));
                    }}
                    className={`mb:w-[4.125rem] mb:h-[4.6875rem] md:w-[6.29688rem] md:h-[7.75rem] flex flex-col justify-center items-center p-2 gap-2 rounded-lg ${
                      spaceStyle === selectedSpaceAll?.type
                        ? 'bg-blue-400 text-white'
                        : 'bg-white'
                    }`}
                  >
                    <Image
                      width={`${isMobile ? 44 : 64}`}
                      height={`${isMobile ? 44 : 64}`}
                      alt={`${spaceStyle}`}
                      src={spaceImages[spaceStyle]}
                    />
                    <p className="md:text-sm mb:text-[0.525rem] mb:font-bold">
                      {spaceStyle}
                    </p>
                  </div>
                ))}
              </div>
              {isMobile && (
                <div className="w-full text-center my-4">
                  <button
                    onClick={() => setShowMobileTable(true)}
                    className="w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]"
                  >
                    공간 선택
                  </button>
                </div>
              )}
              {seatList.length > 0 && (
                <>
                  <div>
                    <div className="mb:text-sm md:text-lg font-bold mb-4">
                      예약 정보를 확인하세요
                    </div>
                    {seatList.map((seat, index) => (
                      <div
                        key={index}
                        className="mb:w-full md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
                      >
                        <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                          <div className="flex justify-start">
                            <div className="flex flex-col pr-4 border-r-2">
                              <div className="text-sm text-black font-normal">
                                {seat?.type}
                              </div>
                              <div className="font-bold text-lg text-black">
                                {seat?.code}
                              </div>
                            </div>
                            <div className="text-black font-normal pl-4">
                              {seat?.start_date}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {!isMobile ? (
                              <div className="">
                                <button
                                  className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                                  onClick={() => removeReservation(index)}
                                >
                                  선택 취소
                                </button>
                              </div>
                            ) : (
                              <button
                                className="rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                                onClick={() => removeReservation(index)}
                              >
                                X
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {spaceList.map((space, index) => (
                      <div
                        key={index}
                        className="mb:w-full md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
                      >
                        <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                          <div className="flex justify-start">
                            <div className="flex flex-col pr-4 border-r-2">
                              <div className="text-sm text-black font-normal">
                                {space?.type}
                              </div>
                              <div className="font-bold text-lg text-black">
                                {space?.code}
                              </div>
                            </div>
                            <div className="text-black font-normal pl-4">
                              {space?.start_date}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {!isMobile ? (
                              <div className="">
                                <button
                                  className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                                  onClick={() => removeReservation(index)}
                                >
                                  선택 취소
                                </button>
                              </div>
                            ) : (
                              <button
                                className="rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                                onClick={() => removeReservation(index)}
                              >
                                X
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {!isMobile && (
                      <div className="mb-4">
                        {spaceList.length < 3 ? (
                          <p className="text-[#6377E9]">
                            오른쪽에서 공간 유형을 선택하세요
                          </p>
                        ) : (
                          <p> 최대 3개까지입니다. </p>
                        )}
                      </div>
                    )}
                    <div>
                      <div className="text-lg font-bold mb-4">
                        결제 금액을 확인하세요
                      </div>
                      <div>
                        <div className="p-2">
                          <div className="bg-white p-6 text-lg rounded-xl">
                            <div>
                              <p className="text-[#688AF2] text-[0.75rem] pb-2 font-semibold">
                                좌석 예약 정보
                              </p>
                              {seatList?.map((seat, index) => (
                                <p
                                  key={index}
                                  className="text-[#688AF2] text-[0.75rem] pb-2"
                                >
                                  + {seat.type} 20000원
                                </p>
                              ))}
                            </div>
                            <div>
                              <p className="text-[#688AF2] text-[0.75rem] pb-2 font-semibold">
                                공간 예약 정보
                              </p>
                              {spaceList?.map((space, index) => (
                                <p
                                  key={index}
                                  className="text-[#688AF2] text-[0.75rem] pb-2"
                                >
                                  + {space.type} 15000원
                                </p>
                              ))}
                            </div>
                            <p className="border-b-2"></p>
                            <p className="pt-2 font-semibold">
                              총{' '}
                              {seatList.length * 20000 +
                                spaceList.length * 15000}
                              원
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => handleSpaceReservedReservationClick()}
                      >
                        <div className="w-full text-center my-4">
                          <button className="w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]">
                            예약 하기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
