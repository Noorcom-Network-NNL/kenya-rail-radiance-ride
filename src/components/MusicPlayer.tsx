import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, HeartOff } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { addToListeningHistory, addToFavorites, removeFromFavorites } from '@/lib/firebaseService';
import { useToast } from '@/hooks/use-toast';
import type { JamendoTrack } from "@/lib/jamendo";

interface MusicPlayerProps {
  track: JamendoTrack | null;
  playlist: JamendoTrack[];
  onTrackChange?: (track: JamendoTrack) => void;
}

export function MusicPlayer({ track, playlist, onTrackChange }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Track listening history when track finishes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track || !user) return;

    const handleEnded = async () => {
      await addToListeningHistory(user.uid, track.id, track.name, track.artist_name, track.duration);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [track, user]);

  const handleFavoriteToggle = async () => {
    if (!user || !track) return;

    try {
      if (isFavorite) {
        await removeFromFavorites(user.uid, track.id);
        toast({ title: "Removed from favorites" });
      } else {
        await addToFavorites(user.uid, track.id);
        toast({ title: "Added to favorites" });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast({
        title: "Error updating favorites",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
    };
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleNext = () => {
    if (!track || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(t => t.id === track.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    onTrackChange?.(playlist[nextIndex]);
  };

  const handlePrevious = () => {
    if (!track || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(t => t.id === track.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    onTrackChange?.(playlist[prevIndex]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!track) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Select a track to start playing</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardContent className="p-6">
        <audio
          ref={audioRef}
          src={track.audio}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={track.image} 
            alt={track.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{track.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{track.artist_name}</p>
            <p className="text-xs text-muted-foreground truncate">{track.album_name}</p>
          </div>
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? <Heart className="h-5 w-5 fill-current text-red-500" /> : <HeartOff className="h-5 w-5" />}
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              disabled={playlist.length <= 1}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={togglePlayPause}
              className="h-12 w-12"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={playlist.length <= 1}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleTimeChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
              className="w-20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}