import { ClubCardProps } from '@/app/api/club/fetchClubs';
import API from '@/utils/axios';
import { useEffect, useState } from 'react';

interface ClubAnswer {
  id: number;
  answer: string;
  qorders: number;
}

interface ClubApplication {
  id: number;
  club_id: number;
  member_id: number;
  introduction: string;
  club_thumbnail: string;
  approval: boolean;
  club_answer: ClubAnswer[];
}

export default function AllMyClubs() {
  const [clubs, setClubs] = useState<ClubApplication[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllMyClubsData = async () => {
    setLoading(true);
    try {
      const response = await API.get('/club/application');
      const data = response.data.data;
      console.log('API Response:', data);
      setClubs(data);
    } catch (error) {
      console.error('Failed to fetch clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMyClubsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {clubs.length > 0 ? (
        <ul>
          {clubs.map((club) => (
            <li key={club.id} className="mb-4 p-4 border rounded shadow">
              <img
                src={club.club_thumbnail}
                alt={club.introduction}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{club.introduction}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <div>No clubs found.</div>
      )}
    </div>
  );
  // return (
  //   <>
  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[2rem] gap-4 md:mt-8 mt-4">
  //         {clubs.map((club) => (
  //           <div key={club.id}>
  //             {/* 모바일 화면 */}
  //             <div
  //               className={`bg-white rounded-2xl relative p-4 block md:hidden`}
  //             >
  //               <div className="overflow-hidden relative flex">
  //                 <div className="w-24 h-24 relative mb:mr-3 mr-2 flex-shrink-0">
  //                   <img
  //                     src="/images/club/example.jpg"
  //                     alt={club.title}
  //                     className="w-full h-full object-cover rounded-md"
  //                   />
  //                   <div className="h-[1.5rem] w-[1.5rem] absolute top-2 left-2 bg-yellow-600 p-[0.25rem] rounded-full z-10">
  //                     <img
  //                       src="/svg/club/crownIcon.svg"
  //                       alt="Host Badge Icon"
  //                     />
  //                   </div>
  //                 </div>
  //                 <div className="flex-1">
  //                   <div className="flex justify-between items-center pb-1">
  //                     <h3 className="font-bold text-sm truncate">
  //                       {club.title}
  //                     </h3>
  //                   </div>
  //                   <p className="text-ellipsis overflow-hidden text-xs line-clamp-2">
  //                     {club.introduction}
  //                   </p>
  //                   <div className="text-xs mt-2 flex gap-2">
  //                     <div className="flex items-center font-bold">
  //                       <img
  //                         src="/svg/club/peoplesIcon.svg"
  //                         alt="Peoples Icon"
  //                         className="mr-[.25rem] w-4"
  //                       />
  //                       {club.club_members?.length || 0}/{club.recruit_count}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="flex justify-between items-center text-xs mt-4 font-semibold">
  //                 <div className="flex gap-4">
  //                   <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
  //                     {club.club_type}
  //                   </div>
  //                   {club.club_meetings.length > 0 && (
  //                     <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
  //                       {calculateDateDiff(club.club_meetings[0].date)}
  //                     </div>
  //                   )}
  //                 </div>
  //                 <button className="mr-2">
  //                   <img
  //                     src={'/svg/club/bookmarkedHeart.svg'}
  //                     alt="Heart Icon"
  //                     className="w-7 h-7"
  //                   />
  //                 </button>
  //               </div>
  //             </div>
  //             {/* PC 화면 */}
  //             <div
  //               className={`hidden md:block bg-white rounded-lg overflow-hidden relative`}
  //             >
  //               <div className="h-[22.4rem] relative">
  //                 <img
  //                   src="/images/club/example.jpg"
  //                   alt={club.title}
  //                   className="object-cover absolute inset-0 "
  //                 />
  //                 <div className="h-[1.5rem] w-[1.5rem] absolute top-2 left-2 bg-yellow-600 p-[0.25rem] rounded-full z-10">
  //                   <img src="/svg/club/crownIcon.svg" alt="Host Badge Icon" />
  //                 </div>
  //                 <div className="absolute bottom-0 w-full p-4 bg-white backdrop-blur-sm">
  //                   <div className="flex justify-between items-center">
  //                     <h3 className="text-lg font-bold"> {club.title}</h3>
  //                     <button>
  //                       <img
  //                         src={'/svg/club/bookmarkedHeart.svg'}
  //                         alt="Heart Icon"
  //                         className="w-6 h-6"
  //                       />
  //                     </button>
  //                   </div>
  //                   <p className="mt-2 overflow-hidden overflow-ellipsis">
  //                     {club.introduction}
  //                   </p>
  //                   <div className="text-xs mt-2 flex gap-4">
  //                     <div className="flex items-center">
  //                       <img
  //                         src="/svg/club/peoplesIcon.svg"
  //                         alt="Peoples Icon"
  //                         className="mr-1"
  //                       />
  //                       {club.club_members?.length || 0}/{club.recruit_count}
  //                     </div>
  //                   </div>
  //                   <div className="flex justify-between items-center text-xs mt-2 font-semibold">
  //                     <div className="flex gap-4">
  //                       <div className="bg-yellow-600 p-[0.5rem] rounded">
  //                         {club.club_type}
  //                       </div>
  //                       {club.club_meetings.length > 0 && (
  //                         <div className="bg-yellow-600 p-[0.5rem] rounded leading-none">
  //                           {calculateDateDiff(club.club_meetings[0].date)}
  //                         </div>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </>
  // );
}
