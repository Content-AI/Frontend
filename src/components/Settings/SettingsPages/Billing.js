import React , {useEffect,useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL,BACK_END_API_CANCEL_SUBSCRIPTION } from '../../../apis/urls';
import Settings from '../Settings'
import { fetchData } from '../../../apis/apiService';
import toast, { Toaster } from 'react-hot-toast';


const Billing = (props) => {
  const navigate = useNavigate()

  const notifyerror = (message) => toast.error(message);
  const notifysucces = (message) => toast.success(message);

  let list_token_generated_by_user = useSelector(
    (state) => state.SetListTokenGeneratedByUser.ListTokenGeneratedByUser
  );


  const cancel_subscription = async() =>{
    const resp = await fetchData(BACKEND_URL+BACK_END_API_CANCEL_SUBSCRIPTION,props.AUTH_TOKEN)
    if(resp.status==200){
      notifysucces("subscription cancel")
    }else{
        notifysucces("something went wrong")
      }
    }

  return (
    <>
      <Settings/>
      <div className='m-auto'>
        <p className="font-bold text-[25px] text-black mb-1">Billing </p>
        <div className="m-1 px-6 pt-6 bg-white text-black rounded-md shadow-xs ring-1 ring-gray-300">
              <h3 className="text-xl font-medium leading-6 text-gray-700">Subscription</h3>
                <div>
                  {/* ============================= */}
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6">
                        <p className="mb-4 mt-2 font-semibold text-sm font-helv text-slate-500 text-grey-500 sm:col-span-6 ">
                        Your account was created on.
                        <span className='font-semibold'> Jul 27, 2023</span>
                        </p>
                        <p className="text-sm font-semibold font-helv text-grey-500 sm:col-span-6 text-slate-500">
                        You are currently on the monthly
                        <strong> Free Plan</strong> 
                        </p>
                    </div>
                    <div className="flex w-full flex-col sm:col-span-6 md:w-120">
                        <div className="flex flex-row ">
                        <strong className="font-medium text-black">
                        Words Generated
                        </strong>
                        <strong className="font-medium text-black ml-[400px]">
                        {list_token_generated_by_user.total} / *
                        </strong>
                      </div>
                        <div className="w-full max-w-xl">
                          <div className="relative py-1 min-w-full w-full">
                              <div className="flex overflow-hidden rounded-full text-xs relative shadow-inner bg-green-200 h-[0.75rem]" >
                                <div className="absolute z-10 flex flex-col justify-center whitespace-nowrap text-center text-black rounded-r-full bg-green-600 shadow-inner_right w-[50%] h-[0.75rem]"></div>
                              </div>
                          </div>
                        </div>
                        <div className='mb-1'>Words usage resets on <strong className="font-medium text-slate-400">July 27, 2023</strong></div>
                        {/* <div className="pt-4 sm:col-span-6">
                          <button type="button" className="mb-1 focus-within:outline-none relative flex cursor-pointer items-center rounded-md border border-grey-200 bg-[#334977] py-2 px-3 text-sm font-medium text-white shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 focus-within:ring-offset-grey-10">
                              View Generation History
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-md ml-2 h-3 w-3">
                                <g clip-path="url(#clip0_5_410)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7071 2.29289C10.3166 1.90237 9.68342 1.90237 9.29289 2.29289C8.90237 2.68342 8.90237 3.31658 9.29289 3.70711L12.5858 7H1C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9H12.5858L9.29289 12.2929C8.90237 12.6834 8.90237 13.3166 9.29289 13.7071C9.68342 14.0976 10.3166 14.0976 10.7071 13.7071L15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L10.7071 2.29289Z" fill="currentColor"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_5_410">
                                      <rect width="16" height="16" fill="white"></rect>
                                    </clipPath>
                                </defs>
                              </svg>
                          </button>
                        </div> */}
                        <div className="mb-1 font-medium text-gray-700 md:flex  md:justify-end">
                        <div className="mt-4 md:flex md:items-center  md:space-x-2">
                          <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 selectionRing active:bg-gray-100 active:text-gray-700 w-full md:w-auto">
                            <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                            Edit payment details
                            </span>
                          </button>
                          <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1 w-full md:w-auto"
                          onClick={()=>{
                            navigate("/settings/subscription_plan")
                          }}>
                            <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                            Edit plan
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ============================= */}
                </div>
          </div>
          <div className="m-1">
              <div>
                <div className="flex items-center p-6 transition-all duration-150 bg-white rounded-md ring-gray-300 ring-1">
                    <div className="flex-grow">
                      <div className="text-xl font-semibold tracking-tight text-black">Save more than 20%</div>
                      <div className="text-gray-500">Pay annually to save more than 20%!</div>
                    </div>
                    <button type="button" 
                    className="transition-all duration-200 relative font-semibold outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm text-white bg-[#334977]">
                    <span className="flex items-center justify-center mx-auto space-x-2 select-none">View details</span></button>
                </div>
              </div>
          </div>
          <div className="m-1">
              <div className="flex items-center p-6 transition-all duration-150 bg-white rounded-md  ring-gray-300 ring-1">
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900">Invoices</h3>
                    <p className="text-gray-500 text-sm">View your payment history</p>
                </div>
                <button type="button" 
                className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-[#334977] text-white ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                View billing history</span></button>
              </div>
          </div>
          <div className="space-y-2 py-8">
              <h2 className="text-xl font-semibold text-gray-900">Cancel Subscription</h2>
              <p className="text-gray-500 text-sm">
                <span className="block mb-2">
                  {/* Kindly take note that if you decide to delete your account, all your saved content will be delete. */}
                </span>
              <button 
                type="button" 
                className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-red-600 text-white hover:bg-red-800 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                  Delete
                </span>
              </button>
              </p>
          </div>
        </div>
    </>
  )
}

export default Billing