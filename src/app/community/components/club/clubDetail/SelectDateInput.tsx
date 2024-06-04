import ArrowBtn from '@/app/(auth)/components/terms/ArrowBtn';
import Calendar from '@/app/common/components/form/Calendar';
import { format } from 'date-fns';
import { useState } from 'react';

interface Props {
  className: string;
}
export default function SelectDateInput({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState('');

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setInputValue(format(date, 'yyyy.MM.dd'));
    }
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="relative block">
        <input
          type="text"
          placeholder="날짜"
          className={`${className} !mb-0 ${isOpen ? 'rounded-b-none' : ''}`}
          readOnly
          value={inputValue}
          onClick={handleInputClick}
        />
        <ArrowBtn
          handleClick={handleInputClick}
          isActive={isOpen}
          fillColor="#171717"
          className="absolute right-[1.5rem] top-1/2 -translate-y-1/2"
        />
      </div>
      {isOpen && (
        <div className="absolute top-[100%] left-0 right-0 z-10 -mt-[2px] overflow-y-auto max-h-[22.5rem] border-[1.5px] border-gray-200  max-md:static max-md:mt-[0px] max-md:border-x-0 max-md:border-b-0 max-md:rounded-br-[0.5rem] max-md:rounded-bl-[0.5rem]">
          <Calendar selected={selectedDate} onSelect={handleDayPickerSelect} />
        </div>
      )}
    </div>
  );
}
