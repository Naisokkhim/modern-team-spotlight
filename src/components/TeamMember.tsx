
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface TeamMemberProps {
  id: number;
  name: string;
  role: string;
  imageSrc: string;
  description: string;
  delay: number;
}

const TeamMember = ({ id, name, role, imageSrc, description, delay }: TeamMemberProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "team-card group",
        "opacity-0 animate-fade-in",
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        <img 
          src={imageSrc} 
          alt={name} 
          className="team-image" 
          loading="lazy"
        />
      </div>
      <div className="relative p-6 z-10">
        <div className="info-content">
          <div className="inline-block px-3 py-1 mb-3 text-xs tracking-wider font-medium bg-black/5 rounded-full">
            {role}
          </div>
          <h3 className="text-xl font-display font-medium mb-2">{name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
          <div className={cn(
            "flex items-center text-sm font-medium transition-all duration-300",
            isHovered ? "text-black" : "text-gray-400"
          )}>
            <span>View profile</span>
            <ChevronRight className={cn(
              "h-4 w-4 ml-1 transition-transform duration-300", 
              isHovered ? "translate-x-1" : ""
            )} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
