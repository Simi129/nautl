import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}