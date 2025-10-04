import React, { useState } from 'react';
import Header from '../common/Header';
import Results from "../common/Results";
import Tracker from '../common/Tracker';
import Resources from '../common/Resources';
import Assessment from '../common/Assessment';
import Home from '../common/Home';
import { calculateBMI, assessRisk } from '../../utils/healthUtils';
import MobileNav from '../common/MobileNav';
import Footer from '../common/Footer';

const PCOSGuardian = () => {
  const [activeTab, setActiveTab] = useState('home');
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <Header setActiveTab={setActiveTab} />

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="mx-auto bg-gray-100">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PCOSGuardian;