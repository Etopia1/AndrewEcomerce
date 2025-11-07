import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FED766", "#2AB7CA"];

const OrderDistribution = () => {
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Replace this with your real merchant ID
  const merchantId = useSelector((state) => state.marChantData._id);

  useEffect(() => {
    const fetchMerchantOrders = async () => {
      try {
        const res = await axios.get(
          `https://andrewecomerceback.onrender.com/api/v1/merchant-orders/${merchantId}`
        );

        console.log("API Response:", res.data);

        const orders = res.data.data || [];

        if (!Array.isArray(orders) || orders.length === 0) {
          setOrderStatusData([]);
          return;
        }

        // 🟣 Count how many orders fall under each status
        const statusCounts = {
          Pending: 0,
          Processing: 0,
          Shipped: 0,
          Delivered: 0,
          Cancelled: 0,
        };

        orders.forEach((order) => {
          const status = order.orderStatus || "Pending";
          if (statusCounts[status] !== undefined) {
            statusCounts[status]++;
          }
        });

        // 🟣 Convert to recharts-friendly array
        const formattedData = Object.keys(statusCounts)
          .map((status) => ({
            name: status,
            value: statusCounts[status],
          }))
          .filter((item) => item.value > 0);

        setOrderStatusData(formattedData);
      } catch (err) {
        console.error("Error fetching merchant orders:", err);
        setOrderStatusData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-400 text-center p-6">
        Loading order distribution...
      </div>
    );
  }

  if (orderStatusData.length === 0) {
    return (
      <div className="text-gray-400 text-center p-6">
        No order data available for this merchant.
      </div>
    );
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Order Status Distribution
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {orderStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderDistribution;
