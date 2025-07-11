import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Heart,
  ExternalLink
} from "lucide-react";
import { SpotifyTrack } from "@/lib/spotify";

interface MusicPlayerProps {
  currentTrack: SpotifyTrack | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function MusicPlayer({ 
  currentTrack, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious 
}: MusicPlayerProps) {
  const [volume, setVolume] = useState([0.7]);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && currentTrack?.preview_url) {
      audioRef.current.src = currentTrack.preview_url;
      audioRef.current.volume = volume[0];
      
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0];
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress([audio.currentTime]);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      onNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [onNext]);

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-primary/20 rounded-none">
      <CardContent className="p-4">
        <audio ref={audioRef} />
        
        <div className="flex items-center gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {currentTrack.album.images[0] && (
              <img
                src={currentTrack.album.images[0].url}
                alt={currentTrack.album.name}
                className="w-12 h-12 rounded object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-medium truncate">{currentTrack.name}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {currentTrack.artists.map(artist => artist.name).join(', ')}
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onPrevious}>
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button variant="premium" size="sm" onClick={onPlayPause}>
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <Button variant="ghost" size="sm" onClick={onNext}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
              <span>{formatTime(progress[0] || 0)}</span>
              <Slider
                value={progress}
                onValueChange={handleProgressChange}
                max={duration || 100}
                step={1}
                className="flex-1"
              />
              <span>{formatTime(duration || 0)}</span>
            </div>
          </div>

          {/* Volume & External Link */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={1}
              step={0.1}
              className="w-20"
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`https://open.spotify.com/track/${currentTrack.id}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}