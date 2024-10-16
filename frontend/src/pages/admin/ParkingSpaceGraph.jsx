import { useState, useContext } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ParkingContext } from "../middleware/ParkingContext";
import { BookingContext } from "../middleware/BookingContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ParkingGraph = () => {
  const { owners, spaces } = useContext(ParkingContext);
  const { bookings } = useContext(BookingContext);
  const [chartType, setChartType] = useState("bar");

  // Bar Graph Data: Number of Bookings per Parking Space
  const labels = spaces.map((space) => space.parkingName);
  const bookingCounts = spaces.map(
    (space) =>
      bookings.filter((booking) => booking.parkingId === space._id).length
  );

  const bookingData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Bookings",
        data: bookingCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data: Total Income by Owner
  const ownerIncome = owners.map((owner) => {
    const totalIncome = bookings
      .filter((booking) => booking.ownerId === owner._id)
      .reduce((acc, booking) => acc + parseFloat(booking.totalPrice), 0);
    return totalIncome;
  });

  const incomeData = {
    labels: owners.map((owner) => owner.ownerName),
    datasets: [
      {
        label: "Total Income",
        data: ownerIncome,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "20px", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ fontSize: "24px" }}>Parking Space Owner Reports</h1>
          </div>
          <select
            onChange={(e) => setChartType(e.target.value)}
            value={chartType}
            style={{ marginBottom: "20px" }}
          >
            <option value="bar">Bar Graph - Bookings</option>
            <option value="pie">Pie Chart - Income by Owner</option>
          </select>

          <div
            style={{
              height: "calc(100vh - 150px)",
              overflow: "hidden", 
            }}
          >
            {chartType === "bar" && (
              <Bar
                data={bookingData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
                height={300} // Set desired height
              />
            )}
            {chartType === "pie" && (
              <Pie
                data={incomeData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={300} // Set desired height
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ParkingGraph;
