import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lightBeams = useRef<{ x: number; opacity: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      // Main particles
      const mainParticles = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      }));

      // Background micro particles
      const microParticles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3
      }));

      particles.current = [...mainParticles, ...microParticles];
      
      // Create light beams
      lightBeams.current = Array.from({ length: 3 }, () => ({
        x: Math.random() * canvas.width,
        opacity: Math.random() * 0.2
      }));
    };

    const drawLightBeams = () => {
      lightBeams.current.forEach((beam) => {
        const gradient = ctx.createLinearGradient(beam.x, 0, beam.x + 100, canvas.height);
        gradient.addColorStop(0, `rgba(147, 197, 253, 0)`);
        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${beam.opacity})`);
        gradient.addColorStop(1, `rgba(147, 197, 253, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(beam.x, 0, 100, canvas.height);

        // Move beam slowly
        beam.x += 0.2;
        if (beam.x > canvas.width) {
          beam.x = -100;
          beam.opacity = Math.random() * 0.2;
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw light beams first
      drawLightBeams();

      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${particle.opacity})`;
        ctx.fill();

        // Connect particles near mouse (only for larger particles)
        if (particle.size > 0.5) {
          const dx = particle.x - mousePos.current.x;
          const dy = particle.y - mousePos.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mousePos.current.x, mousePos.current.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.5 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};