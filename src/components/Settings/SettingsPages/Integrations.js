import React, { useState } from "react";
import Settings from '../Settings'

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import ApiKeyInput from "../../pages/Template/ApiKeyInput";

const ISwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    })
  }
}));


const Integrations = () => {

  const [isCheckedSEO, setIsCheckedSEO] = useState(false);
  const [isCheckedPlagarism,setisCheckedPlagarism] = useState(false);
  const [isCheckedLanguage,setisCheckedLanguage] = useState(false);

  const handleCheckboxChangeSEO = (event) => {
    setIsCheckedSEO(event.target.checked);
  };
  const handleCheckboxChangePlagarism = (event) => {
    setisCheckedPlagarism(event.target.checked);
  };
  const handleCheckboxChangeLanguage = (event) => {
    setisCheckedLanguage(event.target.checked);
  };


  return (
    <>
      {/* <Settings/> */}
      <div className='ml-[50px] mr-[50px] sm:ml-[100px] mt-10'>

      <div className="mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="flex items-center mb-4 justify-between">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-1 pb-1">Integrations</h2>
          </div>

          <section className="p-6 mb-3  bg-slate-100 shadow-sm rounded">
                <span className="flex flex-col flex-grow mr-2">
                </span>
                  <ApiKeyInput/>               
          </section>

          <section className="p-6 mb-3 bg-slate-100 shadow-sm rounded">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between w-full">
                <span className="flex flex-col flex-grow mr-2">
                    <span className="flex items-center mb-1 text-lg font-medium text-gray-900" id="headlessui-label-:R5ba36:">
                    SEO Wave
                    </span>
                    <span className="text-sm text-gray-500" id="headlessui-description-:R9ba36:">
                    "Incorporate an "SEO" section into your document editor, offering robust SEO keyword research and metrics capabilities.
                    </span>
                </span>
                {/* ======swip===== */}
                <FormGroup>
                <FormControlLabel
                  control={
                    <ISwitch
                      sx={{ m: 1 }}
                      checked={isCheckedSEO}
                      onChange={handleCheckboxChangeSEO}
                    />
                  }
                  label=""
                />
              </FormGroup>
                
                {/* ======swip===== */}
              </div>
          </section>
          <section className="p-6 mb-3  bg-slate-100 shadow-sm rounded">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between w-full">
                <span className="flex flex-col flex-grow mr-2">
                    <span className="flex items-center mb-1 text-lg font-medium text-gray-900" id="headlessui-label-:R5da36:">
                    Originality Check
                    </span>
                    <span className="text-sm text-gray-500" id="headlessui-description-:R9da36:">
                    Utilize a text scanning feature to check for content originality, safeguarding your reputation and search engine rankings.
                    </span>
                </span>
                <span>
                                  {/* ======swip===== */}
                                    <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <ISwitch
                                          sx={{ m: 1 }}
                                          checked={isCheckedPlagarism}
                                          onChange={handleCheckboxChangePlagarism}
                                        />
                                      }
                                      label=""
                                    />
                                  </FormGroup>
                                    
                                    {/* ======swip===== */}
                </span>
              </div>
          </section>

          {/* <section className="p-6 mb-3 bg-slate-100 shadow-sm rounded"> */}
          <section className="p-6 mb-3  shadow-sm rounded">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between w-full">
                <span className="flex flex-col flex-grow mr-2">
                    <span className="flex items-center mb-1 text-lg font-medium text-gray-900" id="headlessui-label-:R5fa36:">
                      {/* Language Translation */}
                    </span>
                    <span className="text-sm text-gray-500" id="headlessui-description-:R9fa36:">
                    {/* Effortlessly translate your content into multiple languages with just one click */}
                    </span>
                </span>
                      {/* ======swip===== */}
                      {/* <FormGroup>
                      <FormControlLabel
                        control={
                          <ISwitch
                            sx={{ m: 1 }}
                            checked={isCheckedLanguage}
                            onChange={handleCheckboxChangeLanguage}
                          />
                        }
                        label=""
                      />
                    </FormGroup> */}
                      
                    {/* ======swip===== */}
              </div>
              <div className="flex flex-col md:items-end justify-between mt-4 md:flex-row md:space-x-2">
                <label className="text-sm space-y-2">
                    {/* <span>Input language</span> */}
                    {/* <select className="block w-full pr-12 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-800 focus:border-blue-800 form-select truncate">
                      <option value="EN" selected="">English</option>
                      <option value="FR">France</option>
                    </select> */}
                </label>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="flex-shrink-0 text-gray-500 box-content w-4 self-center px-1 py-3 transform rotate-90 md:rotate-0 md:self-end">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg> */}
                <label className="text-sm space-y-2">
                    {/* <span>Output language</span> */}
                    {/* <select className="block w-full pr-12 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-800 focus:border-blue-800 form-select truncate">
                      <option value="EN-US" selected="">English (American)</option>
                      <option value="EN-GB">English (British)</option>
                      <option value="FR">France</option>
                    </select> */}
                </label>
                <label className="text-sm space-y-2 flex-shrink-0 md:pl-4 opacity-60">
                    {/* <span>Formality</span> */}
                    {/* <select className="block w-full pr-12 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-800 focus:border-blue-800 form-select truncate" disabled="">
                      <option value="default" selected="">Default</option>
                      <option value="less">Less formal</option>
                      <option value="more">More formal</option>
                    </select> */}
                </label>
              </div>
          </section>
          
        </div>
        </div>
    </>
  )
}

export default Integrations