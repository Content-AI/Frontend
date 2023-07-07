import React from 'react';
import { CircularProgress } from '@material-ui/core';

const LoadingPage = () => {
  return (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
            <CircularProgress color="primary" size={60} />
          </div>
  );
};

export default LoadingPage;
