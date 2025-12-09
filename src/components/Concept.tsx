
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
    
    // Step 1: Building Preimage (Simulated)
    setTimeout(() => {
        setIntroState('verifying');
        
        // Step 2: Verification logic
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
    <section id="concept" className="py-24 bg-stone-50 border-t border-stone-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        {/* === HEADER === */}
        <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-stone-900 tracking-tight">
              底层原理：<span className="text-orange-600">OP_CAT</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
              一切的起点是一个简单的操作码。CAT 代表 <strong>Concatenate</strong>（连接）。<br/>
              它是构建复杂智能合约的“数字胶水”，虽然简单，却解锁了两个关键能力。
            </p>
        </div>

        {/* === PART 1: BASIC CONCEPT (Concatenation) === */}
        <div className="relative bg-stone-900 rounded-3xl p-1 shadow-2xl max-w-4xl mx-auto border border-stone-700 group mb-32 transition-all">
          {/* Decorative gradients */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className={`relative bg-[#0c0c0c] rounded-[22px] p-8 md:p-16 overflow-hidden flex flex-col items-center justify-center transition-all duration-500 ${showCode ? 'min-h-[550px]' : 'min-h-[400px]'}`}>
            
            <div className="absolute top-6 left-6 text-stone-500 text-xs font-bold uppercase tracking-widest">
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
            <div className="relative z-10 w-full flex justify-center items-center mb-8 flex-1">
                {showCode ? (
                    <div className="w-full max-w-2xl text-left animate-fade-in z-20">
                        <div className="bg-[#282c34] rounded-xl border border-stone-700 shadow-2xl relative overflow-hidden flex flex-col">
                            {/* IDE Header */}
                            <div className="bg-[#21252b] px-4 py-3 flex items-center justify-between border-b border-black/30">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="text-xs text-stone-500 font-mono">bitcoin/src/script/interpreter.cpp</div>
                                <div className="w-10"></div> {/* Spacer for center alignment */}
                            </div>
                            
                            {/* Code Area */}
                            <pre className="m-0 p-0 overflow-x-auto bg-[#282c34]">
                                <code ref={codeRef} className="language-cpp font-mono text-sm leading-relaxed block p-6">
{`// BIP-347: OP_CAT Implementation
case OP_CAT: {
    // 1. Check stack depth (Needs at least 2 items)
    if (stack.size() < 2)
        return set_error(serror, SCRIPT_ERR_INVALID_STACK_OPERATION);

    // 2. Pop top two elements (Data B and Data A)
    valtype& vch1 = stacktop(-2);
    valtype& vch2 = stacktop(-1);

    // 3. Enforce MAX_SCRIPT_ELEMENT_SIZE (520 bytes)
    if (vch1.size() + vch2.size() > MAX_SCRIPT_ELEMENT_SIZE)
        return set_error(serror, SCRIPT_ERR_PUSH_SIZE);

    // 4. Concatenate vch2 to end of vch1
    vch1.insert(vch1.end(), vch2.begin(), vch2.end());
    
    // 5. Remove vch2 from stack
    stack.pop_back();
} break;`}
                                </code>
                            </pre>
                            
                            {/* Footer Annotation */}
                            <div className="bg-[#21252b] p-3 border-t border-black/30 text-xs text-stone-400 flex items-start gap-2">
                                <Code size={14} className="mt-0.5 text-orange-500 shrink-0" />
                                <span>
                                    <strong className="text-orange-500">Core Logic:</strong> Simple vector insertion (Line 15). This single operation enables Introspection (Covenants) and Turing Completeness.
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* THE ANIMATION STAGE */
                    <div className="h-48 w-full flex justify-center items-center relative">
                      {/* Left Block (Data A) */}
                      <div className={`absolute h-24 w-32 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${status === 'completed' ? 'translate-x-0 border-orange-500 bg-orange-500/10 w-64 shadow-[0_0_50px_rgba(249,115,22,0.3)]' : '-translate-x-24 border-stone-700 bg-stone-800/50'} ${status === 'processing' ? 'scale-90 opacity-80' : 'scale-100'}`}>
                        {status === 'completed' ? (
                            <div className="flex items-center gap-3 animate-fade-in-up">
                                <Layers className="text-orange-500" size={24} />
                                <div className="text-left">
                                    <div className="text-white font-bold leading-none">Smart</div>
                                    <div className="text-orange-500 font-bold leading-none">Contract</div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <span className="text-stone-500 text-xs font-mono mb-1">Stack Item 1</span>
                                <span className="text-stone-300 font-bold">数据 A</span>
                            </>
                        )}
                      </div>

                      {/* Center Operator */}
                      <div className={`z-20 transition-all duration-500 flex flex-col items-center justify-center ${status === 'completed' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-stone-700 bg-stone-900 relative ${status === 'processing' ? 'animate-spin border-orange-500' : ''}`}>
                              {status === 'processing' ? <Cpu size={20} className="text-orange-500" /> : <span className="text-stone-500 font-mono text-xl">+</span>}
                          </div>
                          {status === 'processing' && <span className="text-[10px] text-orange-500 mt-2 font-mono animate-pulse">OP_CAT</span>}
                      </div>

                      {/* Right Block (Data B) */}
                      <div className={`absolute h-24 w-32 border-2 border-stone-700 bg-stone-800/50 rounded-xl flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${status === 'completed' ? 'opacity-0 translate-x-0' : 'translate-x-24'} ${status === 'processing' ? 'scale-90 opacity-80' : 'scale-100'}`}>
                        <span className="text-stone-500 text-xs font-mono mb-1">Stack Item 2</span>
                        <span className="text-stone-300 font-bold">数据 B</span>
                      </div>
                    </div>
                )}
            </div>

            {/* Action Buttons Group */}
            <div className="flex gap-4 z-10">
                <button 
                    onClick={() => setShowCode(!showCode)}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-300 px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 border border-stone-600 hover:border-stone-500"
                >
                    {showCode ? <EyeOff size={18} /> : <Code size={18} />}
                    {showCode ? '返回演示' : '查看源码 (C++)'}
                </button>

                {!showCode && (
                    status === 'completed' ? (
                        <button onClick={reset} className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 border border-stone-500 hover:border-white shadow-lg">
                            <RefreshCw size={18} /> 重置演示
                        </button>
                    ) : (
                        <button onClick={handleActivate} disabled={status === 'processing'} className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-900/20 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group">
                            {status === 'processing' ? (<><Scan className="animate-spin" size={18} /> 处理中...</>) : (<><Cpu size={18} className="group-hover:rotate-12 transition-transform" /> 执行 OP_CAT</>)}
                        </button>
                    )
                )}
            </div>

          </div>
        </div>

        {/* === PART 2: INTROSPECTION DEEP DIVE === */}
        <div className="border-t border-stone-200 pt-20 mb-32">
            <div className="text-center mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-blue-200">
                    能力 1：Introspection
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900">
                    自省：比特币如何“看见”自己？
                </h2>
                <p className="text-stone-600 max-w-3xl mx-auto text-lg leading-relaxed">
                    在比特币中，脚本通常是“盲目”的，它不知道交易的金额或去向。
                    <br/>
                    通过 <strong>OP_CAT</strong>，我们可以在脚本中将分散的交易数据（版本号、输入、输出）<strong>重新拼接</strong>成一个完整的哈希原像，并与签名进行比对。
                    这让脚本第一次拥有了<strong>“检查交易内容”</strong>（如：只能转给白名单）的能力。
                </p>
            </div>

            {/* Introspection Interactive Demo */}
            <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden flex flex-col lg:flex-row">
                
                {/* Left: Transaction Builder (User Input) */}
                <div className="w-full lg:w-1/3 bg-stone-50 p-8 border-b lg:border-b-0 lg:border-r border-stone-200">
                    <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <span className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center text-xs">1</span>
                        构建交易 (模拟用户)
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                            <label className="text-xs font-bold text-stone-400 uppercase mb-2 block">Covenant Rule (合约规则)</label>
                            <div className="text-sm text-stone-600 font-mono bg-stone-100 p-2 rounded border border-stone-200">
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
                                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
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
                                        className={`py-2 rounded-lg text-sm font-bold border transition-all
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
                            className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
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
                <div className="w-full lg:w-2/3 bg-stone-900 p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                    
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    {/* Stage Title */}
                    <div className="absolute top-6 left-6 text-stone-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <Cpu size={14} /> OP_CAT Introspection Engine
                    </div>

                    {/* Visualization Container */}
                    <div className="relative w-full max-w-lg">
                        
                        {/* 1. Stack Components (Flying In) */}
                        <div className={`flex justify-center gap-2 mb-8 transition-all duration-500 ${introState === 'building' ? 'translate-y-8 opacity-0 scale-75' : 'opacity-100'}`}>
                            {['Version', 'Inputs', 'Outputs', 'Locktime'].map((item, i) => (
                                <div key={i} className="bg-stone-800 text-stone-400 text-[10px] px-3 py-2 rounded border border-stone-700 font-mono">
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* 2. The CAT Processing (Merging) */}
                        <div className="flex items-center justify-center h-24 mb-8">
                            <div className={`relative transition-all duration-500 ${introState === 'idle' ? 'w-full h-1 bg-stone-800 rounded' : 'w-64 h-16 bg-stone-800 border-2 border-dashed border-stone-600 rounded-xl flex items-center justify-center'}`}>
                                {introState === 'idle' && <div className="text-stone-600 text-xs text-center mt-2">Waiting for Data...</div>}
                                
                                {introState === 'building' && (
                                    <div className="flex items-center gap-2 text-yellow-500 font-bold animate-pulse">
                                        <Merge size={20} />
                                        <span>Concatenating...</span>
                                    </div>
                                )}

                                {(introState === 'verifying' || introState === 'success' || introState === 'fail') && (
                                    <div className="flex flex-col items-center">
                                        <div className="text-[10px] text-stone-400 uppercase mb-1">Reconstructed Tx Data</div>
                                        <div className="font-mono text-white text-xs bg-black px-2 py-1 rounded">
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
                            <div className="mt-4 bg-stone-800/50 p-4 rounded-xl border border-stone-700 text-center relative overflow-hidden">
                                {introState === 'verifying' && (
                                    <div className="absolute inset-0 bg-blue-500/10 animate-scan-vertical"></div>
                                )}
                                <div className="text-xs text-stone-500 mb-2">VALIDATION LOGIC</div>
                                <code className="text-sm font-mono block mb-1 text-green-400">OP_SHA256</code>
                                <code className="text-sm font-mono block text-blue-400">OP_EQUALVERIFY</code>
                            </div>
                        </div>

                        {/* 4. Result Overlay */}
                        {(introState === 'success' || introState === 'fail') && (
                            <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fade-in">
                                {introState === 'success' ? (
                                    <>
                                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                                            <CheckCircle2 size={40} className="text-white" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">验证通过</h4>
                                        <p className="text-green-400 font-mono text-sm">Valid Preimage</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(239,68,68,0.5)]">
                                            <ShieldAlert size={40} className="text-white" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">被 OP_CAT 拦截</h4>
                                        <p className="text-red-400 font-mono text-sm">
                                            {txAmount > 100 ? 'Error: Amount > 100' : 'Error: Invalid Recipient'}
                                        </p>
                                    </>
                                )}
                                <button 
                                    onClick={() => setIntroState('idle')}
                                    className="mt-8 px-6 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-full text-sm font-bold transition-colors"
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
        <div className="border-t border-stone-200 pt-20">
            <div className="text-center mb-16">
                <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-green-200">
                    能力 2：图灵完备
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900">
                    图灵完备：比特币如何拥有“记忆”？
                </h2>
                <p className="text-stone-600 max-w-3xl mx-auto text-lg leading-relaxed">
                    比特币通常是无状态的（Stateless）。但通过 OP_CAT，我们可以创建<strong>递归契约 (Recursive Covenants)</strong>。
                    <br/>
                    合约可以强制规定：这笔钱花出去时，必须在新的 UTXO 中包含相同的合约代码和更新后的状态（State N+1）。
                    这让比特币可以像以太坊一样运行状态机。
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-stone-900 rounded-3xl p-8 border border-stone-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
                
                {/* State Machine Visualization */}
                <div className="flex flex-col items-center">
                    
                    {/* The Chain Visual */}
                    <div className="flex items-center gap-6 mb-12 w-full overflow-x-auto py-10 px-4 mask-fade-sides">
                        {chainHistory.map((state, i) => (
                            <div key={i} className="flex items-center shrink-0 animate-slide-left group">
                                {/* UTXO Box (Dual Compartment) */}
                                <div className={`relative w-40 rounded-xl overflow-hidden border-2 transition-all duration-500 flex flex-col shadow-xl
                                    ${i === chainHistory.length - 1 
                                        ? 'border-green-500 scale-110 z-10 shadow-[0_0_40px_rgba(34,197,94,0.3)]' 
                                        : 'border-stone-600 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
                                    }`}>
                                    
                                    {/* Header */}
                                    <div className="bg-stone-800 text-[10px] text-stone-400 py-1 px-2 border-b border-stone-700 text-center font-mono">
                                        UTXO #{800000 + i}
                                    </div>

                                    {/* STATE Compartment (Green) */}
                                    <div className="flex-1 bg-stone-900 p-4 flex flex-col items-center justify-center border-b border-stone-700 relative">
                                        <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider mb-1">State</div>
                                        <div className="text-3xl font-black text-white font-mono">N={state}</div>
                                        <div className="absolute right-2 top-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    </div>

                                    {/* COVENANT Compartment (Yellow) */}
                                    <div className="bg-yellow-900/20 p-3 text-center">
                                        <div className="flex items-center justify-center gap-1 text-[10px] text-yellow-500 font-bold uppercase tracking-wider mb-1">
                                            <FileCode size={10} /> Covenant
                                        </div>
                                        <div className="text-[9px] font-mono text-yellow-200/80 leading-tight">
                                            REQUIRE:<br/>
                                            NextState = N + 1
                                        </div>
                                    </div>

                                    {/* Recursive Loading Indicator */}
                                    {i === chainHistory.length - 1 && isMining && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
                                            <RefreshCw className="animate-spin text-green-500" size={32} />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Link Arrow */}
                                {i < chainHistory.length - 1 && (
                                    <div className="w-16 h-0.5 bg-stone-600 mx-2 relative group-hover:bg-green-500/50 transition-colors">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-stone-600 rotate-45 group-hover:border-green-500/50"></div>
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 font-mono bg-stone-900 px-2 rounded border border-stone-700">Tx</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4">
                        <button 
                            onClick={mineNextBlock}
                            disabled={isMining}
                            className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isMining ? <><RefreshCw className="animate-spin" size={18} /> 状态更新中...</> : <><Link size={18} /> 运行下一状态 (N+1)</>}
                        </button>
                        <button 
                            onClick={resetTuring}
                            className="bg-stone-800 hover:bg-stone-700 text-stone-400 px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 border border-stone-600"
                        >
                            <History size={18} /> 重置链条
                        </button>
                    </div>

                    <p className="mt-6 text-stone-500 text-sm max-w-lg text-center">
                        注意观察：黄色的“契约代码”在每个 UTXO 中保持不变，强制约束着绿色的“状态数据”按规则演变。这就是图灵完备状态机的核心。
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Concept;
