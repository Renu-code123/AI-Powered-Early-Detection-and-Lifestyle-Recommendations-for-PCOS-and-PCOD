import React, { useState } from 'react';

const Resources = ({ setActiveTab }) => {
  const articles = [
    {
      id: 1,
      title: 'Understanding PCOS: Symptoms, Causes, and Care',
      excerpt: 'A clear overview of PCOS/PCOD, common symptoms, and evidence-based lifestyle strategies.',
      content:
        'PCOS (Polycystic Ovary Syndrome) affects hormone levels and can impact menstrual cycles, fertility, and metabolic health. Effective management often includes nutrition adjustments, regular exercise, stress reduction, and medical guidance where appropriate. Early detection and consistent tracking help tailor care to each person.'
    },
    {
      id: 2,
      title: 'Nutrition Basics for PCOS',
      excerpt: 'Practical tips for blood sugar balance, fiber intake, and anti-inflammatory foods.',
      content:
        'Balanced meals with protein, fiber, and healthy fats support stable energy and hormone balance. Focus on whole foods, minimize ultra-processed snacks, and personalize meals based on symptom responses.'
    }
  ];

  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-neon-blue neon-text-blue mb-6">Resources</h2>

      {/* Articles list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((a) => (
          <div key={a.id} className="neon-card cursor-pointer" onClick={() => setSelectedArticle(a)}>
            <h3 className="text-xl font-semibold text-neon-purple mb-2">{a.title}</h3>
            <p className="text-soft-white text-sm">{a.excerpt}</p>
          </div>
        ))}
      </div>

      {/* Selected article detail */}
      {selectedArticle && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="neon-card w-full max-w-2xl bg-dark">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-neon-blue">{selectedArticle.title}</h3>
              <button className="neon-button" onClick={() => setSelectedArticle(null)}>Close</button>
            </div>
            <p className="text-soft-white text-base leading-relaxed">{selectedArticle.content}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 flex gap-3">
        <button onClick={() => setActiveTab('doctors')} className="neon-button neon-button-blue">Find Doctors</button>
        <button onClick={() => setActiveTab('community')} className="neon-button neon-button-pink">Community</button>
        <button onClick={() => setActiveTab('home')} className="neon-button">Back to Home</button>
      </div>
    </div>
  );
};

export default Resources;