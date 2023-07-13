import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";


// import {
//   _message_
// } from "../features/LoadingScreenMessage";

const LoadingPage = () => {

  let message = useSelector(
    (state) => state.SetLoadingScreenMessage.LoadingScreenMessage
  );

  return (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
      <div className='flex flex-col items-center'>
        <div>
          <h1 className='text-[20px] text-slate-950 font-helv'>
            {message?message:"loading ..."}
          </h1>
        </div>
        <div className='mt-3'>
          <CircularProgress color="primary" size={60} />
        </div>
      </div>
      </div>
  );
};

export default LoadingPage;
