import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';

const Home = () => {
  const [product, setProduct]=useState([])
  const [category, setcategory]=useState([])
  const marchantId = useSelector((state) => state.marChantId);
  const token = useSelector((state) => state.marChantToken);
  const getAllcategory = () =>{
    axios.get('https://new-ecomer-ce-app-backend2.vercel.app/api/v1/category')
    .then((res)=>{
        console.log(res.data.data)
        setcategory(res.data.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  const getAllProduct = () =>{
    axios.get('https://newecomerceappbackend.onrender.com/api/v1/allproducts')
    .then((res)=>{
        console.log(res.data.data)
        setProduct(res.data.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  useEffect(()=>(
    getAllProduct(),
    getAllcategory()
  ), [])
  return (
    <div className=' w-[100%] h-[100%] flex  items-center justify-center  flex-col '>
      <div className=" w-[100%] p-1 h-[20%] flex items-center justify-center shadow-sm bg-[#e7e4e4] gap-[20px] ">
        <div className=" w-[20%] h-[100%] bg-[] flex items-center justify-center flex-col ">
            <div className=" w-[42%] h-[70%] flex items-center justify-center text-[40px] text-[san serif] rounded-[100%] bg-[white] text-[black] ">
                {0}

            </div>
            <h3 className=' text-[25px] text-[white]  '>Orders</h3>
        </div>
        <div className="w-[20%] h-[100%] bg-[] flex items-center justify-center flex-col ">
        <div className=" w-[42%] h-[70%] flex items-center justify-center text-[40px] text-[san serif] rounded-[100%] bg-[white] text-[black]"> {category.length === 0 ? <RingLoader color='gray' size={40}/> : category.length}

</div>
<h3 className=' text-[25px] text-[white]  '>Category</h3>
        </div>
        <div className="w-[20%] h-[100%] bg-[] flex items-center justify-center flex-col">
        <div className=" w-[42%] h-[70%] flex items-center justify-center text-[40px] text-[san serif] rounded-[100%] bg-[white] text-[black] ">
            {product.length === 0 ?<RingLoader color='gray' size={40}/>  :  product.length}

</div>
<h3 className=' text-[25px] text-[white]  '>Products</h3>
        </div>
        <div className="w-[20%] h-[100%] bg-[] flex items-center justify-center flex-col">
        <div className="w-[42%] h-[70%] flex items-center justify-center text-[40px] text-[san serif] rounded-[100%] bg-[white] text-[black] ">{0       }

</div>
<h3 className=' text-[25px] text-[white]  '>Orders</h3>
        </div>
        <div className="w-[20%] h-[100%] bg-[] flex items-center justify-center flex-col">
        <div className=" w-[42%] h-[70%] flex items-center justify-center text-[40px] text-[san serif] rounded-[100%] bg-[white] text-[black] ">{0}

</div>
<h3 className=' text-[25px] text-[white]  '>Orders</h3>
        </div>
      </div>
      <div className=" w-[100%] h-[80%] "></div>
    </div>
  )
}

export default Home
