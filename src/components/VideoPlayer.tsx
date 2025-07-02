import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  SkipBack, 
  SkipForward,
  Settings
} from "lucide-react";

interface VideoPlayerProps {
  title: string;
  duration: string;
  genre: string;
  description?: string;
  onBack: () => void;
}

export function VideoPlayer({ title, duration, genre, description, onBack }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(7200);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume[0] / 100;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hours > 0 ? `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` 
                     : `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, totalDuration));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col" onMouseMove={handleMouseMove}>
      {/* Video Area */}
      <div className="flex-1 bg-black flex items-center justify-center relative">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          onTimeUpdate={(e) => setCurrentTime(Math.floor(e.currentTarget.currentTime))}
          onLoadedMetadata={(e) => setTotalDuration(Math.floor(e.currentTarget.duration))}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Back Button - Always Visible */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute top-2 left-2 md:top-4 md:left-4 text-white hover:bg-white/20 text-xs md:text-sm z-10"
        >
          <span className="hidden sm:inline">← Back to Library</span>
          <span className="sm:hidden">← Back</span>
        </Button>

        {/* Controls Overlay */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 md:p-6 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-3 md:mb-4">
            <Slider
              value={[currentTime]}
              max={totalDuration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-white/80 text-xs md:text-sm mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            {/* Main Controls */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSkip(-10)}
                className="text-white hover:bg-white/20 w-8 h-8 md:w-10 md:h-10"
              >
                <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:bg-white/20 w-10 h-10 md:w-12 md:h-12"
              >
                {isPlaying ? <Pause className="w-5 h-5 md:w-6 md:h-6" /> : <Play className="w-5 h-5 md:w-6 md:h-6" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSkip(10)}
                className="text-white hover:bg-white/20 w-8 h-8 md:w-10 md:h-10"
              >
                <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
              </Button>

              {/* Volume Controls - Hidden on mobile, shown on larger screens */}
              <div className="hidden md:flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Slider
                  value={isMuted ? [0] : volume}
                  max={100}
                  step={1}
                  onValueChange={setVolume}
                  className="w-20 lg:w-24"
                />
              </div>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center gap-2">
              {/* Mobile Volume Control */}
              <div className="flex md:hidden items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20 w-8 h-8"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Slider
                  value={isMuted ? [0] : volume}
                  max={100}
                  step={1}
                  onValueChange={setVolume}
                  className="w-16"
                />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 w-8 h-8 md:w-10 md:h-10"
              >
                <Settings className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 w-8 h-8 md:w-10 md:h-10"
              >
                <Maximize className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="bg-railway-navy text-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg md:text-2xl font-bold mb-2">{title}</h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-primary-glow mb-2 text-sm md:text-base">
            <span>{duration}</span>
            <span>•</span>
            <span>{genre}</span>
            <span>•</span>
            <span>HD Quality</span>
          </div>
          {description && (
            <p className="text-white/80 max-w-2xl text-sm md:text-base leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}