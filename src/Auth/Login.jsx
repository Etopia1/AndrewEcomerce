import React, { useState } from 'react';

import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

// import DarkMode from "./DarkMode";
import { FiShoppingBag } from "react-icons/fi";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { Addtoken } from "../Global/Slice";
// import Login from "../../Auth/Login";
const Login = ({ setLogin, setPopup}) => {

  // const [login, setLogin] = useState(false)
  const [token, setToken]=useState(true)
  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [email2, setEmail2]=useState("")
  const [password2, setPassword2]=useState("")
  const dispatch = useDispatch()

  const HandleLogin = () => {
    if(!email || !password ){
      toast.error("Please Fill All Details")
    } else {
      const url = "https://new-ecomer-ce-app-backend2.vercel.app/api/auth/login"
      const data2 ={email :email2, password: password2}
      axios.post(url, data2)
      .then((res)=>{
        console.log(res);
        // toast.success(res.data.message)
        dispatch(Addtoken(res.data.token))

      })
      .catch((error)=>{
        console.log(error);
        // toast.error(error.data.message)

      })
    }
 }
  return (
    <>
    
        {/* header */}
        <div className="flex items-center justify-between w-[100%] h-[10%] ">
          <div>
            <h1>Login  Now</h1>
          </div>
          <div>
            <IoCloseOutline
              className="text-2xl cursor-pointer "
              onClick={() => setPopup(false)}
            />
          </div>
        </div>
        {/* form section */}
        <div className=" w-[100%] h-[80%]  flex gap-[40px] items-center
          justify-center flex-col ">
       
          <input
            type="email"
            placeholder="Email"
            onChange={(e)=> setEmail2(e.target.value)}
            className=" w-[80%] pl-[10px]  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 h-[15%]"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e)=> setPassword2(e.target.value)}

            className=" w-[80%] pl-[10px]  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 h-[15%]"
          />
          <div className="flex justify-center">
            <button onClick={HandleLogin}  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full ">
              Login
            </button>
          </div>
        </div>
        <div className=" w-[100%] h-[10%] flex items-center justify-center  ">
          <h3  className="gap-[10px] ">Don`t` have an Account?  <span onClick={()=> setLogin(true)} className="text-[#6666d3] ">Sign Up</span></h3>
        </div>
    </>
  );
}

export default Login;
