import { Button } from "@/components/ui/button";
import { Video, Music, User, ListMusic, LogIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AuthForm } from "./AuthForm";
import { useAuth } from "@/contexts/AuthContext";

interface EntertainmentNavProps {
  activeSection: 'music' | 'video' | 'profile' | 'playlists';
  onSectionChange: (section: 'music' | 'video' | 'profile' | 'playlists') => void;
}

export function EntertainmentNav({ activeSection, onSectionChange }: EntertainmentNavProps) {
  const { user } = useAuth();

  const navItems = [
    { id: 'video' as const, label: 'Video Entertainment', icon: Video },
    { id: 'music' as const, label: 'Music Library', icon: Music },
    ...(user ? [
      { id: 'playlists' as const, label: 'My Playlists', icon: ListMusic },
      { id: 'profile' as const, label: 'Profile', icon: User }
    ] : [])
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
      {navItems.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeSection === id ? "premium" : "entertainment"}
          size="lg"
          onClick={() => onSectionChange(id)}
          className="flex items-center gap-2 min-w-[160px]"
        >
          <Icon className="h-5 w-5" />
          {label}
        </Button>
      ))}
      
      {!user && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="premium" size="lg" className="flex items-center gap-2 min-w-[160px]">
              <LogIn className="h-5 w-5" />
              Sign In
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-transparent border-none shadow-none max-w-md">
            <AuthForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}