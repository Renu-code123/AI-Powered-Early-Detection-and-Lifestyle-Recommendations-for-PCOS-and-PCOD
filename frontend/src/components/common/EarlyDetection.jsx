import React, { useState, useEffect } from 'react';

const EarlyDetection = ({ userData, setActiveTab }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [riskFactors, setRiskFactors] = useState([]);

  // Mock AI prediction function (in real app, this would call the backend API)
  const predictRisk = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Calculate risk based on user data
      let riskScore = 0;
      const factors = [];
      
      // Age factor (higher risk between 15-35)
      if (userData.age >= 15 && userData.age <= 35) {
        riskScore += 10;
        factors.push("Age between 15-35 years");
      }
      
      // BMI factor (higher risk if BMI > 25)
      const heightInMeters = userData.height / 100;
      const bmi = userData.weight / (heightInMeters * heightInMeters);
      if (bmi > 25) {
        riskScore += 15;
        factors.push("BMI above 25");
      }
      
      // Symptom factors
      const highRiskSymptoms = [
        'Irregular periods',
        'Heavy bleeding',
        'Acne',
        'Weight gain',
        'Hair loss',
        'Excess hair growth'
      ];
      
      highRiskSymptoms.forEach(symptom => {
        if (userData.symptoms.includes(symptom)) {
          riskScore += 10;
          factors.push(symptom);
        }
      });
      
      // Lifestyle factors
      const highRiskLifestyle = [
        'Sedentary lifestyle',
        'High sugar diet',
        'Stressful job/life',
        'Irregular sleep'
      ];
      
      highRiskLifestyle.forEach(factor => {
        if (userData.lifestyleFactors.includes(factor)) {
          riskScore += 5;
          factors.push(factor);
        }
      });
      
      // Family history
      if (userData.familyHistory) {
        riskScore += 20;
        factors.push("Family history of PCOS/PCOD");
      }
      
      // Normalize score to 0-100
      riskScore = Math.min(100, riskScore);
      
      // Set risk level
      let riskLevel;
      if (riskScore < 30) {
        riskLevel = "Low";
      } else if (riskScore < 60) {
        riskLevel = "Moderate";
      } else {
        riskLevel = "High";
      }
      
      setResult({
        score: riskScore,
        level: riskLevel,
        recommendation: getRiskRecommendation(riskLevel)
      });
      
      setRiskFactors(factors);
      setLoading(false);
    }, 2000);
  };
  
  const getRiskRecommendation = (level) => {
    switch(level) {
      case "Low":
        return "Your risk factors for PCOS/PCOD appear to be low. Continue maintaining a healthy lifestyle with regular check-ups.";
      case "Moderate":
        return "You have some risk factors for PCOS/PCOD. Consider consulting with a healthcare provider for further evaluation.";
      case "High":
        return "You have several risk factors associated with PCOS/PCOD. We strongly recommend consulting with a healthcare provider for proper diagnosis and treatment.";
      default:
        return "Continue to monitor your symptoms and consult with a healthcare provider if you notice any changes.";
    }
  };
  
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      predictRisk();
    }
  }, [userData]);
  
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="neon-card">
        <h2 className="text-2xl font-bold text-neon-purple neon-text mb-6">AI-Powered Early Detection</h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-t-neon-purple border-r-neon-blue border-b-neon-pink border-l-neon-aqua rounded-full animate-spin"></div>
            <p className="mt-4 text-soft-white">Analyzing your health data...</p>
          </div>
        ) : result ? (
          <div className="space-y-8">
            <div className="flex flex-col items-center">
              <div className={`text-6xl font-bold mb-2 ${
                result.level === "Low" ? "text-neon-green" : 
                result.level === "Moderate" ? "text-neon-yellow" : 
                "text-neon-pink"
              }`}>
                {result.score}%
              </div>
              <div className={`text-xl font-semibold ${
                result.level === "Low" ? "text-neon-green" : 
                result.level === "Moderate" ? "text-neon-yellow" : 
                "text-neon-pink"
              }`}>
                {result.level} Risk
              </div>
            </div>
            
            <div className="neon-card">
              <h3 className="text-xl text-neon-blue mb-4">Risk Assessment</h3>
              <p className="text-soft-white mb-4">{result.recommendation}</p>
              
              {riskFactors.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg text-neon-pink mb-2">Identified Risk Factors:</h4>
                  <ul className="list-disc pl-5 text-soft-white">
                    {riskFactors.map((factor, index) => (
                      <li key={index} className="mb-1">{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="neon-card">
              <h3 className="text-xl text-neon-purple mb-4">Next Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full neon-card flex items-center justify-center text-neon-purple text-xl font-bold">1</div>
                  <div className="ml-4">
                    <h4 className="text-lg text-neon-blue">Track Your Symptoms</h4>
                    <p className="text-soft-white">Use our period and symptom tracker to monitor changes over time.</p>
                    <button 
                      onClick={() => setActiveTab('tracker')}
                      className="mt-2 neon-button neon-button-blue text-sm"
                    >
                      Go to Tracker
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full neon-card flex items-center justify-center text-neon-purple text-xl font-bold">2</div>
                  <div className="ml-4">
                    <h4 className="text-lg text-neon-blue">Get Personalized Recommendations</h4>
                    <p className="text-soft-white">View lifestyle and health recommendations based on your profile.</p>
                    <button 
                      onClick={() => setActiveTab('resources')}
                      className="mt-2 neon-button neon-button-blue text-sm"
                    >
                      View Recommendations
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full neon-card flex items-center justify-center text-neon-purple text-xl font-bold">3</div>
                  <div className="ml-4">
                    <h4 className="text-lg text-neon-blue">Consult a Specialist</h4>
                    <p className="text-soft-white">Find healthcare providers near you who specialize in PCOS/PCOD.</p>
                    <button 
                      className="mt-2 neon-button neon-button-pink text-sm"
                      onClick={() => setActiveTab('doctors')}
                    >
                      Find Doctors
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={() => setActiveTab('home')}
                className="neon-button"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-soft-white mb-4">Please complete your profile to get an AI-powered risk assessment.</p>
            <button 
              onClick={() => setActiveTab('onboarding')}
              className="neon-button neon-button-pink"
            >
              Create Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarlyDetection;