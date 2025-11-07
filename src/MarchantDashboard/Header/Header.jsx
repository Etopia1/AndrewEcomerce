

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBars, FaShoppingCart, FaUserCircle, FaSearch, FaHome } from "react-icons/fa";
import { MdCategory, MdFavorite, MdSupportAgent, MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
      const token = useSelector((state) => state.token);
      
  useEffect(() => {
    setLoading(true);

    axios
      .get("https://andrewecomerceback.onrender.com/api/v1/viewcart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartItems(response.data.data.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart item count
 const Nav = useNavigate()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex sticky w-[99%] top-0 z-1 bottom-0 h-[10%]">
      {/* Sidebar */}
      <aside onClick={()=> setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed xl:hidden  md:hidden  h-full w-64 bg-[red] text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        <div className="p-4 hid border-b  border-gray-700">
          <h1 className="text-xl font-bold">ShopEasy</h1>
        </div>
        <nav className="mt-4 flex flex-col md:w-[100%] bg-[red] h-[100%] items-start justify-center ">
          <div onClick={()=> Nav("/home2")} className="flex items-center px-4 py-2 hover:bg-gray-700">
            <FaHome  className="mr-3" /> Home
          </div>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <MdCategory className="mr-3" /> Categories
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <MdFavorite className="mr-3" /> Wishlist
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
            <MdSupportAgent className="mr-3" /> Support
          </a>
          <button className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-700">
            <MdLogout className="mr-3" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-10 flex items-center justify-between p-4">
          <div className="flex items-center">
            <button
              className="lg:hidden mr-4 text-gray-700 focus:outline-none"
              onClick={toggleSidebar}
            >
              <FaBars className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">ShopEasy</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center border rounded-md px-2 py-1">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 focus:outline-none"
              />
            </div>
            <button className="relative">
              <FaShoppingCart onClick={()=> Nav("/cartpage")} className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span> 
            </button>
            <FaUserCircle className="w-6 h-6 text-gray-700" />
          </div>
        </header>

        {/* Content */}
       
      </div>
    </div>
  );
};

export default Header;
