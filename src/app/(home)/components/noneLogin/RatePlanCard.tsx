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
    <div className="flex-1 flex-shrink-0 py-[2.5rem] p-[1.25rem] min-h-[35.3125rem] box-border  bg-white rounded-[1rem] leading-none">
      <div className="mx-auto max-w-[21.6rem] w-full">
        <b className="block mb-[1.5rem] text-[1.75rem] font-bold">{name}</b>
        <strong className="block mb-[2.5rem] text-[2rem] font-black break-keep">
          {price}
        </strong>
        <p className="mb-[5rem] leading-[1.75rem]">{description}</p>
        <ul className="flex flex-col gap-[2rem]">
          {summary.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-block mr-[0.5rem] w-[1rem] h-[1rem]">
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
