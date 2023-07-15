import React, { useState, useEffect, useRef } from "react";

import { BACKEND_URL, BACK_END_API_DOCUMENTS } from "../../../../apis/urls";
import { fetchData, patchData } from "../../../../apis/apiService";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const ListOfDocument = (props) => {
  const navigate = useNavigate();

  const [ListOrGrid, setListOrGrid] = useState(true);
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [documentData, setdocumentData] = useState(null);
  const [RenameDiv, setRenameDiv] = useState(false);
  const [RenameId, setRenameId] = useState(null);
  const [inputText, setInputText] = useState("");

  const popupRef = useRef(null);

  const notifyerror = (message) => toast.error(message);
  const notifysuccess = (message) => toast.success(message);


  const get_all_user_doc = async () => {
    const resp = await fetchData(BACKEND_URL + BACK_END_API_DOCUMENTS + "/", props.AUTH_TOKEN)
    if (resp.status == 200) {
      setdocumentData(resp.data.results)
    } else {
      notifyerror("something went wrong")
    }
  }

  const handleDelete = (id) => {
    setdocumentData((prevDocuments) =>
      prevDocuments.filter((document) => document.id !== id)
    );
  };

  const _update_document_data = async (data, id, message) => {
    const resp = await patchData(data, BACKEND_URL + BACK_END_API_DOCUMENTS + "/" + id + "/", props.AUTH_TOKEN)
    if (resp.status == 201) {
      notifysuccess(message)
      handleDelete(id)
    } else {
      notifyerror("something went wrong")
    }
    if (popupRef.current) {
      setOpenPopupIndex(null);
    }
  }
  const _update_name_ = async (data, id, message) => {
    const resp = await patchData(data, BACKEND_URL + BACK_END_API_DOCUMENTS + "/" + id + "/", props.AUTH_TOKEN)
    if (resp.status == 201) {
      notifysuccess(message)
      get_all_user_doc()
      setRenameDiv(false)
    } else {
      notifyerror("something went wrong")
    }
  }


  const handlePopUpMenu = (index) => {
    if (openPopupIndex === index) {
      setOpenPopupIndex(null);
    } else {
      setOpenPopupIndex(index);
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpenPopupIndex(null);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    get_all_user_doc()
  }, [])

  return (
    <div className="space-y-8 px-4 md:px-10" ref={popupRef}>
      <div className="space-y-4">

        {documentData &&
          <>
          <div class="px-4 md:px-10  space-y-8">
            <div class="space-y-4">
                <div class="flex flex-row justify-center items-stretch w-full gap-20">

                  <div class="flex flex-col justify-start items-stretch w-80 gap-[32px]">
                  
                <div class="flex items-center">
                        <div class="relative transition-all p-3 group cursor-pointer hover:bg-blue-50 border rounded-xl w-[240px] h-[280px]">

                                <div class="opacity-0 group-hover:opacity-100 absolute right-5 top-5">
                                  <span class="relative inline-block text-left" data-headlessui-state="">
                                      <button type="button" class="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1" id="headlessui-menu-button-:r2e:" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                        <span class="flex items-center justify-center mx-auto space-x-2 select-none">
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                              <path d="M6.31,2.61c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="#9CA3AF"></path>
                                              <path d="M6.31,8c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="#9CA3AF"></path>
                                              <path d="M6.31,13.39c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.72-1.71-1.72-1.71,.62-1.71,1.72Z" fill="#9CA3AF"></path>
                                              <path d="M6.31,2.61c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="none" stroke="#4B5563" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                              <path d="M6.31,8c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="none" stroke="#4B5563" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                              <path d="M6.31,13.39c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.72-1.71-1.72-1.71,.62-1.71,1.72Z" fill="none" stroke="#4B5563" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </span>
                                      </button>
                                  </span>
                                </div>
                        
                                <div class="flex flex-col justify-between h-full">
                            <div class="text-[8px] bg-white border rounded-xl px-3 grow break-words space-y-2 overflow-hidden">
                                <p>Attention: Seeking out the world's best laptop?</p>
                                <p></p>
                                <p>Interest: Introducing hp laptops, top of the line with powerful processors and amazing quality. Plus, we've got you covered in case something goes wrong with our generous warranty deal - all for a great price!</p>
                                <p></p>
                                <p>Desire: Rejoice in innovative features like faster loading speeds and improved visuals when you experience life on an hp laptop. With intelligent design that sets it apart from other computing options, your hp laptop will become your newest trusty sidekick to help tackle everything life throws at you—from work tasks to leisure activities.</p>
                                <p></p>
                                <p>Action: Get your hands on one now – click here to purchase an HP laptop today!</p>
                            </div>
                            <div class="text-gray-700 text-sm font-medium pt-1 pb-1.5">HP Laptops</div>
                            <div class="flex flex-row text-gray-500 text-xs font-normal">
                                <div>Edited 3 days ago</div>
                            </div>
                            <div class="absolute right-1.5 bottom-1.5">
                                <div class="relative" data-headlessui-state="">
                                  <button id="headlessui-menu-button-:r2f:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                      <span class="sr-only">DRAFT</span>
                                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9999 0.429993C9.41404 0.429993 6.49152 1.44118 4.46633 3.46639C2.44112 5.49158 1.42993 8.4141 1.42993 12C1.42993 15.5859 2.44112 18.5083 4.46633 20.5337C6.49152 22.5589 9.41404 23.57 12.9999 23.57C16.5858 23.57 19.5083 22.5589 21.5336 20.5337C23.5588 18.5083 24.5699 15.5859 24.5699 12C24.5699 8.4141 23.5588 5.49158 21.5336 3.46639C19.5083 1.44118 16.5858 0.429993 12.9999 0.429993Z" fill="#F3F4F6"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 4.28668C10.6094 4.28668 8.66102 4.96081 7.31089 6.31095C5.96075 7.66108 5.28662 9.60942 5.28662 12C5.28662 14.3906 5.96075 16.3389 7.31089 17.6891C8.66102 19.0393 10.6094 19.7133 13 19.7133C15.3906 19.7133 17.3388 19.0393 18.6891 17.6891C20.0392 16.3389 20.7133 14.3906 20.7133 12C20.7133 9.60942 20.0392 7.66108 18.6891 6.31095C17.3388 4.96081 15.3906 4.28668 13 4.28668Z" fill="#D1D5DB"></path>
                                      </svg>
                                  </button>
                                </div>
                            </div>
                              </div>
                         
                                
                            

                        </div>
                  </div>
                  </div>
                </div>



                <div class="p-6 border-t border-gray-200">
                  <div class="space-y-3">
                      <div class="flex flex-row justify-between items-center gap-8">
                        <div class="text-sm text-gray-400">1 — 15 of 44</div>
                        <div class="flex justify-between items-center">
                            <button class="w-8 h-8 p-1 rounded-lg text-gray-400 opacity-75 hover:bg-transparent active:bg-transparent" disabled="">
                              <span>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
                                  </svg>
                              </span>
                            </button>
                            <button disabled="" class="w-8 h-8 p-1 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-600 active:bg-blue-600">1</button><button class="w-8 h-8 p-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 text-base font-semibold text-gray-500">2</button><button class="w-8 h-8 p-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 text-base font-semibold text-gray-500">3</button>
                            <button class="text-gray-900 w-8 h-8 p-1 rounded-lg hover:bg-gray-100 active:bg-gray-200">
                              <span>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                                  </svg>
                              </span>
                            </button>
                        </div>
                      </div>
                  </div>
                </div>
                
            </div>
          </div>
          </>
        }
      </div>
      <Toaster />
    </div>
  );
};

export default ListOfDocument;
