'use client';
import TopBackBtn from './TopBackbtn';
import SelectDateInput from './SelectDateInput';

export default function MeetingRegister() {
  return (
    <div className="pt-[1rem] pb-[1.5rem] max-md:pt-0 max-md:pb-0 max-md:min-h-full">
      <TopBackBtn />
      <div className="px-[2.5rem] max-md:px-[1rem] max-md:h-full">
        <form>
          <input
            type="text"
            placeholder="제목을 입력해 주세요."
            className={`${commonFormCss} max-md:h-[1.25rem] max-md:bg-transparent max-md:border-none max-md:!mb-[1.2rem] max-md:p-0 max-md:rounded-none max-md:text-[1.25rem]`}
          />
          {/* 날짜 선택 */}
          <div className="mb-[2rem] max-md:mb-[1rem]">
            <SelectDateInput className={commonFormCss} />
          </div>
          <div
            className={`${commonFormCss} flex items-center justify-center max-md:justify-between max-md:pl-[1rem] max-md:pr-[0.3rem]`}
          >
            <span>
              <label className={`${timeRadioCss}`}>
                <input type="radio" name="time" value="am" className="hide" />
                오전
              </label>
              <label className={`${timeRadioCss}`}>
                <input type="radio" name="time" value="pm" className="hide" />
                오후
              </label>
            </span>
            <div className="text-[1rem] font-medium ">
              <input
                type="number"
                className={`${timeInputCss}`}
                placeholder="00"
                name="hour"
              />
              :
              <input
                type="number"
                className={`${timeInputCss}`}
                placeholder="00"
                name="minute"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="장소"
            className={`${commonFormCss}`}
          />
          <div className="relative block mb-[2rem] max-md:mb-[1rem]">
            <input
              type="number"
              placeholder="회비"
              className={`${commonFormCss} !mb-0`}
            />
            <i className="inline-block absolute right-[1.5rem] top-1/2 -translate-y-1/2 leading-none not-italic max-md:text-[0.875rem]">
              원
            </i>
          </div>
          <button
            type="submit"
            className="block mx-auto mt-[5.13rem] min-w-[7.375rem] h-[3rem] rounded-[0.5rem] text-[1.25rem] font-bold disabled:bg-gray-400 bg-blue-400 text-white
            max-md:mt-[1.5rem] max-md:min-w-[3.75rem] max-md:h-[2.125rem] max-md:rounded-[0.25rem] max-md:text-[0.875rem]"
          >
            게시하기
          </button>
        </form>
      </div>
    </div>
  );
}

const commonFormCss = `mb-[2rem] px-[1.5rem] w-full h-[3.5rem] bg-white border-[1.5px] border-gray-200 text-[1rem] font-medium placeholder:text-gray-400 rounded-[0.5rem] outline-none max-md:border-none max-md:mb-[1rem] max-md:text-[0.875rem] `;
const timeRadioCss = `inline-block p-[0.5rem] has-[:checked]:font-bold has-[:checked]:text-main-black text-gray-500 text-[1rem] font-medium  max-md:text-[0.875rem]`;
const timeInputCss = `h-[3.2rem] w-[3.5rem] text-center outline-none max-md:text-[0.875rem]`;
