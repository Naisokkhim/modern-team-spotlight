
import { useRef, useEffect, useState } from 'react';
import TeamMember from './TeamMember';
import { useIsMobile } from '../hooks/use-mobile';

// Define the team members data
const teamMembers = [
  {
    id: 1,
    name: "Sophea",
    role: "UI/UX Designer",
    imageSrc: "./lovable-uploads/506e7f20-e7ef-4baa-b2d9-2876bec99397.png",
    description: "Creative designer with an eye for detail and user-centered approaches to solving complex problems."
  },
  {
    id: 2,
    name: "Virak",
    role: "Frontend Developer",
    imageSrc: "./lovable-uploads/16aff451-53d6-411c-a257-b123c4fed101.png",
    description: "Passionate developer who loves creating clean and efficient code to build amazing user experiences."
  },
  {
    id: 3,
    name: "Srey Pich",
    role: "Project Manager",
    imageSrc: "./lovable-uploads/e299ed61-8883-46ce-9cac-5fb02e0c2f33.png", 
    description: "Organized and detail-oriented project manager who ensures our team delivers quality work on time."
  },
  {
    id: 4,
    name: "Dara",
    role: "Backend Developer",
    imageSrc: "./lovable-uploads/fa3f123f-7dac-4786-8363-6620431b2a9f.png",
    description: "Experienced backend developer with expertise in creating scalable and secure server-side solutions."
  },
  {
    id: 5,
    name: "Sokha",
    role: "Data Analyst",
    imageSrc: "./lovable-uploads/ab0fa77d-6c60-4c10-9bff-a021f7c7dff2.png",
    description: "Analytical thinker who transforms complex data into meaningful insights to drive business decisions."
  },
  {
    id: 6,
    name: "Chanry",
    role: "Content Strategist",
    imageSrc: "./lovable-uploads/9f1335af-814e-4dfe-8621-608b40fb846d.png",
    description: "Creative writer and strategist who helps craft compelling narratives that engage and inform our audience."
  },
  {
    id: 7,
    name: "Vuthy",
    role: "DevOps Engineer",
    imageSrc: "./lovable-uploads/83a709f7-5ee1-40cb-a47b-9a695784e33e.png", 
    description: "Technical specialist focused on infrastructure, deployment automation and maintaining system reliability."
  }
];

const TeamSection = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="team-section" 
      ref={sectionRef}
      className="py-12 sm:py-20 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-16 text-center">
          <div className={`inline-block px-4 py-1.5 mb-3 text-sm font-medium bg-black/5 rounded-full opacity-0 ${isIntersecting ? 'animate-fade-in' : ''}`} style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            G3 Talent
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-display font-medium mb-4 opacity-0 ${isIntersecting ? 'animate-fade-in' : ''}`} style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Meet our exceptional team
          </h2>
          <p className={`text-gray-600 max-w-2xl mx-auto text-sm sm:text-base opacity-0 ${isIntersecting ? 'animate-fade-in' : ''}`} style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            Each member brings unique skills and perspectives to our collaborative environment, driving innovation and excellence in everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.id}
              id={member.id}
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
              description={member.description}
              delay={(index + 1) * (isMobile ? 100 : 150)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
