import Image from 'next/image';
import Link from 'next/link';

interface Props {
  name: string;
  distance: string;
  mainIndustry: string[];
  image: string;
}

export default function OfficeCard({
  name,
  distance,
  mainIndustry,
  image,
}: Props) {
  return (
    <div className="group overflow-hidden relative h-[24.925rem] rounded-[1rem] ">
      <Image
        src={image}
        alt={name + '이미지'}
        width={200}
        height={200}
        className="w-full h-full"
      />
      <div className="absolute left-0 top-0 flex flex-col justify-between py-[2.5rem] px-[1.5rem] w-full h-full bg-[rgba(23,23,23,0.8)] text-white leading-none group-hover:opacity-100 opacity-0 transition-all">
        <div>
          <b className="block mb-[1.56rem] text-[2rem] font-bold ">{name}</b>
          <i className="text-[1.25rem] not-italic break-keep">{distance}</i>
        </div>
        <div className="">
          <b className="block mb-[1.5rem] text-[1.5rem] font-bold">
            입점 주 산업군
          </b>
          {mainIndustry.map((industry: string, index) => (
            <span
              key={index}
              className="inline-block mr-[0.5rem] p-[0.75rem] rounded-[0.25rem] bg-yellow-600 text-black text-[0.875rem] "
            >
              {industry}
            </span>
          ))}
        </div>
        <Link href={'/'}>더 알아보기 &nbsp;&gt;</Link>
      </div>
    </div>
  );
}
