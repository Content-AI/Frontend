import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import toast, { Toaster } from "react-hot-toast";
import Dots from "../Dots";
import ChoiceButton from "../ChoiceButton";

import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

const FirstStep = () => {
  let navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = React.useState(true);

  const [data, setdata] = useState("");

  const handleToggle = (e) => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    // console.log(data)
  }, [data]);

  return (
    <>
      {showModal ? (
        <>
          <div className="min-h-full flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {/*content*/}
            {/*header*/}
            <div className="font-helv w-full max-w-[727px] px-10 py-[52px] border border-[#CFD0D5] rounded">
              <TopBar />
              <div className="my-7">
                <Dots steps="first" />
              </div>
              <h3 className="text-sm font-bold mb-5">
                What best describes your role?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data === "Business Owner" ? (
                  <div
                    onClick={() => {
                      setdata("Business Owner");
                    }}
                    className="bg-blue-200 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Business Owner
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setdata("Business Owner");
                    }}
                    className="bg-blue-100 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#1d43ff80]"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Business Owner
                    </span>
                  </div>
                )}

                {data === "Marketer - at a company" ? (
                  <div
                    onClick={() => {
                      setdata("Marketer - at a company");
                    }}
                    className="bg-blue-200 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Marketer - at a company
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setdata("Marketer - at a company");
                    }}
                    className="bg-blue-100 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#1d43ff80]"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Marketer - at a company
                    </span>
                  </div>
                )}

                {data === "Marketer - agency or freelance" ? (
                  <div
                    onClick={() => {
                      setdata("Marketer - agency or freelance");
                    }}
                    className="bg-blue-200 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Marketer - agency or freelance
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setdata("Marketer - agency or freelance");
                    }}
                    className="bg-blue-100 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#1d43ff80]"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Marketer - agency or freelance
                    </span>
                  </div>
                )}

                {data === "Copywriter - at a company" ? (
                  <div
                    onClick={() => {
                      setdata("Copywriter - at a company");
                    }}
                    className="bg-blue-200 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Copywriter - at a company
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setdata("Copywriter - at a company");
                    }}
                    className="bg-blue-100 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#1d43ff80]"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Copywriter - at a company
                    </span>
                  </div>
                )}

                {data === "Copywriter - at a freelance" ? (
                  <div
                    onClick={() => {
                      setdata("Copywriter - at a freelance");
                    }}
                    className="bg-blue-200 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Copywriter - at a freelance
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setdata("Copywriter - at a freelance");
                    }}
                    className="bg-blue-100 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#1d43ff80]"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Copywriter - at a freelance
                    </span>
                  </div>
                )}

                {data === "Other employee - at a company" ? (
                  <div
                    onClick={() => {
                      setdata("Other employee - at a company");
                    }}
                    className="bg-blue-200 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Other employee - at a company
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setdata("Other employee - at a company");
                    }}
                    className="bg-blue-100 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#1d43ff80]"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Other employee - at a company
                    </span>
                  </div>
                )}

                {data === "Student" ? (
                  <div
                    onClick={() => {
                      setdata("Student");
                    }}
                    className="bg-blue-200 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Student
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setdata("Student");
                    }}
                    className="bg-blue-100 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#1d43ff80]"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Student
                    </span>
                  </div>
                )}

                {data === "Hobbyist" ? (
                  <div
                    onClick={() => {
                      setdata("Hobbyist");
                    }}
                    className="bg-blue-200 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Hobbyist
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setdata("Hobbyist");
                    }}
                    className="bg-blue-100 h-[40px] rounded items-center px-4 py-3 flex gap-x-3"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#1d43ff80]"></span>
                    <span className="text-blue-800 font-semibold text-[13px]">
                      Hobbyist
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-5">
                <Button
                  variant="contained"
                  className="flex items-center justify-center !px-8 !py-3 bg-[1D43FF] opacity-50"
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
