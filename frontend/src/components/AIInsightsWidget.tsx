import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AIInsightsWidget = () => {
  const [data, setData] = useState<{ insights: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let apiUrl = "http://localhost:8000";
      if (typeof import.meta.env.VITE_API_URL !== "undefined") {
          apiUrl = import.meta.env.VITE_API_URL;
      }
      
      const res = await fetch(`${apiUrl}/api/ai-insights`);
      if (!res.ok) throw new Error("Failed to fetch AI Insights");
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError("Unable to generate Daily Executive Brief at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="w-full relative group col-span-1 md:col-span-2 lg:col-span-3">
      {/* Subtle Glow Border */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20 blur group-hover:opacity-30 transition duration-500"></div>
      
      <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col h-full min-h-[300px]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-indigo-500/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Daily Executive Brief
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Proactive AI Market & Portfolio Analysis</p>
            </div>
          </div>
          <button 
            onClick={fetchInsights} 
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh Insights"
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="h-4 bg-indigo-500/10 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-indigo-500/10 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-indigo-500/10 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-indigo-500/10 rounded w-1/2 animate-pulse mt-6"></div>
                <div className="h-4 bg-indigo-500/10 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-indigo-500/10 rounded w-4/5 animate-pulse"></div>
                <div className="flex items-center justify-center mt-8 text-indigo-400/50 space-x-2">
                  <BrainCircuit className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-medium tracking-wider uppercase animate-pulse">Synthesizing Alpha...</span>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full text-red-400 text-sm font-medium"
              >
                {error}
              </motion.div>
            ) : data ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-gray-200 text-sm/relaxed text-left"
              >
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }: any) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }: any) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
                    ol: ({ node, ...props }: any) => <ol className="list-decimal pl-5 mb-4 space-y-2" {...props} />,
                    li: ({ node, ...props }: any) => <li className="marker:text-indigo-500" {...props} />,
                    strong: ({ node, ...props }: any) => <strong className="text-white font-semibold" {...props} />,
                    h1: ({ node, ...props }: any) => <h1 className="text-lg font-bold text-indigo-300 mb-3" {...props} />,
                    h2: ({ node, ...props }: any) => <h2 className="text-md font-bold text-indigo-300 mb-3 mt-4" {...props} />,
                    h3: ({ node, ...props }: any) => <h3 className="text-sm font-bold text-indigo-300 mb-2 mt-4" {...props} />,
                  }}
                >
                  {data?.insights || "No insights generated for today."}
                </ReactMarkdown>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
