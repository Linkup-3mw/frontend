import Image from 'next/image';

interface Props {
  isActive?: boolean;
  image: string;
  text: string;
  className?: string;
}
export default function FlipCard({
  isActive = false,
  image,
  text,
  className,
}: Props) {
  return (
    <div
      className={`relative mx-auto w-full h-full max-w-[25rem] max-h-[25rem] aspect-square transition-all
      max-md:w-[33.33vw] max-md:h-[33.33vw] max-md:min-w-[7.5rem] max-md:min-h-[7.5rem] ${className}
      ${isActive ? 'scale-[1.3]  max-md:scale-[1.66]' : 'scale-100'}`}
    >
      <div
        className={`w-full h-full transition-all`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* front */}
        <div
          className={`absolute flex-1 w-full h-full aspect-square`}
          style={
            isActive
              ? {
                  transform: 'perspective(600px) rotateY(-180deg)',
                  backfaceVisibility: 'hidden',
                  transition: 'transform 1s linear 0s',
                }
              : {
                  transform: 'perspective(600px) rotateY(0deg)',
                  backfaceVisibility: 'hidden',
                  transition: 'transform 1s linear 0s',
                }
          }
        >
          <Image
            src={`/images/home/${image}`}
            alt="building"
            width={400}
            height={400}
            className="block w-full h-full"
          />
        </div>
        {/* back */}
        <div
          className="w-full h-full absolute  flex flex-[1.25] aspect-square items-center justify-center rounded-full bg-yellow-100"
          style={
            isActive
              ? {
                  transform: 'perspective(600px) rotateY(0deg)',
                  backfaceVisibility: 'hidden',
                  transition: 'transform 1s linear 0s',
                }
              : {
                  transform: 'perspective(600px) rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  transition: 'transform 1s linear 0s',
                }
          }
        >
          <p className="text-[1.5rem] font-semibold leading-[3rem] text-center max-md:text-[0.52rem] max-md:leading-[1.42] whitespace-pre-line max-md:font-bold">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
