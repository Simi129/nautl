import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LiveChatWidget from '@/components/LiveChatWidget';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nexus | Modern SaaS Platform',
  description: 'Orchestrate your creative workflow with Nexus',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-neutral-300 antialiased selection:bg-neutral-800 selection:text-white overflow-x-hidden`}>
        {children}
        <LiveChatWidget />
      </body>
    </html>
  );
}