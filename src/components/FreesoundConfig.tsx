import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, ExternalLink, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FreesoundConfigProps {
  onApiKeyChange: (apiKey: string) => void;
  currentApiKey?: string;
}

export function FreesoundConfig({ onApiKeyChange, currentApiKey }: FreesoundConfigProps) {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [isValid, setIsValid] = useState(false);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('freesound_api_key', apiKey.trim());
      onApiKeyChange(apiKey.trim());
      setIsValid(true);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('freesound_api_key');
    setApiKey('');
    onApiKeyChange('');
    setIsValid(false);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Freesound.org API Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            To play real music, you need a free Freesound.org API key. 
            <a 
              href="https://freesound.org/help/developers/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 ml-1 text-primary hover:underline"
            >
              Get your API key here <ExternalLink className="h-3 w-3" />
            </a>
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="apiKey">Freesound API Key</Label>
          <div className="flex gap-2">
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Freesound API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
              Save
            </Button>
          </div>
        </div>

        {currentApiKey && (
          <div className="flex items-center justify-between p-3 bg-accent/20 rounded-md">
            <span className="text-sm text-muted-foreground">
              API key configured ✓
            </span>
            <Button variant="outline" size="sm" onClick={handleClearApiKey}>
              Clear
            </Button>
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>How to get your API key:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Create account at freesound.org</li>
            <li>Go to your profile → "Apply for API key"</li>
            <li>Create a new application</li>
            <li>Copy your API key and paste it above</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}