
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    zh: {
      nav: [
        { id: 'problem', label: '背景' },
        { id: 'bitcoin-script', label: '脚本' },
        { id: 'concept', label: '原理' },
        { id: 'architecture', label: '核心架构' },
        { id: 'usecases', label: '场景' },
        { id: 'why', label: '目标' },
        { id: 'comparison', label: '对比' },
        { id: 'consensus', label: '共识' },
        { id: 'halvingCountdown', label: '减半' },
      ],
      cta: '加入社区'
    },
    en: {
      nav: [
        { id: 'problem', label: 'Problem' },
        { id: 'bitcoin-script', label: 'Script' },
        { id: 'concept', label: 'Concept' },
        { id: 'architecture', label: 'Architecture' },
        { id: 'usecases', label: 'Use Cases' },
        { id: 'why', label: 'Vision' },
        { id: 'comparison', label: 'Compare' },
        { id: 'consensus', label: 'Consensus' },
        { id: 'halvingCountdown', label: 'Halving' },
      ],
      cta: 'Join Community'
    }
  };

  const t = content[language];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer text-stone-900" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
           <span className="text-orange-500">OP_CAT Layer</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {t.nav.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-stone-600 hover:text-orange-500 transition-colors"
            >
              {link.label}
            </button>
          ))}

          {/* Language Switcher */}
          <button 
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-orange-500 transition-colors px-2 border-l border-stone-300"
          >
            <Globe size={16} />
            {language === 'zh' ? 'EN' : '中'}
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block ml-4">
           <a 
            href="https://t.me/opcat_layer" 
            target="_blank" 
            rel="noreferrer"
            className="px-5 py-2 bg-stone-900 text-white font-bold text-sm rounded-lg hover:bg-stone-700 transition-colors shadow-lg"
           >
             {t.cta}
           </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-1 text-sm font-bold text-stone-900"
            >
                {language === 'zh' ? 'EN' : '中文'}
            </button>
            <button className="text-stone-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-stone-200 p-6 md:hidden flex flex-col gap-4 shadow-xl">
          {t.nav.map((link) => (
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
             {t.cta}
           </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
