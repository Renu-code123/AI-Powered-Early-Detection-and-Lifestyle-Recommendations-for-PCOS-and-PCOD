import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Lily, your PCOS/PCOD health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined responses for common questions
  const responses = {
    greeting: [
      "Hello! How can I assist you with your PCOS/PCOD health today?",
      "Hi there! I'm here to help with any PCOS/PCOD questions you might have."
    ],
    symptoms: [
      "Common PCOS/PCOD symptoms include irregular periods, excessive hair growth, acne, weight gain, and hair loss. Would you like more information about any specific symptom?",
      "PCOS/PCOD symptoms vary but often include menstrual irregularities, hormonal imbalances, and metabolic issues. What specific symptoms are you experiencing?"
    ],
    diagnosis: [
      "PCOS/PCOD is typically diagnosed through a combination of medical history, physical examination, blood tests for hormone levels, and ultrasound imaging. Our early detection tool can help assess your risk factors.",
      "Diagnosis usually involves checking for at least two of these three criteria: irregular periods, elevated androgens (either in blood tests or symptoms), and polycystic ovaries on ultrasound."
    ],
    treatment: [
      "PCOS/PCOD treatment is personalized and may include lifestyle changes (diet and exercise), medications to regulate periods or reduce symptoms, and addressing specific concerns like fertility. Would you like more specific information?",
      "Treatment approaches include managing symptoms, regulating hormones, and reducing long-term health risks. This might involve lifestyle modifications, medications, or other therapies depending on your specific needs."
    ],
    diet: [
      "A PCOS/PCOD-friendly diet typically focuses on anti-inflammatory foods, balanced meals with protein, healthy fats and complex carbs, and limited processed foods and sugars. Would you like some specific meal suggestions?",
      "Many find success with a low-glycemic diet that helps manage insulin levels. This includes plenty of vegetables, lean proteins, healthy fats, and moderate amounts of whole grains and fruits."
    ],
    exercise: [
      "For PCOS/PCOD, a combination of moderate cardio (like walking, swimming, or cycling) and strength training is often recommended. Aim for at least 150 minutes of moderate activity per week.",
      "Regular exercise helps improve insulin sensitivity and manage weight. Both cardio and strength training are beneficial, and consistency matters more than intensity."
    ],
    fertility: [
      "PCOS/PCOD can affect fertility, but many women with the condition can still conceive. Treatment options include lifestyle changes, medications to induce ovulation, and reproductive technologies if needed.",
      "If you're concerned about fertility, tracking your cycle, working with a reproductive endocrinologist, and addressing underlying hormonal imbalances can help improve your chances of conception."
    ],
    stress: [
      "Stress management is important for PCOS/PCOD as stress can worsen symptoms. Techniques like meditation, yoga, deep breathing, and adequate sleep can help manage stress levels.",
      "Chronic stress can impact hormone levels. Regular self-care practices, setting boundaries, and possibly working with a mental health professional can help manage stress with PCOS/PCOD."
    ],
    app: [
      "Our app offers period tracking, symptom logging, early detection risk assessment, personalized recommendations, and community support. Which feature would you like to learn more about?",
      "You can use our app to track your health data, get AI-powered insights, connect with specialists, and join our supportive community. What specific feature are you interested in?"
    ],
    default: [
      "I'm not sure I understand. Could you rephrase your question about PCOS/PCOD?",
      "I don't have information on that specific topic yet. Would you like to know about symptoms, diagnosis, treatment, or lifestyle management for PCOS/PCOD instead?"
    ]
  };

  // Function to determine which response category matches the user's input
  const getCategoryFromInput = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.match(/hi|hello|hey|greetings/)) {
      return 'greeting';
    } else if (lowerInput.match(/symptom|sign|irregular|hair|acne|weight/)) {
      return 'symptoms';
    } else if (lowerInput.match(/diagnos|test|check|detect|confirm/)) {
      return 'diagnosis';
    } else if (lowerInput.match(/treat|cure|manage|medication|pill|drug/)) {
      return 'treatment';
    } else if (lowerInput.match(/eat|food|diet|nutrition|meal/)) {
      return 'diet';
    } else if (lowerInput.match(/exercise|workout|activity|fitness|gym/)) {
      return 'exercise';
    } else if (lowerInput.match(/fertility|pregnant|conceive|baby|child/)) {
      return 'fertility';
    } else if (lowerInput.match(/stress|anxiety|relax|mental|worry/)) {
      return 'stress';
    } else if (lowerInput.match(/app|feature|tool|track|function/)) {
      return 'app';
    } else {
      return 'default';
    }
  };

  // Function to get a random response from the appropriate category
  const getResponse = (category) => {
    const responseArray = responses[category] || responses.default;
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  // Function to handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      const category = getCategoryFromInput(userMessage.text);
      const responseText = getResponse(category);
      
      const botMessage = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-gray-900 rounded-lg shadow-2xl border border-neon-purple overflow-hidden flex flex-col">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-neon-purple to-neon-pink p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.03-.696-.085-1.038A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">Lily - PCOS Health Assistant</h3>
              <p className="text-xs text-gray-200">Online | AI-powered</p>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 rounded-lg px-3 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-neon-purple text-white rounded-br-none' 
                      : 'bg-gray-800 text-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-gray-200' : 'text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-800 text-gray-200 rounded-lg rounded-bl-none px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700 flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white rounded-l-lg px-3 py-2 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-neon-pink hover:bg-pink-600 text-white rounded-r-lg px-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;