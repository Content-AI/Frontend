import React,{useEffect,useState} from 'react'
import Blog from '../../Icons/Blog'
import { fetchData } from '../../../apis/apiService'
import { BACKEND_URL,BACK_END_API_WORKFLOW } from '../../../apis/urls'
import { Link } from 'react-router-dom';


const Workflow = (props) => {
    const [workflow_data,set_workflow_data]=useState(null)


    const get_workflow_data = async() =>{
        const resp = await fetchData(BACKEND_URL+BACK_END_API_WORKFLOW,props.AUTH_TOKEN)
        if(resp.status==200){
            set_workflow_data(resp.data)
        }
    }


    useEffect(()=>{
        if(props.AUTH_TOKEN){
            get_workflow_data()
        }
    },[])


  return (
    <>
        <div className="p-6">
        <div>
            <div className="cursor-pointer border inline-flex items-center justify-center mr-2 mb-2 px-3.5 py-1 text-sm font-medium rounded-full border-blue-800 bg-blue-800 focusRing text-black hover:bg-opacity-100">
            All</div>
        </div>

        <div className="my-2 grid gap-5 mb-12 sm:grid-cols-2">

        {workflow_data &&
        <>
            {workflow_data.map((data,index)=>{
            return (
                <>
                    <Link to={`/workflow/${data.id}`} key={index}>
                        <div id={`template-card-${data.id}`} className="relative p-6 transition-all h-full focus:ring-gray-400 focus:shadow-xl duration-150 rounded-2xl shadow-sm hover:shadow-lg hover:ring-gray-300 hover:ring-2 ring-1 ring-gray-200 group flex flex-col bg-white">
                            <div className="!absolute top-4 right-4"></div>
                            <div className="flex flex-col space-y-2">
                                <img src={BACKEND_URL + data.icon} className="w-8 h-8" alt="frame icon" />
                                <div className="text-left font-semibold text-gray-700">{data.title}</div>
                                <div className="text-gray-500">{data.description}</div>
                            </div>
                        </div>
                    </Link>
                </>

            )})}
        </>

        }
        </div>


</div>
    </>
  )
}

export default Workflow