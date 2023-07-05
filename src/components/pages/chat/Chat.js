import React, { useState } from "react";
import clsx from "clsx";
import AnimateHeight from "react-animate-height";

import CaretDown from "../../Icons/CaretDown";

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

  return (
    <div className="flex flex-col flex-auto">
      <div className="flex flex-auto flex-col items-center justify-center">
        <div className="py-10 -ml-[84px] text-center">
          <img src="chat-hero.png" className="w-64 mb-8" />
          <h2 className="text-2xl font-bold mb-8">Jasper Chat</h2>
          <p className="text-sm font-medium leading-none max-w-[300px]">
            Choose a prompt below or write your own to start chatting with
            Jasper.
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-auto">
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
                    className="text-sm font-medium leading-none px-4 py-3 text-black bg-blue/10 rounded-3xl"
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
            className="w-full h-14 py-4 pl-4 pr-12 border border-border rounded-lg placeholder:text-black placeholder:opacity-100"
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
      </div>
    </div>
  );
};

export default Chat;
