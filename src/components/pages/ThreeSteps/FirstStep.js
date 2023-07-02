import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import toast, { Toaster } from "react-hot-toast";
import Dots from "../Dots";
import ChoiceButton from "../ChoiceButton";
import StepOptions from "./StepOptions";

import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import clsx from "clsx";

const FirstStep = () => {
  let navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = React.useState(true);

  const [data, setData] = useState("");

  const handleToggle = (e) => {
    setIsSelected(!isSelected);
  };

  const localOptions = [
    "Business Owner",
    "Marketer - at a company",
    "Marketer - agency or freelance",
    "Copywriter - at a company",
    "Copywriter - at a freelance",
    "Other employee - at a company",
    "Student",
    "Hobbyist",
  ];

  function setStateFormVal(data) {
    setData(data);
  }

  // useEffect(() => {
  //   console.log(data)
  // }, [data]);

  return (
    <>
      {showModal ? (
        <>
          <div className="relative z-50 min-h-screen flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            {/*content*/}
            {/*header*/}
            <div className="w-full max-w-[727px] font-helv px-10 py-[52px] border border-[#CFD0D5] rounded">
              <TopBar />
              <div className="my-7">
                <Dots steps="first" />
              </div>
              <h3 className="text-sm font-bold mb-5">
                What best describes your role?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <StepOptions
                  data={localOptions}
                  activeData={data}
                  toggleData={setStateFormVal}
                />
              </div>
              <div className="flex justify-end mt-5">
                <Button
                  variant="contained"
                  className="flex items-center justify-center !font-bold !px-8 !py-3 !bg-blue/50"
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    // navigate("/second_step")
                    navigate(
                      "/second_step?survey_data_second=by-for-user-clarification",
                      {
                        state: {
                          first_answer: data,
                        },
                      }
                    );
                  }}
                >
                  Next
                </Button>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => {
                    // navigate("/second_step")
                    navigate(
                      "/second_step?survey_data_second=by-for-user-clarification",
                      {
                        state: {
                          first_answer: data,
                        },
                      }
                    );
                  }}
                  type="button"
                  className="text-blue-700 text-sm"
                >
                  Skip Question
                </button>
              </div>
            </div>
          </div>

          <div className="fixed inset-0 z-40 bg-white"></div>
        </>
      ) : null}

      <Toaster />
    </>
  );
};

export default FirstStep;
