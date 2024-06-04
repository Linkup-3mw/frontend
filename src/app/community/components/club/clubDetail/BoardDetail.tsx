'use client';
import Avatar from '@/app/common/components/user/Avatar';
import BoardDetailTopBtn from './BoardDetailTopBtn';
import EnterButton from '@/app/common/components/form/EnterButton';

export default function BoardDetail() {
  return (
    <div className="pt-[1rem] pb-[1.5rem] max-md:pt-0 max-md:pb-0">
      <BoardDetailTopBtn />
      <div className="px-[2rem] overflow-y-auto mb-[1.5rem] h-[45.82vh] max-h-[30.1rem] min-h-[30.1rem] max-md:px-[1rem]  max-md:h-[calc(100vh_-_22.9375rem)] max-md:min-h-[0] ">
        <h2 className="mb-[1.5rem] leading-none text-[1.25rem] font-bold max-md:text-[1.25rem] max-md:leading-[140%]">
          오늘 점심 떡볶이 같이 배달시키실 분?! 3명 구합니다~~
        </h2>
        <div className="flex items-center justify-between mb-[1.75rem] max-md:[1.5rem]">
          <div className="flex gap-[1rem] items-center">
            <Avatar
              image="/images/home/img_office_1.png"
              name="김민수"
              className="border-none w-[2rem] h-[2rem]"
            />
            <span className="text-[0px]">
              <b className="block mb-[0.5] text-[0.875rem] text-gray-800">
                김민수
              </b>
              <i className="text-[0.75rem] text-gray-500 font-bold not-italic">
                디자인
              </i>
            </span>
          </div>
          <i className="not-italic text-[0.75rem] text-gray-500">2024.05.31</i>
        </div>
        <div className="mb-[2.25rem] text-1 font-medium leading-[175%] whitespace-pre-line break-keep max-md:mb-[1.5rem] max-md:text-[0.875rem] max-md:font-medium max-md:leading-[171%]">
          책 읽을 시간이 없다구요??? 소중한 하루를 평범하게 그냥
          흘려보내실건가요??? 그 시간 제가 만들어드릴게요. 함께 책 읽고 책토크를
          통해 나를 업그레이드 시켜보아요. 책플톡톡 독서습관 만들고 싶었는데
          혼자서는 힘드셨나요? 몰입의 시간을 통해 함께 독서하고, 책을 읽으며
          느꼈던 생각을 편안하게 이야기 나눠요. 지적 대화를 통해 함께 성장해요.
          하루를 뿌듯하고 풍요롭게 보내요 하루를 마무리하며, 책토크로 마음을
          채워봐요! 몰입의 시간을 통해 함께 독서하고, 책을 읽으며 느꼈던 생각을
          편안하게 이야기 나눠요. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sapiente ea cum, quo enim beatae soluta officiis
          modi qui? Laborum obcaecati hic deleniti necessitatibus reprehenderit
          laboriosam tempore deserunt quisquam alias rem.
        </div>

        {/* 댓글 */}
        <div className="pt-[0.5rem] border-t-2 border-gray-300">
          {/* 댓글 목록 */}
          <ul className="[&_>_li]:my-[1.5rem]">
            <li>
              <div className="flex gap-[1rem] items-center">
                <Avatar
                  image="/images/home/img_office_1.png"
                  name="김민수"
                  className="border-none w-[2.5rem] h-[2.5rem]"
                />
                <span className="text-[0px]">
                  <b className="inline-block mb-[0.3rem]  text-[0.875rem] text-gray-800 leading-none align-middle">
                    김민수
                    <i className="inline-block before:inline-block before:mx-[0.5rem] before:w-[2px] before:h-[0.625rem] before:bg-gray-300 text-[0.75rem] text-gray-500 font-bold not-italic  leading-none">
                      디자인
                    </i>
                  </b>
                  <p className="text-[1rem]">책을 많이 읽어봅시다~~!</p>
                </span>
              </div>
            </li>
            <li>
              <div className="flex gap-[1rem] items-center">
                <Avatar
                  image="/images/home/img_office_1.png"
                  name="김민수"
                  className="border-none w-[2.5rem] h-[2.5rem]"
                />
                <span className="text-[0px]">
                  <b className="inline-block mb-[0.3rem]  text-[0.875rem] text-gray-800 leading-none align-middle">
                    김민수
                    <i className="inline-block before:inline-block before:mx-[0.5rem] before:w-[2px] before:h-[0.625rem] before:bg-gray-300 text-[0.75rem] text-gray-500 font-bold not-italic  leading-none">
                      디자인
                    </i>
                  </b>
                  <p className="text-[1rem]">책을 많이 읽어봅시다~~!</p>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* 댓글 input */}
      <div className="px-[2rem] max-md:px-[1rem] max-md:bg-blue-50">
        {/* <div className="px-[2rem] max-md:px-[1rem] max-md:bg-blue-50 max-md:fixed max-md:bottom-[0.75rem] max-md:left-[1.25rem] max-md:right-[1.25rem] max-md:py-[1.5rem] max-md:w-[calc(100%_-_2.5rem)] max-md:h-[6.5rem]"> */}
        <div className="relative">
          <input
            className={`block pl-[1rem] pr-[3rem] w-full h-[3rem] bg-white box-border focus-visible:outline-none focus-visible:border-blue-500  autofill:border-white autofill:border-solid rounded-[0.5rem] text-[1rem] font-bold placeholder:text-gray-400
            max-md:h-[3.5rem] max-md:text-[0.875rem] max-md:rounded-[0.5rem]
            `}
            type="input"
            placeholder="댓글을 입력해 주세요."
          />
          <EnterButton
            className="absolute right-[1rem] top-1/2 -translate-y-1/2"
            onClick={() => console.log('click')}
          />
        </div>
      </div>
    </div>
  );
}
