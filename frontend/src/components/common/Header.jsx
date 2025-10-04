import React from 'react';

const Header = ({ setActiveTab }) => {
  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'assessment', label: 'Assessment' },
    { key: 'tracker', label: 'Tracker' },
    { key: 'resources', label: 'Resources' },
  ];

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">PCOS Guardian</h1>

        <div className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className="text-white font-medium hover:underline cursor-pointer hover:text-yellow-300"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="border border-blue-500 hover:border-blue-700 hover:bg-blue-700 hover:text-white px-4 py-1 rounded text-sm font-medium cursor-pointer">Sign In</button>
      </div>
    </header>
  );
};

export default Header;