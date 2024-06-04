import Image from 'next/image';
import MemberSwiper from './MemberSwiper';
import { NoneMemberIntroduceTopBtn } from './IntroduceTopBtn';
import { ClubDetail } from '@/app/community/(pages)/club/[id]/page';

export default function NoneMemberIntroduceSection({
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
        className="w-full aspect-[3.18/1] object-cover rounded-[0.5rem] max-md:aspect-[3.2/1] max-md:rounded-none"
      />
      <div className="max-md:relative max-md:mt-[1.62rem]">
        <div className="flex justify-between gap-[1rem]">
          <h2 className="my-[1.75rem] text-[1.75rem] font-bold leading-none max-md:mt-[1.69rem] max-md:mb-[1.38rem] max-md:text-[1rem]">
            {club_name}입니다 길게길게 작성
          </h2>
          <div className="flex items-center gap-[1.5rem] max-md:hidden">
            <NoneMemberIntroduceTopBtn />
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

      <div className="flex gap-[1.56rem] items-center mb-[2rem] max-md:block max-md:mb-[1.31rem]">
        <span className="flex flex-shrink-0 gap-4 mt-2 text-sm ">
          <div className="flex items-center mb-[0.3125rem] text-[1.25rem] font-bold max-md:text-[0.75rem]">
            <Image
              src="/svg/club/peoplesIcon.svg"
              alt="Peoples Icon"
              className="mr-[0.5rem] w-[2.5rem] h-[2.5rem] max-md:mr-[0.25rem] max-md:w-[1rem] max-md:h-[1rem]"
              width={40}
              height={40}
            />
            멤버 (20/25)
          </div>
        </span>
        <div className="w-[calc(100%_-_11.62rem)] max-md:w-full">
          <MemberSwiper />
        </div>
      </div>

      <div className="overflow-y-auto max-h-[9.2375rem] text-[1rem] font-medium leading-[175%] whitespace-pre-line max-md:overflow-y-visible max-md:max-h-auto max-md:text-[0.875rem]  max-md:leading-[142%]">
        {detailed_introduction}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et natus sunt
        praesentium placeat. Culpa, consequuntur. Repellendus vitae porro neque.
        Odit, voluptatem labore mollitia nostrum ratione dolorum quod minus
        ducimus veritatis. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Et natus sunt praesentium placeat. Culpa, consequuntur.
        Repellendus vitae porro neque. Odit, voluptatem labore mollitia nostrum
        ratione dolorum quod minus ducimus veritatis. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Et natus sunt praesentium placeat. Culpa,
        consequuntur. Repellendus vitae porro neque. Odit, voluptatem labore
        mollitia nostrum ratione dolorum quod minus ducimus veritatis.
      </div>
    </>
  );
}
