'use client';
import EnterButton from '@/app/common/components/form/EnterButton';
import { registerComment } from '@/app/service/clubDetail';
import { useRouter } from 'next/navigation';
import { RefObject, useState } from 'react';

{
  /* 댓글 input */
}

interface Props {
  clubId: number;
  postId: number;
  postType: string;
  scrollRef: RefObject<HTMLDivElement>;
}

export default function CommentInput({
  scrollRef,
  clubId,
  postId,
  postType,
}: Props) {
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await registerComment(clubId, postId, postType, value);
    if (res.status_code === 200) {
      router.refresh();
      setValue('');
      console.log('refresh');

      if (scrollRef.current)
        scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  };

  return (
    <div className="px-[2rem] max-md:px-[1rem] max-md:bg-blue-50">
      {/* <div className="px-[2rem] max-md:px-[1rem] max-md:bg-blue-50 max-md:fixed max-md:bottom-[0.75rem] max-md:left-[1.25rem] max-md:right-[1.25rem] max-md:py-[1.5rem] max-md:w-[calc(100%_-_2.5rem)] max-md:h-[6.5rem]"> */}
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <input
            className={`block pl-[1rem] pr-[3rem] w-full h-[3rem] bg-white box-border focus-visible:outline-none focus-visible:border-blue-500  autofill:border-white autofill:border-solid rounded-[0.5rem] text-[1rem] font-bold placeholder:text-gray-400
            max-md:h-[3.5rem] max-md:text-[0.875rem] max-md:rounded-[0.5rem]
            `}
            type="input"
            placeholder="댓글을 입력해 주세요."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <EnterButton className="absolute right-[1rem] top-1/2 -translate-y-1/2" />
        </form>
      </div>
    </div>
  );
}
