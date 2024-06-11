import dynamic from 'next/dynamic';

const FadeLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.FadeLoader),
  {
    ssr: false,
  },
);
export default function CircleLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <FadeLoader color="#688AF2" />
    </div>
  );
}
