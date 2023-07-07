import React, { useState } from "react";
import clsx from "clsx";

import CardDoc from "../../Card/CardDoc";

const cardData = [
  {
    title: "Blog Post Wizard",
    description:
      "Jump into a whole first draft of your blog post in 5 minutes - all we need is your title and topic.",
    icon: "FileDoc.svg",
    isPremium: true,
  },
  {
    title: "Instagram Captions",
    description:
      "Generate captions for an Instagram photo just by describing what the post is about.",
    icon: "FileDoc.svg",
  },
];

const Projects = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="mt-8">
        <div className="title-header flex items-center mb-6">
          <h3 className="inline-flex text-md font-bold text-blue pb-1 border-b border-blue">
            Get Started
          </h3>
          <div className="ml-auto">
            <p className="text-md">See more templates</p>
          </div>
        </div>
        <div>
          <div className="cardwrap grid grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-5">
            <div className="flex flex-col items-center justify-center text-white bg-blue rounded-xl">
              <div className="icon w-6 h-6 mb-2.5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="text-md font-bold">Create New Project</p>
            </div>
            {cardData.map((items, index) => {
              return (
                <>
                  {index < 2 && <CardDoc {...items} key={"carddoc_" + index} />}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="title-header flex items-center mb-6">
          <h3 className="inline-flex text-md font-bold text-blue pb-1 border-b border-blue">
            Folders
          </h3>
          <div className="flex items-center gap-4 ml-auto">
            <button className="flex items-center text-sm leading-none font-bold bg-white px-3 py-2 gap-2 border border-border rounded-md">
              <span className="icon w-3.5 h-3.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.33398 2.33317C2.17927 2.33317 2.0309 2.39463 1.92151 2.50402C1.81211 2.61342 1.75065 2.76179 1.75065 2.9165V11.0832C1.75065 11.2379 1.81211 11.3863 1.92151 11.4956C2.0309 11.605 2.17928 11.6665 2.33398 11.6665H11.6673C11.822 11.6665 11.9704 11.605 12.0798 11.4956C12.1892 11.3863 12.2507 11.2379 12.2507 11.0832V4.6665C12.2507 4.51179 12.1892 4.36342 12.0798 4.25402C11.9704 4.14463 11.822 4.08317 11.6673 4.08317H6.41732C6.22228 4.08317 6.04014 3.98569 5.93196 3.82341L4.93846 2.33317H2.33398ZM1.09655 1.67907C1.42474 1.35088 1.86986 1.1665 2.33398 1.1665H5.25065C5.44569 1.1665 5.62783 1.26398 5.73601 1.42626L6.72951 2.9165H11.6673C12.1314 2.9165 12.5766 3.10088 12.9048 3.42907C13.2329 3.75726 13.4173 4.20237 13.4173 4.6665V11.0832C13.4173 11.5473 13.2329 11.9924 12.9048 12.3206C12.5766 12.6488 12.1314 12.8332 11.6673 12.8332H2.33398C1.86986 12.8332 1.42474 12.6488 1.09655 12.3206C0.768359 11.9924 0.583984 11.5473 0.583984 11.0832V2.9165C0.583984 2.45238 0.768359 2.00726 1.09655 1.67907Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.99935 5.8335C7.32152 5.8335 7.58268 6.09466 7.58268 6.41683V9.91683C7.58268 10.239 7.32152 10.5002 6.99935 10.5002C6.67718 10.5002 6.41602 10.239 6.41602 9.91683V6.41683C6.41602 6.09466 6.67718 5.8335 6.99935 5.8335Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.66602 8.16683C4.66602 7.84466 4.92718 7.5835 5.24935 7.5835H8.74935C9.07151 7.5835 9.33268 7.84466 9.33268 8.16683C9.33268 8.489 9.07151 8.75016 8.74935 8.75016H5.24935C4.92718 8.75016 4.66602 8.489 4.66602 8.16683Z"
                    fill="black"
                  />
                </svg>
              </span>
              Create Folder
            </button>
            <div className="selectopt relative w-40">
              <span className="icon absolute top-1/2 left-3 -translate-y-1/2 w-3.5 h-3.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <g clip-path="url(#clip0_512_3040)">
                    <path
                      d="M10.8909 8.99179C11.0786 8.80401 11.3331 8.69847 11.5986 8.69838C11.864 8.69828 12.1186 8.80365 12.3064 8.99129C12.4942 9.17893 12.5997 9.43347 12.5998 9.69893C12.5999 9.96439 12.4946 10.219 12.3069 10.4068L8.00691 14.7068C7.81938 14.8943 7.56507 14.9996 7.29991 14.9996C7.03475 14.9996 6.78044 14.8943 6.59291 14.7068L2.29291 10.4068C2.10527 10.2189 1.99996 9.96413 2.00015 9.69858C2.00033 9.43303 2.106 9.17843 2.29391 8.99079C2.48182 8.80315 2.73657 8.69783 3.00212 8.69802C3.26767 8.69821 3.52227 8.80388 3.70991 8.99179L7.29991 12.5828L10.8909 8.99179ZM10.8909 5.00779L7.29991 1.41679L3.70891 5.00779C3.52127 5.19556 3.26672 5.3011 3.00126 5.3012C2.73581 5.30129 2.48118 5.19593 2.29341 5.00829C2.10564 4.82065 2.00009 4.5661 2 4.30064C1.99991 4.03518 2.10527 3.78056 2.29291 3.59279L6.59291 -0.707214C6.78044 -0.894685 7.03475 -1 7.29991 -1C7.56507 -1 7.81938 -0.894685 8.00691 -0.707214L12.3069 3.59279C12.3998 3.68576 12.4735 3.79613 12.5238 3.91758C12.574 4.03904 12.5999 4.1692 12.5998 4.30064C12.5998 4.43208 12.5738 4.56223 12.5235 4.68364C12.4732 4.80506 12.3994 4.91538 12.3064 5.00829C12.2134 5.1012 12.1031 5.17488 11.9816 5.22514C11.8602 5.2754 11.73 5.30124 11.5986 5.3012C11.4671 5.30115 11.337 5.27521 11.2156 5.22487C11.0941 5.17453 10.9838 5.10076 10.8909 5.00779Z"
                      fill="#36464E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_512_3040">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <select
                name=""
                id=""
                className="w-full h-8 text-sm font-bold border border-border rounded-md bg-white px-8 py-1"
              >
                <option>Last Modified</option>
                <option>Last Modified</option>
                <option>Last Modified</option>
              </select>
            </div>
          </div>
        </div>
        <div className="empty-placeholder h-24 flex items-center justify-center text-center">
          <p className="text-md font-bold opacity-50">
            You don't have any folders yet.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="title-header flex items-center mb-6">
          <h3 className="inline-flex text-md font-bold text-blue pb-1 border-b border-blue">
            Projects
          </h3>
          <div className="flex items-center gap-4 ml-auto">
            <button className="flex items-center bg-white px-3 py-2 gap-2 border border-border rounded-md">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.85937 1.75C1.79897 1.75 1.75 1.79897 1.75 1.85937V5.57812C1.75 5.63853 1.79897 5.6875 1.85937 5.6875H5.57812C5.63853 5.6875 5.6875 5.63853 5.6875 5.57812V1.85937C5.6875 1.79897 5.63853 1.75 5.57812 1.75H1.85937ZM0.875 1.85937C0.875 1.31572 1.31572 0.875 1.85937 0.875H5.57812C6.12178 0.875 6.5625 1.31572 6.5625 1.85937V5.57812C6.5625 6.12178 6.12178 6.5625 5.57812 6.5625H1.85937C1.31572 6.5625 0.875 6.12178 0.875 5.57812V1.85937Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.42187 1.75C8.36147 1.75 8.3125 1.79897 8.3125 1.85937V5.57812C8.3125 5.63853 8.36147 5.6875 8.42187 5.6875H12.1406C12.201 5.6875 12.25 5.63853 12.25 5.57812V1.85937C12.25 1.79897 12.201 1.75 12.1406 1.75H8.42187ZM7.4375 1.85937C7.4375 1.31572 7.87822 0.875 8.42187 0.875H12.1406C12.6843 0.875 13.125 1.31572 13.125 1.85937V5.57812C13.125 6.12178 12.6843 6.5625 12.1406 6.5625H8.42187C7.87822 6.5625 7.4375 6.12178 7.4375 5.57812V1.85937Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.85937 8.3125C1.79897 8.3125 1.75 8.36147 1.75 8.42187V12.1406C1.75 12.201 1.79897 12.25 1.85937 12.25H5.57812C5.63853 12.25 5.6875 12.201 5.6875 12.1406V8.42187C5.6875 8.36147 5.63853 8.3125 5.57812 8.3125H1.85937ZM0.875 8.42187C0.875 7.87822 1.31572 7.4375 1.85937 7.4375H5.57812C6.12178 7.4375 6.5625 7.87822 6.5625 8.42187V12.1406C6.5625 12.6843 6.12178 13.125 5.57812 13.125H1.85937C1.31572 13.125 0.875 12.6843 0.875 12.1406V8.42187Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.42187 8.3125C8.36147 8.3125 8.3125 8.36147 8.3125 8.42187V12.1406C8.3125 12.201 8.36147 12.25 8.42187 12.25H12.1406C12.201 12.25 12.25 12.201 12.25 12.1406V8.42187C12.25 8.36147 12.201 8.3125 12.1406 8.3125H8.42187ZM7.4375 8.42187C7.4375 7.87822 7.87822 7.4375 8.42187 7.4375H12.1406C12.6843 7.4375 13.125 7.87822 13.125 8.42187V12.1406C13.125 12.6843 12.6843 13.125 12.1406 13.125H8.42187C7.87822 13.125 7.4375 12.6843 7.4375 12.1406V8.42187Z"
                  fill="black"
                />
              </svg>
            </button>
            <div className="selectopt relative w-40">
              <span className="icon absolute top-1/2 left-3 -translate-y-1/2 w-3.5 h-3.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <g clip-path="url(#clip0_512_3040)">
                    <path
                      d="M10.8909 8.99179C11.0786 8.80401 11.3331 8.69847 11.5986 8.69838C11.864 8.69828 12.1186 8.80365 12.3064 8.99129C12.4942 9.17893 12.5997 9.43347 12.5998 9.69893C12.5999 9.96439 12.4946 10.219 12.3069 10.4068L8.00691 14.7068C7.81938 14.8943 7.56507 14.9996 7.29991 14.9996C7.03475 14.9996 6.78044 14.8943 6.59291 14.7068L2.29291 10.4068C2.10527 10.2189 1.99996 9.96413 2.00015 9.69858C2.00033 9.43303 2.106 9.17843 2.29391 8.99079C2.48182 8.80315 2.73657 8.69783 3.00212 8.69802C3.26767 8.69821 3.52227 8.80388 3.70991 8.99179L7.29991 12.5828L10.8909 8.99179ZM10.8909 5.00779L7.29991 1.41679L3.70891 5.00779C3.52127 5.19556 3.26672 5.3011 3.00126 5.3012C2.73581 5.30129 2.48118 5.19593 2.29341 5.00829C2.10564 4.82065 2.00009 4.5661 2 4.30064C1.99991 4.03518 2.10527 3.78056 2.29291 3.59279L6.59291 -0.707214C6.78044 -0.894685 7.03475 -1 7.29991 -1C7.56507 -1 7.81938 -0.894685 8.00691 -0.707214L12.3069 3.59279C12.3998 3.68576 12.4735 3.79613 12.5238 3.91758C12.574 4.03904 12.5999 4.1692 12.5998 4.30064C12.5998 4.43208 12.5738 4.56223 12.5235 4.68364C12.4732 4.80506 12.3994 4.91538 12.3064 5.00829C12.2134 5.1012 12.1031 5.17488 11.9816 5.22514C11.8602 5.2754 11.73 5.30124 11.5986 5.3012C11.4671 5.30115 11.337 5.27521 11.2156 5.22487C11.0941 5.17453 10.9838 5.10076 10.8909 5.00779Z"
                      fill="#36464E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_512_3040">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <select
                name=""
                id=""
                className="w-full h-8 text-sm font-bold border border-border rounded-md bg-white px-8 py-1"
              >
                <option>Last Modified</option>
                <option>Last Modified</option>
                <option>Last Modified</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="card border border-border rounded-xl">
            <div className="card-header p-6 border-b border-border">
              <p className="text-md font-bold">2023-03-25 Untitled</p>
            </div>
            <div className="card-body p-6">
              <button className="text-md font-bold leading-none px-4 py-2 bg-[#D9D9D9] rounded">
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
