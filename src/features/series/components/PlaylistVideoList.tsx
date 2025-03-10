
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { VideoCard } from "./VideoCard";
import { Video } from "../types/seriesTypes";

interface PlaylistVideoListProps {
  videos: Video[];
  onPlayVideo: (video: Video) => void;
}

export const PlaylistVideoList: React.FC<PlaylistVideoListProps> = ({ videos, onPlayVideo }) => {
  const { t } = useTranslation();
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t('episodes')}</h2>
      {videos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">{t('noVideosAvailable')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onPlay={onPlayVideo}
            />
          ))}
        </div>
      )}
    </>
  );
};
