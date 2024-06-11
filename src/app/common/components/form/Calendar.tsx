import { ko } from 'date-fns/locale/ko';
import {
  CaptionProps,
  DayPicker,
  SelectSingleEventHandler,
  useNavigation,
} from 'react-day-picker';

import { format } from 'date-fns';
import { BlackRightArrow } from '../icons/BlackArrow';

interface Props {
  onSelect: SelectSingleEventHandler;
  selected: Date | undefined;
}

export default function Calendar({ onSelect, selected }: Props) {
  return (
    <>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={ko}
        components={{
          Caption: CustomCaptionLabel,
        }}
        showOutsideDays
        disabled={{ before: new Date() }}
        classNames={{
          root: 'm-0 bg-white',
          table: 'w-full max-w-full',
          month:
            'w-full m-0 pt-[1rem] px-[1.25rem] pb-[0.5rem] max-md:pt-[0.5rem] max-md:px-[0.5rem] max-md:pb-[0.25rem]',
          head: 'text-[1rem] h-[1.5rem] font-bold box-border max-md:text-[0.75rem] max-md:h-[1rem]',
          head_cell: 'py-[0.5rem] font-medium',
          row: 'my-[0.75rem]',
          cell: '!m-[0.25rem]',
          tbody: 'text-center',
          day: 'mx-auto !my-[0.25rem]',
          day_today:
            'relative font-normal after:content-["오늘"] after:absolute after:left-1/2 after:top-[1.36rem] after:-translate-x-1/2 after:text-[0.75rem] after:whitespace-nowrap after:leading-none max-md:after:top-[1.2rem]  max-md:after:text-[0.625rem]',
          day_outside: '!text-gray-400',
          day_selected: '!text-white !bg-blue-400 !rounded-full',
          button:
            'relative mx-auto pt-[0.4rem] pb-[1.25rem] w-[2.5rem] h-[2.5rem] font-medium leading-none box-border max-md:text-[0.75rem] max-md:w-[2.25rem] max-md:h-[2.25rem] disabled:text-gray-400',
        }}
      />
    </>
  );
}

function CustomCaptionLabel(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <div className="flex items-center justify-center text-[1.25rem] font-bold max-md:text-[0.875rem]">
      <button
        type="button"
        className={`${arrowBtnCss} scale-x-[-1]`}
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <BlackRightArrow />
      </button>
      <b>{format(props.displayMonth, 'yyyy.MM')}</b>
      <button
        type="button"
        className={`${arrowBtnCss}`}
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <BlackRightArrow />
      </button>
    </div>
  );
}

const arrowBtnCss = `mx-[0.5rem] block w-[1.5rem] h-[1.5rem] text-[0px] [&_svg]:inline-block  [&_svg]:w-full [&_svg]:h-full max-md:[&_svg]:w-[1.1rem]`;
