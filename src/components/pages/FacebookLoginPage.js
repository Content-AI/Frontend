import React ,{useEffect, useState} from 'react';
import { LoginData } from '../../apis/apiService';

import toast, { Toaster } from 'react-hot-toast';

import FacebookLogin from 'react-facebook-login';

import { useNavigate } from "react-router-dom";

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
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import LoadingPage from '../LoadingPage';
import axios from 'axios';

const FacebookLoginPage = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();


    const notifysuccess = (message) => toast.success(message);
    const notifyerr = (message) => toast.error(message);


    const responseFacebook = (response) => {
        console.log(response);
        axios.post(BACKEND_URL+BACK_API_FACEBOOK,{
            auth_token: response.accessToken
          }).then((response)=>{
            if (response.data.access) {
              localStorage.setItem("token",  response.data.access);
              localStorage.setItem("refresh",  response.data.refresh);
              dispatch(_save_token_(response.data.access));
              localStorage.setItem("three_steps",response.data.three_steps)
              dispatch(_save_survey_(response.data.three_steps))
              // dispatch(_save_user_profile(response.data.user))            
            //   navigate("/");
  
            }
            navigate("/");
          }).catch((err)=>{
            // navigate("/login");
            try{
              notifyerr("Try loggin in")
            }catch(e){
              notifyerr("something went wrong refresh page")
            }
          })
        }
    
  return (
    <>
    <div className="facebook-login-button bg-[blue] shadow-lg">
      <div className='flex justify-center items-end '>
        <div>
          <FaFacebook color='white' size={20} className="m-3"/>
        </div>
        <div>
          <FacebookLogin
                appId="174114622120849"
                height={10}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
            />
        </div>
        </div>
    </div>

        
    </>
  )
}

export default FacebookLoginPage