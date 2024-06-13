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
    <div className="group overflow-hidden relative h-[24.925rem] rounded-[1rem] max-md:w-[13.125rem] max-md:h-[13.125rem] ">
      <Image
        src={image}
        alt={name + '이미지'}
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
      <div className="absolute left-0 top-0 flex flex-col justify-between py-[2.5rem] px-[1.5rem] w-full h-full bg-[rgba(23,23,23,0.8)] text-white leading-none group-hover:opacity-100 opacity-0 transition-all max-md:py-[1.5rem] max-md:px-[1rem]">
        <div>
          <b className="block mb-[1.56rem] text-[2rem] font-bold max-md:mb-[0.5rem] max-md:text-[1.25rem]">
            {name}
          </b>
          <i className="text-[1.25rem] not-italic break-keep max-md:text-[0.75rem]">
            {distance}
          </i>
        </div>
        <div>
          <b className="block mb-[1.5rem] text-[1.5rem] font-bold max-md:mb-[1rem] max-md:text-[1rem]">
            입점 주 산업군
          </b>
          <div className="flex flex-wrap gap-[0.5rem]">
            {mainIndustry.map((industry: string, index) => (
              <span
                key={index}
                className="inline-block p-[0.75rem] rounded-[0.25rem] bg-yellow-600 text-black text-[0.875rem] 
              max-md:text-[0.75rem] max-md:p-[0.5rem] "
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
        {/* <Link href={'/'}>더 알아보기 &nbsp;&gt;</Link> */}
      </div>
    </div>
  );
}
