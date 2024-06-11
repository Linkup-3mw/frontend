import Image from 'next/image';
import MemberSwiper from './MemberSwiper';
import { IntroduceTopBtn } from './IntroduceTopBtn';
import { PeopleBlueYellow } from '@common/components/icons/PeopleIcons';
import { IClubInfo } from '@/types/club/detail/clubDetail';
import { memo, useEffect, useState } from 'react';
import { getKoreaDate } from '@/utils/utils';

export default memo(function IntroduceSection({
  id,
  member_id,
  member_name,
  profile_image,
  title,
  club_type,
  recruit_count,
  club_members,
  club_meetings,
  liked,
  detail_introduction,
}: IClubInfo) {
  const [dDay, setDday] = useState(0);

  useEffect(() => {
    // D-day 구하기

    if (club_meetings.length === 0) {
      return;
    }

    const meetingDates = club_meetings.map((meet) => {
      return Number(meet.date.substring(0, 10).replaceAll('-', ''));
    });
    meetingDates.sort((a: number, b: number) => a - b);
    const koreaDate = Number(
      getKoreaDate().substring(0, 10).replaceAll('-', ''),
    );
    setDday(meetingDates[0] - koreaDate);
  }, []);

  return (
    <>
      {/* 여기 이미지 수정 */}
      <img
        src="/images/home/img_card_3.png"
        alt={title + '대표 이미지'}
        className="w-full aspect-[2.07/1] object-cover rounded-[0.5rem] max-md:aspect-[3.2/1] max-md:rounded-none"
      />
      <div className="max-md:relative max-md:mt-[1.62rem]">
        <div className="flex justify-between gap-[1rem]">
          <h2 className="my-[1.75rem] text-[1.75rem] font-bold leading-none max-md:mt-[1.69rem] max-md:mb-[1.38rem] max-md:text-[1rem]">
            {title}
          </h2>
          <div className="flex items-center gap-[0.55rem] max-md:hidden">
            <IntroduceTopBtn liked={liked} clubId={id} memberId={member_id} />
          </div>
        </div>

        <div className="flex items-center gap-[1.5rem] mb-[1.78rem] max-md:-mt-[0.575rem]  max-md:mb-[1.56rem]">
          <span className="flex items-center max-md:absolute max-md:top-0 max-md:left-0">
            <Image
              width={40}
              height={40}
              src="/svg/club/locationIcon.svg"
              alt="위치"
              className="mr-[0.5rem] w-[2.5rem] h-[2.5rem] max-md:w-[1rem] max-md:h-[1rem]"
            />
            <b className="text-[1.25rem] max-md:text-[0.75rem]">장소</b>
          </span>
          <div className="flex gap-4 items-center text-sm mt-2 font-semibold max-md:gap-[0.5rem] max-md:text-[0.75rem]">
            <span className="bg-yellow-600 p-[0.5rem] rounded leading-none">
              {club_type}
            </span>
            {club_meetings?.length > 0 && (
              <span className="bg-yellow-600 p-[0.5rem] rounded leading-none">
                모임 D{dDay >= 0 ? '-' + dDay : '+' + dDay}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-[3.19rem]">
        <span className="flex flex-shrink-0 gap-4 mt-2 text-sm ">
          <div className="flex items-center mb-[1rem] text-[1.25rem] font-bold max-md:mb-[0.3125rem] max-md:text-[0.75rem]">
            <PeopleBlueYellow className="mr-[0.5rem] w-[2.5rem] h-[2.5rem] max-md:mr-[0.25rem] max-md:w-[1rem] max-md:h-[1rem]" />
            멤버 ({club_members?.length + 1}/{recruit_count})
          </div>
        </span>
        <div>
          <MemberSwiper
            members={[
              { member_id, member_name, profile_image, ishost: true },
              ...club_members,
            ]}
            swiperOption={{
              breakpoints: {
                768: {
                  grid: { rows: 1, fill: 'row' },
                  // grid: { rows: 2, fill: 'row' },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="hidden max-md:mt-[1.5rem] max-md:block max-md:max-h-[13.125rem] max-md:text-[0.875rem]  max-md:leading-[142%]">
        {detail_introduction}
      </div>
    </>
  );
});
