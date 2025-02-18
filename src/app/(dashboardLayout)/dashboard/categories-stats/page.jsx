"use client";
import { getCategoryStatsData, getFinanceData } from "@/utils/getFinanceData";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Loading from "@/components/Loading";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Page = () => {
  const [expenseStats, setExpenseStats] = useState([]);
  const [incomeStats, setIncomeStats] = useState([]);
  const [financeStats, setFinanceStats] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(expenseStats, incomeStats);

  // Function to fetch category stats data (for expenses and income)
  const getData = async () => {
    setLoading(true);
    const { expenseStats, incomeStats } = await getCategoryStatsData(); // Assuming you return both from the backend
    setExpenseStats(expenseStats);
    setIncomeStats(incomeStats);
    setLoading(false);
  };

  // Function to fetch finance stats data (optional)
  const getFinanceStatsData = async () => {
    setLoading(true);
    const financeData = await getFinanceData();
    setFinanceStats(financeData);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    getFinanceStatsData();
  }, []);

  // Prepare data for the Expense Pie chart
  const expensePieChartData = {
    labels: expenseStats.map((stat) => stat._id), // Categories for expenses
    datasets: [
      {
        data: expenseStats.map((stat) => stat.totalAmount), // Sum of amounts per category
        backgroundColor: [
          "#ef4444", // Red
          "#10b981", // Green
          "#f59e0b", // Yellow
          "#3b82f6", // Blue
        ], // Assign different background colors to the pie chart slices
      },
    ],
  };

  // Prepare data for the Income Pie chart
  const incomePieChartData = {
    labels: incomeStats.map((stat) => stat._id), // Categories for income
    datasets: [
      {
        data: incomeStats.map((stat) => stat.totalAmount), // Sum of amounts per category
        backgroundColor: [
          "#9333ea", // Purple
          "#3b82f6", // Blue
          "#10b981", // Green
          "#f59e0b", // Yellow
        ], // Assign different background colors to the pie chart slices
      },
    ],
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <div className="flex gap-5 pb-5">
        {/* Expense Stats Card */}
        <div className="card w-full bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Total Expenses</h3>
          <p className="text-2xl font-bold text-blue-500">
          $ {expenseStats.reduce((total, stat) => total + stat.totalAmount, 0)}
          </p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Category Breakdown</h4>
            {expenseStats.map((stat) => (
              <div key={stat._id} className="flex justify-between">
                <span>{stat._id} ({stat.categoryCount})</span>
                <span>$ {stat.totalAmount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income Stats Card */}
        <div className="card w-full bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Total Income</h3>
          <p className="text-2xl font-bold text-green-500">
          $ {incomeStats.reduce((total, stat) => total + stat.totalAmount, 0)}
          </p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Category Breakdown</h4>
            {incomeStats.map((stat) => (
              <div key={stat._id} className="flex justify-between">
                <span>{stat._id} ({stat.categoryCount})</span>
                <span>$ {stat.totalAmount} </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Expense Pie Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg w-80 h-96">
          <h3 className="text-xl font-semibold">
            Expense Category-wise Spending
          </h3>
          <Pie data={expensePieChartData} />
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white shadow-md p-4 rounded-lg flex-1">
          <h3 className="text-xl font-semibold">Recent 5 Transactions</h3>
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Title</th>
                <th className="px-4 py-2 border-b text-left">Category</th>
                <th className="px-4 py-2 border-b text-left">Amount</th>
                <th className="px-4 py-2 border-b text-left">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {[...financeStats]
                .reverse()
                .slice(0, 5)
                .map((stat) => (
                  <tr key={stat.transaction_id}>
                    <td className="px-4 py-2 border-b">{stat.title}</td>
                    <td className="px-4 py-2 border-b">{stat.category}</td>
                    <td className="px-4 py-2 border-b">$ {stat.amount}</td>
                    <td className="px-4 py-2 border-b">
                      {stat.transaction_id}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Income Pie Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg w-80 h-96">
          <h3 className="text-xl font-semibold">
            Income Category-wise Spending
          </h3>
          <Pie data={incomePieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Page;