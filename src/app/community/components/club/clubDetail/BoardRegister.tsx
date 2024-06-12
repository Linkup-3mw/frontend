'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import API from '@/utils/axios';
import { getClubBoardDetail } from '@/app/service/clubDetail';
import { IClubBoardList } from '@/types/club/detail/clubDetail';
import Alert from '@/app/common/components/modal/Alert';
import TopBackBtn from './TopBackbtn';

interface Props {
  type: string;
  clubId: number;
  postId: number;
}

export default function BoardRegister({ clubId, type, postId }: Props) {
  const [data, setData] = useState<IClubBoardList | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    onClick: (() => void) | null;
  }>({
    message: '',
    onClick: null,
  });

  useEffect(() => {
    const getContentData = async () => {
      const detailData = await getClubBoardDetail(clubId, postId);
      if (detailData) {
        console.log(detailData);
        setData(detailData);
      }
    };
    if (postId) {
      getContentData();
    }
  }, [postId]);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm();

  const router = useRouter();
  const paths = usePathname().substring(1).split('/');

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    const params = {
      ...body,
      type: type.toUpperCase(),
    };

    try {
      let res;
      if (postId) {
        //수정
        res = await API.put(`/club/${clubId}/post/${postId}`, params);
      } else {
        //등록
        res = await API.post(`/club/${clubId}/post`, params);
      }

      if (res.data?.status_code === 200) {
        setAlert((prev) => ({
          ...prev,
          message: '작성이 완료되었습니다.',
          onClick: () =>
            router.push(`/${paths[0]}/${paths[1]}/${clubId}/${type}`),
        }));
      }
      setShowAlert(true);
    } catch (e: any) {
      const data = e.response.data;
      setAlert((prev) => ({
        ...prev,
        message: data.message,
        onClick: null,
      }));
      setShowAlert(true);
      console.error(e);
    }
  };

  return (
    <div>
      <TopBackBtn />
      <div className="px-[2.5rem] text-[0rem] max-md:px-[1rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="제목을 입력해 주세요. (40자 이내)"
            className={`mb-[1rem] px-[1.5rem] w-full h-[3.5rem] border-[1.5px] border-gray-200 text-[1.25rem] font-medium placeholder:text-gray-400 rounded-[0.5rem] ${formMobileCss} max-md:h-[1rem]`}
            defaultValue={data?.title}
            {...register('title', TITLE_VALIDATION)}
          />
          <textarea
            className={`p-[0.9rem] border-[1.5px] border-gray-200 w-full h-[24rem] resize-none rounded-[0.5rem] text-[1rem] leading-[1.75rem] ${formMobileCss} max-md:h-[calc(100vh_-_20.0575rem)] max-md:max-h-[20rem]`}
            placeholder="글을 작성해 주세요. (1000자 이내)"
            defaultValue={data?.content}
            {...register('content', CONTENT_VALIDATION)}
          />
          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className="block mx-auto mt-[2.5rem] min-w-[7.375rem] h-[3rem] rounded-[0.5rem] text-[1.25rem] font-bold disabled:bg-gray-400 bg-blue-400 text-white
            max-md:min-w-[3.75rem] max-md:h-[2.125rem] max-md:rounded-[0.25rem] max-md:text-[0.875rem]"
          >
            게시하기
          </button>
        </form>
      </div>
      {showAlert && (
        <Alert
          message={alert.message}
          onClick={alert.onClick || undefined}
          setIsShow={setShowAlert}
        />
      )}
    </div>
  );
}

const formMobileCss =
  'max-md:bg-transparent max-md:border-none max-md:p-0 max-md:rounded-none outline-none';

const TITLE_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: true,
  maxLength: 40,
};

const CONTENT_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: true,
  maxLength: 1000,
};
