import React , {useEffect,useState} from 'react'
import Settings from '../Settings'
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_URL,BACK_END_API_COUNT_CUSTOM_TEMPLATE } from '../../../apis/urls';

import TooltipInfo from '../../Icons/TooltipInfo';


import { fetchData } from '../../../apis/apiService';
import CustomeGraph from './Graph/CustomeGraph';

const Usage = (props) => {
  
  
    const [pointSelectedPayload, setPointSelectedPayload] = useState(null);
    const [chartData, setChartData] = useState(null);
  
  let list_token_generated_by_user = useSelector(
    (state) => state.SetListTokenGeneratedByUser.ListTokenGeneratedByUser
  );


  useEffect(()=>{
    if(list_token_generated_by_user!=null){
    setChartData(list_token_generated_by_user.data)
    }
  },[])
  
  return (
    <>
      <Settings/> 
      {chartData &&
        <div className='m-auto'>
    
        <div className="max-w-4xl">
        <div className="justify-flex-start mb-4 flex items-center">
          <h2 className="mb-1 pb-1 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Usage</h2>
          {/* <div className="ml-4">
            <div className="flex max-w-xl space-x-4 overflow-x-auto p-1" aria-label="Tabs"><button className="rounded-md bg-blue-100 px-3 py-1.5 text-sm font-normal text-blue-900" aria-current="page">All team</button><button className="rounded-md px-3 py-1.5 text-sm font-normal text-gray-500 hover:bg-gray-100">Individual</button></div>
          </div> */}
        </div>
  
        <div className="mb-6">
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div title="info about creation" className=" rounded-lg bg-white px-4 py-5 ring-1 ring-gray-200 sm:p-6">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <div>Words generated</div>
                <div>
                                      
                  <TooltipInfo
                    text="Usage of Token by User" 
                  />
                 
                </div>
              </div>
              <div className="my-1 text-3xl font-semibold text-gray-900">{list_token_generated_by_user.total}</div>
            </div>
            {/* <div title="info about creation" className=" rounded-lg bg-white px-4 py-5 ring-1 ring-gray-200 sm:p-6">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <div>Active users</div>
                <div>
                  <TooltipInfo
                    text="Active Users" 
                  />
                </div>
              </div>
              <div className="my-1 text-3xl font-semibold text-gray-900">1</div>
            </div> */}
            <div title="info about creation" className=" rounded-lg bg-white px-4 py-5 ring-1 ring-gray-200 sm:p-6">
              <div className="flex items-center  text-sm font-medium text-gray-500">
                <div>Templates</div>
                <div>
                  <TooltipInfo 
                    text="Custom Template created by users"
                  />
                </div>
              </div>
              <div className="my-1 text-3xl font-semibold text-gray-900">
              {list_token_generated_by_user.count_template}
              </div>
            </div>
          </div>
        </div>
      {/* =========chart============ */}

            <CustomeGraph/>

      {/* =========chart============ */}
        
        {/* <div className='mt-[40px]'>
            <Table total_data={list_token_generated_by_user}/>
        </div> */}
        
      </div>
        </div>
      }

    </>
  )
}

export default Usage