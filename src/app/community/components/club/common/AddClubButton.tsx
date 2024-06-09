import { useRouter } from 'next/navigation';

interface AddClubButtonProps {
  className?: string;
}

export default function AddClubButton({ className }: AddClubButtonProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/community/club/create');
  };

  return (
    <button
      className={`bg-blue-400 text-white text-2xl rounded-full ${className}`}
      onClick={handleButtonClick}
    >
      +
    </button>
  );
}
