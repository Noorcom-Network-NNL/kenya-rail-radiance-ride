import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  deleteDoc,
  arrayUnion,
  arrayRemove 
} from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  favoriteGenres: string[];
  createdAt: Date;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: string[];
  createdBy: string;
  createdAt: Date;
  isPublic: boolean;
  tags: string[];
}

export interface ListeningHistory {
  id: string;
  userId: string;
  trackId: string;
  trackName: string;
  artistName: string;
  playedAt: Date;
  duration: number;
}

// Authentication
export const signUp = async (email: string, password: string, displayName?: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      displayName: displayName || '',
      favoriteGenres: [],
      createdAt: new Date()
    });
    
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// User Profile Management
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, updates);
  } catch (error) {
    throw error;
  }
};

// Playlist Management
export const createPlaylist = async (playlist: Omit<Playlist, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'playlists'), {
      ...playlist,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getUserPlaylists = async (userId: string): Promise<Playlist[]> => {
  try {
    const q = query(
      collection(db, 'playlists'),
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Playlist));
  } catch (error) {
    console.error('Error getting user playlists:', error);
    return [];
  }
};

export const getPublicPlaylists = async (): Promise<Playlist[]> => {
  try {
    const q = query(
      collection(db, 'playlists'),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Playlist));
  } catch (error) {
    console.error('Error getting public playlists:', error);
    return [];
  }
};

export const addTrackToPlaylist = async (playlistId: string, trackId: string) => {
  try {
    const playlistRef = doc(db, 'playlists', playlistId);
    await updateDoc(playlistRef, {
      tracks: arrayUnion(trackId)
    });
  } catch (error) {
    throw error;
  }
};

export const removeTrackFromPlaylist = async (playlistId: string, trackId: string) => {
  try {
    const playlistRef = doc(db, 'playlists', playlistId);
    await updateDoc(playlistRef, {
      tracks: arrayRemove(trackId)
    });
  } catch (error) {
    throw error;
  }
};

export const deletePlaylist = async (playlistId: string) => {
  try {
    await deleteDoc(doc(db, 'playlists', playlistId));
  } catch (error) {
    throw error;
  }
};

// Listening History
export const addToListeningHistory = async (
  userId: string, 
  trackId: string, 
  trackName: string, 
  artistName: string, 
  duration: number
) => {
  try {
    await addDoc(collection(db, 'listeningHistory'), {
      userId,
      trackId,
      trackName,
      artistName,
      playedAt: new Date(),
      duration
    });
  } catch (error) {
    console.error('Error adding to listening history:', error);
  }
};

export const getListeningHistory = async (userId: string, limit: number = 50): Promise<ListeningHistory[]> => {
  try {
    const q = query(
      collection(db, 'listeningHistory'),
      where('userId', '==', userId),
      orderBy('playedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ListeningHistory));
  } catch (error) {
    console.error('Error getting listening history:', error);
    return [];
  }
};

// Favorites
export const addToFavorites = async (userId: string, trackId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      favorites: arrayUnion(trackId)
    });
  } catch (error) {
    throw error;
  }
};

export const removeFromFavorites = async (userId: string, trackId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      favorites: arrayRemove(trackId)
    });
  } catch (error) {
    throw error;
  }
};

// Music Preferences
export const updateMusicPreferences = async (userId: string, genres: string[]) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      favoriteGenres: genres
    });
  } catch (error) {
    throw error;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};