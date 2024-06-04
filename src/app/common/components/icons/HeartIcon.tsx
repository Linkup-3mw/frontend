interface Props {
  className?: string;
}

export const HeartIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_2024_186454)">
        <path d="M12 22L1 11.3636V9H23V11.3636L12 22Z" stroke="#171717" />
        <path
          d="M6.5 2L12 7.72727L12 9L0.999999 9L0.999999 7.72727L6.5 2Z"
          stroke="#171717"
        />
        <path
          d="M17.5 2L23 7.72727L23 9L12 9L12 7.72727L17.5 2Z"
          stroke="#171717"
        />
      </g>
      <defs>
        <clipPath id="clip0_2024_186454">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const FillHeartIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      className={className}
    >
      <path
        d="M12 22.5L1 11.8636V9.5H23V11.8636L12 22.5Z"
        fill="#FF513F"
        stroke="#171717"
      />
      <path
        d="M6.5 2.5L12 8.22727L12 9.5L0.999999 9.5L0.999999 8.22727L6.5 2.5Z"
        fill="#FF513F"
        stroke="#171717"
      />
      <path
        d="M17.5 2.5L23 8.22727L23 9.5L12 9.5L12 8.22727L17.5 2.5Z"
        fill="#FF513F"
        stroke="#171717"
      />
    </svg>
  );
};
