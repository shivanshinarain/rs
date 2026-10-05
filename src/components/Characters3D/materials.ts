import * as THREE from 'three';

export interface CharacterPalette {
  skin: number;
  skinShadow: number;
  blush: number;
  hair: number;
  hairHighlight: number;
  eyeIris: number;
  eyePupil: number;
  jacketMain: number;
  jacketAccent: number;
  pants: number;
  sneakerSole: number;
  sneakerUpper: number;
  sneakerAccent: number;
  socks: number;
  accessory: number;
}

export const SHIVI_PALETTE: CharacterPalette = {
  skin: 0xffd8c9,
  skinShadow: 0xe8b8a5,
  blush: 0xff5a7e,
  hair: 0x1f1118,
  hairHighlight: 0x422432,
  eyeIris: 0x5a3121,
  eyePupil: 0x140b08,
  jacketMain: 0x8a1c38, // Deep wine/crimson
  jacketAccent: 0xffd166, // Universe gold trim
  pants: 0x1e1520, // Dark stylish street joggers
  sneakerSole: 0xffffff,
  sneakerUpper: 0xf4f4f6,
  sneakerAccent: 0xb52243, // Crimson accent
  socks: 0x22131b,
  accessory: 0xff3366, // Hair ribbon & accents
};

export const RASHI_PALETTE: CharacterPalette = {
  skin: 0xffe0d5,
  skinShadow: 0xebbfae,
  blush: 0xff708f,
  hair: 0x180d16,
  hairHighlight: 0x3d2338,
  eyeIris: 0x3a2216,
  eyePupil: 0x0f070b,
  jacketMain: 0x9370db, // Cozy lavender / soft lilac hoodie
  jacketAccent: 0xd8cbe4, // Pastel lavender trim
  pants: 0x2c2236, // Relaxed lounge joggers
  sneakerSole: 0xffffff,
  sneakerUpper: 0xf5f3f9,
  sneakerAccent: 0xa855f7, // Purple sneaker accent
  socks: 0xf0abfc,
  accessory: 0xc084fc, // Lavender butterfly hairclip
};

/**
 * Creates high-quality stylized Three.js materials for a character
 */
export function createCharacterMaterials(palette: CharacterPalette) {
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: palette.skin,
    roughness: 0.5,
    metalness: 0.05,
  });

  const blushMaterial = new THREE.MeshBasicMaterial({
    color: palette.blush,
    transparent: true,
    opacity: 0.45,
  });

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: palette.hair,
    roughness: 0.4,
    metalness: 0.1,
  });

  const eyeScleraMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.0,
  });

  const eyeIrisMaterial = new THREE.MeshStandardMaterial({
    color: palette.eyeIris,
    roughness: 0.1,
    metalness: 0.1,
  });

  const eyePupilMaterial = new THREE.MeshBasicMaterial({
    color: palette.eyePupil,
  });

  const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  const jacketMainMaterial = new THREE.MeshStandardMaterial({
    color: palette.jacketMain,
    roughness: 0.65,
    metalness: 0.08,
  });

  const jacketAccentMaterial = new THREE.MeshStandardMaterial({
    color: palette.jacketAccent,
    roughness: 0.4,
    metalness: 0.25,
  });

  const pantsMaterial = new THREE.MeshStandardMaterial({
    color: palette.pants,
    roughness: 0.7,
    metalness: 0.05,
  });

  const sneakerSoleMaterial = new THREE.MeshStandardMaterial({
    color: palette.sneakerSole,
    roughness: 0.35,
    metalness: 0.05,
  });

  const sneakerUpperMaterial = new THREE.MeshStandardMaterial({
    color: palette.sneakerUpper,
    roughness: 0.45,
    metalness: 0.08,
  });

  const sneakerAccentMaterial = new THREE.MeshStandardMaterial({
    color: palette.sneakerAccent,
    roughness: 0.4,
    metalness: 0.15,
  });

  const socksMaterial = new THREE.MeshStandardMaterial({
    color: palette.socks,
    roughness: 0.8,
    metalness: 0.02,
  });

  const accessoryMaterial = new THREE.MeshStandardMaterial({
    color: palette.accessory,
    roughness: 0.3,
    metalness: 0.3,
  });

  const mouthMaterial = new THREE.MeshBasicMaterial({
    color: 0x7c152e,
  });

  const teethMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  const pillowMaterial = new THREE.MeshStandardMaterial({
    color: 0xfff0f5,
    roughness: 0.9,
    metalness: 0.0,
  });

  const starGoldMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd166,
    emissive: 0xffb703,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.3,
  });

  return {
    skin: skinMaterial,
    blush: blushMaterial,
    hair: hairMaterial,
    eyeSclera: eyeScleraMaterial,
    eyeIris: eyeIrisMaterial,
    eyePupil: eyePupilMaterial,
    eyeHighlight: eyeHighlightMaterial,
    jacketMain: jacketMainMaterial,
    jacketAccent: jacketAccentMaterial,
    pants: pantsMaterial,
    sneakerSole: sneakerSoleMaterial,
    sneakerUpper: sneakerUpperMaterial,
    sneakerAccent: sneakerAccentMaterial,
    socks: socksMaterial,
    accessory: accessoryMaterial,
    mouth: mouthMaterial,
    teeth: teethMaterial,
    pillow: pillowMaterial,
    starGold: starGoldMaterial,
  };
}
