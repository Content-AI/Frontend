import React, { useEffect, useRef, useState } from 'react';
import Settings from '../Settings'
import Pagination from './Pagination';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';
import {BACKEND_URL,BACK_END_API_CHANGE_PERMISSION,BACK_END_API_REMOVE_USER,BACK_END_API_INVITE_GENERATE_LINK,BACK_END_API_INVITE_WORKSHOP,BACK_END_API_CHECK_ADMIN,BACK_END_API_WORKSPACE_USERS_LIST} from '../../../apis/urls'
import {fetchData,postData} from '../../../apis/apiService'
import { Transition } from "@headlessui/react";
import LoadingPage from '../../LoadingPage';
// import SelectFields from './SelectField'

const Team = () => {
  const navigate=useNavigate()
  const divRef = useRef(null);

  const notifyerror = (message) => toast.error(message);
  const notifysucces = (message) => toast.success(message);

  const notifycopy = (message) => toast.success(message, {
    style: {
      padding: '10px',
      color: '#713200',
    },
    iconTheme: {
      primary: '#713200',
      secondary: '#FFFAEE',
    },
  });

  const [loadingpage,setloadingpage]=useState(false)
  
  const [popupinvitemodal,setpopupinvitemodal]=useState(false)

  const [workspacelist,setworkspacelist]=useState(null)
  const [invite_check,setinvite_check]=useState(false)
  const [initial_invitation_link,set_initial_invitation_link]=useState(null)

  let WorkspaceId = useSelector(
      (state) => state.SetWorkspaceId.WorkspaceId
    );
  
  let ChosenWorkspaceId = useSelector(
    (state) => state.SetChosenWorkspaceId.ChosenWorkspaceId
  );
  let TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );


  const get_workshop_user_list = async() =>{
    const resp = await fetchData(BACKEND_URL+BACK_END_API_WORKSPACE_USERS_LIST+ChosenWorkspaceId["Workspace_Id"],TOKEN)
    if(resp.status=200){
      setworkspacelist(resp.data)
    }
    const resp_check = await fetchData(BACKEND_URL+BACK_END_API_CHECK_ADMIN+"?workspace_id="+ChosenWorkspaceId["Workspace_Id"],TOKEN)
    if(resp_check.status==200){
      setinvite_check(true)
    }else{
      setinvite_check(false)
    }
  }

  useEffect(()=>{
      // setworkspacelist(WorkspaceId)
      if(ChosenWorkspaceId!=null){
        get_workshop_user_list()
      }
  },[])


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2; // Replace this with the total number of pages

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // You can perform any data fetching or updating logic here
  };

  const invite_modal=()=>{
    setpopupinvitemodal(true)
    // console.log("show invitation modal")
  }

  // ================email====================
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [sendinginvitation,setsendinginvitation] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError('');
  };

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isValidEmail(email)) {
        setEmails([...emails, email.trim()]);
        setEmail('');
        setError('');
      } else {
        notifyerror("email must be valid")
        setError('Invalid email format');
      }
    }
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const send_invitation = async() =>{
    setsendinginvitation(true)
    const formData={
      email:emails,
      workspace_id:ChosenWorkspaceId.Workspace_Id
    }
    
    const resp = await postData(formData,BACKEND_URL+BACK_END_API_INVITE_WORKSHOP,TOKEN)

    if(resp.status==200){
      notifysucces("Users are invited")
      setEmail('')
      setEmails([])
    }else{
      notifyerror("Invitation failed")
    }
    setsendinginvitation(false)

  }


  // =========Generate new link for invitation=============

  const get_the_initial_invitation_generate_link = async() =>{
    const resp = await fetchData(BACKEND_URL+BACK_END_API_INVITE_GENERATE_LINK+"?new=no&workspace_id="+ChosenWorkspaceId["Workspace_Id"],TOKEN)
    if(resp.status==200){
      set_initial_invitation_link(resp.data)
    }
  }
  const generate_invitation_generate_link = async() =>{
    const resp = await fetchData(BACKEND_URL+BACK_END_API_INVITE_GENERATE_LINK+"?new=yes&workspace_id="+ChosenWorkspaceId["Workspace_Id"],TOKEN)
    if(resp.status==200){
      set_initial_invitation_link(resp.data)
    }
  }

  const delete_link = async() =>{
    const resp = await fetchData(BACKEND_URL+BACK_END_API_INVITE_GENERATE_LINK+"?new=delete&workspace_id="+ChosenWorkspaceId["Workspace_Id"],TOKEN)
    set_initial_invitation_link(null)
  }

  

  useEffect(()=>{
    if(ChosenWorkspaceId!=null){
      get_the_initial_invitation_generate_link()
    }
  },[])



  // ============copy link==============
  const inputRef = useRef(null);

  const handleCopyClick = () => {
    inputRef.current.select();
    notifycopy("Link Copied")
    document.execCommand('copy');
  };



  // =========change the permission of user===================
  const update_permission= async(formData)=>{
    setloadingpage(true)
    const resp =await postData(formData,BACKEND_URL+BACK_END_API_CHANGE_PERMISSION+ChosenWorkspaceId["Workspace_Id"],TOKEN)
    if(resp.status==200){
      notifysucces("permission updated")
      get_workshop_user_list()
      setloadingpage(false)
      
    }else{
      notifyerror("something went wrong")
      setloadingpage(false)
    }
  }
  const remove_user= async(formData)=>{
    setloadingpage(true)
    const resp=await postData(formData,BACKEND_URL+BACK_END_API_REMOVE_USER+ChosenWorkspaceId["Workspace_Id"],TOKEN)
    if(resp.status==200){
      notifysucces("user remove")
      get_workshop_user_list()
      setloadingpage(false)
      
    }else{
      notifyerror("something went wrong")
      setloadingpage(false)
    }
  }

  const SelectField = ({ options, onSelect, defaultValue,role_of_user,data_index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue || '');
  
    useEffect(() => {
      if (defaultValue) {
        setSelectedOption(defaultValue);
      }
    }, [defaultValue]);
  
    const handleOptionSelect = (value) => {
      setSelectedOption(value);
      onSelect(value);
      setIsOpen(false);
    };
  
    return (
      <div className="">
        <div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 group flex items-center px-4 py-2 text-sm focus:outline-none hover:bg-gray-100"
          >

            {selectedOption ? (
              selectedOption
            ) : (
              <span className="text-gray-400">{role_of_user}</span>
            )}
          <svg
          className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
          </button>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="origin-top-left absolute z-10 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            {options.map((option, index) => (
              <div key={option.value} role="none">
                <button
                  onClick={() => {
                    handleOptionSelect(option.value);
                    const formData={}
                    if(option.value=="Admin")
                    {
                      formData["id"]=workspacelist[data_index]["id"]
                      formData["perm"]=true
                      formData["email"]=workspacelist[data_index].team_member_user.email
                    }else{
                      formData["id"]=workspacelist[data_index]["id"]
                      formData["perm"]=false
                      formData["email"]=workspacelist[data_index].team_member_user.email
                    }

                    update_permission(formData)

                  }}
                  className={`${
                    selectedOption === option.value ? 'bg-gray-100' : ''
                  } text-gray-700 w-full group flex items-center px-4 py-2 text-sm focus:outline-none hover:bg-gray-100`}
                  role="menuitem"
                  tabIndex="-1"
                >
                  {option.label}

                </button>
              </div>
            ))}
          </div>
        </Transition>
      </div>
    );
  };
  const [selectedRoles, setSelectedRoles] = useState({});

  const handleSelectData = (index, value) => {
    setSelectedRoles((prevSelectedRoles) => ({
      ...prevSelectedRoles,
      [index]: value,
    }));
  };


  return (
    <>
      <Settings/>

      {loadingpage
      ?
        <LoadingPage/>
      : 
        <>   
          <div className="px-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-1 pb-1 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Team</h2>
        {/* <div className="flex items-center justify-end text-sm">
          <div aria-expanded="false">
          
          </div>
        </div> */}
      </div>
      <div className="flex flex-col">
        <span className="mb-3"></span>
        <div className="mb-6 flex flex-row content-start justify-between gap-6">
          <div className="flex grow flex-col gap-2">
            <span className="font-bold">
            {workspacelist &&
              workspacelist[0]["member_no"]} team member. </span>
            {/* <div>
              <span>Need more seats? <span className="cursor-pointer font-semibold text-indigo-600 underline underline-offset-2">Upgrade now</span></span>
            </div> */}
            {invite_check
            ?
              <>
                <button disabled="" type="button" className="w-[200px] relative rounded-md border-0 bg-[#334977] px-3 py-1.5 text-sm font-semibold text-white shadow-sm outline-none ring-0 ring-blue-600 transition-all duration-200 hover:outline-none hover:ring-0 focus:outline-none active:ring-0" title="Invite Member"
                  onClick={()=>{
                    invite_modal()
                  }}
                >
                  <span className="mx-auto flex select-none items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                    </svg>
                    <div>Invite team members</div>
                  </span>
                </button>
              </>
            :
            <>
              <button disabled type="button" className="w-[200px] relative rounded-md border-0 bg-gray-400 px-3 py-1.5 text-sm font-semibold text-white shadow-sm outline-none ring-0 ring-blue-600 transition-all duration-200 hover:outline-none hover:ring-0 focus:outline-none active:ring-0"
              title="Contact Your admin">
                  <span className="mx-auto flex select-none items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                    </svg>
                    <div>Invite disable</div>
                  </span>
                </button>
              </>
            }
          </div>
          <div className="basis-1/2">
            <div className="w-full space-y-1.5">
              <label htmlFor="search-team-members" className="sr-only"
                ><span className="flex items-center space-x-1"><span>Search team members</span></span></label
              >
              <div className="!mt-0 flex w-full items-center gap-2 rounded-lg bg-white px-3 py-1 outline-none ring-1 ring-gray-200 transition-all duration-150 ease-in-out focus-within:!ring-1 hover:ring-2">
                <div className="flex grow items-center gap-2 py-1.5">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M6.67,12.44c3.19,0,5.78-2.59,5.78-5.78S9.86,.89,6.67,.89,.89,3.48,.89,6.67s2.59,5.78,5.78,5.78Z" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15.11,15.11l-4-4" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <div className="flex grow gap-1">
                    <input className="block w-full resize-none text-sm font-normal text-gray-900 outline-none placeholder:text-gray-400" type='text' placeholder='search member'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10 ring-1 ring-gray-200 md:rounded-lg">
          <table className="min-w-full">
            <thead className="bg-slate-200">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-700">Member</th>
                <th scope="col" className="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell">Role</th>
                <th scope="col" className="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell">Joined</th>
                <th scope="col" className="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-slate-100">
            
            {workspacelist &&
              <>
              {ChosenWorkspaceId["admin_or_not"]==true
              ?
                <>
                {workspacelist.map((data, index) => (
                  <tr>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className='flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white bg-slate-400'
                            src="/default.png"
                          />
                        </div>
                        <div className="ml-4 truncate">
                          <div className="truncate font-medium leading-5 text-gray-900">
                          {data["team_member_user"]["first_name"]}
                          </div>
                          <div className="truncate text-sm leading-5 text-gray-500" >
                          {data["team_member_user"]["email"]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell">
                          <SelectField
                              options={[
                                { label: 'Admin', value: 'Admin' },
                                { label: 'Member', value: 'Member' },
                              ]}
                              defaultValue={selectedRoles[index]}
                              onSelect={(value) => handleSelectData(index, value)}
                              role_of_user={workspacelist[index]["admin_or_not"]?"Admin":"Member"}
                              data_index={index}
                            />
                    </td>
                    <td className="hidden sm:table-cell">
                    {data["team_member_user"]["created_at"]}
                    </td>
                    <td className="hidden sm:table-cell text-blue-500">
                    {ChosenWorkspaceId["admin_or_not"]==true
                        ?
                        <>
                          <button
                          onClick={()=>{
                            const formData={}
                            formData["id"]=data.id
                            remove_user(formData)
                          }}>
                            Remove
                          </button>
                        </>
                      :
                        null
                      }
                    </td>
                  </tr>
                ))}
                </>
              :
              <>
                {workspacelist.map((data,index)=>{
                    return (
                        <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className='flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white bg-slate-400'
                                src="http://localhost:3000/default.png"
                              />
                            </div>
                            <div className="ml-4 truncate">
                              <div className="truncate font-medium leading-5 text-gray-900">
                              {data["team_member_user"]["first_name"]}
                              </div>
                              <div className="truncate text-sm leading-5 text-gray-500" >
                              {data["team_member_user"]["email"]}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell">
                        {data.admin_or_not
                            ?
                              "Admin"
                            :
                              "Member"
                          }
                        </td>
                        <td className="hidden sm:table-cell">
                        {data["team_member_user"]["created_at"]}
                        </td>
                        <td className="hidden sm:table-cell text-blue-500">
                        </td>
                      </tr>
                  )
                  })}
                </>
              }
              </>
            }
            </tbody>
          </table>
          
          
        </div>
        
      </div>
          </div>
        </>
      }

    {popupinvitemodal
    ?
      <>
      <div className="fixed inset-0 z-40 overflow-y-auto" id="headlessui-dialog-:r27:" role="dialog" aria-modal="true" data-headlessui-state="open">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 opacity-100" id="headlessui-dialog-overlay-:r28:" aria-hidden="true" data-headlessui-state="open"></div>
                        <div className="relative h-full bg-white text-gray-900 rounded-md shadow-xl align-top sm:align-middle w-full sm:w-[416px] md:w-[640px] opacity-100 translate-y-0 sm:scale-100">
                            <div   className="flex flex-col p-6">
                                <div className="-m-6 divide-y divide-gray-200">
                                <div className="p-6 space-y-4">
                                    <div className="space-y-1">
                                        <h1 className="mb-2 text-lg font-semibold text-gray-900">
                                            Select a Workspace
                                        </h1>
                                        <div className="flex">
                                        <h1 className='text-[20px]'>
                                          Invite a new member via E-mail or Link
                                        </h1>
                                    </div>
                                    {/* ================Input email=================== */}
                                    <div>
                                          <div>
                                            {emails.map((enteredEmail, index) => (
                                              <span key={index} className="bg-gray-300 p-1 m-1 rounded">
                                                {enteredEmail}
                                                <button
                                                  className="ml-3 font-bold text-[12px]"
                                                  onClick={() => handleRemoveEmail(index)}
                                                >
                                                  X
                                                </button>
                                              </span>
                                            ))}
                                          </div>
                                          <input
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            onKeyDown={handleEmailKeyDown}
                                            className="border border-gray-300 p-2 rounded mt-2 w-full"
                                          />
                                        </div> 
                                      {emails &&
                                      <>
                                        {emails.length>0
                                        ?
                                        <>
                                          {sendinginvitation
                                            ?
                                              <button className="bg-gray-400  text-white font-bold py-2 px-4 rounded-sm w-[200px]">
                                                Sending Invitation
                                              </button>
                                            :
                                              <button className="bg-[#334977] text-white font-bold py-2 px-4 rounded-sm w-[200px]"
                                              onClick={()=>{
                                                send_invitation()
                                              }}>
                                                Send invite
                                              </button>
                                            }
                                          </>
                                        :
                                          <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded-sm w-[200px]"
                                          disabled>
                                            Send invite
                                          </button>
                                      }
                                      </>
                                      }                                      
                                    {/* ================Input email=========================== */}
                                    {/* ===============Generate link========================== */}
                                    {initial_invitation_link
                                    ?
                                      <>
                                      <div className="flex flex-col gap-4 bg-white rounded-2xl border border-gray-200 p-4">
                                        <div className="text-gray-900 text-lg font-semibold">Generate a link</div>
                                        <div className="text-gray-600 text-sm">This link will expire on {initial_invitation_link.expire_time}</div>
                                        <div className="flex gap-4 items-center">
                                            <div className="grow">
                                              <div className="space-y-1.5 w-full">
                                                  <label for="teamInviteId" className="text-sm font-medium block text-gray-900 placeholder:text-gray-400 transition-[color] duration-150 ease-in-out"><span className="flex items-center space-x-1"><span></span></span></label>
                                                  <div className="py-1 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                                                    <div className="flex items-center grow gap-2 py-1.5">
                                                        <div className="flex gap-1 grow">
                                                        <input 
                                                          id="teamInviteId" 
                                                          type="text" 
                                                          ref={inputRef}
                                                          readOnly
                                                          className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none"
                                                          value={initial_invitation_link.link}
                                                        /></div>
                                                    </div>
                                                  </div>
                                              </div>
                                            </div>
                                            <div className="mt-2">
                                              <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
                                              onClick={handleCopyClick}>
                                                  <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                                    <div className="flex items-center gap-2">
                                                        Copy link
                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                          <path d="M4.92,3.99c-.03,.8-.05,1.62-.05,2.44,0,1.3,.04,2.57,.12,3.79,.06,.9,.77,1.62,1.67,1.68,1.05,.07,2.07,.11,3.33,.11,.38,0,.74,0,1.09-.01-.02,.45-.04,.9-.07,1.35-.06,.9-.77,1.62-1.67,1.68-1.05,.07-2.07,.11-3.33,.11s-2.27-.04-3.32-.11c-.9-.06-1.62-.78-1.67-1.68-.08-1.22-.12-2.49-.12-3.79s.04-2.57,.12-3.79c.06-.9,.77-1.62,1.67-1.68,.73-.05,1.45-.08,2.24-.1Z" fill="none" stroke="#9CA3AF" stroke-width="1"></path>
                                                          <path d="M14.99,10.23c.08-1.22,.12-2.49,.12-3.79,0-.53,0-1.05-.02-1.56,0-.36-.13-.72-.34-1.01-.82-1.11-1.47-1.8-2.54-2.63-.3-.23-.66-.35-1.04-.36-.37,0-.76-.01-1.18-.01-1.26,0-2.27,.04-3.33,.11-.9,.06-1.62,.78-1.67,1.68-.08,1.22-.12,2.49-.12,3.79s.04,2.57,.12,3.79c.06,.9,.77,1.62,1.67,1.68,1.05,.07,2.07,.11,3.33,.11s2.27-.04,3.32-.11c.9-.06,1.62-.78,1.67-1.68Z" fill="transparent"></path>
                                                          <path d="M14.99,10.23c.08-1.22,.12-2.49,.12-3.79,0-.53,0-1.05-.02-1.56,0-.36-.13-.72-.34-1.01-.82-1.11-1.47-1.8-2.54-2.63-.3-.23-.66-.35-1.04-.36-.37,0-.76-.01-1.18-.01-1.26,0-2.27,.04-3.33,.11-.9,.06-1.62,.78-1.67,1.68-.08,1.22-.12,2.49-.12,3.79s.04,2.57,.12,3.79c.06,.9,.77,1.62,1.67,1.68,1.05,.07,2.07,.11,3.33,.11s2.27-.04,3.32-.11c.9-.06,1.62-.78,1.67-1.68Z" fill="none" stroke="#9CA3AF" stroke-width="1"></path>
                                                        </svg>
                                                    </div>
                                                  </span>
                                              </button>
                                            </div>
                                            <div className="mt-2">
                                              <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
                                              onClick={()=>{
                                                delete_link()
                                              }}>
                                                  <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                                    <div className="flex items-center gap-2">
                                                        Delete 
                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                          <path d="M.86,4.28H15.14" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round"></path>
                                                          <path d="M13.13,4.28H2.86c-.17,3-.16,5.97,.28,8.95,.17,1.1,1.11,1.91,2.22,1.91h5.26c1.11,0,2.06-.81,2.22-1.91,.45-2.98,.45-5.95,.28-8.95Z" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                          <path d="M5.14,4.28v-.57c0-.76,.3-1.48,.84-2.02,.53-.54,1.26-.84,2.02-.84s1.48,.3,2.02,.84c.53,.54,.83,1.26,.83,2.02v.57" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                          <path d="M6.29,7.34v4.73" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                          <path d="M9.71,7.34v4.73" fill="none" stroke="#9CA3AF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </div>
                                                  </span>
                                              </button>
                                            </div>
                                        </div>
                                      </div>
                                      </>
                                    :
                                      <>
                                      <div className="flex flex-col gap-4 bg-white rounded-2xl border border-gray-200 p-4 mt-[10px]">
                                      <div className="text-gray-900 text-lg font-semibold ">Generate a link</div>
                                      <div className="text-gray-600 text-sm">Generate a unique link you can share with your team to join your account. This link will expire in 10 days.</div>
                                      <div>
                                      <button type="button" className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
                                      onClick={()=>{
                                        generate_invitation_generate_link()
                                      }}
                                      >
                                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                      Generate link</span></button></div>
                                      </div>
                                      </>
                                    }

                                    {/* ===============Generate link========================== */}
                                </div>
                            </div>
                            <div className='p-4 m-4'>
                              <button className="float-right m-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 rounded"
                                onClick={()=>{
                                  setpopupinvitemodal(false)
                                  setEmails([])
                                }}>
                                close
                              </button>
                            </div>
                    </div>
                </div>
              </div>
              </div>
            </div>

      </>
    :
    null}

    </>
  )
}

export default Team