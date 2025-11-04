import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const BASE_URL = "https://andrewecomerceback.onrender.com";

const UserForgetPass = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user-forgotPassword`, { email });
      setSuccessMessage("OTP sent! Please check your email.");
      setTimeout(() => navigate(`/user-VerifyOtppass/${response.data.token}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-50">
        <img
          src="src/assets/download (27).jpg"
          alt="Forgot Password Visual"
          className="w-full h-full object-cover object-center shadow-xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-6 sm:px-10 md:px-16">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center md:text-left">
            Forgot Password
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Enter your email and we’ll send you an OTP to reset your password.
          </p>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200 mb-4"
          />

          <button
            onClick={handleSubmit}
            disabled={loading || !email}
            className={`w-full py-3 px-6 rounded text-white font-medium shadow-md ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300"
            }`}
          >
            {loading ? <BeatLoader color="#fff" size={10} /> : "Send OTP"}
          </button>

          <p className="text-sm text-gray-600 text-center mt-6">
            Remember your password?{" "}
            <span
              className="text-red-600 hover:underline cursor-pointer"
              onClick={() => navigate("/userlogin")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserForgetPass;
