import React from 'react';
import axios from 'axios';

const LinkedInSignUp = () => {
  const handleLinkedInSignIn = async () => {
    try {
      // Step 1: Initiate OAuth flow
      window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86nbyoaj3py59q&redirect_uri=https://copy-ai-ecru.vercel.app&scope=openid%20profile%20w_member_social%20email`;
    } catch (error) {
      console.error('Error initiating LinkedIn sign-in:', error);
    }
  };

 

  React.useEffect(() => {
    // Parse the query parameters from the URL after LinkedIn redirect
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
  }, []);

  return (
    <div>
      <h1>LinkedIn Sign-Up</h1>
      <button onClick={handleLinkedInSignIn}>Sign Up with LinkedIn</button>
    </div>
  );
};

export default LinkedInSignUp;
