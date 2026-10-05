export type CharacterId = 'shivi' | 'rashi';

export type CharacterAnimationType =
  | 'idle'
  | 'run'
  | 'chase'
  | 'escape'
  | 'hide'
  | 'peek'
  | 'wave_tease'
  | 'sit_sleep'
  | 'bonk_swing'
  | 'bonked_react'
  | 'pout'
  | 'eat'
  | 'dance'
  | 'celebrate'
  | 'hug'
  | 'panic';

export type EyeExpression = 'normal' | 'happy' | 'blink' | 'wink' | 'panic' | 'sleepy' | 'bonked';
export type MouthExpression = 'smile' | 'open' | 'pout' | 'giggle' | 'chew' | 'flat';

export interface CharacterRig {
  id: CharacterId;
  root: any; // THREE.Group
  pelvis: any; // THREE.Group
  spine: any; // THREE.Group
  chest: any; // THREE.Group
  neck: any; // THREE.Group
  head: any; // THREE.Group
  leftShoulder: any; // THREE.Group
  rightShoulder: any; // THREE.Group
  leftArm: any; // THREE.Group
  rightArm: any; // THREE.Group
  leftForearm: any; // THREE.Group
  rightForearm: any; // THREE.Group
  leftHand: any; // THREE.Group
  rightHand: any; // THREE.Group
  leftHip: any; // THREE.Group
  rightHip: any; // THREE.Group
  leftThigh: any; // THREE.Group
  rightThigh: any; // THREE.Group
  leftShin: any; // THREE.Group
  rightShin: any; // THREE.Group
  leftFoot: any; // THREE.Group
  rightFoot: any; // THREE.Group
  hairBangs?: any; // THREE.Group
  hairTail?: any; // THREE.Group
  leftEyelid: any; // THREE.Mesh
  rightEyelid: any; // THREE.Mesh
  leftPupil: any; // THREE.Mesh
  rightPupil: any; // THREE.Mesh
  mouthMesh: any; // THREE.Mesh
  cheeksMesh: any; // THREE.Group
  pillowProp?: any; // THREE.Group
  bonkStarsGroup?: any; // THREE.Group
  thoughtBubble?: any; // THREE.Group
  currentAnimation: CharacterAnimationType;
  animTime: number;
  eyeExpression: EyeExpression;
  mouthExpression: MouthExpression;
  setExpression: (eye: EyeExpression, mouth: MouthExpression) => void;
  setAnimation: (anim: CharacterAnimationType) => void;
  update: (delta: number) => void;
  dispose: () => void;
}
