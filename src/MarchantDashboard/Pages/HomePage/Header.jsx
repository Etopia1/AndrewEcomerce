// import React, { useState, useEffect } from "react";
// import { FaBars, FaTimes, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import { useDispatch, useSelector } from "react-redux";
// import { FiHome, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
// import { clearUser } from "../../../components/Global/Slice";
// import { FiLogIn, FiUserPlus } from "react-icons/fi";


// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [hello, setHello] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
  
//   // const [token, setToken] = useState(false);
//   const token = useSelector((state)=> state.token)
//   const dispatch = useDispatch()
//   // const CartNav =() =>{
//   //   // if(token){
//   //     // Nav("/userlogin")
//   //   // } else{
//   //     Nav("/cartpage")
//   //   // }
//   // }
       
//   useEffect(() => {

//     axios
//       .get("https://newecomerceappbackend.onrender.com/api/v1/viewcart", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log("hello", response);
//         setCartItems(response.data.data.data.items);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [token]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   const Nav = useNavigate()
//   const logout =()=> {
//     dispatch(clearUser())
//   }


//   return (
//     <header className="bg-white shadow  top-0 bottom-0 w-[100%] h-[10%] sticky z-[999999999999999999999999999999999999]">
//       {/* Top Bar */}
//       {/* <div className="bg-gray-100 text-sm text-gray-700 py-2 px-4 flex justify-between items-center">
//         <p>Summer Sale: Up to 50% off | Free Express Delivery</p>
//         <div className="flex items-center space-x-4">
//           <span className="cursor-pointer">English</span>
//         </div>
//       </div> */}

//       {/* Main Header */}
//       <div className="flex justify-between items-center px-4 md:px-8 py-4">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-gray-800">Exclusive</div>

//         {/* Navigation Links for Desktop */}
//         <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
//           <p  onClick={
//             () => Nav("/")
//           }  className="hover:text-blue-600">
//             Home
//           </p>
//           <p onClick={
//             () => Nav("/contact")
//           }  className="hover:text-blue-600">
//             Contact
//           </p>
//           <a onClick={
//             () => Nav("/aboutus")
//           }  className="hover:text-blue-600">
//             About
//           </a>
//           <a href="/signup" className="hover:text-blue-600">
          
//           </a>
//         </nav>

//         {/* Icons & Search */}
//         <div className="flex items-center space-x-4">
//           {/* Search Bar */}
//           {/* <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden">
//             {/* <input
//               type="text"
//               placeholder="What are you looking for?"
//               className="px-4 py-2 w-64 focus:outline-none"
//             /> */}
           
//           {/* </div> */} 

//           {/* Icons */}
//           <div className="flex items-center space-x-4">
//             <FaUser onMouseEnter={()=> setHello(true)} className="text-gray-700 relative hover:text-blue-600 text-xl cursor-pointer" />
//            {
//             !token ? <>
//               {
//               hello ?             <div onMouseLeave={()=> setHello(false)} data-aos="fade-down" className=" md:w-[15%] md:h-[150%] absolute w-[30%] top-[60px] right-[10px] rounded-lg z-[999999999999999999999] h-[20%] bg-[#b8b5b5af] ">
//                   <div className="py-1 items-center justify-center gap-[20px] flex  w-[100%]  flex-col">
//             <p 
//             onClick={()=> Nav("/userlogin")}
//               className="flex w-[100%] items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               <FiLogIn className="mr-3" />
//               Login
//             </p>
            
//           </div>
//               </div> :null

//             }
//             </> :  <>
            
//             {
//               hello ?             <div onMouseLeave={()=> setHello(false)} data-aos="fade-down" className=" md:w-[10%] md:h-[40vh] absolute w-[40%] top-[60px] right-[10px] rounded-lg z-[999999999999999999999] h-[40vh] bg-[#c5c3c3a1] ">
//                   <div className="py-1 items-center justify-center gap-[20px] flex  w-[100%]  flex-col ">
//             <p
//             onClick={()=> Nav("/")}
//               className="flex items-center px-4 py-2 w-[100%] text-sm text-gray-700 hover:bg-gray-100"
//             >
//               <FiHome className="mr-3" />
//               Home
//             </p>
//             <p
//               href="/profile"
//               className="flex items-center px-4 w-[100%]  py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               <FiUser className="mr-3" />
//               Profile
//             </p>
//             <p
//               href="/settings"
//               className="flex items-center px-4 w-[100%]  py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               <FiSettings className="mr-3" />
//               Settings
//             </p>
          
//             <p
//                onClick={logout}
//               className="flex items-center w-[100%]  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
              
//               <FiLogOut className="mr-3" />
//               Logout
//             </p>
//           </div>
//               </div> :null

//             }
//             </>
//            }
           
           
//             <FaShoppingCart className="text-gray-700 relative hover:text-blue-600 text-xl cursor-pointer" onClick={()=> Nav("/cartPage")} />
        
              
//               <div className="  right-[40px] md:right-[22px] absolute flex items-center justify-center text-[15px] text-[white] top-[11px] h-[20px] w-[20px] rounded-[100%] bg-[red] "> {cartItems.length} </div> 
           
              
//             {/* Hamburger Menu */}
//             <FaBars
//               className="text-gray-700 md:hidden text-xl cursor-pointer"
//               onClick={toggleSidebar}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out z-50`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex justify-between items-center px-4 py-4 border-b">
//           <div className="text-2xl font-bold text-gray-800">Exclusive</div>
//           <FaTimes
//             className="text-gray-700 text-xl cursor-pointer"
//             onClick={toggleSidebar}
//           />
//         </div>

//         {/* Sidebar Links */}
//         <nav className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
//         <p  onClick={
//             () => Nav("/")
//           }  className="hover:text-blue-600">
//             Home
//           </p>
//           <p onClick={
//             () => Nav("/contact")
//           }  className="hover:text-blue-600">
//             Contact
//           </p>
//           <a onClick={
//             () => Nav("/aboutus")
//           }  className="hover:text-blue-600">
//             About
//           </a>
//           <a href="/signup" className="hover:text-blue-600">
          
//           </a>
//         </nav>
//       </div>

//       {/* Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </header>
//   );
// };

// export default Header;




// import React, { useState, useEffect } from "react";
// import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";
// import { FiHome, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
// import { clearUser } from "../../../components/Global/Slice";

// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [hello, setHello] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [expiredMessage, setExpiredMessage] = useState(""); // To store expiration message
//   const token = useSelector((state) => state.token);
//   const dispatch = useDispatch();
//   const Nav = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       // If there's no token, redirect to login page immediately
//       setExpiredMessage("Please log in to continue.");
//       dispatch(clearUser());

//       // setTimeout(() => {
//       //   Nav("/login");
//       // }, 3000); // Redirect after 3 seconds
//       return;
//     }

//     axios
//       .get("https://new-ecomer-ce-app-backend2.vercel.app/api/v1/viewcart", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         // If the token is valid, load cart items
//         setCartItems(response.data.data.data.items);
//       })
//       .catch((error) => {
//         if (error.response) {
//           // Check for the error message from the response
//           if (
//             error.response.data.message === "Action requires sign-in. Please log in to continue." ||
//             error.response.data.message === "Token has expired. Please log in again."
//           ) {
//             // If the token is expired or invalid, clear user and show the expired message
//             dispatch(clearUser());
//             setExpiredMessage(" Please log in again.");
//             // setTimeout(() => {
//             //   Nav("/login"); // Redirect to login after 3 seconds
//             // }, 3000); // Adjust the timeout as needed
//           }
//         } else {
//           console.error("Error", error.message);
//         }
//       });
//   }, [token, dispatch, Nav]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const logout = () => {
//     dispatch(clearUser());
//     Nav("/login");
//   };

//   return (
//     <header className="bg-white shadow top-0 w-[100%] h-[10%] sticky z-[999999999999999999999999999999999999]">
//       <div className="flex justify-between items-center px-4 md:px-8 py-4">
//         <div className="text-2xl font-bold text-gray-800">Exclusive</div>
//         <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
//           <p onClick={() => Nav("/")} className="hover:text-blue-600">
//             Home
//           </p>
//           <p onClick={() => Nav("/contact")} className="hover:text-blue-600">
//             Contact
//           </p>
//           <a onClick={() => Nav("/aboutus")} className="hover:text-blue-600">
//             About
//           </a>
//           <a href="/signup" className="hover:text-blue-600"></a>
//         </nav>

//         <div className="flex items-center space-x-4">
//           <FaUser
//             onMouseEnter={() => setHello(true)}
//             className="text-gray-700 relative hover:text-blue-600 text-xl cursor-pointer"
//           />
//           {!token ? (
//             <>
//               {hello ? (
//                 <div
//                   onMouseLeave={() => setHello(false)}
//                   data-aos="fade-down"
//                   className="md:w-[15%] md:h-[150%] absolute w-[30%] top-[60px] right-[10px] rounded-lg z-[999999999999999999999] h-[20%] bg-[#b8b5b5af]"
//                 >
//                   <div className="py-1 items-center justify-center gap-[20px] flex w-[100%] flex-col">
//                     <p
//                       onClick={() => Nav("/userlogin")}
//                       className="flex w-[100%] items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       {/* <FiLogIn className="mr-3" /> */}
//                       Login
//                     </p>
//                   </div>
//                 </div>
//               ) : null}
//             </>
//           ) : (
//             <>
//               {hello ? (
//                 <div
//                   onMouseLeave={() => setHello(false)}
//                   data-aos="fade-down"
//                   className="md:w-[10%] md:h-[40vh] absolute w-[40%] top-[60px] right-[10px] rounded-lg z-[999999999999999999999] h-[40vh] bg-[#c5c3c3a1]"
//                 >
//                   <div className="py-1 items-center justify-center gap-[20px] flex w-[100%] flex-col">
//                     <p
//                       onClick={() => Nav("/")}
//                       className="flex items-center px-4 py-2 w-[100%] text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       <FiHome className="mr-3" />
//                       Home
//                     </p>
//                     <p
//                       onClick={() => Nav("/getAllorder")}
//                       className="flex items-center px-4 py-2 w-[100%] text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       <FiHome className="mr-3" />
//                       Order
//                     </p>
//                     <p
//                       href="/profile"
//                       className="flex items-center px-4 w-[100%] py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       <FiUser className="mr-3" />
//                       Profile
//                     </p>
//                     <p
//                       href="/settings"
//                       className="flex items-center px-4 w-[100%] py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       <FiSettings className="mr-3" />
//                       Settings
//                     </p>
//                     <p
//                       onClick={logout}
//                       className="flex items-center w-[100%] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       <FiLogOut className="mr-3" />
//                       Logout
//                     </p>
//                   </div>
//                 </div>
//               ) : null}
//             </>
//           )}

//           <FaShoppingCart
//             className="text-gray-700 relative hover:text-blue-600 text-xl cursor-pointer"
//             onClick={() => Nav("/cartPage")}
//           />
//           <div className="right-[40px] md:right-[22px] absolute flex items-center justify-center text-[15px] text-[white] top-[11px] h-[20px] w-[20px] rounded-[100%] bg-[red]">
//             {" "}
//             {cartItems.length}{" "}
//           </div>

//           <FaBars
//             className="text-gray-700 md:hidden text-xl cursor-pointer"
//             onClick={toggleSidebar}
//           />
//         </div>
//       </div>

//       {/* Show expired message if token is expired */}
//       {expiredMessage && (
//         <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center p-2 z-50">
//           <p                       onClick={() => Nav("/userlogin")}
//  >{expiredMessage}</p>
//         </div>
//       )}

//       <div
//         className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out z-50`}
//       >
//         <div className="flex justify-between items-center px-4 py-4 border-b">
//           <div className="text-2xl font-bold text-gray-800">Exclusive</div>
//           <FaTimes
//             className="text-gray-700 text-xl cursor-pointer"
//             onClick={toggleSidebar}
//           />
//         </div>

//         <nav className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
//           <p onClick={() => Nav("/")} className="hover:text-blue-600">
//             Home
//           </p>
//           <p onClick={() => Nav("/contact")} className="hover:text-blue-600">
//             Contact
//           </p>
//           <a onClick={() => Nav("/aboutus")} className="hover:text-blue-600">
//             About
//           </a>
//           <a href="/signup" className="hover:text-blue-600"></a>
//         </nav>
//       </div>

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { FiHome, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUser } from "../../../components/Global/Slice";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [expiredMessage, setExpiredMessage] = useState("");
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const Nav = useNavigate();

  // Fetch cart & token validation
  useEffect(() => {
    if (!token) {
      setExpiredMessage("Please log in to continue.");
      dispatch(clearUser());
      return;
    }

    axios
      .get("https://new-ecomer-ce-app-backend2.vercel.app/api/v1/viewcart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCartItems(response.data?.data?.data?.items || []);
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.data.message.includes("sign-in") ||
            error.response.data.message.includes("expired"))
        ) {
          dispatch(clearUser());
          setExpiredMessage("Session expired. Please log in again.");
        }
      });
  }, [token, dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const logout = () => {
    dispatch(clearUser());
    Nav("/userlogin");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* 🔸 Promo Bar */}
      <div className="bg-black text-white text-sm flex justify-between items-center px-6 md:px-12 py-2">
        <p className="text-center text-gray-200">
          Summer Sale For All Swim Suits And Free Express Delivery -{" "}
          <span className="font-semibold text-white">OFF 50%</span>{" "}
          <button className="underline hover:text-gray-300 ml-1">Shop Now</button>
        </p>
        <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-gray-300 transition">
          <span>English</span>
          <FaChevronDown className="text-xs mt-1" />
        </div>
      </div>

      {/* 🔸 Main Header */}
      <div className="flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-200">
        {/* Logo */}
        <div
          onClick={() => Nav("/")}
          className="text-2xl font-bold text-gray-900 cursor-pointer select-none"
        >
          Exclusive
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-10 text-gray-700 font-medium">
          <button onClick={() => Nav("/")} className="hover:text-red-600 transition">
            Home
          </button>
          <button
            onClick={() => Nav("/contact")}
            className="hover:text-red-600 transition"
          >
            Contact
          </button>
          <button
            onClick={() => Nav("/aboutus")}
            className="hover:text-red-600 transition"
          >
            About
          </button>
        
        </nav>

        {/* 🔸 Right Section */}
        <div className="flex items-center gap-5">
          {/* Professional Search Input */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-red-400 transition w-64">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
            <FaSearch className="text-gray-600 cursor-pointer hover:text-red-600" />
          </div>

          {/* Wishlist */}
          <FaHeart className="text-gray-700 text-lg cursor-pointer hover:text-red-600 transition" />

          {/* Cart */}
          <div className="relative">
            <FaShoppingCart
              onClick={() => Nav("/cartPage")}
              className="text-gray-700 text-lg cursor-pointer hover:text-red-600 transition"
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* User */}
          <div className="relative">
            <FaUser
              className="text-gray-700 text-lg cursor-pointer hover:text-red-600 transition"
              onMouseEnter={() => setShowUserMenu(true)}
            />
            {showUserMenu && (
              <div
                onMouseLeave={() => setShowUserMenu(false)}
                className="absolute right-0 top-9 bg-white border border-gray-200 rounded-lg shadow-xl w-44 py-2 z-50"
              >
                {!token ? (
                  <p
                    onClick={() => Nav("/userlogin")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Login
                  </p>
                ) : (
                  <>
                    <p
                      onClick={() => Nav("/")}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <FiHome className="mr-2" /> Home
                    </p>
                    <p
                      onClick={() => Nav("/getAllorder")}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <FiUser className="mr-2" /> Orders
                    </p>
                    <p
                      onClick={() => Nav("/profile")}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <FiSettings className="mr-2" /> Profile
                    </p>
                    <p
                      onClick={logout}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <FaBars
            className="text-gray-700 text-2xl md:hidden cursor-pointer hover:text-red-600 transition"
            onClick={toggleSidebar}
          />
        </div>
      </div>

      {/* 🔸 Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 w-64`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <div className="text-2xl font-bold text-gray-800">Exclusive</div>
          <FaTimes
            className="text-gray-700 text-xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        <nav className="flex flex-col space-y-5 p-5 text-gray-700 font-medium">
          <button onClick={() => Nav("/")} className="hover:text-red-600 transition">
            Home
          </button>
          <button
            onClick={() => Nav("/contact")}
            className="hover:text-red-600 transition"
          >
            Contact
          </button>
          <button
            onClick={() => Nav("/aboutus")}
            className="hover:text-red-600 transition"
          >
            About
          </button>
          <button
            onClick={() => Nav("/user-signup")}
            className="hover:text-red-600 transition"
          >
            Sign Up
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* 🔸 Expired Message */}
      {expiredMessage && (
        <div
          className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm font-medium cursor-pointer"
          onClick={() => Nav("/userlogin")}
        >
          {expiredMessage}
        </div>
      )}
    </header>
  );
};

export default Header;
