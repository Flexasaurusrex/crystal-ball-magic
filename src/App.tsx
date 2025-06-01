import React, { useState, useEffect } from 'react';

const App = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Magic answers
  const magicAnswers = [
    "✨ The stars say YES!",
    "🌙 Ask again when the moon is full...",
    "🔮 My crystal is cloudy, try later",
    "⭐ Absolutely! The universe agrees!",
    "🌟 Signs point to YES!",
    "💫 Don't count on it...",
    "🎭 Reply hazy, try again",
    "🌈 Outlook good!",
    "🎪 Very doubtful...",
    "🎨 Without a doubt!",
    "🎭 My sources say no",
    "🌺 You may rely on it",
    "🦄 Better not tell you now",
    "🎪 Cannot predict now",
    "🌸 Concentrate and ask again",
    "🔥 All signs point to YES!",
    "🌊 The tide will turn in your favor",
    "⚡ Electric possibilities ahead!",
    "🌺 Bloom where you are planted",
    "🎈 Let your dreams take flight!"
  ];

  // Initialize Farcaster SDK
  useEffect(() => {
    const initializeFarcasterSDK = async () => {
      try {
        console.log('🔮 Loading Farcaster SDK...');
        const { sdk } = await import('https://esm.sh/@farcaster/frame-sdk@latest');
        console.log('🔮 Farcaster SDK loaded successfully');
        
        // Call ready to dismiss splash screen
        await sdk.actions.ready();
        console.log('🔮 Splash screen dismissed');
      } catch (error) {
        console.log('🔮 Farcaster SDK not available:', error);
        
        // Fallback for iframe
        try {
          if (window.parent !== window) {
            window.parent.postMessage({ type: 'frame_ready' }, '*');
            console.log('🔮 Sent frame_ready message');
          }
        } catch (e) {
          console.log('🔮 PostMessage fallback failed');
        }
      }
    };

    initializeFarcasterSDK();
  }, []);

  const shakeCrystalBall = () => {
    if (!question.trim()) {
      alert('🔮 Ask the crystal ball a question first!');
      return;
    }

    setIsShaking(true);
    setIsLoading(true);
    setShowAnswer(false);

    setTimeout(() => {
      const randomAnswer = magicAnswers[Math.floor(Math.random() * magicAnswers.length)];
      setAnswer(randomAnswer);
      setIsShaking(false);
      setIsLoading(false);
      setShowAnswer(true);
      setQuestion('');
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      shakeCrystalBall();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            🔮 Mystic Crystal Ball
          </h1>
          <p style={{ color: '#E0E7FF', fontSize: '1.1rem' }}>
            Ask any question and discover your fate!
          </p>
        </div>

        {/* Crystal Ball */}
        <div 
          onClick={shakeCrystalBall}
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #A78BFA, #7C3AED, #5B21B6)',
            margin: '0 auto 40px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '4px solid #C4B5FD',
            transform: isShaking ? 'scale(1.05)' : 'scale(1)',
            animation: isShaking ? 'shake 0.5s infinite' : 'none'
          }}
        >
          {isShaking ? '✨' : '🔮'}
        </div>

        {/* Question Input */}
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What do you wish to know?"
          style={{
            width: '100%',
            padding: '15px',
            border: 'none',
            borderRadius: '25px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '1rem',
            marginBottom: '20px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.2)',
            textAlign: 'center'
          }}
        />

        {/* Shake Button */}
        <button
          onClick={shakeCrystalBall}
          disabled={isLoading}
          style={{
            background: 'linear-gradient(45deg, #7C3AED, #A78BFA)',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '30px',
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {isLoading ? '✨ Consulting the spirits...' : '🔮 Shake the Crystal Ball'}
        </button>

        {/* Loading */}
        {isLoading && (
          <div style={{ color: '#A78BFA', fontStyle: 'italic', marginBottom: '20px' }}>
            ✨ Consulting the spirits...
          </div>
        )}

        {/* Answer Container */}
        {showAnswer && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '20px',
            marginTop: '20px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ color: '#C4B5FD', marginBottom: '10px' }}>The Crystal Ball Reveals:</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FDE047' }}>{answer}</p>
          </div>
        )}

        {/* Instructions */}
        <div style={{ marginTop: '30px', color: '#C4B5FD', fontSize: '0.9rem' }}>
          <p>💫 Type your question above and click the crystal ball!</p>
          <p>🌟 The mystical forces will guide your destiny</p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-1deg); }
          75% { transform: translateX(5px) rotate(1deg); }
        }
        input::placeholder {
          color: #C4B5FD;
        }
        input:focus {
          outline: none;
          border-color: #A78BFA;
          background: rgba(255,255,255,0.15);
        }
      `}</style>
    </div>
  );
};

export default App;
