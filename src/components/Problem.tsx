import React, { useState } from 'react';
import { Smartphone, Battery, Signal, Wifi, AppWindow, Quote, History } from 'lucide-react';

const Problem: React.FC = () => {
  const [mode, setMode] = useState<'nokia' | 'iphone'>('nokia');

  return (
    <section id="problem" className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
            
            {/* SATOSHI'S VISION SECTION - Enhanced */}
            <div className="mb-32 relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-orange-600 text-sm font-bold uppercase tracking-widest mb-4 bg-orange-100 px-4 py-1 rounded-full border border-orange-200">
                        <History size={16} /> 追溯起源 (Origin)
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-6">中本聪的未竟事业</h2>
                    <p className="text-stone-600 max-w-3xl mx-auto text-lg leading-relaxed">
                        OP_CAT 并非“修改”比特币，而是<strong>恢复</strong>中本聪在 2010 年因早期安全顾虑而暂时禁用的功能。<br/>
                        早在 15 年前，他就预见了一个智能的、可编程的比特币网络。
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    
                    {/* Left: The Statue Visual */}
                    <div className="lg:w-1/3 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-stone-200 shadow-2xl overflow-hidden group">
                             {/* Statue Image provided by user */}
                             <img 
                                src="https://github.com/user-attachments/assets/463602d4-448c-4ac3-9cbc-2e48998c4b75" 
                                alt="Satoshi Nakamoto Statue" 
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 filter sepia-[0.3]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-0 right-0 text-center text-white">
                                <div className="font-bold text-xl tracking-widest uppercase">Satoshi Nakamoto</div>
                                <div className="text-xs opacity-80 font-mono">Creator of Bitcoin</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Quotes */}
                    <div className="lg:w-2/3 grid gap-6">
                        {/* Quote 1: Scalability */}
                        <div className="bg-white p-8 rounded-tr-3xl rounded-bl-3xl border-l-4 border-orange-500 shadow-lg relative hover:shadow-xl transition-shadow">
                            <Quote className="absolute top-4 right-4 text-orange-100 w-16 h-16 transform rotate-180" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded uppercase">关于扩展性 (Scalability)</span>
                                    <span className="text-stone-400 text-xs">Email to Mike Hearn, 2009</span>
                                </div>
                                <p className="text-stone-800 font-serif italic text-xl md:text-2xl leading-relaxed mb-4">
                                    "Bitcoin can already scale much larger than Visa, with existing hardware for a fraction of the cost. It never really hits a scale ceiling."
                                </p>
                                <div className="bg-orange-50 border-l-4 border-orange-300 p-4 rounded-r-lg">
                                    <p className="text-stone-800 text-base font-bold leading-relaxed">
                                        译：比特币已经可以比 Visa 扩展得更大，且只需现有硬件的一小部分成本。它从未真正触及扩展上限。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quote 2: Programmability */}
                        <div className="bg-white p-8 rounded-tl-3xl rounded-br-3xl border-r-4 border-blue-500 shadow-lg relative hover:shadow-xl transition-shadow">
                            <Quote className="absolute top-4 left-4 text-blue-100 w-16 h-16" />
                            <div className="relative z-10 text-right">
                                <div className="flex items-center gap-3 mb-4 justify-end">
                                    <span className="text-stone-400 text-xs">BitcoinTalk, 2010</span>
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase">关于可编程性 (Programmability)</span>
                                </div>
                                <p className="text-stone-800 font-serif italic text-xl md:text-2xl leading-relaxed mb-4">
                                    "The design supports a tremendous variety of possible transaction types... It can be programmed to handle any transaction type."
                                </p>
                                <div className="bg-blue-50 border-r-4 border-blue-300 p-4 rounded-l-lg text-right">
                                    <p className="text-stone-800 text-base font-bold leading-relaxed">
                                        译：该设计支持我多年前构思的各种交易类型... 它可以被编程以处理任何类型的交易。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* EXISTING NOKIA vs IPHONE SECTION */}
            <div className="grid md:grid-cols-2 gap-12 items-center border-t border-stone-200 pt-20">
                <div>
                    <h2 className="text-3xl font-bold mb-6 border-l-4 border-orange-500 pl-4 text-stone-900">我们深爱比特币，但是...</h2>
                    <p className="text-lg text-stone-600 mb-6">
                        尽管有着宏大的愿景，但今天的比特币太“安静”了。它就像一台坚不可摧的<strong>诺基亚</strong>。与此同时，以太坊和 Solana 就像装满 App 的智能手机。
                    </p>
                    <p className="text-stone-600 mb-8">
                        OP_CAT Labs 正在用现代化的架构重启中本聪封印的能力，让比特币回归其原本的形态。
                    </p>
                    
                    {/* Toggle Buttons */}
                    <div className="bg-stone-200 p-2 rounded-xl inline-flex gap-2 border border-stone-300 shadow-inner">
                        <button 
                            onClick={() => setMode('nokia')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${mode === 'nokia' ? 'bg-white text-stone-800 shadow-sm border border-stone-200' : 'text-stone-500 hover:text-stone-800'}`}
                        >
                            <div className="w-2 h-2 rounded-full bg-stone-500"></div> 当前状态
                        </button>
                        <button 
                            onClick={() => setMode('iphone')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${mode === 'iphone' ? 'bg-white text-orange-600 shadow-sm border border-orange-200' : 'text-stone-500 hover:text-stone-800'}`}
                        >
                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div> OP_CAT 激活后
                        </button>
                    </div>
                    <p className="text-xs text-stone-400 mt-2 italic">
                        {mode === 'nokia' ? "只能转账的单功能设备。" : "拥有无限可能的智能平台。"}
                    </p>
                </div>
                
                {/* Visual Graphic */}
                <div className="flex justify-center items-center h-[550px] bg-white rounded-3xl border border-stone-200 shadow-inner overflow-hidden relative">
                    <div className={`
                        transition-all duration-700 cubic-bezier(0.68, -0.55, 0.265, 1.55) relative shadow-2xl
                        ${mode === 'nokia' ? 'w-[200px] h-[400px] bg-stone-700 rounded-[20px] border-8 border-stone-800 pt-8 flex flex-col items-center' : 'w-[240px] h-[480px] bg-black rounded-[40px] border-4 border-stone-400 p-0 block'}
                    `}>
                        {/* Notch (iPhone only) */}
                        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 bg-black w-[100px] h-[25px] rounded-b-xl z-20 transition-all duration-500 ${mode === 'nokia' ? 'opacity-0 h-0' : 'opacity-100'}`}></div>

                        {/* Screen */}
                        <div className={`
                            transition-all duration-700 overflow-hidden
                            ${mode === 'nokia' ? 'w-[140px] h-[100px] bg-[#9ea718] border-4 border-stone-600 rounded mb-5 flex flex-col items-center justify-center font-mono text-stone-900 shadow-inner' : 'w-full h-full bg-stone-900 rounded-[36px] flex flex-col pt-8'}
                        `}>
                            {mode === 'nokia' ? (
                                <>
                                    <div className="w-full flex justify-between px-1 text-[10px] opacity-70"><span>Signal</span><span>100%</span></div>
                                    <div className="text-center mt-2">
                                        <div className="text-2xl mb-1"><i className="fa-solid fa-envelope"></i></div>
                                        <div className="text-lg leading-none font-bold">1 NEW MSG</div>
                                        <div className="text-xs mt-1 border-t border-stone-900/20 pt-1">Payment Recv</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* iPhone Status Bar */}
                                    <div className="flex justify-between px-6 text-white text-[10px] mb-8 opacity-80">
                                        <span>9:41</span>
                                        <div className="flex gap-1"><Signal size={10} /><Wifi size={10} /><Battery size={10} /></div>
                                    </div>
                                    
                                    {/* App Grid */}
                                    <div className="grid grid-cols-4 gap-3 px-4 animate-fade-in-up">
                                        {['bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-pink-500', 'bg-teal-500'].map((color, i) => (
                                            <div key={i} className={`w-10 h-10 ${color} rounded-xl shadow-lg flex items-center justify-center text-white`}>
                                                <AppWindow size={18} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Widget */}
                                    <div className="mt-6 mx-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 text-white">
                                        <div className="text-xs text-gray-400">Bitcoin DeFi</div>
                                        <div className="font-bold text-lg">+245% APY</div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Nokia Keypad */}
                        <div className={`grid grid-cols-3 gap-2 px-4 transition-all duration-500 ${mode === 'nokia' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute bottom-10 translate-y-20'}`}>
                            {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((k) => (
                                <div key={k} className="h-8 bg-stone-600 rounded shadow-sm border-b-2 border-stone-800"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Problem;