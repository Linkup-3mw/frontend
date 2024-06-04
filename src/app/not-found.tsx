'use client';
import { useRouter } from 'next/navigation';
import ContentWrap from './common/components/frame/ContentWrap';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="mt-[10rem] my-[11.25rem] px-[2.5rem] max-md:px-[1.25rem] max-md:mt-[5rem] max-md:mb-[1.5rem] ">
      <ContentWrap className="flex flex-col items-center justify-center h-[46.25rem] bg-blue-50 rounded-[1rem] max-md:h-[calc(100%_-_6.5rem)] max-md:min-h-[40.25rem]">
        <div className="flex gap-[0.5rem] mb-[4rem] max-w-[19.875rem] w-[20.92%] max-md:w-[13.25rem] max-md:mb-[3rem] [&_svg]:h-auto">
          <NumberFour />
          <NumberZero />
          <NumberFour />
        </div>
        <b className="mb-[2.5rem] text-[2rem] leading-none max-md:mb-[2rem] max-md:text-[1.25rem]">
          페이지를 찾을 수 없습니다.
        </b>
        <p className="mb-[1.5rem] text-[1.25rem] font-medium leading-none max-md:mb-[1rem]  max-md:text-[0.75rem] max-md:font-normal">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
        </p>
        <p className="mb-[4rem] text-[1.25rem] font-medium leading-none  max-md:mb-[3rem] max-md:text-[0.75rem] max-md:font-normal">
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.
        </p>
        <div>
          <button
            className="mx-[0.75rem] w-[10.8125rem] h-[3rem] rounded-[0.5rem] border-[1.5px] border-main-black bg-transparent text-[1.25rem] font-bold max-md:mx-[0.5rem] max-md:w-[7.0625rem] max-md:h-[2.5rem] max-md:text-[0.875rem]"
            onClick={() => router.back()}
          >
            이전 페이지
          </button>
          <button
            className="mx-[0.75rem] w-[10.8125rem] h-[3rem] rounded-[0.5rem] border-[1.5px] border-main-black bg-main-yellow text-[1.25rem] font-bold max-md:mx-[0.5rem] max-md:w-[7.0625rem] max-md:h-[2.5rem] max-md:text-[0.875rem]"
            onClick={() => router.replace('/')}
          >
            메인 페이지
          </button>
        </div>
      </ContentWrap>
    </div>
  );
}

const NumberFour = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="102"
      height="120"
      viewBox="0 0 102 120"
      fill="none"
      className="inline-block"
    >
      <rect
        x="57"
        y="2.375"
        width="24"
        height="115.5"
        fill="#FAEC23"
        stroke="#171717"
        strokeWidth="3"
      />
      <rect
        x="100.5"
        y="74.375"
        width="24"
        height="99"
        transform="rotate(90 100.5 74.375)"
        fill="#FAEC23"
        stroke="#171717"
        strokeWidth="3"
      />
      <path
        d="M57 2.375V26.375V30.125L23.8125 74.375H1.5V68.375L15 50.375L33 26.375L51 2.375H57Z"
        fill="#FAEC23"
        stroke="#171717"
        strokeWidth="3"
      />
    </svg>
  );
};

const NumberZero = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="102"
      height="120"
      viewBox="0 0 102 120"
      fill="none"
      className="inline-block"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51 2.375C23.6619 2.375 1.5 24.5369 1.5 51.875V68.375C1.5 95.7131 23.6619 117.875 51 117.875C78.3381 117.875 100.5 95.7131 100.5 68.375V51.875C100.5 24.5369 78.3381 2.375 51 2.375ZM76.5 51.875C76.5 37.7917 65.0833 26.375 51 26.375C36.9167 26.375 25.5 37.7917 25.5 51.875V68.375C25.5 82.4583 36.9167 93.875 51 93.875C65.0833 93.875 76.5 82.4583 76.5 68.375V51.875Z"
        fill="#FAEC23"
      />
      <path
        d="M51 2.375C23.6619 2.375 1.5 24.5369 1.5 51.875V68.375C1.5 95.7131 23.6619 117.875 51 117.875M51 2.375C78.3381 2.375 100.5 24.5369 100.5 51.875V68.375C100.5 95.7131 78.3381 117.875 51 117.875M51 2.375V26.375M51 26.375C65.0833 26.375 76.5 37.7917 76.5 51.875V68.375C76.5 82.4583 65.0833 93.875 51 93.875M51 26.375C36.9167 26.375 25.5 37.7917 25.5 51.875V68.375C25.5 82.4583 36.9167 93.875 51 93.875M51 117.875V93.875"
        stroke="#171717"
        strokeWidth="3"
      />
    </svg>
  );
};
