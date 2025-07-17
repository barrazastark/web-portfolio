"use client";

import React, { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import {
  ShoppingBasket,
  Banknote,
  MailOpen,
ClipboardList,
  Settings,
  Ticket,
  UserCheck,
  UsersRound as Users,
  ChevronDown as ChevronDownIcon,
  Bell,
  Plus,
  Menu as MenuIcon, X as CloseIcon,
  ChevronLeft, ChevronRight,
  Check,ThumbsUp, MessageCircle, Clock,
MoreHorizontal,
XIcon as X,
User
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { twMerge as cn } from "tailwind-merge";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import * as Select from "@radix-ui/react-select";
import * as Avatar from "@radix-ui/react-avatar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const items = [
    { href: "/", icon: <Users />, label: "Community" },
    { href: "/", icon: <Banknote />, label: "Invoices" },
    { href: "/", icon: <MailOpen />, label: "Messages" },
    { href: "/", icon: <Ticket />, label: "Tickets" },
    { href: "/", icon: <Settings />, label: "Settings" },
  ];

const messagesToRead = [
  "1- Hi, do not forget to submit your report!",
  "2- Reminder: Your booking is tomorrow at 3 PM",
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [messagesReaded, setMessagesReaded] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  

  const handleModal = () => {
    setShowMessagesModal(prev => !prev);
    if (showMessagesModal) {
      setMessagesReaded(true);
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster richColors position="top-center" />
      <TooltipProvider>
        <div className={`min-h-screen flex bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white ${inter.className}`}>
          <DesktopSidebar className="hidden md:flex" />

          <button
            className="fixed top-4 left-4 z-50 flex md:hidden items-center justify-center w-10 h-10 rounded bg-white dark:bg-zinc-900 shadow-md"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1">
            <div className="bg-white dark:bg-zinc-900 py-4 px-16 ">
              <div className="flex items-center justify-end w-full gap-4">
                <ShoppingBasket className="w-5 h-5" />
                <ClipboardList className="w-5 h-5" />
                <Bell className="w-5 h-5" />
                <AvatarSelectNav />
              </div>
              
            </div>
<header className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 px-16 py-8 border-t border-gray-100 dark:border-zinc-700">
  <div>
    <h1 className="text-2xl font-semibold">Hello Jose,</h1>
    <p className="text-gray-500 dark:text-gray-400">
      This is what we&#39;ve got for you today.
    </p>
  </div>
  <button
    onClick={() => setShowManageModal(true)}
    className="flex items-center gap-2 bg-[#1d4ed8] hover:bg-blue-700 hover:shadow-md hover:ring-2 hover:ring-blue-200 text-white px-3 py-2 rounded text-sm font-medium transition-all duration-200 ease-in-out w-full sm:w-auto"
  >
    <Plus className="w-4 h-4 shrink-0" />
    <span className="truncate">Manage Bookings</span>
  </button>
</header>

            <div className="px-16 pb-8">

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard icon={<UserCheck className="w-16 h-16 bg-white dark:bg-zinc-800"  />} title="Members onsite" value="26" subValue="/88" />
                <MetricCard icon={<Banknote className="w-16 h-16 bg-white dark:bg-zinc-800"/>} title="Unpaid Invoices" value="4" />
                <MetricCard onClick={handleModal} withAction={!messagesReaded} icon={<MailOpen  className="w-16 h-16 bg-white dark:bg-zinc-800"/>} title="Unread Messages" value={messagesReaded ? "0" : "2"} />
                <MetricCard icon={<Ticket className="w-16 h-16 bg-white dark:bg-zinc-800"/>} title="Your Tickets" value="6" />
              </section>

        
              <section className="mt-12 border-b border-gray-300 pb-6">
                <SectionHeader title="Upcoming bookings" link="See all (14)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <BookingCard
                    room="HDMI Room"
                    types={["Small meeting room", "Otro"]}
                    time="29 Nov 2020, 03:30pm - 31 Nov 07:00pm"
                    status="Pending"
                    services={["Projector (2)", "Catering"]}
                    color="#f97316"
                  />
                  <BookingCard
                    room="RJ-45 Room"
                    types={["Small meeting room", "Boardroom"]}
                    time="29 Nov 2020, 03:30pm - 31 Nov 07:00pm"
                    status="Confirmed"
                    services={["Catering"]}
                    color="#eab308"

                  />
                  <BookingCard
                    room="HJ-11 Hot Desk"
                    types={["Hot Desk", "Wi-fi"]}
                    color="#ef4444"
                    time="29 Nov 2020, 03:30pm - 31 Nov 07:00pm"
                    status="Confirmed"
                    services={["Catering"]}
                  />
                </div>
              </section>

            
              <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 pt-6 min-h-[250px]">
                
                <div className="h-full flex flex-col ">
                  <SectionHeader title="Upcoming events" />
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 h-full">
                    <EventCard
                      imageUrl="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=500"
                      title="Design Update #20 — Talking Damon Heart"
                      time="29 Nov 2020, 03:30pm"
                      attendees="182"
                      price="$50.00"
                     
                    />
                    <EventCard
                      imageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=500"
                      title="Company meetup — Project Management Workshop #1"
                      time="8 Jan 2021, 08:30am"
                      attendees="220"
                      price="Tickets bought"
                    
                    />
                  </div>
                </div>

                <div className="h-full flex flex-col">
                  <SectionHeader title="Hottest discussion boards" />
                  <div className="flex flex-1">
                    <DiscussionCard
                      name="Michaela Walton"
                      message="I think we need to integrate an outdoor pool in our backyard lounge area..."
                      likes={91}
                      replies={27}
                    
                    />
                  </div>
                </div>
              </section>




            </div>
          </main>
          {showMessagesModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <div className="bg-white dark:bg-zinc-900 text-black dark:text-white w-full max-w-md md:rounded-lg shadow-lg overflow-hidden md:w-[500px] transition-colors duration-300">
                <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-zinc-700">
                  <h2 className="text-lg font-semibold dark:text-white">Unread Messages</h2>
                  <button
                    onClick={handleModal}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label="Close unread messages modal"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-thumb-rounded">
                  {messagesToRead.map((m, i) => (
                    <p key={i} className="bg-gray-100 dark:bg-zinc-800 p-2 rounded break-words">
                      {m}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showManageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-zinc-900 text-black dark:text-white w-full max-w-lg rounded-lg shadow-lg">
        
              <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-zinc-700">
                <h2 className="text-lg font-semibold">Add New Booking</h2>
                <button
                  onClick={() => setShowManageModal(false)}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

        
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("New booking added!");
                  setShowManageModal(false);
                }}
                className="p-4 space-y-4"
              >
                <div>
                  <label className="block text-sm mb-1">Room Name</label>
                  <input
                    name="room"
                    type="text"
                    required
                    className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-sm mb-1">Start Time</label>
                    <input
                      name="start"
                      type="datetime-local"
                      required
                      className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm mb-1">End Time</label>
                    <input
                      name="end"
                      type="datetime-local"
                      required
                      className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Services (comma-separated)</label>
                  <input
                    name="services"
                    type="text"
                    placeholder="e.g. Catering, Projector"
                    className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Add Booking
                </button>
              </form>
            </div>
          </div>
        )}

        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

function AvatarSelectNav() {
  

  return (
    <nav className="flex justify-end">
      <Select.Root>
        <Select.Trigger
          className="inline-flex items-center  bg-white dark:bg-zinc-900 p-1 "
          aria-label="User menu"
        >
          <Avatar.Root className="inline-flex h-8 w-8 mr-2 select-none items-center justify-center overflow-hidden rounded-full bg-gray-200">
            <Avatar.Image
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&auto=format&fit=crop"
              alt="User Avatar"
            />
            <Avatar.Fallback
              className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-600"
              delayMs={600}
            >
              JD
            </Avatar.Fallback>
          </Avatar.Root>
          <span>Jose</span>
          <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-600 text-dark dark:text-white" />
        </Select.Trigger>

        <Select.Content
          className="z-50 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport>
            <Select.Item
              value="logout"
              className="relative flex cursor-pointer select-none items-center rounded-md hover:rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </nav>
  );
}

function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {

  return (
    <>
   
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

   
      <aside
        className={`fixed top-0 left-0 z-50 w-full h-[320px] transform bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        } shadow-lg rounded-b-lg`}
      >
      
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
            <CloseIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="px-4 py-4 space-y-2 overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              item.label === "Community"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
            )}
            >
              <div className="mr-3">{item.icon}</div>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}



type DesktopSidebarProps = {
  className?: string;
};

export function DesktopSidebar({ className }: DesktopSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "flex flex-col bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 transition-all duration-300",
        isExpanded ? "w-64" : "w-16",
        className
      )}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {items.map((item) => (
          <Tooltip.Provider key={item.label}>
            <Tooltip.Root delayDuration={300}>
              <Tooltip.Trigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isExpanded ? "justify-start gap-3" : "justify-center",
                    item.label === "Community"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  )}
                >
                  {item.icon}
                  {isExpanded && <span>{item.label}</span>}
                </Link>
              </Tooltip.Trigger>

              {!isExpanded && (
                <Tooltip.Content
                  side="right"
                  align="center"
                  className="z-50 rounded bg-black px-2 py-1 text-xs text-white shadow-lg"
                >
                  {item.label}
                  <Tooltip.Arrow className="fill-black" />
                </Tooltip.Content>
              )}
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </nav>
    </aside>
  );
}


function MetricCard({
  icon,
  title,
  value,
  subValue,
  withAction = false,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subValue?: string;
  withAction?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={withAction ? onClick : undefined}
      role={withAction ? "button" : undefined}
      tabIndex={withAction ? 0 : -1}
      onKeyDown={(e) => {
        if (withAction && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          if(onClick) {
            onClick();
          }
        }
      }}
      className={`
        relative bg-white dark:bg-zinc-800 px-5 py-6 rounded-lg shadow-md
        ${withAction ? "cursor-pointer" : ""}
        group transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
    >
      <div className="flex items-center gap-2">
        <p
          className={`
            text-sm font-semibold text-black dark:text-white
            ${withAction ? "group-hover:underline" : ""}
            flex items-center gap-1 select-none
          `}
        >
          {title}
          {withAction && <ChevronRight className="w-4 h-4" />}
        </p>
      </div>

      <p className="text-5xl py-4 font-semibold text-gray-900 dark:text-white flex items-baseline gap-2">
        {value}
        {subValue && (
          <span className="text-base text-gray-500 dark:text-gray-400 font-normal">
            {subValue}
          </span>
        )}
      </p>

      <div className="absolute bottom-4 right-4 rounded-full text-blue-600 dark:text-blue-400">
        {icon}
      </div>
    </div>
  );
}




function SectionHeader({ title, link }: { title: string; link?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      {link && <a href="#" className="text-sm  dark:text-blue-400 hover:underline">{link}</a>}
    </div>
  );
}

function ActionMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      event.target instanceof Node &&
      !menuRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-600 dark:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open actions menu"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40
            bg-white dark:bg-zinc-700
            rounded shadow-lg z-10 text-sm
            text-gray-800 dark:text-white
            ring-1 ring-black ring-opacity-20
            dark:ring-white dark:ring-opacity-20
            focus:outline-none
            transition ease-out duration-150
          "
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          {["View details", "Add", "Edit"].map((item) => (
            <button
              key={item}
              className="
                block w-full text-left px-4 py-2
                hover:bg-gray-100 dark:hover:bg-zinc-600
                focus:bg-gray-200 dark:focus:bg-zinc-700
                focus:outline-none
                transition-colors duration-150
              "
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                setOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}



function BookingCard({
  room,
  time,
  status,
  services,
  types = [],
  color = "#1d4ed8",
}: {
  room: string;
  time: string;
  status: "Pending" | "Confirmed";
  services: string[];
  types?: string[];
  color?: string;
}) {
  const statusStyles =
    status === "Pending"
      ? {
          badge:
            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
          icon: <Clock className="w-4 h-4 mr-1" />,
          tooltip: "Not yet been confirmed",
        }
      : {
          badge:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          icon: <Check className="w-4 h-4 mr-1" />,
          tooltip: "This booking is ready",
        };

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm flex flex-col h-full">
  
      <div
        className="flex justify-between items-start mb-4 pl-2"
        style={{ borderLeft: `3px solid ${color}` }}
      >
        <div>
          <h3 className="font-semibold text-black dark:text-white mb-2">
            {room}
          </h3>
          <div className="flex flex-wrap gap-1">
            {types.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium dark:bg-zinc-700 dark:text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <ActionMenu />
      </div>

<div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
  <div className="flex items-center justify-between mb-1">
    <div className="flex flex-col text-left max-w-[30%]">
      <span>Start Time</span>
      <span className="text-sm text-black dark:text-white truncate">{time.split("-")[0]}</span>
    </div>

    <div className="flex items-center justify-center mx-2">
      <ChevronRight className="w-4 h-4 text-black dark:text-white" />
    </div>

    <div className="flex flex-col text-left max-w-[30%]">
      <span>End Time</span>
      <span className="text-sm text-black dark:text-white truncate">{time.split("-")[1]}</span>
    </div>
  </div>
</div>









      <div className="flex-grow" />

      <div className="flex justify-between items-center mt-2 relative">
  
  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 gap-2">
    <Plus className="w-4 h-4" />
    <span>{services.join(", ")}</span>
  </div>

  <div className="relative group inline-flex cursor-default items-center">
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        statusStyles.badge
      )}
    >
      {statusStyles.icon}
      {status}
    </span>

    <div
  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
             opacity-0 group-hover:opacity-100 transition-opacity duration-200
             pointer-events-none
             bg-black text-white text-sm rounded-md px-3 py-2 max-w-[220px] text-center
             dark:bg-white dark:text-black
             z-10 leading-snug break-words"
>
  {statusStyles.tooltip}
</div>
  </div>
</div>

    </div>
  );
}






function EventCard({
  imageUrl,
  title,
  time,
  attendees,
  price,
}: {
  imageUrl: string;
  title: string;
  time: string;
  attendees: string;
  price: string;
}) {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; attendees: number } | null>(null);
  const [buyerName, setBuyerName] = useState("");

  return (
    <>
      <div className="flex flex-col h-full lg:flex-row bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
        
        <div className="w-full lg:w-1/3 h-48 lg:h-auto max-[760px]:hidden">
          <img
            src={imageUrl}
            alt="event"
            className="w-full h-full object-cover"
          />
        </div>

       
        <div className="w-full lg:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedEvent({ title, attendees: parseInt(attendees) });
                setEventModalOpen(true);
              }}
              className="block font-semibold text-black dark:text-white mb-2 hover:underline text-md"
            >
              {title}
            </Link>

            <p className="text-xs text-gray-500 dark:text-gray-400">Start Time</p>
            <p className="text-sm text-black dark:text-white mb-4">{time}</p>
          </div>

          <div className="flex justify-between items-center text-sm mt-auto">
            <button
              type="button"
              className="flex items-center text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="Attendees"
            >
              <Users className="w-4 h-4 mr-1" />
              {attendees}
            </button>

            {price === "Tickets bought" ? (
              <span className="inline-flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium dark:bg-zinc-700 dark:text-gray-300 truncate max-w-[60%] md:max-w-none">
                <Check className="w-4 h-4 shrink-0" />
                <span className="truncate">{price}</span>
              </span>
            ) : (
              <span className="text-black dark:text-white font-semibold">
                {price}
              </span>
            )}
          </div>
        </div>
      </div>

   
      {eventModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white w-full max-w-md md:rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-zinc-700">
              <h2 className="text-lg font-semibold">{selectedEvent.title}</h2>
              <button
                onClick={() => setEventModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!buyerName.trim()) return;
                  setSelectedEvent((prev) =>
                    prev ? { ...prev, attendees: prev.attendees + 1 } : prev
                  );
                  setBuyerName("");
                  setEventModalOpen(false);
                  toast.success("Ticket buyed successfully!");
                }}
              >
                <label className="block text-sm mb-2">Your Name</label>
                <input
                  name="name"
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                  required
                />
                <button
                  disabled={!buyerName.trim()}
                  type="submit"
                  className={`mt-4 w-full font-semibold py-2 px-4 rounded transition-all ${
                    buyerName.trim()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Buy Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}






function DiscussionCard({
  name,
  message,
  likes,
  replies,
}: {
  name: string;
  message: string;
  likes: number;
  replies: number;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  type Reply = {
    id: number;
    name: string;
    message: string;
    timestamp: string;
  };

  const repliesMessages: Reply[] = [
    {
      id: 1,
      name: "Alice",
      message: "Great points, I totally agree with the idea!",
      timestamp: "2025-06-24 14:35",
    },
    {
      id: 2,
      name: "Bob",
      message: "Could you elaborate more on the second paragraph?",
      timestamp: "2025-06-24 15:12",
    },
    {
      id: 3,
      name: "Carol",
      message: "I found this discussion really helpful, thanks!",
      timestamp: "2025-06-24 15:45",
    },
  ];

  return (
    <>
  
      <div
        onClick={() => setModalOpen(true)}
        className="group bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm flex flex-col justify-between h-full cursor-pointer
                  hover:shadow-md transition-shadow duration-200"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setModalOpen(true);
          }
        }}
        aria-label={`Open discussion details for ${name}`}
      >
     
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                name
              )}&background=random`}
              alt={name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">{name}</p>
          </div>

          <p className="block text-xl font-semibold text-black dark:text-white text-sm mb-4 line-clamp-3 group-hover:underline">
            {message}
          </p>
        </div>

        
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-1 rounded px-2 py-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 ease-in-out"
              aria-label="Likes"
              onClick={(e) => e.stopPropagation()}
            >
              <ThumbsUp className="w-4 h-4" />
              {likes}
            </button>

            <button
              type="button"
              className="flex items-center gap-1 rounded px-2 py-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 ease-in-out"
              aria-label="Replies"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="w-4 h-4" />
              {replies}
            </button>
          </div>
        </div>
      </div>


      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setModalOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-labelledby="discussion-modal-title"
          aria-describedby="discussion-modal-desc"
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2
                  id="discussion-modal-title"
                  className="text-2xl font-bold text-black dark:text-white"
                >
                  Discussion by {name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on June 24, 2025 at 2:30 PM
                </p>
              </div>
            </div>

            <p
              id="discussion-modal-desc"
              className="mb-6 text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
            >
              {message}
            </p>

            <div className="flex gap-6 mb-6 text-gray-600 dark:text-gray-400">
              <button
                type="button"
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none"
                aria-label="Like discussion"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{likes} Likes</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none"
                aria-label="Reply to discussion"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{replies} Replies</span>
              </button>
            </div>
<div>
  <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
    Replies
  </h3>
  {repliesMessages.length === 0 && (
    <p className="text-gray-500 dark:text-gray-400">No replies yet.</p>
  )}
  <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
    {repliesMessages.map((reply) => (
      <li
        key={reply.id}
        className="bg-gray-100 dark:bg-zinc-800 rounded p-4 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <p className="font-semibold text-black dark:text-white">
            {reply.name}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            {reply.timestamp}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {reply.message}
        </p>
      </li>
    ))}
  </ul>
  
  <button
    type="button"
    onClick={() => {}}
    className="mt-3 block w-full text-center text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
  >
    Show more replies
  </button>
</div>

            
          </div>
        </div>
      )}
    </>
  );
}