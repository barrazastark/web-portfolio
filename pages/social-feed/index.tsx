'use client'
import { useState, useEffect, useRef } from 'react';
import { Search, Heart, MessageSquare, MapPin, Send,

  UploadCloud,
  LayoutList,
  CalendarDays,
  UserRound,
  Share,
  PlusCircle,

 } from 'lucide-react';
 import dynamic from 'next/dynamic';
import { toast, Toaster } from "sonner";
import { Titillium_Web, Inter } from 'next/font/google';
import type { MapContainerProps, TileLayerProps, MarkerProps, PopupProps } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const DynamicMap = dynamic(() =>
  Promise.resolve(function ClientMap({
    center,
    label,
  }: {
    center: LatLngExpression;
    label: string;
  }) {
    const [leaflet, setLeaflet] = useState<{
  L: typeof import('leaflet');
  MapContainer: React.ComponentType<MapContainerProps>;
  TileLayer: React.ComponentType<TileLayerProps>;
  Marker: React.ComponentType<MarkerProps>;
  Popup: React.ComponentType<PopupProps>;
} | null>(null);



    useEffect(() => {
      let isMounted = true;

      const loadLeaflet = async () => {
        const L = await import('leaflet');
        const {
          MapContainer,
          TileLayer,
          Marker,
          Popup,
        } = await import('react-leaflet');


        delete (L.Icon.Default.prototype as Partial<Record<'_getIconUrl', unknown>>)._getIconUrl;

        L.Icon.Default.mergeOptions({
          iconRetinaUrl: markerIcon2x.src,
          iconUrl: markerIcon.src,
          shadowUrl: markerShadow.src,
        });

        if (isMounted) {
          setLeaflet({ L, MapContainer, TileLayer, Marker, Popup });
        }
      };

      loadLeaflet();
      return () => {
        isMounted = false;
      };
    }, []);

    if (!leaflet) return <div className="w-full h-[300px] rounded-[10px] bg-[#FFF6F2]">Loading map...</div>;

    const { MapContainer, TileLayer, Marker, Popup } = leaflet;

    return (
      
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
       
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {label && (
<Marker position={center}>
            <Popup>{label}</Popup>
          </Marker>
          )}
          
        </MapContainer>
    );
  }),
  { ssr: false }
);


const titillium = Titillium_Web({ subsets: ['latin'], weight: ['400','700', '900'] });

const inter = Inter({ subsets: ['latin'], weight: ['400', '500'] });


interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
}

interface Comment {
  id: number;
  user: User;
  content: string;
  createdAt: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  image: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  coordinates: [number, number];
  attendees: number;
  isLiked?: boolean;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    username: 'alexmorgan',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60',
    bio: 'Digital creator and coffee enthusiast',
    followers: 5423,
    following: 384,
  },
  {
    id: 2,
    name: 'Sam Wilson',
    username: 'samwilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60',
    bio: 'Photographer and traveler',
    followers: 2789,
    following: 421,
  },
  {
    id: 3,
    name: 'Taylor Kim',
    username: 'taylorkim',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60',
    bio: 'Event organizer and design enthusiast',
    followers: 1893,
    following: 567,
  },
];

const mockPosts: Post[] = [
  {
    id: 1,
    user: mockUsers[0],
    content: 'Just finished a great coffee session and coding marathon! ?️?',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&auto=format&fit=crop&q=60',
    likes: 124,
    comments: [
      {
        id: 1,
        user: mockUsers[1],
        content: 'Looks delicious! What coffee blend are you using?',
        createdAt: '2 hours ago',
      },
      {
        id: 2,
        user: mockUsers[2],
        content: 'The perfect combo of caffeine and code. Nice!',
        createdAt: '1 hour ago',
      },
    ],
    createdAt: '3 hours ago',
  },
  {
    id: 2,
    user: mockUsers[1],
    content: 'Sunset vibes at the beach today ??️',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60',
    likes: 289,
    comments: [
      {
        id: 3,
        user: mockUsers[0],
        content: 'Wow! That view is stunning!',
        createdAt: '1 hour ago',
      },
    ],
    createdAt: '5 hours ago',
  },
  {
    id: 3,
    user: mockUsers[2],
    content: 'Design inspiration for the day ✨',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60',
    likes: 187,
    comments: [],
    createdAt: '1 day ago',
  },
];

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Tech Innovators Summit',
    description: 'Join the leading tech minds as they discuss the future of innovation.',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format&fit=crop&q=60',
    date: 'Apr 15, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'San Francisco Tech Hub',
    coordinates: [37.7749, -122.4194],
    attendees: 342,
  },
  {
    id: 2,
    title: 'Art & Coffee Festival',
    description: 'Celebrate creativity with local artists and the perfect cup of coffee.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60',
    date: 'Apr 22, 2025',
    time: '11:00 AM - 7:00 PM',
    location: 'Downtown Art District',
    coordinates: [37.7859, -122.4364],
    attendees: 189,
  },
  {
    id: 3,
    title: 'Sustainable Living Workshop',
    description: 'Learn practical ways to live more sustainably in our modern world.',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=500&auto=format&fit=crop&q=60',
    date: 'May 5, 2025',
    time: '10:00 AM - 2:00 PM',
    location: 'Green Community Center',
    coordinates: [37.7992, -122.4028],
    attendees: 156,
  },
];





const CreatePostModal = ({ isOpen, onClose, onCreatePost }: {
  isOpen: boolean,
  onClose: () => void,
  onCreatePost: (post: { content: string, image: string, location?: string }) => void
}) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return toast.warning('Post body is required!');
    onCreatePost({ content, image, location });
    setContent('');
    setImage('');
    setLocation('');
    onClose();
  };


  if(!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAACB7]/70 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className={`text-[26px] font-extrabold text-[#874854] ${titillium.className}`}>
  CREATE A NEW POST
</h2>
          <button onClick={onClose} className="text-[#874854]">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-6">

  <div>
    <label className={`block text-[#874854] mb-2 text-[16px] font-medium ${inter.className}`}>
      Title
    </label>
    <textarea
      placeholder="Enter post description"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full h-[180px] px-[15px] py-[15px] border border-[#FFCAD4] bg-[#FFF6F2] rounded-[10px] resize-none text-[#874854] focus:outline-none text-[14px]"
    />
  </div>

 
  <div>
    <label className={`block text-[#874854] mb-2 text-[16px] font-medium ${inter.className}`}>
      Location (Optional)
    </label>
    <div className="flex items-center h-[50px] px-[15px] border border-[#FFCAD4] bg-[#FFF6F2] rounded-[10px] gap-[10px]">
      <MapPin className="w-4 h-4 text-[#874854]" />
      <input
        type="text"
        placeholder="Add a location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-transparent w-full text-sm outline-none text-[#874854] placeholder-[#874854]/60"
      />
    </div>
  </div>


  <div>
    <label className={`block text-[#874854] mb-2 text-[16px] font-medium ${inter.className}`}>
      Media Upload
    </label>
    <div className="border border-[#FFCAD4] bg-[#FFF6F2] rounded-[10px] px-[15px] py-[25px] flex flex-col items-center text-center gap-[10px]">
      <UploadCloud className="w-8 h-8 text-[#874854]" />
      <p className="text-sm text-[#874854]">Drop files to upload</p>
      <span className="text-sm text-[#874854]">or</span>
      <input
        type="text"
        placeholder="Paste image URL or click below"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="mt-2 px-3 py-2 rounded bg-white border border-[#FFCAD4] text-[#874854] w-full max-w-sm"
      />
    </div>
  </div>


  <div className="flex justify-end gap-4">
  <button
    type="button"
    onClick={onClose}
    className={`flex h-[57px] px-[40px] py-[15px] justify-center items-center gap-[10px] border-2 border-[#FFCAD4] rounded-[10px] text-[#FFCAD4] text-[18px] font-black ${titillium.className}`}
  >
    CANCEL
  </button>
  <button
    type="submit"
    className={`flex h-[57px] px-[40px] py-[15px] justify-center items-center gap-[10px] bg-[#8BC1A1] rounded-[10px] text-white text-[18px] font-black ${titillium.className}`}
  >
    SHARE POST
  </button>
</div>


</form>

      </div>
    </div>
  );
};


const CommentSection = ({
  comments,
  onAddComment
}: {
  comments: Comment[];
  onAddComment: (content: string) => void;
}) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      setCommentError(true);
      return;
    }
    onAddComment(commentContent);
    setCommentContent('');
    setCommentError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
    if (e.target.value.trim()) setCommentError(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [commentContent]);

  return (
    <div className="py-4 px-6 bg-white">
      {comments.length > 0 && !showComments && (
        <button
          onClick={() => setShowComments(true)}
          className="text-[12px] font-semibold leading-5 text-[#874854] hover:underline mb-2"
        >
          View {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </button>
      )}

      {(showComments || comments.length === 0) && (
        <>
          <div className="space-y-3 mb-3 max-h-96 overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start gap-2 bg-[#FFF6F2] rounded-[10px] px-4 py-2"
              >
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-[30px] h-[30px] rounded-full mt-1"
                />
                <div className="flex-1 text-[#5E5E5E]">
  <div className="flex justify-between items-start">
    <div>
      <span className="text-[14px] font-bold leading-[17.566px] text-[#8F525C]">
        {comment.user.name}
      </span>{' '}
      <span className="text-[12px] font-normal leading-5 text-[#5E5E5E]">
        @{comment.user.username}
      </span>
    </div>
    <span className="text-[10px] font-normal leading-4 text-right text-[#8F525C] mt-1">
      {comment.createdAt}
    </span>
  </div>

  <p className="text-[14px] font-normal leading-[150%] mt-1 text-[#5E5E5E]">
    {comment.content}
  </p>
</div>

              </div>
            ))}
          </div>

          <form onSubmit={handleSubmitComment} className="flex gap-2 items-start">
  <img
    src={mockUsers[0].avatar}
    alt="Your avatar"
    className="w-[30px] h-[30px] rounded-full mt-1"
  />

  <div className="flex-1 relative">
   <textarea
  ref={textareaRef}
  value={commentContent}
  onChange={handleInputChange}
  placeholder="Add a comment..."
  className={`w-full px-[15px] py-[8px] flex items-center justify-between text-left text-[14px] font-normal leading-[150%] text-[#874854] placeholder:text-left placeholder-[#874854] bg-[#FFE5D9] rounded-full resize-none overflow-hidden focus:outline-none ${
    commentError ? 'border border-red-500' : 'border border-transparent'
  }`}
  rows={1}
/>
    {commentError && (
      <p className="text-red-500 text-xs mt-1 absolute">
        Please enter a comment
      </p>
    )}
  </div>

  <button
    type="submit"
    className="self-center p-2 text-[#874854] hover:opacity-80"
  >
    <Send className="w-5 h-5 fill-[#874854]" />
  </button>
</form>

        </>
      )}
    </div>
  );
};




const PostCard = ({
  post,
  onLike,
  onAddComment
}: {
  post: Post;
  onLike: () => void;
  onAddComment: (content: string) => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <div className="bg-[#FFF6F2] rounded-[10px] mb-6 overflow-hidden w-[655px] max-w-full mx-auto">

   
   <div className='p-6'>
        <div className="flex items-center gap-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
  <h3 className={`text-[20px] font-bold text-[#874854] ${titillium.className}`}>
    {post.user.name}
  </h3>
  <p className="text-[12px] font-normal leading-4 text-[#874854]">
    {post.createdAt}
  </p>
</div>
        </div>

     
        <p className="mt-3 text-[14px] font-medium leading-6 text-[#874854]">
  {post.content}
</p>

      </div>
        {post.image && (
  <img
  src={post.image}
  alt="Post"
  className="w-full h-[370px] object-cover "
/>
)}


 
      <div className="px-6 py-4  flex items-center justify-between text-[#874854]">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:opacity-80"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked
                  ? 'fill-[#8BC1A1] text-[#8BC1A1]'
                  : 'text-[#8BC1A1]'
              }`}
            />
            <span className="text-[16px] font-semibold leading-5 text-[#874854]">
  {likesCount}
</span>
          </button>
          <button className="flex items-center gap-1 text-[#8BC1A1] hover:opacity-80">
            <MessageSquare className="w-5 h-5 fill-[#8BC1A1]" />
            <span className="text-[16px] font-semibold leading-5 text-[#874854]">{post.comments.length}</span>
          </button>
        </div>
        <button onClick={() => toast.info("Feature not implemented yet.")} className="flex items-center gap-1 text-[#8BC1A1] hover:opacity-80">
          <Share className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

   
      <CommentSection comments={post.comments} onAddComment={onAddComment} />
    </div>
  );
};




const SocialFeedApp = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [events] = useState<Event[]>(mockEvents);
  const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'profile' | 'create'>('feed');
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const tabs = ['Posts', 'Media', 'Likes'];
  const [activeTabName, setActiveTabName] = useState('Posts');

  const handleTabClick = (tab: string) => {
    if (tab === 'Posts') {
      setActiveTabName('Posts');
    } else {
      toast.info(`"${tab}" feature not implemented yet.`);
    }
  };

  
  const handleAddComment = (postId: number, content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      user: mockUsers[0],
      content,
      createdAt: 'Just now',
    };
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] } 
        : post
    ));
  };
  
  const handleViewLocation = (event: Event) => {
    setViewingEvent(event);
    setActiveTab('events');
  };
  
  const handleCreatePost = (postData: { content: string, image: string }) => {
    const newPost: Post = {
      id: Date.now(),
      user: mockUsers[0],
      content: postData.content,
      image: postData.image,
      likes: 0,
      comments: [],
      createdAt: 'Just now',
    };
    
    setPosts([newPost, ...posts]);
    setIsCreatePostModalOpen(false);
    toast.success("Post created");
  };
  
  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

const center: LatLngExpression = viewingEvent?.coordinates || [37.7749, -122.4194];

  
  return (
  <div className={`${inter.className} min-h-screen bg-[#FFE5D9] dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
    <Toaster richColors position='top-center' />

  
    <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-[285px_1fr_285px]
    gap-6
    md:gap-[90px]
    p-4
  
  "
>



  <aside
  className="
    lg:flex
    lg:sticky
    lg:top-4
    lg:self-start
    bg-[#FAACB7]
    text-[#874854]
    h-
    rounded-lg
    
    flex-col
    gap-8
    w-full
    lg:w-[285px]
    h-fit
    z-10
    h-auto

    gap-[10px] self-stretch  rounded-b-[10px] bg-[#FFCAD4]
  "
>
  
    <h1 className="text-[28px] p-6 pb-0 text-[#874854]">
  <span className="font-black font-titillium">SOCIAL</span>
  <span className="font-normal font-titillium">FEED</span>
</h1>



   <nav className="flex flex-col  m-4 ">
  <button
    onClick={() => {
      setActiveTab('feed')
      setSearchQuery("")
    }}
    className={`flex items-center gap-[10px] px-[25px] py-[15px] rounded ${
      activeTab === 'feed'
        ? 'bg-[#F4ACB7] text-[#874854]'
        : 'bg-[#FFCAD4] text-[#874854] hover:bg-[#F4ACB7]'
    }`}
  >
    <LayoutList className="w-5 h-5" />
    Feed
  </button>

  <button
    onClick={() => {
      setActiveTab('events')
      setSearchQuery("")
    }}
    className={`flex items-center gap-[5px] px-[25px] py-[15px] rounded ${
      activeTab === 'events'
        ? 'bg-[#F4ACB7] text-[#874854]'
        : 'bg-[#FFCAD4] text-[#874854] hover:bg-[#F4ACB7]'
    }`}
  >
    <CalendarDays className="w-5 h-5" />
    Events
  </button>

  <button
    onClick={() => {
      setActiveTab('profile')
      setSearchQuery("")
    }}
    className={`flex items-center gap-[10px] px-[25px] py-[15px] rounded ${
      activeTab === 'profile'
        ? 'bg-[#F4ACB7] text-[#874854]'
        : 'bg-[#FFCAD4] text-[#874854] hover:bg-[#F4ACB7]'
    }`}
  >
    <UserRound className="w-5 h-5" />
    Profile
  </button>
</nav>


    <div className='p-6 pt-0'>
    <button
  onClick={() => setIsCreatePostModalOpen(true)}
  className="w-full text-white rounded-[10px] flex items-center justify-center gap-2 mx-auto font-black"
  style={{ background: '#8BC1A1', padding: '15px 35px' }}
>
  <span className={`text-[16px] uppercase ${titillium.className}`}>
    ADD NEW POST
  </span>
  <PlusCircle className="w-5 h-5" />
</button>

    </div>
  </aside>

  
  
<main>

    {activeTab === "feed" && (
      <>
    <div className="mb-6 ">
  <div className="flex items-center gap-3 bg-[#FFF6F2] rounded-[10px] px-4 h-[50px] shadow-sm w-full">
  <Search className="w-5 h-5 text-[#874854]" />
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    className="flex-1 bg-transparent focus:outline-none text-[#874854] placeholder:text-[#874854]/50"
  />
</div>

</div>


    <div className="flex items-center gap-4 my-8">
  <div className="flex-grow h-[1px] bg-[#874854]" />
  <h2
    className={`text-[28px] text-[#874854] text-center leading-none font-black uppercase ${titillium.className}`}
  >
    YOUR FEED
  </h2>
  <div className="flex-grow h-[1px] bg-[#874854]" />
</div>

 
    {filteredPosts.length > 0 ? (
      filteredPosts.map(post => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={() => {}} 
          onAddComment={(content) => handleAddComment(post.id, content)} 
        />
      ))
    ) : (
      <div className="bg-[#FFF6F2] p-8 rounded-[10px]  mb-6 overflow-hidden ">
        No posts found matching <strong>{searchQuery}</strong>
      </div>
    )}


    
    </>
    )}
    {activeTab === 'events' && (
  <div className="text-[#874854]">
    <h2
  className={`text-[28px] font-extrabold leading-none  text-[#874854] mb-4 ${titillium.className}`}
>
  Upcoming Events
</h2>

    <div className="mb-4">
  <div className="flex items-center gap-[10px] px-[25px] py-[15px] w-full bg-[#FFF6F2] rounded-full">
  <Search className="w-5 h-5 text-[#874854]" />
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search Events"
    className={`flex-1 bg-transparent focus:outline-none text-left placeholder:text-left text-[#874854] placeholder-[#874854] text-[16px] font-normal leading-none ${inter.className}`}
  />
</div>

</div>




    {viewingEvent && (
  <div className="flex flex-col items-start gap-[10px] px-[20px] py-[12px]
 bg-[#FFF6F2] border border-[#FFCAD4] rounded-[10px] mb-4 text-[#874854]">
    <p className={`text-[16px] font-semibold text-[#5E5E5E] uppercase ${titillium.className}`}>
      {viewingEvent.date.toUpperCase()} @ {viewingEvent.time}
    </p>
    <h3 className={`text-[24px] font-bold text-[#874854] ${titillium.className}`}>
      {viewingEvent.title}
    </h3>
    <p className={`text-[14px] text-[#5E5E5E] leading-5 text-left ${inter.className}`}>
  {viewingEvent.location}
</p>
  </div>
)}

    
    <div className="space-y-4 mt-4">
  {filteredEvents.length > 0 ? (
    filteredEvents.map((event) => {
      const isSelected = viewingEvent?.id === event.id;

      return (
        <button
  key={event.id}
  onClick={() => handleViewLocation(event)}
  className={`w-full text-left flex flex-col border-[4px] items-start gap-[10px] px-[20px] py-[12px]
 transition
    ${isSelected
      ? 'bg-white border-[4px] border-[#F4ACB7] rounded-[10px]'
      : 'bg-[#FFF6F2] border border-transparent rounded-[10px]'
    }`}
  
>
  <div className="flex items-center gap-4 w-full">
    <img
      src={event.image}
      alt={event.title}
      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
    />
    <div className="flex flex-col justify-center">
      <p className={`text-[16px] font-semibold uppercase text-[#5E5E5E] ${titillium.className}`}>
        {event.date.toUpperCase()} @ {event.time}
      </p>
      <h3 className={`text-[24px] font-bold text-[#874854] ${titillium.className}`}>
        {event.title}
      </h3>
      <p className={`text-[14px] text-[#5E5E5E] leading-5 text-left ${inter.className}`}>
        {event.location}
      </p>
    </div>
  </div>
</button>

      );
    })
  ) : (
    <div className="bg-white dark:bg-black rounded-lg p-6 text-center text-gray-500 dark:text-gray-400">
      No events found matching <strong>{searchQuery}</strong>
    </div>
  )}
</div>

  </div>
)}
    {activeTab === 'profile' && (
  <>
  
    <div className="bg-[#FFE5D9] rounded-lg  relative w-full">
      <div className="h-48 bg-pink-200 bg-cover bg-center rounded-t-xl" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')" }} />
      
   
      <div className="absolute left-[30px] -bottom-12 z-50 ">
        <img
          src={mockUsers[0].avatar}
          alt={mockUsers[0].name}
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
      </div>
    </div>

    <div className="flex flex-col items-start gap-[10px] self-stretch rounded-b-[10px] bg-[#FFF6F2] px-[30px] pt-[60px] pb-[30px] text-[#874854]">
  <h2 className={`text-[30px] font-bold leading-none tracking-tight ${titillium.className}`}>
    {mockUsers[0].name}
  </h2>

  <p className={`text-[16px] font-normal leading-6 text-[#5E5E5E] ${inter.className}`}>
    @{mockUsers[0].username}
  </p>

  <p className={`text-[16px] font-normal leading-6 max-w-2xl ${inter.className}`}>
    {mockUsers[0].bio}
  </p>

  <div className={`flex gap-6 mt-4 text-[16px] font-normal flex-wrap leading-6 ${inter.className}`}>
    <div className="flex items-baseline gap-1">
      <span className="text-[20px] font-bold leading-7 text-[#874854]">
        {posts.filter(p => p.user.id === mockUsers[0].id).length}
      </span>
      <span className="text-[16px] font-normal leading-6 text-[#874854]">Posts</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-[20px] font-bold leading-7 text-[#874854]">
        {mockUsers[0].followers.toLocaleString()}
      </span>
      <span className="text-[16px] font-normal leading-6 text-[#874854]">Followers</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-[20px] font-bold leading-7 text-[#874854]">
        {mockUsers[0].following}
      </span>
      <span className="text-[16px] font-normal leading-6 text-[#874854]">Following</span>
    </div>
  </div>
</div>


    
    <div className='bg-[#FFF6F2] mt-2 rounded-xl p-6  text-[#874854]'>
      <div className="flex mt-6 border-b border-[#F4ACB7]">
  {tabs.map(tab => {
    const isActive = activeTabName === tab;

    return (
      <button
        key={tab}
        onClick={() => handleTabClick(tab)}
        className={`
          px-4 py-3 mr-4 text-center text-[16px] leading-none border-b-2 transition-colors
          ${inter.className}
          ${isActive
            ? 'text-[#874854] font-bold border-[#F4ACB7]'
            : 'text-[#5E5E5E] font-normal border-transparent'}
        `}
      >
        {tab}
      </button>
    );
  })}
</div>

  
    <div className="grid grid-cols-2 md:grid-cols-3 gap-[26px] mt-[30px]">
      {posts
        .filter(post => post.user.id === mockUsers[0].id)
        .map(post => (
          <img
            key={post.id}
            src={post.image}
            alt="User post"
            className="w-full h-48 object-cover rounded-lg "
          />
        ))}
    </div>
    </div>
  </>
)}

  </main>
  
  

  
  {activeTab === "feed" && (
<aside
  className="
    hidden
    lg:sticky
    lg:top-4
    lg:self-start
    lg:block
    w-full
    lg:w-[285px]
    h-fit
    space-y-6
    z-10
  "
>
  
  <div className="flex flex-col p-[25px] justify-center items-center gap-[10px] self-stretch rounded-[10px] bg-[#FFCAD4] text-center ">
  <img
    src={mockUsers[0].avatar}
    alt={mockUsers[0].name}
    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
  />
  <h2 className={`text-[#874854] text-[22px] font-black ${titillium.className}`}>
  {mockUsers[0].name}
</h2>
  <p className="text-[#5E5E5E] text-[12px] font-normal text-center font-inter">
    @{mockUsers[0].username}
  </p>
  <p className="text-[#874854] text-[12px] font-normal text-center font-inter mt-2">
    {mockUsers[0].bio}
  </p>

  <div className="flex justify-around w-full mt-4">
    <div>
      <p className={`text-[#874854] text-[18px] font-bold text-center ${titillium.className}`}>
        {mockUsers[0].followers}
      </p>
      <p className="text-[#5E5E5E] text-[12px] font-normal text-center font-inter">Followers</p>
    </div>
    <div>
      <p className={`text-[#874854] text-[18px] font-bold text-center ${titillium.className}`}>
        {mockUsers[0].following}
      </p>
      <p className="text-[#5E5E5E] text-[12px] font-normal text-center font-inter">Following</p>
    </div>
  </div>
</div>


  <div className="flex flex-col p-[25px] justify-center items-start gap-[10px] self-stretch rounded-[10px] bg-[#FFCAD4] text-center">
    <h3 className={`text-[#874854] text-[18px] font-extrabold mb-4 uppercase ${titillium.className}`}>
  Suggested Events
</h3>

    <div className="space-y-4">
      {events.slice(0, 2).map((event) => (
        <div key={event.id} className="flex gap-3 items-center">
          <img
            src={event.image}
            alt={event.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex flex-col flex-1 items-start text-left">
  <p className="text-[#874854] text-[14px] font-semibold leading-none font-inter">
    {event.title}
  </p>

  <div className="flex items-center mt-1 text-[#5E5E5E]">
    <CalendarDays className="w-[15px] h-[15px] mr-1 text-[#5E5E5E]" />
    <span className="text-[10px] font-normal leading-[20px] font-inter">
      Jan 14
    </span>
  </div>
</div>

        </div>
      ))}
    </div>
  </div>
</aside>

  )}
  {activeTab === "events" && (
  <div className="col-span-full md:col-span-2 lg:col-span-1 h-full">
  <div className="w-full h-full min-h-[350px]">
    <DynamicMap
      center={center}
      label={viewingEvent?.title || ""}
    />
  </div>
</div>
)}
  
</div>


 
    <CreatePostModal 
      isOpen={isCreatePostModalOpen}
      onClose={() => setIsCreatePostModalOpen(false)}
      onCreatePost={handleCreatePost}
    />
  


      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        textarea {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default SocialFeedApp;


