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
  videoUrl?: string;
  onBack: () => void;
}

export function VideoPlayer({ title, duration, genre, description, videoUrl, onBack }: VideoPlayerProps) {
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
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Video Container */}
      <div className="relative flex-1 bg-black overflow-hidden" onMouseMove={handleMouseMove}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain"
          src={videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
          onTimeUpdate={(e) => setCurrentTime(Math.floor(e.currentTarget.currentTime))}
          onLoadedMetadata={(e) => setTotalDuration(Math.floor(e.currentTarget.duration))}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Back Button - Always Visible */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-6 lg:left-6 text-white hover:bg-white/20 z-20 text-xs sm:text-sm backdrop-blur-sm bg-black/30"
        >
          <span className="hidden sm:inline">← Back to Library</span>
          <span className="sm:hidden">← Back</span>
        </Button>

        {/* Central Play Button when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20"
            >
              <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ml-1" />
            </Button>
          </div>
        )}

        {/* Controls Overlay */}
        <div 
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 z-15 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Bar */}
          <div className="px-3 sm:px-4 lg:px-6 pt-8 sm:pt-12 lg:pt-16 pb-3 sm:pb-4 lg:pb-6">
            <Slider
              value={[currentTime]}
              max={totalDuration}
              step={1}
              onValueChange={handleSeek}
              className="w-full mb-2 sm:mb-3"
            />
            <div className="flex justify-between text-white/90 text-xs sm:text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

          {/* Control Buttons Container */}
          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
            {/* Mobile Layout (< 640px) */}
            <div className="sm:hidden space-y-3">
              {/* Main Controls Row */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSkip(-10)}
                  className="text-white hover:bg-white/20 w-10 h-10"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20 w-12 h-12"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSkip(10)}
                  className="text-white hover:bg-white/20 w-10 h-10"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              {/* Secondary Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
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
                    className="w-20"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 w-8 h-8"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 w-8 h-8"
                  >
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tablet/Desktop Layout (>= 640px) */}
            <div className="hidden sm:flex items-center justify-between">
              {/* Left Side Controls */}
              <div className="flex items-center gap-2 lg:gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSkip(-10)}
                  className="text-white hover:bg-white/20 w-8 h-8 lg:w-10 lg:h-10"
                >
                  <SkipBack className="w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20 w-10 h-10 lg:w-12 lg:h-12"
                >
                  {isPlaying ? <Pause className="w-5 h-5 lg:w-6 lg:h-6" /> : <Play className="w-5 h-5 lg:w-6 lg:h-6" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSkip(10)}
                  className="text-white hover:bg-white/20 w-8 h-8 lg:w-10 lg:h-10"
                >
                  <SkipForward className="w-4 h-4 lg:w-5 lg:h-5" />
                </Button>

                {/* Volume Controls */}
                <div className="flex items-center gap-2 ml-2 lg:ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20 w-8 h-8 lg:w-9 lg:h-9"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 lg:w-5 lg:h-5" /> : <Volume2 className="w-4 h-4 lg:w-5 lg:h-5" />}
                  </Button>
                  <Slider
                    value={isMuted ? [0] : volume}
                    max={100}
                    step={1}
                    onValueChange={setVolume}
                    className="w-16 sm:w-20 lg:w-24 xl:w-28"
                  />
                </div>
              </div>

              {/* Right Side Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 w-8 h-8 lg:w-9 lg:h-9"
                >
                  <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 w-8 h-8 lg:w-9 lg:h-9"
                >
                  <Maximize className="w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info Panel - Responsive */}
      <div className="bg-railway-navy text-white p-3 sm:p-4 lg:p-6 max-h-32 sm:max-h-40 lg:max-h-48 overflow-y-auto">
        <div className="max-w-none sm:max-w-7xl mx-auto">
          <h1 className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 line-clamp-2">{title}</h1>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-4 text-primary-glow mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
            <span>{duration}</span>
            <span>•</span>
            <span>{genre}</span>
            <span>•</span>
            <span>HD Quality</span>
          </div>
          {description && (
            <p className="text-white/80 max-w-full sm:max-w-2xl lg:max-w-4xl text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}