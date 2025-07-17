'use client';

import React, { useState, ReactNode } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
  TooltipProps
} from 'recharts';
import {
  Home, LineChart as LineChartIcon, Search, Calendar, Bot,
  Settings, LogOut, Menu, X, Maximize, TrendingUp, User,
  WalletMinimal,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { toast, Toaster } from 'sonner';
import { PieLabelRenderProps } from 'recharts/types/polar/Pie';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Orbitron, Inter } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-orbitron',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});


const COLORS = ['#34D399', '#F97316', '#3B82F6'];

const formatYAxisLabel = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
};

const salesData = [
  { month: 'Jan', thisYear: 52000, lastYear: 40000 },
  { month: 'Feb', thisYear: 72000, lastYear: 50000 },
  { month: 'Mar', thisYear: 58000, lastYear: 42000 },
  { month: 'Apr', thisYear: 68000, lastYear: 48000 },
  { month: 'May', thisYear: 95000, lastYear: 55000 },
  { month: 'Jun', thisYear: 91000, lastYear: 60000 },
];

const revenueData = [
  { month: 'Jan', thisYear: 2, lastYear: 3 },
  { month: 'Feb', thisYear: 4, lastYear: 3.5 },
  { month: 'Mar', thisYear: 5, lastYear: 4 },
  { month: 'Apr', thisYear: 6.5, lastYear: 1.8 },
  { month: 'May', thisYear: 5.5, lastYear: 2 },
  { month: 'Jun', thisYear: 6, lastYear: 2.2 },
];

const ageRangeData = [
  { name: '18-25', value: 50 },
  { name: '25-40', value: 30 },
  { name: '40-55', value: 20 },
];

const incomeData = [
  { name: 'Mar', value: 30000 },
  { name: 'Apr', value: 60000 },
  { name: 'May', value: 90000 },
  { name: 'Jun', value: 75000 },
];

type CustomTooltipProps = TooltipProps<ValueType, NameType> & {
  isCurrency?: boolean;
  isPercentage?: boolean;
};


const CustomTooltip = ({ active, payload, label, isCurrency = false, isPercentage = false }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className={`bg-zinc-800 text-white text-xs p-3 rounded shadow-lg border border-zinc-700 ${inter.className}`}>
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => {
          let formattedValue = entry.value;

          if (typeof formattedValue === 'number') {
            if (isCurrency) {
              formattedValue = `$${formattedValue.toLocaleString()}`;
            } else if (isPercentage) {
              formattedValue = `${formattedValue}%`;
            }
          }

          return (
            <p key={`item-${index}`} className="capitalize">
              <span
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}:{' '}
              <span className="font-semibold">{formattedValue}</span>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};



const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  const ir = typeof innerRadius === 'number' ? innerRadius : parseFloat(innerRadius || '0');
  const or = typeof outerRadius === 'number' ? outerRadius : parseFloat(outerRadius || '0');
  const radius = ir + (or - ir) * 0.5;
  const x = (typeof cx === 'number' ? cx : parseFloat(cx || '0')) + radius * Math.cos(-midAngle * RADIAN);
  const y = (typeof cy === 'number' ? cy : parseFloat(cy || '0')) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-md font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const navItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Home' },
  { icon: <LineChartIcon className="w-5 h-5" />, label: 'Analytics' },
  { icon: <Search className="w-5 h-5" />, label: 'Search' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
];



const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <div>
    <div
      className={cn(
        'fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      onClick={onClose}
    />
    <aside
  className={cn(
    'fixed top-0 left-0 z-50 bg-[#0a2120] text-white w-64 h-screen transform transition-transform duration-300 md:static md:w-16 md:h-screen md:translate-x-0 flex flex-col justify-between py-6 px-4 md:px-2',
    isOpen ? 'translate-x-0' : '-translate-x-full'
  )}
>


      <div className="flex flex-col md:items-center space-y-2">
        <button className="absolute top-4 right-4 md:hidden" onClick={onClose}>
          <X className="w-5 h-5 text-white" />
        </button>
        <img src="https://plus.unsplash.com/premium_photo-1739538269098-5920918f31a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJvYm90JTIwYXZhdGFyfGVufDB8fDB8fHww" alt="AI" className="w-8 h-8 mt-2 rounded-full mx-auto md:mx-0" />
        {navItems.map((item, i) => (
  <Tooltip.Provider delayDuration={200} key={i}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          className="group flex md:justify-center md:flex-col gap-2 text-xs hover:text-green-400 cursor-pointer w-full p-8 items-center"
          onClick={() => toast.info(`${item.label} feature not implemented yet`)}
        >
   
          <div className="hidden md:block">{item.icon}</div>
          <div className="block md:hidden">{item.icon}</div>
          <span className="block md:hidden text-[11px] text-left">{item.label}</span>
        </button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content
          className="hidden md:block bg-zinc-800 text-white text-xs px-3 py-1 rounded shadow-md z-50"
          side="right"
          sideOffset={8}
        >
          {item.label}
          <Tooltip.Arrow className="fill-zinc-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
))}

      </div>
      <Tooltip.Provider delayDuration={200}>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <button
        className="group flex md:justify-center md:flex-col gap-2 text-xs hover:text-red-400 cursor-pointer items-center w-full"
        onClick={() => toast.info('Logout feature not implemented yet')}
      >
        <div className="hidden md:block">
          <LogOut className="w-5 h-5" />
        </div>
        <div className="block md:hidden">
          <LogOut className="w-5 h-5" />
        </div>
        <span className="block md:hidden text-[11px]">Logout</span>
      </button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content
        className="hidden md:block bg-zinc-800 text-white text-xs px-3 py-1 rounded shadow-md z-50"
        side="right"
        sideOffset={8}
      >
        Logout
        <Tooltip.Arrow className="fill-zinc-800" />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
    </aside>
  </div>
);

const TopBar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4 pt-6 pb-4 bg-zinc-950 text-white">


    <div className="flex items-center justify-between w-full flex-wrap gap-4">
    
      <button onClick={onMenuClick} className="md:hidden">
        <Menu className="w-5 h-5 text-white" />
      </button>


      <div className="flex flex-1 justify-center gap-2 overflow-x-auto scrollbar-none">
        {['Analytics', 'Data', 'Reports'].map((label) => (
          <button
            key={label}
            className={cn(
              'px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-all',
              label === 'Analytics'
                ? 'bg-gradient-to-br from-[#0a2120] to-[#112f2d]/90 text-white border border-white/5 shadow-sm backdrop-blur-sm'
                : 'bg-white/10 text-white/70 hover:text-white'
            )}
            onClick={() => toast.info(`${label} feature not implemented yet`)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>

  </div>
);


const Card = ({
  title,
  children,
  className = '',
  expandable = true,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
  children: ReactNode;
  className?: string;
  expandable?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div
  className={cn(
    'relative rounded-[24px] p-6 md:p-8 text-white shadow-xl bg-gradient-to-br from-[#0a2120] to-[#112f2d]/90 border border-white/5 backdrop-blur-sm',
    className
  )}
>


        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
  {icon && (
  <div className="w-7 h-7 mr-2 flex items-center justify-center rounded-full border border-white text-white">
    {icon}
  </div>
)}

  <h3 className={`text-lg md:text-xl font-semibold ${orbitron.className}`}>{title}</h3>

</div>
          {expandable && (
            <Dialog.Trigger asChild>
              <button className="text-zinc-400 hover:text-white transition">
                <Maximize className="w-4 h-4" />
              </button>
            </Dialog.Trigger>
          )}
        </div>
        {children}

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
         <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 bg-[#0a2120] rounded-xl p-6 shadow-xl">
  <div className="flex justify-between items-center mb-4">
    <Dialog.Title asChild>
      <h2 className={`text-xl md:text-2xl font-bold text-white flex items-center gap-2 ${orbitron.className}`}>


        {icon && <span className="text-green-400">{icon}</span>}
        {title}
      </h2>
    </Dialog.Title>
    <Dialog.Close asChild>
      <button className="text-white hover:text-red-400">
        <X className="w-5 h-5" />
      </button>
    </Dialog.Close>
  </div>

  <Dialog.Description asChild>
    <p className="sr-only">Detailed visualization and data breakdown</p>
  </Dialog.Description>

  <div>{children}</div>
</Dialog.Content>


        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
};



const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalIncome = incomeData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className={`flex h-screen bg-zinc-950 ${inter.className}`}>
      <Toaster  position="top-center" />
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1 flex flex-col">
        <TopBar onMenuClick={() => setMenuOpen(true)} />
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-8 min-h-full auto-rows-fr">


            <Card className="md:col-span-2 lg:col-span-1" icon={<Bot className="w-4 h-4" />} title="AI Assistant" expandable={false}>
              <div className="flex flex-col items-center px-2 text-center">
  <img
  src="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV1cm9uYWwlMjBuZXR3b3JrfGVufDB8fDB8fHww"
  alt="AI Assistant"
  className="w-32 h-32 rounded-full object-cover shadow-md"
/>
  
  <button onClick={() => toast.info(`Feature not implemented yet`)} className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-full px-5 py-2 mt-6 shadow-md transition">
    Try Now
  </button>
  
  <p className={`text-md mt-5 text-zinc-300 leading-relaxed max-w-xs ${inter.className}`}>
    Unlock insights powered by AI. Analyze product sales, revenue growth, and customer trends across your brand.
  </p>
</div>

            </Card>

            <Card icon={<Activity className="w-4 h-4" />} title="Sales Data Summary" className="md:col-span-2">
              <div className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart margin={{ top: 20, right: 0, left: 0, bottom: 0 }} data={salesData}>
                  <XAxis  tick={{
                    dy: 8,
                    dx: 8
                  }} dataKey="month" stroke="#ccc" axisLine={false} tickLine={false} />
                  <YAxis tick={{ dx: -8 }} stroke="#ccc" tickFormatter={formatYAxisLabel} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip isCurrency/>} />
                  <Line type="monotone" dataKey="thisYear" stroke="#22C55E" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="lastYear" stroke="#F97316" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
              </div>
            </Card>

            <Card icon={<TrendingUp className="w-4 h-4" />} title="Market Revenue">
  <div className="mt-4">
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={revenueData}
        margin={{ top: 20, right: 20, left: 0, bottom: 30 }} 
      >
        <XAxis
          dataKey="month"
          stroke="#ccc"
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ dx: -36 }} 
          stroke="#ccc"
          axisLine={false}
          tickLine={false}
        />
        <RechartsTooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="thisYear"
          stroke="#34D399"
          strokeWidth={3}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="lastYear"
          stroke="#F59E0B"
          strokeWidth={3}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>

    <div className="flex items-center justify-between mt-3">
      <p className="text-lg font-semibold text-white">+248% Increase</p>
      <div className="flex gap-3 text-md text-white/90">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-emerald-400 rounded-full" />
          <span>This Year</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-amber-400 rounded-full" />
          <span>Last Year</span>
        </div>
      </div>
    </div>
  </div>
</Card>



            <Card icon={<WalletMinimal className="w-4 h-4" />} title="Total Income">
        
  <div className="text-4xl md:text-4xl font-bold text-center my-4">${totalIncome.toLocaleString()}</div>

  <ResponsiveContainer width="100%" height={250}>
    <BarChart  data={incomeData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
      <XAxis  dataKey="name" stroke="#ccc" axisLine={false} tickLine={false} />
      <YAxis  tick={{ dx: -8 }} stroke="#ccc" tickFormatter={formatYAxisLabel} axisLine={false} tickLine={false} />
      <RechartsTooltip  cursor={{fill: 'transparent'}} content={<CustomTooltip isCurrency/>} />
      <Bar
        dataKey="value"
        fill="#22C55E"
        radius={[24, 24, 24, 24]}
      
         className="transition-all duration-200 hover:fill-green-400  origin-bottom"
    
      />
      
    </BarChart>
  </ResponsiveContainer>
</Card>


           <Card icon={<User className="w-4 h-4" />} title="Age Range">
  <div className="w-full flex flex-col items-center justify-center">
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <RechartsTooltip content={<CustomTooltip isPercentage />} />
        <Pie
          data={ageRangeData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {ageRangeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>

   
    <div className="flex justify-between w-full  mt-4 text-sm text-white">
      {ageRangeData.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          />
          <span className="text-zinc-300">{entry.name}</span>
        </div>
      ))}
    </div>
  </div>
</Card>


          </div>
        </div>
      </main>
    </div>
  );
};



export default Dashboard;
