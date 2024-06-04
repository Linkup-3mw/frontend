import { BlackRLeftArrow } from '@/app/common/components/icons/BlackArrow';
import MoreBtn from './MoreBtn';
import { useRouter } from 'next/navigation';

export default function BoardDetailTopBtn() {
  const router = useRouter();
  const handleBackBtnClick = () => {
    router.back();
  };
  return (
    <div className="flex items-center justify-between mb-[2rem] px-[2.5rem] max-md:px-[1rem] max-md:mb-[1.2rem]">
      <button onClick={handleBackBtnClick}>
        <BlackRLeftArrow />
      </button>
      <MoreBtn className="w-[2.5rem] h-[2.5rem] [&_+_div]:!right-0 [&_+_div]:!left-[initial] [&_+_div]:translate-x-[0px]">
        <button>수정</button>
        <button className="last:border-b-0">삭제</button>
      </MoreBtn>
    </div>
  );
}
