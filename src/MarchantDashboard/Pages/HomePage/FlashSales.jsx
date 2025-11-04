// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// const API_URL = "http://localhost:2030/api/v1";
// const PINK = "#ff4d73";

// const FlashSale = () => {
//   const [products, setProducts] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [countdown, setCountdown] = useState({});
//   const userId = useSelector((state) => state.userId);

//   const productsPerPage = 4; // show 4 per row (and half visible on next scroll)

//   // 🕒 Countdown timer (24h)
//   useEffect(() => {
//     const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = endTime - now;

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setCountdown({ days, hours, minutes, seconds });

//       if (distance < 0) clearInterval(timer);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // ✅ Fetch products
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/allproducts`);
//       setProducts(res.data.data || []);
//     } catch (err) {
//       console.log("❌ Error fetching products:", err);
//     }
//   };

//   // ✅ Fetch wishlist
//   const fetchWishlist = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/wishlist/${userId}`);
//       if (res.data?.data?.items) {
//         setWishlistItems(res.data.data.items.map((item) => item.product));
//       } else {
//         setWishlistItems([]);
//       }
//     } catch (err) {
//       console.log("⚠️ Error fetching wishlist:", err);
//     }
//   };

//   // ❤️ Toggle wishlist
//   const toggleWishlist = async (productId) => {
//     try {
//       const isWishlisted = wishlistItems.includes(productId);
//       if (isWishlisted) {
//         await axios.delete(`${API_URL}/wishlist/remove/${productId}`, {
//           data: { userId },
//         });
//         toast.info("Removed from wishlist 💔");
//       } else {
//         await axios.post(`${API_URL}/wishlist/add`, { userId, productId });
//         toast.success("Added to wishlist ❤️");
//       }
//       fetchWishlist();
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating wishlist");
//     }
//   };

//   // 🛍 Move to Cart
//   const handleMoveToCart = async (productId) => {
//     try {
//       const res = await axios.post(`${API_URL}/wishlist/move-to-cart/${productId}`, {
//         userId,
//       });
//       toast.success(res.data.message || "Moved to cart 🛒");
//       fetchWishlist();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to move to cart");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchWishlist();
//   }, []);

//   // Pagination Logic
//   const totalPages = Math.ceil(products.length / productsPerPage);
//   const startIdx = (currentPage - 1) * productsPerPage;
//   const currentProducts = products.slice(startIdx, startIdx + productsPerPage);

//   return (
//     <div className="w-full bg-white py-10 px-6 md:px-10">
//       {/* Header with countdown and pagination */}
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
//         {/* Left side */}
//         <div className="flex items-center gap-3">
//           <div
//             className="w-3 h-8 rounded-md"
//             style={{ backgroundColor: PINK }}
//           ></div>
//           <div>
//             <p className="text-lg font-semibold" style={{ color: PINK }}>
//               Today’s
//             </p>
//             <h2 className="text-3xl font-bold text-gray-900 mt-1">
//               Flash Sales
//             </h2>
//           </div>
//         </div>

//         {/* Right side (Countdown + pagination) */}
//         <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6">
//           {/* Countdown */}
//           <div className="flex gap-4 items-center">
//             {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
//               const keys = ["days", "hours", "minutes", "seconds"];
//               return (
//                 <div key={i} className="text-center">
//                   <p className="text-xl font-bold text-gray-800">
//                     {countdown[keys[i]] ?? "00"}
//                   </p>
//                   <p className="text-xs text-gray-500">{label}</p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination Arrows */}
//           <div className="flex items-center gap-3">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40"
//             >
//               <IoIosArrowBack className="text-lg text-gray-700" />
//             </button>
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//               className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40"
//             >
//               <IoIosArrowForward className="text-lg text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Horizontal Row of Products */}
//       <div className="flex gap-12 overflow-x-auto scrollbar-hide">
//         {currentProducts.map((product) => {
//           const isWishlisted = wishlistItems.includes(product._id);
//           return (
//             <div
//               key={product._id}
//               className="min-w-[250px] bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 relative"
//             >
//               {/* Wishlist Heart */}
//               <button
//                 onClick={() => toggleWishlist(product._id)}
//                 className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-pink-100 transition"
//               >
//                 {isWishlisted ? (
//                   <FaHeart style={{ color: PINK }} />
//                 ) : (
//                   <FaRegHeart className="text-gray-500" />
//                 )}
//               </button>

//               {/* Product Image */}
//               <img
//                 src={product.productImage}
//                 alt={product.productName}
//                 className="w-full h-44 object-contain mb-4"
//               />

//               {/* Product Info */}
//               <div>
//                 <h3 className="text-base font-semibold text-gray-800 truncate">
//                   {product.productName}
//                 </h3>
//                 <p className="text-gray-500 text-sm truncate">
//                   {product.productDescription?.slice(0, 45)}...
//                 </p>
//                 <div className="flex justify-between items-center mt-3">
//                   <p className="text-lg font-bold text-green-600">
//                     ₦{product.productPrice?.toLocaleString()}
//                   </p>
//                   <button
//                     onClick={() => handleMoveToCart(product._id)}
//                     className="flex items-center gap-1 bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition"
//                   >
//                     <FaShoppingCart /> Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* View All Button */}
//       <div className="flex justify-center mt-10">
//         <button
//           className="bg-[#ff4d73] hover:bg-[#ff2e5e] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition"
//           onClick={() => toast.info("View all products coming soon!")}
//         >
//           View All Products
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlashSale;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa"; // 👈 Added FaEye
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:2030/api/v1";
const PINK = "#ff4d73";

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countdown, setCountdown] = useState({});
  const userId = useSelector((state) => state.userId);
  const Nav =useNavigate()
  const productsPerPage = 4;

  // 🕒 Countdown timer (24h)
  useEffect(() => {
    const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (distance < 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/allproducts`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.log("❌ Error fetching products:", err);
    }
  };

  // ✅ Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API_URL}/wishlist/${userId}`);
      if (res.data?.data?.items) {
        setWishlistItems(res.data.data.items.map((item) => item.product));
      } else {
        setWishlistItems([]);
      }
    } catch (err) {
      console.log("⚠️ Error fetching wishlist:", err);
    }
  };

  // ❤️ Toggle wishlist
  const toggleWishlist = async (productId) => {
    try {
      const isWishlisted = wishlistItems.includes(productId);
      if (isWishlisted) {
        await axios.delete(`${API_URL}/wishlist/remove/${productId}`, {
          data: { userId },
        });
        toast.info("Removed from wishlist 💔");
      } else {
        await axios.post(`${API_URL}/wishlist/add`, { userId, productId });
        toast.success("Added to wishlist ❤️");
      }
      fetchWishlist();
    } catch (err) {
      console.error(err);
      toast.error("Error updating wishlist");
    }
  };

  // 🛍 Move to Cart
  const handleMoveToCart = async (productId) => {
    try {
      const res = await axios.post(`${API_URL}/wishlist/move-to-cart/${productId}`, { userId });
      toast.success(res.data.message || "Moved to cart 🛒");
      fetchWishlist();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to move to cart");
    }
  };

  // 👁️ Handle View Details
  const handleViewDetails = (product) => {
    // You can navigate to product details page or open modal
    toast.info(`Viewing details for ${product.productName}`);
    console.log("View Details:", product);
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  // Pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIdx, startIdx + productsPerPage);

  return (
    <div className="w-full bg-white py-10 px-6 md:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 rounded-md" style={{ backgroundColor: PINK }}></div>
          <div>
            <p className="text-lg font-semibold" style={{ color: PINK }}>Today’s</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">Flash Sales</h2>
          </div>
        </div>

        {/* Countdown + Pagination */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6">
          <div className="flex gap-4 items-center">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
              const keys = ["days", "hours", "minutes", "seconds"];
              return (
                <div key={i} className="text-center">
                  <p className="text-xl font-bold text-gray-800">
                    {countdown[keys[i]] ?? "00"}
                  </p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40"
            >
              <IoIosArrowBack className="text-lg text-gray-700" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40"
            >
              <IoIosArrowForward className="text-lg text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Row */}
      <div className="flex gap-12 overflow-x-auto scrollbar-hide">
        {currentProducts.map((product) => {
          const isWishlisted = wishlistItems.includes(product._id);
          return (
            <div
              key={product._id}
              className="min-w-[250px] bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 relative"
            >
              {/* Wishlist + View Icons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="bg-white rounded-full p-2 shadow hover:bg-pink-100 transition"
                >
                  {isWishlisted ? (
                    <FaHeart style={{ color: PINK }} />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>

                {/* 👁️ Eye Icon */}
                <button
                  onClick={() => handleViewDetails(product)}
                  className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                >
                  <FaEye className="text-gray-600 hover:text-black"                 onClick={() => Nav(`/productView/${product._id}`)}
 />
                </button>
              </div>

              {/* Product Image */}
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-44 object-contain mb-4"
              />

              {/* Product Info */}
              <div>
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {product.productName}
                </h3>
                <p className="text-gray-500 text-sm truncate">
                  {product.productDescription?.slice(0, 45)}...
                </p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg font-bold text-green-600">
                    ₦{product.productPrice?.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleMoveToCart(product._id)}
                    className="flex items-center gap-1 bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition"
                  >
                    <FaShoppingCart /> Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-[#ff4d73] hover:bg-[#ff2e5e] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition"
          onClick={() => toast.info("View all products coming soon!")}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default FlashSale;
