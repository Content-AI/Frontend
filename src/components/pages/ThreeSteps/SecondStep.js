import React , {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import TopBar from './TopBar'
import toast, { Toaster } from 'react-hot-toast';
import Dots from '../Dots';
import ChoiceButton from '../ChoiceButton';

import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";

const SecondStep = () => {
  let navigate = useNavigate();
  const location = useLocation();

  // console.log(location.state)
  
  const [isSelected, setIsSelected] = useState(false);
  
  const [data,setdata] = useState("");
  
  const [datatext,settext] = useState("");
  

  const [showModal, setShowModal] = React.useState(true);
  
  const handleToggle = (e) => {
    setIsSelected(!isSelected);
  };

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
              <Dots steps="second"/>
              <h1 className="text-1xl p-3 font-semibold space-x-0 mt-10">
              What do you need to make?
              </h1>

              <div className="flex justify-evenly ">

                  {data==="Paid Ads"
                    ?
                    <div onClick={()=>{
                      setdata("Paid Ads")
                    }} 
                    className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                        <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                        <span className="text-blue-800 font-semibold text-[13px]">Paid Ads</span>
                    </div>
                  :
                    <div onClick={()=>{
                      setdata("Paid Ads")
                    }} 
                    className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                        <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                        <span className="text-blue-800 font-semibold text-[13px]">Paid Ads</span>
                    </div>
                    
                  }


                {data==="Social Media Content"
                  ?
                  <div onClick={()=>{
                    setdata("Social Media Content")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Social Media Content</span>
                  </div>
                  :
                  <div onClick={()=>{
                    setdata("Social Media Content")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Social Media Content</span>
                  </div>
                }
                </div>



                <div className="flex justify-evenly ">

                {data==="Website copy"
                  ?
                  <div onClick={()=>{
                    setdata("Website copy")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Website copy</span>
                  </div>
                  :
                  <div onClick={()=>{
                    setdata("Website copy")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Website copy</span>
                  </div>
                }

                {data==="Email"
                  ?

                  <div onClick={()=>{
                    setdata("Email")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Email</span>
                  </div>
                  :
                  <div onClick={()=>{
                    setdata("Email")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                      <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                      <span className="text-blue-800 font-semibold text-[13px]">Email</span>
                  </div>
                }
                </div>
                <div 
                  className="flex justify-evenly ">

                {data==="Video"
                  ?
                <div onClick={()=>{
                    setdata("Video")
                  }}  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Video</span>
                </div>
                :
                <div onClick={()=>{
                    setdata("Video")
                  }}  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Video</span>
                </div>
                }

                {data==="Blog"
                  ?
                <div onClick={()=>{
                    setdata("Blog")
                  }} 
                  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Blog</span>
                </div>
                :
                <div onClick={()=>{
                    setdata("Blog")
                  }} 
                  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Blog</span>
                </div>
                }
              </div>
                <div 
                  className="flex justify-evenly ">

              {data==="Case Study or Testimonial"
                  ?
                <div onClick={()=>{
                    setdata("Case Study or Testimonial")
                  }}  className="bg-blue-200 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Case Study or Testimonial</span>
                </div>
                :
                <div onClick={()=>{
                    setdata("Case Study or Testimonial")
                  }}  className="bg-blue-100 m-4 h-[40px] items-center w-[50%] p-6 flex  space-x-2 divide-x">
                    <span className="ml-6 w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">Case Study or Testimonial</span>
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
                      navigate("/first_step?survey_data_first=by-for-user-clarification")
                  }}
                  >Back</Button>


                <Button variant="contained" className="float-right"
                sx={{textTransform: 'none'}} 
                  onClick={()=>{
                      // navigate("/third_step")
                      navigate("/third_step?survey_data_third=by-for-user-clarification", {
                        state: {
                          first_answer:location.state?.first_answer,
                          second_answer:data,
                        },
                      });
                  }}
                  >Next</Button>
                <div className="flex justify-center">
                  <div>
                    <button
                      onClick={()=>{
                      // navigate("/third_step")
                      navigate("/third_step?survey_data_third=by-for-user-clarification", {
                        state: {
                          first_answer:location.state?.first_answer,
                          second_answer:data,
                        },
                      });
                  }}
                      type='button' className="p-6 bg-white text-blue-700 font-semibold text-[15px]">Skip Question</button>
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


export default SecondStep