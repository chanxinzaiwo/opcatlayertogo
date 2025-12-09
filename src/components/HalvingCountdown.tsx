
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { Clock, TrendingDown, TrendingUp, AlertTriangle, Hammer, Coins, Play, Pause, RotateCcw } from 'lucide-react';

const HalvingCountdown: React.FC = () => {
  const [year, setYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState({ days: 1150, hours: 12, minutes: 30, seconds: 45 });

  // Ticking Effect
  useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft(prev => {
            if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
            if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
            return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulation Loop
  useEffect(() => {
      let interval: any;
      if (isPlaying) {
          interval = setInterval(() => {
              setYear(prev => {
                  if (prev >= 2036) {
                      setIsPlaying(false);
                      return 2036;
                  }
                  return prev + 0.1; // Slow increment
              });
          }, 50);
      }
      return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
      if (year >= 2036) setYear(2024);
      setIsPlaying(true);
  };

  // Data Generation based on Halving Schedule
  const getData = () => {
      const data = [];
      for (let y = 2020; y <= 2036; y++) {
          let subsidy = 0;
          if (y < 2024) subsidy = 6.25;
          else if (y < 2028) subsidy = 3.125;
          else if (y < 2032) subsidy = 1.5625;
          else subsidy = 0.78125;

          // Fee Narrative:
          // Without L2: Fees stay low/flat (Standard L1 usage capped)
          // With L2: Fees grow exponentially as adoption increases
          let standardFees = 0.2; // ~0.2 BTC per block avg
          
          // Current simulation year effect
          const isFuture = y > year;
          const l2Growth = Math.max(0, (y - 2025) * 0.5); // Linear growth for demo
          const l2Fees = (y >= 2025) ? l2Growth : 0;

          data.push({
              year: y,
              Subsidy: subsidy,
              BaseFees: standardFees,
              L2Fees: l2Fees,
              Total: subsidy + standardFees + l2Fees,
              isFuture
          });
      }
      return data;
  };

  const currentData = getData();
  // Using toFixed(5) to prevent rounding of small halving values (e.g. 0.78125)
  const currentBlockReward = currentData.find(d => Math.floor(d.year) === Math.floor(year))?.Total.toFixed(5) || "0.00000";
  const currentSubsidy = currentData.find(d => Math.floor(d.year) === Math.floor(year))?.Subsidy || 0;
  const currentL2Fees = currentData.find(d => Math.floor(d.year) === Math.floor(year))?.L2Fees || 0;
  const currentBaseFees = currentData.find(d => Math.floor(d.year) === Math.floor(year))?.BaseFees || 0;

  return (
    <section id="halvingCountdown" className="py-24 bg-stone-900 border-t border-stone-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest mb-4 bg-red-900/20 px-3 py-1 rounded border border-red-900/50 animate-pulse">
                    <AlertTriangle size={14} /> Critical Security Issue
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                    减半危机与 <span className="text-green-500">手续费救赎</span>
                </h2>
                <p className="text-stone-400 text-lg leading-relaxed">
                    每 4 年，比特币的区块奖励减半。为了维持网络安全（Security Budget），
                    矿工必须寻找新的收入来源。OP_CAT 通过 Layer 2 的海量交易手续费，填补了这一缺口。
                </p>
            </div>
            
            {/* COUNTDOWN TIMER */}
            <div className="bg-black/50 border border-stone-800 p-6 rounded-2xl flex flex-col items-center min-w-[300px]">
                <div className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Clock size={14} /> Next Halving (Est. 2028)
                </div>
                <div className="flex gap-4 font-mono">
                    <div className="text-center">
                        <div className="text-3xl font-black text-white">{timeLeft.days}</div>
                        <div className="text-[10px] text-stone-600 uppercase">Days</div>
                    </div>
                    <div className="text-3xl font-black text-stone-700">:</div>
                    <div className="text-center">
                        <div className="text-3xl font-black text-white">{timeLeft.hours}</div>
                        <div className="text-[10px] text-stone-600 uppercase">Hrs</div>
                    </div>
                    <div className="text-3xl font-black text-stone-700">:</div>
                    <div className="text-center">
                        <div className="text-3xl font-black text-yellow-500">{timeLeft.minutes}</div>
                        <div className="text-[10px] text-stone-600 uppercase">Mins</div>
                    </div>
                    <div className="text-3xl font-black text-stone-700">:</div>
                    <div className="text-center">
                        <div className="text-3xl font-black text-stone-500 w-10">{timeLeft.seconds}</div>
                        <div className="text-[10px] text-stone-600 uppercase">Secs</div>
                    </div>
                </div>
            </div>
        </div>

        {/* INTERACTIVE CHART */}
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEFT: CHART */}
            <div className="lg:col-span-2 bg-black rounded-3xl border border-stone-800 p-6 relative">
                <div className="absolute top-6 left-6 z-10">
                    <div className="text-sm font-bold text-white mb-1">Miner Revenue Projection</div>
                    <div className="text-xs text-stone-500">Block Subsidy (Red) vs. Needed Fees (Green)</div>
                </div>

                <div className="h-[400px] w-full mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSubsidy" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorL2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="year" stroke="#666" fontSize={12} tickFormatter={(tick) => tick.toString()} />
                            <YAxis stroke="#666" fontSize={12} label={{ value: 'BTC Reward', angle: -90, position: 'insideLeft', fill: '#666' }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1C1917', borderColor: '#333', color: '#fff' }}
                                formatter={(value: number) => value.toFixed(5)}
                            />
                            <ReferenceLine x={year} stroke="#EAB308" strokeDasharray="3 3" />
                            
                            <Area 
                                type="stepAfter" 
                                dataKey="Subsidy" 
                                stackId="1" 
                                stroke="#EF4444" 
                                fill="url(#colorSubsidy)" 
                                animationDuration={0}
                            />
                             <Area 
                                type="monotone" 
                                dataKey="BaseFees" 
                                stackId="1" 
                                stroke="#57534E" 
                                fill="#57534E" 
                                animationDuration={0}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="L2Fees" 
                                stackId="1" 
                                stroke="#22C55E" 
                                fill="url(#colorL2)" 
                                animationDuration={0}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Timeline Controls */}
                <div className="mt-4 flex items-center gap-4 bg-stone-900 p-3 rounded-xl border border-stone-800">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:bg-stone-200 transition-colors"
                    >
                        {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-1" />}
                    </button>
                    <div className="flex-1">
                        <input 
                            type="range" 
                            min="2020" 
                            max="2036" 
                            step="0.1"
                            value={year}
                            onChange={(e) => { setIsPlaying(false); setYear(parseFloat(e.target.value)); }}
                            className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        />
                        <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                            <span>2020</span>
                            <span>2024 (Now)</span>
                            <span>2028 (Next)</span>
                            <span>2032</span>
                            <span>2036</span>
                        </div>
                    </div>
                    <div className="font-mono text-xl font-bold text-yellow-500 w-16 text-right">
                        {Math.floor(year)}
                    </div>
                </div>
            </div>

            {/* RIGHT: METRICS & NARRATIVE */}
            <div className="flex flex-col gap-6">
                
                {/* Metric Card 1: Declining Subsidy */}
                <div className={`p-6 rounded-2xl border transition-all duration-500 ${year >= 2028 ? 'bg-red-900/10 border-red-500/50' : 'bg-stone-900 border-stone-800'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-stone-400 text-xs font-bold uppercase">Block Subsidy</div>
                        <TrendingDown size={16} className="text-red-500" />
                    </div>
                    <div className="text-3xl font-black text-white font-mono mb-1">
                        {/* Show up to 5 decimal places to avoid rounding 0.78125 to 0.78 */}
                        {currentSubsidy.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 5 })} <span className="text-sm text-stone-500">BTC</span>
                    </div>
                    <p className="text-xs text-stone-500">
                        固定奖励随时间减少。这是比特币通缩模型的必然结果，但也给矿工收入带来巨大压力。
                    </p>
                </div>

                {/* Metric Card 2: Rising Fees */}
                <div className={`p-6 rounded-2xl border transition-all duration-500 ${year >= 2025 ? 'bg-green-900/10 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'bg-stone-900 border-stone-800'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-stone-400 text-xs font-bold uppercase">L2 Fee Revenue</div>
                        <TrendingUp size={16} className="text-green-500" />
                    </div>
                    <div className="text-3xl font-black text-green-400 font-mono mb-1">
                        +{(currentL2Fees + currentBaseFees - currentBaseFees).toFixed(5)} <span className="text-sm text-stone-500">BTC</span>
                    </div>
                    <div className="w-full bg-stone-800 h-1.5 rounded-full mt-2 mb-3 overflow-hidden">
                        <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${Math.min(100, (currentL2Fees * 20))}%` }}></div>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                        <span className="text-white font-bold">OP_CAT Layer</span> 产生的交易手续费。通过联合挖矿 (Merged Mining)，这些收入 100% 归比特币矿工所有。
                    </p>
                </div>

                {/* Status Indicator */}
                <div className="flex-1 bg-stone-800/50 rounded-2xl p-6 border border-stone-700 flex flex-col justify-center text-center">
                    <div className="mb-4">
                        {parseFloat(currentBlockReward) < 3.5 ? (
                             <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold animate-pulse">
                                <AlertTriangle size={14} /> SECURITY BUDGET LOW
                             </div>
                        ) : (
                             <div className="inline-flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-full text-xs font-bold">
                                <ShieldCheck size={14} /> NETWORK SECURE
                             </div>
                        )}
                    </div>
                    <p className="text-sm text-stone-400">
                        {parseFloat(currentBlockReward) < 3.5 
                            ? "如果没有足够的手续费补充，矿工可能关机，导致算力下降，网络安全性受损。" 
                            : "L2 的繁荣带来了充足的手续费，即便区块奖励减半，矿工收入依然稳健增长。"}
                    </p>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};

// Helper for Missing Icon
const ShieldCheck = ({size, className}: {size:number, className?:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
)

export default HalvingCountdown;
