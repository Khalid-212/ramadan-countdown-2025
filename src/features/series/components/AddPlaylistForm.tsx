
import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { extractPlaylistId } from "@/features/series/utils/youtubeUtils";

interface AddPlaylistFormProps {
  onSuccess: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AddPlaylistForm = ({ onSuccess, isLoading, setIsLoading }: AddPlaylistFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    playlistUrl: "",
    thumbnailUrl: ""
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Auto-fetch YouTube playlist details
  const fetchPlaylistDetails = async () => {
    if (!formData.playlistUrl) {
      toast({
        title: t('error'),
        description: t('enterPlaylistUrlFirst'),
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const playlistId = extractPlaylistId(formData.playlistUrl);
      
      if (!playlistId) {
        toast({
          title: t('error'),
          description: t('invalidPlaylistUrl'),
          variant: "destructive"
        });
        return;
      }

      // Call our edge function to fetch playlist details
      const { data, error } = await supabase.functions.invoke('fetch-youtube-playlist-details', {
        body: { playlistId }
      });
      
      if (error) throw error;
      
      if (data && data.title) {
        setFormData({
          ...formData,
          title: data.title,
          description: data.description || "",
          thumbnailUrl: data.thumbnailUrl || ""
        });
        
        toast({
          title: t('success'),
          description: t('playlistDetailsFetched'),
        });
      }
    } catch (error) {
      console.error("Error fetching playlist details:", error);
      toast({
        title: t('error'),
        description: t('errorFetchingPlaylistDetails'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add new playlist
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.playlistUrl) {
      toast({
        title: t('error'),
        description: t('titleAndUrlRequired'),
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('youtube_playlists')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            playlist_url: formData.playlistUrl,
            thumbnail_url: formData.thumbnailUrl
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: t('success'),
        description: t('playlistAdded'),
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        playlistUrl: "",
        thumbnailUrl: ""
      });
      
      // Refresh playlist list
      onSuccess();
    } catch (error) {
      console.error("Error adding playlist:", error);
      toast({
        title: t('error'),
        description: t('errorAddingPlaylist'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('addNewPlaylist')}</CardTitle>
        <CardDescription>{t('addYouTubePlaylistDescription')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playlistUrl">{t('youtubePlaylistUrl')} *</Label>
            <div className="flex space-x-2">
              <Input
                id="playlistUrl"
                name="playlistUrl"
                placeholder="https://www.youtube.com/playlist?list=..."
                value={formData.playlistUrl}
                onChange={handleInputChange}
                required
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={fetchPlaylistDetails}
                disabled={isLoading || !formData.playlistUrl}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {t('fetch')}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">{t('title')} *</Label>
            <Input
              id="title"
              name="title"
              placeholder={t('playlistTitle')}
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              name="description"
              placeholder={t('playlistDescription')}
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">{t('thumbnailUrl')}</Label>
            <Input
              id="thumbnailUrl"
              name="thumbnailUrl"
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnailUrl}
              onChange={handleInputChange}
            />
            {formData.thumbnailUrl && (
              <div className="mt-2 aspect-video w-full max-w-[200px] overflow-hidden rounded-md">
                <img 
                  src={formData.thumbnailUrl} 
                  alt={t('thumbnail')} 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/640x360?text=Invalid+Image";
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('adding') : t('addPlaylist')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddPlaylistForm;
