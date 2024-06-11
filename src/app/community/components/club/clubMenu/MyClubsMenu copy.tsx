// import MyClubsSubMenu from '@components/club/MyClubsSubMenu';
// import { useState } from 'react';
// import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// import AddClubButton from '@components/club/common/AddClubButton';
// import SearchInput from '@components/club/SearchInput';
// import RenderClubs from '../../RenderClubs';
// import {
//   manageableClubs,
//   myClubs,
//   unapprovedClubs,
// } from '@/app/community/data/clubs';
// import { ClubCardProps } from '@components/club/ClubCard';

// export default function MyClubsMenu() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [subMenuSelection, setSubMenuSelection] = useState<string>('myClubs');
//   const handleSubMenuSelect = (selection: string) => {
//     const formattedSelection = selection.replace(/Clubs$/, '');
//     setSubMenuSelection(selection);
//     const params = new URLSearchParams(searchParams);
//     params.set('submenu', `${formattedSelection}`);
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   let displayedClubs: ClubCardProps[] = [];
//   let totalItems = 0;

//   if (subMenuSelection === 'myClubs') {
//     displayedClubs = myClubs;
//     totalItems = myClubs.length;
//   } else if (subMenuSelection === 'unapprovedClubs') {
//     displayedClubs = unapprovedClubs;
//     totalItems = unapprovedClubs.length;
//   } else if (subMenuSelection === 'manageableClubs') {
//     displayedClubs = manageableClubs;
//     totalItems = manageableClubs.length;
//   }

//   return (
//     <>
//       <div className="md:flex items-center justify-between mt-5 relative z-10">
//         <div className="flex items-center mb-4 md:mb-0">
//           <div className="flex space-x-4">
//             <MyClubsSubMenu onSelect={handleSubMenuSelect} />
//           </div>
//           <AddClubButton className="ml-auto leading-none h-[2rem] w-[2rem] md:hidden" />
//         </div>
//         <SearchInput
//           placeholder="찾고 싶은 소모임을 검색하세요."
//           className="md:hidden w-full text-xs"
//         />
//         <div className="flex items-center space-x-4">
//           <SearchInput
//             placeholder="찾고 싶은 소모임 제목, 내용 등을 입력해 주세요."
//             className="md:w-[30rem] w-full hidden md:flex"
//           />
//           <AddClubButton className="h-[2.5rem] w-[2.5rem] items-center justify-center hidden md:flex" />
//         </div>
//       </div>
//       <div>
//         <RenderClubs
//           clubs={displayedClubs}
//           totalItems={totalItems}
//           showPagination={true}
//         />
//       </div>
//     </>
//   );
// }
