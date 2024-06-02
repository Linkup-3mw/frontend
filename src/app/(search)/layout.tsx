import '@styles/reservation.css';
import '@styles/calendar.css';
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
