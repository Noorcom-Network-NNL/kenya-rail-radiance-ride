import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Search, Loader } from "lucide-react";
import { spotifyService, SpotifyTrack, SpotifyPlaylist } from "@/lib/spotify";
import { SpotifyAuth } from "./SpotifyAuth";
import { TrackList } from "./TrackList";
import { MusicPlayer } from "./MusicPlayer";
import { useToast } from "@/hooks/use-toast";

const musicGenres = [
  { id: 'all', name: 'All Music', query: 'year:2020-2024' },
  { id: 'classical', name: 'Classical', query: 'genre:classical' },
  { id: 'popular', name: 'Popular', query: 'genre:pop' },
  { id: 'rock', name: 'Rock and Roll', query: 'genre:rock' },
  { id: 'folk', name: 'Folk Customs', query: 'genre:folk' }
];

export function MusicSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeGenre, setActiveGenre] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    setIsAuthenticated(spotifyService.isAuthenticated());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadFeaturedPlaylists();
      loadGenreTracks('all');
    }
  }, [isAuthenticated]);

  const loadFeaturedPlaylists = async () => {
    try {
      const featuredPlaylists = await spotifyService.getFeaturedPlaylists();
      setPlaylists(featuredPlaylists);
    } catch (error) {
      console.error('Error loading playlists:', error);
    }
  };

  const loadGenreTracks = async (genreId: string) => {
    setIsLoading(true);
    setActiveGenre(genreId);
    try {
      const genre = musicGenres.find(g => g.id === genreId);
      if (genre) {
        const genreTracks = await spotifyService.searchTracks(genre.query, 20);
        setTracks(genreTracks.filter(track => track.preview_url));
      }
    } catch (error) {
      toast({
        title: "Error loading tracks",
        description: "Failed to load music. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const searchTracks = await spotifyService.searchTracks(searchQuery, 20);
      setTracks(searchTracks.filter(track => track.preview_url));
      setActiveGenre('');
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Failed to search tracks. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaylistClick = async (playlist: SpotifyPlaylist) => {
    setIsLoading(true);
    try {
      const playlistTracks = await spotifyService.getPlaylistTracks(playlist.id);
      setTracks(playlistTracks.filter(track => track.preview_url));
      setActiveGenre('');
    } catch (error) {
      toast({
        title: "Error loading playlist",
        description: "Failed to load playlist tracks. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackSelect = (track: SpotifyTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextTrack = tracks[currentIndex + 1] || tracks[0];
    setCurrentTrack(nextTrack);
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const previousTrack = tracks[currentIndex - 1] || tracks[tracks.length - 1];
    setCurrentTrack(previousTrack);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <SpotifyAuth onAuthSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Search */}
      <Card className="bg-gradient-elegant border-primary/20">
        <CardContent className="p-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search for songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Genre Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {musicGenres.map((genre) => (
          <Card 
            key={genre.id} 
            className={`hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer ${
              activeGenre === genre.id 
                ? 'bg-primary/10 border-primary/30' 
                : 'bg-card/80 backdrop-blur-sm border-primary/10'
            }`}
            onClick={() => loadGenreTracks(genre.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                {genre.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant={activeGenre === genre.id ? "premium" : "outline"} 
                size="sm" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && activeGenre === genre.id ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  "Browse"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Playlists */}
      {playlists.length > 0 && (
        <Card className="bg-gradient-elegant border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Featured Playlists</CardTitle>
            <p className="text-muted-foreground">Discover curated music collections</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {playlists.map((playlist) => (
                <Button
                  key={playlist.id}
                  variant="entertainment"
                  size="sm"
                  className="h-auto py-3 px-4 text-left justify-start"
                  onClick={() => handlePlaylistClick(playlist)}
                >
                  {playlist.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Track List */}
      {tracks.length > 0 && (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl">Tracks</CardTitle>
            <p className="text-muted-foreground">{tracks.length} songs available</p>
          </CardHeader>
          <CardContent>
            <TrackList
              tracks={tracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackSelect={handleTrackSelect}
              onPlayPause={handlePlayPause}
            />
          </CardContent>
        </Card>
      )}

      {/* Music Player */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}