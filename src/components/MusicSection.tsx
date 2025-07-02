import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {musicGenres.map((genre) => (
          <Card key={genre.id} className="hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                {genre.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">{genre.count}</p>
              <Button variant="outline" size="sm" className="w-full">
                Browse
              </Button>
            </CardContent>
          </Card>
        ))}
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