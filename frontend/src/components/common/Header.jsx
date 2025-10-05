import React from 'react';

const Header = ({ setActiveTab, theme = 'dark', onToggleTheme, onOpenLogin, onOpenSignup }) => {
  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'early-detection', label: 'Early Detection' },
    { key: 'tracker', label: 'Period Tracker' },
    { key: 'resources', label: 'Resources' },
    { key: 'community', label: 'Community' },
  ];

  return (
    <header className="bg-dark backdrop-blur-sm sticky top-0 z-50 border-b header-divider">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-9 h-9 rounded-xl bg-neon-blue/20 flex items-center justify-center neon-border-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-neon-blue">
              <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 10c1.2-1.5 4-1.2 4 1.2 0 2.1-3.1 3.9-4 4.3-.9-.4-4-2.2-4-4.3 0-2.4 2.8-2.7 4-1.2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="brand-gradient-text text-2xl md:text-3xl font-extrabold tracking-tight">PCOS Guardian</h1>
            <p className="text-xs text-soft-white/80">Empower your health journey with AI-driven care</p>
          </div>
        </div>

        <div className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className="text-soft-white font-medium hover:text-neon-purple transition-colors duration-300 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
        {/* subtle divider and spacing between nav and actions */}
        <div className="hidden md:block w-px h-6 bg-soft-white/20 mx-2" />
        <div className="flex items-center gap-3 md:pl-3 md:border-l md:border-white/10">
          {/* Theme Toggle */}
          <button
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={onToggleTheme}
            className="neon-button neon-button-blue w-9 h-9 rounded-full p-0 flex items-center justify-center"
          >
            {theme === 'light' ? (
              <span aria-hidden="true">🌞</span>
            ) : (
              <span aria-hidden="true">🌙</span>
            )}
          </button>

          {/* Auth */}
          <button onClick={onOpenLogin} className="neon-button">Log in</button>
          <button onClick={onOpenSignup} className="neon-button neon-button-pink">Sign up</button>

          <button 
            onClick={() => setActiveTab('onboarding')}
            className="neon-button neon-button-blue hidden sm:inline"
          >
            My Profile
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;