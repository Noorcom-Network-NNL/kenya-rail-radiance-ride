import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, ExternalLink } from "lucide-react";
import { spotifyService } from "@/lib/spotify";
import { useToast } from "@/hooks/use-toast";

interface SpotifyAuthProps {
  onAuthSuccess: () => void;
}

export function SpotifyAuth({ onAuthSuccess }: SpotifyAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for access token in URL hash (from Spotify redirect)
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      
      if (accessToken) {
        spotifyService.setAccessToken(accessToken);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        toast({
          title: "Connected to Spotify",
          description: "You can now browse and play music from Spotify.",
        });
        onAuthSuccess();
      }
    }
  }, [onAuthSuccess, toast]);

  const handleLogin = () => {
    setIsLoading(true);
    const authUrl = spotifyService.getAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <Card className="bg-gradient-elegant border-primary/20 max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Music className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Connect to Spotify</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          Connect your Spotify account to stream music during your journey
        </p>
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          size="lg"
          className="w-full"
          variant="premium"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          {isLoading ? "Connecting..." : "Connect Spotify"}
        </Button>
        <p className="text-xs text-muted-foreground">
          You'll be redirected to Spotify to authorize access
        </p>
      </CardContent>
    </Card>
  );
}