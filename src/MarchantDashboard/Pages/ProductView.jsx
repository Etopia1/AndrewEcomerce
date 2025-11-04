
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

const ProductView = () => {
  const { id } = useParams();
  const [products, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productName, setProductname] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setproductPrice  ]=useState("")
  const [productImage, setCategoryImage] = useState(null);
  const [deleteOne, setDeleteOne]=useState(false)
  const [success, setSuccess]=useState(false)
  const [imagePreview, setImagePreview] = useState(null);
  const token = useSelector((state) => state.marChantToken);
  const navigate = useNavigate();
 console.log(productName)
  const featchProudct = async () => {
    try {
      const response = await axios.get(`https://new-ecomer-ce-app-backend2.vercel.app/api/v1/getoneproduct/${id}`, {
        // headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
      setProduct(response.data.data);
      setProductname(response.data);
      setproductPrice(response.data.data)
      setProductDescription(response.data.data);
      setImagePreview(response.data.data.categoryImage);
    } catch (err) {
      console.error(err);
      // toast.error('Failed to fetch category details');
    }
  };

  useEffect(() => {
    featchProudct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (!categoryName || !categoryDescription) {
      toast.error('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('categoryDescription', categoryDescription);
    if (categoryImage) {
      formData.append('categoryImage', categoryImage);
    }

    try {
      setLoading(true);
      const response =  await axios.put(`https://newecomerceappbackend.onrender.com/api/v1/category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Category updated successfully!');
      setEditMode(false);
      console.log(response)
      fetchCategory();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update category.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
        const response =  await axios.delete(`https://newecomerceappbackend.onrender.com/api/v1/delete-product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      toast.success('Product deleted successfully!');
      setSuccess(true)
      setTimeout(()=>(
        navigate('/product')


      ), 200) // Adjust the route as needed
    } catch (err) {
      console.error(err);
    //   toast.error('Failed to delete category.');
    }
  };

  return (
    <div className="w-[100%] relative h-[100%] flex items-center justify-center p-6">
        {
            deleteOne ? <div data-aos="fade-down" className=" absolute h-[100%] w-[100%] bg-[#474646b2]  flex items-center justify-center">
            <div className=" w-[50%] h-[45%] rounded-[10px] bg-[white] ">
                <div className="w-[100%] h-[50%] flex items-center justify-center "> <h1>Are You Sure You Want To Delete</h1></div>
                <div className="  w-[100%] h-[50%] gap-[70px] flex items-center justify-center ">
                    <button className='w-[30%] rounded-[4px] bg-[#41e041] h-[30%] flex items-center justify-center '  onClick={handleDelete}> Yes </button>
                    <button className='w-[30%] rounded-[4px] bg-[#6363e6de] h-[30%] flex items-center justify-center'  onClick={() => setDeleteOne(false)}>No</button>
                </div>
            </div>
        </div>:null
        }
        <>
        {
           success ? <div className=' absolute h-[100%] w-[100%] bg-[#63646352] flex items-center justify-center  '>
            <div className=" w-[50%] h-[60%] bg-[white] rounded-[10px] ">
              <div className="w-[100%] h-[50%] "></div>
              <div className="w-[100%] h-[50%] flex items-center text-[35px] text-center justify-center ">
                <h1> You Have SuccessFully Delected A Category </h1>
              </div>
            </div>
           </div>: null
        }
        </>
       
      <Toaster />
      <div className="w-full max-w-3xl h-[100%] items-center justify-center flex-col flex bg-white rounded-lg shadow-2xl p-6">
        {editMode ? (
          <div className=' w-[60%]   '>
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category Image</label>
              <div className="flex justify-center items-center">
                <label className="cursor-pointer">
                  <div className="w-32 h-32 border-2 rounded-full overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        Upload Image
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductname(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              {loading ? (
                <button disabled className="px-4 py-2 bg-indigo-600 text-white rounded flex items-center">
                  <BeatLoader color="#ffffff" size={10} />
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Update Category
                </button>
              )}
            </div>
          </div>
        ) : products ? (
          <div className='w-[70%] h-[100%]   flex items-center justify-center flex-col '>
            <h2 className="text-[30px] h-[30%] items-center flex justify-center font-bold mb-4">{products.productName}</h2>
            <h2 className="text-[20px] h-[30%] items-center flex justify-center font-bold mb-4"> Price: #{products.productPrice}</h2>
            <div className="w-[100%]  h-[50%] flex items-center justify-center">
              <img
                src={products.productImage || 'https://via.placeholder.com/150'}
                alt={products.productName
                }
                className="w-full h-[100%] object-contain rounded"
              />
            </div>
            <p className="text-gray-600 text-[30px] mb-4">{products.productDescription}</p>
            <div className="flex w-[50%] h-[40%] items-center justify-between">
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 w-[40%] h-[40%] bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={()=> setDeleteOne(true)}
                className="px-4 py-2 bg-red-600 w-[40%] h-[40%] text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500"              
>Loading products details...</div>
        )}
      </div>
    </div>
  );
};

export default ProductView;
