import React from 'react';

const Results = ({ riskAssessment, setActiveTab }) => {
  if (!riskAssessment) return null;

  const levelColor = {
    High: 'bg-red-500 text-white',
    Moderate: 'bg-yellow-500 text-gray-900',
    Low: 'bg-gray-200 text-gray-900'
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Your Assessment Results</h2>

      <div className="flex flex-col gap-6">
        <div className={`p-4 rounded text-center ${levelColor[riskAssessment.level]}`}>
          <h3 className="text-lg font-semibold">Your PCOS Risk: {riskAssessment.level}</h3>
          <p className="text-sm mt-1">Score: {riskAssessment.score}/100</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
          <div className="flex flex-col gap-4">
            {riskAssessment.recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white shadow rounded p-4">
                <h4 className="font-medium text-blue-500">{rec.category}</h4>
                <p className="text-sm mt-1">{rec.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button onClick={() => setActiveTab('tracker')} className="w-full md:w-auto bg-blue-500 text-white py-3 rounded font-medium">
            Start Tracking Symptoms
          </button>
          <button onClick={() => setActiveTab('home')} className="w-full md:w-auto bg-gray-200 text-gray-700 py-3 rounded font-medium">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;