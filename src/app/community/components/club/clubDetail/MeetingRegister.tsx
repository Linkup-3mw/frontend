'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '@/app/(auth)/components/signup/SignupForm';
import { formatISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { numComma, onlyNum } from '@/utils/utils';
import { registerMeeting } from '@/app/service/clubDetail';
import Alert from '@/app/common/components/modal/Alert';
import SelectDateInput from './SelectDateInput';
import TopBackBtn from './TopBackbtn';

interface Props {
  clubId: number;
}

interface PushAlert {
  message: string;
  buttonName: string;
  onClick: (() => void) | null;
}

export default function MeetingRegister({ clubId }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { isDirty, isValid },
  } = useForm();
  const [alert, setAlert] = useState<PushAlert>({
    message: '',
    buttonName: '',
    onClick: null,
  });
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleInputHour = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length == 2) {
      setFocus('minute');
    }
    const value = Number(e.target.value);

    setValue('hour', value > 12 ? 12 : value);
  };

  useEffect(() => {
    register('fee', {
      onChange: (e) => setValue('fee', numComma(onlyNum(e.target.value))),
    });
    register('hour', {
      onChange: (e) => handleInputHour(e),
    });
    register('minute', {
      onChange: (e) =>
        setValue('minute', e.target.value > 59 ? 59 : onlyNum(e.target.value)),
    });
    register('maxCapacity', {
      onChange: (e) =>
        setValue(
          'maxCapacity',
          e.target.value > 30 ? 30 : onlyNum(e.target.value),
        ),
    });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const parseDate = data.date.split('.').map((text: string) => Number(text));
    const hour = data.time == 'pm' ? data.hour + 12 : data.hour;
    const date = formatISO(
      new Date(parseDate[0], parseDate[1] - 1, parseDate[2], hour, data.minute),
    );

    const params = {
      title: data.title,
      date: date.substring(0, 19),
      meeting_location: data.meeting_location,
      max_capacity: Number(data.max_capacity),
      fee: Number(data.fee.replaceAll(',', '')),
    };
    try {
      const res = await registerMeeting(clubId, params);
      if (res.status_code === 200) {
        setAlert((prev) => ({
          ...prev,
          message: '작성이 완료되었습니다.',
          buttonName: '확인',
          onClick: () => router.push(`/community/club/${clubId}/meeting`),
        }));
        setShowAlert(true);
      } else {
        setShowAlert(true);
        setAlert((prev) => ({
          ...prev,
          message: res.message,
          buttonName: '확인',
          onClick: null,
        }));
      }
    } catch (e: any) {
      const data = e.response.data;
      console.error(e);
      setAlert((prev) => ({
        ...prev,
        message: data.message,
        onClick: null,
        buttonName: '확인',
      }));
      setShowAlert(true);
    }
  };

  return (
    <>
      <div className="pt-[1rem] pb-[1.5rem] max-md:pt-0 max-md:pb-0 max-md:min-h-full">
        <TopBackBtn />
        <div className="px-[2.5rem] max-md:px-[1rem] max-md:h-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="제목을 입력해 주세요."
              className={`${commonFormCss} max-md:h-[1.25rem] max-md:bg-transparent max-md:border-none max-md:!mb-[1.2rem] max-md:p-0 max-md:rounded-none max-md:text-[1.25rem]`}
              {...register('title', {
                required: true,
                maxLength: 40,
              })}
            />
            {/* 날짜 선택 */}
            <div className="mb-[2rem] max-md:mb-[1rem]">
              <SelectDateInput register={register} className={commonFormCss} />
            </div>
            <div
              className={`${commonFormCss} flex items-center justify-center max-md:justify-between max-md:pl-[1rem] max-md:pr-[0.3rem]  has-[:focus]:border-blue-400 `}
            >
              <span>
                <label className={`${timeRadioCss}`}>
                  <input
                    type="radio"
                    value="am"
                    className="hide"
                    defaultChecked={true}
                    {...register('time')}
                  />
                  오전
                </label>
                <label className={`${timeRadioCss}`}>
                  <input
                    type="radio"
                    value="pm"
                    className="hide"
                    {...register('time')}
                  />
                  오후
                </label>
              </span>
              <div className="text-[1rem] font-medium ">
                <input
                  type="number"
                  className={`${timeInputCss}`}
                  placeholder="00"
                  {...register('hour', { required: true })}
                />
                :
                <input
                  type="number"
                  className={`${timeInputCss}`}
                  placeholder="00"
                  {...register('minute', { required: true })}
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="장소"
              className={`${commonFormCss}`}
              {...register('meeting_location', { required: true })}
            />
            <div className="relative block mb-[2rem] max-md:mb-[1rem]">
              <input
                type="text"
                placeholder="회비"
                className={`${commonFormCss} !mb-0`}
                {...register('fee', { required: true })}
              />
              <i className="inline-block absolute right-[1.5rem] top-1/2 -translate-y-1/2 leading-none not-italic max-md:text-[0.875rem]">
                원
              </i>
            </div>
            <div className="relative block mb-[2rem] max-md:mb-[1rem]">
              <input
                type="number"
                placeholder="모임 정원"
                className={`${commonFormCss} !mb-0`}
                {...register('max_capacity', { required: true })}
              />
              <i className="inline-block absolute right-[1.5rem] top-1/2 -translate-y-1/2 leading-none not-italic max-md:text-[0.875rem]">
                명
              </i>
            </div>
            <button
              type="submit"
              className="block mx-auto mt-[5.13rem] min-w-[7.375rem] h-[3rem] rounded-[0.5rem] text-[1.25rem] font-bold disabled:bg-gray-400 bg-blue-400 text-white
            max-md:mt-[1.5rem] max-md:min-w-[3.75rem] max-md:h-[2.125rem] max-md:rounded-[0.25rem] max-md:text-[0.875rem]"
              // disabled={!isDirty || !isValid}
            >
              게시하기
            </button>
          </form>
        </div>
      </div>
      {showAlert && (
        <Alert
          message={alert.message}
          onClick={alert.onClick || undefined}
          buttonName={alert.buttonName}
          setIsShow={setShowAlert}
          showCloseButton={true}
        />
      )}
    </>
  );
}

const commonFormCss = `mb-[2rem] px-[1.5rem] w-full h-[3.5rem] bg-white border-[1.5px] border-gray-200 text-[1rem] font-medium placeholder:text-gray-400 rounded-[0.5rem] outline-none max-md:border-none max-md:mb-[1rem] max-md:text-[0.875rem] focus:border-blue-400 `;
const timeRadioCss = `inline-block p-[0.5rem] has-[:checked]:font-bold has-[:checked]:text-main-black text-gray-500 text-[1rem] font-medium  max-md:text-[0.875rem]`;
const timeInputCss = `h-[3.2rem] w-[3.5rem] text-center outline-none max-md:text-[0.875rem]`;
