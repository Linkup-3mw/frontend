import CircleWithCheck from '@/app/common/components/icons/CircleWithCheck';

interface Props {
  name: string;
  price: string;
  description: string;
  summary: string[];
}

export default function RatePlanCard({
  name,
  price,
  description,
  summary,
}: Props) {
  return (
    <div className="flex-1 flex-shrink-0 py-[2.5rem] p-[1.25rem] min-h-[35.3125rem] box-border  bg-white rounded-[1rem] leading-none max-md:py-[1.5rem] max-md:min-h-[20.8125rem] max-md:min-w-[16.5rem] max-md:flex-grow">
      <div className="mx-auto max-w-[21.6rem] w-full">
        <b className="block mb-[1.5rem] text-[1.75rem] font-bold max-md:mb-[0.5rem] max-md:text-[1.25rem]">
          {name}
        </b>
        <strong className="block mb-[2.5rem] text-[2rem] font-black break-keep max-md:mb-[1.5rem] max-md:text-[0.75rem] max-md:font-bold ">
          {price}
        </strong>
        <p className="mb-[4.8rem] leading-[1.75rem] whitespace-pre-line text-[1.25rem] font-medium max-md:mb-[4rem] max-md:leading-[1.25rem] max-md:text-[0.875rem]">
          {description}
        </p>
        <ul className="flex flex-col gap-[2rem] text-[1.25rem] max-md:gap-[0.5rem] max-md:text-[0.875rem]">
          {summary.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-block mr-[0.5rem] flex-shrink-0 w-[1rem] h-[1rem]">
                <CircleWithCheck fillColor="#688af2" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
