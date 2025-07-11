import { Music, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EntertainmentNavProps {
  activeSection: 'music' | 'video';
  onSectionChange: (section: 'music' | 'video') => void;
}

export function EntertainmentNav({ activeSection, onSectionChange }: EntertainmentNavProps) {
  return (
    <div className="flex gap-4 mb-8">
      <Button
        variant={activeSection === 'video' ? 'premium' : 'entertainment'}
        size="lg"
        onClick={() => onSectionChange('video')}
        className="flex-1"
      >
        <Video />
        Video Entertainment
      </Button>
      <Button
        variant={activeSection === 'music' ? 'premium' : 'entertainment'}
        size="lg"
        onClick={() => onSectionChange('music')}
        className="flex-1"
      >
        <Music />
        Music Library
      </Button>
    </div>
  );
}