import React from 'react';

const Resources = ({ setActiveTab }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Resources & Community</h2>

      <div className="flex flex-col gap-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-1">Educational Articles</h3>
          <p className="text-gray-500 text-sm mb-2">Learn more about PCOS/PCOD, treatment options, and lifestyle management.</p>
          <button className="text-blue-500 text-sm font-medium border-none bg-none cursor-pointer">Browse Articles</button>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-1">Find a Specialist</h3>
          <p className="text-gray-500 text-sm mb-2">Connect with healthcare providers who specialize in PCOS/PCOD treatment.</p>
          <button className="text-blue-500 text-sm font-medium border-none bg-none cursor-pointer">Search Doctors</button>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-1">Community Forum</h3>
          <p className="text-gray-500 text-sm mb-2">Share experiences, ask questions, and get support from others on the same journey.</p>
          <button className="text-blue-500 text-sm font-medium border-none bg-none cursor-pointer">Join Conversation</button>
        </div>

        <button onClick={() => setActiveTab('home')} className="w-full bg-gray-200 text-gray-700 py-3 rounded font-medium mt-4">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Resources;