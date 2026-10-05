import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createCharacterRig } from './createCharacterRig';
import { applyCharacterAnimation } from './characterAnimations';
import { CharacterAnimationType, CharacterRig } from './types';
import { sound } from '../../utils/audioEngine';
import {
  RotateCcw,
  Sparkles,
  Maximize2,
  Heart,
  HelpCircle,
  Eye,
  Smile,
  Volume2
} from 'lucide-react';

interface SaveRashi3DStageProps {
  step: 'intro' | 'food' | 'medicine' | 'chaos' | 'kpop' | 'saved';
  rashiReaction: 'normal' | 'pout' | 'eating' | 'sparkle' | 'bonked';
  shiviReaction: 'normal' | 'panic' | 'bonking' | 'relieved';
  shiviSpeech?: string;
  onBonkTrigger?: (customText?: string) => void;
  onOpenInspector?: () => void;
}

export default function SaveRashi3DStage({
  step,
  rashiReaction,
  shiviReaction,
  shiviSpeech,
  onBonkTrigger,
  onOpenInspector,
}: SaveRashi3DStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [interactiveBubble, setInteractiveBubble] = useState<{
    text: string;
    character: 'shivi' | 'rashi';
  } | null>(null);

  // References to keep across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shiviRigRef = useRef<CharacterRig | null>(null);
  const rashiRigRef = useRef<CharacterRig | null>(null);
  const particleGroupRef = useRef<THREE.Group | null>(null);
  const bonkEffectRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: 0, phi: 0.25, distance: 4.8 });
  const targetCameraAngleRef = useRef({ theta: 0, phi: 0.25, distance: 4.8 });

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.8);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    // Renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting (Subway-Surfers-inspired dynamic mobile-game lighting)
    // 1. Warm Ambient
    const ambientLight = new THREE.AmbientLight(0x281228, 1.4);
    scene.add(ambientLight);

    // 2. Key Light (Warm Sunlight / Spotlight)
    const keyLight = new THREE.DirectionalLight(0xfff3e6, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // 3. Rim Light (Signature Crisp Cyan/Lavender Backlight for character separation)
    const rimLight = new THREE.DirectionalLight(0xc084fc, 2.8);
    rimLight.position.set(-3, 3, -4);
    scene.add(rimLight);

    // 4. Fill Warm Glow from floor
    const fillLight = new THREE.PointLight(0xff285e, 1.6, 8);
    fillLight.position.set(0, 0.4, 2);
    scene.add(fillLight);

    // Room Environment / Stylized Stage
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Glossy Circular Pedestal / Floor
    const floorGeo = new THREE.CylinderGeometry(3.2, 3.4, 0.25, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x140516,
      roughness: 0.35,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.125;
    floor.receiveShadow = true;
    stageGroup.add(floor);

    // Glowing Gold & Wine Pedestal Ring
    const ringGeo = new THREE.TorusGeometry(3.18, 0.035, 12, 48);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xff9900,
      emissiveIntensity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.005;
    stageGroup.add(ring);

    // Backdrop arch with celestial dark aesthetic
    const archGeo = new THREE.CylinderGeometry(3.6, 3.6, 2.8, 24, 1, true, 0, Math.PI);
    archGeo.scale(-1, 1, 1);
    const archMat = new THREE.MeshBasicMaterial({
      color: 0x09020a,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.85,
    });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.set(0, 1.4, -0.6);
    stageGroup.add(arch);

    // Cozy stylized Room Props
    // 1. Plush lavender armchair / cushion (for Rashi to hide behind or sit on)
    const chairGroup = new THREE.Group();
    chairGroup.position.set(1.7, 0, -0.4);
    const seatGeo = new THREE.CylinderGeometry(0.5, 0.55, 0.45, 16);
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x4a1d44, roughness: 0.7 });
    const seat = new THREE.Mesh(seatGeo, seatMat);
    seat.position.y = 0.22;
    seat.castShadow = true;
    seat.receiveShadow = true;
    chairGroup.add(seat);

    const backGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.6, 16, 1, false, 0, Math.PI);
    const back = new THREE.Mesh(backGeo, seatMat);
    back.position.set(0, 0.55, -0.05);
    back.rotation.y = Math.PI * 0.2;
    back.castShadow = true;
    chairGroup.add(back);

    // Cute teddy bear sitting on chair
    const bearGroup = new THREE.Group();
    bearGroup.position.set(0, 0.5, 0);
    bearGroup.scale.set(0.65, 0.65, 0.65);
    const bearBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.85 })
    );
    bearBody.position.y = 0.2;
    bearGroup.add(bearBody);
    const bearHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.85 })
    );
    bearHead.position.y = 0.46;
    bearGroup.add(bearHead);
    chairGroup.add(bearGroup);

    stageGroup.add(chairGroup);

    // 2. Bedside side table / drawer (for medicine & water)
    const tableGroup = new THREE.Group();
    tableGroup.position.set(-1.8, 0, -0.3);
    const tableGeo = new THREE.BoxGeometry(0.7, 0.65, 0.6);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x240e1e, roughness: 0.5 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.y = 0.325;
    table.castShadow = true;
    table.receiveShadow = true;
    tableGroup.add(table);

    // Mini glowing lantern on table
    const lanternGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.22, 12);
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffaa00,
      emissiveIntensity: 1.5,
    });
    const lantern = new THREE.Mesh(lanternGeo, lanternMat);
    lantern.position.set(0, 0.76, 0);
    tableGroup.add(lantern);
    stageGroup.add(tableGroup);

    // Ambient Floating Stardust / Sparkle Particles
    const particleGroup = new THREE.Group();
    const particleCount = 35;
    const particleGeo = new THREE.OctahedronGeometry(0.035);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0xffd166,
      transparent: true,
      opacity: 0.75,
    });

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      p.position.set(
        (Math.random() - 0.5) * 5,
        Math.random() * 3 + 0.2,
        (Math.random() - 0.5) * 3
      );
      p.userData = {
        speedY: 0.2 + Math.random() * 0.3,
        seed: Math.random() * Math.PI * 2,
      };
      particleGroup.add(p);
    }
    scene.add(particleGroup);
    particleGroupRef.current = particleGroup;

    // Bonk Cartoon Impact Effect (comic puff cloud)
    const bonkGroup = new THREE.Group();
    bonkGroup.position.set(0, 1.8, 0);
    for (let i = 0; i < 6; i++) {
      const puffGeo = new THREE.SphereGeometry(0.16 + Math.random() * 0.1, 10, 10);
      const puffMat = new THREE.MeshStandardMaterial({
        color: 0xfff0f5,
        roughness: 0.8,
        transparent: true,
        opacity: 0.9,
      });
      const puff = new THREE.Mesh(puffGeo, puffMat);
      const angle = (i * Math.PI * 2) / 6;
      puff.position.set(Math.cos(angle) * 0.2, Math.sin(angle) * 0.15, 0);
      bonkGroup.add(puff);
    }
    bonkGroup.visible = false;
    scene.add(bonkGroup);
    bonkEffectRef.current = bonkGroup;

    // Characters Rigs
    const shiviRig = createCharacterRig('shivi');
    shiviRig.root.position.set(-1.1, 0, 0.2);
    shiviRig.root.rotation.y = 0.35;
    scene.add(shiviRig.root);
    shiviRigRef.current = shiviRig;

    const rashiRig = createCharacterRig('rashi');
    rashiRig.root.position.set(1.1, 0, 0.1);
    rashiRig.root.rotation.y = -0.35;
    scene.add(rashiRig.root);
    rashiRigRef.current = rashiRig;

    // Mouse / Touch Drag Controls for 360° stage orbit
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePositionRef.current.x;
      const deltaY = clientY - previousMousePositionRef.current.y;

      targetCameraAngleRef.current.theta -= deltaX * 0.007;
      targetCameraAngleRef.current.phi = Math.max(
        0.05,
        Math.min(0.65, targetCameraAngleRef.current.phi + deltaY * 0.005)
      );

      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    domEl.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    // Animation Loop
    let lastTime = performance.now();
    let animFrameId: number;

    const animate = (currentTime: number) => {
      animFrameId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth camera interpolation
      cameraAngleRef.current.theta +=
        (targetCameraAngleRef.current.theta - cameraAngleRef.current.theta) * 0.1;
      cameraAngleRef.current.phi +=
        (targetCameraAngleRef.current.phi - cameraAngleRef.current.phi) * 0.1;

      const camDist = cameraAngleRef.current.distance;
      const camY = 1.3 + Math.sin(cameraAngleRef.current.phi) * camDist;
      const camR = Math.cos(cameraAngleRef.current.phi) * camDist;
      const camX = Math.sin(cameraAngleRef.current.theta) * camR;
      const camZ = Math.cos(cameraAngleRef.current.theta) * camR;

      camera.position.set(camX, camY, camZ);
      camera.lookAt(0, 1.25, 0);

      // Update character rigs
      if (shiviRigRef.current) {
        applyCharacterAnimation(shiviRigRef.current, delta);
      }
      if (rashiRigRef.current) {
        applyCharacterAnimation(rashiRigRef.current, delta);
      }

      // Animate floating particles
      if (particleGroupRef.current) {
        particleGroupRef.current.children.forEach((p: any) => {
          p.position.y += p.userData.speedY * delta;
          p.rotation.y += delta;
          p.position.x += Math.sin(currentTime * 0.002 + p.userData.seed) * 0.003;
          if (p.position.y > 3.2) {
            p.position.y = 0.2;
            p.position.x = (Math.random() - 0.5) * 4.5;
          }
        });
      }

      // Animate bonk puff if visible
      if (bonkEffectRef.current && bonkEffectRef.current.visible) {
        bonkEffectRef.current.scale.multiplyScalar(1 + delta * 3);
        if (bonkEffectRef.current.scale.x > 1.8) {
          bonkEffectRef.current.visible = false;
          bonkEffectRef.current.scale.set(1, 1, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', handlePointerDown);
      domEl.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);

      if (shiviRigRef.current) shiviRigRef.current.dispose();
      if (rashiRigRef.current) rashiRigRef.current.dispose();
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, []);

  // Sync 3D characters with Game State
  useEffect(() => {
    const shivi = shiviRigRef.current;
    const rashi = rashiRigRef.current;
    if (!shivi || !rashi) return;

    if (activeAction) return; // Keep manual action if user triggered one

    // Step-based positions and animations
    switch (step) {
      case 'intro': {
        shivi.root.position.set(-1.1, 0, 0.2);
        shivi.root.rotation.y = 0.45;
        shivi.setAnimation(shiviReaction === 'panic' ? 'panic' : 'idle');

        rashi.root.position.set(1.4, 0, -0.2);
        rashi.root.rotation.y = -0.6;
        rashi.setAnimation('peek');
        break;
      }

      case 'food': {
        if (rashiReaction === 'eating') {
          // Shivi feeds Rashi
          shivi.root.position.set(-0.55, 0, 0.2);
          shivi.root.rotation.y = 0.7;
          shivi.setAnimation('idle');

          rashi.root.position.set(0.55, 0, 0.2);
          rashi.root.rotation.y = -0.7;
          rashi.setAnimation('eat');
        } else if (rashiReaction === 'bonked') {
          // Bonk sequence
          trigger3DBonk();
        } else {
          // Rashi pouting, Shivi desperate
          shivi.root.position.set(-1.0, 0, 0.2);
          shivi.root.rotation.y = 0.5;
          shivi.setAnimation(shiviReaction === 'panic' ? 'panic' : 'idle');

          rashi.root.position.set(1.1, 0, 0.1);
          rashi.root.rotation.y = -0.4;
          rashi.setAnimation('pout');
        }
        break;
      }

      case 'medicine': {
        if (rashiReaction === 'sparkle') {
          shivi.root.position.set(-0.6, 0, 0.2);
          shivi.root.rotation.y = 0.5;
          shivi.setAnimation('celebrate');

          rashi.root.position.set(0.6, 0, 0.2);
          rashi.root.rotation.y = -0.5;
          rashi.setAnimation('celebrate');
        } else {
          // Rashi hiding behind chair/dresser
          shivi.root.position.set(-0.8, 0, 0.4);
          shivi.root.rotation.y = 0.6;
          shivi.setAnimation('idle');

          rashi.root.position.set(1.6, 0, -0.4);
          rashi.root.rotation.y = -0.8;
          rashi.setAnimation('hide');
        }
        break;
      }

      case 'chaos':
      case 'kpop': {
        // High energy dance synchronization!
        shivi.root.position.set(-0.65, 0, 0.2);
        shivi.root.rotation.y = 0.15;
        shivi.setAnimation('dance');

        rashi.root.position.set(0.65, 0, 0.2);
        rashi.root.rotation.y = -0.15;
        rashi.setAnimation('dance');
        break;
      }

      case 'saved': {
        // Reunion emotional hug
        shivi.root.position.set(-0.32, 0, 0.1);
        shivi.root.rotation.y = 1.2;
        shivi.setAnimation('hug');

        rashi.root.position.set(0.32, 0, 0.1);
        rashi.root.rotation.y = -1.2;
        rashi.setAnimation('hug');
        break;
      }
    }
  }, [step, rashiReaction, shiviReaction, activeAction]);

  // Execute 3D Comedic Bonk Animation
  const trigger3DBonk = useCallback(() => {
    const shivi = shiviRigRef.current;
    const rashi = rashiRigRef.current;
    if (!shivi || !rashi) return;

    sound.playHeartClick();
    setActiveAction('bonk');

    // Shivi rushes in with pillow
    shivi.root.position.set(-0.5, 0, 0.2);
    shivi.root.rotation.y = 0.8;
    shivi.setAnimation('bonk_swing');

    rashi.root.position.set(0.5, 0, 0.2);
    rashi.root.rotation.y = -0.8;

    // At strike moment, show cartoon puff & dizziness
    setTimeout(() => {
      if (bonkEffectRef.current) {
        bonkEffectRef.current.position.set(0.3, 1.7, 0.2);
        bonkEffectRef.current.visible = true;
        bonkEffectRef.current.scale.set(0.4, 0.4, 0.4);
      }
      rashi.setAnimation('bonked_react');
      setInteractiveBubble({
        character: 'rashi',
        text: 'Ouchie! Fine, I will eat! 😭',
      });
    }, 380);

    setTimeout(() => {
      setActiveAction(null);
      setInteractiveBubble(null);
    }, 2400);

    if (onBonkTrigger) onBonkTrigger();
  }, [onBonkTrigger]);

  // Action Button Handlers for direct playful exploration
  const handleTriggerAction = (animName: string) => {
    const shivi = shiviRigRef.current;
    const rashi = rashiRigRef.current;
    if (!shivi || !rashi) return;

    sound.playHeartClick();
    setActiveAction(animName);

    switch (animName) {
      case 'chase':
        shivi.root.position.set(-1.0, 0, 0.2);
        shivi.root.rotation.y = 1.4;
        shivi.setAnimation('chase');

        rashi.root.position.set(1.0, 0, 0.2);
        rashi.root.rotation.y = 1.4;
        rashi.setAnimation('escape');
        setInteractiveBubble({ character: 'rashi', text: "Can't catch me! 🏃‍♀️💨" });
        break;

      case 'peek':
        rashi.root.position.set(1.5, 0, -0.3);
        rashi.root.rotation.y = -0.7;
        rashi.setAnimation('peek');
        shivi.setAnimation('idle');
        setInteractiveBubble({ character: 'rashi', text: 'Peekaboo! 👀' });
        break;

      case 'wave':
        rashi.setAnimation('wave_tease');
        shivi.setAnimation('panic');
        setInteractiveBubble({ character: 'rashi', text: 'Catch me if you can ♡' });
        break;

      case 'sleep':
        rashi.root.position.set(0.6, 0, 0.1);
        rashi.setAnimation('sit_sleep');
        shivi.setAnimation('panic');
        setInteractiveBubble({ character: 'rashi', text: 'Zzz... I am sleeping, go away 😴' });
        break;

      case 'dance':
        shivi.setAnimation('dance');
        rashi.setAnimation('dance');
        setInteractiveBubble({ character: 'shivi', text: 'K-Pop rhythm battle! 💃🕺' });
        break;

      case 'bonk':
        trigger3DBonk();
        return;
    }

    setTimeout(() => {
      setActiveAction(null);
      setInteractiveBubble(null);
    }, 3200);
  };

  // Reset stage camera angle
  const handleResetCamera = () => {
    targetCameraAngleRef.current = { theta: 0, phi: 0.25, distance: 4.8 };
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-universe-wine/60 bg-gradient-to-b from-[#1b0716] via-[#100311] to-[#080108] shadow-[0_0_40px_rgba(255,40,94,0.25)] select-none">
      
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[320px] sm:h-[390px] cursor-grab active:cursor-grabbing relative"
      />

      {/* Dynamic 3D Speech Bubbles for Shivi and Rashi */}
      <div className="absolute top-3 left-3 sm:left-5 pointer-events-none z-10 max-w-[190px] sm:max-w-[240px]">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-universe-crimson/60 shadow-glow-red text-[10px] sm:text-xs font-serif italic text-white animate-fadeIn">
          <span className="text-[9px] font-mono uppercase tracking-wider text-universe-glowingRed block font-bold mb-0.5">
            Shivi (Chaotic Wifeyy):
          </span>
          "{shiviSpeech || 'RASHI. EAT YOUR FOOD 😭'}"
        </div>
      </div>

      {interactiveBubble && (
        <div
          className={`absolute top-3 right-3 sm:right-5 pointer-events-none z-10 max-w-[190px] sm:max-w-[220px] animate-scaleUp`}
        >
          <div className="p-2 sm:p-2.5 rounded-2xl bg-purple-950/90 backdrop-blur-md border border-purple-400 text-[10px] sm:text-xs font-handwritten text-universe-cream shadow-glow-wine">
            <span className="text-[9px] font-mono uppercase tracking-wider text-purple-300 block font-bold mb-0.5">
              {interactiveBubble.character === 'rashi' ? 'Rashi:' : 'Shivi:'}
            </span>
            "{interactiveBubble.text}"
          </div>
        </div>
      )}

      {/* Top Controls: Camera Reset & 360° Inspector */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
        <button
          onClick={handleResetCamera}
          className="p-1.5 sm:p-2 rounded-full bg-universe-black/80 border border-universe-wine/60 text-universe-blush hover:text-white hover:border-universe-gold transition-all touch-manipulation"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {onOpenInspector && (
          <button
            onClick={onOpenInspector}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-universe-crimson/80 hover:bg-universe-crimson border border-universe-gold/60 text-[10px] sm:text-xs font-mono text-white flex items-center gap-1.5 shadow-glow-red transition-all touch-manipulation hover:scale-105"
            title="Inspect 3D Characters in 360°"
          >
            <Maximize2 className="w-3 h-3 text-universe-gold" />
            <span>3D Inspector</span>
          </button>
        )}
      </div>

      {/* Stage Bottom Interactive Action Bar */}
      <div className="absolute bottom-2.5 inset-x-2 sm:inset-x-4 flex items-center justify-between pointer-events-none z-20">
        <div className="text-[9px] sm:text-[10px] font-mono text-universe-lavender/70 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
          <span>🖱️ Drag to rotate 3D view</span>
        </div>

        {/* Fun Direct Action Triggers */}
        <div className="flex items-center gap-1.5 pointer-events-auto overflow-x-auto py-1 max-w-[70%] sm:max-w-none justify-end">
          <button
            onClick={trigger3DBonk}
            className="px-2.5 py-1 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-[10px] sm:text-xs font-mono font-bold uppercase shadow-glow-red hover:scale-105 active:scale-95 transition-all flex items-center gap-1 touch-manipulation"
          >
            <span>☁️</span>
            <span>Bonk!</span>
          </button>

          <button
            onClick={() => handleTriggerAction('chase')}
            className="px-2 py-1 rounded-full bg-universe-darkBurgundy/90 border border-universe-wine/60 hover:border-universe-gold text-universe-blush hover:text-white text-[10px] sm:text-xs font-mono transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            🏃 Chase
          </button>

          <button
            onClick={() => handleTriggerAction('peek')}
            className="px-2 py-1 rounded-full bg-universe-darkBurgundy/90 border border-universe-wine/60 hover:border-universe-gold text-universe-blush hover:text-white text-[10px] sm:text-xs font-mono transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            👀 Peek
          </button>

          <button
            onClick={() => handleTriggerAction('wave')}
            className="px-2 py-1 rounded-full bg-universe-darkBurgundy/90 border border-universe-wine/60 hover:border-universe-gold text-universe-blush hover:text-white text-[10px] sm:text-xs font-mono transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            👋 Tease
          </button>

          <button
            onClick={() => handleTriggerAction('sleep')}
            className="px-2 py-1 rounded-full bg-purple-950/80 border border-purple-600/50 hover:border-purple-300 text-purple-200 text-[10px] sm:text-xs font-mono transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            😴 Sleep
          </button>

          <button
            onClick={() => handleTriggerAction('dance')}
            className="px-2 py-1 rounded-full bg-gradient-to-r from-purple-800 to-pink-700 text-white text-[10px] sm:text-xs font-mono transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            💃 Dance
          </button>
        </div>
      </div>

    </div>
  );
}
