
import React from 'react';
import { ChevronDown, Zap, Lock, Box, Hammer, Bitcoin, Code2 } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black text-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 via-black to-black opacity-80"></div>
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-5">
        <Bitcoin size={900} strokeWidth={0.3} className="text-yellow-500 animate-pulse duration-[5000ms] scale-50 md:scale-100" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        
        {/* Programmable/Scalable Motto */}
        <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-xs md:text-lg font-bold tracking-widest text-stone-400 uppercase animate-fade-in-up">
            <span className="flex items-center gap-2"><Code2 size={16} className="text-blue-500" /> As Programmable as Ethereum</span>
            <span className="hidden md:inline text-stone-600">/</span>
            <span className="flex items-center gap-2"><Zap size={16} className="text-green-500" /> As Scalable as Solana</span>
        </div>
        
        {/* Main Headline - Resized for Mobile */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tighter text-white drop-shadow-2xl">
          MAKING <br />
          <span className="text-yellow-500">EVERYTHING</span> <br />
          POSSIBLE
        </h1>
        
        <div className="max-w-3xl mx-auto mb-10">
            <p className="text-base md:text-xl text-stone-300 leading-relaxed font-light px-2">
                仅用 <span className="font-bold text-white bg-stone-800 px-1 rounded border border-stone-600">13 行代码 (BIP-347)</span> 激活的软分叉，<br className="hidden md:block"/>
                将释放比特币 <span className="text-yellow-400 font-bold">2 万亿美元</span> 的智能合约潜能。
            </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 transform scale-90 opacity-80">
            <p className="text-sm md:text-lg font-mono text-stone-500">
                <span className="text-yellow-600">"</span>
                We Don't Do Fancy Decks. We Build What Others <span className="text-stone-300 font-bold">CAN'T</span>.
                <span className="text-yellow-600">"</span>
            </p>
        </div>

        {/* Buttons - Stacked on Mobile */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16 md:mb-20 w-full max-w-md mx-auto sm:max-w-none">
          <button 
            onClick={() => scrollToSection('architecture')}
            className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-lg rounded-lg sm:rounded-none sm:skew-x-[-10deg] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center justify-center gap-3 border-2 border-yellow-500 active:scale-95"
          >
            <div className="sm:skew-x-[10deg] flex items-center gap-2">
              <Hammer size={24} strokeWidth={3} />
              BUILD ON BITCOIN
            </div>
          </button>
          <button 
            onClick={() => scrollToSection('why')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-stone-600 text-stone-300 font-bold text-lg rounded-lg sm:rounded-none sm:skew-x-[-10deg] transition-all hover:bg-stone-800 hover:text-white hover:border-white active:scale-95"
          >
            <div className="sm:skew-x-[10deg]">
              WHY OP_CAT?
            </div>
          </button>
        </div>

        {/* Feature Grid - Single Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto text-left">
          <div className="bg-stone-900 p-6 md:p-8 rounded-xl md:rounded-none border-l-4 border-yellow-500 hover:bg-stone-800 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
                <Lock className="w-6 h-6 text-yellow-500" />
                <h3 className="font-black text-lg md:text-xl text-white uppercase italic">Trustless Bridge</h3>
            </div>
            <p className="text-stone-400 font-mono text-sm">
                SPV-proof verified. 100% Asset Control.
            </p>
          </div>
          
          <div className="bg-stone-900 p-6 md:p-8 rounded-xl md:rounded-none border-l-4 border-yellow-500 hover:bg-stone-800 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
                <Box className="w-6 h-6 text-yellow-500" />
                <h3 className="font-black text-lg md:text-xl text-white uppercase italic">Turing Complete</h3>
            </div>
            <p className="text-stone-400 font-mono text-sm">
                Stateful smart contracts on L1.
            </p>
          </div>

          <div className="bg-stone-900 p-6 md:p-8 rounded-xl md:rounded-none border-l-4 border-yellow-500 hover:bg-stone-800 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h3 className="font-black text-lg md:text-xl text-white uppercase italic">High Performance</h3>
            </div>
            <p className="text-stone-400 font-mono text-sm">
                UTXO-based parallel execution.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('problem')}>
        <ChevronDown className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
      </div>
    </section>
  );
};

export default Hero;
