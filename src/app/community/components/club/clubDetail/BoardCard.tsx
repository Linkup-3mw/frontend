import {
  CommentIcon,
  SpeakerIcon,
} from '@/app/common/components/icons/MeetingIcons';
import Avatar from '@/app/common/components/user/Avatar';

interface Props {
  isDetail?: boolean;
}
export default function BoardCard({ isDetail = false }: Props) {
  return (
    <div className="p-[1.5rem] bg-white rounded-[0.5rem]">
      <h3 className="mb-[1.5rem] text-[1rem] font-bold">
        {isDetail && (
          <SpeakerIcon className="inline-block mr-[0.5rem] align-baseline stroke-[1.5px]" />
        )}
        소모임 상세 소개 등등 제목
      </h3>
      <div className="mb-[2rem] min-h-[1.875rem] leading-[142.85%] whitespace-pre-line two_line_dot_three text-[0.875] max-md:mb-[1.91rem] max-md:text-[0.75rem]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod totam unde
        accusamus, architecto a atque non, laborum doloribus quisquam corporis
        iusto, facere labore quos consectetur ratione ipsa quo molestias iure.
      </div>
      <div className="flex items-end justify-between">
        <div className="flex gap-[1rem] items-center">
          <Avatar
            image="/images/home/img_office_1.png"
            name="김민수"
            className="border-none w-[2rem] h-[2rem]"
          />
          <span className="text-[0px]">
            <b className="block mb-[0.5] text-[0.875rem] text-gray-800">
              김민수
            </b>
            <i className="text-[0.75rem] text-gray-500 font-bold not-italic">
              디자인
            </i>
          </span>
        </div>
        <div className="text-[0.75rem]">
          {!isDetail && (
            <span className="inline-block mr-[1rem]">
              <CommentIcon className="inline-block mr-[0.5rem] stroke-[1.5px] align-middle" />
              13
            </span>
          )}
          <i className="not-italic text-[#8d8d8d]">2024.05.11</i>
        </div>
      </div>
    </div>
  );
}
