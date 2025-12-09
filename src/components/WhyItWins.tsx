
import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Sun, Zap } from 'lucide-react';

const WhyItWins: React.FC = () => {
  return (
    <section id="why" className="py-16 md:py-24 pb-0 bg-black text-white border-t border-stone-800 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* SECTION 1: THE TRILLION DOLLAR PROBLEM */}
        <div className="mb-8 md:mb-12">
            <div className="text-center mb-16 md:mb-32">
                <h2 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-8 uppercase leading-tight">
                    比特币流动性 <br/>
                    <span className="text-yellow-500">万亿级难题</span>
                </h2>
                <p className="text-base md:text-xl text-stone-400 max-w-3xl mx-auto font-mono px-4">
                    最大的 Web3 资产。却被困在流动性与扩展性的牢笼中。
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-24 max-w-7xl mx-auto">
                {/* Visualizing the Scale - The Dynamic Solar System - Scaled Down for Mobile */}
                <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center my-0 lg:my-0 scale-[0.45] sm:scale-100">
                    
                    {/* --- SUN (CENTER) - MASSIVE SIZE --- */}
                    <div className="absolute z-30 w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 shadow-[0_0_120px_rgba(251,146,60,0.9)] flex flex-col items-center justify-center animate-pulse">
                        <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl animate-pulse"></div>
                        
                        {/* Sun Surface Texture */}
                        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay animate-[spin_60s_linear_infinite]"></div>
                        
                        <div className="z-10 text-center text-white drop-shadow-md transform scale-125">
                            <div className="text-7xl lg:text-9xl font-black tracking-tighter leading-none">$2T</div>
                            <div className="text-xl lg:text-2xl font-bold uppercase tracking-widest opacity-90 mt-2">BTC Sun</div>
                        </div>
                    </div>

                    {/* --- ORBIT SYSTEM --- */}
                    
                    {/* 1. INNER ORBIT (OP_CAT EARTH) */}
                    <div className="absolute w-[130%] h-[130%] border border-orange-500/30 rounded-full z-10 border-dashed"></div>
                    
                    {/* Rotating Container */}
                    <div className="absolute w-[130%] h-[130%] z-20" style={{ animation: 'spin 12s linear infinite' }}>
                        {/* The Earth (OP_CAT) positioned at top (0 degrees) */}
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-20 h-20 group">
                             {/* Energy Beam */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-[300px] bg-gradient-to-b from-yellow-400/80 to-transparent -z-10 blur-[2px]"></div>
                             
                             {/* Planet Body */}
                             <div 
                                className="w-full h-full rounded-full bg-gradient-to-bl from-blue-400 via-cyan-500 to-green-500 shadow-[0_0_40px_rgba(34,197,94,1)] flex items-center justify-center relative overflow-hidden ring-4 ring-white/20"
                                style={{ animation: 'spin 12s linear infinite reverse' }}
                             >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
                                <div className="absolute inset-0 bg-blue-400/30 blur-md rounded-full"></div>
                                
                                <div className="text-center leading-none z-10">
                                    <div className="text-[10px] text-white font-black drop-shadow-md uppercase">OP_CAT</div>
                                    <div className="text-[8px] text-blue-100 font-bold">Layer</div>
                                </div>
                             </div>
                             
                             {/* Floating Label */}
                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ animation: 'spin 12s linear infinite reverse' }}>
                                 <div className="flex flex-col items-center">
                                     <div className="bg-green-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] border border-white/20 flex items-center gap-1">
                                        <Zap size={12} fill="black" /> 生机勃勃
                                     </div>
                                     <div className="w-0.5 h-3 bg-green-500/50"></div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* 2. OUTER ORBIT (Others) */}
                    <div className="absolute w-[160%] h-[160%] border border-stone-800 rounded-full border-dashed z-0 opacity-50"></div>
                    
                    <div className="absolute w-[160%] h-[160%] z-10" style={{ animation: 'spin 30s linear infinite' }}>
                        
                        {/* Dead Planet 1 */}
                        <div className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10">
                             <div className="w-full h-full rounded-full bg-gradient-to-br from-stone-600 to-stone-800 shadow-inner flex items-center justify-center grayscale opacity-80"
                                  style={{ animation: 'spin 30s linear infinite reverse' }}>
                             </div>
                             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ animation: 'spin 30s linear infinite reverse' }}>
                                 <span className="text-[10px] text-stone-600 font-mono bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">Sidechains</span>
                             </div>
                        </div>

                        {/* Dead Planet 2 */}
                        <div className="absolute bottom-[10%] left-[10%] w-8 h-8">
                             <div className="w-full h-full rounded-full bg-stone-800 border border-stone-700 shadow-inner"></div>
                             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ animation: 'spin 30s linear infinite reverse' }}>
                                 <span className="text-[10px] text-stone-700 font-mono">Rollups</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 text-left space-y-6 md:space-y-10 z-40 relative mt-0 lg:mt-0">
                    <div className="bg-stone-900/80 backdrop-blur-sm p-4 md:p-6 border-l-4 border-orange-500 hover:bg-stone-900 transition-colors group shadow-2xl">
                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase flex items-center gap-2 group-hover:scale-105 transition-transform origin-left">
                            <Sun className="text-orange-500 animate-spin-slow" /> 太阳 (Bitcoin)
                        </h3>
                        <p className="text-stone-400 font-mono text-xs md:text-sm leading-relaxed">
                            BTC 的市值如同恒星般巨大，蕴含着 2 万亿美元的能量。但目前被共识层锁定，处于休眠状态。
                        </p>
                    </div>
                    
                    <div className="bg-stone-900/80 backdrop-blur-sm p-4 md:p-6 border-l-4 border-green-500 hover:bg-stone-900 transition-colors group relative overflow-hidden shadow-2xl">
                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase flex items-center gap-2">
                             <span className="text-green-500">🌍</span> 地球 (OP_CAT)
                        </h3>
                        <p className="text-stone-400 font-mono text-xs md:text-sm leading-relaxed">
                            OP_CAT Layer 处于“宜居带”，通过原生连接（Native Peg）直接获取太阳的能量。它生机勃勃，孕育着 DeFi 与 GameFi 的万物。
                        </p>
                    </div>

                    <div className="bg-stone-900/80 backdrop-blur-sm p-4 md:p-6 border-l-4 border-stone-600 hover:bg-stone-900 transition-colors shadow-xl">
                        <h3 className="text-xl md:text-2xl font-black text-stone-400 mb-2 uppercase flex items-center gap-2">
                             <span className="grayscale opacity-50">🪐</span> 其他 (Others)
                        </h3>
                        <p className="text-stone-500 font-mono text-xs md:text-sm leading-relaxed">
                            其他扩容方案如同荒凉的边缘行星，距离太阳太远（非原生），无法获得核心流动性的滋养，生态死气沉沉。
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWins;
