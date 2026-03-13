import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Mechanisms } from './components/Mechanisms';
import { Footer } from './components/Footer';
import { FloatingVirusParticles } from './components/VirusDecorations';
import { Whitepaper } from './components/Whitepaper';
import { LanguageProvider } from './contexts/LanguageContext';

const virusImage = "/images/virus_logo.png";

export default function App() {
  const [whitepaperOpen, setWhitepaperOpen] = useState(false);

  // 监听Footer中白皮书按钮的点击事件
  useEffect(() => {
    const handleOpenWhitepaper = () => {
      setWhitepaperOpen(true);
    };

    window.addEventListener('openWhitepaper', handleOpenWhitepaper);
    
    return () => {
      window.removeEventListener('openWhitepaper', handleOpenWhitepaper);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-surface-body via-surface-alt to-surface-body text-content-primary relative overflow-hidden">
        <FloatingVirusParticles />
        <Header />
        <Hero
          virusImage={virusImage}
          onWhitepaperOpen={() => setWhitepaperOpen(true)}
        />
        <Stats />
        <Features />
        <Mechanisms />
        <Footer />

        {/* 白皮书抽屉 */}
        <Whitepaper
          open={whitepaperOpen}
          onClose={() => setWhitepaperOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}
