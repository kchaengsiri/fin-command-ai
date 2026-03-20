import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Send } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CommandChatWidget = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Just a mock skeleton for now
    console.log("Chat submitted:", query);
    setQuery("");
  };

  return (
    <div className="w-full flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full relative group"
      >
        {/* Glow effect behind input */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500"></div>
        
        <form 
          onSubmit={handleSubmit}
          className={cn(
            "relative flex items-center w-full rounded-2xl border p-2 shadow-2xl transition-all duration-300",
            "bg-white/90 border-gray-200/50 dark:bg-[#111]/90 dark:border-white/10 backdrop-blur-2xl"
          )}
        >
          <div className="pl-4 pr-3 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI to analyze your portfolio or fetch market data..."
            className="flex-grow bg-transparent border-none outline-none text-[15px] py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-medium tracking-wide"
          />
          
          <button 
            type="submit"
            disabled={!query.trim()}
            className={cn(
               "ml-2 p-3 rounded-xl flex items-center justify-center transition-all duration-200",
              query.trim() 
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-600 hover:scale-105 active:scale-95 cursor-pointer" 
                : "bg-gray-100/50 text-gray-400 dark:bg-white/5 dark:text-gray-500"
            )}
          >
            {query.trim() ? <Send className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
