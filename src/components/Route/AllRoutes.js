import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import FirstStep from "../pages/ThreeSteps/FirstStep";
import SecondStep from "../pages/ThreeSteps/SecondStep";
import ThirdStep from "../pages/ThreeSteps/ThirdStep";
import { useSelector, useDispatch } from "react-redux";

import { _save_token_ } from "../../features/AuthenticationToken";
import Profile from "../Profile/Profile";
// import Chat from "../pages/Chat/Chat";
import Chat from "../pages/chat/Chat"
import Template from "../pages/Template/Template";
import SingleTemplate from "../pages/Template/SingleTemplate";
import EditTemplate from "../pages/Template/EditTemplate";
import Logout from "../pages/Logout";

const AllRoutes = ({ _TOKEN_FOR_VALIDATION_NAVBAR_ }) => {
  const location = useLocation();

  let TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );

  return (
    <>
      {TOKEN ? (
        <main className="flex flex-col sm:ml-64 sm:mt-[74px] min-h-[calc(100vh-80px)] p-6 text-black bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat  AUTH_TOKEN={TOKEN} />} />
            
            {/* <Route path="/Template" element={<Template AUTH_TOKEN={TOKEN}/>} /> */}

            <Route
              path="Template"
              AUTH_TOKEN={TOKEN}
            >
              <Route
                index
                element={
                  <Template
                  AUTH_TOKEN={TOKEN}
                  />
                }
              />
              <Route
                path=":template_id"
                element={
                  <SingleTemplate
                  AUTH_TOKEN={TOKEN}
                  />
                }
              />
            </Route>

            <Route
              path="/first_step"
              element={
                <FirstStep
                  AUTHORIZATION_TOKEN={_TOKEN_FOR_VALIDATION_NAVBAR_}
                />
              }
            />
            <Route
              path="/second_step"
              element={
                <SecondStep
                  AUTHORIZATION_TOKEN={_TOKEN_FOR_VALIDATION_NAVBAR_}
                />
              }
            />
            <Route
              path="/third_step"
              element={
                <ThirdStep
                  AUTHORIZATION_TOKEN={_TOKEN_FOR_VALIDATION_NAVBAR_}
                />
              }
            />
            
            <Route path="/template_data/:template_id" element={<EditTemplate  AUTH_TOKEN={TOKEN} />} />

            <Route path="/*" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      ) : (
        <Route path="/login" element={<Login />} />
      )}
    </>
  );
};

export default AllRoutes;
