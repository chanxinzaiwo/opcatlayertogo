
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { Clock, TrendingDown, TrendingUp, AlertTriangle, Hammer, Coins, Play, Pause, RotateCcw } from 'lucide-react';

const HalvingCountdown: React.FC = () => {
  const [year, setYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 1150, hours: 12, minutes: 30, seconds: 45 });

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

  useEffect(() => {
      let interval: any;
      if (isPlaying) {
          interval = setInterval(() => {
              setYear(prev => {
                  if (prev >= 2036) {
                      setIsPlaying(false);
                      return 2036;
                  }
                  return prev + 0.1;
              });
          }, 50);
      }
      return () => clearInterval(interval);
  }, [isPlaying]);

  const getData = () => {
      const data = [];
      for (let y = 2020; y <= 2036; y++) {
          let subsidy = 0;
          if (y < 2024) subsidy = 6.25;
          else if (y < 2028) subsidy = 3.125;
          else if (y < 2032) subsidy = 1.5625;
          else subsidy = 0.78125;

          let standardFees = 0.2; 
          const l2Growth = Math.max(0, (y - 2025) * 0.5);
          const l2Fees = (y >= 2025) ? l2Growth : 0;

          data.push({
              year: y,
              Subsidy: subsidy,
              BaseFees: standardFees,
              L2Fees: l2Fees,
              Total: subsidy + standardFees + l2Fees
          });
      }
      return data;
  };

  const currentData = getData();
  const currentBlockReward = currentData.find(d => Math.floor(d.year) === Math.floor(year))?.Total.toFixed(5) || "0.00000";
  const currentSubsidy = currentData.find(d => Math.floor(d.year) === Math.floor(year))?.Subsidy || 0;
  const currentL2Fees = currentData.find(d => Math.floor(d.year) === Math.floor(year))?.L2Fees || 0;
  const currentBaseFees = currentData.find(d => Math.floor(d.year) === Math.floor(year))?.BaseFees || 0;

  return (
    <section id="halvingCountdown" className="py-16 md:py-24 bg-stone-900 border-t border-stone-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
            <div className="max-w-2xl w-full">
                <div className="inline-flex items-center gap-2 text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 bg-red-900/20 px-3 py-1 rounded border border-red-900/50 animate-pulse">
                    <AlertTriangle size={14} /> Critical Security Issue
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">
                    减半危机与 <span className="text-green-500">手续费救赎</span>
                </h2>
                <p className="text-stone-400 text-base md:text-lg leading-relaxed">
                    为了维持网络安全（Security Budget），OP_CAT 带来的 Layer 2 手续费至关重要。
                </p>
            </div>
            
            {/* COUNTDOWN TIMER */}
            <div className="bg-black/50 border border-stone-800 p-4 md:p-6 rounded-2xl flex flex-col items-center min-w-[280px] w-full md:w-auto">
                <div className="text-stone-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Clock size={14} /> Next Halving
                </div>
                <div className="flex gap-2 md:gap-4 font-mono justify-center">
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-black text-white">{timeLeft.days}</div>
                        <div className="text-[9px] md:text-[10px] text-stone-600 uppercase">Days</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-stone-700">:</div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-black text-white">{timeLeft.hours}</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-stone-700">:</div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-black text-yellow-500">{timeLeft.minutes}</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-stone-700">:</div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-black text-stone-500 w-8 md:w-10">{timeLeft.seconds}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* INTERACTIVE CHART */}
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEFT: CHART */}
            <div className="lg:col-span-2 bg-black rounded-3xl border border-stone-800 p-4 md:p-6 relative">
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                    <div className="text-xs md:text-sm font-bold text-white mb-1">Miner Revenue</div>
                </div>

                <div className="h-[250px] md:h-[400px] w-full mt-8 md:mt-8">
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
                            <XAxis dataKey="year" stroke="#666" fontSize={10} tickFormatter={(tick) => tick.toString()} />
                            <YAxis stroke="#666" fontSize={10} label={{ value: 'BTC Reward', angle: -90, position: 'insideLeft', fill: '#666' }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1C1917', borderColor: '#333', color: '#fff', fontSize: '12px' }}
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
                <div className="mt-4 flex items-center gap-3 md:gap-4 bg-stone-900 p-2 md:p-3 rounded-xl border border-stone-800">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white text-black rounded-full hover:bg-stone-200 transition-colors"
                    >
                        {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" className="ml-1" />}
                    </button>
                    <div className="flex-1">
                        <input 
                            type="range" 
                            min="2020" 
                            max="2036" 
                            step="0.1"
                            value={year}
                            onChange={(e) => { setIsPlaying(false); setYear(parseFloat(e.target.value)); }}
                            className="w-full h-1.5 md:h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        />
                    </div>
                    <div className="font-mono text-base md:text-xl font-bold text-yellow-500 w-12 md:w-16 text-right">
                        {Math.floor(year)}
                    </div>
                </div>
            </div>

            {/* RIGHT: METRICS */}
            <div className="flex flex-col gap-4 md:gap-6">
                
                <div className={`p-4 md:p-6 rounded-2xl border transition-all duration-500 ${year >= 2028 ? 'bg-red-900/10 border-red-500/50' : 'bg-stone-900 border-stone-800'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-stone-400 text-[10px] md:text-xs font-bold uppercase">Block Subsidy</div>
                        <TrendingDown size={16} className="text-red-500" />
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-white font-mono mb-1">
                        {currentSubsidy.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 5 })} <span className="text-xs md:text-sm text-stone-500">BTC</span>
                    </div>
                </div>

                <div className={`p-4 md:p-6 rounded-2xl border transition-all duration-500 ${year >= 2025 ? 'bg-green-900/10 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'bg-stone-900 border-stone-800'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-stone-400 text-[10px] md:text-xs font-bold uppercase">L2 Fee Revenue</div>
                        <TrendingUp size={16} className="text-green-500" />
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-green-400 font-mono mb-1">
                        +{(currentL2Fees + currentBaseFees - currentBaseFees).toFixed(5)} <span className="text-xs md:text-sm text-stone-500">BTC</span>
                    </div>
                    <div className="w-full bg-stone-800 h-1 md:h-1.5 rounded-full mt-2 mb-3 overflow-hidden">
                        <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${Math.min(100, (currentL2Fees * 20))}%` }}></div>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="flex-1 bg-stone-800/50 rounded-2xl p-4 md:p-6 border border-stone-700 flex flex-col justify-center text-center">
                    <div className="mb-4">
                        {parseFloat(currentBlockReward) < 3.5 ? (
                             <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-bold animate-pulse">
                                <AlertTriangle size={14} /> SECURITY BUDGET LOW
                             </div>
                        ) : (
                             <div className="inline-flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-full text-[10px] md:text-xs font-bold">
                                <ShieldCheck size={14} /> NETWORK SECURE
                             </div>
                        )}
                    </div>
                    <p className="text-[10px] md:text-sm text-stone-400">
                        {parseFloat(currentBlockReward) < 3.5 
                            ? "如果没有手续费补充，矿工可能关机。" 
                            : "L2 的繁荣带来了充足的手续费，矿工收入稳健增长。"}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const ShieldCheck = ({size, className}: {size:number, className?:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
)

export default HalvingCountdown;
