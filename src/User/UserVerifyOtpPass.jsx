import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

const UserVerifyOtpPass = () => {
  const { token } = useParams();
  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(59);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = 'http://localhost:2030/api/v1';

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(prev => prev - 1);
      else if (minutes > 0) {
        setMinutes(prev => prev - 1);
        setSeconds(59);
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const resendOTP = async () => {
    setMinutes(2);
    setSeconds(59);
    try {
      const response = await axios.post(`${url}/user-resendforgotPasswordverify/${token}`);
      toast.success(response?.data.message);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      toast.error('Please enter the 4-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${url}/user-forgotPasswordverify/${token}`, { otp });
      toast.success(response?.data.message);
      navigate(`/user-resetnewPass/${token}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 flex flex-col items-center">
        
        {/* Top Icon */}
        <div className="w-24 h-24 mb-4">
          <img
            src="src/assets/download__28_-removebg-preview.png" // replace with your icon path
            alt="Verification Icon"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">
          We have sent a verification code on your email
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Please enter the 4-digit code below
        </p>

        {/* OTP Input */}
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          separator={<span className="mx-2  " />}
          renderSeparator={<span className='gap-[20px]  '>  </span>}
          renderInput={(props) => <input {...props} className='otp-input mr-[5px] ' />}
          inputStyle={{
            width: '3rem',
            height: '3rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db',
            // background:"black",
            fontSize: '1.5rem',
            textAlign: 'center',
            outline: 'none',
          }}
        />

        {/* Timer */}
        <div className="text-center text-gray-400 mt-4">
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining: {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </p>
          ) : (
            <p className="text-gray-500">Didn't receive the code?</p>
          )}
        </div>

        {/* Resend */}
        <button
          disabled={seconds > 0 || minutes > 0}
          onClick={resendOTP}
          className={`mt-4 flex items-center justify-center w-36 h-10 rounded-full font-medium transition ${
            seconds > 0 || minutes > 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <span>Resend</span>
          <span className="ml-2 text-lg">➡️</span>
        </button>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-full font-medium shadow-md ${
            loading
              ? 'bg-gray-400 cursor-not-allowed text-gray-200'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {loading ? <BeatLoader color="#fff" size={10} /> : 'Verify OTP'}
        </button>
      </div>
    </div>
  );
};

export default UserVerifyOtpPass;
