import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL,BACK_END_API_PROJECT_CHOOSE,BACK_END_API_DOCUMENTS } from '../../apis/urls';
import { fetchData, postData } from '../../apis/apiService';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../LoadingPage";
import toast, { Toaster } from 'react-hot-toast';
import {
  _message_
} from "../../features/LoadingScreenMessage";
import { _load_screen_ } from "../../features/LoadingScreen";

import Select from 'react-select';



import {
    _save_folder_id_
  } from "../../features/ProjectOrFolderIdChoosen";
  

const CreateNewContent = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleGoBack = () => {
        navigate(-1);
    };

    let ChosenWorkspaceId = useSelector(
      (state) => state.SetChosenWorkspaceId.ChosenWorkspaceId
      );	

    const notifyerror = (message) => toast.error(message);


    const [selectedValue, setSelectedValue] = useState('');
    const [SelectedOptions, setSelectedOptions] = useState(null);

    let loading_page = useSelector(
      (state) => state.SetLoadingScreen.LoadingScreen
      );

    // const handleSelectChange = (event) => {
    //     setSelectedValue(event.target.value);
    //   };

    const [selectedOption, setSelectedOption] = useState({"value":"select a folder","label":"select a folder"});
    const [options, setoptions] = useState([
      { value: "Your content", label: "Your content"},
    ]);

    const get_project_data = async() => {

      if(ChosenWorkspaceId!=null){
          const resp = await fetchData(BACKEND_URL+BACK_END_API_PROJECT_CHOOSE+"?workspace_id="+ChosenWorkspaceId["Workspace_Id"],props.AUTH_TOKEN)
          if(resp.status==200){
              setSelectedOptions(resp.data)
              setoptions(resp.data)
          }
        }
    }
      useEffect(()=>{
        get_project_data()
      },[])

    //   useEffect(()=>{
    //     dispatch(_save_folder_id_(selectedValue))
    //   },[selectedValue])

      // useEffect(()=>{
      //   dispatch(_save_folder_id_(selectedOption.value))
      // },[selectedOption])

    
      const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
      };

    //   useEffect(()=>{
    //     console.log(selectedOption.value)
    //   },[selectedOption])



    // =============select folder or create new folder===========
    // const options = [
    //     { value: "your content", label: "Your content" },
    //   ];
    
      const [selectedOptionFolder, setSelectedOptionFolder] = useState(options[0].value);
      const [searchText, setSearchText] = useState("");
      const [showToUser,setshowToUser] = useState("Select a Folder");
      const [showDropdown, setShowDropdown] = useState(false);
    
      const handleOptionClick = (option) => {
        setSelectedOptionFolder(option);
        setShowDropdown(false);
      };
    
      const handleNewCampaignClick = () => {
          navigate("/projects?create=new_folder&true=redirect_site")
      };
    
      const handleSelectOption = (option) => {
        setshowToUser(option)
      };


      useEffect(()=>{
        dispatch(_save_folder_id_(selectedOptionFolder))
      },[selectedOptionFolder])
    
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );

      const capitalizeFrontText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      };


// ========popup for select go off when click on other div========
const dropdownRef = useRef(null);

useEffect(() => {
  function handleOutsideClick(e) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, []);


const create_blank_document = async() => {
  const formData = {
    document_content: "lslsllsls",
    workspace_id:ChosenWorkspaceId["Workspace_Id"]
  }
  
  const resp = await postData(formData,BACKEND_URL+BACK_END_API_DOCUMENTS+"/",props.AUTH_TOKEN)
  try{
    if(resp.status==201){
        dispatch(_load_screen_(false))
        dispatch(_message_(""))
        navigate(`/template_data/${resp.data.id}?template_editing=edit_by_user&content=chat_content&redirect=from_blank_document`)


    }else{
        notifyerror("something went wrong refresh page")
    }
  }catch(e){
      notifyerror("something went wrong refresh page")
  }
  }

  return (
    <>
    {loading_page
        ?
            <LoadingPage message={"Creating Document"}/>
        :
       <div className="fixed inset-0 z-40 overflow-y-auto" id="headlessui-dialog-:r27:" role="dialog" aria-modal="true" data-headlessui-state="open">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 opacity-100" id="headlessui-dialog-overlay-:r28:" aria-hidden="true" data-headlessui-state="open"></div>
                <div className="relative h-full bg-white text-gray-900 rounded-md shadow-xl align-top sm:align-middle w-full sm:w-[416px] md:w-[640px] opacity-100 translate-y-0 sm:scale-100">
                    <div className="flex flex-col p-6">
                        <div className="-m-6 divide-y divide-gray-200">
                        <div className="p-6 space-y-4">
                            <div className="space-y-1">
                                <h1 className="mb-2 text-lg font-semibold text-gray-900">Get started with new content powered by  <b> AI</b></h1>
                                <div className="flex">
                                    <div className="w-64 mt-2">
                                    {/* ============select field================= */}
                                      <div className="w-64" ref={dropdownRef}>
                                        <div className="relative inline-block text-left w-full">
                                          <button
                                            className="flex items-center justify-between w-full px-4 py-2 truncate transition-all duration-150 bg-white rounded-md group active:ring-gray-400 hover:ring-gray-300 ring-1 ring-gray-200"
                                            aria-label="Select a campaign"
                                            onClick={() => setShowDropdown((prevState) => !prevState)}
                                          >
                                            <span className="items-start block truncate">
                                              <span className="block text-sm text-left text-gray-600 truncate">
                                                {/* {selectedOptionFolder} */}
                                                {/* {showToUser} */}
                                                {capitalizeFrontText(showToUser)}
                                              </span>
                                            </span>
                                            <span className="ml-3 -mr-1">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                                              >
                                                <path d="M19 9l-7 7-7-7"></path>
                                              </svg>
                                            </span>
                                          </button>
                                          {showDropdown && (
                                            <div className="border border-green-300 origin-top absolute left-0 z-50 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none w-full !min-w-0 transform opacity-100">
                                              <div className="px-4 py-3">
                                                <div className="space-y-1.5 w-full">
                                                  <label htmlFor="search-projects" className="sr-only">
                                                    <span className="flex items-center space-x-1">
                                                      <span>Search projects</span>
                                                    </span>
                                                  </label>
                                                  <div className="py-1 !mt-0 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                                                    <div className="flex items-center grow gap-2 py-1.5">
                                                      <div className="flex gap-1 grow">
                                                        <input
                                                          id="search-projects"
                                                          type="text"
                                                          className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none"
                                                          placeholder="Search"
                                                          autoComplete="off"
                                                          value={searchText}
                                                          onChange={(e) => setSearchText(e.target.value)}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <ul className="py-1 max-h-[12.875rem] overflow-y-auto">
                                                {filteredOptions.map((option) => (
                                                  <li key={option.value}>
                                                    <button
                                                      className="text-left w-full relative text-gray-700 hover:bg-gray-200 hover:text-gray-900 truncate px-4 py-2 text-sm  pr-8"
                                                      onClick={() => {
                                                        handleOptionClick(option.value);
                                                        handleSelectOption(option.label);
                                                      }}
                                                    >
                                                    <span className="flex-grow">{capitalizeFrontText(option.label)}</span>
                                                    {option.label=="default"
                                                    ?
                                                    <svg className='w-6 h-6 float-right' xmlns-dc="http://purl.org/dc/elements/1.1/" xmlns-cc="http://creativecommons.org/ns#" xmlns-rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns-svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16.933333 21.1666675" x="0px" y="0px">
                                                      <g transform="translate(0,-280.06665)">
                                                          <path transform="matrix(0.26458334,0,0,0.26458334,0,280.06665)" d="m 58,21.998047 c -38.666667,28.001301 -19.333333,14.000651 0,0 z M 6.0019531,14.001953 H 18.927734 l 1.335938,2.001953 H 8.0019531 v 17.123047 0.002 l -2,9.330078 z m 6.0019529,5.994141 h 41.994141 v 2.001953 H 12.003906 Z m 1.615235,6.001953 H 57.341797 L 50.492188,49.996094 H 8.4746094 Z" className="text-black font-normal text-base leading-normal font-sans font-normal tracking-normal text-left whitespace-normal"/>
                                                      </g>
                                                    </svg>
                                                    :
                                                      null
                                                    }
                                                    </button>
                                                  </li>
                                                ))}
                                              </ul>
                                              <button
                                                id="newProject"
                                                className="text-left w-full text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-b-md"
                                                onClick={handleNewCampaignClick}
                                              >
                                                + Create Folder
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    {/* ========================================= */}
                                    </div>
                                    
                                </div>
                            </div>
                            <p className="text-sm font-normal text-gray-600">You have the option to produce a document for lengthy content, utilize a template for concise excerpts of specialized content, or employ our guided forms</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 p-6">
                            <button className="p-4 ring-1 ring-gray-200 rounded-2xl text-left space-y-3 hover:ring-gray-300 active:ring-gray-400"
                            onClick={()=>{
                              create_blank_document()
                            }}>
                                <span className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10,.71c-1.96,0-3.53,.06-5.17,.17-1.73,.12-3.11,1.5-3.22,3.24-.12,1.9-.18,3.86-.18,5.88s.06,3.98,.18,5.88c.11,1.74,1.49,3.12,3.22,3.24,1.63,.11,3.21,.17,5.17,.17s3.53-.06,5.17-.17c1.73-.12,3.11-1.5,3.22-3.24,.12-1.9,.18-3.86,.18-5.88,0-.82-.01-1.62-.03-2.42-.02-.7-.24-1.38-.66-1.95-1.29-1.76-2.34-2.87-4.05-4.19-.58-.45-1.28-.68-2-.7-.58-.01-1.18-.02-1.83-.02Z" fill="#8DA2FB" fillRule="evenodd"></path>
                                    <path d="M7.28,4.82c-.49,0-.89,.4-.89,.89s.4,.89,.89,.89h3.29c.49,0,.89-.4,.89-.89s-.4-.89-.89-.89h-3.29Zm0,8.46c-.49,0-.89,.4-.89,.89s.4,.89,.89,.89h5.43c.49,0,.89-.4,.89-.89s-.4-.89-.89-.89H7.28Zm0-4.15c-.49,0-.89,.4-.89,.89s.4,.89,.89,.89h5.45c.49,0,.89-.4,.89-.89s-.4-.89-.89-.89H7.28Z" fill="#5850EC" fillRule="evenodd"></path>
                                    </svg>
                                    <span className="text-indigo-700 text-base font-semibold">Blank document</span>
                                </span>
                                <span className="block">Commence anew by creating an empty document.</span>
                            </button>
                            <button className="p-4 ring-1 ring-gray-200 rounded-2xl text-left space-y-3 hover:ring-gray-300 active:ring-gray-400"
                                onClick={()=>{
                                    navigate("/template")
                                }}
                            >
                                <span className="flex items-center space-x-3">
                                <svg
                                    className="w-5 h-5"
                                    width="18"
                                    height="26"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M6.75 0.75H2.25C1.85218 0.75 1.47064 0.908035 1.18934 1.18934C0.908035 1.47064 0.75 1.85218 0.75 2.25V6.75C0.75 7.14782 0.908035 7.52936 1.18934 7.81066C1.47064 8.09196 1.85218 8.25 2.25 8.25H6.75C7.14782 8.25 7.52936 8.09196 7.81066 7.81066C8.09196 7.52936 8.25 7.14782 8.25 6.75V2.25C8.25 1.85218 8.09196 1.47064 7.81066 1.18934C7.52936 0.908035 7.14782 0.75 6.75 0.75ZM6.75 6.75H2.25V2.25H6.75V6.75ZM15.75 0.75H11.25C10.8522 0.75 10.4706 0.908035 10.1893 1.18934C9.90804 1.47064 9.75 1.85218 9.75 2.25V6.75C9.75 7.14782 9.90804 7.52936 10.1893 7.81066C10.4706 8.09196 10.8522 8.25 11.25 8.25H15.75C16.1478 8.25 16.5294 8.09196 16.8107 7.81066C17.092 7.52936 17.25 7.14782 17.25 6.75V2.25C17.25 1.85218 17.092 1.47064 16.8107 1.18934C16.5294 0.908035 16.1478 0.75 15.75 0.75ZM15.75 6.75H11.25V2.25H15.75V6.75ZM6.75 9.75H2.25C1.85218 9.75 1.47064 9.90804 1.18934 10.1893C0.908035 10.4706 0.75 10.8522 0.75 11.25V15.75C0.75 16.1478 0.908035 16.5294 1.18934 16.8107C1.47064 17.092 1.85218 17.25 2.25 17.25H6.75C7.14782 17.25 7.52936 17.092 7.81066 16.8107C8.09196 16.5294 8.25 16.1478 8.25 15.75V11.25C8.25 10.8522 8.09196 10.4706 7.81066 10.1893C7.52936 9.90804 7.14782 9.75 6.75 9.75ZM6.75 15.75H2.25V11.25H6.75V15.75ZM15.75 9.75H11.25C10.8522 9.75 10.4706 9.90804 10.1893 10.1893C9.90804 10.4706 9.75 10.8522 9.75 11.25V15.75C9.75 16.1478 9.90804 16.5294 10.1893 16.8107C10.4706 17.092 10.8522 17.25 11.25 17.25H15.75C16.1478 17.25 16.5294 17.092 16.8107 16.8107C17.092 16.5294 17.25 16.1478 17.25 15.75V11.25C17.25 10.8522 17.092 10.4706 16.8107 10.1893C16.5294 9.90804 16.1478 9.75 15.75 9.75ZM15.75 15.75H11.25V11.25H15.75V15.75Z"
                                        fill="#343330"
                                    />
                                    </svg>
                                    <span className="text-slate-700 text-base font-semibold">Templates</span>
                                </span>
                                <span className="block">Create content with predefined templates and workflows.</span>
                            </button>
                            
                        </div>
                        <div className="flex justify-end p-6">
                        <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
                         onClick={handleGoBack}>
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">Cancel</span></button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
  )
}

export default CreateNewContent