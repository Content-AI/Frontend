import React, { useState } from "react";
import clsx from "clsx";
import AnimateHeight from "react-animate-height";

import CaretDown from "../../Icons/CaretDown";

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

const Chat = () => {
  const [chatPrompts, setChatPrompts] = useState(true);
  const [open, setOpen] = useState(false);
  const [popStat, setPopStat] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePopoverOpen = (event) => {
    setPopStat(event.currentTarget);
  };

  const handlePopoverClose = (event) => {
    setPopStat(null);
  };

  const openPop = Boolean(popStat);
  const id = openPop ? "simple-popover" : undefined;

  return (
    <>
      <div className="flex flex-col flex-auto">
        <div className="relative flex-auto w-full max-w-3xl mx-auto">
          <div className="flex-auto flex flex-col items-center justify-center">
            <div className="py-10 text-center">
              <img src="chat-hero.png" className="w-64 mb-8" />
              <h2 className="text-2xl font-bold mb-8">Jasper Chat</h2>
              <p className="text-sm font-medium leading-none max-w-[300px]">
                Choose a prompt below or write your own to start chatting with
                Jasper.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full flex flex-col mt-auto">
            <div className="bg-white pb-5 md:pl-6 md:pr-10 px-3">
              <div className="border border-grey-200 rounded-xl shadow">
                <div className="inputbox relative">
                  <input
                    className="w-full h-14 py-4 pl-4 pr-12 border-0 rounded-lg focus:border-0 focus:outline-none placeholder:text-black placeholder:opacity-50"
                    type="text"
                    placeholder="Write a country song about cats in the style of Willie Nelson"
                  />
                  <button className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6">
                    <svg
                      className="w-full h-full"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.6939 4.15669C21.6939 4.15669 21.6939 4.16607 21.6939 4.17075L16.2376 22.1651C16.155 22.4574 15.985 22.7174 15.7504 22.9103C15.5158 23.1032 15.2278 23.2197 14.9251 23.2442C14.882 23.2479 14.8389 23.2498 14.7957 23.2498C14.512 23.2507 14.234 23.1704 13.9945 23.0184C13.7549 22.8664 13.5639 22.6491 13.4439 22.392L10.0961 15.3242C10.063 15.2543 10.0524 15.1758 10.0656 15.0996C10.0789 15.0234 10.1154 14.9532 10.1701 14.8986L15.5382 9.5295C15.673 9.38771 15.7469 9.1989 15.7444 9.00332C15.7419 8.80775 15.6631 8.6209 15.5248 8.4826C15.3865 8.34429 15.1997 8.26549 15.0041 8.26299C14.8085 8.26048 14.6197 8.33448 14.4779 8.46919L9.10137 13.8373C9.04672 13.892 8.97649 13.9285 8.90029 13.9418C8.8241 13.9551 8.74566 13.9444 8.67574 13.9114L1.64449 10.5804C1.36835 10.4539 1.13595 10.2483 0.97674 9.98963C0.817528 9.73095 0.738657 9.43085 0.750116 9.12732C0.765386 8.81535 0.878328 8.51607 1.07297 8.2718C1.26762 8.02752 1.53412 7.85061 1.8348 7.76607L19.8292 2.30982H19.8432C20.0994 2.23784 20.3702 2.23531 20.6277 2.30251C20.8852 2.3697 21.1202 2.50419 21.3085 2.69217C21.4969 2.88016 21.6319 3.11487 21.6996 3.37224C21.7673 3.6296 21.7653 3.90034 21.6939 4.15669Z"
                        fill="#1D43FF"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-2 bg-gray-lightbg">
                  <button
                    className="group inline-flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-md duration-300 hover:bg-blue-900 hover:text-grey-900 focus:shadow-none"
                    onClick={handleClickOpen}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-grey-600 group-hover:text-grey-700"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 13V5.74264C13 5.47742 12.8946 5.22307 12.7071 5.03553L9.96447 2.29289C9.77693 2.10536 9.52258 2 9.25736 2H4C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13ZM4 0C2.34315 0 1 1.34315 1 3V13C1 14.6569 2.34315 16 4 16H12C13.6569 16 15 14.6569 15 13V5.74264C15 4.94699 14.6839 4.18393 14.1213 3.62132L11.3787 0.87868C10.8161 0.316071 10.053 0 9.25736 0H4ZM5 10C5 9.44771 5.44772 9 6 9H9C9.55228 9 10 9.44771 10 10C10 10.5523 9.55228 11 9 11H6C5.44772 11 5 10.5523 5 10ZM6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7H8C8.55229 7 9 6.55228 9 6C9 5.44772 8.55229 5 8 5H6Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <h3>Browse Prompts</h3>
                  </button>
                  <button
                    className="group inline-flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-md duration-300 hover:bg-blue-900 hover:text-grey-900 focus:shadow-none"
                    onClick={handlePopoverOpen}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-grey-600 group-hover:text-grey-700"
                    >
                      <g clipPath="url(#clip0_4208_132880)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 1C16 0.447715 15.5523 0 15 0C14.4477 0 14 0.447715 14 1V15C14 15.5523 14.4477 16 15 16C15.5523 16 16 15.5523 16 15V1ZM6.66667 3.33333C6.66667 2.78105 6.21895 2.33333 5.66667 2.33333C5.11438 2.33333 4.66667 2.78105 4.66667 3.33333V12.6667C4.66667 13.219 5.11438 13.6667 5.66667 13.6667C6.21895 13.6667 6.66667 13.219 6.66667 12.6667V3.33333ZM11.3333 4.66667C11.3333 4.11438 10.8856 3.66667 10.3333 3.66667C9.78105 3.66667 9.33333 4.11438 9.33333 4.66667V11.3333C9.33333 11.8856 9.78105 12.3333 10.3333 12.3333C10.8856 12.3333 11.3333 11.8856 11.3333 11.3333V4.66667ZM1 5.66667C1.55228 5.66667 2 6.11438 2 6.66667V9.33333C2 9.88562 1.55228 10.3333 1 10.3333C0.447715 10.3333 0 9.88562 0 9.33333V6.66667C0 6.11438 0.447715 5.66667 1 5.66667Z"
                          fill="#6C8D9D"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_4208_132880">
                          <rect width="16" height="16" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <h3>Browse Prompts</h3>
                  </button>
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
                  >
                    <div className="w-full max-w-[240px] max-h-128 border border-grey-300 bg-white shadow-sm md:left-0 rounded-xl">
                      <div
                        aria-labelledby="headlessui-menu-button-4"
                        id="headlessui-menu-items-42"
                        role="menu"
                        tabIndex={0}
                      >
                        <div
                          className="flex w-full items-center justify-between text-md text-gray-500 bg-gray-50 px-4 py-2 rounded-t-xl"
                          role="none"
                        >
                          <div className="flex items-center" role="none">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-4"
                            >
                              <g clipPath="url(#clip0_4208_132880)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16 1C16 0.447715 15.5523 0 15 0C14.4477 0 14 0.447715 14 1V15C14 15.5523 14.4477 16 15 16C15.5523 16 16 15.5523 16 15V1ZM6.66667 3.33333C6.66667 2.78105 6.21895 2.33333 5.66667 2.33333C5.11438 2.33333 4.66667 2.78105 4.66667 3.33333V12.6667C4.66667 13.219 5.11438 13.6667 5.66667 13.6667C6.21895 13.6667 6.66667 13.219 6.66667 12.6667V3.33333ZM11.3333 4.66667C11.3333 4.11438 10.8856 3.66667 10.3333 3.66667C9.78105 3.66667 9.33333 4.11438 9.33333 4.66667V11.3333C9.33333 11.8856 9.78105 12.3333 10.3333 12.3333C10.8856 12.3333 11.3333 11.8856 11.3333 11.3333V4.66667ZM1 5.66667C1.55228 5.66667 2 6.11438 2 6.66667V9.33333C2 9.88562 1.55228 10.3333 1 10.3333C0.447715 10.3333 0 9.88562 0 9.33333V6.66667C0 6.11438 0.447715 5.66667 1 5.66667Z"
                                  fill="#6C8D9D"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_4208_132880">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>{" "}
                            Brand Voice
                          </div>
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_39_599)">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V10C14 9.44771 14.4477 9 15 9C15.5523 9 16 9.44771 16 10V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3C0 1.34315 1.34315 0 3 0H6C6.55228 0 7 0.447715 7 1C7 1.55228 6.55228 2 6 2H3ZM14 3.41421L8.70711 8.70711C8.31658 9.09763 7.68342 9.09763 7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289L12.5858 2H10C9.44771 2 9 1.55228 9 1C9 0.447715 9.44771 0 10 0H13C14.6569 0 16 1.34315 16 3V6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6V3.41421Z"
                                fill="currentColor"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_39_599">
                                <rect width={16} height={16} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <ul className="py-4 px-2" role="none">
                          <div
                            className="overflow-y-scroll no-scrollbar"
                            style={{ maxHeight: 144 }}
                            role="none"
                          >
                            <div className="text-sm" role="none">
                              Effortlessly generate content infused with your
                              brand’s authentic voice.
                              <button
                                aria-label="Add My Brand Voice"
                                tabIndex={0}
                                className="group focus:outline-none flex select-none items-center text-xs rounded-lg px-3 py-2 font-semibold border focus:ring-blue-500 bg-blue text-white hover:bg-blue-800 hover:border-blue-900 mt-2 ring-offset-2 focus:ring-2"
                                role="none"
                              >
                                <h3
                                  className="font-semibold text-h3 tracking-slighter text-left flex-nowrap whitespace-nowrap"
                                  role="none"
                                >
                                  Add My Brand Voice
                                </h3>
                              </button>
                            </div>
                          </div>
                          <div
                            className="border-b border-gray-300 my-2"
                            role="none"
                          />
                          <div
                            className="flex items-center px-2 py-1.5 rounded-b-md text-sm"
                            id="headlessui-menu-item-43"
                            role="menuitem"
                            tabIndex={-1}
                          >
                            <div className="flex items-center">
                              <div className="mr-2 w-3 h-3 rounded-full border-4 border-blue-700" />
                              No Brand Voice
                            </div>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </Popover>
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
              Custom
            </div>
            <div className="w-4/12 h-[500px] self-stretch overflow-scroll border-r border-purple-100 p-3">
              Prompt
            </div>
            <div className="w-5/12 h-[500px] flex flex-col items-end self-stretch overflow-scroll border-r border-purple-100 pt-3 pl-3">
              <div className="relative w-full h-full rounded-md bg-blue-900 p-3">
                <span className="sticky top-0 z-50 flex w-full overflow-y-scroll whitespace-pre-wrap bg-grey-100 pb-2 text-xs text-grey-400">
                  PREVIEW (WORKSPACE PROMPT)
                  <div
                    className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-2 bg-transparent text-xs font-bold text-grey-200"
                    role="button"
                  >
                    i
                  </div>
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-blue text-white text-xs font-semibold px-3 py-2 rounded-md"
            onClick={handleClose}
          >
            Use Prompt
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Chat;
