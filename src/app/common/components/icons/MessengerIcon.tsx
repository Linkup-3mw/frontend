interface Props {
  className?: string;
}
export const MessengerIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className={`${className}`}
    >
      <path
        d="M21.2474 20.8047L16.8925 16.4498L16.8925 14.9982L22.699 14.9982L22.699 20.8047L21.2474 20.8047Z"
        fill="#FAEC23"
        stroke="#171717"
      />
      <path
        d="M4.35219 15.4062L8.70703 11.0514L8.70703 9.59979L2.90058 9.59979L2.90058 15.4062L4.35219 15.4062Z"
        fill="#EEEEEE"
        stroke="#171717"
      />
      <path
        d="M16.1004 3.59961H2.90039V11.9996H16.1004V3.59961Z"
        fill="#EEEEEE"
        stroke="#171717"
      />
      <path
        d="M9.49922 9H22.6992V17.4H9.49922V9Z"
        fill="#FAEC23"
        stroke="#171717"
      />
      <rect x="12.5" y="12.5996" width="1.2" height="1.2" fill="#171717" />
      <rect x="15.5" y="12.5996" width="1.2" height="1.2" fill="#171717" />
      <rect x="18.5" y="12.5996" width="1.2" height="1.2" fill="#171717" />
    </svg>
  );
};
