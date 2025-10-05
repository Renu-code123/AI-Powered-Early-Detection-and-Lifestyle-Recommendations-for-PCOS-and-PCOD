import React, { useState, useEffect } from 'react';

const Tracker = ({ cycleData, setCycleData, symptoms, setSymptoms, symptomOptions, setActiveTab }) => {
  const [cycles, setCycles] = useState([]);
  const [view, setView] = useState('form'); // 'form', 'calendar', 'history'
  const [prediction, setPrediction] = useState(null);
  const [averageCycleLength, setAverageCycleLength] = useState(null);

  // Load saved cycles from localStorage on component mount
  useEffect(() => {
    const savedCycles = localStorage.getItem('cycles');
    if (savedCycles) {
      setCycles(JSON.parse(savedCycles));
    }
  }, []);

  // Save cycles to localStorage whenever they change
  useEffect(() => {
    if (cycles.length > 0) {
      localStorage.setItem('cycles', JSON.stringify(cycles));
      calculateAverageCycle();
      predictNextPeriod();
    }
  }, [cycles]);

  const handleCycleSubmit = (e) => {
    e.preventDefault();
    
    if (!cycleData.startDate) {
      alert('Please enter a start date');
      return;
    }
    
    const newCycle = {
      id: Date.now(),
      startDate: cycleData.startDate,
      endDate: cycleData.endDate,
      symptoms: cycleData.symptoms,
      mood: cycleData.mood,
      notes: cycleData.notes || ''
    };
    
    setCycles([...cycles, newCycle]);
    
    if (cycleData.symptoms.length > 0) {
      setSymptoms(prev => [...prev, ...cycleData.symptoms]);
    }
    
    // Reset form
    setCycleData({ startDate: '', endDate: '', symptoms: [], mood: '', notes: '' });
    setView('history');
  };

  const calculateAverageCycle = () => {
    if (cycles.length < 2) return;
    
    let totalDays = 0;
    let count = 0;
    
    for (let i = 1; i < cycles.length; i++) {
      const currentStart = new Date(cycles[i].startDate);
      const prevStart = new Date(cycles[i-1].startDate);
      const diffTime = Math.abs(currentStart - prevStart);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0 && diffDays < 100) { // Sanity check
        totalDays += diffDays;
        count++;
      }
    }
    
    if (count > 0) {
      setAverageCycleLength(Math.round(totalDays / count));
    }
  };

  const predictNextPeriod = () => {
    if (!averageCycleLength || cycles.length === 0) return;
    
    const lastPeriod = new Date(cycles[cycles.length - 1].startDate);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + averageCycleLength);
    
    const fertileStart = new Date(nextPeriod);
    fertileStart.setDate(nextPeriod.getDate() - 14 - 5); // ~5 days before ovulation
    
    const fertileEnd = new Date(nextPeriod);
    fertileEnd.setDate(nextPeriod.getDate() - 14 + 1); // ~1 day after ovulation
    
    setPrediction({
      nextPeriod: nextPeriod.toISOString().split('T')[0],
      fertileWindowStart: fertileStart.toISOString().split('T')[0],
      fertileWindowEnd: fertileEnd.toISOString().split('T')[0]
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const deleteCycle = (id) => {
    if (window.confirm('Are you sure you want to delete this cycle?')) {
      setCycles(cycles.filter(cycle => cycle.id !== id));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="neon-card">
        <h2 className="text-2xl font-bold text-neon-blue neon-text mb-6">Period & Symptom Tracker</h2>
        
        <div className="mb-6 flex justify-center space-x-4">
          <button 
            onClick={() => setView('form')}
            className={`px-4 py-2 rounded-lg ${view === 'form' ? 'bg-neon-purple text-dark' : 'neon-card'}`}
          >
            Log Period
          </button>
          <button 
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-lg ${view === 'history' ? 'bg-neon-pink text-dark' : 'neon-card'}`}
          >
            History
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg ${view === 'calendar' ? 'bg-neon-blue text-dark' : 'neon-card'}`}
          >
            Predictions
          </button>
        </div>

        {view === 'form' && (
          <form onSubmit={handleCycleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-soft-white mb-2">Period Start Date</label>
                <input 
                  type="date" 
                  value={cycleData.startDate} 
                  onChange={(e) => setCycleData({...cycleData, startDate: e.target.value})} 
                  className="neon-input w-full" 
                  required
                />
              </div>
              <div>
                <label className="block text-soft-white mb-2">Period End Date</label>
                <input 
                  type="date" 
                  value={cycleData.endDate} 
                  onChange={(e) => setCycleData({...cycleData, endDate: e.target.value})} 
                  className="neon-input w-full" 
                />
              </div>
            </div>

            <div>
              <label className="block text-soft-white mb-2">Symptoms</label>
              <div className="grid grid-cols-2 gap-2">
                {symptomOptions.map(symptom => (
                  <label key={symptom} className="flex items-center cursor-pointer p-2 hover:bg-gray-800 rounded">
                    <input
                      type="checkbox"
                      checked={cycleData.symptoms?.includes(symptom)}
                      onChange={() => {
                        const updatedSymptoms = cycleData.symptoms?.includes(symptom)
                          ? cycleData.symptoms.filter(s => s !== symptom)
                          : [...(cycleData.symptoms || []), symptom];
                        setCycleData({ ...cycleData, symptoms: updatedSymptoms });
                      }}
                      className="mr-2"
                    />
                    <span className="text-soft-white">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-soft-white mb-2">Overall Mood</label>
              <select 
                value={cycleData.mood} 
                onChange={(e) => setCycleData({...cycleData, mood: e.target.value})} 
                className="neon-input w-full"
              >
                <option value="">Select your mood</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="neutral">Neutral</option>
                <option value="poor">Poor</option>
                <option value="very-poor">Very Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-soft-white mb-2">Notes</label>
              <textarea
                value={cycleData.notes || ''}
                onChange={(e) => setCycleData({...cycleData, notes: e.target.value})}
                className="neon-input w-full h-24"
                placeholder="Add any additional notes about your cycle or symptoms..."
              ></textarea>
            </div>

            <button type="submit" className="neon-button neon-button-pink w-full">Save Period Data</button>
          </form>
        )}

        {view === 'history' && (
          <div className="space-y-6">
            <h3 className="text-xl text-neon-pink mb-4">Your Period History</h3>
            
            {cycles.length > 0 ? (
              <div className="space-y-4">
                {cycles.map((cycle, index) => (
                  <div key={cycle.id} className="neon-card">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-neon-blue font-semibold">Period #{cycles.length - index}</h4>
                      <button 
                        onClick={() => deleteCycle(cycle.id)}
                        className="text-neon-pink hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <span className="text-gray-400 text-sm">Start Date:</span>
                        <p className="text-soft-white">{formatDate(cycle.startDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">End Date:</span>
                        <p className="text-soft-white">{cycle.endDate ? formatDate(cycle.endDate) : 'Not recorded'}</p>
                      </div>
                    </div>
                    
                    {cycle.symptoms && cycle.symptoms.length > 0 && (
                      <div className="mb-2">
                        <span className="text-gray-400 text-sm">Symptoms:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cycle.symptoms.map(symptom => (
                            <span key={symptom} className="neon-card text-neon-pink text-xs px-2 py-1 rounded">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {cycle.mood && (
                      <div className="mb-2">
                        <span className="text-gray-400 text-sm">Mood:</span>
                        <p className="text-soft-white capitalize">{cycle.mood}</p>
                      </div>
                    )}
                    
                    {cycle.notes && (
                      <div>
                        <span className="text-gray-400 text-sm">Notes:</span>
                        <p className="text-soft-white text-sm mt-1">{cycle.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="neon-card text-center">
                <p className="text-soft-white">No periods tracked yet. Start tracking to see your history.</p>
              </div>
            )}
          </div>
        )}

        {view === 'calendar' && (
          <div className="space-y-6">
            <h3 className="text-xl text-neon-blue mb-4">Period Predictions</h3>
            
            {prediction ? (
              <div className="neon-card">
                <div className="mb-6">
                  <h4 className="text-neon-pink font-semibold mb-2">Next Period Prediction</h4>
                  <div className="neon-card p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Expected Start Date</p>
                      <p className="text-2xl font-bold text-neon-pink">{formatDate(prediction.nextPeriod)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-neon-blue font-semibold mb-2">Fertility Window</h4>
                  <div className="neon-card p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Start</p>
                        <p className="text-lg font-semibold text-neon-blue">{formatDate(prediction.fertileWindowStart)}</p>
                      </div>
                      <div className="h-0.5 flex-grow mx-4 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">End</p>
                        <p className="text-lg font-semibold text-neon-purple">{formatDate(prediction.fertileWindowEnd)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-soft-white text-sm">
                    Based on your average cycle length of <span className="text-neon-blue font-semibold">{averageCycleLength} days</span>
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Note: These predictions are estimates and may vary. Continue tracking for more accurate predictions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="neon-card text-center">
                <p className="text-soft-white mb-4">
                  {cycles.length === 0 
                    ? "No periods tracked yet. Start tracking to see predictions." 
                    : cycles.length === 1 
                      ? "Track at least one more period to see predictions." 
                      : "Calculating predictions..."}
                </p>
                {cycles.length === 0 && (
                  <button 
                    onClick={() => setView('form')}
                    className="neon-button neon-button-blue"
                  >
                    Start Tracking
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;