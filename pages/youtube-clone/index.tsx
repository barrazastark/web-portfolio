import { useState, useEffect, useRef } from "react";

import Head from "next/head";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Share,
  X,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  RectangleHorizontal,
  Subtitles,
  ChevronUp,
  Sun,
  Moon,
} from "lucide-react";
interface Reply {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
  parentCommentId: number;
}
interface Video {
  id: number;
  title: string;
  thumbnail: string;
  views: string;
  channel: string;
  channelAvatar: string;
  duration: string;
  uploadedAgo: string;
  videoUrl: string;
  description: string;
  likes: string;
  dislikes: string;
  subscribers: string;
}
interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
  replies?: Reply[];
  replyCount?: number;
}
interface Toast {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}



export default function YouTubeClone() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [replyTexts, setReplyTexts] = useState<{ [key: number]: string }>({});
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {},
  );


  const [activeReplyBox, setActiveReplyBox] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [isInlinePlayer, setIsInlinePlayer] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [commentLikes, setCommentLikes] = useState<{
    [key: number]: { liked: boolean; disliked: boolean };
  }>({});
  const [resumeFromInline, setResumeFromInline] = useState(false);
  const [inlineStartTime, setInlineStartTime] = useState(0);
  const [replyLikes, setReplyLikes] = useState<{
    [key: number]: { liked: boolean; disliked: boolean };
  }>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("youtube-clone-theme") as
        | "light"
        | "dark"
        | "system") || "system";
    setTheme(savedTheme);
    const updateResolvedTheme = () => {
      if (savedTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        setResolvedTheme(systemTheme);
      } else {
        setResolvedTheme(savedTheme);
      }
    };
    updateResolvedTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        updateResolvedTheme();
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  useEffect(() => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700;900&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };

    if (mobileDrawerOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileDrawerOpen]);

  const toggleTheme = () => {
    const themeSequence: ("light" | "dark" | "system")[] = [
      "system",
      "light",
      "dark",
    ];
    const currentIndex = themeSequence.indexOf(theme);
    const nextTheme = themeSequence[(currentIndex + 1) % themeSequence.length];
    setTheme(nextTheme);
    localStorage.setItem("youtube-clone-theme", nextTheme);
    if (nextTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setResolvedTheme(systemTheme);
    } else {
      setResolvedTheme(nextTheme);
    }
  };
  const themeStyles = {
    background: resolvedTheme === "dark" ? "bg-[#0f0f0f]" : "bg-white",
    text: resolvedTheme === "dark" ? "text-white" : "text-red",
    textSecondary: resolvedTheme === "dark" ? "text-gray-400" : "text-gray-600",
    border: resolvedTheme === "dark" ? "border-[#303030]" : "border-gray-300",
    hover:
      resolvedTheme === "dark" ? "hover:bg-[#303030]" : "hover:bg-gray-100",
    surface: resolvedTheme === "dark" ? "bg-[#212121]" : "bg-gray-50",
    surfaceHover:
      resolvedTheme === "dark" ? "hover:bg-[#404040]" : "hover:bg-gray-200",
    input:
      resolvedTheme === "dark"
        ? "bg-[#121212] border-[#303030]"
        : "bg-white border-gray-300",
    inputFocus:
      resolvedTheme === "dark"
        ? "focus:border-blue-500"
        : "focus:border-blue-600",
    button: resolvedTheme === "dark" ? "bg-[#303030]" : "bg-gray-200",
    searchButton:
      resolvedTheme === "dark"
        ? "bg-[#303030] border-[#303030]"
        : "bg-gray-100 border-gray-300",
    toast:
      resolvedTheme === "dark"
        ? "bg-[#212121] border-[#404040]"
        : "bg-white border-gray-300 text-gray-900",
  };
  useEffect(() => {
    const fetchData = async () => {
      const videoData: Video[] = [
        {
          id: 1,
          title: "The Future of Web Development - React 19 Features Explained",
          thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=640&h=360&fit=crop",
          views: "2.3M views",
          channel: "TechExplained",
          channelAvatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          duration: "15:24",
          uploadedAgo: "2 days ago",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          description:
            "In this comprehensive tutorial, we dive deep into the latest React 19 features including Server Components, Concurrent Features, and the new Suspense capabilities. Learn how these updates will revolutionize the way we build web applications.",
          likes: "45K",
          dislikes: "1.2K",
          subscribers: "1.2M",
        },
        {
          id: 2,
          title:
            "JavaScript Performance Optimization Techniques That Actually Work",
          thumbnail:
            "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=640&h=360&fit=crop",
          views: "1.8M views",
          channel: "CodeMaster",
          channelAvatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          duration: "22:15",
          uploadedAgo: "1 week ago",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          description:
            "Master JavaScript performance optimization with these proven techniques used by top companies like Netflix and Google.",
          likes: "38K",
          dislikes: "892",
          subscribers: "890K",
        },
        {
          id: 3,
          title: "Next.js 14 App Router - Complete Tutorial from Scratch",
          thumbnail:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=360&fit=crop",
          views: "1.1M views",
          channel: "WebDev Pro",
          channelAvatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=40&h=40&fit=crop&crop=face",
          duration: "45:33",
          uploadedAgo: "3 days ago",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          description:
            "Build a full-stack application using Next.js 14's powerful App Router. This tutorial covers everything from setup to deployment.",
          likes: "29K",
          dislikes: "567",
          subscribers: "750K",
        },
        {
          id: 4,
          title:
            "TypeScript Advanced Patterns - Generic Constraints & Mapped Types",
          thumbnail:
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=640&h=360&fit=crop",
          views: "890K views",
          channel: "TypeScript Guru",
          channelAvatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
          duration: "18:47",
          uploadedAgo: "5 days ago",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          description:
            "Deep dive into TypeScript's most powerful features including generic constraints, mapped types, and conditional types.",
          likes: "22K",
          dislikes: "234",
          subscribers: "420K",
        },
        {
          id: 5,
          title:
            "Building Responsive UI with Tailwind CSS - Modern Design Patterns",
          thumbnail:
            "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=640&h=360&fit=crop",
          views: "1.5M views",
          channel: "DesignCode",
          channelAvatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          duration: "32:12",
          uploadedAgo: "1 week ago",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          description:
            "Learn how to create beautiful, responsive interfaces using Tailwind CSS with modern design patterns and best practices.",
          likes: "34K",
          dislikes: "445",
          subscribers: "950K",
        },
      ];
      const commentData: Comment[] = [
        {
          id: 1,
          author: "Sarah Johnson",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=32&h=32&fit=crop&crop=face",
          text: "This is exactly what I needed! The explanation of React 19 features is crystal clear. Thank you for making such quality content!",
          likes: 124,
          timestamp: "2 hours ago",
          replyCount: 3,
          replies: [
            {
              id: 101,
              author: "Mike Chen",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
              text: "I totally agree! This really helped me understand Server Components better.",
              likes: 12,
              timestamp: "1 hour ago",
              parentCommentId: 1,
            },
            {
              id: 102,
              author: "TechExplained",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
              text: "@Sarah Johnson Thank you so much! I'm glad it was helpful. More React 19 content coming soon!",
              likes: 45,
              timestamp: "45 minutes ago",
              parentCommentId: 1,
            },
            {
              id: 103,
              author: "DevExpert",
              avatar:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face",
              text: "Same here! Been waiting for a good React 19 tutorial for weeks.",
              likes: 8,
              timestamp: "30 minutes ago",
              parentCommentId: 1,
            },
          ],
        },
        {
          id: 2,
          author: "Mike Chen",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
          text: "Great tutorial! Could you make a follow-up video about migrating from React 18 to 19?",
          likes: 89,
          timestamp: "4 hours ago",
          replyCount: 1,
          replies: [
            {
              id: 201,
              author: "TechExplained",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
              text: "@Mike Chen Great suggestion! I'll add that to my content calendar. Should be out next week!",
              likes: 23,
              timestamp: "3 hours ago",
              parentCommentId: 2,
            },
          ],
        },
        {
          id: 3,
          author: "Emma Davis",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
          text: "The code examples are really helpful. I've been struggling with Server Components and this cleared everything up!",
          likes: 156,
          timestamp: "6 hours ago",
        },
        {
          id: 4,
          author: "Alex Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
          text: "Amazing content as always! Your channel has become my go-to resource for staying updated with React.",
          likes: 203,
          timestamp: "8 hours ago",
          replyCount: 2,
          replies: [
            {
              id: 401,
              author: "ReactFan2024",
              avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
              text: "Same! This channel is pure gold for React developers.",
              likes: 15,
              timestamp: "7 hours ago",
              parentCommentId: 4,
            },
            {
              id: 402,
              author: "TechExplained",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
              text: "@Alex Rodriguez Thank you! Your support means everything to me 🙏",
              likes: 67,
              timestamp: "6 hours ago",
              parentCommentId: 4,
            },
          ],
        },
      ];
      setVideos(videoData);
      setCurrentVideo(videoData[0]);
      setComments(commentData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [currentVideo]);
  const showToast = (message: string, type: Toast["type"] = "info") => {
    const newToast: Toast = {
      id: toastId,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setToastId((prev) => prev + 1);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
    setIsPlaying(false);
    setLiked(false);
    setDisliked(false);
    setCurrentTime(0);
  };
  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const newComment: Comment = {
        id: Date.now(),
        author: "obravocedillo",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
        text: commentText,
        likes: 0,
        timestamp: "Just now",
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };
  const handleAddReply = (commentId: number) => {
    const replyText = replyTexts[commentId];
    if (replyText && replyText.trim() !== "") {
      const newReply: Reply = {
        id: Date.now(),
        author: "obravocedillo",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
        text: replyText,
        likes: 0,
        timestamp: "Just now",
        parentCommentId: commentId,
      };
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
              replyCount: (comment.replyCount || 0) + 1,
            };
          }
          return comment;
        }),
      );
      setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
      setActiveReplyBox(null);
      setShowReplies((prev) => ({ ...prev, [commentId]: true }));
    }
  };
  const handleCommentLike = (commentId: number) => {
    const currentState = commentLikes[commentId] || {
      liked: false,
      disliked: false,
    };
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: {
        liked: !currentState.liked,
        disliked: false,
      },
    }));
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          let newLikes = comment.likes;
          if (currentState.liked) {
            newLikes -= 1;
          } else {
            newLikes += 1;
            if (currentState.disliked) {
              newLikes += 1;
            }
          }
          return { ...comment, likes: newLikes };
        }
        return comment;
      }),
    );
  };
  const handleCommentDislike = (commentId: number) => {
    const currentState = commentLikes[commentId] || {
      liked: false,
      disliked: false,
    };
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: {
        liked: false,
        disliked: !currentState.disliked,
      },
    }));
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          let newLikes = comment.likes;
          if (currentState.disliked) {
            newLikes += 1;
          } else {
            newLikes -= 1;
            if (currentState.liked) {
              newLikes -= 1;
            }
          }
          return { ...comment, likes: Math.max(0, newLikes) };
        }
        return comment;
      }),
    );
  };
  const handleReplyLike = (replyId: number) => {
    const currentState = replyLikes[replyId] || {
      liked: false,
      disliked: false,
    };
    setReplyLikes((prev) => ({
      ...prev,
      [replyId]: {
        liked: !currentState.liked,
        disliked: false,
      },
    }));
    setComments((prevComments) =>
      prevComments.map((comment) => ({
        ...comment,
        replies: comment.replies?.map((reply) => {
          if (reply.id === replyId) {
            let newLikes = reply.likes;
            if (currentState.liked) {
              newLikes -= 1;
            } else {
              newLikes += 1;
              if (currentState.disliked) {
                newLikes += 1;
              }
            }
            return { ...reply, likes: newLikes };
          }
          return reply;
        }),
      })),
    );
  };
  const handleReplyDislike = (replyId: number) => {
    const currentState = replyLikes[replyId] || {
      liked: false,
      disliked: false,
    };
    setReplyLikes((prev) => ({
      ...prev,
      [replyId]: {
        liked: false,
        disliked: !currentState.disliked,
      },
    }));
    setComments((prevComments) =>
      prevComments.map((comment) => ({
        ...comment,
        replies: comment.replies?.map((reply) => {
          if (reply.id === replyId) {
            let newLikes = reply.likes;
            if (currentState.disliked) {
              newLikes += 1;
            } else {
              newLikes -= 1;
              if (currentState.liked) {
                newLikes -= 1;
              }
            }
            return { ...reply, likes: Math.max(0, newLikes) };
          }
          return reply;
        }),
      })),
    );
  };
  const toggleReplies = (commentId: number) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
  const toggleReplyBox = (commentId: number) => {
    setActiveReplyBox(activeReplyBox === commentId ? null : commentId);
    setTimeout(() => {
      const input = document.getElementById(`reply-input-${commentId}`);
      if (input) input.focus();
    }, 100);
  };
  const handleReplyTextChange = (commentId: number, text: string) => {
    setReplyTexts((prev) => ({
      ...prev,
      [commentId]: text,
    }));
  };
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current && duration > 0) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };
  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };
  const toggleInlinePlayer = (mode: 'toggle' | 'resume' | 'close' = 'toggle') => {
  if (mode === 'resume') {
    setIsInlinePlayer(false);
    setResumeFromInline(true);
    return;
  }

  if (mode === 'close') {
    setIsInlinePlayer(false);
    return;
  }

  if (!isInlinePlayer && videoRef.current) {
    const current = videoRef.current.currentTime;
    videoRef.current.pause();
    setIsPlaying(false);
    setInlineStartTime(current);
  }

  setIsInlinePlayer(!isInlinePlayer);
};





  const handleComingSoon = (feature: string) => {
    showToast(`${feature} - Coming soon!`, "info");
  };
  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };
  return (
    <>
      <Head>
        <title>
          {currentVideo
            ? `${currentVideo.title} - YouTubeClone`
            : "YouTubeClone"}
        </title>
        <meta
          name="description"
          content="A professional YouTube clone built with Next.js and React"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <div
        style={{
          fontFamily: "Geist"
        }}
        className={`min-h-screen transition-colors duration-300  ${themeStyles.background} ${themeStyles.text}`}
      >
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`${themeStyles.toast} rounded-2xl p-4 shadow-2xl flex items-center space-x-3 min-w-[300px] transform transition-all duration-300 ease-out animate-slide-in`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  toast.type === "info"
                    ? "bg-blue-500"
                    : toast.type === "success"
                      ? "bg-green-500"
                      : toast.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                }`}
              ></div>
              <p className="text-sm flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className={`p-1 ${themeStyles.hover} rounded-full transition-colors`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <header
          className={`${themeStyles.background} h-16 flex items-center px-4 justify-between fixed top-0 left-0 right-0 z-40 transition-colors duration-300`}
        >
          <div className="flex items-center">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileDrawerOpen(!mobileDrawerOpen);
                } else {
                  setSidebarCollapsed(!sidebarCollapsed);
                }
              }}
              className={`p-2 ${themeStyles.hover} rounded-full mr-2 transition-colors`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <img 
             className="h-10 max-w-[150px] w-auto object-contain"
            src="https://res.cloudinary.com/bardu-app-cloud-images/image/upload/v1752167729/MOTION-PLAY_Logo_bxmlly.svg" alt="Motion Plan" />


          </div>
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="flex">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search"
                  className={`w-full ${themeStyles.input} rounded-l-full px-4 py-2.5 text-sm outline-none ${themeStyles.inputFocus} transition-colors border`}
                />
              </div>
              <button
                onClick={() => handleComingSoon("Search")}
                className={`${themeStyles.searchButton} border border-l-0 rounded-r-full px-6 py-2.5 ${themeStyles.surfaceHover} transition-colors`}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => handleComingSoon("Search")}
            className={`p-2 ${themeStyles.hover} rounded-full transition-colors md:hidden`}
          >
            <Search className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 ${themeStyles.hover} rounded-full transition-colors`}
              title={`Theme: ${theme} (${resolvedTheme})`}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => handleComingSoon("Notifications")}
              className={`p-2 ${themeStyles.hover} rounded-full transition-colors`}
            >
              <Bell className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleComingSoon("Profile")}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
            >
              <User className="w-6 h-6 text-white" />
            </button>
          </div>
        </header>
        {isInlinePlayer && currentVideo && (
          <div className="fixed bottom-4 right-4 w-80 bg-black rounded-2xl overflow-hidden shadow-2xl z-50">
            <div className="relative group">
              <video
              src={currentVideo.videoUrl}
              poster={currentVideo.thumbnail}
              className="w-full h-48 object-cover"
              controls
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                video.currentTime = inlineStartTime;
                video.play();
              }}
            />
              <button
  onClick={() => toggleInlinePlayer('close')}
  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-colors"
>
  <X className="w-4 h-4 text-white" />
</button>
              <button
  onClick={() => toggleInlinePlayer('resume')}
  className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-colors"
>
  <Maximize className="w-4 h-4 text-white" />
</button>
            </div>
            <div className="p-3">
              <h4 className="text-sm font-bold line-clamp-2 text-[#e7e2f1ff]">
                {currentVideo.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {currentVideo.channel}
              </p>
            </div>
          </div>
        )}

        {mobileDrawerOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileDrawerOpen(false)}
            ></div>

            <aside
              className={`w-64 ${themeStyles.background} h-screen overflow-y-auto fixed left-0 top-16 scrollbar-hide z-50 lg:hidden transition-transform duration-300 transform ${
                mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-3 space-y-1">
                {[
                  { name: "Home", active: true },
                  { name: "Shorts", active: false },
                  { name: "Subscriptions", active: false },
                  { name: "Library", active: false },
                  { name: "History", active: false },
                  { name: "Your videos", active: false },
                  { name: "Watch later", active: false },
                  { name: "Liked videos", active: false },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => {
                      if (!item.active) {
                        handleComingSoon(item.name);
                      }
                      setMobileDrawerOpen(false);
                    }}
                    className={`flex items-center space-x-6 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      item.active ? themeStyles.button : themeStyles.hover
                    }`}
                  >
                    <div
                      className={`w-6 h-6 ${resolvedTheme === "dark" ? "bg-[#404040]" : "bg-gray-400"} rounded`}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </aside>
          </>
        )}

        <div className="pt-16 flex">
          {!sidebarCollapsed && (
            <aside
              className={`w-60 ${themeStyles.background} h-screen overflow-y-auto fixed left-0 top-16 scrollbar-hide z-30 hidden lg:block transition-colors duration-300`}
            >
              <div className="p-3 space-y-1">
                {[
                  { name: "Home", active: true },
                  { name: "Shorts", active: false },
                  { name: "Subscriptions", active: false },
                  { name: "Library", active: false },
                  { name: "History", active: false },
                  { name: "Your videos", active: false },
                  { name: "Watch later", active: false },
                  { name: "Liked videos", active: false },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => !item.active && handleComingSoon(item.name)}
                    className={`flex items-center space-x-6 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      item.active ? themeStyles.button : themeStyles.hover
                    }`}
                  >
                    <div
                      className={`w-6 h-6 ${resolvedTheme === "dark" ? "bg-[#404040]" : "bg-gray-400"} rounded`}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </aside>
          )}
          <main
            className={`flex-1 transition-all duration-300 ${!sidebarCollapsed ? "lg:ml-60" : "ml-0"}`}
          >
            <div className="flex flex-col xl:flex-row">
              <div className="flex-1 p-4 lg:p-6">
                {currentVideo && (
                  <div className="w-full">
                    <div
                      className="aspect-video bg-black rounded-2xl overflow-hidden mb-4 relative group shadow-2xl"
                      onMouseEnter={() => setShowControls(true)}
                      onMouseLeave={() => setShowControls(false)}
                    >
                      <video
                        ref={videoRef}
                        src={currentVideo.videoUrl}
                        poster={currentVideo.thumbnail}
                        className="w-full h-full object-cover"
                        onClick={togglePlayPause}
                        onLoadedMetadata={() => {
                          if (resumeFromInline && videoRef.current) {
                            videoRef.current.currentTime = inlineStartTime;
                            videoRef.current.play();
                            setIsPlaying(true);
                            setResumeFromInline(false);
                          }
                        }}
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-300 ${
                          showControls ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                          <div className="mb-2 sm:mb-4">
                            <div
                              ref={progressRef}
                              className="relative h-1 bg-white/30 rounded-full cursor-pointer group/progress"
                              onClick={handleProgressClick}
                            >
                              <div
                                className="h-full bg-red-600 rounded-full transition-all duration-150"
                                style={{
                                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                                }}
                              ></div>
                              <div
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                                style={{
                                  left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                                  transform:
                                    "translateX(-50%) translateY(-50%)",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 sm:space-x-3">
                              <button
                                onClick={togglePlayPause}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors"
                              >
                                {isPlaying ? (
                                  <Pause className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                ) : (
                                  <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                )}
                              </button>
                              <button
                                onClick={() => skipTime(-10)}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors hidden xs:block"
                              >
                                <SkipBack className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                              </button>
                              <button
                                onClick={() => skipTime(10)}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors hidden xs:block"
                              >
                                <SkipForward className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                              </button>
                              <div className="hidden md:flex items-center space-x-2">
                                <button
                                  onClick={toggleMute}
                                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                                >
                                  {isMuted || volume === 0 ? (
                                    <VolumeX className="w-5 h-5 text-white" />
                                  ) : (
                                    <Volume2 className="w-5 h-5 text-white" />
                                  )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-20 h-1 appearance-none rounded-lg slider"
                                    style={{
                                      background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${volume * 100}%, #ffffff30 ${volume * 100}%, #ffffff30 100%)`,
                                    }}
                                  />
                              </div>
                              <span className="text-xs sm:text-sm font-mono text-white">
                                {formatTime(currentTime)} /{" "}
                                {formatTime(duration)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <button
                                onClick={() => handleComingSoon("Settings")}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors hidden xs:block"
                              >
                                <Settings className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                              </button>
                              <button
                                onClick={() => handleComingSoon("Captions")}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors hidden xs:block"
                              >
                                <Subtitles className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                              </button>
                              <button
  onClick={() => toggleInlinePlayer('toggle')}
  className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors"
>
  <RectangleHorizontal className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
</button>
                              <button
                                onClick={() => handleComingSoon("Fullscreen")}
                                className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors"
                              >
                                <Maximize className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h1 className="text-lg lg:text-xl font-bold mb-3 leading-tight text-[#e7e2f1ff]">
                        {currentVideo.title}
                      </h1>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
                        <div className="flex items-center space-x-4">
                          <img
                            src={currentVideo.channelAvatar}
                            alt={currentVideo.channel}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold text-[#bdb5ccff]">
                              {currentVideo.channel}
                            </h3>
                            <p
                              className={`text-sm ${themeStyles.textSecondary}`}
                            >
                              {currentVideo.subscribers} subscribers
                            </p>
                          </div>
                          <button
                           onClick={() => handleComingSoon("Subscribe")}
  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
    subscribed
      ? "bg-[#8102FA]/10 text-[#8102FA] hover:bg-[#8102FA]/20"
      : "bg-[#8102FA] text-white hover:bg-[#8102FA]/90"
  }`}
>
  {subscribed ? "Subscribed" : "Subscribe"}
</button>
                        </div>
                        <div className="flex items-center space-x-2 overflow-x-auto">
                          <div
                            className={`flex ${themeStyles.button} rounded-full overflow-hidden`}
                          >
                            <button
  onClick={handleLike}
  className={`
    flex items-center space-x-2 px-4 py-2  transition-colors
    ${liked
      ? "bg-[#8102FA] text-[#E7E2F1]"
      : "bg-[#e5e7eb] text-[#2F0951] dark:bg-transparent dark:hover:bg-[#8102FA]/10 dark:text-[#E7E2F1]"}
  `}
>
  <ThumbsUp className="w-5 h-5" />
</button>
                            <div
                              className={`w-px ${resolvedTheme === "dark" ? "bg-[#404040]" : "bg-gray-300"}`}
                            ></div>
                            <button
  onClick={handleDislike}
  className={`
    flex items-center space-x-2 px-4 py-2  transition-colors
    ${disliked
      ? "bg-[#8102FA] text-[#E7E2F1]"
      : "bg-[#e5e7eb] text-[#2F0951] dark:bg-transparent dark:hover:bg-[#8102FA]/10 dark:text-[#E7E2F1]"}
  `}
>
  <ThumbsDown className="w-5 h-5" />
</button>
                          </div>
                          <button
                          onClick={() => handleComingSoon("Share")}
  className="flex flex-col items-center hover:text-[#8102FA] transition-colors px-3 py-2"
>
  <Share className="w-5 h-5" />
  <span className="text-sm whitespace-nowrap">Share</span>
</button>
                          <button
                            onClick={() => handleComingSoon("More options")}
                            className={`${themeStyles.button} p-2 rounded-full ${themeStyles.surfaceHover} transition-colors`}
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className={`${themeStyles.surface} rounded-2xl p-4`}>
                        <div
                          className={`flex items-center space-x-4 text-sm ${themeStyles.textSecondary} mb-2`}
                        >
                          <span>{currentVideo.views}</span>
                          <span>{currentVideo.uploadedAgo}</span>
                        </div>
                        <div
                          className={`text-sm leading-relaxed ${showDescription ? "" : "line-clamp-2"}`}
                        >
                          {currentVideo.description}
                        </div>
                        <button
                          onClick={() => setShowDescription(!showDescription)}
                          className={`text-sm ${themeStyles.textSecondary} hover:${themeStyles.text} mt-2 transition-colors`}
                        >
                          {showDescription ? "Show less" : "Show more"}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                        <h3 className="text-xl font-semibold">
                          {comments.length} Comments
                        </h3>
                        <button
                          onClick={() => handleComingSoon("Sort comments")}
                          className="flex items-center space-x-2 text-sm self-start sm:self-center"
                        >
                          <span>Sort by</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex space-x-4">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                          alt="Your avatar"
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className={`w-full bg-transparent border-b ${themeStyles.border} pb-2 text-sm outline-none focus:border-blue-500 transition-colors`}
                            placeholder="Add a comment..."
                          />
                          <div className="flex justify-end space-x-2 mt-3">
                            <button
                              onClick={() => setCommentText("")}
                              className={`px-4 py-2 text-sm rounded-full ${themeStyles.hover} transition-colors`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAddComment}
                              disabled={!commentText.trim()}
                              className="px-4 py-2 bg-[#6366f1] text-white hover:bg-[#6366f1]/90 text-sm rounded-full  disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {comments.map((comment) => {
                          const commentState = commentLikes[comment.id] || {
                            liked: false,
                            disliked: false,
                          };
                          return (
                            <div key={comment.id} className="space-y-4">
                              <div className="flex space-x-4">
                                <img
                                  src={comment.avatar}
                                  alt={comment.author}
                                  className="w-10 h-10 rounded-full flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-sm font-medium">
                                      {comment.author}
                                    </span>
                                    <span
                                      className={`text-xs ${themeStyles.textSecondary}`}
                                    >
                                      {comment.timestamp}
                                    </span>
                                  </div>
                                  <p className="text-sm leading-relaxed mb-2 break-words">
                                    {comment.text}
                                  </p>
                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() =>
                                        handleCommentLike(comment.id)
                                      }
                                      className={`flex items-center space-x-1 ${themeStyles.hover} rounded-full px-2 py-1 transition-colors ${
                                        commentState.liked
                                          ? "text-blue-500"
                                          : ""
                                      }`}
                                    >
                                      <ThumbsUp
                                        className={`w-4 h-4 ${commentState.liked ? "fill-current" : ""}`}
                                      />
                                      <span className="text-xs">
                                        {comment.likes}
                                      </span>
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleCommentDislike(comment.id)
                                      }
                                      className={`${themeStyles.hover} rounded-full p-1 transition-colors ${
                                        commentState.disliked
                                          ? "text-red-500"
                                          : ""
                                      }`}
                                    >
                                      <ThumbsDown
                                        className={`w-4 h-4 ${commentState.disliked ? "fill-current" : ""}`}
                                      />
                                    </button>
                                    <button
                                      onClick={() => toggleReplyBox(comment.id)}
                                      className={`text-xs ${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors`}
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {activeReplyBox === comment.id && (
                                <div className="ml-14 flex space-x-3">
                                  <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                                    alt="Your avatar"
                                    className="w-8 h-8 rounded-full flex-shrink-0"
                                  />
                                  <div className="flex-1">
                                    <input
                                      id={`reply-input-${comment.id}`}
                                      type="text"
                                      value={replyTexts[comment.id] || ""}
                                      onChange={(e) =>
                                        handleReplyTextChange(
                                          comment.id,
                                          e.target.value,
                                        )
                                      }
                                      className={`w-full bg-transparent border-b ${themeStyles.border} pb-2 text-sm outline-none focus:border-blue-500 transition-colors`}
                                      placeholder={`Reply to ${comment.author}...`}
                                    />
                                    <div className="flex justify-end space-x-2 mt-3">
                                      <button
                                        onClick={() => setActiveReplyBox(null)}
                                        className={`px-3 py-1.5 text-xs rounded-full ${themeStyles.hover} transition-colors`}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleAddReply(comment.id)
                                        }
                                        disabled={
                                          !replyTexts[comment.id]?.trim()
                                        }
                                        className="px-3 py-1.5 bg-blue-600 text-xs rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
                                      >
                                        Reply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {comment.replyCount !== undefined &&
                                comment.replyCount > 0 && (
                                  <button
                                    onClick={() => toggleReplies(comment.id)}
                                    className="ml-14 flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                                  >
                                    {showReplies[comment.id] ? (
                                      <ChevronUp className="w-4 h-4" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4" />
                                    )}
                                    <span>
                                      {showReplies[comment.id]
                                        ? "Hide"
                                        : "Show"}{" "}
                                      {comment.replyCount}{" "}
                                      {comment.replyCount === 1
                                        ? "reply"
                                        : "replies"}
                                    </span>
                                  </button>
                                )}
                              {showReplies[comment.id] &&
                                comment.replies &&
                                comment.replies.length > 0 && (
                                  <div className="ml-14 space-y-4">
                                    {comment.replies.map((reply) => {
                                      const replyState = replyLikes[
                                        reply.id
                                      ] || { liked: false, disliked: false };
                                      return (
                                        <div
                                          key={reply.id}
                                          className="flex space-x-3"
                                        >
                                          <img
                                            src={reply.avatar}
                                            alt={reply.author}
                                            className="w-8 h-8 rounded-full flex-shrink-0"
                                          />
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                              <span className="text-sm font-medium">
                                                {reply.author}
                                              </span>
                                              <span
                                                className={`text-xs ${themeStyles.textSecondary}`}
                                              >
                                                {reply.timestamp}
                                              </span>
                                            </div>
                                            <p className="text-sm leading-relaxed mb-2 break-words">
                                              {reply.text}
                                            </p>
                                            <div className="flex items-center space-x-4">
                                              <button
                                                onClick={() =>
                                                  handleReplyLike(reply.id)
                                                }
                                                className={`flex items-center space-x-1 ${themeStyles.hover} rounded-full px-2 py-1 transition-colors ${
                                                  replyState.liked
                                                    ? "text-blue-500"
                                                    : ""
                                                }`}
                                              >
                                                <ThumbsUp
                                                  className={`w-3 h-3 ${replyState.liked ? "fill-current" : ""}`}
                                                />
                                                <span className="text-xs">
                                                  {reply.likes}
                                                </span>
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleReplyDislike(reply.id)
                                                }
                                                className={`${themeStyles.hover} rounded-full p-1 transition-colors ${
                                                  replyState.disliked
                                                    ? "text-red-500"
                                                    : ""
                                                }`}
                                              >
                                                <ThumbsDown
                                                  className={`w-3 h-3 ${replyState.disliked ? "fill-current" : ""}`}
                                                />
                                              </button>
                                              <button
                                                onClick={() =>
                                                  toggleReplyBox(comment.id)
                                                }
                                                className={`text-xs ${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors`}
                                              >
                                                Reply
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full xl:w-96 p-4 lg:p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Up next</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                    {videos
                      .filter((video) => video.id !== currentVideo?.id)
                      .map((video) => (
                        <div
                          key={video.id}
                          className={`flex flex-col sm:flex-row xl:flex-row space-y-3 sm:space-y-0 sm:space-x-3 xl:space-x-3 cursor-pointer ${themeStyles.hover} rounded-lg p-2 transition-colors group`}
                          onClick={() => handleVideoSelect(video)}
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full sm:w-40 xl:w-40 h-24 rounded-lg object-cover"
                            />
                            <span className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded text-white">
                              {video.duration}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-[#e7e2f1ff] line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
                              {video.title}
                            </h4>
                            <p
                              className={`text-xs ${themeStyles.textSecondary} mb-1`}
                            >
                              {video.channel}
                            </p>
                            <div
                              className={`flex items-center space-x-1 text-xs ${themeStyles.textSecondary}`}
                            >
                              <span>{video.views}</span>
                              <span>•</span>
                              <span>{video.uploadedAgo}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold">Trending</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                    {videos.slice(0, 3).map((video) => (
                      <div
                        key={`trending-${video.id}`}
                        className={`flex space-x-3 cursor-pointer ${themeStyles.hover} rounded-lg p-2 transition-colors`}
                        onClick={() => handleVideoSelect(video)}
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-mbold text-[#e7e2f1ff] line-clamp-2 mb-1">
                            {video.title}
                          </h4>
                          <p className={`text-xs ${themeStyles.textSecondary}`}>
                            {video.views}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <style jsx global>{`
      
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff0000;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff0000;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
}
