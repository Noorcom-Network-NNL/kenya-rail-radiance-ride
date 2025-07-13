import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Play, 
  Clock, 
  Star, 
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";
import { videoLibrary, getVideosByCategory, getFeaturedVideos, trackVideoView, getVideosByTags, getVideosByAgeRating, getVideosByLanguage, getVideosByRating, type VideoSource } from "@/lib/videoService";

// Using VideoSource from videoService
type ContentItem = VideoSource;

export function ContentLibrary() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'romance' | 'comedy' | 'adventure' | 'cartoon' | 'action' | 'drama' | 'documentary' | 'family'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAgeRating, setSelectedAgeRating] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);

  // Handle video selection and tracking
  const handleVideoSelect = async (content: ContentItem) => {
    setSelectedContent(content);
    await trackVideoView(content.id);
  };

  const categories = [
    { id: 'all', name: 'All', count: videoLibrary.length },
    { id: 'romance', name: 'Romance', count: videoLibrary.filter(c => c.category === 'romance').length },
    { id: 'comedy', name: 'Comedy', count: videoLibrary.filter(c => c.category === 'comedy').length },
    { id: 'adventure', name: 'Adventure', count: videoLibrary.filter(c => c.category === 'adventure').length },
    { id: 'cartoon', name: 'Cartoon', count: videoLibrary.filter(c => c.category === 'cartoon').length },
    { id: 'action', name: 'Action', count: videoLibrary.filter(c => c.category === 'action').length },
    { id: 'drama', name: 'Drama', count: videoLibrary.filter(c => c.category === 'drama').length },
    { id: 'documentary', name: 'Documentary', count: videoLibrary.filter(c => c.category === 'documentary').length },
    { id: 'family', name: 'Family', count: videoLibrary.filter(c => c.category === 'family').length },
  ];

  const ageRatings = ['all', 'G', 'PG', 'PG-13', 'R'];
  const languages = ['all', 'English', 'Swahili'];

  // Apply all filters
  let allContent = getVideosByCategory(selectedCategory);
  
  // Filter by age rating
  if (selectedAgeRating !== 'all') {
    allContent = allContent.filter(video => video.ageRating === selectedAgeRating);
  }
  
  // Filter by language
  if (selectedLanguage !== 'all') {
    allContent = allContent.filter(video => video.language === selectedLanguage);
  }
  
  // Filter by minimum rating
  allContent = allContent.filter(video => video.rating >= minRating);

  // Filter by search term (title, description, tags)
  const filteredContent: ContentItem[] = allContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Get featured content
  const featuredContent = getFeaturedVideos();

  if (selectedContent) {
    return (
      <VideoPlayer
        video={selectedContent}
        onBack={() => setSelectedContent(null)}
        onVideoChange={(newVideo) => setSelectedContent(newVideo)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/10">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'premium' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'premium' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {/* Age Rating Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Age Rating</label>
              <select 
                value={selectedAgeRating} 
                onChange={(e) => setSelectedAgeRating(e.target.value)}
                className="w-full p-2 border rounded-md bg-background text-foreground"
              >
                {ageRatings.map(rating => (
                  <option key={rating} value={rating}>{rating === 'all' ? 'All Ratings' : rating}</option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Language</label>
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-2 border rounded-md bg-background text-foreground"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang === 'all' ? 'All Languages' : lang}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Min Rating: {minRating.toFixed(1)}</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedAgeRating('all');
                  setSelectedLanguage('all');
                  setMinRating(0);
                  setSearchTerm('');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'premium' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
                className="text-sm"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Content */}
      {selectedCategory === 'all' && (
        <Card className="bg-gradient-elegant border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              Featured Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredContent.map((item) => (
                <Card
                  key={item.id}
                  className="group bg-card/50 border-primary/10 hover:bg-card/70 transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => handleVideoSelect(item)}
                >
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span>{item.year}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary font-medium">{item.genre}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-accent fill-current" />
                        <span className="text-xs text-foreground">{item.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Grid/List */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/10">
        <CardHeader>
          <CardTitle>
            {selectedCategory === 'all' ? 'All Content' : categories.find(c => c.id === selectedCategory)?.name} 
            ({filteredContent.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "space-y-4"
          }>
            {filteredContent.map((item) => (
              <Card
                key={item.id}
                className={`group bg-card/50 border-primary/10 hover:bg-card/70 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
                onClick={() => handleVideoSelect(item)}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-32 h-20' : 'aspect-video'}`}>
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  {item.featured && (
                    <Badge className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs">
                      ★
                    </Badge>
                  )}
                </div>
                <CardContent className={`p-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium">{item.genre}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-current" />
                      <span className="text-xs text-foreground">{item.rating}</span>
                    </div>
                  </div>
                  {viewMode === 'list' && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}