import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Music, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { spotifyAPI, SpotifyConfig } from "@/lib/spotify";
import { useToast } from "@/hooks/use-toast";

interface SpotifySetupProps {
  onComplete: () => void;
}

export function SpotifySetup({ onComplete }: SpotifySetupProps) {
  const [config, setConfig] = useState<SpotifyConfig>({
    clientId: '',
    clientSecret: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.clientId || !config.clientSecret) {
      toast({
        title: "Missing Configuration",
        description: "Please provide both Client ID and Client Secret",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    try {
      spotifyAPI.setConfig(config);
      const success = await spotifyAPI.authenticate();
      
      if (success) {
        toast({
          title: "Connected Successfully",
          description: "Spotify integration is now active"
        });
        onComplete();
      } else {
        toast({
          title: "Connection Failed",
          description: "Please check your credentials and try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to connect to Spotify API",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-elegant border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            Connect to Spotify
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              To stream music from Spotify, you need to create a Spotify App and get your API credentials.
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto ml-1"
                onClick={() => window.open('https://developer.spotify.com/dashboard', '_blank')}
              >
                Get credentials here <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Spotify Client ID</Label>
              <Input
                id="clientId"
                type="text"
                placeholder="Enter your Spotify Client ID"
                value={config.clientId}
                onChange={(e) => setConfig(prev => ({ ...prev, clientId: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientSecret">Spotify Client Secret</Label>
              <Input
                id="clientSecret"
                type="password"
                placeholder="Enter your Spotify Client Secret"
                value={config.clientSecret}
                onChange={(e) => setConfig(prev => ({ ...prev, clientSecret: e.target.value }))}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="premium"
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect to Spotify'}
            </Button>
          </form>

          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>How to get Spotify credentials:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Visit the Spotify Developer Dashboard</li>
              <li>Create a new app</li>
              <li>Copy the Client ID and Client Secret</li>
              <li>Paste them above to connect</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}