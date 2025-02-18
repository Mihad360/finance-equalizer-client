"use client";
import { getFinanceStatsData } from "@/utils/getFinanceData";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2"; // Import Doughnut component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Required for Doughnut chart
} from "chart.js";
import Loading from "@/components/Loading";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Doughnut chart
);

const Page = () => {
  const [financeStats, setFinanceStats] = useState({
    totalExpense: 0,
    totalIncome: 0,
    totalTransactions: 0,
    categoryStats: [],
    monthlyStats: [],
  });
  const [loading, setLoading] = useState(false);

  const getFinanceData = async () => {
    setLoading(true);
    const financeData = await getFinanceStatsData();
    if (financeData) {
      setFinanceStats(financeData);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFinanceData();
  }, []);

  // Function to get month name from month number
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1]; // Subtract 1 because month numbers start from 1
  };

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Filter monthlyStats to include only the current year
  const filteredMonthlyStats = financeStats?.monthlyStats.filter((stat) => {
    return stat._id.year === currentYear; // Include only the current year
  });

  // Prepare data for the bar chart
  const barChartData = {
    labels: filteredMonthlyStats?.map((stat) => {
      const month = getMonthName(stat._id.month); // Get month name
      const year = stat._id.year;
      return `${month} ${year}`; // Format as "Month YYYY"
    }),
    datasets: [
      {
        label: "Expense",
        data: filteredMonthlyStats?.map((stat) => stat.totalExpense),
        backgroundColor: "#ef4444", // Red
      },
      {
        label: "Income",
        data: filteredMonthlyStats?.map((stat) => stat.totalIncome),
        backgroundColor: "#10b981", // Green
      },
    ],
  };

  // Prepare data for the doughnut chart
  const doughnutChartData = {
    labels: ["Total Expense", "Total Income"],
    datasets: [
      {
        label: "Amount",
        data: [financeStats?.totalExpense || 0, financeStats?.totalIncome || 0],
        backgroundColor: ["#ef4444", "#10b981"], // Red and Green
        hoverOffset: 4,
      },
    ],
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      {/* Top Cards */}
      <div className="flex gap-5 pb-5">
        {/* Expense Details Card */}
        <div className="card w-full bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-500">
            $ {financeStats?.totalExpense || 0}
          </p>
        </div>

        {/* Income Details Card */}
        <div className="card w-full bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Total Income</h3>
          <p className="text-2xl font-bold text-green-500">
            $ {financeStats?.totalIncome || 0}
          </p>
        </div>

        {/* Monthly Summary Card */}
        <div className="card w-full bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Summary</h3>
          <p className="text-lg">
            Total Transactions: {financeStats?.totalTransactions || 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="flex gap-5">
        {/* Bar Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg w-[70%] h-[500px]">
          <h3 className="text-xl font-semibold">Monthly Expense and Income</h3>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Monthly Financial Overview",
                },
              },
            }}
          />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg flex-1">
          <h3 className="text-xl font-semibold">Expense vs Income</h3>
          <Doughnut
            data={doughnutChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Expense vs Income Overview",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
