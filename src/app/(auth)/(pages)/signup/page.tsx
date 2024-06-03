import Container from '@/app/(auth)/components/common/Container';
import RoundedFrame from '@/app/(auth)/components/common/RoundedFrame';
import SignupForm from '@/app/(auth)/components/signup/SignupForm';
import MobileBackBtn from '@/app/common/components/form/MobileBackBtn';

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
        <div className="relative">
          <MobileBackBtn className="absolute left-0 -top-[0.3rem]" />
          <h2 className="mb-[2.5rem] text-center text-[1.5rem] font-bold leading-none max-md:mb-[2.08rem] max-md:text-[1.25rem]">
            {!type ? '개인 회원가입' : '기업 회원가입'}
          </h2>
        </div>
        <SignupForm type={type} />
      </RoundedFrame>
    </Container>
  );
}
