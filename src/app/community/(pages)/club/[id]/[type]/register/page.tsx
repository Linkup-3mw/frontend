import BoardRegister from '@/app/community/components/club/clubDetail/BoardRegister';
import MeetingRegister from '@/app/community/components/club/clubDetail/MeetingRegister';

interface Props {
  params: {
    id: number;
    type: string;
  };
  searchParams: {
    post: number;
  };
}

export default function RegisterPage({ params, searchParams }: Props) {
  if (params.type === 'notice' || params.type == 'board') {
    return (
      <BoardRegister
        type={params.type}
        clubId={params.id}
        postId={searchParams.post}
      />
    );
  }

  if (params.type === 'meeting') {
    return <MeetingRegister clubId={params.id} />;
  }
}
