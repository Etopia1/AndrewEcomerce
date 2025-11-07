// import React, { useEffect, useState } from 'react'
// import OtpInput from 'react-otp-input'
// import { OtpVerifybody, OtpVerifybody2,
//     Otpbody2, Logo, Otpmain, Text, Button1, Button,
//     Timetext, Button2, Button3,
//      OtpVerifybodyEmailInput, BtnHolder, EmailInput
//  } from './Otpstyled'
//  import { BeatLoader } from "react-spinners";
//  import axios from "axios";
//  import { toast } from "react-toastify";
//  import { useParams ,useNavigate} from 'react-router-dom'
//  import Aos from 'aos';
//  import "aos/dist/aos.css"

// const Marchantotp = () => {
//   const {token} = useParams()
//     // const new = set
//     const [otp, setOtp]=useState('')
//     const [minutes, setMinutes]=useState(0)
//     const [seconds, setSeconds]=useState(0)
//     const [loading, setloading] = useState(false)
//     const [Resnd, setResnd] = useState(false)
//     const [email, setEmail] = useState();
//     const [emailError, setEmailError] = useState(false);
//     useEffect(()=>{
//       Aos.init();
//     },[])
//     useEffect(()=>{
//         const interval = setInterval(()=>{
//             if(seconds > 0 ){
//                 setSeconds(seconds - 1)
//             }
//             if(seconds === 0){
//                 if(minutes === 0){
//                     clearInterval(interval)
//                 }else{
//                     setSeconds(59)
//                     setMinutes(minutes - 1)
//                 }
//             }
//         }, 1000)
//         return () => {
//             clearInterval(interval)
//         }
//     })
//     const sendOTP =()=>{
//         setMinutes(2)
//         setSeconds(59)
//     }
    
 

//   const url = "http://localhost:1900/api/v1"
//   const Nav = useNavigate();
//     const resendOTP = async ()=>{
//         // setResnd(false)
//         setMinutes(2)
//         setSeconds(59)
//         try {
//             const response = await axios.post(`${url}/resendverifyone/${token}`)
//             toast.success(response?.data.message)
//         } catch (error) {
//           console.log(error)
//         }
//     }

  
//     const handleVerify = async ()=>{
//       // console.log("OYP IS " , otp)
//         setloading(true)
        
//          try {
//             const response = await axios.post(`${url}/verifyone/${token}`, {otp:otp} )
//             // console.log(response.data.message)
          
//           toast.success(response?.data?.message)
//           setloading(false)
//           setTimeout(() => {
//             Nav(`/`)
//           }, 2000);
//         } catch (error) {
//           setloading(false)
//           // console.log(error?.response?.data?.message)
//           // console.log(error)
//           toast.error(error?.response?.data?.message)
//         }
//     }
//     const validateEmail = (input) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(input);
//       };
//       // console.log(email,"big")
//       const handleEmail = (e) => {
//         const newEmail = e.target.value;
//         setEmail(newEmail);  
//         console.log(email)
//         if (newEmail.trim() === "") {
//           toast.error("Email is required");
//           setEmailError(false);
//         } 
//         else if (!validateEmail(newEmail)) {
//           setEmailError(true);
//         } 
//         else{
//           setEmailError(false);
//         }
//       };
//   return (
//     <OtpVerifybody>
//       <OtpVerifybody2>
//        {/* <Logo></Logo> */}
//        <Otpbody2>
//        <Text>
//         <h2 style={{color:"white", fontSize: "29px", fontFamily:"San-serif", fontWeight:"300"}}>Verify Your One-Time-Password
//             <br /> <span style={{fontSize:"20px", display:"flex", textAlign: "center"}}>To Confirm You as A New User</span>
//         </h2>
//        </Text>
//         <Otpmain>
//           <OtpInput
          
//           value={otp}
//           numInputs={4}
//           onChange={setOtp}
//           renderSeparator={<span> </span>}
//           inputType="tel"
//           containerStyle={{display : "unset"}}
//           inputStyle={{ width : "3.5rem ", gap:"30px",   height: "4rem"}}
//           renderInput={(props) => <input {...props} className='otp-input' />}
//           />
//         </Otpmain>
//         <Timetext>
//             {seconds > 0 || minutes > 0 ? (
//                 <p>
//                     Time Remaining : {minutes < 10 ? `0${minutes}` : minutes}:
//                     {seconds < 10 ? `0${seconds}` : seconds}
//                 </p>
//             ) : (
//                 <p>Didn`t recieve code ?</p>
//             )
//         }
//         </Timetext>
//         <Button1>
            
//             <Button 
//              disabled={seconds > 0 || minutes > 0}
//              style={{
//                 color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#1f1d1d"
//              }}
//             //  onClick={()=> setResnd(true)}
//             onClick={resendOTP}
//             >
//                 Resend
//             </Button>
//         </Button1>
//         <Button2>
            
//         {
//                     loading ?
//                       <Button3 disabled="true"><BeatLoader
//                      color="#1f1d1d"
//                       size={20}
//                     /></Button3>
//                     : 
//                     <Button3 onClick={handleVerify}> Verify OTP</Button3>
//                  }
//         </Button2>
//        </Otpbody2>
       
//       </OtpVerifybody2>
//       {
//         Resnd ?
//             <OtpVerifybodyEmailInput data-aos="zoom-in" data-aos-duration="400">
//                 <EmailInput  
//                  placeholder="Email"
//                    onChange={handleEmail}
//                    />
//                 <BtnHolder>
//                     <Button3 onClick={()=> setResnd(false)} emai >Go back</Button3>
//                     <Button3 onClick={resendOTP} emai>resend</Button3>
//                 </BtnHolder>
//             </OtpVerifybodyEmailInput>
//         : null
//       }
//     </OtpVerifybody>
//   )
// }

// export default Marchantotp


import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import Aos from 'aos';
import {Otpmain} from './Otpstyled'
import 'aos/dist/aos.css';

const MarchantForgetpassOtp = () => {
  const { token } = useParams();
  console.log(token)
  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const url = 'https://andrewecomerceback.onrender.com/api/v1';
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const resendOTP = async () => {
    setMinutes(2);
    setSeconds(59);
    try {
      const response = await axios.post(`${url}/resendforgotPasswordverify/${token}`);
      toast.success(response?.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/forgotPasswordverify/${token}`, { otp });
      toast.success(response?.data?.message);
      setLoading(false);
      navigate(`/marchant-resetnewPass/${token}`)
    //   setTimeout(() => {
    //     navigate('/');
    //   }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!newEmail.trim()) {
      toast.error('Email is required');
      setEmailError(false);
    } else if (!validateEmail(newEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Verify Your One-Time Password
          <br />
          <span className="text-lg text-gray-600">To Reset Your New Password </span>
        </h2>

        <div className="flex justify-center my-6">
        <Otpmain>
       <OtpInput
          
          value={otp}
          numInputs={4}
          onChange={setOtp}
          renderSeparator={<span> </span>}
          inputType="tel"
          containerStyle={{display : "unset"}}
          inputStyle={{ width : "3.5rem ", border:"1px solid gray", gap:"30px",   height: "4rem"}}
          renderInput={(props) => <input {...props} className='otp-input ' />}
          />
        </Otpmain>
        </div>

        <div className="text-center text-gray-300 mb-6">
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </p>
          ) : (
            <p>Didn’t receive the code?</p>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <button
            disabled={seconds > 0 || minutes > 0}
            onClick={resendOTP}
            className={`py-3 px-6 rounded ${
              seconds > 0 || minutes > 0
                ? 'bg-gray-400 text-gray-600'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            Resend
          </button>
        </div>

        <div className="flex justify-center">
          {loading ? (
            <button
              disabled
              className="py-3 px-6 rounded bg-gray-600 text-gray-400 flex items-center justify-center"
            >
              <BeatLoader color="#ffffff" size={12} />
            </button>
          ) : (
            <button
              onClick={handleVerify}
              className="py-3 px-6 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Verify OTP
            </button>
          )}
        </div>
      </div>

      {resend && (
        <div
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-8"
          data-aos="zoom-in"
          data-aos-duration="400"
        >
          <input
            type="email"
            placeholder="Email"
            onChange={handleEmail}
            className="w-full p-4 rounded-md bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setResend(false)}
              className="py-3 px-6 rounded bg-red-500 hover:bg-red-600 text-white"
            >
              Go Back
            </button>
            <button
              onClick={resendOTP}
              className="py-3 px-6 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Resend
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarchantForgetpassOtp;

