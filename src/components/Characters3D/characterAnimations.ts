import { CharacterRig } from './types';

/**
 * Procedural animation engine for stylized 3D characters.
 * Computes forward kinematics (joint rotations, pelvis bounce, head bop, limb swings).
 */
export function applyCharacterAnimation(rig: CharacterRig, delta: number) {
  rig.update(delta);
  const t = rig.animTime;
  const anim = rig.currentAnimation;

  // Helper reset rotations
  const resetPose = () => {
    rig.pelvis.position.set(0, 1.25, 0);
    rig.pelvis.rotation.set(0, 0, 0);
    rig.spine.rotation.set(0, 0, 0);
    rig.chest.rotation.set(0, 0, 0);
    rig.neck.rotation.set(0, 0, 0);
    rig.head.rotation.set(0, 0, 0);

    rig.leftShoulder.rotation.set(0, 0, 0);
    rig.rightShoulder.rotation.set(0, 0, 0);
    rig.leftArm.rotation.set(0, 0, 0.1);
    rig.rightArm.rotation.set(0, 0, -0.1);
    rig.leftForearm.rotation.set(0, 0, 0);
    rig.rightForearm.rotation.set(0, 0, 0);
    rig.leftHand.rotation.set(0, 0, 0);
    rig.rightHand.rotation.set(0, 0, 0);

    rig.leftHip.rotation.set(0, 0, 0);
    rig.rightHip.rotation.set(0, 0, 0);
    rig.leftThigh.rotation.set(0, 0, 0);
    rig.rightThigh.rotation.set(0, 0, 0);
    rig.leftShin.rotation.set(0, 0, 0);
    rig.rightShin.rotation.set(0, 0, 0);
    rig.leftFoot.rotation.set(0, 0, 0);
    rig.rightFoot.rotation.set(0, 0, 0);
  };

  resetPose();

  switch (anim) {
    case 'idle': {
      // Gentle breathing, subtle weight shift, mobile game idle stance
      const breath = Math.sin(t * 2.2);
      const sway = Math.sin(t * 1.1);

      rig.pelvis.position.y = 1.25 + breath * 0.02;
      rig.pelvis.rotation.z = sway * 0.04;
      rig.spine.rotation.x = breath * 0.03;
      rig.head.rotation.y = sway * 0.08;
      rig.head.rotation.z = -sway * 0.04;

      // Casual relaxed arms
      rig.leftArm.rotation.x = 0.1 + breath * 0.03;
      rig.leftArm.rotation.z = 0.2 + sway * 0.03;
      rig.rightArm.rotation.x = 0.1 + breath * 0.03;
      rig.rightArm.rotation.z = -0.2 + sway * 0.03;
      rig.leftForearm.rotation.x = -0.3;
      rig.rightForearm.rotation.x = -0.3;
      break;
    }

    case 'run':
    case 'escape': {
      // Energetic Subway-Surfers-style sprint!
      const speed = anim === 'escape' ? 14 : 12;
      const cycle = t * speed;
      const legL = Math.sin(cycle);
      const legR = Math.sin(cycle + Math.PI);
      const bounce = Math.abs(Math.sin(cycle * 0.5));

      // Chunky bounce & forward tilt
      rig.pelvis.position.y = 1.22 + bounce * 0.12;
      rig.pelvis.rotation.y = Math.sin(cycle) * 0.15;
      rig.spine.rotation.x = 0.22; // Lean into sprint
      rig.chest.rotation.y = -Math.sin(cycle) * 0.2;

      // Legs cycling
      rig.leftThigh.rotation.x = legL * 0.95;
      rig.rightThigh.rotation.x = legR * 0.95;

      rig.leftShin.rotation.x = legL > 0 ? legL * 0.8 : 0.1;
      rig.rightShin.rotation.x = legR > 0 ? legR * 0.8 : 0.1;

      // High-pumping runner arms
      rig.leftArm.rotation.x = -legL * 1.1;
      rig.rightArm.rotation.x = -legR * 1.1;
      rig.leftArm.rotation.z = 0.25;
      rig.rightArm.rotation.z = -0.25;
      rig.leftForearm.rotation.x = -0.9;
      rig.rightForearm.rotation.x = -0.9;

      // If escaping, Rashi turns head back over shoulder with mischievous grin
      if (anim === 'escape') {
        rig.head.rotation.y = Math.sin(t * 3) * 0.45 - 0.35;
        rig.head.rotation.z = -0.15;
      }
      break;
    }

    case 'chase': {
      // Shivi chasing after Rashi with fluffy pillow raised!
      const cycle = t * 13;
      const legL = Math.sin(cycle);
      const legR = Math.sin(cycle + Math.PI);
      const bounce = Math.abs(Math.sin(cycle * 0.5));

      rig.pelvis.position.y = 1.22 + bounce * 0.1;
      rig.spine.rotation.x = 0.28; // Determined forward lean
      rig.head.rotation.x = -0.15;

      rig.leftThigh.rotation.x = legL * 0.9;
      rig.rightThigh.rotation.x = legR * 0.9;
      rig.leftShin.rotation.x = legL > 0 ? legL * 0.7 : 0.1;
      rig.rightShin.rotation.x = legR > 0 ? legR * 0.7 : 0.1;

      // Left arm pumping, right arm holding pillow aloft ready to strike
      rig.leftArm.rotation.x = -legL * 0.9;
      rig.leftForearm.rotation.x = -0.8;

      rig.rightArm.rotation.x = -1.2 + Math.sin(cycle) * 0.2;
      rig.rightArm.rotation.z = -0.4;
      rig.rightForearm.rotation.x = -0.8;
      break;
    }

    case 'bonk_swing': {
      // Shivi wind-up and comic cartoon bonk strike!
      const phase = (t * 4) % (Math.PI * 2);
      if (phase < Math.PI * 0.8) {
        // Wind-up: pull pillow back high
        rig.spine.rotation.x = -0.2;
        rig.spine.rotation.y = 0.3;
        rig.rightArm.rotation.x = -2.1;
        rig.rightArm.rotation.z = -0.5;
        rig.rightForearm.rotation.x = -1.1;
        rig.head.rotation.y = -0.2;
      } else if (phase < Math.PI * 1.4) {
        // Smash down with pillow!
        rig.pelvis.position.y = 1.15;
        rig.spine.rotation.x = 0.45;
        rig.spine.rotation.y = -0.2;
        rig.rightArm.rotation.x = 0.3;
        rig.rightArm.rotation.z = -0.2;
        rig.rightForearm.rotation.x = -0.4;
        rig.head.rotation.x = 0.2;
      } else {
        // Recovery
        rig.spine.rotation.x = 0.1;
        rig.rightArm.rotation.x = -0.8;
        rig.rightForearm.rotation.x = -0.5;
      }
      break;
    }

    case 'bonked_react': {
      // Rashi gets hit with harmless pillow: comical cartoon squish and wobble!
      const wobble = Math.sin(t * 16) * Math.exp(-t * 1.5);
      rig.pelvis.position.y = 1.18 - Math.abs(wobble) * 0.08;
      rig.pelvis.rotation.z = wobble * 0.35;
      rig.head.rotation.z = -wobble * 0.5;
      rig.head.rotation.x = 0.3 + wobble * 0.2;

      // Hands thrown up comically
      rig.leftArm.rotation.z = 1.3;
      rig.rightArm.rotation.z = -1.3;
      rig.leftArm.rotation.x = -0.6;
      rig.rightArm.rotation.x = -0.6;
      rig.leftForearm.rotation.x = -1.2;
      rig.rightForearm.rotation.x = -1.2;
      break;
    }

    case 'hide': {
      // Rashi crouching down low behind an object
      rig.pelvis.position.y = 0.85;
      rig.spine.rotation.x = 0.45;
      rig.leftThigh.rotation.x = -1.2;
      rig.rightThigh.rotation.x = -1.2;
      rig.leftShin.rotation.x = 1.6;
      rig.rightShin.rotation.x = 1.6;

      // Hands gathered near face
      rig.leftArm.rotation.x = -0.8;
      rig.rightArm.rotation.x = -0.8;
      rig.leftForearm.rotation.x = -1.3;
      rig.rightForearm.rotation.x = -1.3;
      rig.head.rotation.x = -0.3; // Looking up from hideout
      break;
    }

    case 'peek': {
      // Rashi leaning around a corner playfully
      const peekPhase = Math.sin(t * 2.5);
      rig.pelvis.position.x = peekPhase * 0.28;
      rig.pelvis.rotation.z = peekPhase * 0.25;
      rig.chest.rotation.z = peekPhase * 0.35;
      rig.head.rotation.z = peekPhase * 0.2;
      rig.head.rotation.y = -peekPhase * 0.3;

      rig.leftArm.rotation.z = 0.4;
      rig.rightArm.rotation.z = -0.4;
      break;
    }

    case 'wave_tease': {
      // Playful teasing wave ("can't catch me!")
      const wave = Math.sin(t * 10);
      const sway = Math.sin(t * 2.5);

      rig.pelvis.rotation.z = sway * 0.12;
      rig.head.rotation.z = -sway * 0.15;
      rig.head.rotation.y = sway * 0.1;

      // Right arm raised high, waving hand back and forth
      rig.rightArm.rotation.x = -1.9;
      rig.rightArm.rotation.z = -0.6;
      rig.rightForearm.rotation.x = -0.8;
      rig.rightForearm.rotation.z = wave * 0.55;
      rig.rightHand.rotation.z = wave * 0.4;

      // Left hand on hip
      rig.leftArm.rotation.z = 0.7;
      rig.leftArm.rotation.x = 0.3;
      rig.leftForearm.rotation.x = -1.4;
      break;
    }

    case 'sit_sleep': {
      // Rashi sitting cross-legged, nodding off to sleep
      const breath = Math.sin(t * 1.5);
      const nod = Math.sin(t * 0.8);

      rig.pelvis.position.y = 0.52 + breath * 0.015;
      rig.pelvis.rotation.x = 0.1;
      rig.spine.rotation.x = 0.25 + nod * 0.1;
      rig.head.rotation.x = 0.45 + nod * 0.15; // Head drooping
      rig.head.rotation.z = 0.1;

      // Cross-legged pose
      rig.leftThigh.rotation.x = -1.3;
      rig.leftThigh.rotation.z = 0.7;
      rig.leftShin.rotation.x = 1.8;
      rig.rightThigh.rotation.x = -1.3;
      rig.rightThigh.rotation.z = -0.7;
      rig.rightShin.rotation.x = 1.8;

      // Hands resting on lap
      rig.leftArm.rotation.x = -0.4;
      rig.leftArm.rotation.z = 0.3;
      rig.leftForearm.rotation.x = -1.1;
      rig.rightArm.rotation.x = -0.4;
      rig.rightArm.rotation.z = -0.3;
      rig.rightForearm.rotation.x = -1.1;
      break;
    }

    case 'pout': {
      // Arms crossed, chest turned away, chin in air
      const tap = Math.sin(t * 6);
      rig.spine.rotation.y = -0.35;
      rig.head.rotation.y = -0.35;
      rig.head.rotation.x = -0.15; // Chin tilted up

      // Arms crossed over chest
      rig.leftArm.rotation.x = -0.6;
      rig.leftArm.rotation.z = 0.85;
      rig.leftForearm.rotation.y = 1.3;
      rig.leftForearm.rotation.x = -0.6;

      rig.rightArm.rotation.x = -0.6;
      rig.rightArm.rotation.z = -0.85;
      rig.rightForearm.rotation.y = -1.3;
      rig.rightForearm.rotation.x = -0.6;

      // Impatient foot tap
      rig.rightFoot.rotation.x = tap > 0 ? tap * 0.2 : 0;
      break;
    }

    case 'eat': {
      // Holding snack bowl / food, taking cute bites with head bob
      const chew = Math.sin(t * 8);
      const happy = Math.sin(t * 3);

      rig.pelvis.position.y = 1.25 + happy * 0.03;
      rig.head.rotation.z = happy * 0.12;
      rig.head.rotation.x = chew * 0.08;

      // Bringing hands to mouth
      rig.rightArm.rotation.x = -1.3;
      rig.rightArm.rotation.z = -0.3;
      rig.rightForearm.rotation.x = -1.5 + chew * 0.1;

      rig.leftArm.rotation.x = -1.1;
      rig.leftArm.rotation.z = 0.3;
      rig.leftForearm.rotation.x = -1.3;
      break;
    }

    case 'panic': {
      // Frantic girlfriend panic: pacing back and forth, hands on face/head
      const pace = Math.sin(t * 8);
      rig.pelvis.position.y = 1.25 + Math.abs(pace) * 0.05;
      rig.pelvis.position.x = Math.sin(t * 2.5) * 0.3;
      rig.head.rotation.z = pace * 0.15;
      rig.head.rotation.x = 0.1;

      // Hands clutching head/cheeks
      rig.leftArm.rotation.x = -1.8;
      rig.leftArm.rotation.z = 0.8;
      rig.leftForearm.rotation.x = -1.6;

      rig.rightArm.rotation.x = -1.8;
      rig.rightArm.rotation.z = -0.8;
      rig.rightForearm.rotation.x = -1.6;
      break;
    }

    case 'dance': {
      // Stylized K-Pop dance groove: rhythmic bounce, hip shift, arm popping!
      const beat = (t * 4.5) % (Math.PI * 2);
      const hop = Math.abs(Math.sin(beat));
      const stepDir = Math.sin(beat * 0.5);

      rig.pelvis.position.y = 1.22 + hop * 0.14;
      rig.pelvis.position.x = stepDir * 0.15;
      rig.pelvis.rotation.y = stepDir * 0.25;
      rig.pelvis.rotation.z = stepDir * 0.12;

      rig.chest.rotation.y = -stepDir * 0.3;
      rig.head.rotation.y = stepDir * 0.15;
      rig.head.rotation.z = -stepDir * 0.1;

      // Rhythmic pop arms
      rig.leftArm.rotation.x = -0.8 + Math.sin(beat) * 0.6;
      rig.leftArm.rotation.z = 0.6;
      rig.leftForearm.rotation.x = -1.1;

      rig.rightArm.rotation.x = -0.8 - Math.sin(beat) * 0.6;
      rig.rightArm.rotation.z = -0.6;
      rig.rightForearm.rotation.x = -1.1;

      rig.leftThigh.rotation.x = Math.sin(beat) * 0.4;
      rig.rightThigh.rotation.x = -Math.sin(beat) * 0.4;
      break;
    }

    case 'celebrate': {
      // Victory celebration: jumping up, arms high in V-shape!
      const jump = Math.abs(Math.sin(t * 5));
      rig.pelvis.position.y = 1.25 + jump * 0.28;
      rig.head.rotation.x = -0.2; // Looking up joyfully

      // Arms in air
      rig.leftArm.rotation.x = -2.4;
      rig.leftArm.rotation.z = 0.5;
      rig.rightArm.rotation.x = -2.4;
      rig.rightArm.rotation.z = -0.5;
      rig.leftForearm.rotation.x = -0.4;
      rig.rightForearm.rotation.x = -0.4;

      // Legs bent in jump
      if (jump > 0.1) {
        rig.leftShin.rotation.x = 0.8;
        rig.rightShin.rotation.x = 0.8;
      }
      break;
    }

    case 'hug': {
      // Warm emotional reunion embrace
      const sway = Math.sin(t * 1.8);
      rig.pelvis.position.y = 1.24 + Math.sin(t * 2) * 0.015;
      rig.spine.rotation.x = 0.15;
      rig.head.rotation.x = 0.2;
      rig.head.rotation.z = rig.id === 'shivi' ? -0.15 : 0.15;

      // Arms wrapped around
      rig.leftArm.rotation.x = -1.1;
      rig.leftArm.rotation.z = 0.55;
      rig.leftForearm.rotation.y = 1.1;
      rig.leftForearm.rotation.x = -0.6;

      rig.rightArm.rotation.x = -1.1;
      rig.rightArm.rotation.z = -0.55;
      rig.rightForearm.rotation.y = -1.1;
      rig.rightForearm.rotation.x = -0.6;
      break;
    }
  }
}
