export default function TimeSkeleton() {
  return (
    <>
      <div className="flex p-1 justify-center d:rounded-lg mb:rounded-sm animate-pulse">
        <div className="w-[4rem] h-[1.8rem] max-md:w-full  bg-gray-200 opacity-75 items-center rounded-md shadow-lg">
          {/* <div className="flex flex-col space-y-4 justify-between">
            <div className=" bg-gray-300 rounded w-4/5"></div>
            <div className=" bg-gray-300 rounded w-3/5"></div>
            <div className=" bg-gray-300 rounded w-4/6"></div>
          </div> */}
        </div>
      </div>
    </>
  );
}
