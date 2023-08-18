import React ,{ useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useNavigate } from 'react-router-dom';
import { fetchData, postData } from '../../../apis/apiService';
import { BACK_END_API_PROFILE,BACK_END_API_SUBCRIPTION_CHARGE,BACK_END_API_SUBCRIPTION_DIRECT,BACKEND_URL,BACK_END_API_SUBSCRIBE_CHECK,BACK_END_API_SUBSCRIBE_USER } from '../../../apis/urls';
import LoadingPage from '../../LoadingPage';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { _delete_token_ } from '../../../features/AuthenticationToken';
import { _save_survey_ } from "../../../features/ThreeSteps";
import { _delete_user_profile } from "../../../features/Fullprofile";
import { _save_details_ } from "../../../features/Subscriptions";
import { _chosen_workspace_id_ } from "../../../features/ChosenWorkspaceId";
import { _save_sub_details_ } from "../../../features/SubscriptionsData";
import ChangeWorkSpace from '../../pages/ChangeWorkSpace';




import {
    MdLogout,
  } from "react-icons/md";


const ISwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5
        }
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff"
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600]
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3
      }
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500
      })
    }
  }));

const Subscription = (props) => {

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();


    let subscriptions_details = useSelector(
        (state) => state.SetSubscriptionsData.SubscriptionsData
      );

    // console.log(" subscriptions_details :",subscriptions_details)
    
    const [isCheckedPlan, setIsCheckedPlan] = useState(false);
    const [isRadioChecked, setisRadioChecked] = useState(true);
    const [startbtnLoading, setstartbtnLoading] = useState(false);
    
    const [monthly_or_annyally_check, setmonthly_or_annyally_check] = useState("monthly");
    const [plan_subscribe, setplan_subscribe] = useState("starter");
    
    const [all_cost_data,setall_cost_data] = useState([{
        plan:"starter",
        actual_plan:"starter",
        cost:78,
        monthly_anually:"monthly",
        plan_time:"monthly"
    }]);
    
    const notifyerror = (message) => toast.error(message);
    const notifysucces = (message) => toast.success(message);
    // const notifymessage = (message) =>
    // toast(message, {
    //   icon: "🔔",
    //   style: {
    //     borderRadius: "10px",
    //     background: "#333",
    //     color: "#fff",
    //   },
    // });


    const monthly_plan=["Jasper Chat","50+ AI templates","Browser extension","Support for 30+ languages","Email support"]
    const annually_plan=["Up to 5 users","Automated workflows","Google Docs style editor","Compose & command features","Live chat users"]
    const enterprise_plan=["Collaborate with more than 5 users","Tailored AI Brand Voice","API access","Personalized onboarding & training","Dedicated accounnt manager"]


      const request_subcription = async() =>{
        setstartbtnLoading(true)
        const formData = {
          "plan":all_cost_data[0]["actual_plan"],
          "monthly_annually":all_cost_data[0]["monthly_anually"],
          "plan_time":all_cost_data[0]["plan_time"],
        }

        // console.log(formData)
        // return true
        const resp = await postData(formData,BACKEND_URL+BACK_END_API_SUBCRIPTION_DIRECT,props.AUTH_TOKEN)

        if(resp.status==200){
          setstartbtnLoading(false)
          try{
            window.location.replace(resp.data.message.url);
          }catch(e){
            notifyerror("something went wrong refresh the page")
          }
        }else{
          // navigate("/")
          notifyerror("something went wrong refresh the page")
          setstartbtnLoading(false)
        }
      }


      const handleCheckboxChangePlan = (event,check_month_or_annually,plan_subscribe) => {
          setIsCheckedPlan(event.target.checked);
          if(isCheckedPlan){
                if(plan_subscribe=="starter" && check_month_or_annually=="monthly"){
                    setall_cost_data(
                        [{
                            plan:"starter",
                            actual_plan:"starter",
                            cost:subscriptions_details.charge_description.monthly_starter,
                            monthly_anually:"monthly",
                            plan_time:"monthly"
                        }]
                    )
                }else{
                    setall_cost_data(
                        [{
                            plan:"premium",
                            actual_plan:"premium",
                            cost:subscriptions_details.charge_description.monthly_premium_mode,
                            monthly_anually:"monthly",
                            plan_time:"monthly"
                        }]
                    )
                }
            }else{
                
                if(plan_subscribe=="starter"){
                    setall_cost_data(
                        [{
                            plan:"starter",
                            actual_plan:"starter",
                            cost:subscriptions_details.charge_description.annaully_starter,
                            monthly_anually:"annually",
                            plan_time:"yearly"
                        }]
                    )
                }
                if(plan_subscribe=="premium"){
                    setall_cost_data(
                        [{
                            plan:"premium",
                            actual_plan:"premium",
                            cost:subscriptions_details.charge_description.annaully_premium_mode,
                            monthly_anually:"annually",
                            plan_time:"yearly"
                        }]
                    )
                }
          }
      };



    //   ======upgrade plan redirect if trail finish=======
    const [switch_workspace,setswitch_workspace] = useState(false);


    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get('message');

    useEffect(()=>{
        if(message=="upgrade"){
            // notifymessage("Upgrade your plan")
        }
    },[message])


  return (
    <>
      <>
        
      <div className='m-auto'>

          <div
            className="w-full h-full bg-red-500 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full h-full bg-slate-500">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                {/*body*/}
                <div>
            {/* ==================the message ============= */}
            <div className="min-h-screen min-w-screen bg-gray-50 pb-[150px]">
            {message=="upgrade"
            ?
                <>
                <div className='flex'>
                    <div className='mt-2'>
                        <button
                                className='bg-[#223358] rounded-r-sm ml-2'
                                onClick={() => {
                                    setswitch_workspace(true)
                                }}
                                >
                            <div
                                className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm text-white bg-[#334977] ring-1 ring-gray-200 hover:ring-2 active:ring-1"                            >
                                <div>
                                <p className="text-sm font-helv">Switch Work Space</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    <Link
                    className="pt-2 ml-4 block  border-border w-[80px]"
                    to="/"
                    onClick={() => {
                        localStorage.clear();
                        dispatch(_delete_token_(null));
                        dispatch(_save_survey_(null));
                        dispatch(_delete_user_profile(null));
                        dispatch(_save_details_(null));
                        dispatch(_save_sub_details_(null));
                        window.location.replace("/login");
                    }}
                    >
                    <div className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm text-white bg-[#334977] ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <div>
                        <p className="text-sm font-helv">Logout</p>
                        </div>
                    </div>
                    </Link>
                </div>

                </>
            :
                <>
                    <div className="flex jusitfy-start pt-10 pb-5 px-5 lg:px-10">
                        <button type="button" 
                        // className="transition-all duration-200 relative font-semibold outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base text-white bg-[#334977] active:to-blue-700 w-full shadow-sm"
                        className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm text-white bg-[#334977] ring-1 ring-gray-200 hover:ring-2 active:ring-1"
                        onClick={()=>{
                            navigate("/settings/Billing")
                        }}>
                            <span>Go Back</span>
                        </button>
                    </div>
                </>
            }
            {switch_workspace
                ?
                    <>
                    {/* ====================close switch workspace================ */}
                        <ChangeWorkSpace/>
                    {/* ====================close switch workspace================ */}
                    </>
                :
                    null
                }
                    <div className="flex justify-center w-full p-5">
                        <div className="md:grid md:grid-cols-3 md:gap-6 max-w-[1100px]">
                            <div className="md:col-span-2 mb-5">
                                <div className="rounded shadow bg-white border border-gray-300">
                                <div className="flex justify-between p-5 border-b border-gray-300 text-lg text-gray-600 font-medium transition-all items-center">
                                    <div>Choose your plan</div>
                                    <div className="flex items-center">
                                        <div className="hidden ml-2"><button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-2 py-1 text-xs bg-white bg-opacity-20 text-gray-600 ring-1 ring-gray-50 active:ring-1 hover:ring-gray-100 hover:ring-2 active:ring-gray-300 hover:text-gray-800 active:text-gray-800"><span className="flex items-center justify-center mx-auto space-x-2 select-none">Edit</span></button></div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="grid grid-cols-12 gap-6 p-5 hover:bg-gray-50 transition-all hover:cursor-pointer bg-gray-50"
                                    onClick={()=>{

                                        if(isCheckedPlan){
                                            setall_cost_data(
                                                [{
                                                    plan:"starter",
                                                    actual_plan:"starter",
                                                    cost:subscriptions_details.charge_description.annaully_starter,
                                                    monthly_anually:"annually",
                                                    plan_time:"yearly"
                                                }]
                                            )
                                            setmonthly_or_annyally_check("annually")
                                            setplan_subscribe("starter")
                                            // console.log(subscriptions_details.charge_description.annaully_starter)
                                        }else{
                                            setall_cost_data(
                                                [{
                                                    plan:"starter",
                                                    actual_plan:"starter",
                                                    cost:subscriptions_details.charge_description.monthly_starter,
                                                    monthly_anually:"monthly",
                                                    plan_time:"monthly"
                                                }]
                                            )
                                            setmonthly_or_annyally_check("monthly")
                                            setplan_subscribe("starter")

                                            // console.log(subscriptions_details.charge_description.monthly_starter)
                                        }
                                        setisRadioChecked(true)
                                    }}>
                                        <div className="col-span-1 text-center">
                                        
                                        {isRadioChecked
                                        ?
                                            <input className="form-radio focus:ring-indigo-500 w-4 sm:w-6 h-4 sm:h-6 text-indigo-600 border-gray-300" type="radio" name="plan" checked/>
                                        :   
                                            <input className="form-radio focus:ring-indigo-500 w-4 sm:w-6 h-4 sm:h-6 text-indigo-600 border-gray-300" type="radio" name="plan"/>
                                        }

                                        </div>
                                        <div className="col-span-7">
                                            <div className="flex justify-start">
                                            <div className="text-xl mb-2 font-medium mr-2">Starter</div>
                                            {/* {isCheckedPlan
                                            ?
                                            null
                                            :
                                            <> */}
                                                <div className="inline-block">
                                                    <div className="flex items-center text-xs font-medium leading-5 rounded-full bg-green-100 text-green-600  px-3 py-1 ">
                                                    <strong className="font-semibold">On Trial</strong></div>
                                                </div>
                                            {/* </> */}
                                            {/* } */}
                                            </div>
                                            <div className="text-sm text-gray-600 mb-3">
                                                For the hobbyist just getting started.The economic option for individuals who want to use Generative AI casually for hobbies and work.
                                            </div>
                                            <div className="text-sm text-gray-600">
                                            {monthly_plan.map((data,index)=>{
                                                return (
                                                    <div className="flex items-center" key={index}>
                                                        <div className="w-4 h-4 items-center">
                                                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4 9L6.90909 12C8.278 8.06771 9.41805 6.34218 12 4" stroke="#0D121C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-2">{data}</span>
                                                    </div>
                                                )
                                            })}
                                            </div>
                                        </div>
                                        <div className="col-span-4 text-right">
                                            <div className="uppercase text-xs font-medium text-gray-600">Starts at</div>
                                            <div>
                                            {isCheckedPlan
                                            ?
                                            <>
                                            {subscriptions_details &&
                                                <>
                                                <span className="text-lg font-semibold">$
                                                {subscriptions_details.charge_description.annaully_starter}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium ml-2">/yearly</span>
                                                </>
                                            }
                                            </>
                                            :
                                            <>
                                            {subscriptions_details &&
                                                <>
                                                <span className="text-lg font-semibold">$
                                                    {subscriptions_details.charge_description.monthly_starter}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium ml-2">/monthly</span>
                                                </>
                                            }
                                            </>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-6 p-5 hover:bg-gray-50 transition-all hover:cursor-pointer"
                                    onClick={()=>{
                                        if(isCheckedPlan){
                                            setall_cost_data(
                                                [{
                                                    plan:"Premium mode",
                                                    actual_plan:"premium",
                                                    cost:subscriptions_details.charge_description.annaully_premium_mode,
                                                    monthly_anually:"annually",
                                                    plan_time:"yearly"
                                                }]
                                            )
                                            setmonthly_or_annyally_check("annaully")
                                            setplan_subscribe("premium")
                                            // console.log(subscriptions_details.charge_description.annaully_boss_mode)
                                        }else{
                                            setall_cost_data(
                                                [{
                                                    plan:"Premium mode",
                                                    actual_plan:"premium",
                                                    cost:subscriptions_details.charge_description.monthly_premium_mode,
                                                    monthly_anually:"monthly",
                                                    plan_time:"monthly"
                                                }]
                                            )
                                            setmonthly_or_annyally_check("monthly")
                                            setplan_subscribe("premium")
                                            // console.log(subscriptions_details.charge_description.monthly_boss_mode)
                                        }
                                        setisRadioChecked(false)
                                    }}>
                                        <div className="col-span-1 text-center">
                                        {isRadioChecked
                                        ?
                                            <input className="form-radio focus:ring-indigo-500 w-4 sm:w-6 h-4 sm:h-6 text-indigo-600 border-gray-300" type="radio" name="plan"/>
                                        :   
                                            <input className="form-radio focus:ring-indigo-500 w-4 sm:w-6 h-4 sm:h-6 text-indigo-600 border-gray-300" type="radio" name="plan" checked/>
                                        }
                                        </div>
                                        <div className="col-span-7">
                                            <div className="flex justify-start">
                                            <div className="text-xl mb-2 font-medium mr-2">Premium Mode</div>
                                            </div>
                                            <div className="text-sm text-gray-600 mb-3">
                                            For individuals and small items.The most popular option for professionals who want to use automations and write-long-form.items
                                            </div>
                                            <div className="text-sm text-gray-600">
                                            {annually_plan.map((data,index)=>{
                                                return (
                                                        <div className="flex items-center" key={index}>
                                                            <div className="w-4 h-4 items-center">
                                                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4 9L6.90909 12C8.278 8.06771 9.41805 6.34218 12 4" stroke="#0D121C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                </svg>
                                                            </div>
                                                            <span className="ml-2">{data}</span>
                                                        </div>
                                                )
                                            })}
                                            </div>
                                        </div>
                                        <div className="col-span-4 text-right">
                                            <div className="uppercase text-xs font-medium text-gray-600">Starts at</div>
                                            <div>
                                            {isCheckedPlan
                                            ?
                                            <>
                                            {subscriptions_details &&
                                            <>
                                                <span className="text-lg font-semibold">$
                                                {subscriptions_details.charge_description.annaully_premium_mode}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium ml-2">/yearly</span>
                                            </>
                                            }
                                            </>
                                            :
                                                <>
                                                    {subscriptions_details &&
                                                    <>
                                                        <span className="text-lg font-semibold">$
                                                        {subscriptions_details.charge_description.monthly_premium_mode}
                                                        </span>
                                                        <span className="text-xs text-gray-400 font-medium ml-2">/monthly</span>
                                                    </>
                                                    }
                                                </>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-6 p-5">
                                        <div className="col-span-8">
                                            <div className="flex justify-start">
                                            <div className="text-xl mb-2 font-medium mr-2">Business</div>
                                            </div>
                                            <div className="text-sm text-gray-600 mb-3">
                                                For growing teams and businesses.The AI built for teams with the ability to learn your brand voice, and the support you need to scale.
                                            </div>
                                            <div className="text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 items-center">
                                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 9L6.90909 12C8.278 8.06771 9.41805 6.34218 12 4" stroke="#0D121C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </div>
                                                <span className="ml-2">Customize your number of seats</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 items-center">
                                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 9L6.90909 12C8.278 8.06771 9.41805 6.34218 12 4" stroke="#0D121C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </div>
                                                <span className="ml-2">Unlimited tones</span>
                                            </div>
                                            {enterprise_plan.map((data,index)=>{
                                                return (
                                                    <div className="flex items-center" key={index}>
                                                        <div className="w-4 h-4 items-center">
                                                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4 9L6.90909 12C8.278 8.06771 9.41805 6.34218 12 4" stroke="#0D121C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-2">{data}</span>
                                                    </div>
                                                )
                                            })}
                                            </div>
                                        </div>
                                        <div className="col-span-4 text-right">
                                        <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
                                        onClick={()=>{
                                            notifysucces("comming soon")
                                        }}><span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                        
                                        Contact Sales
                                        </span></button></div>
                                    </div>
                                    <div className="p-5 border-t border-gray-300 justify-end hidden"><button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"><span className="flex items-center justify-center mx-auto space-x-2 select-none">Continue</span></button></div>
                                </div>
                                </div>
                                <div className="mt-5 hidden">
                                <div className="rounded shadow bg-white border border-gray-300">
                                    <div className="flex justify-between p-5 border-b border-gray-300 text-lg text-gray-600 font-medium transition-all items-center hover:cursor-pointer hover:bg-gray-50">
                                        <div className="flex">
                                            <span>Adjust seats</span>
                                            <div className="bg-gray-100 rounded-md px-3 py-1 text-sm ml-3 font-semibold">1 total</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="ml-2"><button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-2 py-1 text-xs bg-white bg-opacity-20 text-gray-600 ring-1 ring-gray-50 active:ring-1 hover:ring-gray-100 hover:ring-2 active:ring-gray-300 hover:text-gray-800 active:text-gray-800"><span className="flex items-center justify-center mx-auto space-x-2 select-none">Edit</span></button></div>
                                        </div>
                                    </div>
                                    <div className="p-5 hidden">
                                        <div>
                                            <div className="text-gray-600 text-sm pb-1 font-medium">Total add-on seats</div>
                                            <div className="relative inline-block text-left" data-headlessui-state="">
                                            <div className="relative text-sm font-normal leading-tight shadow-sm text-gray-600">
                                                <button className="inline-flex space-x-2 justify-between items-center w-full border border-gray-300 px-3 py-1 bg-white text-gray-900 hover:bg-gray-50 focus:outline-none rounded-lg" id="headlessui-menu-button-:rh:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                                    <div id="dropdown-:rg:-selector">0</div>
                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path d="M4,6.19c1.18,1.44,1.98,2.29,3.17,3.31,.48,.41,1.18,.41,1.66,0,1.18-1.02,1.99-1.87,3.17-3.31" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-10 pt-2">1 seats are included. You may add up to 0 additional seats for $49/monthly per seat.</div>
                                        <div className="text-sm mb-3">Your account currently has&nbsp;<span className="rounded-md bg-gray-50 px-3 py-1 font-medium">1 occupied seat</span></div>
                                        <div></div>
                                        <div className="text-sm mt-3">Go to <a className="text-blue-500 underline hover:cursor-pointer" href="/settings/team">team settings</a> to add or remove team members.</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div className="md:col-span-1">

                                <div className="mb-5">
                                <div className="rounded shadow bg-white border border-gray-300">
                                    <div className="p-3 flex justify-center text-sm text-gray-600 items-center font-medium">
                                    <span>Bill annually
                                </span><span className="mx-3">
                                    
                                    {/* ======swipe===== */}
                                    <FormGroup>
                                        <FormControlLabel
                                        control={
                                            <ISwitch
                                            sx={{ m: 1 }}
                                            checked={isCheckedPlan}
                                            onChange={(e)=>{
                                                handleCheckboxChangePlan(e,monthly_or_annyally_check,plan_subscribe)
                                            }}
                                            />
                                        }
                                        label=""
                                        />
                                    </FormGroup>
                                    {/* ======swipe===== */}
                                    
                                </span></div>
                                </div>
                                </div>
                                <div className="rounded shadow bg-white border border-gray-300">
                                <div className="p-5">
                                    <div className="text-xl font-semibold flex justify-center my-3">Review changes</div>
                                    
                                    {/* {isCheckedPlan
                                    ?
                                        null
                                    :
                                    <>
                                        <div className="flex justify-center my-3"><button className="p-2 bg-indigo-50 text-indigo-600 font-semibold rounded-md hover:bg-indigo-100 text-xs"
                                        onClick={()=>{
                                            setIsCheckedPlan(true)
                                        }}>
                                            Pay annually and get 15% off
                                        </button></div>
                                    </>
                                    } */}
                                    <div>
                                        <div className="py-4 flex justify-between items-center border-b border-gray-200">
                                            <div>
                                            <div className="flex items-center">
                                                <div className="uppercase text-xs text-gray-500 mr-2 font-medium">Plan type</div>
                                            </div>
                                            <div className="text-sm mt-2">
                                                {all_cost_data &&
                                                    all_cost_data.length>0
                                                    ?
                                                        all_cost_data[0]["plan"]
                                                    :
                                                        "starter"
                                                }
                                            </div>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                            {all_cost_data &&
                                                    all_cost_data.length>0
                                                    ?
                                                    <>
                                                    <p className='text-[13px]'>
                                                    ${all_cost_data[0]["cost"]}/{all_cost_data[0]["plan_time"]}
                                                    </p>
                                                    </>
                                                    :
                                                        "39"
                                                }</div>
                                        </div>
                                        <div className="py-4 flex justify-between items-center border-b border-gray-200">
                                            <div>
                                            <div className="flex items-center">
                                                <div className="uppercase text-xs text-gray-500 mr-2 font-medium">Total</div>
                                                <span title="Total cost of subcription">
                                                    <svg  className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path d="M2.42,12.96c2.57,3.01,8.6,3.01,11.17,0,2.36-2.77,2.18-8.21-.66-10.58C10.38,.26,5.62,.26,3.08,2.38,.23,4.76,.05,10.19,2.42,12.96Z" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M6.57,7.17h1.71v3.96" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M6.58,11.13h3.4" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M8.29,4.25v.37" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                            {all_cost_data &&
                                                    all_cost_data.length>0
                                                    ?
                                                    <p className='text-[13px]'>
                                                    ${all_cost_data[0]["cost"]}/{all_cost_data[0]["plan_time"]}
                                                    </p>
                                                    :
                                                        "39"
                                                }</div>
                                        </div>
                                        {/* <div className="flex justify-between items-center text-gray-800">
                                            <div className="flex font-bold items-center py-4">
                                            <span className="mr-2 text-md">Due today</span>
                                            <span>
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M2.42,12.96c2.57,3.01,8.6,3.01,11.17,0,2.36-2.77,2.18-8.21-.66-10.58C10.38,.26,5.62,.26,3.08,2.38,.23,4.76,.05,10.19,2.42,12.96Z" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M6.57,7.17h1.71v3.96" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M6.58,11.13h3.4" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M8.29,4.25v.37" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </span>
                                            </div>
                                            <div className="font-bold text-xl"><span>${all_cost_data &&
                                                    all_cost_data.length>0
                                                    ?
                                                        all_cost_data[0]["cost"]
                                                    :
                                                        "39"
                                                }</span></div>
                                        </div> */}
                                    </div>
                                    <div className="flex flex-col w-full mt-5">
                                        <div className="mb-5 text-sm text-center text-gray-500">Confirm your plan to end your trial now.</div>
                                        {startbtnLoading
                                        ?
                                        <button className=" bg-[#334977] font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-gray-200 rounded leading-5 shadow-sm transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 hover:border-gray-300 text-gray-600 w-full"
                                        >
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        </button>
                                        :
                                            <button type="button" 
                                                    className="transition-all duration-200 relative font-semibold outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base text-white bg-[#334977] active:to-blue-700 w-full shadow-sm"
                                            onClick={()=>{
                                                // console.log(all_cost_data)
                                                request_subcription()
                                                
                                            }}
                                            >
                                                <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 11.125L8.77272 14.5C10.3127 10.0762 11.5953 8.13495 14.5 5.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                <span>Confirm changes</span>
                                                </span>
                                            </button>
                                        }
                                    </div>
                                </div>
                                </div>

                                {/* <div className="flex justify-center my-5 text-xs text-gray-400">Payments are secured by Stripe</div> */}

                                <div className="mt-5 invisible">
                                <div className="rounded shadow bg-white">
                                    <div className="p-3 flex">
                                        <div className="w-7 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-7 w-7 text-gray-400">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold mb-2 text-gray-800">Why is the amount due today less than the plan total?</div>
                                            <p className="text-xs text-gray-600">When you make a change to your plan the amount due today is prorated based on how much time was spent on the previous plan vs the new plan. We only charge you the difference.</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

       
            {/* ==================the message ============= */}

                </div>
                {/*footer*/}

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">
          </div>
          </div>
      </>
    </>
  )
}

export default Subscription