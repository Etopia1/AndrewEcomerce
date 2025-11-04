import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MerchantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.marChantToken);


  // Replace with the actual endpoint for your API
  const API_URL = "https://new-ecomer-ce-app-backend2.vercel.app/api/v1/merchant-orders";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming the token is stored in localStorage
          },
        });

        setOrders(response.data.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Merchant Orders</h2>
      {orders.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Order Date</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="px-4 py-2">
                  {order.items.map((item) => item.productName).join(", ")}
                </td>
                <td className="px-4 py-2">₦{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MerchantOrders;
