export default function SearchInput() {
  return (
    <div className="relative w-[30rem]">
      <input
        type="text"
        placeholder="찾고 싶은 소모임 제목, 내용 등을 입력해 주세요."
        className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-300 mb:h-[2.5rem]"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
        <img
          src="/svg/club/search.svg"
          alt="Search Icon"
          className="w-6 h-6 mr-1"
        />
      </div>
    </div>
  );
}
