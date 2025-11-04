import React from 'react';
import { useState } from 'react';
import { FaHome, FaUserAlt, FaCog, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { clearMarchant } from '../../components/Global/Slice';
import { useDispatch } from 'react-redux';
const Sidebar = () => {
  const Nav = useNavigate()
  const dispatch = useDispatch()
  const handlelogout = () =>{
    dispatch(clearMarchant())
  }
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="flex min-h-screen h-[100%] w-[100%]  bg-gray-100">
      {/* Sidebar */}
      <div
        className="bg-blue-600 text-white  transform   w-[100%]  -translate-x-full
     md:translate-x-0 transition-transform duration-300 fixed md:relative z-50"
      >
        <div className="p-4 flex items-center justify-between md:justify-center border-b border-blue-500">
          <h1 className="text-lg font-bold">My Sidebar</h1>
          <button
            className="md:hidden text-white focus:outline-none"
            // onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-4 py-3 hover:bg-blue-700" onClick={()=> Nav('./marchatHome')}>
                <FaHome    size={18} />
                <span>Home</span>
              
            </li>
            <li className="px-4 py-3 hover:bg-blue-700" onClick={()=> Nav('./marchantCategory')}>
                <FaUserAlt size={18} />
                <span>Category</span>
            </li>
            <li className="px-4 py-3 hover:bg-blue-700" onClick={()=> Nav('./product')}>
                <FaUserAlt size={18} />
                <span>Products</span>
            </li>
            <li className="px-4 py-3 hover:bg-blue-700" >
                <FaUserAlt size={18} />
                <span>Profile</span>
            </li>
            <li onClick={handlelogout} className="px-4 py-3 hover:bg-blue-700">
              <p className="flex items-center gap-3">
                <FaCog size={18} />
                <span>Settings</span>
              </p>
            </li>
          </ul>
        </nav>
      </div>

    
    </div>
  );
};

export default Sidebar;
