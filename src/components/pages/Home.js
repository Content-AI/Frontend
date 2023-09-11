import React, { useEffect,useState } from "react";
import clsx from "clsx";
import { BACKEND_URL ,BACK_END_API_TEMPLATE_IMP} from "../../apis/urls";
import { fetchData } from "../../apis/apiService";

import CardDoc from "../Card/CardDoc";

import CkCheck from "../Icons/CkCheck";
import ThreeDots from "../Icons/ThreeDots";
import { useNavigate } from "react-router-dom";
import DocumentsIcons from '../Icons/DocumentsIcons'
import ListOfDocument from "./Template/Document/ListOfDocument";
import Workflow from "../Icons/Workflow";
import TemplateIcon from "../Icons/TemplateIcon";


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

const Home = ({AUTH_TOKEN}) => {

  const navigate = useNavigate()
  const [imp_template,set_imp_template]=useState(null)

  const get_template = async(url,token) =>{
    const response_data = await fetchData(url,token)
    if(response_data.status==200){
      set_imp_template(response_data.data)
    }else{
      // navigate("/logout")
    }
  }



  
useEffect(()=>{
  if(AUTH_TOKEN!=null){
    get_template(BACKEND_URL+BACK_END_API_TEMPLATE_IMP,AUTH_TOKEN)
  }
},[])

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="max-w-[843px] mx-auto mt-10 mb-12">
        <div className="mb-6">
          <h1 className="text-[40px] font-bold">Welcome to Jasper</h1>
          <p className="text-sm">
            Follow these steps to get started and earn free credits as you go.
          </p>
        </div>
        <table className="table w-full table-auto border border-border">
          <thead className="p-6 border-b border-border">
            <tr>
              <th className="text-left p-6">Getting Started</th>
              <th className="text-right p-6">1500 credits available</th>
            </tr>
          </thead>
          <tbody className="[&_td]:px-6 [&_td]:py-2 [&_tr:first-child_td]:pt-6 [&_tr:last-child_td]:pb-6 [&_td:last-child]:text-right">
            <tr>
              <td className="">Create an account</td>
              <td className="">
                <div className="inline-block">
                  <CkCheck />
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Generate your first blog post</td>
              <td className="px-6 py-4 text-right">
                <button className="inline-flex items-center justify-center text-white bg-[#304572] px-3 py-1.5 gap-x-2 rounded-md">
                  <span>Try it</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.33398 6.99984C2.33398 6.67767 2.59515 6.4165 2.91732 6.4165H11.084C11.4062 6.4165 11.6673 6.67767 11.6673 6.99984C11.6673 7.322 11.4062 7.58317 11.084 7.58317H2.91732C2.59515 7.58317 2.33398 7.322 2.33398 6.99984Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.58687 2.50435C6.81468 2.27654 7.18402 2.27654 7.41183 2.50435L11.4952 6.58768C11.723 6.81549 11.723 7.18484 11.4952 7.41264L7.41183 11.496C7.18402 11.7238 6.81468 11.7238 6.58687 11.496C6.35906 11.2682 6.35906 10.8988 6.58687 10.671L10.2577 7.00016L6.58687 3.32931C6.35906 3.1015 6.35906 2.73216 6.58687 2.50435Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td>Watch introduction video</td>
              <td>
                <button className="inline-flex items-center justify-center text-white bg-[#304572]  px-3 py-1.5 gap-x-2 rounded-md">
                  <span>Play Video</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.125 7C13.125 8.62445 12.4797 10.1824 11.331 11.331C10.1824 12.4797 8.62445 13.125 7 13.125C5.37555 13.125 3.81763 12.4797 2.66897 11.331C1.52031 10.1824 0.875 8.62445 0.875 7C0.875 5.37555 1.52031 3.81763 2.66897 2.66897C3.81763 1.52031 5.37555 0.875 7 0.875C8.62445 0.875 10.1824 1.52031 11.331 2.66897C12.4797 3.81763 13.125 5.37555 13.125 7V7ZM5.92987 10.0468L9.954 7.364C10.0139 7.32405 10.063 7.26992 10.097 7.20642C10.131 7.14292 10.1488 7.07202 10.1488 7C10.1488 6.92798 10.131 6.85708 10.097 6.79358C10.063 6.73008 10.0139 6.67595 9.954 6.636L5.92987 3.95325C5.86399 3.90941 5.78745 3.88426 5.70841 3.88048C5.62936 3.87669 5.55077 3.89442 5.481 3.93178C5.41123 3.96913 5.3529 4.02471 5.31222 4.09259C5.27155 4.16047 5.25004 4.23811 5.25 4.31725V9.68275C5.25004 9.76189 5.27155 9.83953 5.31222 9.90741C5.3529 9.97529 5.41123 10.0309 5.481 10.0682C5.55077 10.1056 5.62936 10.1233 5.70841 10.1195C5.78745 10.1157 5.86399 10.0906 5.92987 10.0468V10.0468Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    <div>

      <ListOfDocument
          DASHBOARD={true}
          SHOW={"active"}
          AUTH_TOKEN={AUTH_TOKEN}
          search_bar={"off"}
          ShowDashboard="true"
          slice_data='4'
      />

    </div>


      <div className="mt-12 mb-12">
        <h3 className="text-md font-bold mb-6">New tools to help you create</h3>
        <div className="grid grid-cols-2 gap-6">
        {/* ============== */}
        <div className="flex flex-col  cursor-pointer hover:bg-slate-100" title="Work Flow">
          <div className="grid grid-cols-2 gap-6 w-full bg-gray-light border border-border p-6 rounded-lg overflow-hidden">
            <div className="flex flex-col gap-y-4">
              <div className="titlewrap flex gap-x-3">
                <Workflow/>
                <h4 className="text-md font-bold">WorkFlow</h4>
                {/* <span className="text-xs px-2 py-1 text-green bg-green/10 border border-green rounded-xl">
                  Boss Mode
                </span> */}
              </div>
              <p className="text-sm min-h-[62px]">
                Generate WorkFlow to Create Content.
              </p>
              <div className="button-wrap">
              <button className="text-white w-[100px] h-[36px] cursor-pointer inline-flex items-center justify-center text-sm font-bold bg-[#334977] border border-border rounded-md overflow-hidden"
              onClick={()=>{
                navigate("/workflow")
              }}>
                WorkFlow
              </button>
              </div>
            </div>
            <div className="rounded-s-xl rounded-e-xl mb-3">
              <img
                src="card--placeholder.svg"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        </div>


        <div className="flex flex-col  cursor-pointer hover:bg-slate-100" title="Chat Now">
          <div className="grid grid-cols-2 gap-6 w-full bg-gray-light border border-border p-6 rounded-lg overflow-hidden">
            <div className="flex flex-col gap-y-4">
              <div className="titlewrap flex gap-x-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M21.7309 17.5623C22.2599 16.4871 22.5235 15.3008 22.4997 14.1028C22.4759 12.9047 22.1654 11.7298 21.5942 10.6765C21.023 9.6231 20.2077 8.72193 19.2166 8.04843C18.2255 7.37493 17.0875 6.94871 15.8978 6.80545C15.5032 5.8857 14.9286 5.05421 14.2077 4.35998C13.4868 3.66575 12.6343 3.12282 11.7003 2.76318C10.7664 2.40354 9.76987 2.23446 8.76955 2.26591C7.76923 2.29736 6.78532 2.5287 5.87579 2.94629C4.96626 3.36389 4.14951 3.9593 3.47366 4.69744C2.79781 5.43558 2.27653 6.30153 1.94053 7.24425C1.60453 8.18698 1.46061 9.18742 1.51724 10.1866C1.57388 11.1858 1.82993 12.1636 2.2703 13.0623L1.55217 15.5767C1.48809 15.8016 1.48529 16.0396 1.54404 16.266C1.6028 16.4924 1.72099 16.699 1.88638 16.8644C2.05176 17.0298 2.25834 17.148 2.48473 17.2067C2.71113 17.2655 2.94911 17.2627 3.17405 17.1986L5.68842 16.4805C6.44715 16.853 7.26329 17.0948 8.10249 17.1958C8.50251 18.133 9.08933 18.9788 9.82713 19.6817C10.5649 20.3846 11.4382 20.9298 12.3937 21.284C13.3492 21.6381 14.3668 21.7939 15.3845 21.7417C16.4022 21.6895 17.3986 21.4305 18.3128 20.9805L20.8272 21.6986C21.0521 21.7627 21.2901 21.7655 21.5165 21.7067C21.7429 21.648 21.9495 21.5298 22.1148 21.3644C22.2802 21.199 22.3984 20.9924 22.4572 20.766C22.5159 20.5396 22.5131 20.3016 22.4491 20.0767L21.7309 17.5623ZM20.2066 17.688L20.9144 20.1639L18.4384 19.4561C18.2498 19.403 18.0479 19.4259 17.8759 19.5198C16.4934 20.272 14.8708 20.4514 13.3574 20.0194C11.8439 19.5873 10.5606 18.5785 9.78342 17.2098C10.8104 17.1029 11.8042 16.7848 12.7025 16.2757C13.6007 15.7665 14.3841 15.0771 15.0034 14.2509C15.6226 13.4247 16.0645 12.4794 16.3011 11.4744C16.5378 10.4693 16.5642 9.4262 16.3787 8.41045C17.2774 8.62225 18.1151 9.03861 18.8266 9.62711C19.5381 10.2156 20.1042 10.9604 20.4807 11.8034C20.8573 12.6465 21.0342 13.565 20.9977 14.4876C20.9612 15.4102 20.7123 16.312 20.2703 17.1226C20.1756 17.2954 20.1527 17.4985 20.2066 17.688Z"
                    fill="#36464E"
                  />
                </svg>
                <h4 className="text-md font-bold">Chat</h4>
                {/* <span className="text-xs px-2 py-1 text-green bg-green/10 border border-green rounded-xl">
                  Boss Mode
                </span> */}
              </div>
              <p className="text-sm min-h-[62px]">
                Generate ideas, images, and content by chatting directly with
                Jasper.
              </p>
              <div className="button-wrap">
              <button className="text-white w-[100px] h-[36px] cursor-pointer inline-flex items-center justify-center text-sm font-bold bg-[#334977] border border-border rounded-md overflow-hidden"
              onClick={()=>{
                navigate("/chat")
              }}>
                Chat
              </button>
              </div>
            </div>
            <div className="-mb-6 shadow-customv2 rounded-s-xl rounded-e-xl mb-3">
              <img
                src="card--placeholder.svg"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        </div>


        <div className="flex flex-col  cursor-pointer hover:bg-slate-100" title="Use Template">
          <div className="grid grid-cols-2 gap-6 w-full bg-gray-light border border-border p-6 rounded-lg overflow-hidden">
            <div className="flex flex-col gap-y-4">
              <div className="titlewrap flex gap-x-3">
                <TemplateIcon/>
                <h4 className="text-md font-bold">Template</h4>
                {/* <span className="text-xs px-2 py-1 text-green bg-green/10 border border-green rounded-xl">
                  Boss Mode
                </span> */}
              </div>
              <p className="text-sm min-h-[62px]">
                Produce content effortlessly using AI, based on your custom templates.
              </p>
              <div className="button-wrap">
              <button className="text-white w-[100px] h-[36px] cursor-pointer inline-flex items-center justify-center text-sm font-bold bg-[#334977] border border-border rounded-md overflow-hidden"
              onClick={()=>{
                navigate("/template")
              }}>
                Template
              </button>
              </div>
            </div>
            <div className="shadow-customv2 rounded-s-xl rounded-e-xl mb-3">
              <img
                src="card--placeholder.svg"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        </div>


        {/* ============== */}
          {/* <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-6 w-full bg-gray-lightbg border border-border p-6 rounded-lg overflow-hidden">
              <div className="flex flex-col gap-y-4">
                <div className="titlewrap flex gap-x-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18 3C16.8954 3 16 3.89543 16 5C16 6.10457 16.8954 7 18 7C19.1046 7 20 6.10457 20 5C20 3.89543 19.1046 3 18 3ZM14 5C14 2.79086 15.7909 1 18 1C20.2091 1 22 2.79086 22 5C22 7.20914 20.2091 9 18 9C15.7909 9 14 7.20914 14 5Z"
                      fill="#36464E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10ZM2 12C2 9.79086 3.79086 8 6 8C8.20914 8 10 9.79086 10 12C10 14.2091 8.20914 16 6 16C3.79086 16 2 14.2091 2 12Z"
                      fill="#36464E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18 17C16.8954 17 16 17.8954 16 19C16 20.1046 16.8954 21 18 21C19.1046 21 20 20.1046 20 19C20 17.8954 19.1046 17 18 17ZM14 19C14 16.7909 15.7909 15 18 15C20.2091 15 22 16.7909 22 19C22 21.2091 20.2091 23 18 23C15.7909 23 14 21.2091 14 19Z"
                      fill="#36464E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.726 13.0065C8.00406 12.5293 8.61631 12.3679 9.09348 12.6459L15.9235 16.6259C16.4007 16.904 16.5621 17.5162 16.284 17.9934C16.006 18.4706 15.3937 18.632 14.9165 18.3539L8.08653 14.3739C7.60935 14.0959 7.44794 13.4836 7.726 13.0065Z"
                      fill="#36464E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2737 6.0059C16.5521 6.4829 16.391 7.09525 15.914 7.37362L9.09403 11.3536C8.61703 11.632 8.00469 11.471 7.72632 10.994C7.44795 10.517 7.60898 9.90461 8.08598 9.62624L14.906 5.64624C15.383 5.36787 15.9953 5.5289 16.2737 6.0059Z"
                      fill="#36464E"
                    />
                  </svg>
                  <h4 className="text-md font-bold">Workflows</h4>
                  <span className="text-xs px-2 py-1 text-green bg-green/10 border border-green rounded-xl">
                    Boss Mode
                  </span>
                </div>
                <p className="text-sm min-h-[62px]">
                  Create blog posts, social media campaigns, email campaigns,
                  and rewrite content.
                </p>
                <div className="button-wrap">
                  <button className="inline-flex text-sm font-bold px-2 py-1 bg-gray-lightbg border border-border rounded-md overflow-hidden">
                    Upgrade
                  </button>
                </div>
              </div>
              <div className="-mb-6 shadow-customv2">
                <img
                  src="card--placeholder.svg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-md font-bold mb-6">New tools to help you create</h3>
        <div>
          <div className="cardwrap grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
          {imp_template &&
            <>
              {imp_template.map((items, index) => {
                return (
                  <>
                    {index < 3 && <CardDoc {...items} key={"carddoc_" + index} />}
                  </>
                );
              })}
            </>
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
