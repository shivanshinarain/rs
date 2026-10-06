/**
 * A UNIVERSE CALLED US — Central Birthday & Milestone Configuration
 * 
 * Rashi: Born 12 November 2005 (Turns 21 on 12 November 2026)
 * Shivi: Born 8 September 2003 (Turns 23 on 8 September 2026)
 * 
 * Date-gating rule:
 * Before 12 November 2026 (local time): Birthday section is LOCKED with countdown and "not yet, love...".
 * On/after 12 November 2026 (local time): Birthday section displays the password screen.
 */

export const BIRTHDAY_CONFIG = {
  rashi: {
    name: 'Rashi',
    birthDate: '12 November 2005',
    targetBirthday: '12 November 2026',
    turningAge: 21,
    sign: 'Scorpio ♏︎',
    element: 'Water'
  },
  shivi: {
    name: 'Shivi',
    birthDate: '8 September 2003',
    turningAge: 23,
    sign: 'Virgo ♍︎',
    element: 'Earth'
  },
  targetYear: 2026,
  targetMonth: 10, // 0-indexed: 10 = November
  targetDay: 12,

  // Central configurable password to unlock the 21st Birthday section on 12 November
  password: 'chotupenguin21',
  alternatePasswords: [
    'shivirashi',
    'chotu21',
    'rashi21',
    'penguin21',
    '22112005',
    '12112005',
    'wifeyy21',
    'forever21'
  ],

  lockedMessage: 'not yet, love...',
  lockedSubtext: 'counting down every single heartbeat until your 21st birthday begins',
  unlockedTitle: 'TODAY, THE UNIVERSE IS ABOUT YOU',
  unlockedSubtitle: 'Because 21 years ago on 12 November 2005, the sweetest, most generous soul arrived into this world.'
};

export const BIRTHDAY_STORAGE_KEY = 'aucu_birthday_unlocked_v21';

/**
 * Check if current local time has reached or passed 12 November 2026
 */
export function isBirthdayReached(): boolean {
  return true; // Always unlocked and open as requested
}

/**
 * Verify birthday password in a case-insensitive, trimmed comparison
 */
export function verifyBirthdayPassword(candidate: string): boolean {
  if (!candidate) return false;
  const normalized = candidate.trim().toLowerCase();
  if (normalized === BIRTHDAY_CONFIG.password.toLowerCase()) return true;
  return BIRTHDAY_CONFIG.alternatePasswords.some(
    (alt) => alt.toLowerCase() === normalized
  );
}

/**
 * Check if the birthday section is already unlocked in this session
 */
export function isBirthdaySessionUnlocked(): boolean {
  return true; // Always unlocked and open by default
}

/**
 * Persist birthday unlock state for the session
 */
export function setBirthdaySessionUnlocked(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(BIRTHDAY_STORAGE_KEY, 'true');
  } catch {
    // Ignore private browsing restrictions
  }
}
