import React ,{useEffect, useState} from 'react';
import { LoginData } from '../../apis/apiService';

import toast, { Toaster } from 'react-hot-toast';

import FacebookLogin from 'react-facebook-login';

import { useNavigate } from "react-router-dom";
import Ga from './Ga';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';


import OTPInput, { ResendOTP } from "otp-input-react";


import { useSelector, useDispatch } from "react-redux";

import {
    _save_token_,_delete_token_
  } from "../../features/AuthenticationToken";
import {
    _save_survey_
  } from "../../features/ThreeSteps";

import {BACKEND_URL,BACK_API_LOGIN_URL,BACK_TOKEN_RECEIVE,BACK_API_FACEBOOK} from '../../apis/urls'
import Checkbox from '@mui/material/Checkbox';


import Button from '@mui/material/Button';
import GoogleLoginSigup from './GoogleLoginSigup';


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import LoadingPage from '../LoadingPage';
import axios from 'axios';

import FacebookLoginPage from './FacebookLoginPage'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#efefefd6',
    boxShadow: 24,
    borderRadius:"10px",
    p: 4,
  };

export default function Login() {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    
    const [OTP, setOTP] = useState("");

    const notifyerror = (message) => toast.error(message);
    const notifysucces = (message) => toast.success(message);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [wholePageLoading,setwholePageLoading]=useState(false)
    const[loading,setloading]=useState(false)


    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: '',
    //   });
    const [formData, setFormData] = useState({
        email: '',
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setloading(true)
    
        // console.log(formData);
        try {
            const url=BACKEND_URL+BACK_API_LOGIN_URL
            const response = await LoginData(formData,url);


            if(response.request.status==201){

                // localStorage.setItem("token",  response.data.access);
                // localStorage.setItem("refresh",  response.data.refresh);
                
                // dispatch(_save_token_(response.data.access));

                // localStorage.setItem("three_steps",response.data.three_steps)
                
                // navigate("/");
                // setFormData({ email: '', password: '' });
                notifysucces("check you mail "+formData.email)

                // setsendOTP(true)
                setOpen(true)
                // setFormData({ email: ''});
            }else{
                notifyerror("supply valid email")
            }
            
        } catch (error) {
            // Handle any errors
            notifyerror("supply valid email")
            // notifyerror("check email and password")
        }
        setloading(false)

      };


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const get_refresh_access = async() =>{
        setwholePageLoading(true)
        const url=BACKEND_URL+BACK_TOKEN_RECEIVE
        const response = await LoginData({"token":OTP},url);
        // console.log(response)
        if(response.request.status==201){
            localStorage.setItem("token",  response.data.access);
            localStorage.setItem("refresh",  response.data.refresh);
            dispatch(_save_token_(response.data.access));
            dispatch(_save_survey_(response.data.three_steps))
            localStorage.setItem("three_steps",response.data.three_steps)
            navigate("/");
            return true
        }
        notifyerror("Invalid token")
        setwholePageLoading(false)

    }
  
    useEffect(()=>{
        // console.log('setOTP',OTP.length)
        if(OTP.length>=6){
            get_refresh_access()
        }
    },[OTP])

    const handleSuccess = (credential) => {
        // Handle successful sign-in, use the credential if needed
        console.log('Sign-in success:', credential);
      };
    
      const handleFailure = (error) => {
        // Handle sign-in failure
        console.error('Sign-in failure:', error);
      };
    
    return (
        <>
        <div className="flex justify-center items-center flex-col bg-white">
            <div className='mt-[5%] items-center font-bold text-[25px] text-blue-800'>
                <h1>Login or</h1>
            </div>
            <div className='mt-1 items-center font-bold text-[25px] text-blue-800'>
                <h1>Create an Account</h1>
            </div>
            <div className='mt-5 items-center font-semibold text-slate-500'>
                <h1>Sign in instantly using your existing accounts to get started quickly</h1>
            </div>
            <div className='mt-5 items-center font-semibold text-slate-500'>
                <h1>By proceeding, you are agreeing to <a href="#" className='text-blue-600 font-semibold' >Terms of services</a> and <a href="#" className='text-blue-600 font-semibold' >Privacy Notice .</a></h1>
            </div>
            <div className="flex justify-center p-6">
                        <div className="flex">
                            <GoogleLoginSigup/>
                        </div>
                        <div className='ml-4'>
                            <Button  sx={{backgroundColor:"#3737cf",textTransform: 'none','&:hover': {color: 'black'}, fontWeight: 'bold', color: 'white', fontSize: '15px' }} 
                                fullWidth variant="outlined">
                                <FaFacebook className="mr-3"/>
                                Sign in with Facebook
                            </Button>
                        </div>
            </div>
        </div>
        <div className="flex mt-4 items-center">
                <hr className="flex-grow border-t border-gray-300 ml-20" />
                <span className="px-4 text-slate-600 text-[15px] ">or continue with</span>
                <hr className="flex-grow border-t border-gray-300 mr-20" />
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
                <div className='flex justify-center w-[600px] m-auto flex-col'>
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-[15px] text-slate-500 font-semibold"
                                >
                                    Email
                                </label>
                                <label className='absolute ml-[570px] text-slate-600 text-[16px] mt-[16px] font-bold'>@</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder='Enter your email'
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className='mt-[15px]'>
                                <label className="text-blue-600 font-semibold ">We'll email you a verification code for a password free registration.</label>
                            </div>
                        


                            <div className="mt-6">
                                {loading
                                ?
                                    <button disabled className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  rounded-md  focus:outline-none  bg-red-700">
                                        Sending token
                                    </button>
                                :
                                    <button className="w-full text-[15px] px-4 py-2 tracking-wide text-blue-800 bg-slate-200 font-bold transition-colors duration-200 transform rounded-md hover:bg-blue-600 focus:outline-none focus:bg-purple-600">
                                        Continue
                                    </button>
                                }
                            </div>
                </div>
                </form>


        
        <Toaster />
        {open
        ?
            <>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}>
                    <div className='p-3 m-4 flex flex-col justify-center items-center'>
                        <div className='m-5'>
                    
                        <MdEmail
                            size={50}
                        />

                        </div>
                        <div>
                            <h1 className='text-[20px] font-medium'>Enter the OTP send to</h1>
                        </div>
                        <div>
                            <h1 className="font-sans font-extrabold text-[20px]">{formData.email}</h1>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mb-5'>
                        <div>
                        {wholePageLoading
                        ?
                            <>
                                <div className='flex justify-center items-center'>
                                    <div>
                                        <p className='font-bold text-[20px] text-red-600'>Verifying OTP</p>
                                    </div>
                                </div>
                            </>
                        :
                            <>
                                <OTPInput
                                    value={OTP}
                                    onChange={(e)=>{
                                        setOTP(e)
                                    }}
                                    autoFocus
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    secure
                                    />
                                    {/* <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}
                            </>
                        }
                        </div>
                    </div>
                    </Box>
                    </Fade>
                </Modal>
            </>
        :
            null
        }


 
        </>
    );
}