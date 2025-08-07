export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  genre: string;
  album?: string;
  year?: number;
  audioUrl: string;
  imageUrl: string;
  playlist: string;
  featured: boolean;
  tags: string[];
}

// 2025 Music Playlists as per the document template
export const musicPlaylists = {
  popular: 'Popular Playlist',
  classical: 'Classical Playlist', 
  rock: 'Rock and Roll Playlist',
  folk: 'Folk Customs Playlist'
};

// 2025 Recommended Music Library
export const musicLibrary: MusicTrack[] = [
  // Popular Playlist
  {
    id: 'why-love-asake',
    title: 'Why Love',
    artist: 'Asake',
    duration: 195,
    genre: 'Afrobeats',
    album: 'Mr. Money With The Vibe',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: true,
    tags: ['afrobeats', 'nigerian', 'love', 'popular']
  },
  {
    id: 'laho-shallipopi',
    title: 'Laho',
    artist: 'Shallipopi',
    duration: 168,
    genre: 'Afrobeats',
    album: 'Presido La Pluto',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: true,
    tags: ['afrobeats', 'nigerian', 'street', 'popular']
  },
  {
    id: 'push-2-start-tyla',
    title: 'Push 2 Start',
    artist: 'Tyla',
    duration: 187,
    genre: 'Amapiano',
    album: 'Tyla',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: true,
    tags: ['amapiano', 'south african', 'dance', 'popular']
  },
  {
    id: 'bliss-tyla',
    title: 'Bliss',
    artist: 'Tyla',
    duration: 201,
    genre: 'Amapiano',
    album: 'Tyla',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: false,
    tags: ['amapiano', 'south african', 'chill', 'popular']
  },
  {
    id: 'us-swayvee',
    title: 'US',
    artist: 'Swayvee',
    duration: 156,
    genre: 'Afrobeats',
    album: 'Single',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: false,
    tags: ['afrobeats', 'collaboration', 'love', 'popular']
  },
  {
    id: 'mpishi-matata',
    title: 'Mpishi',
    artist: 'Matata',
    duration: 198,
    genre: 'Bongo Flava',
    album: 'Matata Classics',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: false,
    tags: ['bongo flava', 'tanzanian', 'upbeat', 'popular']
  },
  {
    id: 'me-too-abigail-harmonize',
    title: 'Me Too',
    artist: 'Abigail Chams ft. Harmonize',
    duration: 223,
    genre: 'Bongo Flava',
    album: 'East African Collaboration',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: true,
    tags: ['bongo flava', 'collaboration', 'tanzanian', 'popular']
  },
  {
    id: 'with-you-davido',
    title: 'With You',
    artist: 'Davido',
    duration: 189,
    genre: 'Afrobeats',
    album: 'Timeless',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: true,
    tags: ['afrobeats', 'nigerian', 'love', 'popular']
  },
  {
    id: 'ngishutheni-masterkg-eemoh',
    title: 'Ngishutheni',
    artist: 'Master KG & Eemoh',
    duration: 234,
    genre: 'Amapiano',
    album: 'Amapiano Hits',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: false,
    tags: ['amapiano', 'south african', 'dance', 'popular']
  },
  {
    id: 'katam-bien-diamond',
    title: 'Katam',
    artist: 'Bien ft. Diamond Platnumz',
    duration: 212,
    genre: 'Afrobeats',
    album: 'East African Unity',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'popular',
    featured: true,
    tags: ['afrobeats', 'collaboration', 'kenyan', 'tanzanian', 'popular']
  },

  // Classical Playlist
  {
    id: 'symphony-5-beethoven',
    title: 'Symphony No.5',
    artist: 'Beethoven',
    duration: 1980, // 33 minutes
    genre: 'Classical',
    album: 'Beethoven Symphonies',
    year: 1808,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: true,
    tags: ['classical', 'symphony', 'beethoven', 'orchestral']
  },
  {
    id: 'canon-d-pachelbel',
    title: 'Canon in D',
    artist: 'Pachelbel',
    duration: 360,
    genre: 'Classical',
    album: 'Baroque Masterpieces',
    year: 1680,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: true,
    tags: ['classical', 'baroque', 'pachelbel', 'wedding']
  },
  {
    id: 'four-seasons-spring-vivaldi',
    title: 'Four Seasons: Spring',
    artist: 'Vivaldi',
    duration: 600,
    genre: 'Classical',
    album: 'The Four Seasons',
    year: 1725,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: true,
    tags: ['classical', 'baroque', 'vivaldi', 'concerto']
  },
  {
    id: 'nocturne-op9-chopin',
    title: 'Nocturne Op.9 No.2',
    artist: 'Chopin',
    duration: 270,
    genre: 'Classical',
    album: 'Chopin Nocturnes',
    year: 1832,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: false,
    tags: ['classical', 'romantic', 'chopin', 'piano']
  },
  {
    id: 'clair-de-lune-debussy',
    title: 'Clair de Lune',
    artist: 'Debussy',
    duration: 300,
    genre: 'Classical',
    album: 'Suite Bergamasque',
    year: 1905,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: true,
    tags: ['classical', 'impressionist', 'debussy', 'piano']
  },
  {
    id: 'swan-lake-tchaikovsky',
    title: 'Swan Lake',
    artist: 'Tchaikovsky',
    duration: 1200,
    genre: 'Classical',
    album: 'Swan Lake Ballet',
    year: 1876,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: false,
    tags: ['classical', 'ballet', 'tchaikovsky', 'orchestral']
  },
  {
    id: 'hungarian-dance-5-brahms',
    title: 'Hungarian Dance No.5',
    artist: 'Brahms',
    duration: 150,
    genre: 'Classical',
    album: 'Hungarian Dances',
    year: 1869,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: false,
    tags: ['classical', 'romantic', 'brahms', 'dance']
  },
  {
    id: 'eine-kleine-nachtmusik-mozart',
    title: 'Eine kleine Nachtmusik',
    artist: 'Mozart',
    duration: 1080,
    genre: 'Classical',
    album: 'Mozart Serenades',
    year: 1787,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: true,
    tags: ['classical', 'mozart', 'serenade', 'orchestral']
  },
  {
    id: 'ave-maria-schubert',
    title: 'Ave Maria',
    artist: 'Schubert',
    duration: 240,
    genre: 'Classical',
    album: 'Schubert Lieder',
    year: 1825,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: false,
    tags: ['classical', 'romantic', 'schubert', 'vocal']
  },
  {
    id: 'moonlight-sonata-beethoven',
    title: 'Moonlight Sonata',
    artist: 'Beethoven',
    duration: 900,
    genre: 'Classical',
    album: 'Beethoven Piano Sonatas',
    year: 1801,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'classical',
    featured: true,
    tags: ['classical', 'romantic', 'beethoven', 'piano']
  },

  // Rock and Roll Playlist
  {
    id: 'sweet-child-guns-roses',
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    duration: 356,
    genre: 'Rock',
    album: 'Appetite for Destruction',
    year: 1987,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: true,
    tags: ['rock', 'classic rock', 'guns n roses', 'guitar']
  },
  {
    id: 'hotel-california-eagles',
    title: 'Hotel California',
    artist: 'Eagles',
    duration: 391,
    genre: 'Rock',
    album: 'Hotel California',
    year: 1976,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: true,
    tags: ['rock', 'classic rock', 'eagles', 'guitar solo']
  },
  {
    id: 'bohemian-rhapsody-queen',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: 355,
    genre: 'Rock',
    album: 'A Night at the Opera',
    year: 1975,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: true,
    tags: ['rock', 'progressive rock', 'queen', 'opera']
  },
  {
    id: 'highway-to-hell-acdc',
    title: 'Highway to Hell',
    artist: 'AC/DC',
    duration: 208,
    genre: 'Rock',
    album: 'Highway to Hell',
    year: 1979,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: false,
    tags: ['rock', 'hard rock', 'ac/dc', 'heavy']
  },
  {
    id: 'born-to-be-wild-steppenwolf',
    title: 'Born to Be Wild',
    artist: 'Steppenwolf',
    duration: 208,
    genre: 'Rock',
    album: 'Steppenwolf',
    year: 1968,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: false,
    tags: ['rock', 'classic rock', 'steppenwolf', 'biker']
  },
  {
    id: 'back-in-black-acdc',
    title: 'Back in Black',
    artist: 'AC/DC',
    duration: 255,
    genre: 'Rock',
    album: 'Back in Black',
    year: 1980,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: true,
    tags: ['rock', 'hard rock', 'ac/dc', 'anthem']
  },
  {
    id: 'smoke-on-the-water-deep-purple',
    title: 'Smoke on the Water',
    artist: 'Deep Purple',
    duration: 340,
    genre: 'Rock',
    album: 'Machine Head',
    year: 1972,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: false,
    tags: ['rock', 'hard rock', 'deep purple', 'guitar riff']
  },
  {
    id: 'satisfaction-rolling-stones',
    title: 'Satisfaction',
    artist: 'Rolling Stones',
    duration: 223,
    genre: 'Rock',
    album: 'Out of Our Heads',
    year: 1965,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: true,
    tags: ['rock', 'classic rock', 'rolling stones', 'blues rock']
  },
  {
    id: 'stairway-to-heaven-led-zeppelin',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    duration: 482,
    genre: 'Rock',
    album: 'Led Zeppelin IV',
    year: 1971,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: true,
    tags: ['rock', 'classic rock', 'led zeppelin', 'epic']
  },
  {
    id: 'thunderstruck-acdc',
    title: 'Thunderstruck',
    artist: 'AC/DC',
    duration: 292,
    genre: 'Rock',
    album: 'The Razors Edge',
    year: 1990,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'rock',
    featured: false,
    tags: ['rock', 'hard rock', 'ac/dc', 'thunder']
  },

  // Folk Customs Playlist
  {
    id: 'malaika-fadhili-williams',
    title: 'Malaika',
    artist: 'Fadhili Williams',
    duration: 198,
    genre: 'Folk',
    album: 'East African Classics',
    year: 1960,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: true,
    tags: ['folk', 'kenyan', 'swahili', 'love song']
  },
  {
    id: 'gospel-groove-sarah-k',
    title: 'Gospel Groove',
    artist: 'Sarah K',
    duration: 245,
    genre: 'Gospel',
    album: 'Kenyan Gospel Hits',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: false,
    tags: ['gospel', 'kenyan', 'contemporary', 'spiritual']
  },
  {
    id: 'nasema-asante-eunice-njeri',
    title: 'Nasema Asante',
    artist: 'Eunice Njeri',
    duration: 267,
    genre: 'Gospel',
    album: 'Praise Collection',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: true,
    tags: ['gospel', 'kenyan', 'praise', 'thanksgiving']
  },
  {
    id: 'hakuna-mungu-gospel-choir',
    title: 'Hakuna Mungu Kama Wewe',
    artist: 'Kenyan Gospel Choir',
    duration: 312,
    genre: 'Gospel',
    album: 'Choir Classics',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: false,
    tags: ['gospel', 'kenyan', 'choir', 'worship']
  },
  {
    id: 'kigeugeu-jaguar',
    title: 'Kigeugeu',
    artist: 'Jaguar',
    duration: 189,
    genre: 'Kenyan Pop',
    album: 'Kenyan Hits',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: false,
    tags: ['kenyan pop', 'dancehall', 'local', 'upbeat']
  },
  {
    id: 'oyole-ayub-ogada',
    title: 'Oyole',
    artist: 'Ayub Ogada',
    duration: 256,
    genre: 'Folk',
    album: 'Traditional African Music',
    year: 1990,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: true,
    tags: ['folk', 'kenyan', 'traditional', 'luo']
  },
  {
    id: 'wimbo-wa-taifa-kenya-anthem',
    title: 'Wimbo Wa Taifa',
    artist: 'Kenya Anthem',
    duration: 120,
    genre: 'National',
    album: 'National Songs',
    year: 1963,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: true,
    tags: ['national anthem', 'kenyan', 'patriotic', 'official']
  },
  {
    id: 'lelo-ni-lelo-franco',
    title: 'Lelo ni Lelo',
    artist: 'Franco',
    duration: 432,
    genre: 'Lingala',
    album: 'Franco Classics',
    year: 1980,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: false,
    tags: ['lingala', 'congolese', 'franco', 'classic']
  },
  {
    id: 'nyumba-ya-mumbi-mugithi',
    title: 'Nyumba ya Mumbi',
    artist: 'Mugithi Style',
    duration: 298,
    genre: 'Mugithi',
    album: 'Kikuyu Folk',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: false,
    tags: ['mugithi', 'kikuyu', 'traditional', 'folk']
  },
  {
    id: 'safari-ya-bamba-bomas',
    title: 'Safari ya Bamba',
    artist: 'Bomas Dancers',
    duration: 367,
    genre: 'Traditional',
    album: 'Kenyan Traditional Dances',
    year: 2025,
    audioUrl: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    playlist: 'folk',
    featured: true,
    tags: ['traditional', 'dance', 'kenyan', 'cultural']
  }
];

// Utility functions
export const getTracksByPlaylist = (playlist: string): MusicTrack[] => {
  return musicLibrary.filter(track => track.playlist === playlist);
};

export const getTrackById = (id: string): MusicTrack | undefined => {
  return musicLibrary.find(track => track.id === id);
};

export const getTracksByGenre = (genre: string): MusicTrack[] => {
  return musicLibrary.filter(track => 
    track.genre.toLowerCase() === genre.toLowerCase()
  );
};

export const getFeaturedTracks = (): MusicTrack[] => {
  return musicLibrary.filter(track => track.featured);
};

export const getTracksByTags = (tags: string[]): MusicTrack[] => {
  return musicLibrary.filter(track => 
    tags.some(tag => track.tags.some(trackTag => 
      trackTag.toLowerCase().includes(tag.toLowerCase())
    ))
  );
};

export const searchTracks = (query: string): MusicTrack[] => {
  const searchTerm = query.toLowerCase();
  return musicLibrary.filter(track =>
    track.title.toLowerCase().includes(searchTerm) ||
    track.artist.toLowerCase().includes(searchTerm) ||
    track.album?.toLowerCase().includes(searchTerm) ||
    track.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};