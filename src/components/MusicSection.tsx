import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Loader2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchJamendoTracks, jamendoGenres, type JamendoTrack } from "@/lib/jamendo";
import { fetchFreesoundByGenre, getConfiguredApiKey, fetchFreesoundByGenreWithConfig, genreTrackLimits, fetchFreesoundByPlaylist } from "@/lib/freesound";
import { MusicPlayer } from "./MusicPlayer";
import { TrackList } from "./TrackList";
import { FreesoundConfig } from "./FreesoundConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { toast } = useToast();
  const [tracks, setTracks] = useState<JamendoTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<JamendoTrack | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [activeSource, setActiveSource] = useState<'freesound'>('freesound');

  useEffect(() => {
    // Auto-load real tracks on component mount
    loadFreesoundTracks('all');
  }, []);

  const loadFreesoundTracks = async (genre: string) => {
    setLoading(true);
    try {
      const trackLimit = genreTrackLimits[genre as keyof typeof genreTrackLimits] || 20;
      let fetchedTracks = await fetchFreesoundByGenreWithConfig(genre, trackLimit);
      
      // Fallback: if no tracks found, try with just "music" query
      if (fetchedTracks.length === 0) {
        console.log(`No tracks found for ${genre}, trying fallback...`);
        fetchedTracks = await fetchFreesoundByGenreWithConfig('all', Math.min(trackLimit, 20));
      }
      
      setTracks(fetchedTracks);
      
      if (fetchedTracks.length > 0) {
        toast({
          title: `Loaded ${fetchedTracks.length} real tracks`,
          description: `${genre === 'all' ? 'All music' : genre} - East African & International`,
        });
      } else {
        toast({
          title: "No tracks available",
          description: "Please check your internet connection",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Freesound API error:', error);
      toast({
        title: "Error loading tracks",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseGenre = (genreId: string, genreName: string) => {
    setSelectedGenre(genreId);
    loadFreesoundTracks(genreId);
  };

  const handleTrackSelect = (track: JamendoTrack) => {
    setCurrentTrack(track);
  };

  const loadPlaylistTracks = async (playlistName: string) => {
    setLoading(true);
    try {
      let fetchedTracks = await fetchFreesoundByPlaylist(playlistName, 25);
      
      // Fallback: if playlist has no tracks, try general music search
      if (fetchedTracks.length === 0) {
        console.log(`No tracks found for playlist ${playlistName}, trying fallback...`);
        fetchedTracks = await fetchFreesoundByGenreWithConfig('all', 15);
      }
      
      setTracks(fetchedTracks);
      
      if (fetchedTracks.length > 0) {
        toast({
          title: `Loaded ${playlistName}`,
          description: `${fetchedTracks.length} curated tracks ready to play`,
        });
        // Auto-play first track
        setCurrentTrack(fetchedTracks[0]);
      } else {
        toast({
          title: "No tracks available",
          description: "Please check your internet connection",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Playlist loading error:', error);
      toast({
        title: "Error loading playlist",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlaylistSelect = (playlistName: string) => {
    setSelectedGenre(''); // Clear genre selection
    loadPlaylistTracks(playlistName);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-elegant rounded-lg">
        <h2 className="text-xl font-semibold mb-2">🎵 Real Music Library</h2>
        <p className="text-muted-foreground">East African & International music collection from Freesound</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {musicGenres.map((genre) => (
          <Card 
            key={genre.id} 
            className={`hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-primary/10 cursor-pointer ${
              selectedGenre === genre.id ? 'border-primary/40 bg-accent/20' : ''
            }`}
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
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleBrowseGenre(genre.id, genre.name)}
                disabled={loading && selectedGenre === genre.id}
              >
                {loading && selectedGenre === genre.id ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" />Loading</>
                ) : (
                  'Browse'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TrackList 
            tracks={tracks} 
            currentTrack={currentTrack}
            onTrackSelect={handleTrackSelect}
            loading={loading}
          />
        </div>
        
        <div>
          <MusicPlayer 
            track={currentTrack}
            playlist={tracks}
            onTrackChange={setCurrentTrack}
          />
        </div>
      </div>

      <Card className="bg-gradient-elegant border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">Curated Playlists</CardTitle>
          <p className="text-muted-foreground">Handpicked music collections for your journey</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {playlists.map((playlist, index) => (
              <Button
                key={index}
                variant="entertainment"
                size="sm"
                className="h-auto py-3 px-4 text-left justify-start"
                onClick={() => handlePlaylistSelect(playlist)}
              >
                {playlist}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}