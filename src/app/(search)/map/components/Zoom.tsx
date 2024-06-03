import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { mapState } from '../../atom/search';

export default function Zoom() {
  const map = useRecoilValue(mapState);
  const handleZoomIn = () => {
    if (map) {
      const level = map.getLevel() - 1;
      map.setLevel(level, { anchor: map.getCenter() });
    }
  };
  const handleZoomOut = () => {
    if (map) {
      const level = map.getLevel() + 1;
      map.setLevel(level, { anchor: map.getCenter() });
    }
  };
  return (
    <div className="fixed left-10 top-60 z-[10] flex flex-col">
      <button
        onClick={() => handleZoomIn()}
        type="button"
        className="p-3 w-[2.5rem] h-[2.5rem] shadow-lg border-b-2  bg-white rounded-t-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200"
      >
        <Image
          src="/svg/map/zoomIn.svg"
          width={40}
          height={40}
          alt="줌인 버튼"
        />
      </button>
      <button
        onClick={() => handleZoomOut()}
        type="button"
        className="p-3 w-[2.5rem] h-[2.5rem] shadow-2xl bg-white rounded-b-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200"
      >
        <Image
          src="/svg/map/zoomOut.svg"
          width={40}
          height={40}
          alt="줌아웃 버튼"
        />
      </button>
    </div>
  );
}
