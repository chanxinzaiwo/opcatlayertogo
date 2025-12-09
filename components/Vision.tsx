
import React, { useState, useEffect } from 'react';
import { Lock, Zap, Globe, Rocket, Sparkles, Activity, Trophy, TrendingUp, Target, Flame, Layers } from 'lucide-react';

const Vision: React.FC = () => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const changeStage = (newStage: 0 | 1 | 2 | 3) => {
    if (newStage === stage || isAnimating) return;
    setIsAnimating(true);
    setStage(newStage);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const stages = [
    {
      id: 0,
      title: "沉睡的巨人",
      subtitle: "The Dormant Giant",
      target: "Current State",
      valuation: "$0",
      desc: "比特币是市值 2 万亿的“数字黄金”，但它处于静止状态。流动性被共识层牢牢锁定，无法参与 DeFi 经济循环。",
      metrics: { tvl: "$0 B", tps: "7", status: "Inactive" },
      color: "stone",
      icon: <Lock size={20} />
    },
    {
      id: 1,
      title: "OP_CAT 启动",
      subtitle: "Ignition Phase",
      target: "Target: $10 Billion",
      valuation: "$10 B",
      desc: "BIP-347 软分叉激活。如同普罗米修斯之火，OP_CAT 剪断了脚本限制的锁链。比特币原生的“自省”能力觉醒，早期生态爆发。",
      metrics: { tvl: "$10 B", tps: "1,000+", status: "Growth" },
      color: "orange",
      icon: <Zap size={20} />
    },
    {
      id: 2,
      title: "超越 Solana",
      subtitle: "Hyper Velocity",
      target: "Target: $150 Billion",
      valuation: "$150 B",
      desc: "高性能阶段。凭借 UTXO 的并行执行优势，OP_CAT Layer 的吞吐量和体验超越 Solana。比特币资金大规模涌入，形成巨大的虹吸效应。",
      metrics: { tvl: "$150 B", tps: "50,000+", status: "Flipping SOL" },
      color: "yellow",
      icon: <Flame size={20} />
    },
    {
      id: 3,
      title: "超越以太坊",
      subtitle: "The Singularity",
      target: "Target: $400 Billion",
      valuation: "$400 B",
      desc: "终局。万物生长的奇点。比特币不再仅仅是资产，而是全球经济的结算层。智能合约生态规模超越以太坊，确立绝对霸主地位。",
      metrics: { tvl: "$400 B+", tps: "100,000+", status: "Flipping ETH" },
      color: "blue",
      icon: <Globe size={20} />
    }
  ];

  return (
    <section id="vision" className="py-20 md:py-32 bg-black relative overflow-hidden text-white border-t border-stone-800">
      
      {/* Background Ambience */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none
          ${stage === 0 ? 'bg-[radial-gradient(circle_at_center,#292524_0%,#000_70%)] opacity-50' : ''}
          ${stage === 1 ? 'bg-[radial-gradient(circle_at_center,#7c2d12_0%,#000_70%)] opacity-60' : ''}
          ${stage === 2 ? 'bg-[radial-gradient(circle_at_center,#854d0e_0%,#000_70%)] opacity-70' : ''}
          ${stage === 3 ? 'bg-[radial-gradient(circle_at_center,#1e3a8a_0%,#000_70%)] opacity-70' : ''}
      `}></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-800 bg-stone-900/50 text-stone-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                <Rocket size={14} className="text-orange-500" />
                Strategic Roadmap
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6">
                释放 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-600">暗物质</span> 能量
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-lg font-mono text-stone-500">
                <span className={`flex items-center gap-2 transition-all ${stage >= 1 ? 'text-orange-500 font-bold' : ''}`}>
                    Target I: $10B
                </span>
                <span className="hidden md:inline text-stone-700">→</span>
                <span className={`flex items-center gap-2 transition-all ${stage >= 2 ? 'text-yellow-500 font-bold' : ''}`}>
                    Target II: Flip SOL ($150B)
                </span>
                <span className="hidden md:inline text-stone-700">→</span>
                <span className={`flex items-center gap-2 transition-all ${stage >= 3 ? 'text-blue-500 font-bold' : ''}`}>
                    Target III: Flip ETH ($400B)
                </span>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* LEFT: THE VISUAL CORE (The Reactor) */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
             
             {/* 0. STAGE 0: LOCKED STONE */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 0 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl pointer-events-none'}`}>
                 {/* Chains */}
                 <div className="absolute w-[120%] h-[120%] border-[20px] border-stone-800 rounded-full opacity-50 animate-pulse"></div>
                 <div className="absolute w-[110%] h-[20px] bg-stone-800 rotate-45"></div>
                 <div className="absolute w-[110%] h-[20px] bg-stone-800 -rotate-45"></div>
                 
                 {/* Core */}
                 <div className="w-64 h-64 bg-gradient-to-br from-stone-700 to-stone-900 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center border-4 border-stone-600 relative overflow-hidden">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-20 mix-blend-overlay"></div>
                     <Lock size={64} className="text-stone-900 drop-shadow-lg" />
                 </div>
             </div>

             {/* 1. STAGE 1: IGNITION (Cracking) */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-xl pointer-events-none'}`}>
                 <div className="absolute inset-0 bg-orange-500/10 blur-3xl animate-pulse"></div>
                 <div className="w-64 h-64 bg-stone-800 rounded-full flex items-center justify-center border-4 border-orange-500/50 relative overflow-hidden animate-[shake_0.5s_infinite]">
                     <div className="absolute inset-0 bg-orange-500/20 animate-pulse"></div>
                     <div className="absolute w-full h-2 bg-orange-500 top-1/2 -translate-y-1/2 rotate-12 shadow-[0_0_20px_#f97316]"></div>
                     <div className="absolute w-2 h-full bg-orange-500 left-1/3 -translate-x-1/2 -rotate-12 shadow-[0_0_20px_#f97316]"></div>
                     <Zap size={80} className="text-white fill-orange-500 z-10 animate-[pulse_0.2s_infinite]" />
                 </div>
             </div>

             {/* 2. STAGE 2: HYPER VELOCITY (Yellow/Orange Protostar - FLIP SOLANA) */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 blur-2xl pointer-events-none'}`}>
                 {/* Spinning Aura */}
                 <div className="absolute w-[140%] h-[140%] bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-full blur-3xl animate-[spin_3s_linear_infinite]"></div>
                 <div className="absolute w-[120%] h-[120%] border-2 border-dashed border-yellow-500/50 rounded-full animate-[spin_6s_linear_infinite]"></div>
                 
                 {/* The Star */}
                 <div className="w-64 h-64 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full shadow-[0_0_80px_rgba(234,179,8,0.8)] flex items-center justify-center relative z-10 animate-[spin_10s_linear_infinite]">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 mix-blend-overlay"></div>
                     {/* Turbulent Surface */}
                     <div className="absolute inset-0 rounded-full border-4 border-yellow-200/50 blur-[2px] animate-pulse"></div>
                     
                     <div className="z-20 text-center transform -rotate-[45deg] animate-[spin_10s_linear_infinite_reverse]">
                         <div className="text-5xl font-black text-white tracking-tighter drop-shadow-md">SOL</div>
                         <div className="text-xs font-bold text-yellow-100 uppercase bg-yellow-600/50 px-2 py-0.5 rounded mt-1">FLIPPED</div>
                     </div>
                 </div>

                 {/* Speed Lines */}
                 {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-32 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" style={{ 
                        top: '50%', left: '50%',
                        transform: `rotate(${i * 45}deg) translateX(140px)`,
                        animation: 'pulse 0.5s infinite',
                        animationDelay: `${i * 0.1}s`
                    }}></div>
                 ))}
             </div>

             {/* 3. STAGE 3: THE SINGULARITY (Blue Galaxy - FLIP ETHEREUM) */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 blur-2xl pointer-events-none'}`}>
                 {/* Galaxy Spirals */}
                 <div className="absolute w-[180%] h-[180%] border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                 <div className="absolute w-[150%] h-[150%] border border-cyan-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                 <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full animate-pulse"></div>
                 
                 {/* The Core */}
                 <div className="w-64 h-64 bg-white rounded-full shadow-[0_0_100px_rgba(59,130,246,0.9)] flex items-center justify-center relative z-10">
                     <div className="absolute inset-0 bg-blue-500/50 blur-xl rounded-full"></div>
                     <div className="z-10 text-center">
                         <div className="text-5xl font-black text-blue-900 tracking-tighter">ETH</div>
                         <div className="text-xs font-bold text-blue-800 uppercase bg-blue-200/50 px-2 py-0.5 rounded mt-1">FLIPPED</div>
                     </div>
                 </div>

                 {/* Orbiting Ecosystem */}
                 {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 animate-[spin_12s_linear_infinite]" style={{ animationDuration: `${12 + i * 2}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}>
                        <div className="absolute top-0 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-stone-900 border border-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            <Layers size={14} className="text-blue-400" />
                        </div>
                    </div>
                 ))}
             </div>

          </div>

          {/* RIGHT: NARRATIVE CONTROLLER */}
          <div className="flex flex-col justify-center gap-6">
             
             {/* Dynamic Metrics Board */}
             <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-800 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-stone-500 text-[10px] font-bold uppercase mb-1 flex items-center gap-1"><Target size={10} /> Goal Valuation</div>
                    <div className={`font-mono font-bold text-lg md:text-xl transition-all duration-500 ${stages[stage].color === 'blue' ? 'text-blue-400' : stages[stage].color === 'yellow' ? 'text-yellow-400' : stages[stage].color === 'orange' ? 'text-orange-400' : 'text-stone-500'}`}>
                        {stages[stage].valuation}
                    </div>
                </div>
                <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-800 backdrop-blur-sm">
                    <div className="text-stone-500 text-[10px] font-bold uppercase mb-1 flex items-center gap-1"><Activity size={10} /> Status</div>
                    <div className={`font-mono font-bold text-lg md:text-xl transition-all duration-500 ${stages[stage].color === 'blue' ? 'text-blue-400' : stages[stage].color === 'yellow' ? 'text-yellow-400' : stages[stage].color === 'orange' ? 'text-orange-400' : 'text-stone-500'}`}>
                        {stages[stage].metrics.status}
                    </div>
                </div>
                <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-800 backdrop-blur-sm">
                    <div className="text-stone-500 text-[10px] font-bold uppercase mb-1 flex items-center gap-1"><Zap size={10} /> TPS</div>
                    <div className={`font-mono font-bold text-lg md:text-xl transition-all duration-500 ${stages[stage].color === 'blue' ? 'text-blue-400' : stages[stage].color === 'yellow' ? 'text-yellow-400' : stages[stage].color === 'orange' ? 'text-orange-400' : 'text-stone-500'}`}>
                        {stages[stage].metrics.tps}
                    </div>
                </div>
             </div>

             {/* Timeline Buttons */}
             <div className="space-y-3 relative">
                <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-stone-800 z-0"></div>
                
                {stages.map((s) => (
                    <button 
                        key={s.id}
                        onClick={() => changeStage(s.id as 0|1|2|3)}
                        className={`relative z-10 w-full text-left p-3 md:p-4 rounded-2xl border-2 transition-all duration-300 group flex items-start gap-4
                            ${stage === s.id 
                                ? `bg-stone-900 border-${s.color}-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-105` 
                                : 'bg-transparent border-transparent hover:bg-stone-900 hover:border-stone-800 opacity-60 hover:opacity-100'
                            }
                        `}
                    >
                        {/* Circle Indicator */}
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500
                            ${stage === s.id 
                                ? `bg-${s.color}-500 text-black border-${s.color}-400` 
                                : 'bg-stone-950 border-stone-700 text-stone-600'
                            }
                        `}>
                            {React.cloneElement(s.icon as React.ReactElement<any>, { size: 20 })}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className={`text-base md:text-lg font-bold flex items-center gap-2 ${stage === s.id ? 'text-white' : 'text-stone-400'}`}>
                                    {s.title}
                                    {stage === s.id && <Sparkles size={14} className={`text-${s.color}-500 animate-pulse`} />}
                                </h3>
                                {s.id > 0 && (
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${stage === s.id ? `text-${s.color}-400 border-${s.color}-500/30 bg-${s.color}-900/20` : 'text-stone-600 border-stone-800'}`}>
                                        {s.target.replace('Target: ', '')}
                                    </span>
                                )}
                            </div>
                            
                            <div className={`grid transition-all duration-500 ${stage === s.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <p className="text-xs md:text-sm text-stone-400 leading-relaxed pl-1 pt-1">
                                        {s.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
             </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </section>
  );
};

export default Vision;
