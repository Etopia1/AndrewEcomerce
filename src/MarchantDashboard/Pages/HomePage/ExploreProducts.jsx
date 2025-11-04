// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const PINK = "#ff4d73";
// const API_URL = "https://andrewecomerceback.onrender.com/api/v1";

// const ExploreProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/allproducts`)
//       .then((res) => setProducts(res.data.data || []))
//       .catch(() => toast.error("Failed to fetch products"));
//   }, []);

//   const productsPerPage = 8;
//   const totalPages = Math.ceil(products.length / productsPerPage);
//   const currentProducts = products.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   const toggleWishlist = (id) => {
//     setWishlistItems((prev) =>
//       prev.includes(id)
//         ? (toast.info("Removed from wishlist 💔"), prev.filter((pid) => pid !== id))
//         : (toast.success("Added to wishlist ❤️"), [...prev, id])
//     );
//   };

//   const handleMoveToCart = (id) => toast.success("Added to cart 🛒");
//   const handleViewDetails = (product) => navigate(`/productView/${product._id}`);

//   // Split products into two sets for tablet two-row view
//   const topRow = products.slice(0, Math.ceil(products.length / 2));
//   const bottomRow = products.slice(Math.ceil(products.length / 2));

//   return (
//     <div className="w-full bg-white py-10 px-6 md:px-10">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-6">
//         <div className="flex items-center gap-3">
//           <div className="w-3 h-8 rounded-md" style={{ backgroundColor: PINK }}></div>
//           <div>
//             <p className="text-lg font-semibold" style={{ color: PINK }}>
//               Explore
//             </p>
//             <h2 className="text-3xl font-bold text-gray-900 mt-1">Our Products</h2>
//           </div>
//         </div>

//         {/* Pagination Buttons (desktop only) */}
//         <div className="hidden lg:flex items-center gap-3">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40"
//           >
//             <IoIosArrowBack className="text-lg text-gray-700" />
//           </button>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40"
//           >
//             <IoIosArrowForward className="text-lg text-gray-700" />
//           </button>
//         </div>
//       </div>

//       {/* ✅ Mobile View (1-row scroll) */}
//       <div className="flex gap-5 overflow-x-auto scrollbar-hide sm:hidden pb-4">
//         {products.map((product) => {
//           const isWishlisted = wishlistItems.includes(product._id);
//           return (
//             <ProductCard
//               key={product._id}
//               product={product}
//               isWishlisted={isWishlisted}
//               toggleWishlist={toggleWishlist}
//               handleMoveToCart={handleMoveToCart}
//               handleViewDetails={handleViewDetails}
//             />
//           );
//         })}
//       </div>

//       {/* ✅ Tablet View (2 rows, each scrolls separately) */}
//       <div className="hidden sm:block lg:hidden space-y-8">
//         {/* Top row */}
//         <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
//           {topRow.map((product) => {
//             const isWishlisted = wishlistItems.includes(product._id);
//             return (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//                 isWishlisted={isWishlisted}
//                 toggleWishlist={toggleWishlist}
//                 handleMoveToCart={handleMoveToCart}
//                 handleViewDetails={handleViewDetails}
//               />
//             );
//           })}
//         </div>

//         {/* Bottom row */}
//         <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
//           {bottomRow.map((product) => {
//             const isWishlisted = wishlistItems.includes(product._id);
//             return (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//                 isWishlisted={isWishlisted}
//                 toggleWishlist={toggleWishlist}
//                 handleMoveToCart={handleMoveToCart}
//                 handleViewDetails={handleViewDetails}
//               />
//             );
//           })}
//         </div>
//       </div>

//       {/* ✅ Desktop View (Paginated grid) */}
//       <div className="hidden lg:grid grid-cols-4 gap-6">
//         {currentProducts.map((product) => {
//           const isWishlisted = wishlistItems.includes(product._id);
//           return (
//             <ProductCard
//               key={product._id}
//               product={product}
//               isWishlisted={isWishlisted}
//               toggleWishlist={toggleWishlist}
//               handleMoveToCart={handleMoveToCart}
//               handleViewDetails={handleViewDetails}
//             />
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

// export default ExploreProducts;

// /* ✅ ProductCard Component */
// const ProductCard = ({
//   product,
//   isWishlisted,
//   toggleWishlist,
//   handleViewDetails,
//   handleMoveToCart,
// }) => {
//   return (
//     <div className="min-w-[230px] bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 relative flex flex-col">
//       {/* Wishlist + Eye icons */}
//       <div className="absolute top-3 right-3 flex gap-2">
//         <button
//           onClick={() => toggleWishlist(product._id)}
//           className="bg-white rounded-full p-2 shadow hover:bg-pink-100 transition"
//         >
//           {isWishlisted ? (
//             <FaHeart style={{ color: PINK }} />
//           ) : (
//             <FaRegHeart className="text-gray-500" />
//           )}
//         </button>
//         <button
//           onClick={() => handleViewDetails(product)}
//           className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
//         >
//           <FaEye className="text-gray-600 hover:text-black" />
//         </button>
//       </div>

//       <img
//         src={product.productImage}
//         alt={product.productName}
//         className="w-full h-40 object-contain mb-3"
//       />

//       <h3 className="text-base font-semibold text-gray-800 truncate">
//         {product.productName}
//       </h3>
//       <p className="text-gray-500 text-sm truncate mb-3">
//         {product.productDescription?.slice(0, 45)}...
//       </p>
//       <div className="flex justify-between items-center mt-auto">
//         <p className="text-lg font-bold text-green-600">
//           ₦{product.productPrice?.toLocaleString()}
//         </p>
//         <button
//           onClick={() => handleMoveToCart(product._id)}
//           className="flex items-center gap-1 bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <FaShoppingCart /> Add
//         </button>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PINK = "#ff4d73";
const API_URL = "https://andrewecomerceback.onrender.com/api/v1";

const ExploreProducts = () => {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);

  // ✅ Fetch Products
  useEffect(() => {
    axios
      .get(`${API_URL}/allproducts`)
      .then((res) => setProducts(res.data.data || []))
      .catch(() => toast.error("Failed to fetch products"));
  }, []);

  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // ✅ Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.includes(id)
        ? (toast.info("Removed from wishlist 💔"), prev.filter((pid) => pid !== id))
        : (toast.success("Added to wishlist ❤️"), [...prev, id])
    );
  };

  // ✅ Add to Cart
  const addToCart = (product) => {
    if (!token) {
      toast.error("Please Login To Add To Cart");
      setTimeout(() => navigate("/Userlogin"), 1500);
      return;
    }

    axios
      .post(
        `${API_URL}/addtocart`,
        { productId: product._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => toast.success("Item added to cart 🛒"))
      .catch((err) =>
        toast.error(err.response?.data?.message || "Failed to add item.")
      );
  };

  // ✅ View Product
  const handleViewDetails = (product) => navigate(`/productView/${product._id}`);

  // ✅ Split Products for Tablet Two-Row View
  const topRow = products.slice(0, Math.ceil(products.length / 2));
  const bottomRow = products.slice(Math.ceil(products.length / 2));

  return (
    <div className="w-full bg-white py-10 px-6 md:px-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 rounded-md" style={{ backgroundColor: PINK }}></div>
          <div>
            <p className="text-lg font-semibold" style={{ color: PINK }}>
              Explore
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">
              Our Products
            </h2>
          </div>
        </div>

        {/* Pagination (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
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

      {/* ✅ Mobile View (Horizontal Scroll) */}
      <div className="flex gap-5 overflow-x-auto scrollbar-hide sm:hidden pb-4">
        {products.map((product) => {
          const isWishlisted = wishlistItems.includes(product._id);
          return (
            <ProductCard
              key={product._id}
              product={product}
              isWishlisted={isWishlisted}
              toggleWishlist={toggleWishlist}
              handleViewDetails={handleViewDetails}
              addToCart={addToCart}
            />
          );
        })}
      </div>

      {/* ✅ Tablet View (2 rows scroll separately) */}
      <div className="hidden sm:block lg:hidden space-y-8">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {topRow.map((product) => {
            const isWishlisted = wishlistItems.includes(product._id);
            return (
              <ProductCard
                key={product._id}
                product={product}
                isWishlisted={isWishlisted}
                toggleWishlist={toggleWishlist}
                handleViewDetails={handleViewDetails}
                addToCart={addToCart}
              />
            );
          })}
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {bottomRow.map((product) => {
            const isWishlisted = wishlistItems.includes(product._id);
            return (
              <ProductCard
                key={product._id}
                product={product}
                isWishlisted={isWishlisted}
                toggleWishlist={toggleWishlist}
                handleViewDetails={handleViewDetails}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      </div>

      {/* ✅ Desktop View (Paginated Grid) */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {currentProducts.map((product) => {
          const isWishlisted = wishlistItems.includes(product._id);
          return (
            <ProductCard
              key={product._id}
              product={product}
              isWishlisted={isWishlisted}
              toggleWishlist={toggleWishlist}
              handleViewDetails={handleViewDetails}
              addToCart={addToCart}
            />
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

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ExploreProducts;

/* ✅ Product Card Component */
const ProductCard = ({
  product,
  isWishlisted,
  toggleWishlist,
  handleViewDetails,
  addToCart,
}) => {
  return (
    <div className="min-w-[230px] bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 relative flex flex-col">
      {/* Wishlist + Eye Icons */}
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
        <button
          onClick={() => handleViewDetails(product)}
          className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        >
          <FaEye className="text-gray-600 hover:text-black" />
        </button>
      </div>

      {/* Image */}
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-full h-40 object-contain mb-3"
      />

      {/* Info */}
      <h3 className="text-base font-semibold text-gray-800 truncate">
        {product.productName}
      </h3>
      <p className="text-gray-500 text-sm truncate mb-3">
        {product.productDescription?.slice(0, 45)}...
      </p>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-lg font-bold text-green-600">
          ₦{product.productPrice?.toLocaleString()}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="flex items-center gap-1 bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition"
        >
          <FaShoppingCart /> Add
        </button>
      </div>
    </div>
  );
};
