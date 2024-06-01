import Container from '@/app/(auth)/components/common/Container';
import RoundedFrame from '@/app/(auth)/components/common/RoundedFrame';
import SignupForm from '@/app/(auth)/components/signup/SignupForm';

interface Props {
  searchParams: {
    type: string;
    agrees: string;
  };
}

export default function SignupPage({ searchParams: { type } }: Props) {
  return (
    <Container>
      <RoundedFrame>
        <h2 className="mb-[2.5rem] text-center text-[1.5rem] font-bold">
          {!type ? '회원가입' : '기업 회원가입'}
        </h2>
        <SignupForm type={type} />
      </RoundedFrame>
    </Container>
  );
}
