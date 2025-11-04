// import React, { useState } from "react";

// import { IoMdSearch } from "react-icons/io";
// import { FaCartShopping } from "react-icons/fa6";
// import { FaCaretDown } from "react-icons/fa";
// import { IoCloseOutline } from "react-icons/io5";

// import { FiShoppingBag } from "react-icons/fi";
// import { MdMarkEmailUnread } from "react-icons/md";
// import { IoPersonCircleSharp } from "react-icons/io5";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// const Signup = ({setLogin, setPopup}) => {
//   // const [login, setLogin] = useState(false)
//   const [token, setToken]=useState(true)
//   const [name, setName]=useState("")
//   const [email, setEmail]=useState("")
//   const [password, setPassword]=useState("")
//   const [email2, setEmail2]=useState("")
//   const [password2, setPassword2]=useState("")
//   const dispatch = useDispatch()
//   const HandleSubmit = () =>{
//     if (!email || !password || !name){
//       toast.error("Please Fill All Details")
//     } else {
//      const url = "http://localhost:1900/api/auth/signup"
//      const datas = {name, email, password}
//      axios.post(url, datas)
//      .then((res)=>{
//        console.log(res);
//        toast.success(res.data.message)
//        // setLogin(true)
//        setTimeout(()=>{
//          setLogin(false)
//        }, 2000)
//      })
//      .catch((error)=>{
//        console.log(error);
//      })
//     }
//   }

//   return (
//     <>
//         <div className="flex items-center justify-between w-[100%] h-[10%] ">
//           <div>
//             <h1>Sign Up Now</h1>
//           </div>
//           <div>
//             <IoCloseOutline
//               className="text-2xl cursor-pointer "
//               onClick={() => setPopup(false)}
//             />
//           </div>
//         </div>
//         {/* form section */}
//         <div className=" w-[100%] h-[80%]  flex gap-[20px] items-center
//           justify-center flex-col ">
//           <input
//             type="text"
//             onChange={(e)=> setName(e.target.value)}
//             placeholder="User name"
//             className=" w-[80%] pl-[10px] rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 h-[15%] "
//           />
//           <input
//             type="email"
//             onChange={(e)=> setEmail(e.target.value)}
//             placeholder="Email"
//             className=" w-[80%] pl-[10px]  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 h-[15%]"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e)=> setPassword(e.target.value)}
//             className=" w-[80%] pl-[10px]  rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 h-[15%]"
//           />
//           <div className="flex justify-center">
//             <button onClick={HandleSubmit} className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full ">
//             Sign Up
//             </button>
//             <Toaster/>

//           </div>
//         </div>
//         <div className=" w-[100%] h-[10%] flex items-center justify-center  ">
//           <h3 className="gap-[10px] ">Already have an Account?  <span onClick={() => setLogin(false)} className="text-[#6666d3] ">Login</span></h3>
//         </div>
//     </>
//   );
// }

// export default Signup;

// import React, { useState } from "react";
// import axios from "axios";

// const SignUp = () => {
//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     address: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // Handle input change
//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");
//     setSuccess(false);

//     try {
//       const response = await axios.post("/api/users", userData); // Adjust the endpoint as needed
//       console.log("User created:", response.data);
//       setSuccess(true);
//       setUserData({
//         fullName: "",
//         email: "",
//         password: "",
//         phoneNumber: "",
//         address: "",
//       });
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred while creating the account.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 dark:text-white px-4">
//       <div
//         className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 flex flex-col justify-center"
//         style={{
//           width: "50%", // Adjust to 60% if needed
//           // maxWidth: "800px", // Max width for larger screens
//           height: "90%", // Adjust to 90% if needed
//           // maxHeight: "700px", // Max height for larger screens
//         }}
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

//         {/* Input Fields */}
//         <div className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             value={userData.fullName}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Full Name"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Email Address"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             value={userData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Password"
//             required
//           />
//           <input
//             type="text"
//             name="phoneNumber"
//             value={userData.phoneNumber}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Phone Number"
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             value={userData.address}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Address"
//           />
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="text-red-500 text-sm mt-4">
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="text-green-500 text-sm mt-4">
//             <span>Account created successfully!</span>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-lg mt-6 hover:scale-105 transition-transform duration-200"
//           disabled={loading}
//         >
//           {loading ? "Creating Account..." : "Sign Up"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  // State variables for the form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle the change in profile image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData to send the image and other data
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    if (profileImage) formData.append('profileImage', profileImage);

    // Make API request with axios
    axios
      .post('https://new-ecomer-ce-app-backend2.vercel.app/api/v1/user-signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Success:', response.data);
        // Handle successful response (e.g., redirect to login or show success message)
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error (e.g., show error message)
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Profile Image Preview */}
        <div className="flex justify-center mb-6">
          <label htmlFor="profileImage" className="cursor-pointer">
            <div
              className={`w-24 h-24 ${imagePreview ? 'border-2 border-indigo-600' : 'border-2 border-gray-300'} rounded-full overflow-hidden`}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
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
          </label>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="example@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="123 Main St"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="(123) 456-7890"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
