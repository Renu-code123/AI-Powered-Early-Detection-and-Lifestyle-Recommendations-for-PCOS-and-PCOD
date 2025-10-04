import React from 'react';

const Home = ({ setActiveTab }) => {
  const features = [
    {
      title: "Risk Assessment",
      description: "Complete our quick assessment to understand your PCOS/PCOD risk factors.",
    },
    {
      title: "Symptom Tracking",
      description: "Monitor your symptoms and identify patterns in your health journey.",
    },
    {
      title: "Personalized Recommendations",
      description: "Get tailored diet, exercise, and lifestyle suggestions based on your unique profile.",
    },
  ];

  return (
    <div className="w-[80%] min-h-[80vh] mx-auto flex flex-col justify-center items-center text-center">
      <h2 className="text-xl md:text-3xl font-bold text-blue-500 mb-4">Welcome to PCOS Guardian</h2>
      <p className="text-gray-500 mb-8">
        Your AI-powered companion for managing PCOS and PCOD. Get personalized insights, track your symptoms, and receive tailored lifestyle recommendations.
      </p>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white rounded-lg px-6 py-10 shadow-md hover:shadow-blue-500 transition duration-200">
            <h3 className="font-semibold mb-2 text-lg md:text-xl">{feature.title}</h3>
            <p className="text-gray-500 text-sm md:text-base">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center items-center">
        <button
          onClick={() => setActiveTab('assessment')}
          className="w-full md:w-auto px-6 py-2 border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 rounded-md cursor-pointer transition duration-200 font-medium"
        >
          Start Your Assessment
        </button>
      </div>
    </div>
  );
};

export default Home;