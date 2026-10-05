import * as THREE from 'three';
import { CharacterId, CharacterRig, EyeExpression, MouthExpression } from './types';
import { SHIVI_PALETTE, RASHI_PALETTE, createCharacterMaterials } from './materials';

/**
 * Creates a fully rigged, stylized 3D character (Shivi or Rashi)
 */
export function createCharacterRig(id: CharacterId): CharacterRig {
  const isShivi = id === 'shivi';
  const palette = isShivi ? SHIVI_PALETTE : RASHI_PALETTE;
  const mats = createCharacterMaterials(palette);

  const root = new THREE.Group();
  root.name = `${id}_root`;

  // Pelvis / Hips (Root of body FK hierarchy)
  const pelvis = new THREE.Group();
  pelvis.position.y = 1.25;
  root.add(pelvis);

  // Pelvis mesh (lower torso / hips)
  const pelvisGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.22, 16);
  const pelvisMesh = new THREE.Mesh(pelvisGeo, mats.pants);
  pelvisMesh.castShadow = true;
  pelvisMesh.receiveShadow = true;
  pelvis.add(pelvisMesh);

  // Spine & Chest (Torso)
  const spine = new THREE.Group();
  spine.position.y = 0.12;
  pelvis.add(spine);

  const chest = new THREE.Group();
  chest.position.y = 0.22;
  spine.add(chest);

  // Torso / Jacket Mesh (Chunky stylized hoodie/jacket)
  const torsoGeo = new THREE.CylinderGeometry(0.28, 0.25, 0.38, 16);
  const torsoMesh = new THREE.Mesh(torsoGeo, mats.jacketMain);
  torsoMesh.position.y = 0.16;
  torsoMesh.castShadow = true;
  torsoMesh.receiveShadow = true;
  chest.add(torsoMesh);

  // Jacket accent trim / zipper line / waistband
  const waistTrimGeo = new THREE.TorusGeometry(0.255, 0.022, 8, 24);
  waistTrimGeo.rotateX(Math.PI / 2);
  const waistTrim = new THREE.Mesh(waistTrimGeo, mats.jacketAccent);
  waistTrim.position.y = -0.02;
  chest.add(waistTrim);

  // Collar / Hood fold
  const hoodFoldGeo = new THREE.TorusGeometry(0.18, 0.05, 8, 20, Math.PI * 1.4);
  hoodFoldGeo.rotateX(Math.PI / 2.2);
  hoodFoldGeo.rotateZ(Math.PI * 0.8);
  const hoodFold = new THREE.Mesh(hoodFoldGeo, mats.jacketMain);
  hoodFold.position.set(0, 0.33, -0.06);
  chest.add(hoodFold);

  // Hoodie drawstrings or front emblem
  const stringGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.18, 8);
  const stringL = new THREE.Mesh(stringGeo, mats.jacketAccent);
  stringL.position.set(-0.06, 0.22, 0.26);
  chest.add(stringL);

  const stringR = new THREE.Mesh(stringGeo, mats.jacketAccent);
  stringR.position.set(0.06, 0.22, 0.26);
  chest.add(stringR);

  // Neck
  const neck = new THREE.Group();
  neck.position.y = 0.38;
  chest.add(neck);

  const neckGeo = new THREE.CylinderGeometry(0.1, 0.11, 0.12, 12);
  const neckMesh = new THREE.Mesh(neckGeo, mats.skin);
  neckMesh.position.y = 0.04;
  neck.add(neckMesh);

  // Head
  const head = new THREE.Group();
  head.position.y = 0.12;
  neck.add(head);

  // Stylized head base (rounded, cute, slightly squashed along Y and chubby cheeks)
  const headGeo = new THREE.SphereGeometry(0.42, 24, 20);
  headGeo.scale(1.02, 0.98, 0.98);
  const headMesh = new THREE.Mesh(headGeo, mats.skin);
  headMesh.position.y = 0.36;
  headMesh.castShadow = true;
  headMesh.receiveShadow = true;
  head.add(headMesh);

  // Cute stylized ears
  const earGeo = new THREE.SphereGeometry(0.08, 12, 12);
  earGeo.scale(0.5, 1, 0.8);

  const earL = new THREE.Mesh(earGeo, mats.skin);
  earL.position.set(-0.43, 0.35, 0.02);
  earL.rotation.y = -0.2;
  head.add(earL);

  const earR = new THREE.Mesh(earGeo, mats.skin);
  earR.position.set(0.43, 0.35, 0.02);
  earR.rotation.y = 0.2;
  head.add(earR);

  // Rosy cheeks / blush
  const cheeksMesh = new THREE.Group();
  const blushGeo = new THREE.CircleGeometry(0.085, 16);

  const blushL = new THREE.Mesh(blushGeo, mats.blush);
  blushL.position.set(-0.24, 0.31, 0.39);
  blushL.rotation.y = -0.35;
  cheeksMesh.add(blushL);

  const blushR = new THREE.Mesh(blushGeo, mats.blush);
  blushR.position.set(0.24, 0.31, 0.39);
  blushR.rotation.y = 0.35;
  cheeksMesh.add(blushR);
  head.add(cheeksMesh);

  // Stylized Eyes (Large, expressive, mobile-game aesthetic)
  const eyeGroup = new THREE.Group();
  head.add(eyeGroup);

  const createEye = (isLeft: boolean) => {
    const eyeCont = new THREE.Group();
    const xPos = isLeft ? -0.17 : 0.17;
    eyeCont.position.set(xPos, 0.39, 0.37);
    eyeCont.rotation.y = isLeft ? -0.18 : 0.18;

    // Sclera (White eye background)
    const scleraGeo = new THREE.SphereGeometry(0.095, 16, 16);
    scleraGeo.scale(0.85, 1.1, 0.4);
    const sclera = new THREE.Mesh(scleraGeo, mats.eyeSclera);
    eyeCont.add(sclera);

    // Iris
    const irisGeo = new THREE.CircleGeometry(0.065, 16);
    const iris = new THREE.Mesh(irisGeo, mats.eyeIris);
    iris.position.z = 0.038;
    eyeCont.add(iris);

    // Pupil
    const pupilGeo = new THREE.CircleGeometry(0.04, 16);
    const pupil = new THREE.Mesh(pupilGeo, mats.eyePupil);
    pupil.position.z = 0.04;
    eyeCont.add(pupil);

    // Cute catchlights / highlights (glossy reflection)
    const hlGeo1 = new THREE.CircleGeometry(0.018, 12);
    const hl1 = new THREE.Mesh(hlGeo1, mats.eyeHighlight);
    hl1.position.set(0.016, 0.02, 0.042);
    eyeCont.add(hl1);

    const hlGeo2 = new THREE.CircleGeometry(0.009, 8);
    const hl2 = new THREE.Mesh(hlGeo2, mats.eyeHighlight);
    hl2.position.set(-0.015, -0.018, 0.042);
    eyeCont.add(hl2);

    // Upper Eyelid for expressions & blinks
    const eyelidGeo = new THREE.SphereGeometry(0.102, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    eyelidGeo.scale(0.9, 1.15, 0.45);
    const eyelid = new THREE.Mesh(eyelidGeo, mats.skin);
    eyelid.position.set(0, 0.04, 0.01);
    eyelid.scale.set(1, 0.05, 1); // Open by default
    eyeCont.add(eyelid);

    // Cute stylized eyelash / brow line
    const lashGeo = new THREE.TorusGeometry(0.08, 0.012, 6, 12, Math.PI * 0.7);
    lashGeo.rotateZ(isLeft ? Math.PI * 0.15 : Math.PI * 0.15);
    const lash = new THREE.Mesh(lashGeo, mats.hair);
    lash.position.set(0, 0.08, 0.02);
    eyeCont.add(lash);

    return { container: eyeCont, eyelid, pupil };
  };

  const leftEyeData = createEye(true);
  const rightEyeData = createEye(false);
  eyeGroup.add(leftEyeData.container);
  eyeGroup.add(rightEyeData.container);

  const leftEyelid = leftEyeData.eyelid;
  const rightEyelid = rightEyeData.eyelid;
  const leftPupil = leftEyeData.pupil;
  const rightPupil = rightEyeData.pupil;

  // Mouth (Expressive shape)
  const mouthMesh = new THREE.Group();
  mouthMesh.position.set(0, 0.24, 0.395);

  const mouthBaseGeo = new THREE.TorusGeometry(0.05, 0.012, 8, 16, Math.PI * 0.8);
  mouthBaseGeo.rotateZ(Math.PI * 0.1);
  const mouthCurve = new THREE.Mesh(mouthBaseGeo, mats.mouth);
  mouthMesh.add(mouthCurve);
  head.add(mouthMesh);

  // Stylized Hair
  const hairGroup = new THREE.Group();
  head.add(hairGroup);

  let hairBangs: any;
  let hairTail: any;

  if (isShivi) {
    // SHIVI: Chic wavy brunette hair with voluminous side bangs and dynamic high ponytail
    const hairCapGeo = new THREE.SphereGeometry(0.44, 20, 16);
    hairCapGeo.scale(1.04, 1.02, 1.06);
    const hairCap = new THREE.Mesh(hairCapGeo, mats.hair);
    hairCap.position.set(0, 0.39, -0.04);
    hairCap.castShadow = true;
    hairGroup.add(hairCap);

    // Front bangs
    hairBangs = new THREE.Group();
    for (let i = -2; i <= 2; i++) {
      const strandGeo = new THREE.CapsuleGeometry(0.05, 0.16, 8, 12);
      strandGeo.rotateZ(i * 0.15);
      const strand = new THREE.Mesh(strandGeo, mats.hair);
      strand.position.set(i * 0.08, 0.65 - Math.abs(i) * 0.03, 0.35);
      hairBangs.add(strand);
    }
    hairGroup.add(hairBangs);

    // Scrunchie / Ribbon
    const scrunchieGeo = new THREE.TorusGeometry(0.08, 0.04, 8, 16);
    const scrunchie = new THREE.Mesh(scrunchieGeo, mats.accessory);
    scrunchie.position.set(0, 0.72, -0.28);
    scrunchie.rotation.x = 0.5;
    hairGroup.add(scrunchie);

    // High Ponytail (Rigged for secondary physics/bounce!)
    hairTail = new THREE.Group();
    hairTail.position.set(0, 0.72, -0.32);

    const tailGeo1 = new THREE.CapsuleGeometry(0.12, 0.35, 8, 12);
    const tailMesh1 = new THREE.Mesh(tailGeo1, mats.hair);
    tailMesh1.position.set(0, -0.16, -0.1);
    tailMesh1.rotation.x = -0.4;
    tailMesh1.castShadow = true;
    hairTail.add(tailMesh1);

    const tailGeo2 = new THREE.CapsuleGeometry(0.09, 0.28, 8, 12);
    const tailMesh2 = new THREE.Mesh(tailGeo2, mats.hair);
    tailMesh2.position.set(0, -0.38, -0.18);
    tailMesh2.rotation.x = -0.2;
    tailMesh2.castShadow = true;
    hairTail.add(tailMesh2);

    hairGroup.add(hairTail);
  } else {
    // RASHI: Cute dark hair with wispy bangs, soft low twin buns/flowing strands, and lavender hairclip
    const hairCapGeo = new THREE.SphereGeometry(0.44, 20, 16);
    hairCapGeo.scale(1.05, 1.02, 1.04);
    const hairCap = new THREE.Mesh(hairCapGeo, mats.hair);
    hairCap.position.set(0, 0.39, -0.03);
    hairCap.castShadow = true;
    hairGroup.add(hairCap);

    // Cute wispy bangs
    hairBangs = new THREE.Group();
    for (let i = -3; i <= 3; i++) {
      const strandGeo = new THREE.CapsuleGeometry(0.045, 0.14, 8, 12);
      strandGeo.rotateZ(i * 0.12);
      const strand = new THREE.Mesh(strandGeo, mats.hair);
      strand.position.set(i * 0.065, 0.64 - Math.abs(i) * 0.02, 0.36);
      hairBangs.add(strand);
    }
    hairGroup.add(hairBangs);

    // Lavender butterfly hairclip
    const clipGeo = new THREE.ConeGeometry(0.045, 0.06, 4);
    clipGeo.rotateZ(Math.PI / 4);
    const clip = new THREE.Mesh(clipGeo, mats.accessory);
    clip.position.set(0.3, 0.62, 0.32);
    clip.rotation.y = 0.5;
    hairGroup.add(clip);

    // Twin low side buns (cute & bouncy)
    hairTail = new THREE.Group();
    const bunGeo = new THREE.SphereGeometry(0.14, 12, 12);

    const bunL = new THREE.Mesh(bunGeo, mats.hair);
    bunL.position.set(-0.38, 0.26, -0.22);
    hairTail.add(bunL);

    const bunR = new THREE.Mesh(bunGeo, mats.hair);
    bunR.position.set(0.38, 0.26, -0.22);
    hairTail.add(bunR);

    // Soft curls hanging down
    const strandL = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.25, 8, 12), mats.hair);
    strandL.position.set(-0.36, 0.12, 0.14);
    hairTail.add(strandL);

    const strandR = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.25, 8, 12), mats.hair);
    strandR.position.set(0.36, 0.12, 0.14);
    hairTail.add(strandR);

    hairGroup.add(hairTail);
  }

  // Arms and Shoulders Setup (FK Hierarchy)
  const createArm = (isLeft: boolean) => {
    const sign = isLeft ? -1 : 1;
    const shoulder = new THREE.Group();
    shoulder.position.set(sign * 0.32, 0.28, 0);
    chest.add(shoulder);

    // Upper arm (with stylish jacket sleeve cuff)
    const arm = new THREE.Group();
    shoulder.add(arm);

    const upperArmGeo = new THREE.CapsuleGeometry(0.085, 0.22, 10, 12);
    const upperArmMesh = new THREE.Mesh(upperArmGeo, mats.jacketMain);
    upperArmMesh.position.y = -0.14;
    upperArmMesh.castShadow = true;
    arm.add(upperArmMesh);

    // Forearm
    const forearm = new THREE.Group();
    forearm.position.y = -0.26;
    arm.add(forearm);

    const forearmGeo = new THREE.CapsuleGeometry(0.075, 0.2, 10, 12);
    const forearmMesh = new THREE.Mesh(forearmGeo, mats.jacketMain);
    forearmMesh.position.y = -0.12;
    forearmMesh.castShadow = true;
    forearm.add(forearmMesh);

    // Hand & Wrist
    const hand = new THREE.Group();
    hand.position.y = -0.24;
    forearm.add(hand);

    const handGeo = new THREE.SphereGeometry(0.075, 12, 12);
    handGeo.scale(0.8, 1.2, 0.7);
    const handMesh = new THREE.Mesh(handGeo, mats.skin);
    handMesh.position.y = -0.04;
    handMesh.castShadow = true;
    hand.add(handMesh);

    // Cute thumb
    const thumbGeo = new THREE.CapsuleGeometry(0.025, 0.05, 6, 8);
    const thumb = new THREE.Mesh(thumbGeo, mats.skin);
    thumb.position.set(sign * 0.05, -0.03, 0.02);
    thumb.rotation.z = sign * -0.4;
    hand.add(thumb);

    return { shoulder, arm, forearm, hand };
  };

  const leftArmData = createArm(true);
  const rightArmData = createArm(false);

  const leftShoulder = leftArmData.shoulder;
  const rightShoulder = rightArmData.shoulder;
  const leftArm = leftArmData.arm;
  const rightArm = rightArmData.arm;
  const leftForearm = leftArmData.forearm;
  const rightForearm = rightArmData.forearm;
  const leftHand = leftArmData.hand;
  const rightHand = rightArmData.hand;

  // Prop: Pillow for Shivi's comedic bonk
  let pillowProp: any;
  if (isShivi) {
    pillowProp = new THREE.Group();
    pillowProp.position.set(0, -0.12, 0.16);

    // Fluffy cloud-pillow geometry
    const pillowGeo = new THREE.BoxGeometry(0.34, 0.24, 0.16, 4, 4, 4);
    // Smooth rounded shape
    const pillowMesh = new THREE.Mesh(pillowGeo, mats.pillow);
    pillowMesh.castShadow = true;
    pillowProp.add(pillowMesh);

    // Star patch on pillow
    const patchGeo = new THREE.CircleGeometry(0.05, 5);
    const patch = new THREE.Mesh(patchGeo, mats.starGold);
    patch.position.z = 0.082;
    pillowProp.add(patch);

    pillowProp.visible = false; // toggled when bonk is active
    rightHand.add(pillowProp);
  }

  // Legs and Chunky Subway-Surfers-Style Sneakers
  const createLeg = (isLeft: boolean) => {
    const sign = isLeft ? -1 : 1;

    const hip = new THREE.Group();
    hip.position.set(sign * 0.14, -0.08, 0);
    pelvis.add(hip);

    const thigh = new THREE.Group();
    hip.add(thigh);

    const thighGeo = new THREE.CapsuleGeometry(0.09, 0.26, 10, 12);
    const thighMesh = new THREE.Mesh(thighGeo, mats.pants);
    thighMesh.position.y = -0.16;
    thighMesh.castShadow = true;
    thigh.add(thighMesh);

    const shin = new THREE.Group();
    shin.position.y = -0.32;
    thigh.add(shin);

    const shinGeo = new THREE.CapsuleGeometry(0.08, 0.24, 10, 12);
    const shinMesh = new THREE.Mesh(shinGeo, mats.pants);
    shinMesh.position.y = -0.14;
    shinMesh.castShadow = true;
    shin.add(shinMesh);

    // Sock
    const sockGeo = new THREE.CylinderGeometry(0.082, 0.082, 0.08, 12);
    const sockMesh = new THREE.Mesh(sockGeo, mats.socks);
    sockMesh.position.y = -0.24;
    shin.add(sockMesh);

    // Chunky Mobile-Game Sneaker (Iconic thick sole, rounded toe)
    const foot = new THREE.Group();
    foot.position.set(0, -0.28, 0.04);
    shin.add(foot);

    const sneakerCont = new THREE.Group();
    sneakerCont.position.y = -0.06;
    foot.add(sneakerCont);

    // Thick rubber sole
    const soleGeo = new THREE.BoxGeometry(0.18, 0.07, 0.34);
    const soleMesh = new THREE.Mesh(soleGeo, mats.sneakerSole);
    soleMesh.position.set(0, -0.035, 0.05);
    soleMesh.castShadow = true;
    sneakerCont.add(soleMesh);

    // Sneaker upper body
    const upperGeo = new THREE.BoxGeometry(0.17, 0.12, 0.26);
    const upperMesh = new THREE.Mesh(upperGeo, mats.sneakerUpper);
    upperMesh.position.set(0, 0.04, 0.02);
    upperMesh.castShadow = true;
    sneakerCont.add(upperMesh);

    // Rounded toe box
    const toeGeo = new THREE.SphereGeometry(0.085, 12, 10);
    toeGeo.scale(0.98, 0.7, 1.1);
    const toeMesh = new THREE.Mesh(toeGeo, mats.sneakerUpper);
    toeMesh.position.set(0, 0.02, 0.16);
    toeMesh.castShadow = true;
    sneakerCont.add(toeMesh);

    // Accent color side stripes
    const stripeGeo = new THREE.BoxGeometry(0.182, 0.035, 0.14);
    const stripeMesh = new THREE.Mesh(stripeGeo, mats.sneakerAccent);
    stripeMesh.position.set(0, 0.03, 0.03);
    sneakerCont.add(stripeMesh);

    return { hip, thigh, shin, foot };
  };

  const leftLegData = createLeg(true);
  const rightLegData = createLeg(false);

  const leftHip = leftLegData.hip;
  const rightHip = rightLegData.hip;
  const leftThigh = leftLegData.thigh;
  const rightThigh = rightLegData.thigh;
  const leftShin = leftLegData.shin;
  const rightShin = rightLegData.shin;
  const leftFoot = leftLegData.foot;
  const rightFoot = rightLegData.foot;

  // Comedic Bonk Orbiting Stars (for Rashi when bonked)
  const bonkStarsGroup = new THREE.Group();
  bonkStarsGroup.position.set(0, 0.95, 0);
  for (let i = 0; i < 3; i++) {
    const starGeo = new THREE.OctahedronGeometry(0.06);
    const star = new THREE.Mesh(starGeo, mats.starGold);
    const angle = (i * Math.PI * 2) / 3;
    star.position.set(Math.cos(angle) * 0.32, 0, Math.sin(angle) * 0.32);
    bonkStarsGroup.add(star);
  }
  bonkStarsGroup.visible = false;
  head.add(bonkStarsGroup);

  // Thought/Emote bubble helper
  const thoughtBubble = new THREE.Group();
  thoughtBubble.position.set(0.35, 0.85, 0.1);
  thoughtBubble.visible = false;
  head.add(thoughtBubble);

  // Expression controller
  let currentEyeExpr: EyeExpression = 'normal';
  let currentMouthExpr: MouthExpression = 'smile';

  const setExpression = (eye: EyeExpression, mouth: MouthExpression) => {
    currentEyeExpr = eye;
    currentMouthExpr = mouth;

    // Reset scales
    leftEyelid.scale.set(1, 0.05, 1);
    rightEyelid.scale.set(1, 0.05, 1);
    leftPupil.scale.set(1, 1, 1);
    rightPupil.scale.set(1, 1, 1);
    bonkStarsGroup.visible = false;

    if (eye === 'blink') {
      leftEyelid.scale.set(1, 1, 1);
      rightEyelid.scale.set(1, 1, 1);
    } else if (eye === 'wink') {
      leftEyelid.scale.set(1, 1, 1);
      rightEyelid.scale.set(1, 0.05, 1);
    } else if (eye === 'panic') {
      leftPupil.scale.set(0.65, 0.65, 1);
      rightPupil.scale.set(0.65, 0.65, 1);
    } else if (eye === 'sleepy') {
      leftEyelid.scale.set(1, 0.65, 1);
      rightEyelid.scale.set(1, 0.65, 1);
    } else if (eye === 'bonked') {
      leftEyelid.scale.set(1, 0.8, 1);
      rightEyelid.scale.set(1, 0.8, 1);
      bonkStarsGroup.visible = true;
    }

    if (mouth === 'pout') {
      mouthMesh.scale.set(0.7, 0.7, 0.7);
      mouthMesh.rotation.z = Math.PI; // Frown/pout
      mouthMesh.position.y = 0.22;
    } else if (mouth === 'open') {
      mouthMesh.scale.set(1.2, 1.4, 1);
      mouthMesh.rotation.z = 0;
      mouthMesh.position.y = 0.23;
    } else {
      mouthMesh.scale.set(1, 1, 1);
      mouthMesh.rotation.z = 0;
      mouthMesh.position.y = 0.24;
    }
  };

  let currentAnim: any = 'idle';
  let animTime = 0;

  const setAnimation = (anim: any) => {
    currentAnim = anim;
    animTime = 0;

    if (pillowProp) {
      pillowProp.visible = anim === 'bonk_swing' || anim === 'chase';
    }

    if (anim === 'bonked_react') {
      setExpression('bonked', 'pout');
    } else if (anim === 'pout') {
      setExpression('normal', 'pout');
    } else if (anim === 'eat') {
      setExpression('happy', 'smile');
    } else if (anim === 'sit_sleep') {
      setExpression('sleepy', 'smile');
    } else if (anim === 'panic') {
      setExpression('panic', 'open');
    } else if (anim === 'celebrate' || anim === 'dance') {
      setExpression('happy', 'smile');
    } else {
      setExpression('normal', 'smile');
    }
  };

  const update = (delta: number) => {
    animTime += delta;

    // Spin bonk stars if visible
    if (bonkStarsGroup.visible) {
      bonkStarsGroup.rotation.y += delta * 6;
    }

    // Natural eye blink interval
    if (currentEyeExpr === 'normal') {
      const blinkPhase = (animTime * 1.5) % 4.5;
      if (blinkPhase < 0.15) {
        leftEyelid.scale.y = 1;
        rightEyelid.scale.y = 1;
      } else {
        leftEyelid.scale.y = 0.05;
        rightEyelid.scale.y = 0.05;
      }
    }

    // Hair secondary bounce
    if (hairTail) {
      hairTail.rotation.z = Math.sin(animTime * 5) * 0.06;
      hairTail.rotation.x = Math.sin(animTime * 7) * 0.08;
    }
  };

  const dispose = () => {
    root.traverse((obj: any) => {
      if (obj.geometry) obj.geometry.dispose();
    });
  };

  return {
    id,
    root,
    pelvis,
    spine,
    chest,
    neck,
    head,
    leftShoulder,
    rightShoulder,
    leftArm,
    rightArm,
    leftForearm,
    rightForearm,
    leftHand,
    rightHand,
    leftHip,
    rightHip,
    leftThigh,
    rightThigh,
    leftShin,
    rightShin,
    leftFoot,
    rightFoot,
    hairBangs,
    hairTail,
    leftEyelid,
    rightEyelid,
    leftPupil,
    rightPupil,
    mouthMesh,
    cheeksMesh,
    pillowProp,
    bonkStarsGroup,
    thoughtBubble,
    currentAnimation: currentAnim,
    animTime,
    eyeExpression: currentEyeExpr,
    mouthExpression: currentMouthExpr,
    setExpression,
    setAnimation,
    update,
    dispose,
  };
}
