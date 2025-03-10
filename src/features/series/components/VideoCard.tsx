
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Video } from "../types/seriesTypes";
import { useTranslation } from "@/hooks/useTranslation";

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden group cursor-pointer" onClick={() => onPlay(video)}>
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="bg-primary rounded-full p-3">
            <Play className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-base">{video.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">{video.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full"
          onClick={() => onPlay(video)}
        >
          <Play className="mr-2 h-4 w-4" />
          {t('watchNow')}
        </Button>
      </CardContent>
    </Card>
  );
};
