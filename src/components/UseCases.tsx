
import React, { useState, useEffect, useRef } from 'react';
import { Shield, Database, CloudLightning, Coins, Lock, Unlock, AlertTriangle, CheckCircle2, ArrowRight, RefreshCcw, Hammer, Ban, Wallet, FileCheck, Zap, Layers } from 'lucide-react';

const UseCases: React.FC = () => {
  const [activeCase, setActiveCase] = useState<string>('covenant');
  
  // --- COVENANT STATE ---
  const [covTarget, setCovTarget] = useState<'whitelist' | 'blacklist'>('whitelist');
  const [covStatus, setCovStatus] = useState<'idle' | 'checking' | 'approved' | 'rejected'>('idle');

  // --- VAULT STATE ---
  const [vaultState, setVaultState] = useState<'secure' | 'hacked' | 'recovered' | 'stolen'>('secure');
  const [vaultTimer, setVaultTimer] = useState(0);
  const vaultIntervalRef = useRef<any>(null);

  // --- MERKLE STATE ---
  const [merkleStep, setMerkleStep] = useState(0);

  // --- QUANTUM STATE ---
  const [quantumState, setQuantumState] = useState<'idle' | 'attacking' | 'result'>('idle');

  // --- TOKEN STATE ---
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isMinting, setIsMinting] = useState(false);

  // --- HANDLERS ---

  // 1. Covenant Logic
  const handleCovSend = () => {
    setCovStatus('checking');
    setTimeout(() => {
        setCovStatus(covTarget === 'whitelist' ? 'approved' : 'rejected');
    }, 1000);
  };

  // 2. Vault Logic
  const startHack = () => {
    setVaultState('hacked');
    setVaultTimer(0);
    if (vaultIntervalRef.current) clearInterval(vaultIntervalRef.current);
    
    vaultIntervalRef.current = setInterval(() => {
        setVaultTimer(prev => {
            if (prev >= 100) {
                clearInterval(vaultIntervalRef.current);
                setVaultState('stolen');
                return 100;
            }
            return prev + 2; // Speed of hack
        });
    }, 50); // Update every 50ms (approx 2.5s to fail)
  };

  const recoverVault = () => {
    if (vaultIntervalRef.current) clearInterval(vaultIntervalRef.current);
    setVaultState('recovered');
  };

  const resetVault = () => {
    setVaultState('secure');
    setVaultTimer(0);
  };

  // 3. Merkle Logic
  const runMerkle = () => {
    setMerkleStep(1); // Proving
    setTimeout(() => setMerkleStep(2), 1000); // Submitting
    setTimeout(() => setMerkleStep(3), 2000); // Verifying
    setTimeout(() => setMerkleStep(4), 3000); // Done
  };

  // 4. Quantum Logic
  const runQuantum = () => {
    setQuantumState('attacking');
    setTimeout(() => setQuantumState('result'), 1500);
  };

  // 5. Token Logic
  const mintToken = () => {
    setIsMinting(true);
    setTimeout(() => {
      setTokenBalance(prev => prev + 100);
      setIsMinting(false);
    }, 1500);
  };

  // Switch Handler (Reset states)
  const switchTab = (id: string) => {
    setActiveCase(id);
    // Reset specific demos
    if (id === 'vault') resetVault();
    if (id === 'covenant') setCovStatus('idle');
    if (id === 'merkle') setMerkleStep(0);
    if (id === 'quantum') setQuantumState('idle');
  };

  const cases = [
    {
      id: 'covenant',
      title: 'A. 契约 (Covenants)',
      icon: <FileCheck className="w-6 h-6 text-orange-500" />,
      bg: 'hover:border-orange-500 hover:bg-orange-50',
      iconBg: 'bg-orange-100',
      desc: '限制比特币“流向哪里”。比特币 Layer 1 编程能力的圣杯。',
      render: () => (
        <div className="w-full max-w-lg mx-auto">
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-600 mb-4">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-stone-400 text-sm font-mono">脚本规则: <span className="text-orange-400">OP_CAT &lt;Tx&gt; OP_EQUAL "Whitelist"</span></div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <button 
                            onClick={() => { setCovTarget('whitelist'); setCovStatus('idle'); }}
                            className={`flex-1 p-3 rounded-lg border-2 text-sm font-bold flex items-center justify-center gap-2 transition-all ${covTarget === 'whitelist' ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-stone-600 text-stone-500'}`}
                        >
                            <CheckCircle2 size={16} /> 白名单地址
                        </button>
                        <button 
                            onClick={() => { setCovTarget('blacklist'); setCovStatus('idle'); }}
                            className={`flex-1 p-3 rounded-lg border-2 text-sm font-bold flex items-center justify-center gap-2 transition-all ${covTarget === 'blacklist' ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-stone-600 text-stone-500'}`}
                        >
                            <Ban size={16} /> 黑客地址
                        </button>
                    </div>

                    <div className="relative">
                        <button 
                            onClick={handleCovSend}
                            disabled={covStatus !== 'idle'}
                            className="w-full bg-stone-700 hover:bg-stone-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                        >
                            {covStatus === 'idle' ? '尝试转账 1 BTC' : '脚本验证中...'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Result Display */}
            {covStatus === 'approved' && (
                <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg flex items-center gap-3 animate-fade-in-up">
                    <CheckCircle2 size={24} />
                    <div>
                        <div className="font-bold">交易成功</div>
                        <div className="text-xs opacity-80">Covenant 验证通过：目标地址符合白名单规则。</div>
                    </div>
                </div>
            )}
            {covStatus === 'rejected' && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg flex items-center gap-3 animate-fade-in-up">
                    <Ban size={24} />
                    <div>
                        <div className="font-bold">交易被拒绝</div>
                        <div className="text-xs opacity-80">Script Error: OP_EQUALVERIFY failed. 资金无法流向非授权地址。</div>
                    </div>
                </div>
            )}
        </div>
      )
    },
    {
      id: 'vault',
      title: 'B. 金库 (Vaults)',
      icon: <Shield className="w-6 h-6 text-green-500" />,
      bg: 'hover:border-green-500 hover:bg-green-50',
      iconBg: 'bg-green-100',
      desc: '绝对安全的存储。即便私钥被盗，也能回滚交易。',
      render: () => (
        <div className="w-full max-w-lg mx-auto bg-stone-800 rounded-xl p-6 border border-stone-600 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                    <div className="text-xs text-stone-400 font-bold uppercase tracking-widest">Vault Status</div>
                    <div className={`font-bold text-xl flex items-center gap-2 ${
                        vaultState === 'secure' ? 'text-green-400' :
                        vaultState === 'hacked' ? 'text-red-500 animate-pulse' :
                        vaultState === 'recovered' ? 'text-blue-400' : 'text-stone-500'
                    }`}>
                        {vaultState === 'secure' && <><Lock size={18}/> SECURE</>}
                        {vaultState === 'hacked' && <><AlertTriangle size={18}/> UNVAULTING...</>}
                        {vaultState === 'recovered' && <><Shield size={18}/> RECOVERED</>}
                        {vaultState === 'stolen' && <><Unlock size={18}/> FUNDS LOST</>}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-stone-400 font-bold">Balance</div>
                    <div className="font-mono text-xl text-white">10.0 BTC</div>
                </div>
            </div>

            {/* Visualizer */}
            <div className="relative h-24 bg-stone-900 rounded-lg border border-stone-700 mb-6 flex items-center justify-center overflow-hidden">
                {vaultState === 'hacked' && (
                    <div className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all ease-linear" style={{ width: `${100 - vaultTimer}%` }}></div>
                )}
                
                {vaultState === 'secure' && <div className="text-stone-500 text-sm">资金锁定中 (Covenant Enforced)</div>}
                
                {vaultState === 'hacked' && (
                    <div className="text-red-400 font-bold text-sm animate-pulse flex flex-col items-center">
                        <span>⚠️ 非法提款检测!</span>
                        <span className="text-xs text-stone-400">时间锁剩余窗口: {((100 - vaultTimer)/20).toFixed(1)}s</span>
                    </div>
                )}

                {vaultState === 'recovered' && (
                    <div className="text-blue-400 font-bold text-sm flex items-center gap-2">
                        <CheckCircle2 size={16} /> 资金已转移至冷钱包
                    </div>
                )}
                 {vaultState === 'stolen' && (
                    <div className="text-stone-600 font-bold text-sm">
                        时间窗口结束，资金被转移
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
                {vaultState === 'secure' ? (
                    <button onClick={startHack} className="col-span-2 bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                        <Unlock size={18} /> 模拟私钥泄露 (黑客攻击)
                    </button>
                ) : vaultState === 'hacked' ? (
                    <>
                        <div className="col-span-2 flex gap-2">
                            <button className="flex-1 bg-stone-700 text-stone-500 py-3 rounded-lg font-bold cursor-not-allowed text-sm">
                                黑客等待中...
                            </button>
                            <button onClick={recoverVault} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all shadow-lg animate-bounce flex items-center justify-center gap-2">
                                <Shield size={18} /> 紧急撤回
                            </button>
                        </div>
                    </>
                ) : (
                    <button onClick={resetVault} className="col-span-2 bg-stone-700 hover:bg-stone-600 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                        <RefreshCcw size={18} /> 重置演示
                    </button>
                )}
            </div>
        </div>
      )
    },
    {
      id: 'merkle',
      title: 'C. Merkle & L2',
      icon: <Database className="w-6 h-6 text-blue-500" />,
      bg: 'hover:border-blue-500 hover:bg-blue-50',
      iconBg: 'bg-blue-100',
      desc: '验证 Merkle Proof，实现去中心化桥接与 ZK Rollup。',
      render: () => (
        <div className="w-full max-w-lg mx-auto bg-stone-800 rounded-xl p-6 border border-stone-600">
            <div className="flex justify-between items-center mb-8 px-4">
                {/* L2 Node */}
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all ${merkleStep >= 1 ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-stone-600 text-stone-500'}`}>
                        <Layers size={24} />
                    </div>
                    <span className="text-[10px] text-stone-400 font-bold">L2 Sequencer</span>
                </div>

                {/* Connection Lines */}
                <div className="flex-1 h-1 bg-stone-700 mx-4 relative">
                    <div className={`absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ${merkleStep === 0 ? 'w-0' : merkleStep === 1 ? 'w-1/3' : merkleStep === 2 ? 'w-2/3' : 'w-full'}`}></div>
                    {merkleStep === 2 && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 rounded animate-pulse">
                            Submitting Proof...
                        </div>
                    )}
                </div>

                {/* L1 Node */}
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all ${merkleStep >= 3 ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-stone-600 text-stone-500'}`}>
                        <Database size={24} />
                    </div>
                    <span className="text-[10px] text-stone-400 font-bold">Bitcoin L1</span>
                </div>
            </div>

            <div className="bg-stone-900 rounded-lg p-4 font-mono text-xs text-stone-400 mb-6 min-h-[80px]">
                {merkleStep === 0 && <span className="animate-pulse">Waiting for proof submission...</span>}
                {merkleStep >= 1 && <div className="text-blue-400">&gt Generating ZK-Proof for 5000 txs...</div>}
                {merkleStep >= 2 && <div className="text-yellow-400">&gt Broadcasting OP_CAT payload...</div>}
                {merkleStep >= 3 && <div className="text-purple-400">&gt Simulating OP_CAT verification...</div>}
                {merkleStep === 4 && <div className="text-green-400 font-bold">&gt VERIFIED: State Root Updated.</div>}
            </div>

            <button 
                onClick={runMerkle}
                disabled={merkleStep > 0 && merkleStep < 4}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {merkleStep === 0 || merkleStep === 4 ? <><Zap size={16}/> 提交 ZK 证明</> : '验证进行中...'}
            </button>
        </div>
      )
    },
    {
      id: 'quantum',
      title: 'D. 抗量子签名',
      icon: <CloudLightning className="w-6 h-6 text-purple-500" />,
      bg: 'hover:border-purple-500 hover:bg-purple-50',
      iconBg: 'bg-purple-100',
      desc: 'Lamport 签名。为比特币未来安全提供的最后一道防线。',
      render: () => (
        <div className="w-full max-w-lg mx-auto bg-stone-800 rounded-xl p-6 border border-stone-600 relative">
            <div className="flex justify-around items-center mb-8 relative z-10">
                {/* ECDSA */}
                <div className={`flex flex-col items-center transition-all duration-500 ${quantumState === 'result' ? 'opacity-50 grayscale' : ''}`}>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 mb-3 transition-all ${quantumState === 'result' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-stone-500 bg-stone-700 text-stone-400'}`}>
                        {quantumState === 'result' ? <Unlock size={32} /> : <Lock size={32} />}
                    </div>
                    <span className="text-sm font-bold text-white">ECDSA</span>
                    <span className={`text-[10px] mt-1 ${quantumState === 'result' ? 'text-red-500 font-bold' : 'text-stone-500'}`}>
                        {quantumState === 'result' ? 'CRACKED' : 'Current Standard'}
                    </span>
                </div>

                {/* Attack Animation Overlay */}
                {quantumState === 'attacking' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-1 bg-purple-500 blur-md animate-pulse"></div>
                        <CloudLightning size={64} className="text-purple-400 absolute animate-ping" />
                    </div>
                )}

                {/* Lamport */}
                <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 mb-3 transition-all ${quantumState === 'result' ? 'border-green-500 bg-green-500/20 text-green-400 scale-110 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'border-purple-500 bg-stone-700 text-purple-400'}`}>
                        <Shield size={32} />
                    </div>
                    <span className="text-sm font-bold text-white">Lamport</span>
                    <span className={`text-[10px] mt-1 ${quantumState === 'result' ? 'text-green-500 font-bold' : 'text-stone-500'}`}>
                        {quantumState === 'result' ? 'SECURE' : 'Hash Based'}
                    </span>
                </div>
            </div>

            <div className="text-center mb-6">
                <p className="text-stone-400 text-sm h-10 flex items-center justify-center">
                    {quantumState === 'idle' && "准备测试量子计算机对签名的影响..."}
                    {quantumState === 'attacking' && <span className="text-purple-400 font-mono">Running Shor's Algorithm...</span>}
                    {quantumState === 'result' && "ECDSA 私钥被计算破解，但哈希签名 (Lamport) 依然安全。"}
                </p>
            </div>

            <button 
                onClick={runQuantum}
                disabled={quantumState === 'attacking'}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50 shadow-lg shadow-purple-900/20"
            >
                {quantumState === 'idle' ? '⚡ 发射量子射线' : quantumState === 'attacking' ? '攻击进行中...' : '重置实验'}
            </button>
        </div>
      )
    },
    {
      id: 'token',
      title: 'E. 资产协议',
      icon: <Coins className="w-6 h-6 text-red-500" />,
      bg: 'hover:border-red-500 hover:bg-red-50',
      iconBg: 'bg-red-100',
      desc: 'CAT20 & CAT721。矿工验证的可编程代币标准。',
      render: () => (
        <div className="w-full max-w-lg mx-auto bg-stone-800 rounded-xl p-6 border border-stone-600 text-left">
             <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="font-bold text-white flex items-center gap-2"><Coins className="text-red-500"/> CAT20 Minting</h4>
                    <p className="text-xs text-stone-400">Layer 1 Miner Validated</p>
                </div>
                 <div className="bg-black px-4 py-2 rounded border border-stone-700 text-right">
                    <span className="text-[10px] text-stone-500 block uppercase">Wallet Balance</span>
                    <span className={`font-mono text-xl font-bold transition-all ${isMinting ? 'text-stone-500' : 'text-red-400'}`}>{tokenBalance} CAT</span>
                </div>
            </div>

            <div className="bg-stone-900/50 p-4 rounded-lg border border-stone-700 mb-6 font-mono text-xs text-stone-400 relative overflow-hidden">
                <div className="flex justify-between mb-2 relative z-10">
                    <span>Block Status:</span>
                    <span className={isMinting ? "text-yellow-500 animate-pulse" : "text-green-500"}>{isMinting ? "MINING (PoW Work)..." : "CONFIRMED"}</span>
                </div>
                
                {/* Mining Animation Bar */}
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden mb-3 relative z-10">
                    <div className={`h-full bg-red-500 transition-all duration-[1500ms] ease-out ${isMinting ? 'w-full' : 'w-0'}`}></div>
                </div>

                <div className="space-y-1 relative z-10">
                    <div className={isMinting ? "text-white" : "opacity-30"}>&gt; OP_CAT &lt;State&gt; &lt;Tx&gt;</div>
                    <div className={isMinting ? "text-white delay-300" : "opacity-30"}>&gt; OP_SHA256 (Hash)</div>
                    <div className={isMinting ? "text-green-400 delay-500 font-bold" : "opacity-30"}>&gt; OP_EQUALVERIFY (Valid)</div>
                </div>

                {/* Background Pickaxe */}
                <Hammer className={`absolute right-4 bottom-4 text-stone-800 w-24 h-24 transition-transform duration-500 ${isMinting ? 'rotate-[-45deg] scale-110' : 'rotate-0'}`} />
            </div>

            <button 
                onClick={mintToken}
                disabled={isMinting}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait group"
            >
                {isMinting ? <><Hammer className="animate-bounce" size={18}/> 矿工验证中...</> : <><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/> 铸造代币 (Mint)</>}
            </button>
        </div>
      )
    }
  ];

  return (
    <section id="usecases" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <div className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-orange-200">
                    Interactive Use Cases
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-stone-900 tracking-tight">核心应用场景：亲身体验</h2>
                <p className="text-stone-500 max-w-2xl mx-auto text-lg">
                    不仅仅是理论。通过下方的模拟器，亲自操作 OP_CAT 赋予比特币的五大“超能力”。
                </p>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {cases.map((c) => (
                    <button 
                        key={c.id}
                        onClick={() => switchTab(c.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-bold text-sm
                            ${activeCase === c.id 
                                ? 'bg-stone-900 text-white border-stone-900 shadow-lg scale-105' 
                                : 'bg-white text-stone-500 border-stone-200 hover:border-orange-300 hover:text-orange-600'
                            }
                        `}
                    >
                        {c.id === activeCase && c.icon}
                        {c.title}
                    </button>
                ))}
            </div>

            {/* INTERACTIVE DEMO STAGE */}
            <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-12 border border-stone-700 min-h-[500px] flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden transition-all">
                {/* Background Grid & Effects */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500"></div>
                
                {/* Dynamic Content */}
                <div className="relative z-10 w-full animate-fade-in">
                    <div className="mb-10">
                        <h3 className="text-3xl font-bold mb-4 text-white">
                            {cases.find(c => c.id === activeCase)?.title}
                        </h3>
                        <p className="text-stone-400 max-w-2xl mx-auto text-lg">
                            {cases.find(c => c.id === activeCase)?.desc}
                        </p>
                    </div>

                    {cases.find(c => c.id === activeCase)?.render()}
                </div>
            </div>
        </div>
    </section>
  );
};

export default UseCases;
