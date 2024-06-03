import Image from 'next/image';
interface ImageViewProps {
  images: string;
  buildingId: number;
}
export default function BuildingImageSlider({
  images,
  buildingId,
}: ImageViewProps) {
  if (!images) return <div>이미지 준비중</div>;
  return (
    <div className='overflow-hidden rounded-t-3xl h-[17.25rem]'>
      <Image
        width={491}
        height={276}
        src={`${images}/${buildingId}.jpeg`}
        alt="오피스 이미지"
      />
    </div>
  );
}
