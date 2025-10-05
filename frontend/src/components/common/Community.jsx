import React from 'react';

const Community = ({ setActiveTab }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="neon-card">
        <h2 className="text-2xl font-bold text-neon-purple neon-text mb-4">Community</h2>
        <p className="text-soft-white mb-6">
          Connect with others, share experiences, and find support on your journey. Join discussions, ask questions, and learn from a compassionate community.
        </p>
        <div className="flex gap-3">
          <button className="neon-button neon-button-pink" onClick={() => setActiveTab('resources')}>Explore Resources</button>
          <button className="neon-button" onClick={() => setActiveTab('home')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Community;