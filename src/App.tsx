import React, { useState, useEffect } from 'react';

const App = () => {
  const [question, setQuestion] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(''); // Store the asked question
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sdk, setSdk] = useState<any>(null);

  const magicAnswers = [
    // DAN ROMERO REFERENCES 🎭
    "📱 Dan Romero already knows the answer",
    "🟣 Dan's purple energy says YES",
    "📊 Dan would cast about this",
    "🚀 Dan's building it as we speak",
    "💡 Dan had this idea 3 years ago",
    "🎯 Dan's metrics dashboard agrees",
    
    // VARUN & TEAM REFERENCES 🛠️
    "⚡ Varun's code says it's possible",
    "🔧 The devs are shipping it next week",
    "🧠 Big brain Varun energy detected",
    "⛓️ Varun's already built the protocol for this",
    "💻 Varun's GitHub commits confirm",
    
    // HORSEFACTS LEGENDS 🐴
    "🐴 @horsefacts would build this in a weekend",
    "⚡ Horsefacts energy: maximum efficiency",
    "🐎 The horse has spoken, and it's based",
    "💻 Horsefacts-level technical excellence required",
    "🐴 Even the horses are bullish on this",
    "⚡ Horsefacts would optimize this question",
    
    // LINDA XIE WISDOM 💎
    "💎 @linda's crystal ball says HODL",
    "🌟 Linda energy: elegant and powerful",
    "💫 Linda would turn this into alpha",
    "✨ Linda vibes are immaculate here",
    "🦄 Linda-tier question quality",
    "💎 Linda's gem collection approves",
    
    // TED TEAM HUMOR 🎪
    "🎭 @ted's creative genius says YES",
    "🎨 Ted would make this beautiful",
    "🌈 Ted's design sense tingles",
    "🎪 Ted-level creative energy detected",
    "🎨 Ted would frame this moment",
    "✨ Ted's aesthetic approval granted",
    
    // PRODUCT-MARKET FIT HUMOR 📈
    "📈 PMF confirmed, you're early",
    "🎯 Product-market fit? More like perfect-magic fit",
    "💰 VCs would fund this question",
    "🚀 This has unicorn potential",
    "📊 The metrics are looking bullish",
    "🎪 PMF status: It's giving main character",
    "💡 Paul Graham would love this pivot",
    "📈 Hockey stick growth incoming",
    "💰 Series A worthy insight",
    
    // FARCASTER CULTURE 🟣
    "🟣 Purple pill energy is strong here",
    "📱 Warpcast notifications going brrrr",
    "🖼️ Frame this moment literally",
    "⚡ Faster than Warp speed",
    "🦄 Rare drop detected",
    "🎨 Put it in the MoMA of Frames",
    "🌊 Riding the purple wave",
    "💎 Diamond FID holder vibes",
    "🎭 Peak Farcaster native behavior",
    
    // BASE CHAIN HUMOR ⛓️
    "🔵 Based and crystal-pilled",
    "⛓️ The answer is onchain obviously",
    "🔵 Base mainnet says YES",
    "💸 Cheaper than an ETH transaction",
    "⚡ Lightning fast like Base",
    "🔵 Jesse Pollak approves this message",
    "⛓️ Onchain summer vibes",
    
    // DEGEN TOKEN REFERENCES 💸
    "💸 DEGEN allocation incoming",
    "🎪 Big DEGEN energy",
    "💰 Time to farm some DEGEN",
    "🎭 DEGEN worthy question",
    "💸 The DEGEN gods have spoken",
    "🎪 Maximum DEGEN coefficient",
    
    // COMMUNITY & CHANNELS 📺
    "📺 Needs its own channel",
    "🎪 /degentlemen would love this",
    "🎨 Perfect for /art vibes",
    "💡 /founders energy detected",
    "🌟 Main character in /photography",
    "🎭 Peak /memes material",
    "🐴 /horsefacts approved content",
    "💎 /linda wisdom territory",
    
    // EARLY ADOPTER HUMOR 🚀
    "🚀 You're so early, time travel confirmed",
    "⏰ Early bird gets the alpha",
    "🌅 Dawn of the purple age",
    "🎯 OG status: UNLOCKED",
    "👑 Founder mode: ACTIVATED",
    "🦄 Pre-product-market-fit energy",
    
    // TECH & FRAMES 🖼️
    "🖼️ This calls for a Frame within a Frame",
    "💻 The HubDB has spoken",
    "🔮 Even my crystal runs on Farcaster",
    "⚡ Hub sync complete: YES",
    "🖼️ Frame rate: infinity FPS",
    "🐴 Horsefacts would optimize this Frame",
    
    // TOUCHING GRASS MEMES 🌱
    "🌱 Maybe touch grass first?",
    "☀️ Go outside, then ask again",
    "🌿 Grass touching required",
    "🏃‍♂️ Run a mile, then recast",
    "🌱 Linda says: balance is key",
    
    // WEB3 CULTURE 💫
    "🎪 Too based for a simple answer",
    "💫 The vibes are immaculate, ser",
    "🌟 NFA but probably yes",
    "🎭 This hits different",
    "💎 HODL that thought",
    "⚡ Instant classic, screenshot this",
    "🔥 Viral moment incoming",
    "🦄 Unicorn energy detected",
    "🌊 Surf the algo waves",
    "🎯 That's some premium alpha",
    "💰 Bullish on your life choices",
    "🎪 Circus energy but make it elegant",
    "⚡ Goes hard on the timeline",
    "🔥 No cap, that's based",
    "🌟 Living your best decentralized life",
    "💫 The consensus mechanism agrees",
    "🎭 Peak performance unlocked",
    "🐴 Horsefacts-tier execution needed",
    "💎 Linda-level sophistication detected",
    "🎨 Ted would be proud of this aesthetic"
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
      alert('🔮 Ask the crystal ball a question first!');
      return;
    }

    setCurrentQuestion(question); // Save the question
    setIsShaking(true);
    setShowAnswer(false);

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
      if (sdk && sdk.actions && sdk.actions.openComposer) {
        // Use Farcaster SDK to open composer
        await sdk.actions.openComposer({
          text: shareText
        });
        console.log('🔮 Opened Farcaster composer');
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareText);
        alert('🔮 Reading copied to clipboard! You can paste it in a new cast.');
      }
    } catch (error) {
      console.log('🔮 Share error:', error);
      // Final fallback: just copy text
      try {
        await navigator.clipboard.writeText(shareText);
        alert('🔮 Reading copied to clipboard!');
      } catch (e) {
        alert('🔮 Unable to share. Try manually copying your reading.');
      }
    }
  };

  const askNewQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestion('');
    setAnswer('');
    setQuestion('');
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
