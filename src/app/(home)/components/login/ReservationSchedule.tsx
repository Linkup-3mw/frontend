'use client';
import Calendar from '@/app/common/components/form/Calendar';
import NoDataMessage from '@/app/community/components/club/clubDetail/NoDataMessage';
import API from '@/utils/axios';
import {
  dateBar,
  dateDot,
  getDayOfWeek,
  getTimeDotPMAMFormat,
} from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';

export default function ReservationSchedule() {
  const today = dateBar(new Date().toISOString());
  const [date, setDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const { data, isPending, error } = useQuery({
    queryKey: ['reserationDate', date],
    queryFn: async () => {
      const res = await API.get(`/reservation?date=${date}`);
      return res.data.data;
    },
  });

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setDate(format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <>
      <h2 className="mb-[1rem] leading-none text-[1.75rem] font-bold max-md:text-[1.25rem] max-md:mb-[1rem]">
        예약 일정
      </h2>
      <hr className=" bg-gray-300 h-[1.5px] max-md:bg-main-blue" />
      <div className="overflow-hidden mt-[1.5rem] rounded-[1rem] max-md:mt-[1rem]">
        <Calendar selected={selectedDate} onSelect={handleDayPickerSelect} />
      </div>
      <ul className="h-[25rem] overflow-auto mt-[1.5rem] [&_>_li]:mb-[1.5rem] max-md:h-auto">
        {isPending && (
          <li className="p-[1.5rem] relative flex items-center gap-[1rem] h-[6.625rem] rounded-[0.5rem] bg-white last-of-type:mb-0 max-md:px-[1rem] max-md:py-[0.8rem] max-md:h-[5rem]">
            <PulseLoader color="#688AF2" size={6} className="mx-auto" />
          </li>
        )}
        {data?.length === 0 ? (
          <li className="p-[1.5rem] relative flex items-center gap-[1rem] h-[6.625rem] rounded-[0.5rem] bg-white last-of-type:mb-0 max-md:px-[1rem] max-md:py-[0.8rem] max-md:h-[5rem]">
            <NoDataMessage />
          </li>
        ) : (
          <>
            {data?.map(
              ({
                start_date,
                start_time,
                end_time,
                seat_type,
                seat_code,
                reservation_id,
                location,
              }: any) => {
                return (
                  <li
                    className="p-[1.5rem] relative flex items-center gap-[1rem] h-[6.625rem] rounded-[0.5rem] bg-white last-of-type:mb-0 max-md:h-[5rem]
                    max-md:px-[1rem] max-md:py-[0.8rem]
                    "
                    key={reservation_id}
                  >
                    <div className="pr-[1rem] w-[6.25rem] border-r-[1.5px] border-r-gray-400 max-md:w-[5.25rem] max-md:pt-[1.6rem] leading-none">
                      <span className="block mb-[0.2rem] text-[1rem] max-md:text-[0.75rem]">
                        {seat_type}
                      </span>
                      <b className="block text-[1.25rem] max-md:text-[1rem]">
                        {seat_code}
                      </b>
                    </div>
                    <div className="max-md:text-[0.875rem]">
                      <p>
                        {dateDot(start_date)} ({getDayOfWeek(start_date)})
                      </p>
                      <p className="font-bold">
                        {getTimeDotPMAMFormat(start_time)} ~
                        {getTimeDotPMAMFormat(end_time)}
                      </p>
                    </div>
                    <span className="absolute right-[1rem] top-[1rem] p-[0.5rem]  bg-blue-400 text-[0.875rem] text-white font-medium rounded-[3rem] leading-none max-md:top-[0.81rem] max-md:left-[1rem] max-md:right-[initial] max-md:text-[0.75rem]  max-md:p-[0.25rem]">
                      {location}
                    </span>
                  </li>
                );
              },
            )}
          </>
        )}
      </ul>
    </>
  );
}
