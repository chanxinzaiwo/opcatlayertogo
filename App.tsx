
import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Concept from './components/Concept';
import Architecture from './components/Architecture';
import BitcoinScript from './components/BitcoinScript';
import Developer from './components/Developer';
import UseCases from './components/UseCases';
import Vision from './components/Vision';
import WhyItWins from './components/WhyItWins';
import Consensus from './components/Consensus';
import Comparison from './components/Comparison';
import Action from './components/Action';
import Footer from './components/Footer';
import HalvingCountdown from './components/HalvingCountdown';

const App: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans antialiased text-stone-900 selection:bg-orange-200 selection:text-orange-900">
      <Navigation scrollToSection={scrollToSection} />
      <main>
        <Hero scrollToSection={scrollToSection} />
        <Problem />
        <BitcoinScript />
        <Concept />
        <Architecture />
        <Developer />
        <UseCases />
        <WhyItWins />
        <Vision />
        <Comparison />
        <Consensus />
        <HalvingCountdown />
        <Action />
      </main>
      <Footer />
    </div>
  );
};

export default App;
