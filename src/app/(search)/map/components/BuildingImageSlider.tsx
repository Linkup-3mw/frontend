import Image from 'next/image';
interface ImageViewProps {
  // images: string;
  buildingId: number;
}
export default function BuildingImageSlider({
  // images,
  buildingId,
}: ImageViewProps) {
  // if (!images) return <div>이미지 준비중</div>;
  return (
    //h-[17.25rem]
    <div className="overflow-hidden rounded-t-3xl ">
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
