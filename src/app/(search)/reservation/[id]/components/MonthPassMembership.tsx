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
} from '@/app/(search)/atom/office';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';
import { format, addMonths, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { SeatReservation, SpaceReservation } from '@/types/office/reservation';
import {
  mobileReservationLayoutState,
  showMobileTableState,
} from '@/app/(search)/atom/media';
import { useLineBreak } from '@/app/(search)/map/hooks/useLineBreak';

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(1);
  const content = `멤버십 구매 후 모든 지점에서 자율 좌석을 자유롭게 예약할 수 있습니다.`;

  const spaceImages: Record<string, string> = {
    '회의실 (4인)': '/svg/reservation/mettingRoom4.svg',
    '회의실 (8인)': '/svg/reservation/mettingRoom8.svg',
    세미나실: '/svg/reservation/seminar.svg',
    스튜디오: '/svg/reservation/studio.svg',
  };

  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
    const startDate = new Date();
    const endDate = addMonths(startDate, month);
    setSelectedDate(startDate);
  };

  const handleDayClick = (day: Date) => {
    const endDate = addDays(day, selectedMonth! * 30);
    setSelectedDate(day);

    const newSelectedSeatAll: SeatReservation = {
      ...selectedSeatAll,
      start_date: format(day, 'yyyy-MM-dd', { locale: ko }),
      end_date: format(endDate, 'yyyy-MM-dd', { locale: ko }),
      type: '지정 좌석',
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
  const mobileConfirm = useRecoilValue(mobileConfirmedState);
  const info = useLineBreak({ content });

  return (
    <>
      <div className="">
        {RTab === '좌석' && (
          <div className="flex flex-col gap-3 mt-6">
            <div className="mb:text-sm md:text-lg font-bold mb-2">
              예약 기간을 선택하세요.
            </div>
            <div className="flex mb:gap-[2px] md:gap-2 mb:w-[18rem] md:w-[26.6875rem] h-[6rem] flex-wrap">
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
                          ? 'bg-blue-400 text-white border-2 border-blue-500'
                          : 'bg-white border-2 text-[#171717] border-gray-300'
                      } rounded-lg md:text-sm mb:text-[0.75rem] font-normal md:p-[0.63rem] border-1 border-gray-300 border-solid`}
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
                      className="mb:w-[18rem] md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
                    >
                      <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                        <div className="pr-4 border-gray-300 flex">
                          <div className="pr-4 border-r-2">
                            <p className="mb:text-[0.75rem]  md:text-[1rem] md:leading-7 mb:leading-5">
                              {seat.type}
                            </p>
                            <p className="mb:text-[0.875rem] md:text-[1.25rem] font-bold ">
                              {seat.code}
                            </p>
                          </div>
                          <div className="pl-4 md:font-normal md:text-lg mb:text-[0.25rem] mb:leading-5 md:leading-7">
                            <p>{seat.start_date} ~ </p>
                            <p> {seat.end_date}</p>
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
                  ))}{' '}
                  {mobileConfirm && (
                    <div className="hidden-desk w-full flex h-[2.25rem] text-[0.625rem] gap-2 mt-2 mb-4 leading-4 border-4">
                      <p className="h-[1.4375rem] w-[11.1875rem] border-4">
                        미팅룸, 컨퍼런스 룸, 스튜디오 등 필요하신가요?
                      </p>
                      <div>
                        <button
                          onClick={() => setRTab('공간')}
                          className="w-[6.5625rem] h-[2rem] p-2 bg-[#688AF2] text-[0.625rem] text-white rounded-lg "
                        >
                          공간 예약 하러 가기
                        </button>
                      </div>
                    </div>
                  )}
                  {confirm && (
                    <div className="hidden-360 flex h-[2.25rem] gap-2 leading-6 my-4 ">
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
                        className="flex items-center mb:w-[18rem] md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
                      >
                        <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                          <div className="pr-4 border-gray-300 flex items-center">
                            <div className="pr-4 border-r-2">
                              <p className="mb:text-[0.75rem] md:text-[1rem] md:leading-7 mb:leading-5">
                                {seat.type}
                              </p>
                              <p className="mb:text-[0.875rem] md:text-[1.25rem] font-bold">
                                {seat.code}
                              </p>
                            </div>
                            <div className="bg-red-300 pl-4 md:font-normal md:text-lg mb:text-[0.75rem]">
                              <p>
                                {seat.start_date} - {seat.end_date}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            {!isMobile ? (
                              <div className="hidden-desk hidden-md">
                                <button
                                  className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                                  onClick={() => removeReservation(index)}
                                >
                                  선택 취소
                                </button>
                              </div>
                            ) : (
                              <div className="hidden-360">
                                <button
                                  className=" rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                                  onClick={() => removeReservation(index)}
                                >
                                  X
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {spaceList.map((space, index) => (
                      <div
                        key={index}
                        className="flex items-center mb:w-[18rem] md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2"
                      >
                        <div className="flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-between">
                          <div className="pr-4 border-gray-300 flex items-center">
                            <div className="pr-4 border-r-2">
                              <p className="mb:text-[0.75rem] md:text-[1rem] md:leading-7 mb:leading-5">
                                {space.type}
                              </p>
                              <p className="mb:text-[0.875rem] md:text-[1.25rem] font-bold">
                                {space.code}
                              </p>
                            </div>
                            <div className="bg-red-300 pl-4 md:font-normal md:text-lg mb:text-[0.75rem]">
                              <p>
                                {space.start_date} - {space.end_date}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            {!isMobile ? (
                              <div className="hidden-desk hidden-md">
                                <button
                                  className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                                  onClick={() => removeReservation(index)}
                                >
                                  선택 취소
                                </button>
                              </div>
                            ) : (
                              <div className="hidden-360">
                                <button
                                  className=" rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                                  onClick={() => removeReservation(index)}
                                >
                                  X
                                </button>
                              </div>
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
                      <Link href="">
                        <div className="flex justify-center items-center">
                          <div className="w-full text-center my-4">
                            <button
                              onClick={() => setShowMobileTable(true)}
                              className="w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]"
                            >
                              예약 하기
                            </button>
                          </div>
                        </div>
                      </Link>
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
