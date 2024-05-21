interface Props {
  fillColor?: string;
  size?: string;
}
const CircleWithCheck = ({ fillColor = '#D0D0D8' }: Props) => {
  return (
    <svg
      className="peer-has-[:checked]:hidden bg-red"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32.5 32.5"
      fill="none"
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
        fill={fillColor}
      />
      <path d="M8 15L14 21L24 11" stroke="white" strokeWidth="1.5" />
    </svg>
  );
};

export default CircleWithCheck;

export const CircleBorderCheck = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.5 24.5" fill="none">
      <mask id="path-1-inside-1_1556_143914" fill="white">
        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" />
      </mask>
      <path
        d="M12 22.5C6.20101 22.5 1.5 17.799 1.5 12H-1.5C-1.5 19.4558 4.54416 25.5 12 25.5V22.5ZM22.5 12C22.5 17.799 17.799 22.5 12 22.5V25.5C19.4558 25.5 25.5 19.4558 25.5 12H22.5ZM12 1.5C17.799 1.5 22.5 6.20101 22.5 12H25.5C25.5 4.54416 19.4558 -1.5 12 -1.5V1.5ZM12 -1.5C4.54416 -1.5 -1.5 4.54416 -1.5 12H1.5C1.5 6.20101 6.20101 1.5 12 1.5V-1.5Z"
        fill="#797986"
        mask="url(#path-1-inside-1_1556_143914)"
      />
      <path
        d="M6 11.25L10.5 15.75L18 8.25"
        stroke="#797986"
        strokeWidth="1.125"
      />
    </svg>
  );
};
