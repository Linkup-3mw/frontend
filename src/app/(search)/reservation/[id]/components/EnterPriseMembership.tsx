import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';
import {
  selectedSeatAllState,
  Rtab,
  selectedSpaceAllState,
  companyState,
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
import TextField from './filed/TextField';

interface MonthMembershipProps {
  seatType: string[];
  spaceType: string[];
}

export default function EnterPriseMembership({
  seatType,
  spaceType,
}: MonthMembershipProps) {
  const [RTab, setRTab] = useRecoilState(Rtab);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(1);
  const [consulting, setConsulting] = useRecoilState(companyState);
  const spaceImages: Record<string, string> = {
    '미팅룸(4인)': '/svg/reservation/mettingRoom4.svg',
    '미팅룸(8인)': '/svg/reservation/mettingRoom8.svg',
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
      type: '기업 지정석',
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

  const [showMobileTable, setShowMobileTable] =
    useRecoilState(showMobileTableState);
  const isMobile = useRecoilValue(mobileReservationLayoutState);

  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setHasError(!/^\d+$/.test(event.target.value));
  };
  const [peopleCount, setPeopleCount] = useState<number>(0);

  const handleBlur = () => {
    setPeopleCount(parseInt(inputValue));
  };
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
            <div className="flex flex-col gap-4">
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

              <div className="hidden-desk w-full text-center my-4">
                <button
                  onClick={() => setShowMobileTable(true)}
                  className="w-[7.75rem] h-[2.5rem] bg-[#6377E9] text-white rounded-lg leading-[1.375rem]"
                >
                  좌석 둘러 보기
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className=" mb:text-sm md:text-lg font-bold ">
                사용 인원을 입력하세요.
              </div>
              <TextField
                value={inputValue}
                onChange={handleChange}
                hasError={hasError}
                onBlur={handleBlur}
              />
              <div className="mb:text-sm md:text-lg font-bold">
                예상 견적을 확인하세요.
              </div>
              <div className="md:h-[3.275rem]  mb:h-[2.625rem] rounded-xl bg-white">
                {isNaN(peopleCount) ? null : (
                  <p className="md:leading-none font-bold md:text-xl md:p-4 mb:p-2">
                    {peopleCount && peopleCount * 2700000}
                  </p>
                )}
              </div>
              <div>
                {hasError && (
                  <p className="text-[#FF1000]">숫자를 입력해 주세요.</p>
                )}
              </div>
              <div className="flex md:text-[1rem] mb:text-[0.825rem] gap-2 leading-6 my-4 ">
                <p>
                  미팅룸, 컨퍼런스 룸, 스튜디오 등 다양한 공간이 필요하신가요?
                </p>
                <div>
                  <button
                    onClick={() => setRTab('공간')}
                    className="mb:text-[0.625rem] mb:w-[5.375rem] mb:h-[2rem] md:w-[8.125rem] leading-none font-bold  md:h-[2.5rem] p-2 bg-[#688AF2] md:text-[0.875rem] text-white rounded-lg"
                  >
                    공간 둘러보기
                  </button>
                </div>
              </div>
              <Link href="/reservation/consulting">
                <div className="w-full text-center my-4">
                  <button
                    // onClick={() => setShowMobileTable(true)}
                    className="w-[7.75rem] h-[2.5rem] bg-[#6377E9] text-white rounded-lg leading-[1.375rem]"
                  >
                    문의하기
                  </button>
                </div>
              </Link>
            </div>
          </div>
        )}
        {RTab === '공간' && (
          <div className="flex flex-col gap-7 mt-4">
            <div className="flex flex-col gap-6">
              <div className="text-lg font-bold">공간 유형을 선택해주세요</div>
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

              <div className="hidden-desk w-full text-center my-4">
                <button
                  onClick={() => setShowMobileTable(true)}
                  className="w-[7.75rem] h-[2.5rem] bg-[#688AF2] text-white rounded-lg leading-none font-bold"
                >
                  공간 둘러 보기
                </button>
              </div>

              <div className=" mb:text-sm md:text-lg font-bold">
                예상 견적을 확인하세요.
              </div>
              <div className="md:w-[26.6875rem] md:h-[3.875rem] mb:w-[18rem] mb:h-[2.625rem] rounded-2xl bg-white border">
                <p className="md:leading-none font-bold md:text-xl md:p-6 mb:p-2">
                  {peopleCount && peopleCount * 2700000}
                </p>
              </div>
              <Link href="/reservation/consulting">
                <div className="w-full text-center my-4">
                  <button className="md:w-[7.375rem] md:h-[3rem] md:text-xl mb:w-[5.5rem] mb:h-[2.5rem] bg-[#688AF2] text-white rounded-lg leading-none font-bold ">
                    문의하기
                  </button>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
