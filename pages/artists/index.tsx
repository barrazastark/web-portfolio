
"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  Sun, Moon, X, Check, User, Mail, Lock, Eye, EyeOff, Image as ImageIcon, MessageSquare,
   Plus, Trash2, AlertCircle, InfoIcon, Globe, CalendarDays
} from "lucide-react";


const avatarList = [
  "https://i.pravatar.cc/150?img=1", "https://i.pravatar.cc/150?img=2", "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4", "https://i.pravatar.cc/150?img=5"
];

interface Task {
  id: string;
  title: string;
  completed: boolean;
  deadline?: string;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

interface Collaborator {
  name: string;
  avatar: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  tasks: Task[];
  collaborators: Collaborator[];
  comments: Comment[];
}


const MailIcon = ({ isDark }: { isDark: boolean; }) => {


  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="46" viewBox="0 0 47 46" fill="none">
      <rect width="47" height="46" rx="7" fill={isDark ? '#302E80' : '#e0e7ff'} />
      <path
        d="M40 26.3333L23.5 37.3333L7 26.3333M40 19L23.5 30L7 19L23.5 8L40 19Z"
        stroke={isDark ? '#A8B2FA' : '#4f46e5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ProfileIcon = ({ isDark }: { isDark: boolean; }) => {


  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="46" viewBox="0 0 47 46" fill="none">
      <rect width="47" height="46" rx="7" fill={isDark ? '#302E80' : '#e0e7ff'} />
      <path
        d="M33.4167 37.375C33.4167 34.1303 29.0328 31.5 23.625 31.5C18.2172 31.5 13.8333 34.1303 13.8333 37.375M41.25 31.5007C41.25 29.0916 38.8332 27.0212 35.375 26.1146M6 31.5007C6 29.0916 8.41677 27.0212 11.875 26.1146M35.375 18.254C36.5769 17.1783 37.3333 15.615 37.3333 13.875C37.3333 10.6303 34.703 8 31.4583 8C29.9536 8 28.5811 8.56567 27.5417 9.49596M11.875 18.254C10.6731 17.1783 9.91667 15.615 9.91667 13.875C9.91667 10.6303 12.547 8 15.7917 8C17.2964 8 18.6689 8.56567 19.7083 9.49596M23.625 25.625C20.3803 25.625 17.75 22.9947 17.75 19.75C17.75 16.5053 20.3803 13.875 23.625 13.875C26.8697 13.875 29.5 16.5053 29.5 19.75C29.5 22.9947 26.8697 25.625 23.625 25.625Z"
        stroke={isDark ? '#A8B2FA' : '#4f46e5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const FolderIcon = ({ isDark }: { isDark: boolean; }) => {


  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="46" viewBox="0 0 47 46" fill="none">
      <rect width="47" height="46" rx="7" fill={isDark ? '#302E80' : '#e0e7ff'} />
      <path
        d="M7 11.75V32C7 34.1002 7 35.1496 7.40873 35.9517C7.76825 36.6573 8.34151 37.2321 9.04712 37.5917C9.8485 38 10.8981 38 12.9942 38H34.7558C36.8519 38 37.9 38 38.7014 37.5917C39.407 37.2321 39.9821 36.6577 40.3417 35.9521C40.7504 35.1499 40.7504 34.0998 40.7504 31.9996V17.7496C40.7504 15.6494 40.7504 14.5993 40.3417 13.7971C39.9822 13.0915 39.4073 12.5183 38.7017 12.1587C37.8996 11.75 36.8502 11.75 34.75 11.75H23.875M7 11.75H23.875M7 11.75C7 9.67893 8.67893 8 10.75 8H17.6397C18.5569 8 19.0166 8 19.4482 8.10361C19.8308 8.19548 20.196 8.34737 20.5315 8.55298C20.9098 8.78481 21.2347 9.10965 21.8828 9.75781L23.875 11.75"
        stroke={isDark ? '#A8B2FA' : '#4f46e5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"inspiration" | "projects">("inspiration");
  const [showAuthModal, setShowAuthModal] = useState<false | "login" | "register">(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "designer" as "designer" | "client" | "student",
    profilePicture: null as File | null,
    showAdditionalOptions: false,
  });
  const [selectedPreview, setSelectedPreview] = useState<{
  img: string;
  title: string;
  description: string;
  features: string[];
} | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [successfulRegistration, setSuccessfulRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; password: string; avatar: string } | null>(null);
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [banner, setBanner] = useState<{show: boolean; type: "success" | "error" | "info"; message: string}>({show: false, type: "success", message: ""});
const [dropdownOpen, setDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDeadline, setNewDeadline] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
const [inviteEmail, setInviteEmail] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
    thumbnail: ""
  });
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const handleCreateProject = () => {
    const project: Project = {
      id: String(Math.random()),
      title: newProject.title,
      description: newProject.description,
      tags: newProject.tags.split(",").map(t => t.trim()),
      thumbnail: newProject.thumbnail || "https://picsum.photos/300/200",
      tasks: [],
      collaborators: [
        {
          name: "You",
          avatar: avatarList[Math.floor(Math.random() * avatarList.length)]
        }
      ],
      comments: []
    };
    setProjects(prev => [...prev, project]);
    setShowModal(false);
    setNewProject({ title: "", description: "", tags: "", thumbnail: "" });
  };

  const handleAddTask = (projectId: string) => {
  if (!newTask.trim() || !newDeadline.trim()) {
    showBanner("Please provide both a task title and deadline", "error");
    return;
  }

  const task: Task = {
    id: String(Math.random()),
    title: newTask,
    completed: false,
    deadline: newDeadline
  };

  setProjects(prev =>
    prev.map(p =>
      p.id === projectId ? { ...p, tasks: [...p.tasks, task] } : p
    )
  );

  setNewTask("");
  setNewDeadline("");
};


  const toggleTask = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? {
      ...p,
      tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    } : p));
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? {
      ...p,
      tasks: p.tasks.filter(t => t.id !== taskId)
    } : p));
  };

  const addComment = (projectId: string) => {
    if (!newComment.trim()) return;
    setProjects(prev => prev.map(p => p.id === projectId ? {
      ...p,
      comments: [...p.comments, {
        id: String(Math.random()),
        user: "You",
        text: newComment,
        timestamp: new Date().toLocaleString()
      }]
    } : p));
    setNewComment("");
  };


  const dialogRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      setSelectedPreview(null);
    }
  };

  if (selectedPreview) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [selectedPreview]);

 useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (event: MediaQueryListEvent) => {
    setIsDarkMode(event.matches);
  };


  setIsDarkMode(mediaQuery.matches);


  mediaQuery.addEventListener('change', handleChange);

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const showBanner = (message: string, type: "success" | "error" | "info" = "success") => {
    setBanner({ show: true, type, message });
    setTimeout(() => setBanner({show: false, type: "success", message: ""}), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    if (!loginData.email || !loginData.password) {
      setLoginError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    console.log("Login attempt:", loginData);
    
    setTimeout(() => {

  if (currentUser) {
  
    if (currentUser.email === loginData.email && currentUser.password === loginData.password) {
      localStorage.setItem("creativehub_user", JSON.stringify(currentUser));
      setCurrentUser(currentUser);
      showBanner("Login successful!", "success");
      setShowAuthModal(false);
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid credentials");
    }
  } else {
    setLoginError("No account found");
  }
  setIsLoading(false);
}, 1000);

  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError(null);
    
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
  setRegisterError("Please fill in all required fields");
  setIsLoading(false);
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(registerData.email)) {
  setRegisterError("Please enter a valid email address");
  setIsLoading(false);
  return;
}

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 8) {
      setRegisterError("Password should be at least 8 characters long");
      setIsLoading(false);
      return;
    }


    
    setTimeout(() => {
  const avatar = avatarList[Math.floor(Math.random() * avatarList.length)];
  const userData = {
    name: registerData.name,
    email: registerData.email,
    password: registerData.password,
    avatar,
  };
  
  setSuccessfulRegistration(true);
  setIsLoading(false);

  setTimeout(() => {
    setShowAuthModal("login");
    setSuccessfulRegistration(false);
    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "designer",
      profilePicture: null,
      showAdditionalOptions: false,
    });
    setCurrentUser(userData);
  }, 1500);
}, 1500);

  };

  const projectImages = [
  {
    img: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?w=500&auto=format&fit=crop&q=60",
    title: "Brand Identity Launch",
    description: "A full branding project for a startup. Includes logo exploration, typography system, and social templates.",
    features: ["Logo Design", "Typography System", "Mockups"]
  },
  {
    img: "https://images.unsplash.com/photo-1614947746254-4fd8c6cb1a7f?w=500&auto=format&fit=crop&q=60",
    title: "Architectural Visualization",
    description: "A collaborative 3D visualization for modern living spaces. Includes client feedback rounds and rendering stages.",
    features: ["3D Renders", "Collaboration", "Client Feedback"]
  },
  {
    img: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=500&auto=format&fit=crop&q=60",
    title: "Mobile App Wireframe",
    description: "UX planning and early-stage wireframing for a food delivery application.",
    features: ["Wireframes", "User Flow", "UX Notes"]
  },
  {
    img: "https://images.unsplash.com/photo-1621910226772-771f03fb0d9a?w=500&auto=format&fit=crop&q=60",
    title: "Marketing Campaign Visuals",
    description: "A creative set of visuals for an online marketing campaign with platform-specific adaptations.",
    features: ["Social Media", "Campaign Assets", "Responsive Design"]
  }
];

  const inspirationImages = [
  {
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&auto=format",
    title: "Minimalist Workspace",
    description: "A layout that inspires focused design thinking and clean execution.",
    features: ["Simplicity", "Organization", "Aesthetic"]
  },
  {
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&auto=format",
    title: "Colorful UI Kit",
    description: "Playful and colorful UI component kit ready for mobile-first design systems.",
    features: ["UI Kit", "Color Theory", "Mobile First"]
  },
  {
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&auto=format",
    title: "Typography Grid",
    description: "A grid-based approach to typography for editorial layouts.",
    features: ["Grids", "Typography", "Editorial"]
  },
  {
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&auto=format",
    title: "Dark Mode Dashboard",
    description: "Inspiration for data-heavy applications in dark theme with accessibility in mind.",
    features: ["Dark UI", "Accessibility", "Data Viz"]
  },
  {
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&auto=format",
    title: "Creative Poster Series",
    description: "Print-ready poster set combining grunge and neon tones.",
    features: ["Print", "Neon", "Textures"]
  },
  {
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&auto=format",
    title: "Futuristic UI Elements",
    description: "A set of futuristic buttons and toggles with layered blur and glassmorphism.",
    features: ["Glassmorphism", "Futuristic", "Interactive"]
  },
  {
    img: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=600&h=400&auto=format",
    title: "Workspace Color Study",
    description: "Study of how color affects productivity in workspace design.",
    features: ["Color Psychology", "Interior", "Mood"]
  },
  {
    img: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=600&h=400&auto=format",
    title: "Photography Grid Layout",
    description: "Elegant grid for showcasing photography in a responsive portfolio.",
    features: ["Responsive", "Portfolio", "Grid"]
  }
];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format",
      quote: "This platform has transformed how I approach design challenges. The mood board feature alone has saved me hours of work!",
    },
    {
      name: "Samantha Lee",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format",
      quote: "The collaboration tools make client feedback seamless. We can iterate designs in real-time without endless email threads.",
    },
    {
      name: "Marcus Chen",
      role: "Architecture Student",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwbWFufGVufDB8fDB8fHww",
      quote: "As a student, I appreciate the templates and tutorials. They've helped me develop my skills exponentially.",
    },
  ];

  const features = [
    {
      title: "Visual Planning",
      description: "Create stunning mood boards and design briefs with our intuitive visual tools. Gather inspiration and organize your creative vision in one place.",
      icon: (isDark: boolean) => <MailIcon isDark={isDark} />,
    },
    {
      title: "Collaborative Workspaces",
      description: "Invite team members and clients to collaborate in real-time. Share feedback, make comments, and track changes as your projects evolve.",
      icon: (isDark: boolean) =><ProfileIcon  isDark={isDark}/>,
    },
    {
      title: "Resource Library",
      description: "Access our extensive library of design assets, templates, and tutorials. Boost your productivity with tools that help you create better designs faster.",
      icon: (isDark: boolean) => <FolderIcon isDark={isDark} />,
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-b from-gray-50 to-white text-gray-900"}`}>
      
      {banner.show && (
        <div
  className={`fixed top-20 right-4 left-4 md:left-auto md:right-4 max-w-xs p-3 rounded-lg shadow-lg flex items-center z-50 transition-all transform animate-slide-in
    ${
      banner.type === "success"
        ? "bg-green-500 text-white"
        : banner.type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
    }`}
>
  {banner.type === "success" ? (
    <Check className="w-5 h-5 mr-2" />
  ) : banner.type === "error" ? (
    <AlertCircle className="w-5 h-5 mr-2" />
  ) : (
    <InfoIcon className="w-5 h-5 mr-2" />
  )}
          <span>{banner.message}</span>
          <button onClick={() => setBanner({...banner, show: false})} className="ml-2 text-white hover:bg-white/20 rounded-full p-1">
            <X size={16} />
          </button>
        </div>
      )}

     
      <nav
  className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${
    isDarkMode ? "bg-gray-800" : "bg-white"
  }`}
>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div role="button" onClick={() => setCurrentView("home")}className="flex-shrink-0 flex items-center">
              <div className="text-xl font-bold flex items-center">
                <div className={`p-1.5 rounded-lg mr-2 ${isDarkMode ? "bg-indigo-600" : "bg-indigo-500"} text-white`}>
                  <Globe size={20} />
                </div>
                <span className="hidden sm:inline">CreativeHub</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <button
  onClick={() => showBanner("Feature coming soon", "info")}
  className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
>
  Features
</button>
<button
  onClick={() => showBanner("Feature coming soon", "info")}
  className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
>
  Testimonials
</button>
              {!isLoggedin  ? (
  <>
    <button
      onClick={() => setShowAuthModal("login")}
      className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
    >
      Login
    </button>
    <button
      onClick={() => setShowAuthModal("register")}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isDarkMode
          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
          : "bg-indigo-500 hover:bg-indigo-600 text-white"
      }`}
    >
      Sign Up
    </button>
  </>
) : (
   <div className="flex items-center space-x-2">
    { currentUser && (<div className="relative" ref={dropdownRef}>
  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
    <img
      src={currentUser.avatar}
      alt="avatar"
      className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
    />
    <span className="text-sm font-medium">{currentUser.name}</span>
  </button>

  {dropdownOpen && (
    <div className={`absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50`}>
      <button
        onClick={() => {
          setCurrentView("dashboard");
          setDropdownOpen(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Dashboard
      </button>
    
    </div>
  )}
</div>)}
  </div>
)}

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-100 text-indigo-600"}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-100 text-indigo-600"}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {!isLoggedin ? (<button
                onClick={() => setShowAuthModal("login")}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
              >
                Login
              </button>) : <div className="flex items-center space-x-2">
    { currentUser && (<><img
      src={currentUser.avatar}
      alt="avatar"
      className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
    />
    <span className="text-sm font-medium">{currentUser.name}</span></>)}
  </div>}
            </div>
          </div>
        </div>
      </nav>

    {currentView === "home" && (
    <div id="home">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full px-3 py-1 text-sm font-medium mb-6">
              Professional Design Tools for Creators
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Bring Your Creative <span className="text-indigo-600 dark:text-indigo-400">Vision</span> to Life
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
              Plan, collaborate, and execute your creative projects with our all-in-one platform. Designed for professionals and hobbyists alike.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowAuthModal("register")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
              >
                Start Creating
              </button>
              <button
  onClick={() => showBanner("Feature coming soon", "info")}
  className="px-6 py-3 rounded-lg font-medium transition-colors border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
>
  Learn More
</button>

            </div>
          </div>
          <div className="hidden md:block">
            <div className={`relative rounded-xl overflow-hidden shadow-xl aspect-video ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-80"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Visual Inspiration</h2>
                <p className="mb-6 text-lg">Create stunning mood boards and design concepts</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="w-12 h-12 bg-white/30 rounded-lg mb-2"></div>
                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="w-12 h-12 bg-white/30 rounded-lg mb-2"></div>
                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="w-12 h-12 bg-white/30 rounded-lg mb-2"></div>
                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="w-12 h-12 bg-white/30 rounded-lg mb-2"></div>
                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div id="features" className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to plan, create, and collaborate on your creative projects
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl transition-all hover:-translate-y-1 ${
                  isDarkMode
                    ? "bg-gray-700 hover:shadow-xl hover:shadow-indigo-900/20"
                    : "bg-white hover:shadow-xl hover:shadow-indigo-100"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                  isDarkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                }`}>
                  {feature.icon(isDarkMode)}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <div className={`py-20 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Inspiration Gallery</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get inspired by these creative projects from our community
              </p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                onClick={() => setActiveTab("inspiration")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === "inspiration"
                    ? (isDarkMode ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white")
                    : (isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200")
                }`}
              >
                Inspiration
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === "projects"
                    ? (isDarkMode ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white")
                    : (isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200")
                }`}
              >
                Projects
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(activeTab === "inspiration" ? inspirationImages : projectImages).map((item, idx) => (
  <div key={idx} className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg cursor-pointer"
    onClick={() => setSelectedPreview(item)}
  >
    <img
      src={item.img}
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
      <div>
        <h3 className="text-white font-bold">{item.title}</h3>
        <p className="text-white/70 text-sm">by CreativeHub</p>
      </div>
      <button className="p-2 bg-white/20 rounded-full hover:bg-white/30">
        <ImageIcon size={16} className="text-white" />
      </button>
    </div>
  </div>
))}

          </div>
        </div>
      </div>
     {selectedPreview && (
  <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
    <div
      ref={dialogRef}
      className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
    >
      <button
        onClick={() => setSelectedPreview(null)}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full text-gray-700 dark:text-gray-300 z-50"
      >
        <X size={20} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 h-[90vh]">
        <img
          src={selectedPreview.img}
          alt={selectedPreview.title}
          className="w-full h-full object-cover"
        />
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
            {selectedPreview.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {selectedPreview.description}
          </p>
          <h2>Features</h2>
          <div className="space-y-3">
            {selectedPreview.features?.map((feat, i) => (
              <div
                key={i}
                className="bg-indigo-50 dark:bg-gray-800 p-3 rounded-md"
              >
                <h4 className="font-semibold text-indigo-600 dark:text-indigo-300">{feat}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}




     
      <div id="testimonials" className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from professionals and hobbyists who are transforming their creative process with CreativeHub
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-700 hover:shadow-xl hover:shadow-indigo-900/20"
                    : "bg-white hover:shadow-xl hover:shadow-indigo-100"
                }`}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">&#34;{testimonial.quote}&#34;</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className={`py-20 ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-r from-indigo-500 to-purple-600"} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Creative Process?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of creators who are already using CreativeHub to plan, collaborate, and execute their most ambitious projects.
          </p>
          <button
            onClick={() => setShowAuthModal("register")}
            className="px-8 py-3 rounded-lg font-medium bg-white text-indigo-600 hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </div>
      </div>
    )}
    {currentView === "dashboard" && (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-6`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CreativeHub Dashboard</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowModal(true)} className="bg-indigo-600 px-4 py-2 rounded text-white">+ New Project</button>
          
        </div>
      </header>

      {projects.length === 0 && <p className="text-center opacity-70">No projects yet. Create one!</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => {
          const progress = project.tasks.length ? (project.tasks.filter(t => t.completed).length / project.tasks.length) * 100 : 0;
          return (
            <div key={project.id} className="border rounded-xl p-4 bg-gray-50 dark:bg-gray-800 shadow">
              <img src={project.thumbnail} alt={project.title} className="rounded w-full h-40 object-cover mb-3" />
              <h2 className="font-bold text-lg mb-1">{project.title}</h2>
              <p className="text-sm opacity-80 mb-2">{project.description}</p>
              <div className="flex gap-2 mb-3 flex-wrap">
                {project.tags.map((tag, i) => <span key={i} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded dark:bg-indigo-900 dark:text-indigo-300">#{tag}</span>)}
              </div>
              <div className="mb-2">
                <p className="text-xs mb-1">Progress</p>
                <div className="w-full bg-gray-300 dark:bg-gray-600 h-2 rounded">
                  <div style={{ width: `${progress}%` }} className="h-2 bg-indigo-500 rounded"></div>
                </div>
              </div>
              <div className="mt-2 mb-3">
                <h4 className="font-semibold mb-1 text-sm">Tasks</h4>
                {project.tasks.map(task => (
  <div key={task.id} className="flex items-center justify-between mb-1">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(project.id, task.id)}
      />
      <div>
        <span className={task.completed ? "line-through" : ""}>{task.title}</span>
        {task.deadline && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Due: {task.deadline}
          </div>
        )}
      </div>
    </label>
    <button onClick={() => deleteTask(project.id, task.id)} className="text-red-500">
      <Trash2 size={14} />
    </button>
  </div>
))}
               <div className="flex flex-col md:flex-row gap-2 mt-2 w-full">
  <input
    type="text"
    className="w-full md:flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
    value={newTask}
    onChange={e => setNewTask(e.target.value)}
    placeholder="Task title"
  />

  <div className="relative w-full md:w-auto">
    <input
      type="date"
      className="custom-date appearance-none w-full px-3 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
      value={newDeadline}
      onChange={e => setNewDeadline(e.target.value)}
    />
    <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none" />
  </div>

  <button
    onClick={() => handleAddTask(project.id)}
    className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md"
  >
    <Plus size={16} />
  </button>
</div>

              </div>
              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-1">Collaborators</h4>
                <div className="flex -space-x-2">
                  {project.collaborators.map((col, i) => (
                    <img key={i} src={col.avatar} alt={col.name} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 my-3">
  <button
    onClick={() => setShowInviteModal(true)}
    className="text-sm px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
  >
    Invite
  </button>
  <button
    onClick={() => {
      navigator.clipboard.writeText(`https://creativehub.com/project/${project.id}`);
      showBanner("Project link copied to clipboard", "info");
    }}
    className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
  >
    Share
  </button>
</div>

              <div>
                <h4 className="font-semibold text-sm mb-1">Comments</h4>
                <div className="space-y-1 max-h-24 overflow-y-auto text-sm">
                  {project.comments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-2">
                      <MessageSquare size={14} className="mt-1 text-indigo-500" />
                      <div>
                        <span className="font-medium">{comment.user}</span> <span className="text-xs opacity-60">{comment.timestamp}</span>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-2 gap-2">
                  <input
                    className="flex-1 px-2 py-1 rounded text-black"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Write a comment"
                  />
                  <button onClick={() => addComment(project.id)} className="bg-indigo-600 text-white px-3 py-1 rounded">Send</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-xl w-full max-w-md relative shadow-lg">
      <button
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500"
        onClick={() => setShowModal(false)}
      >
        <X />
      </button>

      <h2 className="text-xl font-bold mb-4">New Project</h2>

      <input
        className="w-full mb-3 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Title"
        value={newProject.title}
        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
      />

      <textarea
        className="w-full mb-3 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Description"
        value={newProject.description}
        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
      />

      <input
        className="w-full mb-3 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Tags (comma separated)"
        value={newProject.tags}
        onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
      />

      <input
        className="w-full mb-5 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Image URL (optional)"
        value={newProject.thumbnail}
        onChange={e => setNewProject({ ...newProject, thumbnail: e.target.value })}
      />

      <button
        onClick={handleCreateProject}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-colors"
      >
        Create
      </button>
    </div>
  </div>
      )}

      {showInviteModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-sm relative text-gray-900 dark:text-white">
      <button
        className="absolute top-4 right-4"
        onClick={() => setShowInviteModal(false)}
      >
        <X />
      </button>
      <h2 className="text-lg font-bold mb-4">Invite Collaborator</h2>
      <input
        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Email address"
        value={inviteEmail}
        onChange={e => setInviteEmail(e.target.value)}
      />
      <button
        onClick={() => {
          showBanner(`Invite sent to ${inviteEmail}`, "success");
          setInviteEmail("");
          setShowInviteModal(false);
        }}
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Send Invite
      </button>
    </div>
  </div>
)}


    </div>
    )}
  
      <footer className={`py-12 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <div className={`p-1.5 rounded-lg mr-2 ${isDarkMode ? "bg-indigo-600" : "bg-indigo-500"} text-white`}>
                  <ImageIcon size={18} />
                </div>
                CreativeHub
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The ultimate platform for creative professionals and hobbyists to plan, collaborate, and execute stunning projects.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Features</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Templates</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Tutorials</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Blog</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Forum</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">About Us</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Careers</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</a></li>
                <li><a onClick={(e) => {
                  e.preventDefault();
                  showBanner("Feature coming soon", "info")
                  }}href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} CreativeHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`relative rounded-xl w-full max-w-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
            >
              <X size={20} />
            </button>
            
            <div className="p-6">
              {showAuthModal === "login" ? (
             
                <div>
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Sign in to your CreativeHub account
                    </p>
                  </div>
                  
                  {loginError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                      {loginError}
                    </div>
                  )}
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="login-email" className="block text-sm font-medium">
                        Email address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={16} className="text-gray-400" />
                        </div>
                        <input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
  isDarkMode
    ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
    : "bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
}`}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label htmlFor="login-password" className="block text-sm font-medium">
                          Password
                        </label>
                        <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={16} className="text-gray-400" />
                        </div>
                        <input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
  isDarkMode
    ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
    : "bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
}`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm ${
                        isDarkMode
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-indigo-500 hover:bg-indigo-600 text-white"
                      } transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </>
                      ) : "Sign in"}
                    </button>
                  </form>
                  
                  <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                    Don&#39;t have an account?{" "}
                    <button
                      onClick={() => setShowAuthModal("register")}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              ) : (
              
                <div>
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">Join CreativeHub</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Create an account to start your creative journey
                    </p>
                  </div>
                  
                  {successfulRegistration ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-green-500 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Registration Successful!</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        You have successfully registered. Please sign in with your credentials.
                      </p>
                    </div>
                  ) : (
                    <>
                      {registerError && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                          {registerError}
                        </div>
                      )}
                      
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User size={16} className="text-gray-400" />
                            </div>
                            <input
                              id="name"
                              type="text"
                              value={registerData.name}
                              onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                              className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
  isDarkMode
    ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
    : "bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
}`}
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="register-email" className="block text-sm font-medium">
                            Email address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail size={16} className="text-gray-400" />
                            </div>
                            <input
                              id="register-email"
                              type="email"
                              value={registerData.email}
                              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                              className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
  isDarkMode
    ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
    : "bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
}`}
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="register-password" className="block text-sm font-medium">
                            Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size={16} className="text-gray-400" />
                            </div>
                            <input
                              id="register-password"
                              type={showPassword ? "text" : "password"}
                              value={registerData.password}
                              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                              className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
  isDarkMode
    ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
    : "bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
}`}
                              placeholder="Create a password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="confirm-password" className="block text-sm font-medium">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size={16} className="text-gray-400" />
                            </div>
                            <input
                              id="confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              value={registerData.confirmPassword}
                              onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                              className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
  isDarkMode
    ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
    : "bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
}`}
                              placeholder="Confirm your password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            >
                              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="role" className="block text-sm font-medium">
                            I am a...
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: "designer", label: "Designer" },
                              { value: "client", label: "Client" },
                              { value: "student", label: "Student" }
                            ].map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => setRegisterData({...registerData, role: option.value as "designer" | "client" | "student"})}
                                className={`py-2 px-2 rounded-lg text-sm ${
                                  registerData.role === option.value
                                    ? (isDarkMode ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white")
                                    : (isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200")
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`w-full py-2 px-4 rounded-lg font-medium text-sm ${
                            isDarkMode
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                              : "bg-indigo-500 hover:bg-indigo-600 text-white"
                          } transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Creating account...
                            </>
                          ) : "Create account"}
                        </button>
                      </form>
                      
                      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                        By signing up, you agree to our{" "}
                        <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                          Privacy Policy
                        </a>
                      </p>
                    </>
                  )}
                  
                  <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                    Already have an account?{" "}
                    <button
                      onClick={() => setShowAuthModal("login")}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
  input[type="date"].custom-date::-webkit-calendar-picker-indicator {
  background-color: white;
  border-radius: 10px;
  padding: 5px
}

  input[type="date"].custom-date {
    position: relative;
    z-index: 1;
  }
`}</style>

    </div>
  );
};



export default LandingPage;
