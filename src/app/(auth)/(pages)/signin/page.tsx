import Link from 'next/link';
import Container from '@/app/(auth)/components/common/Container';
import RoundedFrame from '@/app/(auth)/components/common/RoundedFrame';
import Login from '@/app/(auth)/components/signin/Login';

interface Props {
  searchParams: {
    callbackUrl: string;
  };
}

export default async function SignInpage({
  searchParams: { callbackUrl },
}: Props) {
  return (
    <Container>
      <RoundedFrame>
        <Login callbackUrl={callbackUrl ?? '/'} />
        <Link
          className={`mt-[1rem] mb-[1rem] ${BlueBorderLink}`}
          href={'/terms?type=enterprise'}
        >
          기업 회원가입
        </Link>
        <Link
          className={`mt-[1rem] mb-[1rem] ${BlueBorderLink} max-md:mb-[0.5rem]`}
          href={'/terms'}
        >
          개인 회원가입
        </Link>
      </RoundedFrame>
    </Container>
  );
}

const BlueBorderLink = `block w-full h-[3.875rem] border-[1.5px] border-solid border-blue-400 rounded-[0.5rem] text-main-black text-[1.25rem] font-bold text-center leading-[3.875rem] max-md:h-[2.75rem] max-md:leading-[2.75rem] max-md:rounded-[0.5rem] max-md:text-[1rem] max-md:border-[1px]`;
