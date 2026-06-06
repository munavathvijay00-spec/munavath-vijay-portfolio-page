import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Activity, Database, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useSoundEffects } from '../context/SoundContext';

const CryptoPriceWidget = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playClick } = useSoundEffects();

  const fetchPrices = () => {
    setLoading(true);
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,chainlink&vs_currencies=usd&include_24hr_change=true')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div className="bg-slate-900/50 p-6 border border-white/5 rounded-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4">
        <button onClick={() => { playClick(); fetchPrices(); }} className="text-gray-500 hover:text-emerald-400 transition-colors">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      <h3 className="text-sm font-bold text-gray-400 mb-6 flex items-center gap-2 uppercase tracking-widest"><Activity size={16} className="text-emerald-500" /> Live Market Data</h3>
      
      {!data && loading ? (
        <div className="text-gray-500 text-sm animate-pulse">Fetching from Oracle...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data && Object.entries(data).map(([coin, info]) => (
            <div key={coin} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-colors">
              <span className="text-xs uppercase font-black tracking-widest text-gray-300">{coin}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-white">${info.usd.toLocaleString()}</span>
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded bg-slate-950 ${info.usd_24h_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {info.usd_24h_change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(info.usd_24h_change).toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ArchitectureDiagram = () => (
  <div className="bg-slate-900/50 p-6 border border-white/5 rounded-2xl flex flex-col justify-center items-center h-full relative overflow-hidden group">
    <h3 className="text-sm font-bold text-gray-400 mb-6 flex items-center gap-2 self-start uppercase tracking-widest"><Database size={16} className="text-emerald-500" /> Tokenization Architecture</h3>
    
    <svg viewBox="0 0 400 200" className="w-full h-48 opacity-80 group-hover:opacity-100 transition-opacity">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Nodes */}
      <rect x="20" y="80" width="80" height="40" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="60" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Frontend UI</text>

      <rect x="160" y="80" width="80" height="40" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" filter="url(#glow)" />
      <text x="200" y="105" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">Smart Contract</text>

      <rect x="300" y="40" width="80" height="40" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="340" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">IPFS / Arweave</text>

      <rect x="300" y="120" width="80" height="40" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="340" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Chainlink Oracles</text>

      {/* Connecting Lines */}
      <path d="M100 100 L160 100" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      
      <path d="M240 90 L300 60" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      
      <path d="M240 110 L300 140" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1s" repeatCount="indefinite" />
      </path>
    </svg>
  </div>
);

const WalletConnector = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const { playClick, playHover } = useSoundEffects();

  const handleConnect = () => {
    playClick();
    if (!connected) {
      setAddress("0x71C...97d1");
      setConnected(true);
    } else {
      setConnected(false);
      setAddress("");
    }
  };

  return (
    <div className="bg-slate-900/50 p-6 border border-white/5 rounded-2xl flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-400 mb-6 flex items-center gap-2 uppercase tracking-widest"><Wallet size={16} className="text-emerald-500" /> Web3 Interface</h3>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {!connected ? (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
              <Wallet size={24} className="text-emerald-500" />
            </div>
            <p className="text-gray-400 text-sm mb-6">Connect wallet to interact with testnet contracts.</p>
            <button 
              onClick={handleConnect}
              onMouseEnter={playHover}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-colors text-sm"
            >
              Connect Wallet
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
              <Wallet size={24} className="text-emerald-400" />
            </div>
            <p className="text-emerald-400 text-sm font-mono mb-2">Connected</p>
            <p className="text-white text-lg font-bold tracking-wider mb-6">{address}</p>
            
            <div className="w-full bg-slate-950 rounded-lg p-3 text-left border border-white/5 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Network</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Ethereum Sepolia</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Balance</span>
                <span className="text-sm text-white font-mono">1.45 ETH</span>
              </div>
            </div>

            <button 
              onClick={handleConnect}
              onMouseEnter={playHover}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors text-sm w-full"
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const BlockchainShowcase = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="text-center mb-16">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-emerald-500 font-bold tracking-widest text-sm mb-4"
        >
          WEB3 CAPABILITIES
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-black mb-6">Live <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">On-Chain</span> Data</h2>
        <div className="w-24 h-2 bg-gradient-to-r from-emerald-600 to-transparent mx-auto rounded-full" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="col-span-1 flex flex-col gap-6">
          <WalletConnector />
        </div>
        <div className="col-span-1 lg:col-span-2 grid grid-rows-2 gap-6">
          <ArchitectureDiagram />
          <CryptoPriceWidget />
        </div>
      </div>
    </div>
  );
};

export default BlockchainShowcase;
