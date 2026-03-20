import React from 'react';
import { MarketOverviewWidget } from './components/MarketOverviewWidget';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30">
      <header className="border-b border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none tracking-tighter">FC</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Fin Command AI</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full py-8">
        <MarketOverviewWidget />
      </main>
    </div>
  );
}

export default App;
