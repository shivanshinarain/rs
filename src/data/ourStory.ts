/**
 * A UNIVERSE CALLED US — Centralized Romantic Data Store
 * Crafted by Shivi for Rashi
 * 
 * Contains:
 * - 20 Curated Story Moments (ROMANTIC, FUNNY, EMOTIONAL, PUZZLE-WORTHY, MILESTONES, PROPOSAL-WORTHY)
 * - 11 ARG Puzzle Chapters & Meta-Vault Keys
 * - Authentic Lore, Letters, Voice Notes, Nicknames, and Promises
 */

export type MomentCategory =
  | 'ROMANTIC'
  | 'FUNNY'
  | 'EMOTIONAL'
  | 'PUZZLE-WORTHY'
  | 'MILESTONES'
  | 'PROPOSAL-WORTHY';

export interface StoryMoment {
  id: number;
  category: MomentCategory;
  title: string;
  date: string;
  tagline: string;
  excerpt: string;
  details: string;
  image: string;
  audioSnippet?: string;
  secretKey?: string;
  unlockedItem?: {
    name: string;
    icon: string;
    description: string;
    keyPiece: string;
  };
}

export interface PuzzleChapter {
  id: number;
  chapterNumber: string;
  title: string;
  subtitle: string;
  loreIntro: string;
  cluePrompt: string;
  hint: string;
  answerKey: string; // Case-insensitive normalized answer
  alternateAnswers?: string[];
  feedbackQuote: string; // "you remembered.", "that one was always ours."
  memoryReward: {
    id: string;
    title: string;
    icon: string;
    type: 'word' | 'date' | 'symbol' | 'secret';
    value: string;
    lore: string;
    metaPiece?: string;
  };
}

export const OUR_LORE = {
  couple: {
    shivi: {
      name: 'Shivi',
      role: 'The Girl with the Hoops & Oversized Sweaters',
      avatar: '/assets/shivi_rashi_cartoon.jpg',
      nicknames: ['Shivi', 'Wifeyy', 'Bebu', 'Mota'],
      voiceNoteSrc: '/assets/shivi_voice_note.webm',
      voiceNoteDuration: '0:45',
      kissDemand: 'Bas 3-4 Kisses... Aur Zyada Nahi 💋'
    },
    rashi: {
      name: 'Rashi',
      role: 'The Girl in the Cozy Lavender Hoodie',
      avatar: '/assets/shivi_rashi_cartoon_sleep_call.jpg',
      nicknames: ['Rashi', 'Motu', 'Meri Jaan', 'Ashi', 'Sleepyhead'],
      voiceNoteSrc: '/assets/rashi_sleepy_voice_note.webm',
      voiceNoteDuration: '1:11',
      sleepStatus: 'Currently Sleeping in Bed 😴🌙'
    }
  },
  proposalWords: {
    shiviSpoke:
      "I want u in my life\nNot as a friend but as a gf as a life partner\nAnd meko aap hamesha saath chahiye … interval tak nhi\nI genuinely like you",
    rashiAnswered:
      "Okay...then yess i'll be with u not temporary, it's permanent commitment frm my side 🤧",
    comaLetter:
      "Heyy wifeyy... i want you to read my message whenever you feel better. I know my shivi will recover soon and then we'll be happy together again like we used to be... From now on no more fights or arguments... We promised to stay together for life and we will just get well soon... I miss you so much... Please don't leave your rashi alone like this. Come back soon, talk to me, tease me, roast me... Don't leave me, my life feeling so empty... I have so many complaints to tell you because no one understands me the way you do, only my shivi truly understands me. And now I've become okay too so you get well for me. When you recover all I want is a sweet little text from my wifey."
  },
  soundtrack: {
    title: 'Paper Rings',
    artist: 'Taylor Swift',
    audioSrc: '/assets/paper_rings.mp3',
    lyricsHook: "I like shiny things, but I'd marry you with paper rings! Uh-huh, that's right, darling you're the one I want!"
  }
};

// 20 Selected Story Moments Categorized
export const TWENTY_MOMENTS: StoryMoment[] = [
  {
    id: 1,
    category: 'MILESTONES',
    title: 'The Tinder Swipe Right',
    date: 'Day 0',
    tagline: 'When the algorithm got something completely right',
    excerpt: 'One casual swipe across screens that bridged two galaxies together.',
    details: 'Out of millions of strangers scrolling in the dark, two souls crossed paths. Little did we know this one right swipe would redefine our whole lifetime.',
    image: '/assets/shivi_rashi_cartoon.jpg',
    unlockedItem: {
      name: 'Algorithm of Destiny',
      icon: '✨',
      description: 'The moment two worlds aligned on a single screen.',
      keyPiece: 'NOV'
    }
  },
  {
    id: 2,
    category: 'ROMANTIC',
    title: 'The First 3 AM Call That Never Ended',
    date: 'Week 1',
    tagline: 'When sleep became a second priority to your voice',
    excerpt: '"Just 10 minutes" turned into sunrise peeking through the curtains.',
    details: 'Neither of us wanted to say bye first. Whispering in blankets while the rest of the world was asleep, finding home in a phone call.',
    image: '/assets/shivi_rashi_cartoon_sleep_call.jpg',
    unlockedItem: {
      name: 'Midnight Dial',
      icon: '📞',
      description: 'The secret frequency where hours feel like seconds.',
      keyPiece: '03:42'
    }
  },
  {
    id: 3,
    category: 'FUNNY',
    title: 'The Nickname "Motu" Is Born',
    date: 'Month 1',
    tagline: 'Born from teasing, sealed into eternal love',
    excerpt: 'Started as a light roast, ended as the sweetest endearment.',
    details: 'You pouted and pretended to be mad, but your smile gave you away. From that day on, "Motu" belonged to nobody else in the universe.',
    image: '/assets/shivi_rashi_stickers.jpg',
    unlockedItem: {
      name: 'Motu Badge',
      icon: '🧸',
      description: 'The trademark of unconditional affection.',
      keyPiece: 'MOTU'
    }
  },
  {
    id: 4,
    category: 'PUZZLE-WORTHY',
    title: 'The Secret WhatsApp Cipher',
    date: 'Month 2',
    tagline: 'A dialect composed of half-words and custom stickers',
    excerpt: 'Inside jokes that would look like alien hieroglyphics to anyone else.',
    details: 'Our chats became a constellation of custom stickers, memes, and unspoken codes where one punctuation mark explains everything.',
    image: '/assets/shivi_rashi_doodle_couch.jpg',
    secretKey: 'CIPHER',
    unlockedItem: {
      name: 'Decoder Ring',
      icon: '🔍',
      description: 'The key that translates silence into love.',
      keyPiece: 'CODE'
    }
  },
  {
    id: 5,
    category: 'ROMANTIC',
    title: 'Kiss Demands: "Bas Teen-Char"',
    date: 'Every Single Day',
    tagline: 'The strict negotiation of hugs and kisses',
    excerpt: '"Kiss toh mil sakti hai na? Bas teen-char, aur zyada nahi!"',
    details: 'Shivi recording voice notes with that cute pleading tone, asking for just 3-4 kisses, and then blushing: "Nahi bataungi main jao, niklo yahan se! Love you mota!"',
    image: '/assets/shivi_rashi_cartoon.jpg',
    audioSnippet: '/assets/shivi_voice_note.webm',
    unlockedItem: {
      name: 'Kiss Voucher',
      icon: '💋',
      description: 'Redeemable for infinite forehead and cheek kisses.',
      keyPiece: 'KISS'
    }
  },
  {
    id: 6,
    category: 'PROPOSAL-WORTHY',
    title: 'Interval Tak Nhi — The Proposal',
    date: 'The Defining Moment',
    tagline: 'Not just for a movie, but for the entire feature film of life',
    excerpt: '"I want u in my life... meko aap hamesha saath chahiye, interval tak nhi."',
    details: 'Shivi laid her heart bare. Not as a temporary companion, not as just another friend, but as a girlfriend and future life partner.',
    image: '/assets/shivi_rashi_cartoon_proposal.jpg',
    unlockedItem: {
      name: 'Interval Vow',
      icon: '🎞️',
      description: 'A love story that never ends at the intermission.',
      keyPiece: 'INTERVAL'
    }
  },
  {
    id: 7,
    category: 'MILESTONES',
    title: 'Permanent Commitment Frm My Side 🤧',
    date: 'The Sacred Yes',
    tagline: 'Rashi seals the promise forever',
    excerpt: '"Okay... then yess i\'ll be with u not temporary, it\'s permanent commitment frm my side."',
    details: 'With sniffling emojis and an overflowing heart, Rashi accepted Shivi\'s proposal, transforming a long-distance connection into an unbreakable bond.',
    image: '/assets/shivi_rashi_doodle_proposal.jpg',
    unlockedItem: {
      name: 'Permanent Seal',
      icon: '💍',
      description: 'The signed pact of lifelong companionship.',
      keyPiece: 'PERMANENT'
    }
  },
  {
    id: 8,
    category: 'EMOTIONAL',
    title: 'The Coma Letter — "Heyy Wifeyy"',
    date: 'Our Darkest Night',
    tagline: 'The prayer sent across the silence when Shivi was in hospital',
    excerpt: '"Please don\'t leave your rashi alone like this... talk to me, tease me, roast me."',
    details: 'When Shivi lay unconscious in hospital, Rashi wrote the most heartbreaking and devoted message. Pledging no more fights, pleading for Shivi to wake up so she could receive a sweet text from her wifey.',
    image: '/assets/shivi_rashi_cartoon_stargazing.jpg',
    unlockedItem: {
      name: 'Unshakable Faith',
      icon: '🕯️',
      description: 'The golden letter written through tears in the dark.',
      keyPiece: 'WIFEYY'
    }
  },
  {
    id: 9,
    category: 'EMOTIONAL',
    title: 'The Awakening Text',
    date: 'The Rebirth',
    tagline: 'The sweet little text that broke the silence',
    excerpt: 'Waking up to read the words of the girl who prayed every second.',
    details: 'The monitor beeped, the eyes fluttered open, and the first thought in Shivi\'s mind was Rashi. The promise was kept: we survived the storm together.',
    image: '/assets/shivi_rashi_cartoon.jpg',
    unlockedItem: {
      name: 'Morning Light',
      icon: '🌅',
      description: 'Proof that true love pulls you back from the abyss.',
      keyPiece: 'AWAKE'
    }
  },
  {
    id: 10,
    category: 'ROMANTIC',
    title: 'Paper Rings Anthem',
    date: 'Soundtrack of Us',
    tagline: 'I would marry you with paper rings',
    excerpt: '"I like shiny things, but I\'d marry you with paper rings! You\'re the one I want!"',
    details: 'Taylor Swift playing on loop while we dance across video calls. We don\'t need diamonds or grandeur; folded notebook paper wrapped around your finger means everything.',
    image: '/assets/shivi_rashi_cartoon_proposal.jpg',
    audioSnippet: '/assets/paper_rings.mp3',
    unlockedItem: {
      name: 'Origami Paper Ring',
      icon: '📜',
      description: 'Simple, delicate, and worth more than gold.',
      keyPiece: 'PAPER'
    }
  },
  {
    id: 11,
    category: 'FUNNY',
    title: 'Sleepy Rashi Mumbles Live',
    date: 'Midnight Live',
    tagline: '"Mujhe bohot gandi wali neend aa rahi hai..."',
    excerpt: 'Shivi begging her to say "I love you" while Rashi drifts off into dreamland.',
    details: 'Shivi teasing: "Ashi... I love you toh bol do! Motu, tez bolo thoda!" Rashi whining sleepily: "I love you yaar... I love you, Shivi... ♡" and Shivi laughing softly in pure joy.',
    image: '/assets/shivi_rashi_cartoon_sleep_call.jpg',
    audioSnippet: '/assets/rashi_sleepy_voice_note.webm',
    unlockedItem: {
      name: 'Sleepy Pillow',
      icon: '🌙',
      description: 'The half-asleep whisper of absolute adoration.',
      keyPiece: 'SLEEP'
    }
  },
  {
    id: 12,
    category: 'MILESTONES',
    title: 'The Airport Arrivals Hug',
    date: 'Reunion Day',
    tagline: 'Zero distance after thousands of kilometers',
    excerpt: 'Dropping luggage on the floor and spinning around in each other\'s arms.',
    details: 'Walking past sliding glass doors, spotting the oversized lavender hoodie and hoops, and running full speed. The long distance evaporated in one single breath.',
    image: '/assets/shivi_rashi_cartoon_airport_hug.jpg',
    unlockedItem: {
      name: 'Boarding Pass to Forever',
      icon: '✈️',
      description: 'Distance was only a test to see how far love could travel.',
      keyPiece: 'REUNION'
    }
  },
  {
    id: 13,
    category: 'ROMANTIC',
    title: 'Under the Cold Stargazing Sky',
    date: 'Hilltop Night',
    tagline: 'One blanket, two pairs of freezing hands, warm thermos',
    excerpt: 'Looking at billions of stars and realizing you are my whole sky.',
    details: 'Sitting together with shoulders pressed close, sharing a warm drink, counting shooting stars and wishing for the exact same future together.',
    image: '/assets/shivi_rashi_cartoon_stargazing.jpg',
    unlockedItem: {
      name: 'Star Map of Us',
      icon: '🌌',
      description: 'The coordinates where two constellations merged.',
      keyPiece: 'STARS'
    }
  },
  {
    id: 14,
    category: 'FUNNY',
    title: 'The Lavender Hoodie Theft',
    date: 'The Crime',
    tagline: 'What is yours is mine, especially the warm clothes',
    excerpt: '"I am not giving this hoodie back, it smells like you."',
    details: 'Rashi claiming Shivi\'s hoodie (or Shivi claiming Rashi\'s lavender hoodie) and wearing it like royal armor for weeks. A souvenir of love.',
    image: '/assets/shivi_rashi_stickers.jpg',
    unlockedItem: {
      name: 'Oversized Hoodie',
      icon: '🧥',
      description: 'The coziest proof of affectionate theft.',
      keyPiece: 'HOODIE'
    }
  },
  {
    id: 15,
    category: 'PUZZLE-WORTHY',
    title: 'The Call Duration Riddle',
    date: 'Record Night',
    tagline: 'Numbers that hide a secret love message',
    excerpt: 'Hundreds of hours logged on voice calls, each digit encoding a promise.',
    details: 'When you take our longest call duration and translate the frequency into words, only one truth emerges: FOREVER.',
    image: '/assets/shivi_rashi_cartoon_sleep_call.jpg',
    unlockedItem: {
      name: 'Stopwatch of Eternity',
      icon: '⏱️',
      description: 'Time stopped keeping track because love outgrew clocks.',
      keyPiece: 'TIME'
    }
  },
  {
    id: 16,
    category: 'EMOTIONAL',
    title: 'Decades After Every Fight',
    date: 'Every Reconciliation',
    tagline: '"No more fights... we promised to stay together for life"',
    excerpt: 'Arguments burn away in 10 minutes because losing you is unthinkable.',
    details: 'Even when we sulk or complain, Shivi comes with: "Pagal kar degi ye ladki 😭" and Rashi giggles: "Ho jao na mere pyaar mein pagal ♡".',
    image: '/assets/shivi_rashi_doodle_couch.jpg',
    unlockedItem: {
      name: 'Olive Branch',
      icon: '🕊️',
      description: 'The golden rule: love is always bigger than ego.',
      keyPiece: 'PEACE'
    }
  },
  {
    id: 17,
    category: 'FUNNY',
    title: 'The Great Food Debate',
    date: 'Every Food Order',
    tagline: '"You pick" ... "No, you pick"',
    excerpt: '30 minutes spent deciding what to eat, ending up sharing one plate.',
    details: 'Fighting over the last bite of pizza or French fries, only to push it onto the other\'s plate with a grin.',
    image: '/assets/shivi_rashi_stickers.jpg',
    unlockedItem: {
      name: 'Last Slice of Pizza',
      icon: '🍕',
      description: 'Always surrendered to the one you love most.',
      keyPiece: 'TREAT'
    }
  },
  {
    id: 18,
    category: 'PUZZLE-WORTHY',
    title: 'The Constellation Alignment',
    date: 'The Night Sky',
    tagline: 'Stars that spell our initial in the heavens',
    excerpt: 'Connecting the glowing celestial dots above our heads.',
    details: 'In the vastness of the universe, our stars align into an "R" that pulses in rhythm with a heart.',
    image: '/assets/shivi_rashi_cartoon_stargazing.jpg',
    unlockedItem: {
      name: 'Celestial Compass',
      icon: '🧭',
      description: 'Points directly toward Rashi\'s heart.',
      keyPiece: 'CELESTIAL'
    }
  },
  {
    id: 19,
    category: 'PROPOSAL-WORTHY',
    title: 'The Four Doors to Our Future',
    date: 'Tomorrow and Beyond',
    tagline: 'The house we are building together brick by brick',
    excerpt: 'Closing the gap, cozy blanket days, paper ring wedding, growing old together.',
    details: 'Every door leads to the same destination: waking up beside you, making coffee together, and holding hands at 80 years old.',
    image: '/assets/shivi_rashi_cartoon_proposal.jpg',
    unlockedItem: {
      name: 'Golden Key of Future',
      icon: '🗝️',
      description: 'Opens every door to a lifetime shared.',
      keyPiece: 'DOORS'
    }
  },
  {
    id: 20,
    category: 'PROPOSAL-WORTHY',
    title: 'A Universe Called Us',
    date: 'Forever',
    tagline: 'The ultimate question and the eternal answer',
    excerpt: '"Will you be my wifeyy, my partner, my forever, with paper rings?"',
    details: 'Not temporary. Not until the interval. Poori zindagi tak. A permanent commitment from Shivi to Rashi.',
    image: '/assets/shivi_rashi_cartoon_proposal.jpg',
    unlockedItem: {
      name: 'Crown of Forever',
      icon: '👑',
      description: 'The master artifact of our ARG journey.',
      keyPiece: 'FOREVER'
    }
  }
];

// The 11 ARG Puzzle Chapters
export const ARG_PUZZLE_CHAPTERS: PuzzleChapter[] = [
  {
    id: 1,
    chapterNumber: '01',
    title: '♡ where it started',
    subtitle: 'The Earliest Spark',
    loreIntro:
      'Before the 3 AM whispers, there was a single moment when our trajectories collided and the first sweet goodbye was said.',
    cluePrompt:
      'What was the sacred closing word of our earliest chat before falling asleep smiling?',
    hint: 'think about when we were still strangers. A gentle whisper to wish sweet dreams: "G---N----"',
    answerKey: 'GOODNIGHT',
    alternateAnswers: ['GOOD NIGHT', 'NOVEMBER', 'NOV', '11', 'NOVEMBER 2024'],
    feedbackQuote: 'you remembered. the exact word that started every midnight habit.',
    memoryReward: {
      id: 'mem-1',
      title: 'The Spark of Us',
      icon: '✨',
      type: 'word',
      value: 'GOODNIGHT',
      lore: 'Piece 1 of our eternal phrase: [I]',
      metaPiece: 'I'
    }
  },
  {
    id: 2,
    chapterNumber: '02',
    title: '♡ the name you gave me',
    subtitle: 'The Sacred Nickname',
    loreIntro:
      'We never used ordinary names. One special, waddling, beloved creature became our sacred nickname.',
    cluePrompt:
      'Select the secret bird nickname that only belongs to us in our chats.',
    hint: 'remember what you called me. Waddles with cold feet, cute and protective: "P------"',
    answerKey: 'PENGUIN',
    alternateAnswers: ['CHOTU', 'MOTU', 'MERI JAAN', 'WIFEYY', 'MOTA'],
    feedbackQuote: 'that one was always ours. my little penguin.',
    memoryReward: {
      id: 'mem-2',
      title: 'The True Nickname',
      icon: '🐧',
      type: 'word',
      value: 'PENGUIN',
      lore: 'Piece 2 of our eternal phrase: [ ]',
      metaPiece: ' '
    }
  },
  {
    id: 3,
    chapterNumber: '03',
    title: '♡ remember this?',
    subtitle: 'The Studio Text',
    loreIntro:
      'Check your memory or your WhatsApp archive. When distance felt unbearable, what message did you send while waiting near Gomti nagar?',
    cluePrompt:
      'Complete your exact message: "I\'m near Gomti nagar studio p aai hu ________ ?"',
    hint: 'you\'ve seen this before, love. Two words: "W---- M---"',
    answerKey: 'WANNA MEET',
    alternateAnswers: ['WANNAMEET', 'MEET', 'INTERVAL', 'INTERVAL TAK NHI'],
    feedbackQuote: 'soon, every single time. no more screens between us.',
    memoryReward: {
      id: 'mem-3',
      title: 'The Studio Memory',
      icon: '✈️',
      type: 'secret',
      value: 'WANNA MEET',
      lore: 'Piece 3 of our eternal phrase: [C]',
      metaPiece: 'C'
    }
  },
  {
    id: 4,
    chapterNumber: '04',
    title: '♡ somewhere between the words',
    subtitle: 'The Timestamp Cipher',
    loreIntro:
      'On our longest midnight phone call, the clock ticked in secret code. Four letters that govern everything we feel.',
    cluePrompt:
      'Decode the timestamp cipher [12-15-22-5]. What single four-letter truth does our time spell?',
    hint: 'look at the time, not the words. 12=L, 15=O, 22=V, 5=E.',
    answerKey: 'LOVE',
    alternateAnswers: ['FOREVER', 'HAMESHA', 'I LOVE YOU'],
    feedbackQuote: 'every second on call was bringing us deeper into love.',
    memoryReward: {
      id: 'mem-4',
      title: 'The Endless Call',
      icon: '⏱️',
      type: 'word',
      value: 'LOVE',
      lore: 'Piece 4 of our eternal phrase: [H]',
      metaPiece: 'H'
    }
  },
  {
    id: 5,
    chapterNumber: '05',
    title: '♡ listen closely, baby',
    subtitle: 'The Pet Name Secret',
    loreIntro:
      'When words feel too small, our chats speak in our favorite teasing pet name.',
    cluePrompt:
      'The cutest diminutive nickname Shivi calls her girl: "C----"',
    hint: 'don\'t overthink it, penguin. It pairs with Penguin: "C----"',
    answerKey: 'CHOTU',
    alternateAnswers: ['PENGUIN', 'PERMANENT', 'PERMANENT COMMITMENT'],
    feedbackQuote: 'my chotu, my favourite human in the entire universe ♡.',
    memoryReward: {
      id: 'mem-5',
      title: 'The Little One',
      icon: '🧸',
      type: 'word',
      value: 'CHOTU',
      lore: 'Piece 5 of our eternal phrase: [O]',
      metaPiece: 'O'
    }
  },
  {
    id: 6,
    chapterNumber: '06',
    title: '♡ the little things',
    subtitle: 'Audio Waveform & The Sacred Confession',
    loreIntro:
      'Close your eyes and listen to the pulse. What is the three-word confession whispered at the end of the voice note?',
    cluePrompt:
      'Listen to Shivi\'s voice note: after asking for 3-4 kisses, what does she say? "I ______ ______"',
    hint: 'you already know this one. Three words, eight letters: I L--- Y--',
    answerKey: 'I LOVE YOU',
    alternateAnswers: ['ILOVEYOU', '3-4', 'TEEN CHAR', '3', '4'],
    feedbackQuote: 'i love you. more than every star in the sky.',
    memoryReward: {
      id: 'mem-6',
      title: 'The Voice Note Confession',
      icon: '🎙️',
      type: 'secret',
      value: 'I LOVE YOU',
      lore: 'Piece 6 of our eternal phrase: [O]',
      metaPiece: 'O'
    }
  },
  {
    id: 7,
    chapterNumber: '07',
    title: '♡ follow the thread',
    subtitle: 'Recurring Whispers',
    loreIntro:
      'Among thousands of text messages, three words echo endlessly through the hospital halls and quiet mornings.',
    cluePrompt:
      'What is the promise that never changed even on our hardest nights?',
    hint: 'The three words that kept us holding on: "I L--- Y--"',
    answerKey: 'I LOVE YOU',
    alternateAnswers: ['ILOVEYOU', 'WIFEYY', 'WIFEY', 'MY WIFEYY'],
    feedbackQuote: 'these three words pulled us through every storm.',
    memoryReward: {
      id: 'mem-7',
      title: 'The Sacred Vow',
      icon: '💌',
      type: 'word',
      value: 'I LOVE YOU',
      lore: 'Piece 7 of our eternal phrase: [S]',
      metaPiece: 'S'
    }
  },
  {
    id: 8,
    chapterNumber: '08',
    title: '♡ one more secret',
    subtitle: 'Connecting the Nodes of Fate',
    loreIntro:
      'An invisible glowing thread of fate connects every milestone. What two letters represent our combined existence?',
    cluePrompt:
      'Not me alone, not you alone, but: "U-"',
    hint: 'you were never following the thread... you were U-S.',
    answerKey: 'US',
    alternateAnswers: ['ABCD', 'RED THREAD', 'OUR STORY'],
    feedbackQuote: 'no matter how far apart, the thread only ever points to US.',
    memoryReward: {
      id: 'mem-8',
      title: 'The Unbreakable Bond',
      icon: '🧵',
      type: 'symbol',
      value: 'US',
      lore: 'Piece 8 of our eternal phrase: [E]',
      metaPiece: 'E'
    }
  },
  {
    id: 9,
    chapterNumber: '09',
    title: '♡ almost there, baby',
    subtitle: 'Celestial Star Alignment',
    loreIntro:
      'Look into the sky canvas above. The stars align to draw the name of the girl who owns Shivi\'s heart.',
    cluePrompt:
      'Which name do our celestial stars form in the heavens?',
    hint: 'The letter R reveals the most beautiful name: R-A-S-H-I',
    answerKey: 'RASHI',
    alternateAnswers: ['R', 'LETTER R', 'HEART'],
    feedbackQuote: 'our universe was written for Rashi all along.',
    memoryReward: {
      id: 'mem-9',
      title: 'Constellation Rashi',
      icon: '⭐',
      type: 'symbol',
      value: 'RASHI',
      lore: 'Piece 9 of our eternal phrase: [ ]',
      metaPiece: ' '
    }
  },
  {
    id: 10,
    chapterNumber: '10',
    title: '♡ something i never told you',
    subtitle: 'The Red Herring Riddle',
    loreIntro:
      'Beware of superficial logic. A stranger might think this is temporary, but the universe knows who we are.',
    cluePrompt:
      'In a world of temporary things, what are we building together?',
    hint: 'No matter which path you explore, it always leads back to: "U-"',
    answerKey: 'US',
    alternateAnswers: ['LIFETIME', 'LIFE PARTNER', 'PERMANENT', 'ZINDAGI'],
    feedbackQuote: 'never temporary... always US, for a lifetime.',
    memoryReward: {
      id: 'mem-10',
      title: 'The Eternal Identity',
      icon: '🧭',
      type: 'secret',
      value: 'US',
      lore: 'Piece 10 of our eternal phrase: [Y]',
      metaPiece: 'Y'
    }
  },
  {
    id: 11,
    chapterNumber: '11',
    title: '♡ for you, my love',
    subtitle: 'The Grand Meta-Puzzle',
    loreIntro:
      'All ten collected keys from your Memory Pocket converge here. Enter the sacred password that unlocks the sanctuary of our future.',
    cluePrompt:
      'Enter the master key of our private universe (our secret password):',
    hint: 'Nickname + Date: "ChotuPenguin2211"',
    answerKey: 'CHOTUPENGUIN2211',
    alternateAnswers: ['RINGS', 'PAPER RINGS', 'PAPER RINGS BY TAYLOR SWIFT'],
    feedbackQuote: 'THE FINAL LOCK IS BROKEN. All pieces assembled: I CHOOSE YOU ♡',
    memoryReward: {
      id: 'mem-11',
      title: 'The Master Vow: I CHOOSE YOU',
      icon: '👑',
      type: 'secret',
      value: 'I CHOOSE YOU',
      lore: 'All 11 pieces combined into our eternal promise: I CHOOSE YOU',
      metaPiece: 'OU♡'
    }
  }
];

export const MEMORY_POCKET_INITIAL = [
  {
    id: 'intro-coin',
    title: 'Two Star Swipes',
    icon: '✨',
    type: 'symbol' as const,
    value: 'SWIPE RIGHT',
    lore: 'The cosmic coin that started it all.'
  }
];
