export default function ModalSkeleton() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-[#E4EEFF] max-md:w-[20rem]  md:w-[46.75rem] h-[23.25rem] rounded-xl shadow-lg flex flex-col justify-center p-8">
        <div className="animate-pulse flex flex-col space-y-4 justify-between">
          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-8 w-2/4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
