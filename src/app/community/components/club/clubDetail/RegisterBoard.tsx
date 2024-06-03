'use client';
import TopBackBtn from './TopBackbtn';

export default function RegisterBoard() {
  return (
    <div className="pt-[1rem] pb-[1.5rem] max-md:pt-0 max-md:pb-0">
      <TopBackBtn />
      <div className="px-[2.5rem] text-[0rem] max-md:px-[1rem]">
        <form>
          <input
            type="text"
            placeholder="제목을 입력해 주세요. (40자 이내)"
            className={`mb-[1rem] px-[1.5rem] w-full h-[3.5rem] border-[1px] border-gray-200 text-[1.25rem] font-medium placeholder:text-gray-400 rounded-[0.5rem] ${formMobileCss} max-md:h-[1rem]`}
          />
          <textarea
            className={`p-[0.9rem] border-[1px] border-gray-200 w-full h-[24rem] resize-none rounded-[0.5rem] text-[1rem] leading-[1.75rem] ${formMobileCss} max-md:h-[calc(100vh_-_20.0575rem)] max-md:max-h-[30rem]`}
            placeholder="글을 작성해 주세요. (1000자 이내)"
          />
          <button
            type="submit"
            className="block mx-auto mt-[2.5rem] min-w-[7.375rem] h-[3rem] rounded-[0.5rem] text-[1.25rem] font-bold disabled:bg-gray-400 bg-blue-400 text-white
            max-md:min-w-[3.75rem] max-md:h-[2.125rem] max-md:rounded-[0.25rem] max-md:text-[0.875rem]"
          >
            게시하기
          </button>
        </form>
      </div>
    </div>
  );
}

const formMobileCss =
  'max-md:bg-transparent max-md:border-none max-md:p-0 max-md:rounded-none outline-none';
