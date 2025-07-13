import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogOut, Heart, History, Settings, HeartOff } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { logOut, updateMusicPreferences, addToFavorites, removeFromFavorites, getListeningHistory, ListeningHistory } from '@/lib/firebaseService';
import { useToast } from '@/hooks/use-toast';

const musicGenres = ['Classical', 'Popular', 'Rock', 'Folk', 'Jazz', 'Electronic', 'World', 'Ambient'];

export function UserProfile() {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(userProfile?.favoriteGenres || []);
  const [listeningHistory, setListeningHistory] = useState<ListeningHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGenreToggle = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(newGenres);
  };

  const handleSavePreferences = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateMusicPreferences(user.uid, selectedGenres);
      toast({
        title: "Preferences saved!",
        description: "Your music preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadListeningHistory = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const history = await getListeningHistory(user.uid, 20);
      setListeningHistory(history);
      setShowHistory(true);
    } catch (error) {
      toast({
        title: "Error loading history",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user || !userProfile) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{userProfile.displayName || 'Railway Passenger'}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Music Preferences */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Music Preferences
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Select your favorite genres to get personalized recommendations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {musicGenres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenres.includes(genre) ? "default" : "outline"}
                size="sm"
                onClick={() => handleGenreToggle(genre)}
                className="justify-start"
              >
                {selectedGenres.includes(genre) ? (
                  <Heart className="h-4 w-4 mr-2 fill-current" />
                ) : (
                  <HeartOff className="h-4 w-4 mr-2" />
                )}
                {genre}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={handleSavePreferences} 
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardContent>
      </Card>

      {/* Listening History */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Listening History
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadListeningHistory}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load History'}
            </Button>
          </div>
        </CardHeader>
        
        {showHistory && (
          <CardContent>
            {listeningHistory.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No listening history yet. Start playing some music!
              </p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {listeningHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.trackName}</h4>
                      <p className="text-sm text-muted-foreground">{item.artistName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.playedAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{selectedGenres.length}</div>
            <p className="text-sm text-muted-foreground">Favorite Genres</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{listeningHistory.length}</div>
            <p className="text-sm text-muted-foreground">Tracks Played</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.floor(listeningHistory.reduce((sum, item) => sum + item.duration, 0) / 60)}
            </div>
            <p className="text-sm text-muted-foreground">Minutes Listened</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}