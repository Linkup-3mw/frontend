import {
  CommentIcon,
  SpeakerIcon,
} from '@/app/common/components/icons/MeetingIcons';
import Avatar from '@/app/common/components/user/Avatar';
import { IClubBoardList } from '@/types/club/detail/clubDetail';
import { dateDot } from '@/utils/utils';

interface Props {
  isDetail?: boolean;
  boardContent: IClubBoardList;
  onClick: () => void;
}

export default function BoardCard({
  isDetail = false,
  boardContent,
  onClick,
}: Props) {
  const {
    title,
    id,
    type,
    date,
    content,
    writer_thumbnail,
    writer_username,
    writer_occupation,
    comments,
  } = boardContent;

  return (
    <div
      className="p-[1.5rem] bg-white rounded-[0.5rem] cursor-pointer"
      onClick={onClick}
    >
      <h3 className="mb-[1.5rem] text-[1rem] font-bold">
        {isDetail && (
          <SpeakerIcon className="inline-block mr-[0.5rem] align-baseline stroke-[1.5px]" />
        )}
        {title}
      </h3>
      <div className="mb-[2rem] min-h-[2.475rem] leading-[142.85%] whitespace-pre-line two_line_dot_three text-[0.875rem] max-md:mb-[1.91rem] max-md:text-[0.75rem]">
        {content}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex gap-[1rem] items-center">
          <Avatar
            image={writer_thumbnail || '/svg/header/profileDefault.svg'}
            name={writer_username}
            className="border-none w-[2rem] h-[2rem]"
          />
          <span className="text-[0px]">
            <b className="block mb-[0.5] text-[0.875rem] text-gray-800">
              {writer_username}
            </b>
            <i className="text-[0.75rem] text-gray-500 font-bold not-italic">
              {writer_occupation}
            </i>
          </span>
        </div>
        <div className="text-[0.75rem]">
          {!isDetail && comments && (
            <span className="inline-block mr-[1rem]">
              <CommentIcon className="inline-block mr-[0.5rem] stroke-[1.5px] align-middle" />
              {comments.length}
            </span>
          )}
          <i className="not-italic text-[#8d8d8d]">{dateDot(date)}</i>
        </div>
      </div>
    </div>
  );
}
