import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  ExternalLink
} from "lucide-react";
import { SpotifyTrack } from "@/lib/spotify";

interface SpotifyPlayerProps {
  track: SpotifyTrack | null;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function SpotifyPlayer({ track, onNext, onPrevious }: SpotifyPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (track?.preview_url && audioRef.current) {
      audioRef.current.src = track.preview_url;
      audioRef.current.load();
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onNext) onNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [onNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || !track?.preview_url) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    const newTime = (value[0] / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const openInSpotify = () => {
    if (track?.external_urls?.spotify) {
      window.open(track.external_urls.spotify, '_blank');
    }
  };

  if (!track) {
    return (
      <Card className="bg-gradient-elegant border-primary/20">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Select a track to start playing
          </div>
        </CardContent>
      </Card>
    );
  }

  const albumImage = track.album.images[0]?.url;
  const hasPreview = track.preview_url;

  return (
    <Card className="bg-gradient-elegant border-primary/20">
      <CardContent className="p-6">
        <audio ref={audioRef} preload="metadata" />
        
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Album Art */}
          <div className="flex-shrink-0">
            {albumImage ? (
              <img
                src={albumImage}
                alt={track.album.name}
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg object-cover shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg bg-muted flex items-center justify-center">
                <Play className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
              <h3 className="font-semibold text-lg truncate">{track.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={openInSpotify}
                className="p-1 h-auto"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground truncate">
              {track.artists.map(artist => artist.name).join(', ')}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {track.album.name}
            </p>
            
            {!hasPreview && (
              <p className="text-xs text-orange-500 mt-1">
                Preview not available - Open in Spotify to play full track
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex-shrink-0 space-y-4">
            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onPrevious}
                disabled={!onPrevious}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="premium"
                size="lg"
                onClick={togglePlay}
                disabled={!hasPreview}
                className="w-12 h-12 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onNext}
                disabled={!onNext}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress */}
            {hasPreview && (
              <div className="space-y-2 min-w-[200px]">
                <Slider
                  value={[duration ? (currentTime / duration) * 100 : 0]}
                  onValueChange={handleSeek}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}