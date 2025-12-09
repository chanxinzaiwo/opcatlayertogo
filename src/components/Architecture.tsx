
import React, { useState, useEffect, useRef } from 'react';
import { Cpu, FileCode, Coins, ArrowLeftRight, Play, Lock, Database, Zap, AlertCircle, Braces, Binary, FileJson, Layers, ShieldCheck, CheckCircle2, Pickaxe, Hammer, RefreshCcw, ArrowDown, ArrowRight, Server, ArrowUp, FileKey, XCircle, Unlock, Pause, Box, HardDrive, Settings, Flame } from 'lucide-react';

// Improved Gear Path Generator with Adjustable Tooth Ratio
const generateGearPath = (teeth: number, radius: number, depth: number, toothRatio: number = 0.5) => {
  const cx = radius;
  const cy = radius;
  const outerRadius = radius;
  const innerRadius = radius - depth;
  
  const pitchAngle = (Math.PI * 2) / teeth;
  const toothWidthAngle = pitchAngle * toothRatio;
  const bevelAngle = pitchAngle * 0.05; // Small bevel

  let path = "";

  for (let i = 0; i < teeth; i++) {
    const startAngle = i * pitchAngle;
    
    // Points for Trapezoidal Tooth
    // 1. Root Start (Base)
    const a1 = startAngle; 
    const x1 = cx + innerRadius * Math.cos(a1);
    const y1 = cy + innerRadius * Math.sin(a1);

    // 2. Tip Start (Slope Up)
    const a2 = startAngle + bevelAngle;
    const x2 = cx + outerRadius * Math.cos(a2);
    const y2 = cy + outerRadius * Math.sin(a2);

    // 3. Tip End (Flat Top)
    const a3 = startAngle + toothWidthAngle - bevelAngle;
    const x3 = cx + outerRadius * Math.cos(a3);
    const y3 = cy + outerRadius * Math.sin(a3);

    // 4. Root End (Slope Down)
    const a4 = startAngle + toothWidthAngle;
    const x4 = cx + innerRadius * Math.cos(a4);
    const y4 = cy + innerRadius * Math.sin(a4);

    if (i === 0) path += `M ${x1} ${y1} `;
    else path += `L ${x1} ${y1} `; // Line closing the previous valley
    
    path += `L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} `;
  }
  path += "Z";
  return path;
};

const Architecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [demoState, setDemoState] = useState(0);
  
  // VM Demo State
  const [vmIsRunning, setVmIsRunning] = useState(false);
  const [vmLegacyCount, setVmLegacyCount] = useState(0);
  const [vmOpcatCount, setVmOpcatCount] = useState(0);
  const [vmBlocks, setVmBlocks] = useState<number[]>([]);

  // Peg Demo State - Simplified for diagram look
  // We don't need rolling arrays for the diagram style, we use static indices with visual highlights
  
  const timersRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number>(0);
  
  // Ticks for logic control
  const vmTickRef = useRef(0);

  // Auto-reset demo state when switching tabs
  useEffect(() => {
    resetDemo();
  }, [activeTab]);

  // VM Infinite Loop Logic
  useEffect(() => {
    if (activeTab === 0 && vmIsRunning) {
        const interval = setInterval(() => {
            vmTickRef.current += 1;
            
            // Legacy EVM: Slow (every 1500ms = 15 ticks of 100ms)
            if (vmTickRef.current % 15 === 0) {
                setVmLegacyCount(prev => prev + 1); // Serial: +1 per tick
                // Add blocks periodically for visual effect
                setVmBlocks(prev => {
                    const nextBlock = (prev.length > 0 ? prev[prev.length-1] : 0) + 1;
                    return [...prev.slice(-4), nextBlock]; // Keep last 5
                });
            }

            // OP_CAT: Fast (every 100ms)
            setVmOpcatCount(prev => prev + 50); // Parallel: +50 per tick
            
        }, 100); // Fast tick

        return () => clearInterval(interval);
    }
  }, [activeTab, vmIsRunning]);

  const clearAllTimers = () => {
    timersRef.current.forEach(t => window.clearTimeout(t));
    timersRef.current = [];
    cancelAnimationFrame(animationFrameRef.current);
  };

  const resetDemo = () => {
    clearAllTimers();
    setDemoState(0);
    setVmIsRunning(false);
    setVmLegacyCount(0);
    setVmOpcatCount(0);
    setVmBlocks([100]); // Start with one block
    vmTickRef.current = 0;
  };

  const toggleVmDemo = () => {
      if (vmIsRunning) {
          setVmIsRunning(false);
      } else {
          setVmIsRunning(true);
          setDemoState(2);
      }
  };

  const runDemo = () => {
    if (activeTab === 0) {
        toggleVmDemo();
        return;
    }
    
    // Stop Mining Demo if running
    if (activeTab === 4 && demoState >= 2) {
        resetDemo();
        return;
    }

    resetDemo();
    setDemoState(1);
    
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    if (activeTab === 1) { // sCrypt
        schedule(() => setDemoState(2), 1500); 
        schedule(() => setDemoState(3), 3000);
        schedule(() => setDemoState(4), 4500);
    } else if (activeTab === 2) { // Protocol
        schedule(() => setDemoState(2), 1500); // Miner Check
        schedule(() => setDemoState(3), 3000); // Validation Result
        schedule(() => setDemoState(4), 4500); // Final State
    } else if (activeTab === 3) { // Peg Diagram Flow
        // PEG-IN
        schedule(() => setDemoState(1), 100);   // BTC Locked (Block appear)
        schedule(() => setDemoState(2), 2000);  // Confirmations
        schedule(() => setDemoState(3), 4000);  // SPV Proof Down
        schedule(() => setDemoState(4), 5500);  // L2 Mint
        
        // PEG-OUT
        schedule(() => setDemoState(5), 8000);  // L2 Burn
        schedule(() => setDemoState(6), 10000); // L2 Confirmations
        schedule(() => setDemoState(7), 12000); // SPV Proof Up
        schedule(() => setDemoState(8), 13500); // BTC Unlock
        schedule(() => setDemoState(9), 15000); // Finish
        
    } else if (activeTab === 4) { // Mining
        schedule(() => setDemoState(2), 500); // Start Gears
    }
  };

  const pillars = [
    {
      id: 0,
      title: "OP_CAT VM",
      icon: <Cpu size={20} />,
      color: "orange",
      desc: "打破串行瓶颈，实现 UTXO 并行执行",
      detail: "基于 UTXO 的独立状态特性，OP_CAT VM 彻底打破了 EVM 的串行瓶颈。每个 UTXO 都是一个独立的计算单元，可实现大规模并行处理。"
    },
    {
      id: 1,
      title: "sCrypt 语言",
      icon: <FileCode size={20} />,
      color: "blue",
      desc: "用 TypeScript 编写比特币智能合约",
      detail: "无需学习复杂的 Solidity 或 Rust。使用全球最流行的 TypeScript 语言编写比特币智能合约，一键编译为底层 Script 操作码。"
    },
    {
      id: 2,
      title: "资产协议",
      icon: <Coins size={20} />,
      color: "green",
      desc: "矿工共识直接验证，告别索引器",
      detail: "CAT20 是真正的比特币原生资产。不同于 BRC20 依赖中心化索引器，CAT20 的规则直接编译在 UTXO 脚本中，由全球矿工网络直接验证，安全性等同于 BTC。"
    },
    {
      id: 3,
      title: "OP_CAT Peg",
      icon: <ArrowLeftRight size={20} />,
      color: "purple",
      desc: "基于 SPV 的无信任双向桥",
      detail: "利用 SPV (简易支付验证) 技术，允许智能合约直接验证 BTC 主网区块头和 Merkle Proof。这实现了真正的去中心化资产跨链，无需信任任何多签小组。"
    },
    {
      id: 4,
      title: "联合挖矿",
      icon: <Hammer size={20} />,
      color: "red",
      desc: "AuxPoW 算力复用，共享 BTC 安全性",
      detail: "不建立新共识层，而是通过联合挖矿 (Merge Mining) 复用比特币算力。BTC 矿工只需运行一个轻量级节点即可同时挖掘 L1 和 L2，L2 手续费直接回馈给比特币矿工。"
    }
  ];

  // --- 1. VM DEMO ---
  const renderVMDemo = () => {
    return (
      <div className="h-full flex flex-col p-2 gap-2 relative w-full">
        <div className="flex justify-between items-end border-b border-stone-800 pb-2 px-2 shrink-0">
           <div>
             <h3 className="text-sm md:text-xl font-bold text-white flex items-center gap-2">
                <Zap className="text-yellow-500" size={18} />
                并行执行模型
             </h3>
           </div>
           <div className={`text-[9px] md:text-xs font-mono px-2 py-1 rounded ${vmIsRunning ? 'bg-green-900 text-green-400 animate-pulse' : 'bg-stone-800 text-stone-500'}`}>
              {vmIsRunning ? '● RUNNING' : '● STOPPED'}
           </div>
        </div>
  
        {/* LEGACY SYSTEM */}
        <div className="flex-1 bg-stone-900/50 rounded-xl p-2 md:p-4 border border-stone-800 relative overflow-hidden flex flex-col justify-center min-h-[120px]">
           <div className="absolute top-2 left-3 text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-1">
              <AlertCircle size={10} /> Legacy EVM (Serial)
           </div>
           <div className="flex items-center gap-4 mt-4">
              <div className="flex-1 h-12 bg-stone-800/50 rounded-lg flex items-center justify-end px-2 overflow-hidden border border-stone-700 border-dashed relative">
                 {/* Serial Blocks Animation */}
                 <div className="flex items-center justify-end gap-1 absolute right-2">
                     {vmBlocks.map((block) => (
                        <div key={block} className="w-8 h-8 bg-red-900/40 rounded border border-red-500/30 flex items-center justify-center text-[9px] text-red-300 font-mono animate-fade-in-right shadow-sm shrink-0 transition-all">
                            #{block}
                        </div>
                     ))}
                 </div>
              </div>
              <div className="relative shrink-0">
                  <div className={`w-16 h-16 border-2 border-stone-600 bg-stone-800 rounded-lg flex flex-col items-center justify-center z-10 relative ${vmIsRunning ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]' : ''}`}>
                     <Cpu size={20} className={vmIsRunning ? 'text-red-500 animate-pulse' : 'text-stone-600'} />
                     <span className="text-[9px] text-stone-500 mt-1">1 Core</span>
                  </div>
              </div>
              <div className="w-24 text-right">
                 <div className="text-2xl font-mono font-bold text-red-400">
                    {vmLegacyCount}
                 </div>
                 <div className="text-[9px] text-stone-600 uppercase">Processed</div>
              </div>
           </div>
        </div>
  
        {/* OP_CAT SYSTEM */}
        <div className="flex-1 bg-stone-900/50 rounded-xl p-2 md:p-4 border border-orange-500/30 relative overflow-hidden flex flex-col justify-center min-h-[120px]">
           <div className="absolute top-2 left-3 text-[9px] md:text-[10px] font-bold text-orange-500 uppercase tracking-wider flex items-center gap-1">
              <Zap size={10} /> OP_CAT VM (Parallel)
           </div>
           <div className="flex items-center gap-4 mt-4">
              <div className="flex-1 flex flex-col gap-1">
                  {[0, 1, 2].map((lane) => (
                      <div key={lane} className="h-6 bg-stone-800/30 rounded-lg relative overflow-hidden flex items-center px-2">
                          {vmIsRunning && (
                              <div className="absolute inset-0 flex items-center gap-4 animate-[flow-right_0.5s_linear_infinite]">
                                  {[1,2,3,4,5].map(k => (
                                      <div key={k} className="w-12 h-3 bg-orange-500/40 rounded shadow-[0_0_10px_rgba(249,115,22,0.8)] border-r-2 border-orange-300/50"></div>
                                  ))}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
              <div className="relative grid grid-cols-2 gap-1 w-16 h-16 p-1 bg-stone-800 rounded-lg border border-orange-500/50 shrink-0">
                  {[1,2,3,4].map(c => (
                      <div key={c} className={`bg-stone-700 rounded flex items-center justify-center transition-colors ${vmIsRunning ? 'bg-orange-900/80' : ''}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${vmIsRunning ? 'bg-orange-500 animate-ping' : 'bg-stone-500'}`}></div>
                      </div>
                  ))}
              </div>
              <div className="w-24 text-right">
                 <div className="text-2xl font-mono font-bold text-orange-400">
                     {vmOpcatCount}
                 </div>
                 <div className="text-[9px] text-stone-500 uppercase">Processed</div>
              </div>
           </div>
        </div>
        
        <style>{`
          @keyframes flow-right {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
          @keyframes fade-in-right {
             from { opacity: 0; transform: translateX(10px); }
             to { opacity: 1; transform: translateX(0); }
          }
          .animate-fade-in-right {
              animation: fade-in-right 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  };

  // --- 2. SCRYPT DEMO ---
  const renderScryptDemo = () => (
    <div className="h-full flex flex-col p-4 md:p-6 relative w-full">
        <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-base md:text-xl font-bold text-white flex items-center gap-2">
                <Braces className="text-blue-500" size={18} />
                抽象化编译流程
            </h3>
            {demoState === 2 && <span className="text-[10px] md:text-xs text-blue-400 animate-pulse">Compiling...</span>}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 flex-1">
            {/* TS Source */}
            <div className={`w-full md:flex-1 h-40 md:h-full bg-[#1e1e1e] rounded-xl border border-stone-700 p-3 md:p-4 font-mono text-[9px] md:text-[10px] transition-all duration-500 overflow-hidden ${demoState >= 2 ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}`}>
                <div className="flex justify-between text-stone-500 mb-2 border-b border-stone-800 pb-1">
                    <span>Covenant.ts</span>
                    <FileJson size={12} />
                </div>
                <div className="text-blue-300"><span className="text-pink-400">class</span> <span className="text-yellow-300">Covenant</span> <span className="text-pink-400">extends</span> SmartContract {'{'}</div>
                <div className="pl-2 text-stone-400">// Ensure State Transition</div>
                <div className="pl-2 text-purple-300">@method()</div>
                <div className="pl-2 text-yellow-300">public <span className="text-blue-200">transfer</span>(sig: Sig) {'{'}</div>
                <div className={`pl-4 transition-colors duration-300 ${demoState >= 1 ? 'text-white bg-blue-900/50' : 'text-stone-400'}`}>
                    <span className="text-pink-400">assert</span>(this.checkSig(sig, this.alice));
                </div>
                <div className={`pl-4 transition-colors duration-300 ${demoState >= 1 ? 'text-white bg-blue-900/50' : 'text-stone-400'}`}>
                    <span className="text-stone-400">// Next UTXO must preserve state</span>
                    <br/><span className="text-pink-400">assert</span>(this.ctx.hashOutputs == <br/>&nbsp;&nbsp;hash256(this.buildOutput(this.ctx.value)));
                </div>
                <div className="text-blue-300">{'  }'}</div>
                <div className="text-blue-300">{'}'}</div>
            </div>

            {/* Process Arrow */}
            <div className="flex md:flex-col items-center gap-2 shrink-0">
                <div className={`h-8 w-1 md:w-12 md:h-1 bg-stone-700 rounded overflow-hidden`}>
                    <div className={`h-full bg-blue-500 transition-all duration-1000 ${demoState >= 2 ? 'w-full h-full' : 'w-0 h-0'}`}></div>
                </div>
                <div className={`p-1.5 md:p-2 rounded-full border-2 transition-all duration-300 ${demoState === 2 ? 'border-blue-500 bg-blue-500/20 rotate-90 md:rotate-180' : 'border-stone-700 bg-stone-800 rotate-90 md:rotate-0'}`}>
                    <ArrowRight size={14} className="text-stone-400" />
                </div>
            </div>

            {/* Script Output */}
            <div className={`w-full md:flex-1 h-40 md:h-full bg-[#1e1e1e] rounded-xl border border-stone-700 p-3 md:p-4 font-mono text-[8px] md:text-[9px] transition-all duration-500 overflow-y-auto ${demoState >= 3 ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'opacity-50'}`}>
                <div className="flex justify-between text-stone-500 mb-1 border-b border-stone-800 pb-1">
                    <span>compiled.script</span>
                    <Binary size={12} />
                </div>
                <div className="space-y-0.5 text-stone-500">
                    <div className={demoState >= 3 ? 'text-green-400' : ''}>OP_DUP OP_HASH160 &lt;PKH&gt; OP_EQUALVERIFY</div>
                    <div className={demoState >= 3 ? 'text-green-400 delay-75' : ''}>OP_CHECKSIGVERIFY <span className="text-stone-600">// Check Sig</span></div>
                    <div className={demoState >= 3 ? 'text-green-400 delay-100' : ''}>&lt;Amount&gt; <span className="text-stone-600">// Push Amt</span></div>
                    <div className={demoState >= 3 ? 'text-green-400 delay-150' : ''}>OP_CAT &lt;State&gt; OP_CAT <span className="text-stone-600">// Build Output</span></div>
                    <div className={demoState >= 3 ? 'text-green-400 delay-200' : ''}>OP_SHA256 OP_SHA256 <span className="text-stone-600">// Double Hash</span></div>
                    <div className={demoState >= 3 ? 'text-green-400 delay-300' : ''}>OP_FROMALTSTACK <span className="text-stone-600">// Get Context</span></div>
                    <div className={demoState >= 3 ? 'text-green-400 delay-400' : ''}>OP_EQUAL <span className="text-stone-600">// Enforce Covenant</span></div>
                    <div className="opacity-30">... (200 more opcodes) ...</div>
                </div>
            </div>
        </div>
    </div>
  );


// --- 3. PROTOCOL DEMO ---
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
            <div className="flex-1 bg-stone-900/50 border border-stone-800 rounded-xl p-4 flex flex-col items-center relative overflow-y-auto">
                <div className="text-xs font-bold text-red-500 mb-4 uppercase">1. BRC-20 铭文模式</div>
                
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="w-full bg-stone-800 p-2 rounded text-left text-xs text-stone-400 border border-stone-700 font-mono">
                        <div className="text-[9px] text-red-400 border-b border-stone-600 mb-1">Witness (JSON)</div>
                        <div className="text-[8px] leading-tight opacity-70">
                            {`{"p":"brc-20", "op":"mint", "tick":"ordi", "amt":"1000"}`}
                        </div>
                    </div>
                    
                    <div className={`h-6 w-0.5 bg-stone-700 overflow-hidden`}>
                        <div className={`w-full bg-red-500 transition-all duration-1000 ${demoState >= 1 ? 'h-full' : 'h-0'}`}></div>
                    </div>

                    <div className="w-full flex items-center justify-center gap-2 opacity-50 grayscale">
                        <Pickaxe size={16} />
                        <span className="text-[9px]">Miner (Ignored)</span>
                    </div>

                    <div className={`h-6 w-0.5 bg-stone-700 overflow-hidden`}>
                        <div className={`w-full bg-red-500 transition-all duration-1000 delay-500 ${demoState >= 1 ? 'h-full' : 'h-0'}`}></div>
                    </div>

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
            <div className="flex-1 bg-stone-900/50 border border-green-500/30 rounded-xl p-4 flex flex-col items-center relative overflow-y-auto">
                <div className="text-xs font-bold text-green-500 mb-4 uppercase">2. CAT20 原生模式</div>
                
                <div className="flex flex-col items-center gap-2 w-full relative z-10">
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



  // --- 4. PEG DEMO REFACTORED (CHAIN STYLE) ---
  const renderPegDemo = () => {
    // Top Layer Blocks (BTC) - Start 840000
    const topBlocks = Array.from({length: 10}, (_, i) => i + 840000);
    // Bottom Layer Blocks (L2) - Start 1000
    const bottomBlocks = Array.from({length: 10}, (_, i) => i + 1000);

    return (
    <div className="h-full flex flex-col p-4 bg-transparent relative w-full gap-3 overflow-y-auto">
        <style>{`
            @keyframes fire-pulse {
              0% { box-shadow: 0 0 0px rgba(239,68,68,0); transform: scale(0.95); }
              50% { box-shadow: 0 -10px 20px rgba(239,68,68,0.8), 0 0 10px rgba(245,158,11,0.8); transform: scale(1.0); border-color: #EF4444; }
              100% { box-shadow: 0 0 0px rgba(239,68,68,0); transform: scale(0.95); }
            }
            .animate-burn {
              animation: fire-pulse 0.8s infinite ease-in-out;
              background: linear-gradient(to bottom, #7f1d1d, #450a0a);
            }
        `}</style>

        {/* ================= DESKTOP LAYOUT (Horizontal) ================= */}
        <div className="hidden md:flex flex-col h-full gap-4">
            {/* === TOP LAYER: BTC CHAIN === */}
            <div className="flex-1 border border-orange-500/30 bg-orange-900/20 rounded-3xl p-4 relative flex flex-col justify-center overflow-visible">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-950 px-3 text-xs font-bold text-orange-500 uppercase tracking-widest border border-orange-500/50 rounded-full z-10 shadow-lg">
                    BTC Chain
                </div>
                
                <div className="flex gap-2 items-center justify-center px-4 py-4 overflow-visible">
                    {topBlocks.map((b, i) => {
                        let bgClass = "bg-orange-900/10 border-orange-500/20 text-orange-700/50";
                        let status = "";
                        
                        // Lock at index 0 (#840000)
                        if (i === 0 && demoState >= 1) {
                            bgClass = "bg-orange-600 text-white border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)] scale-110 z-10";
                            status = "Locked";
                        }
                        // Unlock at index 9 (#840009)
                        if (i === 9 && demoState >= 8) {
                            bgClass = "bg-yellow-500 text-black border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-110 z-10";
                            status = "Unlocked";
                        }

                        return (
                            <div key={b} className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 flex flex-col items-center justify-center shrink-0 transition-all duration-500 relative ${bgClass}`}>
                                <span className="text-[10px] font-mono font-bold">#{b}</span>
                                {status && <span className="text-[8px] font-bold uppercase mt-1">{status}</span>}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* === MIDDLE LAYER: BRIDGE CHANNELS === */}
            <div className="flex-[1.8] relative flex mx-2">
                {/* LEFT CHANNEL: PEG-IN */}
                <div className="w-1/2 h-full relative border-r border-stone-800/50">
                    <div className="absolute top-0 bottom-0 left-[20%] w-10 bg-gradient-to-b from-orange-500/10 to-transparent"></div>
                    <div className="absolute top-0 bottom-0 left-[20%] w-0.5 border-l-2 border-dashed border-orange-500/30"></div>

                    <div className={`absolute left-[5%] top-[5%] bg-stone-900 border border-stone-700 shadow-lg p-2 rounded-lg text-[10px] text-stone-400 transition-all duration-500 z-10 flex items-center gap-2 ${demoState >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <span className="w-4 h-4 bg-stone-700 text-white rounded-full flex items-center justify-center text-[8px] font-bold">1</span>
                        Wait for Confirmations
                    </div>
                    
                    <div className={`absolute left-[22%] top-[35%] transition-all duration-500 flex items-center gap-2 z-10 ${demoState >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <div className="bg-orange-900/90 text-orange-400 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-orange-500/50 backdrop-blur-sm shadow-xl flex items-center gap-2">
                            <span className="w-4 h-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold">2</span>
                            Generate SPV Proof
                        </div>
                    </div>

                    <div className={`absolute left-[5%] bottom-[10%] bg-stone-900 border border-stone-700 shadow-lg p-2 rounded-lg text-[10px] text-stone-400 transition-all duration-500 z-10 flex items-center gap-2 ${demoState >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <span className="w-4 h-4 bg-stone-700 text-white rounded-full flex items-center justify-center text-[8px] font-bold">3</span>
                        Layer Reorg Check
                    </div>
                </div>

                {/* RIGHT CHANNEL: PEG-OUT */}
                <div className="w-1/2 h-full relative">
                    <div className="absolute top-0 bottom-0 right-[20%] w-10 bg-gradient-to-t from-green-500/10 to-transparent"></div>
                    <div className="absolute top-0 bottom-0 right-[20%] w-0.5 border-r-2 border-dashed border-green-500/30"></div>

                    <div className={`absolute right-[5%] bottom-[10%] bg-stone-900 border border-stone-700 shadow-lg p-2 rounded-lg text-[10px] text-stone-400 transition-all duration-500 z-10 flex items-center gap-2 ${demoState >= 6 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <span className="w-4 h-4 bg-stone-700 text-white rounded-full flex items-center justify-center text-[8px] font-bold">1</span>
                        Wait for Confirmations
                    </div>

                    <div className={`absolute right-[22%] top-[35%] transition-all duration-500 flex items-center gap-2 z-10 ${demoState >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="bg-green-900/90 text-green-400 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-green-500/50 backdrop-blur-sm shadow-xl flex items-center gap-2">
                            <span className="w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold">2</span>
                            Generate SPV Proof
                        </div>
                    </div>

                    <div className={`absolute right-[5%] top-[5%] bg-stone-900 border border-stone-700 shadow-lg p-2 rounded-lg text-[10px] text-stone-400 transition-all duration-500 z-10 flex items-center gap-2 ${demoState >= 7 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <span className="w-4 h-4 bg-stone-700 text-white rounded-full flex items-center justify-center text-[8px] font-bold">3</span>
                        BTC Reorg Check
                    </div>
                </div>
            </div>

            {/* === BOTTOM LAYER: OP_CAT LAYER === */}
            <div className="flex-1 border border-green-500/30 bg-green-900/20 rounded-3xl p-4 relative flex flex-col justify-center overflow-visible">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-stone-950 px-3 text-xs font-bold text-green-500 uppercase tracking-widest border border-green-500/50 rounded-full z-10 shadow-lg">
                    OP_CAT Layer
                </div>

                <div className="flex gap-2 items-center justify-center px-4 py-4 overflow-visible">
                    {bottomBlocks.map((b, i) => {
                        let bgClass = "bg-green-900/10 border-green-500/20 text-green-700/50";
                        let status = "";
                        let effectClass = "";

                        // Peg-In Mint: Index 1 (#1001)
                        if (i === 1 && demoState >= 4) {
                            bgClass = "bg-green-600 text-white border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] scale-110 z-10";
                            status = "Minted";
                        }
                        
                        // Peg-Out Burn: Index 8 (#1008)
                        if (i === 8) {
                            if (demoState === 5) {
                                bgClass = "bg-red-900/80 text-white border-red-500";
                                status = "Burning...";
                                effectClass = "animate-burn";
                            } else if (demoState >= 6) {
                                bgClass = "bg-stone-700 text-stone-500 border-stone-600 grayscale";
                                status = "Burnt";
                            }
                        }

                        return (
                            <div key={b} className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 flex flex-col items-center justify-center shrink-0 transition-all duration-500 relative ${bgClass} ${effectClass}`}>
                                {i === 8 && demoState === 5 && <Flame size={24} className="absolute text-orange-400 animate-pulse opacity-80" />}
                                <span className={`text-[10px] font-mono font-bold ${i===8 && demoState>=5 ? 'relative z-10' : ''}`}>#{b}</span>
                                {status && <span className={`text-[8px] font-bold uppercase mt-1 ${i===8 && demoState>=5 ? 'relative z-10' : ''}`}>{status}</span>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        {/* ================= MOBILE LAYOUT (Vertical, Compact, 5 Blocks) ================= */}
        <div className="flex md:hidden flex-row h-full w-full justify-between gap-1 overflow-y-auto px-1 py-4">
            
            {/* LEFT COLUMN: BTC BLOCKS (Slice 0-5) - Removed 840005 */}
            <div className="flex flex-col gap-4 w-[35%] items-center pt-2">
                 <div className="text-[9px] font-bold text-orange-500 uppercase mb-2 border border-orange-500/30 px-2 py-0.5 rounded-full bg-orange-900/20">BTC L1</div>
                 {topBlocks.slice(0, 5).map((b, i) => {
                     let isActive = false;
                     let status = "";
                     let bg = "bg-stone-800/50 border-stone-700 text-stone-500";
                     
                     // Lock at index 0 (#840000)
                     if (i === 0 && demoState >= 1) { isActive = true; status = "Locked"; bg = "bg-orange-600 border-orange-400 text-white shadow-lg shadow-orange-500/20"; }
                     // Unlock at index 4 (#840004)
                     if (i === 4 && demoState >= 8) { isActive = true; status = "Unlocked"; bg = "bg-yellow-500 border-yellow-400 text-black shadow-lg shadow-yellow-500/20"; }
                     
                     return (
                        <div key={b} className={`w-24 h-24 rounded-xl border flex flex-col items-center justify-center transition-all ${bg}`}>
                             <span className="text-sm font-mono font-bold">#{b}</span>
                             {status && <span className="text-[10px] font-bold leading-none mt-1">{status}</span>}
                        </div>
                     )
                 })}
            </div>

            {/* CENTER COLUMN: BRIDGES & ARROWS (Absolute positioning relative to rows) */}
            <div className="flex flex-col w-[30%] relative pt-10">
                 {/* Peg-In Arrow: Connects BTC Row 0 (#840000) -> L2 Row 1 (#1001) */}
                 {/* Visually placed between 1st and 2nd visual row. Row H=96 (24), Gap=16 -> ~112px pitch. 
                     Row 0 ends ~120px. Row 1 starts ~136px. Target center between them ~128px */}
                 <div className={`absolute top-[100px] left-0 right-0 flex flex-col items-center transition-all duration-500 ${demoState >= 2 && demoState <= 4 ? 'opacity-100 scale-100' : 'opacity-20 scale-90'}`}>
                     <div className="w-full h-[1px] border-t border-dashed border-orange-500/50 absolute top-1/2 left-0 right-0 -z-10"></div>
                     <span className="text-[10px] text-orange-500 font-bold bg-stone-950 px-1">Peg-In</span>
                     <ArrowRight size={24} className="text-orange-500 rotate-[30deg]" />
                     {demoState === 2 && <span className="text-[8px] text-stone-400 bg-stone-900 border border-stone-800 px-1 rounded">Confirming...</span>}
                     {demoState === 3 && <span className="text-[8px] text-orange-400 bg-orange-900/40 border border-orange-500/30 px-1 rounded animate-pulse">SPV Proof</span>}
                 </div>

                 {/* Peg-Out Arrow: Connects L2 Row 3 (#1003) -> BTC Row 4 (#840004) */}
                 {/* Visually placed between 4th and 5th visual row.
                     Row 3 ends ~456px. Row 4 starts ~472px. Target center ~464px */}
                 <div className={`absolute top-[440px] left-0 right-0 flex flex-col items-center transition-all duration-500 ${demoState >= 6 && demoState <= 8 ? 'opacity-100 scale-100' : 'opacity-20 scale-90'}`}>
                      <div className="w-full h-[1px] border-t border-dashed border-green-500/50 absolute top-1/2 left-0 right-0 -z-10"></div>
                      <ArrowRight size={24} className="text-green-500 rotate-[150deg]" /> 
                      <span className="text-[10px] text-green-500 font-bold bg-stone-950 px-1">Peg-Out</span>
                      {demoState === 6 && <span className="text-[8px] text-stone-400 bg-stone-900 border border-stone-800 px-1 rounded">Confirming...</span>}
                      {demoState === 7 && <span className="text-[8px] text-green-400 bg-green-900/40 border border-green-500/30 px-1 rounded animate-pulse">SPV Proof</span>}
                 </div>
            </div>

            {/* RIGHT COLUMN: L2 BLOCKS (Slice 0-5) - Removed 1005 */}
            <div className="flex flex-col gap-4 w-[35%] items-center pt-2">
                 <div className="text-[9px] font-bold text-green-500 uppercase mb-2 border border-green-500/30 px-2 py-0.5 rounded-full bg-green-900/20">OP_CAT L2</div>
                 {bottomBlocks.slice(0, 5).map((b, i) => {
                     let isActive = false;
                     let status = "";
                     let bg = "bg-stone-800/50 border-stone-700 text-stone-500";
                     let effect = "";

                     // Mint at index 1 (#1001)
                     if (i === 1 && demoState >= 4) { isActive = true; status = "Minted"; bg = "bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/20"; }
                     
                     // Burn at index 3 (#1003)
                     if (i === 3) {
                         if (demoState === 5) {
                             isActive = true; 
                             status = "Burning"; 
                             bg = "bg-red-900 border-red-500 text-white";
                             effect = "animate-burn"; 
                         } else if (demoState >= 6) {
                             isActive = true;
                             status = "Burnt";
                             bg = "bg-stone-700 border-stone-600 text-stone-500 grayscale";
                         }
                     }
                     
                     return (
                        <div key={b} className={`w-24 h-24 rounded-xl border flex flex-col items-center justify-center transition-all relative overflow-visible ${bg} ${effect}`}>
                             {effect && <Flame size={20} className="absolute -top-3 -right-3 text-orange-500 animate-pulse opacity-100 z-20" />}
                             <span className="text-xs font-mono font-bold relative z-10">#{b}</span>
                             {status && <span className="text-[10px] font-bold leading-none relative z-10 mt-1">{status}</span>}
                        </div>
                     )
                 })}
            </div>
        </div>
    </div>
    );
  };

  // --- 5. MINING DEMO (GEARS) ---
  const renderMiningDemo = () => {
    // Precise Gear Logic with Perfect Meshing
    // Large Gear: 40 Teeth. Pitch 9deg. Ratio 0.45.
    // Small Gear: 8 Teeth. Pitch 45deg. Ratio 0.63 (increased to be fatter for tighter mesh).
    
    // CSS for Infinite Scroll
    const streamItems = [
        { type: 'l2', fee: 0.005 },
        { type: 'l2', fee: 0.005 },
        { type: 'l2', fee: 0.005 },
        { type: 'l2', fee: 0.005 },
        { type: 'l2', fee: 0.005 },
        { type: 'btc', fee: 6.25 },
    ];
    // Double array for seamless loop
    const displayStream = [...streamItems, ...streamItems, ...streamItems];

    return (
    <div className="h-full flex flex-col p-4 md:p-6 relative bg-stone-950 min-h-[400px] w-full items-center justify-center overflow-hidden">
        <style>{`
            @keyframes spin-cw { from { transform: rotate(-6.5deg); } to { transform: rotate(353.5deg); } }
            @keyframes spin-ccw { from { transform: rotate(166deg); } to { transform: rotate(-194deg); } } 
            @keyframes scroll-stream {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.33%); }
            }
        `}</style>

        <div className="flex justify-between items-center mb-6 shrink-0 w-full z-10 absolute top-4 left-0 px-6">
            <h3 className="text-base md:text-xl font-bold text-white flex items-center gap-2">
                <Hammer className="text-red-500" size={18} />
                联合挖矿 (AuxPoW)
            </h3>
        </div>

        {/* TOP STREAM: REVENUE FLOW (Infinite CSS Scroll) */}
        <div className="absolute top-16 left-0 right-0 h-16 bg-stone-900/30 border-y border-stone-800 flex items-center overflow-hidden z-20">
             <div className="absolute left-2 bg-stone-900/80 px-2 py-1 rounded text-[9px] text-stone-500 uppercase font-bold border border-stone-800 z-30 shadow-lg">
                 Revenue Stream
             </div>
             
             {/* Mask Gradient */}
             <div className="absolute left-20 right-0 h-full z-20 pointer-events-none bg-gradient-to-r from-stone-950 via-transparent to-transparent w-20"></div>

             {/* Moving Track */}
             <div className="absolute flex gap-2 left-[120px]" style={{ width: '200%' }}>
                 <div className={`flex gap-2 ${demoState >= 2 ? 'animate-[scroll-stream_4s_linear_infinite]' : ''}`}>
                     {displayStream.map((block, i) => (
                         <div 
                            key={i} 
                            className={`
                                shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border shadow-lg
                                ${block.type === 'btc' 
                                    ? 'bg-orange-600 text-white border-orange-400 scale-105 z-10 w-32' 
                                    : 'bg-green-900/60 text-green-300 border-green-600/50 scale-90 w-24'
                                }
                            `}
                         >
                             {block.type === 'btc' ? <Box size={14}/> : <Coins size={12}/>}
                             <div className="flex flex-col leading-none">
                                <span className="font-bold text-[10px]">{block.type === 'btc' ? 'BTC REWARD' : 'Fee'}</span>
                                <span className="font-mono text-[8px] opacity-80">+{block.fee}</span>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>

        {/* GEAR CONTAINER - Centered */}
        <div className="relative w-full h-full flex items-center justify-center mt-20 scale-90 md:scale-100">
            
            <div className="flex items-center justify-center relative">
                
                {/* BIG GEAR (BTC) */}
                <div className={`relative transition-all duration-1000 z-0 ${demoState >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                    {/* Initial Rotation -6.5deg centers a Gap at 0deg (Right) */}
                    <div className={`w-[240px] h-[240px] flex items-center justify-center ${demoState >= 2 ? 'animate-[spin-cw_20s_linear_infinite]' : ''}`} style={{transform: 'rotate(-6.5deg)'}}>
                        <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-[0_0_20px_rgba(234,88,12,0.2)]">
                            <path 
                                d={generateGearPath(40, 120, 8, 0.45)} // Tooth 45%, Gap 55%
                                fill="#EA580C" 
                                fillRule="evenodd"
                            />
                            <circle cx="120" cy="120" r="100" fill="none" stroke="#7c2d12" strokeWidth="2" strokeDasharray="4 4"/>
                        </svg>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-stone-900 rounded-full border-4 border-orange-600 flex flex-col items-center justify-center z-10 shadow-2xl" style={{transform: `rotate(${demoState >= 2 ? 6.5 : 0}deg)` /* Counter rotate text */}}>
                                <span className="font-black text-white text-3xl tracking-tighter">BTC</span>
                                <span className="text-[10px] text-orange-400 font-bold uppercase mt-1">L1 PoW</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SMALL GEAR (CAT) */}
                {/* Margin -20px ensures the teeth fully interlock tightly */}
                <div className={`relative transition-all duration-1000 z-10 mt-32 -ml-[20px] ${demoState >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                    {/* Initial Rotation 166deg centers a Tooth at 180deg (Left) to mesh with Big Gap */}
                    <div className={`w-[48px] h-[48px] flex items-center justify-center ${demoState >= 2 ? 'animate-[spin-ccw_4s_linear_infinite]' : ''}`} style={{ transform: 'rotate(166deg)' }}>
                         <svg width="48" height="48" viewBox="0 0 48 48" className="drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                            <path 
                                d={generateGearPath(8, 24, 8, 0.63)} // Tooth 63% (Fatter teeth for tighter mesh)
                                fill="#22c55e" 
                            />
                        </svg>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-stone-900 rounded-full border border-green-800 flex flex-col items-center justify-center z-10">
                            </div>
                        </div>
                    </div>
                     {/* Label */}
                     <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-stone-900/90 px-2 py-0.5 rounded text-[9px] text-green-400 font-bold border border-green-500/30 whitespace-nowrap shadow-lg">
                        OP_CAT L2
                    </div>
                </div>

            </div>

        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-auto mb-2 relative z-10">
            <div className={`bg-stone-900/80 border p-2 md:p-3 rounded-lg text-center transition-all duration-500 ${demoState >= 1 ? 'border-orange-500 opacity-100' : 'border-stone-800 opacity-40'}`}>
                <div className="text-[9px] text-stone-500 uppercase">Hashrate Reuse</div>
                <div className="text-xs md:text-sm font-mono text-orange-500 font-bold">100%</div>
            </div>
             <div className={`bg-stone-900/80 border p-2 md:p-3 rounded-lg text-center transition-all duration-500 ${demoState >= 2 ? 'border-green-500 opacity-100' : 'border-stone-800 opacity-40'}`}>
                <div className="text-[9px] text-stone-500 uppercase">Miner Revenue</div>
                <div className="text-xs md:text-sm font-mono text-green-500 font-bold">BTC + Fees</div>
            </div>
        </div>
    </div>
  )};

  return (
    <section id="architecture" className="py-10 md:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
                <div className="inline-block bg-stone-800 border border-stone-700 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest text-orange-400">
                    <Database size={14} className="inline mr-2" />
                    OP_CAT Labs 官方架构
                </div>
                <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6">核心支柱</h2>
                <p className="text-stone-400 max-w-2xl mx-auto text-sm md:text-lg">
                    一个完整的、模块化的比特币原生解决方案。
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-4 md:gap-8 lg:h-[650px]">
                
                {/* LEFT: PILLAR NAVIGATION - Vertical Stack Layout on All Devices */}
                <div className="lg:col-span-4 flex flex-col gap-3 pb-4 lg:pb-0">
                    {pillars.map((p, index) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveTab(index as any)}
                            className={`flex flex-row items-center gap-3 p-3 rounded-xl border border-transparent transition-all text-left group shrink-0
                                ${activeTab === index 
                                    ? `bg-stone-800 border-${p.color}-500 shadow-lg ring-1 ring-${p.color}-500/50` 
                                    : 'bg-transparent hover:bg-stone-800/50 hover:border-stone-600'
                                }
                            `}
                        >
                            {/* Icon Box */}
                            <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg shrink-0 transition-colors ${activeTab === index ? `bg-${p.color}-500 text-white shadow-md` : `bg-stone-800 text-${p.color}-500`}`}>
                                {React.cloneElement(p.icon as React.ReactElement<any>, { size: 20 })}
                            </div>
                            
                            {/* Text Content: Stacked Title and Desc */}
                            <div className="flex flex-col">
                                <span className={`font-bold text-sm md:text-base leading-tight ${activeTab === index ? 'text-white' : 'text-stone-300 group-hover:text-white'}`}>
                                    {p.title}
                                </span>
                                <span className={`text-[10px] md:text-xs font-mono mt-1 uppercase tracking-wider ${activeTab === index ? `text-${p.color}-400` : 'text-stone-500'}`}>
                                    {p.desc}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* RIGHT: INTERACTIVE DEMO SCREEN - Adjust height */}
                <div className="lg:col-span-8 bg-black rounded-2xl md:rounded-3xl border border-stone-800 shadow-2xl relative overflow-hidden flex flex-col min-h-[500px] h-auto">
                    <div className="bg-stone-900/80 backdrop-blur border-b border-stone-800 p-3 md:p-4 flex justify-between items-center shrink-0 z-20">
                        <div className="flex gap-1.5 md:gap-2">
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-[10px] md:text-xs font-mono text-stone-500 uppercase flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-${pillars[activeTab].color}-500`}></span>
                            {pillars[activeTab].title} Demo
                        </div>
                    </div>

                    {/* Scrollable Container for Mobile */}
                    <div className="flex-1 relative bg-black overflow-y-auto overflow-x-hidden flex flex-col">
                        <div className="flex-1 flex flex-col min-h-full">
                            {activeTab === 0 && renderVMDemo()}
                            {activeTab === 1 && renderScryptDemo()}
                            {activeTab === 2 && renderProtocolDemo()}
                            {activeTab === 3 && renderPegDemo()}
                            {activeTab === 4 && renderMiningDemo()}
                        </div>
                    </div>

                    <div className="p-4 md:p-6 border-t border-stone-800 bg-stone-900/50 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 z-20">
                        <p className="text-xs md:text-sm text-stone-300 max-w-md leading-relaxed text-center md:text-left hidden md:block">
                            {pillars[activeTab].detail}
                        </p>
                        <button 
                            onClick={runDemo}
                            className={`w-full md:w-auto px-6 py-3 md:py-2 rounded-lg font-bold text-black flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg whitespace-nowrap text-sm md:text-base
                                ${activeTab === 0 ? 'bg-orange-500 hover:bg-orange-400' : ''}
                                ${activeTab === 1 ? 'bg-blue-500 hover:bg-blue-400' : ''}
                                ${activeTab === 2 ? 'bg-green-500 hover:bg-green-400' : ''}
                                ${activeTab === 3 ? 'bg-purple-500 hover:bg-purple-400' : ''}
                                ${activeTab === 4 ? 'bg-red-500 hover:bg-red-400' : ''}
                            `}
                        >
                            {(activeTab === 0 && vmIsRunning) || (activeTab === 4 && demoState >= 2) ? (
                                <><Pause size={16} fill="black" /> 停止演示</>
                            ) : (
                                demoState === 0 || (activeTab === 4 && demoState === 0) || (activeTab === 1 && demoState === 4) || (activeTab === 2 && demoState === 4) || (activeTab === 3 && demoState === 9) || (activeTab === 0 && demoState === 3) ? (
                                    <><Play size={16} fill="black" /> 运行演示</>
                                ) : (
                                    <><RefreshCcw size={16} className="animate-spin" /> 处理中</>
                                )
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
