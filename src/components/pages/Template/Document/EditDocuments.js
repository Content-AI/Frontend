import React, { useEffect, useState } from "react";
import QuillWrapper from './quillcomponent'
import { useParams } from 'react-router-dom';

import { fetchData, patchData,postData } from "../../../../apis/apiService";
import { BACKEND_URL, BACK_END_API_DOCUMENTS, BACK_END_API_RESPONSE,BACK_API_HISTORY, BACK_END_API_INNER_TEMPLATE } from "../../../../apis/urls";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";

import { useLocation } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import {setText} from "../../../../features/EditorText";

import ResponseTemplate from "../ResponseTemplate";

import BouncingDotsLoader from "../../../BouncingDotsLoader";

export default function EditDocuments() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [delta, setDelta] = useState({
    ops: [{ insert: "" }]
  });
  const [dirtyInnerHTML, setDirtyInnerHTML] = useState("");
  // const [text, setText] = useState("");
  const [length, setLength] = useState("");
  const [DocumentId, setDocumentId] = useState(null);
  const [title, settitle] = useState(null);

  const [TemplateData, setTemplateData] = useState(null);

  const { document_id } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const templateValue = searchParams.get('template');


  let TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );

  let EDITOR_TEXT = useSelector(
    (state) => state.SetEditorText
  );


  const [TemplateDataInputFields, setTemplateDataInputFields] = useState([]);
  const [TemplateResponseData, setTemplateResponseData] = useState(null);

  const [ProjectId, setProjectId] = useState(null);

  // const [Inputlanguage,setInputlanguage] = useState([]);

  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [HoverBtnColor,setHoverBtnColor] = useState(true);



  const [Outputlanguage, setOutputlanguage] = useState([]);
  const [OutputlanguageChoice, setOutputlanguageChoice] = useState("English");



  const [inputs, setInputs] = useState([]);
  const [multipleInputForms, setMultipleInputForms] = useState({});



  const [ShowHideHistory, setShowHideHistory] = useState(false);

  const [history_answer, set_history_answer] = useState(null);

  const [range_of_text_from_browser, setrange_of_text_from_browser] = useState(0);

  const [ContentOutputNumber, setContentOutputNumber] = useState(2);

  const [LoadingButton, setLoadingButton] = useState(false);
  
  const [LengthOfWord, setLengthOfWord] = useState('');


  const { template_id } = useParams();

  const notifyerror = (message) => toast.error(message);
  const notifysucces = (message) => toast.success(message);


  const [renderKey, setRenderKey] = useState(0);

  const [fieldValues, setFieldValues] = useState([]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const truncatedValue = value.slice(0, TemplateData[0]['template_fields'][index].range_of_text);
    const updatedFieldValues = [...fieldValues];
    updatedFieldValues[index] = { ...updatedFieldValues[index], name, value: truncatedValue };

    if (value === '') {
      updatedFieldValues[index].value = ' ';
    }
    if (value.length > 3) {
      updatedFieldValues[index].value = value.trimStart();
    }

    setFieldValues(updatedFieldValues);
  };

  const get_document_content = async (document_id, templateValue) => {
    const resp = await fetchData(BACKEND_URL + BACK_END_API_DOCUMENTS + "/" + document_id + "/", TOKEN)
    const resp_template_data = await fetchData(BACKEND_URL + BACK_END_API_INNER_TEMPLATE + templateValue, TOKEN)

    try {
      if (resp.status == 200) {
        const res_data = resp.data?.document_content
        const formattedData = res_data.replace(/\n/g, '<br>');
        // dispatch(setText(formattedData));
        setDelta(formattedData)
        settitle(resp.data?.title)
        setDocumentId(resp.data.id)
        setLengthOfWord(resp.data?.document_content)
      } else {
        navigate("/template")
      }

      if (resp_template_data.status == 200) {
        setTemplateData(resp_template_data.data)
      }else{
        navigate("/template")
      }
    } catch (e) {
      notifyerror("something went wrong refresh page")
    }

  }

  const get_history = async() => {
    const resp =  await fetchData(BACKEND_URL+BACK_API_HISTORY,TOKEN)
    if(resp.status=200){
        set_history_answer(resp.data)
    }
  }
  useEffect(() => {
    if (document_id.length > 0) {
      get_document_content(document_id, templateValue)
      get_history()
    }
  }, [])

  const handleTextChange = (content, delta, source, editor) => {
    // console.log(editor.getContents()["ops"][0]["insert"])
    const data = editor.getContents()["ops"][0]["insert"]
    const text = data.replace(/\n/g, '<br>');
    // console.log("text",text)
    setDelta(editor.getContents()); // the delta
    // dispatch(setText(text))
    setLengthOfWord(editor.getContents()["ops"][0]["insert"])
    // setDirtyInnerHTML(editor.getHTML()); // innerhtml

    // console.log("text",text)
    // setText(text); // text string

    // setLength(editor.getLength()); // text length
  };

  useEffect(()=>{
    if(EDITOR_TEXT.text){
      setDelta(EDITOR_TEXT.text)
      dispatch(setText(null))
    }
  },[EDITOR_TEXT])



  const handleClick = async(id_of_template) => {

    const divElement = document.getElementById(id_of_template);
    const inputElements = divElement.getElementsByTagName('input');
    const textareaElements = divElement.getElementsByTagName('textarea');
  
    const elements = [...inputElements, ...textareaElements];
  
    const formData = Array.from(elements).reduce((data, element) => {
      data[element.name] = element.value;
      return data;
    }, {});
    let isFormDataValid = true;
    formData["language"]="Generate whole text in "+OutputlanguageChoice+" Language"
    formData["output_results"]=ContentOutputNumber.toString()
    formData["generate"]=TemplateData[0]["title"]
    
    const keyToCheck = /^(?!.*[Tt]one)(?!.*features).*$/;

    Object.entries(formData).forEach(([key, value]) => {
      if (key.match(keyToCheck)) { // Case-sensitive match
        if (value.trim() === "") {
          notifyerror(`Value for ${key} is empty.`);
          isFormDataValid = false;
        }
      }
    });

    if (inputs.length > 0) {
      formData["inputs"] = inputs;
    }


    
    if (inputs.length > 0) {
      formData["inputs"] = inputs;
    }
    
    Object.entries(formData).forEach(([key, value]) => {
      const trimmedValue = value.trim();
      if (trimmedValue === '') {
        delete formData[key]; // Remove the key from formData
      }
    });
    if (isFormDataValid) {
        setLoadingButton(true)
        setShowHideHistory(false)
        setHoverBtnColor(false)
        const res_of_template =  await postData(formData,BACKEND_URL+BACK_END_API_RESPONSE,TOKEN)
        if(res_of_template.status==200){
          setTemplateResponseData(res_of_template.data.data)
            // console.log(res_of_template.data)
        setProjectId(res_of_template.data.project_id)
        }else{
            notifyerror("Try again")

        }
      }    
    
      setLoadingButton(false)
  };




  const handleMultipleInputChange = (event, index) => {
    const { value } = event.target;
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleMultipleInputDelete = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleAdd = () => {
    setInputs([...inputs, ""]);
  };


  const handleInputLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const handleOutputLanguageChange = (event) => {
    setOutputlanguageChoice(event.target.value);
  };



  const displayText = (index) => {
    if (index === 0) {
      return "Tell us first key word";
    } else if (index === 1) {
      return "Tell us second key word";
    } else if (index === 2) {
      return "One last word";
    } else {
      return "...";
    }
  };


  const handleTitleChange = (event) => {
    const inputValue = event.target.value
    settitle(inputValue)
  };

  const handleTitleApi = async (event) => {
    if (event.key === 'Enter') {
      const formData = {
        title: title
      }
      await patchData(formData, BACKEND_URL + BACK_END_API_DOCUMENTS + "/" + document_id + "/", TOKEN)
    }
  };


  const LoaderDiv = () => {
    return (
          <div className="flex justify-center items-center mt-[50vh]">
            <div className="border-t-4 border-gray-900 rounded-full animate-spin h-12 w-12"></div>
          </div>
    )
  }

  return (
    <div className="fixed z-50 top-0 left-0 right-0 h-screen bg-white">
      <div className="relative z-10">
        {/* ============================== */}

        <div>
          <div className="jsx-1f9b1dd4731f1fae flex flex-col overflow-hidden h-[100vh] h-calc-vh-0" >
            <div className="flex flex-col z-20 shadow-md shadow-slate-500/10 bg-white divide-y divide-slate-200 mb-1">
              <div className="flex flex-wrap items-center justify-center py-1 overflow-visible space-x-2">
                <div className="flex items-center justify-start space-x-2 px-3 flex-1">
                  <div className="-mx-3">
                    <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-4 py-2 text-base text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                      onClick={() => {
                        navigate("/template")
                      }}
                    >
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path d="M1.14,8H14.86" fill="none" stroke="#0D121C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5.71,3.43c-2,1.64-3,2.64-4.57,4.57,1.56,1.92,2.56,2.93,4.57,4.57" fill="none" stroke="#0D121C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span className="sr-only">Back</span>
                      </span>
                    </button>
                  </div>
                  <input
                    className="truncate outline-none focus:outline-none text-sm disabled:bg-white disabled:cursor-not-allowed"
                    type="text"
                    placeholder=""
                    value={title}
                    onChange={handleTitleChange}
                    onKeyDown={handleTitleApi}
                  />

                </div>
                <div className="hidden md:flex flex-none items-center justify-center">
                  <div className="
                  flex items-center transform
                  [&amp;_.active_button]:bg-indigo-100
                  [&amp;_.active_button]:text-indigo-600
                  [&amp;_.active_button]:ring-indigo-700
                  [&amp;_:not(:first-child,:last-child)_button]:!rounded-none
                  [&amp;_:first-child_button]:!rounded-r-none
                  [&amp;_:last-child_button]:!rounded-l-none
                  ">
                    <span className="relative hover:z-10">
                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </span>
                    <span className="relative hover:z-10">
                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </span>
                    <span className="relative hover:z-10">
                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          <span>
                            <svg className="w-4 h-4" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M25 28.5H28.5C29 28.5 29.3 28.1 29.3 27.7V11.4C29.3 10.9 28.9 10.6 28.5 10.6H25C24.5 10.6 24.2 11 24.2 11.4V27.7C24.2 28.1 24.6 28.5 25 28.5ZM6 9V18.5V20.5V21.5H8L6 24.4L4 27.3L2 24.4L0 21.5H2.1V20.5V18.5V9C2.1 4.1 6.1 0 11.1 0H32.2C37.1 0 41.2 4 41.2 9H37.3C37.3 6.2 35 4 32.3 4H11C8.3 3.9 6 6.2 6 9ZM39.1 11.7L41.1 14.6L43.1 17.5H41.1V18.5V19.4V30C41.1 34.9 37.1 39 32.1 39H11C6.1 39 2 35 2 30H6C6 32.8 8.3 35 11 35H32.1C34.9 35 37.1 32.7 37.1 30V19.5V18.6V17.6H35.1L37.1 14.7L39.1 11.7ZM14.6 28.5H18.1C18.6 28.5 18.9 28.1 18.9 27.7V17.3C18.9 16.8 18.5 16.5 18.1 16.5H14.6C14.1 16.5 13.8 16.9 13.8 17.3V27.6C13.8 28.1 14.2 28.5 14.6 28.5Z" fill="currentColor"></path>
                              <defs></defs>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </span>
                    <span className="active z-10">
                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          <span>
                            <svg className="w-4 h-4" viewBox="0 0 16 14" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M14 1.6001H7V12.3999H14C14.1025 12.3999 14.1963 12.3611 14.2671 12.2974C14.3486 12.2244 14.3999 12.1182 14.3999 12V2C14.3999 1.87915 14.3462 1.77075 14.2612 1.69727C14.1914 1.63672 14.1001 1.6001 14 1.6001ZM2 0C0.895508 0 0 0.895508 0 2V12C0 13.1045 0.895508 14 2 14H14C15.1045 14 16 13.1045 16 12V2C16 0.895508 15.1045 0 14 0H2ZM5 4H2V5H5V4ZM2 6H5V7H2V6ZM5 8H2V9H5V8Z" fill="currentColor"></path>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end px-3 py-0.5 space-x-2 flex-1">
                  <div className="pr-2 text-sm text-gray-400">{LengthOfWord.length}</div>
                  <div className="relative inline-block text-left" data-headlessui-state="">
                    <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1" id="headlessui-menu-button-:r1:" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <span className="-mx-1.5">
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M10.29,2.61c0-.65-.19-1.24-.61-1.67-.43-.43-1.02-.61-1.67-.61s-1.25,.18-1.67,.61c-.43,.43-.61,1.02-.61,1.67s.19,1.24,.61,1.67c.43,.43,1.02,.61,1.67,.61s1.25-.19,1.67-.61c.43-.43,.61-1.02,.61-1.67Zm0,5.39c0-.65-.19-1.24-.61-1.67-.43-.43-1.02-.61-1.67-.61s-1.25,.19-1.67,.61c-.43,.43-.61,1.02-.61,1.67s.19,1.24,.61,1.67c.43,.43,1.02,.61,1.67,.61s1.25-.19,1.67-.61c.43-.43,.61-1.02,.61-1.67Zm0,5.39c0-.65-.19-1.24-.61-1.67-.43-.43-1.02-.61-1.67-.61s-1.25,.19-1.67,.61c-.43,.43-.61,1.02-.61,1.67s.19,1.24,.61,1.67c.43,.43,1.02,.61,1.67,.61s1.25-.19,1.67-.61c.43-.43,.61-1.02,.61-1.67Z" fill="currentColor" fillRule="evenodd"></path>
                          </svg>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex md:hidden py-2 px-1 space-x-2 justify-between">
                <span className="basis-1/3 flex items-center justify-start"></span>
                <span className="basis-1/3 flex items-center justify-center">
                  <div className="
                  flex items-center transform
                  [&amp;_.active_button]:bg-indigo-100
                  [&amp;_.active_button]:text-indigo-600
                  [&amp;_.active_button]:ring-indigo-700
                  [&amp;_:not(:first-child,:last-child)_button]:!rounded-none
                  [&amp;_:first-child_button]:!rounded-r-none
                  [&amp;_:last-child_button]:!rounded-l-none
                  ">
                    <span className="relative hover:z-10">
                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </span>
                    <span className="relative hover:z-10">
                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </span>
                    <span className="relative hover:z-10">
                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          <span>
                            <svg className="w-4 h-4" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M25 28.5H28.5C29 28.5 29.3 28.1 29.3 27.7V11.4C29.3 10.9 28.9 10.6 28.5 10.6H25C24.5 10.6 24.2 11 24.2 11.4V27.7C24.2 28.1 24.6 28.5 25 28.5ZM6 9V18.5V20.5V21.5H8L6 24.4L4 27.3L2 24.4L0 21.5H2.1V20.5V18.5V9C2.1 4.1 6.1 0 11.1 0H32.2C37.1 0 41.2 4 41.2 9H37.3C37.3 6.2 35 4 32.3 4H11C8.3 3.9 6 6.2 6 9ZM39.1 11.7L41.1 14.6L43.1 17.5H41.1V18.5V19.4V30C41.1 34.9 37.1 39 32.1 39H11C6.1 39 2 35 2 30H6C6 32.8 8.3 35 11 35H32.1C34.9 35 37.1 32.7 37.1 30V19.5V18.6V17.6H35.1L37.1 14.7L39.1 11.7ZM14.6 28.5H18.1C18.6 28.5 18.9 28.1 18.9 27.7V17.3C18.9 16.8 18.5 16.5 18.1 16.5H14.6C14.1 16.5 13.8 16.9 13.8 17.3V27.6C13.8 28.1 14.2 28.5 14.6 28.5Z" fill="currentColor"></path>
                              <defs></defs>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </span>
                    <span className="active z-10">
                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1">
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          <span>
                            <svg className="w-4 h-4" viewBox="0 0 16 14" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M14 1.6001H7V12.3999H14C14.1025 12.3999 14.1963 12.3611 14.2671 12.2974C14.3486 12.2244 14.3999 12.1182 14.3999 12V2C14.3999 1.87915 14.3462 1.77075 14.2612 1.69727C14.1914 1.63672 14.1001 1.6001 14 1.6001ZM2 0C0.895508 0 0 0.895508 0 2V12C0 13.1045 0.895508 14 2 14H14C15.1045 14 16 13.1045 16 12V2C16 0.895508 15.1045 0 14 0H2ZM5 4H2V5H5V4ZM2 6H5V7H2V6ZM5 8H2V9H5V8Z" fill="currentColor"></path>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </span>
                  </div>
                </span>
                <span className="basis-1/3 flex items-center justify-end space-x-2">
                  <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-2 py-1 text-xs bg-white bg-opacity-20 text-gray-600 ring-1 ring-gray-50 active:ring-1 hover:ring-gray-100 hover:ring-2 active:ring-gray-300 hover:text-gray-800 active:text-gray-800 aspect-1">
                    <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" className="jsx-628cec04c4b4a2cc w-4 h-4 text-slate-400 group-hover:text-slate-500">
                        <circle cx="46" cy="46" fill="currentColor" r="46" className="jsx-628cec04c4b4a2cc"></circle>
                        <path d="M55.1 52.2c-1.9 0-3.4 1.7-3.1 3.7.3 1.5 1.7 2.5 3.2 2.5H60l2.8-.4c-4.5 6.6-12.2 9.6-20.7 8.2-6.9-1.1-12.8-5.8-15.3-12.3-5.7-14.8 5.1-29 19.2-29 7.3 0 13.8 4.3 17.5 9.5v.1c1 1.4 2.9 1.8 4.3.8 1.3-.9 1.7-2.7.9-4.1-5.1-8-14.3-13.1-24.6-12.4C30.7 19.9 19.8 30.9 19 44.4c-.9 15.7 11.5 28.4 27 28.4 8.1 0 15.4-3.5 20.3-9.3l-.6 3.3v3c0 1.5 1 2.9 2.5 3.2 2 .4 3.7-1.2 3.7-3.1V52.2z" fill="#fff" className="jsx-628cec04c4b4a2cc"></path>
                      </svg>
                    </span>
                  </button>
                  <div className="relative z-500" data-headlessui-state="">
                    <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-2 py-1 text-xs bg-white bg-opacity-20 text-gray-600 ring-1 ring-gray-50 active:ring-1 hover:ring-gray-100 hover:ring-2 active:ring-gray-300 hover:text-gray-800 active:text-gray-800 aspect-1" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r2:">
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path d="M8,15.14c3.94,0,7.14-3.2,7.14-7.14S11.94,.86,8,.86,.86,4.05,.86,8s3.2,7.14,7.14,7.14Z" fill="none" stroke="#374151" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5.14,8.71l2.08,2.14c.98-2.81,1.79-4.04,3.64-5.71" fill="none" stroke="#374151" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </span>
              </div>

            </div>
            <div className="jsx-1f9b1dd4731f1fae flex flex-col-reverse md:flex-row bg:white overflow-hidden h-full">
              <div className="relative shadow-md z-10 bg-slate-50 max-h-[calc(100vh-4rem)] shrink-0 h-[50%] md:h-full w-full rounded-none border-r border-t md:border-t-0 border-slate-200 md:w-[400px] lg:w-[480px]">
                <div className="inset-0 overflow-auto flex flex-col divide-y divide-slate-200 h-full">
                  <div className="flex flex-col h-full relative bg-white overflow-auto p-4 xl:p-6">
                    <div className="flex flex-row absolute inset-0 divide-x divide-slate-200">
                      {/* ===========Template name from apis=============== */}

                      <div className="flex flex-row items-start justify-between pl-4 pr-3 py-3 sticky top-0 z-50 border-b border-slate-200 w-full bg-white">
                        <div className="flex items-baseline">
                          <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-4 py-2 text-base text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent pl-0">
                            <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M1.14,8H14.86" fill="none" stroke="#0D121C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">

                                </path>
                                <path d="M5.71,3.43c-2,1.64-3,2.64-4.57,4.57,1.56,1.92,2.56,2.93,4.57,4.57" fill="none" stroke="#0D121C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path></svg><span className="sr-only">Back</span></span></button></div><div className="flex flex-col w-full">

                          {TemplateData && (
                            <>
                              <div className="flex-1">
                                <h2 className="leading-7 text-gray-900 font-semibold line-clamp-1">
                                  {TemplateData[0].title}
                                </h2>
                                <p className="leading-tight text-gray-500 text-xs line-clamp-1">
                                  {TemplateData[0].description}
                                </p>
                              </div>
                            </>
                          )}

                          <div className="pt-2">
                            <div className="
                                flex items-center transform
                                [&amp;_.active_button]:bg-indigo-100
                                [&amp;_.active_button]:text-indigo-600
                                [&amp;_.active_button]:ring-indigo-700
                                [&amp;_:not(:first-child,:last-child)_button]:!rounded-none
                                [&amp;_:first-child_button]:!rounded-r-none
                                [&amp;_:last-child_button]:!rounded-l-none
                              ">
                              <span className="active z-10 mr-3">
                                <button type="button" 
                                  onClick={()=>{
                                    setHoverBtnColor(true)
                                  }}
                                  className={`${
                                              HoverBtnColor
                                                ? "bg-slate-400 "
                                                : " "
                                            } transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1`}

                                >
                                  <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                    <small className="-my-0.5">
                                      Inputs
                                    </small>
                                  </span>
                                </button>
                              </span>
                              <span className="relative hover:z-10">
                                <button type="button" 
                                  onClick={()=>{
                                    setHoverBtnColor(false)
                                  }}
                                  className={`${
                                              HoverBtnColor
                                                ? " "
                                                : " bg-slate-400 "
                                            } transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1`}>
                                  <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                    <small className="-my-0.5">
                                      Outputs
                                    </small>
                                  </span>
                                </button>
                              </span>

                            </div>
                          </div>
                          
                          {HoverBtnColor
                          ?
                            <>
                              {/* =============Template inner value==================== */}
                              <div className="grow p-3 xl:p-6 xl:pb-28 flex-1 space-y-6 xl:overflow-y-auto">
                              <div id={document_id} className="mt-4 mb-7">
                              {TemplateData &&
                                TemplateData[0]['template_fields'].map((data, index) => {
                                  const textLength = fieldValues[index]?.value?.length || 0;
                                return (
                                  (data.component === "textarea" && (
                                    <div className="last:mb-1 relative" key={index}>
                                      <div className="space-y-1.5 w-full">
                                        <label
                                          htmlFor="form-field-productInfo"
                                          className="text-sm font-medium block text-gray-900 placeholder:text-gray-400 transition-[color] duration-150 ease-in-out"
                                        >
                                          <span className="flex items-center space-x-1">
                                            <span>{data.label}</span>
                                          </span>
                                        </label>
                                        <div className="py-2.5 relative gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                                          <textarea
                                            id="form-field-productInfo"
                                            className="block w-full h-[300px] text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none max-h-64 overflow-y-auto"
                                            maxLength={data.range_of_text}
                                            name={data.title}
                                            placeholder={data.placeholder}
                                            value={
                                              fieldValues[index]?.value ||
                                              data.pre_define_value ||
                                              ""
                                            }
                                            onChange={(event) =>
                                              handleInputChange(event, index)
                                            }
                                          ></textarea>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="ml-auto text-xs text-gray-500 transition-[color] duration-150 ease-in-out">
                                            {textLength}/{data.range_of_text}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )) ||
                                  (data.component === "text" && (
                                    <div className="space-y-1.5 w-full" key={index}>
                                      <label
                                        htmlFor="form-field-productName"
                                        className="text-sm font-medium block text-gray-900 placeholder:text-gray-400 transition-[color] duration-150 ease-in-out"
                                      >
                                        <span className="flex items-center space-x-1">
                                          <span>{data.label}</span>
                                        </span>
                                      </label>
                                      <div className="py-1 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                                        <div className="flex items-center grow gap-2 py-1.5">
                                          <div className="flex gap-1 grow">
                                            <input
                                              id="form-field-productName"
                                              className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none"
                                              maxLength={data.range_of_text}
                                              name={data.title}
                                              type={data.component}
                                              placeholder={data.placeholder}
                                              value={
                                                fieldValues[index]?.value ||
                                                data.pre_define_value ||
                                                ""
                                              }
                                              onChange={(event) =>
                                                handleInputChange(event, index)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="ml-auto text-xs text-gray-500 transition-[color] duration-150 ease-in-out">
                                          {textLength}/{data.range_of_text}
                                        </span>
                                      </div>
                                    </div>
                                  )) ||
                                  (data.component === "Example" && (
                                    <>
                                      <div>
                                        <label
                                          htmlFor="form-field-productInfo"
                                          className="text-sm font-medium block text-gray-900 placeholder:text-gray-400 transition-[color] duration-150 ease-in-out"
                                        >
                                          <span className="flex items-center space-x-1">
                                            <span>Example</span>
                                          </span>
                                        </label>
                                      </div>
                                      <div className="flex justify-between flex-col space-y-2 key={index_inner}">
                                        {inputs.map((input, index_inner) => (
                                          <div
                                            className="flex justify-between flex-col space-y-2"
                                            key={index_inner}
                                          >
                                            <div className="flex items-center justify-between space-x-2">
                                              <div className="bg-gray-300/20 text-gray-500 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {index_inner + 1}
                                              </div>
                                              <div className="space-y-1.5 w-full">
                                                <div className="py-1 !mt-0 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                                                  <div className="flex items-center grow gap-2 py-1.5">
                                                    <div className="flex gap-1 grow">
                                                      <input
                                                        id={`example-${index_inner + 1}`}
                                                        type="text"
                                                        className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none"
                                                        placeholder={displayText(
                                                          index_inner
                                                        )}
                                                        value={input}
                                                        onChange={(event) =>
                                                          handleMultipleInputChange(
                                                            event,
                                                            index_inner
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Delete button */}
                                              <button
                                                type="button"
                                                className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 selectionRing active:bg-gray-100 active:text-gray-700"
                                                onClick={() =>
                                                  handleMultipleInputDelete(index_inner)
                                                }
                                              >
                                                <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    className="w-3"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                      clipRule="evenodd"
                                                    ></path>
                                                  </svg>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        ))}

                                        {/* + button */}
                                        <span className="self-end">
                                          <button
                                            type="button"
                                            className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
                                            onClick={handleAdd}
                                          >
                                            +
                                          </button>
                                        </span>

                                        {/* Submit button */}
                                        {/* <button
                                                          type="button"
                                                          className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 selectionRing active:bg-gray-100 active:text-gray-700"
                                                          onClick={handleSubmit}
                                                      >
                                                          save
                                                      </button> */}
                                      </div>
                                    </>
                                  ))
                                );
                                })}                                 
                              </div>

                              </div>

                              {/* =======Generate Button=========== */}
                              <div className="pointer-events-none xl:bottom-0 xl:sticky xl:w-full xl:left-0 xl:z-20 @container">
                                <div className="flex flex-row items-center justify-between p-3 border-b border-gray-200 pointer-events-auto bg-gray-50 xl:bg-white xl:border-t xl:border-0 xl:border-gray-200 xl:py-3 xl:px-6">
                                  {/* <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"> */}
                                  <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm  hover:ring-2 active:ring-1">
                                    <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4 opacity-50 -mx-1 @md:mx-0">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg> */}
                                      <span className="hidden @sm:inline-block text-black">Clear inputs</span>
                                    </span>
                                  </button>
                                  <div className="flex ">
                                    <input type="number"
                                      // className="form-inputs formInput max-w-[80px] mr-3" 
                                      className='mr-2 w-[70px] border border-gray-300 rounded-md py-2 px-4 pr-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                      // defaultValue={ContentOutputNumber}
                                      onChange={(e) => {
                                      }}
                                      max="10" min="1"
                                    />
                                     <button type="submit" className="w-[200px] transition-all duration-200 relative font-semibold outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm hover:from-purple-500 hover:to-blue-500 selectionRing active:from-purple-700 active:to-blue-700" id="generateBtn1"
                                        onClick={()=>{
                                            handleClick(document_id)
                                            setTemplateResponseData(null)
                                        }}
                                        disabled={LoadingButton}
                                        >
                                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                          Generate
                                        </span>
                                    </button>

                                  </div>
                                </div>
                              </div>

                              {/* ================== */}
                                
                            </>
                          :
                              <div className="mt-4 h-screen bg-[#eff2f9] font-semibold text-[17px]  text-slate-600 max-h-[500px] overflow-y-auto">
                                <div className="sticky top-0 flex items-center px-3 bg-white border-b border-gray-200">
                                <nav className="flex flex-grow py-1 space-x-3" aria-label="Tabs">
                                    <button 
                                      className={`${
                                        ShowHideHistory
                                              ? "  "
                                              : " bg-gray-100 "
                                          } relative whitespace-nowrap py-2 px-3 text-xs font-medium  rounded-lg text-blue-800 transition-all duration-150 hover:text-black`}

                                    onClick={()=>{
                                        get_history()
                                        setShowHideHistory(false)
                                        // setTemplateResponseData(null)
                                    }}
                                    >
                                    {/* <span className="relative">New outputs {ContentOutputNumber.toString()}</span> */}
                                    <span className="relative">
                                      New outputs 2
                                    </span>

                                    </button>
                                    <button 
                                      className={`${
                                        ShowHideHistory
                                              ? " bg-gray-100 "
                                              : " "
                                          } relative whitespace-nowrap py-2 px-3 text-xs font-medium rounded-lg text-blue-800 transition-all duration-150 hover:text-black`}

                                    onClick={()=>{
                                        // get_history()
                                        setShowHideHistory(true)
                                        // setTemplateResponseData(null)
                                    }}>
                                    <span className="relative">History</span>
                                    </button>
                                </nav>
                                <div>
                                    <button className="relative whitespace-nowrap px-3 py-2 text-xs font-medium leading-4 text-gray-400 transition-all duration-150 hover:text-gray-600"
                                    onClick={()=>{
                                        setTemplateResponseData(null)
                                    }}>
                                    <span className="relative">Clear</span>
                                    </button>
                                </div>
                                </div>


                            {ShowHideHistory
                            ?
                                (history_answer
                                ?
                                    (history_answer.map((data,index)=>{
                                        return (
                                            <div key={index}>
                                                <ResponseTemplate r_show={"false"} r_id={data["id"]} r_time={data["created_at"]} r_data={data["answer_response"]}/>
                                            </div>
                                        )
                                    }))
                                :
                                    null
                                )
                            :

                            (TemplateResponseData
                                ?
                                TemplateResponseData.map((data,index)=>{
                                    return (
                                        <div key={index}>
                                            <ResponseTemplate  r_show={"false"} r_time={data["created_at"]} r_data={data["content"]}/>
                                        </div>
                                    )
                                })
                                :
                                (LoadingButton
                                    ?
                                        <>
                                            <div className="mt-3 flex flex-col items-center justify-center">
                                            <div>
                                                <p>
                                                Generating content ...
                                                </p>
                                            </div>
                                            <div className='mt-3'>
                                                <BouncingDotsLoader />
                                            </div>
                                            </div>
                                        </>
                                    :
                                        null
                                    )
                            )
                            }
                            </div>
                            
                          }
                          

                        </div>

                      </div>

                      {/* ========================== */}
                      <div className="h-full flex-1">
                        <div className="h-full flex justify-center items-center">
                          <div className="w-6 h-6 text-gray-400 relative overflow-hidden text-center">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex absolute w-full left-0 z-10 justify-between gap-3 items-center pointer-events-none top-0">
                  <div></div>
                  <div className="flex flex-row-reverse justify-between w-full"></div>
                </div>
              </div>
              <div className="jsx-1f9b1dd4731f1fae relative overflow-auto grow shrink">
                <div id="editor-012fce57-54d2-4046-8789-1402c27159c4" className="jsx-1f9b1dd4731f1fae min-h-full flex flex-col relative bg-white [&amp;>div]:border-none">
                  <div className="relative bg-white border border-gray-300 flex flex-col grow">
                    {/* <div className="flex flex-col grow">
                     <div className="select-text whitespace-pre-wrap break-words outline-none focus:outline-none relative grow pt-12 pb-[240px] px-[max((100%-700px)/2,64px)]" contentEditable="false" spellCheck="true"  data-lexical-editor="true" aria-autocomplete="none"></div>
                  </div> */}
                    {/* <div className="absolute inset-6 pointer-events-none select-none overflow-hidden opacity-60"></div> */}
                    <div className="jsx-1f9b1dd4731f1fae absolute inset-0 z-0 pointer-events-none">

                    </div>
                    {/* <div hidden="" c  lassName="absolute -translate-y-1/2 pointer-events-none"><span className="text-gray-400">Start writing or press <span className="bg-gray-50 border border-gray-100 font-semibold rounded-md px-1.5 py-0.5">/</span> to tell Jasper what to write</span></div> */}
                    {delta
                    ?
                      <QuillWrapper
                        onChange={handleTextChange}
                        value={delta}
                        className="h-[100vh]"
                      />
                    :   
                      <LoaderDiv />
                    }

                  </div>
                  <div className="jsx-1f9b1dd4731f1fae absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 text-gray-400 relative overflow-hidden text-center">
                      {/* <svg
                          id="Layer_1"
                          className="inset-0"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 50 50"
                          xmlSpace="preserve"
                        >
                          <path
                            fill="currentColor"
                            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                          >
                            <animateTransform
                              attributeType="xml"
                              attributeName="transform"
                              type="rotate"
                              from="0 25 25"
                              to="360 25 25"
                              dur="0.4s"
                              repeatCount="indefinite"
                            ></animateTransform>
                          </path>
                        </svg> */}
                    </div>
                  </div>
                  <span className="transform -translate-y-full text-white bg-indigo-700 font-semibold px-0.5 fixed z-10 text-xs pointer-events-none hidden top-neg-99999">Jasper</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed z-9999 top-16 left-16 right-16 bottom-16 pointer-events-none"></div>
          <noscript><img height="1" width="1" className="hidden" alt="" src="https://px.ads.linkedin.com/collect/?pid=3958300&amp;fmt=gif" /></noscript>
          <div className="fixed block z-30  bottom-5 right-5">
            {/* <div className="flex items-center space-x-3">
          <button type="button" className="transition-all duration-200 relative font-semibold outline-none hover:outline-none focus:outline-none rounded-full px-2 py-1 text-xs text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm hover:from-purple-500 hover:to-blue-500 selectionRing active:from-purple-700 active:to-blue-700 aspect-1" id="help-menu-button" aria-haspopup="true">
              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.1523 25.4766C18.1523 23.918 18.3457 22.6758 18.7324 21.75C19.1191 20.8242 19.8809 19.8105 21.0176 18.709C22.166 17.5957 22.8926 16.8047 23.1973 16.3359C23.666 15.6211 23.9004 14.8477 23.9004 14.0156C23.9004 12.9141 23.625 12.0762 23.0742 11.502C22.5352 10.916 21.7383 10.623 20.6836 10.623C19.6758 10.623 18.8613 10.9102 18.2402 11.4844C17.6309 12.0469 17.3262 12.8145 17.3262 13.7871H13.0547C13.0781 11.7129 13.7812 10.0723 15.1641 8.86523C16.5586 7.6582 18.3984 7.05469 20.6836 7.05469C23.0391 7.05469 24.873 7.65234 26.1855 8.84766C27.5098 10.043 28.1719 11.7129 28.1719 13.8574C28.1719 15.7676 27.2812 17.6484 25.5 19.5L23.3379 21.627C22.5645 22.5059 22.166 23.7891 22.1426 25.4766H18.1523ZM17.8535 30.9434C17.8535 30.252 18.0703 29.6953 18.5039 29.2734C18.9375 28.8398 19.5234 28.623 20.2617 28.623C21.0117 28.623 21.6035 28.8457 22.0371 29.291C22.4707 29.7246 22.6875 30.2754 22.6875 30.9434C22.6875 31.5879 22.4766 32.127 22.0547 32.5605C21.6328 32.9941 21.0352 33.2109 20.2617 33.2109C19.4883 33.2109 18.8906 32.9941 18.4688 32.5605C18.0586 32.127 17.8535 31.5879 17.8535 30.9434Z" fill="currentColor"></path>
                </svg>
              </span>
          </button>
        </div> */}
          </div>
        </div>
        {/* ============================== */}
      </div>

      <Toaster />

    </div>
  );
}
