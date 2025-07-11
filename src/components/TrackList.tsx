import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";
import { SpotifyTrack } from "@/lib/spotify";

interface TrackListProps {
  tracks: SpotifyTrack[];
  currentTrack: SpotifyTrack | null;
  isPlaying: boolean;
  onTrackSelect: (track: SpotifyTrack) => void;
  onPlayPause: () => void;
}

export function TrackList({ 
  tracks, 
  currentTrack, 
  isPlaying, 
  onTrackSelect, 
  onPlayPause 
}: TrackListProps) {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isCurrentTrack = (track: SpotifyTrack) => currentTrack?.id === track.id;

  return (
    <div className="space-y-2">
      {tracks.map((track, index) => (
        <Card
          key={track.id}
          className={`transition-all duration-200 hover:shadow-elegant cursor-pointer ${
            isCurrentTrack(track) ? 'bg-primary/5 border-primary/30' : 'hover:bg-accent/5'
          }`}
          onMouseEnter={() => setHoveredTrack(track.id)}
          onMouseLeave={() => setHoveredTrack(null)}
          onClick={() => onTrackSelect(track)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <div className="flex items-center justify-center w-8">
                {hoveredTrack === track.id || isCurrentTrack(track) ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCurrentTrack(track)) {
                        onPlayPause();
                      } else {
                        onTrackSelect(track);
                      }
                    }}
                  >
                    {isCurrentTrack(track) && isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground font-mono">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* Album Art */}
              {track.album.images[0] && (
                <img
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  className="w-12 h-12 rounded object-cover"
                />
              )}

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium truncate ${
                  isCurrentTrack(track) ? 'text-primary' : ''
                }`}>
                  {track.name}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {track.artists.map(artist => artist.name).join(', ')}
                </p>
              </div>

              {/* Album Name (hidden on mobile) */}
              <div className="hidden md:block min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">
                  {track.album.name}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                
                <span className="text-sm text-muted-foreground font-mono">
                  {formatDuration(track.duration_ms)}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}