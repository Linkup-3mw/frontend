import CommunityNav from './components/CommunityNav';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed top-[5rem] w-full z-20 max-md:hidden ">
        <CommunityNav />
      </div>
      <div className="md:mt-[10rem] mt-[5rem] relative bg-blue-100">
        <div>{children}</div>
      </div>
    </>
  );
}
