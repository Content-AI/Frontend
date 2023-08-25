import React , {useEffect,useState} from 'react'
import Settings from '../Settings'
import LineCharComponent from './LineCharComponent'
import Table from './Table';
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_URL,BACK_END_API_COUNT_CUSTOM_TEMPLATE } from '../../../apis/urls';

import TooltipInfo from '../../Icons/TooltipInfo';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchData } from '../../../apis/apiService';

const data = [];

const total = "1000"
const CustomizedDot = (props) => {

  const { cx, cy, payload, setPointSelectedPayload } = props;
  useEffect(() => {
    if (payload.selected) {
      const payloadSelected = {
        ...payload,
        cx,
        cy,
      };
      setPointSelectedPayload(payloadSelected);
    }
  }, [payload.selected]);

  if (payload.selected) {
    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="6" fill="#22628F" />
        <circle cx="6" cy="6" r="4" fill="#0F94F3" />
      </svg>
    );
  }
  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="3" fill="#0F94F3" />
    </svg>
  );
};


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

  const setTooltipPos = (payload) => {
    const el = document.getElementById("selectedTooltip");
    const x = payload.cx;
    const y = payload.cy;

    if (el) {
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.visibility = "visible";
    }
  };

  const updateChartData = (pointId) => {
    const updatedChartData = chartData.map((obj) => {
      if (obj.id === pointId) {
        obj.selected = true;
      } else {
        obj.selected = false;
      }
      return obj;
    });
    setChartData(updatedChartData);
  };

  const onCloseTooltip = () => {
    const el = document.getElementById("selectedTooltip");
    if (el) {
      el.style.visibility = "hidden";
    }
    setPointSelectedPayload(null);
    updateChartData(null);
  };

  const handlePointClick = (_, payload) => {
    const dotDataSelected = {
      ...payload.payload,
      cx: payload.cx,
      cy: payload.cy,
    };
    updateChartData(dotDataSelected.id);
    setPointSelectedPayload(dotDataSelected);
  };



  const onMouseLineChartMove = (e) => {
    if (!e || !pointSelectedPayload) return;
    const pointPayload = e.activePayload && e.activePayload[0].payload;
    if (pointPayload && pointPayload.id === pointSelectedPayload.id) {
      e.isTooltipActive = false;
    }
  };



  
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
      {pointSelectedPayload && (
          <div
            id="selectedTooltip"
            className="recharts-tooltip-custom recharts-tooltip-wrapper recharts-tooltip-wrapper-right recharts-tooltip-wrapper-bottom"
          >
            <button className="close-tooltip" onClick={onCloseTooltip}>
              X
            </button>
            <div
              className="recharts-default-tooltip"
              style={{
                margin: "0px",
                padding: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                border: "1px solid rgb(204, 204, 204)",
                whiteSpace: "nowrap"
              }}
            >
              <p className="recharts-tooltip-label" style={{ margin: "0px" }}>
                {pointSelectedPayload.name}
              </p>
              <p className="recharts-tooltip-label" style={{ margin: "0px" }}>
                {pointSelectedPayload.pv}
              </p>
              <p className="recharts-tooltip-label" style={{ margin: "0px" }}>
                {pointSelectedPayload.uv}
              </p>
            </div>
          </div>
        )}
        <LineChart
          width={800}
          height={400}
          data={chartData}
          onMouseMove={onMouseLineChartMove}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="usage"
            stroke="#8884d8"
            dot={({ ...props }) => (
              <CustomizedDot
                setPointSelectedPayload={setPointSelectedPayload}
                {...props}
              />
            )}
            activeDot={{ onClick: handlePointClick }}
          />
        </LineChart>
        
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