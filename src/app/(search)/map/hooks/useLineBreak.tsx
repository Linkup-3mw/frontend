// . 기준으로 줄 바꿈
import React from 'react';

type useLineBreakeProps = {
  content: string;
};

export const useLineBreak = ({ content }: useLineBreakeProps) => {
  const line = content.split('.');
  const newline = line.map((line, index) => <p key={index}>{line}</p>);
  return newline;
};
