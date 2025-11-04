import styled from "styled-components";

export const EmailInput =styled.input`
   width: 250px;
   height: 40px;
   border-radius: 4px;
   background: #fff;
   border: none;
   outline: none;
   padding: 10px;
`
export const BtnHolder =styled.div`
   width: max-content;
   height: max-content;
   display: flex;
   align-items: center;
   gap: 39px;
   
`
export const OtpVerifybodyEmailInput =styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   align-items: center;
   backdrop-filter: blur(1px);
   justify-content: center;
   flex-direction: column;
   background: #7d7d80a1;
   position: absolute;
   top:0;
  
   gap: 40px;
`

export const OtpVerifybody =styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   background: rgba(50, 66, 60);
background-repeat: no-repeat;
background-size: cover;
   position: relative;
`
export const OtpVerifybody2 =styled.div`
   /* width: 80%;
   height: 80%; */
   width: max-content;
height: max-content;
   /* background: #1c1b1b37; */
/* backdrop-filter: blur(15px); */
background: #1e1e1e;
padding: 20px 20px 25px 15px;
border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   
   /* background: yellow; */
   gap: 30px;
`
export const Otpbody2=styled.div`
  /* width: 40%;
  height: 90%; */
  /* background: rgba(33, 49, 43, 0.556); */
  /* box-shadow: 0 0 0 30px solid red; */
  height: max-content;
    min-width: 320px;
    width: 420px;
    gap: 30px;
  flex-direction:column;
  display: flex;
  align-items: center;
`
export const Logo=styled.div`
  width: 40%;
  height: 90%;
  /* background: #000; */
`
export const Otpmain =styled.div`
  width: 100%;
  height: 40%;
  /* background: red; */
  font-size:30px;
  // border:3px solid red;
  display: flex;
  align-items: center;
  color:black;
  justify-content: center;
`
export const Text=styled.div`
  width: 100%;
  height: 20%;
  text-align: center;
  display: flex;
align-items: center;
justify-content: center;
span{
    text-align: center;
  display: flex;
align-items: center;
justify-content: center; 
}
  /* background: #000; */
`
export const Button1=styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #000; */
`
export const Button=styled.button`
  width: 50%;
  height: 45px;
  min-height: 45px;
  border-radius: 5px;
  border: none;
outline: none;
  cursor: pointer;
  /* background: red; */
`
export const Button2=styled.div`
  width: 100%;
  height: 10%;
  /* background: orange; */
  
  display: flex;
  align-items: center;
  justify-content: center;
 
`
export const Button3=styled.button`
  width: ${({emai})=> emai ? "null": "40%"};
  height: 45px;
min-height: 45px;
border: none;
outline: none;
border-radius: 5px;
  /* background: rgba(127, 255, 115, 0.952); */
  background: ${({emai})=> emai ? "blue": "#00ff00"};
  color: ${({emai})=> emai ? "white": "#1f1d1d"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
`
export const Timetext =styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: red; */
`