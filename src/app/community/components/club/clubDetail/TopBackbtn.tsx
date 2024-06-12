import { BlackRLeftArrow } from '@/app/common/components/icons/BlackArrow';
import { useRouter } from 'next/navigation';

export default function TopBackBtn() {
  const router = useRouter();
  const handleBackBtnClick = () => {
    router.back();
  };
  return (
    <div className="sticky bg-blue-50 left-0 top-0 z-[5] flex items-center justify-between mb-[2rem] px-[2.5rem] max-md:px-[1rem] max-md:mb-[1.2rem]">
      <button onClick={handleBackBtnClick}>
        <BlackRLeftArrow />
      </button>
    </div>
  );
}
