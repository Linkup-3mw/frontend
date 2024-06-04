import Image from 'next/image';
import MemberSwiper from './MemberSwiper';
import { IntroduceTopBtn } from './IntroduceTopBtn';
import { ClubDetail } from '@/app/community/(pages)/club/[id]/page';
import { PeopleBlueYellow } from '@common/components/icons/PeopleIcons';

export default function IntroduceSection({
  club_name,
  club_location,
  club_category,
  detailed_introduction,
}: ClubDetail) {
  return (
    <>
      <img
        src="/images/home/img_card_3.png"
        alt={club_name + '대표 이미지'}
        className="w-full aspect-[2.07/1] object-cover rounded-[0.5rem] max-md:aspect-[3.2/1] max-md:rounded-none"
      />
      <div className="max-md:relative max-md:mt-[1.62rem]">
        <div className="flex justify-between gap-[1rem]">
          <h2 className="my-[1.75rem] text-[1.75rem] font-bold leading-none max-md:mt-[1.69rem] max-md:mb-[1.38rem] max-md:text-[1rem]">
            {club_name}
          </h2>
          <div className="flex items-center gap-[0.25rem] max-md:hidden">
            <IntroduceTopBtn />
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
            <b className="text-[1.25rem] max-md:text-[0.75rem]">
              {club_location}
            </b>
          </span>
          <div className="flex gap-4 items-center text-sm mt-2 font-semibold max-md:gap-[0.5rem] max-md:text-[0.75rem]">
            <span className="bg-yellow-600 p-[0.5rem] rounded leading-none">
              {club_category}
            </span>
            <span className="bg-yellow-600 p-[0.5rem] rounded leading-none">
              모임 D-23
            </span>
          </div>
        </div>
      </div>

      <div className="mt-[3.19rem]">
        <span className="flex flex-shrink-0 gap-4 mt-2 text-sm ">
          <div className="flex items-center mb-[1rem] text-[1.25rem] font-bold max-md:mb-[0.3125rem] max-md:text-[0.75rem]">
            <PeopleBlueYellow className="mr-[0.5rem] w-[2.5rem] h-[2.5rem] max-md:mr-[0.25rem] max-md:w-[1rem] max-md:h-[1rem]" />
            멤버 (20/25)
          </div>
        </span>
        <div>
          <MemberSwiper
            swiperOption={{
              breakpoints: {
                768: {
                  grid: { rows: 2, fill: 'row' },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="hidden max-md:mt-[1.5rem] max-md:block max-md:max-h-[13.125rem] max-md:text-[0.875rem]  max-md:leading-[142%]">
        {detailed_introduction}
      </div>
    </>
  );
}
