const SPOTIFY_CLIENT_ID = 'c9be591c4f124a3ca50bfc3da5f3cbad';
const SPOTIFY_REDIRECT_URI = 'https://onboardkenyarailways.co.ke/callback';
const SPOTIFY_SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative'
].join(' ');

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  duration_ms: number;
  preview_url: string | null;
  uri: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { total: number };
}

class SpotifyService {
  private accessToken: string | null = null;

  constructor() {
    this.accessToken = localStorage.getItem('spotify_access_token');
  }

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'token',
      redirect_uri: SPOTIFY_REDIRECT_URI,
      scope: SPOTIFY_SCOPES,
      show_dialog: 'true'
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem('spotify_access_token', token);
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  private async makeRequest(endpoint: string): Promise<any> {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        throw new Error('Token expired');
      }
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json();
  }

  async searchTracks(query: string, limit: number = 20): Promise<SpotifyTrack[]> {
    const data = await this.makeRequest(`/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`);
    return data.tracks.items;
  }

  async getTracksByGenre(genre: string, limit: number = 20): Promise<SpotifyTrack[]> {
    const genreMap: { [key: string]: string } = {
      'classical': 'classical',
      'popular': 'pop',
      'rock': 'rock',
      'folk': 'folk'
    };

    const spotifyGenre = genreMap[genre] || genre;
    const data = await this.makeRequest(`/search?q=genre:${spotifyGenre}&type=track&limit=${limit}`);
    return data.tracks.items;
  }

  async getFeaturedPlaylists(): Promise<SpotifyPlaylist[]> {
    const data = await this.makeRequest('/browse/featured-playlists?limit=12');
    return data.playlists.items;
  }

  async getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
    const data = await this.makeRequest(`/playlists/${playlistId}/tracks`);
    return data.items.map((item: any) => item.track);
  }

  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('spotify_access_token');
  }
}

export const spotifyService = new SpotifyService();