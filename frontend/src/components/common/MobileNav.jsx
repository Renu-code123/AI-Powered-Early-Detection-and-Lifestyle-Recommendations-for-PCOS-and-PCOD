import React from 'react';

const MobileNav = ({ activeTab, setActiveTab }) => {
  const tabs = ['home', 'assessment', 'tracker', 'resources'];

  return (
    <div className="flex justify-around bg-gray-100 p-2 md:hidden">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`p-2 text-xs font-medium ${
            activeTab === tab ? 'text-blue-500 font-bold' : 'text-gray-500'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default MobileNav;