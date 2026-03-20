import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarketData {
  symbol: string;
  price: number;
  status: string;
}

const generateMockTrendData = (basePrice: number) => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: basePrice * (1 + (Math.random() * 0.04 - 0.02))
  }));
};

const StatCard = ({ title, symbol, value, icon: Icon, loading, isNegativeBg = false }: any) => {
  const [trendData, setTrendData] = useState<{time: number, value: number}[]>([]);
  
  useEffect(() => {
    if (value) {
      setTrendData(generateMockTrendData(value));
    }
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-colors duration-200 flex flex-col justify-between",
        "bg-white/80 border-gray-200/50 dark:bg-[#0a0a0a]/80 dark:border-white/10",
        "backdrop-blur-xl"
      )}
    >
      <div className="flex items-center justify-between mb-2">
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
      
      <div className="flex items-baseline space-x-2 z-10 relative mt-2">
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
      <div className="mt-1 flex items-center justify-between text-[11px] font-bold tracking-wider uppercase z-10 relative">
        <span className="text-gray-400 dark:text-gray-500">{symbol}</span>
      </div>
      
      {/* Sparkline Chart */}
      {!loading && trendData.length > 0 && (
        <div className="h-16 w-full mt-4 -mx-2 -mb-2 opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={isNegativeBg ? "#ef4444" : "#6366f1"} 
                strokeWidth={2.5} 
                dot={false} 
                isAnimationActive={true} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Decorative gradient blur in background */}
      <div className={cn(
        "absolute -right-4 -top-4 -z-10 h-32 w-32 rounded-full blur-[40px] opacity-20",
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
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const symbols = ['^VIX', '^GSPC', 'GC=F'];
        // Note: Using hardcoded API proxy address
        let apiUrl = "http://localhost:8000";
        if (typeof import.meta.env.VITE_API_URL !== "undefined") {
            apiUrl = import.meta.env.VITE_API_URL;
        }

        const results = await Promise.all(
          symbols.map(sym => 
            fetch(`${apiUrl}/api/market?symbol=${encodeURIComponent(sym)}`)
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
    
    let interval: ReturnType<typeof setInterval>;
    if (autoRefresh) {
      // Auto-refresh every 5 minutes (300 seconds)
      interval = setInterval(fetchAllData, 300000); 
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Market Pulse</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time indicators fetched automatically</p>
        </div>
        <button 
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={cn(
            "flex items-center space-x-2 px-3 py-1.5 rounded-full border shadow-sm transition-colors cursor-pointer outline-none",
            autoRefresh 
              ? "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/30 shadow-emerald-500/10" 
              : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50"
          )}
        >
          <span className="relative flex h-2.5 w-2.5">
            {autoRefresh && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={cn(
              "relative inline-flex rounded-full h-2.5 w-2.5 z-10",
              autoRefresh ? "bg-emerald-500" : "bg-gray-400 dark:bg-gray-500"
            )}></span>
          </span>
          <span className={cn(
            "text-[11px] font-bold uppercase tracking-wider",
            autoRefresh ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"
          )}>
            Auto-Sync {autoRefresh ? '(5m)' : 'Off'}
          </span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
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
