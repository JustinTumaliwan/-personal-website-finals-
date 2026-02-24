import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis'; // 🏎️ NEW IMPORT
import axios from 'axios';
import { 
  MapPin, Code2, Database, Layout, Server, ChevronRight, 
  Activity, Mail, Phone, Camera, Gamepad2, Dumbbell, Trophy, 
  Rocket, Smartphone, Utensils, Monitor, Music, Headphones, PlayCircle,
  Sparkles, Cpu 
} from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};


// 🏎️ The Background Image Dictionary
// You can swap these links later for images saved in your public/images folder!
const sectionBackgrounds = {
  overview: "/images/track.avif", // Track Start Line
  about: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop",   // Sim Racing / Dark Tech
  skills: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",  // Cyber Grid
  projects: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=2000&auto=format&fit=crop", // Garage / Tools
  hobbies: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop",  // Active Track
  audio: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop",    // Concert / Audio
  contact: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2000&auto=format&fit=crop"   // Dark Network
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState({ name: '', text: '' });
  const [isTransmitting, setIsTransmitting] = useState(false);
  
  // 🏁 NEW: This tracks exactly which section you are currently looking at
  const [activeSection, setActiveSection] = useState('overview');

  const lenis = useLenis();


  const scrollToSection = (e, targetId) => {
    e.preventDefault(); // Stops the instant teleport
    if (lenis) {
      lenis.scrollTo(targetId); // Tells Lenis to glide there smoothly
    }
  };

  const API_URL = 'https://personal-website-finals-qezt.onrender.com/api/guestbook';

 // Updated with exact Spotify Track Links
  const favoriteSongs = [
    { title: "Something", artist: "The Beatles", time: "3:02", link: "https://open.spotify.com/track/0pNeVovbipe81PRSS2JQ01" },
    { title: "Magic", artist: "SOS", time: "3:46", link: "https://open.spotify.com/track/6F809e0237G4l8M5q40X9G" },
    { title: "Oo", artist: "Up Dharma Down", time: "4:32", link: "https://open.spotify.com/track/7LweA0sDIfT5FpaHw90HwB" },
    { title: "Fine Line", artist: "Harry Styles", time: "6:17", link: "https://open.spotify.com/track/6VzcQuz50RzXnE0A8EIfR8" }
  ];

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (err) {
      console.error("Telemetry connection lost:", err);
    }
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    setIsTransmitting(true);
    try {
      await axios.post(API_URL, { visitor_name: newMsg.name, message: newMsg.text });
      setNewMsg({ name: '', text: '' });
      fetchMessages();
    } catch (err) {
      console.error("Failed to transmit to pit wall:", err);
    }
    setIsTransmitting(false);
  };

  return (
    // Removed the solid background color here so the fixed background behind it shows through!
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* 🔮 NEW: The Dynamic Crossfading Background */}
      <div className="fixed inset-0 z-[-1] bg-[#0a0a0c]">
        <AnimatePresence>
          <motion.img
            key={activeSection}
            src={sectionBackgrounds[activeSection]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Heavy Vignette Gradient so the text stays perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/80 via-[#0a0a0c]/60 to-[#0a0a0c]/90"></div>
      </div>

      {/* Fixed Top Navigation */}
      <header className="fixed top-0 left-0 w-full px-4 md:px-8 py-4 border-b border-zinc-800/50 bg-[#0a0a0c]/60 backdrop-blur-xl z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-sm skew-x-[-15deg] flex items-center justify-center">
            <Activity className="text-white" size={20} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-white">JT24</span>
        </div>
        <nav className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase">
          {['overview', 'about', 'skills', 'projects', 'hobbies', 'audio', 'contact'].map((navItem) => (
            <a 
              key={navItem} 
              href={`#${navItem}`} 
              onClick={(e) => scrollToSection(e, `#${navItem}`)} // 🏎️ NEW: Triggers the smooth scroll
              className={`transition-colors duration-500 ${activeSection === navItem ? 'text-red-500' : 'text-zinc-500 hover:text-white'}`}
            >
              {navItem === 'hobbies' ? 'Off-Track' : navItem}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content Wrapper */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-24 relative z-10">

        {/* SECTION 1: OVERVIEW */}
        <motion.section 
          id="overview" 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} 
          onViewportEnter={() => setActiveSection('overview')}
          className="min-h-[calc(100vh-6rem)] flex flex-col justify-center py-12"
        >
          {/* NEW: SYSTEM ARCHITECTURE BANNER */}
          <motion.div variants={itemVariant} className="mb-6 bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              <Cpu size={16} className="text-red-500"/> Power Unit Specs
            </div>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {/* Gemini Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                <Sparkles size={12} className="text-blue-400" />
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Co-Piloted by Gemini</span>
              </div>
              
              {/* React Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">React 18 + Vite</span>
              </div>
              
              {/* Tailwind Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">Tailwind CSS</span>
              </div>
              
              {/* Motion Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Framer Motion + Lenis</span>
              </div>
              
              {/* Backend Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">NestJS + Supabase</span>
              </div>
            </div>
          </motion.div>

          {/* The Original 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            <motion.div variants={itemVariant} className="lg:col-span-3 space-y-6">
              <div className="bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-6 rounded-2xl shadow-2xl relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 blur-3xl rounded-full"></div>
                <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Driver Profile</h2>
                <h1 className="text-3xl font-black uppercase mb-1 leading-none text-white">Justin Neil</h1>
                <h1 className="text-3xl font-black uppercase mb-4 text-zinc-400 leading-none">Tumaliwan</h1>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8 bg-zinc-900/50 inline-flex px-3 py-1.5 rounded-full border border-zinc-800">
                  <MapPin size={14} className="text-red-500"/> Parañaque, PH
                </div>
                <div className="space-y-4 border-t border-zinc-800/50 pt-6">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-zinc-500 tracking-wider uppercase">Chassis</span>
                    <span className="font-mono text-sm font-bold text-white">Full-Stack Dev</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-zinc-500 tracking-wider uppercase">Constructor</span>
                    <span className="font-mono text-sm font-bold text-white text-right">Asia Pacific<br/>College</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 group">
               <div className="absolute inset-0 bg-[url('/images/redbull.avif')] bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent"></div>
               <div className="z-10 text-center relative transform group-hover:-translate-y-2 transition-transform duration-700">
                 <div className="inline-block px-4 py-1 border border-red-500/30 bg-red-500/10 backdrop-blur-sm rounded-full mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                   <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">System Online</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 drop-shadow-2xl">
                   ENGINEERED<br/>TO <span className="text-red-600">BUILD</span>.
                 </h2>
               </div>
            </motion.div>

            <motion.div variants={itemVariant} className="lg:col-span-3 space-y-6">
              <div className="bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-6 rounded-2xl shadow-2xl h-full flex flex-col justify-center">
                <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Database size={12}/> Live Telemetry
                </h2>
                <div className="space-y-5">
                  {[
                    { name: 'React', power: 9 }, { name: 'Flutter', power: 8 },
                    { name: 'NestJS', power: 8 }, { name: 'SQL DBs', power: 7 },
                  ].map((tech, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-mono text-zinc-300 group-hover:text-white transition-colors">{tech.name}</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, index) => (
                          <div key={index} className={`h-1.5 flex-1 rounded-sm transition-colors duration-500 ${index < tech.power ? (index > 7 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-cyan-500') : 'bg-zinc-800'}`}></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION 2: ABOUT */}
        <motion.section 
          id="about" 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} 
          onViewportEnter={() => setActiveSection('about')}
          className="min-h-screen flex flex-col justify-center py-12"
        >
          <motion.div variants={itemVariant} className="bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-8 md:p-12 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
               <div className="aspect-square bg-zinc-800 rounded-2xl border border-zinc-700 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-900/40 to-transparent z-10"></div>
                  <img src="/images/pfp.jpg" alt="Justin Tumaliwan" className="object-cover w-full h-full" />
               </div>
            </div>
            <div className="md:w-2/3 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-red-500 flex items-center gap-2">
                <ChevronRight size={16}/> Background Check
              </h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Me</span></h3>
              <p className="text-zinc-300 font-mono text-sm leading-relaxed max-w-2xl">
                I am an IT student at Asia Pacific College, passionate about technology and solving real-world problems through code. Always looking for the most efficient racing line through complex logic.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
                <div className="flex items-center gap-3 text-sm text-zinc-300 font-mono"><Mail className="text-red-500" size={16}/> tumaliwan.jus0724@gmail.com</div>
                <div className="flex items-center gap-3 text-sm text-zinc-300 font-mono"><Phone className="text-red-500" size={16}/> 09774950031</div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 3: SKILLS */}
        <motion.section 
          id="skills" 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} 
          onViewportEnter={() => setActiveSection('skills')}
          className="min-h-screen flex flex-col justify-center py-12"
        >
          <motion.h2 variants={itemVariant} className="text-sm font-bold uppercase tracking-[0.3em] text-red-500 flex items-center gap-2 mb-12">
            <ChevronRight size={16}/> Technical Specifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Development", desc: "Proficient in Python, Java, and Web Technologies (HTML/CSS/JS) to build robust applications.", icon: <Code2/> },
              { title: "UI/UX Design", desc: "Designing intuitive interfaces using Figma and Adobe tools with a focus on user journey.", icon: <Layout/> },
              { title: "Data Analysis", desc: "Experience in managing databases and using SQL to extract meaningful insights.", icon: <Database/> },
              { title: "Mobile Dev", desc: "Building cross-platform and native mobile applications using Flutter and Android Studio.", icon: <Smartphone/> },
              { title: "Low-Code Solutions", desc: "Accelerating digital transformation through rapid development using OutSystems & Power Apps.", icon: <Layers/> },
              { title: "Cloud Computing", desc: "Exploring and implementing scalable solutions using cloud services (AWS/Azure).", icon: <Server/> }
            ].map((skill, i) => (
              <motion.div key={i} variants={itemVariant} className="bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-6 rounded-2xl hover:border-red-500/50 transition-colors group cursor-default">
                <div className="text-red-500 mb-4 bg-red-500/10 w-12 h-12 flex items-center justify-center rounded-lg">{skill.icon}</div>
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2 text-white group-hover:text-red-400 transition-colors">{skill.title}</h3>
                <p className="text-zinc-400 text-xs font-mono leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: PROJECTS */}
        <motion.section 
          id="projects" 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} 
          onViewportEnter={() => setActiveSection('projects')}
          className="min-h-screen flex flex-col justify-center py-12"
        >
          <motion.h2 variants={itemVariant} className="text-sm font-bold uppercase tracking-[0.3em] text-red-500 flex items-center gap-2 mb-12">
            <ChevronRight size={16}/> Constructor Garages
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.a variants={itemVariant} href="https://github.com/APC-SoCIT/APC_2023_2024_3rd_Term_SHS_Bootcamp_BuraIto" target="_blank" rel="noopener noreferrer" className="block bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-8 rounded-2xl relative overflow-hidden group hover:border-red-500/50 transition-all cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
               <Rocket className="absolute -right-6 -top-6 text-zinc-800/30 group-hover:text-red-900/20 transition-colors duration-500 group-hover:scale-110" size={150} />
               <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-red-500">RamBus</h3>
               <p className="text-zinc-300 font-mono text-sm leading-relaxed max-w-[80%] relative z-10">
                 A shuttle service platform that allows students and staff to reserve seats in advance and monitor the shuttle's location in real-time.
               </p>
            </motion.a>

            <motion.a variants={itemVariant} href="https://edulab05.outsystemsenterprise.com/PreviewInDevices/?IsMobilePreview=True&DeviceName=Smartphone&URL=/SimpleOCR_Sample_Mobile/HomeScreen?_ts=639035308457416017" target="_blank" rel="noopener noreferrer" className="block bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-8 rounded-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-all cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
               <Smartphone className="absolute -right-6 -top-6 text-zinc-800/30 group-hover:text-cyan-900/20 transition-colors duration-500 group-hover:scale-110" size={150} />
               <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-cyan-500">VisiTrack</h3>
               <p className="text-zinc-300 font-mono text-sm leading-relaxed max-w-[80%] relative z-10">
                 A mobile-based system developed in OutSystems to streamline the recording, monitoring, and reporting of visitor activities within Asia Pacific College.
               </p>
            </motion.a>
          </div>
        </motion.section>

        {/* SECTION 5: HOBBIES */}
        <motion.section 
          id="hobbies" 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} 
          onViewportEnter={() => setActiveSection('hobbies')}
          className="min-h-screen flex flex-col justify-center py-12 overflow-visible"
        >
          <motion.h2 variants={itemVariant} className="text-sm font-bold uppercase tracking-[0.3em] text-red-500 flex items-center gap-2 mb-16">
            <ChevronRight size={16}/> Off-Track Activities
          </motion.h2>
          
          <motion.div variants={itemVariant} className="flex justify-center items-end py-10 px-4 min-h-[500px]">
            {[
              { title: "Gaming", icon: <Monitor/>, img: "/images/Gaming.jpg" },
              { title: "Sim-Racing", icon: <Gamepad2/>, img: "/images/SimRacing.jpg" },
              { title: "Sports", icon: <Trophy/>, img: "/images/Sports.jpg" },
              { title: "Gym", icon: <Dumbbell/>, img: "/images/Gym.jpg" },
              { title: "Food Exploring", icon: <Utensils/>, img: "/images/Exploring Food.jpg" },
              { title: "Photography", icon: <Camera/>, img: "/images/Photography.jpg" }
            ].map((hobby, i) => {
              const rotation = (i - 2.5) * 8; 
              const yOffset = Math.abs(i - 2.5) * 15; 
              
              return (
                <motion.div 
                  key={i} 
                  initial={{ rotate: rotation, y: yOffset }}
                  whileHover={{ scale: 1.15, rotate: 0, y: -40, zIndex: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative -mx-6 md:-mx-10 w-32 md:w-56 aspect-[2/3] rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-700/50 shadow-2xl origin-bottom cursor-pointer group bg-[#111113]"
                  style={{ zIndex: 10 + i }}
                >
                  <img src={hobby.img} alt={hobby.title} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent group-hover:from-red-900/80 transition-colors duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-red-500 mb-1 md:mb-2 drop-shadow-lg">{hobby.icon}</div>
                    <h3 className="text-sm md:text-lg font-black uppercase tracking-tight text-white drop-shadow-md leading-tight">{hobby.title}</h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* SECTION 6: AUDIO TELEMETRY */}
        <motion.section 
          id="audio" 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} 
          onViewportEnter={() => setActiveSection('audio')}
          className="min-h-screen flex flex-col justify-center py-12"
        >
          <motion.h2 variants={itemVariant} className="text-sm font-bold uppercase tracking-[0.3em] text-red-500 flex items-center gap-2 mb-12">
            <ChevronRight size={16}/> Audio Telemetry
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariant} className="bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-8 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
               <Headphones className="absolute -right-10 -bottom-10 text-zinc-800/30 group-hover:text-red-900/20 transition-colors duration-700" size={250} />
               <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center border border-red-500/30 mb-6 relative z-10 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                 <Music className="text-red-500" size={40} />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tight text-white relative z-10">Pre-Race Playlist</h3>
               <p className="text-zinc-500 font-mono text-xs mt-2 relative z-10 tracking-widest uppercase">Freq: 104.5 MHz</p>
            </motion.div>

            {/* Tracklist Side (Now Clickable with Embedded Songs!) */}
            <div className="space-y-4">
              {[
                { title: "Something", artist: "The Beatles", time: "3:02", link: "https://open.spotify.com/track/0pNeVovbipe81PRSS2JQ01" },
                { title: "Magic", artist: "SOS", time: "3:46", link: "https://open.spotify.com/track/6F809e0237G4l8M5q40X9G" },
                { title: "Oo", artist: "Up Dharma Down", time: "4:32", link: "https://open.spotify.com/track/7LweA0sDIfT5FpaHw90HwB" },
                { title: "Fine Line", artist: "Harry Styles", time: "6:17", link: "https://open.spotify.com/track/6VzcQuz50RzXnE0A8EIfR8" }
              ].map((song, i) => (
                <motion.a 
                  key={i} 
                  variants={itemVariant} 
                  href={song.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  // I added hover:-translate-y-1 here so the songs physically "pop up" when you hover!
                  className="block bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-4 rounded-xl flex items-center justify-between hover:border-red-500/50 transition-all group cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-zinc-600 group-hover:text-red-500 transition-colors">
                      <PlayCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold tracking-wide">{song.title}</h4>
                      <p className="text-zinc-500 text-xs font-mono">{song.artist}</p>
                    </div>
                  </div>
                  <div className="text-zinc-600 font-mono text-xs flex items-center gap-3">
                    {/* Fake EQ Bars that light up on hover */}
                    <div className="hidden sm:flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-1 h-2 bg-red-500 animate-pulse"></div>
                      <div className="w-1 h-4 bg-red-500 animate-pulse delay-75"></div>
                      <div className="w-1 h-3 bg-red-500 animate-pulse delay-150"></div>
                    </div>
                    {song.time}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 7: CONTACT */}
        <motion.section 
          id="contact" 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} 
          onViewportEnter={() => setActiveSection('contact')}
          className="min-h-screen flex flex-col justify-center py-12"
        >
          <motion.h2 variants={itemVariant} className="text-sm font-bold uppercase tracking-[0.3em] text-red-500 flex items-center gap-2 mb-12">
            <ChevronRight size={16}/> Pit Radio Communications
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div variants={itemVariant} className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-6 rounded-2xl relative overflow-hidden flex-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-white">Transmit Message</h2>
                <form onSubmit={submitMessage} className="space-y-4 relative z-10">
                  <input type="text" placeholder="CALL SIGN (NAME)" className="w-full bg-[#0a0a0c]/80 border border-zinc-800 rounded-lg p-3 text-xs font-mono focus:outline-none focus:border-red-500 text-white transition-colors" value={newMsg.name} onChange={(e) => setNewMsg({...newMsg, name: e.target.value})} required />
                  <textarea placeholder="TRANSMIT MESSAGE TO PIT WALL..." className="w-full bg-[#0a0a0c]/80 border border-zinc-800 rounded-lg p-3 text-xs font-mono h-24 focus:outline-none focus:border-red-500 text-white transition-colors resize-none" value={newMsg.text} onChange={(e) => setNewMsg({...newMsg, text: e.target.value})} required ></textarea>
                  <button type="submit" disabled={isTransmitting} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-lg transition-colors">
                    {isTransmitting ? 'Transmitting...' : 'Send Transmission'}
                  </button>
                </form>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="https://www.linkedin.com/in/justin-tumaliwan/" className="bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-4 rounded-xl text-center hover:border-cyan-500/50 transition-colors group">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-cyan-500">LinkedIn</span>
                </a>
                <a href="https://www.facebook.com/tumsjus0724/" className="bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-4 rounded-xl text-center hover:border-blue-500/50 transition-colors group">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-blue-500">Facebook</span>
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="lg:col-span-7 bg-[#111113]/80 backdrop-blur-md border border-zinc-800/50 p-6 rounded-2xl flex flex-col h-full min-h-[400px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-cyan-500">Pit Wall Comms Log</h2>
              <div className="flex-1 overflow-y-auto space-y-3 pr-4 custom-scrollbar">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center flex-col gap-2 text-zinc-600">
                    <Activity className="animate-pulse" />
                    <p className="font-mono text-xs uppercase tracking-widest">Awaiting signals...</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="bg-[#0a0a0c]/80 p-4 rounded-lg border-l-2 border-cyan-500 hover:border-red-500 transition-colors group">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="font-bold text-sm tracking-wide text-white group-hover:text-red-400 transition-colors">{msg.visitor_name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-xs font-mono leading-relaxed">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}

function Layers(props) {
  return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
}