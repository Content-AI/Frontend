import React, { useState, useEffect, useRef } from "react";

import { BACKEND_URL, BACK_END_API_DOCUMENTS,BACK_END_API_PROJECT_CHOOSE } from "../../../../apis/urls";
import { fetchData, patchData } from "../../../../apis/apiService";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import RenderHtml from "../RenderHtml";
import LoadingPage from "../../../LoadingPage";
import { useSelector, useDispatch } from "react-redux";

import { _save_doc_data_ } from "../../../../features/DocumentsData";

const ListOfDocument = (props) => {

  const navigate = useNavigate();
  const popupRef = useRef(null);
  const dispatch = useDispatch();


  const [ListOrGrid, setListOrGrid] = useState(true);
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [documentData, setdocumentData] = useState(null);
  const [RenameDiv, setRenameDiv] = useState(false);
  const [RenameId, setRenameId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [LoadingData, setLoadingData] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  const [RenameDocumentId,setRenameDocumentId] = useState(null);
  const [ChangeFolderDiv, setChangeFolderDiv] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [SelectedOptions, setSelectedOptions] = useState(null);
  

  const [showModalForDelete,setshowModalForDelete] = useState(false);
  const [DeleteFolderId,setDeleteFolderId] = useState(null);


  const notifyerror = (message) => toast.error(message);
  const notifysuccess = (message) => toast.success(message);

  let FolderDataState = useSelector(
    (state) => state.SetFolderData.FolderData
  );

  const get_all_user_doc = async () => {
    const resp = await fetchData(BACKEND_URL + BACK_END_API_DOCUMENTS + "/", props.AUTH_TOKEN)
    if (resp.status == 200) {
      setdocumentData(resp.data.results)
    } else {
      notifyerror("something went wrong")
    }
  }
  const initial_get_all_user_doc = async () => {
    setLoadingData(true)
    const resp = await fetchData(BACKEND_URL + BACK_END_API_DOCUMENTS + "/", props.AUTH_TOKEN)
    if (resp.status == 200) {
      setdocumentData(resp.data.results)
    } else {
      notifyerror("something went wrong")
    }
    setLoadingData(false)
  }


  const handleDelete = (id) => {
    setdocumentData((prevDocuments) =>
      prevDocuments.filter((document) => document.id !== id)
    );
    setshowModalForDelete(false)
  };

  const _update_document_data = async (data, id, message) => {
    handleDelete(id)
    if (popupRef.current) {
      setOpenPopupIndex(null);
    }
    const resp = await patchData(data, BACKEND_URL + BACK_END_API_DOCUMENTS + "/" + id + "/", props.AUTH_TOKEN)
    if (resp.status == 201) {
      notifysuccess(message)
    } else {
      notifyerror("something went wrong")
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
    initial_get_all_user_doc()
  }, [])


  const search_from_api = async (search_text) => {
    const resp = await fetchData(BACKEND_URL + BACK_END_API_DOCUMENTS + "/?search="+search_text, props.AUTH_TOKEN)
    if (resp.status == 200) {
      if(resp.data.results.length>0){
        setdocumentData(resp.data.results)
      }
    } else {
      notifyerror("something went wrong")
    }
  }

  const handleSearchText = (event) => {
    setSearchText(event.target.value)
    search_from_api(searchText)
    if(searchText.length<=0){
      get_all_user_doc()
    }
  };



  const update_folder = async() =>{
    let formData = {
        project_id:selectedValue
      }
      const resp = await patchData(formData, BACKEND_URL + BACK_END_API_DOCUMENTS + "/" + RenameDocumentId + "/", props.AUTH_TOKEN)
      if(resp.status=201){
        get_all_user_doc()
        notifysuccess("Document Moved")
      }else{
        notifyerror("something went wrong")
      }
    setChangeFolderDiv(false)
  }

  const get_project_data = async() => {
    const resp = await fetchData(BACKEND_URL+BACK_END_API_PROJECT_CHOOSE,props.AUTH_TOKEN)
    if(resp.status==200){
        setSelectedOptions(resp.data)
    }
}
  useEffect(()=>{
    get_project_data()
  },[FolderDataState])

  useEffect(()=>{
    dispatch(_save_doc_data_(documentData))
  },[documentData])

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      {LoadingData
      ?
        <LoadingPage/>
      :
      <div className="space-y-8 px-4 md:px-10" ref={popupRef}>
        <div className="space-y-4">

        {documentData &&
            documentData.length>0
            ?
              <>
              {/* ===================search field========================== */}
                <div className="flex flex-col justify-between sm:flex-row">

                <div className="flex items-center space-x-6">
                  <div className="w-80">
                    <div className="w-full space-y-1.5">
                      <label htmlFor="search-content" className="sr-only"
                      ><span className="flex items-center space-x-1"><span>Search content</span></span></label
                      >
                    {props.search_bar!="off"
                      ?
                      <div className="!mt-0 flex w-full items-center gap-2 rounded-lg bg-white px-3 py-1 outline-none ring-1 ring-gray-200 transition-all duration-150 ease-in-out focus-within:!ring-1 hover:ring-2">
                        <div className="flex grow items-center gap-2 py-1.5">
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M6.67,12.44c3.19,0,5.78-2.59,5.78-5.78S9.86,.89,6.67,.89,.89,3.48,.89,6.67s2.59,5.78,5.78,5.78Z" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M15.11,15.11l-4-4" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                          <div className="flex grow gap-1">
                            <input
                                id="search-content"
                                type="search"
                                className="block w-full resize-none text-sm font-normal text-gray-900 outline-none placeholder:text-gray-400"
                                placeholder="Search content"
                                value={searchText}
                                onChange={handleSearchText}
                              />
                          </div>
                        </div>
                      </div>
                      :
                      null
                  }
                    </div>
                  </div>
                </div>
               
          {/* ===================search field========================== */}
          
              {/* ===================list or gird========================== */}
                <div className="flex items-center space-x-5 divide-x divide-gray-200 pt-4 md:pt-0">
                      <div className="md:pl-5">
                        <div className="mr-3 flex items-center justify-center space-x-2">
                          <button className={ListOrGrid?" flex aspect-square h-9 w-9 items-center justify-center rounded-md bg-gray-100 px-2 py-1.5 text-gray-400 transition-all duration-150 hover:bg-gray-200 hover:text-gray-500 ":" flex aspect-square h-9 w-9 items-center justify-center rounded-md bg-white px-2 py-1.5 text-gray-400 transition-all duration-150 hover:bg-gray-200 hover:text-gray-500 "}
                            onClick={()=>{
                              setListOrGrid(true)
                            }}
                            >
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path d="M14.71,12.68c.1-1.5,.14-3.05,.14-4.64,0-.59,0-1.17-.02-1.75H1.16c-.01,.58-.02,1.16-.02,1.75,0,1.59,.05,3.14,.14,4.64,.07,1.09,.94,1.96,2.05,2.03,1.51,.09,3.07,.14,4.67,.14s3.16-.05,4.67-.14c1.1-.07,1.98-.94,2.05-2.03Z" fill="transparent"></path>
                              <path d="M1.16,6.29c-.01,.58-.02,1.17-.02,1.77,0,1.6,.05,3.16,.14,4.67,.07,1.1,.94,1.98,2.05,2.05,1.51,.09,3.07,.14,4.67,.14s3.16-.05,4.67-.14c1.1-.07,1.98-.94,2.05-2.05,.1-1.51,.14-3.07,.14-4.67,0-.59,0-1.18-.02-1.77" fill="none" stroke="#0D121C" strokeWidth="1"></path>
                              <path d="M5.7,6.29V14.73" fill="none" stroke="#0D121C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M1.18,10.29H14.82" fill="none" stroke="#0D121C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M14.84,6.29H1.16c.02-1,.06-1.99,.12-2.95,.07-1.1,.94-1.98,2.04-2.05,1.51-.09,3.07-.14,4.67-.14s3.16,.05,4.67,.14c1.1,.07,1.98,.94,2.04,2.05,.06,.96,.1,1.95,.13,2.95Z" fill="none" stroke="#0D121C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                          <button 
                            className={ListOrGrid?" flex aspect-square h-9 w-9 items-center justify-center rounded-md bg-white px-2 py-1.5 text-gray-400 transition-all duration-150 hover:bg-gray-200 hover:text-gray-500 ":" flex aspect-square h-9 w-9 items-center justify-center rounded-md bg-gray-100 px-2 py-1.5 text-gray-400 transition-all duration-150 hover:bg-gray-200 hover:text-gray-500 "}
                            onClick={()=>{
                              setListOrGrid(false)
                            }}
                          >
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M9.66,5.04c.07,.63,.58,1.14,1.21,1.21,.47,.05,.95,.1,1.44,.1s.98-.04,1.45-.1c.63-.07,1.14-.58,1.21-1.21,.05-.47,.09-.95,.09-1.44s-.04-.97-.09-1.44c-.07-.63-.58-1.14-1.21-1.21-.47-.05-.95-.1-1.45-.1s-.97,.04-1.44,.1c-.63,.07-1.14,.58-1.21,1.21-.05,.47-.09,.95-.09,1.44s.04,.97,.09,1.44Z" fill="none" stroke="#0D121C" strokeWidth="1"></path>
                            <path d="M1.03,5.04c.07,.63,.58,1.14,1.21,1.21,.47,.05,.95,.1,1.45,.1s.97-.04,1.44-.1c.63-.07,1.14-.58,1.21-1.21,.05-.47,.09-.95,.09-1.44s-.04-.97-.09-1.44c-.07-.63-.58-1.14-1.21-1.21-.47-.05-.95-.1-1.44-.1s-.98,.04-1.45,.1c-.63,.07-1.14,.58-1.21,1.21-.05,.47-.09,.95-.09,1.44s.04,.97,.09,1.44Z" fill="none" stroke="#0D121C" strokeWidth="1"></path>
                            <path d="M1.03,13.83c.07,.63,.58,1.14,1.21,1.21,.47,.05,.95,.1,1.45,.1s.97-.04,1.44-.1c.63-.07,1.14-.58,1.21-1.21,.05-.47,.09-.95,.09-1.44s-.04-.97-.09-1.44c-.07-.63-.58-1.14-1.21-1.21-.47-.05-.95-.1-1.44-.1s-.98,.04-1.45,.1c-.63,.07-1.14,.58-1.21,1.21-.05,.47-.09,.95-.09,1.44s.04,.97,.09,1.44Z" fill="none" stroke="#0D121C" strokeWidth="1"></path>
                            <path d="M9.66,13.83c.07,.63,.58,1.14,1.21,1.21,.47,.05,.95,.1,1.44,.1s.98-.04,1.45-.1c.63-.07,1.14-.58,1.21-1.21,.05-.47,.09-.95,.09-1.44s-.04-.97-.09-1.44c-.07-.63-.58-1.14-1.21-1.21-.47-.05-.95-.1-1.45-.1s-.97,.04-1.44,.1c-.63,.07-1.14,.58-1.21,1.21-.05,.47-.09,.95-.09,1.44s.04,.97,.09,1.44Z" fill="none" stroke="#0D121C" strokeWidth="1"></path>
                          </svg>
                          </button>
                        </div>
                      </div>
                </div>
                {/* ===================list or gird========================== */}
                </div>
             
              </>
              :
              <>
                <div className="space-y-8 px-4 md:px-10">
                      <div className="space-y-4 flex flex-col justify-center">
                        <div className="mx-auto mt-6 max-w-[540px] space-y-2 text-center sm:mt-10 md:mt-28">
                          <h3 className="text-lg font-semibold">You do not have any Document</h3>
                          <p className="text-base font-normal text-gray-600">Prior to creating a document, it appears that you do not have any existing content. To proceed, please create the necessary content first and subsequently generate a document based on the created content.</p>
                        </div>
                        <div className="m-auto">
                          <button
                            onClick={() => {
                              navigate("/template")
                            }}
                            type="button" className="relative w-[300px] rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm outline-none ring-0 ring-blue-600 transition-all duration-200 hover:outline-none hover:ring-2 focus:outline-none active:ring-0">
                            <span className="mx-auto flex select-none items-center justify-center space-x-2"><div>Create template</div></span>
                          </button>
                        </div>
                      </div>
                </div>
              </>
        }

      {ListOrGrid
      ?
        documentData &&
          <>
            {documentData.length > 0
              ?
                <div className="w-full rounded-lg outline outline-1 outline-gray-200">
                    <table className="min-w-full">

                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="w-12 px-3.5 py-3.5"></th>
                          <th scope="col" className="text-left text-xs font-semibold uppercase text-gray-700">Name</th>
                          {/* <th scope="col" className="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell">folder</th> */}
                          <th scope="col" className="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell">Created by</th>
                          <th scope="col" className="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell">Last modified</th>
                          <th scope="col" className="w-12 bg-gray-50 px-3.5 py-3.5"><span className="sr-only">More options</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">

                        {documentData.map((data, index) => (
                          <tr className="group relative cursor-pointer hover:bg-blue-50" key={index}>
                            <td className="w-12 px-3.5 py-3.5" title={"open "+ data.title}
                            onClick={() => {
                              // console.log(data.id)
                              navigate(`/template_data/${data.id}?template_editing=edit_by_user&template_used=redirect_from_doc_page`)
                            }}>
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M8,.57c-1.56,0-2.83,.05-4.14,.14-1.39,.1-2.49,1.2-2.58,2.59-.1,1.52-.14,3.09-.14,4.7s.05,3.18,.14,4.7c.09,1.39,1.19,2.49,2.58,2.59,1.31,.09,2.57,.14,4.14,.14s2.83-.05,4.14-.14c1.39-.1,2.49-1.2,2.58-2.59,.1-1.52,.14-3.09,.14-4.7,0-.65,0-1.3-.02-1.94-.01-.56-.2-1.11-.53-1.56-1.03-1.41-1.87-2.3-3.24-3.35-.46-.36-1.03-.55-1.6-.56-.46-.01-.95-.02-1.46-.02Z" fill="#8DA2FB" fillRule="evenodd"></path>
                                <path d="M5.82,3.86c-.39,0-.71,.32-.71,.71s.32,.71,.71,.71h2.63c.39,0,.71-.32,.71-.71s-.32-.71-.71-.71h-2.63Zm0,6.77c-.39,0-.71,.32-.71,.71s.32,.71,.71,.71h4.34c.4,0,.71-.32,.71-.71s-.32-.71-.71-.71H5.82Zm0-3.32c-.39,0-.71,.32-.71,.71s.32,.71,.71,.71h4.36c.39,0,.71-.32,.71-.71s-.32-.71-.71-.71H5.82Z" fill="#5850EC" fillRule="evenodd"></path>
                              </svg>
                            </td>
                            <td className="max-w-[10rem] truncate text-ellipsis whitespace-nowrap py-4 pr-3 text-sm text-gray-700"
                            title={"open "+ data.title}
                            onClick={() => {
                              navigate(`/template_data/${data.id}?template_editing=edit_by_user&template_used=redirect_from_doc_page`)
                            }}
                            >{data.title}</td>
                            {/* <td className="hidden max-w-[6rem] truncate text-ellipsis whitespace-nowrap py-4 pr-3 text-sm text-gray-700 sm:table-cell md:max-w-[10rem]">Personal</td> */}
                            <td className="hidden max-w-[6rem] truncate text-ellipsis text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell"
                            title={"open "+ data.title}
                            onClick={() => {
                              navigate(`/template_data/${data.id}?template_editing=edit_by_user&template_used=redirect_from_doc_page`)
                            }}>me</td>
                            <td className="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell"
                            title={"open "+ data.title}
                            onClick={() => {
                              navigate(`/template_data/${data.id}?template_editing=edit_by_user&template_used=redirect_from_doc_page`)
                            }}>{data.updated_at}</td>
                            <td className="w-12 pr-4">
                              <span className="relative inline-block text-left" data-headlessui-state="">
                                <button type="button" className="relative rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-600 shadow-sm outline-none ring-1 ring-gray-200 transition-all duration-200 hover:outline-none hover:ring-2 focus:outline-none active:ring-1" id="headlessui-menu-button-:r61:" aria-haspopup="menu" aria-expanded="false" data-headlessui-state=""
                                  onClick={() => handlePopUpMenu(index)}
                                >
                                  <span className="mx-auto flex select-none items-center justify-center space-x-2">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                      <path d="M6.31,2.61c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="#9CA3AF"></path>
                                      <path d="M6.31,8c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="#9CA3AF"></path>
                                      <path d="M6.31,13.39c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.72-1.71-1.72-1.71,.62-1.71,1.72Z" fill="#9CA3AF"></path>
                                      <path d="M6.31,2.61c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="none" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M6.31,8c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="none" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M6.31,13.39c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.72-1.71-1.72-1.71,.62-1.71,1.72Z" fill="none" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </button>

                                {openPopupIndex === index && (
                                  <div className="z-20 absolute right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white text-gray-600 text-sm font-medium shadow-md border border-gray-200 focus:outline-none transform opacity-100 scale-100" aria-labelledby="headlessui-menu-button-:r6e:" id="headlessui-menu-items-:r79:" role="menu" tabIndex="0" data-headlessui-state="open">
                                    <div role="none">
                                      <button type="button" className="flex items-center px-3.5 py-2.5 hover:bg-gray-100 w-full text-sm space-x-3 active:bg-blue-100" role="none">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="none">
                                          <path d="M8,0c.22,0,.41,.13,.51,.33l2.23,4.51,4.78,.82c.21,.04,.39,.19,.45,.41,.07,.21,.01,.45-.14,.61l-3.4,3.62,.73,5.02c.03,.22-.06,.45-.23,.58-.17,.13-.4,.15-.6,.05l-4.34-2.27-4.32,2.27c-.19,.1-.42,.08-.6-.05-.17-.13-.26-.36-.23-.58l.73-5.02L.17,6.67c-.15-.16-.2-.4-.14-.61,.07-.21,.24-.37,.46-.41l4.79-.82L7.49,.33c.1-.2,.3-.33,.51-.33Z" fill="#9CA3AF" fillRule="evenodd" role="none"></path>
                                        </svg>
                                        <span role="none">Add to favorites</span>
                                      </button>
                                      <button className="flex items-center px-3.5 py-2.5 hover:bg-gray-100 w-full text-sm space-x-3 active:bg-blue-100" role="none"
                                        onClick={() => {
                                          setRenameDiv(true)
                                          setRenameId(data.id)
                                          if (popupRef.current) {
                                            setOpenPopupIndex(null);
                                          }
                                          setInputText(data.title)
                                        }}
                                      >
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="none">
                                          <path d="M.09,7.46c.05-.96,.15-1.9,.25-2.79,.11-1.01,.65-1.88,1.42-2.45,.49-.37,1.07-.61,1.71-.68,.95-.11,1.96-.22,3-.27,.07,0,.15,0,.22,.01,.24,0,.47-.01,.71-.01,1.38,0,2.73,.15,3.96,.29,1.62,.19,2.92,1.48,3.1,3.11l-1.01,.11,1.01-.11c.14,1.23,.28,2.56,.28,3.94,0,.29,0,.58-.02,.87,.01,.08,.02,.17,.02,.26-.05,.96-.15,1.9-.25,2.79-.11,1.01-.65,1.88-1.42,2.45-.49,.37-1.07,.61-1.71,.68-.95,.11-1.96,.22-3,.27-.08,0-.15,0-.22-.01-.24,0-.47,.01-.71,.01-1.38,0-2.73-.15-3.96-.29-1.62-.19-2.92-1.48-3.1-3.11-.14-1.23-.28-2.56-.28-3.94,0-.29,0-.58,.02-.87-.01-.08-.02-.17-.02-.26Z" fill="#9CA3AF" fillRule="evenodd" role="none"></path>
                                          <path d="M12.06,.79c.86-.92,2.31-.95,3.2-.06,.89,.89,.86,2.34-.06,3.2l-4.09,3.79c-.18,.17-.39,.29-.62,.37l-1.71,.57c-.89,.3-1.74-.55-1.44-1.45l.57-1.71c.08-.23,.2-.44,.37-.62L12.06,.79Z" fill="#4B5563" fillRule="evenodd" role="none"></path>
                                        </svg>
                                        <span role="none">Rename</span>
                                      </button>

                                      <button className="flex items-center px-3.5 py-2.5 hover:bg-gray-100 w-full text-sm space-x-3 active:bg-blue-100" role="none"
                                      onClick={()=>{
                                        setChangeFolderDiv(true)
                                        setRenameDocumentId(data.id)
                                        if (popupRef.current) {
                                            setOpenPopupIndex(null);
                                        }
                                      }}
                                      >
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="none">
                                            <path d="M.57,8c0,4.1,3.32,7.43,7.43,7.43s7.43-3.33,7.43-7.43S12.1,.57,8,.57,.57,3.9,.57,8Z" fill="#9CA3AF" fillRule="evenodd" role="none"></path>
                                            <path d="M8.54,9.75c0,.72,.84,1.13,1.41,.65,.78-.66,1.27-1.19,1.97-2.04,.17-.21,.17-.51,0-.72-.69-.85-1.19-1.38-1.97-2.04-.56-.48-1.41-.07-1.41,.65v.9h-3.96c-.47,0-.86,.38-.86,.86s.38,.86,.86,.86h3.96v.9Z" fill="#4B5563" fillRule="evenodd" role="none"></path>
                                        </svg>
                                        <span role="none">Move to folder</span>
                                      </button>

                                    </div>
                                    <div role="none">
                                      <button className="flex items-center px-3.5 py-2.5 hover:bg-gray-100 w-full text-sm space-x-3 active:bg-blue-100 text-red-600" role="none"
                                        onClick={() => {
                                          setshowModalForDelete(true)
                                          setDeleteFolderId(data.id)
                                          if (popupRef.current) {
                                            setOpenPopupIndex(null);
                                            }
                                        }}
                                        >
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="none">
                                          <path d="M2.19,5.13c-.12,2.74-.09,5.49,.31,8.26,.22,1.48,1.47,2.61,2.97,2.61h5.03c1.51,0,2.76-1.12,2.97-2.61,.4-2.77,.44-5.52,.31-8.26H2.19Z" fill="#F98080" fillRule="evenodd" role="none"></path>
                                          <path d="M6.58,8.02c0-.39-.32-.71-.71-.71s-.71,.32-.71,.71v4.72c0,.39,.32,.71,.71,.71s.71-.32,.71-.71v-4.72Zm4.27,0c0-.39-.32-.71-.71-.71s-.71,.32-.71,.71v4.72c0,.39,.32,.71,.71,.71s.71-.32,.71-.71v-4.72Z" fill="#E02424" fillRule="evenodd" role="none"></path>
                                          <path d="M6.59,2.3c.37-.37,.88-.58,1.41-.58s1.04,.21,1.41,.58c.31,.31,.5,.7,.56,1.12h-3.95c.06-.42,.26-.82,.56-1.12Zm-2.29,1.12c.07-.88,.45-1.71,1.07-2.33C6.07,.39,7.02,0,8,0s1.93,.39,2.62,1.09c.63,.63,1.01,1.46,1.07,2.33h3.17c.47,0,.86,.38,.86,.86s-.38,.86-.86,.86H1.14c-.47,0-.86-.38-.86-.86s.38-.86,.86-.86h3.16Z" fill="#E02424" fillRule="evenodd" role="none"></path>
                                        </svg>
                                        <span role="none">Delete</span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))
                        }


                      </tbody>
                    </table>
                    
                   
                    {RenameDiv
                      ?
                      <>
                        <div className="fixed inset-0 z-40 overflow-y-auto" id="headlessui-dialog-:rdn:" role="dialog" aria-modal="true" data-headlessui-state="open">
                          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
                            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50" id="headlessui-dialog-overlay-:rdo:" aria-hidden="true" data-headlessui-state="open"></div>
                            <div className="relative h-full bg-white text-gray-900 rounded-md shadow-xl align-top sm:align-middle w-full sm:w-[416px]">
                              <div className="w-full text-left flex justify-between items-center p-6 text-gray-900  border-b border-gray-200">
                                <h3 className="text-lg font-semibold">Rename document</h3>
                              </div>
                              <div className="flex flex-col p-6">
                                  <div className="p-6">
                                    <div className="space-y-1.5 w-full">
                                      <label htmlFor="rename-document" className="sr-only"><span className="flex items-center space-x-1"><span>Rename document</span></span></label>
                                      <div className="py-1 !mt-0 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                                        <div className="flex items-center grow gap-2 py-1.5">
                                          <div className="flex gap-1 grow">
                                            <input
                                              value={inputText} onChange={handleInputChange}
                                              id="rename-document" type="text" className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none" placeholder="Document name" name="name" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-6 flex items-center gap-4 justify-end"><button
                                    onClick={() => {
                                      setRenameDiv(false)
                                    }} type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"><span className="flex items-center justify-center mx-auto space-x-2 select-none">Cancel</span></button>
                                    <button
                                      onClick={() => {
                                        const formData = {
                                          title: inputText
                                        }
                                        _update_name_(formData, RenameId, "Title updated")
                                      }}
                                      type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-blue-600 text-white ring-0 ring-blue-600 hover:ring-2 active:ring-0"><span className="flex items-center justify-center mx-auto space-x-2 select-none">Save</span></button></div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                      :
                      null}
                </div>
              :
                null
            }
          </>
          :
          documentData &&
          <>
            <div className="flex flex-wrap">            
                  {documentData.map((data,index)=>{
                    return (
                        <div key={index} title={"Open "+ data.title} className="relative m-3 transition-all p-3 group cursor-pointer hover:bg-blue-50 border rounded-xl w-[240px] h-[280px]">

                                <div className="opacity-0 group-hover:opacity-100 absolute right-5 top-5">
                                  <span className="relative inline-block text-left" data-headlessui-state="">
                                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1" id="headlessui-menu-button-:r2e:" aria-haspopup="menu" aria-expanded="false" data-headlessui-state=""
                                       onClick={() => handlePopUpMenu(index)}
                                      >
                                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                              <path d="M6.31,2.61c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="#9CA3AF"></path>
                                              <path d="M6.31,8c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="#9CA3AF"></path>
                                              <path d="M6.31,13.39c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.72-1.71-1.72-1.71,.62-1.71,1.72Z" fill="#9CA3AF"></path>
                                              <path d="M6.31,2.61c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="none" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                              <path d="M6.31,8c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.71-1.71-1.71-1.71,.62-1.71,1.71Z" fill="none" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                              <path d="M6.31,13.39c0,1.1,.62,1.71,1.71,1.71s1.71-.62,1.71-1.71-.62-1.72-1.71-1.72-1.71,.62-1.71,1.72Z" fill="none" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </span>
                                      </button>
                                      {openPopupIndex === index && (
                                          <div className="z-20 absolute right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white text-gray-600 text-sm font-medium shadow-md border border-gray-200 focus:outline-none transform opacity-100 scale-100" aria-labelledby="headlessui-menu-button-:r6e:" id="headlessui-menu-items-:r79:" role="menu" tabIndex="0" data-headlessui-state="open">
                                            <div role="none">
                                              <button type="button" className="flex items-center px-3.5 py-2.5 hover:bg-gray-100 w-full text-sm space-x-3 active:bg-blue-100" role="none">
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="none">
                                                  <path d="M8,0c.22,0,.41,.13,.51,.33l2.23,4.51,4.78,.82c.21,.04,.39,.19,.45,.41,.07,.21,.01,.45-.14,.61l-3.4,3.62,.73,5.02c.03,.22-.06,.45-.23,.58-.17,.13-.4,.15-.6,.05l-4.34-2.27-4.32,2.27c-.19,.1-.42,.08-.6-.05-.17-.13-.26-.36-.23-.58l.73-5.02L.17,6.67c-.15-.16-.2-.4-.14-.61,.07-.21,.24-.37,.46-.41l4.79-.82L7.49,.33c.1-.2,.3-.33,.51-.33Z" fill="#9CA3AF" fillRule="evenodd" role="none"></path>
                                                </svg>
                                                <span role="none">Add to favorites</span>
                                              </button>
                                              <button className="flex items-center px-3.5 py-2.5 hover:bg-gray-100 w-full text-sm space-x-3 active:bg-blue-100" role="none"
                                                onClick={() => {
                                                  setRenameDiv(true)
                                                  setRenameId(data.id)
                                                  if (popupRef.current) {
                                                    setOpenPopupIndex(null);
                                                  }
                                                  setInputText(data.title)
                                                }}
                                              >
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="none">
                                                  <path d="M.09,7.46c.05-.96,.15-1.9,.25-2.79,.11-1.01,.65-1.88,1.42-2.45,.49-.37,1.07-.61,1.71-.68,.95-.11,1.96-.22,3-.27,.07,0,.15,0,.22,.01,.24,0,.47-.01,.71-.01,1.38,0,2.73,.15,3.96,.29,1.62,.19,2.92,1.48,3.1,3.11l-1.01,.11,1.01-.11c.14,1.23,.28,2.56,.28,3.94,0,.29,0,.58-.02,.87,.01,.08,.02,.17,.02,.26-.05,.96-.15,1.9-.25,2.79-.11,1.01-.65,1.88-1.42,2.45-.49,.37-1.07,.61-1.71,.68-.95,.11-1.96,.22-3,.27-.08,0-.15,0-.22-.01-.24,0-.47,.01-.71,.01-1.38,0-2.73-.15-3.96-.29-1.62-.19-2.92-1.48-3.1-3.11-.14-1.23-.28-2.56-.28-3.94,0-.29,0-.58,.02-.87-.01-.08-.02-.17-.02-.26Z" fill="#9CA3AF" fillRule="evenodd" role="none"></path>
                                                  <path d="M12.06,.79c.86-.92,2.31-.95,3.2-.06,.89,.89,.86,2.34-.06,3.2l-4.09,3.79c-.18,.17-.39,.29-.62,.37l-1.71,.57c-.89,.3-1.74-.55-1.44-1.45l.57-1.71c.08-.23,.2-.44,.37-.62L12.06,.79Z" fill="#4B5563" fillRule="evenodd" role="none"></path>
                                                </svg>
                                                <span role="none">Rename</span>
                                              </button>
                                              <button className="flex items-center px-3.5 py-2.5 hover:bg-gray-100 w-full text-sm space-x-3 active:bg-blue-100" role="none"
                                                  onClick={()=>{
                                                    setChangeFolderDiv(true)
                                                    setRenameDocumentId(data.id)
                                                    if (popupRef.current) {
                                                        setOpenPopupIndex(null);
                                                    }
                                                  }}
                                                  >
                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="none">
                                                        <path d="M.57,8c0,4.1,3.32,7.43,7.43,7.43s7.43-3.33,7.43-7.43S12.1,.57,8,.57,.57,3.9,.57,8Z" fill="#9CA3AF" fillRule="evenodd" role="none"></path>
                                                        <path d="M8.54,9.75c0,.72,.84,1.13,1.41,.65,.78-.66,1.27-1.19,1.97-2.04,.17-.21,.17-.51,0-.72-.69-.85-1.19-1.38-1.97-2.04-.56-.48-1.41-.07-1.41,.65v.9h-3.96c-.47,0-.86,.38-.86,.86s.38,.86,.86,.86h3.96v.9Z" fill="#4B5563" fillRule="evenodd" role="none"></path>
                                                    </svg>
                                                    <span role="none">Move to folder</span>
                                                  </button>
                                            </div>
                                            <div role="none">
                                              <button className="flex items-center px-3.5 py-2.5 hover:bg-gray-100 w-full text-sm space-x-3 active:bg-blue-100 text-red-600" role="none"
                                                onClick={() => {
                                                  setshowModalForDelete(true)
                                                  setDeleteFolderId(data.id)
                                                  if (popupRef.current) {
                                                    setOpenPopupIndex(null);
                                                    }
                                                }}>
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="none">
                                                  <path d="M2.19,5.13c-.12,2.74-.09,5.49,.31,8.26,.22,1.48,1.47,2.61,2.97,2.61h5.03c1.51,0,2.76-1.12,2.97-2.61,.4-2.77,.44-5.52,.31-8.26H2.19Z" fill="#F98080" fillRule="evenodd" role="none"></path>
                                                  <path d="M6.58,8.02c0-.39-.32-.71-.71-.71s-.71,.32-.71,.71v4.72c0,.39,.32,.71,.71,.71s.71-.32,.71-.71v-4.72Zm4.27,0c0-.39-.32-.71-.71-.71s-.71,.32-.71,.71v4.72c0,.39,.32,.71,.71,.71s.71-.32,.71-.71v-4.72Z" fill="#E02424" fillRule="evenodd" role="none"></path>
                                                  <path d="M6.59,2.3c.37-.37,.88-.58,1.41-.58s1.04,.21,1.41,.58c.31,.31,.5,.7,.56,1.12h-3.95c.06-.42,.26-.82,.56-1.12Zm-2.29,1.12c.07-.88,.45-1.71,1.07-2.33C6.07,.39,7.02,0,8,0s1.93,.39,2.62,1.09c.63,.63,1.01,1.46,1.07,2.33h3.17c.47,0,.86,.38,.86,.86s-.38,.86-.86,.86H1.14c-.47,0-.86-.38-.86-.86s.38-.86,.86-.86h3.16Z" fill="#E02424" fillRule="evenodd" role="none"></path>
                                                </svg>
                                                <span role="none">Delete</span>
                                              </button>
                                            </div>
                                          </div>
                                        )}

                                  </span>
                                </div>
                        
                                <div className="flex flex-col justify-between h-full"
                                onClick={() => {
                                  navigate(`/template_data/${data.id}?template_editing=edit_by_user&template_used=redirect_from_doc_page`)
                                  }}
                              >
                            <div className="text-[8px] bg-white border rounded-xl px-3 grow break-words space-y-2 overflow-hidden">
                                <RenderHtml htmldata={data.document_content}/>
                            </div>
                            <div className="text-gray-700 text-sm font-medium pt-1 pb-1.5">{data.title}</div>
                            <div className="flex flex-row text-gray-500 text-xs font-normal">
                                <div>{data.updated_at}</div>
                            </div>
                            <div className="absolute right-1.5 bottom-1.5">
                                <div className="relative" data-headlessui-state="">
                                  <button id="headlessui-menu-button-:r2f:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                      <span className="sr-only">DRAFT</span>
                                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.9999 0.429993C9.41404 0.429993 6.49152 1.44118 4.46633 3.46639C2.44112 5.49158 1.42993 8.4141 1.42993 12C1.42993 15.5859 2.44112 18.5083 4.46633 20.5337C6.49152 22.5589 9.41404 23.57 12.9999 23.57C16.5858 23.57 19.5083 22.5589 21.5336 20.5337C23.5588 18.5083 24.5699 15.5859 24.5699 12C24.5699 8.4141 23.5588 5.49158 21.5336 3.46639C19.5083 1.44118 16.5858 0.429993 12.9999 0.429993Z" fill="#F3F4F6"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13 4.28668C10.6094 4.28668 8.66102 4.96081 7.31089 6.31095C5.96075 7.66108 5.28662 9.60942 5.28662 12C5.28662 14.3906 5.96075 16.3389 7.31089 17.6891C8.66102 19.0393 10.6094 19.7133 13 19.7133C15.3906 19.7133 17.3388 19.0393 18.6891 17.6891C20.0392 16.3389 20.7133 14.3906 20.7133 12C20.7133 9.60942 20.0392 7.66108 18.6891 6.31095C17.3388 4.96081 15.3906 4.28668 13 4.28668Z" fill="#D1D5DB"></path>
                                      </svg>
                                  </button>
                                </div>
                            </div>
                              </div>
                              {RenameDiv
                    ?
                    <>
                      <div className="fixed inset-0 z-40 overflow-y-auto" id="headlessui-dialog-:rdn:" role="dialog" aria-modal="true" data-headlessui-state="open">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
                          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50" id="headlessui-dialog-overlay-:rdo:" aria-hidden="true" data-headlessui-state="open"></div>
                          <div className="relative h-full bg-white text-gray-900 rounded-md shadow-xl align-top sm:align-middle w-full sm:w-[416px]">
                            <div className="w-full text-left flex justify-between items-center p-6 text-gray-900  border-b border-gray-200">
                              <h3 className="text-lg font-semibold">Rename document</h3>
                            </div>
                            <div className="flex flex-col p-6">
                              <form className="-m-6 divide-y divide-gray-200">
                                <div className="p-6">
                                  <div className="space-y-1.5 w-full">
                                    <label htmlFor="rename-document" className="sr-only"><span className="flex items-center space-x-1"><span>Rename document</span></span></label>
                                    <div className="py-1 !mt-0 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                                      <div className="flex items-center grow gap-2 py-1.5">
                                        <div className="flex gap-1 grow">
                                          <input
                                            value={inputText} onChange={handleInputChange}
                                            id="rename-document" type="text" className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none" placeholder="Document name" name="name" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-6 flex items-center gap-4 justify-end"><button
                                  onClick={() => {
                                    setRenameDiv(false)
                                  }} type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"><span className="flex items-center justify-center mx-auto space-x-2 select-none">Cancel</span></button>
                                  <button
                                    onClick={() => {
                                      const formData = {
                                        title: inputText
                                      }
                                      _update_name_(formData, RenameId, "Title updated")
                                    }}
                                    type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-blue-600 text-white ring-0 ring-blue-600 hover:ring-2 active:ring-0"><span className="flex items-center justify-center mx-auto space-x-2 select-none">Save</span></button></div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    :
                    null}
                          
                            
                        </div>
                    )
                  })}
            </div>
          </>
        }
        {ChangeFolderDiv
            ?
            <>
            <div className="fixed inset-0 z-40 overflow-y-auto" id="headlessui-dialog-:rdn:" role="dialog" aria-modal="true" data-headlessui-state="open">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50" id="headlessui-dialog-overlay-:rdo:" aria-hidden="true" data-headlessui-state="open"></div>
                <div className="relative h-full bg-white text-gray-900 rounded-md shadow-xl align-top sm:align-middle w-full sm:w-[416px]">
                    <div className="w-full text-left flex justify-between items-center p-6 text-gray-900  border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Move to folder</h3>
                    </div>
                    <div className="flex flex-col p-6">
                        <div className="p-6">
                        <div className="space-y-1.5 w-full">
                                <div className="relative inline-block text-left w-full">
                                    {/* ============select field================= */}
                                        <select
                                            className="p-1 ring-1 font-semibold ring-gray-200 w-[200px] text-left space-y-3 hover:ring-gray-300 active:ring-gray-400"
                                            id="selectField"
                                            value={selectedValue}
                                            onChange={handleSelectChange}
                                        >
                                            <option value="">choose your folder ...</option>
                                            
                                            {SelectedOptions &&
                                                SelectedOptions.map((data,index)=>{
                                                    return (
                                                        <option key={index} value={data.value}>{data.label}</option>
                                                    )
                                                })
                                            }
                                            
                                        </select>
                                    {/* ========================================= */}
                                </div>
                        </div>
                        </div>
                        <div className="p-6 flex items-center gap-4 justify-end"><button
                        onClick={() => {
                            setChangeFolderDiv(false)
                            setSelectedValue(null)
                        }} type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"><span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        Cancel</span></button>
                        <button
                            onClick={()=>{
                            update_folder()
                            if (popupRef.current) {
                                setOpenPopupIndex(null);
                                }
                            }}
                            
                            type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-blue-600 text-white ring-0 ring-blue-600 hover:ring-2 active:ring-0"><span className="flex items-center justify-center mx-auto space-x-2 select-none">
                            Save</span></button></div>
                    
                    </div>
                </div>
                </div>
            </div>
            </>
            :
            null
        }

        {showModalForDelete ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm backdrop-filter bg-opacity-20">
                        <div
                            className="fixed inset-0 w-full h-full"
                            onClick={() => setshowModalForDelete(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex flex items-center justify-center">
                                    {/* <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                                       
                                    </div> */}
                                    <div className=" flex items-center justify-center flex-col mt-2 text-center sm:ml-4 sm:text-left">
                                        <div>
                                        <svg
                                            
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-red-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                        <h4 className="text-2xl font-medium text-red-500 m-3">
                                             Are you sure want to Delete ??
                                        </h4>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                onClick={() =>{
                                                  const formData = {
                                                    trash: true
                                                  }
                                                  _update_document_data(formData, DeleteFolderId, "Moved to trash")
                                                }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>{
                                                    setshowModalForDelete(false)
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
          
        </div>
        <Toaster />
      </div>
      }
    </>
  );
};

export default ListOfDocument;
