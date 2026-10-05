import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCharacterRig } from './createCharacterRig';
import { applyCharacterAnimation } from './characterAnimations';
import { CharacterId, CharacterRig } from './types';
import { sound } from '../../utils/audioEngine';

interface MiniCharacterAvatarProps {
  character: CharacterId;
  state?: 'idle' | 'reaching' | 'walking' | 'hugging' | 'waving' | 'happy';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export default function MiniCharacterAvatar({
  character,
  state = 'idle',
  className = '',
  onClick,
  interactive = true,
}: MiniCharacterAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<CharacterRig | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 140;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    // Framing character nicely (waist up or full body)
    camera.position.set(0, 1.45, 3.4);
    camera.lookAt(0, 1.35, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x281228, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff2e6, 2.4);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    // Signature mobile game rim light
    const rimLight = new THREE.DirectionalLight(0xd8b4fe, 2.8);
    rimLight.position.set(-2, 2.5, -3);
    scene.add(rimLight);

    // Floor fill
    const fillLight = new THREE.PointLight(0xff285e, 1.2, 5);
    fillLight.position.set(0, 0.2, 1.5);
    scene.add(fillLight);

    // Create Rig
    const rig = createCharacterRig(character);
    rig.root.position.set(0, 0, 0);

    // Map avatar state to rig animation
    if (state === 'reaching') {
      rig.setAnimation('chase');
      // Subtle reach pose
      rig.leftArm.rotation.x = -1.2;
      rig.rightArm.rotation.x = -1.2;
    } else if (state === 'walking') {
      rig.setAnimation('run');
    } else if (state === 'hugging') {
      rig.setAnimation('hug');
    } else if (state === 'waving') {
      rig.setAnimation('wave_tease');
    } else {
      rig.setAnimation('idle');
    }

    scene.add(rig.root);
    rigRef.current = rig;

    // Render loop
    let lastTime = performance.now();
    let animId: number;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (rigRef.current) {
        applyCharacterAnimation(rigRef.current, delta);

        // Gentle turntable or interactive lean
        if (state === 'reaching') {
          const sign = character === 'shivi' ? 1 : -1;
          rigRef.current.root.rotation.y = sign * 0.45;
          rigRef.current.spine.rotation.x = 0.15;
          rigRef.current.rightArm.rotation.x = -1.3;
          rigRef.current.rightArm.rotation.z = -0.3;
        }
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 140;
      const h = container.clientHeight || 180;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      rig.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [character, state]);

  const handleClick = () => {
    if (interactive) {
      sound.playHeartClick();
    }
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block select-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 touch-manipulation ${className}`}
      title={`${character === 'shivi' ? 'Shivi' : 'Rashi'} (3D) ♡`}
    >
      <div
        ref={containerRef}
        className="w-full h-full min-h-[140px] sm:min-h-[190px] relative pointer-events-none"
      />
    </div>
  );
}
