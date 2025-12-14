import React, { useState, useEffect } from 'react';
import { Icons, MOCK_EVENTS, MOCK_PRAYERS, MOCK_NOTIFICATIONS, MOCK_TESTIMONIES, MOCK_BOOKS } from '../constants';
import { Prayer, PrayerComment, Event } from '../types';

interface DashboardProps {
  onLogout: () => void;
  userRole: 'member' | 'admin';
}

interface BankDetails {
    bankName: string;
    accountNumber: string;
    accountName: string;
    impactText: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, userRole }) => {
  const isAdmin = userRole === 'admin';
  const [activeTab, setActiveTab] = useState<'home' | 'events' | 'prayers' | 'profile' | 'give' | 'testimony' | 'share-request' | 'notifications' | 'library' | 'kids'>('home');
  
  // Verse State: Keyed by YYYY-MM-DD
  const [verses, setVerses] = useState<Record<string, { text: string; reference: string }>>({
      [new Date().toISOString().split('T')[0]]: {
          text: '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
          reference: 'Jeremiah 29:11'
      }
  });

  // Editor State for Verse
  const [editDate, setEditDate] = useState(new Date().toISOString().split('T')[0]);
  const [tempVerse, setTempVerse] = useState({ text: '', reference: '' });
  
  // Bank Details State
  const [bankDetails, setBankDetails] = useState<BankDetails>({
      bankName: 'First Kingdom Bank',
      accountNumber: '1234 5678 9000',
      accountName: 'TalyaHub Church',
      impactText: 'Your generosity helps us support 3 local food banks and 2 international missions. Thank you for being the hands and feet of Jesus.'
  });

  // Profile State
  const [userProfile, setUserProfile] = useState({
    name: isAdmin ? 'Church Admin' : 'John Doe',
    email: isAdmin ? 'admin@church.com' : 'john.doe@example.com',
    initials: isAdmin ? 'A' : 'J'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile);

  const [events, setEvents] = useState<any[]>(MOCK_EVENTS);
  const [prayers, setPrayers] = useState<Prayer[]>(MOCK_PRAYERS);
  const [testimonies, setTestimonies] = useState<any[]>(MOCK_TESTIMONIES);

  // Editing UI State
  const [isEditingHome, setIsEditingHome] = useState(false);
  const [isEditingGive, setIsEditingGive] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<any>>({});

  // Interaction State
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  
  // Share Request State
  const [requestContent, setRequestContent] = useState('');
  const [requestCategory, setRequestCategory] = useState('General');

  // Book Reader State
  const [readingBook, setReadingBook] = useState<any>(null);

  // --- Effects ---

  // Load verse data into temp state when edit mode is toggled or date changes
  useEffect(() => {
    if (isEditingHome) {
        const existing = verses[editDate];
        setTempVerse(existing || { text: '', reference: '' });
    }
  }, [isEditingHome, editDate, verses]);

  // Sync temp profile when entering edit mode
  useEffect(() => {
    if (isEditingProfile) {
        setTempProfile(userProfile);
    }
  }, [isEditingProfile, userProfile]);

  // --- Handlers ---

  const handleSaveProfile = () => {
      const initials = tempProfile.name.trim().charAt(0).toUpperCase();
      setUserProfile({ ...tempProfile, initials: initials || '?' });
      setIsEditingProfile(false);
  };

  const handleSaveVerse = () => {
      setVerses(prev => ({
          ...prev,
          [editDate]: tempVerse
      }));
      setIsEditingHome(false);
      setEditDate(new Date().toISOString().split('T')[0]); 
  };

  const getTodayVerse = () => {
      const today = new Date().toISOString().split('T')[0];
      return verses[today] || {
          text: '"Thy word is a lamp unto my feet, and a light unto my path."',
          reference: 'Psalm 119:105'
      };
  };

  const togglePrayed = (id: string) => {
    setPrayers(current => current.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isPrayed: !p.isPrayed,
          prayedCount: p.isPrayed ? p.prayedCount - 1 : p.prayedCount + 1
        };
      }
      return p;
    }));
  };

  const handleDeletePrayer = (id: string) => {
      if(window.confirm("Are you sure you want to delete this prayer request?")) {
          setPrayers(prev => prev.filter(p => p.id !== id));
      }
  };

  const handleDeleteTestimony = (id: string) => {
    if(window.confirm("Are you sure you want to delete this testimony?")) {
        setTestimonies(prev => prev.filter(t => t.id !== id));
    }
  };

  const submitComment = (prayerId: string) => {
    if (!commentText.trim()) return;
    
    setPrayers(prev => prev.map(p => {
        if (p.id === prayerId) {
            const newComment: PrayerComment = {
                id: Date.now().toString(),
                userName: isAdmin ? 'Pastor (Admin)' : 'John Doe',
                text: commentText,
                timestamp: 'Just now'
            };
            return {
                ...p,
                commentCount: p.commentCount + 1,
                comments: [...p.comments, newComment]
            };
        }
        return p;
    }));
    setCommentText('');
  };

  const submitRequest = () => {
    if (!requestContent.trim()) return;

    const newPrayer: Prayer = {
      id: Date.now().toString(),
      userName: isAdmin ? 'Church Admin' : 'John Doe',
      userInitial: isAdmin ? 'A' : 'J',
      content: requestContent,
      timestamp: 'Just now',
      prayedCount: 0,
      commentCount: 0,
      isPrayed: false,
      category: requestCategory,
      comments: []
    };

    setPrayers([newPrayer, ...prayers]);
    setRequestContent('');
    setRequestCategory('General');
    setActiveTab('prayers');
  };

  // --- Event Management ---
  
  const handleEditEvent = (event: any) => {
      setCurrentEvent(event);
      setShowEventModal(true);
  };

  const handleCreateEvent = () => {
      setCurrentEvent({
          id: '',
          title: '',
          date: '',
          time: '',
          location: '',
          category: 'Worship',
          description: '',
          imageUrl: 'https://picsum.photos/400/200?random=' + Math.random()
      });
      setShowEventModal(true);
  };

  const handleDeleteEvent = (id: string) => {
      if(window.confirm("Delete this event?")) {
          setEvents(prev => prev.filter(e => e.id !== id));
      }
  };

  const saveEvent = (e: React.FormEvent) => {
      e.preventDefault();
      if (!currentEvent.title) return;

      if (currentEvent.id) {
          // Edit existing
          setEvents(prev => prev.map(ev => ev.id === currentEvent.id ? currentEvent : ev));
      } else {
          // Create new
          const newEvent = { ...currentEvent, id: Date.now().toString() };
          setEvents(prev => [...prev, newEvent]);
      }
      setShowEventModal(false);
  };

  // --- Render Functions ---

  const renderHome = () => {
      const todayVerse = getTodayVerse();
      
      return (
        <div className="space-y-6 animate-fadeIn pb-32">
           
           {/* Recent Notification Card */}
           {MOCK_NOTIFICATIONS.length > 0 && (
            <div className="bg-white p-4 rounded-xl border-l-4 border-amber-500 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-amber-500">
                        <Icons.Bell />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 text-sm">New Updates Available</h3>
                        <p className="text-xs text-slate-500">Check your notifications</p>
                    </div>
                </div>
                <button onClick={() => setActiveTab('notifications')} className="text-xs font-bold text-slate-900 uppercase tracking-wider hover:text-amber-600">
                    View
                </button>
            </div>
           )}

           {/* Verse of the Day Card */}
           <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl text-center relative overflow-hidden group">
               <div className="relative z-10">
                   <div className="mb-4 flex justify-center">
                       <div className="p-3 bg-white/5 rounded-full border border-white/10 text-amber-400">
                           <Icons.Sparkles />
                       </div>
                   </div>
                   
                   {isEditingHome ? (
                       <div className="space-y-4 animate-fadeIn">
                           <textarea 
                               value={tempVerse.text}
                               onChange={(e) => setTempVerse({...tempVerse, text: e.target.value})}
                               className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white text-center font-serif text-lg leading-relaxed focus:ring-1 focus:ring-amber-500 outline-none"
                               rows={4}
                           />
                           <input 
                               value={tempVerse.reference}
                               onChange={(e) => setTempVerse({...tempVerse, reference: e.target.value})}
                               className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-center font-bold text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                           />
                           <div className="flex gap-2 justify-center pt-2">
                               <button onClick={() => setIsEditingHome(false)} className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">Cancel</button>
                               <button onClick={handleSaveVerse} className="px-6 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-amber-500 transition-colors shadow-lg">Save</button>
                           </div>
                       </div>
                   ) : (
                       <div className="animate-fadeIn">
                           <h2 className="text-2xl md:text-3xl font-serif font-medium leading-relaxed mb-6 italic text-slate-100">
                               {todayVerse.text}
                           </h2>
                           <div className="inline-block px-4 py-1 border border-amber-500/30 rounded-full bg-amber-500/10">
                                <p className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                                    {todayVerse.reference}
                                </p>
                           </div>
                           {isAdmin && (
                               <button 
                                   onClick={() => {
                                       setIsEditingHome(true);
                                       setEditDate(new Date().toISOString().split('T')[0]);
                                       setTempVerse(todayVerse);
                                   }}
                                   className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors"
                               >
                                   <Icons.Edit />
                               </button>
                           )}
                       </div>
                   )}
               </div>
               
               {/* Background decoration - subtle spiritual glow */}
               <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black"></div>
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>
            </div>
            
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setActiveTab('prayers')} className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-amber-200 transition-all group">
                    <div className="w-12 h-12 bg-stone-50 text-slate-700 rounded-full flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        <Icons.Heart />
                    </div>
                    <span className="font-bold text-slate-800 text-sm font-serif">Prayer Wall</span>
                </button>
                 <button onClick={() => setActiveTab('events')} className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-amber-200 transition-all group">
                    <div className="w-12 h-12 bg-stone-50 text-slate-700 rounded-full flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        <Icons.Calendar />
                    </div>
                    <span className="font-bold text-slate-800 text-sm font-serif">Events</span>
                </button>
                 <button onClick={() => setActiveTab('give')} className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-amber-200 transition-all group">
                    <div className="w-12 h-12 bg-stone-50 text-slate-700 rounded-full flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        <Icons.Bank />
                    </div>
                    <span className="font-bold text-slate-800 text-sm font-serif">Give</span>
                </button>
                 <button onClick={() => setActiveTab('testimony')} className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-amber-200 transition-all group">
                    <div className="w-12 h-12 bg-stone-50 text-slate-700 rounded-full flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        <Icons.Sparkles />
                    </div>
                    <span className="font-bold text-slate-800 text-sm font-serif">Stories</span>
                </button>
                 <button onClick={() => setActiveTab('library')} className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-amber-200 transition-all group">
                    <div className="w-12 h-12 bg-stone-50 text-slate-700 rounded-full flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        <Icons.Book />
                    </div>
                    <span className="font-bold text-slate-800 text-sm font-serif">Library</span>
                </button>
                 <button onClick={() => setActiveTab('kids')} className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-amber-200 transition-all group">
                    <div className="w-12 h-12 bg-stone-50 text-slate-700 rounded-full flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        <Icons.Smile />
                    </div>
                    <span className="font-bold text-slate-800 text-sm font-serif">Kids Corner</span>
                </button>
            </div>
          </div>
      );
  };

  const renderLibrary = () => {
    if (readingBook) {
        return (
            <div className="animate-fadeIn pb-32">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mb-6 sticky top-24 z-20">
                    <button 
                        onClick={() => setReadingBook(null)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4 transition-colors"
                    >
                        <Icons.ChevronLeft />
                        <span className="font-bold text-sm">Back to Library</span>
                    </button>
                    <h2 className="text-2xl font-serif font-bold text-slate-900">{readingBook.title}</h2>
                    <p className="text-slate-500 text-sm font-serif italic">by {readingBook.author}</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                    <div className="prose prose-slate prose-lg font-serif leading-loose text-slate-700 max-w-none">
                        {readingBook.content.split('\n').map((para: string, i: number) => (
                            <p key={i} className="mb-4">{para}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fadeIn pb-32">
            <div className="bg-amber-800 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-serif font-bold mb-2">Church Library</h2>
                    <p className="text-amber-100 text-sm">Resources for your spiritual growth.</p>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {MOCK_BOOKS.map((book: any) => (
                    <button 
                        key={book.id}
                        onClick={() => setReadingBook(book)}
                        className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden text-left group hover:shadow-md hover:border-amber-200 transition-all flex flex-col"
                    >
                        <div className="aspect-[2/3] bg-slate-200 relative overflow-hidden">
                            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-slate-900 text-sm font-serif leading-tight mb-1">{book.title}</h3>
                            <p className="text-xs text-slate-500 italic mb-3">{book.author}</p>
                            <span className="mt-auto text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded-full w-fit">Read Now</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
  };

  const renderKidsCorner = () => (
    <div className="space-y-6 animate-fadeIn pb-32">
        <div className="bg-sky-400 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-full">
                        <Icons.Smile />
                    </div>
                    <h2 className="text-2xl font-serif font-bold">Kids Corner</h2>
                </div>
                <p className="text-sky-50 text-sm font-medium">Fun, faith, and learning for our little ones!</p>
            </div>
            {/* Playful circles background */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-[-20px] left-8 w-24 h-24 bg-pink-400 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-lime-400 rounded-full opacity-30 blur-2xl"></div>
        </div>

        <div className="space-y-4">
            <h3 className="font-bold text-slate-800 px-1">This Week's Lesson</h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
                    <img src="https://picsum.photos/600/350?random=kids" alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                        <Icons.Play />
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="font-bold text-slate-900">David & Goliath</h4>
                    <p className="text-sm text-slate-500 mt-1">Learn how faith can conquer any giant in this animated story.</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-100 p-4 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-end group cursor-pointer hover:shadow-md transition-shadow">
                <span className="font-bold text-yellow-800 relative z-10">Sing Along</span>
                <div className="absolute top-2 right-2 text-yellow-600/20 transform scale-150 rotate-12">
                    <Icons.Play />
                </div>
            </div>
            <div className="bg-pink-100 p-4 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-end group cursor-pointer hover:shadow-md transition-shadow">
                <span className="font-bold text-pink-800 relative z-10">Coloring</span>
                <div className="absolute top-2 right-2 text-pink-600/20 transform scale-150 -rotate-12">
                    <Icons.Edit />
                </div>
            </div>
             <div className="bg-lime-100 p-4 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-end group cursor-pointer hover:shadow-md transition-shadow">
                <span className="font-bold text-lime-800 relative z-10">Bible Trivia</span>
                <div className="absolute top-2 right-2 text-lime-600/20 transform scale-150 rotate-6">
                    <Icons.HelpCircle />
                </div>
            </div>
             <div className="bg-purple-100 p-4 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-end group cursor-pointer hover:shadow-md transition-shadow">
                <span className="font-bold text-purple-800 relative z-10">Activities</span>
                <div className="absolute top-2 right-2 text-purple-600/20 transform scale-150 -rotate-6">
                    <Icons.Star />
                </div>
            </div>
        </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-fadeIn pb-32">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center relative">
        <button 
           onClick={() => setIsEditingProfile(!isEditingProfile)}
           className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2"
        >
           {isEditingProfile ? <Icons.Cross /> : <Icons.Edit />}
        </button>
        
        <div className="w-24 h-24 rounded-full border-4 border-stone-100 bg-slate-900 flex items-center justify-center text-white text-3xl font-serif font-bold mb-4 shadow-md">
          {isEditingProfile ? (tempProfile.name.charAt(0).toUpperCase() || '?') : userProfile.initials}
        </div>

        {isEditingProfile ? (
            <div className="w-full max-w-xs space-y-4 animate-fadeIn">
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Display Name</label>
                   <input 
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                      className="w-full bg-stone-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-slate-900 focus:outline-none font-serif font-bold text-center"
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                   <input 
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                      className="w-full bg-stone-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-slate-900 focus:outline-none text-center"
                   />
                </div>
                <div className="flex gap-2 pt-2">
                    <button 
                       onClick={() => setIsEditingProfile(false)}
                       className="flex-1 py-2 text-slate-500 font-bold text-sm hover:text-slate-700"
                    >
                        Cancel
                    </button>
                    <button 
                       onClick={handleSaveProfile}
                       className="flex-1 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm shadow-md hover:bg-slate-800"
                    >
                        Save
                    </button>
                </div>
            </div>
        ) : (
            <>
                <h2 className="text-2xl font-serif font-bold text-slate-900">{userProfile.name}</h2>
                <p className="text-slate-500 text-sm">{userProfile.email}</p>
                <div className={`mt-4 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isAdmin ? 'bg-slate-100 text-slate-700' : 'bg-amber-50 text-amber-700'}`}>
                  {isAdmin ? 'Administrator' : 'Member'}
                </div>
            </>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Prayers', value: '142', icon: <Icons.Heart /> },
          { label: 'Events', value: '12', icon: <Icons.Calendar /> },
          { label: 'Streak', value: '8', icon: <Icons.Sparkles /> },
        ].map((stat, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm flex flex-col items-center gap-1">
              <div className="text-amber-600 scale-75">{stat.icon}</div>
              <span className="text-lg font-bold text-slate-900 font-serif">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">{stat.label}</span>
           </div>
        ))}
      </div>

      {/* Menu Groups */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {[
          { label: isAdmin ? 'Church Information' : 'Personal Information', icon: <Icons.User /> },
          { label: 'Notifications', icon: <Icons.Bell /> },
          { label: 'Settings', icon: <Icons.Settings /> },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors border-b border-stone-50 last:border-0 group">
             <div className="w-10 h-10 rounded-full bg-stone-50 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
               {item.icon}
             </div>
             <div className="flex-1 text-left">
               <span className="block text-sm font-bold text-slate-800">{item.label}</span>
             </div>
             <Icons.ChevronRight />
          </button>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full bg-slate-100 text-slate-600 p-4 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
      >
        <Icons.LogOut />
        Sign Out
      </button>
      
      <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest pt-4">
        TalyaHub Version 1.0.4
      </p>
    </div>
  );

  const renderShareRequest = () => (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <h2 className="text-xl font-serif font-bold text-slate-900 mb-6">Share a Request</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {['Healing', 'Praise', 'Comfort', 'Guidance', 'Family', 'Other'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setRequestCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    requestCategory === cat 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-stone-50 text-slate-500 hover:bg-stone-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">How can we pray for you?</label>
            <textarea
              value={requestContent}
              onChange={(e) => setRequestContent(e.target.value)}
              placeholder="Share your burden or praise report..."
              className="w-full h-40 bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 resize-none outline-none"
            />
          </div>

          <button 
            onClick={submitRequest}
            disabled={!requestContent.trim()}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-bold text-base shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icons.Send />
            Post Request
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4 animate-fadeIn pb-32">
      {MOCK_NOTIFICATIONS.map(note => (
        <div key={note.id} className={`p-4 rounded-xl border flex gap-4 items-start ${note.isRead ? 'bg-white border-stone-100' : 'bg-white border-amber-100 shadow-sm'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            note.type === 'prayer' ? 'bg-amber-50 text-amber-600' : 
            'bg-stone-100 text-slate-600'
          }`}>
            {note.type === 'prayer' ? <Icons.Heart /> : <Icons.Bell />}
          </div>
          <div className="flex-1">
            <h4 className={`text-sm ${note.isRead ? 'font-medium text-slate-800' : 'font-bold text-slate-900'}`}>{note.title}</h4>
            <p className="text-xs text-slate-500 mt-1">{note.time}</p>
          </div>
          {!note.isRead && (
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderPrayers = () => (
    <div className="space-y-6 animate-fadeIn pb-32">
       <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
             <h2 className="text-2xl font-serif font-bold mb-2">Prayer Wall</h2>
             <p className="text-slate-300 text-sm">Share burdens, find support, and pray for one another.</p>
             <button 
                onClick={() => setActiveTab('share-request')}
                className="mt-6 bg-white text-slate-900 px-5 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-amber-50 transition-colors flex items-center gap-2"
             >
                <Icons.Plus />
                Share Request
             </button>
          </div>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
       </div>

       <div className={`grid gap-4 ${isAdmin ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {prayers.map(prayer => (
             <div key={prayer.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative group h-full">
                {isAdmin && (
                    <button 
                        onClick={() => handleDeletePrayer(prayer.id)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                        title="Delete Prayer"
                    >
                        <Icons.Cross />
                    </button>
                )}
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-slate-600 font-serif font-bold border border-stone-200">
                         {prayer.userInitial}
                      </div>
                      <div>
                         <h3 className="font-bold text-slate-900 text-sm">{prayer.userName}</h3>
                         <div className="flex items-center gap-2">
                             <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider bg-amber-50 px-2 rounded-full">{prayer.category}</span>
                             <span className="text-[10px] text-slate-400">{prayer.timestamp}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                   {prayer.content}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-stone-50 mt-auto">
                   <button 
                      onClick={() => togglePrayed(prayer.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors px-3 py-1.5 rounded-full ${prayer.isPrayed ? 'bg-amber-50 text-amber-600' : 'bg-stone-50 text-slate-500 hover:bg-stone-100'}`}
                   >
                      <Icons.Heart />
                      {prayer.prayedCount} Prayed
                   </button>
                   
                   <button 
                      onClick={() => setActiveCommentId(activeCommentId === prayer.id ? null : prayer.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors ml-auto"
                   >
                      <Icons.ChatBubble />
                      {prayer.commentCount} Comments
                   </button>
                </div>

                {/* Comments Section */}
                {activeCommentId === prayer.id && (
                   <div className="mt-4 pt-4 border-t border-stone-50 animate-fadeIn">
                      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                         {prayer.comments.length > 0 ? (
                            prayer.comments.map(comment => (
                               <div key={comment.id} className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                                  <div className="flex justify-between items-baseline mb-1">
                                     <span className="text-xs font-bold text-slate-900">{comment.userName}</span>
                                     <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-xs text-slate-600">{comment.text}</p>
                                </div>
                            ))
                         ) : (
                            <p className="text-center text-xs text-slate-400 italic py-2">No comments yet. Be the first to encourage!</p>
                         )}
                      </div>
                      
                      <div className="flex gap-2">
                         <input 
                            type="text" 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write an encouragement..."
                            className="flex-1 bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-slate-900 outline-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') submitComment(prayer.id);
                            }}
                         />
                         <button 
                            onClick={() => submitComment(prayer.id)}
                            disabled={!commentText.trim()}
                            className="bg-slate-900 text-white p-2 rounded-lg disabled:opacity-50"
                         >
                            <Icons.Send />
                         </button>
                      </div>
                   </div>
                )}
             </div>
          ))}
       </div>
    </div>
  );

  const renderGive = () => (
    <div className="space-y-6 animate-fadeIn pb-32">
       <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative">
          {isAdmin && (
              <button 
                  onClick={() => setIsEditingGive(!isEditingGive)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
                  title="Edit Bank Details"
              >
                 <Icons.Edit />
              </button>
          )}

          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <Icons.Bank />
             </div>
             <h3 className="text-2xl font-serif font-bold text-slate-900">Tithes & Offerings</h3>
             <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">"For where your treasure is, there your heart will be also."</p>
          </div>

          <div className="space-y-4">
             {isEditingGive ? (
                <div className={isAdmin ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"}>
                   <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 uppercase">Bank Name</label>
                       <input 
                          value={bankDetails.bankName} 
                          onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                          className="w-full bg-stone-50 border border-slate-200 rounded-lg p-2 text-sm" 
                       />
                   </div>
                   <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 uppercase">Account Number</label>
                       <input 
                          value={bankDetails.accountNumber} 
                          onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                          className="w-full bg-stone-50 border border-slate-200 rounded-lg p-2 text-sm" 
                       />
                   </div>
                   <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 uppercase">Account Name</label>
                       <input 
                          value={bankDetails.accountName} 
                          onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                          className="w-full bg-stone-50 border border-slate-200 rounded-lg p-2 text-sm" 
                       />
                   </div>
                   <button 
                      onClick={() => setIsEditingGive(false)} 
                      className="w-full bg-slate-900 text-white py-2 rounded-lg text-xs font-bold mt-2 md:col-span-3"
                   >
                       Save Changes
                   </button>
                </div>
             ) : (
                 <div className={isAdmin ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"}>
                     <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bank Name</p>
                        <p className="text-slate-900 font-serif font-bold text-lg">{bankDetails.bankName}</p>
                     </div>
                     
                     <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 relative group cursor-pointer transition-colors hover:bg-emerald-50" onClick={() => { navigator.clipboard.writeText(bankDetails.accountNumber.replace(/\s/g, '')); }}>
                        <p className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-wider mb-1">Account Number</p>
                        <div className="flex justify-between items-center">
                           <p className="text-emerald-900 font-serif font-bold text-xl tracking-widest break-all">{bankDetails.accountNumber}</p>
                           <div className="text-emerald-400 p-2 hover:text-emerald-600">
                              <Icons.Copy />
                           </div>
                        </div>
                     </div>

                     <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Account Name</p>
                        <p className="text-slate-900 font-serif font-bold text-lg">{bankDetails.accountName}</p>
                     </div>
                 </div>
             )}
          </div>
       </div>

       <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden shadow-xl">
          <div className="relative z-10">
             <h3 className="text-xl font-serif mb-2 font-bold text-amber-50">Your Impact</h3>
             {isEditingGive ? (
                 <textarea 
                    value={bankDetails.impactText}
                    onChange={(e) => setBankDetails({...bankDetails, impactText: e.target.value})}
                    className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-3 text-sm h-24 outline-none focus:border-amber-500"
                 />
             ) : (
                 <p className="text-slate-300 text-sm leading-relaxed">
                    {bankDetails.impactText}
                 </p>
             )}
          </div>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>
       </div>
    </div>
  );

  const renderTestimony = () => (
    <div className="space-y-6 animate-fadeIn pb-32">
        <div className="bg-amber-600 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
             <h2 className="text-2xl font-serif font-bold mb-2">Testimonies</h2>
             <p className="text-amber-100 text-sm">Celebrate what God is doing in our community.</p>
             <button className="mt-6 bg-white text-amber-700 px-5 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-amber-50 transition-colors flex items-center gap-2">
                <Icons.Plus />
                Share Story
             </button>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
       </div>

       <div className={`grid gap-4 ${isAdmin ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {testimonies.map(story => (
             <div key={story.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative h-full">
                {isAdmin && (
                    <button 
                        onClick={() => handleDeleteTestimony(story.id)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                    >
                        <Icons.Cross />
                    </button>
                )}
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 font-serif font-bold border border-amber-100">
                         {story.userInitial}
                      </div>
                      <div>
                         <h3 className="font-bold text-slate-900 text-sm">{story.userName}</h3>
                         <p className="text-[10px] text-slate-400 uppercase tracking-wider">{story.timestamp}</p>
                      </div>
                   </div>
                </div>

                <p className="text-slate-700 text-lg font-serif italic leading-relaxed mb-6">
                   "{story.content}"
                </p>

                <div className="flex items-center gap-2 pt-2 border-t border-stone-50 mt-auto">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full transition-colors">
                        <Icons.Heart />
                        {story.likes} Likes
                    </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6 animate-fadeIn pb-32">
       <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
             <h2 className="text-2xl font-serif font-bold mb-2">Upcoming Events</h2>
             <p className="text-slate-300 text-sm">Join us for worship, fellowship, and growth.</p>
             {isAdmin && (
                 <button 
                    onClick={handleCreateEvent}
                    className="mt-6 bg-white text-slate-900 px-5 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
                 >
                    <Icons.Plus />
                    Add Event
                 </button>
             )}
          </div>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
       </div>

       <div className={`grid gap-4 ${isAdmin ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {events.map(event => (
             <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col h-full group transition-shadow hover:shadow-md">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                   <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                      {event.category}
                   </div>
                   {isAdmin && (
                       <div className="absolute top-4 right-4 flex gap-2">
                           <button 
                               onClick={() => handleEditEvent(event)}
                               className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-600 hover:text-amber-600 transition-colors shadow-sm"
                           >
                               <Icons.Edit />
                           </button>
                           <button 
                               onClick={() => handleDeleteEvent(event.id)}
                               className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-600 transition-colors shadow-sm"
                           >
                               <Icons.Cross />
                           </button>
                       </div>
                   )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-3">
                       <h3 className="font-bold text-slate-900 text-lg leading-tight font-serif">{event.title}</h3>
                   </div>
                   
                   <div className="space-y-2 mb-4">
                       <div className="flex items-center gap-2 text-slate-500 text-sm">
                           <Icons.Calendar />
                           <span className="font-medium">{event.date} • {event.time}</span>
                       </div>
                       <div className="flex items-center gap-2 text-slate-500 text-sm">
                           <Icons.MapPin />
                           <span className="font-medium">{event.location}</span>
                       </div>
                   </div>

                   <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                       {event.description}
                   </p>

                   <button className="w-full py-3 bg-stone-50 text-slate-900 rounded-lg font-bold text-sm hover:bg-stone-100 transition-colors mt-auto border border-stone-200">
                       Event Details
                   </button>
                </div>
             </div>
          ))}
       </div>

       {/* Event Modal */}
       {showEventModal && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
               <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">
                   <div className="flex justify-between items-center mb-6">
                       <h3 className="text-xl font-bold text-slate-900 font-serif">
                           {currentEvent.id ? 'Edit Event' : 'New Event'}
                       </h3>
                       <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-slate-600">
                           <Icons.Cross />
                       </button>
                   </div>
                   
                   <form onSubmit={saveEvent} className="space-y-4">
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Event Title</label>
                           <input 
                               value={currentEvent.title} 
                               onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                               className="w-full bg-stone-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-slate-900 outline-none"
                               required
                           />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                               <input 
                                   value={currentEvent.date} 
                                   onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                                   className="w-full bg-stone-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-slate-900 outline-none"
                                   placeholder="Mon, Jan 1"
                                   required
                               />
                           </div>
                           <div>
                               <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                               <input 
                                   value={currentEvent.time} 
                                   onChange={(e) => setCurrentEvent({...currentEvent, time: e.target.value})}
                                   className="w-full bg-stone-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-slate-900 outline-none"
                                   placeholder="10:00 AM"
                                   required
                               />
                           </div>
                       </div>
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                           <input 
                               value={currentEvent.location} 
                               onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
                               className="w-full bg-stone-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-slate-900 outline-none"
                               required
                           />
                       </div>
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                           <select 
                               value={currentEvent.category} 
                               onChange={(e) => setCurrentEvent({...currentEvent, category: e.target.value})}
                               className="w-full bg-stone-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-slate-900 outline-none"
                           >
                               <option value="Worship">Worship</option>
                               <option value="Youth">Youth</option>
                               <option value="Outreach">Outreach</option>
                               <option value="Family">Family</option>
                               <option value="Special">Special</option>
                           </select>
                       </div>
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                           <textarea 
                               value={currentEvent.description} 
                               onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                               className="w-full bg-stone-50 border border-slate-200 rounded-lg p-3 text-sm h-24 resize-none focus:ring-1 focus:ring-slate-900 outline-none"
                               required
                           />
                       </div>
                       
                       <button 
                           type="submit"
                           className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors mt-4"
                       >
                           {currentEvent.id ? 'Save Changes' : 'Create Event'}
                       </button>
                   </form>
               </div>
           </div>
       )}
    </div>
  );

  const navigationItems = [
      { id: 'home', label: 'Home', icon: <Icons.Home /> },
      { id: 'events', label: 'Events', icon: <Icons.Calendar /> },
      { id: 'give', label: 'Give', icon: <Icons.HeartSolid /> },
      { id: 'prayers', label: 'Pray', icon: <Icons.HandRaised /> },
      { id: 'testimony', label: 'Stories', icon: <Icons.Sparkles /> },
      { id: 'library', label: 'Library', icon: <Icons.Book /> },
      { id: 'kids', label: 'Kids', icon: <Icons.Smile /> },
      { id: 'profile', label: 'Admin', icon: <Icons.User /> }, 
  ];

  if (isAdmin) {
      return (
          <div className="flex h-screen bg-[#fafaf9] overflow-hidden font-sans">
              {/* Desktop Sidebar - Clean professional look */}
              <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-white h-full z-20">
                  <div className="p-8 pb-4">
                      <h1 className="text-2xl font-serif font-bold text-white tracking-tight">TalyaHub</h1>
                      <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.2em] block mt-1">ADMIN PORTAL</span>
                  </div>
                  
                  <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-4">
                      {navigationItems.map(item => (
                          <button
                              key={item.id}
                              onClick={() => setActiveTab(item.id as any)}
                              className={`w-full flex items-center gap-4 px-6 py-4 rounded-lg transition-all group ${
                                  activeTab === item.id 
                                  ? 'bg-white/10 text-white font-semibold border-l-4 border-amber-500' 
                                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                              }`}
                          >
                              <div className={`${activeTab === item.id ? 'text-amber-500' : 'text-slate-500 group-hover:text-white'}`}>{item.icon}</div>
                              <span className="text-sm tracking-wide">{item.label}</span>
                          </button>
                      ))}
                  </nav>

                  <div className="p-8 border-t border-white/10">
                      <button 
                        onClick={onLogout}
                        className="w-full flex items-center gap-4 text-slate-400 hover:text-white transition-all pl-2"
                      >
                          <Icons.LogOut />
                          <span className="text-sm font-medium">Sign Out</span>
                      </button>
                  </div>
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 h-full overflow-y-auto bg-stone-50">
                   {/* Mobile Header */}
                  <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-serif font-bold tracking-tight text-slate-900">TalyaHub <span className="text-xs font-sans font-normal text-slate-400 ml-1">Admin</span></h1>
                    <div className="flex items-center gap-4">
                            <button onClick={() => setActiveTab('notifications')} className="relative text-slate-400 hover:text-slate-900">
                                <Icons.Bell />
                                {MOCK_NOTIFICATIONS.some(n => !n.isRead) && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-white"></span>
                                )}
                            </button>
                            <button onClick={() => setActiveTab('profile')} className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xs border-2 border-slate-100">
                                {userProfile.initials}
                            </button>
                    </div>
                  </div>

                  <div className="p-6 pb-24 md:p-12">
                    <div className="max-w-5xl mx-auto">
                        {/* Desktop Header */}
                        <div className="hidden md:flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-slate-900 capitalize">
                                    {activeTab === 'profile' ? 'Admin Settings' : activeTab}
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">Manage your congregation and content</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center font-bold text-slate-700">
                                    {userProfile.initials}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        {activeTab === 'home' && renderHome()}
                        {activeTab === 'events' && renderEvents()}
                        {activeTab === 'prayers' && renderPrayers()}
                        {activeTab === 'give' && renderGive()}
                        {activeTab === 'profile' && renderProfile()}
                        {activeTab === 'testimony' && renderTestimony()}
                        {activeTab === 'share-request' && renderShareRequest()}
                        {activeTab === 'notifications' && renderNotifications()}
                        {activeTab === 'library' && renderLibrary()}
                        {activeTab === 'kids' && renderKidsCorner()}
                    </div>
                  </div>
              </main>

              {/* Admin Mobile Bottom Navigation */}
              <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 px-6 py-3 pb-6 flex justify-between items-center z-40 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
                  {navigationItems.map(item => {
                      if (['give', 'testimony', 'library', 'kids'].includes(item.id)) return null;
                      return (
                          <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`flex flex-col items-center gap-1 min-w-[3rem] ${activeTab === item.id ? 'text-slate-900' : 'text-slate-400'}`}
                          >
                             <div className={`${activeTab === item.id ? 'text-amber-600' : 'text-slate-400'}`}>
                                 {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                             </div>
                             <span className={`text-[10px] font-bold uppercase tracking-wide ${activeTab === item.id ? 'text-slate-900' : 'text-slate-400'}`}>{item.label}</span>
                          </button>
                      );
                  })}
              </div>
          </div>
      );
  }

  // Mobile View for Member
  return (
    <div className="relative min-h-screen bg-stone-50">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-serif font-bold text-slate-900 tracking-tight">TalyaHub</h1>
            <div className="flex items-center gap-4">
                <button onClick={() => setActiveTab('notifications')} className="relative text-slate-400 hover:text-slate-900 transition-colors">
                    <Icons.Bell />
                    {MOCK_NOTIFICATIONS.some(n => !n.isRead) && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white"></span>
                    )}
                </button>
                <button onClick={() => setActiveTab('profile')} className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold border-2 border-slate-100 shadow-sm">
                    {userProfile.initials}
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-6 pb-24">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'prayers' && renderPrayers()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'give' && renderGive()}
            {activeTab === 'testimony' && renderTestimony()}
            {activeTab === 'share-request' && renderShareRequest()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'library' && renderLibrary()}
            {activeTab === 'kids' && renderKidsCorner()}
        </div>

        {/* Bottom Navigation (Professional style) */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 px-6 py-4 z-40 flex justify-between items-center pb-safe shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
            <button 
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <div className={activeTab === 'home' ? 'text-amber-600' : ''}>
                    <Icons.Home />
                </div>
            </button>
                <button 
                onClick={() => setActiveTab('events')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'events' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <div className={activeTab === 'events' ? 'text-amber-600' : ''}>
                    <Icons.Calendar />
                </div>
            </button>
                <button 
                onClick={() => setActiveTab('prayers')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'prayers' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
                 <div className={activeTab === 'prayers' ? 'text-amber-600' : ''}>
                    <Icons.Heart />
                </div>
            </button>
                <button 
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
                 <div className={activeTab === 'profile' ? 'text-amber-600' : ''}>
                    <Icons.User />
                </div>
            </button>
        </div>
    </div>
  );
};

export default Dashboard;