// import React from "react";
// import { motion } from "framer-motion";

// const arrivals = [
//   {
//     id: 1,
//     title: "PlayStations",
//     img: "https://via.placeholder.com/600x600",
//   },
//   {
//     id: 2,
//     title: "Women's Collections",
//     img: "https://via.placeholder.com/600x300",
//   },
//   {
//     id: 3,
//     title: "Speakers",
//     img: "https://via.placeholder.com/600x300",
//   },
//   {
//     id: 4,
//     title: "Perfume",
//     img: "https://via.placeholder.com/600x300",
//   },
// ];

// const NewArrival = () => {
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       {/* Header */}
//       <div className="mb-10">
//         <p className="text-[#ff4d73] font-semibold text-sm mb-1">Featured</p>
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//           New Arrival
//         </h2>
//       </div>

//       {/* Main Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT: Large Hero */}
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           transition={{ duration: 0.3 }}
//           className="relative bg-black rounded-2xl overflow-hidden shadow-lg h-[450px] lg:h-[600px] col-span-1"
//         >
//           <img
//             src={arrivals[0].img}
//             alt={arrivals[0].title}
//             className="w-full h-full object-cover opacity-90"
//           />
//           <div className="absolute bottom-6 left-6 text-white">
//             <h3 className="text-3xl md:text-4xl font-bold mb-3">
//               {arrivals[0].title}
//             </h3>
//             <button className="bg-white text-black px-5 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition">
//               Shop Now
//             </button>
//           </div>
//         </motion.div>

//         {/* RIGHT: Smaller Boxes */}
//         <div className="col-span-2 flex flex-col gap-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Women's Collection */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//               className="relative rounded-2xl overflow-hidden bg-gray-100 h-[280px] md:h-[250px]"
//             >
//               <img
//                 src={arrivals[1].img}
//                 alt={arrivals[1].title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-5 left-5 text-white">
//                 <h3 className="text-xl font-semibold mb-2">
//                   {arrivals[1].title}
//                 </h3>
//                 <button className="bg-white text-black text-sm px-3 py-1.5 rounded-md hover:bg-gray-200 transition">
//                   Shop Now
//                 </button>
//               </div>
//             </motion.div>

//             {/* Speakers */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//               className="relative rounded-2xl overflow-hidden bg-gray-100 h-[280px] md:h-[250px]"
//             >
//               <img
//                 src={arrivals[2].img}
//                 alt={arrivals[2].title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-5 left-5 text-white">
//                 <h3 className="text-xl font-semibold mb-2">
//                   {arrivals[2].title}
//                 </h3>
//                 <button className="bg-white text-black text-sm px-3 py-1.5 rounded-md hover:bg-gray-200 transition">
//                   Shop Now
//                 </button>
//               </div>
//             </motion.div>
//           </div>

//           {/* Bottom Perfume Card */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//             className="relative rounded-2xl overflow-hidden bg-gray-100 h-[320px]"
//           >
//             <img
//               src={arrivals[3].img}
//               alt={arrivals[3].title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute bottom-5 left-5 text-white">
//               <h3 className="text-xl font-semibold mb-2">
//                 {arrivals[3].title}
//               </h3>
//               <button className="bg-white text-black text-sm px-3 py-1.5 rounded-md hover:bg-gray-200 transition">
//                 Shop Now
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewArrival;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";

const PINK = "#ff4d73";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const NewArrival = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch API
  useEffect(() => {
    axios
      .get("https://andrewecomerceback.onrender.com/api/v1/topproducts")
      .then((res) => setTopProducts(res.data.data || []))
      .catch((err) => console.error("Error fetching top products:", err));
  }, []);

  // ✅ Auto Slide (every 5 seconds)
  useEffect(() => {
    if (topProducts.length > 4) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 4) % topProducts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [topProducts]);

  // ✅ Show 4 at a time
  const visibleProducts = topProducts.slice(currentIndex, currentIndex + 4);
  const safeArrivals = [
    ...visibleProducts,
    ...Array(Math.max(0, 4 - visibleProducts.length)).fill({
      productName: "Loading...",
      productImage: "https://via.placeholder.com/600x600",
    }),
  ].slice(0, 4);

  return (
    <section className="w-full bg-white py-10 px-6 md:px-10">
      {/* 🩷 Custom Header */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 rounded-md" style={{ backgroundColor: PINK }}></div>
              <div>
                <p className="text-lg font-semibold" style={{ color: PINK }}>
                  Featured
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">New Arrival</h2>
              </div>
            </div>
    
            {/* Pagination Buttons (desktop only) */}
          
          </div>

      {/* 🌀 Animated Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* LEFT: Large Hero */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="relative bg-black rounded-2xl overflow-hidden shadow-lg h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] col-span-1"
            >
              <motion.img
                src={safeArrivals[0].productImage}
                alt={safeArrivals[0].productName}
                className="w-full h-full object-cover opacity-90"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
              />
              <motion.div
                className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                  {safeArrivals[0].productName}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-5 sm:px-6 py-2 sm:py-2.5 rounded-md font-semibold hover:bg-gray-200 transition"
                >
                  Shop Now
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT: Smaller Cards */}
            <div className="col-span-2 flex flex-col gap-6 md:gap-8">
              {/* Top Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[safeArrivals[1], safeArrivals[2]].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: idx * 0.2 + 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative rounded-2xl overflow-hidden bg-gray-100 h-[220px] sm:h-[250px] md:h-[280px] shadow-md"
                  >
                    <motion.img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2 }}
                    />
                    <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 text-white">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 drop-shadow-lg">
                        {item.productName}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black text-xs sm:text-sm px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
                      >
                        Shop Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Card */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-2xl overflow-hidden bg-gray-100 h-[240px] sm:h-[280px] md:h-[290px] shadow-md"
              >
                <motion.img
                  src={safeArrivals[3].productImage}
                  alt={safeArrivals[3].productName}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                />
                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 drop-shadow-lg">
                    {safeArrivals[3].productName}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black text-xs sm:text-sm px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
                  >
                    Shop Now
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default NewArrival;
