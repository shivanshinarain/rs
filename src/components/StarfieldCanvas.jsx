import React, { useEffect, useRef } from 'react';

export default function StarfieldCanvas({ isMobile, shootingStarTrigger = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Stars setup
    const starCount = isMobile ? 60 : 150;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.3 ? '#ffffff' : Math.random() > 0.5 ? '#f5b8c6' : '#f5cb68',
      pulse: Math.random() * Math.PI * 2
    }));

    // Shooting stars
    const shootingStars = [];

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.3,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 6 + 6,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 40 + 30
      });
    };

    let lastShootingStarTime = Date.now();

    // Mouse parallax
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Parallax offsets
      const offsetX = (mouseX - width / 2) * 0.015;
      const offsetY = (mouseY - height / 2) * 0.015;

      // Draw background ambient glow
      const grad = ctx.createRadialGradient(
        width * 0.5 + offsetX * 2,
        height * 0.4 + offsetY * 2,
        20,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, 'rgba(58, 14, 27, 0.22)');
      grad.addColorStop(0.5, 'rgba(20, 5, 13, 0.4)');
      grad.addColorStop(1, 'rgba(7, 3, 6, 0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star) => {
        star.pulse += star.speed;
        const currentAlpha = Math.max(0.1, Math.min(1, star.alpha + Math.sin(star.pulse) * 0.3));

        ctx.beginPath();
        ctx.arc(star.x + offsetX * (star.radius * 0.8), star.y + offsetY * (star.radius * 0.8), star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Auto trigger shooting star occasionally
      if (Date.now() - lastShootingStarTime > (isMobile ? 12000 : 7000)) {
        if (Math.random() > 0.4) {
          createShootingStar();
        }
        lastShootingStarTime = Date.now();
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity = Math.max(0, 1 - s.life / s.maxLife);

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const lineGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        lineGrad.addColorStop(0.8, 'rgba(245, 184, 198, 0.6)');
        lineGrad.addColorStop(1, 'rgba(255, 255, 255, 1)');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = s.opacity;
        ctx.stroke();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // Trigger shooting star on external event
  useEffect(() => {
    if (shootingStarTrigger > 0) {
      // Spawn extra stars
      // Handled via state trigger if needed
    }
  }, [shootingStarTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ willChange: 'transform' }}
    />
  );
}
