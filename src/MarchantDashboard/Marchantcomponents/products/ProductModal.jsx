import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import axios from "axios";

const ProductModal = ({ isOpen, onClose, productToEdit, onSave, token, marchantId }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    categoryId: "",
    productImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load categories
    axios
      .get("https://new-ecomer-ce-app-backend2.vercel.app/api/v1/category")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  // Prefill if editing
  useEffect(() => {
    if (productToEdit) {
      setForm({
        productName: productToEdit.name || "",
        productPrice: productToEdit.price || "",
        productDescription: productToEdit.description || "",
        categoryId: productToEdit.categoryId || "",
        productImage: null,
      });
      setImagePreview(productToEdit.image || null);
    } else {
      setForm({ productName: "", productPrice: "", productDescription: "", categoryId: "", productImage: null });
      setImagePreview(null);
    }
  }, [productToEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, productImage: file });
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("productPrice", form.productPrice);
    formData.append("productDescription", form.productDescription);
    formData.append("productImage", form.productImage);
    formData.append("categoryId", form.categoryId);

    try {
      let res;
      if (productToEdit) {
        // UPDATE product
        res = await axios.put(
          `https://newecomerceappbackend.onrender.com/api/v1/updateProduct/${productToEdit._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // CREATE product
        res = await axios.post(
          `https://newecomerceappbackend.onrender.com/api/v1/createProduct/${marchantId}/${form.categoryId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      onSave(res.data.data);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[999999999999999999999999999999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white w-[90%] sm:w-[50%] rounded-lg p-6 relative">
        <button className="absolute top-3 right-3 text-gray-600" onClick={onClose}>✖</button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          {productToEdit ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="productImage" className="cursor-pointer">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
                  Upload
                </div>
              )}
            </label>
            <input type="file" id="productImage" onChange={handleImageChange} className="hidden" />
          </div>

          <input
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="productPrice"
            placeholder="Product Price"
            type="number"
            value={form.productPrice}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="productDescription"
            placeholder="Product Description"
            value={form.productDescription}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
          >
            {loading ? <BeatLoader color="#fff" size={10} /> : "Save"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProductModal;
