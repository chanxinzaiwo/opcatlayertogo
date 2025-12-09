import React from 'react';
import { ChevronDown, Zap, Lock, Box, Hammer, Bitcoin, Code2 } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black text-white">
      {/* Background Elements - Deep Black/Yellow Theme */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 via-black to-black opacity-80"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Animated Bitcoin Logo Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-5">
        <Bitcoin size={900} strokeWidth={0.3} className="text-yellow-500 animate-pulse duration-[5000ms]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* NEW: Programmable/Scalable Motto */}
        <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-sm md:text-lg font-bold tracking-widest text-stone-400 uppercase animate-fade-in-up">
            <span className="flex items-center gap-2"><Code2 size={16} className="text-blue-500" /> As Programmable as Ethereum</span>
            <span className="hidden md:inline text-stone-600">/</span>
            <span className="flex items-center gap-2"><Zap size={16} className="text-green-500" /> As Scalable as Solana</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tighter text-white drop-shadow-2xl">
          MAKING <br />
          <span className="text-yellow-500">EVERYTHING</span> <br />
          POSSIBLE
        </h1>
        
        {/* NEW: 13 Lines Insight */}
        <div className="max-w-3xl mx-auto mb-10">
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed font-light">
                仅用 <span className="font-bold text-white bg-stone-800 px-1 rounded border border-stone-600">13 行代码 (BIP-347)</span> 激活的软分叉，<br className="hidden md:block"/>
                将释放比特币 <span className="text-yellow-400 font-bold">2 万亿美元</span> 的智能合约潜能，<br className="md:hidden"/>同时保持其无可匹敌的去中心化与安全。
            </p>
        </div>

        {/* Motto / Subheadline (Keeping the "No Fancy Decks" quote as a secondary element or removing if too cluttered. Let's keep it smaller) */}
        <div className="max-w-4xl mx-auto mb-12 transform scale-90 opacity-80">
            <p className="text-base md:text-lg font-mono text-stone-500">
                <span className="text-yellow-600">"</span>
                We Don't Do Fancy Decks. We Build What Others <span className="text-stone-300 font-bold">CAN'T</span>.
                <span className="text-yellow-600">"</span>
            </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <button 
            onClick={() => scrollToSection('architecture')}
            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-lg rounded-none skew-x-[-10deg] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center gap-3 border-2 border-yellow-500"
          >
            <div className="skew-x-[10deg] flex items-center gap-2">
              <Hammer size={24} strokeWidth={3} />
              BUILD ON BITCOIN
            </div>
          </button>
          <button 
            onClick={() => scrollToSection('why')}
            className="px-8 py-4 bg-transparent border-2 border-stone-600 text-stone-300 font-bold text-lg rounded-none skew-x-[-10deg] transition-all hover:bg-stone-800 hover:text-white hover:border-white"
          >
            <div className="skew-x-[10deg]">
              WHY OP_CAT?
            </div>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          <div className="bg-stone-900 p-8 rounded-none border-l-4 border-yellow-500 hover:bg-stone-800 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
                <Lock className="w-6 h-6 text-yellow-500" />
                <h3 className="font-black text-xl text-white uppercase italic">Trustless Bridge</h3>
            </div>
            <p className="text-stone-400 font-mono text-sm">
                SPV-proof verified. 100% Asset Control. <br/>No multi-sig federations.
            </p>
          </div>
          
          <div className="bg-stone-900 p-8 rounded-none border-l-4 border-yellow-500 hover:bg-stone-800 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
                <Box className="w-6 h-6 text-yellow-500" />
                <h3 className="font-black text-xl text-white uppercase italic">Turing Complete</h3>
            </div>
            <p className="text-stone-400 font-mono text-sm">
                Stateful smart contracts on L1. <br/>AMM, Lending, GameFi, SocialFi.
            </p>
          </div>

          <div className="bg-stone-900 p-8 rounded-none border-l-4 border-yellow-500 hover:bg-stone-800 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h3 className="font-black text-xl text-white uppercase italic">High Performance</h3>
            </div>
            <p className="text-stone-400 font-mono text-sm">
                UTXO-based parallel execution. <br/>Scalability without leaving Bitcoin.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('problem')}>
        <ChevronDown className="w-10 h-10 text-yellow-500" />
      </div>
    </section>
  );
};

export default Hero;