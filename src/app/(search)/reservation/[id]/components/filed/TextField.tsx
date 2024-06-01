// TextField.tsx
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react';

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label?: React.ReactNode;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  hasError?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { value, onChange, onFocus, onBlur, hasError, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    return (
      <div>
        <input
          ref={ref}
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
          placeholder="숫자를 입력해주세요."
          className={`mb:text-xs mb:w-[18rem] mb:h-[2rem] md:w-[26.6857rem] md:h-[2.5rem] px-2 py-1 rounded-[0.5rem] focus:outline-none ${
            focused ? 'border-blue-500' : 'border-gray-300'
          } ${hasError ? 'border-[#FF1000]' : ''}`}
          {...props}
        />{' '}
      </div>
    );
  },
);

export default TextField;
