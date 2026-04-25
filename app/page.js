"use client";

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle, ChevronDown, ChevronRight, 
  LayoutDashboard, LogOut, PlayCircle, Star, 
  Target, TrendingUp, Users, Zap, Menu, X, ArrowRight, Check, MessageCircle,
  BarChart3, Plus, Edit2, Trash2, DollarSign, Wallet, Shield, ArrowUpRight, ArrowDownRight, Clock, Image as ImageIcon, FileText, Link as LinkIcon, Send, Paperclip, AlertTriangle, Palette, MonitorPlay
} from 'lucide-react';

// --- CUSTOM ICONS ---
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// ==========================================
// NEXT.JS 14 SEO METADATA 
// PENTING: Saat pindah ke VS Code (Next.js), HAPUS /* dan */ di bawah ini 
// dan pindahkan blok ini ke file app/layout.tsx Anda.
// ==========================================
/*
export const metadata = {
  title: '3Diamond Institute | Bangun Skill Kreatif & Tech',
  description: 'Program belajar terarah untuk pemula. Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi.',
  openGraph: {
    title: '3Diamond Institute | Bangun Skill Kreatif & Tech',
    description: 'Program belajar terarah untuk pemula. Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi.',
    url: 'https://www.3diamond.id',
    siteName: '3Diamond Institute',
    images: [
      {
        url: 'https://www.3diamond.id/og-image.jpg', // Ganti dengan URL gambar OG sesungguhnya nanti
        width: 1200,
        height: 630,
        alt: '3Diamond Preview Thumbnail',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
*/

// --- WHATSAPP CONFIG ---
const WA_NUMBER = "6282150246420";
const openWA = (message) => { window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank'); };

// --- MOCK DATABASE ---
const initialModules = [
  { id: 'm1', title: 'Fase 1: Mindset & Fundamental Design', packages: ['Starter', 'Bootcamp Intensive', '1-on-1 Mentoring'], lessons: [{ id: 'l1', title: 'Cara Berpikir Seorang Creative Developer', duration: '12:45', type: 'Video YT' }, { id: 'l2', title: 'Fundamental UI/UX & Pemilihan Warna', duration: '18:20', type: 'Video YT' }] },
  { id: 'm2', title: 'Fase 2: Web Development Basic', packages: ['Bootcamp Intensive', '1-on-1 Mentoring'], lessons: [{ id: 'l4', title: 'Struktur Web dengan HTML & CSS Dasar', duration: '30:15', type: 'Video YT' }, { id: 'l5', title: 'Mengenal Tailwind CSS untuk Styling Cepat', duration: '45:00', type: 'Video YT' }] }
];
const initialStudents = [
  { id: 1, name: 'Budi Santoso', email: 'budi@mail.com', pkg: 'Bootcamp Intensive', mentorId: 1, status: 'Aktif', progress: 85 },
  { id: 2, name: 'Siti Aminah', email: 'siti@mail.com', pkg: 'Starter', mentorId: null, status: 'Aktif', progress: 40 },
];
const initialMentors = [
  { id: 1, name: 'Bima', role: 'Senior UI/UX', email: 'bima@3diamond.id', wa: '081234567890', status: 'Aktif' },
];
const initialTasks = [
  { id: 't1', studentId: 1, title: 'Project 1: Redesign Landing Page SaaS', phase: 'Fase 2', studentLink: 'figma.com/file/3diamond-project-1', status: 'Menunggu Review', feedback: '', grade: null, mentorAttachment: '', reviewedAt: null }
];
const initialCashflows = [
  { id: 1, date: new Date().toISOString(), description: 'Pendaftaran: Budi Santoso (Bootcamp)', category: 'Income', amount: 899000 },
];

// --- REUSABLE COMPONENTS ---
function Logo({ className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] font-semibold tracking-wider italic leading-none drop-shadow-md">3Diamond</span>
      <span className="text-[9px] md:text-[10px] text-[#D4AF37]/90 tracking-[0.2em] font-serif mt-1">art-tech institute</span>
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#1a080a] border border-[#611A1D] rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(97,26,29,0.3)] flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-[#3a1013] flex justify-between items-center bg-[#0a0303] rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors bg-[#3a1013] p-1.5 rounded-lg"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

const GlobalStyles = () => (
  <style>{`
    @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 1rem)); } }
    .animate-infinite-scroll { animation: scroll 30s linear infinite; }
    .animate-infinite-scroll:hover { animation-play-state: paused; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('landing');
  const [user, setUser] = useState(null);
  
  // Shared States (Global Database Simulation)
  const [students, setStudents] = useState(initialStudents);
  const [mentors, setMentors] = useState(initialMentors);
  const [modules, setModules] = useState(initialModules);
  const [tasks, setTasks] = useState(initialTasks);
  const [completedLessons, setCompletedLessons] = useState([]);
  
  const [activeModule, setActiveModule] = useState('m1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // SEO Dynamic Injection untuk Canvas Sandbox
  useEffect(() => {
    document.title = '3Diamond Institute | Bangun Skill Kreatif & Tech';
    
    // Helper function to create or update meta tags
    const setMetaTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:')) element.setAttribute('property', property);
        else element.setAttribute('name', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('description', 'Program belajar terarah untuk pemula. Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi.');
    setMetaTag('og:title', '3Diamond Institute | Bangun Skill Kreatif & Tech');
    setMetaTag('og:description', 'Program belajar terarah untuk pemula. Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi.');
    setMetaTag('og:image', '/og-image.jpg'); // Simulasi gambar OG
    setMetaTag('og:type', 'website');
    
    // Favicon injection
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    // Base64 icon simulation for preview
    favicon.href = 'data:image/svg+xml,<svg xmlns="/app/favicon.ico" viewBox="0 0 100 100"><text y=".9em" font-size="90">💎</text></svg>';
  }, []);

  const handleLogin = (roleUser) => {
    setUser(roleUser);
    if(roleUser.role === 'admin') setCurrentRoute('admin-dashboard');
    else if(roleUser.role === 'mentor') setCurrentRoute('mentor-dashboard');
    else setCurrentRoute('dashboard');
  };

  const handleLogout = () => { setUser(null); setCurrentRoute('landing'); };
  const toggleLesson = (lessonId) => { setCompletedLessons(prev => prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]); };

  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#0a0303] text-zinc-50 font-sans selection:bg-[#D4AF37] selection:text-[#3a1013]">
      <GlobalStyles />
      {currentRoute === 'landing' && <LandingPage setRoute={setCurrentRoute} />}
      {currentRoute === 'about' && <AboutPage setRoute={setCurrentRoute} />}
      {currentRoute === 'login' && <AuthPage setRoute={setCurrentRoute} onAuth={handleLogin} />}
      
      {currentRoute === 'program-creative-kids' && <ProgramCreativeKids setRoute={setCurrentRoute} />}
      {currentRoute === 'program-persiapan-dkv' && <ProgramPersiapanDKV setRoute={setCurrentRoute} />}
      {currentRoute === 'program-skill-digital' && <ProgramSkillDigital setRoute={setCurrentRoute} />}

      {currentRoute === 'dashboard' && (
        <Dashboard 
          user={user} onLogout={handleLogout} modules={modules} completedLessons={completedLessons}
          toggleLesson={toggleLesson} progressPercentage={progressPercentage} totalLessons={totalLessons}
          activeModule={activeModule} setActiveModule={setActiveModule} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
          tasks={tasks} mentors={mentors}
        />
      )}

      {currentRoute === 'admin-dashboard' && (
        <AdminDashboard 
          user={user} onLogout={handleLogout} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
          students={students} setStudents={setStudents} mentors={mentors} setMentors={setMentors} modules={modules} setModules={setModules}
        />
      )}

      {currentRoute === 'mentor-dashboard' && (
        <MentorDashboard user={user} onLogout={handleLogout} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} students={students} tasks={tasks} setTasks={setTasks} />
      )}
    </div>
  );
}

// ==========================================
// 1. MAIN LANDING PAGE COMPONENTS
// ==========================================
function LandingPage({ setRoute }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setRoute={setRoute} />
      <main className="flex-grow">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <SegmentSection setRoute={setRoute} />
        <ValueSection />
        <OutcomeSection />
        <HowItWorks />
        <TestimonialSection />
        <PortfolioGallery />
        <FinalCTA />
      </main>
      <Footer setRoute={setRoute} />
    </div>
  );
}

function Navbar({ setRoute }) { 
  return (
    <nav className="fixed w-full z-50 bg-[#0a0303]/80 backdrop-blur-md border-b border-[#3a1013]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="cursor-pointer transform hover:scale-105 transition-transform" onClick={() => setRoute('landing')}><Logo className="scale-75 md:scale-100" /></div>
          <div className="flex items-center space-x-3 md:space-x-6">
            <button onClick={() => setRoute('about')} className="text-sm text-zinc-300 hover:text-white transition-colors hidden md:block">Tentang Kami</button>
            <button 
              disabled 
              onClick={() => setRoute('login')} 
              className="text-sm text-zinc-600 cursor-not-allowed font-medium"
              title="Fitur Login Segera Hadir"
            >
              Masuk Sistem
            </button>            
            <button onClick={() => openWA('Halo Admin 3Diamond, saya ingin tanya-tanya dulu mengenai program belajarnya.')} className="hidden sm:flex text-sm bg-[#D4AF37] text-[#2a0b0d] px-4 md:px-5 py-2 md:py-2.5 rounded-full font-bold hover:bg-[#F3E5AB] transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)] items-center gap-2">Hubungi Admin</button>
          </div>
        </div>
      </div>
    </nav>
  ); 
}

function Hero() { 
  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-32 overflow-hidden flex items-center min-h-[85vh] md:min-h-[90vh]">
      <div className="absolute inset-0 z-0">
        <img src="/image/hero.jpg" alt="Abstract Art Background" className="w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0303] via-[#0a0303]/80 to-[#0a0303]"></div><div className="absolute inset-0 bg-gradient-to-r from-[#0a0303] via-[#0a0303]/90 to-transparent"></div>
      </div>
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#611A1D]/20 rounded-full blur-[100px] md:blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center text-center lg:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 leading-tight text-white">
              Bangun Skill Kreatif dari Nol sampai <br className="hidden lg:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Siap Digunakan.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed">
              Program belajar Art, Design, dan Tech yang membimbing kamu dari dasar hingga punya arah jelas untuk pengembangan diri, persiapan kuliah, atau menghasilkan income.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button onClick={() => openWA('Halo Admin 3Diamond, saya ingin konsultasi gratis mengenai arah belajar saya.')} className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-8 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#F3E5AB] transition-all transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)]">Konsultasi Gratis</button>
              <button onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-[#1a080a] text-white border border-[#611A1D] px-8 py-3.5 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#2a0b0d] hover:border-[#D4AF37] transition-all flex justify-center items-center">Lihat Program <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" /></button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#611A1D]/50 shadow-[0_0_50px_rgba(97,26,29,0.3)] transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#611A1D]/40 to-transparent z-10 mix-blend-overlay"></div>
              <img src="/image/hero.jpg" alt="Creative Digital Art" className="w-full h-[500px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100" />
              <div className="absolute bottom-6 left-6 z-20 bg-[#0a0303]/80 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#611A1D] to-[#2a0b0d] flex items-center justify-center border border-[#D4AF37]/50"><Target className="w-6 h-6 text-[#D4AF37]" /></div>
                <div><div className="text-sm font-bold text-white">Arah yang Jelas</div><div className="text-xs text-[#D4AF37]">Untuk Masa Depan</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ); 
}

function ProblemSection() { 
  const problems = [
    { title: "Tidak tahu harus mulai dari mana", desc: "Terlalu banyak informasi membuat bingung langkah pertama yang harus diambil." },
    { title: "Belajar tanpa arah yang jelas", desc: "Mempelajari banyak hal secara acak tanpa bisa merangkainya menjadi satu skill utuh." },
    { title: "Skill tidak berkembang", desc: "Sudah punya dasar atau hobi, tapi stagnan dan tidak tahu cara mengembangkannya lebih jauh." }
  ];
  return (
    <section className="py-16 md:py-24 bg-[#140506] border-y border-[#3a1013]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">Banyak orang mulai belajar, <br className="hidden md:block"/>tapi berhenti di tengah jalan.</h2>
          <p className="text-[#D4AF37] font-medium text-base md:text-lg bg-[#611A1D]/20 inline-block px-4 py-1.5 md:py-1 rounded-full border border-[#D4AF37]/20 mt-2">Akhirnya hanya jadi penonton, bukan pelaku.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((p, i) => (
            <div key={i} className="bg-[#1a080a] p-6 md:p-8 rounded-2xl border border-[#3a1013] hover:border-[#611A1D] transition-colors group flex flex-col items-center text-center">
              <div className="bg-[#611A1D]/20 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 transition-transform"><X className="h-6 w-6 text-red-400 opacity-80" /></div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-white">{p.title}</h3><p className="text-zinc-400 text-sm md:text-base leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ); 
}

function SolutionSection() { 
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-full md:w-1/3 h-full bg-gradient-to-l from-[#611A1D]/10 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 relative z-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">3Diamond Institute hadir sebagai tempat belajar yang terarah.</h2>
            <p className="text-lg md:text-xl text-[#D4AF37] mb-6 md:mb-8 font-medium italic">Bukan hanya materi, tapi pendampingan.</p>
            <p className="text-zinc-300 text-base md:text-lg mb-6">Kami membantu kamu:</p>
            <div className="space-y-4 md:space-y-5 mb-8 text-left max-w-sm mx-auto lg:mx-0">
              {["Belajar dari dasar dengan sistem yang jelas", "Membangun skill secara bertahap", "Mengembangkan kemampuan sesuai tujuan kamu"].map((s, i) => (
                <div key={i} className="flex gap-3 md:gap-4 items-start md:items-center"><div className="flex-shrink-0 mt-1 md:mt-0"><div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#611A1D]/40 border border-[#611A1D] flex items-center justify-center"><Check className="h-4 w-4 md:h-5 md:w-5 text-[#D4AF37]" /></div></div><h4 className="text-base md:text-lg font-medium text-zinc-100">{s}</h4></div>
              ))}
            </div>
            <div className="bg-[#1a080a] border-l-4 border-[#D4AF37] p-4 rounded-r-lg max-w-sm mx-auto lg:mx-0 text-left"><p className="text-zinc-400 text-sm md:text-base font-medium">Baik untuk hobi, pendidikan, maupun peluang masa depan.</p></div>
          </div>
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <div className="aspect-square md:aspect-video lg:aspect-square rounded-3xl bg-[#0a0303] border border-[#611A1D] p-6 md:p-8 shadow-[0_0_50px_rgba(97,26,29,0.2)] flex flex-col justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-20 rounded-3xl mix-blend-luminosity"></div>
               <div className="relative z-10 text-center px-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#D4AF37] to-[#611A1D] rounded-2xl mx-auto flex items-center justify-center mb-6 transform rotate-3 shadow-lg border border-[#F3E5AB]/30"><Target className="w-8 h-8 md:w-10 md:h-10 text-[#0a0303]" /></div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Sistem Pembelajaran Adaptif</h3><p className="text-zinc-400 text-sm md:text-base">Pendampingan penuh menyesuaikan kecepatan dan tujuan akhirmu.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ); 
}

function SegmentSection({ setRoute }) { 
  const programs = [
    { title: "Belajar Gambar & Kreativitas Dasar", target: "Anak & Pemula", desc: "Untuk anak dan pemula yang ingin mengembangkan kemampuan visual sejak awal.", focus: ["Menggambar dasar", "Mewarnai", "Ilustrasi sederhana"], route: "program-creative-kids" },
    { title: "Persiapan Masuk DKV & Seni", target: "Pelajar & Siswa", desc: "Untuk pelajar yang ingin serius masuk jurusan seni atau desain.", focus: ["Latihan gambar terarah", "Penyusunan portfolio", "Persiapan seleksi"], route: "program-persiapan-dkv" },
    { title: "Skill Digital & Kreatif", target: "Kreatif & Tech", desc: "Untuk kamu yang ingin mengembangkan skill di bidang kreatif dan teknologi.", focus: ["Desain grafis", "Fotografi & videografi", "Editing & animasi"], route: "program-skill-digital" }
  ];

  return (
    <section id="programs" className="py-16 md:py-24 bg-[#140506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-white">Mulai dari tujuan kamu.</h2>
          <p className="text-zinc-400 text-base md:text-lg px-4">Kami menyediakan program yang disesuaikan dengan kebutuhan kamu.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {programs.map((p, i) => (
            <div key={i} className="flex flex-col bg-[#1a080a] p-6 md:p-8 rounded-3xl border border-[#3a1013] hover:border-[#D4AF37] transition-all group shadow-lg">
              <div className="text-[10px] md:text-xs font-bold text-[#2a0b0d] bg-[#D4AF37] self-start px-3 py-1 rounded-full mb-5 md:mb-6 uppercase tracking-wider">{p.target}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white leading-snug">{p.title}</h3>
              <p className="text-zinc-400 text-sm mb-6 flex-grow">{p.desc}</p>
              <div className="bg-[#0a0303] border border-[#3a1013] rounded-xl p-4 mb-6 md:mb-8">
                <div className="text-[10px] md:text-xs text-zinc-500 font-semibold mb-3 uppercase">Fokus Pembelajaran:</div>
                <ul className="space-y-2">
                  {p.focus.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" /><span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setRoute(p.route)} className="w-full py-3.5 md:py-4 rounded-xl font-bold bg-[#0a0303] text-[#D4AF37] border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-[#2a0b0d] transition-all flex justify-center items-center gap-2 text-sm md:text-base">
                Pelajari Program
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  ); 
}

function ValueSection() {
  const values = [
    { title: "Belajar dengan arah yang jelas", icon: <Target className="w-6 h-6 text-[#D4AF37]" /> },
    { title: "Pendampingan sesuai kebutuhan", icon: <Users className="w-6 h-6 text-[#D4AF37]" /> },
    { title: "Materi langsung dipraktikkan", icon: <Zap className="w-6 h-6 text-[#D4AF37]" /> },
    { title: "Fokus perkembangan nyata, bukan sekadar teori", icon: <TrendingUp className="w-6 h-6 text-[#D4AF37]" /> }
  ];
  return (
    <section className="py-16 md:py-24 bg-[#0a0303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-10 md:mb-16"><h2 className="text-2xl md:text-4xl font-bold text-white">Kenapa 3Diamond berbeda?</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">{values.map((v, i) => (<div key={i} className="bg-[#140506] border border-[#3a1013] p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform"><div className="w-12 h-12 md:w-14 md:h-14 bg-[#1a080a] border border-[#611A1D] rounded-full flex items-center justify-center mb-4">{v.icon}</div><h4 className="font-bold text-base md:text-lg text-zinc-200">{v.title}</h4></div>))}</div></div>
    </section>
  );
}

function OutcomeSection() {
  const outcomes = ["Kemampuan yang berkembang secara bertahap", "Hasil karya yang bisa dibanggakan", "Pemahaman yang lebih terarah", "Kepercayaan diri dalam kemampuan sendiri"];
  return (
    <section className="py-16 md:py-24 bg-[#1a080a] relative overflow-hidden border-y border-[#3a1013]">
      <div className="absolute inset-0 bg-[url('/image/hero.jpg')] bg-cover bg-fixed opacity-5 mix-blend-screen"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div className="bg-[#0a0303]/80 backdrop-blur-md border border-[#D4AF37]/30 p-6 md:p-12 rounded-3xl text-center"><h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D4AF37] mb-6 md:mb-8">Yang akan kamu dapatkan:</h2><div className="grid sm:grid-cols-2 gap-4 md:gap-6 text-left">{outcomes.map((o, i) => (<div key={i} className="flex items-center gap-3 md:gap-4 bg-[#140506] border border-[#3a1013] p-4 rounded-xl"><CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0" /><span className="font-medium text-sm md:text-base text-white">{o}</span></div>))}</div></div></div>
    </section>
  );
}

function HowItWorks() { 
  const steps = [
    { num: "01", title: "Konsultasi kebutuhan kamu", desc: "Ceritakan apa tujuanmu, dan kami akan membantu menemukan arah yang pas." },
    { num: "02", title: "Pilih program yang sesuai", desc: "Daftar ke kelas atau mentoring yang paling relevan dengan minat dan levelmu." },
    { num: "03", title: "Mulai belajar dan berkembang", desc: "Ikuti pendampingan, kerjakan tugas praktik, dan lihat perkembangan skillmu secara nyata." }
  ];
  return (
    <section className="py-16 md:py-24 bg-[#0a0303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-center text-white">Cara memulai di 3Diamond:</h2><div className="grid md:grid-cols-3 gap-6 md:gap-8 relative max-w-5xl mx-auto"><div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#3a1013] -translate-y-1/2 z-0"></div>{steps.map((s, i) => (<div key={i} className="relative z-10 bg-[#1a080a] border border-[#611A1D] p-6 md:p-8 rounded-3xl shadow-lg text-center"><div className="w-14 h-14 md:w-16 md:h-16 bg-[#0a0303] border-2 border-[#D4AF37] text-[#D4AF37] rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6 shadow-[0_0_15px_rgba(212,175,55,0.3)]">{s.num}</div><h3 className="text-lg md:text-xl font-bold mb-3 text-zinc-100">{s.title}</h3><p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p></div>))}</div></div>
    </section>
  ); 
}

function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-[#140506] border-y border-[#3a1013]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16"><h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-white">Hasil Nyata dari Siswa Kami</h2><p className="text-zinc-400 text-sm md:text-lg px-2">Perkembangan yang terarah menghasilkan karya yang bisa dibanggakan.</p></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Card 1 */}
          <div className="bg-[#0a0303] border border-[#3a1013] rounded-3xl overflow-hidden group hover:border-[#D4AF37] transition-all duration-500 shadow-lg flex flex-col">
            <div className="h-40 md:h-48 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" alt="Hasil Karya" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-3 right-3 bg-[#0a0303]/80 backdrop-blur text-[#D4AF37] text-[9px] md:text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-[#D4AF37]/30">UI/UX Design</div>
            </div>
            <div className="p-5 md:p-6 flex-grow flex flex-col justify-center">
              <h4 className="text-white font-bold text-base md:text-lg mb-2">Aplikasi Mobile App</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Karya final dari peserta Bootcamp Intensive yang dibangun dari nol hingga siap masuk portfolio.</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-[#0a0303] border border-[#3a1013] rounded-3xl overflow-hidden group hover:border-[#D4AF37] transition-all duration-500 flex flex-col shadow-lg">
            <div className="p-5 md:p-6 flex-grow flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-[#1a080a] to-[#0a0303]">
              <div className="absolute inset-0 bg-[#611A1D]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">Awal Belajar</span>
                   <ArrowRight className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                   <span className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Bulan Ke-3</span>
                </div>
                <div className="flex gap-2 md:gap-3 mb-2 h-24 md:h-28">
                   <img src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=300&auto=format&fit=crop&grayscale=1" alt="Before" className="w-1/2 rounded-xl object-cover opacity-40 grayscale border border-[#3a1013]" />
                   <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=300&auto=format&fit=crop" alt="After" className="w-1/2 rounded-xl object-cover shadow-[0_0_15px_rgba(212,175,55,0.2)] border border-[#D4AF37]/50" />
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6 border-t border-[#3a1013] bg-[#140506]">
              <h4 className="text-white font-bold text-base md:text-lg mb-2">Perkembangan Signifikan</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Dari kebingungan warna & tata letak hingga paham komposisi visual secara utuh.</p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-[#0a0303] border border-[#3a1013] rounded-3xl p-5 md:p-6 flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-500 relative overflow-hidden shadow-lg md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="relative z-10 flex-grow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#D4AF37] text-[#D4AF37]" />)}
              </div>
              <p className="text-zinc-300 italic text-sm leading-relaxed mb-6">
                "Sangat bersyukur ikut 1-on-1 mentoring! Awalnya ragu karena portfolio gambar masih berantakan. Mentor sabar banget membimbing dari basic anatomi sampai bikin karya yang punya 'nyawa'. Puji Tuhan, bulan ini saya lolos seleksi masuk jurusan DKV di kampus impian!"
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#3a1013] relative z-10">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop" alt="Sarah D." className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/50" />
              <div>
                <h4 className="text-white font-bold text-sm">Sarah D.</h4>
                <p className="text-[#D4AF37] text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-0.5">Alumni 1-on-1 Mentoring</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function PortfolioGallery() { 
  const portfolios = [{ id: 1, title: "SaaS Dashboard Redesign", type: "UI/UX", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" },{ id: 2, title: "E-Commerce Web App", type: "Web Dev", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop" },{ id: 3, title: "Brand Identity Concept", type: "Branding", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop" }]; 
  return (<section className="py-16 md:py-24 bg-[#0a0303] overflow-hidden"><div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4"><h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Galeri Karya Siswa</h2></div><div className="relative w-full overflow-hidden no-scrollbar"><div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#0a0303] to-transparent z-10 pointer-events-none"></div><div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#0a0303] to-transparent z-10 pointer-events-none"></div><div className="flex w-[300%] md:w-[200%] gap-4 md:gap-6 animate-infinite-scroll">{[...portfolios, ...portfolios, ...portfolios].map((item, idx) => (<div key={idx} className="relative w-64 md:w-80 h-80 md:h-96 flex-shrink-0 rounded-2xl overflow-hidden group border border-[#3a1013] hover:border-[#D4AF37] transition-all cursor-pointer"><div className="absolute inset-0 bg-gradient-to-t from-[#0a0303] via-transparent to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity"></div><img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0" /><div className="absolute bottom-0 left-0 p-5 md:p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform"><span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold bg-[#D4AF37] text-black px-2 py-1 rounded mb-2 inline-block">{item.type}</span><h3 className="text-base md:text-lg font-bold text-white leading-tight">{item.title}</h3></div></div>))}</div></div></section>); 
}

function FinalCTA({ setRoute }) { 
  // Logika navigasi cerdas: Pindah halaman dulu (jika perlu), baru scroll
  const handleMulaiSekarang = () => {
    if (setRoute) {
      setRoute('landing'); 
    }
    // Jeda 150ms agar DOM Landing Page sempat di-render sebelum ditarik ke bawah
    setTimeout(() => {
      const programSection = document.getElementById('programs');
      if (programSection) {
        programSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#611A1D]/20 z-0"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white leading-tight">
          Setiap orang punya potensi,<br className="hidden md:block"/> tapi tidak semua punya arah.
        </h2>
        <p className="text-base md:text-xl text-zinc-400 mb-8 md:mb-10 px-2">
          Mulai langkah kamu sekarang dengan bimbingan yang tepat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <button 
            onClick={handleMulaiSekarang} 
            className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-xl hover:bg-[#F3E5AB] transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            Mulai Sekarang
          </button>
          <button 
            onClick={() => openWA('Halo Admin 3Diamond, saya ingin konsultasi gratis mengenai program belajarnya.')} 
            className="w-full sm:w-auto bg-[#0a0303] text-white border border-[#D4AF37]/50 px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
          >
            Konsultasi Gratis
          </button>
        </div>
      </div>
    </section>
  ); 
}

function Footer({ setRoute }) { 
  return (
    <footer className="bg-[#0a0303] border-t border-[#3a1013] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        
        <div className="flex flex-col items-center md:items-start gap-4">
          <Logo className="scale-75 origin-center md:origin-left cursor-pointer" />
          <p className="text-zinc-500 text-xs md:text-sm max-w-xs text-center md:text-left mt-2">
            Membantu kamu membangun skill kreatif dan tech dari dasar hingga siap digunakan secara nyata.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="https://www.instagram.com/3diamondinstitute/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a080a] border border-[#3a1013] flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all transform hover:scale-110"><InstagramIcon className="w-4 h-4" /></a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 text-center sm:text-left w-full md:w-auto justify-center md:justify-end">
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Menu Utama</h4>
            <button onClick={() => setRoute?.('landing')} className="text-zinc-400 text-sm hover:text-[#D4AF37] transition-colors w-fit mx-auto sm:mx-0">Beranda</button>
            <button onClick={() => setRoute?.('about')} className="text-zinc-400 text-sm hover:text-[#D4AF37] transition-colors w-fit mx-auto sm:mx-0">Tentang Kami</button>
            <button disabled onClick={() => setRoute?.('login')} className="text-zinc-600 text-sm w-fit mx-auto sm:mx-0">Member Login</button>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Program Kami</h4>
            <button onClick={() => { setRoute?.('program-creative-kids'); window.scrollTo(0,0); }} className="text-zinc-400 text-sm hover:text-[#D4AF37] transition-colors w-fit mx-auto sm:mx-0">Creative Kids</button>
            <button onClick={() => { setRoute?.('program-persiapan-dkv'); window.scrollTo(0,0); }} className="text-zinc-400 text-sm hover:text-[#D4AF37] transition-colors w-fit mx-auto sm:mx-0">Persiapan DKV</button>
            <button onClick={() => { setRoute?.('program-skill-digital'); window.scrollTo(0,0); }} className="text-zinc-400 text-sm hover:text-[#D4AF37] transition-colors w-fit mx-auto sm:mx-0">Skill Digital</button>
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 md:mt-16 pt-8 border-t border-[#3a1013] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} 3Diamond Institute. All rights reserved.</p>
        <p className="text-zinc-600 text-xs flex items-center gap-1">Developed by <a href="https://www.solusilokal.id" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline font-semibold tracking-wide">SolusiLokal.ID</a></p>
      </div>
    </footer>
  ); 
}

// ==========================================
// NEW: ABOUT PAGE
// ==========================================
function AboutPage({ setRoute }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0303]">
      <Navbar setRoute={setRoute} />
      <main className="flex-grow pt-24 md:pt-32 pb-12 px-4 relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#611A1D]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
         <div className="max-w-3xl mx-auto space-y-12 md:space-y-16">
            
            <div className="text-center">
               <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Tentang 3Diamond Institute</h1>
            </div>

            <div className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#1a080a] to-[#0a0303] p-6 md:p-12 rounded-3xl border border-[#3a1013] shadow-xl">
               <div className="mb-8 md:mb-12 mt-2 md:mt-4">
                  <Logo className="scale-[1.2] md:scale-[2]" />
               </div>
               <p className="text-lg md:text-2xl font-bold text-[#D4AF37] max-w-xl leading-relaxed">
                 Dibangun oleh praktisi kreatif yang aktif di bidang desain, ilustrasi, dan web development.
               </p>
            </div>

            <div className="space-y-10 md:space-y-12 text-zinc-300 text-base md:text-lg leading-relaxed">
              <section>
                 <p className="mb-4"><strong>3Diamond Institute</strong> lahir dari pengalaman langsung di dunia kreatif bukan dari teori, tapi dari proses belajar, mencoba, dan berkembang dari nol.</p>
                 <p className="mb-4">Di awal, banyak hal yang terasa membingungkan. Belajar dari berbagai sumber, tapi tidak ada arah yang jelas. Tidak tahu mana yang harus dipelajari dulu, dan bagaimana mengembangkan skill menjadi sesuatu yang benar-benar berguna.</p>
                 <p className="font-medium text-white bg-[#1a080a] border-l-4 border-[#D4AF37] p-4 rounded-r-xl">Dari situ, 3Diamond dibangun. Bukan sekadar tempat belajar, tapi tempat untuk membantu seseorang berkembang dengan lebih terarah.</p>
              </section>

              <section>
                 <h2 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-6 md:mb-8">Siapa di balik 3Diamond</h2>
                 <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start bg-[#140506] p-6 md:p-8 rounded-3xl border border-[#3a1013] shadow-lg">
                   <div className="flex flex-col items-center shrink-0 w-full md:w-48 text-center md:text-left">
                     <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl bg-zinc-800 mb-4 overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                       <img src="/image/hermon.png" alt="Hermon Karisma" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' }}/>
                     </div>
                     <h3 className="text-base md:text-lg font-bold text-white">Hermon Karisma</h3>
                     <p className="text-[10px] md:text-xs text-[#D4AF37] mb-4 md:mb-5 uppercase tracking-widest font-semibold">Founder & Mentor</p>
                     <a href="https://www.instagram.com/hermonkh/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full max-w-[200px] md:max-w-full bg-[#1a080a] border border-[#611A1D] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all shadow-lg"><InstagramIcon className="w-3 h-3 md:w-4 md:h-4" /> Instagram</a>
                   </div>
                   <div className="flex-1 pt-2 text-sm md:text-base text-center md:text-left">
                     <p className="mb-4">Saya adalah praktisi di bidang kreatif yang bergerak di desain, ilustrasi, web, dan visual.</p>
                     <p className="mb-4">Seiring waktu, saya melihat satu pola yang sama: <br/><span className="text-white font-medium block mt-3 p-4 bg-[#1a080a] border-l-2 border-red-500/50 rounded-r-lg shadow-inner text-left">"Banyak orang punya minat dan potensi, tapi berhenti di tengah jalan karena tidak punya arah dan bimbingan yang tepat."</span></p>
                     <p>Di sisi lain, ada juga yang ingin serius masuk ke dunia kreatif baik untuk kuliah maupun untuk skill masa depan tapi tidak tahu harus mulai dari mana.</p>
                   </div>
                 </div>
              </section>

              <section className="bg-[#140506] p-6 md:p-8 rounded-3xl border border-[#3a1013] shadow-lg">
                 <h2 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-4">Kenapa 3Diamond Berbeda</h2>
                 <p className="mb-4">Di sini, pembelajaran tidak hanya soal materi. Yang lebih penting adalah: <strong className="text-white">bagaimana seseorang bisa berkembang secara bertahap dan memahami prosesnya.</strong></p>
                 <p className="mb-4">Setiap program dirancang agar:</p>
                 <ul className="space-y-2 md:space-y-3 mb-6 text-sm md:text-base">
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0"/> Tidak membingungkan di awal</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0"/> Tidak terlalu berat di tengah</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0"/> Dan tetap terasa berkembang</li>
                 </ul>
                 <p className="text-xs md:text-sm text-zinc-400">Baik untuk anak yang baru mulai, pelajar yang sedang mempersiapkan diri, maupun pemula yang ingin membangun skill.</p>
              </section>

              <section>
                 <h2 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-4 md:mb-6">Fokus Pembelajaran</h2>
                 <p className="mb-4 md:mb-6">3Diamond berfokus pada pengembangan skill di bidang:</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                   <div className="bg-[#1a080a] p-3 md:p-4 rounded-xl border border-[#3a1013] text-center font-bold text-white text-xs md:text-sm">Art & Ilustrasi</div>
                   <div className="bg-[#1a080a] p-3 md:p-4 rounded-xl border border-[#3a1013] text-center font-bold text-white text-xs md:text-sm">Design & Visual</div>
                   <div className="bg-[#1a080a] p-3 md:p-4 rounded-xl border border-[#3a1013] text-center font-bold text-white text-xs md:text-sm">Fotografi & Videografi</div>
                   <div className="bg-[#1a080a] p-3 md:p-4 rounded-xl border border-[#3a1013] text-center font-bold text-white text-xs md:text-sm">Editing & Animasi</div>
                 </div>
                 <p className="text-sm md:text-base">Semua diarahkan agar bisa digunakan secara nyata, sesuai kebutuhan masing-masing peserta.</p>
              </section>

              <section>
                 <h2 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-3 md:mb-4">Arah Ke Depan</h2>
                 <p className="text-sm md:text-base">Ke depan, 3Diamond akan berkembang dengan melibatkan mentor di berbagai bidang. Tujuannya agar setiap peserta bisa mendapatkan pendampingan yang lebih spesifik dan sesuai dengan jalur yang mereka pilih.</p>
              </section>

              <section className="text-center py-8 md:py-12 border-t border-[#3a1013] mt-8 md:mt-12">
                 <p className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Setiap orang bisa berkembang.</p>
                 <p className="text-lg md:text-xl text-[#D4AF37] mb-6 md:mb-8 font-medium">Yang sering jadi pembeda bukan bakat, tapi arah dan konsistensi.</p>
                 <p className="max-w-xl mx-auto text-sm md:text-base">3Diamond hadir untuk membantu proses itu dengan cara yang lebih jelas, lebih terarah, dan lebih relevan.</p>
              </section>

            </div>
         </div>
      </main>
      <FinalCTA setRoute={setRoute} />
      <Footer setRoute={setRoute} />
    </div>
  );
}

// ==========================================
// PROGRAM DETAIL PAGES (SALES PAGES)
// ==========================================
function ProgramCreativeKids({ setRoute }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0303]">
      <Navbar setRoute={setRoute} />
      <main className="flex-grow pt-24 md:pt-28 pb-12">
        <section className="py-12 md:py-24 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
            <Palette className="w-3 h-3 md:w-4 md:h-4 text-[#D4AF37]" />
            <span className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase">Untuk Anak & Pemula</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">Belajar Gambar Sejak Dini dengan Cara yang Menyenangkan dan Terarah</h1>
          <p className="text-base md:text-xl text-zinc-400 mb-8 md:mb-10 leading-relaxed">Program untuk anak dan pemula yang ingin mengembangkan kreativitas melalui gambar, warna, dan eksplorasi visual.</p>
          <button onClick={() => openWA('Halo Admin 3Diamond, saya ingin konsultasi program *Creative Kids*.')} className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-8 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#F3E5AB] transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">Konsultasi Program</button>
        </section>

        <section className="py-12 md:py-16 bg-[#140506] border-y border-[#3a1013]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-10">Banyak anak suka menggambar, tapi...</h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
               <div className="bg-[#1a080a] p-6 md:p-8 rounded-3xl border border-[#611A1D]/50">
                 <h3 className="text-lg md:text-xl font-bold text-red-400 mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 md:w-5 md:h-5"/> Kendala Anak</h3>
                 <ul className="space-y-3 text-zinc-300 text-sm md:text-base">
                   <li className="flex items-start gap-2"><X className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0"/> Tidak tahu teknik dasar.</li>
                   <li className="flex items-start gap-2"><X className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0"/> Cepat bosan.</li>
                   <li className="flex items-start gap-2"><X className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0"/> Skill tidak berkembang.</li>
                 </ul>
               </div>
               <div className="bg-[#1a080a] p-6 md:p-8 rounded-3xl border border-[#611A1D]/50">
                 <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2"><MessageCircle className="w-4 h-4 md:w-5 md:h-5"/> Kebingungan Orang Tua</h3>
                 <ul className="space-y-3 text-zinc-300 text-sm md:text-base">
                   <li className="flex items-start gap-2"><Target className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 shrink-0"/> Harus mulai dari mana?</li>
                   <li className="flex items-start gap-2"><Users className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 shrink-0"/> Bagaimana cara membimbing dengan benar?</li>
                 </ul>
               </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Di 3Diamond, Anak Belajar dengan Pendekatan:</h2>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full text-sm md:text-base font-medium">Terarah</span>
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full text-sm md:text-base font-medium">Bertahap</span>
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full text-sm md:text-base font-medium">Menyenangkan</span>
              </div>
              <p className="text-zinc-400 mt-4 md:mt-6 text-base md:text-lg">Kami tidak hanya mengajar, tapi membantu anak menikmati proses belajar.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
              <div className="bg-[#1a080a] border border-[#3a1013] p-6 md:p-8 rounded-3xl">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 border-b border-[#3a1013] pb-3 md:pb-4">Yang Dipelajari</h3>
                <ul className="space-y-3 md:space-y-4">
                  {["Dasar menggambar bentuk", "Mewarnai & komposisi warna", "Ilustrasi sederhana", "Eksplorasi kreativitas"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm md:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0"/> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1a080a] border border-[#3a1013] p-6 md:p-8 rounded-3xl">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 border-b border-[#3a1013] pb-3 md:pb-4">Metode Belajar</h3>
                <ul className="space-y-3 md:space-y-4">
                  {["Belajar step-by-step", "Praktik langsung", "Pendampingan ringan", "Fleksibel (Offline / Online)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm md:text-base"><Target className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0"/> {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#1a080a] to-[#2a0b0d] border border-[#611A1D]/50 p-6 md:p-12 rounded-3xl text-center shadow-[0_0_30px_rgba(97,26,29,0.3)]">
               <h3 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-6">Hasilnya, Anak Akan:</h3>
               <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 text-zinc-200 text-sm md:text-base font-medium">
                 <div className="flex items-center justify-center gap-2"><Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 shrink-0"/> Lebih percaya diri menggambar</div>
                 <div className="flex items-center justify-center gap-2"><ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-400 shrink-0"/> Punya hasil karya sendiri</div>
                 <div className="flex items-center justify-center gap-2"><TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0"/> Berkembang secara visual</div>
               </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#140506] border-y border-[#3a1013]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Investasi Program</h2>
            <p className="text-base md:text-lg text-zinc-300 mb-6 px-2">Program tersedia dalam beberapa pilihan, menyesuaikan kebutuhan dan tingkat pembelajaran.</p>
            <div className="bg-[#1a080a] border border-[#D4AF37]/30 p-6 md:p-8 rounded-3xl inline-block mb-6 md:mb-8 shadow-lg">
               <p className="text-zinc-400 mb-1 md:mb-2 text-sm md:text-base font-medium">Mulai dari</p>
               <h3 className="text-2xl md:text-4xl font-bold text-[#D4AF37]">150rb</h3>
            </div>
            <p className="text-zinc-400 mb-6 md:mb-8 text-sm md:text-base px-2">Silakan konsultasi untuk mendapatkan rekomendasi program yang paling sesuai.</p>
            <button onClick={() => openWA('Halo Admin 3Diamond, saya mau tanya detail investasi program *Creative Kids*.')} className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#F3E5AB] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              Tanya Program Sekarang
            </button>
          </div>
        </section>
      </main>
      <Footer setRoute={setRoute} />
    </div>
  );
}

function ProgramPersiapanDKV({ setRoute }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0303]">
      <Navbar setRoute={setRoute} />
      <main className="flex-grow pt-24 md:pt-28 pb-12">
        <section className="py-12 md:py-24 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
            <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-[#D4AF37]" />
            <span className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase">Untuk Pelajar SMA / Sederajat</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">Persiapan Masuk DKV & Jurusan Seni dengan Arah yang Jelas</h1>
          <p className="text-base md:text-xl text-zinc-400 mb-8 md:mb-10 leading-relaxed">Program untuk siswa yang ingin serius masuk jurusan seni, desain, atau DKV di Perguruan Tinggi.</p>
          <button onClick={() => openWA('Halo Admin 3Diamond, saya ingin konsultasi persiapan masuk DKV.')} className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-8 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#F3E5AB] transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">Konsultasi Persiapan</button>
        </section>

        <section className="py-12 md:py-16 bg-[#140506] border-y border-[#3a1013]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-10">Banyak siswa ingin masuk DKV, tapi...</h2>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-8">
               <div className="bg-[#1a080a] p-5 md:p-6 rounded-2xl border border-[#611A1D]/30"><X className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-2 md:mb-3"/> <p className="text-zinc-300 text-sm md:text-base">Tidak tahu syarat & standar seleksi</p></div>
               <div className="bg-[#1a080a] p-5 md:p-6 rounded-2xl border border-[#611A1D]/30"><X className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-2 md:mb-3"/> <p className="text-zinc-300 text-sm md:text-base">Belum punya portfolio yang kuat</p></div>
               <div className="bg-[#1a080a] p-5 md:p-6 rounded-2xl border border-[#611A1D]/30"><X className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-2 md:mb-3"/> <p className="text-zinc-300 text-sm md:text-base">Latihan gambar tidak terarah</p></div>
            </div>
            <div className="inline-block bg-red-500/10 border border-red-500/20 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-red-400 font-medium text-sm md:text-base">
              Akhirnya: Kurang siap saat seleksi & tidak percaya diri.
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Kami membantu kamu mempersiapkan secara terarah</h2>
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mb-12 md:mb-16 text-zinc-300 text-sm md:text-base">
               <span className="bg-[#1a080a] px-3 md:px-4 py-2 rounded-lg border border-[#D4AF37]/20 flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0"/> Latihan sesuai kebutuhan seleksi</span>
               <span className="bg-[#1a080a] px-3 md:px-4 py-2 rounded-lg border border-[#D4AF37]/20 flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0"/> Penyusunan portfolio</span>
               <span className="bg-[#1a080a] px-3 md:px-4 py-2 rounded-lg border border-[#D4AF37]/20 flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0"/> Arahan pengembangan skill</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
              <div className="bg-[#1a080a] border border-[#3a1013] p-6 md:p-8 rounded-3xl">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 border-b border-[#3a1013] pb-3 md:pb-4">Yang Dipelajari</h3>
                <ul className="space-y-3 md:space-y-4">
                  {["Dasar & lanjutan gambar", "Eksplorasi gaya visual", "Penyusunan portfolio", "Latihan studi kasus ujian"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm md:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0"/> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1a080a] border border-[#3a1013] p-6 md:p-8 rounded-3xl">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 border-b border-[#3a1013] pb-3 md:pb-4">Metode Pendampingan</h3>
                <ul className="space-y-3 md:space-y-4">
                  {["Mentoring terarah", "Evaluasi berkala", "Feedback langsung", "Simulasi kesiapan mental & teknis"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm md:text-base"><Target className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0"/> {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#0a0303] border border-[#D4AF37]/30 p-6 md:p-8 rounded-3xl text-center">
               <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Hasilnya, Kamu Akan:</h3>
               <div className="grid sm:grid-cols-3 gap-3 md:gap-4 text-zinc-300 text-xs md:text-sm font-medium">
                 <div className="bg-[#1a080a] p-3 md:p-4 rounded-xl">Punya Portfolio<br/><span className="text-[#D4AF37] text-sm md:text-base">Siap Pakai</span></div>
                 <div className="bg-[#1a080a] p-3 md:p-4 rounded-xl">Lebih Siap<br/><span className="text-[#D4AF37] text-sm md:text-base">Menghadapi Seleksi</span></div>
                 <div className="bg-[#1a080a] p-3 md:p-4 rounded-xl">Memahami<br/><span className="text-[#D4AF37] text-sm md:text-base">Arah Skill Visualmu</span></div>
               </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#140506] border-y border-[#3a1013]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Investasi Program</h2>
            <p className="text-base md:text-lg text-zinc-300 mb-6 px-2">Program tersedia dalam beberapa pilihan, menyesuaikan kebutuhan dan tingkat persiapanmu.</p>
            <div className="bg-[#1a080a] border border-[#D4AF37]/30 p-6 md:p-8 rounded-3xl inline-block mb-6 md:mb-8 shadow-lg">
               <p className="text-zinc-400 mb-1 md:mb-2 text-sm md:text-base font-medium">Mulai dari</p>
               <h3 className="text-2xl md:text-4xl font-bold text-[#D4AF37]">500rb</h3>
            </div>
            <p className="text-zinc-400 mb-6 md:mb-8 text-sm md:text-base px-2">Silakan konsultasi untuk mendapatkan rekomendasi program dan jadwal yang paling sesuai.</p>
            <button onClick={() => openWA('Halo Admin 3Diamond, saya mau tanya detail investasi program *Persiapan DKV*.')} className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#F3E5AB] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              Tanya Program Sekarang
            </button>
          </div>
        </section>
      </main>
      <Footer setRoute={setRoute} />
    </div>
  );
}

function ProgramSkillDigital({ setRoute }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0303]">
      <Navbar setRoute={setRoute} />
      <main className="flex-grow pt-24 md:pt-28 pb-12">
        <section className="py-16 md:py-24 px-4 text-center max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#D4AF37]/10 rounded-full blur-[80px] md:blur-[100px] -z-10 pointer-events-none"></div>
          <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <MonitorPlay className="w-3 h-3 md:w-4 md:h-4 text-[#D4AF37]" />
            <span className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase">Untuk Praktisi & Profesional</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">Bangun Skill Kreatif yang <br className="hidden md:block"/>Bisa Digunakan di <span className="text-[#D4AF37]">Dunia Nyata.</span></h1>
          <p className="text-base md:text-xl text-zinc-400 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">Program untuk kamu yang ingin belajar skill digital (Desain, Foto, Video, Animasi) secara terarah dan siap monetisasi.</p>
          <button onClick={() => openWA('Halo Admin 3Diamond, saya tertarik membangun skill digital nyata. Boleh konsultasi?')} className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-8 md:px-10 py-3.5 md:py-5 rounded-full font-bold text-base md:text-xl hover:bg-[#F3E5AB] transition-all shadow-[0_0_40px_rgba(212,175,55,0.4)] transform hover:scale-105">Mulai Konsultasi</button>
        </section>

        <section className="py-12 md:py-16 bg-[#140506] border-y border-[#3a1013]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-10">Banyak orang belajar digital skill, tapi...</h2>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
               <div className="bg-[#1a080a] p-5 md:p-6 rounded-2xl border border-[#611A1D]/30"><PlayCircle className="w-6 h-6 md:w-8 md:h-8 text-zinc-500 mx-auto mb-2 md:mb-3"/> <p className="text-zinc-300 text-sm md:text-base">Belajar dari YouTube tapi bingung arah belajarnya.</p></div>
               <div className="bg-[#1a080a] p-5 md:p-6 rounded-2xl border border-[#611A1D]/30"><TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-zinc-500 mx-auto mb-2 md:mb-3"/> <p className="text-zinc-300 text-sm md:text-base">Punya dasar skill tapi tidak pernah berkembang.</p></div>
               <div className="bg-[#1a080a] p-5 md:p-6 rounded-2xl border border-[#611A1D]/30"><Target className="w-6 h-6 md:w-8 md:h-8 text-zinc-500 mx-auto mb-2 md:mb-3"/> <p className="text-zinc-300 text-sm md:text-base">Tidak tahu langkah selanjutnya untuk mendapatkan klien.</p></div>
            </div>
            <div className="inline-block bg-[#0a0303] border border-[#611A1D] px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-zinc-400 font-medium text-sm md:text-base">
              Akhirnya: Berhenti di tengah jalan dan <span className="text-red-400">tidak pernah benar-benar bisa.</span>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center">Di 3Diamond, kamu dibimbing:</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-12 md:mb-16 text-zinc-300 font-medium text-sm md:text-base">
               <span className="bg-[#611A1D]/20 px-4 py-2 rounded-full border border-[#611A1D] text-center">Dari dasar hingga paham</span>
               <span className="bg-[#611A1D]/20 px-4 py-2 rounded-full border border-[#611A1D] text-center">Dengan roadmap jelas</span>
               <span className="bg-[#611A1D]/20 px-4 py-2 rounded-full border border-[#611A1D] text-center">Sesuai tujuan kamu</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              <div>
                 <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Pilihan Skill (Roadmap)</h3>
                 <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {["Desain Grafis", "Fotografi", "Videografi", "Editing Video", "Animasi UI/UX"].map((s,i)=>(
                      <div key={i} className="bg-[#1a080a] border border-[#3a1013] p-3 md:p-4 rounded-xl text-center text-zinc-200 font-medium hover:border-[#D4AF37] transition-colors cursor-default text-xs md:text-sm">{s}</div>
                    ))}
                 </div>
              </div>
              <div>
                 <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 mt-6 md:mt-0">Metode Belajar</h3>
                 <ul className="space-y-3 md:space-y-4 bg-[#1a080a] border border-[#3a1013] p-5 md:p-6 rounded-2xl">
                  {["Pembelajaran bertahap & terstruktur", "Praktik mengerjakan project nyata", "Mentoring (opsional 1-on-1)", "Waktu belajar fleksibel"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm md:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0"/> {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1a080a] to-[#2a0b0d] border border-[#D4AF37]/40 p-6 md:p-10 rounded-3xl mb-8 md:mb-12 shadow-2xl">
               <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 border-b border-[#D4AF37]/20 pb-3 md:pb-4">Output yang Kamu Dapatkan:</h3>
               <div className="grid sm:grid-cols-3 gap-4 md:gap-6 text-zinc-300 text-xs md:text-sm font-medium mb-6 md:mb-8">
                 <div className="flex items-start gap-2 md:gap-3"><Star className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0"/> Memahami skill dengan lebih jelas dan terstruktur.</div>
                 <div className="flex items-start gap-2 md:gap-3"><ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0"/> Memiliki hasil karya nyata untuk portfolio.</div>
                 <div className="flex items-start gap-2 md:gap-3"><TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] shrink-0"/> Lebih siap mengembangkan kemampuan ke tahap monetisasi.</div>
               </div>

               <div className="bg-[#0a0303] p-5 md:p-6 rounded-2xl border border-[#3a1013] text-center">
                 <div className="inline-block bg-[#D4AF37] text-[#0a0303] text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-2 md:mb-3 uppercase tracking-wider">Upgrade Opsi</div>
                 <h4 className="text-base md:text-lg font-bold text-white mb-2">Untuk kamu yang ingin lebih fokus: Mentoring 1-on-1</h4>
                 <p className="text-zinc-400 text-xs md:text-sm">Pendampingan personal dari Expert agar arah pengembangan karirmu jauh lebih cepat.</p>
               </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#140506] border-y border-[#3a1013]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Investasi Program</h2>
            <p className="text-base md:text-lg text-zinc-300 mb-6 md:mb-8 px-2">Program tersedia dalam beberapa pilihan, menyesuaikan kebutuhan dan tingkat pembelajaran.</p>
            
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-10 text-center">
              <div className="bg-[#1a080a] border border-[#D4AF37]/30 p-6 md:p-8 rounded-3xl flex flex-col justify-center shadow-lg">
                 <p className="text-zinc-400 mb-1 md:mb-2 text-sm md:text-base font-medium">Kelas Reguler / Bootcamp</p>
                 <p className="text-xs md:text-sm text-zinc-500 mb-1 md:mb-2">Mulai dari</p>
                 <h3 className="text-2xl md:text-4xl font-bold text-[#D4AF37]">1jt+</h3>
              </div>
              <div className="bg-gradient-to-br from-[#1a080a] to-[#2a0b0d] border border-[#D4AF37]/50 p-6 md:p-8 rounded-3xl flex flex-col justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                 <p className="text-[#D4AF37] font-bold mb-2 md:mb-3 text-lg md:text-xl">Mentoring 1-on-1</p>
                 <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-medium">Program mentoring dirancang khusus, menyesuaikan dengan <strong className="text-white">kebutuhan spesifik dan tingkat pendampingan</strong>.</p>
              </div>
            </div>

            <p className="text-zinc-400 mb-6 md:mb-8 text-sm md:text-base px-2">Silakan konsultasi untuk mendapatkan rekomendasi program yang paling sesuai.</p>
            <button onClick={() => openWA('Halo Admin 3Diamond, saya ingin tanya detail investasi program *Skill Digital & Kreatif*.')} className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-8 md:px-12 py-3.5 md:py-5 rounded-full font-bold text-base md:text-xl hover:bg-[#F3E5AB] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              Tanya Program Sekarang
            </button>
          </div>
        </section>
      </main>
      <Footer setRoute={setRoute} />
    </div>
  );
}

// ==========================================
// 2. AUTHENTICATION PAGE
// ==========================================
function AuthPage({ setRoute, onAuth }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#0a0303]">
      <div className="absolute inset-0 bg-[#611A1D]/10 blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute top-6 left-6 md:top-8 md:left-8 cursor-pointer z-10" onClick={() => setRoute('landing')}><Logo /></div>
      
      <div className="w-full max-w-md bg-[#1a080a] p-6 md:p-8 rounded-3xl border border-[#3a1013] shadow-2xl relative z-10 mt-16 md:mt-0">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Masuk Sistem</h2>
          <p className="text-zinc-400 text-sm">Gunakan kredensial yang diberikan oleh Admin.</p>
        </div>

        <div className="space-y-3 mb-6">
          <button onClick={() => onAuth({ id: 1, name: 'Budi Santoso', email: 'budi@mail.com', role: 'student', mentorId: 1 })} className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] py-3 rounded-xl font-bold hover:bg-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
            <PlayCircle className="w-4 h-4 md:w-5 md:h-5" /> Login Demo: Siswa
          </button>
          <button onClick={() => onAuth({ id: 1, name: 'Bima', role: 'mentor' })} className="w-full bg-blue-500/10 border border-blue-500/30 text-blue-400 py-3 rounded-xl font-bold hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
            <Star className="w-4 h-4 md:w-5 md:h-5" /> Login Demo: Mentor Bima
          </button>
          <div className="flex items-center mt-4 md:mt-6 mb-2">
            <div className="flex-1 border-t border-[#3a1013]"></div><span className="px-3 text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider">Atau Manual</span><div className="flex-1 border-t border-[#3a1013]"></div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onAuth({ role: 'student' }); }} className="space-y-4 md:space-y-5">
          <div><label className="block text-xs md:text-sm font-medium text-zinc-300 mb-1">Email / ID Akun</label><input type="email" required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#D4AF37]" placeholder="email@contoh.com" /></div>
          <div><label className="block text-xs md:text-sm font-medium text-zinc-300 mb-1">Password</label><input type="password" required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#D4AF37]" placeholder="••••••••" /></div>
          <button type="submit" className="w-full bg-[#D4AF37] text-[#2a0b0d] py-3 md:py-3.5 rounded-xl font-bold hover:bg-[#F3E5AB] transition-colors mt-2 md:mt-4 text-sm md:text-base">Masuk Dashboard</button>
        </form>

        <div className="mt-6 md:mt-8 text-center border-t border-[#3a1013] pt-5 md:pt-6">
          <button onClick={() => onAuth({ role: 'admin', name: 'Admin' })} className="text-[10px] md:text-xs text-zinc-400 hover:text-[#D4AF37] flex items-center justify-center gap-1 mx-auto transition-colors">
            <Shield className="w-3 h-3" /> Masuk sebagai Root Admin
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. STUDENT DASHBOARD
// ==========================================
function Dashboard({ 
  user, onLogout, modules, completedLessons, toggleLesson, 
  progressPercentage, totalLessons, activeModule, setActiveModule,
  mobileMenuOpen, setMobileMenuOpen, tasks, mentors
}) {
  const [activeView, setActiveView] = useState('dashboard');
  const myTasks = tasks.filter(t => t.studentId === user.id);
  const myMentor = mentors.find(m => m.id === user.mentorId);

  return (
    <div className="flex h-screen bg-[#0a0303] overflow-hidden relative">
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#140506] border-r border-[#3a1013] transform transition-transform duration-300 flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#3a1013]">
          <Logo className="scale-[0.85] origin-left" />
          <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}><X className="h-6 w-6" /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="text-[10px] font-bold text-[#611A1D] uppercase tracking-widest mb-4 px-2">Menu Siswa</div>
          <button onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeView === 'dashboard' ? 'bg-[#611A1D]/40 text-[#D4AF37]' : 'text-zinc-400 hover:bg-[#611A1D]/20'}`}><LayoutDashboard className="h-5 w-5" /><span>Dashboard</span></button>
          <button onClick={() => { setActiveView('materi'); setMobileMenuOpen(false); }} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeView === 'materi' ? 'bg-[#611A1D]/40 text-[#D4AF37]' : 'text-zinc-400 hover:bg-[#611A1D]/20'}`}><BookOpen className="h-5 w-5" /><span>Materi Kelas</span></button>
          <button onClick={() => { setActiveView('tugas'); setMobileMenuOpen(false); }} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeView === 'tugas' ? 'bg-[#611A1D]/40 text-[#D4AF37]' : 'text-zinc-400 hover:bg-[#611A1D]/20'}`}><CheckCircle className="h-5 w-5" /><span>Tugas & Review</span></button>
        </div>
        <div className="p-4 border-t border-[#3a1013] bg-[#0a0303]">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#611A1D] flex items-center justify-center font-bold text-[#2a0b0d]">{user?.name?.charAt(0) || 'U'}</div>
            <div className="overflow-hidden"><div className="text-sm font-bold text-zinc-100 truncate">{user?.name}</div><div className="text-xs text-[#D4AF37]">Siswa</div></div>
          </div>
          <button onClick={onLogout} className="flex items-center space-x-3 w-full px-3 py-2 text-zinc-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"><LogOut className="h-5 w-5" /><span>Keluar</span></button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-20 flex items-center justify-between px-6 border-b border-[#3a1013] bg-[#0a0303]/80 backdrop-blur-md z-10">
          <div className="flex items-center">
            <button className="lg:hidden text-[#D4AF37] mr-4" onClick={() => setMobileMenuOpen(true)}><Menu className="h-6 w-6" /></button>
            <h1 className="text-xl font-bold capitalize">{activeView}</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {activeView === 'dashboard' && (
              <div className="bg-[#1a080a] border border-[#3a1013] rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
                <div className="relative z-10 md:flex items-center justify-between">
                  <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Halo, {user?.name?.split(' ')[0]}! 👋</h2>
                    <p className="text-sm md:text-base text-zinc-400">Silakan lanjutkan materi pembelajaran Anda.</p>
                  </div>
                  <div className="bg-[#0a0303] p-4 md:p-5 rounded-2xl border border-[#3a1013] w-full md:w-72 shadow-inner">
                    <div className="flex justify-between items-end mb-3"><span className="text-sm font-medium text-zinc-400">Progress Kelas</span><span className="text-xl md:text-2xl font-bold text-[#D4AF37]">{progressPercentage}%</span></div>
                    <div className="w-full bg-[#3a1013] rounded-full h-2.5 overflow-hidden"><div className="bg-gradient-to-r from-[#611A1D] to-[#D4AF37] h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* View Materi */}
            {(activeView === 'dashboard' || activeView === 'materi') && (
              <div className="mt-8">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 border-b border-[#3a1013] pb-4">
                  <BookOpen className="text-[#D4AF37] h-4 w-4 md:h-5 md:w-5" /> Silabus Kurikulum
                </h3>
                <div className="space-y-4">
                  {modules.map((module, index) => {
                    const isExpanded = activeModule === module.id;
                    const modLessons = module.lessons;
                    const isCompleted = modLessons.length > 0 && modLessons.every(l => completedLessons.includes(l.id));

                    return (
                      <div key={module.id} className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden">
                        <button onClick={() => setActiveModule(isExpanded ? null : module.id)} className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between hover:bg-[#3a1013]/50 transition-colors">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'border-green-500 text-green-400' : 'border-[#611A1D] text-[#D4AF37]'}`}>
                              {isCompleted ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <span className="text-sm md:text-base font-bold">{index + 1}</span>}
                            </div>
                            <div className="text-left"><h4 className="font-bold text-sm md:text-lg text-white">{module.title}</h4></div>
                          </div>
                          <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 shrink-0 ml-2 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {isExpanded && (
                          <div className="bg-[#0a0303] px-4 md:px-6 py-2 border-t border-[#3a1013]">
                            {modLessons.length === 0 ? (
                              <div className="py-6 text-center text-zinc-500 text-xs md:text-sm">Belum ada materi di modul ini.</div>
                            ) : modLessons.map((lesson, idx) => {
                              const done = completedLessons.includes(lesson.id);
                              return (
                                <div key={lesson.id} className="flex items-center justify-between py-3 md:py-4 border-b border-[#3a1013]/50 last:border-0 hover:bg-[#1a080a] -mx-4 md:-mx-6 px-4 md:px-6 cursor-pointer" onClick={() => toggleLesson(lesson.id)}>
                                  <div className="flex items-start md:items-center gap-3 md:gap-4">
                                    <div className={`w-5 h-5 md:w-6 md:h-6 mt-0.5 md:mt-0 rounded flex items-center justify-center border flex-shrink-0 ${done ? 'bg-green-500 border-green-500' : 'border-[#611A1D]'}`}>
                                      {done && <Check className="w-3 h-3 md:w-4 md:h-4 text-black stroke-[3]" />}
                                    </div>
                                    <div>
                                      <div className={`text-sm md:text-base font-medium leading-tight ${done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{idx + 1}. {lesson.title}</div>
                                      <div className="text-[10px] md:text-xs text-[#D4AF37] flex items-center gap-1 mt-1 md:mt-1.5 opacity-80">
                                        <PlayCircle className="w-3 h-3 md:w-3.5 md:h-3.5"/> 
                                        {lesson.type} {lesson.duration !== '0:00' && `• ${lesson.duration}`}
                                      </div>
                                    </div>
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); alert(`Membuka: ${lesson.title}`); }} className="p-1.5 md:p-2 ml-2 text-[#D4AF37] hover:bg-[#611A1D]/30 rounded-lg transition-colors shrink-0">
                                     <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5"/>
                                  </button>
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
            )}
            
            {activeView === 'tugas' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 border-b border-[#3a1013] pb-4">
                  <CheckCircle className="text-[#D4AF37] h-4 w-4 md:h-5 md:w-5" /> Tugas & Feedback
                </h3>
                
                {myTasks.length === 0 ? (
                  <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl p-6 md:p-10 text-center text-sm md:text-base text-zinc-500">Belum ada tugas yang dikumpulkan.</div>
                ) : myTasks.map(task => (
                  <div key={task.id} className="bg-[#1a080a] border border-[#3a1013] rounded-2xl p-5 md:p-6 shadow-xl mb-6 relative overflow-hidden">
                     {task.status === 'Sudah Direview' && <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>}
                     <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-4 relative z-10">
                        <div>
                          <h4 className="text-base md:text-xl font-bold text-white leading-tight">{task.title}</h4>
                          <p className="text-xs md:text-sm text-zinc-400 mt-1.5 md:mt-2">Status: <span className={`font-medium px-2 py-0.5 rounded border ${task.status === 'Sudah Direview' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'}`}>{task.status}</span></p>
                        </div>
                        <span className="bg-[#611A1D]/50 text-[#D4AF37] text-[10px] md:text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-bold border border-[#D4AF37]/30">{task.phase}</span>
                     </div>
                     
                     <div className="bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 md:p-4 mb-5 md:mb-6 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="w-full truncate">
                          <p className="text-xs md:text-sm text-zinc-400 mb-1 md:mb-2">Tugas yang Anda kumpulkan:</p>
                          <span className="text-blue-400 text-xs md:text-sm font-medium flex items-center gap-1.5 truncate"><LinkIcon className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> {task.studentLink}</span>
                        </div>
                     </div>

                     {task.status === 'Sudah Direview' && (
                       <div className="border-t border-[#3a1013] pt-5 md:pt-6 relative z-10">
                          <div className="flex flex-col sm:flex-row gap-4">
                             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-[#1a080a] font-bold text-base md:text-lg shadow-lg border border-[#F3E5AB] shrink-0">
                                {myMentor?.name?.charAt(0) || 'M'}
                             </div>
                             <div className="flex-1 bg-[#0a0303] border border-[#611A1D]/50 rounded-2xl sm:rounded-tl-none p-4 md:p-5 relative">
                                <div className="hidden sm:block absolute top-0 -left-2 w-4 h-4 bg-[#0a0303] border-l border-t border-[#611A1D]/50 transform -rotate-45 translate-y-4"></div>
                                <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                                   <span className="font-bold text-[#D4AF37] text-sm md:text-base">{myMentor?.name || 'Mentor'}</span>
                                   <span className="bg-[#611A1D] text-white text-[9px] md:text-[10px] px-2 py-0.5 rounded-full">Mentor Pembimbing</span>
                                   {task.grade && <span className="sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0 font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded text-xs md:text-sm">Nilai: {task.grade}/100</span>}
                                </div>
                                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mb-3 whitespace-pre-wrap">{task.feedback}</p>
                                
                                {task.mentorAttachment && (
                                  <div className="bg-[#1a080a] border border-[#3a1013] p-2.5 md:p-3 rounded-lg flex items-start md:items-center gap-2 md:gap-3">
                                    <Paperclip className="w-3 h-3 md:w-4 md:h-4 text-[#D4AF37] shrink-0 mt-0.5 md:mt-0" />
                                    <div className="text-[10px] md:text-xs overflow-hidden">
                                      <div className="text-zinc-400">File/Materi Tambahan dari Mentor:</div>
                                      <a href={task.mentorAttachment} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all block">{task.mentorAttachment}</a>
                                    </div>
                                  </div>
                                )}
                             </div>
                          </div>
                       </div>
                     )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// 4. MENTOR DASHBOARD
// ==========================================
function MentorDashboard({ user, onLogout, mobileMenuOpen, setMobileMenuOpen, students, tasks, setTasks }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');
  const [attachment, setAttachment] = useState('');

  const myStudents = students.filter(s => s.mentorId === user?.id);
  const myStudentIds = myStudents.map(s => s.id);
  const myPendingTasks = tasks.filter(t => myStudentIds.includes(t.studentId) && t.status === 'Menunggu Review');
  const myReviewedTasks = tasks.filter(t => myStudentIds.includes(t.studentId) && t.status === 'Sudah Direview');

  const openReviewModal = (task) => {
    setSelectedTask(task); setFeedback(task.feedback || ''); setGrade(task.grade || ''); setAttachment(task.mentorAttachment || '');
    setReviewModalOpen(true);
  };

  const submitReview = (e) => {
    e.preventDefault();
    setTasks(tasks.map(t => {
      if (t.id === selectedTask?.id) {
        return { ...t, status: 'Sudah Direview', feedback, grade, mentorAttachment: attachment, reviewedAt: new Date().toISOString() };
      }
      return t;
    }));
    setReviewModalOpen(false);
    alert('Review berhasil dikirim ke siswa!');
  };

  return (
    <div className="flex h-screen bg-[#0a0303] overflow-hidden">
      
      <Modal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} title="Review & Penilaian Tugas">
        {selectedTask && (
          <form onSubmit={submitReview} className="space-y-4">
            <div className="bg-[#0a0303] p-4 rounded-xl border border-[#3a1013] mb-4">
              <div className="text-xs text-zinc-500 mb-1">Tugas Siswa: {students.find(s=>s.id === selectedTask.studentId)?.name}</div>
              <div className="font-bold text-white mb-2 text-sm md:text-base">{selectedTask.title}</div>
              <a href={selectedTask.studentLink} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-blue-400 flex items-center gap-1"><LinkIcon className="w-3 h-3"/> Lihat Hasil Pengerjaan</a>
            </div>
            
            <div>
              <label className="block text-xs md:text-sm font-medium text-zinc-400 mb-1">Feedback / Komentar Mentor</label>
              <textarea value={feedback} onChange={e=>setFeedback(e.target.value)} required rows="4" className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none resize-none" placeholder="Tulis masukan, perbaikan, atau pujian..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-zinc-400 mb-1">Nilai (0-100)</label>
                <input type="number" min="0" max="100" value={grade} onChange={e=>setGrade(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" placeholder="Misal: 85" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-zinc-400 mb-1">Lampirkan File Ekstra</label>
                <input type="text" value={attachment} onChange={e=>setAttachment(e.target.value)} className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" placeholder="Link PDF / Video Youtube" />
              </div>
            </div>
            <button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 md:py-3.5 rounded-xl hover:bg-[#F3E5AB] text-sm md:text-base">Kirim Review ke Siswa</button>
          </form>
        )}
      </Modal>

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#050101] border-r border-[#3a1013] flex flex-col transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 flex items-center px-6 border-b border-[#3a1013]"><span className="text-[#D4AF37] font-bold text-lg flex items-center gap-2"><Star className="w-5 h-5" /> PORTAL MENTOR</span></div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <button onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'overview' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a] hover:text-white'}`}><LayoutDashboard className="w-5 h-5" /> Overview</button>
          <button onClick={() => { setActiveTab('siswa'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'siswa' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a] hover:text-white'}`}><Users className="w-5 h-5" /> Siswa Bimbingan</button>
          <button onClick={() => { setActiveTab('tugas'); setMobileMenuOpen(false); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'tugas' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a] hover:text-white'}`}>
             <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Review Tugas</div>
             {myPendingTasks.length > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{myPendingTasks.length}</span>}
          </button>
        </div>
        <div className="p-4 border-t border-[#3a1013]"><div className="mb-4 px-2 text-xs text-zinc-500 truncate">Mentor: {user?.name}</div><button onClick={onLogout} className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-red-900/50 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors"><LogOut className="w-4 h-4" /> Keluar</button></div>
      </aside>

      <main className="flex-1 flex flex-col h-full bg-[#0a0303] overflow-y-auto relative">
        <header className="h-20 flex items-center justify-between px-6 md:px-8 border-b border-[#3a1013] sticky top-0 bg-[#0a0303]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-4"><button className="lg:hidden text-[#D4AF37]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu className="w-6 h-6" /></button><h1 className="text-xl md:text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h1></div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Halo Mentor {user?.name}, selamat datang!</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-[#1a080a] border border-[#3a1013] p-5 md:p-6 rounded-2xl">
                  <div className="text-xs md:text-sm text-zinc-400 mb-2">Total Siswa Bimbingan</div>
                  <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">{myStudents.length} <span className="text-xs md:text-sm font-normal text-zinc-500">Siswa</span></div>
                </div>
                <div className="bg-[#1a080a] border border-yellow-900/50 p-5 md:p-6 rounded-2xl shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                  <div className="text-xs md:text-sm text-zinc-400 mb-2">Tugas Perlu Direview</div>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-500">{myPendingTasks.length} <span className="text-xs md:text-sm font-normal text-zinc-500">Antrean</span></div>
                </div>
                <div className="bg-[#1a080a] border border-green-900/50 p-5 md:p-6 rounded-2xl shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <div className="text-xs md:text-sm text-zinc-400 mb-2">Tugas Diselesaikan</div>
                  <div className="text-3xl md:text-4xl font-bold text-green-500">{myReviewedTasks.length} <span className="text-xs md:text-sm font-normal text-zinc-500">Tugas</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'siswa' && (
            <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden animate-in fade-in duration-500 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap min-w-[600px]">
                  <thead className="bg-[#0a0303] text-zinc-400 text-xs md:text-sm uppercase">
                    <tr><th className="px-4 md:px-6 py-3 md:py-4">Profil Siswa</th><th className="px-4 md:px-6 py-3 md:py-4">Paket</th><th className="px-4 md:px-6 py-3 md:py-4">Progress</th><th className="px-4 md:px-6 py-3 md:py-4 text-right">Komunikasi</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#3a1013]">
                    {myStudents.map(s => (
                      <tr key={s.id} className="hover:bg-[#140506]">
                        <td className="px-4 md:px-6 py-4"><div className="font-bold text-white text-sm md:text-base">{s.name}</div><div className="text-[10px] md:text-xs text-zinc-500">{s.email}</div></td>
                        <td className="px-4 md:px-6 py-4"><span className="bg-[#3a1013] text-[#D4AF37] px-2 md:px-3 py-1 rounded text-[10px] md:text-xs">{s.pkg}</span></td>
                        <td className="px-4 md:px-6 py-4"><div className="flex items-center gap-2"><div className="w-16 md:w-24 bg-[#0a0303] rounded-full h-1.5 border border-[#3a1013]"><div className="bg-[#D4AF37] h-1.5 rounded-full" style={{width: `${s.progress}%`}}></div></div><span className="text-[10px] md:text-xs text-[#D4AF37] font-bold">{s.progress}%</span></div></td>
                        <td className="px-4 md:px-6 py-4 flex justify-end gap-2">
                          <button onClick={()=>alert(`Membuka panel chat dengan ${s.name}`)} className="p-1.5 md:p-2 bg-[#611A1D]/20 text-[#D4AF37] rounded-lg border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#2a0b0d] transition-all"><Send className="w-3.5 h-3.5 md:w-4 md:h-4"/></button>
                        </td>
                      </tr>
                    ))}
                    {myStudents.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-sm text-zinc-500">Belum ada siswa yang di-assign ke Anda.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tugas' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-lg md:text-xl font-bold text-white border-b border-[#3a1013] pb-3 md:pb-4">Antrean Review Tugas ({myPendingTasks.length})</h3>
              {myPendingTasks.length === 0 ? (
                <div className="bg-[#1a080a] border border-[#3a1013] rounded-xl p-6 md:p-8 text-center text-sm md:text-base text-zinc-500">Tidak ada tugas yang menunggu review. Kerjaan Anda beres! 🎉</div>
              ) : myPendingTasks.map(task => (
                <div key={task.id} className="bg-[#1a080a] border border-yellow-900/30 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="w-full sm:w-auto overflow-hidden">
                    <div className="text-xs md:text-sm text-zinc-400 mb-1">Siswa: <span className="text-white font-bold">{students.find(s=>s.id === task.studentId)?.name}</span></div>
                    <div className="text-base md:text-lg font-bold text-[#D4AF37] mb-1.5 truncate">{task.title}</div>
                    <div className="text-[10px] md:text-xs text-yellow-500 flex items-center gap-1"><Clock className="w-3 h-3"/> Menunggu Penilaian Anda</div>
                  </div>
                  <button onClick={() => openReviewModal(task)} className="w-full sm:w-auto bg-[#D4AF37] text-[#2a0b0d] px-4 md:px-6 py-2.5 md:py-2.5 rounded-xl text-sm md:text-base font-bold hover:bg-[#F3E5AB] transition-all flex justify-center items-center gap-2 shrink-0"><Edit2 className="w-4 h-4"/> Review</button>
                </div>
              ))}

              <h3 className="text-lg md:text-xl font-bold text-white border-b border-[#3a1013] pb-3 md:pb-4 mt-8 md:mt-12">Histori Tugas Direview</h3>
              <div className="grid gap-3 md:gap-4">
                {myReviewedTasks.map(task => (
                  <div key={task.id} className="bg-[#0a0303] border border-[#3a1013] rounded-xl p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="w-full sm:w-auto overflow-hidden">
                      <div className="text-xs md:text-sm text-zinc-400">Siswa: {students.find(s=>s.id === task.studentId)?.name}</div>
                      <div className="font-bold text-white text-sm md:text-base truncate">{task.title}</div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                       <span className="text-xs md:text-sm font-bold text-green-400 bg-green-500/10 px-2 md:px-3 py-1 rounded">Nilai: {task.grade}</span>
                       <button onClick={() => openReviewModal(task)} className="text-xs md:text-sm text-[#D4AF37] hover:underline flex items-center gap-1 shrink-0"><Edit2 className="w-3 h-3"/> Edit Review</button>
                    </div>
                  </div>
                ))}
                {myReviewedTasks.length === 0 && <div className="text-center text-sm text-zinc-600 py-4">Belum ada histori review.</div>}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ==========================================
// 5. ADMIN DASHBOARD
// ==========================================
function AdminDashboard({ user, onLogout, mobileMenuOpen, setMobileMenuOpen, students, setStudents, mentors, setMentors, modules, setModules }) {
  const [activeTab, setActiveTab] = useState('metrik');
  const [isAddingSiswa, setIsAddingSiswa] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [matModuleId, setMatModuleId] = useState(modules[0]?.id || '');
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState('Video YT');
  const [matUrl, setMatUrl] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPkg, setRegPkg] = useState('Bootcamp Intensive');
  const [regMentor, setRegMentor] = useState('');

  const [showMentorModal, setShowMentorModal] = useState(false);
  const [editingMentorId, setEditingMentorId] = useState(null);
  const [mentorForm, setMentorForm] = useState({ name: '', wa: '', role: '' });

  const [cashflows, setCashflows] = useState(initialCashflows);
  const [showCashflowModal, setShowCashflowModal] = useState(false);
  const [cfForm, setCfForm] = useState({ description: '', category: 'Outcome', amount: '' });

  const handleStatusChange = (studentId, newStatus) => setStudents(students.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
  const handleToggleMentorStatus = (mentorId) => setMentors(mentors.map(m => m.id === mentorId ? { ...m, status: m.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : m));
  const handleAssignCheck = (studentId) => setStudents(students.map(s => { if (s.id === studentId) return { ...s, mentorId: s.mentorId === selectedMentor?.id ? null : selectedMentor?.id }; return s; }));

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newStudent = { id: Date.now(), name: regName, email: regEmail, pkg: regPkg, mentorId: regMentor ? parseInt(regMentor) : null, status: 'Aktif', progress: 0 };
    setStudents([...students, newStudent]); 
    
    let amount = 0;
    if (regPkg === 'Starter') amount = 149000;
    else if (regPkg === 'Bootcamp Intensive') amount = 899000;
    else if (regPkg === '1-on-1 Mentoring') amount = 2499000;
    
    if (amount > 0) {
      const newIncome = {
        id: Date.now() + 1,
        date: new Date().toISOString(),
        description: `Pendaftaran: ${regName} (${regPkg})`,
        category: 'Income',
        amount: amount
      };
      setCashflows([newIncome, ...cashflows]);
    }

    setIsAddingSiswa(false); setRegName(''); setRegEmail(''); setRegPkg('Bootcamp Intensive'); setRegMentor('');
    alert(`Sukses! Akun untuk ${newStudent.name} telah dibuat dan pembayaran tercatat di sistem.`);
  };

  const handleAddMaterialSubmit = (e) => {
    e.preventDefault();
    if (!matTitle) return;
    const newLesson = { id: 'l' + Date.now(), title: matTitle, type: matType, duration: '0:00', url: matUrl };
    setModules(modules.map(m => { if (m.id === matModuleId) return { ...m, lessons: [...m.lessons, newLesson] }; return m; }));
    setShowModuleModal(false); setMatTitle(''); setMatUrl(''); alert('Materi baru berhasil ditambahkan!');
  };

  const handleOpenMentorModal = (mentor = null) => {
    if (mentor) {
      setEditingMentorId(mentor.id);
      setMentorForm({ name: mentor.name, wa: mentor.wa || '', role: mentor.role });
    } else {
      setEditingMentorId(null);
      setMentorForm({ name: '', wa: '', role: '' });
    }
    setShowMentorModal(true);
  };

  const handleMentorSubmit = (e) => {
    e.preventDefault();
    if (editingMentorId) {
      setMentors(mentors.map(m => m.id === editingMentorId ? { ...m, ...mentorForm } : m));
      alert('Profil mentor berhasil diperbarui!');
    } else {
      const newMentor = {
        id: Date.now(),
        ...mentorForm,
        email: `${mentorForm.name.toLowerCase().replace(/\s/g, '')}@3diamond.id`,
        status: 'Aktif'
      };
      setMentors([...mentors, newMentor]);
      alert('Mentor baru berhasil ditambahkan!');
    }
    setShowMentorModal(false);
  };

  const handleAddCashflow = (e) => {
    e.preventDefault();
    if (!cfForm.description || !cfForm.amount) return;
    const newCf = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...cfForm,
      amount: parseInt(cfForm.amount)
    };
    setCashflows([newCf, ...cashflows]);
    setShowCashflowModal(false);
    setCfForm({ description: '', category: 'Outcome', amount: '' });
    alert('Catatan keuangan berhasil ditambahkan!');
  };

  const downloadReport = () => {
    alert('Fitur download JPG sedang disimulasikan. Laporan keuangan berhasil disimpan ke galeri Anda.');
  };

  const totalIncome = cashflows.filter(c => c.category === 'Income').reduce((sum, item) => sum + item.amount, 0);
  const totalOutcome = cashflows.filter(c => c.category === 'Outcome').reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalIncome - totalOutcome;

  return (
    <div className="flex h-screen bg-[#0a0303] overflow-hidden">
      <Modal isOpen={showCashflowModal} onClose={() => setShowCashflowModal(false)} title="Tambah Catatan Keuangan">
        <form onSubmit={handleAddCashflow} className="space-y-4">
          <div><label className="block text-sm text-zinc-400 mb-1">Keterangan Transaksi</label><input type="text" value={cfForm.description} onChange={e => setCfForm({...cfForm, description: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" placeholder="Contoh: Pembayaran Server / Pemasukan Freelance" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Kategori</label>
              <select value={cfForm.category} onChange={e => setCfForm({...cfForm, category: e.target.value})} className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none appearance-none">
                <option value="Income">Pemasukan (Income)</option>
                <option value="Outcome">Pengeluaran (Outcome)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Nominal (Rp)</label>
              <input type="number" value={cfForm.amount} onChange={e => setCfForm({...cfForm, amount: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" placeholder="150000" />
            </div>
          </div>
          <button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 md:py-3.5 text-sm md:text-base rounded-xl hover:bg-[#F3E5AB]">Simpan Transaksi</button>
        </form>
      </Modal>

      <Modal isOpen={showAssignModal} onClose={() => setShowAssignModal(false)} title={`Assign Siswa ke Mentor: ${selectedMentor?.name}`}>
        <p className="text-xs md:text-sm text-zinc-400 mb-4">Pilih siswa aktif (paket Bootcamp / Mentoring) yang akan dibimbing oleh mentor ini.</p>
        <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
          {students.filter(s => s.pkg !== 'Starter').map(student => (
            <label key={student.id} className="flex items-center justify-between p-3 md:p-4 bg-[#0a0303] border border-[#3a1013] rounded-xl cursor-pointer hover:border-[#611A1D]">
              <div className="flex items-center gap-3"><input type="checkbox" checked={student.mentorId === selectedMentor?.id} onChange={() => handleAssignCheck(student.id)} className="w-4 h-4 md:w-5 md:h-5 accent-[#D4AF37] rounded"/><div className="overflow-hidden"><div className="font-bold text-sm md:text-base text-zinc-200 truncate">{student.name}</div><div className="text-[10px] md:text-xs text-[#D4AF37] truncate">{student.pkg}</div></div></div>
              {student.mentorId && student.mentorId !== selectedMentor?.id && <span className="text-[9px] md:text-[10px] bg-[#3a1013] text-zinc-400 px-2 py-1 rounded shrink-0 ml-2">Mentor lain</span>}
            </label>
          ))}
        </div>
        <button onClick={() => setShowAssignModal(false)} className="w-full mt-6 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 rounded-xl hover:bg-[#F3E5AB] text-sm md:text-base">Simpan Perubahan</button>
      </Modal>

      <Modal isOpen={showModuleModal} onClose={() => setShowModuleModal(false)} title="Upload Materi Baru">
        <form onSubmit={handleAddMaterialSubmit} className="space-y-4">
          <div><label className="block text-sm text-zinc-400 mb-1">Modul Tujuan</label><select value={matModuleId} onChange={e => setMatModuleId(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none">{modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Judul Materi</label><input type="text" value={matTitle} onChange={e => setMatTitle(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm text-zinc-400 mb-1">Tipe File</label><select value={matType} onChange={e => setMatType(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none"><option value="Video YT">Video YT</option><option value="PDF">PDF</option><option value="Gambar">Gambar</option><option value="Link/Figma">Link Eksternal</option></select></div>
            <div><label className="block text-sm text-zinc-400 mb-1">URL / Link File</label><input type="text" value={matUrl} onChange={e => setMatUrl(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" /></div>
          </div>
          <button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 md:py-3.5 text-sm md:text-base rounded-xl hover:bg-[#F3E5AB]">Upload Materi</button>
        </form>
      </Modal>

      <Modal isOpen={showMentorModal} onClose={() => setShowMentorModal(false)} title={editingMentorId ? "Edit Profil Mentor" : "Tambah Mentor Baru"}>
        <form onSubmit={handleMentorSubmit} className="space-y-4">
          <div><label className="block text-sm text-zinc-400 mb-1">Nama Mentor</label><input type="text" value={mentorForm.name} onChange={e => setMentorForm({...mentorForm, name: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">No. WhatsApp</label><input type="text" value={mentorForm.wa} onChange={e => setMentorForm({...mentorForm, wa: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" placeholder="Contoh: 08123456..." /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Job / Spesialisasi</label><input type="text" value={mentorForm.role} onChange={e => setMentorForm({...mentorForm, role: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" placeholder="Contoh: Senior UI/UX" /></div>
          <button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 md:py-3.5 text-sm md:text-base rounded-xl hover:bg-[#F3E5AB]">Simpan Data</button>
        </form>
      </Modal>

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#050101] border-r border-[#3a1013] flex flex-col transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 md:h-20 flex items-center px-4 md:px-6 border-b border-[#3a1013]"><span className="text-[#D4AF37] font-bold text-base md:text-lg flex items-center gap-2"><Shield className="w-4 h-4 md:w-5 md:h-5" /> ADMIN PANEL</span></div>
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <button onClick={() => {setActiveTab('metrik'); setIsAddingSiswa(false); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all ${activeTab === 'metrik' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a]'}`}><BarChart3 className="w-4 h-4 md:w-5 md:h-5" /> Metrik Bisnis</button>
          <button onClick={() => {setActiveTab('siswa'); setIsAddingSiswa(false); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all ${activeTab === 'siswa' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a]'}`}><Users className="w-4 h-4 md:w-5 md:h-5" /> Database Siswa</button>
          <button onClick={() => {setActiveTab('mentor'); setIsAddingSiswa(false); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all ${activeTab === 'mentor' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a]'}`}><Star className="w-4 h-4 md:w-5 md:h-5" /> Kelola Mentor</button>
          <button onClick={() => {setActiveTab('materi'); setIsAddingSiswa(false); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all ${activeTab === 'materi' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a]'}`}><BookOpen className="w-4 h-4 md:w-5 md:h-5" /> Kelola Materi</button>
        </div>
        <div className="p-4 border-t border-[#3a1013]"><button onClick={onLogout} className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-red-900/50 text-red-400 rounded-lg hover:bg-red-900/20 text-sm md:text-base"><LogOut className="w-4 h-4" /> Keluar</button></div>
      </aside>

      <main className="flex-1 flex flex-col h-full bg-[#0a0303] overflow-y-auto relative">
        <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 border-b border-[#3a1013] sticky top-0 bg-[#0a0303]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3 md:gap-4"><button className="lg:hidden text-[#D4AF37]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu className="w-5 h-5 md:w-6 md:h-6" /></button><h1 className="text-lg md:text-2xl font-bold text-white capitalize">{activeTab === 'siswa' && isAddingSiswa ? 'Registrasi Siswa Baru' : activeTab.replace('-', ' ')}</h1></div>
          {activeTab === 'materi' && <button onClick={() => setShowModuleModal(true)} className="bg-[#1a080a] border border-[#D4AF37]/30 text-[#D4AF37] px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 hover:bg-[#3a1013]"><Plus className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Tambah Materi</span></button>}
          {activeTab === 'mentor' && <button onClick={() => handleOpenMentorModal()} className="bg-[#1a080a] border border-[#D4AF37]/30 text-[#D4AF37] px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 hover:bg-[#3a1013]"><Plus className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Tambah Mentor</span></button>}
          {activeTab === 'siswa' && !isAddingSiswa && <button onClick={() => setIsAddingSiswa(true)} className="bg-[#1a080a] border border-[#D4AF37]/30 text-[#D4AF37] px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 hover:bg-[#3a1013]"><Plus className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Registrasi Siswa</span></button>}
          {activeTab === 'metrik' && <button onClick={() => setShowCashflowModal(true)} className="bg-[#D4AF37] text-[#2a0b0d] px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-[#F3E5AB]"><Plus className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Input Transaksi</span></button>}
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          {activeTab === 'metrik' && (
             <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500" id="report-container">
               <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                 <div className="bg-gradient-to-br from-[#1a080a] to-[#0a0303] p-5 md:p-6 rounded-2xl md:rounded-3xl border border-[#3a1013] shadow-xl relative overflow-hidden">
                   <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-12 md:h-12 bg-green-500/10 rounded-full flex items-center justify-center"><ArrowDownRight className="w-4 h-4 md:w-6 md:h-6 text-green-400" /></div>
                   <h3 className="text-zinc-400 font-medium mb-1 md:mb-2 text-xs md:text-sm">Total Income (Kotor)</h3>
                   <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">Rp {totalIncome.toLocaleString('id-ID')}</div>
                 </div>
                 
                 <div className="bg-gradient-to-br from-[#1a080a] to-[#0a0303] p-5 md:p-6 rounded-2xl md:rounded-3xl border border-[#3a1013] shadow-xl relative overflow-hidden">
                   <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-12 md:h-12 bg-red-500/10 rounded-full flex items-center justify-center"><ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 text-red-400" /></div>
                   <h3 className="text-zinc-400 font-medium mb-1 md:mb-2 text-xs md:text-sm">Total Outcome (Biaya)</h3>
                   <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">Rp {totalOutcome.toLocaleString('id-ID')}</div>
                 </div>

                 <div className={`bg-gradient-to-br from-[#611A1D] to-[#1a080a] p-5 md:p-6 rounded-2xl md:rounded-3xl border ${netProfit >= 0 ? 'border-[#D4AF37]/50' : 'border-red-500/50'} shadow-xl relative overflow-hidden`}>
                   <h3 className="text-[#D4AF37] font-medium mb-1 md:mb-2 text-xs md:text-sm">Net Profit (Bersih)</h3>
                   <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">Rp {netProfit.toLocaleString('id-ID')}</div>
                   <div className="text-[10px] md:text-xs text-zinc-300 mt-1 md:mt-2">Margin: {totalIncome ? Math.round((netProfit/totalIncome)*100) : 0}%</div>
                 </div>
               </div>

               <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-4 md:p-6 border-b border-[#3a1013] bg-[#0a0303] flex justify-between items-center">
                     <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2"><Wallet className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]"/> <span className="hidden sm:inline">Riwayat</span> Arus Kas</h3>
                     <button onClick={downloadReport} className="text-[10px] md:text-sm font-semibold bg-[#611A1D]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 md:px-3 py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all">Download <span className="hidden sm:inline">Laporan</span></button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap min-w-[500px]">
                      <thead className="bg-[#0a0303] text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider">
                        <tr><th className="px-4 md:px-6 py-3 md:py-4">Tanggal</th><th className="px-4 md:px-6 py-3 md:py-4">Keterangan</th><th className="px-4 md:px-6 py-3 md:py-4">Kategori</th><th className="px-4 md:px-6 py-3 md:py-4 text-right">Nominal (Rp)</th></tr>
                      </thead>
                      <tbody className="divide-y divide-[#3a1013] text-xs md:text-sm">
                        {cashflows.map(cf => {
                          const isIncome = cf.category === 'Income';
                          return (
                            <tr key={cf.id} className="hover:bg-[#140506]">
                              <td className="px-4 md:px-6 py-3 md:py-4 text-zinc-400">{new Date(cf.date).toLocaleString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'})}</td>
                              <td className="px-4 md:px-6 py-3 md:py-4 text-white font-medium">{cf.description}</td>
                              <td className="px-4 md:px-6 py-3 md:py-4"><span className={`px-2 py-1 rounded text-[10px] md:text-xs border ${isIncome ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 'bg-[#611A1D]/30 text-red-400 border-[#611A1D]'}`}>{cf.category}</span></td>
                              <td className={`px-4 md:px-6 py-3 md:py-4 text-right font-bold ${isIncome ? 'text-green-400' : 'text-red-400'}`}>{isIncome ? '+' : '-'} {cf.amount.toLocaleString('id-ID')}</td>
                            </tr>
                          )
                        })}
                        {cashflows.length === 0 && <tr><td colSpan={4} className="text-center py-6 md:py-8 text-zinc-500 text-xs md:text-sm">Belum ada riwayat transaksi.</td></tr>}
                      </tbody>
                    </table>
                  </div>
               </div>
             </div>
          )}
          {activeTab === 'siswa' && (
            <div className="animate-in fade-in duration-500">
              {isAddingSiswa ? (
                <form onSubmit={handleRegisterSubmit} className="bg-[#1a080a] border border-[#3a1013] rounded-2xl p-5 md:p-6 shadow-2xl">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 border-b border-[#3a1013] pb-3 md:pb-4">Buat Kredensial Siswa Baru</h3>
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    <div><label className="block text-xs md:text-sm text-zinc-400 mb-1 md:mb-2">Nama</label><input type="text" value={regName} onChange={e=>setRegName(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-2.5 md:p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" /></div>
                    <div><label className="block text-xs md:text-sm text-zinc-400 mb-1 md:mb-2">Email</label><input type="email" value={regEmail} onChange={e=>setRegEmail(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-2.5 md:p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none" /></div>
                    <div><label className="block text-xs md:text-sm text-zinc-400 mb-1 md:mb-2">Paket</label><select value={regPkg} onChange={e=>setRegPkg(e.target.value)} className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-2.5 md:p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none appearance-none"><option value="Starter">Starter</option><option value="Bootcamp Intensive">Bootcamp Intensive</option><option value="1-on-1 Mentoring">1-on-1 Mentoring</option></select></div>
                    <div><label className="block text-xs md:text-sm text-zinc-400 mb-1 md:mb-2">Mentor</label><select value={regMentor} onChange={e=>setRegMentor(e.target.value)} disabled={regPkg==='Starter'} className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-2.5 md:p-3 text-sm md:text-base text-white focus:border-[#D4AF37] outline-none appearance-none disabled:opacity-50"><option value="">-- Pilih --</option>{mentors.filter(m=>m.status==='Aktif').map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
                  </div>
                  <div className="flex justify-end gap-3 md:gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#3a1013]"><button type="button" onClick={() => setIsAddingSiswa(false)} className="px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm text-zinc-400 hover:text-white font-medium">Batal</button><button type="submit" className="bg-[#D4AF37] text-[#2a0b0d] font-bold px-6 md:px-8 py-2 md:py-2.5 text-xs md:text-sm rounded-xl hover:bg-[#F3E5AB]">Simpan</button></div>
                </form>
              ) : (
                <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto"><table className="w-full text-left whitespace-nowrap min-w-[500px]"><thead className="bg-[#0a0303] text-zinc-400 text-xs md:text-sm uppercase"><tr><th className="px-4 md:px-6 py-3 md:py-4">Nama/Email</th><th className="px-4 md:px-6 py-3 md:py-4">Paket & Mentor</th><th className="px-4 md:px-6 py-3 md:py-4">Status</th></tr></thead><tbody className="divide-y divide-[#3a1013]">
                    {students.map(s => (
                      <tr key={s.id} className="hover:bg-[#140506]"><td className="px-4 md:px-6 py-3 md:py-4"><div className="font-bold text-white text-sm md:text-base">{s.name}</div><div className="text-[10px] md:text-xs text-zinc-500">{s.email}</div></td><td className="px-4 md:px-6 py-3 md:py-4"><span className="bg-[#3a1013] text-[#D4AF37] px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold">{s.pkg}</span>{s.mentorId && <div className="text-[9px] md:text-[10px] text-zinc-400 mt-1">Mentor: {mentors.find(m=>m.id===s.mentorId)?.name}</div>}</td><td className="px-4 md:px-6 py-3 md:py-4"><select value={s.status} onChange={(e) => handleStatusChange(s.id, e.target.value)} className="text-[10px] md:text-xs font-bold px-2 md:px-3 py-1.5 rounded outline-none bg-transparent text-zinc-300 border border-zinc-700 appearance-none"><option value="Aktif" className="bg-black">Aktif</option><option value="Pending Payment" className="bg-black">Pending Payment</option></select></td></tr>
                    ))}
                    {students.length === 0 && <tr><td colSpan={3} className="text-center py-6 text-sm text-zinc-500">Belum ada data.</td></tr>}
                  </tbody></table></div>
                </div>
              )}
            </div>
          )}
          {activeTab === 'mentor' && (
             <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden animate-in fade-in duration-500 shadow-xl">
                <div className="overflow-x-auto"><table className="w-full text-left whitespace-nowrap min-w-[500px]"><thead className="bg-[#0a0303] text-zinc-400 text-xs md:text-sm uppercase"><tr><th className="px-4 md:px-6 py-3 md:py-4">Profil Mentor</th><th className="px-4 md:px-6 py-3 md:py-4">Beban Siswa</th><th className="px-4 md:px-6 py-3 md:py-4 text-right">Manajemen</th></tr></thead><tbody className="divide-y divide-[#3a1013]">
                  {mentors.map(m => (
                    <tr key={m.id} className={`transition-colors ${m.status === 'Nonaktif' ? 'opacity-50 bg-[#050101]' : 'hover:bg-[#140506]'}`}><td className="px-4 md:px-6 py-3 md:py-4"><div className="font-bold text-white text-sm md:text-base">{m.name}</div><div className="text-[10px] md:text-xs text-[#D4AF37]">{m.role} {m.wa && `• WA: ${m.wa}`}</div></td><td className="px-4 md:px-6 py-3 md:py-4 font-bold text-white text-sm md:text-base">{students.filter(s => s.mentorId === m.id).length} <span className="text-zinc-500 text-[10px] md:text-xs font-normal">Siswa</span></td><td className="px-4 md:px-6 py-3 md:py-4 flex justify-end gap-2"><button onClick={() => handleOpenMentorModal(m)} className="text-[10px] md:text-xs font-semibold bg-[#611A1D]/20 text-blue-400 border border-blue-900/30 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:bg-blue-900/40 flex items-center gap-1"><Edit2 className="w-3 h-3"/> Edit</button><button disabled={m.status === 'Nonaktif'} onClick={() => { setSelectedMentor(m); setShowAssignModal(true); }} className="text-[10px] md:text-xs font-semibold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:bg-[#D4AF37]/20 flex items-center gap-1 disabled:opacity-50"><Users className="w-3 h-3"/> Assign</button><button onClick={() => handleToggleMentorStatus(m.id)} className={`text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg border ${m.status==='Aktif' ? 'bg-[#611A1D]/20 text-red-400 border-red-900/30' : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>{m.status==='Aktif' ? 'Nonaktifkan' : 'Aktifkan'}</button></td></tr>
                  ))}
                  {mentors.length === 0 && <tr><td colSpan={3} className="text-center py-6 text-sm text-zinc-500">Belum ada data.</td></tr>}
                </tbody></table></div>
             </div>
          )}
          {activeTab === 'materi' && (
             <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl p-6 md:p-8 text-center text-sm md:text-base text-zinc-400">Gunakan tombol "Tambah Materi" di atas untuk menambah modul ke database.</div>
          )}
        </div>
      </main>
    </div>
  );
}