
import { useEffect, useState } from 'react';
import { Code, Blocks, FileCode, Monitor, Github, Gitlab, Database } from 'lucide-react';

interface Logo {
  id: number;
  Icon: any;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  label: string;
}

const FlyingLogos = () => {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    // Get window dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Create initial logos with better distribution
    const totalLogos = 7;
    const initialLogos = [
      { Icon: Code, label: 'JavaScript' },
      { Icon: FileCode, label: 'React' },
      { Icon: Monitor, label: 'HTML/CSS' },
      { Icon: Github, label: 'Git' },
      { Icon: Database, label: 'SQL' },
      { Icon: Blocks, label: 'Node.js' },
      { Icon: Gitlab, label: 'GraphQL' },
    ].map((item, index) => {
      // Calculate position to ensure better distribution across the screen
      // Divide the screen into sections and place logos more evenly
      const sectionWidth = window.innerWidth / Math.ceil(totalLogos / 2);
      const sectionHeight = window.innerHeight / Math.ceil(totalLogos / 2);
      
      const sectionX = index % Math.ceil(totalLogos / 2);
      const sectionY = Math.floor(index / Math.ceil(totalLogos / 2));
      
      // Add some randomness within each section
      const x = (sectionX * sectionWidth) + (Math.random() * sectionWidth * 0.8);
      const y = (sectionY * sectionHeight) + (Math.random() * sectionHeight * 0.8);
      
      return {
        id: index,
        Icon: item.Icon,
        x,
        y,
        size: 32 + Math.random() * 48,
        speed: 0.05 + Math.random() * 0.1, // Even slower speed (0.05-0.15)
        opacity: 0.6 + Math.random() * 0.3, // Slightly higher opacity for better visibility
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.2, // Even slower rotation
        label: item.label
      };
    });
    
    setLogos(initialLogos);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  useEffect(() => {
    if (logos.length === 0) return;
    
    // Animation loop
    const animationFrame = requestAnimationFrame(function animate() {
      setLogos(prevLogos => prevLogos.map(logo => {
        // Move logo
        let x = logo.x + logo.speed;
        // Reset position if logo goes off-screen
        if (x > dimensions.width + 100) {
          x = -100;
        }
        
        // Rotate logo
        const rotation = (logo.rotation + logo.rotationSpeed) % 360;
        
        return {
          ...logo,
          x,
          rotation
        };
      }));
      
      requestAnimationFrame(animate);
    });
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [logos, dimensions]);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {logos.map(logo => (
        <div
          key={logo.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
          style={{
            left: `${logo.x}px`,
            top: `${logo.y}px`,
            opacity: logo.opacity,
            transform: `translate(-50%, -50%) rotate(${logo.rotation}deg)`,
          }}
        >
          <div className="flex flex-col items-center">
            <logo.Icon size={logo.size} className="text-gray-400" />
            <span className="text-sm text-gray-400 mt-1 opacity-80 font-medium">{logo.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlyingLogos;
