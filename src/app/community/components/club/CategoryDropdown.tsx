import React, { useEffect, useRef, useState } from 'react';

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchBoxVisible, setSearchBoxVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const topics = [
    '운동/스포츠',
    '직무계발',
    '외국어',
    '문화/예술',
    '여행',
    '봉사활동',
    '미디어 관람',
    '경제/재테크',
    '기타',
  ];

  const handleTopicSelect = (topic: string) => {
    // 이미 선택된 주제인지 확인
    const alreadySelected = selectedTopics.includes(topic);

    if (alreadySelected) {
      // 이미 선택된 주제라면 선택 취소
      setSelectedTopics((prev) =>
        prev.filter((selectedTopic) => selectedTopic !== topic),
      );
    } else {
      // 선택되지 않은 주제라면 추가
      setSelectedTopics((prev) => [...prev, topic]);
    }

    // 검색 상자 표시
    setSearchBoxVisible(true);
  };

  const removeTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.filter((selectedTopic) => selectedTopic !== topic),
    );
  };

  const resetSelection = () => {
    setSelectedTopics([]);
    setSearchBoxVisible(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="font-semibold text-lg bg-white px-2 h-[2.38rem] flex items-center justify-center rounded border border-gray-200"
      >
        <span>주제 선택</span>
        <img
          src="/svg/club/arrowDown.svg"
          alt="Arrow Down Icon"
          className="w-5 h-5 ml-4"
        />
      </button>
      {isOpen && (
        <div className="absolute mt-2 py-[2.5rem] px-[1.5rem] w-[34rem] bg-white border rounded-lg shadow-lg">
          {/* 주제 버튼 */}
          <div className="grid grid-cols-5 gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                className={`py-[0.5rem] rounded-lg border w-[5.4372rem] text-sm ${
                  selectedTopics.includes(topic) ? 'bg-blue-400 text-white' : ''
                }`}
                onClick={() => handleTopicSelect(topic)}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* 회색 선 */}
          <hr className="my-7 border-t border-gray-300" />

          {/* 선택된 주제 */}
          {searchBoxVisible && (
            <div className="">
              <div className="">
                <button
                  onClick={resetSelection}
                  className="px-2 pb-3 rounded-lg flex items-center"
                >
                  선택 초기화
                  <img
                    src="/svg/club/reset.svg"
                    alt="Reset Icon"
                    className="pl-2"
                  />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pb-5">
                {selectedTopics.map((topic, index) => (
                  <div key={index} className="">
                    <button className="py-[0.5rem] rounded-lg border text-sm flex px-2 justify-between">
                      {topic}
                      <div onClick={() => removeTopic(topic)} className="ml-2">
                        ✕
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-center">
            <button
              onClick={toggleDropdown}
              className="bg-blue-400 text-white px-6 py-2 rounded-lg mt-4"
            >
              검색하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
