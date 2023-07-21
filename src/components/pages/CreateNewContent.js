import React, { useEffect, useState } from 'react';
import { BACKEND_URL,BACK_END_API_PROJECT_CHOOSE } from '../../apis/urls';
import { fetchData } from '../../apis/apiService';
import { useNavigate } from 'react-router-dom';

import Select from 'react-select';

import { useSelector, useDispatch } from "react-redux";
import {
    _save_folder_id_
  } from "../../features/ProjectOrFolderIdChoosen";
  

const CreateNewContent = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleGoBack = () => {
        navigate(-1);
    };

    const [selectedValue, setSelectedValue] = useState('');
    const [SelectedOptions, setSelectedOptions] = useState(null);


    // const handleSelectChange = (event) => {
    //     setSelectedValue(event.target.value);
    //   };

    const [selectedOption, setSelectedOption] = useState({"value":"select a folder","label":"select a folder"});

    const get_project_data = async() => {
        const resp = await fetchData(BACKEND_URL+BACK_END_API_PROJECT_CHOOSE,props.AUTH_TOKEN)
        if(resp.status==200){
            setSelectedOptions(resp.data)
        }
    }
      useEffect(()=>{
        get_project_data()
      },[])

    //   useEffect(()=>{
    //     dispatch(_save_folder_id_(selectedValue))
    //   },[selectedValue])

      useEffect(()=>{
        dispatch(_save_folder_id_(selectedOption.value))
      },[selectedOption])

    
      const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
      };

    //   useEffect(()=>{
    //     console.log(selectedOption.value)
    //   },[selectedOption])

  return (
    <>
       <div className="fixed inset-0 z-40 overflow-y-auto backdrop-blur-sm" id="headlessui-dialog-:r27:" role="dialog" aria-modal="true" data-headlessui-state="open">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 opacity-100" id="headlessui-dialog-overlay-:r28:" aria-hidden="true" data-headlessui-state="open"></div>
                <div className="relative h-full bg-white text-gray-900 rounded-md shadow-xl align-top sm:align-middle w-full sm:w-[416px] md:w-[640px] opacity-100 translate-y-0 sm:scale-100">
                    <div className="flex flex-col p-6">
                        <div className="-m-6 divide-y divide-gray-200">
                        <div className="p-6 space-y-4">
                            <div className="space-y-1">
                                <h1 className="mb-2 text-lg font-semibold text-gray-900">Get started with new content powered by  <b>Web Central</b></h1>
                                <div className="flex">
                                    <div className="w-64 mt-2">
                                    {/* ============select field================= */}
                                    <Select
                                        options={SelectedOptions}
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                        isSearchable={true} // Enable searching in the select field
                                        placeholder="Select Folder"
                                    />
                                        {/* <select
                                            className="p-1 ring-1 font-semibold ring-gray-200 w-[200px] text-left space-y-3 hover:ring-gray-300 active:ring-gray-400"
                                            id="selectField"
                                            value={selectedValue}
                                            onChange={handleSelectChange}
                                        >
                                            <option value="">choose your folder ...</option>
                                            
                                            {SelectedOptions &&
                                                SelectedOptions.map((data,index)=>{
                                                    return (
                                                        <option key={index} value={data.value}>{data.label}</option>
                                                    )
                                                })
                                            }
                                            
                                        </select> */}
                                    {/* ========================================= */}
                                    </div>
                                    <div>
                                    <div className="ml-3 md:flex flex-row justify-between items-center w-full"> 

                                            <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base  text-white bg-[#334977] ring-0 ring-blue-600 hover:ring-2 active:ring-0 my-2"
                                                onClick={()=>{
                                                    navigate("/projects?create=new_folder&true=redirect_site")
                                                }}
                                            >
                                                <span className="flex items-center justify-center mx-auto space-x-2 select-none">                        
                                                    + Create New Folder
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm font-normal text-gray-600">You have the option to produce a document for lengthy content, utilize a template for concise excerpts of specialized content, or employ our guided forms</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 p-6">
                            <button className="p-4 ring-1 ring-gray-200 rounded-2xl text-left space-y-3 hover:ring-gray-300 active:ring-gray-400">
                                <span className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10,.71c-1.96,0-3.53,.06-5.17,.17-1.73,.12-3.11,1.5-3.22,3.24-.12,1.9-.18,3.86-.18,5.88s.06,3.98,.18,5.88c.11,1.74,1.49,3.12,3.22,3.24,1.63,.11,3.21,.17,5.17,.17s3.53-.06,5.17-.17c1.73-.12,3.11-1.5,3.22-3.24,.12-1.9,.18-3.86,.18-5.88,0-.82-.01-1.62-.03-2.42-.02-.7-.24-1.38-.66-1.95-1.29-1.76-2.34-2.87-4.05-4.19-.58-.45-1.28-.68-2-.7-.58-.01-1.18-.02-1.83-.02Z" fill="#8DA2FB" fillRule="evenodd"></path>
                                    <path d="M7.28,4.82c-.49,0-.89,.4-.89,.89s.4,.89,.89,.89h3.29c.49,0,.89-.4,.89-.89s-.4-.89-.89-.89h-3.29Zm0,8.46c-.49,0-.89,.4-.89,.89s.4,.89,.89,.89h5.43c.49,0,.89-.4,.89-.89s-.4-.89-.89-.89H7.28Zm0-4.15c-.49,0-.89,.4-.89,.89s.4,.89,.89,.89h5.45c.49,0,.89-.4,.89-.89s-.4-.89-.89-.89H7.28Z" fill="#5850EC" fillRule="evenodd"></path>
                                    </svg>
                                    <span className="text-indigo-700 text-base font-semibold">Blank document</span>
                                </span>
                                <span className="block">Commence anew by creating an empty document.</span>
                            </button>
                            <button className="p-4 ring-1 ring-gray-200 rounded-2xl text-left space-y-3 hover:ring-gray-300 active:ring-gray-400"
                                onClick={()=>{
                                    navigate("/template")
                                }}
                            >
                                <span className="flex items-center space-x-3">
                                <svg
                                    className="w-5 h-5"
                                    width="18"
                                    height="26"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M6.75 0.75H2.25C1.85218 0.75 1.47064 0.908035 1.18934 1.18934C0.908035 1.47064 0.75 1.85218 0.75 2.25V6.75C0.75 7.14782 0.908035 7.52936 1.18934 7.81066C1.47064 8.09196 1.85218 8.25 2.25 8.25H6.75C7.14782 8.25 7.52936 8.09196 7.81066 7.81066C8.09196 7.52936 8.25 7.14782 8.25 6.75V2.25C8.25 1.85218 8.09196 1.47064 7.81066 1.18934C7.52936 0.908035 7.14782 0.75 6.75 0.75ZM6.75 6.75H2.25V2.25H6.75V6.75ZM15.75 0.75H11.25C10.8522 0.75 10.4706 0.908035 10.1893 1.18934C9.90804 1.47064 9.75 1.85218 9.75 2.25V6.75C9.75 7.14782 9.90804 7.52936 10.1893 7.81066C10.4706 8.09196 10.8522 8.25 11.25 8.25H15.75C16.1478 8.25 16.5294 8.09196 16.8107 7.81066C17.092 7.52936 17.25 7.14782 17.25 6.75V2.25C17.25 1.85218 17.092 1.47064 16.8107 1.18934C16.5294 0.908035 16.1478 0.75 15.75 0.75ZM15.75 6.75H11.25V2.25H15.75V6.75ZM6.75 9.75H2.25C1.85218 9.75 1.47064 9.90804 1.18934 10.1893C0.908035 10.4706 0.75 10.8522 0.75 11.25V15.75C0.75 16.1478 0.908035 16.5294 1.18934 16.8107C1.47064 17.092 1.85218 17.25 2.25 17.25H6.75C7.14782 17.25 7.52936 17.092 7.81066 16.8107C8.09196 16.5294 8.25 16.1478 8.25 15.75V11.25C8.25 10.8522 8.09196 10.4706 7.81066 10.1893C7.52936 9.90804 7.14782 9.75 6.75 9.75ZM6.75 15.75H2.25V11.25H6.75V15.75ZM15.75 9.75H11.25C10.8522 9.75 10.4706 9.90804 10.1893 10.1893C9.90804 10.4706 9.75 10.8522 9.75 11.25V15.75C9.75 16.1478 9.90804 16.5294 10.1893 16.8107C10.4706 17.092 10.8522 17.25 11.25 17.25H15.75C16.1478 17.25 16.5294 17.092 16.8107 16.8107C17.092 16.5294 17.25 16.1478 17.25 15.75V11.25C17.25 10.8522 17.092 10.4706 16.8107 10.1893C16.5294 9.90804 16.1478 9.75 15.75 9.75ZM15.75 15.75H11.25V11.25H15.75V15.75Z"
                                        fill="#343330"
                                    />
                                    </svg>
                                    <span className="text-slate-700 text-base font-semibold">Templates</span>
                                </span>
                                <span className="block">Create content with predefined templates and workflows.</span>
                            </button>
                            
                        </div>
                        <div className="flex justify-end p-6">
                        <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
                         onClick={handleGoBack}>
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">Cancel</span></button></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </>
  )
}

export default CreateNewContent