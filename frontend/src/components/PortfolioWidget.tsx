import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const mockPortfolio = [
  { asset: "VOO", type: "US ETF", amount: 50, avgCost: 450.20, currentPrice: 470.50 },
  { asset: "QQQ", type: "US ETF", amount: 30, avgCost: 410.00, currentPrice: 435.10 },
  { asset: "Gold (GC=F)", type: "Commodity", amount: 5, avgCost: 2000.00, currentPrice: 2150.00 },
  { asset: "SCB S&P500 (SSF)", type: "Thai Fund", amount: 10000, avgCost: 15.5, currentPrice: 16.2 }
];

export const PortfolioWidget = () => {
  const totalValue = mockPortfolio.reduce((sum, item) => sum + (item.amount * item.currentPrice), 0);
  const totalCost = mockPortfolio.reduce((sum, item) => sum + (item.amount * item.avgCost), 0);
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
              {mockPortfolio.map((item, idx) => {
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
