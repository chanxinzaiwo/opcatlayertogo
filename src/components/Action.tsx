
import React from 'react';
import { Megaphone, Terminal, ArrowRight, Github, Twitter, Zap } from 'lucide-react';

const Action: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/50 via-white to-white pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-purple-500"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-orange-200 animate-fade-in-up">
                <Zap size={14} className="fill-orange-500 text-orange-500" />
                The Revolution is Loading...
            </div>

            <h2 className="text-4xl md:text-7xl font-black text-stone-900 mb-6 tracking-tight leading-tight">
                加入 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">变革</span>。<br/>
                您的使命：成为布道者。
            </h2>

            <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-16 leading-relaxed">
                无需高深技术背景。只要传播声音，你就是在为比特币的未来添砖加瓦。
                <br/>
                <strong className="text-stone-800 mt-2 block">现在就行动起来！</strong>
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {/* 1. READ */}
                <a href="https://www.theblockbeats.info/news/55688" target="_blank" rel="noreferrer" className="group bg-white p-8 rounded-3xl shadow-xl border border-stone-100 hover:border-orange-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="relative z-10">
                        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform shadow-sm">
                            <Megaphone />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">深度阅读</h3>
                        <p className="text-sm text-stone-500 mb-6 leading-relaxed h-10">
                            BlockBeats 研报：为什么 OP_CAT 是比特币扩容终局？
                        </p>
                        <div className="text-orange-600 font-bold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                            阅读文章 <ArrowRight size={16} />
                        </div>
                     </div>
                </a>

                {/* 2. BUILD */}
                <a href="https://docs.opcatlabs.io" target="_blank" rel="noreferrer" className="group bg-white p-8 rounded-3xl shadow-xl border border-stone-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="relative z-10">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform shadow-sm">
                            <Terminal />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">开发者文档</h3>
                        <p className="text-sm text-stone-500 mb-6 leading-relaxed h-10">
                            使用 sCrypt (TypeScript) 在 L1 构建智能合约。
                        </p>
                        <div className="text-blue-600 font-bold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                            开始构建 <ArrowRight size={16} />
                        </div>
                     </div>
                </a>

                {/* 3. FOLLOW */}
                <a href="https://x.com/opcatlayer" target="_blank" rel="noreferrer" className="group bg-white p-8 rounded-3xl shadow-xl border border-stone-100 hover:border-black hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-stone-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="relative z-10">
                        <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform shadow-sm">
                            <Twitter />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">关注动态</h3>
                        <p className="text-sm text-stone-500 mb-6 leading-relaxed h-10">
                            加入 Twitter 社区，第一时间获取技术进展。
                        </p>
                        <div className="text-black font-bold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                            Follow Us <ArrowRight size={16} />
                        </div>
                     </div>
                </a>

                {/* 4. CONTRIBUTE */}
                <a href="https://github.com/sCrypt-Inc/awesome-op-cat" target="_blank" rel="noreferrer" className="group bg-white p-8 rounded-3xl shadow-xl border border-stone-100 hover:border-purple-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="relative z-10">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform shadow-sm">
                            <Github />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">Awesome 列表</h3>
                        <p className="text-sm text-stone-500 mb-6 leading-relaxed h-10">
                            探索生态项目、研究论文与社区资源。
                        </p>
                        <div className="text-purple-600 font-bold text-sm flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                            贡献代码 <ArrowRight size={16} />
                        </div>
                     </div>
                </a>
            </div>
        </div>
    </section>
  );
};

export default Action;
