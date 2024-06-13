'use client';
import Link from 'next/link';
import { sbAggro } from '@/styles/typography';
import ContentWrap from '@common/components/frame/ContentWrap';
import RatePlanCard from '@/app/(home)/components/noneLogin/RatePlanCard';
import { TYPE_OF_RATEPLAN } from '@/app/(home)/constants/home';

//미로그인시 나타나는 페이지
export default function MembershipPage() {
  return (
    <main className="pt-[5rem] pb-[14.6rem] max-md:pt-[4.875rem] max-md:pb-[3.75rem]">
      <section className="px-[2.5rem] box-border bg-[url(/images/home/bg_home.jpg)] max-md:px-[1.25rem] bg-cover max-md:bg-[center_right_70%]">
        <ContentWrap
          className={
            'pt-[5rem] pb-[10.31rem] max-md:pt-[1.5rem] max-md:pb-[1.69rem]'
          }
        >
          <div className=" text-white">
            <h2
              className={`
              text-[4rem] leading-[120%] ${sbAggro.className} font-bold 
              max-md:text-[1.5rem]
              `}
            >
              New Value <br />
              With Space & People
              <br /> Connection
            </h2>
            <p
              className="py-[2.5rem] text-[2.5rem] font-extrabold leading-[150%]
              max-md:pt-[2.25rem] max-md:py-[1rem]  max-md:text-[1rem] max-md:font-bold
            "
            >
              공간과 사람의 연결을 통해 얻는 새로운 가치
            </p>
            <Link
              href={'/map'}
              className="h-[2.875rem] text-[1.25rem] leading-[2.875rem] max-md:height-[1.125rem] max-md:leading-[1.125rem] max-md:text-[0.875rem]"
            >
              지점 탐색하기 &nbsp;&gt;
            </Link>
          </div>
        </ContentWrap>
      </section>

      <section className="px-[1.25rem] max-md:px-0 max-lg:px-0">
        <ContentWrap className="py-[7.5rem] px-[2.5rem] bg-blue-200 max-md:pt-0 max-md:pb-0 max-md:px-0 max-md:bg-transparent">
          <div className="mx-auto max-w-[85rem] w-100">
            <div className="flex gap-[2.5rem] mb-[5rem] max-lg:gap-[1.25rem] max-md:overflow-x-auto max-md:mb-[1.5rem] max-md:px-[1.25rem]  max-md:gap-[1rem] scrollbar-hide">
              {TYPE_OF_RATEPLAN.map((item) => (
                <RatePlanCard key={item.id} {...item} />
              ))}
            </div>
            <Link
              href={'/map'}
              className="block h-[6.4375rem] rounded-[6.4375rem] leading-[6.4375rem] bg-gradient-to-r from-[#688af2] to-[#6268d9] text-[2rem] text-white font-bold text-center 
              max-md:mx-[1.25rem]  max-md:h-[2.75rem] max-md:rounded-[0.5rem] max-md:leading-[2.75rem] max-md:text-[1rem]
              "
            >
              멤버십 구매하기
            </Link>
          </div>
        </ContentWrap>
      </section>
    </main>
  );
}
