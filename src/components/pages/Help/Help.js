// Help.js
import React from 'react';
import LiveChat from './LiveChat'; // Create this component
import TicketForm from './TicketForm'; // Create this component

const Help = () => {
  return (
    <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-center font-extrabold text-gray-900">
          Welcome to our Help & Support
        </h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Our platform will provide you with the best help and support.
        </p>
      </div>
      <div className="mt-10 max-w-md mx-auto space-y-6">
        <LiveChat />
        <TicketForm />
      </div>
    </div>
  );
};

export default Help;
