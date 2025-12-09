import React, { useState } from 'react';
import { User, Layers, ShieldCheck, Search, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

// --- DATA DEFINITIONS ---

const CHART_DATA = [
  { name: 'OP_CAT', score: 95, label: '势头强劲', fill: '#EAB308' }, // Yellow-500
  { name: 'OP_CTV', score: 65, label: '停滞不前', fill: '#78716C' }, // Stone-500
  { name: 'APO', score: 50, label: '专注 LN', fill: '#57534E' }, // Stone-600
  { name: 'OP_VAULT', score: 40, label: '小众领域', fill: '#44403C' }, // Stone-700
  { name: 'LNHANCE', score: 30, label: '过于复杂', fill: '#292524' }, // Stone-800
];

type ProposalType = 'OP_CAT' | 'OP_CTV' | 'OP_VAULT';

const ECOSYSTEM_DATA: Record<ProposalType, {
    builders: string[];
    explorers: string[];
    observers: string[];
    desc: string;
}> = {
    'OP_CAT': {
        builders: ['StarkWare', 'Taproot Wizards', 'sCrypt', 'OP_CAT Layer', 'Botanix'],
        explorers: ['Blockstream', 'Citrea', 'Bitlayer', 'Alpen Labs', 'L2IV'],
        observers: ['Lightning Labs', 'Ark', 'Spiral', 'Chaincode'],
        desc: "生态极度繁荣。不仅有 L2 项目方全力开发，还有 NFT (Quantum Cats) 和 ZK 技术方 (StarkWare) 的强力支持。"
    },
    'OP_CTV': {
        builders: ['Jeremy Rubin'],
        explorers: ['Nomic', 'Simple Covenants'],
        observers: ['Bitcoin Devs', 'Optech'],
        desc: "主要由作者个人推动。虽然历史悠久，但缺乏大型商业项目和资本的实际采用。"
    },
    'OP_VAULT': {
        builders: ['James O\'Beirne'],
        explorers: ['Custody Solutions'],
        observers: ['Cold Storage Firms'],
        desc: "专注于金库单一场景。虽然技术优雅，但通用性较低，未能吸引通用型 L2 开发者。"
    }
};

const TEAM_MEMBERS = [
    {
        name: "Dr. Bruce",
        role: "创始人 & CEO",
        avatar: "https://github.com/user-attachments/assets/717703ef-2b37-4ca3-8da1-b589bda84847",
        bio: ["连续创业者", "前 Meta 研究科学家", "sCrypt & CAT 协议创始人", "7年+ 比特币生态经验", "分布式网络博士"]
    },
    {
        name: "Yiqiang Wang",
        role: "联合创始人 & CTO",
        avatar: "https://github.com/user-attachments/assets/522aa9a8-471a-4891-a733-9d62f9c0a052",
        bio: ["连续创业者", "sCrypt & CAT 协议联合创始人", "7年+ 比特币生态经验", "前Umeng创始团队", "前 KTJR CTO"]
    },
    {
        name: "Mate Tokay",
        role: "联合创始人 & CMO",
        avatar: "https://github.com/user-attachments/assets/21afd1ed-cd51-4bc5-9b28-1bb5a9e0e981",
        bio: ["加密先驱 & 连续创业者", "Bitcoin.com 联合创始人", "12年+ 加密行业经验", "前 Bitcoin.com CEO", "Altcoinist.com 联合创始人"]
    }
];

const ORGANIZATION_BACKERS = [
    { name: "sCrypt", logo: "https://github.com/user-attachments/assets/1e77e9d4-398e-46b0-851b-77d7ca7033bd", bg: "bg-black" },
    { name: "StarkWare", logo: "https://github.com/user-attachments/assets/86ff4775-6ac2-43bb-9f82-5d286c138343", bg: "bg-black" },
    { name: "Taproot Wizards", logo: "https://github.com/user-attachments/assets/c8dca2e5-110d-4c37-8a3e-7e81504986b2", fallbackText: "🧙‍♂️ Taproot Wizards", bg: "bg-balck" },
    { name: "Alpen Labs", logo: "https://github.com/user-attachments/assets/543dd64b-3deb-4f4a-bb6f-b1ee04d09aae", bg: "bg-black" },
    { name: "Blockstream", logo: "https://github.com/user-attachments/assets/127a785f-1bc5-4a11-bd96-8221e78b0bf2", bg: "bg-black" },
    { name: "L2IV", logo: "https://pbs.twimg.com/profile_images/1666837774021230592/z7K7XQ4z_400x400.jpg", bg: "bg-black" },
    { name: "Citrea", logo: "https://github.com/user-attachments/assets/0ab71783-baae-43d6-89b1-a7278693a263", bg: "bg-black" },
    { name: "Bitlayer", logo: "https://github.com/user-attachments/assets/80f15728-27e4-4c86-814a-734bb5a14c7c", fallbackText: "Bitlayer", bg: "bg-black" },
];

const INDIVIDUAL_BACKERS = [
    { name: "Adam Back",avatar: "https://github.com/user-attachments/assets/5c3e1ffc-8f10-4abf-8333-50560c3d0314",role: "Blockstream" },
    { name: "Andrew Poelstra", role: "Blockstream", avatar: "https://github.com/user-attachments/assets/28c237c2-8ef7-4511-8717-0b6984fe61ac" },
    { name: "Eli Ben-Sasson", role: "StarkWare", avatar: "https://github.com/user-attachments/assets/190896e3-f3be-45bc-90cf-fe3b4d88bbf5" },
    { name: "Olaoluwa Osuntokun", role: "Lightning Labs", avatar: "https://github.com/user-attachments/assets/3250e2b8-75be-48d0-b832-c0c0eb2948b2" },
    { name: "Eric Wall", role: "Taproot Wizards", avatar: "https://github.com/user-attachments/assets/6fc9d284-3b2b-49dc-a77e-08116e7d39a5" },
    { name: "Ethan Heilman", role: "BIP 347 Author", avatar: "https://github.com/user-attachments/assets/0042cbfe-bc01-40e2-bb8b-6b3bdab523c7" },
    { name: "Steven Roose", role: "Ark", avatar: "https://github.com/user-attachments/assets/02518b09-cf3f-479a-b240-4f926b7ac8b3" },
    { name: "Bob Bodily", role: "Odin.fun", avatar: "https://github.com/user-attachments/assets/988c0659-3f2b-4aea-8f24-c27a021dc14a" },
    { name: "Paul Sztorc", role: "LayerTwo Labs", avatar: "https://github.com/user-attachments/assets/278988b9-1041-4453-866a-489bd577fd69" }
];

// --- COMPONENTS ---

const TeamMemberCard: React.FC<{ name: string; role: string; bio: string[]; avatar: string }> = ({ name, role, bio, avatar }) => (
    <div className="bg-stone-900/50 p-8 rounded-none border border-stone-800 hover:border-yellow-500 transition-colors group text-left h-full flex flex-col">
        <div className="w-24 h-24 bg-stone-800 rounded-full mb-6 border-2 border-stone-700 group-hover:border-yellow-500 flex items-center justify-center text-stone-600 overflow-hidden shadow-xl">
             <img src={avatar} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2 uppercase">{name}</h3>
        <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-6 border-b border-stone-800 pb-4">{role}</p>
        <div className="space-y-3 flex-1">
            {bio.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-stone-400 font-mono leading-tight">
                    <span className="text-yellow-500 mt-1">›</span>
                    {item}
                </div>
            ))}
        </div>
    </div>
);

const SentimentColumn: React.FC<{ 
    title: string; 
    icon: React.ReactNode; 
    subtitle: string; 
    items: string[]; 
    active: boolean; 
    colorClass: string; 
}> = ({ title, icon, subtitle, items, active, colorClass }) => (
    <div className={`p-6 rounded-xl border transition-all duration-500 flex flex-col h-full ${active ? `border-${colorClass}-500/50 bg-${colorClass}-900/10 shadow-lg` : 'border-stone-800 bg-stone-900/30 opacity-60 hover:opacity-100'}`}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-800/50">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? `bg-${colorClass}-500/20 text-${colorClass}-500` : 'bg-stone-800 text-stone-500'}`}>
                {icon}
            </div>
            <div>
                <h3 className={`font-bold uppercase ${active ? 'text-white' : 'text-stone-400'}`}>{title}</h3>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest">{subtitle}</p>
            </div>
        </div>
        <div className="space-y-3 flex-1">
            {items.length > 0 ? (
                items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-black p-3 rounded border border-stone-800 hover:border-stone-600 transition-colors">
                        <div className={`w-2 h-2 rounded-full ${active ? `bg-${colorClass}-500 animate-pulse` : 'bg-stone-700'}`}></div>
                        <span className="font-mono text-sm text-stone-300 font-bold">{item}</span>
                    </div>
                ))
            ) : (
                <div className="text-stone-600 text-sm italic py-4 text-center">暂无项目</div>
            )}
        </div>
    </div>
);


const Consensus: React.FC = () => {
  const [activeProposal, setActiveProposal] = useState<ProposalType>('OP_CAT');

  return (
    <section id="consensus" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
            
            {/* 1. TEAM SECTION */}
            <div className="mb-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-800 pb-8">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-2">核心团队</h2>
                        <p className="text-stone-500 font-mono text-lg">协议背后的构建者。</p>
                    </div>
                    <div className="flex gap-8 mt-8 md:mt-0">
                        <div className="text-right">
                            <div className="text-4xl font-black text-yellow-500">3 x</div>
                            <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">成功退出</div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-black text-yellow-500">$20M+</div>
                            <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">融资总额</div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {TEAM_MEMBERS.map((member, i) => (
                        <TeamMemberCard key={i} {...member} />
                    ))}
                </div>
            </div>

            {/* 2. BACKERS SECTION */}
            <div className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-white uppercase mb-4">
                        当前 OP_CAT 支持者
                    </h2>
                    <div className="h-1 w-16 bg-yellow-500 mx-auto"></div>
                </div>
                
                {/* Organization Logos */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                    {ORGANIZATION_BACKERS.map((backer, i) => (
                        <div key={i} className={`h-32 rounded-xl flex items-center justify-center border border-stone-800 hover:border-yellow-500 transition-all p-6 grayscale hover:grayscale-0 group ${backer.bg === 'bg-white' ? 'bg-white' : 'bg-stone-900'}`}>
                            <img 
                                src={backer.logo} 
                                alt={backer.name} 
                                className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <span className="hidden text-lg font-bold text-stone-500">{backer.name || backer.fallbackText}</span>
                        </div>
                    ))}
                </div>

                {/* Individual Backers - REFACTORED FOR BETTER LAYOUT */}
                <div className="border-t border-stone-800 pt-20">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">个人支持者</h3>
                        <p className="text-stone-500 text-sm">Industry Leaders & Core Developers</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {INDIVIDUAL_BACKERS.map((person, i) => (
                            <div key={i} className="bg-stone-900/40 border border-stone-800 hover:border-yellow-500/50 rounded-xl p-8 flex flex-col items-center gap-4 transition-all hover:bg-stone-800 group hover:-translate-y-1 shadow-lg">
                                <div className="w-24 h-24 bg-stone-800 rounded-full border-4 border-stone-700 group-hover:border-yellow-500 flex items-center justify-center text-stone-500 overflow-hidden shrink-0 shadow-xl transition-colors">
                                    <img 
                                        src={person.avatar} 
                                        alt={person.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-bold">${person.name.charAt(0)}</span>`;
                                        }}
                                    />
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors uppercase tracking-tight">{person.name}</div>
                                    <div className="text-xs text-stone-500 flex items-center justify-center gap-1 mt-2 font-mono bg-stone-950/50 px-3 py-1 rounded-full border border-stone-800">
                                        <Briefcase size={20} />
                                        {person.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. ECOSYSTEM SENTIMENT SPECTRUM */}
            <div className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-white uppercase mb-4">
                        生态势力图谱
                    </h2>
                    <div className="h-1 w-16 bg-yellow-500 mx-auto"></div>
                    <p className="text-stone-500 mt-4 max-w-2xl mx-auto">
                        不同提案的生态支持度对比。点击切换查看真实差距。
                    </p>
                </div>

                {/* Switcher */}
                <div className="flex justify-center gap-4 mb-12">
                    {(['OP_CAT', 'OP_CTV', 'OP_VAULT'] as ProposalType[]).map(prop => (
                        <button
                            key={prop}
                            onClick={() => setActiveProposal(prop)}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                                activeProposal === prop 
                                    ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]' 
                                    : 'bg-stone-900 text-stone-500 border-stone-800 hover:border-stone-600'
                            }`}
                        >
                            {prop}
                        </button>
                    ))}
                </div>

                {/* The Spectrum Grid */}
                <div className="grid md:grid-cols-3 gap-6 relative">
                    <SentimentColumn 
                        title="构建者 (Builders)"
                        subtitle="全力投入开发"
                        icon={<Layers size={20} />}
                        items={ECOSYSTEM_DATA[activeProposal].builders}
                        active={activeProposal === 'OP_CAT'}
                        colorClass="green"
                    />
                    <SentimentColumn 
                        title="探索者 (Explorers)"
                        subtitle="积极评估中"
                        icon={<Search size={20} />}
                        items={ECOSYSTEM_DATA[activeProposal].explorers}
                        active={activeProposal === 'OP_CAT'}
                        colorClass="yellow"
                    />
                    <SentimentColumn 
                        title="观察者 (Observers)"
                        subtitle="中立/观望"
                        icon={<ShieldCheck size={20} />}
                        items={ECOSYSTEM_DATA[activeProposal].observers}
                        active={activeProposal === 'OP_CAT'} // Observers are always somewhat active/relevant
                        colorClass="stone"
                    />
                </div>

                <div className="mt-8 text-center bg-stone-900/50 border border-stone-800 p-4 rounded-lg text-sm text-stone-400">
                    <span className="text-yellow-500 font-bold mr-2">💡 分析:</span>
                    {ECOSYSTEM_DATA[activeProposal].desc}
                </div>
            </div>

            {/* 4. CHART SECTION */}
            <div className="grid md:grid-cols-2 gap-12 items-center bg-stone-900/50 p-8 rounded-3xl border border-stone-800">
                <div>
                    <h3 className="text-3xl font-black text-white uppercase mb-4">
                        Wiki 统计数据
                    </h3>
                    <p className="text-stone-400 leading-relaxed mb-6">
                        根据 <a href="https://en.bitcoin.it/wiki/Covenants_support" target="_blank" rel="noreferrer" className="text-yellow-500 hover:underline">Bitcoin Wiki</a> 的 "Covenants Support" 矩阵统计，OP_CAT 拥有最广泛的行业共识。
                    </p>
                    <p className="text-stone-400 leading-relaxed text-sm">
                        其简单的设计（仅恢复 10 行代码）和强大的功能（图灵完备、自省）使其在与 OP_CTV、APO 等提案的竞争中脱颖而出，获得了包括 StarkWare、Blockstream 等重量级机构的支持。
                    </p>
                </div>
                
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={CHART_DATA}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                width={80}
                                tick={{fill: '#A8A29E', fontSize: 12, fontWeight: 700}} 
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                contentStyle={{ backgroundColor: '#1C1917', borderColor: '#44403C', color: '#fff' }}
                            />
                            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={32}>
                                {CHART_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                                <LabelList dataKey="label" position="right" fill="#fff" fontSize={12} fontWeight="bold" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    </section>
  );
};

export default Consensus;