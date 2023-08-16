import React, { useState } from 'react';

const LiveChat = () => {
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadChatWidget = () => {
    setIsLoading(true);

    // Load the HubSpot chat widget
    const script = document.createElement("script");
    script.src = "//js-na1.hs-scripts.com/42338625.js"; // Replace with the actual HubSpot chat widget script URL
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      setIsLoading(false);
      setShowChat(true);
    };
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Live Chat</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Connect with our support team in real-time.
        </p>
        <button
          onClick={loadChatWidget}
          className={`mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#334977] hover:bg-[#293c59]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Chat'}
        </button>
        {showChat && <div id="hubspot-chat-container"></div>}
      </div>
    </div>
  );
};

export default LiveChat;
