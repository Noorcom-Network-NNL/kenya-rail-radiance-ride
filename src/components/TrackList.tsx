import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";
import type { JamendoTrack } from "@/lib/jamendo";

interface TrackListProps {
  tracks: JamendoTrack[];
  currentTrack?: JamendoTrack | null;
  onTrackSelect: (track: JamendoTrack) => void;
  loading?: boolean;
}

export function TrackList({ tracks, currentTrack, onTrackSelect, loading }: TrackListProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Loading tracks...</p>
        </CardContent>
      </Card>
    );
  }

  if (tracks.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No tracks found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Music Library ({tracks.length} tracks)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className={`flex items-center gap-4 p-4 border-b border-border/50 hover:bg-accent/50 transition-colors cursor-pointer ${
                currentTrack?.id === track.id ? 'bg-accent' : ''
              }`}
              onClick={() => onTrackSelect(track)}
            >
              <div className="flex-shrink-0 w-8 text-center text-sm text-muted-foreground">
                {index + 1}
              </div>
              
              <img 
                src={track.image} 
                alt={track.name}
                className="w-12 h-12 rounded object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{track.name}</h4>
                <p className="text-sm text-muted-foreground truncate">{track.artist_name}</p>
                <p className="text-xs text-muted-foreground truncate">{track.album_name}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatDuration(track.duration)}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onTrackSelect(track);
                }}
                className="flex-shrink-0"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}