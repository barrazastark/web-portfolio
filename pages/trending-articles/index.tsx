'use client'

import { Home, Search, Bell, LogOut, Menu, ChevronDown, Heart, MessageSquareShare, X
  , Newspaper, Briefcase, Trophy, ChevronUp,

  ArrowRight
 } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast, Toaster } from 'sonner'



type NewsItem = {
  category: string
  title: string
  image: string
  content?: string;
}

const trendingNews: NewsItem[] = [
  {
    category: 'Top Stories',
    title: 'Tiger Woods, in a Stirring Return to the Top, Captures the Masters at 43',
    image: 'https://plus.unsplash.com/premium_photo-1721654789105-43ff4bb0a486?w=900&auto=format&fit=crop&q=60',
    content: 'In an emotional comeback, Tiger Woods stunned the world by winning the Masters at 43. This win marked a new chapter in his legendary career and inspired millions around the globe.'
  },
  {
    category: 'Top Stories',
    title: 'AI Beats Human Experts in Diagnosing Eye Diseases',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&auto=format&fit=crop&q=60',
    content: 'Artificial Intelligence continues to revolutionize healthcare, with new models outperforming human doctors in detecting various eye diseases in record time.'
  },
  {
    category: 'Top Stories',
    title: 'New Discoveries in Deep Space Reshape Our Understanding of the Universe',
    image: 'https://images.unsplash.com/photo-1604423203943-54721eff418a?w=900&auto=format&fit=crop&q=60',
    content: 'A team of astrophysicists has identified new galaxies that challenge existing theories, prompting scientists to rethink how the universe was formed.'
  },
  {
    category: 'For You',
    title: '10 Years After an Exercise Study, Benefits Persist',
    image: 'https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=900&auto=format&fit=crop&q=60',
    content: 'A decade-old fitness experiment proves that regular physical activity has long-lasting health benefits, improving heart health and mental well-being.'
  },
  {
    category: 'For You',
    title: 'Mindfulness Practices to Help You Focus and Feel Better',
    image: 'https://plus.unsplash.com/premium_photo-1666946131242-b2c5cc73892a?w=900&auto=format&fit=crop&q=60',
    content: 'Mindfulness techniques are gaining popularity as people seek natural methods to reduce stress, enhance focus, and boost productivity.'
  },
  {
    category: 'For You',
    title: 'How to Get Better Sleep: 8 Tips That Actually Work',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=900&auto=format&fit=crop&q=60',
    content: 'Experts share eight science-backed strategies to improve sleep hygiene and finally get the rest your body needs every night.'
  },
  {
    category: 'Your Topics',
    title: 'Buying a Tesla Seems Pretty Easy. But There Are a Few Things to Know.',
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=900&auto=format&fit=crop&q=60',
    content: 'Purchasing a Tesla involves a few nontraditional steps. Here’s what first-time buyers should know about pricing, service, and charging.'
  },
  {
    category: 'Your Topics',
    title: 'Oscar Predictions: Who Will Win Best Picture?',
    image: 'https://plus.unsplash.com/premium_photo-1684923604860-64e661f2ff72?w=900&auto=format&fit=crop&q=60',
    content: 'Critics and fans weigh in on this year’s top Oscar contenders, sparking debate around performances, direction, and storytelling.'
  },
  {
    category: 'Your Topics',
    title: 'The Rise of Electric Bikes and Urban Transportation',
    image: 'https://images.unsplash.com/photo-1617300991982-566870db0dbc?w=900&auto=format&fit=crop&q=60',
    content: 'Electric bikes are transforming cities by offering a fast, eco-friendly alternative to cars. Here’s how the trend is reshaping commutes.'
  },
  {
    category: 'Fact Check',
    title: 'What to cook this week, Top 15 Breakfast.',
    image: 'https://images.unsplash.com/photo-1708335583165-57aa131a4969?w=900&auto=format&fit=crop&q=60',
    content: 'Looking for breakfast inspiration? These 15 simple recipes will start your day off deliciously, with something for every taste.'
  },
  {
    category: 'Fact Check',
    title: 'No, That Viral Post About Free Flights Isn’t Real',
    image: 'https://plus.unsplash.com/premium_photo-1682092682812-252fc18e0f1a?w=900&auto=format&fit=crop&q=60',
    content: 'A viral social media post promising free international flights has been debunked by experts. Here’s what the post actually links to.'
  },
  {
    category: 'Fact Check',
    title: 'Separating Climate Change Myths from Reality',
    image: 'https://plus.unsplash.com/premium_photo-1669809948017-518b5d800d73?w=900&auto=format&fit=crop&q=60',
    content: 'We examine some of the most common misconceptions about climate change and provide science-backed facts to counter them.'
  },
  {
    category: 'More',
    title: 'Global Summit Discusses Climate Action Plans',
    image: 'https://images.unsplash.com/photo-1508976594853-a50fce4ad397?w=900&auto=format&fit=crop&q=60',
    content: 'World leaders met this week to agree on new goals for reducing carbon emissions and enhancing international cooperation.'
  },
  {
    category: 'More',
    title: 'Photography Tips for Capturing Amazing Landscapes',
    image: 'https://plus.unsplash.com/premium_photo-1674389991678-0836ca77c7f7?w=900&auto=format&fit=crop&q=60',
    content: 'Professional photographers share composition and lighting tricks to help you get the perfect landscape shot on your next trip.'
  },
  {
    category: 'More',
    title: 'Is Working Remotely Still the Future of Tech Jobs?',
    image: 'https://plus.unsplash.com/premium_photo-1664193968929-d9d9544296e0?w=900&auto=format&fit=crop&q=60',
    content: 'Remote work has redefined the tech industry, but challenges around collaboration and burnout are sparking new discussions.'
  }
]


const trendingHighlights: NewsItem[] = [
  {
    category: 'Trending',
    title: 'SpaceX Breaks Record with 20th Launch This Month',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2UlMjB4fGVufDB8fDB8fHww',
    content: 'SpaceX sets a new industry benchmark by completing its 20th rocket launch in just one month, showcasing unparalleled turnaround and operational efficiency.'
  },
  {
    category: 'Trending',
    title: 'Heat Wave Causes Power Outages Across Major Cities',
    image: 'https://plus.unsplash.com/premium_photo-1680582107403-04dfac02efc3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2l0aWVzfGVufDB8fDB8fHww',
    content: 'Record-breaking heat waves strain energy grids, resulting in rolling blackouts and emergency measures in several metropolitan areas.'
  },
  {
    category: 'Trending',
    title: 'Stock Markets Rally as Inflation Slows',
    image: 'https://images.unsplash.com/photo-1635840420670-5470266ffa39?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5mbGF0aW9ufGVufDB8fDB8fHww',
    content: 'Investors are optimistic as recent reports show inflation cooling down, leading to gains across global stock markets and increased consumer confidence.'
  },
  {
    category: 'Trending',
    title: 'Apple Unveils Its Most Advanced iPhone Yet',
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aXBob25lfGVufDB8fDB8fHww',
    content: 'At its annual keynote, Apple revealed a powerful new iPhone with cutting-edge AI features, a stronger battery, and a redesigned camera system.'
  },
  {
    category: 'Trending',
    title: 'World Cup 2026 Stadiums Announced',
    image: 'https://media.istockphoto.com/id/1047706826/es/foto/bal%C3%B3n-de-f%C3%BAtbol-de-2026-m%C3%A9xico-estados-unidos-canad%C3%A1-banderas-3d-ilustraci%C3%B3n.webp?a=1&b=1&s=612x612&w=0&k=20&c=OKS4ckfuL1V6TPm-ZxorTSUIU1NjsReRXmCikZPb4rU=',
    content: 'FIFA has released the list of host stadiums for the 2026 World Cup, set to take place across the U.S., Mexico, and Canada in a historic tri-nation tournament.'
  },
]



const sectionTabs = ["Top Stories", "For You", "Your Topics", "Fact Check", "More"]

const sections = ["U.S.", "World", "Local", "Business", "Technology", "Entertainment", "Sports"]

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(sectionTabs[0])
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white flex">
      <Toaster position='top-center' richColors />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Dialog.Content className="fixed inset-y-0 left-0 bg-white dark:bg-zinc-900 w-64 p-4 z-50 shadow-lg overflow-y-auto">
            <SidebarContent />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <main className="flex-1 p-4 md:p-6 w-full">
        <TopBar onMobileMenu={() => setDrawerOpen(true)} activeTab={activeTab} setActiveTab={setActiveTab} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <MainGrid activeTab={activeTab} searchTerm={searchTerm} />
      </main>
    </div>
  )
}

function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (b: boolean) => void }) {
  return (
    <aside
      className={cn(
        'border-r border-gray-200 dark:border-zinc-800 flex-col p-4 transition-all duration-300 ease-in-out hidden md:flex',
        sidebarOpen ? 'w-64' : 'w-14 items-center'
      )}
    >
      <div className="flex items-center justify-between mb-6 w-full">
        {sidebarOpen && <div className="text-2xl font-bold">Union</div>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded p-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
      {sidebarOpen && <SidebarContent />}
    </aside>
  )
}

function SidebarContent() {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-3 mb-6">
            <img src="https://i.pravatar.cc/100" alt="avatar" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold">Randy Carder</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Premium Plan</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md p-2">
          <DropdownMenu.Item
            onClick={() => toast.info('🚧 Feature not implemented yet')}
            className="px-3 py-1.5 text-sm text-red-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <nav className="flex flex-col gap-2">
        <NavItem icon={<Home className="w-4 h-4" />} label="Home" active />
        <NavItem icon={<Search className="w-4 h-4" />} label="For You" />
        <NavItem icon={<Bell className="w-4 h-4" />} label="Following" />
        <NavItem icon={<LogOut className="w-4 h-4" />} label="Suggestions" />
      </nav>

      <div className="mt-6 text-xs font-semibold text-gray-400 uppercase">Sections</div>
      <nav className="flex flex-col gap-2 mt-2">
        {sections.map((label) => (
          <button
            key={label}
            onClick={() => toast.info('🚧 Feature not implemented yet')}
            className="text-left text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            {label}
          </button>
        ))}
      </nav>
    </>
  )
}

function TopBar({ onMobileMenu, activeTab, setActiveTab
  ,searchTerm, setSearchTerm,
 }: { onMobileMenu: () => void; activeTab: string; setActiveTab: (tab: string) => void; searchTerm: string;
setSearchTerm: (term: string) => void;

  }) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center justify-between md:justify-start md:gap-6">
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={onMobileMenu} className="rounded p-1 hover:bg-gray-100 dark:hover:bg-zinc-800">
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-2xl font-bold">Union</div>
        </div>

        <div className="hidden md:flex gap-6 text-sm font-semibold">
          {sectionTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'pb-1 border-b-2 whitespace-nowrap transition-colors',
                tab === activeTab
                  ? 'border-black dark:border-white'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 w-full">
  <div className="flex items-center gap-2 w-full sm:w-auto">
    <button
      onClick={() => toast.info('🚧 Feature not implemented yet')}
      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
    >
      <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>

    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Type to search..."
      className="flex-1 min-w-[150px] px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-md focus:outline-none"
    />
  </div>
</div>


      </div>

     
      <div className="flex md:hidden flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
  {sectionTabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={cn(
        'pb-1 border-b-2 whitespace-nowrap transition-colors',
        tab === activeTab
          ? 'border-black dark:border-white'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
      )}
    >
      {tab}
    </button>
  ))}
</div>

    </div>
  )
}

function MainGrid({
  activeTab,
  searchTerm,
}: {
  activeTab: string;
  searchTerm: string;
}) {
  const filtered = trendingNews.filter(
    (item) =>
      item.category === activeTab &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-6 pb-10" id="main-content">
      <section className="flex flex-col gap-6 pb-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 px-6 border border-dashed border-gray-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-gray-500 dark:text-gray-300">
            <p className="text-lg font-semibold mb-2">No results found</p>
            <p className="text-sm">
              Try adjusting your search or exploring another category.
            </p>
          </div>
        ) : (
          <>
            {filtered[0] && (
              <HeroStoryCard
                key={0}
                image={filtered[0].image}
                category={filtered[0].category}
                title={filtered[0].title}
                content={filtered[0].content}
                author="Staff Writer"
                time="Just now"
              />
            )}

        
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filtered.slice(1).map((item, idx) => (
                <StoryCard
                  key={idx + 1}
                  image={item.image}
                  category={item.category}
                  title={item.title}
                  content={item.content}
                  author="Staff Writer"
                  time="Just now"
                />
              ))}
            </div>
          </>
        )}
      </section>

      <TrendingSidebar />
    </div>
  );
}



function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      onClick={() => toast.info('🚧 Feature not implemented yet')}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
        active ? 'bg-gray-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
      )}
    >
      {icon}
      {label}
    </button>
  )
}

function HeroStoryCard({ image, category, title, author, time, content }: { image: string; category: string; title: string; author: string; time: string; content?: string; }) {
  
   const [isModalOpen, setIsModalOpen] = useState(false)

  const article = { image, category, title, content }
  
  return (
    <>
    <div className="relative rounded-lg overflow-hidden shadow-md h-72 md:h-96">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full"
      />

    
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
        <div className="text-xs text-white-100 mb-1">{category}</div>
        <h3 className="text-xl font-bold leading-snug">{title}</h3>
        <div className="text-sm text-white-100 flex items-center justify-between mt-2">
          <span>{author} · {time}</span>
          <div className="flex gap-2">
            <button
              onClick={() => toast.info('❤️ Feature not implemented yet')}
              className="hover:text-red-500 transition-colors"
            >
              <Heart className="w-4 h-4 cursor-pointer" />
            </button>
            <MessageSquareShare 
                onClick={() => setIsModalOpen(true)}
            
            className="w-4 h-4  cursor-pointer hover:text-blue-400 transition-colors" />
          </div>
        </div>
      </div>
    </div>
    <ArticleModal open={isModalOpen} onOpenChange={setIsModalOpen} article={article} />
    </>
  )
}


function StoryCard({
  image,
  category,
  title,
  author,
  time,
  content,
}: {
  image: string
  category: string
  title: string
  author: string
  time: string
  content?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const article = { image, category, title, content }

  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="aspect-video overflow-hidden">
          <img src={image} alt={title} className="object-cover w-full h-full" />
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{category}</div>
          <h3 className="text-lg font-bold mb-2 leading-tight">{title}</h3>
          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between">
            <span>
              {author} · {time}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => toast.info('❤️ Feature not implemented yet')}
                className="hover:text-red-500 transition-colors"
              >
                <Heart className="w-4 h-4 cursor-pointer" />
              </button>
              <MessageSquareShare
                className="w-4 h-4 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <ArticleModal open={isModalOpen} onOpenChange={setIsModalOpen} article={article} />
    </>
  )
}

type ArticleModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  article: NewsItem | null
}



function ArticleModal({ open, onOpenChange, article }: ArticleModalProps) {
  if (!article) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />

        <Dialog.Content
          className={cn(
            'fixed inset-0 z-50 bg-white dark:bg-zinc-900 text-black dark:text-white',
            'w-full h-full flex flex-col overflow-y-auto'
          )}
        >
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg md:text-xl font-bold">{article.title}</h2>
            <button onClick={() => onOpenChange(false)}>
              <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            </button>
          </div>

          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-4 md:p-8 flex-1">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {article.category}
            </div>
            <p className="text-base leading-relaxed mb-6">
              {article.content}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


function TrendingSidebar() {
  const [showTrendingModal, setShowTrendingModal] = useState(false)
  const [showTrendingSectionModal, setShowTrendingSectionModal] = useState(false)

  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4">
        <div
          onClick={() => setShowTrendingModal(true)}
          className="flex items-center justify-between cursor-pointer pb-2 border-b border-gray-200 dark:border-zinc-800 mb-3"
        >
          <h2 className="font-bold text-lg">Trending News</h2>
          <ArrowRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>

        <ul className="space-y-3">
          {trendingHighlights.slice(0, 5).map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <img src={item.image} alt={item.title} className="w-12 h-12 rounded-md object-cover" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.category}</div>
                <div className="text-sm font-medium leading-tight text-black dark:text-white">
                  {item.title.length > 70 ? item.title.slice(0, 67) + '...' : item.title}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4">
        <div
          onClick={() => setShowTrendingSectionModal(true)}
          className="flex items-center justify-between cursor-pointer pb-2 border-b border-gray-200 dark:border-zinc-800 mb-3"
        >
          <h2 className="font-bold text-lg">Trending Sections</h2>
          <ArrowRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>

        <ul className="space-y-8 text-sm">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-black dark:text-white">
              <Newspaper className="w-4 h-4" />
              <span>Politics</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400">60,250</span>
              <ChevronUp className="w-4 h-4 text-green-500" />
            </div>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-black dark:text-white">
              <Briefcase className="w-4 h-4" />
              <span>Business</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400">45,000</span>
              <ChevronDown className="w-4 h-4 text-red-500" />
            </div>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-black dark:text-white">
              <Trophy className="w-4 h-4" />
              <span>Sports</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400">24,500</span>
              <ChevronUp className="w-4 h-4 text-green-500" />
            </div>
          </li>
        </ul>
      </div>
      <TrendingSectionModal open={showTrendingSectionModal} onOpenChange={setShowTrendingSectionModal} />
      <TrendingModal open={showTrendingModal} onOpenChange={setShowTrendingModal} />
    </aside>
  )
}

function TrendingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [index, setIndex] = useState(0)
  const article = trendingHighlights[index]

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed inset-0 z-50 bg-white dark:bg-zinc-900 text-black dark:text-white w-full h-full overflow-y-auto flex flex-col">
          
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg md:text-xl font-bold">Trending Highlight</h2>
            <button onClick={() => {
              onOpenChange(false)
              setIndex(0);
              }}>
              <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            </button>
          </div>

          
          <img src={article.image} alt={article.title} className="w-full h-64 md:h-[400px] object-cover" />

          
          <div className="p-4 md:p-8 flex-1 flex flex-col gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">{article.category}</span>
            <h3 className="text-xl font-bold">{article.title}</h3>
            <p className="text-base leading-relaxed">
              {article.content}
            </p>

          
            <div className="flex justify-between mt-auto pt-6 border-t border-gray-200 dark:border-zinc-700">
              <button
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
                className="text-sm px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded disabled:opacity-50"
              >
                ← Back
              </button>
              <button
                disabled={index === trendingHighlights.length - 1}
                onClick={() => setIndex(index + 1)}
                className="text-sm px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const sectionDetails = [
  {
    name: 'Politics',
    views: '60,250',
    trend: 'up',
    description: 'Politics today is driven by new global alignments and urgent policy debates...',
  },
  {
    name: 'Business',
    views: '45,000',
    trend: 'down',
    description: 'Business trends highlight market shifts and tech-driven disruption...',
  },
  {
    name: 'Sports',
    views: '24,500',
    trend: 'up',
    description: 'Sports events and star performances continue to engage audiences globally...',
  },
]

function TrendingSectionModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [index, setIndex] = useState(0)
  const section = sectionDetails[index]

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed inset-0 z-50 bg-white dark:bg-zinc-900 text-black dark:text-white w-full h-full overflow-y-auto flex flex-col">
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg md:text-xl font-bold">Trending Section</h2>
            <button
              onClick={() => {
                onOpenChange(false)
                setIndex(0)
              }}
            >
              <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            </button>
          </div>

          <div className="p-4 md:p-8 flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-semibold">
                {section.name}
                {section.trend === 'up' ? (
                  <ChevronUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{section.views} views</span>
            </div>

            <p className="text-base leading-relaxed">{section.description}</p>

            <div className="flex justify-between mt-auto pt-6 border-t border-gray-200 dark:border-zinc-700">
              <button
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
                className="text-sm px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded disabled:opacity-50"
              >
                ← Back
              </button>
              <button
                disabled={index === sectionDetails.length - 1}
                onClick={() => setIndex(index + 1)}
                className="text-sm px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
