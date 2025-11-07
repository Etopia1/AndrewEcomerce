// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Search, Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const OrdersTable = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const merchantId = useSelector((state) => state.marChantData._id);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           `https://andrewecomerceback.onrender.com/api/v1/merchant-orders/${merchantId}`
//         );

//         const fetchedOrders = res.data.data || [];
//         setOrders(fetchedOrders);
//         setFilteredOrders(fetchedOrders);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [merchantId]);

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     const filtered = orders.filter(
//       (order) =>
//         (order.customerName &&
//           order.customerName.toLowerCase().includes(term)) ||
//         (order._id && order._id.toLowerCase().includes(term))
//     );

//     setFilteredOrders(filtered);
//   };

//   const handleViewOrder = (orderId) => {
//     navigate(`/merchant/order-view/${orderId}`);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "bg-orange-100 text-orange-800";
//       case "Processing":
//         return "bg-red-100 text-red-800";
//       case "Shipped":
//         return "bg-pink-100 text-pink-800";
//       case "Delivered":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-gray-400 text-center p-6">Loading orders...</div>
//     );
//   }

//   return (
//     <motion.div
//       className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.4 }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-100">Merchant Orders</h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search orders..."
//             className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Order ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Customer
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Total
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-700">
//             {filteredOrders.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-400 py-6">
//                   No orders found.
//                 </td>
//               </tr>
//             ) : (
//               filteredOrders.map((order) => (
//                 <motion.tr
//                   key={order._id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
//                     {order._id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
//                     {order.customerName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
//                     ${parseFloat(order.totalAmount).toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     <button
//                       onClick={() => handleViewOrder(order._id)}
//                       className="text-indigo-400 hover:text-indigo-300"
//                     >
//                       <Eye size={18} />
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default OrdersTable;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const merchantId = useSelector((state) => state.marChantData._id);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://andrewecomerceback.onrender.com/api/v1/merchant-orders/${merchantId}`
        );

        const fetchedOrders = res.data.data || [];
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [merchantId]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = orders.filter(
      (order) =>
        ((order.customerFirstName &&
          order.customerFirstName.toLowerCase().includes(term)) ||
          (order.customerLastName &&
            order.customerLastName.toLowerCase().includes(term))) ||
        (order._id && order._id.toLowerCase().includes(term))
    );

    setFilteredOrders(filtered);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/viewmachOrder/${orderId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Processing":
        return "bg-red-100 text-red-800";
      case "Shipped":
        return "bg-pink-100 text-pink-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="text-gray-400 text-center p-6">Loading orders...</div>
    );
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Merchant Orders</h2>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-6">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-100">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-100">
                    {`${order.customerFirstName || ""} ${order.customerLastName || ""}`.trim() ||
                      "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-100">
                    ${parseFloat(order.totalAmount || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <button
                      onClick={() => handleViewOrder(order._id)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-400 text-center">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-300 font-semibold">
                  {`${order.customerFirstName || ""} ${order.customerLastName || ""}`.trim() ||
                    "N/A"}
                </p>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">
                Order ID: <span className="text-gray-200">{order._id}</span>
              </p>
              <p className="text-gray-400 text-sm mb-1">
                Total:{" "}
                <span className="text-gray-200">
                  ${parseFloat(order.totalAmount || 0).toFixed(2)}
                </span>
              </p>
              <p className="text-gray-400 text-sm mb-3">
                Date:{" "}
                <span className="text-gray-200">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </p>
              <button
                onClick={() => handleViewOrder(order._id)}
                className="w-full text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-2 border border-indigo-400 py-2 rounded-md text-sm"
              >
                <Eye size={16} /> View Order
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default OrdersTable;
