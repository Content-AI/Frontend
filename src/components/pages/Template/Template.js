import React, { useState } from "react";
import clsx from "clsx";

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

const cardData = [
  {
    title: "Documents",
    description:
      "Let Jasper help you write longer articles from start to finish.",
    icon: "FileDoc.svg",
    isPremium: true,
  },
  {
    title: "Content Summarizer",
    description: "Get the key bullet points from a piece of content.",
    icon: "FileDoc.svg",
    isPremium: true,
  },
  {
    title: "AIDA Framework",
    description:
      "Use the oldest marketing framework in the world. Attention, Interest, Desire, Action.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Commands",
    description: "Tell Jasper excatly what to write with a command",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Company Bio",
    description: "Tell your company’s story with a captivating bio",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Content Improver",
    description:
      "Take a piece of content and rewrite it to make it more interesting, creative, and engaging.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Email Subject Lines",
    description:
      "Let Jasper help you write longer articles from start to finish.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "One Shot Blog Post",
    description: "Get the key bullet points from a piece of content.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Paragraph Generator",
    description:
      "Use the oldest marketing framework in the world. Attention, Interest, Desire, Action.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "PAS Framework",
    description:
      "Let Jasper help you write longer articles from start to finish.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Photo Post Captions",
    description: "Get the key bullet points from a piece of content.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Product Description",
    description:
      "Use the oldest marketing framework in the world. Attention, Interest, Desire, Action.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
];

const Template = () => {
  const [activeCat, setActiveCat] = useState();

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Templates</h1>
      <div>
        <div className="searchbox relative max-w-md mx-auto mb-6">
          <div className="icon absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6">
            <svg
              className="w-full h-full"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5299 20.4696L16.8358 15.7765C18.1963 14.1431 18.8748 12.048 18.73 9.92715C18.5852 7.80629 17.6283 5.82289 16.0584 4.38956C14.4885 2.95623 12.4264 2.18333 10.3011 2.23163C8.1759 2.27993 6.15108 3.14571 4.64791 4.64888C3.14474 6.15205 2.27895 8.17687 2.23065 10.3021C2.18235 12.4274 2.95526 14.4894 4.38859 16.0593C5.82191 17.6293 7.80531 18.5861 9.92618 18.7309C12.047 18.8757 14.1421 18.1973 15.7755 16.8368L20.4686 21.5308C20.5383 21.6005 20.621 21.6558 20.7121 21.6935C20.8031 21.7312 20.9007 21.7506 20.9992 21.7506C21.0978 21.7506 21.1954 21.7312 21.2864 21.6935C21.3775 21.6558 21.4602 21.6005 21.5299 21.5308C21.5995 21.4612 21.6548 21.3784 21.6925 21.2874C21.7302 21.1963 21.7497 21.0988 21.7497 21.0002C21.7497 20.9017 21.7302 20.8041 21.6925 20.713C21.6548 20.622 21.5995 20.5393 21.5299 20.4696ZM3.74924 10.5002C3.74924 9.16519 4.14512 7.86015 4.88682 6.75011C5.62852 5.64008 6.68272 4.77492 7.91612 4.26403C9.14952 3.75314 10.5067 3.61946 11.8161 3.87991C13.1255 4.14036 14.3282 4.78324 15.2722 5.72724C16.2162 6.67125 16.8591 7.87398 17.1195 9.18335C17.38 10.4927 17.2463 11.8499 16.7354 13.0833C16.2245 14.3167 15.3594 15.3709 14.2493 16.1126C13.1393 16.8543 11.8343 17.2502 10.4992 17.2502C8.70963 17.2482 6.9939 16.5364 5.72846 15.271C4.46302 14.0056 3.75122 12.2898 3.74924 10.5002Z"
                fill="#343330"
              />
            </svg>
          </div>
          <input
            className="w-full h-10 py-2.5 pr-4 pl-[52px] border border-border rounded-3xl placeholder:text-black placeholder:opacity-100"
            type="text"
            placeholder="Search content types like Facebook Ads, Email, Blog ideas..."
          />
        </div>
        <div className="searchtags flex flex-wrap gap-2 mb-6">
          {buttonTags.map((items, index) => {
            return (
              <button
                key={index}
                className={clsx(
                  "text-sm text-black px-4 py-2 border border-border rounded-3xl duration-300",
                  {
                    "active text-white bg-blue border-blue":
                      activeCat === items,
                    "hover:bg-blue/10": activeCat !== items,
                  }
                )}
                onClick={(e) => setActiveCat(items)}
              >
                {items}
              </button>
            );
          })}
        </div>
        <div className="cardwrap grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
          {cardData.map((items, index) => {
            return (
              <div
                key={index}
                className="card flex p-6 border border-border rounded-xl"
              >
                <div className="icon flex-none w-14 h-14 p-2 bg-blue-700/10 rounded-xl">
                  <img src={items.icon} alt="" className="block w-full" />
                </div>
                <div className="content relative flex-auto pl-4">
                  <div className="title flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold leading-none">
                      {items.title}
                    </h4>
                    {items.isPremium && (
                      <span className="text-xs text-green py-1 px-2 bg-green/10 border border-green rounded-3xl">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-none">{items.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Template;
