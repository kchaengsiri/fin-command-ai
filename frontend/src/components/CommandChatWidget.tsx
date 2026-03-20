import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { RightDrawer } from './RightDrawer';

export const CommandChatWidget = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    
    const userMsg = query;
    setIsLoading(true);
    setQuery("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsDrawerOpen(true);
    
    try {
      let apiUrl = "http://localhost:8000";
      if (typeof import.meta.env.VITE_API_URL !== "undefined") {
          apiUrl = import.meta.env.VITE_API_URL;
      }
      
      const res = await fetch(`${apiUrl}/api/ask-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      
      if (!res.ok) throw new Error("Failed to reach AI");
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "Error connecting to the Command Center AI." }]);
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
      
      {/* Slide-Over Drawer for Interactive Chat History */}
      <RightDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("flex flex-col w-full", msg.role === 'user' ? "items-end" : "items-start")}
          >
            <div className={cn(
              "max-w-[90%] p-4 rounded-xl text-sm/relaxed leading-relaxed text-left shadow-md",
              msg.role === 'user' 
                ? "bg-indigo-600 text-white rounded-tr-sm" 
                : "bg-slate-800 text-gray-200 border border-white/10 rounded-tl-sm ring-1 ring-white/5"
            )}>
              {msg.role === 'ai' ? (
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0 font-medium">
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }: any) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }: any) => <ul className="list-disc pl-5 mb-4 space-y-1.5" {...props} />,
                        ol: ({ node, ...props }: any) => <ol className="list-decimal pl-5 mb-4 space-y-1.5" {...props} />,
                        li: ({ node, ...props }: any) => <li className="marker:text-indigo-400" {...props} />,
                        strong: ({ node, ...props }: any) => <strong className="text-white font-semibold" {...props} />,
                        h1: ({ node, ...props }: any) => <h1 className="text-xl font-bold text-white mb-3" {...props} />,
                        h2: ({ node, ...props }: any) => <h2 className="text-lg font-bold text-white mb-3 mt-5" {...props} />,
                        h3: ({ node, ...props }: any) => <h3 className="text-base font-bold text-white mb-2" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col w-full items-start">
             <div className="max-w-[85%] p-4 rounded-xl rounded-tl-sm bg-slate-800/80 text-gray-200 border border-white/10 flex items-center gap-3 text-sm shadow-md">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" /> Thinking...
             </div>
          </motion.div>
        )}
      </RightDrawer>
    </div>
  );
};
