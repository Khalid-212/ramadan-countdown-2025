
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useTranslation } from "@/hooks/useTranslation";
import { getPlaylistById } from "@/features/series/utils/seriesUtils";
import { VideoPlayer } from "@/features/series/components/VideoPlayer";
import { Video, Playlist } from "@/features/series/types/seriesTypes";
import { useToast } from "@/hooks/use-toast";
import { PlaylistHeader } from "@/features/series/components/PlaylistHeader";
import { PlaylistVideoList } from "@/features/series/components/PlaylistVideoList";
import { SeriesDetailSkeleton } from "@/features/series/components/SeriesDetailSkeleton";
import { SeriesDetailError } from "@/features/series/components/SeriesDetailError";
import { VideoPagination } from "@/features/series/components/VideoPagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const SeriesDetail = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(8);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!playlistId) return;
      
      try {
        setLoading(true);
        const data = await getPlaylistById(playlistId);
        if (data) {
          setPlaylist(data);
          setError(null);
          
          if (data.videos.length === 0) {
            toast({
              title: "No videos found",
              description: "This playlist doesn't contain any videos or there was an error fetching them.",
              variant: "destructive",
            });
          }
        } else {
          setError("Playlist not found");
          toast({
            title: "Error",
            description: "Playlist not found",
            variant: "destructive",
          });
        }
      } catch (err) {
        setError("Error loading playlist");
        toast({
          title: "Error",
          description: "Failed to load playlist data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId, t, toast]);

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
    setVideoDialogOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoDialogOpen(false);
  };

  // Get current videos for pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = playlist?.videos ? playlist.videos.slice(indexOfFirstVideo, indexOfLastVideo) : [];
  const totalPages = playlist?.videos ? Math.ceil(playlist.videos.length / videosPerPage) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of video list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {loading ? (
        <SeriesDetailSkeleton />
      ) : error || !playlist ? (
        <SeriesDetailError error={error} />
      ) : (
        <div className="container mx-auto px-4 pt-24 pb-10">
          <div className="mb-6">
            <Link to="/series">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                {t('backToSeries')}
              </Button>
            </Link>
          </div>
          
          <PlaylistHeader playlist={playlist} episodeCount={playlist.videos.length} />
          <PlaylistVideoList videos={currentVideos} onPlayVideo={handlePlayVideo} />
          
          {totalPages > 1 && (
            <VideoPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
          
          <VideoPlayer 
            video={selectedVideo} 
            open={videoDialogOpen} 
            onClose={handleCloseVideo}
          />
        </div>
      )}
    </div>
  );
};

export default SeriesDetail;
