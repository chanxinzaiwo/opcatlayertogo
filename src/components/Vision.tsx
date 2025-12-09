
import React, { useState, useEffect } from 'react';
import { Lock, Zap, Globe, Rocket, Sparkles, Activity, Target, Flame, Layers, TrendingUp, Crown, ArrowUp } from 'lucide-react';

const Vision: React.FC = () => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const changeStage = (newStage: 0 | 1 | 2 | 3) => {
    if (newStage === stage || isAnimating) return;
    setIsAnimating(true);
    setStage(newStage);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const stages = [
    {
      id: 0,
      title: "当前状态",
      subtitle: "The Sleeping Giant",
      valuation: "$0",
      targetLabel: "Current",
      desc: "比特币拥有 2 万亿市值的深厚底蕴，但目前被锁在共识层的坚硬外壳中。如同沉睡的泰坦，等待唤醒。",
      color: "stone",
      bgGradient: "from-stone-900 to-black",
      icon: <Lock size={20} />
    },
    {
      id: 1,
      title: "第一目标：生态启动",
      subtitle: "Target: $10 Billion",
      valuation: "$10 B",
      targetLabel: "Initial Growth",
      desc: "BIP-347 激活。OP_CAT 就像一把钥匙，解开了比特币的智能合约封印。原生资产发行，DeFi 协议涌现，生态估值快速突破 100 亿美元。",
      color: "orange",
      bgGradient: "from-orange-900/50 to-black",
      icon: <Zap size={20} />
    },
    {
      id: 2,
      title: "第二目标：追赶 Solana",
      subtitle: "Target: $150 Billion",
      valuation: "$150 B",
      targetLabel: "Flipping SOL",
      desc: "凭借 UTXO 的超高并行性能，OP_CAT Layer 在吞吐量上通过了压力测试。比特币庞大的流动性开始虹吸，市值超越 Solana，成为高性能链之王。",
      color: "yellow",
      bgGradient: "from-yellow-900/50 to-black",
      icon: <Flame size={20} />
    },
    {
      id: 3,
      title: "第三目标：追赶以太坊",
      subtitle: "Target: $400 Billion",
      valuation: "$400 B",
      targetLabel: "Flipping ETH",
      desc: "终极目标。比特币不仅是资产，更成为全球经济的结算层。智能合约生态规模超越以太坊，实现“价值”与“计算”的完美统一。王者归来。",
      color: "blue",
      bgGradient: "from-blue-900/50 to-black",
      icon: <Crown size={20} />
    }
  ];

  return (
    <section id="vision" className="py-20 md:py-32 bg-black relative overflow-hidden text-white border-t border-stone-800">
      
      {/* Dynamic Background */}
      <div className={`absolute inset-0 transition-all duration-1000 bg-gradient-to-b ${stages[stage].bgGradient} opacity-40`}></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-900/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md animate-fade-in-up">
                <Rocket size={14} />
                Strategic Roadmap
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                我们的征途：<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500">
                    星辰大海
                </span>
            </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center min-h-[600px]">
          
          {/* LEFT: THE VISUAL EVOLUTION (7 Cols) */}
          <div className="lg:col-span-7 relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
             
             {/* 0. STAGE 0: THE STONE (Dormant) */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 blur-xl pointer-events-none'}`}>
                 <div className="w-64 h-64 md:w-80 md:h-80 bg-stone-800 rounded-full flex items-center justify-center border-[20px] border-stone-900 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] relative grayscale">
                     <Lock size={80} className="text-stone-600 drop-shadow-2xl" />
                     {/* Chains */}
                     <div className="absolute w-[110%] h-4 bg-black rotate-45 shadow-lg"></div>
                     <div className="absolute w-[110%] h-4 bg-black -rotate-45 shadow-lg"></div>
                 </div>
             </div>

             {/* 1. STAGE 1: THE SPARK ($10B) */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-150 blur-xl pointer-events-none'}`}>
                 <div className="absolute inset-0 bg-orange-500/20 blur-[100px] animate-pulse"></div>
                 <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-orange-500 flex items-center justify-center relative shadow-[0_0_50px_rgba(249,115,22,0.5)] bg-black">
                     <div className="absolute inset-0 rounded-full border-t-4 border-orange-400 animate-spin"></div>
                     <Zap size={100} className="text-orange-500 animate-pulse drop-shadow-[0_0_20px_rgba(249,115,22,1)]" />
                     
                     {/* Satellites */}
                     {[...Array(3)].map((_, i) => (
                         <div key={i} className="absolute w-full h-full animate-[spin_4s_linear_infinite]" style={{ animationDelay: `${i}s` }}>
                             <div className="w-4 h-4 bg-orange-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#fb923c]"></div>
                         </div>
                     ))}
                 </div>
                 <div className="absolute mt-96 text-orange-500 font-black text-2xl tracking-widest uppercase animate-bounce">
                     Ignition
                 </div>
             </div>

             {/* 2. STAGE 2: FLIPPING SOLANA ($150B) */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 blur-xl pointer-events-none'}`}>
                 {/* Background Speed Lines */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-30">
                     {[...Array(12)].map((_, i) => (
                         <div key={i} className="absolute w-[100vh] h-[2px] bg-yellow-500/50" style={{ transform: `rotate(${i * 30}deg) translateX(200px)` }}></div>
                     ))}
                 </div>
                 
                 {/* The Competitor (Small SOL) */}
                 <div className="absolute w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full blur-sm opacity-50 animate-[ping_3s_infinite] flex items-center justify-center">
                     <span className="text-xs font-bold text-white">SOL</span>
                 </div>

                 {/* The Hero (Big OP_CAT) */}
                 <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-600 shadow-[0_0_100px_rgba(234,179,8,0.6)] flex items-center justify-center relative z-10 animate-[spin_8s_linear_infinite]">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-overlay"></div>
                     {/* Orbital Rings */}
                     <div className="absolute w-[120%] h-[120%] border-2 border-yellow-200/30 rounded-full skew-x-12 animate-pulse"></div>
                 </div>
                 
                 <div className="absolute z-20 bg-yellow-500 text-black px-4 py-2 rounded-lg font-black text-xl rotate-[-12deg] shadow-xl border-2 border-white">
                     FLIPPING SOLANA
                 </div>
             </div>

             {/* 3. STAGE 3: THE KING ($400B) */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-150 blur-xl pointer-events-none'}`}>
                 {/* Majestic Aura */}
                 <div className="absolute inset-0 bg-blue-600/20 blur-[120px] animate-pulse"></div>
                 
                 {/* The Galaxy */}
                 <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-blue-500/20 flex items-center justify-center relative animate-[spin_60s_linear_infinite]">
                     <div className="absolute inset-0 border-2 border-dashed border-blue-400/30 rounded-full"></div>
                     
                     {/* The Core */}
                     <div className="w-40 h-40 bg-white rounded-full shadow-[0_0_80px_#3b82f6] flex items-center justify-center relative z-20">
                         <Crown size={64} className="text-blue-600 fill-blue-100" />
                     </div>

                     {/* Orbiting Planets */}
                     {[0, 90, 180, 270].map((deg, i) => (
                         <div key={i} className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 bg-stone-900 border border-blue-400 rounded-full shadow-[0_0_15px_#3b82f6]" 
                              style={{ transform: `rotate(${deg}deg) translateX(180px) rotate(-${deg}deg)` }}>
                         </div>
                     ))}
                 </div>

                 <div className="absolute z-30 flex flex-col items-center">
                     <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-2xl shadow-[0_0_30px_rgba(37,99,235,0.6)] mb-2 border-2 border-white/50">
                         BITCOIN NATIVE
                     </div>
                     <div className="text-blue-200 font-mono text-sm tracking-[0.3em] uppercase bg-blue-950/80 px-4 py-1 rounded">
                         Flipped Ethereum
                     </div>
                 </div>
             </div>

          </div>

          {/* RIGHT: CONTROLS & METRICS (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6 h-full">
             
             {/* Main Metric Display */}
             <div className="bg-stone-900/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-stone-800 relative overflow-hidden group">
                 <div className={`absolute top-0 right-0 p-4 opacity-20 transition-colors duration-500 ${stage === 3 ? 'text-blue-500' : 'text-stone-500'}`}>
                     <Target size={100} />
                 </div>
                 
                 <div className="relative z-10">
                     <div className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Activity size={14} /> Ecosystem Valuation
                     </div>
                     <div className={`text-5xl md:text-7xl font-black font-mono tracking-tighter transition-all duration-500 
                        ${stage === 0 ? 'text-stone-600' : ''}
                        ${stage === 1 ? 'text-orange-500' : ''}
                        ${stage === 2 ? 'text-yellow-400' : ''}
                        ${stage === 3 ? 'text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]' : ''}
                     `}>
                        {stages[stage].valuation}
                     </div>
                     <div className={`text-sm font-bold mt-2 inline-flex items-center gap-1 px-2 py-1 rounded ${
                         stage === 0 ? 'bg-stone-800 text-stone-500' :
                         stage === 1 ? 'bg-orange-900/30 text-orange-400' :
                         stage === 2 ? 'bg-yellow-900/30 text-yellow-400' :
                         'bg-blue-900/30 text-blue-400'
                     }`}>
                         {stage > 0 && <ArrowUp size={12} />}
                         {stages[stage].targetLabel}
                     </div>
                 </div>
             </div>

             {/* Interactive Timeline */}
             <div className="space-y-3">
                {stages.map((s) => (
                    <button 
                        key={s.id}
                        onClick={() => changeStage(s.id as 0|1|2|3)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden
                            ${stage === s.id 
                                ? `bg-stone-900 border-${s.color}-500 shadow-lg scale-[1.02]` 
                                : 'bg-transparent border-stone-800 hover:bg-stone-900 hover:border-stone-700 opacity-60 hover:opacity-100'
                            }
                        `}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300
                                    ${stage === s.id ? `bg-${s.color}-500 text-black` : 'bg-stone-800 text-stone-500'}
                                `}>
                                    {React.cloneElement(s.icon as React.ReactElement<any>, { size: 18 })}
                                </div>
                                <div>
                                    <div className={`font-bold text-sm md:text-base ${stage === s.id ? 'text-white' : 'text-stone-300'}`}>
                                        {s.title}
                                    </div>
                                    <div className={`text-xs font-mono ${stage === s.id ? `text-${s.color}-400` : 'text-stone-500'}`}>
                                        {s.subtitle}
                                    </div>
                                </div>
                            </div>
                            
                            {stage === s.id && <div className={`w-2 h-2 rounded-full bg-${s.color}-500 animate-pulse`}></div>}
                        </div>

                        {/* Description Reveal */}
                        <div className={`grid transition-all duration-500 ease-out ${stage === s.id ? 'grid-rows-[1fr] mt-3 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'}`}>
                            <div className="overflow-hidden">
                                <p className="text-xs md:text-sm text-stone-400 leading-relaxed border-t border-stone-800 pt-3">
                                    {s.desc}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Vision;
