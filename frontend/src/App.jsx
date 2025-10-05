import React from 'react';
import PCOSGuardian from './components/main/PcosGuardian';
import './index.css'; // Tailwind styles
import './App.css'; // Custom styles for neon theme

const App = () => {
  return (
    <div className="min-h-screen bg-dark text-soft-white">
      <PCOSGuardian />
    </div>
  );
}

export default App;