import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface GameCard {
  text: string;
}

// Saare ke saare original questions yahan fully loaded hain
export const gameData: Record<'truth' | 'dare' | 'situation', GameCard[]> = {
  truth: [
    { text: "Have you ever accidentally sent a sext to the wrong person?" },
    { text: "Who would you like to sext right now? ...Why don’t you do it?" },
    { text: "Who in your contact list would you most want us to have a threesome with?" },
    { text: "What’s your favorite body part of mine?" },
    { text: "What’s your biggest roleplay fantasy?" },
    { text: "Who was the first person you had a crush on?" },
    { text: "Where’s the craziest place you want to hook up with me?" },
    { text: "Have you ever had a sex dream about me?" },
    { text: "What’s the weirdest thing anyone has ever said to you during sex?" },
    { text: "What’s the weirdest thing you’ve ever said to anyone during sex?" },
    { text: "Would you like to make a sex tape with me?" },
    { text: "Would you rather do a pole dance or a striptease?" },
    { text: "What part of my body would you like to lick right now?" },
    { text: "How many one-night stands have you had?" },
    { text: "Have you ever put a sexy selfie on social media?" },
    { text: "What’s your biggest turn-on when you think about me?" },
    { text: "If I gave you whipped cream right now, what would you do with it?" },
    { text: "What’s the dirtiest thing you’d like me to do to you?" },
    { text: "Do you think my best friend is hot?" },
    { text: "How soon after meeting someone have you slept with them for the first time?" },
    { text: "Have you ever broken a bed during sex?" },
    { text: "Would you rather only sext for the rest of your life, or only have phone sex?" },
    { text: "What common turn-off really turns you on?" },
    { text: "When did you first realize you were attracted to me?" },
    { text: "Have you ever faked an orgasm?" },
    { text: "Have you ever faked an orgasm... with me?" },
    { text: "Have you ever slept with a co-worker?" },
    { text: "Would you want a threesome with me and my best friend?" },
    { text: "Would you want a threesome with me and your best friend?" },
    { text: "What’s the craziest thing you’ve done in a sex dream?" },
    { text: "Have you ever been turned on at work?" },
    { text: "Have you ever been to a sex club? ...Would you like to?" },
    { text: "When was the last time I turned you on?" },
    { text: "Is there a sex toy you’d like to try on me?" },
    { text: "Have you ever injured yourself during sex?" },
    { text: "Have you ever had sex in a public place?" },
    { text: "When was the last time you touched yourself? ...What were you thinking about?" },
    { text: "Would you rather be dominant or submissive?" },
    { text: "Have you ever fallen asleep during sex?" },
    { text: "Have you ever been to a strip club?" },
    { text: "Has anyone ever walked in on you during sex?" },
    { text: "Would you rather only use your tongue or only use your fingers?" },
    { text: "What’s your favorite thing about my body?" },
    { text: "Would you rather only have morning sex for the rest of your life, or never have morning sex again?" },
    { text: "What was your first sexual fantasy?" },
    { text: "Have you ever tried swinging or partner swapping? ...Would you like to?" },
    { text: "Which celebrity would you like to see me make out with?" },
    { text: "Would you like to watch me make out with my best friend?" },
    { text: "Would you like to watch me make out with your best friend?" },
    { text: "How would you describe my sexual personality?" },
    { text: "What’s your favorite memory of us having sex?" },
    { text: "What’s the sexiest gift I could give you?" },
    { text: "What’s the sexiest gift you’d like to give me?" },
    { text: "Have you ever kept a relationship secret?" },
    { text: "What’s your most romantic memory of me?" },
    { text: "Have you ever experimented with people of different genders?" },
    { text: "Picture your partner or crush — what’s your favorite body part?" },
    { text: "How old were you when you had sex for the first time?" },
    { text: "Who was your first kiss?" },
    { text: "What’s the most embarrassing thing that’s happened to you during sex?" },
    { text: "What’s the dirtiest thing anyone’s ever asked you to do? …And did you do it?" },
    { text: "What’s your steamiest sexual fantasy?" },
    { text: "How often do you masturbate?" },
    { text: "What’s your biggest turn-off?" },
    { text: "What’s your favorite sex position?" },
    { text: "Do you ever sext? …Can you read us one?" },
    { text: "Who’s the sexiest person you’ve ever been with?" },
    { text: "Have you ever fantasized about a co-worker?" },
    { text: "Have you ever had an orgy? ...Would you like to?" },
    { text: "What’s your best pick-up line?" },
    { text: "If you could only do one sex position for the rest of your life, which would you choose?" },
    { text: "What’s your favorite sexual guilty pleasure?" },
    { text: "Who was your best sexual experience with? …What made it so good?" },
    { text: "Have you ever cheated on someone?" },
    { text: "Where’s the most unusual place you’ve had sex?" },
    { text: "What’s the dirtiest thing you want someone to do to you?" },
    { text: "Have you ever had sex in your parents’ bed?" },
    { text: "What’s your kinkiest turn-on?" },
    { text: "Have you ever used sex toys with a partner?" },
    { text: "How many people have you slept with?" },
    { text: "What was your first crush, and do you still remember why?" },
    { text: "What’s your flirting style when you actually like someone?" },
    { text: "What’s the biggest relationship green flag you look for early on?" },
    { text: "What’s your ideal first date vibe?" },
    { text: "What’s a romantic gesture that always works on you?" },
    { text: "What’s your love language?" },
    { text: "Have you ever caught feelings because of good banter alone?" },
    { text: "What’s a texting habit that instantly makes you feel closer to someone?" },
    { text: "Do you believe in instant chemistry, or does attraction grow for you?" },
    { text: "What’s a compliment you secretly love hearing?" },
    { text: "What’s the most attractive personality trait someone can have?" },
    { text: "What’s something someone can do that gives you instant butterflies?" },
    { text: "Have you ever kissed more than one person in the same day?" },
    { text: "What’s the biggest age gap you’ve ever had in a relationship?" },
    { text: "Have you ever had feelings for two people at once?" },
    { text: "What’s the most embarrassing thing you’ve done on a date that still haunts you?" },
    { text: "What’s the worst excuse you’ve ever used to cancel plans?" },
    { text: "What’s the cringiest thing you’ve said while trying to flirt?" },
    { text: "What is a secret you have never told anyone?" },
    { text: "Do you have a hidden talent?" },
    { text: "What is your most absurd dealbreaker?" },
    { text: "What is something you’re glad your family doesn’t know about you?" },
    { text: "What's the scariest thing you've ever done?" },
    { text: "What's your biggest regret?" },
    { text: "What's a bad habit you have?" },
    { text: "What's one thing on your bucket list?" },
    { text: "When was the last time you cried?" },
    { text: "What is your guilty pleasure?" },
    { text: "What is your biggest fear?" },
    { text: "What’s your biggest insecurity?" },
    { text: "What is the most annoying thing about me?" },
    { text: "What is the last lie you told?" }
  ],
  dare: [
    { text: "Put an ice cube in your underwear for one minute." },
    { text: "Perform a sexy belly dance for your partner." },
    { text: "Blindfold your partner and guide them around your body using only touch." },
    { text: "Undress your partner using only your teeth." },
    { text: "Clean the house naked." },
    { text: "Go about your normal day but with no underwear on." },
    { text: "Give your partner a massage, blindfolded." },
    { text: "Remove your partner’s underwear using only your feet." },
    { text: "Use each other as a human plate with whipped cream or chocolate sauce!" },
    { text: "Share a fantasy that your loved one’s never heard before." },
    { text: "Handcuff your partner and treat them to their favorite turn-ons." },
    { text: "Read an erotic bedtime story out loud." },
    { text: "Set up a nude photo shoot and capture your favorite poses." },
    { text: "Go skinny dipping in your local river or lake." },
    { text: "Sext your partner during work." },
    { text: "Touch yourselves while your partner watches." },
    { text: "Give your partner a lap dance." },
    { text: "Pick one part of your body and have your partner focus all their attention there." },
    { text: "Choose a place you’ve never had sex and take your partner there." },
    { text: "Draw a picture with whipped cream on your partner’s body, then lick it off." },
    { text: "Try a new pick-up line on your partner." },
    { text: "Re-enact an X-rated version of your first kiss." },
    { text: "Play the rest of the game naked." },
    { text: "Feed your partner using only your mouth." },
    { text: "Give your significant other a full-body massage." },
    { text: "Act out the first time you slept together." },
    { text: "Have sex in a new part of the house for the first time." },
    { text: "Kiss your partner passionately, like the climax of a movie." },
    { text: "Perform a sexy pole dance with a broom or a mop." },
    { text: "Use body paint to turn each other into a work of art." },
    { text: "Twerk to the sexiest song you can think of." },
    { text: "Confess your kinky guilty pleasure and try it together." },
    { text: "Let your partner dress you up, then direct you in a striptease." },
    { text: "Challenge your loved one to a sexy pillow fight." },
    { text: "Spell out what you want to do to your partner using only emojis." },
    { text: "Pretend you work at a phone sex line and have your partner call in." },
    { text: "Blindfold yourself and guess which part of your partner’s body you’re touching." },
    { text: "Hide chocolate or candy in your clothes and have your significant other find it." },
    { text: "Send a sexy selfie when they least expect it." },
    { text: "Balance an ice cube on your belly button for as long as you can bear it." },
    { text: "Show your partner the last X-rated clip you watched and describe why it turned you on." },
    { text: "Put on your significant other’s underwear and strut your stuff on the catwalk." },
    { text: "Shave your partner’s body hair." },
    { text: "Pretend to give oral sex to the nearest object you see." },
    { text: "Try tantric sex." },
    { text: "Leave a steamy voicemail for an ex or another friend." },
    { text: "Lick peanut butter, whipped cream, or chocolate sauce off someone else’s finger." },
    { text: "Fake an orgasm for one minute." },
    { text: "Act out your favorite sex position with the person next to you." },
    { text: "Send a sexy selfie to someone in your contact list." },
    { text: "Take a body shot. Balance the glass in your cleavage or torso!" },
    { text: "Transfer an ice cube from your mouth to someone else’s." },
    { text: "Give a lap dance to a friend of your choice." },
    { text: "Snap a photo of a mystery part of your body and have the others guess." },
    { text: "Give someone in the room a genuine compliment without overthinking it." },
    { text: "Make eye contact with the person to your left for 15 seconds without laughing." },
    { text: "Send a random emoji to the last person you texted." },
    { text: "Act out what your ideal first date looks like—no explaining." },
    { text: "Pick a song you’d put on to set a flirty mood." },
    { text: "Describe your perfect romantic movie moment in one sentence." },
    { text: "Give your best confident walk across the room." },
    { text: "Send a 😏 emoji to the person you’re playing with." },
    { text: "Say one flirty sentence you’d feel confident texting someone." },
    { text: "Send the last emoji you used to the group chat. No context." },
    { text: "Do your best impression of someone trying way too hard on a first date." },
    { text: "Read your last text out loud like you’re auditioning for a soap opera." },
    { text: "Freestyle rap about our relationship." },
    { text: "Go live on any social media account and declare your love for me." },
    { text: "Let your partner give you a makeover." },
    { text: "I dare you to make-out with me, without feeling me up, for ten minutes straight." },
    { text: "I dare you to tease me by going down on me for as long as you can without making me orgasm." },
    { text: "I dare you to whisper the naughtiest thing you can think of into my ear." },
    { text: "I dare you to go online and order us the kinkiest sex toy you can find." },
    { text: "I dare you to unhook my bra with one hand." },
    { text: "I dare you to masturbate to a picture of me that you have stored in your phone." },
    { text: "I dare you to fuck me on the nearest surface we can find." },
    { text: "I dare you to cover one of your body parts in whipped cream, and then let me lick it off of you." },
    { text: "I dare you to go in the bathroom and take the sexiest nudes you can and then send them to me." },
    { text: "I dare you to take erotic pictures of me while I suck your dick." },
    { text: "I dare you to make me as horny as you possibly can without touching me." },
    { text: "I dare you to put on a porno I can watch while you eat me out." },
    { text: "I dare you to try on my underwear." },
    { text: "I dare you to spank me as hard as you possibly can." },
    { text: "I dare you to handcuff me to the bed and have your way with me." },
    { text: "I dare you to use one of my sex toys on your own body." },
    { text: "I dare you to do as many push-ups as you can. While naked." },
    { text: "I dare you to kiss me anywhere, except on my lips." },
    { text: "I dare you to fuck me in a position we’ve never tried before." },
    { text: "I dare you to send me the dirtiest sext you can come up with." },
    { text: "I dare you to make me orgasm, just by using your hands." },
    { text: "I dare you to guess what color underwear I’m wearing." },
    { text: "I dare you to be as loud as you can when you fuck me tonight." },
    { text: "I dare you to sketch a picture of me naked." },
    { text: "I dare you to bring me into the living room and fuck me in the middle of floor." },
    { text: "I dare you to go skinny dipping with me." },
    { text: "I dare you to blindfold me, and then kiss me somewhere I wouldn’t expect." },
    { text: "I dare you to take all of your clothes off, and keep them off for the rest of the game." },
    { text: "I dare you to strike the most seductive pose that you can." },
    { text: "I dare you to remove my underwear with your teeth." },
    { text: "I dare you to turn on the sexiest song on your iPod and give me a strip tease." },
    { text: "I dare you to make me orgasm before you orgasm tonight." },
    { text: "I dare you to watch me masturbate for as long as you can before grabbing me and fucking me yourself." },
    { text: "I dare you to make the most authentic orgasm sounds that you can." },
    { text: "I dare you to have sex with me for at least a half-hour before you orgasm." },
    { text: "I dare you to run your tongue across any area of my body that you choose." },
    { text: "I dare you to search through your closet and put on the sexiest item of clothing you own." },
    { text: "I dare you to put on your favorite porno, so I can see what you’re into." },
    { text: "I dare you to turn me on as much as you can by removing only one piece of your clothing." },
    { text: "I dare you to try your best to orgasm at the same time as me tonight." },
    { text: "I dare you to undress, and let me take a body shot off of you." },
    { text: "I dare you to write me an erotic story about what you want to do to me." },
    { text: "I dare you to masturbate at the same time as me." },
    { text: "I dare you to kiss me on your favorite area of my body." },
    { text: "I dare you to eat a banana as seductively as you can." },
    { text: "I dare you to role play as a celebrity who wants to bang me." },
    { text: "I dare you to make me orgasm harder than you ever have before." }
  ],
  situation: [
    { text: "Scenario: If suddenly at midnight I showed up at your doorstep unannounced, what would your very first reaction be?" },
    { text: "Scenario: If we magically woke up inside our absolute dream apartment together tomorrow, what room would we check first?" },
    { text: "Scenario: If distance didn't exist for just 24 hours, how would we spend every single minute?" },
    { text: "Scenario: If we were stuck in a private elevator for 3 hours right now, what would happen?" },
    { text: "Scenario: If you could replay one single day of us all over again, which one would it be?" },
    { text: "Scenario: If we got caught in the rain together with no umbrella, where would we run and what would we do?" },
    { text: "Scenario: If we had a lazy Sunday with nowhere to be, how would we spend in bed together?" },
    { text: "Scenario: If we were trapped on a remote island together with infinite supplies, what is the first thing we would do?" },
    { text: "Scenario: If you had to describe our long-distance love story as a movie genre, what would it be and why?" },
    { text: "Scenario: If we could teleport to any romantic city right this second, which place are we landing in?" }
  ]
};

export interface AllQuestionsTruthDareGameProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export default function CompleteGameComponent({
  isOpen = true,
  onClose,
  isModal = false
}: AllQuestionsTruthDareGameProps = {}) {
  const [gameState, setGameState] = useState<'spinning' | 'playing'>('spinning'); 
  const [selectedMode, setSelectedMode] = useState<'truth' | 'dare' | 'situation' | null>(null); 
  const [currentCard, setCurrentCard] = useState<GameCard | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinAngle, setSpinAngle] = useState<number>(0);
  const [isSyncMode, setIsSyncMode] = useState<boolean>(true); 

  if (isOpen === false) return null;

  const spinTheWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    const randomExtra = Math.floor(Math.random() * 360) + 1440;
    setSpinAngle(prev => prev + randomExtra);

    setTimeout(() => {
      setIsSpinning(false);
      const finalDeg = (spinAngle + randomExtra) % 360;
      let mode: 'truth' | 'dare' | 'situation' = 'truth';
      if (finalDeg >= 120 && finalDeg < 240) mode = 'dare';
      else if (finalDeg >= 240) mode = 'situation';

      setSelectedMode(mode);
      const pool = gameData[mode];
      const randomQ = pool[Math.floor(Math.random() * pool.length)];
      setCurrentCard(randomQ);
      setGameState('playing');
    }, 3000);
  };

  const resetGame = () => {
    setGameState('spinning');
    setSelectedMode(null);
    setCurrentCard(null);
  };

  const gameContent = (
    <div className="relative w-full flex flex-col items-center justify-center p-6 font-sans select-none">
      {/* Optional Close Button for Modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Close Game"
          aria-label="Close game"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="text-center mb-6 max-w-xl w-full">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          A UNIVERSE CALLED US — OUR COSMIC GAME
        </h1>
        
        <div className="flex items-center justify-center gap-3 mt-4 bg-white/5 border border-white/10 py-2 px-4 rounded-full w-fit mx-auto backdrop-blur-md">
          <span className="text-xs text-gray-300">Live Sync:</span>
          <button 
            onClick={() => setIsSyncMode(!isSyncMode)}
            className={`text-xs px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${isSyncMode ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-white/10 text-gray-400'}`}
          >
            {isSyncMode ? '🟢 Connected (Sync Active)' : '⚪ Solo Mode'}
          </button>
        </div>
      </div>

      {gameState === 'spinning' && (
        <div className="flex flex-col items-center my-6">
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            <div className="absolute -top-3 z-30 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-pink-500 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.9)]"></div>
            
            <div 
              className="w-full h-full rounded-full border-4 border-pink-500/50 relative overflow-hidden shadow-[0_0_35px_rgba(139,92,246,0.35)] transition-all ease-out duration-[3000ms]"
              style={{
                transform: `rotate(${spinAngle}deg)`,
                background: 'conic-gradient(#1e1b4b 0deg 120deg, #31103f 120deg 240deg, #0f172a 240deg 360deg)'
              }}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                <text x="50" y="28" fill="#f472b6" fontSize="8" fontWeight="900" textAnchor="middle" transform="rotate(60 50 50)" letterSpacing="1">TRUTH</text>
                <text x="50" y="28" fill="#c084fc" fontSize="8" fontWeight="900" textAnchor="middle" transform="rotate(180 50 50)" letterSpacing="1">DARE</text>
                <text x="50" y="28" fill="#818cf8" fontSize="7" fontWeight="900" textAnchor="middle" transform="rotate(300 50 50)" letterSpacing="0.5">SITUATION</text>
              </svg>
            </div>

            <button 
              onClick={spinTheWheel}
              disabled={isSpinning}
              className="absolute z-20 w-24 h-24 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(236,72,153,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-4 border-[#0B0F19] cursor-pointer"
            >
              {isSpinning ? 'SPINNING...' : 'SPIN!'}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-6 animate-pulse">
            {isSyncMode ? '🌟 Shivi & Rashi Sync Wheel Ready' : 'Tap the center to spin'}
          </p>
        </div>
      )}

      {gameState === 'playing' && currentCard && selectedMode && (
        <div className="flex flex-col items-center max-w-lg w-full my-6">
          <div className="w-full bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)] backdrop-blur-xl text-center relative">
            <div className="flex justify-center mb-4">
              <span className="text-[10px] uppercase tracking-widest bg-pink-500/20 text-pink-300 px-4 py-1 rounded-full border border-pink-500/30 font-bold">
                {selectedMode}
              </span>
            </div>

            <div className="my-8">
              <p className="text-lg md:text-xl font-medium text-white leading-relaxed">
                "{currentCard.text}"
              </p>
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <button 
                onClick={() => {
                  const pool = gameData[selectedMode];
                  const randomQ = pool[Math.floor(Math.random() * pool.length)];
                  setCurrentCard(randomQ);
                }}
                className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                Next Question
              </button>
              <button 
                onClick={resetGame}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
              >
                Spin Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
        <div className="relative w-full max-w-2xl bg-[#0B0F19] text-[#FFFFFF] border border-pink-500/40 rounded-3xl shadow-2xl p-2 sm:p-4 my-auto">
          {gameContent}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#FFFFFF] flex flex-col items-center justify-center p-6 font-sans">
      {gameContent}
    </div>
  );
}

// Aliases for seamless imports across all components
export const TruthDareWheelGame = CompleteGameComponent;
export const CleanTruthDareGame = CompleteGameComponent;
export const AllQuestionsTruthDareGame = CompleteGameComponent;
