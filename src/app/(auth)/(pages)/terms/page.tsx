import Terms from '../../components/terms/Terms';

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
    <Terms optionalTerms={OPTIONAL_TERMS} requiredTerms={REQUIRED_TERMS} />
  );
}
