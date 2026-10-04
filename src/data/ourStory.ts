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
    title: 'Where It Started',
    subtitle: 'The Earliest Spark',
    loreIntro:
      'Before the nicknames, before the 3 AM whispers, there was a single moment when our trajectories collided.',
    cluePrompt:
      'Inspect the chronological clues of our earliest match. In what month did our universe begin?',
    hint: 'Think back to the cold late autumn when two profiles matched right before winter.',
    answerKey: 'NOVEMBER',
    alternateAnswers: ['NOV', '11', 'NOVEMBER 2024', 'MONTH 11'],
    feedbackQuote: 'you remembered. the exact month our worlds collided.',
    memoryReward: {
      id: 'mem-1',
      title: 'The Spark of Us',
      icon: '✨',
      type: 'date',
      value: 'NOVEMBER',
      lore: 'The month the algorithm stopped being random and became destiny.'
    }
  },
  {
    id: 2,
    chapterNumber: '02',
    title: 'The Name You Gave Me',
    subtitle: 'The Floating Word Selector',
    loreIntro:
      'We never used ordinary names. One special word became our sacred currency of teasing and adoration.',
    cluePrompt:
      'Select the true affectionate nickname Shivi calls Rashi when teasing her in every single voice note.',
    hint: 'She whines "I am not chubby!" but secretly loves hearing it: "M---"',
    answerKey: 'MOTU',
    alternateAnswers: ['MOTA', 'MERI JAAN', 'WIFEYY'],
    feedbackQuote: 'that one was always ours. nobody else gets to call you that.',
    memoryReward: {
      id: 'mem-2',
      title: 'The True Name',
      icon: '🧸',
      type: 'word',
      value: 'MOTU',
      lore: 'Four letters that hold more warmth than an entire encyclopedia.'
    }
  },
  {
    id: 3,
    chapterNumber: '03',
    title: 'The Message Hunt',
    subtitle: 'The WhatsApp Archive',
    loreIntro:
      'Check your memory or your WhatsApp archive. When Shivi proposed her terms of love, what clause did she insist on?',
    cluePrompt:
      'Complete Shivi\'s exact sentence: "Meko aap hamesha saath chahiye... ________ tak nhi."',
    hint: 'Like a Bollywood film that never halts at the halfway popcorn break.',
    answerKey: 'INTERVAL',
    alternateAnswers: ['INTERVAL TAK NHI', 'INTERVAL TAK NAHI', 'INTERVAL TAK'],
    feedbackQuote: 'you never forgot that promise. not just for half the show, but for the entire lifetime.',
    memoryReward: {
      id: 'mem-3',
      title: 'The Eternal Clause',
      icon: '🎞️',
      type: 'secret',
      value: 'INTERVAL',
      lore: 'A love story that rejects the concept of an intermission.'
    }
  },
  {
    id: 4,
    chapterNumber: '04',
    title: 'Time Knows Everything',
    subtitle: 'The Timestamp & Call Duration Cipher',
    loreIntro:
      'On our longest midnight phone call, the clock ticked in secret code. Each digit mapped directly to a letter of destiny.',
    cluePrompt:
      'Decode the timestamp cipher [6-15-18-5-22-5-18] (where 1=A, 2=B... 6=F, 15=O...). What single word does our time spell?',
    hint: 'F - O - R - E - V - E - R',
    answerKey: 'FOREVER',
    alternateAnswers: ['FOR EVER', 'HAMESHA'],
    feedbackQuote: 'every second on call was bringing us closer to forever.',
    memoryReward: {
      id: 'mem-4',
      title: 'The Endless Call',
      icon: '⏱️',
      type: 'word',
      value: 'FOREVER',
      lore: 'A timestamp that outlasted all ordinary clocks.'
    }
  },
  {
    id: 5,
    chapterNumber: '05',
    title: 'Emoji Language',
    subtitle: 'The Secret Dialect',
    loreIntro:
      'When words feel too small, our chats speak in a sacred emoji sequence.',
    cluePrompt:
      'Translate Rashi\'s iconic response to the proposal: [💍 + 🤧 + 🔒] — Is it "TEMPORARY" or "PERMANENT"?',
    hint: '"It\'s _________ commitment frm my side 🤧"',
    answerKey: 'PERMANENT',
    alternateAnswers: ['PERMANENT COMMITMENT', 'PERMANENT COMMITMENT FRM MY SIDE'],
    feedbackQuote: 'one more piece of us ♡. signed, sealed, and permanent.',
    memoryReward: {
      id: 'mem-5',
      title: 'The Permanent Seal',
      icon: '💍',
      type: 'symbol',
      value: 'PERMANENT',
      lore: 'The word that banished all uncertainty from our hearts.'
    }
  },
  {
    id: 6,
    chapterNumber: '06',
    title: 'Listen Closely, Baby',
    subtitle: 'Audio Waveform & Rhythm Pulse',
    loreIntro:
      'Close your eyes and listen to the pulse. In Shivi\'s voice note, what is the exact number of kisses she demands?',
    cluePrompt:
      'Listen to Shivi\'s voice note: "Kiss toh mil sakti hai na? Bas ________, aur zyada nahi."',
    hint: 'Count the kisses on your fingers: not one, not two, but between three and four.',
    answerKey: '3-4',
    alternateAnswers: ['TEEN CHAR', '3 TO 4', '3', '4', 'TEEN-CHAR', 'THREE FOUR'],
    feedbackQuote: 'you listen to my heart even in total silence. all kisses granted!',
    memoryReward: {
      id: 'mem-6',
      title: 'The Kiss Demand',
      icon: '💋',
      type: 'secret',
      value: '3-4 KISSES',
      lore: 'The exact amount of affection demanded before bedtime.'
    }
  },
  {
    id: 7,
    chapterNumber: '07',
    title: 'The Things We Keep Saying',
    subtitle: 'Word Frequency Pattern',
    loreIntro:
      'Among thousands of text messages, one title echoes with pure tenderness. What does Rashi call Shivi in her hospital coma letter?',
    cluePrompt:
      'Find the word that begins the letter: "Heyy ________... i want you to read my message whenever you feel better."',
    hint: 'W - I - F - E - Y - Y (with two Y\'s!)',
    answerKey: 'WIFEYY',
    alternateAnswers: ['WIFEY', 'WIFEYYY', 'MY WIFEYY'],
    feedbackQuote: 'these words kept us alive through the darkest hospital halls.',
    memoryReward: {
      id: 'mem-7',
      title: 'The Sacred Title',
      icon: '💌',
      type: 'word',
      value: 'WIFEYY',
      lore: 'The title that proved our future was already decided.'
    }
  },
  {
    id: 8,
    chapterNumber: '08',
    title: 'The Red Thread',
    subtitle: 'Connecting the Nodes of Fate',
    loreIntro:
      'An invisible glowing thread of fate connects every milestone of our story in emotional order.',
    cluePrompt:
      'Order the four sacred milestones: [A: Tinder Match, B: Interval Proposal, C: Hospital Coma Letter, D: Paper Rings]. Enter the sequence (e.g. ABCD):',
    hint: 'Match first, then the proposal, then surviving the hospital together, then dancing to Paper Rings.',
    answerKey: 'ABCD',
    alternateAnswers: ['A B C D', 'A-B-C-D', '1234'],
    feedbackQuote: 'no matter how far apart, the thread never breaks.',
    memoryReward: {
      id: 'mem-8',
      title: 'The Unbreakable Thread',
      icon: '🧵',
      type: 'symbol',
      value: 'RED THREAD',
      lore: 'The crimson thread that wove through every tear and every laugh.'
    }
  },
  {
    id: 9,
    chapterNumber: '09',
    title: 'Constellation of Us',
    subtitle: 'Celestial Star Alignment',
    loreIntro:
      'Look into the sky canvas above. The stars align to draw the initial of the girl who owns Shivi\'s heart.',
    cluePrompt:
      'Which letter do our celestial stars form in the heavens?',
    hint: 'The first letter of the most beautiful girl in the universe: R----',
    answerKey: 'R',
    alternateAnswers: ['RASHI', 'LETTER R', 'HEART'],
    feedbackQuote: 'our universe was written in the stars all along.',
    memoryReward: {
      id: 'mem-9',
      title: 'Constellation R',
      icon: '⭐',
      type: 'symbol',
      value: 'CONSTELLATION R',
      lore: 'A stellar pattern mapped to Rashi\'s smile.'
    }
  },
  {
    id: 10,
    chapterNumber: '10',
    title: 'The Fake Path',
    subtitle: 'The Red Herring Riddle',
    loreIntro:
      'Beware of superficial logic. A stranger might think our love is ordinary, but your heart knows the truth.',
    cluePrompt:
      'A false riddle asks: "Was this relationship built just for the fun of dating?" Type what Shivi truly wanted: "TEMPORARY" or "LIFETIME"?',
    hint: 'If you choose temporary, Shivi will softly correct you. Choose what we promised.',
    answerKey: 'LIFETIME',
    alternateAnswers: ['LIFE', 'LIFE PARTNER', 'PERMANENT', 'ZINDAGI'],
    feedbackQuote: 'you see right through the world to what is true. never temporary... always lifetime.',
    memoryReward: {
      id: 'mem-10',
      title: 'The True Compass',
      icon: '🧭',
      type: 'secret',
      value: 'LIFETIME',
      lore: 'The refusal to settle for anything less than a shared lifetime.'
    }
  },
  {
    id: 11,
    chapterNumber: '11',
    title: 'The Final Lock',
    subtitle: 'The Grand Meta-Puzzle',
    loreIntro:
      'All ten collected keys from your Memory Pocket converge here. Combine the pieces to open the sanctuary of our future.',
    cluePrompt:
      'Assemble the master passphrase combining our song and our ring: What kind of rings will we marry with? "PAPER ______"',
    hint: 'Taylor Swift sings it loud and proud: "PAPER RINGS"',
    answerKey: 'RINGS',
    alternateAnswers: ['PAPER RINGS', 'RING', 'PAPER RING'],
    feedbackQuote: 'THE FINAL LOCK IS BROKEN. Come here, my love... ♡',
    memoryReward: {
      id: 'mem-11',
      title: 'The Key to Us',
      icon: '👑',
      type: 'secret',
      value: 'PAPER RINGS',
      lore: 'The master key that unlocks the ultimate question.'
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
