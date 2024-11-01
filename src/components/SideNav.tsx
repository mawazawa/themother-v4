import React, { useState, useEffect } from 'react';

export const SideNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'ideate', label: 'Ideate' },
    { id: 'analyze', label: 'Analyze' },
    { id: 'create', label: 'Create' },
    { id: 'deploy', label: 'Deploy' },
    { id: 'iterate', label: 'Iterate' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + window.innerHeight / 2;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-0 top-0 h-full z-40 flex items-center">
      <div className="glass-effect h-full py-6 w-12 flex justify-center">
        <ul className="flex flex-col gap-12">
          {sections.map(({ id, label }) => (
            <li key={id} className="relative">
              <button
                onClick={() => handleClick(id)}
                className={`transform rotate-90 origin-left whitespace-nowrap
                         font-inter font-semibold text-sm tracking-wide
                         transition-colors duration-300 translate-x-3
                         hover:text-blue-400 ${activeSection === id ? 'text-blue-400' : 'text-white/70'}`}
              >
                {label}
              </button>
              {activeSection === id && (
                <div className="absolute left-1 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-blue-400 rounded-full" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};