import React from 'react';
import ChatWindow from './components/ChatWindow';

const App = () => {
  return (
    <div className="min-h-screen relative bg-[url('https://wallpapersok.com/images/high/adorable-kdrama-couple-tipbc4z2qc7up9y9.webp')] bg-cover bg-center bg-no-repeat">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 via-purple-200/70 to-purple-300/60 backdrop-blur-none"></div>

      {/* Chat container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/40">
          <h1 className="text-3xl font-semibold text-purple-700 mb-4 text-center">
            Annyeong!
          </h1>
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default App;
