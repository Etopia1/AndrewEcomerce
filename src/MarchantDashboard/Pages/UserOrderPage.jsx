// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const UserOrderPage = () => {
//   const [orders, setOrders] = useState([]);
//   const token = useSelector((state) => state.token);
//   const Nav =useNavigate()

//   useEffect(() => {
//     // Fetch orders from API
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("https://newecomerceappbackend.onrender.com/api/v1/orders", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }) // Replace with your actual API endpoint
//         setOrders(response.data); // Assuming the response structure is { data: [...] }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     // <div className="p-4 space-y-6">
//     //   <h1 className="text-3xl font-bold mb-6">My Orders</h1>

//     //   {orders > 0 ? (
//     //     <p className="text-gray-500">No orders found.</p>
//     //   ) : (
//     //     orders.map((order) => (
//     //       <div
//     //         key={order._id}
//     //         className="bg-white p-6 rounded-lg shadow-md space-y-4"
//     //       >
//     //         <div className="flex justify-between items-center">
//     //           <div>
//     //             <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
//     //             <p className="text-gray-500">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
//     //             <p className="text-gray-500">Status: {order.orderStatus}</p>
//     //             <p className="text-gray-500">Payment Status: {order.paymentStatus}</p>
//     //           </div>
//     //           <div>
//     //             <p className="text-lg font-medium text-right">
//     //               Total: ₦{order.totalAmount.toLocaleString()}
//     //             </p>
//     //           </div>
//     //         </div>

//     //         <div className="mt-4 space-y-2">
//     //           <h3 className="text-lg font-medium">Customer Information:</h3>
//     //           <p className="text-gray-700">Name: {order.customerFirstName} {order.customerLastName}</p>
//     //           <p className="text-gray-700">Address: {order.customerAddress}, {order.city}, {order.country}</p>
//     //           <p className="text-gray-700">Phone: {order.customerPhoneNumber}</p>
//     //         </div>

//     //         <div className="mt-4">
//     //           <h3 className="text-lg font-medium">Order Items:</h3>
//     //           <div className="space-y-2">
//     //             {order.items.map((item) => (
//     //               <div key={item._id} className="flex justify-between items-center">
//     //                 <div className="flex items-center space-x-4">
//     //                   <img
//     //                     src={item.productImage}
//     //                     alt={item.productName}
//     //                     className="w-16 h-16 object-cover rounded"
//     //                   />
//     //                   <div>
//     //                     <h4 className="text-sm font-semibold">{item.productName}</h4>
//     //                     <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//     //                     <p className="text-sm text-gray-500">Price: ₦{item.price}</p>
//     //                   </div>
//     //                 </div>
//     //                 <p className="font-medium text-right text-sm">₦{(item.price * item.quantity).toLocaleString()}</p>
//     //               </div>
//     //             ))}
//     //           </div>
//     //         </div>

//     //         <div className="mt-4">
//     //           <h3 className="text-lg font-medium">Payment Details:</h3>
//     //           <p className="text-gray-700">Reference: {order.paymentDetails.reference}</p>
//     //           <p className="text-gray-700">Amount: ₦{order.paymentDetails.amount}</p>
//     //           <p className="text-gray-700">Payment Status: {order.paymentDetails.status}</p>
//     //         </div>

//     //         <button
//     //           onClick={() => alert(`Viewing details for order ${order._id}`)}
//     //           className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
//     //         >
//     //           View Details
//     //         </button>
//     //       </div>
//     //     ))
//     //   )}
//     // </div>
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-4xl font-semibold text-center text-gray-800 mb-12">My Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
//             <thead>
//               <tr className="text-left text-gray-700 bg-gray-200">
//                 <th className="py-4 px-6">Order ID</th>
//                 <th className="py-4 px-6">Order Date</th>
//                 <th className="py-4 px-6">Customer</th>
//                 <th className="py-4 px-6">Total Amount</th>
//                 <th className="py-4 px-6">Order Status</th>
//                 <th className="py-4 px-6">Payment Status</th>
//                 <th className="py-4 px-6">Payment Method</th>
//                 <th className="py-4 px-6">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr
//                   key={order._id}
//                   className="border-t hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <td className="py-4 px-6">{order._id}</td>
//                   <td className="py-4 px-6">{new Date(order.orderDate).toLocaleDateString()}</td>
//                   <td className="py-4 px-6">
//                     {order.customerFirstName} {order.customerLastName}
//                   </td>
//                   <td className="py-4 px-6">₦{order.totalAmount.toLocaleString()}</td>
//                   <td className="py-4 px-6 text-blue-500">{order.orderStatus}</td>
//                   <td className="py-4 px-6 text-green-500">{order.paymentStatus}</td>
//                   <td className="py-4 px-6">{order.paymentMethod}</td>
//                   <td className="py-4 px-6">
//                     <button onClick={()=> Nav(`/getOneOrder/${order._id}`)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-all duration-300">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserOrderPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const UserOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const Nav = useNavigate()
  const token = useSelector((state) => state.token);
  console.log(token)

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://andrewecomerceback.onrender.com/api/v1/orders", {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
        });
        console.log(response.data.orders)
        setOrders(response.data.orders); // Adjust based on your API response structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#333" size={15} />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} onClick={()=> Nav(`/getOneOrder/${order._id}`)} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{order._id}</td>
                  <td className="py-3 px-6">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {order.items.map((item) => (
                      <div key={item.productId}>
                        {item.productName} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-6">#{order.totalAmount}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.orderStatus === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.orderStatus
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrderPage;
