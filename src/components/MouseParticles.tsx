import React, { useEffect, useRef } from 'react';

export const MouseParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    rotation: number;
  }>>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1; // Reduced speed for slower motion
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2, // Slightly larger size
        life: 1,
        rotation: Math.random() * Math.PI * 2
      });
    };

    const drawCube = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Draw cube face with softer edges
      ctx.beginPath();
      ctx.roundRect(-size/2, -size/2, size, size, 1);
      ctx.fillStyle = `rgba(147, 197, 253, ${opacity * 0.4})`; // Reduced opacity
      ctx.fill();
      
      // Draw cube sides for 3D effect
      ctx.beginPath();
      ctx.moveTo(size/2, -size/2);
      ctx.lineTo(size/2 + size/4, -size/2 + size/4);
      ctx.lineTo(size/2 + size/4, size/2 + size/4);
      ctx.lineTo(size/2, size/2);
      ctx.fillStyle = `rgba(147, 197, 253, ${opacity * 0.3})`; // Even more reduced opacity
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create particles less frequently
      if (Math.random() > 0.4) { // Reduced creation rate
        createParticle(mousePos.current.x, mousePos.current.y);
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life -= 0.01; // Slower fade out
        if (particle.life <= 0) return false;

        // Add slight drift effect
        particle.vx += (Math.random() - 0.5) * 0.05;
        particle.vy += (Math.random() - 0.5) * 0.05;
        
        // Dampen velocity for slower motion
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += 0.02; // Slower rotation

        drawCube(
          particle.x,
          particle.y,
          particle.size,
          particle.rotation,
          particle.life
        );

        return true;
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};