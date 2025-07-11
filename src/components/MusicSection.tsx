import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Search, Settings, Shuffle } from "lucide-react";
import { SpotifySetup } from "./SpotifySetup";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { spotifyAPI, SpotifyTrack, SpotifyPlaylist } from "@/lib/spotify";
import { useToast } from "@/hooks/use-toast";

const musicGenres = [
  { id: 'all', name: 'All Music', count: '300+ Songs' },
  { id: 'classical', name: 'Classical', count: '80 Songs' },
  { id: 'popular', name: 'Popular', count: '120 Songs' },
  { id: 'rock', name: 'Rock and Roll', count: '90 Songs' },
  { id: 'folk', name: 'Folk Customs', count: '60 Songs' }
];

const playlists = [
  'Journey Classics',
  'African Rhythms',
  'Relaxing Melodies',
  'Upbeat Travels',
  'Gospel Selections',
  'Contemporary Hits',
  'Traditional Kenyan',
  'International Favorites',
  'Peaceful Moments',
  'Energetic Beats',
  'Cultural Heritage',
  'Modern Mix'
];

export function MusicSection() {
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [genreRecommendations, setGenreRecommendations] = useState<SpotifyTrack[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setIsSpotifyConnected(spotifyAPI.isConfigured() && spotifyAPI.isAuthenticated());
    if (spotifyAPI.isConfigured() && spotifyAPI.isAuthenticated()) {
      loadFeaturedPlaylists();
    }
  }, []);

  const loadFeaturedPlaylists = async () => {
    try {
      const playlists = await spotifyAPI.getFeaturedPlaylists(12);
      setFeaturedPlaylists(playlists);
    } catch (error) {
      console.error('Error loading playlists:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const tracks = await spotifyAPI.searchTracks(searchQuery, 20);
      setSearchResults(tracks);
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search for tracks",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreClick = async (genreId: string) => {
    if (activeGenre === genreId) {
      setActiveGenre(null);
      setGenreRecommendations([]);
      return;
    }

    setActiveGenre(genreId);
    setIsLoading(true);
    
    try {
      // Map our genre IDs to Spotify genre seeds
      const genreMap: { [key: string]: string[] } = {
        'classical': ['classical'],
        'popular': ['pop', 'dance'],
        'rock': ['rock', 'hard-rock'],
        'folk': ['folk', 'world-music'],
        'all': ['pop', 'rock', 'classical', 'folk']
      };
      
      const spotifyGenres = genreMap[genreId] || ['pop'];
      const recommendations = await spotifyAPI.getRecommendations(spotifyGenres, 20);
      setGenreRecommendations(recommendations);
    } catch (error) {
      toast({
        title: "Genre Error",
        description: "Failed to load genre recommendations",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaylistClick = async (playlist: SpotifyPlaylist) => {
    setIsLoading(true);
    try {
      const tracks = await spotifyAPI.getPlaylistTracks(playlist.id);
      if (tracks.length > 0) {
        setCurrentTrack(tracks[0]);
        setSearchResults(tracks);
      }
    } catch (error) {
      toast({
        title: "Playlist Error",
        description: "Failed to load playlist tracks",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackSelect = (track: SpotifyTrack) => {
    setCurrentTrack(track);
  };

  const handleNext = () => {
    const currentList = searchResults.length > 0 ? searchResults : genreRecommendations;
    if (!currentTrack || currentList.length === 0) return;
    
    const currentIndex = currentList.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentList.length;
    setCurrentTrack(currentList[nextIndex]);
  };

  const handlePrevious = () => {
    const currentList = searchResults.length > 0 ? searchResults : genreRecommendations;
    if (!currentTrack || currentList.length === 0) return;
    
    const currentIndex = currentList.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? currentList.length - 1 : currentIndex - 1;
    setCurrentTrack(currentList[prevIndex]);
  };

  const handleDisconnect = () => {
    spotifyAPI.clearConfig();
    setIsSpotifyConnected(false);
    setCurrentTrack(null);
    setSearchResults([]);
    setFeaturedPlaylists([]);
    setGenreRecommendations([]);
    setActiveGenre(null);
  };

  if (!isSpotifyConnected) {
    return <SpotifySetup onComplete={() => setIsSpotifyConnected(true)} />;
  }

  const displayTracks = searchResults.length > 0 ? searchResults : genreRecommendations;

  return (
    <div className="space-y-6">
      {/* Spotify Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Search for songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="outline" onClick={handleSearch} disabled={isLoading}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" onClick={handleDisconnect} size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Disconnect Spotify
        </Button>
      </div>

      {/* Current Player */}
      <SpotifyPlayer
        track={currentTrack}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      {/* Music Genres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {musicGenres.map((genre) => (
          <Card 
            key={genre.id} 
            className={`hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-primary/10 cursor-pointer ${
              activeGenre === genre.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleGenreClick(genre.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                {genre.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">{genre.count}</p>
              <Button 
                variant={activeGenre === genre.id ? "premium" : "outline"} 
                size="sm" 
                className="w-full"
              >
                {activeGenre === genre.id ? 'Loaded' : 'Browse'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Playlists */}
      <Card className="bg-gradient-elegant border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">Spotify Featured Playlists</CardTitle>
          <p className="text-muted-foreground">Discover curated playlists from Spotify</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {featuredPlaylists.map((playlist) => (
              <Button
                key={playlist.id}
                variant="entertainment"
                size="sm"
                className="h-auto py-3 px-4 text-left justify-start"
                onClick={() => handlePlaylistClick(playlist)}
                disabled={isLoading}
              >
                <div className="truncate">
                  <div className="font-medium">{playlist.name}</div>
                  <div className="text-xs text-muted-foreground">{playlist.tracks.total} tracks</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Track Results */}
      {displayTracks.length > 0 && (
        <Card className="bg-gradient-elegant border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Music className="h-5 w-5" />
              {searchResults.length > 0 ? 'Search Results' : `${activeGenre ? musicGenres.find(g => g.id === activeGenre)?.name : ''} Recommendations`}
              <Button variant="ghost" size="sm" onClick={() => {
                if (displayTracks.length > 0) {
                  const randomTrack = displayTracks[Math.floor(Math.random() * displayTracks.length)];
                  setCurrentTrack(randomTrack);
                }
              }}>
                <Shuffle className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {displayTracks.map((track) => (
                <div
                  key={track.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                    currentTrack?.id === track.id ? 'bg-primary/10 border-primary' : 'border-border'
                  }`}
                  onClick={() => handleTrackSelect(track)}
                >
                  <div className="flex gap-3">
                    {track.album.images[0] && (
                      <img
                        src={track.album.images[0].url}
                        alt={track.album.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{track.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {track.artists.map(a => a.name).join(', ')}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {track.album.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}