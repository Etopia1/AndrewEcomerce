// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Toaster, toast } from "react-hot-toast";
// // import { useSelector } from "react-redux";
// // // import { useHistory } from 'react-router-dom'
// // import { useHref, useNavigate } from "react-router-dom";

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const Nav = useNavigate()
// //   const token = useSelector((state)=> state.token)
// //   const email = useSelector((state)=> state.userData.email)
// //   console.log(email)
// //   const username = useSelector((state)=> state.userData.fullName)
// // //   const history = useHistory();
// //   console.log(token)


// //   useEffect(() => {
// //     setLoading(true);

// //     axios
// //       .get("http://localhost:2030/api/v1/viewcart", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       })
// //       .then((response) => {
// //         setCartItems(response.data.data.data.items);
// //         setTotalPrice(response.data.data.data.totalPrice);
// //         setLoading(false);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         toast.error("Failed to fetch cart items.");
// //         setLoading(false);
// //       });
// //   }, []);

// //   const handleeCheckout = () => {
// //     setLoading(true); // Optionally show a loading indicator while waiting for the API response
// //     axios
// //       .post("http://localhost:2030/api/v1/checkout", {}, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,  
// //         },
// //       })
// //       .then((response) => {

// //         console.log(response)
// //         // }
// //       })
// //       .catch((error) => {
// //         setLoading(false);
// //         console.log( error);
// //         // toast.error("An error occurred during checkout. Please try again.");
// //       });
// //   };


// //   const handleRemoveItem = (productId) => {
    

 

// //     axios.post( "http://localhost:2030/api/v1/removeitem",
// //         { productId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )
// //       .then((response) => {
// //         console.log(response)
// //         // setCartItems(response.data.data.data.items);
// //         // setTotalPrice(response.data.data.data.totalPrice);
// //         toast.success("Item removed from cart.");
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         toast.error("Failed to remove item.");
// //       });
// //   };

// //   const handleIncreaseQuantity = (productId) => {

// //     if (!token) {
// //       toast.error("You need to log in to increase quantity.");
// //       return;
// //     }

// //     axios
// //       .post(
// //         "http://localhost:2030/api/v1/item-increase",
// //         { productId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )
// //       .then((response) => {
// //         setCartItems(response.data.data.data.items);
// //         setTotalPrice(response.data.data.data.totalPrice);
// //         toast.success("Quantity increased.");
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         toast.error("Failed to increase quantity.");
// //       });
// //   };

// //   const handleDecreaseQuantity = (productId) => {

// //     if (!token) {
// //       toast.error("You need to log in to decrease quantity.");
// //       return;
// //     }

// //     axios
// //       .post(
// //         "http://localhost:2030/api/v1/item-decrease",
// //         { productId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )
// //       .then((response) => {
// //         setCartItems(response.data.data.data.items);
// //         setTotalPrice(response.data.data.data.totalPrice);
// //         toast.success("Quantity decreased.");
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         toast.error("Failed to decrease quantity.");
// //       });
// //   };

// //   const handleClearCart = () => {
   

   

// //     axios
// //       .post(
// //         "http://localhost:2030/api/v1/clearcart",
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )
// //       .then((response) => {
// //         setCartItems([]);
// //         setTotalPrice(0);
// //         toast.success("Cart cleared.");
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         toast.error("Failed to clear cart.");
// //       });
// //   };
// // //   import.meta.env.VITE_Public_Key
// // //   function payKorapay() {
// // //     window.Korapay.initialize({
// // //         key: "pk_test_htjJVR9pkM4NVDhx39vB8meFVyYJzxvP345Vsrpk",
// // //         reference: `Etopia${Date.now()}`,
// // //         amount: totalPrice, 
// // //         currency: "NGN",
// // //         customer: {
// // //           name: username,
// // //         email: email,
// // //         },
// // //         // notification_url: ""
// // //     });
// // // }
// // function payKorapay() {
// //     const totalPrice = 1000;  // Total price for the payment
// //     const username = "John Doe";  // Customer name
// //     const email = "johndoe@example.com";  // Customer email

// //     // Initialize KoraPay
// //     window.Korapay.initialize({
// //         key: "pk_test_htjJVR9pkM4NVDhx39vB8meFVyYJzxvP345Vsrpk", // Your public key
// //         reference: `004${Date.now()}`,  // Unique reference for the transaction
// //         amount: totalPrice,  // Amount for the payment
// //         currency: "NGN",  // Currency
// //         customer: {
// //             name: username,  // Customer's name
// //             email: email,    // Customer's email
// //         },
// //         notification_url: "https://your-backend-url/api/v1/payment/notification", // Your webhook URL
// //         onSuccess: (response) => {
// //             // Log success response
// //             handleCheckout()
// //             console.log("Payment Successful", response);
// //             // You can handle the successful payment response here, e.g., showing a success message to the user
// //         },
// //         onFailure: (response) => {
// //             // Log failure response
// //             console.log("Payment Failed", response);
// //             // You can handle the failed payment response here, e.g., showing an error message to the user
// //         }
// //     });
// // }

  // const handleCheckout = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:2030/api/v1/checkout', 
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Pass the token to authenticate the user
  //         },
  //       }
  //     );
  //  console.log(response)
  //  Nav(`/confirmoreder`)
      
  //   } catch (error) {
  //     console.error('Checkout Error:', error);
  //     toast.error('An error occurred during checkout');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 

// //   return (
// //     <div className="w-full h-full bg-gray-50 p-8">
// //       <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>

// //       {loading ? (
// //         <div className="flex justify-center items-center">
// //           <div className="loader">Loading...</div>
// //         </div>
// //       ) : cartItems.length === 0 ? (
// //         <div className="text-center text-xl text-gray-500"  
// // >
// //           Your cart is empty.
// //         </div>
// //       ) : (
// //         <div className="flex flex-col lg:flex-row">
// //           {/* Cart Items */}
// //           <div className="flex-1 bg-white rounded-lg shadow-lg p-6 space-y-6">
// //             {cartItems.map((item) => (
// //               <div
// //                 key={item.productId}
// //                 className="flex items-center justify-between p-4 border-b border-gray-200"
// //               >
// //                 <div className="flex items-center space-x-4">
// //                   <img
// //                     src={item.productImage}
// //                     alt={item.productName}
// //                     className="w-20 h-20 object-cover rounded-md"
// //                   />
// //                   <div>
// //                     <h3 className="font-semibold text-lg">{item.productName}</h3>
// //                     <p className="text-gray-500 text-sm">{item.productDescription}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center space-x-4">
// //                   <p className="text-xl font-semibold text-gray-700">${item.price}</p>

// //                   {/* Quantity Controls */}
// //                   <div className="flex items-center space-x-2">
// //                     <button
// //                       onClick={() => handleDecreaseQuantity(item.productId)}
// //                       className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
// //                     >
// //                       -
// //                     </button>
// //                     <p className="text-lg font-semibold">{item.quantity}</p>
// //                     <button
// //                       onClick={() => handleIncreaseQuantity(item.productId)}
// //                       className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
// //                     >
// //                       +
// //                     </button>
// //                   </div>

// //                   {/* Remove Button */}
// //                   <button
// //                     onClick={() => handleRemoveItem(item.productId)}
// //                     className="text-lg text-red-500 hover:text-red-700"
// //                   >
// //                     Remove
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Cart Summary */}
// //           <div className="lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 p-6 bg-white rounded-lg shadow-lg flex flex-col space-y-6">
// //             <h3 className="text-xl font-bold text-gray-800">Cart Summary</h3>
// //             <div className="flex justify-between">
// //               <p className="text-lg text-gray-600">Total Price:</p>
// //               <p className="text-xl font-semibold text-gray-800">${totalPrice}</p>
// //             </div>

// //             {/* Clear Cart Button */}
// //             <button
// //               onClick={handleClearCart}
// //               className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
// //             >
// //               Clear Cart
// //             </button>

// //             {/* Checkout Button */}
// //             <button
// //               onClick={payKorapay}
// //               className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
// //             >
// //               Proceed to Checkout
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <Toaster />
// //     </div>
// //   );
// // };

// // export default Cart;
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const token = useSelector((state) => state.token);
//   const email = useSelector((state) => state.userData.email);
//   const username = useSelector((state) => state.userData.fullName);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get('http://localhost:2030/api/v1/viewcart', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setCartItems(response.data.data.data.items);
//         setTotalPrice(response.data.data.data.totalPrice);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to fetch cart items.');
//         setLoading(false);
//       });
//   }, [token]);

//   const handleRemoveItem = (productId) => {
//     axios
//       .post(
//         'http://localhost:2030/api/v1/removeitem',
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then(() => {
//         setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
//         toast.success('Item removed from cart.');
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to remove item.');
//       });
//   };

//   const handleIncreaseQuantity = (productId) => {
//     axios
//       .post(
//         'http://localhost:2030/api/v1/item-increase',
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setCartItems(response.data.data.data.items);
//         setTotalPrice(response.data.data.data.totalPrice);
//         toast.success('Quantity increased.');
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to increase quantity.');
//       });
//   };

//   const handleDecreaseQuantity = (productId) => {
//     axios
//       .post(
//         'http://localhost:2030/api/v1/item-decrease',
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setCartItems(response.data.data.data.items);
//         setTotalPrice(response.data.data.data.totalPrice);
//         toast.success('Quantity decreased.');
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to decrease quantity.');
//       });
//   };

//   const handleClearCart = () => {
//     axios
//       .post(
//         'http://localhost:2030/api/v1/clearcart',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then(() => {
//         setCartItems([]);
//         setTotalPrice(0);
//         toast.success('Cart cleared.');
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to clear cart.');
//       });
//   };

//   const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:2030/api/v1/checkout',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response);
//       navigate('/confirmorder');
//     } catch (error) {
//       console.error('Checkout Error:', error);
//       toast.error('An error occurred during checkout');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const payKorapay = () => {
//     window.Korapay.initialize({
//       key: 'pk_test_htjJVR9pkM4NVDhx39vB8meFVyYJzxvP345Vsrpk',
//       reference: `004${Date.now()}`,
//       amount: totalPrice,
//       currency: 'NGN',
//       customer: {
//         name: username,
//         email: email,
//       },
//       notification_url: 'https://your-backend-url/api/v1/payment/notification',
//       onSuccess: (response) => {
//         console.log('Payment Successful', response);
//         handleCheckout();
//       },
//       onFailure: (response) => {
//         console.error('Payment Failed', response);
//       },
//     });
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       <header className="bg-white shadow-md p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">Exclusive</h1>
//         <nav>
//           <ul className="flex space-x-4">
//             <li className="text-gray-600">Home</li>
//             <li className="text-gray-600">Contact</li>
//             <li className="text-gray-600">About</li>
//           </ul>
//         </nav>
//       </header>

//       <main className="flex-grow p-6">
//         <h2 className="text-2xl font-bold mb-4">Cart</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="h-[500px] overflow-y-auto border border-gray-300 rounded-md">
//             <table className="table-auto w-full mb-4">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2">Product</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Quantity</th>
//                   <th className="px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id} className="border-t border-gray-300">
//                     <td className="px-4 py-2">{item.name}</td>
//                     <td className="px-4 py-2">{item.price}</td>
//                     <td className="px-4 py-2">{item.quantity}</td>
//                     <td className="px-4 py-2">
//                       <button
//                         className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                         onClick={() => handleIncreaseQuantity(item.id)}
//                       >
//                         +
//                       </button>
//                       <button
//                         className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                         onClick={() => handleDecreaseQuantity(item.id)}
//                       >
//                         -
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                         onClick={() => handleRemoveItem(item.id)}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-between items-center mb-4">
//               <div className="flex space-x-4">
//                 <input
//                   type="text"
//                   placeholder="Coupon Code"
//                   className="border border-gray-300 p-2 rounded"
//                 />
//                 <button className="bg-red-600 text-white px-4 py-2 rounded">Apply Coupon</button>
//               </div>
//               <p className="text-lg font-semibold">Total Price: {totalPrice}</p>
//             </div>

//             <div className="flex justify-between">
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//                 onClick={handleClearCart}
//               >
//                 Clear Cart
//               </button>
//               <button
//                 className="bg-blue-600 text-white px-6 py-2 rounded"
//                 onClick={payKorapay}
//               >
//                 Proceed to Pay
//               </button>
//             </div>
//           </div>
//         )}
//       </main>

//       <footer className="bg-gray-800 text-white p-6 sticky bottom-0">
//         <div className="grid grid-cols-3 gap-6">
//           <div>
//             <h3 className="text-lg font-bold">Exclusive</h3>
//             <p>Get 10% off your first order!</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold">Support</h3>
//             <p>FAQs</p>
//             <p>Contact Us</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold">Quick Links</h3>
//             <p>Privacy Policy</p>
//             <p>Terms of Service</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Cart;


// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';



// const Cart = () => {
  
//     const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [loading2, setLoading2]=useState(false)
//   const [toggle, setToggle]=useState(false)
//   const [succes, setSuccesss]=useState(true)

//   const navigate = useNavigate();
//   const token = useSelector((state) => state.token);
//   const email = useSelector((state) => state.userData.email);
//   const username = useSelector((state) => state.userData.fullName);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get('http://localhost:2030/api/v1/viewcart', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setCartItems(response.data.data.data.items);
//         setTotalPrice(response.data.data.data.totalPrice);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to fetch cart items.');
//         setLoading(false);
//       });
//   }, [token]);

  // const handleRemoveItem = (productId) => {
  //   axios
  //     .post(
  //       'http://localhost:2030/api/v1/removeitem',
  //       { productId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(() => {
  //       setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  //       toast.success('Item removed from cart.');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error('Failed to remove item.');
  //     });
  // };

//   const handleIncreaseQuantity = (productId) => {
//     axios
//       .post(
//         'http://localhost:2030/api/v1/item-increase',
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setCartItems(response.data.data.data.items);
//         setTotalPrice(response.data.data.data.totalPrice);
//         toast.success('Quantity increased.');
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to increase quantity.');
//       });
//   };

//   const handleDecreaseQuantity = (productId) => {
//     axios
//       .post(
//         'http://localhost:2030/api/v1/item-decrease',
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setCartItems(response.data.data.data.items);
//         setTotalPrice(response.data.data.data.totalPrice);
//         toast.success('Quantity decreased.');
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to decrease quantity.');
//       });
//   };

//   const handleClearCart = () => {
//     axios
//       .post(
//         'http://localhost:2030/api/v1/clearcart',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then(() => {
//         setCartItems([]);
//         setTotalPrice(0);
//         toast.success('Cart cleared.');
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to clear cart.');
//       });
//   };

//   const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:2030/api/v1/checkout',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response);
//       setTimeout(()=>(
//         setSuccesss(false),
//         navigate('/confirmorder')

//       ), 5000)
//       // navigate('/confirmorder');
//     } catch (error) {
//       console.error('Checkout Error:', error);
//       toast.error('An error occurred during checkout');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const payKorapay = () => {
//     window.Korapay.initialize({
//       key: 'pk_test_htjJVR9pkM4NVDhx39vB8meFVyYJzxvP345Vsrpk',
//       reference: `004${Date.now()}`,
//       amount: totalPrice,
//       currency: 'NGN',
//       customer: {
//         name: username,
//         email: email,
//       },
//       // notification_url: 'https://your-backend-url/api/v1/payment/notification',
//       onSuccess: (response) => {
//         console.log('Payment Successful', response);
//         handleCheckout();
//       },
//       onFailure: (response) => {
//         console.error('Payment Failed', response);
//       },
//     });
//   };
//    return(
//     <div className=" w-[100%] h-[100vh] flex relative items-center justify-center bg-[#8b8a8a62] ">
//       {
//         toggle ?    <div className=" w-[100%] z-[9999]  bg-[#302f2fc5]  h-[100vh] absolute  rounded-[5px] flex items-center justify-center   ">
//         <div className=" shadow-lg w-[40%] rounded-[10px] flex-col bg-[white] h-[60%] ">
//           <div className=" w-[100%] h-[50%] text-center flex items-center justify-center ">
//             <h1 className=' text-[40px] '>Are You Sure You Want To Check Out</h1>
//           </div>
//           <div className="w-[100%] h-[50%] flex  gap-[30px] items-center justify-center">
//             <button className="w-[30%] h-[30%] flexm bg-[green] items-center justify-center">Yes Checkout</button>
//             <button onClick={()=> setSuccesss(true)} className="w-[30%] h-[30%] bg-[red] flex items-center justify-center">No Don`t CheckOut</button>
//           </div>
//         </div>
//         </div> : <div className=" w-[100%] z-[9999]  bg-[#302f2fc5]  h-[100vh] absolute  rounded-[5px] flex items-center justify-center   ">
//           <div className=" shadow-lg w-[40%] rounded-[10px] flex-col bg-[white] h-[60%] ">
//             <div className=" w-[100%] h-[70%] text-center flex items-center justify-center ">
//             <DotLottieReact
//       src="https://lottie.host/a2ba9d47-0eb3-4a89-b338-d745e1f9e80a/VG1EXdB79t.lottie"
//       loop
//       autoplay
//     />
//             </div>
//             <div className="w-[100%] h-[50%] flex  gap-[30px] items-center justify-center">
//             <h1 className=' text-[20px] '>You Have Successfully  Check Out</h1>

//             </div>
//           </div>
//           </div>
//       }
   
//       <div className=" w-[90%] h-[95%] p-[10px] flex items-center justify-center bg-[#8b8a8a62]  shadow-xl flex-col ">
//            <div className="w-[100%] h-[90%] flex items-center justify-center  flex-col ">
//             <div className="w-[100%] h-[10%] flex items-center justify-center    ">
//               <ul className="w-[90%] h-[90%] flex items-center justify-between    " >
//                 <li className=' list-none w-[50%] h-[100%] '>Product</li>
//                 <li className=' list-none w-[50%] h-[100%] '> Price </li>
//                 <li className=' list-none w-[50%] h-[100%] '> Quantity</li>
//                 <li className=' list-none w-[50%] h-[100%] '> SubTotal </li>
//               </ul>
//             </div>
//             <div className=" w-[100%] h-[90%] flex items-center  gap-[10px]  flex-col  ">
//               <div className=" w-[100%] h-[100%]  overflow-y-scroll  flex  flex-col  bg-[] ">
//               <main className="flex-grow p-6">
   
//       {loading ? (
//         <p>Loading...</p>
//       ) : cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="w-[100%] flex items-center h-[] justify-center flex-col gap-[20px] ">
//           {cartItems.map((item) => (
//             <div
//               key={item.productId}
//               className="flex items-center  h-[20vh] w-[100%] justify-between bg-[#f3f3f3] p-4 shadow-xl rounded-md"
//             >
//               <div className="flex items-center space-x-4">
//                 <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded" />
//                 <div>
//                   <h3 className="font-semibold">{item.productName}</h3>
//                   <p>Price: ${item.price}</p>
//                   <p>Subtotal: ${item.price * item.quantity}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   className="bg-green-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleIncreaseQuantity(item.productId)}
//                 >
//                   +
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleDecreaseQuantity(item.productId)}
//                 >
//                   -
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleRemoveItem(item.productId)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
         
//         </div>
//       )}
//       </main>

//               {/* <div className=" w-[100%] h-[20%] bg-[yellow] "></div>
//               <div className=" w-[100%] h-[20%] bg-[yellow] "></div>
//               <div className=" w-[100%] h-[20vh] bg-[yellow] "></div>
//               <div className=" w-[100%] h-[20vh] bg-[yellow] "></div>
//               <div className=" w-[100%] h-[20vh] bg-[yellow] "></div> */}

//               </div>
             
//             </div>
//            </div>
//            <div className=" w-[100%] h-[10%] bg-[] relative  flex items-center justify-center ">
//             <div className=" w-[50%]  h-[100%] flex  justify-center bg-[] gap-[20px] flex-col ">
//               <button onClick={handleClearCart} className=" w-[30%] h-[70%] flex items-center  justify-center border-none text-[white] bg-[#665d5d] rounded-[2px] border-[#7070707c] ... " >Clear Cart</button>
//               <button onClick={()=> setToggle(true)} className=" w-[30%] h-[28%] flex items-center  justify-center bg-[red]">Checkout </button>
//             </div>
           
//            </div>
//            <div className=""></div>
//       </div>
//     </div>
//    )
// }
// export default Cart

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../MarchantDashboard/Header/Header";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import { ToastContainer } from "react-toastify";


const Cart = () => {
      const [cartItems, setCartItems] = useState([]);
      const [loading, setLoading] = useState(false);
        const [totalPrice, setTotalPrice] = useState(0);
          const token = useSelector((state) => state.token);

            // const handleCheckout = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:2030/api/v1/checkout', 
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Pass the token to authenticate the user
  //         },
  //       }
  //     );
  //  console.log(response)
  //  Nav(`/confirmoreder`)
      
  //   } catch (error) {
  //     console.error('Checkout Error:', error);
  //     toast.error('An error occurred during checkout');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
        

          const handleRemoveItem = (productId) => {
            axios
              .post(
                'http://localhost:2030/api/v1/removeitem',
                { productId },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
                toast.success('Item removed from cart.');
              })
              .catch((error) => {
                console.error(error);
                toast.error('Failed to remove item.');
              });
          };
           const handleClearCart = () => {
                axios
                  .post(
                    'http://localhost:2030/api/v1/clearcart',
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then(() => {
                    setCartItems([]);
                    setTotalPrice(0);
                    toast.success('Cart cleared.');
                  })
                  .catch((error) => {
                    console.error(error);
                    toast.error('Failed to clear cart.');
                  });
              };
            


          const handleCheckout = async () => {
            setLoading(true);
            if(cartItems.length === 0){
              Swal.fire({
                icon: 'error',
                title: 'Please Add Some Item To Cart',
                text: 'Your Cart Is Empty.',
              }); 
              Nav('/')
            } else {
              try {
                const response = await axios.post(
                  'http://localhost:2030/api/v1/checkout', 
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Pass the token to authenticate the user
                    },
                  }
                );
             console.log(response)
             Swal.fire({
              icon: 'success',
              title: 'Checked ',
              text: response.data.message,
            });
             setLoading(false)
             setTimeout(()=>(
              Nav(`/confirmoreder`)

             ), 2000)
                
              } catch (error) {
                console.error('Checkout Error:', error);
                toast.error('An error occurred during checkout');
              } finally {
                setLoading(false);
              }
            }
           
          };
         
  // Sample data for cart items
  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:2030/api/v1/viewcart", {
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

  // Handle quantity increase

  // Handle quantity decrease
 

  // Handle remove item
 

  const Nav = useNavigate()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 relative md:mb-[2%] mb-[50%] h-[100vh] flex flex-col">
      {/* Top Bar */}
      {/* <header className="bg-black text-white text-sm text-center py-2">
        Summer Sale for All Swim Suits and Accessories - Get 50% Off |{" "}
        <a href="#" className="text-red-500 underline">
          Shop Now
        </a>
      </header> */}

      {/* Navbar */}
      {/* <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <h1 className="text-xl font-bold">Exclusive</h1>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600">
              Home
            </a>
            <a href="#" className="text-gray-600">
              Contact
            </a>
            <a href="#" className="text-gray-600">
              About
            </a>
            <a href="#" className="text-gray-600">
              Sign Up
            </a>
          </div>
        </div>
      </nav> */}
        {/* <ToastContainer
        style={{ zIndex: 99999999999999999999999999999999999999999 }} // Ensure this is higher than the header
      /> */}

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-500">
            Home / My Account / <span className="text-black font-bold">Cart</span>
          </p>
        </div>
      </div>
  

      {/* Cart Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 bg-white p-6 rounded-md shadow-md overflow-auto max-h-[60vh]">
            {cartItems.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 border-b">Product</th>
                    <th className="py-2 border-b">Price</th>
                    <th className="py-2 border-b">Quantity</th>
                    <th className="py-2 border-b">Subtotal</th>
                    <th className="py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productId} className="border-b">
                      <td className="py-3 flex items-center gap-4">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="text-[10px]" >{item.productName}</span>
                      </td>
                      <td className="py-3">${item.price}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            // onClick={() => decreaseQuantity(item.)}
                            className="px-2 py-1 bg-gray-300 text-gray-700 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            // onClick={() => increaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-300 text-gray-700 rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3">${item.price * item.quantity}</td>
                      <td className="py-3">
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty!</p>
            )}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Cart Total</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span>${subtotal}</span>
              </div>
             
              <button
                onClick={handleClearCart}
                className="bg-gray-500 text-white w-full py-3 mt-4 rounded-md"
              >
                Clear Cart
              </button>
              <button onClick={handleCheckout} disabled={loading} className="bg-red-500 text-white w-full py-3 mt-4 rounded-md">
                
                {
                  loading ? "Processing....." : "Proceed to Checkout"
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 flex flex-wrap justify-between text-sm">
          <div className="w-full md:w-1/5 mb-4 md:mb-0">
            <h3 className="font-bold">Exclusive</h3>
            <p>Get 10% off your first order</p>
          </div>
          <div className="w-full md:w-1/5 mb-4 md:mb-0">
            <h3 className="font-bold">Support</h3>
            <p>exclusive@gmail.com</p>
          </div>
          <div className="w-full md:w-1/5 mb-4 md:mb-0">
            <h3 className="font-bold">Account</h3>
            <p>Login / Register</p>
          </div>
          <div className="w-full md:w-1/5 mb-4 md:mb-0">
            <h3 className="font-bold">Quick Link</h3>
            <p>Terms of Use</p>
          </div>
          <div className="w-full md:w-1/5">
            <h3 className="font-bold">Download App</h3>
            <img src="https://via.placeholder.com/80" alt="QR Code" />
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Cart;
