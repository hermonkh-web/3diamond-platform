import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// ==========================================
// NEXT.JS 14 SEO METADATA (Untuk Setup di VS Code -> layout.tsx / page.tsx)
// ==========================================
export const metadata = {
  title: '3Diamond Institute | Bangun Skill Art & Tech, Cetak Income',
  description: 'Program belajar terarah untuk pemula. Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi.',
  keywords: 'kursus ui ux, bootcamp web developer, belajar desain grafis, figma tutorial, cara cari klien freelance, 3diamond institute, solusilokal',
  openGraph: {
    title: '3Diamond Institute | Bangun Skill Art & Tech, Cetak Income',
    description: 'Program belajar terarah untuk pemula. Ubah passion di bidang Art, Design, dan Tech menjadi skill bernilai tinggi.',
    url: 'https://3diamond.solusilokal.id/',
    siteName: '3Diamond Institute',
    images: [
      {
        url: 'https://3diamond.solusilokal.id/og-image.jpg', // Ganti dengan URL OG Image asli Anda saat deploy
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
    images: ['https://3diamond.solusilokal.id/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico', // Tempatkan file favicon.ico di folder public/
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#0a0303',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
