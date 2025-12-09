
import React, { useState, useEffect, useRef } from 'react';
import { Merge, Database, Code, Wand2, Cpu, Scan, CheckCircle2, Layers, ArrowDown, ShieldAlert, ShieldCheck, Search, RefreshCw, Link, History, FileCode, Eye, EyeOff } from 'lucide-react';

const Concept: React.FC = () => {
  // --- PART 1: BASIC DEMO STATE ---
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [showCode, setShowCode] = useState(false); // Toggle for code view
  
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (showCode && codeRef.current && (window as any).hljs) {
      (window as any).hljs.highlightElement(codeRef.current);
    }
  }, [showCode]);

  const handleActivate = () => {
    if (status !== 'idle') return;
    setStatus('processing');
    setTimeout(() => {
      setStatus('completed');
    }, 1500);
  };

  const reset = () => {
    setStatus('idle');
  };

  // --- PART 2: INTROSPECTION DEMO STATE ---
  const [introState, setIntroState] = useState<'idle' | 'building' | 'verifying' | 'success' | 'fail'>('idle');
  const [txAmount, setTxAmount] = useState<number>(100); // Valid amount
  const [txDest, setTxDest] = useState<'Alice' | 'Bob' | 'Hacker'>('Alice'); // Alice is valid

  const runIntrospection = () => {
    setIntroState('building');
    setTimeout(() => {
        setIntroState('verifying');
        setTimeout(() => {
            const isValid = txAmount <= 100 && txDest === 'Alice';
            setIntroState(isValid ? 'success' : 'fail');
        }, 2000);
    }, 1500);
  };

  // --- PART 3: TURING COMPLETENESS DEMO STATE ---
  const [turingState, setTuringState] = useState(0); // Counter value
  const [chainHistory, setChainHistory] = useState<number[]>([0]);
  const [isMining, setIsMining] = useState(false);

  const mineNextBlock = () => {
      setIsMining(true);
      setTimeout(() => {
          setTuringState(prev => prev + 1);
          setChainHistory(prev => [...prev, prev[prev.length-1] + 1]);
          setIsMining(false);
      }, 1000);
  };

  const resetTuring = () => {
      setTuringState(0);
      setChainHistory([0]);
  };

  return (
    <section id="concept" className="py-16 md:py-24 bg-stone-50 border-t border-stone-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        {/* === HEADER === */}
        <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 text-stone-900 tracking-tight">
              底层原理：<span className="text-orange-600">OP_CAT</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed px-2">
              CAT 代表 <strong>Concatenate</strong>（连接）。它是构建复杂智能合约的“数字胶水”。
            </p>
        </div>

        {/* === PART 1: BASIC CONCEPT (Concatenation) === */}
        <div className="relative bg-stone-900 rounded-2xl md:rounded-3xl p-1 shadow-2xl max-w-4xl mx-auto border border-stone-700 group mb-24 md:mb-32 transition-all">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className={`relative bg-[#0c0c0c] rounded-[14px] md:rounded-[22px] p-4 md:p-16 overflow-hidden flex flex-col items-center justify-center transition-all duration-500 ${showCode ? 'min-h-[450px] md:min-h-[550px]' : 'min-h-[350px] md:min-h-[400px]'}`}>
            
            <div className="absolute top-4 left-4 md:top-6 md:left-6 text-stone-500 text-[10px] md:text-xs font-bold uppercase tracking-widest z-20">
                基础能力: 数据拼接
            </div>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ 
                     backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                     backgroundSize: '40px 40px',
                     transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)'
                 }}>
            </div>

            {/* THE VISUAL STAGE */}
            <div className="relative z-10 w-full flex justify-center items-center mb-8 flex-1 mt-6 md:mt-0">
                {showCode ? (
                    <div className="w-full max-w-2xl text-left animate-fade-in z-20">
                        <div className="bg-[#282c34] rounded-xl border border-stone-700 shadow-2xl relative overflow-hidden flex flex-col">
                            <div className="bg-[#21252b] px-4 py-3 flex items-center justify-between border-b border-black/30">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="text-[10px] md:text-xs text-stone-500 font-mono truncate ml-4">bitcoin/src/script/interpreter.cpp</div>
                                <div className="w-4 md:w-10"></div>
                            </div>
                            <pre className="m-0 p-0 overflow-x-auto bg-[#282c34]">
                                <code ref={codeRef} className="language-cpp font-mono text-xs md:text-sm leading-relaxed block p-4 md:p-6 whitespace-pre">
{`// BIP-347: OP_CAT Implementation
case OP_CAT: {
    // 1. Check stack depth
    if (stack.size() < 2)
        return set_error(SCRIPT_ERR_INVALID_STACK);

    // 2. Pop top two elements
    valtype& vch1 = stacktop(-2);
    valtype& vch2 = stacktop(-1);

    // 3. Enforce MAX_SIZE (520 bytes)
    if (vch1.size() + vch2.size() > MAX_SIZE)
        return set_error(SCRIPT_ERR_PUSH_SIZE);

    // 4. Concatenate
    vch1.insert(vch1.end(), vch2.begin(), vch2.end());
    
    // 5. Cleanup
    stack.pop_back();
} break;`}
                                </code>
                            </pre>
                        </div>
                    </div>
                ) : (
                    /* THE ANIMATION STAGE - Scaled down for mobile */
                    <div className="h-40 md:h-48 w-full flex justify-center items-center relative scale-[0.7] sm:scale-100">
                      {/* Left Block (Data A) */}
                      <div className={`absolute h-20 w-24 md:h-24 md:w-32 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${status === 'completed' ? 'translate-x-0 border-orange-500 bg-orange-500/10 w-56 md:w-64 shadow-[0_0_50px_rgba(249,115,22,0.3)]' : '-translate-x-16 md:-translate-x-24 border-stone-700 bg-stone-800/50'} ${status === 'processing' ? 'scale-90 opacity-80' : 'scale-100'}`}>
                        {status === 'completed' ? (
                            <div className="flex items-center gap-3 animate-fade-in-up">
                                <Layers className="text-orange-500" size={20} />
                                <div className="text-left">
                                    <div className="text-white font-bold leading-none text-sm md:text-base">Smart</div>
                                    <div className="text-orange-500 font-bold leading-none text-sm md:text-base">Contract</div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <span className="text-stone-500 text-[10px] md:text-xs font-mono mb-1">Stack 1</span>
                                <span className="text-stone-300 font-bold text-sm md:text-base">数据 A</span>
                            </>
                        )}
                      </div>

                      {/* Center Operator */}
                      <div className={`z-20 transition-all duration-500 flex flex-col items-center justify-center ${status === 'completed' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-stone-700 bg-stone-900 relative ${status === 'processing' ? 'animate-spin border-orange-500' : ''}`}>
                              {status === 'processing' ? <Cpu size={18} className="text-orange-500" /> : <span className="text-stone-500 font-mono text-lg md:text-xl">+</span>}
                          </div>
                          {status === 'processing' && <span className="text-[10px] text-orange-500 mt-2 font-mono animate-pulse">OP_CAT</span>}
                      </div>

                      {/* Right Block (Data B) */}
                      <div className={`absolute h-20 w-24 md:h-24 md:w-32 border-2 border-stone-700 bg-stone-800/50 rounded-xl flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${status === 'completed' ? 'opacity-0 translate-x-0' : 'translate-x-16 md:translate-x-24'} ${status === 'processing' ? 'scale-90 opacity-80' : 'scale-100'}`}>
                        <span className="text-stone-500 text-[10px] md:text-xs font-mono mb-1">Stack 2</span>
                        <span className="text-stone-300 font-bold text-sm md:text-base">数据 B</span>
                      </div>
                    </div>
                )}
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 z-10 w-full sm:w-auto px-4 md:px-0">
                <button 
                    onClick={() => setShowCode(!showCode)}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-300 px-6 py-3 rounded-lg md:rounded-full font-bold transition-all flex items-center justify-center gap-2 border border-stone-600 hover:border-stone-500 text-sm md:text-base active:scale-95"
                >
                    {showCode ? <EyeOff size={18} /> : <Code size={18} />}
                    {showCode ? '演示' : '源码'}
                </button>

                {!showCode && (
                    status === 'completed' ? (
                        <button onClick={reset} className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3 rounded-lg md:rounded-full font-bold transition-all flex items-center justify-center gap-2 border border-stone-500 hover:border-white shadow-lg text-sm md:text-base active:scale-95">
                            <RefreshCw size={18} /> 重置
                        </button>
                    ) : (
                        <button onClick={handleActivate} disabled={status === 'processing'} className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-lg md:rounded-full font-bold shadow-lg shadow-orange-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group text-sm md:text-base">
                            {status === 'processing' ? (<><Scan className="animate-spin" size={18} /> 处理中</>) : (<><Cpu size={18} /> 执行 OP_CAT</>)}
                        </button>
                    )
                )}
            </div>

          </div>
        </div>

        {/* === PART 2: INTROSPECTION DEEP DIVE === */}
        <div className="border-t border-stone-200 pt-16 md:pt-20 mb-24 md:mb-32">
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-blue-200">
                    能力 1：Introspection (自省)
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-6 text-stone-900">
                    自省：比特币如何“看见”自己？
                </h2>
                <p className="text-stone-600 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed px-2">
                    通过 <strong>OP_CAT</strong>，我们将交易数据<strong>重新拼接</strong>，让脚本第一次拥有了“检查交易内容”的能力。
                </p>
            </div>

            {/* Introspection Interactive Demo - Stacked on Mobile */}
            <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden flex flex-col lg:flex-row">
                
                {/* Left: Transaction Builder (User Input) */}
                <div className="w-full lg:w-1/3 bg-stone-50 p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-stone-200 text-left">
                    <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <span className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center text-xs">1</span>
                        构建交易
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                            <label className="text-xs font-bold text-stone-400 uppercase mb-2 block">Covenant Rule (合约规则)</label>
                            <div className="text-xs md:text-sm text-stone-600 font-mono bg-stone-100 p-2 rounded border border-stone-200">
                                MUST PAY &lt;= 100 BTC <br/>
                                TO "Alice"
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-stone-700 mb-2 block">转账金额 (BTC)</label>
                            <input 
                                type="range" min="10" max="200" step="10" 
                                value={txAmount} 
                                onChange={(e) => setTxAmount(Number(e.target.value))}
                                className="w-full h-8 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600 px-1"
                            />
                            <div className={`text-right font-mono font-bold mt-1 ${txAmount > 100 ? 'text-red-500' : 'text-green-600'}`}>
                                {txAmount} BTC
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-stone-700 mb-2 block">接收人</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Alice', 'Bob', 'Hacker'].map(name => (
                                    <button 
                                        key={name}
                                        onClick={() => setTxDest(name as any)}
                                        className={`py-3 md:py-2 rounded-lg text-xs md:text-sm font-bold border transition-all active:scale-95
                                            ${txDest === name 
                                                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                                : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300'}
                                        `}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={runIntrospection}
                            disabled={introState === 'building' || introState === 'verifying'}
                            className="w-full bg-stone-900 text-white font-bold py-3 md:py-4 rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2 active:scale-95"
                        >
                            {introState === 'building' || introState === 'verifying' ? (
                                <><Scan size={18} className="animate-spin" /> 验证中...</>
                            ) : (
                                <><ShieldCheck size={18} /> 提交网络验证</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right: Visualization (The Machine) */}
                <div className="w-full lg:w-2/3 bg-stone-900 p-4 md:p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
                    
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 text-stone-500 font-mono text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                        <Cpu size={14} /> OP_CAT Engine
                    </div>

                    <div className="relative w-full max-w-lg">
                        
                        {/* 1. Stack Components - Wrapped for mobile */}
                        <div className={`flex flex-wrap justify-center gap-1 md:gap-2 mb-8 transition-all duration-500 ${introState === 'building' ? 'translate-y-8 opacity-0 scale-75' : 'opacity-100'}`}>
                            {['Version', 'Inputs', 'Outputs', 'Locktime'].map((item, i) => (
                                <div key={i} className="bg-stone-800 text-stone-400 text-[9px] md:text-[10px] px-2 md:px-3 py-1 md:py-2 rounded border border-stone-700 font-mono">
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* 2. The CAT Processing */}
                        <div className="flex items-center justify-center h-24 mb-6 md:mb-8">
                            <div className={`relative transition-all duration-500 ${introState === 'idle' ? 'w-full h-1 bg-stone-800 rounded' : 'w-56 md:w-64 h-16 bg-stone-800 border-2 border-dashed border-stone-600 rounded-xl flex items-center justify-center'}`}>
                                {introState === 'idle' && <div className="text-stone-600 text-xs text-center mt-2">Waiting for Data...</div>}
                                
                                {introState === 'building' && (
                                    <div className="flex items-center gap-2 text-yellow-500 font-bold animate-pulse text-sm">
                                        <Merge size={18} />
                                        <span>Concatenating...</span>
                                    </div>
                                )}

                                {(introState === 'verifying' || introState === 'success' || introState === 'fail') && (
                                    <div className="flex flex-col items-center">
                                        <div className="text-[9px] text-stone-400 uppercase mb-1">Reconstructed Tx</div>
                                        <div className="font-mono text-white text-[10px] md:text-xs bg-black px-2 py-1 rounded">
                                            {txAmount}BTC_TO_{txDest.toUpperCase()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. The Check (Scanner) */}
                        <div className={`transition-all duration-500 ${introState === 'verifying' ? 'opacity-100' : 'opacity-30'}`}>
                            <div className="flex justify-center items-center gap-4">
                                <ArrowDown size={24} className="text-stone-600" />
                            </div>
                            <div className="mt-4 bg-stone-800/50 p-3 md:p-4 rounded-xl border border-stone-700 text-center relative overflow-hidden max-w-[200px] mx-auto">
                                {introState === 'verifying' && (
                                    <div className="absolute inset-0 bg-blue-500/10 animate-scan-vertical"></div>
                                )}
                                <code className="text-xs md:text-sm font-mono block mb-1 text-green-400">OP_SHA256</code>
                                <code className="text-xs md:text-sm font-mono block text-blue-400">OP_EQUALVERIFY</code>
                            </div>
                        </div>

                        {/* 4. Result Overlay */}
                        {(introState === 'success' || introState === 'fail') && (
                            <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fade-in rounded-xl">
                                {introState === 'success' ? (
                                    <>
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                            <CheckCircle2 className="text-white w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <h4 className="text-lg md:text-xl font-bold text-white mb-2">验证通过</h4>
                                        <p className="text-green-400 font-mono text-xs md:text-sm">Valid Preimage</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                            <ShieldAlert className="text-white w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <h4 className="text-lg md:text-xl font-bold text-white mb-2">被 OP_CAT 拦截</h4>
                                        <p className="text-red-400 font-mono text-xs md:text-sm">
                                            {txAmount > 100 ? 'Error: Amount > 100' : 'Error: Invalid Recipient'}
                                        </p>
                                    </>
                                )}
                                <button 
                                    onClick={() => setIntroState('idle')}
                                    className="mt-6 md:mt-8 px-6 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-full text-sm font-bold transition-colors border border-stone-600"
                                >
                                    再试一次
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>

        {/* === PART 3: TURING COMPLETENESS DEMO === */}
        <div className="border-t border-stone-200 pt-16 md:pt-20">
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-green-200">
                    能力 2：图灵完备
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-6 text-stone-900">
                    图灵完备：比特币如何拥有“记忆”？
                </h2>
                <p className="text-stone-600 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed px-2">
                    通过 OP_CAT，我们可以创建<strong>递归契约</strong>。<br/>
                    合约强制规定：这笔钱花出去时，必须在新的 UTXO 中包含相同的合约代码和更新后的状态。
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-stone-900 rounded-3xl p-4 md:p-8 border border-stone-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
                
                <div className="flex flex-col items-center">
                    
                    {/* The Chain Visual - Vertical Stack on Mobile to avoid scroll */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-8 md:mb-12 w-full py-6 md:py-10 px-2 md:px-4 md:overflow-x-auto md:hide-scrollbar">
                        {chainHistory.map((state, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center shrink-0 animate-fade-in group w-full md:w-auto">
                                {/* UTXO Box */}
                                <div className={`relative w-full max-w-[200px] md:w-40 rounded-xl overflow-hidden border-2 transition-all duration-500 flex flex-col shadow-xl mx-auto
                                    ${i === chainHistory.length - 1 
                                        ? 'border-green-500 scale-105 md:scale-110 z-10 shadow-[0_0_40px_rgba(34,197,94,0.3)]' 
                                        : 'border-stone-600 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
                                    }`}>
                                    
                                    <div className="bg-stone-800 text-[9px] md:text-[10px] text-stone-400 py-1 px-2 border-b border-stone-700 text-center font-mono truncate">
                                        UTXO #{800000 + i}
                                    </div>

                                    <div className="flex-1 bg-stone-900 p-3 md:p-4 flex flex-col items-center justify-center border-b border-stone-700 relative">
                                        <div className="text-[9px] md:text-[10px] text-green-500 font-bold uppercase tracking-wider mb-1">State</div>
                                        <div className="text-2xl md:text-3xl font-black text-white font-mono">N={state}</div>
                                        {i === chainHistory.length - 1 && <div className="absolute right-2 top-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>}
                                    </div>

                                    <div className="bg-yellow-900/20 p-2 md:p-3 text-center">
                                        <div className="flex items-center justify-center gap-1 text-[9px] md:text-[10px] text-yellow-500 font-bold uppercase tracking-wider mb-1">
                                            <FileCode size={10} /> Covenant
                                        </div>
                                        <div className="text-[8px] md:text-[9px] font-mono text-yellow-200/80 leading-tight">
                                            NextState = N + 1
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Link Arrow - Down on Mobile, Right on Desktop */}
                                {i < chainHistory.length - 1 && (
                                    <>
                                        <div className="h-8 w-0.5 bg-stone-600 my-1 relative md:hidden">
                                            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-stone-600 rotate-45 mb-1"></div>
                                        </div>
                                        <div className="hidden md:block w-16 h-0.5 bg-stone-600 mx-2 relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-stone-600 rotate-45"></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 md:px-0">
                        <button 
                            onClick={mineNextBlock}
                            disabled={isMining}
                            className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg md:rounded-full font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait text-sm md:text-base"
                        >
                            {isMining ? <><RefreshCw className="animate-spin" size={18} /> 更新中...</> : <><Link size={18} /> 下一状态 (N+1)</>}
                        </button>
                        <button 
                            onClick={resetTuring}
                            className="bg-stone-800 hover:bg-stone-700 text-stone-400 px-6 py-3 rounded-lg md:rounded-full font-bold transition-all flex items-center justify-center gap-2 border border-stone-600 text-sm md:text-base active:scale-95"
                        >
                            <History size={18} /> 重置
                        </button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Concept;
