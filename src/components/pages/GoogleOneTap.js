import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import { useState } from "react";

function GoogleOneTap() {

  useGoogleOneTapLogin({
    onSuccess: (response) => {
        // console.log(response)
        
    },
    onError: (error) => console.log(error),
    googleAccountConfigs: {
      client_id:
        "65857693177-41t814nhrml22jptcfdrcqveumamp8al.apps.googleusercontent.com"
    }
  });
  return (
    <>
    </>
  );
}

export default GoogleOneTap;
