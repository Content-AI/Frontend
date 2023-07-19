import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import AnimateHeight from "react-animate-height";

import CaretDown from "../../Icons/CaretDown";
import { postData, fetchData } from "../../../apis/apiService";
import { BACKEND_URL, BACK_END_API_CHAT } from "../../../apis/urls";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import RenderHtml from "../Template/RenderHtml";
import RenderTemplate from "../Template/RenderTemplate";

import { GrClose } from "react-icons/gr";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Popover from "@mui/material/Popover";

const buttonTags = [
  "All",
  "Blog",
  "Business",
  "Ecommerce",
  "Email",
  "Frameworks",
  "Freemium",
  "Google",
  "Marketing",
  "New",
  "SEO",
  "Social Media",
];

const tagList = [
  "Create an image of...",
  "Create a list of 10 blog post titles about...",
  "Write a paragraph about...",
  "Help me create a short story about...",
  "Summarize the following text...",
  "Write a Facebook ad for the holidays...",
  "Write a blog post about...",
  "Write a country song about cats in the style o...",
];

const Chat = ({ AUTH_TOKEN }) => {
  let navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const chatLoadingRef = useRef(null);

  const divRef = useRef(null);

  const notifyerror = (message) => toast.error(message);
  const notifysucces = (message) => toast.success(message);

  const [chatFill, setChatFill] = useState("");
  const [ChatText, setChatText] = useState("");
  const [AllChatText, setAllChatText] = useState([]);
  const [AnswerOfChat, setAnswerOfChat] = useState("");

  const [CurrentQuestion, setCurrentQuestion] = useState(null);
  const [CurrentAnswer, setCurrentAnswer] = useState([]);

  const [Loading, setLoading] = useState(false);

  const [sidebarStatus, setSidebarStatus] = useState(false);

  const [open, setOpen] = useState(false);
  const [popStat, setPopStat] = useState(false);

  const popRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePopoverOpen = (event) => {
    setPopStat(popRef.current);
  };

  const handlePopoverClose = (event) => {
    setPopStat(null);
  };

  const openPop = Boolean(popStat);
  const id = openPop ? "simple-popover" : undefined;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [AllChatText]);

  const submitChatText = async () => {
    // try{
    // setCurrentQuestion(ChatText)
    // let tmp_answer = []
    // let tmp_question = []
    // tmp_answer.push(setCurrentAnswer)
    // tmp_question.push(setCurrentQuestion)
    setLoading(true);
    if (ChatText === "") {
      notifyerror("you need to say somethings");
      return false;
    }
    if (ChatText) {
      setCurrentQuestion(ChatText);
      if (divRef.current) {
        divRef.current.focus();
      }
      const formdata = {
        description: ChatText,
      };
      const resp = await postData(
        formdata,
        BACKEND_URL + BACK_END_API_CHAT,
        AUTH_TOKEN
      );
      if (resp.status == 201) {
        // console.log(resp.data)
        setCurrentQuestion(null);
        const data = {
          content: resp.data[0]["content"],
          description: resp.data[0]["description"],
        };
        setCurrentAnswer((CurrentAnswer) => [...CurrentAnswer, data]);
        setChatText("");
      } else {
        notifyerror("something went wrong");
      }
    }
    // }catch(e){
    //   notifyerror("something went wrong")
    // }
    setLoading(false);
  };

  useEffect(() => {
    console.log("CurrentAnswer", CurrentAnswer);
  }, [CurrentAnswer]);

  const get_initial_chat = async () => {
    const resp = await fetchData(BACKEND_URL + BACK_END_API_CHAT, AUTH_TOKEN);
    if (resp.status == 200 || resp.status == 201) {
      setAllChatText(resp.data);
    } else {
      navigate("/logout");
    }
  };
  useEffect(() => {
    get_initial_chat();
  }, []);

  useEffect(() => {
    if (chatLoadingRef.current) {
      chatLoadingRef.current.focus();
    }
  }, [CurrentQuestion]);

  return (
    <>
      <div className="z-10 relative sm:fixed top-0 right-0 sm:w-[calc(100%-256px)] -mx-6 sm:mx-0 h-full sm:h-screen flex">
        <div className="flex-auto flex flex-col h-full">
          <div className="sm:w-full bg-white px-4 py-2 lg:px-10 lg:py-5 border border-gray-200 flex gap-2">
            <div className="flex-1 text-xl font-semibold">
              <div>
                <input
                  className="w-full truncate bg-transparent outline-none focus:ring pointer-events-auto"
                  type="text"
                  placeholder="Untitled thread"
                  data-testid="EditableChatTitle"
                  defaultValue="AI technology creating new content autonomously"
                />
              </div>
            </div>
            <button
              type="button"
              className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
              onClick={(e) => setSidebarStatus(!sidebarStatus)}
            >
              <span className="flex items-center justify-center gap-x-2 mx-auto select-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={clsx("w-3 h-3", {
                    "order-last rotate-180": sidebarStatus,
                  })}
                >
                  <path
                    fillRule="evenodd"
                    d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{sidebarStatus ? "Hide" : "View"} conversations</span>
              </span>
            </button>
          </div>

          <div className="flex-auto w-full flex-grow flex flex-col h-[calc(100vh-122px)] items-center pt-4 pb-5 overflow-hidden">
            <div className="relative flex flex-col overflow-hidden h-full w-full bg-white grow max-w-[832px]">
              <div className="flex flex-col flex-auto h-full w-full">
                <div className="flex-1 flex max-h-full overflow-x-hidden overflow-y-auto w-full">
                  {AllChatText &&
                    (AllChatText.length > 0 ? (
                      <div
                        ref={chatContainerRef}
                        className="flex-1 flex flex-col item-start bg-white ml-auto mr-auto rounded-md p-3 text-sm overflow-y-auto"
                      >
                        {/* Chat messages */}
                        {AllChatText.map((chat_data, index) => (
                          <div key={index} className="flex flex-col mb-3 mt-4">
                            {/* User */}
                            <div className="relative flex flex-col items-end">
                              <div className="w-6 h-6 rounded-full order-last overflow-hidden">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="default.png"
                                  alt="User"
                                />
                              </div>
                              <div className="text-white bg-blue px-4 py-3 mx-4 rounded-2xl">
                                <RenderHtml htmldata={chat_data.description} />
                              </div>
                            </div>

                            {/* Bot */}
                            <div className="relative flex flex-col">
                              <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="chat.png"
                                  alt="ChatBot"
                                />
                              </div>
                              <div className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl">
                                <RenderHtml htmldata={chat_data.content} />
                              </div>
                            </div>
                          </div>
                        ))}
                        {CurrentAnswer.length > 0
                          ? CurrentAnswer.map((data, index) => {
                              return (
                                <div className="flex flex-col mb-3 mt-4">
                                  <div className="relative flex flex-col items-end">
                                    <div className="w-6 h-6 rounded-full order-last overflow-hidden">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="default.png"
                                        alt="User"
                                      />
                                    </div>
                                    <div className="text-white bg-blue px-4 py-3 mx-4 rounded-2xl">
                                      <p>{data["description"]}</p>
                                    </div>
                                  </div>

                                  <div className="relative flex flex-col">
                                    <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="chat.png"
                                        alt="ChatBot"
                                      />
                                    </div>
                                    <div
                                      className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl"
                                      tabIndex={0}
                                      ref={divRef}
                                    >
                                      <RenderHtml htmldata={data["content"]} />
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : null}

                        {CurrentQuestion ? (
                          <div className="flex flex-col mb-3 mt-4">
                            <div className="relative flex flex-col items-end">
                              <div className="w-6 h-6 rounded-full order-last overflow-hidden">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="default.png"
                                  alt="User"
                                />
                              </div>
                              <div className="text-white bg-blue px-4 py-3 mx-4 rounded-2xl">
                                <p>{CurrentQuestion}</p>
                              </div>
                            </div>

                            {/* Bot */}
                            <div className="relative flex flex-col">
                              <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="chat.png"
                                  alt="ChatBot"
                                />
                              </div>
                              <div
                                className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl"
                                tabIndex={0}
                                ref={chatLoadingRef}
                              >
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      cx="18"
                                      cy="12"
                                      r="0"
                                      fill="currentColor"
                                    >
                                      <animate
                                        attributeName="r"
                                        begin=".67"
                                        calcMode="spline"
                                        dur="1.5s"
                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                        repeatCount="indefinite"
                                        values="0;2;0;0"
                                      />
                                    </circle>
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="0"
                                      fill="currentColor"
                                    >
                                      <animate
                                        attributeName="r"
                                        begin=".33"
                                        calcMode="spline"
                                        dur="1.5s"
                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                        repeatCount="indefinite"
                                        values="0;2;0;0"
                                      />
                                    </circle>
                                    <circle
                                      cx="6"
                                      cy="12"
                                      r="0"
                                      fill="currentColor"
                                    >
                                      <animate
                                        attributeName="r"
                                        begin="0"
                                        calcMode="spline"
                                        dur="1.5s"
                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                        repeatCount="indefinite"
                                        values="0;2;0;0"
                                      />
                                    </circle>
                                  </svg>
                                </>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="flex flex-auto flex-col items-center justify-center">
                        <div className="py-10 text-center">
                          <img
                            src="chat-hero.png"
                            className="w-64 mb-8"
                            alt="Chat Hero"
                          />
                          <h2 className="text-2xl font-bold mb-8">
                            Jasper Chat
                          </h2>
                          <p className="text-sm font-medium leading-none max-w-[300px]">
                            Choose a prompt below or write your own to start
                            chatting with Jasper.
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  ref={popRef}
                  className="chatbox flex flex-col w-full py-2 px-4 @lg:py-4 max-w-7xl m-auto"
                >
                  <div className="p-2 bg-gray-50 w-full flex items-center rounded-t-xl">
                    <button
                      className="group inline-flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-md duration-300 hover:bg-blue-900 hover:text-grey-900 focus:shadow-none"
                      onClick={handleClickOpen}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-grey-600 group-hover:text-grey-700"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 13V5.74264C13 5.47742 12.8946 5.22307 12.7071 5.03553L9.96447 2.29289C9.77693 2.10536 9.52258 2 9.25736 2H4C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13ZM4 0C2.34315 0 1 1.34315 1 3V13C1 14.6569 2.34315 16 4 16H12C13.6569 16 15 14.6569 15 13V5.74264C15 4.94699 14.6839 4.18393 14.1213 3.62132L11.3787 0.87868C10.8161 0.316071 10.053 0 9.25736 0H4ZM5 10C5 9.44771 5.44772 9 6 9H9C9.55228 9 10 9.44771 10 10C10 10.5523 9.55228 11 9 11H6C5.44772 11 5 10.5523 5 10ZM6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7H8C8.55229 7 9 6.55228 9 6C9 5.44772 8.55229 5 8 5H6Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <h3>Browse prompts</h3>
                    </button>
                    <button
                      className="group inline-flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-md duration-300 hover:bg-blue-900 hover:text-grey-900 focus:shadow-none"
                      onClick={handlePopoverOpen}
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M3.28,8.68c-.3,.46-.47,1-.47,1.59,0,1.63,1.34,2.95,2.99,2.95s2.92-1.25,2.99-2.83"
                          fill="none"
                          stroke="#1C64F2"
                          strokeWidth={1}
                        />
                        <path
                          d="M12.61,11.58L2.53,8.45C.39,7.79,.39,4.75,2.53,4.09L12.61,.96c.22-.07,.45-.12,.67-.05,2.39,.79,2.39,9.92,0,10.72-.22,.07-.45,.02-.67-.05Z"
                          fill="none"
                          stroke="#1C64F2"
                          strokeWidth={1}
                          strokeLinejoin="round"
                        />
                      </svg>

                      <h3>Browse voice</h3>
                    </button>
                  </div>
                  <div className="inputbox relative">
                    <input
                      className="w-full h-14 py-4 pl-4 pr-12 border border-border rounded-b-xl placeholder:text-black placeholder:opacity-100 placeholder:font-semibold focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:border-blue"
                      type="text"
                      placeholder="Ask or Search anything"
                      value={ChatText || chatFill}
                      onChange={(e) => setChatText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          submitChatText();
                        }
                      }}
                    />
                    <button
                      className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6"
                      onClick={() => {
                        submitChatText();
                        setChatFill("");
                      }}
                    >
                      {Loading ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="18" cy="12" r="0" fill="currentColor">
                            <animate
                              attributeName="r"
                              begin=".67"
                              calcMode="spline"
                              dur="1.5s"
                              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                              repeatCount="indefinite"
                              values="0;2;0;0"
                            />
                          </circle>
                          <circle cx="12" cy="12" r="0" fill="currentColor">
                            <animate
                              attributeName="r"
                              begin=".33"
                              calcMode="spline"
                              dur="1.5s"
                              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                              repeatCount="indefinite"
                              values="0;2;0;0"
                            />
                          </circle>
                          <circle cx="6" cy="12" r="0" fill="currentColor">
                            <animate
                              attributeName="r"
                              begin="0"
                              calcMode="spline"
                              dur="1.5s"
                              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                              repeatCount="indefinite"
                              values="0;2;0;0"
                            />
                          </circle>
                        </svg>
                      ) : (
                        <svg
                          className="w-full h-full"
                          width="36"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.6939 4.15669C21.6939 4.15669 21.6939 4.16607 21.6939 4.17075L16.2376 22.1651C16.155 22.4574 15.985 22.7174 15.7504 22.9103C15.5158 23.1032 15.2278 23.2197 14.9251 23.2442C14.882 23.2479 14.8389 23.2498 14.7957 23.2498C14.512 23.2507 14.234 23.1704 13.9945 23.0184C13.7549 22.8664 13.5639 22.6491 13.4439 22.392L10.0961 15.3242C10.063 15.2543 10.0524 15.1758 10.0656 15.0996C10.0789 15.0234 10.1154 14.9532 10.1701 14.8986L15.5382 9.5295C15.673 9.38771 15.7469 9.1989 15.7444 9.00332C15.7419 8.80775 15.6631 8.6209 15.5248 8.4826C15.3865 8.34429 15.1997 8.26549 15.0041 8.26299C14.8085 8.26048 14.6197 8.33448 14.4779 8.46919L9.10137 13.8373C9.04672 13.892 8.97649 13.9285 8.90029 13.9418C8.8241 13.9551 8.74566 13.9444 8.67574 13.9114L1.64449 10.5804C1.36835 10.4539 1.13595 10.2483 0.97674 9.98963C0.817528 9.73095 0.738657 9.43085 0.750116 9.12732C0.765386 8.81535 0.878328 8.51607 1.07297 8.2718C1.26762 8.02752 1.53412 7.85061 1.8348 7.76607L19.8292 2.30982H19.8432C20.0994 2.23784 20.3702 2.23531 20.6277 2.30251C20.8852 2.3697 21.1202 2.50419 21.3085 2.69217C21.4969 2.88016 21.6319 3.11487 21.6996 3.37224C21.7673 3.6296 21.7653 3.90034 21.6939 4.15669Z"
                            fill="#1D43FF"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "z-10 absolute top-[50px] sm:top-0 -right-0 h-[calc(100%-50px)] sm:h-full sm:relative w-60 max-w-screen bg-gray-50 flex flex-col duration-300",
            {
              "sm:hidden !-right-full": !sidebarStatus,
            }
          )}
        >
          <div className="p-4 pb-2">
            <button
              type="button"
              className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-blue-600 text-white ring-0 ring-blue-600 hover:ring-2 active:ring-0 w-full"
            >
              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                + New chat conversation
              </span>
            </button>
          </div>
          <div className="flex flex-col items-center h-full flex-1">
            <div className="w-full p-2 flex flex-col">
              <div className="space-y-1.5 w-full">
                <label
                  htmlFor="search-chat-threads"
                  className="text-sm font-medium block text-gray-900 placeholder:text-gray-400 transition-[color] duration-150 ease-in-out"
                >
                  <span className="flex items-center space-x-1">
                    <span />
                  </span>
                </label>
                <div className="py-1 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                  <div className="flex items-center grow gap-2 py-1.5">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.67,12.44c3.19,0,5.78-2.59,5.78-5.78S9.86,.89,6.67,.89,.89,3.48,.89,6.67s2.59,5.78,5.78,5.78Z"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.11,15.11l-4-4"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex gap-1 grow">
                      <input
                        id="search-chat-threads"
                        type="search"
                        className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none"
                        placeholder="Search..."
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grow overflow-y-auto flex-1">
              <div className="group border-b border-gray-200 flex items-center h-13">
                <div className="p-4 flex flex-grow justify-between items-center truncate">
                  <div className="truncate text-ellipsis">
                    <span
                      className="text-ellipsis flex-grow text-xs font-normal"
                      aria-label="Chat title"
                    >
                      Untitled thread
                    </span>
                  </div>
                  <div className="sr-only group-hover:not-sr-only flex">
                    <button
                      type="button"
                      className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                      aria-label="Edit conversation title"
                    >
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                            fill="transparent"
                          />
                          <path
                            d="M6.8,13.68l7.39-7c1.23-1.16,1.13-3.22-.21-4.54-1.31-1.29-3.31-1.38-4.47-.2L2.32,9.28s1.59,.63,2.71,1.73c1.12,1.1,1.76,2.67,1.76,2.67Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                      aria-label="Delete conversation"
                    >
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M.86,4.28H15.14"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                          />
                          <path
                            d="M13.13,4.28H2.86c-.17,3-.16,5.97,.28,8.95,.17,1.1,1.11,1.91,2.22,1.91h5.26c1.11,0,2.06-.81,2.22-1.91,.45-2.98,.45-5.95,.28-8.95Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.14,4.28v-.57c0-.76,.3-1.48,.84-2.02,.53-.54,1.26-.84,2.02-.84s1.48,.3,2.02,.84c.53,.54,.83,1.26,.83,2.02v.57"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.29,7.34v4.73"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.71,7.34v4.73"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group border-b border-gray-200 flex items-center h-13 bg-[#EBF5FF]">
                <div className="p-4 flex flex-grow justify-between items-center truncate">
                  <div className="truncate text-ellipsis">
                    <span
                      className="text-ellipsis flex-grow text-xs font-medium"
                      aria-label="Chat title"
                    >
                      AI technology creating new content autonomously
                    </span>
                  </div>
                  <div className="sr-only group-hover:not-sr-only flex">
                    <button
                      type="button"
                      className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                      aria-label="Edit conversation title"
                    >
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                            fill="transparent"
                          />
                          <path
                            d="M6.8,13.68l7.39-7c1.23-1.16,1.13-3.22-.21-4.54-1.31-1.29-3.31-1.38-4.47-.2L2.32,9.28s1.59,.63,2.71,1.73c1.12,1.1,1.76,2.67,1.76,2.67Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                      aria-label="Delete conversation"
                    >
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M.86,4.28H15.14"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                          />
                          <path
                            d="M13.13,4.28H2.86c-.17,3-.16,5.97,.28,8.95,.17,1.1,1.11,1.91,2.22,1.91h5.26c1.11,0,2.06-.81,2.22-1.91,.45-2.98,.45-5.95,.28-8.95Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.14,4.28v-.57c0-.76,.3-1.48,.84-2.02,.53-.54,1.26-.84,2.02-.84s1.48,.3,2.02,.84c.53,.54,.83,1.26,.83,2.02v.57"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.29,7.34v4.73"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.71,7.34v4.73"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group border-b border-gray-200 flex items-center h-13">
                <div className="p-4 flex flex-grow justify-between items-center truncate">
                  <div className="truncate text-ellipsis">
                    <span
                      className="text-ellipsis flex-grow text-xs font-normal"
                      aria-label="Chat title"
                    >
                      Greeting received.
                    </span>
                  </div>
                  <div className="sr-only group-hover:not-sr-only flex">
                    <button
                      type="button"
                      className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                      aria-label="Edit conversation title"
                    >
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                            fill="transparent"
                          />
                          <path
                            d="M6.8,13.68l7.39-7c1.23-1.16,1.13-3.22-.21-4.54-1.31-1.29-3.31-1.38-4.47-.2L2.32,9.28s1.59,.63,2.71,1.73c1.12,1.1,1.76,2.67,1.76,2.67Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                      aria-label="Delete conversation"
                    >
                      <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M.86,4.28H15.14"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                          />
                          <path
                            d="M13.13,4.28H2.86c-.17,3-.16,5.97,.28,8.95,.17,1.1,1.11,1.91,2.22,1.91h5.26c1.11,0,2.06-.81,2.22-1.91,.45-2.98,.45-5.95,.28-8.95Z"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.14,4.28v-.57c0-.76,.3-1.48,.84-2.02,.53-.54,1.26-.84,2.02-.84s1.48,.3,2.02,.84c.53,.54,.83,1.26,.83,2.02v.57"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.29,7.34v4.73"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.71,7.34v4.73"
                            fill="none"
                            stroke="#0D121C"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="rounded-lg max-w-[1088px] mx-auto"
      >
        <DialogContent>
          <div className="mb-4 pr-12 flex w-full items-center justify-start">
            <h3 className="w-52 text-xl font-bold">Prompts</h3>
            <div className="relative w-full text-grey-600 focus-within:text-grey-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                >
                  <g clipPath="url(#clip0_5_371)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7ZM12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L12.6064 11.1922Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_371">
                      <rect width={16} height={16} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <input
                type="search"
                className="resize-none rounded border border-blue-900 py-2 pl-10 text-sm text-black shadow-sm w-60 focus:outline-none placeholder-grey-400 transition-all duration-300 focus:w-full focus:border-border focus:ring-0"
                placeholder='Try "Sales" or "Email"'
                autoComplete="off"
                data-hj-allow="true"
                defaultValue=""
              />
            </div>
            <div
              onClick={handleClose}
              className="absolute top-0 right-0 p-8 cursor-pointer duration-300 hover:opacity-70"
            >
              <GrClose size={16} />
            </div>
          </div>
          <div className="flex w-full items-start justify-start">
            <div className="w-3/12 h-[500px] self-stretch overflow-scroll border-r border-purple-100 pt-3 pr-3">
              <div className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize hover:bg-blue-900 ">
                Custom
              </div>
              <div className="my-4 opacity-40">
                <div className="border-b border-purple-100 h-0 w-full" />
              </div>
              <div>
                <div className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize bg-blue-900 hover:bg-blue-900">
                  Content/SEO
                </div>
              </div>
              <div>
                <div className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize hover:bg-blue-900">
                  Email Marketing
                </div>
              </div>
              <div>
                <div className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize hover:bg-blue-900">
                  Paid Ads
                </div>
              </div>
              <div>
                <div className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize hover:bg-blue-900">
                  PR/Communications
                </div>
              </div>
              <div>
                <div className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize hover:bg-blue-900">
                  Recruiting
                </div>
              </div>
              <div>
                <div className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize hover:bg-blue-900">
                  Sales
                </div>
              </div>
              <div>
                <div className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize hover:bg-blue-900">
                  Social Media
                </div>
              </div>
            </div>
            <div className="w-4/12 h-[500px] self-stretch overflow-scroll border-r border-purple-100 p-3">
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-blue-800 bg-blue-800">
                Article Generator
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Backlink Outreach Email
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Blog Outline
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Blog Post
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Customer Case Study
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                FAQ Generator
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Headline Generator
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Landing Page Copy
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Product Brochure
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Product Descriptions
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Rewrite Content
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                SEO Content Brief
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                SEO Keyword Ideas
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Short Summary
              </div>
              <div class="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-transparent hover:bg-blue-900">
                Step-by-Step Guide
              </div>
            </div>
            <div className="w-5/12 h-[500px] flex flex-col items-end self-stretch border-r border-purple-100 pt-3 pl-3">
              <div className="relative w-full h-full rounded-md whitespace-pre-wrap text-gray-500 bg-blue-900 p-3 mb-3 overflow-y-scroll">
                <span className="sticky top-0 z-50 flex w-full overflow-y-scroll whitespace-pre-wrap bg-blue-900 pb-2 text-xs text-black/30">
                  PREVIEW (WORKSPACE PROMPT)
                  <div
                    className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-2 bg-transparent text-xs font-bold text-grey-200"
                    role="button"
                  >
                    i
                  </div>
                </span>
                <div className="editor-textarea h-full w-full">
                  <div
                    style={{ maxHeight: 400, minHeight: 300, height: "100%" }}
                    className="focus:outline-none focus:expand no-scrollbar mb-2 w-full resize-none overflow-scroll rounded text-left text-grey-500 placeholder-purple-300 shadow-none  transition-all duration-300 focus:w-full focus:border-green-700 focus:ring-0 focus:ring-transparent"
                    id="custom-prompt-editor-preview"
                  >
                    <div
                      translate="no"
                      className="ProseMirror [&_p]:py-1.5"
                      contentEditable="false"
                    >
                      <p>Write an article about [topic]</p>
                      <p>
                        include relevant statistics (add the links of the
                        sources you use) and consider diverse perspectives.
                        Write it in a [X tone] and mention the source links in
                        the end
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-row justify-between">
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="focus:outline-none select-none items-center rounded py-3 text-xs font-medium ring-offset-2 focus:ring-2 flex justify-around bg-blue text-white px-5"
            onClick={handleClose}
          >
            Use Prompt
          </button>
        </DialogActions>
      </Dialog>

      <Popover
        id={id}
        open={openPop}
        anchorEl={popStat}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes="shadow-none"
      >
        <div className="w-[800px] max-w-full border border-grey-300 bg-white shadow-lg md:left-0 rounded-xl">
          <div>
            <div className="px-4 py-5">
              <div className="space-y-1.5 w-full">
                <label htmlFor="search" className="sr-only">
                  <span className="flex items-center space-x-1">
                    <span>Search</span>
                  </span>
                </label>
                <div className="py-1 !mt-0 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                  <div className="flex items-center grow gap-2 py-1.5">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.67,12.44c3.19,0,5.78-2.59,5.78-5.78S9.86,.89,6.67,.89,.89,3.48,.89,6.67s2.59,5.78,5.78,5.78Z"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.11,15.11l-4-4"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex gap-1 grow">
                      <input
                        id="search"
                        type="search"
                        className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none"
                        placeholder="Search by entry name, tag, or tone"
                        autoComplete="off"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-3 overflow-y-scroll flex items-center no-scrollbar">
              <span className="pr-2 mb-2">
                <button>
                  <div className="inline-block">
                    <div className="text-xs font-medium rounded-full text-gray-900 border py-1 px-3 border-gray-200 bg-white hover hover:bg-gray-100 cursor-pointer">
                      <strong className="font-semibold">
                        <div className="whitespace-nowrap">Tone</div>
                      </strong>
                    </div>
                  </div>
                </button>
              </span>
              <span className="pr-2 mb-2">
                <button>
                  <div className="inline-block">
                    <div
                      className="text-xs font-medium rounded-full text-gray-900 border py-1 px-3 border-gray-200 bg-white hover hover:bg-gray-100 cursor-pointer"
                      style={{}}
                    >
                      <strong className="font-semibold">
                        <div className="whitespace-nowrap">
                          Product information
                        </div>
                      </strong>
                    </div>
                  </div>
                </button>
              </span>
            </div>
            <div className="relative inline-block text-left w-full z-auto max-h-[12.875rem] overflow-y-auto overscroll-contain">
              <div>
                <div className="mx-4 text-gray-500 text-xs my-3 pb-2 border-b border-gray-200">
                  TONE
                </div>
                <ul className="py-1">
                  <label className="flex text-center items-center rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 mx-4 px-4 py-2 text-sm cursor-pointer">
                    <input
                      data-testid="menu-item-9mWWAIdmDGR9njjbRqIM"
                      type="radio"
                      id="9mWWAIdmDGR9njjbRqIM"
                      className="form-radio focus:ring-blue-500 h-4 w-4 mr-2 text-blue-800 border-gray-300"
                      defaultValue="9mWWAIdmDGR9njjbRqIM"
                    />
                    <div className="truncate text-ellipsis max-w-[12rem] @md:max-w-[40rem]">
                      ok
                    </div>
                    <div className="ml-2">
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2.42,12.96c2.57,3.01,8.6,3.01,11.17,0,2.36-2.77,2.18-8.21-.66-10.58C10.38,.26,5.62,.26,3.08,2.38,.23,4.76,.05,10.19,2.42,12.96Z"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.57,7.17h1.71v3.96"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.58,11.13h3.4"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.29,4.25v.37"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </label>
                </ul>
              </div>
              <div>
                <div className="mx-4 text-gray-500 text-xs my-3 pb-2 border-b border-gray-200">
                  PRODUCT INFORMATION
                </div>
                <ul className="py-1">
                  <label className="flex text-center items-center rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 mx-4 px-4 py-2 text-sm cursor-pointer">
                    <input
                      data-testid="menu-item-Hb9kX4FRpQ3Kq9nwplEF"
                      type="checkbox"
                      id="Hb9kX4FRpQ3Kq9nwplEF"
                      className="form-checkbox focus:ring-blue-500 h-4 w-4 mr-2 text-blue-800 border-gray-300"
                      defaultValue="Hb9kX4FRpQ3Kq9nwplEF"
                    />
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.946411 2.46094H15.0536"
                          fill="none"
                          stroke="#0D121C"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.946411 8.17969H15.0536"
                          fill="none"
                          stroke="#0D121C"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.931274 14.1953H6.93127"
                          fill="none"
                          stroke="#0D121C"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="truncate text-ellipsis max-w-[12rem] @md:max-w-[40rem]">
                      asdf
                    </div>
                    <div className="ml-2">
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2.42,12.96c2.57,3.01,8.6,3.01,11.17,0,2.36-2.77,2.18-8.21-.66-10.58C10.38,.26,5.62,.26,3.08,2.38,.23,4.76,.05,10.19,2.42,12.96Z"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.57,7.17h1.71v3.96"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.58,11.13h3.4"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.29,4.25v.37"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </label>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-3 px-4 flex justify-end border-t border-gray-200">
            <button
              type="button"
              className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-blue-600 text-white ring-0 ring-blue-600 hover:ring-2 active:ring-0 justify-end"
            >
              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                Apply to chat
              </span>
            </button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default Chat;
