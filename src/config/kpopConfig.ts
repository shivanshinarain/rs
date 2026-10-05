/**
 * A UNIVERSE CALLED US — K-POP EMERGENCY LINE CONFIGURATION
 * 
 * IMPORTANT:
 * If Rashi's actual favourite K-pop artists are known, replace the placeholders below.
 * Shivi can update or edit these groups/biases at any time.
 */

export interface KpopHero {
  id: string;
  groupName: string;
  bias?: string;
  emoji: string;
  themeColor: string;
  dialogue: string[];
  interactionType: 'dance' | 'choice' | 'puzzle' | 'battle';
}

export const KPOP_CONFIG = {
  // Central editable list of Rashi's favourite K-pop artists/groups
  favoriteKpop: [
    {
      id: 'bts',
      groupName: 'BTS', // [EDITABLE PLACEHOLDER: Replace with Rashi's favourite group]
      bias: 'Jungkook / Jimin',
      emoji: '💜',
      themeColor: '#9333ea',
      dialogue: [
        'Rashi, go eat! Shivi is worried about you.',
        'Health comes first, always.',
        'You need energy to smile today ♡'
      ],
      interactionType: 'dance' as const
    },
    {
      id: 'blackpink',
      groupName: 'BLACKPINK', // [EDITABLE PLACEHOLDER: Replace with Rashi's favourite group]
      bias: 'Jennie / Jisoo',
      emoji: '🖤',
      themeColor: '#ec4899',
      dialogue: [
        'Baby don’t skip your meals!',
        'Listen to your wifey, she loves you.',
        'Shivi is right, go eat now.'
      ],
      interactionType: 'choice' as const
    },
    {
      id: 'straykids',
      groupName: 'Stray Kids', // [EDITABLE PLACEHOLDER: Replace with Rashi's favourite group]
      bias: 'Hyunjin / Felix',
      emoji: '⚡',
      themeColor: '#ef4444',
      dialogue: [
        'No food = no energy to dance!',
        'Take your medicine right now, Rashi!',
        'We’re watching you 👀'
      ],
      interactionType: 'puzzle' as const
    },
    {
      id: 'enhypen',
      groupName: 'ENHYPEN', // [EDITABLE PLACEHOLDER: Replace with Rashi's favourite group]
      bias: 'Jungwon / Sunoo',
      emoji: '🌙',
      themeColor: '#3b82f6',
      dialogue: [
        'Take care of yourself, please.',
        'Shivi has been panicking for two hours.',
        'Crisis averted when you eat ♡'
      ],
      interactionType: 'battle' as const
    }
  ],

  // Hidden Message Tiles for puzzle mode
  hiddenMessageLetters: ['E', 'A', 'T', ' ', 'Y', 'O', 'U', 'R', ' ', 'F', 'O', 'O', 'D'],

  // Secret Squad unlock banner
  squadUnlockedTitle: "RASHI HAS SUMMONED THE SQUAD ♡",
  squadUnlockedSubtext: "all your favourite idols stand with Shivi. there is nowhere left to hide."
};
