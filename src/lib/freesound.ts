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
  'all': 'music song melody rhythm',
  'classical': 'classical music symphony orchestra piano violin cello chamber string quartet concerto sonata',
  'popular': 'pop music beat rhythm contemporary afrobeat african kwaito amapiano bongo flava taarab benga',
  'rock': 'rock music guitar electric bass drums metal alternative indie punk classic rock',
  'folk': 'folk music traditional acoustic world music african traditional east africa kenya tanzania uganda ethiopia'
};

// Curated playlist queries for specific collections
export const freesoundPlaylistQueries = {
  'Journey Classics': 'classical orchestral symphony travel journey peaceful',
  'African Rhythms': 'african traditional drums percussion rhythm afrobeat kwaito amapiano',
  'Relaxing Melodies': 'ambient peaceful calm relaxing meditation soft piano',
  'Upbeat Travels': 'upbeat energetic travel adventure happy positive rhythm',
  'Gospel Selections': 'gospel spiritual choir hymn praise worship christian',
  'Contemporary Hits': 'contemporary modern pop electronic dance current',
  'Traditional Kenyan': 'kenya kenyan traditional benga taarab folk african heritage',
  'International Favorites': 'world music international global multicultural diverse',
  'Peaceful Moments': 'peaceful calm quiet serene meditation ambient nature',
  'Energetic Beats': 'energetic dance electronic beat rhythm upbeat tempo',
  'Cultural Heritage': 'traditional cultural heritage folk world ethnic ancient',
  'Modern Mix': 'modern contemporary electronic pop rock fusion current'
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
  return await fetchFreesoundByGenre(genre, FREESOUND_CONFIG.apiKey, limit);
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