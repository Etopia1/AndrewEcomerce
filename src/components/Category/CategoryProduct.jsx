// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { BeatLoader } from "react-spinners";
// import { Toaster, toast } from "react-hot-toast";
// import { useSelector } from "react-redux";

// const CategoryProducts = () => {
//   const token = useSelector((state)=> state.token)

//   const { id } = useParams(); // Get category ID from URL
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   console.log(token)
//   console.log(id);
//   const Nav = useNavigate()

//   // Fetch products of the selected category
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:1900/api/v1/category/${id}`) // Use categoryId to fetch products
//       .then((response) => {
//         console.log(response.data.data.products);
//         setProducts(response.data.data.products); // Set products to state
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setError("Failed to load products.");
//         setLoading(false);
//       });
//   }, [id]);

  

//   // Function to add a product to the cart
//   const addToCart = (productId, quantity) => {
//     // const token = localStorage.getItem("authToken"); // Retrieve the authentication token

//     if (!token) {
//       toast.error("You need to log in to add items to the cart.");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:1900/api/v1/addtocart",
//         { productId, quantity },
//         {
//           headers: {
//             "Authorization": `Bearer ${token}`, // Send the token in the header
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         toast.success("Item added to cart!");
//         console.log("Cart updated:", response.data);
//       })
//       .catch((error) => {
//         toast.error(error.response?.data?.message || "Failed to add item to cart.");
//         console.log("Error adding to cart:", error);
//       });
//   };
//     const featchProudct = async () => {
//     try {
//       const response = await axios.get(`http://localhost:1900/api/v1/getoneproduct/${id}`, {
//         // headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(response.data)
//       setProduct(response.data.data);
//       setProductname(response.data);
//       setproductPrice(response.data.data)
//       setProductDescription(response.data.data);
//       setImagePreview(response.data.data.categoryImage);
//     } catch (err) {
//       console.error(err);
//       // toast.error('Failed to fetch category details');
//     }
//   };


//   return (
//     <div className="w-full h-screen bg-[red]-100 p-6">
//       <h2 className="text-3xl font-bold mb-6">Products in this Category</h2>

//       {/* Loading or Error Messages */}
//       {loading ? (
//         <div className="w-full flex justify-center">
//           <BeatLoader color="#333" size={30} />
//         </div>
//       ) : error ? (
//         <div className="w-full text-center text-red-500">{error}</div>
//       ) : (
//         <div className="w-full flex-wrap max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {/* Product Cards */}
//           {products.map((product) => (
//             <div
//               key={product._id}
//               onClick={()=> Nav(`/productView/${product._id}`)}
//               className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
//             >
//               <div className="h-40 bg-gray-200">
//                 <img
//                   src={product.productImage}
//                   alt={product.productName}
//                   className="w-full h-full object-cover rounded-t-lg"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
//                 <p className="text-gray-500">{product.productDescription}</p>
//                 <p className="text-xl font-bold text-gray-700">${product.productPrice}</p>
                
//                 {/* Add to Cart Button */}
//                 <button
//                   className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                   onClick={() => addToCart(product._id, 1)} // Add product with quantity 1
//                 >
//                   Add To Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Toaster /> {/* Toast notifications */}
//     </div>
//   );
// };

// export default CategoryProducts;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from '../Footer/Footer'
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const CategoryProducts = () => {
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const Nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://andrewecomerceback.onrender.com/api/v1/category/${id}`)
      .then((response) => {
        setProducts(response.data.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [id]);

  const addToCart = (productId, quantity) => {
    if (!token) {
      toast.error("You need to log in to add items to the cart.");
      Nav("/Userlogin")
    }

    axios
      .post(
        "https://andrewecomerceback.onrender.com/api/v1/addtocart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        toast.success("Item added to cart!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to add item to cart.");
      });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        Products in this Category
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <BeatLoader color="#333" size={30} />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => Nav(`/productView/${product._id}`)}
              className="flex flex-col w-full md:w-[30%] lg:w-[23%] bg-white rounded-lg shadow hover:shadow-lg transition duration-200"
            >
              <div className="w-full h-40 bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {product.productDescription}
                </p>
                <p className="text-lg font-bold text-gray-700 mb-4">
                  ${product.productPrice}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id, 1);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toaster />
    </div>

  );
};

export default CategoryProducts;
