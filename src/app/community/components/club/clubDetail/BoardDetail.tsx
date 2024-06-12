'use client';
import Avatar from '@/app/common/components/user/Avatar';
import BoardDetailTopBtn from './BoardDetailTopBtn';
import { IBoardComment, IClubBoardList } from '@/types/club/detail/clubDetail';
import { dateDot } from '@/utils/utils';
import { getSession } from '@/utils/getSession';
import CommentInput from './CommentInput';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import NoDataMessage from './NoDataMessage';

interface Props {
  data: IClubBoardList | undefined;
  clubId: number;
  postId: number;
  postType: string;
}

export default function BoardDetail({ data, clubId, postId, postType }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const userId = Number(session?.user.id);

  if (!data) {
    return <NoDataMessage />;
  }

  const {
    id,
    title,
    content,
    comments,
    type,
    date,
    writer_id,
    writer_name,
    writer_username,
    writer_occupation,
    writer_thumbnail,
  } = data;

  return (
    <div>
      <BoardDetailTopBtn showMoreButton={writer_id === userId} postId={id} />
      <div
        ref={scrollRef}
        className="px-[2rem] overflow-y-auto mb-[1.5rem] h-[45.82vh] max-h-[28.9rem] min-h-[28.9rem] max-md:px-[1rem]  max-md:h-[calc(100vh_-_22.9375rem)] max-md:min-h-[0] "
      >
        <h2 className="mb-[1.5rem] leading-none text-[1.25rem] font-bold max-md:text-[1.25rem] max-md:leading-[140%]">
          {title}
        </h2>
        <div className="flex items-center justify-between mb-[1.75rem] max-md:[1.5rem]">
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
          {date && (
            <i className="not-italic text-[0.75rem] text-gray-500">
              {dateDot(date)}
            </i>
          )}
        </div>
        <div className="mb-[2.25rem] text-1 font-medium leading-[175%] whitespace-pre-line break-keep max-md:mb-[1.5rem] max-md:text-[0.875rem] max-md:font-medium max-md:leading-[171%]">
          {content}
        </div>

        {/* 댓글 */}
        {comments && comments.length > 0 && (
          <div className="pt-[0.5rem] border-t-2 border-gray-300">
            {/* 댓글 목록 */}
            <ul className="[&_>_li]:my-[1.5rem]">
              {comments.map(
                ({
                  comment_id,
                  comment,
                  club_member_username,
                  club_member_thumbnail,
                  club_member_occupation,
                }: IBoardComment) => {
                  return (
                    <li key={comment_id}>
                      <div className="flex gap-[1rem] items-center">
                        <Avatar
                          image={
                            club_member_thumbnail ||
                            '/svg/header/profileDefault.svg'
                          }
                          name={club_member_username}
                          className="border-none w-[2.5rem] h-[2.5rem]"
                        />
                        <span className="text-[0px]">
                          <b className="inline-block mb-[0.3rem]  text-[0.875rem] text-gray-800 leading-none align-middle">
                            {club_member_username}
                            <i className="inline-block before:inline-block before:mx-[0.5rem] before:w-[2px] before:h-[0.625rem] before:bg-gray-300 text-[0.75rem] text-gray-500 font-bold not-italic  leading-none">
                              {club_member_occupation}
                            </i>
                          </b>
                          <p className="text-[1rem]">{comment}</p>
                        </span>
                      </div>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 댓글 input */}
      <CommentInput
        scrollRef={scrollRef}
        clubId={clubId}
        postId={postId}
        postType={postType}
      />
    </div>
  );
}
