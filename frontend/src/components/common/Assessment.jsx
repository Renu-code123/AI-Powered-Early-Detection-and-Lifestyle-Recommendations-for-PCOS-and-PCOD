import React from 'react';

const Assessment = ({ userData, setUserData, symptomOptions, lifestyleOptions, calculateBMI, assessRisk }) => {
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    setUserData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSymptomChange = (symptom) => {
    setUserData(prev => {
      const exists = prev.symptoms.includes(symptom);
      const updatedSymptoms = exists ? prev.symptoms.filter(s => s !== symptom) : [...prev.symptoms, symptom];
      return { ...prev, symptoms: updatedSymptoms };
    });
  };

  const handleLifestyleChange = (factor) => {
    setUserData(prev => {
      const exists = prev.lifestyleFactors.includes(factor);
      const updatedFactors = exists ? prev.lifestyleFactors.filter(f => f !== factor) : [...prev.lifestyleFactors, factor];
      return { ...prev, lifestyleFactors: updatedFactors };
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">PCOS Risk Assessment</h2>
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" name="age" value={userData.age} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Enter your age" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <input type="number" name="weight" value={userData.weight} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Weight in kg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height (cm)</label>
            <input type="number" name="height" value={userData.height} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Height in cm" />
          </div>
        </div>

        {userData.weight && userData.height && (
          <div className="bg-gray-100 p-2 rounded text-sm">
            Your BMI: <span className="font-medium">{calculateBMI()}</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Menstrual Cycle Regularity</label>
          <select name="cycleRegularity" value={userData.cycleRegularity} onChange={(e) => setUserData(prev => ({ ...prev, cycleRegularity: e.target.value }))} className="w-full p-2 border border-gray-300 rounded text-sm">
            <option value="">Select an option</option>
            <option value="regular">Regular (21-35 days)</option>
            <option value="irregular">Irregular</option>
            <option value="absent">Absent (no periods)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Symptoms You Experience</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {symptomOptions.map(symptom => (
              <label key={symptom} className="flex items-center gap-2">
                <input type="checkbox" checked={userData.symptoms.includes(symptom)} onChange={() => handleSymptomChange(symptom)} className="border border-gray-300 rounded" />
                <span className="text-sm">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Lifestyle Factors</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {lifestyleOptions.map(factor => (
              <label key={factor} className="flex items-center gap-2">
                <input type="checkbox" checked={userData.lifestyleFactors.includes(factor)} onChange={() => handleLifestyleChange(factor)} className="border border-gray-300 rounded" />
                <span className="text-sm">{factor}</span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={assessRisk} className="w-full bg-blue-500 text-white py-3 rounded font-medium">
          Assess My Risk
        </button>
      </div>
    </div>
  );
};

export default Assessment;