
import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Zap, Lock, Globe } from 'lucide-react';

const Comparison: React.FC = () => {
  const competitors = [
    {
      name: "侧链 (Liquid / RSK)",
      bridge: "多签联邦",
      security: "依赖联盟成员",
      vm: "EVM",
      verdict: "Centralized",
      verdictColor: "text-red-500",
      icon: <Globe className="text-stone-500" />
    },
    {
      name: "EVM Rollups",
      bridge: "多签托管",
      security: "依赖多签小组",
      vm: "EVM",
      verdict: "Custodial Risk",
      verdictColor: "text-red-500",
      icon: <LayersIcon className="text-stone-500" />
    },
    {
      name: "客户端验证",
      bridge: "无桥",
      security: "复杂，DA困难",
      vm: "Client-side",
      verdict: "High Friction",
      verdictColor: "text-yellow-500",
      icon: <Lock className="text-stone-500" />
    },
    {
      name: "索引协议 (BRC20)",
      bridge: "无",
      security: "依赖中心化索引",
      vm: "无合约",
      verdict: "Limited Logic",
      verdictColor: "text-yellow-500",
      icon: <ServerIcon className="text-stone-500" />
    }
  ];

  return (
    <section id="comparison" className="py-16 md:py-24 bg-stone-950 text-white border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block bg-red-900/30 text-red-400 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-red-500/30">
            Competitor Analysis
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            为什么 <span className="text-orange-500">OP_CAT</span> 秒杀全场？
          </h2>
          <p className="text-stone-400 max-w-3xl mx-auto text-base md:text-lg">
            OP_CAT Layer 实现了不可能三角的统一。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: COMPETITORS */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            {competitors.map((comp, i) => (
              <div key={i} className="bg-stone-900/50 border border-stone-800 p-4 md:p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 hover:border-stone-600 transition-colors group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-stone-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-stone-700 transition-colors">
                  {comp.icon}
                </div>
                <div className="flex-1 w-full text-left">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base md:text-lg font-bold text-stone-300">{comp.name}</h3>
                    <span className={`text-[10px] md:text-xs font-black uppercase border px-2 py-0.5 rounded ${comp.verdictColor === 'text-red-500' ? 'border-red-900/50 bg-red-900/10 text-red-500' : 'border-yellow-900/50 bg-yellow-900/10 text-yellow-500'}`}>
                      {comp.verdict}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 text-xs text-stone-500 font-mono">
                    <div>
                      <span className="block text-stone-600 mb-0.5">跨链桥</span>
                      <span className="text-stone-400 flex items-center gap-1">
                        <AlertTriangle size={10} className="text-yellow-600" /> {comp.bridge}
                      </span>
                    </div>
                    <div>
                      <span className="block text-stone-600 mb-0.5">安全性</span>
                      <span className="text-stone-400 truncate">{comp.security}</span>
                    </div>
                    <div>
                      <span className="block text-stone-600 mb-0.5">执行层</span>
                      <span className="text-stone-400">{comp.vm}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: OP_CAT LAYER */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-600/20 blur-2xl -z-10 rounded-3xl"></div>
            <div className="h-full bg-stone-900 border-2 border-orange-500 rounded-3xl p-6 md:p-8 flex flex-col shadow-[0_0_50px_rgba(249,115,22,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-500 text-black font-black text-[10px] md:text-xs px-4 py-1 rounded-bl-xl">
                    WINNER
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 italic">OP_CAT Layer</h3>
                <p className="text-orange-400 font-mono text-xs md:text-sm mb-6 md:mb-8">The Endgame Solution</p>

                <div className="space-y-6 md:space-y-8 flex-1">
                    <div className="flex gap-4">
                        <div className="mt-1"><ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-green-500" /></div>
                        <div>
                            <h4 className="font-bold text-white text-base md:text-lg">100% 无需信任</h4>
                            <p className="text-stone-400 text-xs md:text-sm mt-1 leading-relaxed">SPV 证明验证。无多签私钥。</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="mt-1"><Zap className="w-6 h-6 md:w-8 md:h-8 text-orange-500" /></div>
                        <div>
                            <h4 className="font-bold text-white text-base md:text-lg">百万级 TPS 并行架构</h4>
                            <p className="text-stone-400 text-xs md:text-sm mt-1 leading-relaxed">利用 UTXO 并行性，实现多核并发。</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="mt-1"><CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-blue-500" /></div>
                        <div>
                            <h4 className="font-bold text-white text-base md:text-lg">完全比特币原生</h4>
                            <p className="text-stone-400 text-xs md:text-sm mt-1 leading-relaxed">使用 BTC 作为 Gas。最正统扩容。</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Helper Icons
const LayersIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12.83 2.46 9.15 5.33a2.4 2.4 0 0 1 0 4.2l-9.15 5.33a2.4 2.4 0 0 1-2.46 0L1.17 12a2.4 2.4 0 0 1 0-4.2l9.15-5.33a2.4 2.4 0 0 1 2.51 0Z"/><path d="M2.92 8.81 12 14.1l9.08-5.29"/><path d="m2.92 12.81 9.08 5.29 9.08-5.29"/></svg>
)
const ServerIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
)

export default Comparison;
