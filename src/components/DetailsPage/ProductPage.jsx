import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from '../Footer/Footer'

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
    const {id} = useParams()
    const [oneProduct, setoneproducts]=useState([])
    const [relatedItem, setrelateditem]=useState([])
    const [quantity, setQuantity]=useState(1)
    const [categoryid, setcategoryid]=useState("")
    console.log(categoryid)
    const token = useSelector((state)=> state.token)

    // const token = useSelector((state)=> state.token)
    const Nav = useNavigate()

    const getoneProduct = () =>{
        axios.get(`http://localhost:2030/api/v1/getoneproduct/${id}`)
        .then((res)=>{
            setoneproducts(res.data.data)
            setcategoryid(res.data.data.category)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>(
        getoneProduct()
    ), [id])
    const addToCart = (productId, quantity) => {
     if(!token){
      toast.error("Please Login To Add To cart")
      setTimeout(()=>(
  Nav("/Userlogin")
      ), 2000)
     }
    
  
      axios
        .post(
          "https://new-ecomer-ce-app-backend2.vercel.app/api/v1/addtocart",
          { productId, quantity },
          {
            headers: {
              "Authorization": `Bearer ${token}`, // Send the token in the header
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          toast.success("Item added to cart!");
          console.log("Cart updated:", response.data);
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Failed to add item to cart.");
          console.log("Error adding to cart:", error);
        });
    };

    const featchProudct = async () => {
      try {
        const response = await axios.get(`https://andrewecomerceback.onrender.com/api/v1/category/${categoryid}`, {
        });
        console.log(response?.data?.data)
        // setrelateditem(response?.data?.data?.products)
              const items = Array.isArray(response?.data?.data?.products) ? response?.data?.data?.products : [];

      // Filter out the current product
      const filteredItems = items.filter((item) => item?._id !== id);
      setrelateditem(filteredItems);
      } catch (err) {
        console.error(err);
        // toast.error('Failed to fetch category details');
      }
    };
    useEffect(()=>{
      featchProudct()
    })

  // Embedded product data
  const productData = {
    name: "Havic HV G-92 Gamepad",
    mainImage: "src/assets/hero/Woman2.png",
    description:
      "Precision-crafted controller that combines high quality with ergonomic design.",
    price: 192.0,
    colors: ["#000000", "#FF0000", "#00FF00"],
    images: [
      "src/assets/hero/Woman2.png",
      "src/assets/hero/Woman2.png",
      "src/assets/hero/Woman2.png",
      "src/assets/hero/Woman2.png",
    ],
    relatedItems: [
      {
        name: "HAVIT HV-001 Gamepad",
        image: "src/assets/hero/Woman2.png",
        price: 50,
      },
      {
        name: "AK-400 Wired Keyboard",
        image: "src/assets/hero/Woman2.png",
        price: 40,
      },
      {
        name: "PS LCD Gaming Monitor",
        image: "src/assets/hero/Woman2.png",
        price: 250,
      },
      {
        name: "RGB Liquid CPU Cooler",
        image: "https://via.placeholder.com/100",
        price: 120,
      },
    ],
  };

  return (
    // <>
    
    <div className="max-w-6xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        {oneProduct.productName}
      </div>
<Toaster/>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Images Section */}
        <div className="flex-1">
          {/* Main Image */}
          <div className="flex justify-center">
            <img
              src={oneProduct.productImage}
              alt={productData.name}
              className="w-96 h-96 object-cover rounded-md"
            />
          </div>

          {/* Additional Images */}
          <div className="flex justify-center gap-4 mt-4">
            {
            productData.images.map((image, index) => {
              <img
                key={index}
                src={image}
                alt={`Additional ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md ${
                  index % 2 === 0 ? "rotate-8" : "-rotate-6"
                }`}
              />
})}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">{oneProduct.productName}</h1>
          <p className="text-gray-500 mt-2">{oneProduct.productDescription}</p>
          <p className="text-2xl font-bold text-red-500 mt-4">
            ${oneProduct.productPrice}
          </p>

          {/* Colors */}
          <div className="mt-4">
            <span className="font-semibold">Colors:</span>
            <div className="flex gap-2 mt-2">
             
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center mt-6">
            <input
              type="number"
              min="1"
              defaultValue="1"

              onChange={(e)=> setQuantity(e.target.value)}
              className="border border-gray-300 rounded w-16 p-2 text-center"
            />
            <button
           onClick={() => addToCart(oneProduct._id, quantity)}
             className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
              Add to Cart
            </button>
          </div>

          {/* Delivery Information */}
          <div className="mt-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Free Delivery:</span>
              <span>Enter your location to check availability.</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold">Return Delivery:</span>
              <span>This item is eligible for returns.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Related Items</h2>
        <div className="flex overflow-x-auto gap-4 mt-4">
         { relatedItem?.map((item, index) => (
          < div onClick={()=> Nav(`/productView/${item._id}`)} >
            <div
              key={index}
              className="w-48 flex-shrink-0 border p-4 rounded-md"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="text-sm mt-2 font-medium">{item.productName}</h3>
              <p className="text-sm text-red-500 mt-1">${item.productPrice}</p>
            </div>
          </div>
           
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const ProductPage = () => {
//   const { id } = useParams(); // Get product ID from URL params
//   const token = useSelector((state) => state.token); // Redux selector for token
//   const [product, setProduct] = useState(null);
//   const [relatedItems, setRelatedItems] = useState([]);
//   const [imagePreview, setImagePreview] = useState("");

//   // Fetch Product Details
//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(
//         `https://new-ecomer-ce-app-backend2.vercel.app/api/v1/getoneproduct/${id}`
//       );
//       const fetchedProduct = response.data.data;

//       setProduct(fetchedProduct);
//       setImagePreview(fetchedProduct.productImage);

//       // Fetch related products by category
//       fetchRelatedItems(fetchedProduct.category, fetchedProduct._id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch Related Items
//   const fetchRelatedItems = async (category, currentProductId) => {
//     try {
//       const response = await axios.get(
//         `https://new-ecomer-ce-app-backend2.vercel.app/api/v1/category/${category}`
//       );
//       const items = Array.isArray(response.data.data) ? response.data.data : [];

//       // Filter out the current product
//       const filteredItems = items.filter((item) => item?._id !== currentProductId);
//       setRelatedItems(filteredItems);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const addToCart = (productId, quantity) => {
//     if (!token) {
//       console.error("You need to log in to add items to the cart.");
//       return;
//     }

//     axios
//       .post(
//         "https://new-ecomer-ce-app-backend2.vercel.app/api/v1/addtocart",
//         { productId, quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         console.log("Item added to cart:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error adding to cart:", error.response?.data?.message);
//       });
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       {/* Breadcrumb */}
//       <div className="text-sm text-gray-500 mb-4">
//         Home / {product.category} / {product.name}
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left: Images Section */}
//         <div className="flex-1">
//           {/* Main Image */}
//           <div className="flex justify-center">
//             <img
//               src={imagePreview}
//               alt={product.name}
//               className="w-96 h-96 object-cover rounded-md"
//             />
//           </div>
//         </div>

//         {/* Right: Product Details */}
//         <div className="flex-1">
//           <h1 className="text-3xl font-semibold">{product.name}</h1>
//           <p className="text-gray-500 mt-2">{product.description}</p>
//           <p className="text-2xl font-bold text-red-500 mt-4">
//             ${product.price}
//           </p>

//           {/* Colors */}
//           <div className="mt-4">
//             <span className="font-semibold">Colors:</span>
//             <div className="flex gap-2 mt-2">
//               {product.colors?.map((color, index) => (
//                 <div
//                   key={index}
//                   className="w-6 h-6 rounded-full"
//                   style={{ backgroundColor: color }}
//                 ></div>
//               ))}
//             </div>
//           </div>

//           {/* Quantity and Add to Cart */}
//           <div className="flex items-center mt-6">
//             <input
//               type="number"
//               min="1"
//               defaultValue="1"
//               className="border border-gray-300 rounded w-16 p-2 text-center"
//             />
//             <button
//               className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
//               onClick={() => addToCart(product._id, 1)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Related Items Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold">Related Items</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//           {relatedItems.map((item, index) => (
//             <div
//               key={index}
//               className="border p-4 rounded-md flex flex-col items-center"
//             >
//               <img
//                 src={item.productImage}
//                 alt={item.name}
//                 className="w-32 h-32 object-cover rounded-md mb-2"
//               />
//               <h3 className="text-sm font-medium text-center">{item.name}</h3>
//               <p className="text-red-500 mt-1">${item.price}</p>
//               <button
//                 className="bg-blue-500 text-white px-4 py-1 rounded-md mt-2"
//                 onClick={() => window.location.href = `/product/${item._id}`}
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
