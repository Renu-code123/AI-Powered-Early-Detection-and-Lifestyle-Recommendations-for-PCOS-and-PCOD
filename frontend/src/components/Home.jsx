import React, { useState } from 'react';
import Chatbot from './common/Chatbot';
import MLModel from './common/MLModel';

const Home = () => {
  const [userData, setUserData] = useState({
    age: 28,
    bmi: 26.4,
    familyHistory: true,
    diagnosedWithPCOS: false,
    symptoms: ['Irregular periods', 'Weight gain', 'Acne'],
    lifestyleFactors: {
      exercise: false,
      stress: 8,
      sleep: 5
    }
  });

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/30 to-neon-pink/30"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-text text-neon-blue">
            PCOS Guardian
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-soft-white max-w-3xl mx-auto">
            AI-powered early detection and personalized care for PCOS/PCOD
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="neon-button neon-button-pink">
              Take Assessment
            </button>
            <button className="neon-button neon-button-blue">
              Track Symptoms
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center neon-text text-neon-purple">
            AI-Powered Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="neon-card hover:shadow-neon-purple/50 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-neon-purple/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neon-purple">Early Detection</h3>
              <p className="text-soft-white">
                Our advanced ML model analyzes your symptoms and health data to provide early risk assessment for PCOS/PCOD.
              </p>
            </div>
            
            <div className="neon-card hover:shadow-neon-blue/50 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neon-blue">Period Tracking</h3>
              <p className="text-soft-white">
                Smart period tracking with AI-powered predictions for your next cycle and fertile window.
              </p>
            </div>
            
            <div className="neon-card hover:shadow-neon-pink/50 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-neon-pink/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neon-pink">Personalized Care</h3>
              <p className="text-soft-white">
                Get personalized recommendations for lifestyle changes, diet, and exercise based on your specific symptoms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ML Model Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center neon-text text-neon-blue">
            Experience Our AI Technology
          </h2>
          
          <MLModel userData={userData} />
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center neon-text text-neon-purple">
            Join Our Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="neon-card">
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">Connect with Others</h3>
              <p className="text-soft-white mb-6">
                Join thousands of women in our supportive community. Share experiences, ask questions, and get advice from others on similar journeys.
              </p>
              <button className="neon-button neon-button-pink">
                Join Community
              </button>
            </div>
            
            <div className="neon-card">
              <h3 className="text-xl font-semibold mb-4 text-neon-blue">Expert Resources</h3>
              <p className="text-soft-white mb-6">
                Access our curated library of articles, videos, and resources from leading PCOS/PCOD specialists and healthcare providers.
              </p>
              <button className="neon-button neon-button-blue">
                Explore Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center neon-text text-neon-purple">
            Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="neon-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-neon-purple mr-4"></div>
                <div>
                  <h4 className="font-semibold text-neon-purple">Sarah M.</h4>
                  <p className="text-sm text-soft-white">Diagnosed 2 years ago</p>
                </div>
              </div>
              <p className="text-soft-white">
                "This app helped me identify my PCOS symptoms early. The personalized recommendations have made a huge difference in managing my condition."
              </p>
            </div>
            
            <div className="neon-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-neon-blue mr-4"></div>
                <div>
                  <h4 className="font-semibold text-neon-blue">Jessica T.</h4>
                  <p className="text-sm text-soft-white">Using app for 6 months</p>
                </div>
              </div>
              <p className="text-soft-white">
                "The period tracking and prediction features are incredibly accurate. I finally feel in control of my cycle after years of unpredictability."
              </p>
            </div>
            
            <div className="neon-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-neon-pink mr-4"></div>
                <div>
                  <h4 className="font-semibold text-neon-pink">Priya K.</h4>
                  <p className="text-sm text-soft-white">Community member</p>
                </div>
              </div>
              <p className="text-soft-white">
                "The community support has been invaluable. Connecting with others who understand what I'm going through has made me feel less alone."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;