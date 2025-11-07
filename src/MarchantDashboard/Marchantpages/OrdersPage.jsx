import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../Marchantcomponents/common/Header";
import StatCard from "../Marchantcomponents/common/StatCard";
import DailyOrders from "../Marchantcomponents/orders/DailyOrders";
import OrderDistribution from "../Marchantcomponents/orders/OrderDistribution";
import OrdersTable from "../Marchantcomponents/orders/OrdersTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const merchantId = useSelector((state) => state.marChantData._id);

  // Stats
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://andrewecomerceback.onrender.com/api/v1/merchant-orders/${merchantId}`
        );

        const fetchedOrders = res.data.data || [];

        setOrders(fetchedOrders);

        // Calculate stats
        const pendingOrders = fetchedOrders.filter(
          (order) => order.orderStatus === "Processing"
        );
        const completedOrders = fetchedOrders.filter(
          (order) => order.orderStatus === "Delivered"
        );

        setPendingOrdersCount(pendingOrders.length);
        setCompletedOrdersCount(completedOrders.length);

        // Total revenue (sum of completed orders only)
        const revenue = completedOrders.reduce((acc, order) => {
          // Make sure totalAmount is numeric
          const orderTotal = parseFloat(order.totalAmount) || 0;
          return acc + orderTotal;
        }, 0);

        setTotalRevenue(revenue);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (merchantId) fetchOrders();
  }, [merchantId]);

  // Format revenue in NGN currency
  const formattedRevenue = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(totalRevenue);

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Orders"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Orders"
            icon={ShoppingBag}
            value={orders.length}
            color="#6366F1"
          />
          <StatCard
            name="Processing Orders"
            icon={Clock}
            value={pendingOrdersCount}
            color="#F59E0B"
          />
          <StatCard
            name="Completed Orders"
            icon={CheckCircle}
            value={completedOrdersCount}
            color="#10B981"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={formattedRevenue}
            color="#EF4444"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DailyOrders />
          <OrderDistribution />
        </div>

        <OrdersTable orders={orders} loading={loading} />
      </main>
    </div>
  );
};

export default OrdersPage;
