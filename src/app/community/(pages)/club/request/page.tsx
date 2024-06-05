// /community/club/request
import ClubRequestForm from '@/app/community/components/club/ClubRequestForm';

export default function ClubRequestPage() {
  return (
    <ClubRequestForm
      clubName="얼렁뚱땅 굴러가는 디자이너 모임"
      clubDescription="최강짱 잠없는 디자이너라면 누구든지 환영최강짱 잠없는 디자이너라면 누구="
      questions={[
        '간단한 자기소개를 써주세요.',
        '매주 목요일 정기 모임이 있습니다. 참석 가능하신가요?',
        '열심히 참여해주셔야 합니다!',
      ]}
    />
  );
}
