import React from 'react';
import PCOSGuardian from './components/main/PcosGuardian';
import './index.css'; // Tailwind styles

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <PCOSGuardian />
    </div>
  );
}

export default App;