
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTeam = () => {
    document.getElementById('team-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
      
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="flex justify-between items-center">
          <div className={`opacity-0 ${isVisible ? 'animate-slide-down' : ''}`} style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="text-xl font-medium flex items-center space-x-2">
              <span className="w-3 h-3 bg-black rounded-full"></span>
              <span>G3</span>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['Team', 'Projects', 'About', 'Contact'].map((item, index) => (
                <li key={index} className={`opacity-0 ${isVisible ? 'animate-slide-down' : ''}`} style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: 'forwards' }}>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="relative z-20 text-center max-w-5xl px-6">
        <div className={`opacity-0 ${isVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-medium mb-6 leading-tight">
            Meet the <span className="text-gradient">G3</span> Team
          </h1>
        </div>
        
        <div className={`opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg">
            We're a diverse team of talented individuals working together to create exceptional experiences. Get to know the people behind the project.
          </p>
        </div>
        
        <div className={`opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}>
          <button 
            onClick={scrollToTeam}
            className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <span>Meet us</span>
            <ChevronDown className="ml-2 h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <ChevronDown className="h-6 w-6 text-gray-400" />
        <div className="scroll-line"></div>
      </div>
    </header>
  );
};

export default Header;
