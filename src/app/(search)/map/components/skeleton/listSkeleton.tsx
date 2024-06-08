export default function ListSkeleton() {
  return (
    // animation-pulse
    <div className="flex justify-center p-2 md:rounded-lg mb:rounded-sm animate-pulse ">
      <div className="md:w-[26.6875rem] md:h-[8.5rem] max-md:w-full mb:h-[5.875rem] flex gap-5 p-4 bg-gray-200 opacity-75 items-center rounded-md shadow-md">
        <div className="flex flex-col space-y-4 justify-between">
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          <div className="h-4 bg-gray-300 rounded w-3/5"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}
