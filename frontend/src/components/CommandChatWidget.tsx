import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Send, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CommandChatWidget = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    
    setIsLoading(true);
    setResponse(null);
    
    try {
      let apiUrl = "http://localhost:8000";
      if (typeof import.meta.env.VITE_API_URL !== "undefined") {
          apiUrl = import.meta.env.VITE_API_URL;
      }
      
      const res = await fetch(`${apiUrl}/api/ask-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      
      if (!res.ok) throw new Error("Failed to reach AI");
      const data = await res.json();
      setResponse(data.reply);
      setQuery("");
    } catch (error) {
      console.error(error);
      setResponse("Error connecting to the Command Center AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full relative group"
      >
        {/* Glow effect behind input */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500 flex-shrink-0"></div>
        
        <form 
          onSubmit={handleSubmit}
          className={cn(
            "relative flex items-center w-full rounded-2xl border p-2 shadow-2xl transition-all duration-300 z-10",
            "bg-white/90 border-gray-200/50 dark:bg-[#111]/90 dark:border-white/10 backdrop-blur-2xl"
          )}
        >
          <div className="pl-4 pr-3 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder="Ask AI to analyze your portfolio or fetch market data..."
            className="flex-grow bg-transparent border-none outline-none text-[15px] py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-medium tracking-wide disabled:opacity-50"
          />
          
          <button 
            type="submit"
            disabled={!query.trim() || isLoading}
            className={cn(
               "ml-2 p-3 rounded-xl flex items-center justify-center transition-all duration-200",
              query.trim() && !isLoading
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-600 hover:scale-105 active:scale-95 cursor-pointer" 
                : "bg-gray-100/50 text-gray-400 dark:bg-white/5 dark:text-gray-500"
            )}
          >
            {query.trim() ? <Send className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </form>
      </motion.div>
      
      {/* AI Response Area */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-[95%] mx-auto mt-4 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/80 dark:bg-indigo-950/20 backdrop-blur-md shadow-lg shadow-indigo-500/5 text-sm font-medium text-indigo-900 dark:text-indigo-200"
          >
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">{response}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
