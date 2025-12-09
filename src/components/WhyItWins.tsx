
import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Sun, Zap } from 'lucide-react';

const WhyItWins: React.FC = () => {
  return (
    <section id="why" className="py-24 bg-black text-white border-t border-stone-800 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* SECTION 1: THE TRILLION DOLLAR PROBLEM */}
        <div className="mb-48">
            <div className="text-center mb-32">
                <h2 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase leading-tight">
                    比特币流动性 <br/>
                    <span className="text-yellow-500">万亿级难题</span>
                </h2>
                <p className="text-xl text-stone-400 max-w-3xl mx-auto font-mono">
                    最大的 Web3 资产。却被困在流动性与扩展性的牢笼中。
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-24 max-w-7xl mx-auto">
                {/* Visualizing the Scale - The Dynamic Solar System */}
                <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center my-10 lg:my-0 scale-75 sm:scale-100">
                    
                    {/* --- SUN (CENTER) - MASSIVE SIZE --- */}
                    {/* Increased size to w-80/h-80 (mobile) and w-96/h-96 (desktop) */}
                    <div className="absolute z-30 w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 shadow-[0_0_120px_rgba(251,146,60,0.9)] flex flex-col items-center justify-center animate-pulse">
                        <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl animate-pulse"></div>
                        
                        {/* Sun Surface Texture */}
                        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay animate-[spin_60s_linear_infinite]"></div>
                        
                        <div className="z-10 text-center text-white drop-shadow-md transform scale-125">
                            {/* Scaled up text significantly */}
                            <div className="text-7xl lg:text-9xl font-black tracking-tighter leading-none">$2T</div>
                            <div className="text-xl lg:text-2xl font-bold uppercase tracking-widest opacity-90 mt-2">BTC Sun</div>
                        </div>
                    </div>

                    {/* --- ORBIT SYSTEM --- */}
                    {/* Expanded orbits to fit the massive sun */}
                    
                    {/* 1. INNER ORBIT (OP_CAT EARTH) - Vibrant, Connected */}
                    {/* Visual Track - Expanded to 130% */}
                    <div className="absolute w-[130%] h-[130%] border border-orange-500/30 rounded-full z-10 border-dashed"></div>
                    
                    {/* Rotating Container */}
                    <div className="absolute w-[130%] h-[130%] z-20" style={{ animation: 'spin 12s linear infinite' }}>
                        {/* The Earth (OP_CAT) positioned at top (0 degrees) */}
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-20 h-20 group">
                             {/* Energy Beam (Nourishment) - pointing to center */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-[300px] bg-gradient-to-b from-yellow-400/80 to-transparent -z-10 blur-[2px]"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-6 h-[300px] bg-gradient-to-b from-yellow-500/20 to-transparent -z-10 blur-xl"></div>
                             
                             {/* Planet Body */}
                             <div 
                                className="w-full h-full rounded-full bg-gradient-to-bl from-blue-400 via-cyan-500 to-green-500 shadow-[0_0_40px_rgba(34,197,94,1)] flex items-center justify-center relative overflow-hidden ring-4 ring-white/20"
                                style={{ animation: 'spin 12s linear infinite reverse' }}
                             >
                                {/* Texture */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
                                {/* Atmosphere */}
                                <div className="absolute inset-0 bg-blue-400/30 blur-md rounded-full"></div>
                                
                                {/* Text inside planet */}
                                <div className="text-center leading-none z-10">
                                    <div className="text-[10px] text-white font-black drop-shadow-md uppercase">OP_CAT</div>
                                    <div className="text-[8px] text-blue-100 font-bold">Layer</div>
                                </div>
                             </div>
                             
                             {/* Floating Label (Counter-rotated to stay upright) */}
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

                    {/* 2. OUTER ORBIT (Others) - Dead, Barren */}
                    {/* Visual Track - Expanded to 160% */}
                    <div className="absolute w-[160%] h-[160%] border border-stone-800 rounded-full border-dashed z-0 opacity-50"></div>
                    
                    {/* Rotating Container (Slower) */}
                    <div className="absolute w-[160%] h-[160%] z-10" style={{ animation: 'spin 30s linear infinite' }}>
                        
                        {/* Dead Planet 1 (Sidechains) */}
                        <div className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10">
                             <div className="w-full h-full rounded-full bg-gradient-to-br from-stone-600 to-stone-800 shadow-inner flex items-center justify-center grayscale opacity-80"
                                  style={{ animation: 'spin 30s linear infinite reverse' }}>
                             </div>
                             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ animation: 'spin 30s linear infinite reverse' }}>
                                 <span className="text-[10px] text-stone-600 font-mono bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">Sidechains</span>
                             </div>
                        </div>

                        {/* Dead Planet 2 (Rollups) */}
                        <div className="absolute bottom-[10%] left-[10%] w-8 h-8">
                             <div className="w-full h-full rounded-full bg-stone-800 border border-stone-700 shadow-inner"></div>
                             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ animation: 'spin 30s linear infinite reverse' }}>
                                 <span className="text-[10px] text-stone-700 font-mono">Rollups</span>
                             </div>
                        </div>
                        
                         {/* Dead Planet 3 (CEX) */}
                         <div className="absolute top-[10%] left-[20%] w-6 h-6 opacity-50">
                             <div className="w-full h-full rounded-full bg-stone-800 shadow-inner"></div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 text-left space-y-10 z-40 relative">
                    <div className="bg-stone-900/80 backdrop-blur-sm p-6 border-l-4 border-orange-500 hover:bg-stone-900 transition-colors group shadow-2xl">
                        <h3 className="text-2xl font-black text-white mb-2 uppercase flex items-center gap-2 group-hover:scale-105 transition-transform origin-left">
                            <Sun className="text-orange-500 animate-spin-slow" /> 太阳 (Bitcoin)
                        </h3>
                        <p className="text-stone-400 font-mono text-sm leading-relaxed">
                            BTC 的市值如同恒星般巨大，蕴含着 2 万亿美元的能量。但目前被共识层锁定，处于休眠状态。
                        </p>
                    </div>
                    
                    <div className="bg-stone-900/80 backdrop-blur-sm p-6 border-l-4 border-green-500 hover:bg-stone-900 transition-colors group relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 blur-2xl rounded-full -mr-10 -mt-10 transition-all group-hover:bg-green-500/20"></div>
                        <h3 className="text-2xl font-black text-white mb-2 uppercase flex items-center gap-2">
                             <span className="text-green-500">🌍</span> 地球 (OP_CAT)
                        </h3>
                        <p className="text-stone-400 font-mono text-sm leading-relaxed">
                            OP_CAT Layer 处于“宜居带”，通过原生连接（Native Peg）直接获取太阳的能量。它生机勃勃，孕育着 DeFi 与 GameFi 的万物。
                        </p>
                    </div>

                    <div className="bg-stone-900/80 backdrop-blur-sm p-6 border-l-4 border-stone-600 hover:bg-stone-900 transition-colors shadow-xl">
                        <h3 className="text-2xl font-black text-stone-400 mb-2 uppercase flex items-center gap-2">
                             <span className="grayscale opacity-50">🪐</span> 其他 (Others)
                        </h3>
                        <p className="text-stone-500 font-mono text-sm leading-relaxed">
                            其他扩容方案如同荒凉的边缘行星，距离太阳太远（非原生），无法获得核心流动性的滋养，生态死气沉沉。
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION 2: NO PERFECT SOLUTIONS YET (Comparison Matrix) */}
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase">
                    没有完美的解决方案...直到现在
                </h2>
                <div className="h-1 w-24 bg-yellow-500 mx-auto mt-6"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* 1. OFFCHAIN */}
                <div className="bg-stone-900 border border-stone-800 p-8 relative group hover:border-stone-700 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <div className="flex gap-2">
                            <span className="bg-stone-800 px-2 py-1 text-[10px] font-bold uppercase rounded text-stone-500">ETF</span>
                            <span className="bg-stone-800 px-2 py-1 text-[10px] font-bold uppercase rounded text-stone-500">CEX</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-stone-500 mb-8 uppercase">链下方案</h3>
                    
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <XCircle className="text-red-600 shrink-0 w-6 h-6" />
                            <div>
                                <strong className="block text-white font-bold uppercase text-sm mb-1">无区块链特性</strong>
                                <p className="text-stone-500 text-xs leading-relaxed">完全脱离链上。没有链级的透明度或可扩展性。</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <XCircle className="text-red-600 shrink-0 w-6 h-6" />
                            <div>
                                <strong className="block text-white font-bold uppercase text-sm mb-1">资产不受控</strong>
                                <p className="text-stone-500 text-xs leading-relaxed">完全中心化托管。用户资产由第三方控制。</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* 2. ONCHAIN (Current) */}
                <div className="bg-stone-900 border border-stone-800 p-8 relative group hover:border-stone-700 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <div className="flex gap-2">
                            <span className="bg-stone-800 px-2 py-1 text-[10px] font-bold uppercase rounded text-stone-500">Rollups</span>
                            <span className="bg-stone-800 px-2 py-1 text-[10px] font-bold uppercase rounded text-stone-500">Sidechains</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-stone-500 mb-8 uppercase">现有“链上”方案</h3>
                    
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <AlertTriangle className="text-yellow-600 shrink-0 w-6 h-6" />
                            <div>
                                <strong className="block text-white font-bold uppercase text-sm mb-1">缺乏去中心化</strong>
                                <p className="text-stone-500 text-xs leading-relaxed">大多由中心化实体或多签控制。引入了托管风险。</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <AlertTriangle className="text-yellow-600 shrink-0 w-6 h-6" />
                            <div>
                                <strong className="block text-white font-bold uppercase text-sm mb-1">非比特币原生</strong>
                                <p className="text-stone-500 text-xs leading-relaxed">使用账户模型。BTC 是被跨链封装的，而非原生使用。</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* 3. OP_CAT LAYER (Winner) */}
                <div className="bg-stone-900 border-2 border-yellow-500 p-8 relative transform lg:scale-105 shadow-[0_0_40px_rgba(234,179,8,0.1)] z-10">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-2 text-xs font-black uppercase tracking-widest shadow-lg">
                        Game Changer
                    </div>
                    <h3 className="text-3xl font-black text-white mb-8 uppercase italic">OP_CAT Layer</h3>
                    
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-green-500 shrink-0 w-6 h-6" />
                            <div>
                                <strong className="block text-white font-bold uppercase text-sm mb-1">100% 信任最小化桥</strong>
                                <p className="text-stone-400 text-xs leading-relaxed">OP_CAT Peg。通过 SPV 直接验证脚本。无托管商。</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-green-500 shrink-0 w-6 h-6" />
                            <div>
                                <strong className="block text-white font-bold uppercase text-sm mb-1">比特币原生</strong>
                                <p className="text-stone-400 text-xs leading-relaxed">基于 UTXO。使用 BTC 作为 Gas。继承比特币 PoW 安全性。</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-green-500 shrink-0 w-6 h-6" />
                            <div>
                                <strong className="block text-white font-bold uppercase text-sm mb-1">高性能</strong>
                                <p className="text-stone-400 text-xs leading-relaxed">并行执行。图灵完备智能合约。</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default WhyItWins;
