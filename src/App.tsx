import React, { useState, useEffect } from 'react';

const App = () => {
  const [question, setQuestion] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(''); // Store the asked question
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [_sdk, setSdk] = useState<any>(null); // Prefixed with _ to indicate intentionally unused
  const [shareStatus, setShareStatus] = useState('');

  const magicAnswers = [
    // POSITIVE RESPONSES ✅
    "📱 Dan Romero already knows the answer - YES",
    "🟣 Dan's purple energy says YES",
    "🚀 Dan's building it as we speak - absolutely",
    "⚡ Varun's code says it's possible",
    "🧠 Big brain Varun energy says: definitely",
    "🐴 @horsefacts would build this in a weekend - YES",
    "🐎 The horse has spoken: it's based",
    "💎 @linda's crystal ball says HODL... I mean YES",
    "🌟 Linda energy detected: elegant and powerful",
    "🎭 @ted's creative genius says YES",
    "🎨 Ted would make this beautiful - go for it",
    "📈 PMF confirmed, you're early - YES",
    "💰 VCs would fund this idea",
    "🚀 This has unicorn potential - absolutely",
    "🟣 Purple pill energy confirms: YES",
    "🔵 Based and crystal-pilled - YES",
    "💸 DEGEN allocation incoming - YES",
    "🎪 Big DEGEN energy detected - go for it",
    "🚀 You're so early, time travel confirmed",
    "👑 Founder mode activated - YES",
    "🖼️ This calls for a Frame within a Frame",
    "💻 The HubDB has spoken: YES",
    "🎯 That's some premium alpha - YES",
    "🔥 No cap, that's based - YES",
    "🦄 Unicorn energy detected - YES",
    
    // NEGATIVE RESPONSES ❌
    "📊 Dan would not cast about this",
    "🟣 Even Dan's purple energy says NO",
    "🔧 The devs are definitely NOT shipping this",
    "💻 Varun's GitHub commits say: abort mission",
    "🐴 @horsefacts would optimize this to NO",
    "⚡ Horsefacts efficiency check: failed",
    "💎 @linda's crystal ball is cloudy on this one",
    "✨ Linda vibes are saying: reconsider",
    "🎨 Ted's design sense is cringing - NO",
    "🌈 Ted would not frame this moment",
    "📈 PMF status: not found - NO",
    "💰 VCs would run from this idea",
    "📊 The metrics are looking bearish",
    "🟣 Purple pill energy is blocked here",
    "🔵 Too unbased for Base chain - NO",
    "💸 DEGEN gods are not pleased",
    "🎪 /degentlemen would pass on this",
    "💡 /founders energy is absent",
    "⏰ You're too late for this one",
    "🎯 OG status revoked - NO",
    "💻 The HubDB says: permission denied",
    "🌱 Touch grass and reconsider this",
    "☀️ Go outside and think again",
    "🎭 This doesn't hit - try again",
    "💫 The consensus mechanism disagrees",
    
    // NEUTRAL/UNCERTAIN RESPONSES 🤔
    "📱 Ask Dan Romero, he might know",
    "🟣 Dan's purple energy is mixed on this",
    "🔧 The devs are still deciding",
    "💻 Varun needs more data on this",
    "🐴 @horsefacts would need to run the numbers",
    "⚡ Horsefacts efficiency pending...",
    "💎 @linda's crystal ball is swirling",
    "🌟 Linda energy is unclear right now",
    "🎨 Ted's design sense is contemplating",
    "🎪 Ted needs to see the full picture",
    "📈 PMF status: under investigation",
    "💰 VCs are still in due diligence",
    "📊 The metrics are inconclusive",
    "🟣 Purple pill energy is buffering...",
    "🔵 Base chain is processing this request",
    "💸 DEGEN allocation pending review",
    "🎪 /degentlemen are debating this",
    "💡 /founders need more coffee to decide",
    "⏰ Timing is everything - wait and see",
    "🎯 OG status under review",
    "💻 The HubDB is syncing...",
    "🖼️ Frame rate needs optimization first",
    "🌱 Touch grass and ask again later",
    "☀️ The stars aren't aligned yet",
    "🎭 This might hit different tomorrow",
    "💫 The vibes are uncertain, ser",
    "🌟 NFA but... actually, maybe FA?",
    "💎 HODL that thought for now",
    "🦄 Unicorn energy is charging...",
    "🌊 The algo waves are unclear",
    "⚡ Hub sync in progress - try later",
    "🔮 Even my crystal needs more time",
    "🎪 The circus is still setting up",
    "💰 Market conditions are unclear",
    "🚀 Launch window is TBD"
  ];

  // Initialize Farcaster SDK
  useEffect(() => {
    const initializeFarcasterSDK = async () => {
      try {
        console.log('🔮 Loading Farcaster SDK...');
        
        const importSdk = new Function('return import("https://esm.sh/@farcaster/frame-sdk@latest")');
        const sdkModule = await importSdk();
        const sdkInstance = sdkModule.sdk;
        setSdk(sdkInstance);
        
        console.log('🔮 Farcaster SDK loaded successfully');
        
        await sdkInstance.actions.ready();
        console.log('🔮 Splash screen dismissed');
      } catch (error) {
        console.log('🔮 Farcaster SDK not available:', error);
        
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
      setShareStatus('🔮 Ask the crystal ball a question first!');
      setTimeout(() => setShareStatus(''), 3000);
      return;
    }

    setCurrentQuestion(question); // Save the question
    setIsShaking(true);
    setShowAnswer(false);
    setShareStatus(''); // Clear any previous status

    setTimeout(() => {
      const randomAnswer = magicAnswers[Math.floor(Math.random() * magicAnswers.length)];
      setAnswer(randomAnswer);
      setIsShaking(false);
      setShowAnswer(true);
      setQuestion(''); // Clear input for next question
    }, 2000);
  };

  const shareReading = async () => {
    const shareText = `🔮 I consulted the Mystic Crystal Ball!

Question: "${currentQuestion}"
Answer: ${answer}

Ask your own question: https://crystal-ball-magic.vercel.app`;

    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus('✅ Copied! Paste in a new cast');
      setTimeout(() => setShareStatus(''), 3000);
    } catch (error) {
      // Fallback for when clipboard API isn't available
      setShareStatus('📋 Copy this text to share your reading:');
      // Create a temporary textarea to select the text
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setTimeout(() => setShareStatus(''), 5000);
    }
  };

  const askNewQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestion('');
    setAnswer('');
    setQuestion('');
    setShareStatus(''); // Clear status messages
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

        {/* Show current question if we have an answer */}
        {showAnswer && currentQuestion && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '20px',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            <h4 style={{ color: '#C4B5FD', marginBottom: '8px', fontSize: '0.9rem' }}>Your Question:</h4>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#E0E7FF' }}>
              "{currentQuestion}"
            </p>
          </div>
        )}

        {/* Status Messages */}
        {shareStatus && (
          <div style={{
            background: shareStatus.includes('✅') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '20px',
            border: shareStatus.includes('✅') ? '2px solid rgba(34, 197, 94, 0.4)' : '2px solid rgba(239, 68, 68, 0.4)',
            color: shareStatus.includes('✅') ? '#BBF7D0' : '#FECACA'
          }}>
            <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {shareStatus}
            </p>
          </div>
        )}

        {/* Question Input */}
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={showAnswer ? "Ask another question..." : "What do you wish to know?"}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '25px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '1rem',
            marginBottom: '20px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.2)',
            textAlign: 'center',
            outline: 'none'
          }}
        />

        {/* Shake Button */}
        <button
          onClick={shakeCrystalBall}
          disabled={isShaking}
          style={{
            background: 'linear-gradient(45deg, #7C3AED, #A78BFA)',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px',
            opacity: isShaking ? 0.6 : 1,
            width: '100%'
          }}
        >
          {isShaking ? '✨ Consulting the spirits...' : '🔮 Shake the Crystal Ball'}
        </button>

        {/* Answer Container */}
        {showAnswer && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ color: '#C4B5FD', marginBottom: '10px' }}>The Crystal Ball Reveals:</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FDE047', marginBottom: '20px' }}>
              {answer}
            </p>
            
            {/* Share and New Question Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <button
                onClick={shareReading}
                style={{
                  background: 'linear-gradient(45deg, #10B981, #34D399)',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                📢 Share My Reading
              </button>
              
              <button
                onClick={askNewQuestion}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                🔮 Ask New Question
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!showAnswer && (
          <div style={{ marginTop: '30px', color: '#C4B5FD', fontSize: '0.9rem' }}>
            <p>💫 Type your question above and click the crystal ball!</p>
            <p>🌟 The mystical forces will guide your destiny</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-1deg); }
          75% { transform: translateX(5px) rotate(1deg); }
        }
        input::placeholder {
          color: #C4B5FD !important;
        }
        input:focus {
          border-color: #A78BFA !important;
          background: rgba(255,255,255,0.15) !important;
        }
        button:hover {
          transform: translateY(-2px);
          transition: transform 0.2s ease;
        }
        button:active {
          transform: translateY(0px);
        }
      `}</style>
    </div>
  );
};

export default App;
