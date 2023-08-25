import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const Ga = () => {
  const handleAuthSuccess = (credentialResponse) => {
    console.log(credentialResponse);
  };

  const handleAuthError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="flex justify-center">
      <GoogleOAuthProvider clientId="65857693177-41t814nhrml22jptcfdrcqveumamp8al.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleAuthSuccess}
          onFailure={handleAuthError}
          render={(renderProps) => (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign in with Google
            </button>
          )}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Ga;
