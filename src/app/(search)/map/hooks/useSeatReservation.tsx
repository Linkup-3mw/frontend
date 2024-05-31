// import { useRecoilState, useSetRecoilState } from 'recoil';
// import {
//   seatListReservation,
//   selectedSeatAllState,
//   confirmedState,
// } from '@/app/(search)/atom/office';
// import { showMobileTableState } from '../../atom/media';

// function useSeatReservation() {
//   const [seatList, setSeatList] = useRecoilState(seatListReservation);
//   const [selectedSeatAll, setSelectedSeatAll] =
//     useRecoilState(selectedSeatAllState);
//   const setConfirm = useSetRecoilState(confirmedState);
//   const [showMobileTable, setShowMobileTable] =
//     useRecoilState(showMobileTableState);

//   const handleSeatReady = () => {
//     if (
//       selectedSeatAll?.start_date &&
//       selectedSeatAll?.type &&
//       selectedSeatAll?.code
//     ) {
//       if (seatList.length < 5) {
//         setSeatList([...seatList, { ...selectedSeatAll }]);
//         setSelectedSeatAll({
//           type: '',
//           start_date: '',
//           end_date: '',
//           code: '',
//         });
//         setConfirm(true);
//         setShowMobileTable(false);
//       } else {
//         return;
//       }
//     }
//   };

//   const handleSeatClick = (seatNumber: string) => {
//     setSelectedSeatAll((prev) => ({
//       ...prev,
//       code: seatNumber,
//       start_date: prev?.start_date || '',
//       end_date: prev?.end_date || '',
//       type: prev?.type || '',
//     }));
//   };

//   return {
//     seatList,
//     selectedSeatAll,
//     handleSeatReady,
//     handleSeatClick,
//   };
// }

// export default useSeatReservation;
