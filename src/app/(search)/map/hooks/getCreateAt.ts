import { useState, useEffect } from 'react';
import { OfficeBuilding } from '@/types/office/office';

interface formatDateProps {
  createdAt: string;
}

export function useFormattedDate({ createdAt }: formatDateProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    function formatDate() {
      const today = new Date();
      const currentDate = new Date(createdAt);
      const diffTime = Math.abs(today.getTime() - currentDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        setFormattedDate('오늘');
      } else if (diffDays === 1) {
        setFormattedDate('어제');
      } else if (diffDays <= 7) {
        setFormattedDate(`${diffDays}일 전`);
      } else {
        setFormattedDate('지난 주');
      }
    }

    formatDate();
  }, [createdAt]);

  return formattedDate;
}
