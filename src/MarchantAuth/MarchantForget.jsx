import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const MarchatForget = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const Nav = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };



  const handleSubmit  = () =>{
    if(!email){
        alert("Enter A valid Email")
        set

    }else{
        setLoading(true)
        const url = "http://localhost:2030/api/v1/forgotPassword"
        const data = {email}
        axios.post(url, data)
        .then((res)=>{
            console.log(res)
            setLoading(false)
            Nav(`/marchant-forgetpassverifyotp/${res.data.token}`)

    })
        .catch((error)=>{
            console.log(error)
            setLoading(false)

    })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Forget Your Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email below and we’ll send you an OTP to reset your password.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-4 mb-6 rounded-md bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !email}
          className={`w-full py-3 px-6 rounded text-white font-medium ${
            loading
              ? 'bg-gray-500'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-300'
          }`}
        >
          {loading ? <BeatLoader color="#ffffff" size={12} /> : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default MarchatForget;
