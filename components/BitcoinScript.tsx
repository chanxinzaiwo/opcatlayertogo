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
      desc: '1. 入栈：解锁签名 (ScriptSig)', 
      detail: '这是发送方提供的数字签名。它证明了拥有者同意动用这笔资金。签名数据包含交易哈希和私钥加密信息。',
      icon: <FileSignature size={16}/>, 
      action: (s: string[]) => { s.push('Sig_Alice'); } 
    },
    { 
      op: '<PubKey>', 
      desc: '2. 入栈：用户公钥 (ScriptSig)', 
      detail: '这是发送方的原始公钥。在后续步骤中，它将被用于生成哈希（验证地址）和验证签名（验证身份）。',
      icon: <Key size={16}/>, 
      action: (s: string[]) => { s.push('Pub_Alice'); } 
    },
    { 
      op: 'OP_DUP', 
      desc: '3. 操作：复制栈顶公钥', 
      detail: '复制栈顶的 <PubKey>。因为公钥需要用两次：一次用于哈希运算（验证是否是收款人地址），一次用于最后的签名验证。',
      icon: <Copy size={16}/>, 
      action: (s: string[]) => { const top = s[s.length-1]; s.push(top); } 
    },
    { 
      op: 'OP_HASH160', 
      desc: '4. 操作：计算公钥哈希', 
      detail: '取出栈顶复制的公钥，进行 SHA256 + RIPEMD160 双重哈希运算。生成的结果就是我们常说的"比特币地址"（公钥哈希）。',
      icon: <Hash size={16}/>, 
      action: (s: string[]) => { s.pop(); s.push('Hash(Pub_Alice)'); } 
    },
    { 
      op: '<PKH>', 
      desc: '5. 入栈：目标公钥哈希 (ScriptPubKey)', 
      detail: '从锁定脚本中取出目标地址的哈希值。这是这笔 UTXO "锁"上刻着的地址，规定了只有该地址的主人才能花费。',
      icon: <Lock size={16}/>, 
      action: (s: string[]) => { s.push('Hash(Pub_Alice)'); } 
    }, 
    { 
      op: 'OP_EQUALVERIFY', 
      desc: '6. 验证：地址指纹匹配', 
      detail: '对比栈顶的两个哈希值：[发送方生成的哈希] vs [锁定脚本中的哈希]。如果相等，说明你就是这笔钱的合法拥有者。验证通过后，这两个哈希弹出。',
      icon: <Fingerprint size={16}/>, 
      action: (s: string[]) => { s.pop(); s.pop(); /* Assume equal */ } 
    },
    { 
      op: 'OP_CHECKSIG', 
      desc: '7. 验证：签名权属检查', 
      detail: '栈中只剩下 <Sig> 和 <PubKey>。利用公钥解密签名，验证该签名是否确实由对应私钥签署。如果通过，推入 TRUE，交易合法！',
      icon: <ShieldCheck size={16}/>, 
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
    <section id="bitcoin-script" className="py-20 bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 space-y-24">
            
            {/* PART 1: STACK BASICS */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <div>
                        <div className="inline-block bg-stone-800 text-stone-400 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-stone-700">
                            Part 1: 基础原理
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">堆栈 (Stack) 思维</h2>
                        <p className="text-stone-400 leading-relaxed">
                            比特币脚本没有循环，没有变量名。它是一种<strong>基于堆栈、后进先出 (LIFO)</strong> 的语言。
                            就像叠盘子：你只能操作最上面的数据。
                        </p>
                    </div>
                    
                    <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700">
                        <div className="flex items-center gap-2 mb-4 text-xs text-stone-500 font-bold uppercase tracking-wider">
                            <Calculator size={14} className="text-orange-500" />
                            示例脚本：2 + 3 = 5 ?
                        </div>
                        
                        <div className="flex flex-wrap gap-2 font-mono text-xs">
                            {script1.map((s, i) => (
                                <div key={i} className={`relative group px-3 py-2 rounded border transition-all cursor-help
                                    ${i === step1 ? 'bg-orange-600 border-orange-500 text-white scale-110 shadow-lg z-10 ring-2 ring-orange-500/30' : 
                                      i < step1 ? 'bg-stone-800 border-stone-700 text-stone-600 line-through opacity-60' : 
                                      'bg-stone-700 border-stone-600 text-stone-300 hover:border-orange-500'}`}>
                                    
                                    <div className="font-bold">{s.op}</div>

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-stone-950 text-white text-sm p-3 rounded-lg hidden group-hover:block z-50 border border-stone-700 shadow-2xl animate-fade-in text-center">
                                        <div className="font-bold text-orange-400 mb-1">{s.op}</div>
                                        <div className="text-xs leading-relaxed">{s.desc}</div>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-950"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Active Step Description Box */}
                        <div className="mt-6 p-4 bg-stone-900 rounded-lg border border-stone-700 min-h-[80px] flex items-center">
                            {step1 < script1.length ? (
                                <div className="animate-fade-in">
                                    <span className="text-orange-500 font-bold block mb-1 text-sm">
                                        当前步骤: {script1[step1].op}
                                    </span>
                                    <span className="text-stone-300 text-sm">
                                        {script1[step1].detail}
                                    </span>
                                </div>
                            ) : (
                                <div className="text-green-500 font-bold flex items-center gap-2">
                                    <CheckCircle size={18} /> 脚本执行完毕，结果验证成功。
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-stone-800 rounded-xl p-6 border border-stone-700 shadow-2xl relative mt-4">
                    <div className="absolute -top-3 left-6 bg-stone-900 text-stone-500 px-2 text-xs font-bold uppercase flex items-center gap-2">
                        <Layers size={12} /> Stack Visualizer
                    </div>
                    
                    {/* Stack Container */}
                    <div className="w-full h-72 bg-stone-900/50 rounded-lg border-2 border-dashed border-stone-700 mb-6 flex flex-col-reverse items-center justify-start p-4 gap-2 overflow-hidden relative">
                        {stack1.length === 0 && (
                            <div className="text-stone-600 text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                                <BoxIcon />
                                <span>Stack Empty</span>
                            </div>
                        )}
                        {stack1.map((val, idx) => (
                            <div key={idx} className={`w-full p-3 rounded-lg text-center font-mono font-bold shadow-lg transform transition-all duration-300 animate-slide-up flex items-center justify-between px-4
                                ${val === 1 && step1 === 5 ? 'bg-green-600 border border-green-500 text-white' : 'bg-stone-700 border border-stone-600 text-white'}`}>
                                <span className="text-[10px] text-stone-400">#{idx}</span>
                                <span>{val === 1 && step1 === 5 ? 'TRUE (1)' : val}</span>
                                <span className="w-4"></span>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-center bg-stone-900 p-2 rounded-lg">
                        <div className="text-xs font-mono text-stone-400 pl-2">
                            {step1 < script1.length ? '等待执行...' : '完成'}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleReset1} className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs font-bold transition-colors flex items-center gap-1">
                                <RotateCcw size={14} /> 重置
                            </button>
                            <button onClick={handleStep1} disabled={step1 >= script1.length} className={`px-6 py-2 rounded text-xs font-bold transition-colors flex items-center gap-2 ${step1 >= script1.length ? 'bg-green-600 text-white cursor-default' : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20'}`}>
                                {step1 >= script1.length ? <><CheckCircle size={14} /> 完成</> : <><MousePointerClick size={14} /> 执行 {script1[step1]?.op}</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* PART 2: P2PKH UTXO */}
            <div className="grid md:grid-cols-2 gap-12 items-start border-t border-stone-800 pt-20">
                <div className="order-2 md:order-1 bg-stone-800 rounded-xl p-6 border border-stone-700 shadow-2xl relative mt-4">
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
                    <div className="w-full h-72 bg-stone-900/50 rounded-lg border-2 border-dashed border-stone-700 mb-6 flex flex-col-reverse items-center justify-start p-4 gap-2 overflow-hidden relative">
                        {stack2.length === 0 && <div className="text-stone-600 text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">等待验证...</div>}
                        {stack2.map((val, idx) => (
                            <div key={idx} className={`w-full p-3 rounded-lg text-center font-mono font-bold shadow-md animate-fade-in-up flex items-center justify-center gap-2 transition-all
                                ${val === 'TRUE' ? 'bg-green-600 border border-green-500 text-white scale-105' : 'bg-stone-700 border border-stone-600 text-white'}`}>
                                {val === 'TRUE' ? <CheckCircle size={16}/> : null}
                                {val}
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-center bg-stone-900 p-2 rounded-lg">
                        <div className="text-xs font-mono text-stone-400 pl-2 flex items-center gap-2">
                            <span className={step2 < script2.length ? "text-blue-400 font-bold" : "text-green-500 font-bold"}>
                                {step2 < script2.length ? `即将执行: ${script2[step2].op}` : '验证通过 (Valid)'}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleReset2} className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs font-bold transition-colors flex items-center gap-1">
                                <RotateCcw size={14} /> 重置
                            </button>
                            <button onClick={handleStep2} disabled={step2 >= script2.length} className={`px-6 py-2 rounded text-xs font-bold transition-colors flex items-center gap-2 ${step2 >= script2.length ? 'bg-green-600 text-white cursor-default' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'}`}>
                                {step2 >= script2.length ? <><CheckCircle size={14} /> 已打包</> : <><Play size={14} /> 下一步</>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="order-1 md:order-2 space-y-6">
                    <div>
                        <div className="inline-block bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-blue-500/30">
                            Part 2: UTXO 转账验证
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">P2PKH 交易脚本</h2>
                        <p className="text-stone-400 leading-relaxed">
                            当你在比特币网络转账时，矿工实际上是在执行两段拼在一起的代码：
                            <br/>
                            <span className="text-green-400 font-mono text-sm bg-green-900/20 px-1 rounded">&lt;Sig&gt; &lt;PubKey&gt;</span> 
                            <span className="mx-2">+</span>
                            <span className="text-red-400 font-mono text-sm bg-red-900/20 px-1 rounded">OP_DUP OP_HASH160 &lt;PKH&gt; ...</span>
                        </p>
                    </div>

                    {/* Interactive Script Strip */}
                    <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700">
                        <div className="flex items-center gap-2 mb-4 text-xs text-stone-500">
                            <ArrowDown size={18} className="text-blue-500 animate-bounce" /> 当前执行位置 (悬停查看详情)
                        </div>
                        <div className="flex flex-wrap gap-3 font-mono text-xs">
                            {script2.map((s, i) => (
                                <div key={i} className={`relative group px-4 py-3 rounded border transition-all cursor-help
                                    ${i === step2 ? 'bg-blue-600 border-blue-500 text-white scale-110 shadow-xl z-20 ring-2 ring-blue-400/30' : 
                                      i < step2 ? 'bg-stone-800 border-stone-700 text-stone-600 line-through opacity-50' : 
                                      'bg-stone-900 border-stone-700 text-stone-300 hover:border-blue-500 hover:text-white'}`}>
                                    
                                    <div className="flex items-center gap-2">
                                        {s.icon} {s.op}
                                    </div>

                                    {/* Enhanced Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-stone-950 text-white text-sm p-4 rounded-xl hidden group-hover:block z-50 border border-stone-700 shadow-2xl animate-fade-in text-center">
                                        <div className="font-bold text-blue-400 mb-2 text-base border-b border-stone-800 pb-2">{s.op}</div>
                                        <div className="text-xs text-stone-300 leading-relaxed font-sans text-left">
                                            {s.detail}
                                        </div>
                                        {/* Tooltip Arrow */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-950"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Step Description Box for Part 2 */}
                        <div className="mt-6 p-4 bg-stone-900 rounded-lg border border-stone-700 min-h-[120px] flex items-start">
                             {step2 < script2.length ? (
                                <div className="text-stone-300 text-sm animate-fade-in w-full">
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-800">
                                        <span className="text-blue-500 font-bold text-base">{script2[step2].desc}</span>
                                    </div>
                                    <p className="text-stone-400 leading-relaxed text-xs">
                                        {script2[step2].detail}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-green-500 font-bold flex items-center gap-2 m-auto">
                                    <CheckCircle size={24} /> 
                                    <div>
                                        <div className="text-base">交易合法，允许花费。</div>
                                        <div className="text-xs text-stone-500 font-normal mt-1">矿工已将此交易打包进区块。</div>
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

// Helper icon
const BoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-700"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
)

export default BitcoinScript;