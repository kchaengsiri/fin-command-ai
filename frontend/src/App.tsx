import { MarketOverviewWidget } from './components/MarketOverviewWidget';
import { PortfolioWidget } from './components/PortfolioWidget';
import { CommandChatWidget } from './components/CommandChatWidget';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080808] font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 flex flex-col pb-36">
      <header className="border-b border-slate-200/50 dark:border-white/5 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none tracking-tighter">FC</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Fin Command AI</h1>
          </div>
          <div className="flex items-center space-x-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <span>Terminal V1.0</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        <MarketOverviewWidget />
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent"></div>
        
        <PortfolioWidget />
      </main>

      {/* Floating AI Command Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-50 bg-gradient-to-t from-slate-50/90 via-slate-50/50 to-transparent dark:from-[#080808]/90 dark:via-[#080808]/50 dark:to-transparent pb-8 pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <CommandChatWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
