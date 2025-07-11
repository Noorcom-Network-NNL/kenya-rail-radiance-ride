import { useState } from "react";
import { EntertainmentNav } from "@/components/EntertainmentNav";
import { MusicSection } from "@/components/MusicSection";
import { VideoSection } from "@/components/VideoSection";
import heroImage from "@/assets/hero-entertainment.jpg";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'music' | 'video'>('music');

  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* Hero Section */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Kenya Railways Premium Entertainment" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-railway-navy/80 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/be5f9c9f-2c95-4a32-a704-95ea6db9c071.png" 
              alt="Kenya Railways Logo" 
              className="h-16 lg:h-20 w-auto animate-fade-in"
            />
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground animate-fade-in">
              Kenya Railways
            </h1>
          </div>
            <p className="text-xl lg:text-2xl text-primary-glow mb-2 animate-fade-in">
              Premium Onboard Entertainment
            </p>
            <p className="text-lg text-primary-foreground/80 animate-fade-in">
              Your journey enhanced with world-class entertainment
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Entertainment System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enjoy our extensive collection of music, movies, TV shows, and documentaries 
            during your premium class journey. All content carefully curated for your delight.
          </p>
        </div>

        <EntertainmentNav 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />

        <div className="animate-fade-in">
          {activeSection === 'music' ? <MusicSection /> : <VideoSection />}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-railway-navy/90 text-primary-foreground py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/be5f9c9f-2c95-4a32-a704-95ea6db9c071.png" 
              alt="Kenya Railways Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">Kenya Railways Corporation</span>
          </div>
          <p className="text-primary-glow/80">
            Premium Class Entertainment System • 512GB Storage • Updated Bi-monthly
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
