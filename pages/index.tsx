import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const projects = [
  {
    slug: "artists",
    title: "Artists Portfolio",
    image: "/projects/ARTISTS.png",
    tags: ["Next.js", "React", "Tailwind", "Blog"],
  },
  {
    slug: "blog-news",
    title: "Blog News Platform",
    image: "/projects/BLOGNEWS.png",
    tags: ["Next.js", "React", "Tailwind", "Blog"],
  },
  {
    slug: "clothes-shop",
    title: "Clothing E-commerce",
    image: "/projects/SHOP.png",
    tags: ["Next.js", "React", "Tailwind", "Ecommerce"],
  },
  {
    slug: "dashboard-bookings",
    title: "Booking Dashboard",
    image: "/projects/BOOKING.png",
    tags: ["Next.js", "React", "Tailwind", "Dashboard"],
  },
  {
    slug: "sales-dashboard",
    title: "Sales Analytics",
    image: "/projects/SALES.png",
    tags: ["Next.js", "React", "Tailwind", "Dashboard"],
  },
  {
    slug: "slot-machine",
    title: "Slot Machine Game",
    image: "/projects/SLOTMACHINE.png",
    tags: ["Next.js", "React", "Tailwind", "Arcade"],
  },
  {
    slug: "social-feed",
    title: "Social Feed App",
    image: "/projects/SOCIALFEED.png",
    tags: ["Next.js", "React", "Tailwind", "Blog", "Multimedia"],
  },
  {
    slug: "trending-articles",
    title: "Trending Articles",
    image: "/projects/TRENDING.png",
    tags: ["Next.js", "React", "Tailwind", "Blog"],
  },
  {
    slug: "youtube-clone",
    title: "YouTube Clone",
    image: "/projects/YOUTUBE.png",
    tags: ["Next.js", "React", "Tailwind", "Multimedia"],
  },
];

const experience = [
  {
    title: "Senior Frontend Engineer",
    company: "Oracle",
    date: "Aug 2021 – Present · 4 years",
    description: `At Oracle, I build and maintain internal web applications using React with TypeScript and Redux, focused on scalable and maintainable solutions for advanced data workflows and AI/ML model interactions.`,
    tech: [
      "React", "TypeScript", "Redux", "Context API", "Storybook",
      "Jest", "React Testing Library", "Cypress", "GitLab CI", "Artifactory", "Kubernetes", "Confluence"
    ],
    bullets: [
      "Built complex UI features and AI workflows using React and Redux.",
      "Designed components for AI/ML model selection and output visualization.",
      "Created feature flows with Storybook for documentation and visual testing.",
      "Wrote unit/integration tests with Jest, RTL; E2E tests with Cypress.",
      "Handled deployments via GitLab CI/CD, Artifactory, and Kubernetes.",
      "Collaborated with backend/data science teams on API contracts.",
      "Documented features and decisions using Confluence.",
    ],
    project: "NWDAF Portal – Real-time analytics dashboard for 4G/5G data and AI model insights."
  },
  {
    title: "Frontend Engineer",
    company: "Revelo / Numa",
    date: "Apr 2019 – Jul 2021 · 2 years 4 months",
    description: `Worked for Numa (client of Revelo), building web and mobile features for AI-powered dealership communication tools.`,
    tech: [
      "React", "React Native", "TypeScript", "Redux", "Material-UI", "Storybook",
      "Vite", "Cube.js", "Cypress", "Python", "Flask", "GraphQL", "Apollo", "PostgreSQL"
    ],
    bullets: [
      "Developed Reports Page with Cube.js for real-time BI queries.",
      "Maintained and updated React Native app (web, iOS, Android parity).",
      "Enhanced Inbox web experience for AI-driven customer messaging.",
      "Contributed to frontend, mobile, and some backend (Flask/Python).",
    ],
    project: "Inbox & Reports – Conversational UI and analytics dashboards for dealerships."
  },
  {
    title: "Frontend Engineer",
    company: "Nextiva",
    date: "Aug 2017 – Mar 2019 · 1 year 8 months",
    description: `Built key communication platform features in a monorepo environment using React and TypeScript.`,
    tech: [
      "React", "TypeScript", "Redux", "Jest", "Storybook", "Chime SDK", "Lerna", "Git"
    ],
    bullets: [
      "Created drag-and-drop UI for the Call Flow Builder.",
      "Contributed to Cospace – a team messaging and meeting platform.",
      "Worked on sales quotation management UI.",
    ],
    project: "Call Flow Builder – Dynamic UI for configuring voice call routing logic."
  },
  {
    title: "Mid Frontend Engineer",
    company: "EPAM Systems",
    date: "Feb 2016 – Jul 2017 · 1 year 6 months",
    description: `Contributed to UI development for global clients, gaining first exposure to React and Material-UI.`,
    tech: [
      "React", "Redux", "Material-UI", "Webpack", "Jest", "Enzyme", "Jenkins", "Git"
    ],
    bullets: [
      "Created timeline calendar UI for airline crew management system.",
    ],
    project: "Altitude Crew Pairing – Calendar interface for airline crew scheduling."
  },
  {
    title: "Jr Frontend Developer",
    company: "Tata Consultancy Services",
    date: "Jan 2015 – Jan 2016 · 1 year 1 month",
    description: `Built and maintained landing pages for USAA insurance.`,
    tech: ["HTML5", "CSS3", "JavaScript", "jQuery", "Git"],
    bullets: [
      "Developed accessible and responsive landing pages.",
      "Participated in daily stand-ups and accessibility reviews.",
    ],
    project: "Auto Insurance Landing Pages – Responsive pages for quote generation."
  },
];

const tagColors: Record<string, string> = {
  "Next.js": "bg-black text-white",
  "React": "bg-blue-500 text-white",
  "Tailwind": "bg-teal-400 text-black",
  "TypeScript": "bg-blue-700 text-white",
  "Blog": "bg-pink-500 text-white",
  "Ecommerce": "bg-pink-300 text-black",
  "Arcade": "bg-yellow-400 text-black",
  "Dashboard": "bg-gray-700 text-white",
  "Multimedia": "bg-blue-900 text-white",
  // Add more if needed
};


export default function Home() {
  const [activeTab, setActiveTab] = useState<"projects" | "experience">("projects");

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="max-w-4xl mx-auto flex flex-col gap-12">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mt-6">Jose Barraza</h1>
          <p className="text-sm sm:text-base mt-4 text-gray-600 dark:text-gray-300 font-[family-name:var(--font-geist-mono)]">
            Software engineer with over 10+ years of experience, and in my entire
            career I have been focused on frontend development with JavaScript. My primary
            technological stack includes JavaScript, TypeScript and React. I enjoys
            tackling UI challenges, and I am is an open-minded individual always ready to
            assist others.
          </p>
        </header>

        <section>
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === "projects"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === "experience"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setActiveTab("experience")}
            >
              Work Experience
            </button>
          </div>

          {activeTab === "projects" ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {projects.map((proj) => (
      <Link
        key={proj.slug}
        href={`/${proj.slug}`}
        className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 hover:shadow-md transition"
      >
        <Image
          src={proj.image}
          alt={proj.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{proj.title}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {proj.tags.map((tag) => (
  <span
    key={tag}
    className={`text-xs px-2 py-1 rounded font-medium ${
      tagColors[tag] ?? "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
    }`}
  >
    {tag}
  </span>
))}
          </div>
        </div>
      </Link>
    ))}
  </div>
) : (
  <div className="space-y-12">
    {experience.map(exp => (
      <div key={`${exp.title}-${exp.company}`} className="relative pl-6 border-l-2 border-gray-300 dark:border-gray-600">
        
        <h3 className="text-lg font-bold">{exp.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
          {exp.company} · {exp.date}
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>
        
        <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          {exp.bullets.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        {exp.project && (
          <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
            Main project: {exp.project}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-semibold">
          Tech Stack:{" "}
          <span className="font-normal">
            {exp.tech?.join(", ")}
          </span>
        </p>
      </div>
    ))}
  </div>
)}

        </section>

        <footer className="text-center text-xs text-gray-500 mt-12">
          Built with Next.js · Tailwind CSS · React
        </footer>
      </main>
    </div>
  );
}
