import BoardList from '@/app/community/components/club/clubDetail/BoardList';
import MeetingList from '@/app/community/components/club/clubDetail/MeetingList';

interface Props {
  params: {
    id: number;
    type: string;
  };
}

export default function page({ params }: Props) {
  return (
    <>
      {(params.type === 'board' || params.type === 'notice') && (
        <BoardList clubId={params.id} type={params.type} />
      )}
      {params.type === 'meeting' && <MeetingList clubId={params.id} />}
    </>
  );
}
