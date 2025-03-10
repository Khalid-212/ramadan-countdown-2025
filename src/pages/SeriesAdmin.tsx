import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import AddPlaylistForm from "@/features/series/components/AddPlaylistForm";
import PlaylistList from "@/features/series/components/PlaylistList";

// Define a type for the database record format
interface PlaylistRecord {
  id: string;
  title: string;
  description: string | null;
  playlist_url: string;
  thumbnail_url: string | null;
  created_at: string;
}

const SeriesAdmin = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistRecord[]>([]);

  // Fetch existing playlists
  const fetchPlaylists = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('youtube_playlists')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setPlaylists(data || []);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      toast({
        title: t('error'),
        description: t('errorLoadingPlaylists'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/series">
            <Button variant="ghost" className="pl-0">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t('backToSeries')}
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={fetchPlaylists} 
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {t('refresh')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add new playlist form */}
          <AddPlaylistForm 
            onSuccess={fetchPlaylists} 
            isLoading={isLoading} 
            setIsLoading={setIsLoading} 
          />

          {/* Existing playlists */}
          <PlaylistList 
            playlists={playlists} 
            onPlaylistDeleted={fetchPlaylists} 
            isLoading={isLoading} 
            setIsLoading={setIsLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default SeriesAdmin;
