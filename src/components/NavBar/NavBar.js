import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _delete_token_ } from "../../features/AuthenticationToken";
import { _save_survey_ } from "../../features/ThreeSteps";
import { _delete_user_profile } from "../../features/Fullprofile";
import { _save_details_ } from "../../features/Subscriptions";
import { BACK_END_API_PROFILE,BACK_END_API_SUBCRIPTION_DETAILS,BACKEND_URL,BACK_END_API_SUBSCRIBE_CHECK } from '../../apis/urls';

import {
  _hide_nav_,
  _show_nav_,
} from "../../features/HideShowNavBarGlobalState";
import { _make_blur_ } from "../../features/BlurBg";
import {
  MdCircle,
  MdClose,
  MdHome,
  MdOutlineHome,
  MdPeopleAlt,
  MdPhotoCameraFront,
  MdLogout,
  MdArtTrack,
  MdDocumentScanner,
  MdSettings,
  MdSettingsAccessibility,
  MdSettingsApplications,
  MdSettingsBackupRestore,
  MdHelp,
  MdSearch,
} from "react-icons/md";

import { FaBars, FaTimes, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { _save_sub_details_ } from "../../features/SubscriptionsData";

import {
  CgFileDocument,
  CgMenuGridO,
  CgProfile,
  CgTemplate,
} from "react-icons/cg";
import { AiFillCloseCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import Select from "react-select";
import {
  BsChat,
  BsCheckCircle,
  BsReceipt,
  BsRecordCircleFill,
} from "react-icons/bs";

import clsx from "clsx";

import { NavIcons, SealCheck } from "../Icons";
import Settings from "../Settings/Settings";
import LoadingPage from "../LoadingPage";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate()
  const location = useLocation();

  const [isHovered, setHovered] = useState(false);
  const [isSettings,set_isSettings] = useState(false);
  // const [subdetails,setsubdetails] = useState(null);

  const [showpricingPopUpModal, setShowpricingPopUpModal] = React.useState(false);


  let PROFILE_DATA = useSelector((state) => state.SetFullProfile.Fullprofile);

  let NAV_BAR_CONDITION = useSelector(
    (state) => state.SetHideShowNavBarGlobalState.HideShowNavBarGlobalState
  );
  let subscriptions_details = useSelector(
    (state) => state.SetSubscriptionsData.SubscriptionsData
  );
  let TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );


  const handleLinkClick = (link) => {
    setActiveLink(link);
  };


  let url = [
    { name: "Home", link: "" },
    { name: "Project", link: "#project" },
    { name: "Contact", link: "#contact" },
  ];

  const navURL = [
    { title: "Create New Content", link: "/create_new_content" },
    { title: "Dashboard", link: "/" },
    { title: "Chat", link: "/chat" },
    { title: "Projects", link: "/projects" },
    { title: "Recent Added", link: "/documents" },
    { title: "Brand Voice", link: "/brand_voice" }
  ];


  // check the setting open or
  useEffect(() => {
    if(location.pathname.includes("/settings")){
      set_isSettings(true)
    }else{
      set_isSettings(false)
    }
  }, [location]);

  // =======sub deatils======
  // const get_subcribe_data_of_user = async() =>{
  //   const subscribe_detail_data = await fetchData(BACKEND_URL+BACK_END_API_SUBCRIPTION_DETAILS,TOKEN)
  //   try{
  //     dispatch(_save_sub_details_(subscribe_detail_data.data))
  //   }catch(e){}
  // }
  // useEffect(()=>{
  //   get_subcribe_data_of_user()
  // },[])

  return (
    <>
    {isSettings
    ?
      null
    :
    <>
        <div className="z-20 fixed top-0 left-0 right-0 flex items-center justify-between px-6 sm:pl-64 bg-white border-b border-border">
          <div className="p-2 lg:hidden">
            {NAV_BAR_CONDITION ? (
              <>
                <FaTimes
                  size={24}
                  onClick={() => {
                    dispatch(_make_blur_(false));
                    dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                  }}
                />
              </>
            ) : (
              <>
                <FaBars
                  size={24}
                  onClick={() => {
                    dispatch(_make_blur_(true));
                    dispatch(_show_nav_(!NAV_BAR_CONDITION));
                  }}
                />
              </>
            )}
          </div>
          <div className="lg:hidden pl-4">
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/182/285/non_2x/tmp-letter-logo-design-with-polygon-shape-tmp-polygon-and-cube-shape-logo-design-tmp-hexagon-logo-template-white-and-black-colors-tmp-monogram-business-and-real-estate-logo-vector.jpg"
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>
          {/* {subscriptions_details &&
          ?
            
          :
          } */}
            <div className="lg:flex items-center gap-10 ml-auto hidden h-[74px]">
              

              <button className="inline-flex items-center gap-3 text-lg font-bold text-white bg-[#334977] pl-3 pr-6 py-2.5 rounded-md"
                onClick={()=>{
                  navigate("/settings/subscription_plan")
                }}
              >
                <SealCheck classes="w-6 h-6" />
                Upgrade to Pro
              </button>

            </div>
        </div>
        <div className="z-20 hidden sm:block fixed top-0 left-0 h-full w-64 bg-blue-900 border-r border-border">
          <div className="flex items-center h-[74px] border-b border-border">
            <div className="pl-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/182/285/non_2x/tmp-letter-logo-design-with-polygon-shape-tmp-polygon-and-cube-shape-logo-design-tmp-hexagon-logo-template-white-and-black-colors-tmp-monogram-business-and-real-estate-logo-vector.jpg"
                className="w-[50px] h-[50px] rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            


            <div className="flex flex-col ml-2 my-2 p-2 h-[calc(100vh-10rem)] overflow-y-auto scrollbar-none">
              {navURL.map((items, index) => {
                const { title, link, offset } = items;
                return (
                    <div
                      key={"nav_" + index}
                      //margin of menu reduced
                      // className={clsx("flex items-center px-4 py-2", {
                      className={clsx({ "mt-auto": offset })}
                    >
                    <Link
                      to={link}
                      onClick={() => handleLinkClick(title)}
                      className={clsx("flex items-center p-1", {
                        "font-bold text-blue bg-blue/10 rounded-lg":
                          activeLink === title,
                        "mb-6": navURL.length - 1 !== index,
                      })}
                    >
                        <span className="icon w-6 h-6 p-1 inline-flex items-center justify-center">
                          <NavIcons
                            icon={title.toLocaleLowerCase()}
                            fill={activeLink === title ? "#1D43FF" : "#343330"}
                          />
                        </span>
                        <p className="text-[14px] capitalize font-semibold ml-2">
                          {title}
                        </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="fixed bottom-0 w-64 p-4 bg-gray-100">
            <div className="relative">
              {isHovered && (
                <div
                  className="absolute bottom-full left-0 w-60 bg-white border border-border rounded"
                  style={{
                    boxShadow:
                      "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div className="absolute top-2 right-2 w-6 h-6">
                    <AiOutlineCloseCircle
                      onClick={() => {
                        setHovered(!isHovered);
                      }}
                      className="w-full h-full duration-300 hover:text-red-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col justify-center ">
                    <div className="py-4 px-2">
                      <Link
                        to="/settings/general"
                        onClick={() => {
                          setHovered(!isHovered);
                        }}
                      >
                        <div className="py-2 px-3 flex items-center duration-300 hover:text-blue-500 cursor-pointer">
                          <div className="mr-2">
                            <MdSettings size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-helv">Settings</p>
                          </div>
                        </div>
                      </Link>
                      <div className="py-2 px-3 flex items-center duration-300 hover:text-blue-500 cursor-pointer">
                        <div className="mr-2">
                          <MdHelp size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-helv">Help</p>
                        </div>
                      </div>
                      <div className="py-2 px-3 flex items-center duration-300 hover:text-blue-500 cursor-pointer">
                        <div className="mr-2">
                          <MdSearch size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-helv">Search</p>
                        </div>
                      </div>
                      <div className="py-2 px-3 flex items-center duration-300 hover:text-blue-500 cursor-pointer">
                        <div className="mr-2">
                          <FaTrash size={18} />
                        </div>
                        <div>
                          <Link to="/trash">
                            <p className="text-sm font-helv">Trash</p>
                          </Link>
                        </div>
                      </div>
                      <Link
                        className="pt-2 mt-4 block border-t border-border"
                        to="/"
                        onClick={() => {
                          handleLinkClick("logout");
                          localStorage.clear();
                          dispatch(_delete_token_(null));
                          dispatch(_save_survey_(null));
                          dispatch(_delete_user_profile(null));
                          dispatch(_save_details_(null));
                          dispatch(_save_sub_details_(null));
                          window.location.replace("/login");
                        }}
                      >
                        <div
                          className={`py-2 px-3 flex items-center ${
                            activeLink === "logout" ? "text-blue-500" : ""
                          }`}
                        >
                          <div className="mr-2">
                            <MdLogout size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-helv">Logout</p>
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
                <>
                  {subscriptions_details
                  ?
                    <>
                    <div className="mb-4">
                    {subscriptions_details.user.trail_ends
                    ?
                      <div class="flex text-base justify-items-start items-center">
                        <div>
                            <svg class="w-4 h-4 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path d="M14.25,4.77c.44,.96,.67,2.01,.67,3.08,0,1.56-.5,3.08-1.41,4.34-.92,1.26-2.21,2.2-3.7,2.68-1.48,.48-3.08,.48-4.57,0-1.48-.48-2.78-1.42-3.69-2.69S.14,9.4,.14,7.84c0-1.56,.5-3.08,1.41-4.34,.92-1.26,2.21-2.2,3.7-2.68,.45-.15,.93,.1,1.08,.55,.15,.45-.1,.93-.55,1.08-1.14,.37-2.13,1.09-2.84,2.06-.7,.97-1.08,2.14-1.09,3.33,0,1.2,.38,2.37,1.08,3.34,.7,.97,1.7,1.69,2.84,2.06,1.14,.37,2.37,.37,3.51,0,1.14-.37,2.13-1.09,2.84-2.06s1.08-2.14,1.09-3.34c0-.77-.15-1.52-.45-2.22l-1.42,.82c-.19,.11-.43,.1-.61-.03-.18-.13-.27-.34-.24-.56,.23-1.4,.44-2.17,.92-3.45,.1-.25,.36-.4,.62-.36,1.35,.22,2.12,.42,3.45,.92,.21,.08,.35,.27,.37,.49,.02,.22-.09,.43-.28,.54l-1.32,.76Z" fill="#76A9FA" fill-rule="evenodd"></path>
                              <path d="M7.79,8.83c.31-.13,.51-.44,.51-.78l.02-2.55c0-.47-.38-.86-.85-.86-.47,0-.86,.38-.87,.85l-.02,2-1.09,.48c-.43,.19-.63,.69-.44,1.13,.19,.43,.69,.63,1.13,.44l1.6-.7Z" fill="#1C64F2" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                        <span class="text-sm pl-2 mb-2">Free trial ends in {subscriptions_details.user.trail_ends}</span>
                      </div>
                    :
                      null
                    }
                      <div className="mb-3">
                      <button
                        onClick={() => {
                          console.log("pricing")
                          setShowpricingPopUpModal(true)
                        }}
                        className="text-[25px] transition-all duration-200 relative shadow-sm outline-none hover:outline-none  mb-2  flex select-none items-center py-3 text-xs font-medium ring-offset-2 focus:ring-2 text-white justify-center rounded-lg bg-[#334977]  w-full h-[30px] px-2"
                      >
                        <span>View Details</span>
                      </button>
                    </div>
                    </div>
                    </>
                  :
                  <>
                    {/* <div className="mb-4">
                      <button
                        onClick={() => {
                          console.log("pricing");
                        }}
                        className="transition-all duration-200 relative shadow-sm outline-none hover:outline-none  mb-2  flex select-none items-center py-3 text-xs font-medium ring-offset-2 focus:ring-2 text-white justify-center rounded-lg bg-[#334977]  w-full h-[30px] px-5"
                        // className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base  text-white bg-[#334977] ring-0 ring-blue-600 hover:ring-2 active:ring-0 w-full h-[30px]"
                      >
                        <BsCheckCircle className="text-white" size={16} /> Upgrade to
                        Pro
                      </button>
                    </div> */}
                    <LoadingPage />
                    </>
                  }
                </>
              )}
              <div className="bg-gray-100">
                <Button
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    setHovered(!isHovered);
                  }}
                  className="flex items-center"
                >
                  {PROFILE_DATA ? (
                    PROFILE_DATA.profile_pic ? (
                      <img
                        src={PROFILE_DATA.profile_pic}
                        alt="PP"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    ) : (
                      <img
                        src="/default.png"
                        alt="Image"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    )
                  ) : (
                    <img
                      src="/default.png"
                      alt="Image"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  )}
                  <div className="text-left ml-2 w-full">
                    <p className="text-xs font-sans font-bold text-black">
                      {PROFILE_DATA
                        ? PROFILE_DATA.first_name
                            ? PROFILE_DATA.first_name +" " + "Workspace"
                          : "Personal Workspace"
                        : "Personal Workspace"}
                    </p>
                    <p className="text-[10px] font-sans font-bold text-black">
                      Free plan
                    </p>
                  </div>
                  <span className="w-4 h-6 float-right ml-3">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      <g clipPath="url(#clip0_512_3040)">
                        <path
                          d="M10.8909 8.99179C11.0786 8.80401 11.3331 8.69847 11.5986 8.69838C11.864 8.69828 12.1186 8.80365 12.3064 8.99129C12.4942 9.17893 12.5997 9.43347 12.5998 9.69893C12.5999 9.96439 12.4946 10.219 12.3069 10.4068L8.00691 14.7068C7.81938 14.8943 7.56507 14.9996 7.29991 14.9996C7.03475 14.9996 6.78044 14.8943 6.59291 14.7068L2.29291 10.4068C2.10527 10.2189 1.99996 9.96413 2.00015 9.69858C2.00033 9.43303 2.106 9.17843 2.29391 8.99079C2.48182 8.80315 2.73657 8.69783 3.00212 8.69802C3.26767 8.69821 3.52227 8.80388 3.70991 8.99179L7.29991 12.5828L10.8909 8.99179ZM10.8909 5.00779L7.29991 1.41679L3.70891 5.00779C3.52127 5.19556 3.26672 5.3011 3.00126 5.3012C2.73581 5.30129 2.48118 5.19593 2.29341 5.00829C2.10564 4.82065 2.00009 4.5661 2 4.30064C1.99991 4.03518 2.10527 3.78056 2.29291 3.59279L6.59291 -0.707214C6.78044 -0.894685 7.03475 -1 7.29991 -1C7.56507 -1 7.81938 -0.894685 8.00691 -0.707214L12.3069 3.59279C12.3998 3.68576 12.4735 3.79613 12.5238 3.91758C12.574 4.03904 12.5999 4.1692 12.5998 4.30064C12.5998 4.43208 12.5738 4.56223 12.5235 4.68364C12.4732 4.80506 12.3994 4.91538 12.3064 5.00829C12.2134 5.1012 12.1031 5.17488 11.9816 5.22514C11.8602 5.2754 11.73 5.30124 11.5986 5.3012C11.4671 5.30115 11.337 5.27521 11.2156 5.22487C11.0941 5.17453 10.9838 5.10076 10.8909 5.00779Z"
                          fill="#36464E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_512_3040">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {NAV_BAR_CONDITION ? (
          <>
            <div
              className={`${
                NAV_BAR_CONDITION ? "" : "-translate-x-full"
              } absolute left-0 w-64 h-full shadow-2xl bg-white  transform  z-[100]  duration-500 `}
              // className="mt-[67px] fixed left-0 top-0 h-full w-[100%] shadow-2xl bg-white"
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-center mt-1">
                  <div className="shadow-sm">
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
                    <img
                      src="up_down.png"
                      className="cursor-pointer font-sans absolute mt-7 w-[20px] h-[20px] ml-[12rem]"
                    />
                    <input
                      onClick={() => {
                        console.log("change personal");
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
                  <Link
                    to="/"
                    onClick={() => {
                      handleLinkClick("dashboard");
                      dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                    }}
                  >
                    <div
                      className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${
                        activeLink === "dashboard"
                          ? "shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold"
                          : ""
                      }`}
                    >
                      {/* <MdOutlineHome size={25}/> */}
                      <svg
                        width="18"
                        height="26"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5153 7.72831L10.0153 0.652058C10.0116 0.648859 10.0082 0.645414 10.005 0.641745C9.72887 0.39062 9.36903 0.251465 8.99578 0.251465C8.62253 0.251465 8.2627 0.39062 7.98656 0.641745L7.97625 0.652058L0.484687 7.72831C0.331873 7.86883 0.209891 8.03954 0.126461 8.22964C0.0430305 8.41974 -3.15402e-05 8.62508 1.73323e-08 8.83268V17.4999C1.73323e-08 17.8977 0.158035 18.2792 0.43934 18.5605C0.720644 18.8418 1.10218 18.9999 1.5 18.9999H6C6.39782 18.9999 6.77936 18.8418 7.06066 18.5605C7.34196 18.2792 7.5 17.8977 7.5 17.4999V12.9999H10.5V17.4999C10.5 17.8977 10.658 18.2792 10.9393 18.5605C11.2206 18.8418 11.6022 18.9999 12 18.9999H16.5C16.8978 18.9999 17.2794 18.8418 17.5607 18.5605C17.842 18.2792 18 17.8977 18 17.4999V8.83268C18 8.62508 17.957 8.41974 17.8735 8.22964C17.7901 8.03954 17.6681 7.86883 17.5153 7.72831ZM16.5 17.4999H12V12.9999C12 12.602 11.842 12.2205 11.5607 11.9392C11.2794 11.6579 10.8978 11.4999 10.5 11.4999H7.5C7.10218 11.4999 6.72064 11.6579 6.43934 11.9392C6.15804 12.2205 6 12.602 6 12.9999V17.4999H1.5V8.83268L1.51031 8.82331L9 1.74987L16.4906 8.82143L16.5009 8.83081L16.5 17.4999Z"
                          fill="#343330"
                        />
                      </svg>

                      <p className="text-sm mt-1 ml-[10px] font-helv">
                        Dashboard
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/template"
                    onClick={() => {
                      handleLinkClick("template");
                      dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                    }}
                  >
                    <div
                      className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${
                        activeLink === "template"
                          ? "shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold"
                          : ""
                      }`}
                    >
                      {/* <CgTemplate size={25}/> */}
                      <svg
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

                      <p className="text-sm  ml-[10px] font-helv">Template</p>
                    </div>
                  </Link>
                  <Link
                    to="/chat"
                    onClick={() => {
                      handleLinkClick("chat");
                      dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                    }}
                  >
                    <div
                      className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${
                        activeLink === "chat"
                          ? "shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold"
                          : ""
                      }`}
                    >
                      {/* <BsChat size={25}/> */}
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.7299 15.5623C21.2589 14.4871 21.5225 13.3008 21.4987 12.1028C21.4749 10.9047 21.1644 9.72984 20.5932 8.67647C20.022 7.6231 19.2067 6.72193 18.2156 6.04843C17.2245 5.37493 16.0865 4.94871 14.8968 4.80545C14.5023 3.8857 13.9276 3.05421 13.2067 2.35998C12.4859 1.66575 11.6333 1.12282 10.6994 0.763179C9.76539 0.403539 8.76889 0.234462 7.76857 0.265911C6.76825 0.29736 5.78434 0.528698 4.87482 0.946295C3.96529 1.36389 3.14854 1.9593 2.47269 2.69744C1.79683 3.43558 1.27555 4.30153 0.939551 5.24425C0.603551 6.18698 0.459629 7.18742 0.516265 8.18663C0.572901 9.18584 0.828949 10.1636 1.26932 11.0623L0.551198 13.5767C0.487117 13.8016 0.484309 14.0396 0.543067 14.266C0.601824 14.4924 0.720012 14.699 0.885399 14.8644C1.05079 15.0298 1.25736 15.148 1.48376 15.2067C1.71015 15.2655 1.94813 15.2627 2.17307 15.1986L4.68745 14.4805C5.44618 14.853 6.26232 15.0948 7.10151 15.1958C7.50154 16.133 8.08836 16.9788 8.82615 17.6817C9.56394 18.3846 10.4372 18.9298 11.3927 19.284C12.3482 19.6381 13.3658 19.7939 14.3835 19.7417C15.4012 19.6895 16.3976 19.4305 17.3118 18.9805L19.8262 19.6986C20.0511 19.7627 20.2891 19.7655 20.5155 19.7067C20.7419 19.648 20.9485 19.5298 21.1139 19.3644C21.2793 19.199 21.3974 18.9924 21.4562 18.766C21.515 18.5396 21.5122 18.3016 21.4481 18.0767L20.7299 15.5623ZM19.2056 15.688L19.9134 18.1639L17.4374 17.4561C17.2488 17.403 17.0469 17.4259 16.8749 17.5198C15.4924 18.272 13.8699 18.4514 12.3564 18.0194C10.843 17.5873 9.5596 16.5785 8.78245 15.2098C9.80943 15.1029 10.8032 14.7848 11.7015 14.2757C12.5998 13.7665 13.3831 13.0771 14.0024 12.2509C14.6216 11.4247 15.0635 10.4794 15.3002 9.47436C15.5368 8.46931 15.5633 7.4262 15.3778 6.41045C16.2765 6.62225 17.1142 7.03861 17.8256 7.62711C18.5371 8.2156 19.1032 8.96037 19.4798 9.80341C19.8563 10.6465 20.0332 11.565 19.9967 12.4876C19.9603 13.4102 19.7113 14.312 19.2693 15.1226C19.1747 15.2954 19.1518 15.4985 19.2056 15.688Z"
                          fill="#1D43FF"
                        />
                      </svg>

                      <p className="text-sm  ml-[10px] font-helv">Chat</p>
                    </div>
                  </Link>
                  <Link
                    to="/documents"
                    onClick={() => {
                      handleLinkClick("documents");
                      dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                    }}
                  >
                    <div
                      className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${
                        activeLink === "documents"
                          ? "shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold"
                          : ""
                      }`}
                    >
                      {/* <CgFileDocument size={25}/> */}
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.0306 5.71938L11.7806 0.469375C11.7109 0.399749 11.6282 0.344539 11.5371 0.306898C11.4461 0.269257 11.3485 0.249923 11.25 0.25H2.25C1.85218 0.25 1.47064 0.408035 1.18934 0.68934C0.908035 0.970645 0.75 1.35218 0.75 1.75V18.25C0.75 18.6478 0.908035 19.0294 1.18934 19.3107C1.47064 19.592 1.85218 19.75 2.25 19.75H15.75C16.1478 19.75 16.5294 19.592 16.8107 19.3107C17.092 19.0294 17.25 18.6478 17.25 18.25V6.25C17.2501 6.15148 17.2307 6.05391 17.1931 5.96286C17.1555 5.87182 17.1003 5.78908 17.0306 5.71938ZM12 2.81031L14.6897 5.5H12V2.81031ZM15.75 18.25H2.25V1.75H10.5V6.25C10.5 6.44891 10.579 6.63968 10.7197 6.78033C10.8603 6.92098 11.0511 7 11.25 7H15.75V18.25Z"
                          fill="#343330"
                        />
                      </svg>

                      <p className="text-sm  ml-[10px] font-helv">Documents</p>
                    </div>
                  </Link>
                  <Link
                    to="/recipes"
                    onClick={() => {
                      handleLinkClick("recipes");
                      dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                    }}
                  >
                    <div
                      className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${
                        activeLink === "recipes"
                          ? "shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold"
                          : ""
                      }`}
                    >
                      {/* <BsReceipt size={25}/> */}
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.46899 7.53055L0.468988 4.53055C0.399256 4.4609 0.343937 4.37818 0.306193 4.28713C0.26845 4.19609 0.249023 4.09849 0.249023 3.99993C0.249023 3.90137 0.26845 3.80377 0.306193 3.71272C0.343937 3.62167 0.399256 3.53896 0.468988 3.4693L3.46899 0.469304C3.60972 0.328573 3.80059 0.249512 3.99961 0.249512C4.19864 0.249512 4.38951 0.328573 4.53024 0.469304C4.67097 0.610034 4.75003 0.800906 4.75003 0.999929C4.75003 1.19895 4.67097 1.38982 4.53024 1.53055L2.05993 3.99993L4.53024 6.4693C4.67097 6.61003 4.75003 6.80091 4.75003 6.99993C4.75003 7.19895 4.67097 7.38982 4.53024 7.53055C4.38951 7.67128 4.19864 7.75035 3.99961 7.75035C3.80059 7.75035 3.60972 7.67128 3.46899 7.53055ZM7.21899 7.53055C7.28864 7.60029 7.37136 7.65561 7.46241 7.69335C7.55346 7.73109 7.65105 7.75052 7.74961 7.75052C7.84818 7.75052 7.94577 7.73109 8.03682 7.69335C8.12787 7.65561 8.21058 7.60029 8.28024 7.53055L11.2802 4.53055C11.35 4.4609 11.4053 4.37818 11.443 4.28713C11.4808 4.19609 11.5002 4.09849 11.5002 3.99993C11.5002 3.90137 11.4808 3.80377 11.443 3.71272C11.4053 3.62167 11.35 3.53896 11.2802 3.4693L8.28024 0.469304C8.13951 0.328573 7.94864 0.249512 7.74961 0.249512C7.55059 0.249512 7.35972 0.328573 7.21899 0.469304C7.07826 0.610034 6.9992 0.800906 6.9992 0.999929C6.9992 1.19895 7.07826 1.38982 7.21899 1.53055L9.6893 3.99993L7.21899 6.4693C7.14926 6.53896 7.09394 6.62167 7.05619 6.71272C7.01845 6.80377 6.99902 6.90137 6.99902 6.99993C6.99902 7.09849 7.01845 7.19609 7.05619 7.28713C7.09394 7.37818 7.14926 7.4609 7.21899 7.53055ZM16.7496 1.74993H14.4996C14.3007 1.74993 14.1099 1.82895 13.9693 1.9696C13.8286 2.11025 13.7496 2.30102 13.7496 2.49993C13.7496 2.69884 13.8286 2.88961 13.9693 3.03026C14.1099 3.17091 14.3007 3.24993 14.4996 3.24993H16.7496V16.7499H3.24961V10.7499C3.24961 10.551 3.1706 10.3603 3.02994 10.2196C2.88929 10.0789 2.69853 9.99993 2.49961 9.99993C2.3007 9.99993 2.10994 10.0789 1.96928 10.2196C1.82863 10.3603 1.74961 10.551 1.74961 10.7499V16.7499C1.74961 17.1478 1.90765 17.5293 2.18895 17.8106C2.47026 18.0919 2.85179 18.2499 3.24961 18.2499H16.7496C17.1474 18.2499 17.529 18.0919 17.8103 17.8106C18.0916 17.5293 18.2496 17.1478 18.2496 16.7499V3.24993C18.2496 2.8521 18.0916 2.47057 17.8103 2.18927C17.529 1.90796 17.1474 1.74993 16.7496 1.74993Z"
                          fill="#343330"
                        />
                      </svg>

                      <p className="text-sm  ml-[10px] font-helv">Recipes</p>
                    </div>
                  </Link>
                  <Link
                    to="/art"
                    onClick={() => {
                      handleLinkClick("art");
                      dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                    }}
                  >
                    <div
                      className={`flex p-[10px] mb-4 mt-1 mr-2 ml-2   ${
                        activeLink === "art"
                          ? "shadow-sm text-blue-800 bg-slate-300  rounded-[10px] font-bold"
                          : ""
                      }`}
                    >
                      {/* <MdDocumentScanner size={25}/> */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.37467 11.8337C9.3062 11.7309 9.21338 11.6465 9.10445 11.5882C8.99552 11.5298 8.87387 11.4993 8.75029 11.4993C8.62672 11.4993 8.50506 11.5298 8.39613 11.5882C8.2872 11.6465 8.19438 11.7309 8.12592 11.8337L6.17123 14.7672L5.25623 13.3441C5.18832 13.2384 5.09497 13.1515 4.98473 13.0913C4.87449 13.0311 4.75089 12.9995 4.62529 12.9995C4.49969 12.9995 4.3761 13.0311 4.26586 13.0913C4.15562 13.1515 4.06226 13.2384 3.99435 13.3441L0.619354 18.5941C0.54642 18.7074 0.50536 18.8382 0.50049 18.9729C0.49562 19.1076 0.527121 19.241 0.59168 19.3593C0.65624 19.4776 0.751473 19.5763 0.867369 19.6451C0.983264 19.7138 1.11554 19.7501 1.25029 19.75H13.2503C13.3861 19.7501 13.5194 19.7133 13.6359 19.6435C13.7525 19.5738 13.8479 19.4737 13.912 19.354C13.9761 19.2343 14.0065 19.0994 13.9999 18.9637C13.9933 18.8281 13.95 18.6967 13.8747 18.5837L9.37467 11.8337ZM2.62373 18.25L4.62529 15.1366L5.5281 16.5428C5.59544 16.6476 5.68783 16.734 5.79692 16.7942C5.90602 16.8544 6.02839 16.8864 6.15297 16.8874C6.27756 16.8885 6.40043 16.8584 6.5105 16.8001C6.62057 16.7417 6.71437 16.6568 6.78342 16.5531L8.75217 13.6028L11.8487 18.25H2.62373ZM19.03 5.71937L13.78 0.469375C13.6394 0.328988 13.4489 0.250092 13.2503 0.25H4.25029C3.85247 0.25 3.47094 0.408035 3.18963 0.68934C2.90833 0.970644 2.75029 1.35218 2.75029 1.75V10.75C2.75029 10.9489 2.82931 11.1397 2.96996 11.2803C3.11061 11.421 3.30138 11.5 3.50029 11.5C3.6992 11.5 3.88997 11.421 4.03062 11.2803C4.17127 11.1397 4.25029 10.9489 4.25029 10.75V1.75H12.5003V6.25C12.5003 6.44891 12.5793 6.63968 12.72 6.78033C12.8606 6.92098 13.0514 7 13.2503 7H17.7503V18.25H17.0003C16.8014 18.25 16.6106 18.329 16.47 18.4697C16.3293 18.6103 16.2503 18.8011 16.2503 19C16.2503 19.1989 16.3293 19.3897 16.47 19.5303C16.6106 19.671 16.8014 19.75 17.0003 19.75H17.7503C18.1481 19.75 18.5296 19.592 18.811 19.3107C19.0923 19.0294 19.2503 18.6478 19.2503 18.25V6.25C19.2504 6.15148 19.231 6.05391 19.1934 5.96286C19.1558 5.87182 19.1005 5.78908 19.0309 5.71937H19.03ZM14.0003 2.81031L16.69 5.5H14.0003V2.81031Z"
                          fill="#343330"
                        />
                      </svg>

                      <p className="text-sm  ml-[10px] font-helv">Art</p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="fixed bottom-0 w-64 p-4 bg-gray-100">
                <div className="relative">
                  {isHovered && (
                    <div
                      className="absolute bottom-full left-0 w-64 bg-gray-100 border border-border rounded"
                      style={{
                        boxShadow:
                          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      <AiOutlineCloseCircle
                        onClick={() => {
                          setHovered(!isHovered);
                          dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                        }}
                        className="w-12 h-6 float-right mt-2 hover:text-red-500 cursor-pointer"
                      />

                      <div className="flex flex-col items-center justify-center ">
                        <div className="mt-[5vh] ">
                          <Link
                            to="/profile"
                            onClick={() => {
                              setHovered(!isHovered);
                              dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                            }}
                          >
                            <div className="flex mb-4  hover:text-blue-500 cursor-pointer">
                              <div className="mr-2">
                                <MdSettings size={25} />
                              </div>
                              <div>
                                <p className="text-sm  ml-[10px] font-helv">
                                  Settings
                                </p>
                              </div>
                            </div>
                          </Link>
                          <div className="flex mb-4  hover:text-blue-500 cursor-pointer">
                            <div className="mr-2">
                              <MdHelp size={25} />
                            </div>
                            <div>
                              <p className="text-sm  ml-[10px] font-helv">Help</p>
                            </div>
                          </div>
                          <div className="flex mb-4  hover:text-blue-500 cursor-pointer">
                            <div className="mr-2">
                              <MdSearch size={25} />
                            </div>
                            <div>
                              <p className="text-sm  ml-[10px] font-helv">
                                Search
                              </p>
                            </div>
                          </div>
                          <div className="flex mb-4  hover:text-blue-500 cursor-pointer">
                            <div className="mr-2">
                              <FaTrash size={20} />
                            </div>
                            <div>
                              <Link to="/trash">
                                <p className="text-sm  ml-[10px] font-helv">
                                  Trash
                                </p>
                              </Link>
                            </div>
                          </div>

                          <Link
                            to="/logout"
                            onClick={() => {
                              dispatch(_hide_nav_(!NAV_BAR_CONDITION));
                              handleLinkClick("logout");
                              localStorage.clear();
                              dispatch(_delete_token_(null));
                              dispatch(_save_survey_(null));
                              dispatch(_delete_user_profile(null));
                            }}
                          >
                            <div
                              className={`flex mt-7 ${
                                activeLink === "logout" ? "text-blue-500" : ""
                              }`}
                            >
                              <div className="mr-2">
                                <MdLogout size={25} />
                              </div>
                              <div>
                                <p className="text-sm  ml-[10px] font-helv">
                                  Logout
                                </p>
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
                    <div className="mb-4">
                      <button
                        onClick={() => {
                          console.log("pricing");
                        }}
                        className="transition-all duration-200 bg-[#334977] mb-2 focus:outline-none flex select-none items-center py-3 text-xs font-medium ring-offset-2 focus:ring-2 text-white justify-center rounded-lg  hover:bg-purple-700 w-full h-[30px] px-5"
                      >
                        <BsCheckCircle
                          className="text-white ml-2 mr-3"
                          size={16}
                        />{" "}
                        Upgrade to Pro
                      </button>
                    </div>
                  )}
                  <div className="bg-gray-100">
                    <Button
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        setHovered(!isHovered);
                      }}
                      className="bg-gray-100"
                    >
                      {PROFILE_DATA ? (
                        PROFILE_DATA.profile_pic ? (
                          <img
                            src={PROFILE_DATA.profile_pic}
                            alt="PP"
                            className="w-[40px] h-[40px] rounded-full"
                          />
                        ) : (
                          <img
                            src="default.png"
                            alt="Image"
                            className="w-[40px] h-[40px] rounded-full"
                          />
                        )
                      ) : (
                        <img
                          src="default.png"
                          alt="Image"
                          className="w-[40px] h-[40px] rounded-full"
                        />
                      )}
                      <p className="mt-1 ml-3 text-[12px] font-sans font-bold text-black">
                        {PROFILE_DATA
                          ? PROFILE_DATA.first_name || PROFILE_DATA.last_name
                            ? PROFILE_DATA.last_name
                              ? PROFILE_DATA.first_name +
                                " " +
                                PROFILE_DATA.last_name
                              : PROFILE_DATA.first_name + " "
                            : "Personal Workspace"
                          : "Personal Workspace"}
                      </p>
                      <img
                        src="up_down.png"
                        className="w-[20px] h-[20px] ml-[3.7rem]"
                      />
                    </Button>
                    <p className="ml-[4.5rem] text-[10px] font-sans font-bold text-black">
                      Free plan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* </div> */}


          </>
        ) : null}
      </>
    }
    {showpricingPopUpModal ? (
        <>
        <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6">
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                  <div className="mb-4">
                      <div class="flex text-base justify-items-start items-center">
                        <div>
                            <svg class="w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path d="M14.25,4.77c.44,.96,.67,2.01,.67,3.08,0,1.56-.5,3.08-1.41,4.34-.92,1.26-2.21,2.2-3.7,2.68-1.48,.48-3.08,.48-4.57,0-1.48-.48-2.78-1.42-3.69-2.69S.14,9.4,.14,7.84c0-1.56,.5-3.08,1.41-4.34,.92-1.26,2.21-2.2,3.7-2.68,.45-.15,.93,.1,1.08,.55,.15,.45-.1,.93-.55,1.08-1.14,.37-2.13,1.09-2.84,2.06-.7,.97-1.08,2.14-1.09,3.33,0,1.2,.38,2.37,1.08,3.34,.7,.97,1.7,1.69,2.84,2.06,1.14,.37,2.37,.37,3.51,0,1.14-.37,2.13-1.09,2.84-2.06s1.08-2.14,1.09-3.34c0-.77-.15-1.52-.45-2.22l-1.42,.82c-.19,.11-.43,.1-.61-.03-.18-.13-.27-.34-.24-.56,.23-1.4,.44-2.17,.92-3.45,.1-.25,.36-.4,.62-.36,1.35,.22,2.12,.42,3.45,.92,.21,.08,.35,.27,.37,.49,.02,.22-.09,.43-.28,.54l-1.32,.76Z" fill="#76A9FA" fill-rule="evenodd"></path>
                              <path d="M7.79,8.83c.31-.13,.51-.44,.51-.78l.02-2.55c0-.47-.38-.86-.85-.86-.47,0-.86,.38-.87,.85l-.02,2-1.09,.48c-.43,.19-.63,.69-.44,1.13,.19,.43,.69,.63,1.13,.44l1.6-.7Z" fill="#1C64F2" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                        <span class="text-lg pl-2">Free trial ends in {subscriptions_details.user.trail_ends}</span>
                      </div>
                    </div>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowpricingPopUpModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div>
            {/* ==================the message ============= */}

        <div className="w-[90%] m-auto p-8">
            <div class="flex text-base mb-2 mt-2 justify-items-start items-center space-x-2">
               <div>
               <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" x="0px" y="0px"><g data-name="01"><path d="M18.81,4.83a3.08,3.08,0,0,0-5.63,0L3.73,23.77a3.82,3.82,0,0,0,.16,3.69A3.13,3.13,0,0,0,6.54,29H25.46a3.13,3.13,0,0,0,2.65-1.54,3.82,3.82,0,0,0,.16-3.69Zm7.59,21.58a1.14,1.14,0,0,1-1,.59H6.54a1.14,1.14,0,0,1-1-.59,1.81,1.81,0,0,1-.07-1.75L15,5.72a1.09,1.09,0,0,1,2,0l9.46,18.94A1.81,1.81,0,0,1,26.41,26.41ZM16,20a3,3,0,1,0,3,3A3,3,0,0,0,16,20Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,16,24Zm-2.1-6.88a2.12,2.12,0,0,0,4.2,0l.76-4.81A2.12,2.12,0,0,0,16.75,10h-1.5a2.12,2.12,0,0,0-1.58.71,2.14,2.14,0,0,0-.52,1.69ZM15.25,12h1.5l.12.08-.76,4.81c0,.12-.21.17-.24,0l-.75-4.77-1,.16Z"/></g></svg>
               </div>
               <p class="text-sm font-normal text-gray-900">
               You are currently subscribed to the {subscriptions_details.plan} plan, 
               which provides you with unlimited word access. Once your trial period concludes, 
               you will be automatically charged the specified amount for one {subscriptions_details.user.subscription_type} continued usage of the tool.
               </p>
            </div>
            <div class="flex flex-col mb-5 mt-5 w-full border-b border-gray-200 pb-4 space-y-1">
               <div class="text-gray-600 text-xs font-semibold uppercase"> subsciption type</div>
               <div class="flex flex-row justify-between">
                  <div class="text-gray-900">{subscriptions_details.user.plan}</div>
                  <div class="text-sm text-gray-600">
                  $
                  {subscriptions_details.user.plan=="starter" &&  subscriptions_details.user.subscription_type=="monthly"
                  ?
                    subscriptions_details.charge_description.monthly_starter
                  :
                    null
                  }
                  {subscriptions_details.user.plan=="starter" && subscriptions_details.user.subscription_type=="annually"
                  ?
                    subscriptions_details.charge_description.annaully_starter
                  :
                    null
                  }
                  {subscriptions_details.user.plan=="premium" && subscriptions_details.user.subscription_type=="monthly"
                  ?
                    subscriptions_details.charge_description.monthly_premium_mode
                  :
                    null
                  }
                  {subscriptions_details.user.plan=="premium" && subscriptions_details.user.subscription_type=="annually"
                  ?
                    subscriptions_details.charge_description.annaully_premium_mode
                  :
                    null
                  }
                  /month</div>
               </div>
            </div>
            <div class="flex flex-col mb-2 mt-2 w-full border-b border-gray-200 pb-4 space-y-1">
               <div class="flex flex-row justify-between">
                  <span class="text-xl font-bold text-gray-900 w-3/5">Plan total</span>
                  <div class="flex flex-col items-end md:flex-row space-x-2"><span class="text-lg text-green-600 font-bold">$
                  {subscriptions_details.user.plan=="starter" &&  subscriptions_details.user.subscription_type=="monthly"
                  ?
                    subscriptions_details.charge_description.monthly_starter
                  :
                    null
                  }
                  {subscriptions_details.user.plan=="starter" && subscriptions_details.user.subscription_type=="annually"
                  ?
                    subscriptions_details.charge_description.annaully_starter
                  :
                    null
                  }
                  {subscriptions_details.user.plan=="premium" && subscriptions_details.user.subscription_type=="monthly"
                  ?
                    subscriptions_details.charge_description.monthly_premium_mode
                  :
                    null
                  }
                  {subscriptions_details.user.plan=="premium" && subscriptions_details.user.subscription_type=="annually"
                  ?
                    subscriptions_details.charge_description.annaully_premium_mode
                  :
                    null
                  }*</span></div>
               </div>
            </div>
        </div>
            {/* ==================the message ============= */}


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowpricingPopUpModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowpricingPopUpModal(false)
                        navigate("/settings/subscription_plan")
                      }}
                  >
                    Change Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">
          </div>
          </div>
          </div>
      </>
      ) : null}
    </>
  );
};

export default Navbar;
