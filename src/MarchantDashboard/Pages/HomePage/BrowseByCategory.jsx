// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const BrowseByCategory = () => {
// //   const [categories, setCategories] = useState([]);
// //   const Nav = useNavigate();

// //   useEffect(() => {
// //     axios
// //       .get("https://andrewecomerceback.onrender.com/api/v1/category")
// //       .then((res) => setCategories(res.data.data))
// //       .catch((err) => console.log(err));
// //   }, []);

// //   return (
// //     <section className="py-12 px-4 flex flex-col items-center justify-center">
// //       <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
// //         Browse By Category
// //       </h2>

// //       {/* Categories Flex Container */}
// //       <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
// //         {categories.map((category) => (
// //           <div
// //             key={category._id}
// //             onClick={() => Nav(`/viewcategoryandProduct/${category._id}`)}
// //             className="bg-white border-2 border-black rounded-xl flex flex-col items-center justify-center p-6 
// //                        w-40 h-44 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
// //           >
// //             <img
// //               src={category.categoryImage}
// //               alt={category.categoryName}
// //               className="w-20 h-20 object-contain mb-4"
// //             />
// //             <p className="font-semibold text-gray-800 text-center text-sm capitalize">
// //               {category.categoryName}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Empty State */}
// //       {categories.length === 0 && (
// //         <p className="text-center text-gray-500 mt-6">
// //           No categories available.
// //         </p>
// //       )}
// //     </section>
// //   );
// // };

// // export default BrowseByCategory;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

// const PINK = "#ff4d73";

// const BrowseByCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   const categoriesPerPage = 4;

//   // ✅ Fetch categories from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("https://andrewecomerceback.onrender.com/api/v1/category");
//         if (res.data && res.data.data) {
//           setCategories(res.data.data);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const totalPages = Math.ceil(categories.length / categoriesPerPage);
//   const startIdx = (currentPage - 1) * categoriesPerPage;
//   const currentCategories = categories.slice(
//     startIdx,
//     startIdx + categoriesPerPage
//   );

//   const handlePrev = () => setCurrentPage((p) => (p > 1 ? p - 1 : totalPages));
//   const handleNext = () => setCurrentPage((p) => (p < totalPages ? p + 1 : 1));

//   return (
//     <div className="w-full bg-white py-12 px-6 md:px-10">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-10">
//         <div className="flex items-center gap-3">
//           <div
//             className="w-3 h-8 rounded-md"
//             style={{ backgroundColor: PINK }}
//           ></div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Browse by Category
//           </h2>
//         </div>

//         {/* Pagination */}
//         {categories.length > 4 && (
//           <div className="flex items-center gap-3">
//             <button
//               onClick={handlePrev}
//               className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//             >
//               <IoIosArrowBack />
//             </button>
//             <button
//               onClick={handleNext}
//               className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//             >
//               <IoIosArrowForward />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Category Cards */}
//       <div
//         className={`flex   ${
//           currentCategories.length <= 4 ? "justify-center flex-wrap" : ""
//         } gap-10 overflow-x-auto scrollbar-hide`}
//       >
//         {currentCategories.map((category) => (
//           <div
//             key={category._id}
//             onClick={() =>
//               navigate(`/viewcategoryandProduct/${category._id}`)
//             }
//             className="min-w-[200px] bg-white border border-black rounded-2xl shadow-md 
//                        hover:shadow-xl hover:scale-105 transition-all duration-300 
//                        p-1 cursor-pointer flex flex-col items-center justify-center"
//           >
//             <img
//               src={category.categoryImage}
//               alt={category.categoryName}
//               className="w-32 h-32 object-contain mb-4"
//             />
//             <h3 className="text-lg font-semibold text-gray-800 text-center capitalize">
//               {category.categoryName}
//             </h3>
//           </div>
//         ))}

//         {categories.length === 0 && (
//           <p className="text-center text-gray-500 w-full">
//             No categories found.
//           </p>
//         )}
//       </div>

//       {/* Hide scrollbar */}
//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BrowseByCategory;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PINK = "#ff4d73";
const FALLBACK_IMG = "https://via.placeholder.com/150?text=No+Image";

const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categoriesPerPage = 4;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          "https://andrewecomerceback.onrender.com/api/v1/category",
          { cancelToken: source.token, timeout: 10000 }
        );
        console.log("API response:", res.data);
        if (res.data && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        } else {
          // handle unexpected shape
          console.warn("API returned unexpected shape, using empty array.");
          setCategories([]);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled");
        } else {
          console.error("Error fetching categories:", err);
          setError(err.message || "Failed to load categories");
          setCategories([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    return () => source.cancel("Component unmounted");
  }, []);

  const totalPages = Math.max(1, Math.ceil(categories.length / categoriesPerPage));
  const startIdx = (currentPage - 1) * categoriesPerPage;
  const currentCategories = categories.slice(startIdx, startIdx + categoriesPerPage);

  const handlePrev = () => setCurrentPage((p) => (p > 1 ? p - 1 : totalPages));
  const handleNext = () => setCurrentPage((p) => (p < totalPages ? p + 1 : 1));

  return (
    <div className="w-full bg-white py-12 px-6 md:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 rounded-md" style={{ backgroundColor: PINK }} />
          <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
        </div>

        {/* Pagination */}
        {categories.length > categoriesPerPage && (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="previous"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <IoIosArrowBack />
            </button>
            <button
              onClick={handleNext}
              aria-label="next"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </div>

      {/* Loading / Error */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      )}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-red-500 mb-2">Error: {error}</p>
          <p className="text-sm text-gray-500">Check console for details.</p>
        </div>
      )}

      {/* Category row (forces single row + horizontal scroll on small screens) */}
      {!isLoading && !error && (
        <div
          className="flex gap-6 overflow-x-auto scrollbar-hide py-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {currentCategories.length === 0 && (
            <p className="text-center text-gray-500 w-full">No categories found.</p>
          )}

          {currentCategories.map((category) => {
            const imgSrc = category?.categoryImage || FALLBACK_IMG;
            return (
              <button
                key={category._id || category.id || Math.random()}
                onClick={() => navigate(`/viewcategoryandProduct/${category._id}`)}
                className="min-w-[170px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] bg-white border border-gray-200 rounded-2xl
                           shadow-sm hover:shadow-lg hover:scale-105 transform-gpu transition duration-200
                           p-4 cursor-pointer flex flex-col items-center justify-start text-left"
              >
                <div className="w-full flex justify-center mb-3">
                  <img
                    src={imgSrc}
                    alt={category.categoryName || "category"}
                    onError={(e) => {
                      if (e.target.src !== FALLBACK_IMG) e.target.src = FALLBACK_IMG;
                    }}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 capitalize">
                    {category.categoryName || "Unnamed"}
                  </h3>
                  {category.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Hide scrollbar styling */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default BrowseByCategory;
