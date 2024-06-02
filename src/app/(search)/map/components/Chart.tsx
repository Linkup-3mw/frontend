import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

export default function Crt() {
  const chartData = {
    labels: [''],
    datasets: [
      {
        data: [12, 12, 12],
        backgroundColor: ['#97BAFE', '#D0D0D8', '#FF513F'],
        borderColor: ['white', 'white', 'white'],
        borderWidth: 5,
        borderRadius: 3,
      },
    ],
  };

  return (
    <>
      <div className="flex justify-center items-center w-[12.84375rem] h-[13.125rem] bg-white p-1 rounded-3xl">
        <div className="w-[10.84375rem] h-[11.125rem]">
          <div className="w-[8.5rem] h-[8.5rem] mx-auto">
            <Doughnut data={chartData} />
            <div className="flex gap-3 justify-center">
              <div className="text-center">
                <p className="text-red-500">43%</p>
                <p>IT</p>
              </div>
              <div className="text-center">
                <p className="text-blue-400">29%</p>
                <p>IT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-[12.84375rem] h-[13.125rem] bg-white p-1 rounded-3xl">
        <div className="w-[10.84375rem] h-[11.125rem]">
          <div className="w-[8.5rem] h-[8.5rem] mx-auto">
            <Doughnut data={chartData} />
            <div className="flex gap-3 justify-center">
              <div className="text-center">
                <p className="text-red-500">43%</p>
                <p>IT</p>
              </div>
              <div className="text-center">
                <p className="text-blue-400">29%</p>
                <p>IT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
