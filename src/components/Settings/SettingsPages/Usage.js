import React,{useEffect,useState} from 'react'
import Settings from '../Settings'
import LineCharComponent from './LineCharComponent'
import Table from './Table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    id: 1,
    name: "Jan",
    uv: 4000,
    usage: 200,
    amt: 2400,
    selected: false,
  },
  {
    id: 2,
    name: "feb",
    uv: 3000,
    usage: 2000,
    amt: 2210,
    selected: false,
  },
  {
    id: 3,
    name: "mar",
    uv: 3000,
    usage: 400,
    amt: 2210,
    selected: false,
  },
  {
    id: 4,
    name: "april",
    uv: 3000,
    usage: 360,
    amt: 2210,
    selected: false,
  },
];
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


const Usage = () => {


  const [pointSelectedPayload, setPointSelectedPayload] = useState(null);
  const [chartData, setChartData] = useState(data);

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

  const onSelectPoint = (dotId) => {
    updateChartData(dotId);
  };

  useEffect(() => {
    if (pointSelectedPayload) {
      setTooltipPos(pointSelectedPayload);
    }
  }, [pointSelectedPayload]);

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
      <div class="max-w-4xl">
      <div class="justify-flex-start mb-4 flex items-center">
        <h2 class="mb-1 pb-1 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Usage</h2>
        {/* <div class="ml-4">
          <div class="flex max-w-xl space-x-4 overflow-x-auto p-1" aria-label="Tabs"><button class="rounded-md bg-blue-100 px-3 py-1.5 text-sm font-normal text-blue-900" aria-current="page">All team</button><button class="rounded-md px-3 py-1.5 text-sm font-normal text-gray-500 hover:bg-gray-100">Individual</button></div>
        </div> */}
      </div>
 
      <div class="mb-6">
        <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div title="info about creation" class="overflow-hidden rounded-lg bg-white px-4 py-5 ring-1 ring-gray-200 sm:p-6">
            <dt class="flex items-center truncate text-sm font-medium text-gray-500">
              <div>Words generated</div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="ml-2 h-4 w-4 text-gray-300 hover:text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </dt>
            <dd class="my-1 text-3xl font-semibold text-gray-900">3000</dd>
          </div>
          <div title="info about creation" class="overflow-hidden rounded-lg bg-white px-4 py-5 ring-1 ring-gray-200 sm:p-6">
            <dt class="flex items-center truncate text-sm font-medium text-gray-500">
              <div>Active users</div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="ml-2 h-4 w-4 text-gray-300 hover:text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </dt>
            <dd class="my-1 text-3xl font-semibold text-gray-900">1</dd>
          </div>
          <div title="info about creation" class="overflow-hidden rounded-lg bg-white px-4 py-5 ring-1 ring-gray-200 sm:p-6">
            <dt class="flex items-center truncate text-sm font-medium text-gray-500">
              <div>Templates</div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="ml-2 h-4 w-4 text-gray-300 hover:text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </dt>
            <dd class="my-1 text-3xl font-semibold text-gray-900">1</dd>
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
      
      <div className='mt-[40px]'>
          <Table />
      </div>
      
    </div>

    </>
  )
}

export default Usage