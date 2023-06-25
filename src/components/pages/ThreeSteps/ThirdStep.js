import React , {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import TopBar from './TopBar'
import toast, { Toaster } from 'react-hot-toast';
import Dots from '../Dots';
import ChoiceButton from '../ChoiceButton';

import { postData } from '../../../apis/apiService';

import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
    _save_token_
  } from "../../../features/AuthenticationToken";
import { BACKEND_URL,BACK_API_SURVEY } from '../../../apis/urls';
import {
  _save_survey_
} from "../../../features/ThreeSteps";


const ThirdStep = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // console.log(location.state)

  
  let ACCESS_TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );

  const [isSelected, setIsSelected] = useState(false);
  
  const [data,setdata] = useState("");
  
  const [datatext,settext] = useState("");
  

  const [showModal, setShowModal] = React.useState(true);
  
  const handleToggle = (e) => {
    setIsSelected(!isSelected);
  };

  const send_survey_data = async() =>{
    // formData, url,ACCESS_TOKEN
    const datas = {
      "first_answer":location.state.first_answer,
      "second_answer":location.state.second_answer,
      "third_answer":data
    }
    const response =await postData(datas,BACKEND_URL+BACK_API_SURVEY,ACCESS_TOKEN)
    // console.log(response.data)
    dispatch(_save_survey_(false))
    localStorage.setItem("three_steps",false)
  }

  useEffect(()=>{
    // console.log(data)
    // console.log(datatext)
    settext('')
  },[data])

  return (
    <>
     
{showModal ? (
        <>
          <div
            className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            {/* <div className="relative w-auto my-6 mx-auto max-w-3xl"> */}
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {/* <h3 className="text-3xl font-semibold">
                    Survey
                  </h3> */}
                  <div className="p-6 mb-6 w-[80%] m-auto bg-white rounded-md shadow-2xl">
              <TopBar />
              <Dots steps="third"/>
              <h1 className="text-1xl p-3 font-semibold space-x-0 mt-10">
              How did you hear about us?
              </h1>

              <div className="flex justify-evenly ">

                  {data==="Online Article"
                    ?
                    <div onClick={()=>{
                      setdata("Online Article")
                    }} 
                    className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                        <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                        <span className="text-blue-800 font-semibold text-[13px]">Online Article</span>
                    </div>
                  :
                    <div onClick={()=>{
                      setdata("Online Article")
                    }} 
                    className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                        <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                        <span className="text-blue-800 font-semibold text-[13px]">Online Article</span>
                    </div>
                    
                  }


                {data==="Facebook"
                  ?
                  <div onClick={()=>{
                    setdata("Facebook")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Facebook</span>
                  </div>
                  :
                  <div onClick={()=>{
                    setdata("Facebook")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Facebook</span>
                  </div>
                }
                </div>



                <div className="flex justify-evenly ">

                {data==="Google"
                  ?
                  <div onClick={()=>{
                    setdata("Google")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Google</span>
                  </div>
                  :
                  <div onClick={()=>{
                    setdata("Google")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Google</span>
                  </div>
                }

                {data==="LinkedIn"
                  ?

                  <div onClick={()=>{
                    setdata("LinkedIn")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">LinkedIn</span>
                  </div>
                  :
                  <div onClick={()=>{
                    setdata("LinkedIn")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">LinkedIn</span>
                  </div>
                }
                </div>
                <div 
                  className="flex justify-evenly ">

                {data==="Twitter"
                  ?
                <div onClick={()=>{
                    setdata("Twitter")
                  }}  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Twitter</span>
                </div>
                :
                <div onClick={()=>{
                    setdata("Twitter")
                  }}  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Twitter</span>
                </div>
                }

                {data==="Tiktok"
                  ?
                <div onClick={()=>{
                    setdata("Tiktok")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Tiktok</span>
                </div>
                :
                <div onClick={()=>{
                    setdata("Tiktok")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Tiktok</span>
                </div>
                }
              </div>
                <div 
                  className="flex justify-evenly ">

              {data==="Word of mouth"
                  ?
                <div onClick={()=>{
                    setdata("Word of mouth")
                  }}  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Word of mouth</span>
                </div>
                :
                <div onClick={()=>{
                    setdata("Word of mouth")
                  }}  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Word of mouth</span>
                </div>
              }
              
              {data==="Other"
                ?
                <>
                <div onClick={()=>{
                    setdata("Other")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Other</span>
                    <input
                      className="block  px-4 py-2  text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      type='text'
                      maxLength="20"
                      defaultValue={datatext}
                      onChange={settext}
                    />
                </div>
                </>
                :
                <>
                <div onClick={()=>{
                    setdata("Other")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Other</span>
                    <input
                      className="block  px-4 py-2  text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      type='text'
                      maxLength="20"
                      defaultValue={datatext}
                      onChange={settext}
                    />
                </div>
                
                </>
              }
                </div>

                <Button variant="contained" className="float-left"
                sx={{textTransform: 'none'}} 
                  onClick={()=>{
                      navigate("/second_step")
                  }}
                  >Back</Button>
                <Button variant="contained" className="float-right"
                sx={{textTransform: 'none'}} 
                  onClick={()=>{
                      
                      send_survey_data()
                      navigate("/")

                  }}
                  >Get Started</Button>
                <div className="flex justify-center">
                  <div>
                    {/* <button type='button' className="p-6 bg-white text-blue-700 font-semibold text-[15px]">Skip Question</button> */}
                    <button type='button' className="p-6 bg-white text-blue-700 font-semibold text-[15px]"></button>
                  </div>
                </div>
          </div>
                 
                </div>
              </div>
            </div>
          {/* </div> */}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        <Toaster />
    </>
  )
}


export default ThirdStep