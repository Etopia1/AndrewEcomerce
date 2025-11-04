import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed left-0 top-0 bg-blue-600 text-white w-64 h-full transform transition-transform duration-300 ease-in-out z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="text-2xl font-bold flex items-center space-x-2">
            <GiClothes size={32} />
            <span>ShopEase</span>
          </div>
          <button
            className="text-white text-2xl"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col space-y-6 px-4">
          <a href="/" className="text-lg hover:text-gray-200">Home <FaHome className="inline ml-2" /></a>
          <a href="/shop" className="text-lg hover:text-gray-200">Shop <FaShoppingCart className="inline ml-2" /></a>
          <a href="/about" className="text-lg hover:text-gray-200">About</a>
          <a href="/contact" className="text-lg hover:text-gray-200">Contact</a>
          <a href="/faq" className="text-lg hover:text-gray-200">FAQ</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full fixed z-[99999] ">
        <header className="bg-blue-600 text-white cursor-pointer shadow-md pl-[20px] pr-[20px] flex justify-between items-center w-full h-[15vh]">
          <button
            className="md:hidden block text-white text-2xl"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <div className="text-xl xl:flex hidden md:hidden  sm:hidden  sm:text-[20px] text-[30px] font-bold  items-center space-x-2">
            <GiClothes size={32} />
            <span>ShopEase</span>
            
          </div>
          <div className=" w-[80%]  sm:text-[20px] text-[30px]  hidden   sm:hidden md:flex xl:flex h-[100%]  items-center justify-center">
            <nav className='w-full h-[100%] flex items-center justify-center '>
                <ul className='w-[50%] h-[100%] flex items-center justify-between'>
                <li>Home</li>
                <li>About</li>
                <li>Service</li>
                <li>Contact</li>
                </ul>
            </nav>
            
            </div>
          <div className=" flex items-center gap-[30px] pr-[30px]  justify-center ">
            <FaShoppingCart size={30} />
            <FaUserCircle size={30} />
          </div>
        </header>

        {/* Main Content Goes Here */}
        <div className="p-4">
          {/* Your page content */}
          {/* <h1 className="text-2xl font-bold">Welcome to ShopEase!</h1> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
