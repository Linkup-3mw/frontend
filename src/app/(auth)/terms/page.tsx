import RoundedCheckbox from '@/app/common/components/form/RoundedCheckbox';
import Container from '../components/Container';
import RoundedFrame from '../components/RoundedFrame';
import Checkbox from '@/app/common/components/form/CheckBox';

// 임시로 넣음
const OPTIONAL_TERMS = [
  { name: 'SMS', id: 1 },
  { name: '이메일', id: 2 },
  { name: '푸시 알림', id: 3 },
];

const REQUIRED_TERMS = [
  { name: '[필수] 이용약관 동의', id: 1 },
  { name: '[필수] 개인정보 처리방침 동의', id: 2 },
  { name: '[필수] 위치정보 서비스 이용약관', id: 3 },
];

export default function TermsPage() {
  return (
    <Container>
      <RoundedFrame>
        <div className="w-[32.5rem]">
          <h2 className="mb-[2rem] text-center text-[1.5rem] font-bold">
            회원가입
          </h2>
          <form>
            <div className="mb-[2rem]">
              <div className="mb-[2rem]">
                <RoundedCheckbox>
                  <b className="font-[1.25rem]">
                    [선택] 혜택 및 마케팅 정보 수신 동의
                  </b>
                </RoundedCheckbox>
              </div>
              {OPTIONAL_TERMS.map(({ id, name }) => {
                return (
                  <span className="block mb-[1.5rem]">
                    <Checkbox key={id}>
                      <b>{name}</b>
                    </Checkbox>
                  </span>
                );
              })}
              <p className="text-[1rem] text-gray-400 font-medium">
                예약 및 결제 정보는 수신 동의 여부와 관계없이 발송됩니다.
              </p>
            </div>
            <div className="mb-[2rem]">
              <div className="mb-[2rem]">
                <RoundedCheckbox>
                  <b className="font-[1.25rem]">[필수] 전체동의</b>
                </RoundedCheckbox>
              </div>

              {REQUIRED_TERMS.map(({ id, name }) => {
                return (
                  <span className="block mb-[1.5rem]" key={id}>
                    <Checkbox>
                      <b>{name}</b>
                    </Checkbox>
                  </span>
                );
              })}
            </div>
            <button className="blue_square_btn !h-[3.5rem]">
              동의하고 가입하기
            </button>
          </form>
        </div>
      </RoundedFrame>
    </Container>
  );
}
