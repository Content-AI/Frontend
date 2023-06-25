import React , {useEffect,useState} from 'react'
import {Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { _delete_token_ } from '../../features/AuthenticationToken';
import {MdCircle,MdClose,MdHome,MdOutlineHome,MdPeopleAlt,MdPhotoCameraFront,MdLogout, MdArtTrack, MdDocumentScanner, MdSettings, MdSettingsAccessibility, MdSettingsApplications, MdSettingsBackupRestore, MdHelp, MdSearch } from 'react-icons/md';


import { CgFileDocument, CgMenuGridO, CgProfile, CgTemplate } from 'react-icons/cg';
import { AiFillCloseCircle,AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import Select from 'react-select'
import { BsChat, BsCheckCircle, BsReceipt, BsRecordCircleFill } from 'react-icons/bs';

import WebFont from 'webfontloader';

const Navbar = () => {

  const [activeLink, setActiveLink] = useState('');
  const dispatch = useDispatch();

  const [showSmallNavbar,setshowSmallNavbar] = useState(false);

  let PROFILE_DATA = useSelector(
    (state) =>state.SetFullProfile.Fullprofile
  );

  // console.log(PROFILE_DATA)

  const handleshowSmallNavbar = () => {
    showSmallNavbar(true);
  };

  const language = [
    { value: 'Eng', label: 'Eng' },
    { value: 'France', label: 'France' },
  ]

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const projects = [
    { value: 'Personal', label: 'Personal' },
  ]

  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };



  return (
    <>      


    <div
   className="flex items-center justify-between">
    <div className='p-2'>
      <img
        src="https://static.vecteezy.com/system/resources/previews/009/182/285/non_2x/tmp-letter-logo-design-with-polygon-shape-tmp-polygon-and-cube-shape-logo-design-tmp-hexagon-logo-template-white-and-black-colors-tmp-monogram-business-and-real-estate-logo-vector.jpg"
        className="w-[50px] h-[50px] rounded-full ml-[1rem]"
      />
    </div>
      <div className="sm:flex sm:items-center sm:p-2 hidden">
        <p className="font-sans text-[#36464E] text-[14px] rounded-full mr-3 px-2 py-2">What's New 
          <span className="text-blue-600 absolute mr-8">
            <MdCircle
              size={10}
            />
          </span>
        </p>
          <Select options={language}  className="mr-4 w-[80px] font-semibold text-[12px]" defaultValue={language[0]}/>
          <Button  sx={{ textTransform: 'none',width:"161px",color:"white",backgroundColor:"blue"}}  variant="contained"><BsCheckCircle className="text-[#FFFFFF] mr-3" size={16} /> Upgrade to Pro</Button>
      </div>
    </div>
    <hr></hr>

    <div className="mt-[67px] fixed left-0 top-0 h-full w-64 shadow-2xl bg-white">
        <div className="flex flex-col">

            <div className='flex items-center justify-center mt-1'>
                <div className='shadow-sm'>
                    <label
                        htmlFor="Personal"
                        className="cursor-pointer uppercase absolute ml-[0.75rem] mt-4 text-[14px] block text-sm  text-gray-800"
                    >
                      Personal
                    </label>
                    <label
                        htmlFor="Personal"
                        className="cursor-pointer absolute font-bold ml-[0.75rem] mt-9 text-[14px] block text-sm  text-gray-800"
                    >
                      Personal
                    </label>
                    <img src="up_down.png"
                        className='cursor-pointer font-sans absolute mt-7 w-[20px] h-[20px] ml-[12rem]'
                      />
                    <input
                        onClick={()=>{
                          console.log("change personal")
                        }}
                        type="select"
                        id="project"
                        name="project"
                        value="Personal"
                        // onChange={handleInputChange}
                        className="cursor-pointer text-white block w-[15rem] h-[53px] text-[12px] font-bold px-4 py-2 mt-3  bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
                        readOnly
                    />
                </div>
            </div>

            <div className="mt-[1vh] h-[calc(100vh-20rem)] overflow-y-auto scrollbar-none">

              <Link to="/" onClick={() => handleLinkClick('dashboard')}>
                <div className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${activeLink === 'dashboard' ? 'shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold' : ''}`}>

                  <MdOutlineHome size={25}/>
                {/* {activeLink === 'dashboard' && (
                      <span className="absolute bg-blue-300 h-full w-1 left-0 top-0"></span>
                    )} */}
                  <p className="text-[15px] mt-1 ml-[10px]">Dashboard</p>
                </div>
              </Link>
              
              <Link to="/template" onClick={() => handleLinkClick('template')}>
                <div className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${activeLink === 'template' ? 'shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold' : ''}`}>
                  <CgTemplate size={25}/>
                  <p className="text-[15px]  ml-[10px] font-sans">Template</p>
                </div>
              </Link>
              <Link to="/chat" onClick={() => handleLinkClick('chat')}>
                <div className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${activeLink === 'chat' ? 'shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold' : ''}`}>
                  <BsChat size={25}/>
                  <p className="text-[15px]  ml-[10px] font-sans">Chat</p>
                </div>
              </Link>
              <Link to="/documents" onClick={() => handleLinkClick('documents')}>
                <div className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${activeLink === 'documents' ? 'shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold' : ''}`}>
                  <CgFileDocument size={25}/>
                  <p className="text-[15px]  ml-[10px] font-sans">Documents</p>
                </div>
              </Link>
              <Link to="/recipes" onClick={() => handleLinkClick('recipes')}>
                <div className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${activeLink === 'recipes' ? 'shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold' : ''}`}>
                  <BsReceipt size={25}/>
                  <p className="text-[15px]  ml-[10px] font-sans">Recipes</p>
                </div>
              </Link>
              <Link to="/art" onClick={() => handleLinkClick('art')}>
                <div className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${activeLink === 'art' ? 'shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold' : ''}`}>
                  <MdDocumentScanner size={25}/>
                  <p className="text-[15px]  ml-[10px] font-sans">Art</p>
                </div>
              </Link>
            </div>
        </div>

    


      <div className="fixed bottom-0 w-64 p-4 bg-gray-100">
        <div
          className="relative"
        >
          {isHovered && (
            <div className="absolute bottom-full left-[-16px] w-64 h-64 bg-gray-100"
            style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            >

              <AiOutlineCloseCircle 
                    onClick={()=>{
                      setHovered(!isHovered)
                    }}  className='w-12 h-6 float-right mt-2 hover:text-red-500 cursor-pointer'/>
            
              <div className="flex flex-col items-center justify-center ">
                  <div className="mt-[5vh] ">
                      <Link to="/profile" onClick={()=>{
                      setHovered(!isHovered)
                    }}>
                          <div  className='flex mb-4  hover:text-blue-500 cursor-pointer'>
                            <div className='mr-2'>
                              <MdSettings size={25}/>
                            </div>
                            <div>
                              <p className="text-[15px]  ml-[10px] font-sans">Settings</p>
                            </div>
                          </div>
                        </Link>
                      <div className='flex mb-4  hover:text-blue-500 cursor-pointer'>
                            <div className='mr-2'>
                              <MdHelp size={25}/>
                            </div>
                            <div>
                              <p className="text-[15px]  ml-[10px] font-sans">Help</p>
                            </div>
                      </div>
                      <div className='flex mb-4  hover:text-blue-500 cursor-pointer'>
                        <div className='mr-2'>
                            <MdSearch size={25}/>
                        </div>
                        <div>
                          <p className="text-[15px]  ml-[10px] font-sans">Search</p>
                        </div>
                      </div>                      
                          <Link to="/logout" onClick={() =>{
                            handleLinkClick('logout')
                              localStorage.clear();
                              dispatch(_delete_token_(null))
                            }}
                            >
                            <div className={`flex mt-7 ${activeLink === 'logout' ? 'text-blue-500' : ''}`}>
                            <div className='mr-2'>
                              <MdLogout
                                size={25}
                              />
                              </div>
                              <div>
                                <p className="text-[15px]  ml-[10px] font-sans">Logout</p>
                              </div>
                            </div>
                          </Link>
                      </div>
              </div>
              </div>
          )}
        </div>

        <div className="flex flex-col bg-gray-100">
        {!isHovered && (
          <div>
          <button
            onClick={()=>{
                console.log("pricing")
            }}
            className='mb-2 focus:outline-none flex select-none items-center py-3 text-xs font-medium ring-offset-2 focus:ring-2 text-white justify-center rounded-lg bg-purple-500 hover:bg-purple-700 w-full h-[30px] px-5'><BsCheckCircle className="text-white ml-2 mr-3" size={16} /> Upgrade to Pro</button>
          </div>
          )}
          <div className='bg-gray-100'>
            <Button sx={{ textTransform: 'none'}}
              onClick={()=>{
                  setHovered(!isHovered)
              }}
              className='bg-gray-100'
            >
            {PROFILE_DATA
                ?
                    PROFILE_DATA.profile_pic
                    ?
                      <img
                        src={PROFILE_DATA.profile_pic}
                        alt="PP"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    :
                      <img
                        src="default.png"
                        alt="Image"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                :
                  <img
                    src="default.png"
                    alt="Image"
                    className="w-[40px] h-[40px] rounded-full"
                  />
            }
              <p className="mt-1 ml-3 text-[12px] font-sans font-bold text-black">
                {PROFILE_DATA
                ?
                    PROFILE_DATA.first_name || PROFILE_DATA.last_name
                    ?
                      PROFILE_DATA.last_name
                      ?
                        PROFILE_DATA.first_name+" "+PROFILE_DATA.last_name
                      :
                        PROFILE_DATA.first_name+" "
                    :
                      "Personal Workspace"  
                :
                  "Personal Workspace"
                }
              </p>
              <img src="up_down.png"
                className='w-[20px] h-[20px] ml-[3.7rem]'
              />
            </Button>
              <p className="ml-[4.5rem] text-[10px] font-sans font-bold text-black">Free plan</p>
          </div>
        </div>
      </div>




    </div>
    </>
  )
}

export default Navbar