
import React, { useState } from 'react';
import { Terminal, Code2 } from 'lucide-react';

const Developer: React.FC = () => {
  const [codeMode, setCodeMode] = useState<'scrypt' | 'opcode'>('scrypt');

  const scryptCode = `
// TimeLockVault.ts
export class Vault extends SmartContract {
  @prop() owner: PubKey;
  @prop() unlockTime: bigint;

  @method()
  public unlock(sig: Sig) {
    // 1. 验证签名
    assert(this.checkSig(sig, this.owner));
    // 2. 验证时间锁
    assert(this.timeLock(this.unlockTime));
  }
}`;

  const opcodeCode = `
// Raw Bitcoin Script (汇编模式)
// 极易出错，难以调试，仅供展示

OP_DUP
OP_HASH160
<Owner_PubKeyHash>
OP_EQUALVERIFY
OP_CHECKSIGVERIFY

// 时间锁检查
<Unlock_Time>
OP_CHECKLOCKTIMEVERIFY
OP_DROP
`;

  return (
    <section id="scrypt-dev" className="pt-10 md:pt-20 pb-10 bg-blue-50/50">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Official Language</div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900">
                        告别汇编噩梦<br/>像写 TypeScript 一样开发
                    </h2>
                    <p className="text-stone-600 mb-8 leading-relaxed">
                        sCrypt 将复杂的 Bitcoin Script 抽象为现代化的 TypeScript 语法。它是 OP_CAT Layer 的官方开发语言，让数百万 Web2 开发者能够零门槛构建 BTC 应用。
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm text-blue-600 border border-blue-100">
                                <Terminal size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-900">VS Code 插件 & Debugger</h4>
                                <p className="text-sm text-stone-500">支持断点调试、变量监控、智能提示。这是比特币历史上第一个源码级调试工具。</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IDE Simulation */}
                <div className="bg-[#282c34] rounded-lg shadow-2xl overflow-hidden font-mono text-sm">
                    <div className="bg-[#21252b] px-4 py-2 flex items-center gap-2 border-b border-stone-700">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="ml-4 flex gap-1">
                            <button 
                                onClick={() => setCodeMode('scrypt')}
                                className={`px-3 py-1 rounded-t text-xs ${codeMode === 'scrypt' ? 'bg-[#282c34] text-white' : 'text-stone-500'}`}
                            >
                                Vault.ts
                            </button>
                            <button 
                                onClick={() => setCodeMode('opcode')}
                                className={`px-3 py-1 rounded-t text-xs ${codeMode === 'opcode' ? 'bg-[#282c34] text-white' : 'text-stone-500'}`}
                            >
                                compiled.script
                            </button>
                        </div>
                    </div>
                    <div className="p-6 overflow-x-auto h-[300px]">
                        <pre className={codeMode === 'scrypt' ? 'text-blue-300' : 'text-red-300'}>
                            <code>{codeMode === 'scrypt' ? scryptCode : opcodeCode}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Developer;
