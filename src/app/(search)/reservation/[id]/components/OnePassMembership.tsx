import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';
import {
  seatListReservation,
  selectedSeatAllState,
  confirmedState,
  Rtab,
  selectedSpaceAllState,
  spaceListReservation,
  mobileConfirmedState,
  searchRemainingState,
} from '@/app/(search)/atom/office';
import { DayPicker } from 'react-day-picker';
import { addDays, format, formatDate, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { SpaceReservation } from '@/types/office/reservation';
import { useEffect, useState } from 'react';
import {
  mobileReservationLayoutState,
  showMobileTableState,
} from '@/app/(search)/atom/media';
import { useLineBreak } from '@/app/(search)/map/hooks/useLineBreak';
import API from '@/utils/axios';
import { currentBuildingState, modalState } from '@/app/(search)/atom/search';
import Reservation from '../page';

interface OnePassMembershipProps {
  seatType: string[];
  spaceType: string[];
  params?: { code: string };
}

interface SeatReservation {
  type: string;
  start_date?: string;
  end_date?: string;
  code?: string;
}

export default function OnePassMembership({
  seatType,
  spaceType,
  params = { code: '' },
}: OnePassMembershipProps) {
  const [RTab, setRTab] = useRecoilState(Rtab);
  const [seatList, setSeatList] = useRecoilState(seatListReservation);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [spaceList, setSpaceList] = useRecoilState(spaceListReservation);
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const mobileConfirm = useRecoilValue(mobileConfirmedState);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const currentOffice = useRecoilValue(currentBuildingState);
  const [searchRemaining, setSearchRemaining] =
    useRecoilState(searchRemainingState);
  const [modal, setModal] = useRecoilState(modalState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const content = `예약을 추가하려면 위에서 날짜와 좌석 유형을 선택해 주세요.
당일권은 최대 5개까지 예약할 수 있습니다.`;

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setSelectedSeatAll({});
    const formmatedDate = format(day, 'yyyy-MM-dd');

    const newSelectedSeatAll: SeatReservation = {
      start_date: formmatedDate,
      end_date: format(addDays(day, 1), 'yyyy-MM-dd'),
      type: selectedSeatAll?.type ?? '',
      code: selectedSeatAll?.code ?? '',
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
    setSelectedSeatAll(null);
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
  const seatImages: Record<string, string> = {
    오픈데스크: '/svg/reservation/opendesk.svg',
    포커스데스크: '/svg/reservation/focusdesk.svg',
    '1인실': '/svg/reservation/oneroom.svg',
    모니터데스크: '/svg/reservation/monitordesk.svg',
  };
  const spaceImages: Record<string, string> = {
    '미팅룸(4인)': '/svg/reservation/mettingRoom4.svg',
    '미팅룸(8인)': '/svg/reservation/mettingRoom8.svg',
    컨퍼런스룸: '/svg/reservation/seminar.svg',
    스튜디오: '/svg/reservation/studio.svg',
  };
  const today = {
    today: {
      color: 'white',
      backgroundColor: '#007bff',
      borderRadius: '50%',
    },
  };
  const info = useLineBreak({ content });
  const id = currentOffice?.id;
  //좌석 조회
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
  useEffect(() => {
    if (
      RTab === '좌석' &&
      selectedSeatAll?.type &&
      selectedSeatAll?.start_date
    ) {
      fetchSeatData();
    }
  }, [selectedSeatAll]);
  // 공간 조회
  const fetchSpaceData = async () => {
    try {
      const res = await API.get(
        `reservation/${id}?type=${selectedSpaceAll?.type}&start=${selectedSpaceAll?.start_date}&end=${selectedSpaceAll?.end_date}`,
      );
      console.log('요청', res.data.data);
      setSearchRemaining(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (
      RTab === '공간' &&
      selectedSpaceAll?.type &&
      selectedSpaceAll?.start_date
    ) {
      fetchSpaceData();
    }
  }, [selectedSpaceAll]);
  // 좌석 예약
  const handleSeatReservationClick = () => {
    const st = seatList.length > 0 ? seatList[0].start_date : null;
    const membership = {
      location: currentOffice?.location,
      type: '1일 패스',
      duration: null,
      start_date: st,
      end_date: format(addDays(st!, 2), 'yyyy-MM-dd'),
      price: 20000,
    };
    const seatReservations = seatList.map((seat) => ({
      type: '자율 좌석',
      start_date: seat.start_date,
      start_time: '00:00',
      end_date: seat.end_date,
      end_time: '00:00',
      price: 20000,
      seat_id: seat.code,
    }));
    console.log('sdfsdfds', seatReservations);
    const fetchSeatReservation = async () => {
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
    fetchSeatReservation();
    setModal(true);
  };

  // 공간 예약
  const handleSpaceReservationClick = () => {
    // setShowMobileTable(true);
    const st = seatList.length > 0 ? seatList[0].start_date : null;
    const membership = {
      location: currentOffice?.location,
      type: '1일 패스',
      duration: null,
      start_date: st,
      end_date: format(addDays(st!, 2), 'yyyy-MM-dd'),
      price: 20000,
    };
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
      end_date: st,
      end_time: space.end_time,
      price: 15000,
      seat_id: space.code,
    }));
    const all = [...seatReservations, ...spaceReservations];

    console.log('이시발', { membership, all });
    const fetchSpaceReservation = async () => {
      try {
        const res = await API.post(`reservation/individual/${id}`, {
          membership,
          reservations: all,
        });
        console.log('dndpdpdpdfsdkjflsd우에에엥', res);
      } catch (error) {
        console.log('예약에러', error);
      }
    };
    fetchSpaceReservation();
    setModal(true);
  };

  return (
    <>
      <div className="flex flex-col gap-6 mb-6">
        {RTab === '좌석' ? (
          <>
            {/* TODO오늘날짜표시하기 */}
            <DayPicker
              selected={selectedDate}
              locale={ko}
              onDayClick={handleDayClick}
              modifiers={{ today: new Date() }}
              modifiersStyles={today}
              disabled={{
                before: new Date(),
                after: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              }}
            />
          </>
        ) : (
          <>
            {/* TODO오늘날짜표시하기 */}
            <DayPicker
              locale={ko}
              onDayClick={handleDayClick}
              disabled={true}
            />
          </>
        )}
        <div className="text-[#6377E9]">{errorMessage}</div>
        {RTab === '좌석' && (
          <div>
            <div className="mb:text-[0.875rem] md:text-lg font-bold mb-4">
              좌석 유형을 선택해주세요
            </div>

            <div className="flex mb-4 justify-between">
              {seatType.map((seatStyle) => (
                <div
                  key={seatStyle}
                  onClick={() => {
                    if (selectedSeatAll) {
                      setErrorMessage(null);
                      setSelectedSeatAll((prev) => ({
                        ...prev,
                        type: seatStyle,
                      }));
                    } else if (!selectedDate) {
                      setErrorMessage('날짜를 선택하세요.');
                    }
                  }}
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

            {isMobile ? (
              <div className="w-full text-center my-4 hidden-desk">
                <button
                  onClick={() => setShowMobileTable(true)}
                  className="w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]"
                >
                  좌석 선택
                </button>
              </div>
            ) : null}

            <div className="">
              {selectedSeatAll?.start_date && !selectedSeatAll.code ? (
                <p className="mb-4 text-[#6377E9]">
                  오른쪽에서 좌석을 선택하세요.
                </p>
              ) : (
                <p className="mb-4 text-[#6377E9]">
                  최대 5개까지 예약할 수 있습니다.
                </p>
              )}
            </div>

            {seatList.length > 0 && (
              <>
                <div className="">
                  <div className="mb:text-sm md:text-lg font-bold mb-4">
                    예약 정보를 확인하세요
                  </div>
                  <div className="mb:text-[0.625rem] md:text-sm mb-4 mb:w-full md:w-[20.8125rem] text-[#8D8D9B]">
                    {info}
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
                  {(mobileConfirm || confirm) && (
                    <div className="flex text-xs h-[2.25rem] items-center gap-2 my-4 justify-between">
                      <p>
                        미팅룸, 컨퍼런스 룸, 스튜디오 등 다양한 공간이
                        필요하신가요?
                      </p>
                      <div>
                        <button
                          onClick={() => setRTab('공간')}
                          className="w-[9.875rem] h-[2.5rem] leading-6 p-2 bg-[#688AF2] text-[0.875rem] text-white rounded-lg"
                        >
                          공간 예약 하러 가기
                        </button>
                      </div>
                    </div>
                  )}

                  {(seatList || selectedSeatAll) && (
                    <div className="py-4">
                      <p className="mb:text-sm md:text-lg font-bold mb-4">
                        결제 금액을 확인하세요
                      </p>
                      <div>
                        <div className="p-2">
                          <div className="bg-white md:p-6 mb:p-4 mb:text-sm md:text-lg rounded-xl">
                            <div>
                              {seatList?.map((seat, index) => (
                                <p
                                  key={index}
                                  className="text-[#688AF2] mb:text-[0.625rem] md:text-[0.75rem] md:pb-2 mb:pb-1"
                                >
                                  + {seat.type} 20000원
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
                    </div>
                  )}
                </div>
                {!isMobile ? (
                  <Link href="">
                    <div
                      className="flex justify-center items-center"
                      onClick={() => handleSeatReservationClick()}
                    >
                      <button className="left-0 bottom-0 right-0 w-[7.375rem] h-[3rem] font-normal text-xl leading bg-blue-400 px-6 py-3 mt-6 text-white rounded-md">
                        예약하기
                      </button>
                    </div>
                  </Link>
                ) : (
                  <Link href="">
                    <div
                      onClick={() => handleSeatReservationClick()}
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
          <div>
            <div className="mb:text-[0.875rem] md:text-lg font-bold mb-4">
              공간 유형을 선택해주세요
            </div>
            <div className="flex mb-4 justify-between">
              {spaceType.map((spaceStyle) => (
                <div
                  key={spaceStyle}
                  onClick={() => {
                    setSelectedSpaceAll((prev) => ({
                      ...prev,
                      type: spaceStyle,
                    }));
                  }}
                  className={`mb:w-full mr-2 mb:h-auto md:w-[6.29688rem] md:h-[7.75rem] flex flex-col justify-center items-center p-2 gap-2 rounded-lg ${
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
                  <p className="md:text-sm mb:text-xs mb:font-bold">
                    {spaceStyle}
                  </p>
                </div>
              ))}
            </div>
            {isMobile ? (
              <div className="w-full text-center my-4 hidden-desk">
                <button
                  onClick={() => setShowMobileTable(true)}
                  className="w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]"
                >
                  공간 선택
                </button>
              </div>
            ) : null}

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
                  {spaceList.map((space, index) => (
                    <div
                      key={index}
                      className="mb:w-full md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
                    >
                      <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                        <div className="pr-4 border-gray-300 flex">
                          <div className="pr-4 border-r-2 ">
                            <p className="mb:text-sm md:text-[1rem] md:leading-7 mb:leading-5">
                              {space.type}
                            </p>
                            <p className="mb:text-[0.875rem] md:text-[1.25rem] font-bold ">
                              {space.code}
                            </p>
                          </div>
                          <div className="pl-4 md:font-normal md:text-lg mb:text-sm">
                            <p>{space.start_date}</p>
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
                  <div className="mb-4">
                    {spaceList.length < 3 ? (
                      <p className="text-[#6377E9]">
                        오른쪽에서 공간 유형을 선택하세요
                      </p>
                    ) : (
                      <p> 최대 3개까지입니다. </p>
                    )}
                  </div>
                  <div>
                    <div className="mb:text-sm md:text-lg font-bold mb-4 mt-4">
                      결제 금액을 확인하세요
                    </div>
                    <div>
                      <div className="p-2">
                        <div className="bg-white md:p-6 mb:p-4 mb:text-sm md:text-lg rounded-xl">
                          <div>
                            <p className="text-[#688AF2] mb:text-[0.625rem] md:text-[0.75rem] md:pb-2 mb:pb-1">
                              좌석 예약 정보
                            </p>
                            {seatList?.map((seat, index) => (
                              <p
                                key={index}
                                className="text-[#688AF2] text-[0.75rem] pb-2 pl-2"
                              >
                                + {seat.type} 20000원
                              </p>
                            ))}
                          </div>
                          <div>
                            <p className="text-[#688AF2] mb:text-[0.625rem] md:text-[0.75rem] md:pb-2 mb:pb-1">
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
                            {seatList.length * 20000 + spaceList.length * 15000}
                            원
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* 얜 뭐엿더리  */}
                    <div className="flex justify-center items-center">
                      <div className="w-full text-center my-4">
                        <button
                          onClick={() => handleSpaceReservationClick()}
                          className="w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]"
                        >
                          예약 하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
