import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PortfolioWidget = () => {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        let apiUrl = "http://localhost:8000";
        if (typeof import.meta.env.VITE_API_URL !== "undefined") {
            apiUrl = import.meta.env.VITE_API_URL;
        }
        
        const res = await fetch(`${apiUrl}/api/portfolio`);
        if (!res.ok) throw new Error("Failed to load portfolio data");
        const data = await res.json();
        setPortfolio(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 300000); // 5 min poll
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex-grow flex flex-col justify-center items-center min-h-[300px] rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl shadow-sm">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide animate-pulse">Loading holdings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex-grow flex flex-col justify-center items-center min-h-[300px] rounded-2xl border border-red-200/50 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 backdrop-blur-xl shadow-sm p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mb-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Connection Error</h3>
        <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80 max-w-sm">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-white dark:bg-[#111] hover:bg-gray-50 dark:hover:bg-[#222] text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-800 transition-colors shadow-sm">Try again</button>
      </div>
    );
  }

  const totalValue = portfolio.reduce((sum, item) => sum + (item.amount * item.currentPrice), 0);
  const totalCost = portfolio.reduce((sum, item) => sum + (item.amount * item.avgCost), 0);
  const totalPL = totalValue - totalCost;
  const isPositive = totalPL >= 0;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Portfolio</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Live asset allocation & unrealized P/L</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Total P/L</div>
          <div className={cn(
            "text-xl font-bold tracking-tight",
            isPositive ? "text-emerald-500" : "text-red-500"
          )}>
            {isPositive ? '+' : ''}{totalPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-hidden rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl shadow-sm">
        <div className="overflow-x-auto h-full">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-200/50 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Asset</th>
                <th className="px-6 py-4 font-semibold text-right">Holdings</th>
                <th className="px-6 py-4 font-semibold text-right">Avg Cost</th>
                <th className="px-6 py-4 font-semibold text-right">Price</th>
                <th className="px-6 py-4 font-semibold text-right">Unrealized P/L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {portfolio.map((item, idx) => {
                const value = item.amount * item.currentPrice;
                const cost = item.amount * item.avgCost;
                const pl = value - cost;
                const isItemPositive = pl >= 0;

                return (
                  <motion.tr 
                    key={item.asset}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900 dark:text-white">{item.asset}</div>
                      <div className="text-xs text-gray-500">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      {item.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      ${item.avgCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900 dark:text-white">
                      ${item.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold">
                      <div className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs",
                        isItemPositive 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" 
                          : "bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                      )}>
                        {isItemPositive ? '+' : ''}${Math.abs(pl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
