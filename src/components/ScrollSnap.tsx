import React, { useEffect, useRef } from 'react';

interface ScrollSnapProps {
  children: React.ReactNode;
}

export const ScrollSnap: React.FC<ScrollSnapProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let startY = 0;
    let currentSection = 0;
    const sections = container.children;

    const scrollToSection = (index: number) => {
      const section = sections[index] as HTMLElement;
      if (!section) return;

      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
      } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
      }

      scrollToSection(currentSection);
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const deltaY = e.touches[0].clientY - startY;
      if (Math.abs(deltaY) < 50) return;

      isScrolling = true;

      if (deltaY < 0 && currentSection < sections.length - 1) {
        currentSection++;
      } else if (deltaY > 0 && currentSection > 0) {
        currentSection--;
      }

      scrollToSection(currentSection);
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      {children}
    </div>
  );
};