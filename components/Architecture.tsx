
import React, { useState, useEffect, useRef } from 'react';
import { Cpu, FileCode, Coins, ArrowLeftRight, Play, Lock, Database, Zap, AlertCircle, Braces, Binary, FileJson, Layers, ShieldCheck, Network, CheckCircle2, Pickaxe, Clock, FileKey, RefreshCcw, ArrowDown, ArrowRight, Server, XCircle, ScrollText, Hammer, Banknote, Link } from 'lucide-react';

const Architecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [demoState, setDemoState] = useState(0);
  
  // Custom states for VM TPS animation
  const [evmTps, setEvmTps] = useState(0);
  const [opcatTps, setOpcatTps] = useState(0);
  
  const timersRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Auto-reset demo state when switching tabs
  useEffect(() => {
    resetDemo();
  }, [activeTab]);

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
    cancelAnimationFrame(animationFrameRef.current);
  };

  const resetDemo = () => {
    clearAllTimers();
    setDemoState(0);
    setEvmTps(0);
    setOpcatTps(0);
  };

  const runDemo = () => {
    resetDemo();
    setDemoState(1);
    
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    if (activeTab === 0) { // VM
        schedule(() => setDemoState(2), 500);
        // Custom TPS Counter Logic
        const startTime = Date.now() + 500;
        const animateTps = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            
            if (elapsed < 3500) { // Run for ~3.5s
                // EVM: Slow linear growth, simulating blockage (cap at 15)
                setEvmTps(Math.min(15, Math.floor(elapsed / 200)));
                
                // OP_CAT: Exponential/Fast growth (cap at 10000)
                // Use a non-linear ease-out curve for dramatic effect
                const progress = elapsed / 3500;
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setOpcatTps(Math.floor(easeOut * 10000));
                
                animationFrameRef.current = requestAnimationFrame(animateTps);
            } else {
                setEvmTps(15);
                setOpcatTps(10000);
                setDemoState(3);
            }
        };
        schedule(animateTps, 500);

    } else if (activeTab === 1) { // sCrypt
        schedule(() => setDemoState(2), 1500); 
        schedule(() => setDemoState(3), 3000);
    } else if (activeTab === 2) { // Protocol
        schedule(() => setDemoState(2), 1500); 
        schedule(() => setDemoState(3), 3500); 
    } else if (activeTab === 3) { // Peg
        schedule(() => setDemoState(2), 2000); // Confirmations
        schedule(() => setDemoState(3), 4000); // Proof
        schedule(() => setDemoState(4), 6000); // Mint
    } else if (activeTab === 4) { // Mining
        schedule(() => setDemoState(2), 1500); // Commitment
        schedule(() => setDemoState(3), 3000); // Hashing
        schedule(() => setDemoState(4), 4500); // Reward
    }
  };

  const pillars = [
    {
      id: 0,
      title: "OP_CAT VM",
      icon: <Cpu size={24} />,
      color: "orange",
      desc: "并行化执行引擎",
      detail: "基于 UTXO 的独立状态特性，OP_CAT VM 彻底打破了 EVM 的串行瓶颈，实现百万级 TPS。"
    },
    {
      id: 1,
      title: "sCrypt 语言",
      icon: <FileCode size={24} />,
      color: "blue",
      desc: "TypeScript 开发体验",
      detail: "无需学习 Solidity 或 Rust。使用最熟悉的 TypeScript 编写比特币智能合约，一键编译为 Script。"
    },
    {
      id: 2,
      title: "资产协议",
      icon: <Coins size={24} />,
      color: "green",
      desc: "矿工共识验证",
      detail: "CAT20 是真正的比特币原生资产。不同于 BRC20 依赖中心化索引器解析备注信息，CAT20 的规则（如总量、转账限制）直接编译在 UTXO 脚本中。任何不符合规则的交易都会被比特币矿工直接拒绝，实现了 L1 级的安全性。"
    },
    {
      id: 3,
      title: "OP_CAT Peg",
      icon: <ArrowLeftRight size={24} />,
      color: "purple",
      desc: "SPV 信任最小化桥",
      detail: "这是比特币生态的圣杯。OP_CAT Peg 利用 SPV（简单支付验证）技术，允许智能合约直接验证比特币主网的区块头和 Merkle 路径。用户锁定 BTC 后，凭密码学证明在 L2 铸造资产，无需信任任何多签小组或托管商。"
    },
    {
      id: 4,
      title: "联合挖矿",
      icon: <Hammer size={24} />,
      color: "red",
      desc: "BTC 共识与收益",
      detail: "OP_CAT Layer 并不建立新的共识层，而是通过联合挖矿 (Merge Mining) 直接复用比特币算力。L2 的区块头哈希被提交到比特币 L1 的 Coinbase 交易中。这意味着攻击 L2 的成本等于攻击比特币主网的成本。同时，L2 产生的手续费收入直接回馈给比特币矿工，为其在减半周期后提供关键的收入来源。"
    }
  ];

  // --- 1. VM DEMO (Split Screen) ---
  const renderVMDemo = () => {
    const isRunning = demoState === 2;
    const isDone = demoState === 3;

    return (
      <div className="h-full flex flex-col p-2 gap-4 relative">
        <style>{`
          @keyframes flow-right {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          /* Fast flow for OP_CAT */
          .animate-flow-fast {
            animation: flow-right 0.3s linear infinite;
          }
          /* Slow/Stuttery flow for EVM */
          .animate-flow-slow {
            animation: flow-right 2s steps(5) infinite;
          }
        `}</style>

        <div className="flex justify-between items-end border-b border-stone-800 pb-2 px-2">
           <div>
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="text-yellow-500" size={20} />
                执行模型对比
             </h3>
             <p className="text-xs text-stone-500 mt-1">Serial (EVM) vs Parallel (UTXO)</p>
           </div>
           <div className={`text-xs font-mono px-2 py-1 rounded ${isRunning ? 'bg-green-900 text-green-400 animate-pulse' : 'bg-stone-800 text-stone-500'}`}>
              {isRunning ? '● LIVE SIMULATION' : '● IDLE'}
           </div>
        </div>
  
        {/* LEGACY SYSTEM */}
        <div className="flex-1 bg-stone-900/50 rounded-xl p-4 border border-stone-800 relative overflow-hidden flex flex-col justify-center group">
           <div className="absolute top-3 left-3 text-[10px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-1">
              <AlertCircle size={12} /> Legacy EVM (串行阻塞)
           </div>
           <div className="flex items-center gap-6 mt-4">
              <div className="flex-1 h-12 bg-stone-800/50 rounded-lg flex items-center justify-end px-2 overflow-hidden border border-stone-700 border-dashed relative">
                 {/* Slow Moving Queue */}
                 <div className={`absolute right-0 flex gap-2 transition-all ${isRunning ? 'animate-flow-slow' : 'opacity-50'}`}>
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 bg-red-900/40 rounded border border-red-500/30 flex items-center justify-center text-[10px] text-red-300">Tx</div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                  <div className={`w-16 h-16 border-2 border-stone-600 bg-stone-800 rounded-lg flex flex-col items-center justify-center z-10 relative ${isRunning ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]' : ''}`}>
                     <Cpu size={24} className={isRunning ? 'text-red-500 animate-pulse' : 'text-stone-600'} />
                     <span className="text-[9px] text-stone-500 mt-1">Single Core</span>
                  </div>
                  {isRunning && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-red-500 font-bold whitespace-nowrap animate-bounce bg-black/80 px-2 rounded border border-red-500/50">
                          ⚠️ 状态锁冲突
                      </div>
                  )}
              </div>
              <div className="w-24 text-right">
                 <div className={`text-2xl font-mono font-bold ${isRunning ? 'text-red-400' : 'text-stone-500'}`}>
                    {evmTps}
                 </div>
                 <div className="text-[9px] text-stone-600 uppercase">TPS (Capped)</div>
              </div>
           </div>
        </div>
  
        {/* OP_CAT SYSTEM */}
        <div className="flex-1 bg-stone-900/50 rounded-xl p-4 border border-orange-500/30 relative overflow-hidden flex flex-col justify-center">
           <div className="absolute top-3 left-3 text-[10px] font-bold text-orange-500 uppercase tracking-wider flex items-center gap-1">
              <Zap size={12} /> OP_CAT VM (多核并行)
           </div>
           <div className="flex items-center gap-6 mt-4">
              <div className="flex-1 flex flex-col gap-2">
                  {[0, 1, 2].map((lane) => (
                      <div key={lane} className="h-8 bg-stone-800/30 rounded-lg relative overflow-hidden flex items-center px-2">
                          {(isRunning || isDone) && (
                              <div className="absolute inset-0 flex items-center gap-4 animate-flow-fast">
                                  {[1,2,3,4,5].map(k => (
                                      <div key={k} className="w-12 h-4 bg-orange-500/40 rounded shadow-[0_0_10px_rgba(249,115,22,0.8)] border-r-2 border-orange-300/50"></div>
                                  ))}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
              <div className="relative grid grid-cols-2 gap-1 w-16 h-16 p-1 bg-stone-800 rounded-lg border border-orange-500/50">
                  {[1,2,3,4].map(c => (
                      <div key={c} className={`bg-stone-700 rounded flex items-center justify-center transition-colors ${isRunning ? 'bg-orange-900/80' : ''}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-orange-500 animate-ping' : 'bg-stone-500'}`}></div>
                      </div>
                  ))}
              </div>
              <div className="w-24 text-right">
                 <div className={`text-2xl font-mono font-bold transition-all ${isDone ? 'text-green-400 scale-110' : isRunning ? 'text-orange-400' : 'text-stone-400'}`}>
                     {isRunning || isDone ? opcatTps.toLocaleString() : '0'}
                     {isDone && '+'}
                 </div>
                 <div className="text-[9px] text-stone-500 uppercase">TPS (Scalable)</div>
              </div>
           </div>
           {isRunning && (
               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-orange-300 font-mono bg-stone-900/90 px-3 py-1 rounded-full border border-orange-500/30 shadow-lg animate-pulse">
                   ✓ 状态独立无锁
               </div>
           )}
        </div>
      </div>
    );
  };

  // --- 2. SCRYPT DEMO (Compilation) ---
  const renderScryptDemo = () => (
    <div className="h-full flex flex-col p-6 relative">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Braces className="text-blue-500" size={20} />
                抽象化编译流程
            </h3>
            {demoState === 2 && <span className="text-xs text-blue-400 animate-pulse">Compiling...</span>}
        </div>

        <div className="flex items-center gap-4 flex-1">
            {/* TS Source */}
            <div className={`flex-1 h-full bg-[#1e1e1e] rounded-xl border border-stone-700 p-4 font-mono text-xs transition-all duration-500 ${demoState >= 2 ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}`}>
                <div className="flex justify-between text-stone-500 mb-2 border-b border-stone-800 pb-2">
                    <span>vault.ts</span>
                    <FileJson size={14} />
                </div>
                <div className="text-blue-300">class <span className="text-yellow-300">Vault</span> {'{'}</div>
                <div className="pl-4 text-purple-300">@method()</div>
                <div className="pl-4 text-blue-300">unlock(x) {'{'}</div>
                <div className={`pl-8 transition-colors duration-300 ${demoState >= 1 ? 'text-white bg-blue-900/50' : 'text-stone-400'}`}>
                    assert(x * x == 25n);
                </div>
                <div className="pl-4 text-blue-300">{'}'}</div>
                <div className="text-blue-300">{'}'}</div>
            </div>

            {/* Process Arrow */}
            <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-1 bg-stone-700 rounded overflow-hidden`}>
                    <div className={`h-full bg-blue-500 transition-all duration-1000 ${demoState >= 2 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className={`p-2 rounded-full border-2 transition-all duration-300 ${demoState === 2 ? 'border-blue-500 bg-blue-500/20 rotate-180' : 'border-stone-700 bg-stone-800'}`}>
                    <ArrowRight size={16} className="text-stone-400" />
                </div>
            </div>

            {/* Script Output */}
            <div className={`flex-1 h-full bg-[#1e1e1e] rounded-xl border border-stone-700 p-4 font-mono text-xs transition-all duration-500 ${demoState === 3 ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'opacity-50'}`}>
                <div className="flex justify-between text-stone-500 mb-2 border-b border-stone-800 pb-2">
                    <span>output.script</span>
                    <Binary size={14} />
                </div>
                <div className="space-y-1">
                    <div className={demoState === 3 ? 'text-green-400 animate-fade-in-up' : 'opacity-0'}>OP_DUP</div>
                    <div className={demoState === 3 ? 'text-green-400 animate-fade-in-up delay-75' : 'opacity-0'}>OP_MUL</div>
                    <div className={demoState === 3 ? 'text-green-400 animate-fade-in-up delay-100' : 'opacity-0'}>OP_25</div>
                    <div className={demoState === 3 ? 'text-green-400 animate-fade-in-up delay-150' : 'opacity-0'}>OP_EQUAL</div>
                    <div className={demoState === 3 ? 'text-green-400 animate-fade-in-up delay-200' : 'opacity-0'}>OP_VERIFY</div>
                </div>
            </div>
        </div>
    </div>
  );


  // --- 3. PROTOCOL DEMO (Split Comparison) ---
  const renderProtocolDemo = () => (
    <div className="h-full flex flex-col p-6 relative">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-green-500" size={20} />
                资产协议安全模型对比
            </h3>
            <div className="text-xs font-mono text-stone-500">Security Model</div>
        </div>

        <div className="flex gap-6 h-full">
            
            {/* LEFT: INDEXER MODEL (BRC20) */}
            <div className="flex-1 bg-stone-900/50 border border-stone-800 rounded-xl p-4 flex flex-col items-center relative overflow-hidden">
                <div className="text-xs font-bold text-red-500 mb-4 uppercase">1. BRC-20 铭文模式</div>
                
                {/* Visual Flow */}
                <div className="flex flex-col items-center gap-2 w-full">
                    {/* Witness Data */}
                    <div className="w-full bg-stone-800 p-2 rounded text-left text-xs text-stone-400 border border-stone-700 font-mono">
                        <div className="text-[9px] text-red-400 border-b border-stone-600 mb-1">Witness (JSON)</div>
                        <div className="text-[8px] leading-tight opacity-70">
                            {`{"p":"brc-20", "op":"mint", "tick":"ordi", "amt":"1000"}`}
                        </div>
                    </div>
                    
                    <div className={`h-6 w-0.5 bg-stone-700 overflow-hidden`}>
                        <div className={`w-full bg-red-500 transition-all duration-1000 ${demoState >= 1 ? 'h-full' : 'h-0'}`}></div>
                    </div>

                    {/* Miner (Ignores JSON) */}
                    <div className="w-full flex items-center justify-center gap-2 opacity-50 grayscale">
                        <Pickaxe size={16} />
                        <span className="text-[9px]">Miner (Ignored)</span>
                    </div>

                    <div className={`h-6 w-0.5 bg-stone-700 overflow-hidden`}>
                        <div className={`w-full bg-red-500 transition-all duration-1000 delay-500 ${demoState >= 1 ? 'h-full' : 'h-0'}`}></div>
                    </div>

                    {/* Centralized Indexer */}
                    <div className={`w-full bg-stone-800 border-2 border-red-500/50 rounded-lg p-2 flex flex-col items-center relative transition-all ${demoState >= 2 ? 'shadow-[0_0_20px_rgba(239,68,68,0.3)]' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <Server size={16} className="text-red-500" />
                            <span className="text-[10px] font-bold text-red-200">Indexer DB</span>
                        </div>
                        {demoState >= 2 && (
                            <div className="text-[9px] text-red-400 bg-red-900/20 px-2 rounded animate-pulse">
                                Updating Balance...
                            </div>
                        )}
                    </div>

                    <div className="bg-red-900/20 text-red-400 text-[10px] p-2 rounded border border-red-500/30 text-center w-full mt-2">
                        <XCircle size={12} className="inline mr-1" />
                        严重依赖链下服务器
                    </div>
                </div>
            </div>

            {/* RIGHT: OP_CAT MODEL (CAT20) */}
            <div className="flex-1 bg-stone-900/50 border border-green-500/30 rounded-xl p-4 flex flex-col items-center relative overflow-hidden">
                <div className="text-xs font-bold text-green-500 mb-4 uppercase">2. CAT20 原生模式</div>
                
                <div className="flex flex-col items-center gap-2 w-full relative z-10">
                    {/* UTXO Script */}
                    <div className={`w-full p-2 rounded text-left text-xs border transition-all duration-500 ${demoState >= 1 ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-stone-800 border-stone-700 text-stone-400'}`}>
                        <div className="text-[9px] border-b border-stone-600 mb-1 font-bold">UTXO Script (Code)</div>
                        <div className="font-mono text-[9px] leading-tight space-y-0.5">
                            <div>OP_CAT &lt;State&gt;</div>
                            <div>OP_HASH160 &lt;Root&gt;</div>
                            <div>OP_EQUALVERIFY</div>
                        </div>
                    </div>
                    
                    <div className="h-10 w-0.5 bg-stone-700 overflow-hidden">
                        <div className={`w-full bg-green-500 transition-all duration-500 ${demoState >= 2 ? 'h-full' : 'h-0'}`}></div>
                    </div>

                    {/* Miner (Validates Script) */}
                    <div className={`w-full p-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${demoState === 3 ? 'border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'border-stone-700 bg-stone-800'}`}>
                        <div className="flex items-center gap-2">
                            <Pickaxe size={24} className={demoState === 3 ? 'text-green-500 animate-bounce' : 'text-stone-600'} />
                            <div className="text-left">
                                <div className="text-xs font-bold text-white">BTC Miner</div>
                                <div className="text-[8px] text-stone-500">Consensus Engine</div>
                            </div>
                        </div>
                        
                        {demoState === 3 && (
                            <div className="mt-2 w-full bg-green-600 text-white text-[9px] py-1 rounded text-center font-bold animate-fade-in-up">
                                SCRIPT VALIDATED
                            </div>
                        )}
                    </div>

                    <div className="bg-green-900/20 text-green-400 text-[10px] p-2 rounded border border-green-500/30 text-center w-full mt-2">
                        <CheckCircle2 size={12} className="inline mr-1" />
                        L1 级安全性 (PoW)
                    </div>
                </div>
            </div>

        </div>
    </div>
  );


  // --- 4. PEG DEMO (Trustless Bridge Flow) ---
  const renderPegDemo = () => (
    <div className="h-full flex flex-col p-4 relative bg-[#0a0a0a]">
        {/* Layer 1: BTC */}
        <div className="h-1/3 border-b border-stone-800 border-dashed flex items-center px-8 bg-stone-900/30 relative">
            <div className="absolute left-2 top-2 text-[10px] font-bold text-orange-500 uppercase flex items-center gap-1">
                <Layers size={12} /> Bitcoin Mainnet
            </div>
            
            {/* BTC Blocks */}
            <div className="flex gap-2 w-full">
                {[1,2,3,4,5].map((b, i) => (
                    <div key={b} className={`h-12 w-12 rounded border flex items-center justify-center text-xs font-mono transition-all duration-500
                        ${i === 1 && demoState >= 1 ? 'bg-orange-600 border-orange-400 text-white scale-110 shadow-lg z-10' : 'bg-stone-800 border-stone-700 text-stone-600'}
                    `}>
                        {i === 1 && demoState >= 1 ? <Lock size={16} /> : `#${100+b}`}
                    </div>
                ))}
            </div>
            
            {demoState >= 2 && (
                <div className="absolute bottom-4 right-8 flex items-center gap-2 text-[10px] text-stone-400 animate-pulse">
                    <Clock size={12} /> 6 Confirmations
                </div>
            )}
        </div>

        {/* Layer 2: Bridge Zone */}
        <div className="h-1/3 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
            
            {/* Traveling Proof */}
            <div className={`flex flex-col items-center transition-all duration-[2000ms] ease-in-out z-20
                ${demoState < 3 ? 'opacity-0 translate-y-[-40px]' : demoState === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}
            `}>
                <div className="bg-stone-900 border border-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <FileKey size={20} className="text-purple-400" />
                    <div className="text-left">
                        <div className="text-xs font-bold text-purple-300">SPV Merkle Proof</div>
                        <div className="text-[8px] text-stone-500 font-mono">Verify Tx inclusion</div>
                    </div>
                </div>
                <ArrowDown size={20} className="text-purple-500/50 mt-2" />
            </div>
        </div>

        {/* Layer 3: OP_CAT */}
        <div className="h-1/3 border-t border-stone-800 border-dashed flex items-center px-8 bg-stone-900/30 relative">
            <div className="absolute bottom-2 left-2 text-[10px] font-bold text-purple-500 uppercase flex items-center gap-1">
                <Database size={12} /> OP_CAT Layer
            </div>

            <div className="flex gap-2 w-full">
                {[1,2,3,4,5].map((b, i) => (
                    <div key={b} className={`h-12 w-12 rounded border flex items-center justify-center text-xs font-mono transition-all duration-500
                        ${i === 2 && demoState >= 4 ? 'bg-purple-600 border-purple-400 text-white scale-110 shadow-lg z-10' : 'bg-stone-800 border-stone-700 text-stone-600'}
                    `}>
                        {i === 2 && demoState >= 4 ? <Coins size={16} /> : `#${50+b}`}
                    </div>
                ))}
            </div>

            {demoState >= 4 && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-green-400 font-bold text-sm flex items-center gap-1 animate-fade-in-up">
                        <CheckCircle2 size={16} /> Mint Success
                    </div>
                    <div className="text-[10px] text-stone-500">1.0 wBTC Issued</div>
                </div>
            )}
        </div>

    </div>
  );

  // --- 5. MINING DEMO (AuxPoW) ---
  const renderMiningDemo = () => (
    <div className="h-full flex flex-col p-6 relative bg-stone-950">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Hammer className="text-red-500" size={20} />
                联合挖矿 (Merge Mining)
            </h3>
            <div className="flex gap-2 text-xs font-mono">
                <div className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-stone-400">
                    BTC Height: <span className="text-white">{850000 + (demoState >= 4 ? 1 : 0)}</span>
                </div>
            </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-8 relative z-10">
            {/* LEFT: MINING PROCESS */}
            <div className="flex flex-col gap-4">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Block Assembly</div>
                
                {/* 1. Templates */}
                <div className="flex gap-2 items-center">
                    <div className={`flex-1 bg-orange-900/20 border border-orange-500/30 p-3 rounded-lg flex flex-col items-center transition-all ${demoState >= 1 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                        <div className="text-[10px] text-orange-500 mb-1">BTC Header</div>
                        <div className="w-full h-2 bg-orange-500/50 rounded mb-1"></div>
                        <div className="w-2/3 h-2 bg-orange-500/30 rounded"></div>
                    </div>
                    <div className="text-stone-600">+</div>
                    <div className={`flex-1 bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg flex flex-col items-center transition-all ${demoState >= 1 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                        <div className="text-[10px] text-purple-500 mb-1">OP_CAT Hash</div>
                        <div className="w-full h-4 bg-purple-500/20 border border-purple-500/50 rounded flex items-center justify-center text-[8px] font-mono text-purple-300">
                            Root: 0x3f...
                        </div>
                    </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                    <ArrowDown size={16} className={`text-stone-600 transition-opacity ${demoState >= 2 ? 'opacity-100' : 'opacity-20'}`} />
                </div>

                {/* 2. Commitment */}
                <div className={`bg-stone-900 border border-stone-700 p-3 rounded-lg transition-all ${demoState >= 2 ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'opacity-50'}`}>
                    <div className="text-[10px] text-stone-400 mb-2 flex justify-between">
                        <span>Coinbase Tx</span>
                        {demoState >= 2 && <span className="text-red-500 font-bold animate-pulse">COMMITMENT ADDED</span>}
                    </div>
                    <div className="h-8 bg-stone-800 rounded flex items-center px-2 font-mono text-[10px] text-stone-500 overflow-hidden">
                        ...OP_RETURN <span className="text-purple-400 mx-1">0x3f...</span> ...
                    </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                    <ArrowDown size={16} className={`text-stone-600 transition-opacity ${demoState >= 3 ? 'opacity-100' : 'opacity-20'}`} />
                </div>

                {/* 3. Hashing */}
                <div className={`bg-stone-900 border border-stone-700 p-4 rounded-lg flex items-center justify-center gap-3 transition-all ${demoState === 3 ? 'bg-red-900/10 border-red-500' : ''}`}>
                    <Pickaxe size={24} className={`text-stone-400 ${demoState === 3 ? 'animate-bounce text-red-500' : ''}`} />
                    <div className="text-xs font-mono text-stone-400">
                        {demoState === 3 ? 'HASHING NONCE...' : demoState >= 4 ? 'Valid Block Found!' : 'Waiting for Work'}
                    </div>
                </div>
            </div>

            {/* RIGHT: REWARDS & SECURITY */}
            <div className="flex flex-col gap-4 border-l border-stone-800 pl-8">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Miner Incentives</div>

                <div className={`bg-stone-900 p-4 rounded-xl border border-stone-800 flex flex-col items-center justify-center gap-2 h-32 relative overflow-hidden`}>
                     {/* Floating Coins Animation */}
                     {demoState >= 4 && (
                        <>
                            <div className="absolute top-1/2 left-1/4 animate-bounce text-orange-500"><Coins size={16}/></div>
                            <div className="absolute top-1/3 right-1/4 animate-bounce delay-100 text-purple-500"><Coins size={16}/></div>
                        </>
                     )}
                     
                     <div className="text-sm text-stone-400">Total Revenue</div>
                     <div className={`text-3xl font-black font-mono flex items-center gap-2 transition-all ${demoState >= 4 ? 'text-green-400 scale-110' : 'text-stone-600'}`}>
                        {demoState >= 4 ? '3.55' : '0.00'} <span className="text-sm">BTC</span>
                     </div>
                     
                     <div className="flex gap-2 mt-2 text-[10px]">
                        <span className="bg-orange-900/20 text-orange-400 px-2 py-1 rounded border border-orange-500/20">
                            Block: 3.125
                        </span>
                        <span className={`bg-purple-900/20 text-purple-400 px-2 py-1 rounded border border-purple-500/20 transition-all ${demoState >= 4 ? 'scale-110 border-purple-500 bg-purple-900/40' : ''}`}>
                            L2 Fees: +0.425
                        </span>
                     </div>
                </div>

                <div className="mt-4 bg-stone-900/50 p-4 rounded-lg text-xs leading-relaxed text-stone-400 border border-stone-800">
                    <div className="flex items-start gap-2 mb-2">
                        <CheckCircle2 size={14} className="text-green-500 mt-0.5" />
                        <span><strong className="text-white">Inherited Security:</strong> To revert OP_CAT history, attackers must reorganize the Bitcoin mainnet.</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Banknote size={14} className="text-green-500 mt-0.5" />
                        <span><strong className="text-white">Sustainable Revenue:</strong> As block subsidy halves, L2 fees become the primary incentive for miners to secure the network.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <section id="architecture" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
                <div className="inline-block bg-stone-800 border border-stone-700 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest text-orange-400">
                    <Database size={14} className="inline mr-2" />
                    OP_CAT Labs 官方架构
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-6">OP_CAT Layer：五大核心支柱</h2>
                <p className="text-stone-400 max-w-2xl mx-auto text-lg">
                    这是一个完整的、模块化的比特币原生解决方案。点击下方模块查看深度演示。
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 h-[800px] lg:h-[650px]">
                {/* LEFT: PILLAR NAVIGATION */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {pillars.map((p, index) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveTab(index as any)}
                            className={`flex items-start gap-4 p-4 rounded-xl border-l-4 transition-all text-left group
                                ${activeTab === index 
                                    ? `bg-stone-800 border-${p.color}-500 shadow-lg scale-105` 
                                    : 'bg-transparent border-transparent hover:bg-stone-800/50 hover:border-stone-600'
                                }
                            `}
                        >
                            <div className={`mt-1 p-2 rounded-lg transition-colors ${activeTab === index ? `bg-${p.color}-500/20 text-${p.color}-500` : 'bg-stone-800 text-stone-500'}`}>
                                {p.icon}
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg ${activeTab === index ? 'text-white' : 'text-stone-400 group-hover:text-white'}`}>
                                    {p.title}
                                </h3>
                                <p className="text-xs text-stone-500 font-mono mt-1 uppercase tracking-wider">{p.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* RIGHT: INTERACTIVE DEMO SCREEN */}
                <div className="lg:col-span-8 bg-black rounded-3xl border border-stone-800 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="bg-stone-900/80 backdrop-blur border-b border-stone-800 p-4 flex justify-between items-center">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs font-mono text-stone-500 uppercase flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full bg-${pillars[activeTab].color}-500`}></span>
                            {pillars[activeTab].title} Simulation
                        </div>
                    </div>

                    <div className="flex-1 relative p-2 md:p-6 bg-black">
                        {activeTab === 0 && renderVMDemo()}
                        {activeTab === 1 && renderScryptDemo()}
                        {activeTab === 2 && renderProtocolDemo()}
                        {activeTab === 3 && renderPegDemo()}
                        {activeTab === 4 && renderMiningDemo()}
                    </div>

                    <div className="p-6 border-t border-stone-800 bg-stone-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-stone-300 max-w-md leading-relaxed text-center md:text-left">
                            {pillars[activeTab].detail}
                        </p>
                        <button 
                            onClick={runDemo}
                            className={`px-6 py-2 rounded-lg font-bold text-black flex items-center gap-2 transition-transform active:scale-95 shadow-lg whitespace-nowrap
                                ${activeTab === 0 ? 'bg-orange-500 hover:bg-orange-400' : ''}
                                ${activeTab === 1 ? 'bg-blue-500 hover:bg-blue-400' : ''}
                                ${activeTab === 2 ? 'bg-green-500 hover:bg-green-400' : ''}
                                ${activeTab === 3 ? 'bg-purple-500 hover:bg-purple-400' : ''}
                                ${activeTab === 4 ? 'bg-red-500 hover:bg-red-400' : ''}
                            `}
                        >
                            {demoState === 0 || demoState === 4 ? (
                                <><Play size={16} fill="black" /> 运行演示</>
                            ) : (
                                <><RefreshCcw size={16} className="animate-spin" /> 处理中...</>
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default Architecture;
