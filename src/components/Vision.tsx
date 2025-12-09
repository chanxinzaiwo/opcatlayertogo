
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { TrendingUp, Zap, Flag, MousePointerClick, Rocket, Image as ImageIcon, BarChart3, Hand, Bitcoin as BitcoinIcon } from 'lucide-react';

const Vision: React.FC = () => {
  // Initial state: Sorted Ascending by Cap (approx)
  // OP_CAT (0) -> Solana (80) -> Ethereum (350) -> Bitcoin (2000)
  const [chartData, setChartData] = useState([
    { name: 'OP_CAT Layer', cap: 2, label: 'Start', fill: '#F7931A' }, 
    { name: 'Solana', cap: 80, label: '$80B', fill: '#14F195' },
    { name: 'Ethereum', cap: 350, label: '$350B', fill: '#627EEA' },
    { name: 'Bitcoin (L1)', cap: 2000, label: '$2000B', fill: '#44403C' },
  ]);

  const [milestone, setMilestone] = useState(0);
  const [isInjecting, setIsInjecting] = useState(false);
  const [viewMode, setViewMode] = useState<'image' | 'chart'>('image'); // Default to image

  const handleMilestoneClick = (targetMilestone: number) => {
    // Switch to chart view automatically when interacting
    if (viewMode === 'image') setViewMode('chart');

    // 1. Start Injection Animation immediately
    if (targetMilestone > 0 && targetMilestone !== milestone) {
        setIsInjecting(true);
    }
    
    setMilestone(targetMilestone);

    // 2. Delay the Chart Update (Growth & Move) until injection "lands"
    // Animation duration is 1s, so we update state at 0.9s
    setTimeout(() => {
        setIsInjecting(false);

        let newData = [
          { name: 'Solana', cap: 80, label: '$80B', fill: '#14F195' },
          { name: 'Ethereum', cap: 350, label: '$350B', fill: '#627EEA' },
          { name: 'Bitcoin (L1)', cap: 2000, label: '$2000B', fill: '#44403C' },
          { name: 'OP_CAT Layer', cap: 0, label: '', fill: '#F7931A' }
        ];
    
        const opCatItem = newData.find(d => d.name === 'OP_CAT Layer')!;
        const btcItem = newData.find(d => d.name === 'Bitcoin (L1)')!;
    
        if (targetMilestone === 1) {
          opCatItem.cap = 20; // Visual boost
          opCatItem.label = '$10B';
        } else if (targetMilestone === 2) {
          opCatItem.cap = 120;
          opCatItem.label = '$120B';
        } else if (targetMilestone === 3) {
          opCatItem.cap = 400;
          opCatItem.label = '$400B';
          btcItem.fill = '#F59E0B'; // Highlight BTC Gold
        } else {
          opCatItem.cap = 2; // Reset
          opCatItem.label = 'Start';
        }
    
        // 3. Sort triggers the "Move Right" animation
        newData.sort((a, b) => a.cap - b.cap);
        setChartData(newData);

    }, 1000); // Wait for coins to land
  };

  return (
    <section id="vision" className="py-24 bg-stone-900 relative text-white overflow-hidden border-t border-stone-800">
       <style>{`
         @keyframes coin-flight {
           0% { 
             top: 15%; 
             left: 85%; 
             opacity: 0; 
             transform: scale(0.2) rotate(0deg);
           }
           10% {
             opacity: 1;
             transform: scale(1) rotate(180deg);
           }
           90% {
             opacity: 1;
             transform: scale(0.8) rotate(720deg);
           }
           100% { 
             top: 85%; 
             left: 12%; 
             opacity: 0; 
             transform: scale(0.2) rotate(1080deg); 
           }
         }
         .animate-coin-flight {
           animation: coin-flight 1s cubic-bezier(0.5, 0, 0.5, 1) forwards;
         }
         @keyframes point-left {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-10px); }
         }
         .animate-point-left {
            animation: point-left 1s infinite ease-in-out;
         }
       `}</style>

       {/* Background accent */}
       <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none
           ${milestone === 3 ? 'opacity-100 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/40 via-stone-900 to-stone-900' : 'opacity-0'}
       `} />
       
       <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-orange-500/30">
            Market Cap Target
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            目标：释放比特币的万亿潜能
          </h2>
          <p className="text-xl text-stone-400 max-w-3xl mx-auto leading-relaxed">
            比特币拥有 <strong>2 万亿美元</strong> 的市值，却缺乏像样的应用层。<br/>
            OP_CAT Layer 不需要创造新资产，<span className="text-yellow-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">只需释放 10% 的比特币流动性</span>，<br/>就能成为全球第二大区块链生态。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: VISUAL AREA (Image or Chart) */}
          <div className="bg-stone-800/50 border border-stone-700 p-8 rounded-3xl h-[550px] shadow-2xl relative group overflow-hidden flex flex-col transition-all hover:border-orange-500/30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/50 pointer-events-none z-0"></div>
            
            {/* Header / Toggle */}
            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    {viewMode === 'chart' ? <TrendingUp className="text-orange-500" /> : <Zap className="text-orange-500" />}
                    {viewMode === 'chart' ? '市值模拟器' : '愿景可视化'}
                </h3>
                
                <div className="bg-stone-900 p-1 rounded-lg border border-stone-700 flex gap-1">
                    <button 
                        onClick={() => setViewMode('image')}
                        className={`p-2 rounded flex items-center gap-2 text-xs font-bold transition-all ${viewMode === 'image' ? 'bg-orange-500 text-black shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
                    >
                        <ImageIcon size={14} /> <span className="hidden sm:inline">Concept</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('chart')}
                        className={`p-2 rounded flex items-center gap-2 text-xs font-bold transition-all ${viewMode === 'chart' ? 'bg-orange-500 text-black shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
                    >
                        <BarChart3 size={14} /> <span className="hidden sm:inline">Data</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full relative z-10 overflow-hidden rounded-xl bg-stone-900/50 border border-stone-800">
                
                {/* 1. IMAGE MODE */}
                <div className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${viewMode === 'image' ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                     <img 
                        src="https://github.com/user-attachments/assets/481bdf2c-40cf-419e-979c-717a2aaeb1b8" 
                        alt="OP_CAT Valve releasing Bitcoin Liquidity" 
                        className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
                        <div className="text-white font-bold text-lg">The OP_CAT Valve</div>
                        <div className="text-stone-400 text-xs">Unlocking Trillions in Dormant Capital</div>
                    </div>
                </div>

                {/* 2. CHART MODE */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${viewMode === 'chart' ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                        barGap={10}
                    >
                        <XAxis 
                            dataKey="name" 
                            tick={{fill: '#E7E5E4', fontSize: 11, fontWeight: 700}} 
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                        />
                        <YAxis 
                            hide 
                            domain={[0, 2200]} 
                        />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#1C1917', borderColor: '#44403C', color: '#fff', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => [`$${value} Billion`, 'Market Cap']}
                        />
                        <Bar dataKey="cap" radius={[6, 6, 0, 0]} barSize={50} isAnimationActive={true} animationDuration={1000} animationEasing="ease-in-out">
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                            <LabelList dataKey="label" position="top" fill="#fff" fontSize={12} fontWeight="bold" />
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Animation Overlay (Visible in Chart Mode) */}
                {viewMode === 'chart' && isInjecting && (
                   <div className="absolute inset-0 pointer-events-none z-30">
                       {[...Array(15)].map((_, i) => (
                           <div 
                               key={i} 
                               className="absolute w-6 h-6 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)] border-2 border-yellow-300 flex items-center justify-center animate-coin-flight"
                               style={{ 
                                   animationDelay: `${i * 0.08}s`,
                                   top: '15%', // Start near Bitcoin Bar top
                                   left: '85%'
                               }}
                           >
                               <BitcoinIcon size={14} className="text-yellow-900" />
                           </div>
                       ))}
                   </div>
                )}
            </div>
            
            {/* Dynamic Status Bar */}
            <div className={`mt-4 p-4 border rounded-xl text-sm min-h-[80px] flex items-center justify-center text-center transition-all duration-500 relative z-10
                ${milestone === 3 ? 'bg-orange-900/30 border-orange-500/50 text-orange-200' : 'bg-stone-900/80 border-stone-700 text-stone-400'}
            `}>
                {milestone === 0 && (
                    <span className="flex items-center gap-2 animate-pulse">
                        <MousePointerClick size={16} /> 点击右侧按钮开启模拟...
                    </span>
                )}
                {milestone === 1 && "🌱 阶段一: 启动期。生态冷启动，验证 SPV 桥与 CAT20 协议安全性。"}
                {milestone === 2 && "🌿 阶段二: 爆发期。高性能优势吸引 Solana 开发者，DeFi/GameFi 繁荣。"}
                {milestone === 3 && "🚀 最终形态: 比特币原生应用层全面繁荣，L1 流动性完全激活。"}
            </div>
          </div>

          {/* RIGHT: INTERACTIVE CONTROLS */}
          <div className="space-y-6">
            
            {/* Step 1 */}
            <button 
                onClick={() => handleMilestoneClick(1)}
                className={`w-full relative pl-8 border-l-4 py-4 text-left transition-all group hover:bg-stone-800/50 ${milestone === 1 ? 'border-orange-500 bg-stone-800/50' : 'border-stone-700'}`}
            >
              {/* FINGER GUIDE ANIMATION */}
              {milestone === 0 && (
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 animate-point-left hidden lg:block z-50 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      <Hand size={32} fill="white" className="rotate-180" />
                  </div>
              )}

              <div className={`absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 transition-all ${milestone === 1 ? 'bg-stone-900 border-orange-500 scale-110' : 'bg-stone-900 border-stone-600'}`}></div>
              <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${milestone === 1 ? 'text-white' : 'text-stone-500'}`}>
                 <Flag size={20} className={milestone === 1 ? 'text-orange-500' : 'text-stone-600'} />
                 1. 启动期 ($10B)
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed pr-4">
                像 Ethereum 一样编程。sCrypt 让数百万 Web2 开发者进入 BTC 生态，构建基础 DeFi 设施。
              </p>
            </button>
            
            {/* Step 2 */}
            <button 
                onClick={() => handleMilestoneClick(2)}
                className={`w-full relative pl-8 border-l-4 py-4 text-left transition-all group hover:bg-stone-800/50 ${milestone === 2 ? 'border-green-500 bg-stone-800/50' : 'border-stone-700'}`}
            >
              <div className={`absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 transition-all ${milestone === 2 ? 'bg-stone-900 border-green-500 scale-125' : 'bg-stone-900 border-stone-600'}`}></div>
              <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${milestone === 2 ? 'text-white' : 'text-stone-500'}`}>
                 <Zap size={20} className={milestone === 2 ? 'text-green-500' : 'text-stone-600'} />
                 2. 超越 Solana ($120B)
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed pr-4">
                像 Solana 一样扩展。OP_CAT VM 的并行执行能力支撑大规模 GameFi 和 SocialFi 爆发。
              </p>
            </button>

            {/* Step 3 */}
            <button 
                onClick={() => handleMilestoneClick(3)}
                className={`w-full relative pl-8 border-l-4 py-4 text-left transition-all group hover:bg-stone-800/50 ${milestone === 3 ? 'border-blue-500 bg-stone-800/50' : 'border-stone-700'}`}
            >
              <div className={`absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 transition-all ${milestone === 3 ? 'bg-stone-900 border-blue-500 scale-125' : 'bg-stone-900 border-stone-600'}`}></div>
              <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${milestone === 3 ? 'text-white' : 'text-stone-500'}`}>
                 <Rocket size={20} className={milestone === 3 ? 'text-blue-500' : 'text-stone-600'} />
                 3. 超越 Ethereum ($400B)
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed pr-4">
                唯有比特币不可替代。通过 OP_CAT，比特币 L1 的万亿流动性被彻底激活，成为真正的全球金融层。
              </p>
            </button>
            
            {/* Reset */}
            {milestone > 0 && (
                <div className="text-center pt-4">
                    <button onClick={() => handleMilestoneClick(0)} className="text-xs text-stone-600 hover:text-stone-400 underline cursor-pointer">
                        重置模拟
                    </button>
                </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
