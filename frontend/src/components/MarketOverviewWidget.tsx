import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarketData {
  symbol: string;
  price: number;
  status: string;
}

const StatCard = ({ title, symbol, value, icon: Icon, loading, isNegativeBg = false }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-colors duration-200",
        "bg-white/80 border-gray-200/50 dark:bg-gray-900/60 dark:border-gray-800/50",
        "backdrop-blur-xl"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className={cn(
          "p-2 rounded-xl border",
          isNegativeBg 
            ? "bg-red-50 border-red-100 text-red-600 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400" 
            : "bg-indigo-50 border-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-900/30 dark:text-indigo-400"
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        {loading ? (
          <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        ) : (
          <span className={cn(
            "text-4xl font-bold tracking-tighter",
            "text-gray-900 dark:text-gray-50"
          )}>
            {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
        <span className="text-gray-400 dark:text-gray-500">{symbol}</span>
      </div>
      
      {/* Decorative gradient blur in background */}
      <div className={cn(
        "absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full blur-2xl opacity-20",
        isNegativeBg ? "bg-red-500" : "bg-indigo-500"
      )} />
    </motion.div>
  );
};

export const MarketOverviewWidget = () => {
  const [marketData, setMarketData] = useState<Record<string, MarketData | null>>({
    '^VIX': null,
    '^GSPC': null,
    'GC=F': null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const symbols = ['^VIX', '^GSPC', 'GC=F'];
        const results = await Promise.all(
          symbols.map(sym => 
            fetch(import.meta.env.VITE_API_URL + `/api/market?symbol=${encodeURIComponent(sym)}`)
              .then(res => res.json())
          )
        );
        
        const newData: Record<string, MarketData> = {};
        results.forEach(res => {
          if (res.status === 'success') {
            newData[res.symbol] = res;
          }
        });
        
        setMarketData(newData);
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 300000); // 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Market Pulse</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Real-time indicators fetched directly from backend agents</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/30">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Live API</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="S&P 500 Index" 
          symbol="^GSPC" 
          value={marketData['^GSPC']?.price || 0} 
          icon={TrendingUp} 
          loading={loading} 
        />
        <StatCard 
          title="Gold Spot" 
          symbol="GC=F" 
          value={marketData['GC=F']?.price || 0} 
          icon={DollarSign} 
          loading={loading} 
        />
        <StatCard 
          title="Volatility Index" 
          symbol="^VIX" 
          value={marketData['^VIX']?.price || 0} 
          icon={AlertTriangle} 
          loading={loading} 
          isNegativeBg={marketData['^VIX']?.price ? marketData['^VIX'].price > 20 : false}
        />
      </div>
    </div>
  );
};
