
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
    
    // Create initial logos
    const initialLogos = [
      { Icon: Code, label: 'JavaScript' },
      { Icon: FileCode, label: 'React' },
      { Icon: Monitor, label: 'HTML/CSS' }, // Changed Browser to Monitor
      { Icon: Github, label: 'Git' },
      { Icon: Database, label: 'SQL' },
      { Icon: Blocks, label: 'Node.js' },
      { Icon: Gitlab, label: 'GraphQL' },
    ].map((item, index) => ({
      id: index,
      Icon: item.Icon,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.8,
      size: 32 + Math.random() * 48, // Increased size range from 24-60 to 32-80
      speed: 0.1 + Math.random() * 0.2, // Decreased speed from 0.2-0.6 to 0.1-0.3
      opacity: 0.5 + Math.random() * 0.4, // Increased opacity from 0.2-0.5 to 0.5-0.9
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.3, // Decreased rotation speed
      label: item.label
    }));
    
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
            <logo.Icon size={logo.size} className="text-gray-400" /> {/* Changed from text-gray-300 to text-gray-400 */}
            <span className="text-sm text-gray-400 mt-1 opacity-80 font-medium">{logo.label}</span> {/* Enhanced text visibility */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlyingLogos;
