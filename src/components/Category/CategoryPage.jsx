import React, { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer'


const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const Nav = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://new-ecomer-ce-app-backend2.vercel.app/api/v1/category")
      .then((response) => {
        setCategories(response.data.data); // Set categories on successful response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
        setLoading(false);
      });
  }, []);

  return (

    <div className="w-full h-screen bg-[orange] p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Categories</h2>

      {/* Category Cards */}
      <div
        className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        style={{
          maxHeight: "calc(100vh - 120px)", // Ensure the container height fits inside the screen
          overflowY: "auto", // Enable scrolling
          paddingRight: "8px", // Prevent cutoff due to hidden scrollbar
        }}
      >
        {/* Apply styles for hiding the scrollbar */}
        <style>
          {`
            .category-container::-webkit-scrollbar {
              display: none; /* Hide scrollbar */
            }
            .category-container {
              -ms-overflow-style: none;  /* IE 10+ */
              scrollbar-width: none;  /* Firefox */
            }
          `}
        </style>

        {/* Loading or Error Messages */}
        {loading ? (
          <div className="w-full items-center flex justify-center">
            <BeatLoader color="#333" size={30} />
          </div>
        ) : error ? (
          <div className="w-full text-center text-red-500">{error}</div>
        ) : (
          categories.map((category,i) => (
            <div
              key={i}
              onClick={() => Nav(`/viewcategoryandProduct/${category._id}`)}
              className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200 ease-in-out cursor-pointer"
            >
              <div className="h-40 bg-gray-200">
                <img
                  src={category.categoryImage}
                  alt={category.categoryName}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{category.categoryName}</h3>
                <p className="text-gray-500">{category.categoryDescription}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Toaster />
    </div>
    
  );
};

export default CategoryPage;
