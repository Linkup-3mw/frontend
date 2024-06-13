'use client';
import Link from 'next/link';
import Image from 'next/image';
import { sbAggro } from '@/styles/typography';
import ContentWrap from '@common/components/frame/ContentWrap';
import OfficeCard from '@/app/(home)/components/noneLogin/OfficeCard';
import FlipSwiper from '../(home)/components/noneLogin/FlipSwiper';

//미로그인시 나타나는 페이지
export default function CompanyPage() {
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

      <section className="mt-[5rem] max-lg:px-0 px-[1.25rem] box-border max-md:mt-0 max-md:px-0 ">
        <ContentWrap
          className="pt-[5rem] px-[2.5rem] pb-[10rem] rounded-t-[1rem] bg-blue-50 
          max-md:pt-[3.75rem] max-md:pb-[2.5rem] max-md:px-0  max-md:bg-transparent
        "
        >
          <div className="mx-auto max-w-[85rem] w-100">
            <div className="max-md:px-[1.25rem]">
              <h2 className="mb-[2.5rem] text-[2.5rem] font-extrabold leading-[3.25rem] max-md:mb-[1.3rem] max-md:text-[1rem] max-md:leading-[1.375rem] max-md:font-bold">
                내가 원하는 작업 환경과 휴식 공간을
                <br /> 링크업에서 세심하게 찾아드립니다.
              </h2>
              <p className="mb-[5rem] text-[1.25rem] text-gray-800 font-medium leading-[1.75rem] max-md:mb-[2.3rem] max-md:text-[0.75rem] max-md:font-normal max-md:leading-[1.125rem]">
                링크업은 사람과 관계를 통해서 자신이 성장하는 환경을
                <br className="max-md:block hidden" /> 중요시 생각하며
                <br className="max-md:hidden" />
                서비스를 제공하고 있습니다.
              </p>
            </div>
            <ul className="flex gap-[1.5rem] max-md:gap-[1rem] max-md:overflow-x-auto max-md:px-[1.25rem] scrollbar-hide">
              {OfficeList?.map((office) => {
                return (
                  <li key={office.id} className="flex-1 max-md:flex-shrink-0">
                    <OfficeCard {...office} />
                  </li>
                );
              })}
            </ul>
          </div>
        </ContentWrap>
      </section>

      <section className="px-[1.25rem] max-lg:px-0 max-md:px-0 overflow-x-hidden">
        <ContentWrap className="overflow-hidden pt-[15rem] pb-[16.5rem] bg-blue-50 max-md:bg-transparent max-md:py-[7.5rem]">
          <div>
            <FlipSwiper />
          </div>
        </ContentWrap>
      </section>

      <section className="px-[1.25rem] max-lg:px-0 max-md:px-[1.25rem]">
        <ContentWrap className="-mt-[1.5rem] px-[2.5rem] bg-white rounded-[1.5rem] max-md:mt-0 max-md:rounded-[1rem] max-md:p-[1rem]">
          <ul className="py-[7.5rem] mx-auth max-w-[85rem] max-md:py-0 ">
            <li className="flex items-center justify-center gap-[5.63rem] max-lg:gap-[1.25rem]  mb-[5rem] max-md:flex-col-reverse">
              <div className="flex-shrink-0 w-[52.44%] max-w-[39.375rem] max-md:w-full">
                <h3 className="mb-[2.23rem] text-[2.25rem] font-extrabold max-md:mb-[1rem] max-md:text-[1rem] mex-md:font-bold">
                  새로운 기회, 가능성이 현실로
                </h3>
                <p className=" break-keep text-[1.25rem] font-medium leading-[1.75rem] text-gray-800 max-md:text-[0.75rem] max-md:leading-[1.125rem] max-md:font-normal">
                  링크업의 협업 및 프로젝트 기능을 사용한 후로는 내 일에 맞는
                  사람들을 빠르게 찾을 수 있게 되었고, 실제로 몇 가지 프로젝트에
                  함께 참여하게 되었습니다. 공간과 시간을 효율적으로 사용할 수
                  있게 되어 매우 만족해요.
                </p>
              </div>
              <Image
                src="/images/home/img_card_1.png"
                alt="opportunity"
                width={640}
                height={302}
                className="w-[40rem] h-auto"
              />
            </li>
            <li className="flex items-center justify-center gap-[5.63rem] max-lg:gap-[1.25rem]  mb-[5rem] max-md:flex-col-reverse">
              <div className="flex-shrink-0 w-[52.44%] max-w-[39.375rem] max-md:w-full">
                <h3 className="mb-[2.23rem] text-[2.25rem] font-extrabold max-md:mb-[1rem] max-md:text-[1rem] mex-md:font-bold">
                  함께 성장할 수 있는 커뮤니티
                </h3>
                <p className=" break-keep text-[1.25rem] font-medium leading-[1.75rem] text-gray-800 max-md:text-[0.75rem] max-md:leading-[1.125rem] max-md:font-normal">
                  링크업을 통해 다양한 산업군에서 일하는 사람들과 소통할 수 있는
                  기회가 많아져서 업무적인 인사이트는 물론이고, 링크업을
                  이용하는 다양한 사람들과 제 취미를 공유할 수 있어서 매우
                  즐거웠어요.
                </p>
              </div>
              <Image
                src="/images/home/img_card_2.png"
                alt="community"
                width={640}
                height={302}
                className="w-[40rem] h-auto"
              />
            </li>
            <li className="flex items-center justify-center gap-[5.63rem] max-lg:gap-[1.25rem] max-md:flex-col-reverse ">
              <div className="flex-shrink-0 w-[52.44%] max-w-[39.375rem] max-md:w-full">
                <h3 className="mb-[2.23rem] text-[2.25rem] font-extrabold max-md:mb-[1rem] max-md:text-[1rem] mex-md:font-bold break-keep">
                  링크업에서 찾은 나만의 완벽한 작업 공간
                </h3>
                <p className="grow-1 break-keep text-[1.25rem] font-medium leading-[1.75rem] text-gray-800 max-md:text-[0.75rem] max-md:leading-[1.125rem] max-md:font-normal">
                  탐색 기능을 통해 제가 원하는 환경을 쉽게 찾을 수 있었고,
                  실제로 방문해 보니 사진과 똑같았습니다. 집중력을 최대로 발휘할
                  수 있는 환경을 제공하며, 때로는 편안한 휴식도 취할 수 있게
                  해줍니다.
                </p>
              </div>
              <Image
                src="/images/home/img_card_3.png"
                alt="work space"
                width={640}
                height={302}
                className="w-[40rem] h-auto"
              />
            </li>
          </ul>
        </ContentWrap>
      </section>
    </main>
  );
}

//임시 데이터
const OfficeList = [
  {
    id: 1,
    name: '강남 1호점',
    distance: '강남역 도보 3분거리',
    mainIndustry: ['디자이너', '개발자', '컨설팅'],
    image: '/images/home/img_office_3.png',
  },
  {
    id: 2,
    name: '홍대 1호점',
    distance: '홍대역 도보 5분거리',
    mainIndustry: ['컨설팅', '금융', '교육'],
    image: '/images/home/img_office_2.png',
  },
  {
    id: 3,
    name: '서초 1호점',
    distance: '서초역 도보 7분거리',
    mainIndustry: ['교육', '부동산', '디자이너'],
    image: '/images/home/img_office_1.png',
  },
  {
    id: 4,
    name: '성수 1호점',
    distance: '성수역 도보 3분거리',
    mainIndustry: ['개발자', '컨설팅', '부동산'],
    image: '/images/home/img_office_4.png',
  },
];
