interface Props {
  fillColor?: string;
  className?: string;
}

export default function CrownBadge({
  fillColor = '#F9D91B',
  className,
}: Props) {
  return (
    <span
      className={`flex items-center justify-center rounded-full  ${className} `}
      style={{ backgroundColor: fillColor }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="w-[75%] h-[75%]"
      >
        <path
          d="M7.42857 5.56493L10 3.49674L9.23077 9.33008H2.76923L2 3.49674L4.57143 5.56493L6 2.33008L7.42857 5.56493Z"
          fill="white"
        />
      </svg>
    </span>
  );
}
