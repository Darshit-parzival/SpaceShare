import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const parkingOwners = [
  {
    name: "Anon",
    parkingSpaces: [
      {
        name: "Main Parking",
        users: [
          { name: "John Doe", parkingTime: "2024-10-01 10:00 AM" },
          { name: "Jane Smith", parkingTime: "2024-10-01 10:30 AM" },
        ],
      },
      {
        name: "Secondary Parking",
        users: [{ name: "Mark Johnson", parkingTime: "2024-10-01 11:00 AM" }],
      },
    ],
  },
  {
    name: "Doe",
    parkingSpaces: [
      {
        name: "Main Parking",
        users: [
          { name: "John Doe", parkingTime: "2024-10-01 10:00 AM" },
          { name: "Jane Smith", parkingTime: "2024-10-01 10:30 AM" },
        ],
      },
      {
        name: "Secondary Parking",
        users: [{ name: "Mark Johnson", parkingTime: "2024-10-01 11:00 AM" }],
      },
    ],
  },
];

const ParkingGraph = () => {
  const [chartType, setChartType] = useState("bar");

  // Prepare data for the chart
  const labels = parkingOwners.flatMap((owner) =>
    owner.parkingSpaces.map((space) => space.name)
  );

  const userCounts = parkingOwners.flatMap((owner) =>
    owner.parkingSpaces.map((space) => space.users.length)
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Users",
        data: userCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Parking Space Owner Reports</h1>
            </div>
            <h2>Parking Owners Graph</h2>
            <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
            </select>
            {chartType === 'bar' ? (
                <Bar data={data} options={{ responsive: true }} />
            ) : (
                <Line data={data} options={{ responsive: true }} />
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ParkingGraph;
