
import { useEffect } from 'react';
import Header from '../components/Header';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll initialization
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <TeamSection />
        {/* Additional sections can be added here */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
