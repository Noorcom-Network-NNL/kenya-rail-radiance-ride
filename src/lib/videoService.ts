export interface VideoSource {
  id: string;
  title: string;
  duration: string;
  genre: string;
  rating: number;
  year: number;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: 'all' | 'romance' | 'comedy' | 'adventure' | 'cartoon' | 'action' | 'drama' | 'documentary' | 'family';
  featured: boolean;
  provider: 'cloudflare';
  tags: string[];
  ageRating: 'G' | 'PG' | 'PG-13' | 'R' | 'NR';
  language: string;
  country: string;
}

export interface VideoConfig {
  provider: 'cloudflare';
  baseUrl: string;
  accountId?: string;
}

// Cloudflare Stream configuration
export const videoConfig: VideoConfig = {
  provider: 'cloudflare',
  baseUrl: 'https://customer-m033z5x00ks6nunl.cloudflarestream.com',
  accountId: 'your-account-id' // Replace with actual account ID
};

// 2025 Multimedia Content Library
export const videoLibrary: VideoSource[] = [
  // Movies (2025)
  {
    id: 'fantastic-four-2025',
    title: 'The Fantastic Four: First Steps',
    duration: '2h 15m',
    genre: 'Action',
    rating: 4.5,
    year: 2025,
    description: 'The origin story of Marvel\'s first family.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/fantastic-four-2025/manifest/video.m3u8`,
    category: 'action',
    featured: true,
    provider: 'cloudflare',
    tags: ['superhero', 'marvel', 'action', 'family'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'superman-2025',
    title: 'Superman',
    duration: '2h 30m',
    genre: 'Action',
    rating: 4.8,
    year: 2025,
    description: 'The Man of Steel returns in this epic adventure.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/superman-2025/manifest/video.m3u8`,
    category: 'action',
    featured: true,
    provider: 'cloudflare',
    tags: ['superhero', 'dc', 'action', 'adventure'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'mission-impossible-2025',
    title: 'Mission: Impossible – The Final Reckoning',
    duration: '2h 45m',
    genre: 'Action',
    rating: 4.7,
    year: 2025,
    description: 'Ethan Hunt faces his most dangerous mission yet.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/mission-impossible-2025/manifest/video.m3u8`,
    category: 'action',
    featured: true,
    provider: 'cloudflare',
    tags: ['action', 'thriller', 'spy', 'adventure'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'jurassic-world-2025',
    title: 'Jurassic World Rebirth',
    duration: '2h 20m',
    genre: 'Adventure',
    rating: 4.6,
    year: 2025,
    description: 'Dinosaurs rule the Earth once again in this thrilling adventure.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    videoUrl: `${videoConfig.baseUrl}/jurassic-world-2025/manifest/video.m3u8`,
    category: 'adventure',
    featured: true,
    provider: 'cloudflare',
    tags: ['dinosaurs', 'adventure', 'sci-fi', 'action'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'avatar-fire-ash-2025',
    title: 'Avatar: Fire and Ash',
    duration: '3h 10m',
    genre: 'Adventure',
    rating: 4.9,
    year: 2025,
    description: 'Jake Sully continues his journey on Pandora.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/avatar-fire-ash-2025/manifest/video.m3u8`,
    category: 'adventure',
    featured: true,
    provider: 'cloudflare',
    tags: ['sci-fi', 'adventure', 'fantasy', 'epic'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'naked-gun-2025',
    title: 'The Naked Gun',
    duration: '1h 35m',
    genre: 'Comedy',
    rating: 4.2,
    year: 2025,
    description: 'Comedy returns with this hilarious reboot.',
    thumbnail: 'photo-1488590528505-98d2b5aba04b',
    videoUrl: `${videoConfig.baseUrl}/naked-gun-2025/manifest/video.m3u8`,
    category: 'comedy',
    featured: false,
    provider: 'cloudflare',
    tags: ['comedy', 'humor', 'police', 'parody'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'sinners-2025',
    title: 'Sinners',
    duration: '1h 55m',
    genre: 'Drama',
    rating: 4.3,
    year: 2025,
    description: 'A powerful drama about redemption and second chances.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/sinners-2025/manifest/video.m3u8`,
    category: 'drama',
    featured: false,
    provider: 'cloudflare',
    tags: ['drama', 'redemption', 'character study'],
    ageRating: 'R',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'she-rides-shotgun-2025',
    title: 'She Rides Shotgun',
    duration: '1h 50m',
    genre: 'Action',
    rating: 4.1,
    year: 2025,
    description: 'High-octane action thriller with non-stop excitement.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/she-rides-shotgun-2025/manifest/video.m3u8`,
    category: 'action',
    featured: false,
    provider: 'cloudflare',
    tags: ['action', 'thriller', 'crime', 'chase'],
    ageRating: 'R',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'guinea-fowl-2025',
    title: 'On Becoming a Guinea Fowl',
    duration: '1h 45m',
    genre: 'Drama',
    rating: 4.4,
    year: 2025,
    description: 'An intimate family drama set in Zambia.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    videoUrl: `${videoConfig.baseUrl}/guinea-fowl-2025/manifest/video.m3u8`,
    category: 'drama',
    featured: true,
    provider: 'cloudflare',
    tags: ['drama', 'family', 'africa', 'culture'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'Zambia'
  },
  {
    id: 'f1-movie-2025',
    title: 'F1: The Movie',
    duration: '2h 5m',
    genre: 'Action',
    rating: 4.6,
    year: 2025,
    description: 'High-speed Formula 1 racing action and drama.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/f1-movie-2025/manifest/video.m3u8`,
    category: 'action',
    featured: true,
    provider: 'cloudflare',
    tags: ['racing', 'sports', 'action', 'competition'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },

  // TV Shows (2025)
  {
    id: 'wednesday-s2-2025',
    title: 'Wednesday – Season 2',
    duration: '8h 0m',
    genre: 'Comedy',
    rating: 4.7,
    year: 2025,
    description: 'Wednesday Addams returns for more supernatural adventures.',
    thumbnail: 'photo-1488590528505-98d2b5aba04b',
    videoUrl: `${videoConfig.baseUrl}/wednesday-s2-2025/manifest/video.m3u8`,
    category: 'comedy',
    featured: true,
    provider: 'cloudflare',
    tags: ['supernatural', 'comedy', 'teen', 'mystery'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'thursday-murder-club-2025',
    title: 'The Thursday Murder Club',
    duration: '6h 0m',
    genre: 'Drama',
    rating: 4.5,
    year: 2025,
    description: 'Elderly residents solve cold cases in this charming mystery series.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/thursday-murder-club-2025/manifest/video.m3u8`,
    category: 'drama',
    featured: false,
    provider: 'cloudflare',
    tags: ['mystery', 'crime', 'elderly', 'cozy mystery'],
    ageRating: 'PG',
    language: 'English',
    country: 'UK'
  },
  {
    id: 'invasion-s2-2025',
    title: 'Invasion – Season 2',
    duration: '10h 0m',
    genre: 'Adventure',
    rating: 4.3,
    year: 2025,
    description: 'Humanity fights back against the alien invasion.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/invasion-s2-2025/manifest/video.m3u8`,
    category: 'adventure',
    featured: false,
    provider: 'cloudflare',
    tags: ['sci-fi', 'aliens', 'survival', 'thriller'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'platonic-s2-2025',
    title: 'Platonic – Season 2',
    duration: '5h 0m',
    genre: 'Comedy',
    rating: 4.2,
    year: 2025,
    description: 'A deep dive into modern friendship dynamics.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    videoUrl: `${videoConfig.baseUrl}/platonic-s2-2025/manifest/video.m3u8`,
    category: 'comedy',
    featured: false,
    provider: 'cloudflare',
    tags: ['friendship', 'comedy', 'drama', 'relationships'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'peacemaker-s2-2025',
    title: 'Peacemaker – Season 2',
    duration: '8h 0m',
    genre: 'Action',
    rating: 4.6,
    year: 2025,
    description: 'The antihero returns for more explosive adventures.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/peacemaker-s2-2025/manifest/video.m3u8`,
    category: 'action',
    featured: true,
    provider: 'cloudflare',
    tags: ['superhero', 'antihero', 'comedy', 'action'],
    ageRating: 'R',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'shamba-shape-up-2025',
    title: 'Shamba Shape Up',
    duration: '12h 0m',
    genre: 'Documentary',
    rating: 4.1,
    year: 2025,
    description: 'Agricultural improvement show helping Kenyan farmers.',
    thumbnail: 'photo-1488590528505-98d2b5aba04b',
    videoUrl: `${videoConfig.baseUrl}/shamba-shape-up-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: false,
    provider: 'cloudflare',
    tags: ['agriculture', 'education', 'kenya', 'farming'],
    ageRating: 'G',
    language: 'Swahili',
    country: 'Kenya'
  },
  {
    id: 'tales-by-light-2025',
    title: 'Tales by Light',
    duration: '6h 0m',
    genre: 'Documentary',
    rating: 4.8,
    year: 2025,
    description: 'Photographers capture the beauty of the natural world.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/tales-by-light-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: true,
    provider: 'cloudflare',
    tags: ['photography', 'nature', 'art', 'travel'],
    ageRating: 'G',
    language: 'English',
    country: 'Australia'
  },
  {
    id: 'wildlife-warriors-2025',
    title: 'Wildlife Warriors',
    duration: '8h 0m',
    genre: 'Documentary',
    rating: 4.5,
    year: 2025,
    description: 'Conservation heroes protecting endangered species.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/wildlife-warriors-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: true,
    provider: 'cloudflare',
    tags: ['wildlife', 'conservation', 'nature', 'animals'],
    ageRating: 'G',
    language: 'English',
    country: 'Kenya'
  },
  {
    id: 'travel-diaries-kenya-2025',
    title: 'Travel Diaries: Kenya Edition',
    duration: '10h 0m',
    genre: 'Documentary',
    rating: 4.3,
    year: 2025,
    description: 'Exploring the beauty and culture of Kenya.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    videoUrl: `${videoConfig.baseUrl}/travel-diaries-kenya-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: false,
    provider: 'cloudflare',
    tags: ['travel', 'culture', 'kenya', 'tourism'],
    ageRating: 'G',
    language: 'English',
    country: 'Kenya'
  },
  {
    id: 'selina-2025',
    title: 'Selina',
    duration: '20h 0m',
    genre: 'Drama',
    rating: 4.4,
    year: 2025,
    description: 'Popular Kenyan drama series continues its compelling storyline.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/selina-2025/manifest/video.m3u8`,
    category: 'drama',
    featured: true,
    provider: 'cloudflare',
    tags: ['drama', 'family', 'kenya', 'soap opera'],
    ageRating: 'PG',
    language: 'Swahili',
    country: 'Kenya'
  },

  // Documentaries (2025)
  {
    id: 'apocalypse-tropics-2025',
    title: 'Apocalypse in the Tropics',
    duration: '1h 45m',
    genre: 'Documentary',
    rating: 4.2,
    year: 2025,
    description: 'Climate change impact on tropical regions.',
    thumbnail: 'photo-1488590528505-98d2b5aba04b',
    videoUrl: `${videoConfig.baseUrl}/apocalypse-tropics-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: false,
    provider: 'cloudflare',
    tags: ['climate', 'environment', 'tropics', 'science'],
    ageRating: 'PG',
    language: 'English',
    country: 'Brazil'
  },
  {
    id: 'move-ya-body-2025',
    title: 'Move Ya Body',
    duration: '1h 30m',
    genre: 'Documentary',
    rating: 4.0,
    year: 2025,
    description: 'The evolution of African dance and music.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/move-ya-body-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: false,
    provider: 'cloudflare',
    tags: ['dance', 'music', 'africa', 'culture'],
    ageRating: 'G',
    language: 'English',
    country: 'Nigeria'
  },
  {
    id: 'jimpa-2025',
    title: 'Jimpa',
    duration: '1h 20m',
    genre: 'Documentary',
    rating: 4.1,
    year: 2025,
    description: 'Traditional African storytelling through film.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/jimpa-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: false,
    provider: 'cloudflare',
    tags: ['storytelling', 'tradition', 'africa', 'culture'],
    ageRating: 'G',
    language: 'Swahili',
    country: 'Tanzania'
  },
  {
    id: 'elephant-queen-2025',
    title: 'The Elephant Queen',
    duration: '1h 30m',
    genre: 'Documentary',
    rating: 4.9,
    year: 2025,
    description: 'Following the matriarch of an elephant herd.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    videoUrl: `${videoConfig.baseUrl}/elephant-queen-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: true,
    provider: 'cloudflare',
    tags: ['elephants', 'wildlife', 'nature', 'africa'],
    ageRating: 'G',
    language: 'English',
    country: 'Kenya'
  },
  {
    id: 'our-oceans-2025',
    title: 'Our Oceans',
    duration: '5h 0m',
    genre: 'Documentary',
    rating: 4.8,
    year: 2025,
    description: 'Exploring the mysteries of our planet\'s oceans.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/our-oceans-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: true,
    provider: 'cloudflare',
    tags: ['ocean', 'marine life', 'nature', 'exploration'],
    ageRating: 'G',
    language: 'English',
    country: 'UK'
  },
  {
    id: 'octopus-teacher-2025',
    title: 'My Octopus Teacher',
    duration: '1h 25m',
    genre: 'Documentary',
    rating: 4.7,
    year: 2025,
    description: 'Extended cut of the acclaimed underwater documentary.',
    thumbnail: 'photo-1488590528505-98d2b5aba04b',
    videoUrl: `${videoConfig.baseUrl}/octopus-teacher-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: true,
    provider: 'cloudflare',
    tags: ['ocean', 'octopus', 'nature', 'relationship'],
    ageRating: 'G',
    language: 'English',
    country: 'South Africa'
  },
  {
    id: 'great-migration-2025',
    title: 'The Great Migration – Nat Geo',
    duration: '2h 0m',
    genre: 'Documentary',
    rating: 4.8,
    year: 2025,
    description: 'The epic journey of wildebeest across the Serengeti.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/great-migration-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: true,
    provider: 'cloudflare',
    tags: ['migration', 'wildlife', 'serengeti', 'nature'],
    ageRating: 'G',
    language: 'English',
    country: 'Kenya'
  },
  {
    id: 'chasing-ice-2025',
    title: 'Chasing Ice',
    duration: '1h 45m',
    genre: 'Documentary',
    rating: 4.6,
    year: 2025,
    description: 'Documenting the rapid melting of glaciers worldwide.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/chasing-ice-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: false,
    provider: 'cloudflare',
    tags: ['climate', 'glaciers', 'environment', 'photography'],
    ageRating: 'PG',
    language: 'English',
    country: 'USA'
  },
  {
    id: 'bbc-earth-serengeti-2025',
    title: 'BBC Earth: Serengeti',
    duration: '6h 0m',
    genre: 'Documentary',
    rating: 4.9,
    year: 2025,
    description: 'Stunning wildlife documentary series from the Serengeti.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    videoUrl: `${videoConfig.baseUrl}/bbc-earth-serengeti-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: true,
    provider: 'cloudflare',
    tags: ['wildlife', 'serengeti', 'nature', 'bbc'],
    ageRating: 'G',
    language: 'English',
    country: 'Tanzania'
  },
  {
    id: 'swahili-coast-history-2025',
    title: 'The History of Swahili Coast',
    duration: '2h 15m',
    genre: 'Documentary',
    rating: 4.3,
    year: 2025,
    description: 'Rich history and culture of the East African coast.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/swahili-coast-history-2025/manifest/video.m3u8`,
    category: 'documentary',
    featured: false,
    provider: 'cloudflare',
    tags: ['history', 'swahili', 'coast', 'culture'],
    ageRating: 'G',
    language: 'Swahili',
    country: 'Kenya'
  }
];

// Utility functions
export const getVideoById = (id: string): VideoSource | undefined => {
  return videoLibrary.find(video => video.id === id);
};

export const getVideosByCategory = (category: 'all' | 'romance' | 'comedy' | 'adventure' | 'cartoon' | 'action' | 'drama' | 'documentary' | 'family'): VideoSource[] => {
  if (category === 'all') {
    return videoLibrary;
  }
  return videoLibrary.filter(video => video.category === category);
};

export const getVideosByTags = (tags: string[]): VideoSource[] => {
  return videoLibrary.filter(video => 
    tags.some(tag => video.tags.some(videoTag => 
      videoTag.toLowerCase().includes(tag.toLowerCase())
    ))
  );
};

export const getVideosByAgeRating = (rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NR'): VideoSource[] => {
  return videoLibrary.filter(video => video.ageRating === rating);
};

export const getVideosByLanguage = (language: string): VideoSource[] => {
  return videoLibrary.filter(video => 
    video.language.toLowerCase() === language.toLowerCase()
  );
};

export const getVideosByRating = (minRating: number): VideoSource[] => {
  return videoLibrary.filter(video => video.rating >= minRating);
};

export const getFeaturedVideos = (): VideoSource[] => {
  return videoLibrary.filter(video => video.featured);
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const getOptimalVideoUrl = (videoSource: VideoSource, quality: 'auto' | 'high' | 'medium' | 'low' = 'auto'): string => {
  // For Cloudflare Stream, you can append quality parameters
  const baseUrl = videoSource.videoUrl;
  
  switch (quality) {
    case 'high':
      return baseUrl.replace('/manifest/video.m3u8', '/manifest/video.m3u8?quality=1080p');
    case 'medium':
      return baseUrl.replace('/manifest/video.m3u8', '/manifest/video.m3u8?quality=720p');
    case 'low':
      return baseUrl.replace('/manifest/video.m3u8', '/manifest/video.m3u8?quality=480p');
    default:
      return baseUrl; // Auto quality
  }
};

// Placeholder functions for future implementation
export const uploadToCloudflare = async (file: File): Promise<string> => {
  // Implementation for uploading videos to Cloudflare Stream
  throw new Error('Upload functionality not implemented yet');
};

export const trackVideoView = async (videoId: string, userId?: string): Promise<void> => {
  // Implementation for tracking video views
  console.log(`Tracking view for video: ${videoId}, user: ${userId}`);
};

export const trackVideoProgress = async (videoId: string, progress: number, userId?: string): Promise<void> => {
  // Implementation for tracking video progress
  console.log(`Tracking progress for video: ${videoId}, progress: ${progress}%, user: ${userId}`);
};