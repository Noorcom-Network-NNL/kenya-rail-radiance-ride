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

// Demo tracks with public domain/free audio samples
const mockTracks: JamendoTrack[] = [
  // East African Bongo Hits (Demo with placeholder audio)
  {
    id: '1',
    name: 'Waah! (Demo)',
    duration: 256,
    artist_name: 'Diamond Platnumz Style',
    album_name: 'East African Hits',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '2',
    name: 'African Beauty (Demo)',
    duration: 223,
    artist_name: 'Harmonize Style',
    album_name: 'Bongo Flava',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '3',
    name: 'Tetema (Demo)',
    duration: 234,
    artist_name: 'Rayvanny Style',
    album_name: 'East African Beats',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '4',
    name: 'Kwangwaru (Demo)',
    duration: 245,
    artist_name: 'Zuchu Style',
    album_name: 'Bongo Stars',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '5',
    name: 'Hainistui (Demo)',
    duration: 267,
    artist_name: 'Mbosso Style',
    album_name: 'Definition of Love',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  // International Popular Hits (Demo)
  {
    id: '6',
    name: 'Shape of You (Demo)',
    duration: 263,
    artist_name: 'Ed Sheeran Style',
    album_name: '÷ (Divide)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '7',
    name: 'Blinding Lights (Demo)',
    duration: 200,
    artist_name: 'The Weeknd Style',
    album_name: 'After Hours',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '8',
    name: 'Levitating (Demo)',
    duration: 203,
    artist_name: 'Dua Lipa Style',
    album_name: 'Future Nostalgia',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '9',
    name: 'Stay (Demo)',
    duration: 141,
    artist_name: 'The Kid LAROI Style',
    album_name: 'Global Hits',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '10',
    name: 'As It Was (Demo)',
    duration: 167,
    artist_name: 'Harry Styles Style',
    album_name: 'Harry\'s House',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  // Folk & Traditional
  {
    id: '11',
    name: 'Malaika (Demo)',
    duration: 198,
    artist_name: 'Fadhili William Style',
    album_name: 'East African Classics',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '12',
    name: 'Tulia (Demo)',
    duration: 312,
    artist_name: 'Kenya Traditional Ensemble',
    album_name: 'Folk Heritage',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  // Classical
  {
    id: '13',
    name: 'Für Elise (Demo)',
    duration: 195,
    artist_name: 'Ludwig van Beethoven',
    album_name: 'Classical Masterpieces',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  {
    id: '14',
    name: 'Canon in D (Demo)',
    duration: 423,
    artist_name: 'Johann Pachelbel',
    album_name: 'Baroque Collection',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  },
  // Rock
  {
    id: '15',
    name: 'Bohemian Rhapsody (Demo)',
    duration: 355,
    artist_name: 'Queen Style',
    album_name: 'A Night at the Opera',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    audiodownload: ''
  }
];

export async function fetchJamendoTracks(
  genre: string = '', 
  limit: number = 20
): Promise<JamendoTrack[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter mock tracks by genre if specified
  let filteredTracks = mockTracks;
  if (genre && genre !== '') {
    switch(genre.toLowerCase()) {
      case 'pop':
      case 'popular':
        filteredTracks = mockTracks.filter(track => 
          track.album_name.includes('Bongo') || 
          track.album_name.includes('Hits') || 
          track.album_name.includes('Global') ||
          track.album_name.includes('Future') ||
          track.artist_name.includes('Diamond') ||
          track.artist_name.includes('Ed Sheeran') ||
          track.artist_name.includes('The Weeknd') ||
          track.artist_name.includes('Dua Lipa') ||
          track.artist_name.includes('Harry Styles')
        );
        break;
      case 'classical':
        filteredTracks = mockTracks.filter(track => 
          track.album_name.includes('Classical') || 
          track.album_name.includes('Baroque') ||
          track.artist_name.includes('Beethoven') ||
          track.artist_name.includes('Pachelbel')
        );
        break;
      case 'rock':
        filteredTracks = mockTracks.filter(track => 
          track.artist_name.includes('Queen') ||
          track.album_name.includes('Opera')
        );
        break;
      case 'folk':
        filteredTracks = mockTracks.filter(track => 
          track.album_name.includes('Heritage') || 
          track.album_name.includes('Classics') ||
          track.artist_name.includes('Traditional') ||
          track.artist_name.includes('Fadhili')
        );
        break;
      default:
        filteredTracks = mockTracks;
    }
  }
  
  return filteredTracks.slice(0, limit);
}

export async function searchJamendoTracks(query: string, limit: number = 20): Promise<JamendoTrack[]> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const filteredTracks = mockTracks.filter(track =>
    track.name.toLowerCase().includes(query.toLowerCase()) ||
    track.artist_name.toLowerCase().includes(query.toLowerCase()) ||
    track.album_name.toLowerCase().includes(query.toLowerCase())
  );
  
  return filteredTracks.slice(0, limit);
}