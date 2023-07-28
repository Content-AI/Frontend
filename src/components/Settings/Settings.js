import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
   const navigate = useNavigate();
  const work_space = ['General', 'Billing', 'Team', 'Usage', 'Integrations'];
  const personal_settings = ['Profile'];

  const [activeLink, setActiveLink] = useState('');


  const capitalizeFrontText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  const lowercaseFrontText = (text) => {
    return text.charAt(0).toLowerCase() + text.slice(1);
  };

  return (
    <>
 
        <div className="bg-white p-2 mt-1 fixed left-0 top-0 h-full w-64 shadow-md  rounded-[5px]">               
        <div className='bg-[#FAFBFD]'>
                <button onClick={()=>{
                    navigate("/")
                }} className=" text-black font-bold py-2 px-4 rounded"
                title="Go back">
                    <IoMdArrowBack/>
                </button>
            </div>
            <div className="flex flex-col ml-6">
                <div className="mt-[2vh] ">
                    <div className='flex flex-col mr-4'>
                        <p className="font-bold text-[#414357] text-[15px] mt-1  font-sans">Workspace settings</p>
                    </div>
                    {work_space.map((data, index) => {
                    return (
                    <Link
                    to={`/settings/${lowercaseFrontText(data)}`}
                    className={`block w-full py-1 text-sm mt-3 mb-3 px-1 text-left rounded-lg text-gray-600 transition-all duration-150 hover:text-black hover:bg-gray-100 ${
                        activeLink === data ? 'text-black font-bold' : 'text-black font-medium'
                    }`}
                    onClick={() => setActiveLink(data)}
                    >
                        <span className="relative text-[#36464E] text-[13px]  font-sans">{capitalizeFrontText(data)}</span>
                    </Link>
                    );
                })}
                </div>
            </div>
            <div className="flex flex-col ml-6">
                <div className="mt-[2vh] ">
                <div className='flex flex-col mr-4'>
                        <p className="font-bold text-[#414357] text-[15px] mt-1  font-sans">Profile Settings</p>
                    </div>
                    {personal_settings.map((data, index) => {
                    return (
                    <Link
                    to={`/settings/${lowercaseFrontText(data)}`}
                    className={`block w-full py-1 text-sm mt-3 mb-3 px-1 text-left rounded-lg text-gray-600 transition-all duration-150 hover:text-black hover:bg-gray-100 ${
                        activeLink === data ? 'text-black font-bold' : 'text-black font-medium'
                    }`}
                    onClick={() => setActiveLink(data)}
                    >
                        <span className="relative text-[#36464E] text-[13px]  font-sans">{capitalizeFrontText(data)}</span>
                    </Link>
                    );
                })}
                </div>
            </div>
        </div>
    
      <Toaster />

    </>
  );
};

export default Settings;
