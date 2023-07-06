import React, { useEffect, useState,useRef } from 'react'
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { BACKEND_URL, BACK_END_API_INNER_TEMPLATE,BACK_END_API_RESPONSE } from '../../../apis/urls';
import { fetchData , postData} from '../../../apis/apiService';
import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { Button } from '@mui/material';
import LoadingPage from '../../LoadingPage'
import toast, { Toaster } from 'react-hot-toast';

import RenderHtml from './RenderHtml';
import RenderTemplate from './RenderTemplate';
import BouncingDotsLoader from '../../BouncingDotsLoader';

// import ReactMarkdown from 'react-markdown'
// import rehypeKatex from 'rehype-katex'

// import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
// import remarkGfm from 'remark-gfm';
// import remarkMath from 'remark-math';


const SingleTemplate = ({ AUTH_TOKEN }) => {

    const navigate = useNavigate();
    const [TemplateDataInputFields, setTemplateDataInputFields] = useState([]);
    const [TemplateData, setTemplateData] = useState(null);
    const [TemplateResponseData, setTemplateResponseData] = useState(null);
    
    const [LoadingButton,setLoadingButton] = useState(false);

    const location = useLocation();

    const { template_id } = useParams();

    const notifyerror = (message) => toast.error(message);
    const notifysucces = (message) => toast.success(message);

    const get_inner_template_data = async (url, token) => {
        const resp = await fetchData(url, token)
        if (resp.status === 200) {
            setTemplateData(resp.data)

        } else { navigate("/template") }
    }

    useEffect(() => {
        get_inner_template_data(BACKEND_URL + BACK_END_API_INNER_TEMPLATE + template_id, AUTH_TOKEN)
    }, [])

    // useEffect(()=>{
    //     console.log(TemplateData)
    // },[TemplateData])


    const handleClick = async(id_of_template) => {

        const divElement = document.getElementById(id_of_template);
        const inputElements = divElement.getElementsByTagName('input');
        const textareaElements = divElement.getElementsByTagName('textarea');
      
        const elements = [...inputElements, ...textareaElements];
      
        const formData = Array.from(elements).reduce((data, element) => {
          data[element.name] = element.value;
          return data;
        }, {});
        let isFormDataValid = true;
        Object.entries(formData).forEach(([key, value]) => {
            if (value.trim() === '') {
              notifyerror(`Value for ${key} is empty.`)
              isFormDataValid = false;
            }
          })

          if (isFormDataValid) {
            setLoadingButton(true)
            let res_of_template =  await postData(formData,BACKEND_URL+BACK_END_API_RESPONSE,AUTH_TOKEN)
            // console.log(res_of_template.data)
            if(res_of_template.status==200){
            setTemplateResponseData(res_of_template.data.content)
            setLoadingButton(false)
            }else{
                notifyerror("Try again")
                setLoadingButton(false)

            }
          }        
      };


    useEffect(() => {
        if (TemplateData) {
            TemplateData[0]['template_fields'].map((data, index) => {
                if(data.component=="textarea")
                {
                    setTemplateDataInputFields((TemplateDataInputFields) => [...TemplateDataInputFields, `<div class='mb-4'><label class='mt-4 mb-4 block text-[15px] font-semibold'>${data.label}</label><textarea class='resize-none h-[250px] appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' name='${data.title}' type='${data.component}' placeholder='${data.placeholder}'></textarea></div>`,]);
                }else{
                    setTemplateDataInputFields((TemplateDataInputFields) => [...TemplateDataInputFields,`<div class="mb-4">
                    <label class="mt-4 mb-4 block text-[15px]  font-semibold">${data.label}</label><input name='${data.title}' type='${data.component}' placeholder='${data.placeholder}' class="appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/></div>`,]);
                }
            })
        }
    }, [TemplateData])


    // useEffect(() => {
        // if(TemplateDataInputFields.len>0){
        // console.log(TemplateDataInputFields)
        // }
    // }, [TemplateDataInputFields])

    const Inputlanguage = [
        { value: "English", label: "English" },
        { value: "France", label: "France" },
    ];

    const Outputlanguage = [
        { value: "English", label: "English" },
        { value: "France", label: "France" },
    ];

    return (
        <>
            <button onClick={() => {
                navigate("/template")
            }}
                className=" text-black font-bold py-2 px-4 rounded mb-4">
                <IoMdArrowBack />
            </button>
            {TemplateData && TemplateData[0] && (
                <>
                    <div className='flex'>
                        <div>
                            <img className='w-[45px] h-[47px]' src={BACKEND_URL + TemplateData[0].icon} />
                        </div>
                        <div>
                            <h1 className='font-bold text-[20px] ml-[1.2rem]'>{TemplateData[0].title}</h1>
                            <p className='font-semibold text-slate-500 ml-[1.2rem]'>{TemplateData[0].description}</p>
                        </div>
                    </div>
                    <div>
                    </div>

                    <div className='flex border-t border-gray-300 mt-3'>

                        <div className='text-slate-500  w-[50%]  flex   lg:w-[40%] md:w-[100%] sm:w-[60%] flex-col  p-3'>
                            <div id={TemplateData[0]["id"]}>
                                {TemplateDataInputFields.length>0
                                ?
                                    TemplateDataInputFields.map((data,index)=>{
                                        return (
                                                <RenderTemplate
                                                    key={index}
                                                    htmldata={data}
                                                />
                                        )
                                    })
                                :
                                    <LoadingPage/>
                                }
                            </div>
                            {/* <label className='font-semibold text-[15px] mb-2 text-slate-500'>Language options</label> */}

                            <div className="flex justify-center">
                                <div>
                                    <label className='font-semibold text-[15px] mb-2 text-slate-500'>Input language</label>
                                    <Select
                                        options={Inputlanguage}
                                        className="w-[150px] font-semibold text-[12px]"
                                        defaultValue={Inputlanguage[0]}
                                    />
                                </div>
                                <div className='ml-6 mr-6 mt-[35px]'>
                                    <AiOutlineArrowRight />
                                </div>
                                <div>
                                    <label className='font-semibold text-[15px] mb-2 text-slate-500'>output language</label>
                                    <Select
                                        options={Outputlanguage}
                                        className="w-[150px] font-semibold text-[12px]"
                                        defaultValue={Outputlanguage[0]}
                                    />
                                </div>
                            </div>

                            <div className='mt-6'>
                                <Button variant="contained" className='w-[200px] float-right'
                                    sx={{ textTransform: "none" }}
                                    onClick={()=>{
                                        handleClick(TemplateData[0]["id"])
                                        setTemplateResponseData(null)
                                    }}
                                >
                                    {LoadingButton
                                        ?
                                            <>
                                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                </svg>
                                                Generating
                                            </>
                                        :
                                            "Generate"
                                    }
                                </Button>
                            </div>
                        </div>

                        <div className="items-center justify-center h-screen bg-[#eff2f9] font-semibold text-[17px]  text-slate-600 w-[60%] ml-[100px] border-l border-gray-300 p-4 max-h-[500px] overflow-y-auto">
                                    {TemplateResponseData
                                    ?
                                        <>
                                        {/* <ReactMarkdown
                                                children={TemplateResponseData}
                                                remarkPlugins={[remarkMath,remarkGfm]}
                                                rehypePlugins={[rehypeKatex]}
                                            /> */}
                                            {/* {TemplateResponseData} */}
                                            <div className='p-4'>
                                                <RenderHtml
                                                    htmldata={TemplateResponseData}
                                                />
                                            </div>
                                        </>
                                    :
                                    (LoadingButton
                                    ?
                                        <>
                                            <div className="mt-3 flex flex-col items-center justify-center">
                                            <div>
                                                <p>
                                                Generating content ...
                                                </p>
                                            </div>
                                            <div className='mt-3'>
                                                <BouncingDotsLoader />
                                            </div>
                                            </div>
                                        </>
                                    :
                                        null
                                    )
                                    }
                        </div>
                        <Toaster/>
                    </div>
                </>
            )}
        </>
    )
}

export default SingleTemplate