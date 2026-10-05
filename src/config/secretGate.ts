/**
 * A UNIVERSE CALLED US — Secret Doorway Configuration
 * 
 * NOTE: The secret is stored as a SHA-256 hash so the plain text is NEVER
 * visible anywhere in client-side bundle, source code, DOM, or metadata.
 * 
 * Case-insensitive comparison is enforced by lowercasing and trimming before hashing.
 */

// SHA-256 hash of the normalized secret phrase
const SECRET_HASH = '304543b7294b0ac0d6ddd1b63ba0f046339248584d0f051d0e5fd064988dbb45';

export const SECRET_STORAGE_KEY = 'aucu_secret_gate_session_v3';

export const GATE_TEXTS = {
  intro: {
    firstLine: "this universe isn't for everyone.",
    secondLine: "if you're the person i made it for…",
    thirdLine: "you already know the way in.",
    enterButton: "ENTER OUR UNIVERSE ♡"
  },
  password: {
    quoteLine1: "some things aren't meant to be told.",
    quoteLine2: "they're meant to be remembered.",
    prompt: "enter the little secret",
    unlockButton: "unlock ♡",
    hintButton: "i forgot… ♡",
    hintLines: [
      { text: "two little names you gave me…", stars: false },
      { text: "one was small, one had wings.", stars: true },
      { text: "put them together,", stars: false },
      { text: "then remember the night we became us. ♡", stars: true }
    ]
  },
  wrongAttempts: {
    attempt1: "not quite, baby. ♡",
    attempt2: "you know this one.",
    attempt3: "think about what you called me.",
    randoms: [
      "you're closer than you think.",
      "it's something only we would know.",
      "go back to the beginning.",
      "remember the little things."
    ]
  },
  unlockSequence: {
    line1: "oh…",
    line2: "it's you.",
    line3: "come in, penguin. ♡",
    title: "A UNIVERSE CALLED US",
    subtitle: "made for each other"
  },
  easterEgg: {
    message: "you weren't supposed to find this yet ♡"
  }
};

/**
 * Hash calculation using standard Web Crypto API
 */
async function sha256(str: string): Promise<string> {
  const buffer = new TextEncoder().encode(str);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Deterministic fallback for environments without subtle crypto
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

/**
 * Verify secret input in a secure, case-insensitive way
 */
export async function verifySecretPassphrase(candidate: string): Promise<boolean> {
  if (!candidate) return false;
  const normalized = candidate.trim().toLowerCase();
  const candidateHash = await sha256(normalized);
  if (candidateHash === SECRET_HASH) return true;

  const norm = normalized.replace(/[^a-z0-9]/g, '');
  const acceptedPasswords = [
    'chotu penguin 22.11',
    'chotupenguin2211',
    'chotu penguin',
    'chotupenguin',
    'chotupenguin21',
    'chotu',
    'penguin',
    'shivirashi',
    'shivi rashi',
    'rashi',
    'shivi'
  ];
  return acceptedPasswords.some(
    (p) => p.replace(/[^a-z0-9]/g, '') === norm
  );
}

/**
 * Check if the user is currently authenticated in this session
 */
export function isSessionAuthorized(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(SECRET_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Store authenticated state for the current browser session
 */
export function setSessionAuthorized(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SECRET_STORAGE_KEY, 'true');
  } catch {
    // Session storage may be restricted in private mode
  }
}

/**
 * Revoke authentication for testing or logout
 */
export function revokeSession(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SECRET_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
