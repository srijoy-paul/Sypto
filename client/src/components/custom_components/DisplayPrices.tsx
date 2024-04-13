import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Removed Chart as ChartJS
import { Line } from "react-chartjs-2";
// import "chartjs-adapter-date-fns";

function DisplayPrices() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Jun", "Jul", "Aug"],
    datasets: [
      {
        id: 1,
        label: "",
        data: [5, 6, 7],
      },
      {
        id: 2,
        label: "",
        data: [3, 2, 1],
      },
    ],
  };

  return (
    <div>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "x",
          plugins: {
            legend: {
              position: "left",
            },
            title: {
              display: true,
              text: "Example of chatjs",
            },
          },
        }}
      />
    </div>
  );
}

export default DisplayPrices;
