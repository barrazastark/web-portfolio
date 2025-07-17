
'use client'

import {  useState } from 'react'
import { Toaster, toast } from 'sonner'
import { format } from 'date-fns'
import { Inter } from 'next/font/google'
import { X } from "lucide-react";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const articles: Article[] = [
  {
    id: 1,
    title: 'Reduce Co2 emissions to protect nature',
    summary:
      'GRS certification allows us to provide the customer with a certificate of analysis from an external body (ECA) that attests to the % of use from recycled material.',
    image: 'https://plus.unsplash.com/premium_photo-1661880571980-6b9cbcc25b75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y28yfGVufDB8fDB8fHww',
    date: new Date(2022, 3),
    content: `GRS certification ensures that customers can trace and verify the origin
    of the recycled material. It also encourages more companies to commit to 
    sustainable production by offering transparent proof of environmental responsibility.`
  },
  {
    id: 2,
    title: 'Moving from thought to action at a reduce cost',
    summary:
      'Moving from thought to action requires the satisfaction of a series of consecutive steps from which no one can escape.',
    image: 'https://images.unsplash.com/photo-1666009419871-c8bee023574e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnQlMjBjYXJ8ZW58MHx8MHx8fDA%3D',
    date: new Date(2021, 10),
    content: `Turning ideas into real impact takes time and structure. From planning,
    to budget alignment, to execution — each step requires commitment and effort.
    Lowering cost without compromising results is the essence of smart action.`
  },
]

type Article = {
  id: number
  title: string
  summary: string
  image: string
  date: Date
    content: string
}

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
const [isModalOpen, setIsModalOpen] = useState(false)

const handleOpenModal = (article: Article) => {
  setSelectedArticle(article)
  setIsModalOpen(true)
}

const handleCloseModal = () => {
  setIsModalOpen(false)
  setSelectedArticle(null)
}


  return (
    <>
    <div className={`${inter.className} min-h-screen bg-[#e5e1dd] dark:bg-[#2e2624] text-black dark:text-white`}>
      <Toaster richColors position='top-center' />
      <header className="sticky top-0 z-50 bg-[#e5e1dd] dark:bg-[#2e2624] border-b border-black/10 dark:border-white/10">
  <div className="flex justify-between items-center px-6 py-4">
    <div className="text-xl font-bold tracking-tight">co.bo.</div>

   
    <nav className="space-x-6 hidden md:flex text-sm">
      <a href="#"
  onClick={(e) => {
    e.preventDefault()
    toast.info('🚧 Feature not implemented')
  }}
  className="hover:underline">SERVICES</a>
      <a href="#"
  onClick={(e) => {
    e.preventDefault()
    toast.info('🚧 Feature not implemented')
  }}
  className="hover:underline">ABOUT</a>
      <a href="#"
  onClick={(e) => {
    e.preventDefault()
    toast.info('🚧 Feature not implemented')
  }}
  className="hover:underline">NEWS</a>
      <a href="#"
  onClick={(e) => {
    e.preventDefault()
    toast.info('🚧 Feature not implemented')
  }}
  className="hover:underline">CONTACT</a>
    </nav>

    <button
      className="md:hidden"
      onClick={() => setIsMobileMenuOpen(prev => !prev)}
      aria-label="Toggle Menu"
    >
      <div className="w-5 h-[2px] bg-black dark:bg-white mb-1" />
      <div className="w-5 h-[2px] bg-black dark:bg-white mb-1" />
      <div className="w-5 h-[2px] bg-black dark:bg-white" />
    </button>
  </div>


  {isMobileMenuOpen && (
    <div className="md:hidden px-6 pb-4 space-y-2 text-sm bg-[#e5e1dd] dark:bg-[#2e2624]">
      <a href="#"
  onClick={(e) => {
    e.preventDefault()
    toast.info('🚧 Feature not implemented')
  }}
  className="hover:underline block" >SERVICES</a>
      <a href="#"
  onClick={(e) => {
    e.preventDefault()
    toast.info('🚧 Feature not implemented')
  }}
  className="hover:underline block" >ABOUT</a>
      <a href="#"
  onClick={(e) => {
    e.preventDefault()
    toast.info('🚧 Feature not implemented')
  }}
  className="hover:underline block" >NEWS</a>
      <a href="#"
  onClick={(e) => {
    e.preventDefault()
    toast.info('🚧 Feature not implemented')
  }}
  className="hover:underline block" >CONTACT</a>
    </div>
  )}
</header>



      <main className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-16 py-10 gap-10">
  
  <section className="relative min-h-fit md:min-h-screen">
  <div className="relative mx-auto w-fit px-6 md:px-0 md:fixed md:w-1/2 md:left-0 md:top-[10rem] md:flex md:justify-center">
    <h1 className="text-[3rem] md:text-[6rem] leading-[1.1] font-semibold text-center md:text-left">
  
  <div className="block md:hidden">
    <div>BLOG–NEWS</div>
    <div className="text-sm font-normal text-gray-700 dark:text-gray-300 mt-2">
      <div>Latest News and Updates</div>
      
    </div>
  </div>

 
  <div className="hidden md:block">
    <div>BL</div>
    <div className="pl-6">OG–</div>
    <div>NEW</div>
    <div className="flex items-center gap-4">
      <span>S</span>
      <div className="text-sm md:text-base font-normal text-gray-700 dark:text-gray-300 leading-tight">
        <div>Latest News</div>
        <div className="pl-6">and updates</div>
      </div>
    </div>
  </div>
</h1>
  </div>
</section>







  <section className="space-y-12">
    {articles.map((article) => (
      <article
  key={article.id}
  className="flex flex-col md:flex-row gap-6 items-start pb-10 border-b border-black/10 dark:border-white/10 last:border-none md:h-[500px]"
>

 <div className="w-full md:w-1/3 h-[300px] md:h-full overflow-hidden rounded-sm">
  <img
    src={article.image}
    alt={article.title}
    className="w-full h-full object-cover"
  />
</div>

 
  <div className="w-full md:w-2/3 max-w-xl flex flex-col justify-between h-[300px] md:h-full">
    <div>
      <span className="uppercase text-xs text-gray-500 dark:text-gray-300 mb-2 block">
        {format(article.date, 'LLL, yyyy')}
      </span>

      <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-12">
        {article.title}
      </h2>

      <button
        onClick={() => handleOpenModal(article)}
        className="text-xs border border-black dark:border-white bg-black text-white dark:text-white rounded-full px-4 py-1 w-fit hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all mb-6"
      >
        Discover →
      </button>
    </div>

    <p className="text-sm text-gray-700 dark:text-gray-300">
      {article.summary}
    </p>
  </div>
</article>






    ))}
  </section>
</main>



    </div>
    {isModalOpen && selectedArticle && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center md:px-4">
    <div
      className="relative bg-white dark:bg-zinc-900 text-black dark:text-white
        w-full h-full rounded-none overflow-y-auto
        md:rounded-md md:max-w-3xl md:max-h-[90vh] md:h-auto shadow-xl"
    >
    
      <button
        onClick={handleCloseModal}
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white z-20 md:top-6 md:right-6"
        aria-label="Close"
      >
        <X className="w-7 h-7" />
      </button>

   
      <div className="w-full">
        <img
          src={selectedArticle.image}
          alt={selectedArticle.title}
          className="w-full h-64 object-cover rounded-t-md md:rounded-t-md"
        />
      </div>

   
      <div className="p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-2">{selectedArticle.title}</h2>
        <span className="uppercase text-xs text-gray-500 dark:text-gray-300 mb-4 block">
          {format(selectedArticle.date, 'LLLL yyyy')}
        </span>

        <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
          {selectedArticle.summary}
        </p>

        <p className="text-base text-gray-800 dark:text-gray-100 whitespace-pre-line">
          {selectedArticle.content}
        </p>
      </div>
    </div>
  </div>
)}



</>
  )
}
