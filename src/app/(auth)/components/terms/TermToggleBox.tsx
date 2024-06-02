import { ChangeEvent, useState } from 'react';
import Checkbox from '@common/components/form/CheckBox';
import { ITerm } from './Terms';
import ArrowBtn from './ArrowBtn';

interface Props extends ITerm {
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// 임시 값
const detail = `Lorem ipsum dolor sit amet, duo ea tale nonumy. Dolorem facilisi antiopam ei eam. Sed et suas assueverit, eu nam essent copiosae salutatus. Meliore instructior ad vim, doming iisque explicari sit ea.
Facilisi partiendo nam at, graeci pericula persecuti quo an. Iudico numquam pri no, utamur copiosae complectitur id vel, ut impetus nusquam eos. Prompta scripserit quaerendum vel ut, at mei dolore alterum, exerci eirmod mediocritatem eam cu. An cum ullum eripuit accumsan, eum ex oblique docendi pericula.
Modus vituperata at vel. 
Putant dolorum comprehensam eu has, exerci scaevola praesent quo in. Ex qui solet cetero deleniti, his vocent ponderum efficiantur ut. Sea suas conclusionemque et, sit vide omittam molestie et. Ne sea copiosae recusabo tractatos, ut pro solet affert alienum. Ad dictas forensibus voluptaria eos, erat postea aliquando in nam.
No mea justo adipiscing, unum dolor per ut. At qui voluptatum dissentiunt signiferumque, animal laoreet veritus his no. Vitae eleifend salutatus mei te, ei vis dicunt vocent ceteros. Omnesque platonem et duo, ei usu definiebas referrentur, nam ad atqui aliquando.
Ut mea natum doctus, facete labores mandamus ei duo, ne eam esse etiam. Munere docendi dignissim te pri. Eu tation suscipit eos. Everti suscipit voluptaria id vix, ea enim modus senserit ius.`;

export default function TermToggleBox({
  id,
  name,
  isChecked,
  onChange,
}: Props) {
  const [showDetail, setShowDetail] = useState(false);
  const handleClick = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div className="mb-[1rem] max-md:mb-[0.5rem]">
      <div className="flex justify-between items-center max-md:text-[0.729rem]">
        <Checkbox onChange={onChange} name={id} isChecked={isChecked}>
          <span>{name}</span>
        </Checkbox>
        <ArrowBtn handleClick={handleClick} isActive={showDetail} />
      </div>
      {showDetail && (
        <div className="overflow-y-auto mt-3 mb-5 p-[1.5rem] h-[10rem] rounded-[1.2rem] bg-white whitespace-pre-line max-md:mt-2 max-md:mb-3 max-md:p-[0.875rem] max-md:h-[10rem]">
          {detail}
        </div>
      )}
    </div>
  );
}
