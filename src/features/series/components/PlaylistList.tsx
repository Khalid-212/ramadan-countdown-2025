
import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";

interface PlaylistRecord {
  id: string;
  title: string;
  description: string | null;
  playlist_url: string;
  thumbnail_url: string | null;
  created_at: string;
}

interface PlaylistListProps {
  playlists: PlaylistRecord[];
  onPlaylistDeleted: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PlaylistList = ({ playlists, onPlaylistDeleted, isLoading, setIsLoading }: PlaylistListProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  // Delete playlist
  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDeletePlaylist'))) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('youtube_playlists')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: t('success'),
        description: t('playlistDeleted'),
      });
      
      // Refresh playlist list
      onPlaylistDeleted();
    } catch (error) {
      console.error("Error deleting playlist:", error);
      toast({
        title: t('error'),
        description: t('errorDeletingPlaylist'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('existingPlaylists')}</h2>
      {playlists.length === 0 ? (
        <div className="text-center py-10 bg-muted rounded-lg">
          <p className="text-muted-foreground">{t('noPlaylistsYet')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 aspect-video">
                  <img 
                    src={playlist.thumbnail_url || "https://via.placeholder.com/640x360?text=No+Thumbnail"} 
                    alt={playlist.title} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/640x360?text=No+Thumbnail";
                    }}
                  />
                </div>
                <div className="p-4 sm:w-2/3 flex flex-col">
                  <h3 className="font-semibold">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {playlist.description || t('noDescription')}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2 break-all">
                    {playlist.playlist_url}
                  </p>
                  <div className="mt-auto flex justify-end gap-2">
                    <Link to={`/series/${playlist.id}`}>
                      <Button variant="secondary" size="sm">
                        {t('view')}
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(playlist.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistList;
