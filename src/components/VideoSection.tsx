import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

const videoCategories = [
  { id: 'all', name: 'All Content', description: 'Complete entertainment library', count: '25+ Items' },
  { id: 'romance', name: 'Romance', description: 'Love stories and dramas', count: '8 Movies' },
  { id: 'comedy', name: 'Comedy', description: 'Laughter and entertainment', count: '7 Movies' },
  { id: 'adventure', name: 'Adventure', description: 'Thrilling journeys', count: '6 Movies' },
  { id: 'cartoon', name: 'Animation', description: 'Family-friendly content', count: '4 Movies' }
];

const featuredContent = [
  { title: 'Silent Night (2023)', type: 'Movie', duration: '120 min', genre: 'Drama' },
  { title: 'Kenyan Heritage', type: 'Documentary', duration: '45 min', genre: 'Cultural' },
  { title: 'African Wildlife', type: 'Documentary', duration: '50 min', genre: 'Nature' },
  { title: 'Journey to Mombasa', type: 'TV Show', duration: '40 min/ep', genre: 'Travel' },
  { title: 'Safari Adventures', type: 'TV Show', duration: '35 min/ep', genre: 'Adventure' },
  { title: 'Modern Kenya', type: 'Documentary', duration: '60 min', genre: 'History' }
];

export function VideoSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {videoCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-2">{category.description}</p>
              <p className="text-primary text-sm font-medium mb-3">{category.count}</p>
              <Button variant="outline" size="sm" className="w-full">
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-elegant border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">Featured Content</CardTitle>
          <p className="text-muted-foreground">Premium entertainment for your journey</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredContent.map((content, index) => (
              <Card key={index} className="bg-card/50 border-primary/10 hover:bg-card/70 transition-all duration-300">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-1">{content.title}</h4>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>{content.type}</span>
                    <span>{content.duration}</span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-3">{content.genre}</p>
                  <Button variant="entertainment" size="sm" className="w-full">
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted/30 rounded-lg p-6 border border-primary/10">
        <h3 className="text-lg font-semibold mb-2 text-foreground">Technical Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p><span className="font-medium">Video Format:</span> MP4, H.264</p>
            <p><span className="font-medium">Resolution:</span> 1920×1080 (Full HD)</p>
          </div>
          <div>
            <p><span className="font-medium">Storage:</span> 512 GB System</p>
            <p><span className="font-medium">Updates:</span> Every 2 months</p>
          </div>
        </div>
      </div>
    </div>
  );
}