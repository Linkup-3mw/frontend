import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from './Modal';

interface CreateGroupFormProps {
  onClose: () => void;
}

const approvalType = ['immediate', 'approval'] as const;

const categories = [
  '운동/스포츠',
  '직무계발',
  '외국어',
  '문화/예술',
  '여행',
  '봉사활동',
  '미디어 관람',
  '경제/재테크',
  '기타',
] as const;

const preprocessCapacity = (val: number | string) => {
  const parsedVal = typeof val === 'string' ? parseFloat(val) : val;
  return isNaN(parsedVal) || parsedVal < 1 || parsedVal > 30
    ? undefined
    : parsedVal;
};

const Schema = z.object({
  approvalType: z.enum(approvalType, {
    required_error: '승인 유형을 선택해 주세요.',
  }),
  category: z.enum(categories, {
    required_error: '모임 카테고리를 선택해 주세요.',
  }),
  capacity: z
    .number({
      required_error: '모집 정원을 30명 이내로 입력하세요',
    })
    .refine(preprocessCapacity, {
      message: '모집 정원을 30명 이내로 입력하세요',
    }),
  basePoint: z
    .string({
      required_error: '베이스 지점을 선택해 주세요.',
    })
    .nonempty('베이스 지점을 선택해 주세요.'),
  clubName: z
    .string({
      required_error: '소모임 이름을 입력해 주세요.',
    })
    .max(16, '소모임 이름은 16글자 이내로 입력해 주세요.')
    .nonempty('소모임 이름을 입력해 주세요.'),
  shortDescription: z
    .string({
      required_error: '한 줄 소개를 입력해 주세요.',
    })
    .max(50, '한 줄 소개는 50글자 이내로 입력해 주세요.')
    .nonempty('한 줄 소개를 입력해 주세요.'),
  detailedDescription: z
    .string({
      required_error: '상세 소개를 입력해 주세요.',
    })
    .max(300, '상세 소개는 300글자 이내로 입력해 주세요.')
    .nonempty('상세 소개를 입력해 주세요.'),
  image: z.custom<File>((value) => value instanceof File, {
    message: '이미지 파일을 업로드 해 주세요.',
  }),
});

type FormData = z.infer<typeof Schema>;

export default function CreateGroupForm({ onClose }: CreateGroupFormProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false); // 제출 여부 상태 추가
  const [formData, setFormData] = useState({});

  const onSubmit = async (data: FormData) => {
    console.log('Submitted data:', data);
    setFormData(data);

    try {
      setIsModalOpen(true);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  useEffect(() => {
    const inputElement = document.getElementById(
      'capacity',
    ) as HTMLInputElement;

    const disableScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    if (inputElement) {
      inputElement.addEventListener('wheel', disableScroll);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('wheel', disableScroll);
      }
    };
  }, []);

  const selectedApprovalType: FormData['approvalType'] = watch('approvalType');

  const handleImageUpload = (file: File) => {
    if (file) {
      setValue('image', file);
      clearErrors('image');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const [applicationFormVisible, setApplicationFormVisible] = useState(false);

  // const [questions, setQuestions] = useState<string[]>(['']);

  // const handleQuestionChange = (index: number, value: string) => {
  //   const newQuestions = [...questions];
  //   newQuestions[index] = value;
  //   setQuestions(newQuestions);
  // };

  // const addQuestion = () => {
  //   if (questions.length < 3) {
  //     setQuestions([...questions, '']);
  //   }
  // };

  // const removeQuestion = (index: number) => {
  //   const newQuestions = questions.filter((_, i) => i !== index);
  //   setQuestions(newQuestions);
  // };

  return (
    <div className="flex items-center justify-center">
      {submitted ? ( // 제출 후에는 폼 대신 모달을 렌더링합니다.
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          clubName="소모임 이름"
          shortDescription="소모임 한 줄 소개"
          message="개설이 완료 되었습니다!"
          subMessage="멤버 신청을 기다려주세요."
          buttonText="확인"
        />
      ) : (
        <div className="bg-blue-50 px-6 pb-6 rounded-lg shadow-lg w-[46.75rem]">
          <div className="flex items-center font-semibold border-b border-gray-300 py-[2rem]">
            <button onClick={onClose} className="mr-2 text-xl">
              &lt;
            </button>
            <h2 className="flex-1 text-center text-2xl font-bold">
              소모임 개설
            </h2>
          </div>
          <form className="mt-[2.5rem]" onSubmit={handleSubmit(onSubmit)}>
            {/* 승인 유형 */}
            <div className="space-y-4 text-sm mb-[2rem]">
              <label className="font-bold text-xl">승인 유형</label>
              <div className="flex space-x-4">
                {approvalType.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setValue('approvalType', type);
                      setSelectedCategory(type);
                      clearErrors('approvalType');

                      if (type === 'approval') {
                        setApplicationFormVisible(true);
                      } else {
                        setApplicationFormVisible(false);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg ${
                      selectedApprovalType === type
                        ? 'bg-blue-400 text-white border border-white border-opacity-10'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {type === 'immediate' ? '바로 가입' : '신청 후 승인'}
                  </button>
                ))}
              </div>
              {errors.approvalType && (
                <p className="text-[14px] font-normal leading-none text-red-danger">
                  {errors.approvalType.message}
                </p>
              )}
            </div>
            {/* 모임 카테고리 */}
            <div className="space-y-4 text-sm mb-[2rem]">
              <label className="font-bold text-xl">모임 카테고리</label>
              <div className="grid grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setValue('category', category);
                      setSelectedCategory(category);
                      clearErrors('category');
                    }}
                    className={`py-[0.5rem] rounded-lg ${
                      selectedCategory === category
                        ? 'bg-blue-400 text-white border border-white border-opacity-10'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {errors.category && (
                <>
                  <p className="text-[14px] font-normal leading-none text-red-danger">
                    {errors.category.message}
                  </p>
                </>
              )}
            </div>
            {/* 모집 정원 */}
            <div className="space-y-4 text-sm mb-[2rem]">
              <label className="font-bold text-xl">모집 정원</label>
              <div className="relative">
                <input
                  type="number"
                  id="capacity"
                  placeholder="모집 인원 수를 입력해 주세요. (30명 이내)"
                  {...register('capacity', {
                    setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
                  })}
                  className={`px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border ${
                    errors.capacity
                      ? 'border-red-500'
                      : 'border-gray-200 focus:border-blue-300 focus:ring-blue-300'
                  } focus:outline-none`}
                />
                <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                  <span className="">명</span>
                </div>
              </div>
              {errors.capacity && (
                <>
                  <p className="text-[14px] font-normal leading-none text-red-danger">
                    {errors.capacity.message}
                  </p>
                </>
              )}
            </div>
            {/* 베이스 지점 */}
            <div className="space-y-4 text-sm mb-[2rem]">
              <label className="font-bold text-xl">베이스 지점</label>
              <div className="relative">
                <input
                  type="text"
                  {...register('basePoint')}
                  placeholder="지점을 검색해 주세요."
                  className={`pl-10 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border ${
                    errors.basePoint
                      ? 'border-red-500'
                      : 'border-gray-200 focus:border-blue-300 focus:ring-blue-300'
                  } focus:outline-none`}
                />
                <img
                  src="/svg/club/search.svg"
                  alt="search icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                />
              </div>
              {errors.basePoint && (
                <>
                  <p className="text-[14px] font-normal leading-none text-red-danger">
                    {errors.basePoint.message}
                  </p>
                </>
              )}
            </div>
            {/* 소모임 이름 */}
            <div className="space-y-4 text-sm mb-[2rem]">
              <label className="font-bold text-xl">소모임 이름</label>
              <div className="relative">
                <input
                  type="text"
                  {...register('clubName')}
                  placeholder="이름을 입력해 주세요. (16글자 이내)"
                  className={`px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border ${
                    errors.clubName
                      ? 'border-red-500'
                      : 'border-gray-200 focus:border-blue-300 focus:ring-blue-300'
                  } focus:outline-none`}
                />
              </div>
              {errors.clubName && (
                <p className="text-[14px] font-normal leading-none text-red-danger">
                  {errors.clubName.message}
                </p>
              )}
            </div>
            {/* 한 줄 소개 */}
            <div className="space-y-4 text-sm mb-[2rem]">
              <label className="font-bold text-xl">한 줄 소개</label>
              <div className="relative">
                <input
                  type="text"
                  {...register('shortDescription')}
                  placeholder="제목과 함께 보일 간단한 한 줄 소개를 입력해 주세요. (40자 이내)"
                  className={`px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border ${
                    errors.shortDescription
                      ? 'border-red-500'
                      : 'border-gray-200 focus:border-blue-300 focus:ring-blue-300'
                  } focus:outline-none`}
                />
              </div>
              {errors.shortDescription && (
                <p className="text-[14px] font-normal leading-none text-red-danger">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>
            {/* 상세 소개 */}
            <div className="space-y-4 text-sm mb-[2rem]">
              <label className="font-bold text-xl">상세 소개</label>
              <div className="">
                <textarea
                  {...register('detailedDescription')}
                  placeholder="규칙, 유의사항 등을 자세하게 적을 수록 알맞는 사람을 모집할 수 있어요. (1000자 이내)"
                  className={`px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border overflow-y-auto ${
                    errors.detailedDescription
                      ? 'border-red-500'
                      : 'border-gray-200 focus:border-blue-300 focus:ring-blue-300'
                  } focus:outline-none`}
                />
              </div>
              {errors.detailedDescription && (
                <p className="text-[14px] font-normal leading-none text-red-danger">
                  {errors.detailedDescription.message}
                </p>
              )}
            </div>
            {/* 이미지 첨부 */}
            <div className="space-y-2 text-sm mb-[2rem]">
              <label className="font-bold text-xl">이미지 첨부</label>
              <p className="text-gray-400 pb-2">
                모임의 성격을 드러내는 사진 1장을 첨부해 주세요.
              </p>
              <div
                className="relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  {...register('image', {
                    onChange: (e) => handleImageChange(e), // 이 부분을 추가합니다.
                  })}
                />
                <label
                  htmlFor="image-upload"
                  className="w-[15.25rem] h-[10.25rem] flex items-center justify-center text-center bg-white rounded-lg border border-gray-200 cursor-pointer"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <span className="text-3xl">+</span>
                  )}
                </label>
              </div>
              {errors.image && (
                <p className="text-[14px] font-normal leading-none text-red-danger py-2">
                  {errors.image.message}
                </p>
              )}
            </div>
            {/* 제출 버튼 */}
            <button
              type="submit"
              className="px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg bg-blue-500 text-white leading-none font-bold"
            >
              개설하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
