
import { useEffect, useState } from 'react';
import { Code, Blocks, FileCode, Monitor, Github, Gitlab, Database } from 'lucide-react';

interface Logo {
  id: number;
  Icon: any;
  x: number;
  y: number;
  size: number;
  speedY: number;
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
    
    // Define more vibrant colors for better visibility
    const colors = [
      "#FF416C", // Bright pink
      "#00DBDE", // Bright cyan
      "#FFD700", // Gold
      "#8A2BE2", // Violet
      "#32CD32", // Lime green
      "#FF8C00", // Dark orange
      "#FF0080", // Hot pink
      "#00BFFF", // Deep sky blue
      "#7FFF00", // Chartreuse
      "#FF1493", // Deep pink
    ];
    
    // Create logos with improved visibility and distribution
    const totalLogos = 12; // More logos for better coverage
    const iconSets = [
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
      { Icon: Database, label: 'MongoDB' },
      { Icon: Monitor, label: 'UI/UX' },
    ];
    
    const initialLogos = iconSets.map((item, index) => {
      // Distribute logos evenly across the screen width
      const columns = 4;
      const column = index % columns;
      
      // Calculate base position for even width distribution
      const xBase = (column / columns) * window.innerWidth;
      // Start all logos at or slightly above the top of the screen
      const y = Math.random() * -300; // Start above viewport for staggered entry
      
      // Add randomness within the grid cell for x position
      const x = xBase + (Math.random() * (window.innerWidth / columns / 2));
      
      return {
        id: index,
        Icon: item.Icon,
        x,
        y,
        size: 50 + Math.random() * 70, // Larger size for better visibility
        speedY: 0.00008 + Math.random() * 0.00016, // Extremely slow vertical speed (reduced dramatically)
        opacity: 0.9, // Higher opacity for better visibility
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.005, // Very slow rotation
        label: item.label,
        color: colors[index % colors.length] // Assign vibrant colors
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
        // Move logo vertically (top to bottom) extremely slowly
        let y = logo.y + logo.speedY;
        
        // Reset position if logo goes off-screen
        if (y > dimensions.height + 100) {
          y = -100;
        }
        
        // Rotate logo very slowly
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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
            <logo.Icon size={logo.size} strokeWidth={1.5} style={{ color: logo.color }} />
            <span className="text-lg font-semibold mt-2" style={{ color: logo.color }}>{logo.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlyingLogos;
