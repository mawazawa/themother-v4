import React, { useEffect, useRef } from 'react';

export const GlowingOrb: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position with smooth easing
      const x = (clientX / innerWidth - 0.5) * 100;
      const y = (clientY / innerHeight - 0.5) * 100;
      
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={orbRef}
      className="absolute w-[600px] h-[600px] rounded-full pointer-events-none
                 bg-[radial-gradient(circle,rgba(147,197,253,0.5)_0%,rgba(0,0,0,0)_70%)]
                 mix-blend-screen animate-pulse"
      style={{
        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
  );
};