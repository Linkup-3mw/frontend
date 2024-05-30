import React, { useState } from 'react';

interface CreateGroupFormProps {
  onClose: () => void;
}

const categoriesData = [
  { id: 1, name: '운동/스포츠' },
  { id: 2, name: '직무계발' },
  { id: 3, name: '외국어' },
  { id: 4, name: '문화/예술' },
  { id: 5, name: '여행' },
  { id: 6, name: '봉사활동' },
  { id: 7, name: '미디어 관람' },
  { id: 8, name: '경제/재테크' },
  { id: 9, name: '기타' },
];

export default function CreateGroupForm({ onClose }: CreateGroupFormProps) {
  const [selectedApprovalType, setSelectedApprovalType] =
    useState<string>('immediate');
  const [applicationFormVisible, setApplicationFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>(['']);

  const handleApprovalTypeSelect = (type: string) => {
    setSelectedApprovalType(type);
    setApplicationFormVisible(type === 'approval');
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 3) {
      setQuestions([...questions, '']);
    }
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-blue-50 px-6 pb-6 rounded-lg shadow-lg w-[46.75rem]">
        <div className="flex items-center font-semibold border-b border-gray-300 py-[2rem]">
          <button onClick={onClose} className="mr-2 text-xl">
            &lt;
          </button>
          <h2 className="flex-1 text-center text-2xl font-bold">소모임 개설</h2>
        </div>
        <form className="mt-[2.5rem]">
          {/* 승인 유형 */}
          <div className="space-y-4 text-sm mb-[2rem]">
            <label className="font-bold text-xl">승인 유형</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleApprovalTypeSelect('immediate')}
                className={`px-4 py-2 rounded-lg ${
                  selectedApprovalType === 'immediate'
                    ? 'bg-blue-400 text-white border border-white border-opacity-10'
                    : 'bg-white border border-gray-200'
                }`}
              >
                바로 가입
              </button>
              <button
                type="button"
                onClick={() => handleApprovalTypeSelect('approval')}
                className={`px-4 py-2 rounded-lg ${
                  selectedApprovalType === 'approval'
                    ? 'bg-blue-400 text-white border border-white border-opacity-10'
                    : 'bg-white border border-gray-200'
                }`}
              >
                신청 후 승인
              </button>
            </div>
          </div>
          {/* 모임 카테고리 */}
          <div className="space-y-4 text-sm mb-[2rem]">
            <label className="font-bold text-xl">모임 카테고리</label>
            <div className="grid grid-cols-6 gap-4">
              {categoriesData.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategorySelect(category.id)}
                  className={`py-[0.5rem] rounded-lg ${
                    selectedCategory === category.id
                      ? 'bg-blue-400 text-white border border-white border-opacity-10'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          {/* 모집 정원 */}
          <div className="space-y-4 text-sm mb-[2rem]">
            <label className="font-bold text-xl">모집 정원</label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="30"
                placeholder="모집 인원 수를 입력해 주세요. (30명 이내)"
                className="px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border border-gray-200 focus:outline-none focus:border-blue-300"
              />
              <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                <span className="">명</span>
              </div>
            </div>
          </div>
          {/* 베이스 지점 */}
          <div className="space-y-4 text-sm mb-[2rem]">
            <label className="font-bold text-xl">베이스 지점</label>
            <div className="relative">
              <input
                placeholder="지점을 검색해 주세요."
                className="pl-12 pr-4 py-2 w-full min-h-[3.5rem] rounded-lg border border-gray-200 focus:outline-none focus:border-blue-300"
              />
              <img
                src="/svg/club/search.svg"
                alt="search icon"
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            </div>
          </div>
          {/* 소모임 이름 */}
          <div className="space-y-4 text-sm mb-[2rem]">
            <label className="font-bold text-xl">소모임 이름</label>
            <div className="relative">
              <input
                type="text"
                placeholder="이름을 입력해 주세요. (16글자 이내)"
                maxLength={16}
                className="px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border border-gray-200 focus:outline-none focus:border-blue-300"
              />
            </div>
          </div>
          {/* 한 줄 소개 */}
          <div className="space-y-4 text-sm mb-[2rem]">
            <label className="font-bold text-xl">한 줄 소개</label>
            <div className="relative">
              <input
                type="text"
                placeholder="제목과 함께 보일 간단한 한 줄 소개를 입력해 주세요. (40자 이내)"
                maxLength={40}
                className="px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border border-gray-200 focus:outline-none focus:border-blue-300"
              />
            </div>
          </div>
          {/* 상세 소개 */}
          <div className="space-y-4 text-sm mb-[2rem]">
            <label className="font-bold text-xl">상세 소개</label>
            <div className="">
              <textarea
                placeholder="규칙, 유의사항 등을 자세하게 적을 수록 알맞는 사람을 모집할 수 있어요. (1000자 이내)"
                maxLength={1000}
                className="px-4 py-2 pr-10 w-full rounded-lg border border-gray-200 focus:outline-none focus:border-blue-300 overflow-y-auto"
              />
            </div>
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
                onChange={handleImageUpload}
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
          </div>
          {/* 신청서 만들기 폼 */}
          {applicationFormVisible && (
            <>
              <div className="space-y-2 text-sm border-t border-gray-300 py-[2rem]">
                <label className="font-bold text-2xl">신청서 만들기</label>
                <p className="text-gray-400">
                  가입자가 작성할 신청서를 만들어주세요.
                </p>
              </div>
              {/* 신청서 안내문 */}
              <div className="space-y-4 text-sm mb-[2rem]">
                <label className="font-bold text-xl">신청서 안내문</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="[선택] 신청서 상단에 보일 안내 문구를 입력해 주세요. (40자 이내)"
                    maxLength={40}
                    className="px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border border-gray-200 focus:outline-none focus:border-blue-300"
                  />
                </div>
              </div>
              {/* 신청서 질문 */}
              <div className="space-y-4 text-sm mb-[2rem]">
                <label className="font-bold text-xl">신청서 질문</label>
                <p className="text-gray-400">
                  가입자에게 하고 싶은 질문을 작성해 주세요. (최대 3개)
                </p>
                {questions.map((question, index) => (
                  <div className="relative" key={index}>
                    <input
                      type="text"
                      placeholder="질문을 입력하세요. (40자 이내)"
                      maxLength={40}
                      value={question}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      className="px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border border-gray-200 focus:outline-none focus:border-blue-300"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <img
                          src="/svg/club/remove.svg"
                          alt="remove icon"
                          className="w-6 h-6"
                        />
                      </button>
                    )}
                  </div>
                ))}
                {questions.length < 3 && (
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border border-gray-200 bg-white text-2xl"
                  >
                    +
                  </button>
                )}
              </div>
            </>
          )}
        </form>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="px-4 py-2 pr-10 w-full min-h-[3.5rem] rounded-lg border bg-gray-200 font-bold"
          >
            개설하기
          </button>
        </div>
      </div>
    </div>
  );
}
