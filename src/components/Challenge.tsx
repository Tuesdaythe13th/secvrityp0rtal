
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Challenge = () => {
  const [challengeActive, setChallengeActive] = useState(false);
  const [attackVector, setAttackVector] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();

  const startChallenge = () => {
    setChallengeActive(true);
    setResult(null);
    toast({
      title: "Challenge activated",
      description: "The red team challenge is now active.",
      variant: "destructive",
    });
  };

  const submitAttack = () => {
    if (!attackVector.trim()) {
      toast({
        title: "Attack vector required",
        description: "Please enter an attack vector to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Simple "AI" evaluation of the attack
    const isSuccessful = 
      attackVector.toLowerCase().includes('jwt') || 
      attackVector.toLowerCase().includes('token') || 
      attackVector.toLowerCase().includes('injection');

    if (isSuccessful) {
      setResult({
        success: true,
        message: 'SUCCESS: Attack vector accepted. System compromised. Access granted to admin panel. Well done, operator.'
      });
      toast({
        title: "Target breached",
        description: "Your attack was successful. System compromised.",
        variant: "default",
      });
    } else {
      setResult({
        success: false,
        message: 'FAILURE: Attack detected and blocked. The system detected your attack. Refine your approach.'
      });
      toast({
        title: "Attack failed",
        description: "Your attack was detected and blocked.",
        variant: "destructive",
      });
    }
  };

  const resetChallenge = () => {
    setAttackVector('');
    setResult(null);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl cyber-font neon-pink mb-3">RED TEAM CHALLENGE</h3>
      <div className="bg-gray-900 p-4 border border-gray-800">
        <p className="text-gray-300 mb-4">
          The target system has a vulnerable API endpoint that allows unauthorized access if properly exploited. 
          Your challenge is to craft an attack that bypasses authentication.
        </p>
        
        {!challengeActive ? (
          <button
            onClick={startChallenge}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 cyber-font neon-glow"
          >
            START CHALLENGE
          </button>
        ) : (
          <div>
            <div className="p-3 bg-gray-800 mb-4">
              <p className="text-green-400">&gt; Analyzing API endpoint: /api/v1/admin/access</p>
              <p className="text-green-400">&gt; Detected JWT token vulnerability</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Enter your attack vector:</label>
              <textarea
                value={attackVector}
                onChange={(e) => setAttackVector(e.target.value)}
                className="w-full bg-gray-800 text-white p-3 border border-gray-700 h-24"
              />
            </div>
            
            <button
              onClick={submitAttack}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 cyber-font mr-2"
            >
              EXECUTE ATTACK
            </button>
            
            {result && (
              <div className="mt-4 p-3 bg-gray-800 border border-gray-700">
                <p className={`text-lg cyber-font ${result.success ? 'neon-red' : 'text-red-500'}`}>
                  {result.message}
                </p>
                <button
                  onClick={resetChallenge}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 cyber-font mt-4"
                >
                  TRY AGAIN
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenge;
