import React from 'react';
import toast, { Toaster } from 'react-hot-toast';


const TicketForm = () => {
    const notifyerror = (message) => toast.error(message);
    const notifysucces = (message) => toast.success(message);

  return (
        <div className="pt-6">
          <div className="flow-root px-6 pb-8 rounded-lg bg-slate-50 hover:bg-slate-100 ring-1 ring-gray-200 h-full">
          <div className="flex flex-col justify-between h-full">
              <div>
                <div>
                    <span className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg ring-1 ring-blue-500 -mt-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-6 h-6 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </span>
                </div>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-gray-900">Create a Ticket</h3>
                <p className="mt-3 text-base text-gray-500 pt-3">Submit a support ticket for assistance.</p>
              </div>
              <button type="button" 
                      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#334977]"
                      onClick={()=>{
            notifysucces("comming soon")
        }}
          >
              <span className="flex items-center justify-center mx-auto space-x-2 select-none">Open a Ticket</span></button>
          </div>
        </div>
    </div>
  );
};

export default TicketForm;
