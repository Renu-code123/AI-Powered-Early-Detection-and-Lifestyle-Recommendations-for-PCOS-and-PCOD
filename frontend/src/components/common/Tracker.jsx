import React from 'react';

const Tracker = ({ cycleData, setCycleData, symptoms, setSymptoms, symptomOptions, setActiveTab }) => {
  const handleCycleSubmit = (e) => {
    e.preventDefault();
    if (cycleData.symptoms.length > 0) {
      setSymptoms(prev => [...prev, ...cycleData.symptoms]);
    }
    alert('Cycle data recorded successfully!');
    setCycleData({ startDate: '', endDate: '', symptoms: [], mood: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Symptom & Cycle Tracker</h2>

      <form onSubmit={handleCycleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cycle Start Date</label>
            <input type="date" value={cycleData.startDate} onChange={(e) => setCycleData({...cycleData, startDate: e.target.value})} className="w-full p-2 border border-gray-300 rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cycle End Date</label>
            <input type="date" value={cycleData.endDate} onChange={(e) => setCycleData({...cycleData, endDate: e.target.value})} className="w-full p-2 border border-gray-300 rounded text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Symptoms During This Cycle</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {symptomOptions.map(symptom => (
              <label key={symptom} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={cycleData.symptoms.includes(symptom)}
                  onChange={() => {
                    const updatedSymptoms = cycleData.symptoms.includes(symptom)
                      ? cycleData.symptoms.filter(s => s !== symptom)
                      : [...cycleData.symptoms, symptom];
                    setCycleData({ ...cycleData, symptoms: updatedSymptoms });
                  }}
                  className="border border-gray-300 rounded"
                />
                <span className="text-sm">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Overall Mood</label>
          <select value={cycleData.mood} onChange={(e) => setCycleData({...cycleData, mood: e.target.value})} className="w-full p-2 border border-gray-300 rounded text-sm">
            <option value="">Select your mood</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="neutral">Neutral</option>
            <option value="poor">Poor</option>
            <option value="very-poor">Very Poor</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded font-medium">Save Cycle Data</button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Your Recent Symptoms</h3>
        {symptoms.length > 0 ? (
          <div className="bg-white shadow rounded p-4 text-sm">
            Symptom history will appear here as you track.
          </div>
        ) : (
          <div className="bg-white shadow rounded p-4 text-center text-gray-500 text-sm">
            No symptoms tracked yet. Start tracking to see patterns over time.
          </div>
        )}
      </div>

      <button onClick={() => setActiveTab('home')} className="w-full mt-6 bg-gray-200 text-gray-700 py-3 rounded font-medium">
        Back to Home
      </button>
    </div>
  );
};

export default Tracker;