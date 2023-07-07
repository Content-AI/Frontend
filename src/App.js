import React, { useEffect, useState } from "react";
import "./App.css";
import AllRoutes from "./components/Route/AllRoutes";
import { useSelector, useDispatch } from "react-redux";

import { _save_token_ } from "./features/AuthenticationToken";

import { _save_survey_ } from "./features/ThreeSteps";

import { _save_user_profile } from "./features/Fullprofile";
import { _load_screen_ } from "./features/LoadingScreen";

import { useNavigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Navbar from "./components/NavBar/NavBar";
import FirstStep from "./components/pages/ThreeSteps/FirstStep";
import { fetchData } from "./apis/apiService";
import { BACK_END_API_PROFILE, BACKEND_URL } from "./apis/urls";
import LoadingPage from "./components/LoadingPage";

function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );
  let _survey_data_ = useSelector((state) => state.SetThreeSteps.ThreeSteps);
  let loading_page = useSelector(
    (state) => state.SetLoadingScreen.LoadingScreen
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(_save_token_(localStorage.getItem("token")));
    } else {
      dispatch(_load_screen_(false));
      navigate("login");
    }
  }, []);

  const get_profile_data = async () => {
    const profile_data = await fetchData(
      BACKEND_URL + BACK_END_API_PROFILE,
      TOKEN
    );
    if ((profile_data.status = 200)) {
      dispatch(_save_user_profile(profile_data.data[0]));
      dispatch(_load_screen_(false));
    }
  };

  useEffect(() => {
    if (TOKEN) {
      get_profile_data();
    }
    if (localStorage.getItem("three_steps")) {
      dispatch(_save_survey_(localStorage.getItem("three_steps")));
    }
  }, [TOKEN]);

  useEffect(() => {
    // console.log("_save_survey_",_survey_data_)
    if (_survey_data_ == "true") {
      navigate("/first_step?survey_data_first=by-for-user-clarification");
    }
  }, [_survey_data_]);

  return TOKEN ? (
    loading_page ? (
      <LoadingPage />
    ) : (
      <div>
        <Navbar _TOKEN_FOR_VALIDATION_NAVBAR_={TOKEN} />
        <AllRoutes _TOKEN_FOR_VALIDATION_NAVBAR_={TOKEN} />
      </div>
    )
  ) : loading_page ? (
    <LoadingPage />
  ) : (
    <>
      <Login />
    </>
  );
}

export default App;
