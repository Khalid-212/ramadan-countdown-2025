
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Playlist } from "../types/seriesTypes";
import { useTranslation } from "@/hooks/useTranslation";

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const { t } = useTranslation();
  
  // Use videoCount from YouTube API if available, otherwise fallback to videos array length
  const episodeCount = playlist.videoCount !== undefined ? playlist.videoCount : playlist.videos.length;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={playlist.thumbnailUrl} 
          alt={playlist.title} 
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {episodeCount} {episodeCount === 1 ? t('episode') : t('episodes')}
        </div>
      </div>
      <CardHeader className="p-4 flex-shrink-0">
        <CardTitle className="text-lg line-clamp-1">{playlist.title}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[40px]">{playlist.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground">
          {episodeCount} {episodeCount === 1 ? t('episode') : t('episodes')}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link to={`/series/${playlist.id}`} className="w-full">
          <Button variant="default" className="w-full">
            <Play className="mr-2 h-4 w-4" />
            {t('watchNow')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
