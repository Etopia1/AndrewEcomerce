import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
import { BeatLoader } from 'react-spinners';

const Categorypage = () => {
    const [addatogle, setAddTogle]=useState(false)
    const [categoryName, setcategoryName]=useState("")
    const [categoryDescription, setcategoryDescription]=useState("")
    const Nav = useNavigate()
    const [categoryImage, setcategoryImage]=useState(null)
      const [imagePreview, setImagePreview] = useState(null);
      const [loading, setLoading]=useState(false)
      const [categories, setcategories]=useState([])
      const token = useSelector((state)=> state.marChantToken    )
      console.log(token)
      const data = [1,2,3,4]
    
      const getAllcategory = () =>{
        axios.get('https://new-ecomer-ce-app-backend2.vercel.app/api/v1/category')
        .then((res)=>{
            console.log(res.data.data)
            setcategories(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
      }
 
       useEffect(()=>(
        getAllcategory()
       ))
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setcategoryImage(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    const handleCatename =(e)=>{
     const newdata = e.target.value
     setcategoryName(newdata)
    }
    const handleCatedis =(e)=>{
     const newdata = e.target.value
     setcategoryDescription(newdata)
    }
 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryDescription || !categoryName || categoryImage === null) {
      toast.error('Please fill in all the fields and upload a profile image.');
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('categoryDescription', categoryDescription);
    formData.append('categoryImage', categoryImage);

    try {
        setLoading(true)
      const response = await axios.post('https://new-ecomer-ce-app-backend2.vercel.app/api/v1/category', formData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' },
        
      });
      setLoading(false)
      setcategoryName("")
      setcategoryDescription("")
      setcategoryImage(null)
      setTimeout(()=>(
        setAddTogle(false)

      ), 2000)
       console.log(response)
    //   navigate(`/marchant-verifyotp/${response.data.data.token}`);
    } catch (err) {
       console.log(err)
       setLoading(false)
    }
  };
  return (
    <div className=' w-[100%] h-[100%] flex items-center relative justify-center p-3px flex-col gap-2 '>
        {
            addatogle ?         <div data-aos={ addatogle ? "fade-down" : "fade-up"}     className="sm:w-[100%] md:w-[100%] absolute z-[999999] flex items-center justify-center flex-col h-[100vh] w-[100%] bg-[#5a99e069] ">
                <h1 onClick={()=> setAddTogle(false)} data-aos="fade-up" className='hidden md:flex absolute xl:flex top-[20px] text-[40px] hover:transform-gpu right-[20px] w-[50px] hover:bg-[gray] cursor-pointer  pb-[1%] rounded-[100%] h-[50px] hover:text-[white] bg-[#f9faf9]  items-center justify-center '>x</h1>
         <div className=" w-[90%] md:w-[50%]  h-[70%] flex items-center bg-[white] rounded-[6px] justify-center flex-col ">
            <h1 className=' flex absolute right-[40px] top-[100px] w-[30px] xl:hidden  h-[30px] bg-[gray]  md:hidden items-center justify-center rounded-[100%] ' onClick={()=> setAddTogle(false)}>X</h1>
         <div className="flex justify-center mb-6">
          <label htmlFor="profileImage" className="cursor-pointer">
            <div
              className={`w-24 h-24 ${imagePreview ? 'border-2 border-indigo-600' : 'border-2 border-gray-300'} rounded-full overflow-hidden`}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300 text-center flex items-center justify-center text-gray-500">
                  Click to Upload
                </div>
              )}
            </div>
            <input
              type="file"
              id="profileImage"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <Toaster/>
          </label>
        </div>
        <div className="space-y-4 w-[70%] flex items-center justify-center flex-col">
         


          <div className=' w-[100%] '>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Category name</label>
            <input
              type="text"
              id="text"
              value={categoryName}
              onChange={handleCatename}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Category Name"
              required
            />
          </div>

          <div className='w-[100%]'>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Category Description</label>
            <textarea
              id="description"
              value={categoryDescription}
              onChange={handleCatedis}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe your business"
              required
            />
          </div>

       
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
              className="py-3 px-6 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Create Category
            </button>
          )}
        </div>
         </div>
            </div>
:null
        }
        <div className=" w-[100%] h-[10%] flex items-center justify-center bg-[] gap-[5px] ">
            <div className=" w-[20%] h-[80%] flex items-center justify-center bg-[] "></div>
            <div className=" w-[60%] h-[80%]  p-[3px] flex items-center justify-center ">
                              <div className=" w-[100%] h-[100%] bg-[] flex rounded-[3px] items-center justify-center ">
                              <div className=" w-[20%] h-[100%] flex items-center justify-center  ">
                                  <BiSearch className=" text-[30px] " />
                              </div>
                              <input className=" w-[100%] text-black h-[100%] border-none outline-none flex items-center justify-center bg-transparent pl-20px " type="text" placeholder="Search For Category" />
          
                              </div>
                          
                          </div>
            <div className="w-[20%] h-[80%] flex items-center justify-center ">
                <button className='w-[60%] h-[70%] flex items-center justify-center rounded-[4px] bg-[blue] ' onClick={()=> setAddTogle(!addatogle)} >Add CateGory</button>
            </div>
        </div>
        <div className=" w-[100%]  md:flex-wrap h-[90%] flex items-center justify-center bg-[gray] flex-wrap gap-10 ">
        <div className={`w-[98%] h-[98%]  justify-center  ${categories.length === 4 ? "flex-nowrap" : "flex-wrap"}  ${categories.length > 4 ? "xl:overflow-y-scroll md:overflow-y-hidden" : "xl:overflow-y-hidden md:overflow-y-hidden" }  overflow-y-scroll flex p-4 gap-[10px] `} >
            <>
              {
                categories.length === 0 ? <div className=' w-[100%] h-[100%] flex items-center justify-center bg-[gray] '><BeatLoader color="#ffffff" size={60} /></div>  : <>
                 {
                    categories.map((e, i)=>(
                    <div key={i} onClick={()=> Nav(`/viewCategory/${e._id}`)}  data-aos="fade-down"  className=" md:w-[24%] xl:w-[24%] shadow-lg rounded-[10px] w-[100%] h-[60%] bg-[white] flex items-center justify-center flex-col ">
                        <div className=" w-[100%] h-[50%] flex items-center justify-center ">
                            <img className=' w-[100%] h-[100%] object-contain  rounded-[10px ' src={e.categoryImage} alt="" />
                        </div>
                        <div className="w-[100%] h-[25%] flex items-center justify-center ">
                            <h1>{e.categoryName}</h1>
                        </div>
                        <div className="w-[100%] h-[25%] flex items-center justify-center ">
                            <p>{e.categoryDescription}</p>
                        </div>
    
                        </div>
    
                    ))
                } </>
              }
            </>
           
      
        

        </div>
        </div>
      
    </div>
  )
}

export default Categorypage
