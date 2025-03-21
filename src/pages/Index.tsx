
import { useEffect } from 'react';
import Header from '../components/Header';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import FlyingLogos from '../components/FlyingLogos';

const Index = () => {
  useEffect(() => {
    // Smooth scroll initialization
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <FlyingLogos />
      <div className="relative z-10"> {/* Keeping content wrapper with higher z-index */}
        <Header />
        <main>
          <TeamSection />
          {/* Additional sections can be added here */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
