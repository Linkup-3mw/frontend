import CrownBadge from '../icons/CrownBadge';

interface Props {
  image: string;
  name: string;
  type?: 'admin' | 'host' | undefined;
  className?: string;
}

export default function Avatar({ image, name, type, className }: Props) {
  return (
    <div
      className={`relative w-[2.5rem] h-[2.5rem] border-[3px] border-solid border-[#eee] rounded-full box-border ${className}
    `}
    >
      <img
        //임시 경로
        src={`${image}`}
        alt={name + '이미지'}
        className="w-full h-full rounded-full"
      />
      {type && (
        <CrownBadge
          className={`absolute -right-[0.25rem] -top-[0.2rem] w-[50%] h-[50%]`}
          // className={`absolute -right-[0.25rem] -top-[0.2rem] max-md:w-[0.75rem] max-md:h-[0.75rem] `}
          fillColor={type == 'admin' ? '#97BAFE' : '#F9D91B'}
        />
      )}
    </div>
  );
}
