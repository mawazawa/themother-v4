import React, { useEffect, useState } from 'react';
import { User, Menu, Github } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
                 ${isScrolled ? 'glass-effect py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 pl-16">
        <div className="text-xl font-inter font-bold tracking-tight text-white/90">
          THE MOTHER
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8">
            {['IDEATE', 'ANALYZE', 'CREATE', 'DEPLOY'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-inter font-bold text-sm tracking-wide
                         text-white/80 hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Github className="w-5 h-5 text-white/80" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <User className="w-5 h-5 text-white/80" />
            </button>
            <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};