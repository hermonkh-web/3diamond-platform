"use client";

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle, ChevronDown, ChevronRight, 
  LayoutDashboard, LogOut, PlayCircle, Star, 
  Target, TrendingUp, Users, Zap, Menu, X, ArrowRight, Check, MessageCircle,
  BarChart3, Plus, Edit2, Trash2, DollarSign, Wallet, Shield, ArrowUpRight, ArrowDownRight, Clock, Image as ImageIcon, FileText, Link as LinkIcon, Send, Paperclip
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
// PENTING: Pindahkan blok komentar di bawah ini ke file app/layout.js atau app/layout.tsx Anda!
// Jangan di-export dari file page.js yang menggunakan "use client".
// ==========================================

/*
export const metadata = {
  title: '3Diamond Institute | Bangun Skill Art & Tech, Cetak Income',
  description: 'Platform belajar terarah untuk pemula. Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi dan hasilkan income nyata.',
  keywords: 'kursus ui ux, bootcamp web developer, belajar desain grafis, figma tutorial, cara cari klien freelance, 3diamond institute, solusilokal',
  openGraph: {
    title: '3Diamond Institute | Bangun Skill Art & Tech, Cetak Income',
    description: 'Platform belajar terarah untuk pemula. Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi dan hasilkan income nyata.',
    url: 'https://www.3diamond.id',
    siteName: '3Diamond Institute',
    images: [
      {
        url: 'https://www.3diamond.id/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: '3Diamond Institute Preview',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3Diamond Institute | Bangun Skill Art & Tech, Cetak Income',
    description: 'Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi.',
    images: ['https://www.3diamond.id/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico', 
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#0a0303',
};
*/

// --- WHATSAPP CONFIG ---
const WA_NUMBER = "6282150246420";
const openWA = (message) => { window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank'); };

// --- MOCK DATABASE (Supabase Equivalent) ---
const initialModules = [
  {
    id: 'm1',
    title: 'Fase 1: Mindset & Fundamental Design',
    packages: ['Starter', 'Bootcamp Intensive', '1-on-1 Mentoring'],
    lessons: [
      { id: 'l1', title: 'Cara Berpikir Seorang Creative Developer', duration: '12:45', type: 'Video YT' },
      { id: 'l2', title: 'Fundamental UI/UX & Pemilihan Warna', duration: '18:20', type: 'Video YT' },
    ]
  },
  {
    id: 'm2',
    title: 'Fase 2: Web Development Basic',
    packages: ['Bootcamp Intensive', '1-on-1 Mentoring'],
    lessons: [
      { id: 'l4', title: 'Struktur Web dengan HTML & CSS Dasar', duration: '30:15', type: 'Video YT' },
      { id: 'l5', title: 'Mengenal Tailwind CSS untuk Styling Cepat', duration: '45:00', type: 'Video YT' },
    ]
  }
];

const initialStudents = [
  { id: 1, name: 'Budi Santoso', email: 'budi@mail.com', pkg: 'Bootcamp Intensive', mentorId: 1, status: 'Aktif', progress: 85 },
  { id: 2, name: 'Siti Aminah', email: 'siti@mail.com', pkg: 'Starter', mentorId: null, status: 'Aktif', progress: 40 },
  { id: 3, name: 'Andi Setiawan', email: 'andi@mail.com', pkg: '1-on-1 Mentoring', mentorId: 2, status: 'Pending Payment', progress: 0 },
  { id: 4, name: 'Reza Rahadian', email: 'reza@mail.com', pkg: 'Bootcamp Intensive', mentorId: 1, status: 'Reminder', progress: 0 },
];

const initialMentors = [
  { id: 1, name: 'Bima', role: 'Senior UI/UX', email: 'bima@3diamond.id', wa: '081234567890', status: 'Aktif' },
  { id: 2, name: 'Fikri', role: 'Web Developer', email: 'fikri@3diamond.id', wa: '089876543210', status: 'Aktif' },
];

// Simulasi Tabel Tugas (Submissions)
const initialTasks = [
  { 
    id: 't1', studentId: 1, title: 'Project 1: Redesign Landing Page SaaS', phase: 'Fase 2', 
    studentLink: 'figma.com/file/3diamond-project-1', status: 'Menunggu Review', 
    feedback: '', grade: null, mentorAttachment: '', reviewedAt: null 
  }
];

// --- SIMULASI TABEL CASHFLOW ---
const initialCashflows = [
  { id: 1, date: new Date().toISOString(), description: 'Pendaftaran: Budi Santoso (Bootcamp)', category: 'Income', amount: 899000 },
  { id: 2, date: new Date(Date.now() - 86400000).toISOString(), description: 'Langganan Zoom Pro', category: 'Outcome', amount: 250000 },
  { id: 3, date: new Date(Date.now() - 172800000).toISOString(), description: 'Pendaftaran: Siti Aminah (Starter)', category: 'Income', amount: 149000 },
];

// --- BRANDING COMPONENT ---
function Logo({ className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] font-semibold tracking-wider italic leading-none drop-shadow-md">
        3Diamond
      </span>
      <span className="text-[9px] md:text-[10px] text-[#D4AF37]/90 tracking-[0.2em] font-serif mt-1">
        art-tech institute
      </span>
    </div>
  );
}

// --- REUSABLE MODAL COMPONENT ---
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

// --- GLOBAL STYLES FOR ANIMATION ---
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
  // Simulasi injeksi Head tag dihapus karena metadata sebaiknya diurus oleh layout.js bawaan Next.js

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

  const handleLogin = (roleUser) => {
    setUser(roleUser);
    if(roleUser.role === 'admin') setCurrentRoute('admin-dashboard');
    else if(roleUser.role === 'mentor') setCurrentRoute('mentor-dashboard');
    else setCurrentRoute('dashboard'); // student
  };

  const handleLogout = () => { setUser(null); setCurrentRoute('landing'); };
  const toggleLesson = (lessonId) => {
    setCompletedLessons(prev => prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]);
  };

  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#0a0303] text-zinc-50 font-sans selection:bg-[#D4AF37] selection:text-[#3a1013]">
      <GlobalStyles />
      {currentRoute === 'landing' && <LandingPage setRoute={setCurrentRoute} />}
      {currentRoute === 'login' && <AuthPage setRoute={setCurrentRoute} onAuth={handleLogin} />}
      
      {currentRoute === 'dashboard' && (
        <Dashboard 
          user={user} onLogout={handleLogout} modules={modules} completedLessons={completedLessons}
          toggleLesson={toggleLesson} progressPercentage={progressPercentage} totalLessons={totalLessons}
          activeModule={activeModule} setActiveModule={setActiveModule}
          mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
          tasks={tasks} mentors={mentors}
        />
      )}

      {currentRoute === 'admin-dashboard' && (
        <AdminDashboard 
          user={user} onLogout={handleLogout} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
          students={students} setStudents={setStudents} mentors={mentors} setMentors={setMentors}
          modules={modules} setModules={setModules}
        />
      )}

      {currentRoute === 'mentor-dashboard' && (
        <MentorDashboard 
          user={user} onLogout={handleLogout} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
          students={students} tasks={tasks} setTasks={setTasks}
        />
      )}
    </div>
  );
}

// ==========================================
// 1. LANDING PAGE COMPONENTS
// ==========================================
function LandingPage({ setRoute }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setRoute={setRoute} />
      <main className="flex-grow">
        <Hero />
        <ProgramSection />
        <PortfolioGallery />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
function Navbar({ setRoute }) { return (<nav className="fixed w-full z-50 bg-[#0a0303]/80 backdrop-blur-md border-b border-[#3a1013]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex justify-between items-center h-20"><div className="cursor-pointer transform hover:scale-105 transition-transform" onClick={() => setRoute('landing')}><Logo /></div><div className="flex items-center space-x-4">
{/* Tombol dikunci dengan atribut 'disabled', kursor diubah, dan warna diredupkan */}
<button 
  disabled 
  onClick={() => setRoute('login')} 
  className="text-sm text-zinc-600 cursor-not-allowed font-medium"
  title="Fitur Login Segera Hadir"
>
  Masuk Sistem
</button>
<button onClick={() => openWA('Halo Admin 3Diamond, saya ingin tanya-tanya dulu mengenai program belajarnya. Boleh minta info lebih lanjut?')} className="text-sm bg-[#D4AF37] text-[#2a0b0d] px-5 py-2.5 rounded-full font-bold hover:bg-[#F3E5AB] transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center gap-2">Hubungi Admin</button></div></div></div></nav>); }
function Hero() { return (<section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]"><div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract Art" className="w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none"/><div className="absolute inset-0 bg-gradient-to-b from-[#0a0303] via-[#0a0303]/80 to-[#0a0303]"></div></div><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center"><h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">Tingkatkan Nilai Diri Melalui <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Skill Art & Tech.</span></h1><p className="mt-4 text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">Platform belajar terarah untuk mengubah kreativitas menjadi sumber penghasilan. Bangun portfolio nyata, temukan klien pertamamu, dan jadikan skill digital sebagai aset.</p><button onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })} className="bg-[#D4AF37] text-[#2a0b0d] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#F3E5AB] transition-all transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] mx-auto flex items-center">Lihat Program <ArrowRight className="ml-2 h-5 w-5" /></button></div></section>); }
function ProgramSection() { return (<section id="programs" className="py-24 bg-[#140506]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-4">Pilih Jalur Belajarmu</h2><p className="text-zinc-400 text-lg">Akses langsung dibuatkan oleh Admin setelah pendaftaran via WhatsApp.</p></div><div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"><div className="bg-[#1a080a] p-8 rounded-3xl border border-[#3a1013]"><div className="text-sm font-medium text-[#D4AF37] mb-2">Pemula Nol Besar</div><h3 className="text-2xl font-bold mb-2">Starter</h3><div className="text-3xl font-bold mb-8">Rp 149.000</div><button onClick={() => openWA('Halo Admin 3Diamond, saya tertarik untuk mendaftar program *Starter*.')} className="w-full py-4 rounded-xl font-bold bg-[#0a0303] text-white border border-[#611A1D] hover:border-[#D4AF37] hover:text-[#D4AF37]">Daftar via WhatsApp</button></div><div className="bg-[#1a080a] p-8 rounded-3xl border border-[#D4AF37] transform md:-translate-y-4 shadow-[0_0_30px_rgba(212,175,55,0.15)]"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-[#2a0b0d] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Paling Diminati</div><div className="text-sm font-medium text-[#D4AF37] mb-2">Intensif & Portfolio</div><h3 className="text-2xl font-bold mb-2">Bootcamp Intensive</h3><div className="text-3xl font-bold mb-8">Rp 899.000</div><button onClick={() => openWA('Halo Admin 3Diamond, saya tertarik mendaftar program *Bootcamp Intensive*.')} className="w-full py-4 rounded-xl font-bold bg-[#D4AF37] text-[#2a0b0d] hover:bg-[#F3E5AB]">Daftar via WhatsApp</button></div><div className="bg-[#1a080a] p-8 rounded-3xl border border-[#3a1013]"><div className="text-sm font-medium text-[#D4AF37] mb-2">Fast-Track Income</div><h3 className="text-2xl font-bold mb-2">1-on-1 Mentoring</h3><div className="text-3xl font-bold mb-8">Rp 2.499.000</div><button onClick={() => openWA('Halo Admin 3Diamond, saya ingin mendaftar program *1-on-1 Mentoring*.')} className="w-full py-4 rounded-xl font-bold bg-[#0a0303] text-white border border-[#611A1D] hover:border-[#D4AF37] hover:text-[#D4AF37]">Daftar via WhatsApp</button></div></div></div></section>); }
function PortfolioGallery() { const portfolios = [{ id: 1, title: "SaaS Dashboard Redesign", type: "UI/UX", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" },{ id: 2, title: "E-Commerce Web App", type: "Web Dev", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop" },{ id: 3, title: "Brand Identity Concept", type: "Branding", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop" }]; return (<section className="py-24 bg-[#0a0303] overflow-hidden"><div className="text-center max-w-3xl mx-auto mb-16 px-4"><h2 className="text-3xl md:text-4xl font-bold mb-4">Galeri Karya Siswa</h2></div><div className="relative w-full overflow-hidden no-scrollbar"><div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0a0303] to-transparent z-10 pointer-events-none"></div><div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0a0303] to-transparent z-10 pointer-events-none"></div><div className="flex w-[200%] gap-6 animate-infinite-scroll">{[...portfolios, ...portfolios, ...portfolios].map((item, idx) => (<div key={idx} className="relative w-72 md:w-80 h-96 flex-shrink-0 rounded-2xl overflow-hidden group border border-[#3a1013] hover:border-[#D4AF37] transition-all cursor-pointer"><div className="absolute inset-0 bg-gradient-to-t from-[#0a0303] via-transparent to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity"></div><img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0" /><div className="absolute bottom-0 left-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform"><span className="text-[10px] uppercase tracking-widest font-bold bg-[#D4AF37] text-black px-2 py-1 rounded mb-2 inline-block">{item.type}</span><h3 className="text-lg font-bold text-white leading-tight">{item.title}</h3></div></div>))}</div></div></section>); }
function FinalCTA() { return (<section className="py-24 relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#611A1D]/20 z-0"></div><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"><h2 className="text-4xl md:text-5xl font-bold mb-6">Siap Membangun Nilai Skillmu?</h2><p className="text-xl text-zinc-400 mb-10">Ubah passion menjadi skill bernilai tinggi. Tingkatkan <i>value</i> pribadimu.</p><button onClick={() => openWA('Halo Admin 3Diamond, mohon panduan untuk memulai!')} className="bg-[#D4AF37] text-[#2a0b0d] px-10 py-5 rounded-full font-bold text-xl hover:bg-[#F3E5AB] transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)]">Mulai Transformasimu Sekarang</button></div></section>); }
function Footer() { return (<footer className="bg-[#0a0303] border-t border-[#3a1013] py-12"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6"><Logo className="scale-75 origin-center" /><div className="flex gap-4"><a href="https://www.instagram.com/3diamondinstitute/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a080a] border border-[#3a1013] flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all transform hover:scale-110"><InstagramIcon className="w-5 h-5" /></a></div><div className="text-center"><p className="text-zinc-500 text-sm mb-2">© {new Date().getFullYear()} 3Diamond Institute. Membangun Skill, Mencetak Income.</p><p className="text-zinc-600 text-xs flex items-center justify-center gap-1">Website & Sistem by <a href="https://www.solusilokal.id" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline font-semibold tracking-wide ml-1">SolusiLokal.ID</a></p></div></div></footer>); }

// ==========================================
// 2. AUTHENTICATION PAGE (Multi-Role)
// ==========================================
function AuthPage({ setRoute, onAuth }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#0a0303]">
      <div className="absolute inset-0 bg-[#611A1D]/10 blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute top-8 left-8 cursor-pointer z-10" onClick={() => setRoute('landing')}><Logo /></div>
      
      <div className="w-full max-w-md bg-[#1a080a] p-8 rounded-3xl border border-[#3a1013] shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Masuk Sistem</h2>
          <p className="text-zinc-400 text-sm">Gunakan kredensial yang diberikan oleh Admin.</p>
        </div>

        {/* DEMO BUTTONS UNTUK TESTING */}
        <div className="space-y-3 mb-6">
          <button onClick={() => onAuth({ id: 1, name: 'Budi Santoso', email: 'budi@mail.com', role: 'student', mentorId: 1 })} className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] py-3 rounded-xl font-bold hover:bg-[#D4AF37]/20 transition-all flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5" /> Login Demo: Siswa
          </button>
          <button onClick={() => onAuth({ id: 1, name: 'Bima', role: 'mentor' })} className="w-full bg-blue-500/10 border border-blue-500/30 text-blue-400 py-3 rounded-xl font-bold hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2">
            <Star className="w-5 h-5" /> Login Demo: Mentor Bima
          </button>
          <div className="flex items-center mt-6 mb-2">
            <div className="flex-1 border-t border-[#3a1013]"></div><span className="px-3 text-xs text-zinc-500 uppercase tracking-wider">Atau Manual</span><div className="flex-1 border-t border-[#3a1013]"></div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onAuth({ role: 'student' }); }} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Email / ID Akun</label>
            <input type="email" required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="email@contoh.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
            <input type="password" required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-[#D4AF37] text-[#2a0b0d] py-3.5 rounded-xl font-bold hover:bg-[#F3E5AB] transition-colors mt-4">Masuk Dashboard</button>
        </form>

        <div className="mt-8 text-center border-t border-[#3a1013] pt-6">
          <button onClick={() => onAuth({ role: 'admin', name: 'Admin' })} className="text-xs text-zinc-400 hover:text-[#D4AF37] flex items-center justify-center gap-1 mx-auto transition-colors">
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
              <div className="bg-[#1a080a] border border-[#3a1013] rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <div className="relative z-10 md:flex items-center justify-between">
                  <div className="mb-6 md:mb-0">
                    <h2 className="text-3xl font-bold mb-2 text-white">Halo, {user?.name?.split(' ')[0]}! 👋</h2>
                    <p className="text-zinc-400">Silakan lanjutkan materi pembelajaran Anda.</p>
                  </div>
                  <div className="bg-[#0a0303] p-5 rounded-2xl border border-[#3a1013] w-full md:w-72 shadow-inner">
                    <div className="flex justify-between items-end mb-3"><span className="text-sm font-medium text-zinc-400">Progress Kelas</span><span className="text-2xl font-bold text-[#D4AF37]">{progressPercentage}%</span></div>
                    <div className="w-full bg-[#3a1013] rounded-full h-2.5 overflow-hidden"><div className="bg-gradient-to-r from-[#611A1D] to-[#D4AF37] h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* View Materi */}
            {(activeView === 'dashboard' || activeView === 'materi') && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-[#3a1013] pb-4">
                  <BookOpen className="text-[#D4AF37] h-5 w-5" /> Silabus Kurikulum
                </h3>
                <div className="space-y-4">
                  {modules.map((module, index) => {
                    const isExpanded = activeModule === module.id;
                    const modLessons = module.lessons;
                    const isCompleted = modLessons.length > 0 && modLessons.every(l => completedLessons.includes(l.id));

                    return (
                      <div key={module.id} className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden">
                        <button onClick={() => setActiveModule(isExpanded ? null : module.id)} className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#3a1013]/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'border-green-500 text-green-400' : 'border-[#611A1D] text-[#D4AF37]'}`}>
                              {isCompleted ? <Check className="w-5 h-5" /> : <span className="font-bold">{index + 1}</span>}
                            </div>
                            <div className="text-left"><h4 className="font-bold text-lg text-white">{module.title}</h4></div>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {isExpanded && (
                          <div className="bg-[#0a0303] px-6 py-2 border-t border-[#3a1013]">
                            {modLessons.length === 0 ? (
                              <div className="py-6 text-center text-zinc-500 text-sm">Belum ada materi di modul ini.</div>
                            ) : modLessons.map((lesson, idx) => {
                              const done = completedLessons.includes(lesson.id);
                              return (
                                <div key={lesson.id} className="flex items-center justify-between py-4 border-b border-[#3a1013]/50 last:border-0 hover:bg-[#1a080a] -mx-6 px-6 cursor-pointer" onClick={() => toggleLesson(lesson.id)}>
                                  <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center border flex-shrink-0 ${done ? 'bg-green-500 border-green-500' : 'border-[#611A1D]'}`}>
                                      {done && <Check className="w-4 h-4 text-black stroke-[3]" />}
                                    </div>
                                    <div>
                                      <div className={`font-medium ${done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{idx + 1}. {lesson.title}</div>
                                      <div className="text-xs text-[#D4AF37] flex items-center gap-1 mt-1 opacity-80">
                                        <PlayCircle className="w-3.5 h-3.5"/> 
                                        {lesson.type} {lesson.duration !== '0:00' && `• ${lesson.duration}`}
                                      </div>
                                    </div>
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); alert(`Membuka: ${lesson.title}`); }} className="p-2 text-[#D4AF37] hover:bg-[#611A1D]/30 rounded-lg transition-colors">
                                     <ArrowUpRight className="w-5 h-5"/>
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
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-[#3a1013] pb-4">
                  <CheckCircle className="text-[#D4AF37] h-5 w-5" /> Tugas & Feedback
                </h3>
                
                {myTasks.length === 0 ? (
                  <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl p-10 text-center text-zinc-500">Belum ada tugas yang dikumpulkan.</div>
                ) : myTasks.map(task => (
                  <div key={task.id} className="bg-[#1a080a] border border-[#3a1013] rounded-2xl p-6 shadow-xl mb-6 relative overflow-hidden">
                     {task.status === 'Sudah Direview' && <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>}
                     <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                          <h4 className="text-xl font-bold text-white">{task.title}</h4>
                          <p className="text-sm text-zinc-400 mt-1">Status: <span className={`font-medium px-2 py-0.5 rounded border ${task.status === 'Sudah Direview' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'}`}>{task.status}</span></p>
                        </div>
                        <span className="bg-[#611A1D]/50 text-[#D4AF37] text-xs px-3 py-1.5 rounded-full font-bold border border-[#D4AF37]/30">{task.phase}</span>
                     </div>
                     
                     <div className="bg-[#0a0303] border border-[#3a1013] rounded-xl p-4 mb-6 relative z-10 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400 mb-2">Tugas yang Anda kumpulkan:</p>
                          <span className="text-blue-400 text-sm font-medium flex items-center gap-2"><LinkIcon className="w-4 h-4" /> {task.studentLink}</span>
                        </div>
                     </div>

                     {task.status === 'Sudah Direview' && (
                       <div className="border-t border-[#3a1013] pt-6 relative z-10">
                          <div className="flex gap-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-[#1a080a] font-bold text-lg shadow-lg border border-[#F3E5AB] flex-shrink-0">
                                {myMentor?.name?.charAt(0) || 'M'}
                             </div>
                             <div className="flex-1 bg-[#0a0303] border border-[#611A1D]/50 rounded-2xl rounded-tl-none p-5 relative">
                                <div className="absolute top-0 -left-2 w-4 h-4 bg-[#0a0303] border-l border-t border-[#611A1D]/50 transform -rotate-45 translate-y-4"></div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                   <span className="font-bold text-[#D4AF37]">{myMentor?.name || 'Mentor'} ({myMentor?.role || 'Reviewer'})</span>
                                   <span className="bg-[#611A1D] text-white text-[10px] px-2 py-0.5 rounded-full">Mentor Pembimbing</span>
                                   {task.grade && <span className="ml-auto font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">Nilai: {task.grade}/100</span>}
                                </div>
                                <p className="text-sm text-zinc-300 leading-relaxed mb-3 whitespace-pre-wrap">{task.feedback}</p>
                                
                                {task.mentorAttachment && (
                                  <div className="bg-[#1a080a] border border-[#3a1013] p-3 rounded-lg flex items-center gap-3">
                                    <Paperclip className="w-4 h-4 text-[#D4AF37]" />
                                    <div className="text-xs">
                                      <div className="text-zinc-400">File/Materi Tambahan dari Mentor:</div>
                                      <a href={task.mentorAttachment} target="_blank" className="text-blue-400 hover:underline break-all">{task.mentorAttachment}</a>
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
  
  // Review Form States
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');
  const [attachment, setAttachment] = useState('');

  const myStudents = students.filter(s => s.mentorId === user.id);
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
      if (t.id === selectedTask.id) {
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
              <div className="font-bold text-white mb-2">{selectedTask.title}</div>
              <a href={selectedTask.studentLink} target="_blank" className="text-sm text-blue-400 flex items-center gap-1"><LinkIcon className="w-3 h-3"/> Lihat Hasil Pengerjaan</a>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Feedback / Komentar Mentor</label>
              <textarea value={feedback} onChange={e=>setFeedback(e.target.value)} required rows="4" className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none resize-none" placeholder="Tulis masukan, perbaikan, atau pujian..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nilai (0-100)</label>
                <input type="number" min="0" max="100" value={grade} onChange={e=>setGrade(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" placeholder="Misal: 85" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Lampirkan File/Materi Ekstra</label>
                <input type="text" value={attachment} onChange={e=>setAttachment(e.target.value)} className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" placeholder="Link PDF / Video Youtube" />
              </div>
            </div>
            <button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 rounded-xl hover:bg-[#F3E5AB]">Kirim Review ke Siswa</button>
          </form>
        )}
      </Modal>

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#050101] border-r border-[#3a1013] flex flex-col transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 flex items-center px-6 border-b border-[#3a1013]"><span className="text-[#D4AF37] font-bold text-lg flex items-center gap-2"><Star className="w-5 h-5" /> PORTAL MENTOR</span></div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'overview' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a] hover:text-white'}`}><LayoutDashboard className="w-5 h-5" /> Overview</button>
          <button onClick={() => setActiveTab('siswa')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'siswa' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a] hover:text-white'}`}><Users className="w-5 h-5" /> Siswa Bimbingan</button>
          <button onClick={() => setActiveTab('tugas')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'tugas' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a] hover:text-white'}`}>
             <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Review Tugas</div>
             {myPendingTasks.length > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{myPendingTasks.length}</span>}
          </button>
        </div>
        <div className="p-4 border-t border-[#3a1013]"><div className="mb-4 px-2 text-xs text-zinc-500">Mentor: {user?.name}</div><button onClick={onLogout} className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-red-900/50 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors"><LogOut className="w-4 h-4" /> Keluar</button></div>
      </aside>

      <main className="flex-1 flex flex-col h-full bg-[#0a0303] overflow-y-auto relative">
        <header className="h-20 flex items-center justify-between px-8 border-b border-[#3a1013] sticky top-0 bg-[#0a0303]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-4"><button className="lg:hidden text-[#D4AF37]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu className="w-6 h-6" /></button><h1 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h1></div>
        </header>

        <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-white mb-6">Halo Mentor {user?.name}, selamat datang!</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#1a080a] border border-[#3a1013] p-6 rounded-2xl">
                  <div className="text-zinc-400 mb-2">Total Siswa Bimbingan</div>
                  <div className="text-4xl font-bold text-[#D4AF37]">{myStudents.length} <span className="text-sm font-normal text-zinc-500">Siswa</span></div>
                </div>
                <div className="bg-[#1a080a] border border-yellow-900/50 p-6 rounded-2xl shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                  <div className="text-zinc-400 mb-2">Tugas Perlu Direview</div>
                  <div className="text-4xl font-bold text-yellow-500">{myPendingTasks.length} <span className="text-sm font-normal text-zinc-500">Antrean</span></div>
                </div>
                <div className="bg-[#1a080a] border border-green-900/50 p-6 rounded-2xl shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <div className="text-zinc-400 mb-2">Tugas Diselesaikan</div>
                  <div className="text-4xl font-bold text-green-500">{myReviewedTasks.length} <span className="text-sm font-normal text-zinc-500">Tugas</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'siswa' && (
            <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden animate-in fade-in duration-500 shadow-xl">
              <table className="w-full text-left">
                <thead className="bg-[#0a0303] text-zinc-400 text-sm uppercase">
                  <tr><th className="px-6 py-4">Profil Siswa</th><th className="px-6 py-4">Paket</th><th className="px-6 py-4">Progress Belajar</th><th className="px-6 py-4 text-right">Komunikasi</th></tr>
                </thead>
                <tbody className="divide-y divide-[#3a1013]">
                  {myStudents.map(s => (
                    <tr key={s.id} className="hover:bg-[#140506]">
                      <td className="px-6 py-4"><div className="font-bold text-white">{s.name}</div><div className="text-xs text-zinc-500">{s.email}</div></td>
                      <td className="px-6 py-4"><span className="bg-[#3a1013] text-[#D4AF37] px-3 py-1 rounded text-xs">{s.pkg}</span></td>
                      <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-24 bg-[#0a0303] rounded-full h-1.5 border border-[#3a1013]"><div className="bg-[#D4AF37] h-1.5 rounded-full" style={{width: `${s.progress}%`}}></div></div><span className="text-xs text-[#D4AF37] font-bold">{s.progress}%</span></div></td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        <button onClick={()=>alert(`Membuka panel chat dengan ${s.name}`)} className="p-2 bg-[#611A1D]/20 text-[#D4AF37] rounded-lg border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#2a0b0d] transition-all"><Send className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                  {myStudents.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-zinc-500">Belum ada siswa yang di-assign ke Anda.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'tugas' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-bold text-white border-b border-[#3a1013] pb-4">Antrean Review Tugas ({myPendingTasks.length})</h3>
              {myPendingTasks.length === 0 ? (
                <div className="bg-[#1a080a] border border-[#3a1013] rounded-xl p-8 text-center text-zinc-500">Tidak ada tugas yang menunggu review. Kerjaan Anda beres! 🎉</div>
              ) : myPendingTasks.map(task => (
                <div key={task.id} className="bg-[#1a080a] border border-yellow-900/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">Siswa: <span className="text-white font-bold">{students.find(s=>s.id === task.studentId)?.name}</span></div>
                    <div className="text-lg font-bold text-[#D4AF37] mb-1">{task.title}</div>
                    <div className="text-xs text-yellow-500 flex items-center gap-1"><Clock className="w-3 h-3"/> Menunggu Penilaian Anda</div>
                  </div>
                  <button onClick={() => openReviewModal(task)} className="bg-[#D4AF37] text-[#2a0b0d] px-6 py-2.5 rounded-xl font-bold hover:bg-[#F3E5AB] transition-all flex items-center gap-2 whitespace-nowrap"><Edit2 className="w-4 h-4"/> Beri Nilai & Review</button>
                </div>
              ))}

              <h3 className="text-xl font-bold text-white border-b border-[#3a1013] pb-4 mt-12">Histori Tugas Direview</h3>
              <div className="grid gap-4">
                {myReviewedTasks.map(task => (
                  <div key={task.id} className="bg-[#0a0303] border border-[#3a1013] rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                    <div>
                      <div className="text-sm text-zinc-400">Siswa: {students.find(s=>s.id === task.studentId)?.name}</div>
                      <div className="font-bold text-white">{task.title}</div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-sm font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded">Nilai: {task.grade}</span>
                       <button onClick={() => openReviewModal(task)} className="text-sm text-[#D4AF37] hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3"/> Edit Review</button>
                    </div>
                  </div>
                ))}
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
  const handleAssignCheck = (studentId) => setStudents(students.map(s => { if (s.id === studentId) return { ...s, mentorId: s.mentorId === selectedMentor.id ? null : selectedMentor.id }; return s; }));

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
          <div><label className="block text-sm text-zinc-400 mb-1">Keterangan Transaksi</label><input type="text" value={cfForm.description} onChange={e => setCfForm({...cfForm, description: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" placeholder="Contoh: Pembayaran Server / Pemasukan Freelance" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Kategori</label>
              <select value={cfForm.category} onChange={e => setCfForm({...cfForm, category: e.target.value})} className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none appearance-none">
                <option value="Income">Pemasukan (Income)</option>
                <option value="Outcome">Pengeluaran (Outcome)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Nominal (Rp)</label>
              <input type="number" value={cfForm.amount} onChange={e => setCfForm({...cfForm, amount: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" placeholder="150000" />
            </div>
          </div>
          <button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 rounded-xl hover:bg-[#F3E5AB]">Simpan Transaksi</button>
        </form>
      </Modal>

      <Modal isOpen={showAssignModal} onClose={() => setShowAssignModal(false)} title={`Assign Siswa ke Mentor: ${selectedMentor?.name}`}>
        <p className="text-sm text-zinc-400 mb-4">Pilih siswa aktif (paket Bootcamp / Mentoring) yang akan dibimbing oleh mentor ini.</p>
        <div className="space-y-3">
          {students.filter(s => s.pkg !== 'Starter').map(student => (
            <label key={student.id} className="flex items-center justify-between p-4 bg-[#0a0303] border border-[#3a1013] rounded-xl cursor-pointer hover:border-[#611A1D]">
              <div className="flex items-center gap-3"><input type="checkbox" checked={student.mentorId === selectedMentor?.id} onChange={() => handleAssignCheck(student.id)} className="w-5 h-5 accent-[#D4AF37] rounded"/><div><div className="font-bold text-zinc-200">{student.name}</div><div className="text-xs text-[#D4AF37]">{student.pkg}</div></div></div>
              {student.mentorId && student.mentorId !== selectedMentor?.id && <span className="text-[10px] bg-[#3a1013] text-zinc-400 px-2 py-1 rounded">Di-assign ke Mentor lain</span>}
            </label>
          ))}
        </div>
        <button onClick={() => setShowAssignModal(false)} className="w-full mt-6 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 rounded-xl hover:bg-[#F3E5AB]">Simpan Perubahan</button>
      </Modal>

      <Modal isOpen={showModuleModal} onClose={() => setShowModuleModal(false)} title="Upload Materi Baru">
        <form onSubmit={handleAddMaterialSubmit} className="space-y-4">
          <div><label className="block text-sm text-zinc-400 mb-1">Modul Tujuan</label><select value={matModuleId} onChange={e => setMatModuleId(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none">{modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Judul Materi</label><input type="text" value={matTitle} onChange={e => setMatTitle(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-zinc-400 mb-1">Tipe File</label><select value={matType} onChange={e => setMatType(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"><option value="Video YT">Video YT</option><option value="PDF">PDF</option><option value="Gambar">Gambar</option><option value="Link/Figma">Link Eksternal</option></select></div>
            <div><label className="block text-sm text-zinc-400 mb-1">URL / Link File</label><input type="text" value={matUrl} onChange={e => setMatUrl(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" /></div>
          </div>
          <button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 rounded-xl hover:bg-[#F3E5AB]">Upload Materi</button>
        </form>
      </Modal>

      <Modal isOpen={showMentorModal} onClose={() => setShowMentorModal(false)} title={editingMentorId ? "Edit Profil Mentor" : "Tambah Mentor Baru"}>
        <form onSubmit={handleMentorSubmit} className="space-y-4">
          <div><label className="block text-sm text-zinc-400 mb-1">Nama Mentor</label><input type="text" value={mentorForm.name} onChange={e => setMentorForm({...mentorForm, name: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">No. WhatsApp</label><input type="text" value={mentorForm.wa} onChange={e => setMentorForm({...mentorForm, wa: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" placeholder="Contoh: 08123456..." /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Job / Spesialisasi</label><input type="text" value={mentorForm.role} onChange={e => setMentorForm({...mentorForm, role: e.target.value})} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" placeholder="Contoh: Senior UI/UX" /></div>
          <button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#2a0b0d] font-bold py-3 rounded-xl hover:bg-[#F3E5AB]">Simpan Data</button>
        </form>
      </Modal>

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#050101] border-r border-[#3a1013] flex flex-col transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 flex items-center px-6 border-b border-[#3a1013]"><span className="text-[#D4AF37] font-bold text-lg flex items-center gap-2"><Shield className="w-5 h-5" /> ADMIN PANEL</span></div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <button onClick={() => {setActiveTab('metrik'); setIsAddingSiswa(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'metrik' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a]'}`}><BarChart3 className="w-5 h-5" /> Metrik Bisnis</button>
          <button onClick={() => {setActiveTab('siswa'); setIsAddingSiswa(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'siswa' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a]'}`}><Users className="w-5 h-5" /> Database Siswa</button>
          <button onClick={() => {setActiveTab('mentor'); setIsAddingSiswa(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'mentor' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a]'}`}><Star className="w-5 h-5" /> Kelola Mentor</button>
          <button onClick={() => {setActiveTab('materi'); setIsAddingSiswa(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'materi' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-400 hover:bg-[#1a080a]'}`}><BookOpen className="w-5 h-5" /> Kelola Materi</button>
        </div>
        <div className="p-4 border-t border-[#3a1013]"><button onClick={onLogout} className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-red-900/50 text-red-400 rounded-lg hover:bg-red-900/20"><LogOut className="w-4 h-4" /> Keluar</button></div>
      </aside>

      <main className="flex-1 flex flex-col h-full bg-[#0a0303] overflow-y-auto relative">
        <header className="h-20 flex items-center justify-between px-8 border-b border-[#3a1013] sticky top-0 bg-[#0a0303]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-4"><button className="lg:hidden text-[#D4AF37]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu className="w-6 h-6" /></button><h1 className="text-2xl font-bold text-white capitalize">{activeTab === 'siswa' && isAddingSiswa ? 'Registrasi Siswa Baru' : activeTab.replace('-', ' ')}</h1></div>
          {activeTab === 'materi' && <button onClick={() => setShowModuleModal(true)} className="bg-[#1a080a] border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#3a1013]"><Plus className="w-4 h-4" /> Tambah Materi</button>}
          {activeTab === 'mentor' && <button onClick={() => handleOpenMentorModal()} className="bg-[#1a080a] border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#3a1013]"><Plus className="w-4 h-4" /> Tambah Mentor</button>}
          {activeTab === 'siswa' && !isAddingSiswa && <button onClick={() => setIsAddingSiswa(true)} className="bg-[#1a080a] border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#3a1013]"><Plus className="w-4 h-4" /> Registrasi Siswa</button>}
          {activeTab === 'metrik' && <button onClick={() => setShowCashflowModal(true)} className="bg-[#D4AF37] text-[#2a0b0d] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#F3E5AB]"><Plus className="w-4 h-4" /> Input Transaksi</button>}
        </header>

        <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">
          {activeTab === 'metrik' && (
             <div className="space-y-8 animate-in fade-in duration-500" id="report-container">
               <div className="grid md:grid-cols-3 gap-6">
                 <div className="bg-gradient-to-br from-[#1a080a] to-[#0a0303] p-6 rounded-3xl border border-[#3a1013] shadow-xl relative overflow-hidden">
                   <div className="absolute top-4 right-4 w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center"><ArrowDownRight className="w-6 h-6 text-green-400" /></div>
                   <h3 className="text-zinc-400 font-medium mb-2 text-sm">Total Income (Kotor)</h3>
                   <div className="text-3xl font-bold text-white mb-2">Rp {totalIncome.toLocaleString('id-ID')}</div>
                 </div>
                 
                 <div className="bg-gradient-to-br from-[#1a080a] to-[#0a0303] p-6 rounded-3xl border border-[#3a1013] shadow-xl relative overflow-hidden">
                   <div className="absolute top-4 right-4 w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center"><ArrowUpRight className="w-6 h-6 text-red-400" /></div>
                   <h3 className="text-zinc-400 font-medium mb-2 text-sm">Total Outcome (Biaya)</h3>
                   <div className="text-3xl font-bold text-white mb-2">Rp {totalOutcome.toLocaleString('id-ID')}</div>
                 </div>

                 <div className={`bg-gradient-to-br from-[#611A1D] to-[#1a080a] p-6 rounded-3xl border ${netProfit >= 0 ? 'border-[#D4AF37]/50' : 'border-red-500/50'} shadow-xl relative overflow-hidden`}>
                   <h3 className="text-[#D4AF37] font-medium mb-2 text-sm">Net Profit (Bersih)</h3>
                   <div className="text-3xl font-bold text-white mb-2">Rp {netProfit.toLocaleString('id-ID')}</div>
                   <div className="text-xs text-zinc-300 mt-2">Margin: {totalIncome ? Math.round((netProfit/totalIncome)*100) : 0}%</div>
                 </div>
               </div>

               <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-6 border-b border-[#3a1013] bg-[#0a0303] flex justify-between items-center">
                     <h3 className="text-xl font-bold text-white flex items-center gap-2"><Wallet className="w-5 h-5 text-[#D4AF37]"/> Riwayat Arus Kas</h3>
                     <button onClick={downloadReport} className="text-sm font-semibold bg-[#611A1D]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all">Download Laporan (JPG)</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                      <thead className="bg-[#0a0303] text-zinc-500 text-xs uppercase tracking-wider">
                        <tr><th className="px-6 py-4">Tanggal / Waktu</th><th className="px-6 py-4">Keterangan Transaksi</th><th className="px-6 py-4">Kategori</th><th className="px-6 py-4 text-right">Nominal (Rp)</th></tr>
                      </thead>
                      <tbody className="divide-y divide-[#3a1013] text-sm">
                        {cashflows.map(cf => {
                          const isIncome = cf.category === 'Income';
                          return (
                            <tr key={cf.id} className="hover:bg-[#140506]">
                              <td className="px-6 py-4 text-zinc-400">{new Date(cf.date).toLocaleString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'})}</td>
                              <td className="px-6 py-4 text-white font-medium">{cf.description}</td>
                              <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs border ${isIncome ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 'bg-[#611A1D]/30 text-red-400 border-[#611A1D]'}`}>{cf.category}</span></td>
                              <td className={`px-6 py-4 text-right font-bold ${isIncome ? 'text-green-400' : 'text-red-400'}`}>{isIncome ? '+' : '-'} {cf.amount.toLocaleString('id-ID')}</td>
                            </tr>
                          )
                        })}
                        {cashflows.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-zinc-500">Belum ada riwayat transaksi.</td></tr>}
                      </tbody>
                    </table>
                  </div>
               </div>
             </div>
          )}
          {activeTab === 'siswa' && (
            <div className="animate-in fade-in duration-500">
              {isAddingSiswa ? (
                <form onSubmit={handleRegisterSubmit} className="bg-[#1a080a] border border-[#3a1013] rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-[#3a1013] pb-4">Buat Kredensial Siswa Baru</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-sm text-zinc-400 mb-2">Nama</label><input type="text" value={regName} onChange={e=>setRegName(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" /></div>
                    <div><label className="block text-sm text-zinc-400 mb-2">Email</label><input type="email" value={regEmail} onChange={e=>setRegEmail(e.target.value)} required className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none" /></div>
                    <div><label className="block text-sm text-zinc-400 mb-2">Paket</label><select value={regPkg} onChange={e=>setRegPkg(e.target.value)} className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"><option value="Starter">Starter</option><option value="Bootcamp Intensive">Bootcamp Intensive</option><option value="1-on-1 Mentoring">1-on-1 Mentoring</option></select></div>
                    <div><label className="block text-sm text-zinc-400 mb-2">Mentor</label><select value={regMentor} onChange={e=>setRegMentor(e.target.value)} disabled={regPkg==='Starter'} className="w-full bg-[#0a0303] border border-[#3a1013] rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"><option value="">-- Pilih --</option>{mentors.filter(m=>m.status==='Aktif').map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
                  </div>
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[#3a1013]"><button type="button" onClick={() => setIsAddingSiswa(false)} className="px-6 py-2.5 text-zinc-400 hover:text-white font-medium">Batal</button><button type="submit" className="bg-[#D4AF37] text-[#2a0b0d] font-bold px-8 py-2.5 rounded-xl hover:bg-[#F3E5AB]">Simpan</button></div>
                </form>
              ) : (
                <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto"><table className="w-full text-left whitespace-nowrap"><thead className="bg-[#0a0303] text-zinc-400 text-sm uppercase"><tr><th className="px-6 py-4">Nama/Email</th><th className="px-6 py-4">Paket & Mentor</th><th className="px-6 py-4">Status</th></tr></thead><tbody className="divide-y divide-[#3a1013]">
                    {students.map(s => (
                      <tr key={s.id} className="hover:bg-[#140506]"><td className="px-6 py-4"><div className="font-bold text-white">{s.name}</div><div className="text-xs text-zinc-500">{s.email}</div></td><td className="px-6 py-4"><span className="bg-[#3a1013] text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold">{s.pkg}</span>{s.mentorId && <div className="text-[10px] text-zinc-400 mt-1">Mentor: {mentors.find(m=>m.id===s.mentorId)?.name}</div>}</td><td className="px-6 py-4"><select value={s.status} onChange={(e) => handleStatusChange(s.id, e.target.value)} className="text-xs font-bold px-3 py-1.5 rounded outline-none bg-transparent text-zinc-300 border border-zinc-700"><option value="Aktif">Aktif</option><option value="Pending Payment">Pending Payment</option></select></td></tr>
                    ))}
                  </tbody></table></div>
                </div>
              )}
            </div>
          )}
          {activeTab === 'mentor' && (
             <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl overflow-hidden animate-in fade-in duration-500 shadow-xl">
                <div className="overflow-x-auto"><table className="w-full text-left whitespace-nowrap"><thead className="bg-[#0a0303] text-zinc-400 text-sm uppercase"><tr><th className="px-6 py-4">Profil Mentor</th><th className="px-6 py-4">Beban Siswa</th><th className="px-6 py-4 text-right">Manajemen</th></tr></thead><tbody className="divide-y divide-[#3a1013]">
                  {mentors.map(m => (
                    <tr key={m.id} className={`transition-colors ${m.status === 'Nonaktif' ? 'opacity-50 bg-[#050101]' : 'hover:bg-[#140506]'}`}><td className="px-6 py-4"><div className="font-bold text-white">{m.name}</div><div className="text-xs text-[#D4AF37]">{m.role} {m.wa && `• WA: ${m.wa}`}</div></td><td className="px-6 py-4 font-bold text-white">{students.filter(s => s.mentorId === m.id).length} <span className="text-zinc-500 text-xs font-normal">Siswa</span></td><td className="px-6 py-4 flex justify-end gap-2"><button onClick={() => handleOpenMentorModal(m)} className="text-xs font-semibold bg-[#611A1D]/20 text-blue-400 border border-blue-900/30 px-3 py-2 rounded-lg hover:bg-blue-900/40 flex items-center gap-1"><Edit2 className="w-3 h-3"/> Edit</button><button disabled={m.status === 'Nonaktif'} onClick={() => { setSelectedMentor(m); setShowAssignModal(true); }} className="text-xs font-semibold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-2 rounded-lg hover:bg-[#D4AF37]/20 flex items-center gap-1 disabled:opacity-50"><Users className="w-3 h-3"/> Assign Siswa</button><button onClick={() => handleToggleMentorStatus(m.id)} className={`text-xs font-semibold px-3 py-2 rounded-lg border ${m.status==='Aktif' ? 'bg-[#611A1D]/20 text-red-400 border-red-900/30' : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>{m.status==='Aktif' ? 'Nonaktifkan' : 'Aktifkan'}</button></td></tr>
                  ))}
                </tbody></table></div>
             </div>
          )}
          {activeTab === 'materi' && (
             <div className="bg-[#1a080a] border border-[#3a1013] rounded-2xl p-8 text-center text-zinc-400">Gunakan tombol "Tambah Materi" di atas untuk menambah modul ke database.</div>
          )}
        </div>
      </main>
    </div>
  );
}