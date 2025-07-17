'use client';

import React, { useState, useEffect } from 'react';
import { Bangers, Roboto } from 'next/font/google';
import { cn } from '@/lib/utils';
import { RefreshCcw, Bell, Settings } from 'lucide-react';
import { toast, Toaster } from "sonner";

const bangers = Bangers({ subsets: ['latin'], weight: '400' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

const symbols = [
  '🍀',      
  '💰',     
  '🪙',      
  '🔔',      
  '💎',     
  '🍒',     
  '👑',      
  '⭐',      
  '🎁',      
];
const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

const getSymbolGlow = (symbol: string) => {
  switch (symbol) {
    case '💰':
    case '🪙':
      return 'text-yellow-300 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]';
    case '🔔':
      return 'text-orange-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]';
    case '🍀':
      return 'text-green-300 drop-shadow-[0_0_6px_rgba(132,204,22,0.8)]';
    case '💎':
    case '⭐':
      return 'text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]';
    case '🎁':
      return 'text-pink-300 drop-shadow-[0_0_6px_rgba(236,72,153,0.7)]';
    case '🍒':
      return 'text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.8)]';
    case '👑':
      return 'text-yellow-200 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]';
    default:
      return 'text-white';
  }
};


const Reel = ({
  symbols,
  highlightSymbol,
  spinning,
  hasSpun,
}: {
  symbols: string[];
  highlightSymbol: string | null;
  spinning: boolean;
  hasSpun: boolean;
}) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-purple-900 to-purple-700 flex flex-col text-yellow-300 shadow-inner overflow-hidden">
      {symbols.map((symbol, i) => {
        const isWinning = symbol === highlightSymbol;
        const dimmed = hasSpun && !spinning && highlightSymbol && !isWinning;

        return (
          <div
            key={i}
            className={cn(
              'relative flex-1 w-full flex items-center justify-center transition-all duration-300 h-[100px]',
              'overflow-hidden',
              isWinning
                ? 'z-10 bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-600 text-black rounded border-4 border-yellow-300 shadow-inner animate-[pulse_5s_ease-in-out_infinite]'
                : 'bg-black/20 border border-black',
              dimmed && 'opacity-30 grayscale'
            )}
          >
           
            {isWinning && (
              <div className="absolute inset-[-3px] rounded border-4 border-yellow-300 blur-sm opacity-60 z-0 pointer-events-none animate-[pulse_5s_ease-in-out_infinite]" />
            )}

         
            {isWinning && (
              <div className="absolute inset-0 rounded-lg blur-2xl bg-blue-500 opacity-20 z-0 pointer-events-none animate-[pulse_5s_ease-in-out_infinite]" />
            )}

        
            <div className="relative z-10 flex items-center justify-center h-full">
              <span
                className={cn(
                  'transition-all duration-300 text-[48px] sm:text-[56px] lg:text-7xl',
                  'text-yellow-200',
                  'drop-shadow-[0_0_3px_black] drop-shadow-[0_0_6px_white] drop-shadow-[0_0_12px_rgba(0,191,255,0.8)]',
                  getSymbolGlow(symbol),
                  
                )}
              >
                {symbol}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};







export default function SlotMachine() {
  const [credits, setCredits] = useState(2000);
  const [bet, setBet] = useState(2);
  const [multiplier, setMultiplier] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [reelSymbols, setReelSymbols] = useState<string[][]>(
    Array(5).fill(null).map(() => Array(3).fill(''))
  );
  const [highlightSymbol, setHighlightSymbol] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);


  useEffect(() => {
    setReelSymbols(Array(5).fill(null).map(() => Array(3).fill(null).map(() => getRandomSymbol())));
  }, []);

  const spin = () => {
  if (spinning) return;
  setSpinning(true);
  setHighlightSymbol(null);

  const interval = setInterval(() => {
    setReelSymbols(() =>
      Array(5).fill(null).map(() => Array(3).fill(null).map(() => getRandomSymbol()))
    );
  }, 80);

  setTimeout(() => {
    clearInterval(interval);

    const final = Array(5).fill(null).map(() => Array(3).fill(null).map(() => getRandomSymbol()));
    setReelSymbols(final);

    const flat = final.flat();
    const counts = flat.reduce((acc: Record<string, number>, s) => {
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    const possibleWin = Object.entries(counts).find(([, count]) => count >= 3);
    
    
    const shouldWin = Math.random() < 0.5; 
    const winSymbol = possibleWin && shouldWin ? possibleWin[0] : null;
    const winAmount = winSymbol ? bet * multiplier + 1 : 0;

    setHighlightSymbol(winSymbol);
    setCredits((prev) => prev - bet + winAmount);
    setSpinning(false);
    setHasSpun(true);

   
    if (!winSymbol) {
      toast.warning("No win this time. Try again!");
    } else {
      toast.success(`You won ${(winAmount - bet).toFixed(2)} credits!`);
    }
  }, 1000);
};





  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#2e026d] via-[#6d28d9] to-[#000000] text-white relative ">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-800 via-transparent to-black opacity-20 pointer-events-none z-0" />
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-600 via-transparent to-black opacity-20 pointer-events-none z-0" />
    <Toaster richColors />
<header className="sticky top-0 z-40   w-full flex items-center justify-between p-4 lg:px-8 bg-black/60 backdrop-blur-md border-b border-white/10">

  <div className={cn("text-3xl tracking-wide uppercase text-yellow-300", bangers.className)}>
    🎰 Gold Blitz
  </div>

  <div className="flex items-center gap-4 text-white">
    {[Bell, Settings].map((Icon, i) => (
      <button
        key={i}
        onClick={() => toast.info("🚧 Feature coming soon")}
        className="p-2 rounded hover:bg-white/10 transition"
      >
        <Icon className="w-6 h-6" />
      </button>
    ))}
    <img
      src="https://i.pravatar.cc/40"
      alt="Profile"
      className="w-10 h-10 rounded-full border-2 border-yellow-300 object-cover cursor-pointer"
      onClick={() => toast.info("🚧 Feature coming soon")}

    />
  </div>
</header>

      <main className={cn('flex flex-col lg:flex-row items-stretch flex-1', roboto.className)}>



   
        <aside className="w-full lg:w-[300px] bg-transparent p-8 space-y-4 flex flex-col items-center flex-shrink-0">
          <div className="w-full text-center relative">
            <div className="flex items-center justify-center gap-[2px] mb-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-4 h-6 transform -skew-x-[20deg] rotate-35 transition-all duration-300',
                    i < multiplier
                      ? 'bg-gradient-to-br from-yellow-400 via-red-500 to-yellow-600 shadow-md'
                      : 'bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 border border-purple-500 opacity-80'
                  )}
                />
              ))}
            </div>
            <div
              className="relative border-8 rounded-lg px-4 py-8 shadow-inner bg-black/40 mb-12"
              style={{
                borderImage: 'linear-gradient(to right, #facc15, #ec4899, #8b5cf6)',
                borderImageSlice: 1,
              }}
            >
              <p className={cn('text-5xl font-bold text-yellow-300 relative', bangers.className)}>{multiplier}x</p>
              <p className={cn('absolute left-1/2 translate-x-[-50%] -bottom-16 text-4xl text-white tracking-wide', bangers.className)}>BONUS MULTIPLIER</p>
            </div>
          </div>

         <div className="space-y-4 w-full text-center text-lg">


  <div className="relative w-full px-8 py-5 rounded-2xl border-4 border-yellow-500 bg-gradient-to-br from-yellow-300 via-orange-500 to-yellow-600 shadow-inner">
    <div className="relative z-10">
      <div className={cn(
        'text-5xl font-extrabold uppercase text-red-500',
        'drop-shadow-md drop-shadow-[0_0_10px_rgba(255,115,0,0.8)]',
        bangers.className
      )}>
        MEGA
      </div>
      <div className="text-4xl font-extrabold text-yellow-100 drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
        2,000.00
      </div>
    </div>
  </div>


  <div className="relative w-full px-8 py-5 rounded-2xl border-4 border-purple-500 bg-gradient-to-br from-purple-400 via-fuchsia-600 to-purple-800 shadow-inner">
    <div className="relative z-10">
      <div className={cn(
        'text-4xl font-extrabold uppercase text-fuchsia-200',
        'drop-shadow-md drop-shadow-[0_0_8px_rgba(192,38,211,0.8)]',
        bangers.className
      )}>
        MAJOR
      </div>
      <div className="text-3xl font-extrabold text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.6)]">
        200.00
      </div>
    </div>
  </div>

 
  <div className="relative w-full px-8 py-5 rounded-2xl border-4 border-green-400 bg-gradient-to-br from-green-300 via-emerald-500 to-green-800 shadow-inner">
    <div className="relative z-10">
      <div className={cn(
        'text-3xl font-extrabold uppercase text-lime-300',
        'drop-shadow-md drop-shadow-[0_0_8px_rgba(132,204,22,0.8)]',
        bangers.className
      )}>
        MINOR
      </div>
      <div className="text-3xl font-extrabold text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.6)]">
        20.00
      </div>
    </div>
  </div>


  <div className="relative w-full px-8 py-5 rounded-2xl border-4 border-cyan-400 bg-gradient-to-br from-sky-400 via-blue-500 to-blue-800 shadow-inner">
    <div className="relative z-10">
      <div className={cn(
        'text-2xl font-extrabold uppercase text-sky-200',
        'drop-shadow-md drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]',
        bangers.className
      )}>
        MINI
      </div>
      <div className="text-3xl font-extrabold text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.6)]">
        10.00
      </div>
    </div>
  </div>

</div>



        </aside>

       
       <section className="flex flex-col items-center p-8 lg:px-0 flex-grow">


          <h1 className={cn('text-6xl text-center font-extrabold mb-4', bangers.className)}>
  GOLD ⚡ BLITZ <span className="text-yellow-400">EXTREME</span>
</h1>
          <div
  className={cn(
    'w-full  h-full grid grid-cols-5 gap-[2px] items-stretch',
    'rounded-3xl p-2 relative z-10 overflow-hidden border-4 border-yellow-300',
    'bg-gradient-to-br from-black via-zinc-900 to-black',
    'shadow-[0_0_25px_#facc15,0_0_45px_#fde047,inset_0_0_15px_#8b5cf6]'
  )}
>
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="h-full">
                <Reel
  symbols={reelSymbols[idx]}
  highlightSymbol={highlightSymbol}
  spinning={spinning}
  hasSpun={hasSpun}
/>
              </div>
            ))}
          </div>
        </section>

    
        <aside className="w-full lg:w-[200px] bg-transparent p-8  space-y-3 flex flex-col items-center flex-shrink-0">

          <button
  disabled={credits < 10 || multiplier >= 10}
  onClick={() => {
    if (credits >= 10) {
      setCredits((prev) => prev - 10);
      setMultiplier((prev) => (prev < 10 ? prev + 1 : prev));
    }
  }}
  className={cn(
    'relative inline-block w-full px-6 py-3 mb-4 text-white text-2xl font-extrabold uppercase rounded-xl shadow-md transition-all duration-300',
    'bg-gradient-to-br from-[#ff004d] via-[#c60039] to-[#7f0025]',
    'border-4 border-[#ff3366]',
    'drop-shadow-[0_0_12px_rgba(255,0,85,0.9)] drop-shadow-[0_0_30px_rgba(255,0,85,0.5)]',
    'hover:brightness-125 hover:scale-105',
    'before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(circle,_rgba(255,255,255,0.4)_0%,_transparent_70%)] before:opacity-25 before:z-0',
    'after:absolute after:inset-0 after:rounded-xl after:bg-red-500/10 after:blur-xl after:opacity-20 after:z-0',
    bangers.className,
    (credits < 10 || multiplier >= 10) && 'opacity-50 cursor-not-allowed'
  )}
>
  <span className="relative z-10">BONUS BUY</span>
</button>


          <button
  onClick={() => setMultiplier(prev => Math.max(1, prev - 1))}
  className={cn(
    'mt-2 w-full px-4 py-2 rounded-xl text-md lg:text-sm font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition',
    bangers.className
  )}
>
  Decrease Multiplier
</button>
        </aside>
      </main>

  
      <section className="w-full px-2 p-8 flex flex-col sm:flex-row items-center justify-evenly gap-2"
>
       
        <div className="flex flex-col items-center px-12 py-1 rounded-full bg-white/10 text-white font-bold text-lg shadow-inner border border-white/20">
          <p className="text-lg tracking-wide text-white/80">CREDITS</p>
          <div className='text-3xl'>${credits.toFixed(2)}</div>
        </div>

     
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBet(Math.max(1, bet - 1))}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 shadow-inner font-bold text-xl flex items-center justify-center hover:scale-105 transition"
          >
            −
          </button>
          <div className="flex flex-col items-center px-12 py-1 rounded-full bg-white/10 text-white font-bold text-lg shadow-inner border border-white/20">
            <p className="text-xl text-white/70">BET</p>
            <div className='text-3xl'>${bet.toFixed(2)}</div>
          </div>
          <button
            onClick={() => setBet(bet + 1)}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 shadow-inner font-bold text-xl flex items-center justify-center hover:scale-105 transition"
          >
            +
          </button>
        </div>

     
        <button
  onClick={spin}
  disabled={spinning}
  className={cn(
    'relative w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold uppercase',
    'bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 text-black',
    'border-4 border-yellow-200',
    'transition-all duration-300 hover:scale-105',
    'drop-shadow-[0_0_10px_rgba(255,255,0,0.8)] drop-shadow-[0_0_20px_rgba(255,200,0,0.6)]',
    'hover:ring-4 hover:ring-yellow-300 hover:ring-offset-2 hover:ring-offset-black',
    bangers.className,
    spinning && 'opacity-60 cursor-not-allowed'
  )}
>
  {spinning ? (
    <RefreshCcw className="w-10 h-10 animate-spin z-10" />
  ) : (
    <span className="z-10">SPIN</span>
  )}


  {!spinning && (
    <div className="absolute inset-0 rounded-full bg-yellow-400 blur-xl opacity-30 animate-pulse z-0" />
  )}
</button>

      </section>
      <footer className="w-full text-center py-4 border-t border-yellow-400 bg-black/30 text-xs text-yellow-100 tracking-wide">
  <div className="flex flex-wrap justify-center items-center gap-4">
    {["Privacy Policy", "Terms of Service", "Support", "About"].map((label) => (
      <button
        key={label}
        onClick={() => toast("🚧 Feature coming soon")}
        className="hover:underline underline-offset-4 transition text-yellow-200 hover:text-yellow-300"
      >
        {label}
      </button>
    ))}
  </div>
  <p className="mt-2 text-[11px] text-yellow-300 opacity-80">
    © {new Date().getFullYear()} GOLD BLITZ EXTREME. All rights reserved.
  </p>
</footer>



    </div>
  );
}
