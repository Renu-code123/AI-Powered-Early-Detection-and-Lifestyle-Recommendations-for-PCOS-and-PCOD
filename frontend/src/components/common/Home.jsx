import React from 'react';

const Home = ({ setActiveTab, onOpenLogin, onOpenSignup }) => {
  const features = [
    {
      title: "Early Detection",
      description: "AI-powered risk assessment to identify potential PCOS/PCOD before symptoms worsen.",
      icon: "🔍",
      color: "neon-purple"
    },
    {
      title: "Period Tracking",
      description: "Monitor your cycle, symptoms, and identify irregular patterns with smart insights.",
      icon: "📅",
      color: "neon-pink"
    },
    {
      title: "Lifestyle Recommendations",
      description: "Get personalized diet, exercise, and wellness plans tailored to your unique profile.",
      icon: "🥗",
      color: "aqua-blue"
    },
    {
      title: "Mental Health Support",
      description: "Access tools for stress management, mood tracking, and guided meditation sessions.",
      icon: "🧠",
      color: "neon-purple"
    },
    {
      title: "Doctor Finder",
      description: "Locate specialists near you for consultations and professional medical advice.",
      icon: "👩‍⚕️",
      color: "neon-pink"
    },
    {
      title: "Community Support",
      description: "Connect with others, share experiences, and access educational resources.",
      icon: "👭",
      color: "aqua-blue"
    }
  ];

  return (
    <div className="w-[92%] min-h-[80vh] mx-auto flex flex-col items-center py-10">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden rounded-2xl neon-card bg-soft-gradient mb-12 hero-accent">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-neon-purple/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-neon-blue/20 blur-3xl" />

        <div className="relative z-10 px-6 md:px-10 py-10 md:py-14 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Brand + Copy */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center neon-border-blue">
                {/* Shield-heart mark */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-neon-blue">
                  <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 10c1.2-1.5 4-1.2 4 1.2 0 2.1-3.1 3.9-4 4.3-.9-.4-4-2.2-4-4.3 0-2.4 2.8-2.7 4-1.2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold brand-gradient-text tracking-tight">PCOS Guardian</h1>
            </div>
            <p className="text-soft-white/90 text-lg md:text-xl max-w-2xl md:max-w-3xl mx-auto md:mx-0">
              AI-powered early detection, period tracking, and personalized lifestyle guidance —
              designed to help you feel confident and in control.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => setActiveTab('assessment')}
                className="neon-button neon-button-blue text-base md:text-lg px-8 py-3"
              >
                Assess My Risk
              </button>
              <button
                onClick={() => setActiveTab('tracker')}
                className="neon-button neon-button-pink text-base md:text-lg px-8 py-3"
              >
                Track Your Cycle
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className="neon-button text-base md:text-lg px-8 py-3"
              >
                Find Doctors
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs md:text-sm text-soft-white/70">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-pink" /> Trusted Guidance
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-blue" /> Privacy First
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-aqua-blue" /> Community Support
              </span>
            </div>
          </div>

          {/* Visual Accent */}
          <div className="flex-1 max-w-md md:max-w-none">
            <div className="relative w-full h-48 md:h-64 rounded-xl bg-dark/40 neon-border-blue flex items-center justify-center">
              <div className="absolute inset-0 bg-soft-gradient opacity-60 rounded-xl" />
              <div className="relative z-10 text-center">
                <p className="text-soft-white/80">Personalized insights at a glance</p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-blue/15 neon-border-blue">
                  <span className="text-neon-blue font-semibold">Real‑time</span>
                  <span className="text-soft-white/70">cycle predictions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-grid w-full">
        {features.map((feature, idx) => (
          <div key={idx} className="neon-card hover:neon-border">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className={`font-semibold mb-3 text-xl text-${feature.color}`}>{feature.title}</h3>
            <p className="text-soft-white">{feature.description}</p>
            <button 
              onClick={() => setActiveTab(idx === 0 ? 'assessment' : idx === 1 ? 'tracker' : idx === 4 ? 'resources' : idx === 5 ? 'community' : 'home')}
              className="mt-4 text-sm text-aqua-blue hover:underline"
            >
              Learn more →
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-16 neon-card w-full max-w-4xl">
        <h2 className="text-2xl text-neon-pink mb-4">Why Early Detection Matters</h2>
        <p className="text-soft-white mb-6">
          Identifying PCOS/PCOD early can significantly improve treatment outcomes and quality of life. 
          Our AI-powered system analyzes your symptoms and health data to provide risk assessment before symptoms worsen.
        </p>
        <button
          onClick={() => setActiveTab('assessment')}
          className="neon-button neon-button-pink"
        >
          Assess My Risk
        </button>
      </div>
    </div>
  );
};

export default Home;