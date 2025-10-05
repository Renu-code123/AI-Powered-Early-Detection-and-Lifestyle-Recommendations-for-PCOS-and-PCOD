import React, { useState } from 'react';
import Header from '../common/Header';
import Results from "../common/Results";
import Tracker from '../common/Tracker';
import Resources from '../common/Resources';
import Assessment from '../common/Assessment';
import Home from '../common/Home';
import Onboarding from '../common/Onboarding';
import EarlyDetection from '../common/EarlyDetection';
import Doctors from '../common/Doctors';
import Community from '../common/Community';
import Contact from '../common/Contact';
import { calculateBMI, assessRisk } from '../../utils/healthUtils';
import MobileNav from '../common/MobileNav';
import Footer from '../common/Footer';

const PCOSGuardian = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userData, setUserData] = useState({
    age: '',
    weight: '',
    height: '',
    cycleRegularity: '',
    symptoms: [],
    lifestyleFactors: []
  });
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [cycleData, setCycleData] = useState({
    startDate: '',
    endDate: '',
    symptoms: [],
    mood: ''
  });

  const symptomOptions = [
    'Irregular periods',
    'Heavy bleeding',
    'Acne',
    'Weight gain',
    'Hair loss',
    'Excess hair growth',
    'Fatigue',
    'Mood swings',
    'Pelvic pain',
    'Headaches'
  ];

  const lifestyleOptions = [
    'Sedentary lifestyle',
    'High sugar diet',
    'Stressful job',
    'Irregular sleep',
    'Smoking',
    'Alcohol consumption',
    'Poor dietary habits'
  ];

  const generateRecommendations = (riskScore, data) => {
    const recommendations = [];

    if (data.symptoms?.includes('Irregular periods') || data.cycleRegularity === 'irregular') {
      recommendations.push({
        category: 'Cycle Health',
        text: 'Consider tracking your menstrual cycle more closely and consult with a healthcare provider about regulating your cycle.'
      });
    }

    const bmi = calculateBMI();
    if (bmi !== null && bmi >= 25) {
      recommendations.push({
        category: 'Weight Management',
        text: 'Aim for gradual weight loss through a balanced diet and regular exercise. Even 5-10% weight loss can significantly improve symptoms.'
      });
    }

    if (data.lifestyleFactors?.includes('Sedentary lifestyle')) {
      recommendations.push({
        category: 'Exercise',
        text: 'Incorporate at least 30 minutes of moderate exercise most days of the week. Walking, swimming, or yoga can be good starting points.'
      });
    }

    if (data.lifestyleFactors?.includes('High sugar diet') || data.lifestyleFactors?.includes('Poor dietary habits')) {
      recommendations.push({
        category: 'Nutrition',
        text: 'Focus on a balanced diet with plenty of fiber, lean proteins, and healthy fats. Limit processed foods and sugars.'
      });
    }

    if (data.symptoms?.includes('Mood swings') || data.lifestyleFactors?.includes('Stressful job')) {
      recommendations.push({
        category: 'Mental Health',
        text: 'Practice stress-reduction techniques like meditation, deep breathing, or mindfulness. Consider speaking with a mental health professional.'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        category: 'General Health',
        text: 'Maintain your current healthy lifestyle with regular check-ups and continue monitoring any changes in your symptoms.'
      });
    }

    return recommendations;
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'theme-light' : ''} bg-dark text-soft-white`}>
      {/* Header */}
      <Header 
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        onOpenLogin={() => { setAuthMode('login'); setAuthOpen(true); }}
        onOpenSignup={() => { setAuthMode('signup'); setAuthOpen(true); }}
      />

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content: add top padding to avoid overlap with sticky header */}
      <main className="mx-auto bg-dark pt-16">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab}
            onOpenLogin={() => { setAuthMode('login'); setAuthOpen(true); }}
            onOpenSignup={() => { setAuthMode('signup'); setAuthOpen(true); }}
          />
        )}
        {activeTab === 'onboarding' && <Onboarding setActiveTab={setActiveTab} setUserData={setUserData} />}
        {activeTab === 'assessment' && (
          <Assessment
            userData={userData}
            setUserData={setUserData}
            symptomOptions={symptomOptions}
            lifestyleOptions={lifestyleOptions}
            calculateBMI={calculateBMI}
            assessRisk={assessRisk}
          />
        )}
        {activeTab === 'early-detection' && <EarlyDetection userData={userData} setActiveTab={setActiveTab} />}
        {activeTab === 'results' && <Results riskAssessment={riskAssessment} setActiveTab={setActiveTab} />}
        {activeTab === 'tracker' && (
          <Tracker
            cycleData={cycleData}
            setCycleData={setCycleData}
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            symptomOptions={symptomOptions}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'resources' && <Resources setActiveTab={setActiveTab} />}
        {activeTab === 'doctors' && <Doctors setActiveTab={setActiveTab} />}
        {activeTab === 'community' && <Community setActiveTab={setActiveTab} />}
        {activeTab === 'contact' && <Contact setActiveTab={setActiveTab} />}
      </main>

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="neon-card w-full max-w-md bg-dark">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-neon-blue">{authMode === 'login' ? 'Log in' : 'Sign up'}</h3>
              <button onClick={() => setAuthOpen(false)} className="neon-button">✕</button>
            </div>
            <div className="flex gap-2 mb-4">
              <button onClick={() => setAuthMode('login')} className={`neon-button ${authMode==='login' ? 'neon-button-blue' : ''}`}>Log in</button>
              <button onClick={() => setAuthMode('signup')} className={`neon-button ${authMode==='signup' ? 'neon-button-pink' : ''}`}>Sign up</button>
            </div>
            <form className="space-y-3">
              {authMode === 'signup' && (
                <input type="text" placeholder="Full name" className="w-full neon-input" />
              )}
              <input type="email" placeholder="Email" className="w-full neon-input" />
              <input type="password" placeholder="Password" className="w-full neon-input" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setAuthOpen(false)} className="neon-button">Cancel</button>
                <button type="submit" className={`neon-button ${authMode==='signup' ? 'neon-button-pink' : 'neon-button-blue'}`}>{authMode==='signup' ? 'Create account' : 'Log in'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default PCOSGuardian;