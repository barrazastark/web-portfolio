import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import localFont from "next/font/local";
import { track } from '@vercel/analytics';

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
    title: "Frontend Engineer",
    company: "Oracle",
    date: "Aug 2021 – Present",
    description:
      "Build and maintain internal apps with React + TypeScript and Next.js + Tailwind CSS (Oracle Content Management), focusing on scalable, maintainable UIs for advanced data workflows and AI/ML model interactions.",
    tech: [
      "React", "Next.js", "TypeScript", "Redux", "Context API", "Tailwind CSS",
      "Storybook", "Jest", "React Testing Library", "Cypress",
      "REST", "GraphQL",
      "GitLab CI/CD", "JFrog Artifactory", "Kubernetes", "Confluence"
    ],
    bullets: [
      "Implemented complex features and reusable components; Context for lightweight state (theme, language) and Redux for async/multi-step flows.",
      "Integrated AI/ML services: model selection, default-algorithm configuration, and real-time visualization of model outputs.",
      "Established Storybook for component documentation and visual testing.",
      "Ensured quality with Jest + RTL (unit/integration) and Cypress (E2E) aligned to critical user journeys.",
      "Owned CI/CD: GitLab pipelines, artifact publishing to JFrog Artifactory, and Kubernetes deployments to production.",
      "Collaborated with backend/data science to define API contracts and ensure seamless REST/GraphQL integrations.",
      "Documented features and decisions in Confluence for alignment and onboarding."
    ],
    project:
      "NWDAF Portal – Real-time analytics dashboard for 4G/5G network functions with dynamic tables, heatmaps, line & pie charts, plus AI-driven insights."
  },
  {
    title: "Frontend Engineer",
    company: "Revelo (Numa by NumberAI)",
    date: "Aug 2019 – Jul 2021",
    description:
      "Developed and maintained dealership-facing web apps powering AI-assisted customer conversations within the core Inbox platform.",
    tech: [
      "React", "TypeScript", "Redux", "Context API",
      "Material UI", "Storybook",
      "Jest", "Cypress",
      "GraphQL", "Apollo"
    ],
    bullets: [
      "Built dynamic, component-driven UIs in React + TypeScript with best-practice patterns.",
      "Managed complex global state with Redux/Context, including asynchronous actions.",
      "Shipped responsive, accessible interfaces with Material UI and consistent design tokens.",
      "Created and documented reusable components in Storybook to drive team adoption.",
      "Improved reliability with Jest unit tests and Cypress E2E flows, increasing CI confidence.",
      "Integrated GraphQL queries/mutations for real-time updates and interactions.",
      "Partnered with backend and product to scope features that enhanced the customer communication experience."
    ],
    project:
      "Inbox Enhancements – Real-time updates, message threading, and AI-generated response interfaces supporting NLP-powered workflows."
  },
  {
    title: "Frontend Engineer",
    company: "Nextiva",
    date: "Aug 2017 – Mar 2019",
    description:
      "Contributed to core web apps in an Agile/Scrum environment using React, Redux, and strong testing practices.",
    tech: [
      "HTML", "CSS", "JavaScript", "TypeScript",
      "React", "Redux", "Storybook",
      "Jest", "React Testing Library",
      "AWS Chime SDK", "Git"
    ],
    bullets: [
      "Built a visual Call Flow Builder with interconnected nodes for configuring inbound call flows.",
      "Delivered features for Cospace (meetings, messaging, screen/file sharing, tasks) leveraging AWS Chime SDK.",
      "Implemented improvements in Sales Quote for managing quotations and leads.",
      "Practiced code reviews and testing (Jest, RTL) to maintain quality and stability.",
      "Participated in Scrum ceremonies (stand-ups, grooming, planning, retros) to drive iterative delivery."
    ],
    project:
      "Call Flow Builder – Node-based UI to design and manage complex inbound call routing."
  },
  {
    title: "Mid Frontend Engineer",
    company: "EPAM Systems",
    date: "Feb 2016 – Jul 2017",
    description:
      "UI-focused development for multiple clients, introducing and applying React/Redux patterns and modern tooling.",
    tech: [
      "HTML", "CSS", "JavaScript", "React", "Redux",
      "Webpack", "Jest", "Enzyme", "Git", "Jenkins"
    ],
    bullets: [
      "Implemented a timeline calendar for Altitude Crew Pairing to manage crew itineraries.",
      "Developed reusable React components and Redux data flows for client features.",
      "Contributed to build/test pipelines with Webpack, Jest/Enzyme, and Jenkins."
    ],
    project:
      "Altitude Crew Pairing – Timeline calendar UI for scheduling and managing airline crew assignments."
  },
  {
    title: "Junior Frontend Engineer",
    company: "Tata Consultancy Services",
    date: "Jan 2015 – Jan 2016",
    description:
      "Delivered responsive landing pages and contributed to accessibility reviews for USAA.",
    tech: [
      "HTML5", "CSS3", "JavaScript", "jQuery", "Git"
    ],
    bullets: [
      "Built and iterated on accessible, responsive landing pages for marketing initiatives.",
      "Collaborated in daily stand-ups and review sessions to ensure delivery quality."
    ],
    project:
      "USAA Landing Pages – Reusable, responsive templates aligned with accessibility guidelines."
  }
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
  const cvHref = "/cv/Jose_Barraza_CV.pdf"

  const handleDownload = () => {
    track('download_cv', {
      href: cvHref,
    });
  };

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
          <div className="mb-6 flex items-center justify-between">
  {/* Left: tabs */}
  <div className="flex justify-center gap-4">
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

  {/* Right: download */}
  <a
    href={cvHref}
    download
    onClick={handleDownload}
    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition"
    aria-label="Download CV (PDF)"
  >
    Download CV
  </a>
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
