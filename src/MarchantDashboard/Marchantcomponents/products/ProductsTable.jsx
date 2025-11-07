// // // import { motion } from "framer-motion";
// // // import { Edit, Search, Trash2 } from "lucide-react";
// // // import { useState } from "react";
// // // import Modal from "../../../components/Modal/Modal";

// // // const PRODUCT_DATA = [
// // // 	{ id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
// // // 	{ id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
// // // 	{ id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
// // // 	{ id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
// // // 	{ id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
// // // ];

// // // const ProductsTable = () => {
// // // 	const [searchTerm, setSearchTerm] = useState("");
// // // 	const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);
// // //    const [show, setShow]= useState(true)
// // // 	const handleSearch = (e) => {
// // // 		const term = e.target.value.toLowerCase();
// // // 		setSearchTerm(term);
// // // 		const filtered = PRODUCT_DATA.filter(
// // // 			(product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
// // // 		);

// // // 		setFilteredProducts(filtered);
// // // 	};

// // // 	return (
// // // 		<motion.div
// // // 			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
// // // 			initial={{ opacity: 0, y: 20 }}
// // // 			animate={{ opacity: 1, y: 0 }}
// // // 			transition={{ delay: 0.2 }}
// // // 		>
// // // 			<Modal/>
// // // 			<div className='flex justify-between items-center mb-2 relative'>
// // // 				{/* {
// // // 					show ? <  : null
// // // 				} */}
// // // 				<button className="bg-blue-500  text-white placeholder-gray-400 rounded-[5px] pl-[13px] pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=> setShow(true)} >Add Product</button >
// // // 				<h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
// // // 				<div className='relative'>
// // // 					<input
// // // 						type='text'
// // // 						placeholder='Search products...'
// // // 						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
// // // 						onChange={handleSearch}
// // // 						value={searchTerm}
// // // 					/>
// // // 					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
// // // 				</div>
// // // 			</div>

// // // 			<div className='overflow-x-auto'>
// // // 				<table className='min-w-full divide-y divide-gray-700'>
// // // 					<thead>
// // // 						<tr>
// // // 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// // // 								Name
// // // 							</th>
// // // 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// // // 								Category
// // // 							</th>
// // // 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// // // 								Price
// // // 							</th>
// // // 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// // // 								Stock
// // // 							</th>
// // // 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// // // 								Sales
// // // 							</th>
// // // 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// // // 								Actions
// // // 							</th>
// // // 						</tr>
// // // 					</thead>

// // // 					<tbody className='divide-y divide-gray-700'>
// // // 						{filteredProducts.map((product) => (
// // // 							<motion.tr
// // // 								key={product.id}
// // // 								initial={{ opacity: 0 }}
// // // 								animate={{ opacity: 1 }}
// // // 								transition={{ duration: 0.3 }}
// // // 							>
// // // 								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
// // // 									<img
// // // 										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
// // // 										alt='Product img'
// // // 										className='size-10 rounded-full'
// // // 									/>
// // // 									{product.name}
// // // 								</td>

// // // 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// // // 									{product.category}
// // // 								</td>

// // // 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// // // 									${product.price.toFixed(2)}
// // // 								</td>
// // // 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.stock}</td>
// // // 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.sales}</td>
// // // 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// // // 									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
// // // 										<Edit size={18} />
// // // 									</button>
// // // 									<button className='text-red-400 hover:text-red-300'>
// // // 										<Trash2 size={18} />
// // // 									</button>
// // // 								</td>
// // // 							</motion.tr>
// // // 						))}
// // // 					</tbody>
// // // 				</table>
// // // 			</div>
// // // 		</motion.div>
// // // 	);
// // // };
// // // export default ProductsTable;

// // import { motion } from "framer-motion";
// // import { Edit, Search, Trash2 } from "lucide-react";
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import ProductModal from "./ProductModal";
// // import { useSelector } from "react-redux";

// // const ProductsTable = () => {
// //   const [products, setProducts] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const marchantId = useSelector((state) => state.marChantId);
// //   const token = useSelector((state) => state.marChantToken);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:2030/api/v1/allproducts")
// //       .then((res) => setProducts(res.data.data))
// //       .catch((err) => console.error(err));
// //   }, []);

// //   const handleSearch = (e) => {
// //     const term = e.target.value.toLowerCase();
// //     setSearchTerm(term);
// //   };

// //   const filteredProducts = products.filter(
// //     (p) => p.productName.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm)
// //   );

// //   const handleSave = (newProduct) => {
// //     if (selectedProduct) {
// //       // Update list
// //       setProducts((prev) => prev.map((p) => (p._id === newProduct._id ? newProduct : p)));
// //     } else {
// //       setProducts((prev) => [newProduct, ...prev]);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Delete this product?")) {
// //       try {
// //         await axios.delete(`http://localhost:2030/api/v1/deleteProduct/${id}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setProducts(products.filter((p) => p._id !== id));
// //       } catch (err) {
// //         console.error("Error deleting:", err);
// //       }
// //     }
// //   };

// //   return (
// //     <motion.div
// //       className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay: 0.2 }}
// //     >
// //       <div className="flex justify-between items-center mb-2">
// //         <button
// //           className="bg-blue-500 text-white rounded px-4 py-2"
// //           onClick={() => {
// //             setSelectedProduct(null);
// //             setModalOpen(true);
// //           }}
// //         >
// //           Add Product
// //         </button>
// //         <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
// //         <div className="relative">
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2"
// //             onChange={handleSearch}
// //             value={searchTerm}
// //           />
// //           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="min-w-full divide-y divide-gray-700">
// //           <thead>
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Price</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-700">
// //             {filteredProducts.map((p) => (
// //               <tr key={p._id}>
// //                 <td className="px-6 py-4 text-gray-100">{p.productName}</td>
// //                 <td className="px-6 py-4 text-gray-300">${p.productPrice}</td>
// //                 <td className="px-6 py-4 text-gray-300">{p.category}</td>
// //                 <td className="px-6 py-4 text-gray-300">
// //                   <button
// //                     onClick={() => {
// //                       setSelectedProduct(p);
// //                       setModalOpen(true);
// //                     }}
// //                     className="text-indigo-400 hover:text-indigo-300 mr-2"
// //                   >
// //                     <Edit size={18} />
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(p._id)}
// //                     className="text-red-400 hover:text-red-300"
// //                   >
// //                     <Trash2 size={18} />
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Modal */}
// //       <ProductModal
// //         isOpen={modalOpen}
// //         onClose={() => setModalOpen(false)}
// //         productToEdit={selectedProduct}
// //         onSave={handleSave}
// //         token={token}
// //         marchantId={marchantId}
// //       />
// //     </motion.div>
// //   );
// // };

// // export default ProductsTable;

// import { motion } from "framer-motion";
// import { Edit, Search, Trash2 } from "lucide-react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import ProductModal from "./ProductModal";
// import { useSelector } from "react-redux";

// const ProductsTable = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const marchantId = useSelector((state) => state.marChantId);
//   const token = useSelector((state) => state.marChantToken);

//   // ✅ Fetch all products
//   useEffect(() => {
//     axios
//       .get("http://localhost:2030/api/v1/allproducts")
//       .then((res) => setProducts(res.data.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ✅ Search filter
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   const filteredProducts = products.filter(
//     (p) =>
//       p.productName?.toLowerCase().includes(searchTerm) ||
//       p.category?.toLowerCase().includes(searchTerm)
//   );

//   // ✅ Handle Save (create or update)
//   const handleSave = (newProduct) => {
//     if (selectedProduct) {
//       // update list
//       setProducts((prev) =>
//         prev.map((p) => (p._id === newProduct._id ? newProduct : p))
//       );
//     } else {
//       // add new
//       setProducts((prev) => [newProduct, ...prev]);
//     }
//   };

//   // ✅ Delete product
//   const handleDelete = async (id, name) => {
//     if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
//       try {
//         await axios.delete(`http://localhost:2030/api/v1/deleteProduct/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProducts((prev) => prev.filter((p) => p._id !== id));
//       } catch (err) {
//         console.error("Error deleting product:", err);
//       }
//     }
//   };

//   return (
//     <motion.div
//       className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       {/* Header Section */}
//       <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
//         <button
//           onClick={() => {
//             setSelectedProduct(null);
//             setModalOpen(true);
//           }}
//           className="bg-blue-600 hover:bg-blue-500 transition text-white rounded-lg px-4 py-2 font-medium shadow-md"
//         >
//           + Add Product
//         </button>

//         <h2 className="text-xl font-semibold text-gray-100">Product List</h2>

//         <div className="relative w-64">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={handleSearch}
//             value={searchTerm}
//           />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Product
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-700">
//             {filteredProducts.map((p) => (
//               <motion.tr
//                 key={p._id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="hover:bg-gray-700/30 transition"
//               >
//                 {/* ✅ Product Image and Name */}
//                 <td className="px-6 py-4 text-sm text-gray-100 flex items-center gap-3">
//                   <img
//                     src={
//                       p.productImage ||
//                       "https://via.placeholder.com/50?text=No+Image"
//                     }
//                     alt={p.productName}
//                     className="w-10 h-10 rounded-full object-cover border border-gray-600"
//                   />
//                   {p.productName}
//                 </td>

//                 {/* Price */}
//                <td className="px-6 py-4 text-sm text-gray-300">
//   ${Number(p.productPrice)?.toFixed(2) || "0.00"}
// </td>


//                 {/* Category */}
//                 <td className="px-6 py-4 text-sm text-gray-300">
//                   {p.category}
//                 </td>

//                 {/* ✅ Action Buttons */}
//                 <td className="px-6 py-4 text-sm text-gray-300 flex items-center gap-3">
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(p);
//                       setModalOpen(true);
//                     }}
//                     className="p-2 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-lg transition"
//                     title="Edit Product"
//                   >
//                     <Edit size={18} className="text-indigo-400" />
//                   </button>

//                   <button
//                     onClick={() => handleDelete(p._id, p.productName)}
//                     className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition"
//                     title="Delete Product"
//                   >
//                     <Trash2 size={18} className="text-red-400" />
//                   </button>
//                 </td>
//               </motion.tr>
//             ))}

//             {filteredProducts.length === 0 && (
//               <tr>
//                 <td
//                   colSpan="4"
//                   className="text-center text-gray-400 py-6 text-sm"
//                 >
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Product Modal */}
//       <ProductModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         productToEdit={selectedProduct}
//         onSave={handleSave}
//         token={token}
//         marchantId={marchantId}
//       />
//     </motion.div>
//   );
// };

// export default ProductsTable;

import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const token = useSelector((state) => state.marChantToken);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://andrewecomerceback.onrender.com/api/v1/allproducts"
      );
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(
        `http://localhost:2030/api/v1/delete-product/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product deleted successfully!");
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredProducts = products.filter(
    (p) =>
      p.productName.toLowerCase().includes(searchTerm) ||
      p.category?.categoryName?.toLowerCase().includes(searchTerm)
  );

  return (
    <motion.div
      className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="pl-10 pr-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 text-sm">
          <thead>
            <tr className="text-gray-400 uppercase tracking-wider text-xs">
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredProducts.map((p) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-800"
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={p.productImage || "https://via.placeholder.com/50"}
                    alt={p.productName}
                    className="w-10 h-10 rounded-md object-cover border border-gray-700"
                  />
                  {/* <span className="font-medium">{p.productName}</span> */}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {p.productName }
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {p.category?.categoryName || "—"}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  ₦{Number(p.productPrice || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => openEditModal(p)}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ProductModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productToEdit={editingProduct}
          onSave={(updated) => {
            if (editingProduct) {
              setProducts((prev) =>
                prev.map((p) => (p._id === updated._id ? updated : p))
              );
            } else {
              setProducts((prev) => [updated, ...prev]);
            }
          }}
          token={token}
        />
      )}
    </motion.div>
  );
};

// ✅ Reusable Modal Component
const ProductModal = ({ isOpen, onClose, productToEdit, onSave, token }) => {
  const [productName, setProductName] = useState(productToEdit?.productName || "");
  const [productPrice, setProductPrice] = useState(productToEdit?.productPrice || "");
  const [category, setCategory] = useState(productToEdit?.category?.categoryName || "");
  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(productToEdit?.productImage || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.productName);
      setProductPrice(productToEdit.productPrice);
      setCategory(productToEdit.category?.categoryName || "");
      setPreview(productToEdit.productImage);
    }
  }, [productToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!productName || !productPrice) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("categoryName", category);
    if (productImage) formData.append("productImage", productImage);

    try {
      setLoading(true);
      const url = productToEdit
        ? `http://localhost:2030/api/v1/update-product/${productToEdit._id}`
        : "http://localhost:2030/api/v1/createProduct//676ff37040dc1435fcd93b6a";

      const res = await axios[productToEdit ? "put" : "post"](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(productToEdit ? "Product updated!" : "Product added!");
      onSave(res.data.data);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed z-[999999999999999999999999] inset-0 bg-black bg-opacity-70 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gray-900 p-6 rounded-xl shadow-lg w-[400px]"
      >
        <h3 className="text-lg font-semibold mb-4">
          {productToEdit ? "Edit Product" : "Add New Product"}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Category Name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="block text-gray-400 text-sm mt-2">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-gray-300"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-contain rounded-lg border border-gray-700 mt-3"
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            {loading ? "Saving..." : productToEdit ? "Update" : "Add"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductsTable;
