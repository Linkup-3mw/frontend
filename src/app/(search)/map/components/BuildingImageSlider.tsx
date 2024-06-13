import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { currentBuildingState } from '../../atom/search';
interface ImageViewProps {
  // images: string;
  buildingId: number;
}
export default function BuildingImageSlider({
  // images,
  buildingId,
}: ImageViewProps) {
  const setCurrentBuilding = useSetRecoilState(currentBuildingState);
  // if (!images) return <div>이미지 준비중</div>;
  return (
    //h-[17.25rem]
    <div className="overflow-hidden rounded-t-3xl relative">
      <Image
        className="absolute top-7 right-7 z-10"
        onClick={() => setCurrentBuilding(null)}
        src="/svg/reservation/imageView/white_cancel.svg"
        width={18}
        height={18}
        alt="취소"
      />
      <div className="absolute inset-0 bg-black opacity-40 z-9"></div>
      <Image
        layout="responsive"
        width={491}
        height={276}
        // src={`${images}/${buildingId}.jpeg`}
        src={'/images/office/info/office.jpeg'}
        alt="오피스 이미지"
        className="w-full h-auto aspect-1.7/1"
      />
    </div>
  );
}
