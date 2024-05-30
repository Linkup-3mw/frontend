// 요금제 종류
export const TYPE_OF_RATEPLAN = [
  {
    id: 1,
    name: '1일 패스',
    price: '20,000원',
    description: `지점마다 어떤지 알고 싶은데\n하루만 맛보기로 체험하고 싶을 때!`,
    summary: [
      '44개 지점 중 한 곳 이용',
      '한 지점 내 4가지 유형 자율 좌석',
      '자율 좌석 변경 가능',
      '다양한 공간 대여 가능',
    ],
  },
  {
    id: 2,
    name: '30일 패스',
    price: '450,000원',
    description: `나만의 자리를 얻고\n내가 원하는 환경에서 근무하고 싶을 때!`,
    summary: [
      '44개 지점 중 한 곳 이용',
      '4가지 유형 자율 좌석 이용',
      '자율 좌석 변경 가능',
      '한 지점의 지정 좌석 제공',
      '다양한 공간 대여 가능',
    ],
  },
  {
    id: 3,
    name: '기업 전용 멤버십',
    price: '문의하기 후 맞춤 제공',
    description: `번거로운 과정이 없고\n유연한 계약을 통해 입주하고 싶을 때!`,
    summary: [
      '44개 지점 중 한 곳 이용',
      '4가지 유형 자율 좌석 이용',
      '자율 좌석 변경 가능',
      '한 지점의 기업 전용 오피스 제공',
      '다양한 공간 대여 가능',
      '공간 예약 크레딧 제공',
    ],
  },
];

//스와이퍼 내용
export const FLIP_CONTENT = [
  {
    id: 1,
    text: `타사보다 약 20%\n저렴한 합리적인 비용`,
    image: 'img_circle_office3.png',
  },
  {
    id: 2,
    text: `국내 최대 규모\n서울 44개 지점`,
    image: 'img_circle_office.png',
  },
  {
    id: 3,
    text: `맞춤형 필터 제공\n내가 원하는 공유 오피스를\n찾아보세요`,
    image: 'img_circle_office4.png',
  },
  {
    id: 4,
    text: `내 직무에 맞는 공간\n4가지 스타일의 미팅룸 제공`,
    image: 'img_circle_office2.png',
  },
  {
    id: 5,
    text: `다양한 사람과의 소통\n협업, 프로젝트, 소모임\n서비스 제공`,
    image: 'img_circle_office5.png',
  },
];
