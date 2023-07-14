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

  const [chatPrompts, setChatPrompts] = useState(false);
  const [chatFill, setChatFill] = useState("");
  const [ChatText, setChatText] = useState("");
  const [AllChatText, setAllChatText] = useState([]);
  const [AnswerOfChat, setAnswerOfChat] = useState("");

  const [CurrentQuestion, setCurrentQuestion] = useState(null);
  const [CurrentAnswer, setCurrentAnswer] = useState([]);

  const [Loading, setLoading] = useState(false);

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
    <div className="flex flex-col flex-auto">
      {AllChatText &&
        (AllChatText.length > 0 ? (
          <div
            ref={chatContainerRef}
            className="flex flex-col item-start bg-white w-[80%] ml-auto mr-auto rounded-md p-3 font-semibold text-[17px] tracking-wide h-[65vh] overflow-y-auto"
          >
            {/* Chat messages */}
            {AllChatText.map((chat_data, index) => (
              <div key={index} className="flex flex-col items-start mb-3 mt-4">
                {/* User */}
                <div className="flex  bg-[rgba(248,251,252,var(--tw-bg-opacity))]">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="default.png"
                    alt="User"
                  />
                  <div className="ml-1  text-black p-2 rounded-lg">
                    <RenderHtml htmldata={chat_data.description} />
                  </div>
                </div>

                {/* Bot */}
                <div className="flex mt-3 mb-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="chat.png"
                    alt="ChatBot"
                  />
                  <div className="ml-1  text-black p-2 rounded-lg">
                    <RenderHtml htmldata={chat_data.content} />
                  </div>
                </div>
              </div>
            ))}
            {CurrentAnswer.length > 0
              ? CurrentAnswer.map((data, index) => {
                  return (
                    <div className="flex flex-col items-start mb-3 mt-4">
                      <div className="flex  bg-[rgba(248,251,252,var(--tw-bg-opacity))]">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="default.png"
                          alt="User"
                        />
                        <div className="ml-1  text-black p-2 rounded-lg">
                          <p>{data["description"]}</p>
                        </div>
                      </div>

                      <div className="flex mt-3 mb-3">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="chat.png"
                          alt="ChatBot"
                        />
                        <div
                          className="ml-1  text-black p-2 rounded-lg"
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
              <div className="flex flex-col items-start mb-3 mt-4">
                <div className="flex  bg-[rgba(248,251,252,var(--tw-bg-opacity))]">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="default.png"
                    alt="User"
                  />
                  <div className="ml-1  text-black p-2 rounded-lg">
                    <p>{CurrentQuestion}</p>
                  </div>
                </div>

                {/* Bot */}
                <div className="flex mt-3 mb-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="chat.png"
                    alt="ChatBot"
                  />
                  <div
                    className="ml-1  text-black p-2 rounded-lg"
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
                    </>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <div className="flex flex-auto flex-col items-center justify-center">
              <div className="py-10 -ml-[84px] text-center">
                <img
                  src="chat-hero.png"
                  className="w-64 mb-8"
                  alt="Chat Hero"
                />
                <h2 className="text-2xl font-bold mb-8">Jasper Chat</h2>
                <p className="text-sm font-medium leading-none max-w-[300px]">
                  Choose a prompt below or write your own to start chatting with
                  Jasper.
                </p>
              </div>
            </div>
          </>
        ))}
      <div className="flex flex-col w-[80%] m-auto">
        <div className="flex flex-col items-start mb-5">
          <h3
            className="inline-flex items-center text-sm font-medium gap-x-3 mb-3 cursor-pointer"
            onClick={(e) => setChatPrompts(!chatPrompts)}
          >
            Hide prompts
            <span
              className={clsx("icon duration-300", {
                "rotate-180": !chatPrompts,
              })}
            >
              <CaretDown classes="w-6 h-6" />
            </span>
          </h3>
          <AnimateHeight height={chatPrompts ? "auto" : 0}>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {tagList.map((item, index) => {
                return (
                  <span
                    key={index}
                    className="text-sm font-medium leading-none px-4 py-3 text-black bg-blue/10 hover:bg-blue hover:text-white cursor-pointer rounded-3xl duration-300"
                    onClick={(e) => setChatFill(e.currentTarget.textContent)}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </AnimateHeight>
        </div>
        <div className="inputbox relative">
          <input
            className="w-full h-14 py-4 pl-4 pr-12 border border-border rounded-lg placeholder:text-black placeholder:opacity-100 placeholder:font-semibold focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:border-purple-400"
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
              <>
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
              </>
            )}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Chat;
