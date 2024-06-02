import Terms from '@/app/(auth)/components/terms/Terms';
import { Suspense } from 'react';
import RoundedFrame from '@/app/(auth)/components/common/RoundedFrame';
import Container from '@/app/(auth)/components/common/Container';

// 임시로 넣음
const OPTIONAL_TERMS = [
  { name: 'SMS', id: 'OP001' },
  { name: '이메일', id: 'OP002' },
  { name: '푸시 알림', id: 'OP003' },
];

const REQUIRED_TERMS = [
  { name: '[필수] 이용약관 동의', id: 'NE001' },
  { name: '[필수] 개인정보 처리방침 동의', id: 'NE002' },
  { name: '[필수] 위치정보 서비스 이용약관', id: 'NE003' },
];

export default function TermsPage() {
  return (
    <Container>
      <RoundedFrame>
        <div className="px-[1rem] max-md:px-0">
          <h2 className="mb-[5rem] text-center text-[1.5rem] font-bold leading-none max-md:mb-[2.08rem] max-md:text-[1.25rem]">
            회원가입
          </h2>
          <Suspense>
            <Terms
              optionalTerms={OPTIONAL_TERMS}
              requiredTerms={REQUIRED_TERMS}
            />
          </Suspense>
        </div>
      </RoundedFrame>
    </Container>
  );
}
