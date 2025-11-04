import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../MarchantDashboard/Header/Header";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners'; // Importing ClipLoader spinner

 

const OrderConfirmation = () => {
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const email = useSelector((state) => state.userData.email);
  const username = useSelector((state) => state.userData.fullName);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const Nav = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0);
  const token = useSelector((state) => state.token);
 
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  useEffect(() => {
    setLoading(true);

    axios
      .get("https://andrewecomerceback.onrender.com/api/v1/viewcart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartItems(response.data.data.data.items);
        setTotalPrice(response.data.data.data.totalPrice);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to fetch cart items.");
        setLoading(false);
      });
  }, [token]);
  




// const payKorapay = async (orderData) => {
//   if (
//     !customerFirstName ||
//     !customerLastName ||
//     !customerAddress ||
//     !customerPhoneNumber ||
//     !city ||
//     !country
//   ) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Please fill all details.',
//     });
//     return;
//   }

//   let paymentProcessed = false; // Flag to prevent duplicate requests

//   // Set loading state to true
//   setLoading(true);

//   try {
//     window.Korapay.initialize({
//       key: "pk_test_htjJVR9pkM4NVDhx39vB8meFVyYJzxvP345Vsrpk",
//       reference: `005658654464${Date.now()}`,
//       amount: totalPrice + 1050,
//       currency: "USD",
//       customer: {
//         name: username,
//         email: email,
//       },
//       onSuccess: async (response) => {
//         if (paymentProcessed) return; // Prevent duplicate POST requests
//         paymentProcessed = true;

//         console.log("Payment Successful", response);

//         // Structure the payment details
//         const paymentDetails = {
//           reference: response.reference,
//           amount: response.amount,
//           transactionDate: response.transaction_date,
//           status: response.status,
//         };

//         try {
//           // Update order data with payment details and confirm order
//           const orderResponse = await axios.post(
//             "https://andrewecomerceback.onrender.com/api/v1/confirm-order",
//             { ...orderData, paymentDetails },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           Swal.fire({
//             icon: 'success',
//             title: 'Order placed successfully!',
//             text: 'Your order has been placed.',
//           });
//           console.log(orderResponse.data);
//           setTimeout(()=>(
//             Nav("/")
//           ), 2000)
//         } catch (error) {
//           console.error("Order failed:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Order failed',
//             text: 'Please try again.',
//           });
//         }
//       },
//       onFailure: (response) => {
//         console.error("Payment Failed", response);
//         Swal.fire({
//           icon: 'error',
//           title: 'Payment failed',
//           text: 'Please try again.',
//         });
//       },
//     });
//   } catch (error) {
//     console.error("Payment initialization failed:", error);
//     Swal.fire({
//       icon: 'error',
//       title: 'An error occurred',
//       text: 'Please try again.',
//     });
//   } finally {
//     // Reset the loading state to false
//     setLoading(false);
//   }
// };
const payKorapay = () => {
  if (!window.Korapay) {
    console.error("Korapay script not loaded yet!");
    return;
  }

  window.Korapay.initialize({
    key: "pk_test_htjJVR9pkM4NVDhx39vB8meFVyYJzxvP345Vsrpk",
    amount: totalPrice * 100,
    currency: "NGN",
    reference: `ref_${Date.now()}`,
    customer: {
      name: user.name,
      email: user.email,
    },
    onClose: () => console.log("Payment closed"),
    onSuccess: () => console.log("Payment successful"),
  });
};

const handlePlaceOrder = async () => {
  // Validation for empty cart and missing details
  if (
    !customerFirstName ||
    !customerLastName ||
    !customerAddress ||
    !customerPhoneNumber ||
    !city ||
    !country
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill all details.',
    });
    return; // Prevent further execution if validation fails
  }

  if (cartItems.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your cart is empty. Add items to the cart before placing an order.',
    });
    return; // Prevent further execution if cart is empty
  }

  const orderData = {
    customerFirstName,
    customerLastName,
    customerAddress,
    customerPhoneNumber,
    city,
    country,
    paymentDetails: null, // Set to null initially; update after successful payment
    paymentMethod,
    cartItems,
    totalPrice,
  };

  // Set loading state to true
  setLoading(true);

  try {
    if (paymentMethod === "Bank") {
      await payKorapay(orderData); // Handle Korapay payment
    } else {
      const response = await axios.post(
        "https://andrewecomerceback.onrender.com/api/v1/confirm-order",
        { ...orderData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Order placed successfully!',
        text: 'Your order has been placed.',
      });
      setTimeout(()=>(
        Nav("/")
      ), 2000)
      console.log(response.data);
    }
  } catch (error) {
    console.error("Order failed:", error);
    Swal.fire({
      icon: 'error',
      title: 'Order failed',
      text: 'Please try again.',
    });
  } finally {
    // Reset the loading state to false
    setLoading(false);
  }
};

// Modify the payKorapay function



  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
    <Toaster/>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-500">
            Home /Rexona / <span className="text-black font-bold">Checkout</span>
          </p>
        </div>
      </div>

      {/* Checkout Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Billing Details */}
          <div className="flex-1 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Billing Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  // value={billingDetails.firstName}
                  onChange={(e)=> setCustomerFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Last Name*</label>
                <input
                  type="text"
                  name="companyName"
                  // value={billingDetails.companyName}
                  onChange={(e)=> setCustomerLastName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Address*</label>
                <input
                  type="text"
                  name="streetAddress"
                  // value={billingDetails.streetAddress}
                  onChange={(e)=> setCustomerAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                 Customer  Phone Number
                </label>
                <input
                  type="number"
                  name="apartment"
                  // value={billingDetails.apartment}
                  onChange={(e)=> setCustomerPhoneNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City*</label>
                <input
                  type="text"
                  name="city"
                  // value={billingDetails.city}
                  onChange={(e)=> setCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country*</label>
                <input
                  type="text"
                  name="phone"
                  // value={billingDetails.phone}
                  onChange={(e)=> setCountry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
             
              <div className="flex items-center">
                <input type="checkbox" id="saveInfo" className="mr-2" />
                <label htmlFor="saveInfo" className="text-sm text-gray-600">
                  Save this information for faster check-out next time
                </label>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Your Order</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span >{item.productName} x {item.quantity}</span>
                  </div>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between items-center border-t pt-4">
                <span>Subtotal</span>
                <span className="font-semibold">{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span> $ {subtotal}</span>
              </div>
              /         {/* Payment Method */}
         <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Payment Method</h2>
           <div className="space-y-2">
            <label className="flex items-center">
             <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 text-[blue] "
              />
              Cash on Delivery
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Bank"
                checked={paymentMethod === "Bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Pay with Bank 
            </label>
          </div>
        </div>

              <div className="flex items-center gap-4 mt-4">
                <button
                  className="w-full bg-red-500 text-white py-3 rounded-md"
                  onClick={handlePlaceOrder}
                  disabled={loading} 
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    
    </div>
  );
};

export default OrderConfirmation
