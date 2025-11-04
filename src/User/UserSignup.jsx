// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { BeatLoader } from 'react-spinners';

// const UserSignup = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [address, setAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [profileImage, setProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fullName || !email || !password  || !address || !phoneNumber ) {
//       setError('Please fill in all the fields and upload a profile image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('fullName', fullName);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('address', address);
//     formData.append('phoneNumber', phoneNumber);
//     formData.append('profileImage', profileImage);

//     try {
//       const response = await axios.post('https://new-ecomer-ce-app-backend2.vercel.app/api/v1/user-signUp', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setSuccessMessage('Signup successful. Please check your email for verification.');
//       setError('');
//       console.log(response.data.token)
//       navigate(`/userverifyone/${response.data.token}`);
//     } catch (err) {
//       setError(err.response ? err.response.data.message : 'Something went wrong. Please try again.');
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
//       <div className="bg-white h-[90%] p-8 rounded-lg shadow-md w-[90%] max-w-lg">
//         <div className="flex justify-center mb-6">
//           <label htmlFor="profileImage" className="cursor-pointer">
//             <div
//               className={`w-24 h-24 ${imagePreview ? 'border-2 border-indigo-600' : 'border-2 border-gray-300'} rounded-full overflow-hidden`}
//             >
//               {imagePreview ? (
//                 <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full bg-gray-300 text-center flex items-center justify-center text-gray-500">
//                   Click to Upload
//                 </div>
//               )}
//             </div>
//             <input
//               type="file"
//               id="profileImage"
//               onChange={handleImageChange}
//               accept="image/*"
//               className="hidden"
//             />
//           </label>
//         </div>

//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

//         <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">User Sign Up</h2>

//         <div  className="space-y-4">
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               id="fullName"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="John Doe"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="example@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="********"
//               required
//             />
//           </div>

         

//           <div>
//             <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Address   </label>
//             <input
//               type="text"
//               id="Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Your Address "
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="(123) 456-7890"
//               required
//             />
//           </div>

//           <button
//           onClick={handleSubmit}
//           disabled={loading || !email}
//           className={`w-full py-3 px-6 rounded text-white font-medium ${
//             loading
//               ? 'bg-gray-500'
//               : 'bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-300'
//           }`}
//         >
//           {loading ? <BeatLoader color="#ffffff" size={12} /> : 'Sign Up'}
//         </button>
//         </div>

      
//         <div className="mt-2 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to="/Userlogin" className="text-indigo-600 hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default UserSignup;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { BeatLoader } from "react-spinners";
// import { jwtDecode } from "jwt-decode";

// const BASE_URL = "https://andrewecomerceback.onrender.com";

// const UserSignup = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   // 🟢 STEP 1: Detect Google data from URL
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.hash.split("?")[1]);
//     const googleToken = params.get("googleData");
//     if (googleToken) {
//       try {
//         const decoded = jwtDecode(googleToken);
//         setFullName(decoded.fullName || "");
//         setEmail(decoded.email || "");
//         setProfileImage(decoded.profileImage || null);
//         setImagePreview(decoded.profileImage || null);
//       } catch (err) {
//         console.error("Invalid Google token", err);
//       }
//     }
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fullName || !email || !password || !address || !phoneNumber) {
//       setError("Please fill all fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("fullName", fullName);
//     formData.append("email", email);
//     formData.append("password", password);
//     formData.append("address", address);
//     formData.append("phoneNumber", phoneNumber);
//     if (profileImage) formData.append("profileImage", profileImage);

//     try {
//       const res = await axios.post(`${BASE_URL}/api/v1/user-signUp`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSuccessMessage("Signup successful!");
//       navigate(`/userverifyone/${res.data.token}`);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     }
//   };

//   const handleGoogleSignup = () => {
//     window.location.href = `${BASE_URL}/api/v1/auth/google`;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
//       <div className="bg-white h-[90%] p-8 rounded-lg shadow-md w-[90%] max-w-lg">
//         <div className="flex justify-center mb-6">
//           <label htmlFor="profileImage" className="cursor-pointer">
//             <div
//               className={`w-24 h-24 ${
//                 imagePreview ? "border-2 border-indigo-600" : "border-2 border-gray-300"
//               } rounded-full overflow-hidden`}
//             >
//               {imagePreview ? (
//                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full bg-gray-300 text-center flex items-center justify-center text-gray-500">
//                   Click to Upload
//                 </div>
//               )}
//             </div>
//             <input type="file" id="profileImage" onChange={handleImageChange} className="hidden" />
//           </label>
//         </div>

//         <button
//           onClick={handleGoogleSignup}
//           className="w-full mb-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Continue with Google
//         </button>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="block w-full px-3 py-2 border rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             disabled={!!email} // prevent changing Google email
//             className="block w-full px-3 py-2 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="block w-full px-3 py-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="block w-full px-3 py-2 border rounded"
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             className="block w-full px-3 py-2 border rounded"
//           />

//           <button
//             type="submit"
//             className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             {loading ? <BeatLoader color="#fff" size={10} /> : "Sign Up"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserSignup;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {jwtDecode} from "jwt-decode"; // ✅ make sure this is installed
// npm install jwt-decode

const BASE_URL = "https://andrewecomerceback.onrender.com";

const UserSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Email/Password signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !address || !phoneNumber) {
      setError("Please fill in all the fields.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user-signUp`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccessMessage(
        "Signup successful. Please check your email for verification."
      );
      setError("");
      setTimeout(() => navigate(`/userverifyone/${response.data.token}`), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Signup
  const handleGoogleSignup = () => {
    window.location.href = `${BASE_URL}/api/v1/auth/google`;
  };

  return (
 <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
  {/* Left Image Section */}
  <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-50">
    <img
      src="https://i.pinimg.com/736x/2e/00/7c/2e007c098124a64c2fbf93ea81565b7f.jpg"
      alt="Signup Visual"
      className="w-full h-full object-cover object-center rounded-none shadow-xl"
    />
  </div>

  {/* Right Form Section */}
  <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-6 sm:px-10 md:px-16 bg-white">
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center md:text-left">
        Create an account
      </h2>
      <p className="text-gray-500 mb-6 text-center md:text-left">
        Enter your details below
      </p>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm mb-2">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded text-white font-medium shadow-md ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300"
          }`}
        >
          {loading ? <BeatLoader color="#fff" size={10} /> : "Create Account"}
        </button>
      </form>

      {/* Google Signup */}
      <button
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center border border-gray-300 rounded-md mt-4 py-3 hover:bg-gray-50 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        <span className="text-gray-700 font-medium">Sign up with Google</span>
      </button>

      <p className="text-sm text-gray-600 text-center mt-6">
        Already have an account?{" "}
        <Link to="/userlogin" className="text-red-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default UserSignup;
