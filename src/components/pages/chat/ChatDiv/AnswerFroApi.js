import React from 'react'
import RenderHtmlData from '../../Template/RenderHtmlData'

import Dummybn from '../Dummybn'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import MarkdownRenderer from '../ChatRenders/MarkdownRenderer'
import MarkdownPreview from "@uiw/react-markdown-preview";




const AnswerFroApi = (props) => {
  return (
    
    <>
     <div className="relative flex flex-col">
        <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
        <img
            className="w-full h-full rounded-full"
            src="https://aiprojectfilestorage.s3.ap-southeast-2.amazonaws.com/frontend-images/chat.png"
            alt="ChatBot"
        />
        </div>
        <div className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl">


        {/* <RenderHtmlData htmldata={props.content} /> */}

        <div data-color-mode="light ">
        <MarkdownPreview source={props.content} />
      </div>

        {/* <MarkdownRenderer content={props.content} /> */}

        {/* <ReactMarkdown
          children={props.content}
          remarkPlugins={[remarkMath,remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        /> */}
        {/* ============all sorts of btn================ */}
        <Dummybn
            all_data={props.chat_data}
            data={props.content}
        />
        {/* ============all sorts of btn================ */}
        </div>
    </div>

  </>
  )
}

export default AnswerFroApi
