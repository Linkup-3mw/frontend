export default function ResertorySkeleton() {
  return (
    <div className="flex justify-center p-2 md:rounded-lg mb:rounded-sm animate-pulse">
      <div className="w-full h-auto mb-4 rounded-lg cursor-pointer flex gap-5 p-4 bg-gray-200 opacity-75 items-center  shadow-md">
        <div className="flex flex-col space-y-4 justify-between">
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          <div className="h-4 bg-gray-300 rounded w-3/5"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}
export function ResertoryTitleSkeleton() {
  return (
    <>
      <p className="h-6 bg-gray-200  rounded-lg w-4/5 "></p>
    </>
  );
}
