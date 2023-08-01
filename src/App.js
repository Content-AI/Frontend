import React , {useEffect,useState} from 'react'
import './App.css';
import AllRoutes from './components/Route/AllRoutes';
import { useSelector, useDispatch } from "react-redux";

import {
  _save_token_
} from "./features/AuthenticationToken";

import {
  _save_survey_
} from "./features/ThreeSteps";

import { _save_user_profile } from './features/Fullprofile';
import {
  _load_screen_
} from "./features/LoadingScreen";
import { _delete_token_ } from "./features/AuthenticationToken";
import { _delete_user_profile } from "./features/Fullprofile";
import { _save_details_ } from "./features/Subscriptions";
import { _save_sub_details_ } from "./features/SubscriptionsData";
import { _save_generated_token_ } from "./features/ListTokenGeneratedByUser";


import { useNavigate } from "react-router-dom";
import Login from './components/pages/Login';
import Navbar from './components/NavBar/NavBar';
import FirstStep from './components/pages/ThreeSteps/FirstStep';
import { fetchData } from './apis/apiService';
import { BACK_END_API_PROFILE,BACK_END_API_TOKEN_GENERATED,BACK_END_API_SUBCRIPTION_DETAILS,BACKEND_URL,BACK_END_API_SUBSCRIBE_CHECK } from './apis/urls';
import LoadingPage from './components/LoadingPage';
import Subscription from './components/pages/Subscription/Subscription'
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const notifyerror = (message) => toast.error(message);
  const notifysucces = (message) => toast.success(message);

  const [ subcheck,setsubcheck]=useState(true)
  const [ data_of_planning,setdata_of_planning]=useState([])


  const searchParams = new URLSearchParams(location.search);
  const subscription_type = searchParams.get('subscription_type');
  const plan = searchParams.get('plan');
  
  const message_from_subscription = searchParams.get('message');



  let TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );
  let _survey_data_ = useSelector(
    (state) => state.SetThreeSteps.ThreeSteps
  );
  let loading_page = useSelector(
    (state) => state.SetLoadingScreen.LoadingScreen
  );
  let subscriptions_check = useSelector(
    (state) => state.SetSubscriptions.Subscriptions
  );
  let subscriptions_details = useSelector(
    (state) => state.SetSubscriptionsData.SubscriptionsData
  );



  useEffect(() => {
    
    if(message_from_subscription=="success")
    {
      notifysucces("Thank you for choosing our proudct")
    }
    if(message_from_subscription=="cancle")
    {
      notifyerror("Subscription Cancal")
    }

    if (localStorage.getItem("token")) {
      dispatch(_save_token_(localStorage.getItem("token")));
      dispatch(_load_screen_(false))
    }else{
      // console.log("subscription_type : ",subscription_type)
      // console.log("plan : ",plan)
      if(subscription_type!=null && subscription_type!=undefined && plan!=null && plan!=undefined){
        navigate(`/login?subscription_type=${subscription_type}&plan=${plan}`)
      }else{
        navigate('/login?user=login_f')
      }
      dispatch(_load_screen_(false))
    }
  }, []);

  const get_profile_data = async() => {
    const profile_data = await fetchData(BACKEND_URL+BACK_END_API_PROFILE,TOKEN)
      if(profile_data.status=200){
        try{
          dispatch(_save_user_profile(profile_data.data[0]))
          dispatch(_load_screen_(false))
        }catch(e){
          localStorage.clear();
          dispatch(_delete_token_(null));
          dispatch(_save_survey_(null));
          dispatch(_delete_user_profile(null));
          dispatch(_load_screen_(false))
          // console.log("subscription_type : ",subscription_type)
          // console.log("plan : ",plan)
          if(subscription_type!=null && subscription_type!=undefined && plan!=null && plan!=undefined){
            navigate(`/login?subscription_type=${subscription_type}&plan=${plan}`)
          }else{
            navigate("/login?user=login_s")
          }
        }

    }

  }
  const get_subscription_details = async() => {
    const subscribe_data = await fetchData(BACKEND_URL+BACK_END_API_SUBSCRIBE_CHECK,TOKEN)
    // if(subscribe_data.status=200){
      // try{
          // console.log(subscribe_data.data)
      dispatch(_save_details_(subscribe_data.data))
          // }catch(e){}

    // }

  }
  
  const get_token_generated_by_user = async() => {
    const resp = await fetchData(BACKEND_URL+BACK_END_API_TOKEN_GENERATED,TOKEN)
    if(resp.status==200){
      dispatch(_save_generated_token_(resp.data))
    }
  }

  const get_subcribe_data_of_user = async() =>{
    const subscribe_detail_data = await fetchData(BACKEND_URL+BACK_END_API_SUBCRIPTION_DETAILS,TOKEN)
    try{
      dispatch(_save_sub_details_(subscribe_detail_data.data))
    }catch(e){}
  }

  useEffect(() => {
    if(TOKEN){
        get_profile_data()
        get_subscription_details()
        get_subcribe_data_of_user()
        get_token_generated_by_user()
    }
    if (localStorage.getItem("three_steps")) {
      dispatch(_save_survey_(localStorage.getItem("three_steps")));
    }
  }, [TOKEN]);

  useEffect(()=>{
    if(_survey_data_=="true"){
      setsubcheck(null)
      if(subscription_type!=null && subscription_type!=undefined && plan!=null && plan!=undefined){
        navigate(`/first_step?survey_data_first=by-for-user-clarification&subscription_type=${subscription_type}&plan=${plan}`)
      }else{
        navigate("/first_step?survey_data_first=by-for-user-clarification")
      }
    }
  },[_survey_data_])
  

  useEffect(()=>{
    // console.log("subscriptions_details : ",subscriptions_details)
    if(subscriptions_check!=null){
        setsubcheck(subscriptions_check.restrict_user)
        // if(subscriptions_check.restrict_user){
          // navigate("/subscribe?user=with_user_details")
        // }
    }
  })



  return (  
    <>
      {TOKEN
        ?
        loading_page
        ?
          <LoadingPage/>
        :
        <>
            {subcheck
            ?
              <>
                <Subscription _TOKEN_FOR_VALIDATION_NAVBAR_={TOKEN}/>
                <Navbar _TOKEN_FOR_VALIDATION_NAVBAR_={TOKEN}/>
                <AllRoutes _TOKEN_FOR_VALIDATION_NAVBAR_={TOKEN}/>
              </>
            :
              <div>
                <Navbar _TOKEN_FOR_VALIDATION_NAVBAR_={TOKEN}/>
                <AllRoutes _TOKEN_FOR_VALIDATION_NAVBAR_={TOKEN}/>
              </div>
            }
        </>
        :
        loading_page
        ?
          <LoadingPage/>
        :
          <>
            <Login redirect_to_stripe_from_app={data_of_planning}/>
          </>
      }
      <Toaster/>
    </>
  );
}

export default App;
