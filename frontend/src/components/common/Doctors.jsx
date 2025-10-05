import React from 'react';

const Doctors = ({ setActiveTab }) => {
  const sampleDoctors = [
    { name: 'Dr. A. Sharma', specialty: 'Gynecologist', city: 'Mumbai', rating: 4.5 },
    { name: 'Dr. R. Mehta', specialty: 'Endocrinologist', city: 'Delhi', rating: 4.2 },
    { name: 'Dr. S. Patel', specialty: 'Obstetrician', city: 'Ahmedabad', rating: 4.6 },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-neon-blue neon-text-blue mb-6">Find Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleDoctors.map((doc, i) => (
          <div key={i} className="neon-card">
            <h3 className="text-xl font-semibold text-neon-purple">{doc.name}</h3>
            <p className="text-soft-white">{doc.specialty} • {doc.city}</p>
            <p className="text-soft-white mt-1">Rating: {doc.rating} ⭐</p>
            <div className="mt-3 flex gap-2">
              <button className="neon-button neon-button-blue">View Profile</button>
              <button className="neon-button">Contact</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button className="neon-button" onClick={() => setActiveTab('home')}>Back to Home</button>
      </div>
    </div>
  );
};

export default Doctors;