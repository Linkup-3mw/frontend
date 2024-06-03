import Link from 'next/link';

interface MenuItemProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

const MenuItem = ({ href, isActive, children }: MenuItemProps) => {
  return (
    <Link href={href}>
      <div
        className={`flex justify-center items-center w-[6.375rem] h-[2.5rem] border rounded-full border-black mx-3 font-bold ${
          isActive ? 'bg-main-black text-blue-100' : ''
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

interface HeaderMenuProps {
  menuItems: {
    label: string;
    href: string;
    isActive: boolean;
  }[];
}

export default function HeaderMenu({ menuItems }: HeaderMenuProps) {
  return (
    <div className="flex md:basis-1/3 items-center text-base max-md:hidden">
      {menuItems.map((item, index) => (
        <MenuItem key={index} href={item.href} isActive={item.isActive}>
          {item.label}
        </MenuItem>
      ))}
    </div>
  );
}
