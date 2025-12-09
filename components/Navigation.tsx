import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Box, Layers, Users, Zap } from 'lucide-react';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'problem', label: '背景' },
    { id: 'bitcoin-script', label: '脚本' },
    { id: 'concept', label: '原理' },
    { id: 'architecture', label: '核心架构' },
    { id: 'usecases', label: '场景' },
    { id: 'why', label: '目标' },
    { id: 'comparison', label: '对比' },
    { id: 'consensus', label: '共识' },
    { id: 'halvingCountdown', label: '减半' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer text-stone-900" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
           <span className="text-orange-500">OP_CAT Layer</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-stone-600 hover:text-orange-500 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
           <a 
            href="https://t.me/opcat_layer" 
            target="_blank" 
            rel="noreferrer"
            className="px-5 py-2 bg-stone-900 text-white font-bold text-sm rounded-lg hover:bg-stone-700 transition-colors shadow-lg"
           >
             加入社区
           </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-stone-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-stone-200 p-6 md:hidden flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-lg font-medium text-stone-600 hover:text-orange-500"
            >
              {link.label}
            </button>
          ))}
           <a 
            href="https://github.com/sCrypt-Inc/awesome-op-cat" 
            target="_blank" 
            rel="noreferrer"
            className="w-full text-center px-5 py-3 bg-stone-900 text-white font-bold rounded-lg"
           >
             加入社区
           </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;