const FREESOUND_BASE_URL = 'https://freesound.org/apiv2';

// Your Freesound API credentials
const FREESOUND_CONFIG = {
  clientId: 'BjGyzsV3nCU7nUbwLDfd',
  clientSecret: 'unSoc6UHTPibfdI1Lh6ZB22Z8vzXIEL8iPduQfMw',
  apiKey: 'unSoc6UHTPibfdI1Lh6ZB22Z8vzXIEL8iPduQfMw' // Use client secret as API key
};

export interface FreesoundTrack {
  id: number;
  name: string;
  description: string;
  username: string;
  duration: number;
  previews: {
    'preview-hq-mp3': string;
    'preview-lq-mp3': string;
    'preview-hq-ogg': string;
    'preview-lq-ogg': string;
  };
  images: {
    waveform_m: string;
    spectral_m: string;
  };
  tags: string[];
}

export interface FreesoundResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FreesoundTrack[];
}

export interface FreesoundSearch {
  query: string;
  filter?: string;
  sort?: 'score' | 'duration_desc' | 'duration_asc' | 'created_desc' | 'created_asc' | 'downloads_desc' | 'downloads_asc' | 'rating_desc' | 'rating_asc';
  page?: number;
  page_size?: number;
}

// Convert Freesound track to our JamendoTrack format for compatibility
export function convertFreesoundTrack(fsTrack: FreesoundTrack): any {
  return {
    id: fsTrack.id.toString(),
    name: fsTrack.name,
    duration: Math.floor(fsTrack.duration),
    artist_name: fsTrack.username,
    album_name: 'Freesound Collection',
    image: fsTrack.images?.waveform_m || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: fsTrack.previews?.['preview-hq-mp3'] || fsTrack.previews?.['preview-lq-mp3'],
    audiodownload: fsTrack.previews?.['preview-hq-mp3'] || fsTrack.previews?.['preview-lq-mp3']
  };
}

export async function searchFreesound(
  search: FreesoundSearch,
  apiKey: string
): Promise<any[]> {
  if (!apiKey) {
    throw new Error('Freesound API key is required');
  }

  try {
    const params = new URLSearchParams({
      token: apiKey,
      query: search.query,
      filter: search.filter || '',
      sort: search.sort || 'score',
      page: (search.page || 1).toString(),
      page_size: (search.page_size || 20).toString(),
      fields: 'id,name,description,username,duration,previews,images,tags'
    });

    const url = `${FREESOUND_BASE_URL}/search/text/?${params}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: FreesoundResponse = await response.json();
    return data.results.map(convertFreesoundTrack);
  } catch (error) {
    console.error('Error searching Freesound:', error);
    throw error;
  }
}

// Enhanced search queries for different genres with East African and international focus
export const freesoundGenreQueries = {
  'all': 'music',
  'classical': 'piano',
  'popular': 'pop',
  'rock': 'guitar',
  'folk': 'acoustic'
};

// Simpler, more reliable playlist queries
export const freesoundPlaylistQueries = {
  'Journey Classics': 'piano classical peaceful',
  'African Rhythms': 'african drums rhythm',
  'Relaxing Melodies': 'calm peaceful ambient',
  'Upbeat Travels': 'upbeat energetic happy',
  'Gospel Selections': 'gospel choir spiritual',
  'Contemporary Hits': 'pop modern contemporary',
  'Traditional Kenyan': 'traditional african folk',
  'International Favorites': 'world music international',
  'Peaceful Moments': 'peaceful calm quiet',
  'Energetic Beats': 'energetic beat dance',
  'Cultural Heritage': 'traditional cultural folk',
  'Modern Mix': 'modern electronic pop'
};

// Genre-specific track limits as requested
export const genreTrackLimits = {
  'all': 100,
  'classical': 80,
  'popular': 120,
  'rock': 90,
  'folk': 60
};

export async function fetchFreesoundByGenre(
  genre: string,
  apiKey: string,
  limit: number = 20
): Promise<any[]> {
  const query = freesoundGenreQueries[genre as keyof typeof freesoundGenreQueries] || 'music';
  
  return await searchFreesound({
    query,
    filter: 'duration:[30.0 TO 600.0]', // 30 seconds to 10 minutes
    sort: 'downloads_desc',
    page_size: limit
  }, apiKey);
}

// Helper functions to use configured API key
export function getConfiguredApiKey(): string {
  return FREESOUND_CONFIG.apiKey;
}

export async function searchFreesoundWithConfig(search: FreesoundSearch): Promise<any[]> {
  return await searchFreesound(search, FREESOUND_CONFIG.apiKey);
}

export async function fetchFreesoundByGenreWithConfig(
  genre: string,
  limit: number = 20
): Promise<any[]> {
  const query = freesoundGenreQueries[genre as keyof typeof freesoundGenreQueries] || 'music';
  
  console.log(`Searching Freesound for genre: ${genre}, query: ${query}, limit: ${limit}`);
  
  const result = await searchFreesound({
    query,
    filter: 'duration:[30.0 TO 600.0]',
    sort: 'downloads_desc',
    page_size: limit
  }, FREESOUND_CONFIG.apiKey);
  
  console.log(`Freesound search returned ${result.length} tracks for genre: ${genre}`);
  return result;
}

// Fetch tracks for curated playlists
export async function fetchFreesoundByPlaylist(
  playlistName: string,
  limit: number = 25
): Promise<any[]> {
  const query = freesoundPlaylistQueries[playlistName as keyof typeof freesoundPlaylistQueries] || 'music';
  
  return await searchFreesound({
    query,
    filter: 'duration:[30.0 TO 600.0]',
    sort: 'rating_desc', // Use rating for curated playlists
    page_size: limit
  }, FREESOUND_CONFIG.apiKey);
}