import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCharacterRig } from './createCharacterRig';
import { applyCharacterAnimation } from './characterAnimations';
import { CharacterRig } from './types';

interface CoupleHug3DCanvasProps {
  className?: string;
  onClick?: () => void;
}

export default function CoupleHug3DCanvas({
  className = '',
  onClick,
}: CoupleHug3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shiviRef = useRef<CharacterRig | null>(null);
  const rashiRef = useRef<CharacterRig | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 1.45, 3.8);
    camera.lookAt(0, 1.3, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Warm & Romantic Lighting
    const ambientLight = new THREE.AmbientLight(0x351428, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0e6, 2.5);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd8b4fe, 3.0);
    rimLight.position.set(-2, 3, -3);
    scene.add(rimLight);

    const redGlow = new THREE.PointLight(0xff285e, 2.0, 6);
    redGlow.position.set(0, 1.2, 0.8);
    scene.add(redGlow);

    // Shivi Rig
    const shivi = createCharacterRig('shivi');
    shivi.root.position.set(-0.35, 0, 0.05);
    shivi.root.rotation.y = 1.15;
    shivi.setAnimation('hug');
    scene.add(shivi.root);
    shiviRef.current = shivi;

    // Rashi Rig
    const rashi = createCharacterRig('rashi');
    rashi.root.position.set(0.35, 0, 0.05);
    rashi.root.rotation.y = -1.15;
    rashi.setAnimation('hug');
    scene.add(rashi.root);
    rashiRef.current = rashi;

    // Glowing Red Thread Curve connecting hands
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.15, 1.2, 0.25),
      new THREE.Vector3(0, 1.05, 0.35),
      new THREE.Vector3(0.15, 1.2, 0.25),
    ]);
    const threadGeo = new THREE.TubeGeometry(curve, 20, 0.015, 8, false);
    const threadMat = new THREE.MeshBasicMaterial({
      color: 0xff285e,
    });
    const threadMesh = new THREE.Mesh(threadGeo, threadMat);
    scene.add(threadMesh);

    // Glowing heart at center of thread
    const heartMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.06),
      new THREE.MeshBasicMaterial({ color: 0xffd166 })
    );
    heartMesh.position.set(0, 1.05, 0.36);
    scene.add(heartMesh);

    // Floating Stardust Particles
    const particles = new THREE.Group();
    for (let i = 0; i < 20; i++) {
      const p = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.025),
        new THREE.MeshBasicMaterial({ color: 0xff9ebb, transparent: true, opacity: 0.85 })
      );
      p.position.set(
        (Math.random() - 0.5) * 2.2,
        Math.random() * 2 + 0.3,
        (Math.random() - 0.5) * 2
      );
      particles.add(p);
    }
    scene.add(particles);

    // Loop
    let lastTime = performance.now();
    let animId: number;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (shiviRef.current) applyCharacterAnimation(shiviRef.current, delta);
      if (rashiRef.current) applyCharacterAnimation(rashiRef.current, delta);

      // Gentle camera sway
      const sway = Math.sin(time * 0.001) * 0.25;
      camera.position.x = sway;
      camera.lookAt(0, 1.3, 0);

      particles.rotation.y += delta * 0.2;
      heartMesh.rotation.y += delta * 2;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      shivi.dispose();
      rashi.dispose();
      threadGeo.dispose();
      threadMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none cursor-pointer transition-transform duration-300 hover:scale-102 ${className}`}
      title="Shivi & Rashi 3D Embrace ♡"
    >
      <div
        ref={containerRef}
        className="w-full h-[240px] sm:h-[300px] relative pointer-events-none"
      />
    </div>
  );
}
