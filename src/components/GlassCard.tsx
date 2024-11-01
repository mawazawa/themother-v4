import React, { useEffect, useRef, useState } from 'react';
import { Bot, Globe, Heart, Share2, Sparkles, Users, User } from 'lucide-react';

interface GlassCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ icon, title, description, image }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered || isExpanded) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => !isExpanded && setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    // ... existing renderContent code remains the same ...
  };

  return (
    <>
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          onClick={() => setIsExpanded(false)}
        />
      )}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`relative w-full max-w-7xl mx-auto overflow-hidden
                   opacity-0 translate-y-12 group cursor-pointer
                   transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                   ${isExpanded 
                     ? 'fixed inset-8 z-50 h-auto m-0 cursor-default'
                     : 'h-[300px]'}`}
        style={{
          transform: isExpanded
            ? 'scale(1) translate(-50%, -50%)'
            : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          left: isExpanded ? '50%' : 'auto',
          top: isExpanded ? '50%' : 'auto',
          transition: isHovered && !isExpanded ? 'none' : 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div 
          className={`relative h-full bg-[rgba(20,20,25,0.8)] backdrop-blur-xl rounded-2xl 
                     border overflow-hidden transition-all duration-700
                     ${isExpanded 
                       ? 'border-blue-400/30' 
                       : 'border-white/10 group-hover:border-blue-400/30'}`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-700
                         ${isExpanded 
                           ? 'opacity-5 scale-125' 
                           : 'opacity-10 scale-105 group-hover:scale-110'}`}
            />
          </div>
          
          <div className={`relative h-full flex flex-col transition-all duration-700
                          ${isExpanded ? 'p-12' : 'p-8 md:p-12'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`text-blue-400 transition-all duration-300
                             ${isExpanded 
                               ? 'scale-125 rotate-12' 
                               : 'group-hover:scale-110 group-hover:rotate-12'}`}>
                {icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
              {isExpanded && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <p className={`text-lg md:text-xl text-white/80 max-w-2xl
                          transition-all duration-700 ${isExpanded ? 'mb-8' : ''}`}>
              {description}
            </p>
            
            {isExpanded && (
              <div className="mt-8 space-y-6 animate-fade-in">
                <div className="flex gap-4">
                  {['overview', 'flow', 'chat'].map((tab) => (
                    <button
                      key={tab}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(tab);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                 ${activeTab === tab 
                                   ? 'bg-blue-500/20 text-blue-400' 
                                   : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                
                <div className="bg-black/20 rounded-xl p-6">
                  {renderContent()}
                </div>
              </div>
            )}
            
            <div className={`mt-auto pt-6 flex items-center justify-between
                            ${isExpanded ? 'opacity-0' : ''}`}>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 
                           border border-blue-400/30 rounded-lg 
                           transition-all duration-300"
              >
                Learn More →
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};