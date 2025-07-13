import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Loader2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchJamendoTracks, jamendoGenres, type JamendoTrack } from "@/lib/jamendo";
import { fetchFreesoundByGenre, getConfiguredApiKey, fetchFreesoundByGenreWithConfig, genreTrackLimits } from "@/lib/freesound";
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
  const [freesoundApiKey, setFreesoundApiKey] = useState<string>('');
  const [activeSource, setActiveSource] = useState<'demo' | 'freesound'>('demo');

  useEffect(() => {
    // Load saved API key
    const savedKey = localStorage.getItem('freesound_api_key');
    if (savedKey) {
      setFreesoundApiKey(savedKey);
    }
  }, []);

  const loadDemoTracks = async (genre: string) => {
    setLoading(true);
    try {
      const jamendoGenre = jamendoGenres[genre as keyof typeof jamendoGenres];
      const fetchedTracks = await fetchJamendoTracks(jamendoGenre, 20);
      setTracks(fetchedTracks);
      if (fetchedTracks.length > 0) {
        toast({
          title: `Loaded ${fetchedTracks.length} demo tracks`,
          description: `${genre === 'all' ? 'All music' : genre} library ready to play`,
        });
      }
    } catch (error) {
      toast({
        title: "Error loading tracks",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFreesoundTracks = async (genre: string) => {
    setLoading(true);
    try {
      // Always try to use the built-in configured API key first
      const fetchedTracks = await fetchFreesoundByGenreWithConfig(genre, 20);
      setTracks(fetchedTracks);
      if (fetchedTracks.length > 0) {
        toast({
          title: `Loaded ${fetchedTracks.length} real tracks`,
          description: `${genre === 'all' ? 'All music' : genre} from Freesound`,
        });
      }
    } catch (error) {
      console.error('Freesound API error:', error);
      toast({
        title: "Error loading Freesound tracks",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeSource === 'demo') {
      loadDemoTracks('all');
    } else if (activeSource === 'freesound') {
      // Now that we have built-in API credentials, load tracks immediately
      loadFreesoundTracks('all');
    }
  }, [activeSource]);

  const handleBrowseGenre = (genreId: string, genreName: string) => {
    setSelectedGenre(genreId);
    if (activeSource === 'demo') {
      loadDemoTracks(genreId);
    } else {
      loadFreesoundTracks(genreId);
    }
  };

  const handleTrackSelect = (track: JamendoTrack) => {
    setCurrentTrack(track);
  };

  const handlePlaylistSelect = (playlistName: string) => {
    toast({
      title: `Playing ${playlistName}`,
      description: "Custom playlists coming soon...",
    });
  };

  const handleApiKeyChange = (apiKey: string) => {
    setFreesoundApiKey(apiKey);
    if (apiKey && activeSource === 'freesound') {
      loadFreesoundTracks(selectedGenre);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeSource} onValueChange={(value) => setActiveSource(value as 'demo' | 'freesound')}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="demo">Demo Music</TabsTrigger>
            <TabsTrigger value="freesound">Freesound.org</TabsTrigger>
          </TabsList>
          
          {activeSource === 'freesound' && (
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure API
            </Button>
          )}
        </div>

        <TabsContent value="demo" className="space-y-6">
          <div className="p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Demo mode with sample tracks. Switch to Freesound.org for real music content.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="freesound" className="space-y-6">
          <FreesoundConfig 
            onApiKeyChange={handleApiKeyChange}
            currentApiKey={freesoundApiKey}
          />
        </TabsContent>
      </Tabs>

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