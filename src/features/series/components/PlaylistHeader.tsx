
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Playlist } from "../types/seriesTypes";
import { useTranslation } from "@/hooks/useTranslation";

interface PlaylistHeaderProps {
  playlist: Playlist;
  episodeCount?: number;
}

export const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ playlist, episodeCount = 0 }) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-6 mb-4">
        <div className="w-full md:w-1/3 lg:w-1/4 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={playlist.thumbnailUrl} 
            alt={playlist.title} 
            className="w-full h-auto object-cover aspect-video"
            loading="eager"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{playlist.title}</h1>
          <div className="text-sm text-muted-foreground mb-4">
            {episodeCount > 0 ? (
              <span className="badge bg-primary/20 text-primary px-2 py-1 rounded-full">
                {episodeCount} {episodeCount === 1 ? t('episode') : t('episodes')}
              </span>
            ) : null}
          </div>
          <p className="text-muted-foreground mb-4 line-clamp-4 md:line-clamp-none">
            {playlist.description || t('noDescription')}
          </p>
          <Button variant="outline" size="sm" asChild>
            <a 
              href={playlist.playlistUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              {t('viewOnYouTube')}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
