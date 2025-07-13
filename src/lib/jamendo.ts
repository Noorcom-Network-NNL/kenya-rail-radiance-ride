const JAMENDO_BASE_URL = 'https://api.jamendo.com/v3.0';

export interface JamendoTrack {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  album_name: string;
  image: string;
  audio: string;
  audiodownload: string;
}

export interface JamendoResponse {
  results: JamendoTrack[];
}

export const jamendoGenres = {
  'all': '',
  'classical': 'classical',
  'popular': 'pop',
  'rock': 'rock',
  'folk': 'folk'
};

export async function fetchJamendoTracks(
  genre: string = '', 
  limit: number = 20
): Promise<JamendoTrack[]> {
  try {
    const genreParam = genre ? `&tags=${genre}` : '';
    const url = `${JAMENDO_BASE_URL}/tracks/?client_id=56d30c95&format=jsonpretty&limit=${limit}${genreParam}&include=musicinfo&groupby=artist_id&order=popularity_total`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: JamendoResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching Jamendo tracks:', error);
    return [];
  }
}

export async function searchJamendoTracks(query: string, limit: number = 20): Promise<JamendoTrack[]> {
  try {
    const url = `${JAMENDO_BASE_URL}/tracks/?client_id=56d30c95&format=jsonpretty&limit=${limit}&search=${encodeURIComponent(query)}&include=musicinfo`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: JamendoResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching Jamendo tracks:', error);
    return [];
  }
}