import { ChangeEvent, Dispatch, SetStateAction, memo, useEffect } from 'react';
import { ITerm } from './Terms';
import TermToggleBox from './TermToggleBox';
import RoundedCheckbox from '@/app/common/components/form/RoundedCheckbox';
import Checkbox from '@/app/common/components/form/CheckBox';

interface Props {
  title: string;
  data: ITerm[];
  type?: 'toggle' | 'normal';
  setData: Dispatch<SetStateAction<ITerm[]>>;
}

export default memo(function TermsContent({
  title,
  data,
  type = 'normal',
  setData,
}: Props) {
  useEffect(() => {
    const newData = data.map((term) => {
      return {
        ...term,
        isChecked: false,
      };
    });
    setData(newData);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === 'all') {
      setData((prev: ITerm[]) => {
        return prev.map((item) => ({ ...item, isChecked: checked }));
      });
    } else {
      setData((prev: ITerm[]) => {
        return prev.map((item) => {
          if (item.id === name) {
            return {
              ...item,
              isChecked: checked,
            };
          } else return item;
        });
      });
    }
  };
  return (
    <div className="mb-[2rem]">
      <div className="mb-[1.5rem]">
        <RoundedCheckbox
          name="all"
          onChange={handleChange}
          isChecked={data.filter((item) => item.isChecked !== true).length < 1}
        >
          <b className="text-[1.25rem]">{title}</b>
        </RoundedCheckbox>
      </div>

      {data?.map((term: ITerm) => {
        if (type == 'toggle') {
          return (
            <TermToggleBox
              key={term.id}
              {...term}
              onChange={handleChange}
              isChecked={term.isChecked!}
            />
          );
        } else {
          return (
            <div className="mb-[1rem]" key={term.id}>
              <Checkbox
                onChange={handleChange}
                name={term.id}
                isChecked={term.isChecked!}
              >
                <span>{term.name}</span>
              </Checkbox>
            </div>
          );
        }
      })}
    </div>
  );
});
