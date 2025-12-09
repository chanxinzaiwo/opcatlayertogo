
import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, Key, Lock, Fingerprint, FileSignature, Copy, Hash, ShieldCheck, ArrowDown, Calculator, MousePointerClick, Layers } from 'lucide-react';

const BitcoinScript: React.FC = () => {
  // --- PART 1 STATE ---
  const [stack1, setStack1] = useState<number[]>([]);
  const [step1, setStep1] = useState(0);

  const script1 = [
    { 
      op: 'OP_2', 
      desc: '操作：将数值 2 压入堆栈', 
      detail: '堆栈就像一个盘子架，我们将数字 2 放在最下面。',
      action: (_s: number[]) => 2, 
      type: 'push' 
    },
    { 
      op: 'OP_3', 
      desc: '操作：将数值 3 压入堆栈', 
      detail: '将数字 3 放在 2 的上面。现在栈顶是 3。',
      action: (_s: number[]) => 3, 
      type: 'push' 
    },
    { 
      op: 'OP_ADD', 
      desc: '操作：弹出栈顶两个数相加', 
      detail: '取出 3 和 2，计算 3+2=5，然后把 5 放回堆栈。',
      action: (s: number[]) => { const a = s.pop(); const b = s.pop(); return (a || 0) + (b || 0); }, 
      type: 'calc' 
    },
    { 
      op: 'OP_5', 
      desc: '操作：将数值 5 压入堆栈', 
      detail: '为了验证结果，我们将期望值 5 也放入堆栈。',
      action: (_s: number[]) => 5, 
      type: 'push' 
    },
    { 
      op: 'OP_EQUAL', 
      desc: '操作：验证结果是否相等', 
      detail: '取出计算结果 5 和期望值 5，对比它们。相等则返回 TRUE (1)。',
      action: (s: number[]) => { const a = s.pop(); const b = s.pop(); return a === b ? 1 : 0; }, 
      type: 'calc' 
    }
  ];

  // --- PART 2 STATE ---
  const [stack2, setStack2] = useState<string[]>([]);
  const [step2, setStep2] = useState(0);
  const [utxoStatus, setUtxoStatus] = useState<'pending' | 'valid' | 'invalid'>('pending');

  const script2 = [
    { 
      op: '<Sig>', 
      desc: '1. 入栈：解锁签名', 
      detail: '这是发送方提供的数字签名。它证明了拥有者同意动用这笔资金。',
      icon: <FileSignature size={14}/>, 
      action: (s: string[]) => { s.push('Sig_Alice'); } 
    },
    { 
      op: '<PubKey>', 
      desc: '2. 入栈：用户公钥', 
      detail: '发送方的原始公钥。用于生成哈希（验证地址）和验证签名（验证身份）。',
      icon: <Key size={14}/>, 
      action: (s: string[]) => { s.push('Pub_Alice'); } 
    },
    { 
      op: 'OP_DUP', 
      desc: '3. 操作：复制栈顶', 
      detail: '复制栈顶的公钥。一次用于地址验证，一次用于签名验证。',
      icon: <Copy size={14}/>, 
      action: (s: string[]) => { const top = s[s.length-1]; s.push(top); } 
    },
    { 
      op: 'OP_HASH160', 
      desc: '4. 操作：计算哈希', 
      detail: '对栈顶公钥进行哈希运算，生成比特币地址。',
      icon: <Hash size={14}/>, 
      action: (s: string[]) => { s.pop(); s.push('Hash(Pub)'); } 
    },
    { 
      op: '<PKH>', 
      desc: '5. 入栈：目标哈希', 
      detail: '从锁定脚本中取出目标地址哈希。这是资金锁上的“锁孔”。',
      icon: <Lock size={14}/>, 
      action: (s: string[]) => { s.push('Hash(Pub)'); } 
    }, 
    { 
      op: 'OP_EQUAL', 
      desc: '6. 验证：地址匹配', 
      detail: '对比两个哈希值。相等说明地址匹配。',
      icon: <Fingerprint size={14}/>, 
      action: (s: string[]) => { s.pop(); s.pop(); /* Assume equal */ } 
    },
    { 
      op: 'OP_SIG', 
      desc: '7. 验证：签名', 
      detail: '利用公钥解密签名，验证身份。通过则返回 TRUE。',
      icon: <ShieldCheck size={14}/>, 
      action: (s: string[]) => { s.pop(); s.pop(); s.push('TRUE'); } 
    }
  ];

  // --- HANDLERS ---
  const handleStep1 = () => {
    if (step1 >= script1.length) return;
    const currentOp = script1[step1];
    const newStack = [...stack1];
    const result = currentOp.action(newStack);
    if (typeof result === 'number') newStack.push(result);
    setStack1(newStack);
    setStep1(step1 + 1);
  };

  const handleReset1 = () => { setStack1([]); setStep1(0); };

  const handleStep2 = () => {
    if (step2 >= script2.length) return;
    const currentOp = script2[step2];
    const newStack = [...stack2];
    currentOp.action(newStack);
    setStack2(newStack);
    setStep2(step2 + 1);
    
    if (step2 === script2.length - 1) {
        setUtxoStatus('valid');
    }
  };

  const handleReset2 = () => { setStack2([]); setStep2(0); setUtxoStatus('pending'); };

  return (
    <section id="bitcoin-script" className="py-12 md:py-20 bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16 md:space-y-24">
            
            {/* PART 1: STACK BASICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="space-y-6">
                    <div>
                        <div className="inline-block bg-stone-800 text-stone-400 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-stone-700">
                            Part 1: 基础原理
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">堆栈 (Stack) 思维</h2>
                        <p className="text-stone-400 leading-relaxed text-sm md:text-base">
                            比特币脚本没有循环，没有变量名。它是一种<strong>基于堆栈、后进先出 (LIFO)</strong> 的语言。
                            就像叠盘子：你只能操作最上面的数据。
                        </p>
                    </div>
                    
                    <div className="bg-stone-800/50 p-4 md:p-6 rounded-xl border border-stone-700">
                        <div className="flex items-center gap-2 mb-4 text-xs text-stone-500 font-bold uppercase tracking-wider">
                            <Calculator size={14} className="text-orange-500" />
                            示例脚本：2 + 3 = 5 ?
                        </div>
                        
                        {/* Interactive Script Buttons */}
                        <div className="flex flex-wrap gap-2 font-mono text-xs">
                            {script1.map((s, i) => (
                                <div key={i} className={`relative group px-3 py-2 rounded border transition-all cursor-help shrink-0
                                    ${i === step1 ? 'bg-orange-600 border-orange-500 text-white scale-110 shadow-lg z-10 ring-2 ring-orange-500/30' : 
                                      i < step1 ? 'bg-stone-800 border-stone-700 text-stone-600 line-through opacity-60' : 
                                      'bg-stone-700 border-stone-600 text-stone-300 hover:border-orange-500'}`}>
                                    <div className="font-bold">{s.op}</div>
                                </div>
                            ))}
                        </div>

                        {/* Active Step Description */}
                        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-stone-900 rounded-lg border border-stone-700 min-h-[80px] flex items-center">
                            {step1 < script1.length ? (
                                <div className="animate-fade-in w-full">
                                    <span className="text-orange-500 font-bold block mb-1 text-sm">
                                        当前步骤: {script1[step1].op}
                                    </span>
                                    <span className="text-stone-300 text-xs md:text-sm">
                                        {script1[step1].detail}
                                    </span>
                                </div>
                            ) : (
                                <div className="text-green-500 font-bold flex items-center gap-2 text-sm">
                                    <CheckCircle size={18} /> 脚本执行完毕，验证成功。
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-stone-800 rounded-xl p-4 md:p-6 border border-stone-700 shadow-2xl relative mt-4 md:mt-0">
                    <div className="absolute -top-3 left-6 bg-stone-900 text-stone-500 px-2 text-xs font-bold uppercase flex items-center gap-2">
                        <Layers size={12} /> Stack Visualizer
                    </div>
                    
                    {/* Stack Container - Reduced height on mobile */}
                    <div className="w-full h-48 md:h-72 bg-stone-900/50 rounded-lg border-2 border-dashed border-stone-700 mb-4 md:mb-6 flex flex-col-reverse items-center justify-start p-2 md:p-4 gap-2 overflow-y-auto relative">
                        {stack1.length === 0 && (
                            <div className="text-stone-600 text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                                <span className="opacity-50">Stack Empty</span>
                            </div>
                        )}
                        {stack1.map((val, idx) => (
                            <div key={idx} className={`w-full p-2 md:p-3 rounded-lg text-center font-mono font-bold shadow-lg transform transition-all duration-300 animate-slide-up flex items-center justify-between px-4 text-xs md:text-sm
                                ${val === 1 && step1 === 5 ? 'bg-green-600 border border-green-500 text-white' : 'bg-stone-700 border border-stone-600 text-white'}`}>
                                <span className="text-[10px] text-stone-400">#{idx}</span>
                                <span>{val === 1 && step1 === 5 ? 'TRUE (1)' : val}</span>
                                <span className="w-4"></span>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex flex-row justify-between items-center bg-stone-900 p-2 rounded-lg gap-2">
                        <button onClick={handleReset1} className="flex-1 px-3 py-3 md:py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1">
                            <RotateCcw size={14} /> 重置
                        </button>
                        <button onClick={handleStep1} disabled={step1 >= script1.length} className={`flex-[2] px-3 py-3 md:py-2 rounded text-xs font-bold transition-colors flex items-center justify-center gap-2 ${step1 >= script1.length ? 'bg-green-600 text-white cursor-default' : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20 active:scale-95'}`}>
                            {step1 >= script1.length ? <><CheckCircle size={14} /> 完成</> : <><MousePointerClick size={14} /> 执行指令</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* PART 2: P2PKH UTXO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start border-t border-stone-800 pt-12 md:pt-20">
                <div className="order-2 md:order-1 bg-stone-800 rounded-xl p-4 md:p-6 border border-stone-700 shadow-2xl relative mt-4 md:mt-0">
                    <div className="absolute -top-3 left-6 bg-stone-900 text-stone-500 px-2 text-xs font-bold uppercase flex items-center gap-2">
                        <ShieldCheck size={12} /> Verification Engine
                    </div>
                    
                    {/* Transaction Context Visual */}
                    <div className="flex justify-between mb-4 text-[10px] text-stone-500 font-mono uppercase tracking-wider bg-stone-900/50 p-2 rounded">
                        <span className="text-green-500">ScriptSig (解锁)</span>
                        <span className="text-stone-600">→</span>
                        <span className="text-red-500">ScriptPubKey (锁定)</span>
                    </div>

                    {/* Stack Display */}
                    <div className="w-full h-48 md:h-72 bg-stone-900/50 rounded-lg border-2 border-dashed border-stone-700 mb-4 md:mb-6 flex flex-col-reverse items-center justify-start p-2 md:p-4 gap-2 overflow-y-auto relative">
                        {stack2.length === 0 && <div className="text-stone-600 text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">等待验证...</div>}
                        {stack2.map((val, idx) => (
                            <div key={idx} className={`w-full p-2 md:p-3 rounded-lg text-center font-mono font-bold shadow-md animate-fade-in-up flex items-center justify-center gap-2 transition-all text-xs md:text-sm
                                ${val === 'TRUE' ? 'bg-green-600 border border-green-500 text-white scale-105' : 'bg-stone-700 border border-stone-600 text-white'}`}>
                                {val === 'TRUE' ? <CheckCircle size={16}/> : null}
                                <span className="truncate max-w-full px-2">{val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex flex-row justify-between items-center bg-stone-900 p-2 rounded-lg gap-2">
                        <button onClick={handleReset2} className="flex-1 px-3 py-3 md:py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1">
                            <RotateCcw size={14} /> 重置
                        </button>
                        <button onClick={handleStep2} disabled={step2 >= script2.length} className={`flex-[2] px-3 py-3 md:py-2 rounded text-xs font-bold transition-colors flex items-center justify-center gap-2 ${step2 >= script2.length ? 'bg-green-600 text-white cursor-default' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95'}`}>
                            {step2 >= script2.length ? <><CheckCircle size={14} /> 已打包</> : <><Play size={14} /> 下一步</>}
                        </button>
                    </div>
                </div>

                <div className="order-1 md:order-2 space-y-6">
                    <div>
                        <div className="inline-block bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-blue-500/30">
                            Part 2: UTXO 转账验证
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">P2PKH 交易脚本</h2>
                        <p className="text-stone-400 leading-relaxed text-sm md:text-base">
                            当你在比特币网络转账时，矿工实际上是在执行两段拼在一起的代码。
                        </p>
                    </div>

                    {/* Interactive Script Strip - Optimized Layout */}
                    <div className="bg-stone-800/50 p-4 md:p-6 rounded-xl border border-stone-700">
                        <div className="flex items-center gap-2 mb-4 text-xs text-stone-500">
                            <ArrowDown size={18} className="text-blue-500 animate-bounce" /> 当前执行位置
                        </div>
                        
                        {/* CHANGED: Use flex-wrap to prevent horizontal scrolling/overflow on mobile */}
                        <div className="flex flex-wrap gap-2 font-mono text-xs justify-start">
                            {script2.map((s, i) => (
                                <div key={i} className={`relative group px-2 md:px-4 py-2 md:py-3 rounded border transition-all cursor-help 
                                    w-[calc(50%-0.5rem)] md:w-auto md:flex-none text-center md:text-left
                                    ${i === step2 ? 'bg-blue-600 border-blue-500 text-white scale-105 shadow-xl z-20 ring-2 ring-blue-400/30' : 
                                      i < step2 ? 'bg-stone-800 border-stone-700 text-stone-600 line-through opacity-50' : 
                                      'bg-stone-900 border-stone-700 text-stone-300 hover:border-blue-500 hover:text-white'}`}>
                                    
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 whitespace-nowrap">
                                        <span className="md:hidden">{s.icon}</span>
                                        <span className="hidden md:inline">{s.icon}</span>
                                        <span>{s.op}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Step Description Box */}
                        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-stone-900 rounded-lg border border-stone-700 min-h-[80px] md:min-h-[100px] flex items-start">
                             {step2 < script2.length ? (
                                <div className="text-stone-300 text-sm animate-fade-in w-full">
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-800">
                                        <span className="text-blue-500 font-bold text-sm md:text-base">{script2[step2].desc}</span>
                                    </div>
                                    <p className="text-stone-400 leading-relaxed text-xs">
                                        {script2[step2].detail}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-green-500 font-bold flex items-center gap-2 m-auto text-sm">
                                    <CheckCircle size={20} /> 
                                    <div>
                                        <div>交易合法，允许花费。</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
  );
};

export default BitcoinScript;
