'use client';
import BlueSquareBtn from './BlueSquareBtn';
import HeartBtn from './HeartBtn';
import MoreBtn from './MoreBtn';

// 미가입자용 버튼
export function NoneMemberIntroduceTopBtn() {
  return (
    <>
      <HeartBtn />
      <BlueSquareBtn name="가입하기" onClick={() => console.log('click')} />
    </>
  );
}

export function IntroduceTopBtn() {
  return (
    <>
      <HeartBtn className="bg-transparent w-[2.5rem] h-[2.5rem]" />
      <MoreBtn className="w-[2.5rem] h-[2.5rem]">
        <button>관리</button>
        <button className="last:border-b-0">탈퇴</button>
      </MoreBtn>
    </>
  );
}
