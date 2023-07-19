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
import Chat from "../pages/chat/Chat";
import Template from "../pages/Template/Template";
import SingleTemplate from "../pages/Template/SingleTemplate";
import EditDocuments from "../pages/Template/Document/EditDocuments";
import Logout from "../pages/Logout";
import Projects from "../pages/Projects/Projects";
import ListOfDocument from "../pages/Template/Document/ListOfDocument";
import CreateNewContent from "../pages/CreateNewContent";
import FolderData from "../pages/Projects/FolderData";
import Brandvoice from "../pages/brandvoice/Brandvoice"

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
            <Route path="/chat" element={<Chat AUTH_TOKEN={TOKEN} />} />
            <Route path="/documents" element={<ListOfDocument SHOW={"active"} AUTH_TOKEN={TOKEN} />} />
            
            <Route path="/brand_voice" element={<Brandvoice AUTH_TOKEN={TOKEN} />} />
            
            <Route path="/create_new_content" element={<CreateNewContent AUTH_TOKEN={TOKEN} />} />
            <Route path="/folder_of_user/:folder_id" element={<FolderData AUTH_TOKEN={TOKEN} />} />
            
            <Route path="/trash" element={<ListOfDocument SHOW={"trash"} AUTH_TOKEN={TOKEN} />} />

            {/* <Route path="/Template" element={<Template AUTH_TOKEN={TOKEN}/>} /> */}

            <Route path="Template" AUTH_TOKEN={TOKEN}>
              <Route index element={<Template AUTH_TOKEN={TOKEN} />} />
              <Route
                path=":template_id"
                element={<SingleTemplate AUTH_TOKEN={TOKEN} />}
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

            <Route
              path="/template_data/:document_id"
              element={<EditDocuments AUTH_TOKEN={TOKEN} />}
            />

            <Route path="/*" element={<Home />} />
            <Route path="/Projects" element={<Projects AUTH_TOKEN={TOKEN} />} />

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
