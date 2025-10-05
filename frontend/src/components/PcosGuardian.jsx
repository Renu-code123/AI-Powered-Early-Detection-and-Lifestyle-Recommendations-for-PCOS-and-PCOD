import React, { useState, useEffect } from 'react';
import Header from './common/Header';
import Onboarding from './common/Onboarding';
import EarlyDetection from './common/EarlyDetection';
import Tracker from './common/Tracker';
import MLModel from './common/MLModel';
import SymptomAnalyzer from './common/SymptomAnalyzer';
import PeriodPredictor from './common/PeriodPredictor';
import Chatbot from './common/Chatbot';
import Home from './Home';

const PcosGuardian = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userData, setUserData] = useState(null);
  const [cycleHistory, setCycleHistory] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  
  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedCycles = localStorage.getItem('cycleHistory');
    const storedSymptoms = localStorage.getItem('symptoms');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    if (storedCycles) {
      setCycleHistory(JSON.parse(storedCycles));
    }
    
    if (storedSymptoms) {
      setSymptoms(JSON.parse(storedSymptoms));
    } else {
      // Set some mock symptoms for demo purposes
      const mockSymptoms = [
        { name: 'Irregular periods', severity: 8, date: '2023-04-15' },
        { name: 'Acne', severity: 6, date: '2023-04-10' },
        { name: 'Weight gain', severity: 7, date: '2023-04-05' },
        { name: 'Mood swings', severity: 5, date: '2023-04-12' },
        { name: 'Fatigue', severity: 6, date: '2023-04-08' }
      ];
      setSymptoms(mockSymptoms);
      localStorage.setItem('symptoms', JSON.stringify(mockSymptoms));
    }
    
    // Set mock user data if none exists (for demo purposes)
    if (!storedUserData) {
      const mockUserData = {
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
      };
      setUserData(mockUserData);
      localStorage.setItem('userData', JSON.stringify(mockUserData));
    }
    
    // Set mock cycle history if none exists (for demo purposes)
    if (!storedCycles) {
      const today = new Date();
      const mockCycles = [
        {
          id: '1',
          startDate: new Date(today.getFullYear(), today.getMonth() - 5, 5).toISOString().split('T')[0],
          endDate: new Date(today.getFullYear(), today.getMonth() - 5, 10).toISOString().split('T')[0],
          symptoms: ['Cramps', 'Bloating'],
          mood: 'Irritable'
        },
        {
          id: '2',
          startDate: new Date(today.getFullYear(), today.getMonth() - 4, 3).toISOString().split('T')[0],
          endDate: new Date(today.getFullYear(), today.getMonth() - 4, 8).toISOString().split('T')[0],
          symptoms: ['Cramps', 'Headache'],
          mood: 'Tired'
        },
        {
          id: '3',
          startDate: new Date(today.getFullYear(), today.getMonth() - 3, 6).toISOString().split('T')[0],
          endDate: new Date(today.getFullYear(), today.getMonth() - 3, 11).toISOString().split('T')[0],
          symptoms: ['Bloating', 'Breast tenderness'],
          mood: 'Emotional'
        },
        {
          id: '4',
          startDate: new Date(today.getFullYear(), today.getMonth() - 2, 4).toISOString().split('T')[0],
          endDate: new Date(today.getFullYear(), today.getMonth() - 2, 9).toISOString().split('T')[0],
          symptoms: ['Cramps', 'Acne'],
          mood: 'Irritable'
        },
        {
          id: '5',
          startDate: new Date(today.getFullYear(), today.getMonth() - 1, 7).toISOString().split('T')[0],
          endDate: new Date(today.getFullYear(), today.getMonth() - 1, 12).toISOString().split('T')[0],
          symptoms: ['Headache', 'Bloating'],
          mood: 'Tired'
        }
      ];
      setCycleHistory(mockCycles);
      localStorage.setItem('cycleHistory', JSON.stringify(mockCycles));
    }
  }, []);
  
  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle user data updates
  const handleUserDataUpdate = (newData) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };
  
  // Handle cycle data updates
  const handleCycleUpdate = (newCycles) => {
    setCycleHistory(newCycles);
    localStorage.setItem('cycleHistory', JSON.stringify(newCycles));
  };
  
  // Handle symptom updates
  const handleSymptomUpdate = (newSymptoms) => {
    setSymptoms(newSymptoms);
    localStorage.setItem('symptoms', JSON.stringify(newSymptoms));
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <Home />
        )}
        
        {activeTab === 'onboarding' && (
          <Onboarding 
            userData={userData} 
            onUserDataUpdate={handleUserDataUpdate} 
          />
        )}
        
        {activeTab === 'early-detection' && (
          <div className="space-y-12">
            <EarlyDetection 
              userData={userData} 
              onUserDataUpdate={handleUserDataUpdate} 
            />
            <MLModel userData={userData} />
          </div>
        )}
        
        {activeTab === 'tracker' && (
          <div className="space-y-12">
            <Tracker 
              cycleHistory={cycleHistory} 
              onCycleUpdate={handleCycleUpdate} 
              symptoms={symptoms}
              onSymptomUpdate={handleSymptomUpdate}
            />
            <PeriodPredictor cycleHistory={cycleHistory} />
          </div>
        )}
        
        {activeTab === 'symptom-analysis' && (
          <SymptomAnalyzer userSymptoms={symptoms} />
        )}
        
        {activeTab === 'resources' && (
          <div className="neon-card">
            <h2 className="text-2xl font-bold text-neon-purple neon-text mb-6">Resources & Education</h2>
            <p className="text-soft-white mb-8">Coming soon! This section will provide educational resources about PCOS/PCOD.</p>
          </div>
        )}
        
        {activeTab === 'community' && (
          <div className="neon-card">
            <h2 className="text-2xl font-bold text-neon-pink neon-text mb-6">Community Forum</h2>
            <p className="text-soft-white mb-8">Coming soon! Connect with others in our supportive community.</p>
          </div>
        )}
      </main>
      
      <Chatbot />
    </div>
  );
};

export default PcosGuardian;