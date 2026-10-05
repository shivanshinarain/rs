import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCharacterRig } from './createCharacterRig';
import { applyCharacterAnimation } from './characterAnimations';
import { CharacterAnimationType, CharacterId, CharacterRig, EyeExpression, MouthExpression } from './types';
import { sound } from '../../utils/audioEngine';
import {
  X,
  RotateCcw,
  Sparkles,
  Heart,
  Eye,
  Smile,
  ShieldAlert,
  Play,
  Volume2
} from 'lucide-react';

interface CharacterInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCharacter?: CharacterId;
}

export default function CharacterInspectorModal({
  isOpen,
  onClose,
  initialCharacter = 'shivi',
}: CharacterInspectorModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>(initialCharacter);
  const [currentAnim, setCurrentAnim] = useState<CharacterAnimationType>('idle');
  const [currentEye, setCurrentEye] = useState<EyeExpression>('normal');
  const [currentMouth, setCurrentMouth] = useState<MouthExpression>('smile');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rigRef = useRef<CharacterRig | null>(null);

  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: 0, phi: 0.2, distance: 3.8 });
  const targetAngleRef = useRef({ theta: 0, phi: 0.2, distance: 3.8 });

  // Re-build 3D Scene when modal opens or character switches
  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 3.8);
    cameraRef.current = camera;

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
    renderer.toneMappingExposure = 1.2;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lighting for Character Inspection
    const ambientLight = new THREE.AmbientLight(0x351833, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ee, 2.5);
    keyLight.position.set(2.5, 4, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Signature mobile-game crisp rim backlight
    const rimLight = new THREE.DirectionalLight(0xd8b4fe, 3.2);
    rimLight.position.set(-2.5, 3, -3.5);
    scene.add(rimLight);

    // Warm floor fill
    const fillLight = new THREE.PointLight(0xff285e, 1.8, 6);
    fillLight.position.set(0, 0.3, 1.8);
    scene.add(fillLight);

    // Stylized Dark-Universe Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.75, 0.2, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x160618,
      roughness: 0.3,
      metalness: 0.3,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.1;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Glowing ring
    const ringGeo = new THREE.TorusGeometry(1.58, 0.025, 12, 48);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffb703,
      emissiveIntensity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.005;
    scene.add(ring);

    // Floating Stardust Particles
    const particles = new THREE.Group();
    for (let i = 0; i < 24; i++) {
      const p = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.025),
        new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.8 })
      );
      p.position.set(
        (Math.random() - 0.5) * 2.8,
        Math.random() * 2.6 + 0.1,
        (Math.random() - 0.5) * 2.8
      );
      particles.add(p);
    }
    scene.add(particles);

    // Create Selected Rig
    const rig = createCharacterRig(selectedCharacter);
    rig.root.position.set(0, 0, 0);
    rig.setAnimation(currentAnim);
    rig.setExpression(currentEye, currentMouth);
    scene.add(rig.root);
    rigRef.current = rig;

    // Drag to rotate controls
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseRef.current = { x, y };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = x - prevMouseRef.current.x;
      const deltaY = y - prevMouseRef.current.y;

      targetAngleRef.current.theta -= deltaX * 0.008;
      targetAngleRef.current.phi = Math.max(
        -0.1,
        Math.min(0.6, targetAngleRef.current.phi + deltaY * 0.006)
      );

      prevMouseRef.current = { x, y };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    // Animation Loop
    let lastTime = performance.now();
    let animId: number;

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth camera interpolation
      cameraAngleRef.current.theta +=
        (targetAngleRef.current.theta - cameraAngleRef.current.theta) * 0.1;
      cameraAngleRef.current.phi +=
        (targetAngleRef.current.phi - cameraAngleRef.current.phi) * 0.1;

      const dist = cameraAngleRef.current.distance;
      const camY = 1.35 + Math.sin(cameraAngleRef.current.phi) * dist;
      const camR = Math.cos(cameraAngleRef.current.phi) * dist;
      const camX = Math.sin(cameraAngleRef.current.theta) * camR;
      const camZ = Math.cos(cameraAngleRef.current.theta) * camR;

      camera.position.set(camX, camY, camZ);
      camera.lookAt(0, 1.25, 0);

      if (rigRef.current) {
        applyCharacterAnimation(rigRef.current, delta);
      }

      particles.rotation.y += delta * 0.15;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);

      if (rigRef.current) rigRef.current.dispose();
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [isOpen, selectedCharacter]);

  // Handle animation change
  const handleChangeAnimation = (anim: CharacterAnimationType) => {
    sound.playHeartClick();
    setCurrentAnim(anim);
    if (rigRef.current) {
      rigRef.current.setAnimation(anim);
    }
  };

  // Handle expression change
  const handleChangeExpression = (eye: EyeExpression, mouth: MouthExpression) => {
    sound.playChime();
    setCurrentEye(eye);
    setCurrentMouth(mouth);
    if (rigRef.current) {
      rigRef.current.setExpression(eye, mouth);
    }
  };

  const handleResetCamera = () => {
    targetAngleRef.current = { theta: 0, phi: 0.2, distance: 3.8 };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn select-none overflow-y-auto">
      <div className="max-w-4xl w-full rounded-3xl bg-gradient-to-b from-[#200818] via-[#120311] to-[#070107] border-2 border-universe-wine/80 shadow-[0_0_70px_rgba(255,40,94,0.35)] p-5 sm:p-7 relative text-left space-y-5 my-auto max-h-[94vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-universe-lavender hover:text-white bg-universe-wine/30 transition-all touch-manipulation z-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-universe-crimson/20 border border-universe-glowingRed/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-universe-blush">
            <Sparkles className="w-3 h-3 text-universe-gold" />
            <span>Original Stylized 3D Mobile-Game Characters</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-tight">
            3D CHARACTER SHOWCASE ♡
          </h2>
          <p className="text-xs sm:text-sm text-universe-blush/80 italic font-handwritten">
            Inspired by the clean, chunky proportions and polished lighting of mobile runners, crafted originally for Shivi & Rashi.
          </p>
        </div>

        {/* Character Switcher Tabs */}
        <div className="flex gap-2 border-b border-universe-wine/40 pb-3">
          <button
            onClick={() => {
              sound.playHeartClick();
              setSelectedCharacter('shivi');
            }}
            className={`px-5 py-2.5 rounded-2xl font-serif text-sm font-bold transition-all touch-manipulation flex items-center gap-2 ${
              selectedCharacter === 'shivi'
                ? 'bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white shadow-glow-red scale-105'
                : 'bg-black/50 text-universe-lavender hover:text-white border border-universe-wine/40'
            }`}
          >
            <span>👑 SHIVI</span>
            <span className="text-[10px] font-mono opacity-80">(The Chaotic Girlfriend)</span>
          </button>

          <button
            onClick={() => {
              sound.playHeartClick();
              setSelectedCharacter('rashi');
            }}
            className={`px-5 py-2.5 rounded-2xl font-serif text-sm font-bold transition-all touch-manipulation flex items-center gap-2 ${
              selectedCharacter === 'rashi'
                ? 'bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-glow-wine scale-105'
                : 'bg-black/50 text-universe-lavender hover:text-white border border-universe-wine/40'
            }`}
          >
            <span>🧸 RASHI</span>
            <span className="text-[10px] font-mono opacity-80">(The Mischievous Wifeyy)</span>
          </button>
        </div>

        {/* Main Inspection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* 3D Viewport (Left / Top) */}
          <div className="lg:col-span-7 relative rounded-2xl bg-black/60 border border-universe-wine/50 overflow-hidden shadow-inner flex flex-col">
            <div
              ref={containerRef}
              className="w-full h-[320px] sm:h-[400px] cursor-grab active:cursor-grabbing relative"
            />

            {/* Viewport Overlay Controls */}
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                onClick={handleResetCamera}
                className="p-2 rounded-full bg-black/70 border border-universe-wine/60 text-universe-blush hover:text-white transition-all touch-manipulation"
                title="Reset Camera View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[10px] font-mono text-universe-lavender/60 pointer-events-none">
              <span>🖱️ Drag to orbit 360°</span>
              <span className="text-universe-gold uppercase font-bold tracking-wider">
                Active: {currentAnim}
              </span>
            </div>
          </div>

          {/* Control Panel (Right / Bottom) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Character Lore & Details */}
            <div className="p-3.5 rounded-2xl bg-black/50 border border-universe-wine/40 space-y-1 text-xs">
              <span className="font-mono text-universe-gold uppercase tracking-wider text-[10px] block">
                Visual Language & Identity:
              </span>
              {selectedCharacter === 'shivi' ? (
                <div className="space-y-1 font-sans text-universe-cream/90">
                  <p className="font-semibold text-universe-blush">
                    • Confident, expressive, playful, and beautifully chaotic.
                  </p>
                  <p className="text-[11px] text-universe-lavender/80">
                    • Outfit: Deep wine/crimson streetwear cropped jacket with universe-gold accents, dark activewear joggers, and chunky mobile-game sneakers with thick white rubber soles.
                  </p>
                  <p className="text-[11px] text-universe-lavender/80">
                    • Weapon of Choice: Harmless fluffy star pillow for comedic bonks when Rashi forgets to eat!
                  </p>
                </div>
              ) : (
                <div className="space-y-1 font-sans text-universe-cream/90">
                  <p className="font-semibold text-universe-blush">
                    • Mischievous, cute, chaotic, loves to run away and tease.
                  </p>
                  <p className="text-[11px] text-universe-lavender/80">
                    • Outfit: Oversized cozy lavender hoodie (stolen from Shivi!), wispy bangs with a lilac butterfly hairclip, and chunky sneakers with bear socks.
                  </p>
                  <p className="text-[11px] text-universe-lavender/80">
                    • Signature Move: Sneaking behind teddy bears, pretending to sleep, and dodging food until caught!
                  </p>
                </div>
              )}
            </div>

            {/* Animation Selector */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-universe-gold block">
                🎭 Select Animation Test:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs font-mono">
                {[
                  { id: 'idle', label: 'Idle Stance' },
                  { id: 'run', label: '🏃 Sprint Run' },
                  { id: 'chase', label: '⚡ Chase / Escape' },
                  { id: 'bonk_swing', label: '☁️ Pillow Bonk' },
                  { id: 'bonked_react', label: '💫 Bonked React' },
                  { id: 'peek', label: '👀 Peek Corner' },
                  { id: 'wave_tease', label: '👋 Tease Wave' },
                  { id: 'sit_sleep', label: '😴 Pretend Sleep' },
                  { id: 'pout', label: '😤 Pout / Arms Fold' },
                  { id: 'eat', label: '🍜 Eat Food' },
                  { id: 'dance', label: '💃 K-Pop Dance' },
                  { id: 'celebrate', label: '🎉 Celebrate' },
                  { id: 'hug', label: '❤️ Emotional Hug' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleChangeAnimation(item.id as CharacterAnimationType)}
                    className={`p-2 rounded-xl border text-center transition-all touch-manipulation text-[11px] ${
                      currentAnim === item.id
                        ? 'bg-universe-crimson/80 border-universe-gold text-white font-bold shadow-glow-red scale-102'
                        : 'bg-universe-darkBurgundy/40 border-universe-wine/40 text-universe-blush hover:border-universe-gold/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Facial Expression Selector */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-universe-gold block">
                👀 Facial Expressions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { eye: 'normal', mouth: 'smile', label: 'Normal / Smile' },
                  { eye: 'happy', mouth: 'smile', label: '✨ Happy' },
                  { eye: 'wink', mouth: 'smile', label: '😉 Wink' },
                  { eye: 'blink', mouth: 'flat', label: '😐 Blink' },
                  { eye: 'panic', mouth: 'open', label: '😱 Panic' },
                  { eye: 'sleepy', mouth: 'smile', label: '😴 Sleepy' },
                  { eye: 'bonked', mouth: 'pout', label: '💫 Dizzy Stars' },
                ].map((expr, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      handleChangeExpression(
                        expr.eye as EyeExpression,
                        expr.mouth as MouthExpression
                      )
                    }
                    className={`px-2.5 py-1 rounded-full border text-[10px] font-mono transition-all touch-manipulation ${
                      currentEye === expr.eye && currentMouth === expr.mouth
                        ? 'bg-purple-700 border-purple-400 text-white'
                        : 'bg-black/50 border-universe-wine/40 text-universe-lavender hover:text-white'
                    }`}
                  >
                    {expr.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
