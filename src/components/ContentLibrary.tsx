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

interface ContentItem {
  id: string;
  title: string;
  duration: string;
  genre: string;
  rating: number;
  year: number;
  description: string;
  thumbnail: string;
  category: 'all' | 'romance' | 'comedy' | 'adventure' | 'cartoon';
  featured: boolean;
}

const sampleContent: ContentItem[] = [
  // Romance Category
  {
    id: '1',
    title: 'Love at Maasai Mara',
    duration: '110 min',
    genre: 'Romance',
    rating: 4.5,
    year: 2024,
    description: 'A beautiful love story set against the stunning backdrop of Kenya\'s wildlife.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    category: 'romance',
    featured: true
  },
  {
    id: '2',
    title: 'Nairobi Hearts',
    duration: '95 min',
    genre: 'Romance',
    rating: 4.2,
    year: 2023,
    description: 'Modern romance in the bustling streets of Nairobi.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    category: 'romance',
    featured: false
  },
  
  // Comedy Category
  {
    id: '3',
    title: 'Railway Comedy Express',
    duration: '85 min',
    genre: 'Comedy',
    rating: 4.7,
    year: 2024,
    description: 'Hilarious adventures aboard the Kenya railway system.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    category: 'comedy',
    featured: true
  },
  {
    id: '4',
    title: 'Kenyan Laughs',
    duration: '90 min',
    genre: 'Comedy',
    rating: 4.4,
    year: 2023,
    description: 'A collection of the funniest moments from Kenya.',
    thumbnail: 'photo-1488590528505-98d2b5aba04b',
    category: 'comedy',
    featured: false
  },

  // Adventure Category
  {
    id: '5',
    title: 'Safari Adventure',
    duration: '120 min',
    genre: 'Adventure',
    rating: 4.8,
    year: 2024,
    description: 'Thrilling adventures in the heart of the African wilderness.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    category: 'adventure',
    featured: true
  },
  {
    id: '6',
    title: 'Mount Kenya Expedition',
    duration: '105 min',
    genre: 'Adventure',
    rating: 4.6,
    year: 2023,
    description: 'Daring mountain climbing adventure on Kenya\'s highest peak.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    category: 'adventure',
    featured: true
  },

  // Cartoon Category
  {
    id: '7',
    title: 'Simba\'s Railway Journey',
    duration: '75 min',
    genre: 'Animation',
    rating: 4.9,
    year: 2024,
    description: 'Animated adventure of animals traveling on the Kenya railway.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    category: 'cartoon',
    featured: true
  },
  {
    id: '8',
    title: 'Kenya Kids Adventures',
    duration: '60 min',
    genre: 'Animation',
    rating: 4.7,
    year: 2023,
    description: 'Fun animated stories for children about Kenyan culture.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    category: 'cartoon',
    featured: false
  }
];

export function ContentLibrary() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All', count: sampleContent.length },
    { id: 'romance', name: 'Romance', count: sampleContent.filter(c => c.category === 'romance').length },
    { id: 'comedy', name: 'Comedy', count: sampleContent.filter(c => c.category === 'comedy').length },
    { id: 'adventure', name: 'Adventure', count: sampleContent.filter(c => c.category === 'adventure').length },
    { id: 'cartoon', name: 'Cartoon', count: sampleContent.filter(c => c.category === 'cartoon').length },
  ];

  const filteredContent = sampleContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredContent = sampleContent.filter(item => item.featured);

  if (selectedContent) {
    return (
      <VideoPlayer
        title={selectedContent.title}
        duration={selectedContent.duration}
        genre={selectedContent.genre}
        description={selectedContent.description}
        onBack={() => setSelectedContent(null)}
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

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'premium' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
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
                  onClick={() => setSelectedContent(item)}
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
                onClick={() => setSelectedContent(item)}
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