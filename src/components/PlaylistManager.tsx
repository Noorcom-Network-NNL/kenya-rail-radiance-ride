import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Music, Users, Lock } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { 
  createPlaylist, 
  getUserPlaylists, 
  getPublicPlaylists, 
  deletePlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  Playlist 
} from '@/lib/firebaseService';
import { useToast } from '@/hooks/use-toast';
import type { JamendoTrack } from '@/lib/jamendo';

interface PlaylistManagerProps {
  currentTrack?: JamendoTrack | null;
}

export function PlaylistManager({ currentTrack }: PlaylistManagerProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [publicPlaylists, setPublicPlaylists] = useState<Playlist[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
    isPublic: false,
    tags: ''
  });

  useEffect(() => {
    if (user) {
      loadPlaylists();
    }
    loadPublicPlaylists();
  }, [user]);

  const loadPlaylists = async () => {
    if (!user) return;
    
    try {
      const userPlaylists = await getUserPlaylists(user.uid);
      setPlaylists(userPlaylists);
    } catch (error) {
      console.error('Error loading playlists:', error);
    }
  };

  const loadPublicPlaylists = async () => {
    try {
      const publicPlaylistsData = await getPublicPlaylists();
      setPublicPlaylists(publicPlaylistsData.slice(0, 6)); // Show only first 6
    } catch (error) {
      console.error('Error loading public playlists:', error);
    }
  };

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPlaylist.name.trim()) return;

    setLoading(true);
    try {
      const playlistData = {
        name: newPlaylist.name.trim(),
        description: newPlaylist.description.trim(),
        tracks: [],
        createdBy: user.uid,
        isPublic: newPlaylist.isPublic,
        tags: newPlaylist.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      await createPlaylist(playlistData);
      
      toast({
        title: "Playlist created!",
        description: `"${newPlaylist.name}" has been created successfully.`,
      });

      setNewPlaylist({ name: '', description: '', isPublic: false, tags: '' });
      setShowCreateForm(false);
      loadPlaylists();
    } catch (error) {
      toast({
        title: "Error creating playlist",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlaylist = async (playlistId: string, playlistName: string) => {
    try {
      await deletePlaylist(playlistId);
      toast({
        title: "Playlist deleted",
        description: `"${playlistName}" has been removed.`,
      });
      loadPlaylists();
    } catch (error) {
      toast({
        title: "Error deleting playlist",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddToPlaylist = async (playlistId: string, playlistName: string) => {
    if (!currentTrack) return;

    try {
      await addTrackToPlaylist(playlistId, currentTrack.id);
      toast({
        title: "Track added!",
        description: `"${currentTrack.name}" added to "${playlistName}".`,
      });
      loadPlaylists();
    } catch (error) {
      toast({
        title: "Error adding track",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardContent className="p-6 text-center">
          <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Sign in to create and manage playlists</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Playlist Form */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              My Playlists ({playlists.length})
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Playlist
            </Button>
          </div>
        </CardHeader>
        
        {showCreateForm && (
          <CardContent className="border-t">
            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="playlist-name">Playlist Name</Label>
                <Input
                  id="playlist-name"
                  placeholder="My Awesome Playlist"
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="playlist-description">Description (Optional)</Label>
                <Textarea
                  id="playlist-description"
                  placeholder="What's this playlist about?"
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="playlist-tags">Tags (Optional)</Label>
                <Input
                  id="playlist-tags"
                  placeholder="travel, relaxing, upbeat (comma separated)"
                  value={newPlaylist.tags}
                  onChange={(e) => setNewPlaylist(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="playlist-public"
                  checked={newPlaylist.isPublic}
                  onCheckedChange={(checked) => setNewPlaylist(prev => ({ ...prev, isPublic: checked }))}
                />
                <Label htmlFor="playlist-public" className="flex items-center gap-2">
                  {newPlaylist.isPublic ? <Users className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  {newPlaylist.isPublic ? 'Public playlist' : 'Private playlist'}
                </Label>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={loading || !newPlaylist.name.trim()}>
                  {loading ? 'Creating...' : 'Create Playlist'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* User's Playlists */}
      {playlists.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="bg-card/60 backdrop-blur-sm border-primary/10">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold truncate">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {playlist.tracks.length} tracks
                    </p>
                    {playlist.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {playlist.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {playlist.isPublic ? (
                      <Users className="h-4 w-4 text-primary" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePlaylist(playlist.id, playlist.name)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {playlist.tags.length > 0 && (
                <CardContent className="pt-0 pb-3">
                  <div className="flex flex-wrap gap-1">
                    {playlist.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              )}
              
              {currentTrack && (
                <CardContent className="pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToPlaylist(playlist.id, playlist.name)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add "{currentTrack.name}"
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Public Playlists */}
      {publicPlaylists.length > 0 && (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Playlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {publicPlaylists.map((playlist) => (
                <Card key={playlist.id} className="bg-accent/10 border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-medium truncate">{playlist.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {playlist.tracks.length} tracks
                    </p>
                    {playlist.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {playlist.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}