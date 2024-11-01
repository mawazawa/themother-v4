import React from 'react';

interface TracingBeamProps {
  progress: number;
}

export const TracingBeam: React.FC<TracingBeamProps> = ({ progress }) => {
  return (
    <div 
      className="fixed top-0 left-1/2 w-0.5 h-screen pointer-events-none z-50
                 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"
      style={{
        transform: `translateX(-50%) scaleY(${1 + progress * 0.2})`,
        opacity: 0.5 + progress * 0.3,
        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
      }}
    />
  );
};