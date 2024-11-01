import React, { useEffect, useRef, useState } from 'react';
import { GlowingOrb } from './components/GlowingOrb';
import { ParticleField } from './components/ParticleField';
import { TracingBeam } from './components/TracingBeam';
import { Navigation } from './components/Navigation';
import { SideNav } from './components/SideNav';
import { GlassCard } from './components/GlassCard';
import { ScrollSnap } from './components/ScrollSnap';
import { MouseParticles } from './components/MouseParticles';
import { Code, Lightbulb, Rocket, Send, RefreshCw } from 'lucide-react';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrolled / maxScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-[#0a0a0c] text-white overflow-x-hidden">
      <Navigation />
      <SideNav />
      <TracingBeam progress={scrollProgress} />
      <MouseParticles />
      
      <ScrollSnap>
        <header id="home" ref={headerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
          <ParticleField />
          <GlowingOrb />
          <h1 className="text-[12vw] font-black uppercase tracking-tighter z-10 text-center 
                         animate-fade-in-up text-shadow-glow">
            The Mother
          </h1>
          <p className="text-3xl md:text-[3vw] font-light opacity-80 mt-8 z-10 
                       animate-fade-in-up animation-delay-300">
            Forge Your Digital Legacy
          </p>
        </header>

        <section id="ideate" className="min-h-screen flex items-center py-16 px-4">
          <GlassCard
            icon={<Lightbulb className="w-8 h-8" />}
            title="Ideate"
            description="Transform concepts into digital reality with our advanced AI-powered ideation system."
            image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
          />
        </section>

        <section id="analyze" className="min-h-screen flex items-center py-16 px-4">
          <GlassCard
            icon={<Code className="w-8 h-8" />}
            title="Analyze"
            description="Deep dive into data patterns with real-time visualization and predictive analytics."
            image="https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?auto=format&fit=crop&q=80&w=1200"
          />
        </section>

        <section id="create" className="min-h-screen flex items-center py-16 px-4">
          <GlassCard
            icon={<Rocket className="w-8 h-8" />}
            title="Create"
            description="Bring your vision to life with our cutting-edge development tools and frameworks."
            image="https://images.unsplash.com/photo-1581822261290-991b38693d39?auto=format&fit=crop&q=80&w=1200"
          />
        </section>

        <section id="deploy" className="min-h-screen flex items-center py-16 px-4">
          <GlassCard
            icon={<Send className="w-8 h-8" />}
            title="Deploy"
            description="Launch your projects seamlessly with our automated deployment pipeline."
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=1200"
          />
        </section>

        <section id="iterate" className="min-h-screen flex items-center py-16 px-4">
          <GlassCard
            icon={<RefreshCw className="w-8 h-8" />}
            title="Iterate"
            description="Continuously improve and evolve your solutions with data-driven insights."
            image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
          />
        </section>

        <footer className="min-h-screen flex items-center bg-[rgba(20,20,25,0.8)] backdrop-blur-xl py-16 px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-16">
              <h3 className="text-4xl font-bold mb-4">THE MOTHER</h3>
              <p className="opacity-70 mb-8">Building the future, one pixel at a time</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
              </div>
            </div>
            
            {/* Placeholder for XYFlow canvas - You'll need to install and implement react-flow */}
            <div className="w-full h-[400px] bg-black/30 rounded-xl border border-white/10">
              {/* XYFlow canvas will be implemented here */}
            </div>
          </div>
        </footer>
      </ScrollSnap>
    </div>
  );
}

export default App;