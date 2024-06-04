interface Props {
  className?: string;
}
export const PeopleBlueRed = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className={className}
    >
      <path
        d="M15.5004 13.1992C19.1469 13.1992 22.1004 16.1527 22.1004 19.7992L8.90039 19.7992C8.90039 16.1527 11.8539 13.1992 15.5004 13.1992Z"
        fill="#FF513F"
        stroke="#171717"
        strokeWidth="0.9"
      />
      <path
        d="M9.50039 13.1992C13.1469 13.1992 16.1004 16.1527 16.1004 19.7992L2.90039 19.7992C2.90039 16.1527 5.85389 13.1992 9.50039 13.1992Z"
        fill="#97BAFE"
        stroke="#171717"
        strokeWidth="0.9"
      />
      <circle
        cx="15.5004"
        cy="7.79922"
        r="3.6"
        fill="#FF513F"
        stroke="#171717"
        strokeWidth="0.9"
      />
      <circle
        cx="9.50039"
        cy="7.79922"
        r="3.6"
        fill="#97BAFE"
        stroke="#171717"
        strokeWidth="0.9"
      />
    </svg>
  );
};
export const PeopleBlueYellow = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <path
        d="M25 22C31.0775 22 36 26.9225 36 33L14 33C14 26.9225 18.9225 22 25 22Z"
        fill="#FAEC23"
        stroke="#171717"
        strokeWidth="1.5"
      />
      <path
        d="M15 22C21.0775 22 26 26.9225 26 33L4 33C4 26.9225 8.9225 22 15 22Z"
        fill="#97BAFE"
        stroke="#171717"
        strokeWidth="1.5"
      />
      <circle
        cx="25"
        cy="13"
        r="6"
        fill="#FAEC23"
        stroke="#171717"
        strokeWidth="1.5"
      />
      <circle
        cx="15"
        cy="13"
        r="6"
        fill="#97BAFE"
        stroke="#171717"
        strokeWidth="1.5"
      />
    </svg>
  );
};
