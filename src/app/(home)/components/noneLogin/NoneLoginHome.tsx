import Link from 'next/link';
import Image from 'next/image';
import { sbAggro } from '@/styles/typography';
import ContentWrap from '@common/components/frame/ContentWrap';
import ImageCard from '@/app/(home)/components/noneLogin/OfficeCard';
import RatePlanCard from '@/app/(home)/components/noneLogin/RatePlanCard';
import { TYPE_OF_RATEPLAN } from '@/app/(home)/constants/home';

//미로그인시 나타나는 페이지
export default function NoneLoginHome() {
  return (
    <main className="pt-[5rem] pb-[14.6rem]">
      <section className="px-[1.25rem] box-border bg-[url(/images/home/bg_home.png)] bg-cover">
        <ContentWrap className={'pt-[5rem] pb-[10.31rem]'}>
          <div className=" text-white">
            <h2
              className={`text-[4rem] leading-[120%] ${sbAggro.className} font-bold `}
            >
              New Value <br />
              With Space & People
              <br /> Connection
            </h2>
            <p className="py-[2.5rem] text-[2.5rem] font-extrabold leading-[150%]">
              공간과 사람의 연결을 통해 얻는 새로운 가치
            </p>
            <Link
              href={'/'}
              className="h-[2.875rem] text-[1.25rem] leading-[2.875rem]"
            >
              지점 탐색하기 &nbsp;&gt;
            </Link>
          </div>
        </ContentWrap>
      </section>
      <section className="mt-[5rem] px-[1.25rem] box-border">
        <ContentWrap className="pt-[5rem] px-[2.5rem] pb-[20rem] rounded-t-[1rem] bg-blue-50">
          <div className="mx-auto max-w-[85rem] w-100">
            <h2 className="mb-[2.5rem] text-[2.5rem] font-extrabold leading-[3.25rem]">
              내가 원하는 작업 환경과 휴식을
              <br /> 링크업에서 세심하게 찾아드립니다.
            </h2>
            <p className="mb-[5rem] text-[1.25rem] text-gray-800 font-medium leading-[1.75rem] ">
              링크업은 사람과 관계를 통해서 자신이 성장하는 환경을 중요시
              생각하며
              <br />
              서비스를 제공하고 있습니다.
            </p>
            <ul className="flex gap-[1.5rem]">
              {OfficeList?.map((office) => {
                return (
                  <li key={office.id} className="flex-1">
                    <ImageCard {...office} />
                  </li>
                );
              })}
            </ul>
          </div>
        </ContentWrap>
      </section>
      <section className="px-[1.25rem]">
        <ContentWrap className="py-[7.5rem] px-[2.5rem] bg-blue-200">
          <div className="mx-auto  max-w-[85rem] w-100">
            <div className="flex gap-[2.5rem] mb-[5rem] max-lg:gap-[1.25rem]">
              {TYPE_OF_RATEPLAN.map((item) => (
                <RatePlanCard key={item.id} {...item} />
              ))}
            </div>
            <Link
              href={'/'}
              className="block h-[6.4375rem] rounded-[6.4375rem] leading-[6.4375rem] bg-gradient-to-r from-[#688af2] to-[#6268d9] text-[2rem] text-white font-bold text-center "
            >
              멤버십 구매하기
            </Link>
          </div>
        </ContentWrap>
      </section>
      <section className="px-[1.25rem]">
        <ContentWrap className="pt-[15rem] pb-[16.5rem] bg-blue-50 ">
          <div className="flex items-center justify-center gap-[2.5rem]">
            <span className="block flex-1 max-w-[25rem] max-h-[25rem] aspect-square">
              <Image
                src="/images/home/img_circle_office.png"
                alt="building"
                width={400}
                height={400}
              />
            </span>
            <div className="flex flex-[1.25] aspect-square items-center justify-center max-w-[32.5rem] max-h-[32.5rem] rounded-full bg-yellow-100">
              <p className="text-[2rem] font-semibold leading-[4rem] text-center">
                맞춤형 필터 제공
                <br /> 내가 원하는 공유 오피스를
                <br /> 찾아보세요
              </p>
            </div>
            <span className="block flex-1 max-w-[25rem] max-h-[25rem] aspect-square">
              <Image
                src="/images/home/img_circle_office2.png"
                alt="building"
                width={400}
                height={400}
              />
            </span>
          </div>
        </ContentWrap>
      </section>
      <section className="px-[1.25rem]">
        <ContentWrap className="-mt-[1.5rem] px-[2.5rem] bg-white rounded-[1.5rem]">
          <ul className="py-[7.5rem] mx-auth max-w-[85rem]">
            <li className="flex items-center justify-center gap-[5.63rem] max-lg:gap-[1.25rem]  mb-[5rem]">
              <div className="flex-shrink-0 w-[49.44%] max-w-[39.375rem]">
                <h3 className="mb-[2.25rem] text-[2.25rem] font-extrabold">
                  새로운 기회, 가능성이 현실로
                </h3>
                <p className=" break-keep text-[1.25rem] font-medium leading-[1.75rem] text-gray-800">
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
              />
            </li>
            <li className="flex items-center justify-center  gap-[5.63rem] max-lg:gap-[1.25rem]  mb-[5rem]">
              <div className="flex-shrink-0 w-[49.44%] max-w-[39.375rem]">
                <h3 className="mb-[2.25rem] text-[2.25rem] font-extrabold">
                  함께 성장할 수 있는 커뮤니티
                </h3>
                <p className="break-keep text-[1.25rem] font-medium leading-[1.75rem] text-gray-800">
                  링크업을 통해 같은 산업군에서 일하는 사람들과 소통할 수 있는
                  기회가 많아져서 업무적인 인사이트는 물론이고, 다양한 프로젝트
                  협업 기회까지 얻을 수 있었어요.
                </p>
              </div>
              <Image
                src="/images/home/img_card_2.png"
                alt="community"
                width={640}
                height={302}
              />
            </li>
            <li className="flex items-center justify-center gap-[5.63rem] max-lg:gap-[1.25rem] mb-[5rem]">
              <div className="flex-shrink-0 w-[49.44%] max-w-[39.375rem]">
                <h3 className="mb-[2.25rem] text-[2.25rem] font-extrabold">
                  링크업에서 찾은 나만의 완벽한 작업 공간
                </h3>
                <p className="break-keep text-[1.25rem] font-medium leading-[1.75rem] text-gray-800">
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
    name: '성수 1호점',
    distance: '성수역 도보 3분거리',
    mainIndustry: ['개발자', '컨설팅', '부동산'],
    image: '/images/home/img_office.png',
  },
  {
    id: 2,
    name: '성수 2호점',
    distance: '성수역 도보 3분거리에서 모퉁이를 돌아서 왼쪽 건물',
    mainIndustry: ['개발자', '컨설팅', '부동산'],
    image: '/images/home/img_office.png',
  },
  {
    id: 3,
    name: '성수 3호점',
    distance: '성수역 도보 8분거리',
    mainIndustry: ['개발자', '컨설팅', '부동산'],
    image: '/images/home/img_office.png',
  },
  {
    id: 4,
    name: '성수 4호점',
    distance: '성수역 도보 3분거리',
    mainIndustry: ['개발자', '컨설팅', '부동산'],
    image: '/images/home/img_office.png',
  },
];
