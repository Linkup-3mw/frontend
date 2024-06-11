import DetailContent from '@/app/community/components/club/clubDetail/DetailContent';

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params: { id } }: Props) {
  return <DetailContent clubId={Number(id)} />;
}
