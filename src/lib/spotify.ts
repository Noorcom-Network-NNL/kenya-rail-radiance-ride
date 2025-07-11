// Spotify Web API integration
export interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string; height: number; width: number }>;
  tracks: {
    total: number;
  };
}

class SpotifyAPI {
  private accessToken: string | null = null;
  private config: SpotifyConfig | null = null;

  constructor() {
    this.loadConfig();
    this.loadToken();
  }

  private loadConfig() {
    const stored = localStorage.getItem('spotify-config');
    if (stored) {
      this.config = JSON.parse(stored);
    }
  }

  private saveConfig(config: SpotifyConfig) {
    this.config = config;
    localStorage.setItem('spotify-config', JSON.stringify(config));
  }

  private loadToken() {
    this.accessToken = localStorage.getItem('spotify-token');
  }

  private saveToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('spotify-token', token);
  }

  setConfig(config: SpotifyConfig) {
    this.saveConfig(config);
  }

  getConfig(): SpotifyConfig | null {
    return this.config;
  }

  async authenticate(): Promise<boolean> {
    if (!this.config) {
      throw new Error('Spotify configuration not set');
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${this.config.clientId}:${this.config.clientSecret}`)}`
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      this.saveToken(data.access_token);
      return true;
    } catch (error) {
      console.error('Spotify authentication error:', error);
      return false;
    }
  }

  private async makeRequest(url: string) {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    if (response.status === 401) {
      // Token expired, try to re-authenticate
      const authSuccess = await this.authenticate();
      if (authSuccess) {
        return this.makeRequest(url);
      }
      throw new Error('Authentication failed');
    }

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }

  async searchTracks(query: string, limit: number = 20): Promise<SpotifyTrack[]> {
    const encodedQuery = encodeURIComponent(query);
    const data = await this.makeRequest(
      `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=${limit}`
    );
    return data.tracks.items;
  }

  async getFeaturedPlaylists(limit: number = 20): Promise<SpotifyPlaylist[]> {
    const data = await this.makeRequest(
      `https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}`
    );
    return data.playlists.items;
  }

  async getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
    const data = await this.makeRequest(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    );
    return data.items.map((item: any) => item.track).filter((track: any) => track);
  }

  async getGenreSeeds(): Promise<string[]> {
    const data = await this.makeRequest(
      'https://api.spotify.com/v1/recommendations/available-genre-seeds'
    );
    return data.genres;
  }

  async getRecommendations(genres: string[], limit: number = 20): Promise<SpotifyTrack[]> {
    const genreQuery = genres.join(',');
    const data = await this.makeRequest(
      `https://api.spotify.com/v1/recommendations?seed_genres=${genreQuery}&limit=${limit}`
    );
    return data.tracks;
  }

  isConfigured(): boolean {
    return this.config !== null;
  }

  isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  clearConfig() {
    this.config = null;
    this.accessToken = null;
    localStorage.removeItem('spotify-config');
    localStorage.removeItem('spotify-token');
  }
}

export const spotifyAPI = new SpotifyAPI();