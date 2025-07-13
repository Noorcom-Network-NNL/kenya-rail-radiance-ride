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

// Video library with Cloudflare Stream URLs
export const videoLibrary: VideoSource[] = [
  // Romance
  {
    id: 'safari-love-001',
    title: 'Safari Love Story',
    duration: '2h 15m',
    genre: 'Romance',
    rating: 4.8,
    year: 2024,
    description: 'A beautiful love story set against the stunning backdrop of Kenya\'s wildlife.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/ea95132c15732412d22c1476fa407617/manifest/video.m3u8`,
    category: 'romance',
    featured: true,
    provider: 'cloudflare',
    tags: ['wildlife', 'love story', 'kenya', 'nature'],
    ageRating: 'PG',
    language: 'English',
    country: 'Kenya'
  },
  {
    id: 'nairobi-nights-002',
    title: 'Nairobi Nights',
    duration: '1h 45m',
    genre: 'Romance',
    rating: 4.2,
    year: 2023,
    description: 'Modern romance in the bustling streets of Nairobi.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/b236bde30eb07b26b47148fd34e6121b/manifest/video.m3u8`,
    category: 'romance',
    featured: false,
    provider: 'cloudflare',
    tags: ['urban', 'modern', 'nairobi', 'city life'],
    ageRating: 'PG-13',
    language: 'Swahili',
    country: 'Kenya'
  },

  // Comedy
  {
    id: 'railway-comedy-003',
    title: 'The Great Railway Comedy',
    duration: '1h 30m',
    genre: 'Comedy',
    rating: 4.5,
    year: 2024,
    description: 'Hilarious adventures aboard the Kenya railway system.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/c347ade40eb17c36c47258gd45f2231c/manifest/video.m3u8`,
    category: 'comedy',
    featured: true,
    provider: 'cloudflare',
    tags: ['railway', 'train', 'humor', 'travel'],
    ageRating: 'PG',
    language: 'English',
    country: 'Kenya'
  },
  {
    id: 'kenyan-laughs-004',
    title: 'Kenyan Laughs',
    duration: '2h 0m',
    genre: 'Comedy',
    rating: 4.0,
    year: 2023,
    description: 'A collection of the funniest moments from Kenya.',
    thumbnail: 'photo-1488590528505-98d2b5aba04b',
    videoUrl: `${videoConfig.baseUrl}/d458bfe50fc28d47d58369he56g3342d/manifest/video.m3u8`,
    category: 'comedy',
    featured: false,
    provider: 'cloudflare',
    tags: ['compilation', 'humor', 'culture', 'entertainment'],
    ageRating: 'PG',
    language: 'Swahili',
    country: 'Kenya'
  },

  // Adventure
  {
    id: 'wilderness-quest-005',
    title: 'Wilderness Quest',
    duration: '2h 30m',
    genre: 'Adventure',
    rating: 4.7,
    year: 2024,
    description: 'Thrilling adventures in the heart of the African wilderness.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    videoUrl: `${videoConfig.baseUrl}/e569cfg60gd39e58e69480if67h4453e/manifest/video.m3u8`,
    category: 'adventure',
    featured: true,
    provider: 'cloudflare',
    tags: ['wilderness', 'safari', 'africa', 'exploration'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'Kenya'
  },
  {
    id: 'kilimanjaro-climb-006',
    title: 'Kilimanjaro Climb',
    duration: '3h 0m',
    genre: 'Adventure',
    rating: 4.9,
    year: 2023,
    description: 'Daring mountain climbing adventure on Kenya\'s highest peak.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/f670dgh70he50f69f70591jg78i5564f/manifest/video.m3u8`,
    category: 'adventure',
    featured: true,
    provider: 'cloudflare',
    tags: ['mountain', 'climbing', 'extreme', 'sports'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'Kenya'
  },

  // Cartoon
  {
    id: 'animated-railway-007',
    title: 'Animated Railway Adventures',
    duration: '1h 20m',
    genre: 'Animation',
    rating: 4.6,
    year: 2024,
    description: 'Animated adventure of animals traveling on the Kenya railway.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/g781ehi80if61g80g81602kh89j6675g/manifest/video.m3u8`,
    category: 'cartoon',
    featured: true,
    provider: 'cloudflare',
    tags: ['animation', 'animals', 'railway', 'family'],
    ageRating: 'G',
    language: 'English',
    country: 'Kenya'
  },
  {
    id: 'kenyan-kids-tales-008',
    title: 'Kenyan Kids Tales',
    duration: '45m',
    genre: 'Animation',
    rating: 4.3,
    year: 2023,
    description: 'Fun animated stories for children about Kenyan culture.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/h892fij90jg72h91h92713li90k7786h/manifest/video.m3u8`,
    category: 'cartoon',
    featured: false,
    provider: 'cloudflare',
    tags: ['kids', 'education', 'culture', 'stories'],
    ageRating: 'G',
    language: 'Swahili',
    country: 'Kenya'
  },

  // Action Movies
  {
    id: 'action-thriller-009',
    title: 'Mombasa Chase',
    duration: '2h 5m',
    genre: 'Action',
    rating: 4.4,
    year: 2024,
    description: 'High-speed action thriller through the streets of Mombasa.',
    thumbnail: 'photo-1531297484001-80022131f5a1',
    videoUrl: `${videoConfig.baseUrl}/i903gik01kh83i02i03824mj01l8897i/manifest/video.m3u8`,
    category: 'action',
    featured: true,
    provider: 'cloudflare',
    tags: ['chase', 'mombasa', 'thriller', 'speed'],
    ageRating: 'PG-13',
    language: 'English',
    country: 'Kenya'
  },

  // Drama
  {
    id: 'family-drama-010',
    title: 'Heritage Stories',
    duration: '1h 55m',
    genre: 'Drama',
    rating: 4.7,
    year: 2023,
    description: 'Emotional family drama exploring Kenyan traditions and heritage.',
    thumbnail: 'photo-1605810230434-7631ac76ec81',
    videoUrl: `${videoConfig.baseUrl}/j014hjl12li94j15j16935nk12m9908j/manifest/video.m3u8`,
    category: 'drama',
    featured: true,
    provider: 'cloudflare',
    tags: ['family', 'heritage', 'tradition', 'emotional'],
    ageRating: 'PG',
    language: 'Swahili',
    country: 'Kenya'
  },

  // Documentary
  {
    id: 'railway-history-011',
    title: 'Kenya Railway History',
    duration: '1h 30m',
    genre: 'Documentary',
    rating: 4.8,
    year: 2024,
    description: 'Comprehensive documentary about the history and impact of Kenya Railway.',
    thumbnail: 'photo-1649972904349-6e44c42644a7',
    videoUrl: `${videoConfig.baseUrl}/k125ikm23mj05k26k27046ol23n0019k/manifest/video.m3u8`,
    category: 'documentary',
    featured: true,
    provider: 'cloudflare',
    tags: ['history', 'railway', 'documentary', 'educational'],
    ageRating: 'G',
    language: 'English',
    country: 'Kenya'
  },

  // Family
  {
    id: 'family-journey-012',
    title: 'Family Train Journey',
    duration: '1h 40m',
    genre: 'Family',
    rating: 4.5,
    year: 2024,
    description: 'Heartwarming family movie about a railway journey across Kenya.',
    thumbnail: 'photo-1526374965328-7f61d4dc18c5',
    videoUrl: `${videoConfig.baseUrl}/l236jln34nk16l37l38157pm34o1120l/manifest/video.m3u8`,
    category: 'family',
    featured: false,
    provider: 'cloudflare',
    tags: ['family', 'journey', 'heartwarming', 'travel'],
    ageRating: 'G',
    language: 'English',
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