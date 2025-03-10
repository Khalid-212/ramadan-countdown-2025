
import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Video } from "../types/seriesTypes";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VideoPlayerProps {
  video: Video | null;
  open: boolean;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, open, onClose }) => {
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll position when video changes
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTop = 0;
    }
  }, [video]);

  if (!video) return null;

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
  };

  const videoId = getYouTubeVideoId(video.videoUrl);
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent 
        className="max-w-4xl w-[95vw] p-0 overflow-hidden"
        ref={dialogContentRef}
      >
        <DialogHeader className="p-4 md:p-6">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl mr-8">{video.title}</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              aria-label="Close"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
            title={video.title}
            loading="eager"
          ></iframe>
        </div>
        
        {video.description && (
          <ScrollArea className="p-4 md:p-6 max-h-[30vh]">
            <div className="text-sm whitespace-pre-line text-muted-foreground">
              {video.description}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
