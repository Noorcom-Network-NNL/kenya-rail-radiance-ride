import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Loader2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  getTracksByPlaylist, 
  musicPlaylists, 
  type MusicTrack, 
  getFeaturedTracks,
  searchTracks 
} from "@/lib/musicService";
import { MusicPlayer } from "./MusicPlayer";
import { TrackList } from "./TrackList";
import { FreesoundConfig } from "./FreesoundConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const musicGenres = [
  { id: 'all', name: 'All Music', count: '40+ Songs' },
  { id: 'popular', name: 'Popular Playlist', count: '10 Songs' },
  { id: 'classical', name: 'Classical Playlist', count: '10 Songs' },
  { id: 'rock', name: 'Rock and Roll Playlist', count: '10 Songs' },
  { id: 'folk', name: 'Folk Customs Playlist', count: '10 Songs' }
];

const playlists = [
  'Popular Playlist',
  'Classical Playlist', 
  'Rock and Roll Playlist',
  'Folk Customs Playlist'
];

export function MusicSection() {
  const { toast } = useToast();
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [activeSource, setActiveSource] = useState<'freesound'>('freesound');

  useEffect(() => {
    // Auto-load all tracks on component mount
    loadMusicTracks('all');
  }, []);

  const loadMusicTracks = async (genreId: string) => {
    setLoading(true);
    try {
      let loadedTracks: MusicTrack[] = [];
      
      if (genreId === 'all') {
        loadedTracks = getFeaturedTracks();
      } else {
        loadedTracks = getTracksByPlaylist(genreId);
      }
      
      setTracks(loadedTracks);
      
      if (loadedTracks.length > 0) {
        toast({
          title: `Loaded ${loadedTracks.length} tracks`,
          description: `${genreId === 'all' ? 'Featured music' : musicPlaylists[genreId as keyof typeof musicPlaylists]} from 2025 collection`,
        });
        
        // Auto-select first track if none selected
        if (!currentTrack) {
          setCurrentTrack(loadedTracks[0]);
        }
      } else {
        toast({
          title: "No tracks available",
          description: "Selected playlist is empty",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Music loading error:', error);
      toast({
        title: "Error loading tracks",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseGenre = (genreId: string, genreName: string) => {
    setSelectedGenre(genreId);
    loadMusicTracks(genreId);
  };

  const handleTrackSelect = (track: MusicTrack) => {
    setCurrentTrack(track);
  };

  const handlePlaylistSelect = (playlistName: string) => {
    // Map playlist names to genre IDs
    const playlistMap: { [key: string]: string } = {
      'Popular Playlist': 'popular',
      'Classical Playlist': 'classical', 
      'Rock and Roll Playlist': 'rock',
      'Folk Customs Playlist': 'folk'
    };
    
    const genreId = playlistMap[playlistName] || 'popular';
    setSelectedGenre(genreId);
    loadMusicTracks(genreId);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-elegant rounded-lg">
        <h2 className="text-xl font-semibold mb-2">🎵 2025 Music Library</h2>
        <p className="text-muted-foreground">Curated playlists featuring Popular, Classical, Rock and Roll, and Folk Customs</p>
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