import React from 'react';
import toast, { Toaster } from 'react-hot-toast';


const TicketForm = () => {
    const notifyerror = (message) => toast.error(message);
    const notifysucces = (message) => toast.success(message);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Create a Ticket</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Submit a support ticket for assistance.
        </p>
        <button
        onClick={()=>{
            notifysucces("comming soon")
        }}
          className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#334977]"
        >
          Open Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketForm;
