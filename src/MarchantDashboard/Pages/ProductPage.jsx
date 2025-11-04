import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createToggle, setCreateToggle] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search
  const marchantId = useSelector((state) => state.marChantId);
  const token = useSelector((state) => state.marChantToken);
  const Nav = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    axios
      .get("https://new-ecomer-ce-app-backend2.vercel.app/api/v1/category")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      });
  }, []);

  // Fetch all products initially
  useEffect(() => {
    axios
      .get("https://newecomerceappbackend.onrender.com/api/v1/allproducts")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Search API call on search term change
  // useEffect(() => {
  
    
   const Handlesearch = () =>{
    axios
    .post(`https://newecomerceappbackend.onrender.com/api/v1/products-search/${searchTerm}`)
    .then((response) => {
      setProducts(response.data.data); // Update products based on search
    })
    .catch((error) => {
      console.error("Error searching for products:", error);
    });
   }
 
    
 // Adjust the debounce time as needed

  // }, []); // This effect runs whenever the search term changes

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCategoryId || !productName || !productPrice || !productDescription || !productImage) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    setLoading(true);
    axios
      .post(`https://newecomerceappbackend.onrender.com/api/v1/createProduct/${marchantId}/${selectedCategoryId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token here
        },
      })
      .then((response) => {
        console.log("Product created successfully:", response.data);
        setLoading(false);
        // Handle success (reset form, show success message, etc.)
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error creating product:", error);
        setError("Failed to create product.");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); // Create preview URL
    }
  };

  return (
    <div className="w-[100%] h-[100%] mx-auto bg-white shadow-lg relative flex items-center justify-center flex-col gap-[10px] rounded-lg">
      {createToggle && (
        <div
          data-aos={createToggle ? "fade-down" : "fade-up"}
          className="w-[100%] z-[99999] h-[100%] flex items-center justify-center absolute bg-[#000000cb]"
        >
          <div className="w-[50%] h-[80%] rounded-[10px] relative bg-[#ffffff] flex items-center justify-center flex-col">
            <h2
              onClick={() => setCreateToggle(false)}
              className="w-[40px] absolute top-[10px] rounded-[100%] right-[30px] h-[40px] bg-[#a04f4f] flex items-center justify-center flex-col"
            >
              X
            </h2>
            {/* Image Preview at the Top */}
            <div className="mb-4 flex w-[100%] justify-center">
              <label htmlFor="productImage" className="cursor-pointer">
                <div
                  className={`w-24 h-24 ${
                    imagePreview ? "border-2 border-indigo-600" : "border-2 border-gray-300"
                  } rounded-full overflow-hidden`}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 text-center flex items-center justify-center text-gray-500">
                      Click to Upload
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            {/* Product Name */}
            <div className="w-[80%]">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            {/* Product Price */}
            <div className="w-[80%]">
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                Product Price
              </label>
              <input
                type="number"
                id="productPrice"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            {/* Product Description */}
            <div className="w-[80%]">
              <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <textarea
                id="productDescription"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>

            {/* Select Category */}
            <div className="w-[80%]">
              <label htmlFor="categorySelect" className="block text-sm font-medium text-gray-700">
                Select Category
              </label>
              <select
                id="categorySelect"
                className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="mb-4 text-center pt-[20px]">
              {loading ? (
                <button
                  disabled
                  className="py-3 px-6 rounded bg-gray-600 text-gray-400 flex items-center justify-center"
                >
                  <BeatLoader color="#ffffff" size={12} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="py-3 px-6 rounded bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Create Product
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="w-[100%] h-[10%] bg-[] flex items-center justify-center gap-[5px]">
       <div className=" w-[100%] h-[100%] flex items-center justify-center bg-[] gap-[5px] ">
                   <div className=" w-[20%] h-[80%] flex items-center justify-center bg-[gray] "></div>
                   <div className=" w-[60%] h-[80%]  p-[3px] flex items-center justify-center ">
                                     <div className=" w-[100%] h-[100%] bg-[#e9e1e1cc] flex rounded-[3px] items-center justify-center ">
                                     <div className=" w-[20%] h-[100%] flex items-center justify-center  ">
                                         <BiSearch className=" text-[30px] " />
                                     </div>
                                     <input className=" w-[100%] text-black h-[100%] border-none outline-none flex items-center justify-center bg-transparent pl-20px " type="text" placeholder="Search For Category" />
                 
                                     </div>
                                 
                                 </div>
                   <div className="w-[20%] h-[80%] flex items-center justify-center bg-[] ">
                       <button className='w-[60%] h-[100%] flex items-center justify-center rounded-[4px] bg-[blue] ' onClick={()=> setCreateToggle(true)} >Add CateGory</button>
                   </div>
               </div>
      </div>

      {/* Product List */}
      <div className="w-[100%] h-[90%] flex items-center justify-center bg-[gray] flex-wrap gap-10">
        <div
          className={`w-[98%] h-[98%] justify-center ${
            products.length === 4 ? "flex-nowrap" : "flex-wrap"
          } ${products.length > 4 ? "overflow-y-scroll" : "overflow-y-hidden"} flex p-4 gap-[10px]`}
        >
          {products.length === 0 ? (
            <div className="w-[100%] h-[100%] flex items-center justify-center bg-[gray]">
              <BeatLoader color="#ffffff" size={60} />
            </div>
          ) : (
            products.map((e, i) => (
              <div
                key={i}
                onClick={() => Nav(`/viewProduct/${e._id}`)}
                data-aos="fade-down"
                className="w-[24%] shadow-lg rounded-[10px] h-[60%] bg-[white] flex items-center justify-center flex-col"
              >
                <div className="w-[100%] h-[50%] flex items-center justify-center">
                  <img className="w-[100%] h-[100%] object-contain" src={e.productImage} alt="" />
                </div>
                <div className="w-[100%] h-[25%] flex items-center justify-center">
                  <h1>{e.productName}</h1>
                </div>
                <div className="w-[100%] h-[25%] flex-col gap-[5px] flex items-center justify-center">
                  <h1 className="text-[30px]">{e.productPrice}</h1>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
