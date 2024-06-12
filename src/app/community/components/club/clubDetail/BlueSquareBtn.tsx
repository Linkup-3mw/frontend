import { PulseLoader } from 'react-spinners';

interface Props {
  name: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}
export default function BlueSquareBtn({
  name,
  onClick,
  disabled = false,
  isLoading = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="overflow-hidden relative min-w-[7.375rem] h-[3rem] rounded-[0.5rem] bg-blue-400 text-[1.25rem] font-bold text-white
      disabled:bg-gray-400 max-md:min-w-[4.0625rem] max-md:h-[2.125rem] max-md:rounded-[0.25rem] max-md:text-[0.875rem]
      "
    >
      {name}
      {isLoading && (
        <div className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[rgba(104,148,242,0.8)]">
          <PulseLoader size={6} color="white" />
        </div>
      )}
    </button>
  );
}
