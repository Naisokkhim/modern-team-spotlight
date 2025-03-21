
import { useEffect, useState } from 'react';
import { Code, Blocks, FileCode, Monitor, Github, Gitlab, Database } from 'lucide-react';

interface Logo {
  id: number;
  Icon: any;
  x: number;
  y: number;
  size: number;
  speedY: number; // Changed from speed to speedY for vertical movement
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  label: string;
  color: string;
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
    
    // Define vibrant colors for logos
    const colors = [
      "#FF6B6B", // Coral red
      "#4ECDC4", // Turquoise 
      "#FFD166", // Yellow
      "#6A0572", // Purple
      "#1A936F", // Green
      "#3D5A80", // Navy blue
      "#F72585", // Pink
    ];
    
    // Create logos with better distribution across the entire screen
    const totalLogos = 10; // Increasing number of logos for better coverage
    const initialLogos = [
      { Icon: Code, label: 'JavaScript' },
      { Icon: FileCode, label: 'React' },
      { Icon: Monitor, label: 'HTML/CSS' },
      { Icon: Github, label: 'Git' },
      { Icon: Database, label: 'SQL' },
      { Icon: Blocks, label: 'Node.js' },
      { Icon: Gitlab, label: 'GraphQL' },
      { Icon: Code, label: 'TypeScript' },
      { Icon: FileCode, label: 'Vue' },
      { Icon: Blocks, label: 'Angular' },
    ].map((item, index) => {
      // Distribute logos more evenly across the entire screen
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.5; // Start logos in top half of screen
      
      return {
        id: index,
        Icon: item.Icon,
        x,
        y,
        size: 40 + Math.random() * 60, // Slightly larger
        speedY: 0.003 + Math.random() * 0.008, // Extremely slow vertical speed
        opacity: 0.7 + Math.random() * 0.3, // Higher opacity for better visibility
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.05, // Even slower rotation
        label: item.label,
        color: colors[index % colors.length] // Assign a vibrant color
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
        // Move logo vertically (top to bottom)
        let y = logo.y + logo.speedY;
        // Reset position if logo goes off-screen
        if (y > dimensions.height + 100) {
          y = -100;
        }
        
        // Rotate logo
        const rotation = (logo.rotation + logo.rotationSpeed) % 360;
        
        return {
          ...logo,
          y,
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]"> {/* Added z-[-1] to position behind content */}
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
            <logo.Icon size={logo.size} style={{ color: logo.color }} />
            <span className="text-base mt-2 font-medium" style={{ color: logo.color }}>{logo.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlyingLogos;
