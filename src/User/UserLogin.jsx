// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   Addtoken,
//   AddUserId,
//   AllData,
// } from "../components/Global/Slice";

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // 🔹 Email + Password Login
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill in both email and password.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:2030/api/v1/user-login",
//         { email, password }
//       );

//       console.log("Login successful:", response.data);
//       setSuccessMessage("Login successful. Redirecting...");
//       setError("");
//       dispatch(AllData(response.data.data));
//       dispatch(AddUserId(response.data.data._id));
//       dispatch(Addtoken(response.data.token));

//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       console.error("Error during login:", err);
//       setError(
//         err.response
//           ? err.response.data.message
//           : "Something went wrong. Please try again."
//       );
//       setSuccessMessage("");
//     }
//   };

//   // 🔹 Google Login (Redirect to backend route)
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:2030/api/v1/auth/google";
//   };

//   return (
//     <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
//       {/* Left Image Section */}
//       <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-50">
//         <img
//           src="src/assets/shopping1.jpg"
//           alt="Login Visual"
//           className="w-full h-full object-cover object-center rounded-none shadow-xl transition-transform duration-700 hover:scale-105"
//         />
//       </div>

//       {/* Right Form Section */}
//       <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-6 sm:px-10 md:px-16 bg-white">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center md:text-left">
//             Welcome Back
//           </h2>
//           <p className="text-gray-500 mb-6 text-center md:text-left">
//             Please sign in to continue
//           </p>

//           {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//           {successMessage && (
//             <p className="text-green-500 text-sm mb-2">{successMessage}</p>
//           )}

//           {/* Email/Password Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full py-3 px-6 rounded text-white font-medium shadow-md bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300 transition-all duration-300"
//             >
//               Login
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center justify-center my-4">
//             <span className="h-px bg-gray-300 w-1/4"></span>
//             <span className="px-2 text-gray-400 text-sm">or</span>
//             <span className="h-px bg-gray-300 w-1/4"></span>
//           </div>

//           {/* Google Login */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google Logo"
//               className="w-5 h-5 mr-2"
//             />
//             <span className="text-gray-700 font-medium">
//               Sign in with Google
//             </span>
//           </button>

//           {/* Links */}
//           <div className="mt-6 text-center">
//             <Link
//               to="/user-forgetpass"
//               className="text-sm text-red-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <p className="text-sm text-gray-600 text-center mt-4">
//             Don’t have an account?{" "}
//             <Link to="/user-signup" className="text-red-600 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Addtoken, AddUserId, AllData } from "../components/Global/Slice";
// import { BeatLoader } from "react-spinners";

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();

//   // 🔹 Handle redirect from Google login
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const token = params.get("token");
//     const userId = params.get("userId");

//     if (token && userId) {
//       // Optional: fetch user info if backend doesn't send it
//       axios
//         .get(`http://localhost:2030/api/v1/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => {
//           dispatch(AllData(res.data));
//           dispatch(AddUserId(userId));
//           dispatch(Addtoken(token));
//           navigate("/"); // redirect after successful login
//         })
//         .catch((err) => console.error("Error fetching user info", err));
//     }
//   }, [location.search, dispatch, navigate]);

//   // 🔹 Email + Password login
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill in both email and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:2030/api/v1/user-login",
//         { email, password }
//       );

//       dispatch(AllData(response.data.data));
//       dispatch(AddUserId(response.data.data._id));
//       dispatch(Addtoken(response.data.token));

//       setSuccessMessage("Login successful. Redirecting...");
//       setError("");
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       setError(
//         err.response
//           ? err.response.data.message
//           : "Something went wrong. Please try again."
//       );
//       setSuccessMessage("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Google login (redirect)
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:2030/api/v1/auth/google";
//   };

//   return (
//     <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
//       {/* Left Image Section */}
//       <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-50">
//         <img
//           src="src/assets/shopping1.jpg"
//           alt="Login Visual"
//           className="w-full h-full object-cover object-center rounded-none shadow-xl transition-transform duration-700 hover:scale-105"
//         />
//       </div>

//       {/* Right Form Section */}
//       <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-6 sm:px-10 md:px-16 bg-white">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center md:text-left">
//             Welcome Back
//           </h2>
//           <p className="text-gray-500 mb-6 text-center md:text-left">
//             Please sign in to continue
//           </p>

//           {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//           {successMessage && (
//             <p className="text-green-500 text-sm mb-2">{successMessage}</p>
//           )}

//           {/* Email/Password Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-3 px-6 rounded text-white font-medium shadow-md bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300 transition-all duration-300"
//             >
//               {loading ? <BeatLoader color="#fff" size={10} /> : "Login"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center justify-center my-4">
//             <span className="h-px bg-gray-300 w-1/4"></span>
//             <span className="px-2 text-gray-400 text-sm">or</span>
//             <span className="h-px bg-gray-300 w-1/4"></span>
//           </div>

//           {/* Google Login */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google Logo"
//               className="w-5 h-5 mr-2"
//             />
//             <span className="text-gray-700 font-medium">
//               Sign in with Google
//             </span>
//           </button>

//           {/* Links */}
//           <div className="mt-6 text-center">
//             <Link
//               to="/user-forgetpass"
//               className="text-sm text-red-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <p className="text-sm text-gray-600 text-center mt-4">
//             Don’t have an account?{" "}
//             <Link to="/user-signup" className="text-red-600 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Addtoken, AddUserId, AllData } from "../components/Global/Slice";
// import { BeatLoader } from "react-spinners";

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();

//   // 🔹 Handle redirect from Google login
//      const hash = window.location.hash; // e.g. "#/userlogin?token=...&userId=..."
  
// //   // ✅ Split to get params after ?
//   const queryString = hash.split("?")[1]; // "token=...&userId=..."
//   const params = new URLSearchParams(queryString);

//   const token = params.get("token");
//   const userId = params.get("userId");
//   console.log("✅ Token from Google:", token);
//   console.log("✅ User ID from Google:", userId);
//   useEffect(() => {
//     const fetchUser = async () => {
    

  
//       try {
//         const res = await axios.get(
//           `http://localhost:2030/api/v1/user-get/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log(res.data.data);
//         dispatch(AllData(res.data));
//         dispatch(AddUserId(userId));
//         dispatch(Addtoken(token));
//       } catch (error) {
//         console.error("Error fetching merchant:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId, token]);
// //   useEffect(() => {
// //   // ✅ Get everything after the #
// //   const hash = window.location.hash; // e.g. "#/userlogin?token=...&userId=..."
  
// // //   // ✅ Split to get params after ?
// //   const queryString = hash.split("?")[1]; // "token=...&userId=..."
// //   const params = new URLSearchParams(queryString);

// //   const token = params.get("token");
// //   const userId = params.get("userId");

// //   console.log("✅ Token from Google:", token);
// //   console.log("✅ User ID from Google:", userId);

// //   if (token && userId) {
// //     axios
// //       .get(`http://localhost:2030/api/v1/user/676b19eb8d56c35fba7ca64e`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
//         // dispatch(AllData(res.data));
//         // dispatch(AddUserId(userId));
//         // dispatch(Addtoken(token));

// //         console.log("🎉 Google Login Successful");
// //         console.log("🧍 User Data:", res.data);

// //         // Optionally store in localStorage
// //         localStorage.setItem("userToken", token);
// //         localStorage.setItem("userId", userId);
// //         localStorage.setItem("userData", JSON.stringify(res.data));
// //       })
// //       .catch((err) => console.error("❌ Error fetching user info", err));
// //   }
// // }, [dispatch]);

//   // useEffect(() => {
//   //   const params = new URLSearchParams(location.search);
//   //   const token = params.get("token");
//   //   const userId = params.get("userId");

//   //   if (token && userId) {
//   //     axios
//   //       .get(`http://localhost:2030/api/v1/user/${userId}`, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       })
//   //       .then((res) => {
//   //         dispatch(AllData(res.data));
//   //         dispatch(AddUserId(userId));
//   //         dispatch(Addtoken(token));

//   //         // ✅ Log Google login info
//   //         console.log("Google Login Successful");
//   //         console.log("Token:", token);
//   //         console.log("User ID:", userId);
//   //         console.log("User Data:", res.data);

//   //         // navigate("/"); // redirect after successful login
//   //       })
//   //       .catch((err) => console.error("Error fetching user info", err));
//   //   }
//   // }, [location.search, dispatch, navigate]);

//   // 🔹 Email + Password login
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill in both email and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:2030/api/v1/user-login",
//         { email, password }
//       );

//       dispatch(AllData(response.data.data));
//       dispatch(AddUserId(response.data.data._id));
//       dispatch(Addtoken(response.data.token));

//       // ✅ Log Email/Password login info
//       console.log("Email/Password Login Successful");
//       console.log("Token:", response.data.token);
//       console.log("User ID:", response.data.data._id);
//       console.log("User Data:", response.data.data);

//       setSuccessMessage("Login successful. Redirecting...");
//       setError("");
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       setError(
//         err.response
//           ? err.response.data.message
//           : "Something went wrong. Please try again."
//       );
//       setSuccessMessage("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Google login (redirect)
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:2030/api/v1/auth/google";
//   };

//   return (
//     <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
//       {/* Left Image Section */}
//       <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-50">
//         <img
//           src="src/assets/shopping1.jpg"
//           alt="Login Visual"
//           className="w-full h-full object-cover object-center rounded-none shadow-xl transition-transform duration-700 hover:scale-105"
//         />
//       </div>

//       {/* Right Form Section */}
//       <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-6 sm:px-10 md:px-16 bg-white">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center md:text-left">
//             Welcome Back
//           </h2>
//           <p className="text-gray-500 mb-6 text-center md:text-left">
//             Please sign in to continue
//           </p>

//           {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//           {successMessage && (
//             <p className="text-green-500 text-sm mb-2">{successMessage}</p>
//           )}

//           {/* Email/Password Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-3 px-6 rounded text-white font-medium shadow-md bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300 transition-all duration-300"
//             >
//               {loading ? <BeatLoader color="#fff" size={10} /> : "Login"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center justify-center my-4">
//             <span className="h-px bg-gray-300 w-1/4"></span>
//             <span className="px-2 text-gray-400 text-sm">or</span>
//             <span className="h-px bg-gray-300 w-1/4"></span>
//           </div>

//           {/* Google Login */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google Logo"
//               className="w-5 h-5 mr-2"
//             />
//             <span className="text-gray-700 font-medium">
//               Sign in with Google
//             </span>
//           </button>

//           {/* Links */}
//           <div className="mt-6 text-center">
//             <Link
//               to="/user-forgetpass"
//               className="text-sm text-red-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <p className="text-sm text-gray-600 text-center mt-4">
//             Don’t have an account?{" "}
//             <Link to="/user-signup" className="text-red-600 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Addtoken, AddUserId, AllData } from "../components/Global/Slice";
import { BeatLoader } from "react-spinners";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Handle redirect from Google OAuth
  useEffect(() => {
    const hash = window.location.hash; // e.g. "#/userlogin?token=...&userId=..."
    const queryString = hash.split("?")[1];
    if (!queryString) return;

    const params = new URLSearchParams(queryString);
    const token = params.get("token");
    const userId = params.get("userId");

    console.log("✅ Token from Google:", token);
    console.log("✅ User ID from Google:", userId);

    // ✅ If token and userId are present, fetch user info and save to Redux
    if (token && userId) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `http://localhost:2030/api/v1/user-get/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // ✅ Dispatch data to Redux
          dispatch(AllData(res.data.data));
          dispatch(AddUserId(userId));
          dispatch(Addtoken(token));

          // ✅ Store in localStorage for persistence
          localStorage.setItem("userToken", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userData", JSON.stringify(res.data.data));

          console.log("🎉 Google login successful!");
          console.log("🧍 User:", res.data.data);

          // ✅ Navigate to home after short delay
          setTimeout(() => navigate("/"), 800);
        } catch (error) {
          console.error("❌ Error fetching Google user:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [dispatch, navigate]);

  // 🔹 Email/Password login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:2030/api/v1/user-login",
        { email, password }
      );

      dispatch(AllData(response.data.data));
      dispatch(AddUserId(response.data.data._id));
      dispatch(Addtoken(response.data.token));

      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userId", response.data.data._id);
      localStorage.setItem("userData", JSON.stringify(response.data.data));

      setSuccessMessage("Login successful. Redirecting...");
      setError("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "Something went wrong. Please try again."
      );
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google login redirect
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:2030/api/v1/auth/google";
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-50">
        <img
          src="src/assets/shopping1.jpg"
          alt="Login Visual"
          className="w-full h-full object-cover object-center rounded-none shadow-xl transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-6 sm:px-10 md:px-16 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center md:text-left">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Please sign in to continue
          </p>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mb-2">{successMessage}</p>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-6 rounded text-white font-medium shadow-md bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300 transition-all duration-300"
            >
              {loading ? <BeatLoader color="#fff" size={10} /> : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="h-px bg-gray-300 w-1/4"></span>
            <span className="px-2 text-gray-400 text-sm">or</span>
            <span className="h-px bg-gray-300 w-1/4"></span>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>

          {/* Links */}
          <div className="mt-6 text-center">
            <Link
              to="/user-forgetpass"
              className="text-sm text-red-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/user-signup" className="text-red-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

