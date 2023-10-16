import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Upgradenow from '../../Settings/SettingsPages/Modal/Upgradenow';
import { useNavigate } from 'react-router-dom'
import { NavIcons, SealCheck } from "../../Icons";
import { fetchData } from '../../../apis/apiService';
import { BACKEND_URL,BACK_END_API_GET_API_KEY } from '../../../apis/urls';


import { AiFillEyeInvisible ,AiFillEye} from 'react-icons/ai';

const ApiKeyInput = ({ apiKey, onChange }) => {

    const [showApiKey, setshowApiKey] = useState(false);
    const [ApiKey, setApiKey] = useState("**************");
    const navigate = useNavigate()


    let subscriptions_check = useSelector(
    (state) => state.SetSubscriptions.Subscriptions
    );
    let subscriptions_details = useSelector(
    (state) => state.SetSubscriptionsData.SubscriptionsData
    );

    let TOKEN = useSelector(
        (state) => state.SetAuthenticationToken.AuthenticationToken
    );

    // console.log(subscriptions_details.user.plan)

    const get_api_key = async() =>{
        
        if(subscriptions_details!=null){
            if(subscriptions_details.user.status != "trial" && subscriptions_details.user.plan == "premium"){
                const resp =await fetchData(BACKEND_URL+BACK_END_API_GET_API_KEY,TOKEN)
                if(resp.status==200){
                    setApiKey(resp.data.api_key)
                }
            }
        }
    }
    
    useEffect(()=>{
       get_api_key()
    },[subscriptions_details])


    const handleTogglePassword = () => {
        setshowApiKey(!showApiKey);
    };

  return (
    <div className="mb-4">
      <label htmlFor="api-key" className=" block text-sm font-medium text-gray-600 mb-2">
        API Key
      </label>
      {subscriptions_details &&
        <>
        {subscriptions_details.user.status != "trial" && subscriptions_details.user.plan == "premium"
        ?
            <>
            <div className="relative flex items-center">
                <input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={ApiKey}
                    placeholder="Your API key..."
                    className="w-1/2 md:w-96 px-4 py-2 border border-gray-300 rounded-l-md  text-gray-700"
                />
                        <button
                            className="p-3  cursor-pointer rounded-r-md"
                            type="button"
                            onClick={handleTogglePassword}
                        >
                            {showApiKey ? (
                            <AiFillEyeInvisible className='w-[30px] h-[30px]'/>
                            ) : (
                            <AiFillEye  className='w-[30px] h-[30px]'/>
                            )}
                        </button>
            </div>

            </>
            :
                <button
                    type="submit"
                    className="w-[210px] text-sm transition-all duration-200 relative font-semibold outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-white bg-gradient-to-r  shadow-sm bg-[#334977]"
                    id="generateBtn1"
                    onClick={()=>{
                    navigate("/settings/subscription_plan")
                    }}

                >
                <span className="flex select-none">
                    <SealCheck classes="w-6 h-6 mr-2" />
                        Upgrade to Premium
                    </span>
                </button>
        }
        </>
      }
      <p className="mt-2 text-sm text-gray-500">
        Your API key is a secret token used to authenticate requests to the API. Please keep it secure.
        <button type='button'
            className='underline text-blue-500 font-semibold ml-2'
            onClick={()=>{
                window.location.href = BACKEND_URL+"/redoc/"
            }}>
            API's Doc's
        </button>
      </p>
    </div>
  );
};

export default ApiKeyInput;
