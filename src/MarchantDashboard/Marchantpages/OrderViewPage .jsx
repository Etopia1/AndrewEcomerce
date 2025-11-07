import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../Marchantcomponents/common/Header";

const statusColors = {
  Processing: "bg-yellow-400 text-yellow-900",
  Shipped: "bg-pink-400 text-pink-900",
  Delivered: "bg-green-400 text-green-900",
  Cancelled: "bg-red-400 text-red-900",
};

const OrderViewPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // ✅ Use merchant-specific endpoint
        const res = await axios.get(
          `http://localhost:2030/api/v1/merchant-order/${orderId}`,
          { withCredentials: true } // if using cookies/session
        );
        setOrder(res.data.data);
        setNewStatus(res.data.data.orderStatus);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === order.orderStatus) return;

    try {
      setUpdatingStatus(true);

      // ✅ Call merchant order status update
      const res = await axios.patch(
        `https://andrewecomerceback.onrender.com/api/v1/merchant-order/${orderId}/status`,
        { newStatus },
        { withCredentials: true }
      );

      setOrder(res.data.order);
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-300">Loading order...</div>;
  if (!order) return <div className="text-center mt-20 text-red-500">Order not found</div>;

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={`Order #${order._id}`} />

      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        >
          {/* Customer Details */}
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Customer Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-300">
            <div><strong>Name:</strong> {order.customerFirstName} {order.customerLastName}</div>
            <div><strong>Phone:</strong> {order.customerPhoneNumber}</div>
            <div className="sm:col-span-2"><strong>Address:</strong> {order.customerAddress}, {order.city}, {order.country}</div>
            <div><strong>Payment Method:</strong> {order.paymentMethod}</div>
            <div><strong>Payment Status:</strong> {order.paymentStatus}</div>
          </div>

          {/* Order Status */}
          <div className="mb-6">
            <strong>Status:</strong>{" "}
            <span className={`px-3 py-1 rounded-full font-semibold ${statusColors[order.orderStatus]}`}>
              {order.orderStatus}
            </span>
          </div>

          {/* Update Status */}
          <div className="mb-6 flex items-center gap-3">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={updatingStatus || newStatus === order.orderStatus}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white disabled:opacity-50"
            >
              {updatingStatus ? "Updating..." : "Update Status"}
            </button>
          </div>

          {/* Items Table */}
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide divide-gray-700">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{item.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₦{parseFloat(item.price).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₦{(parseFloat(item.price) * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="mt-6 text-right text-gray-100 font-semibold text-lg">
            Total: ₦{parseFloat(order.totalAmount).toLocaleString()}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default OrderViewPage;
