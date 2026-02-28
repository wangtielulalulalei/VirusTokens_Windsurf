const virusImage = "/images/virus_logo.png";
const virusLogo = "/images/virus_logo.png"
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Mechanisms } from './components/Mechanisms';
import { Footer } from './components/Footer';
import { FloatingVirusParticles } from './components/VirusDecorations';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-surface-body via-surface-alt to-surface-body text-content-primary relative overflow-hidden">
        {/* Background decorations */}
        <FloatingVirusParticles />

        <Header />
        <Hero virusImage={virusImage} />
        <Stats />
        <Features />
        <Mechanisms />
        <Footer />
      </div>
    </LanguageProvider>
  );
}