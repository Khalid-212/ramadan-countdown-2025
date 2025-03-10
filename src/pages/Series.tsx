
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useTranslation } from "@/hooks/useTranslation";
import { getAllPlaylists } from "@/features/series/utils/seriesUtils";
import { PlaylistCard } from "@/features/series/components/PlaylistCard";
import { Playlist } from "@/features/series/types/seriesTypes";
import { Skeleton } from "@/components/ui/skeleton";

const Series = () => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const data = await getAllPlaylists();
        setPlaylists(data);
        
        // Calculate total episodes across all playlists using the videoCount from YouTube API
        const episodeCount = data.reduce((total, playlist) => {
          // Use videoCount if available, otherwise fallback to videos.length
          const count = playlist.videoCount !== undefined ? playlist.videoCount : playlist.videos.length;
          return total + count;
        }, 0);
        
        setTotalEpisodes(episodeCount);
        
        setError(null);
      } catch (err) {
        setError(t('errorLoadingPlaylists'));
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">{t('playlistsTitle')}</h1>
          {!loading && !error && (
            <div className="text-muted-foreground mt-2 md:mt-0">
              <span className="font-medium">{playlists.length}</span> {t('playlists')} • 
              <span className="font-medium ml-1">{totalEpisodes}</span> {totalEpisodes === 1 ? t('episode') : t('episodes')}
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <Skeleton className="h-[180px] w-full animate-pulse" />
                <div className="p-4">
                  <Skeleton className="h-5 w-2/3 mb-2 animate-pulse" />
                  <Skeleton className="h-4 w-full mb-2 animate-pulse" />
                  <Skeleton className="h-4 w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}

        {!loading && !error && playlists.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">{t('noPlaylistsAvailable')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Series;
