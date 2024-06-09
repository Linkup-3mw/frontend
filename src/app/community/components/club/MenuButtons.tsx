interface MenuButtonsProps {
  menuItems: { label: string; isActive: boolean }[];
  handleMenuSelect: (label: string) => void;
}

export default function MenuButtons({
  menuItems,
  handleMenuSelect,
}: MenuButtonsProps) {
  return (
    <div className="flex font-semibold md:text-xl text-xs border-b border-gray-300">
      {menuItems.map((menuItem, index) => (
        <button
          key={index}
          className={`h-[3.31rem] px-5 border-b-2 ${
            menuItem.isActive
              ? 'border-main-black outline-inner'
              : 'text-[#51515D] border-transparent'
          }`}
          onClick={() => handleMenuSelect(menuItem.label)}
        >
          {menuItem.label}
        </button>
      ))}
    </div>
  );
}
