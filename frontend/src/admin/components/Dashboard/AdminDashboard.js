import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Legend,
  Tooltip,
  BarElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductAdmin } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";
import { adminGetAllUsers } from "../../../actions/userAction";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Legend,
  Tooltip,
  BarElement
);

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllProductAdmin());
    dispatch(adminGetAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  let productOutOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        productOutOfStock += 1;
      }
    });

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  let totalRevenue = 0;
  let monthlyRevenue = new Array(12).fill(0);
  let yearlyRevenue = {};

  const filteredOrders = orders?.filter(
    (order) => order.orderStatus !== "Cancelled" // Replace "Cancelled" with your actual cancelled status
  );

  console.log(filteredOrders);

  filteredOrders &&
    filteredOrders.forEach((item) => {
      totalRevenue += item.totalOrderPrice;
      const orderDate = new Date(item.createdAt);
      if (orderDate.getFullYear() === selectedYear) {
        monthlyRevenue[orderDate.getMonth()] += item.totalOrderPrice;
      }

      const year = orderDate.getFullYear();

      // Check if year property exists in yearlyRevenue object
      if (!yearlyRevenue[year]) {
        yearlyRevenue[year] = 0; // Initialize with 0 if not present
      }

      yearlyRevenue[year] += item.totalOrderPrice;
    });

  const years = Object.keys(yearlyRevenue).sort();
  const data = Object.values(yearlyRevenue);

  const doughnutData = {
    labels: ["OUT OF STOCK", "IN STOCK"],
    datasets: [
      {
        backgroundColor: ["#141414", "#eddb8e"],
        hoverBackgroundColor: ["#141414"],
        data: [productOutOfStock, products.length - productOutOfStock],
      },
    ],
  };

  const months = [
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

  const monthlyRevenueData = {
    labels: months.map((month, index) => {
      return `${month} ${selectedYear}`;
    }),
    datasets: [
      {
        label: "Monthly Revenue",
        backgroundColor: "#eddb8e",
        borderColor: "#eddb8e",
        data: monthlyRevenue,
      },
    ],
  };

  const handleChangeYear = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const yearlyRevenueChartData = {
    labels: years,
    datasets: [
      {
        label: "Yearly Revenue",
        backgroundColor: "#eddb8e",
        borderColor: "#eddb8e",
        data: data,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
  };

  return (
    <div>
      <div className=" flex flex-col gap-3 bg-white p-4 border-2 rounded-md my-3">
        <h1 className=" text-4xl font-semibold">Dashboard</h1>
        <div className=" flex flex-col gap-3 bg-[#f5f5f5] p-4 rounded-md border-2">
          <p className=" text-2xl font-bold">TOTAL REVENUE</p>
          <span className=" text-lg bg-white border-2 rounded-md p-2 font-medium">
            Rs {totalRevenue}
          </span>
        </div>
        <div className=" grid grid-flow-col gap-3">
          <div className=" flex flex-col justify-center items-center gap-3 bg-[#f5f5f5] p-4 rounded-md border-2">
            <p className=" text-2xl font-bold">PRODUCT</p>
            <span className=" w-full text-center text-lg bg-white border-2 rounded-md p-2 font-medium">
              {products && products.length}
            </span>
          </div>
          <div className=" flex flex-col justify-center items-center gap-3 bg-[#f5f5f5] p-4 rounded-md border-2">
            <p className=" text-2xl font-bold">ORDER</p>
            <span className=" w-full text-center text-lg bg-white border-2 rounded-md p-2 font-medium">
              {orders && orders.length}
            </span>
          </div>
          <div className=" flex flex-col justify-center items-center gap-3 bg-[#f5f5f5] p-4 rounded-md border-2">
            <p className=" text-2xl font-bold">USER</p>
            <span className=" w-full text-center text-lg bg-white border-2 rounded-md p-2 font-medium">
              {users && users.length}
            </span>
          </div>
        </div>
      </div>

      {/* chart */}
      {orders && (
        <div className=" flex flex-col gap-4 w-full bg-white border-2 rounded-md p-4 mb-[1rem]">
          <div className=" w-full flex gap-2 bg-[#f5f5f5] border-2 rounded-md p-5">
            <div className=" w-[50%] bg-white border-2 rounded-md p-2 flex flex-col justify-center">
              <p className=" text-2xl font-bold">MONTHLY REVENUE</p>
              <select
                value={selectedYear}
                onChange={handleChangeYear}
                className="block w-full bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <Bar data={monthlyRevenueData} options={options} />
            </div>
            <div className=" w-[50%]  bg-white border-2 rounded-md p-2 flex flex-col justify-center">
              <p className=" text-2xl font-bold">YEARLY REVENUE</p>
              <Bar data={yearlyRevenueChartData} options={options} />
            </div>
          </div>
          <div className=" h-[30rem] bg-[#f5f5f5] border-2 rounded-md p-2 flex justify-center">
            <Doughnut data={doughnutData} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
