
import { supabase } from "@/integrations/supabase/client";
import { Playlist, Video, YouTubePlaylist, YouTubeVideo } from "../types/seriesTypes";
import { convertToVideoFormat, extractPlaylistId, parseYouTubeVideoItems } from "./youtubeUtils";

// Fetch all playlists from Supabase
export const getAllPlaylists = async (): Promise<Playlist[]> => {
  try {
    const { data: playlistsData, error } = await supabase
      .from('youtube_playlists')
      .select('*')
      .order('order', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching playlists: ${error.message}`);
    }
    
    // Map database records to Playlist interface
    const playlists: Playlist[] = await Promise.all((playlistsData || []).map(async playlist => {
      // Fetch video count from YouTube API
      let videoCount = 0;
      
      try {
        if (playlist.playlist_url) {
          const playlistId = extractPlaylistId(playlist.playlist_url);
          if (playlistId) {
            // Call our edge function to fetch YouTube playlist details including video count
            const { data, error } = await supabase.functions.invoke('fetch-youtube-playlist-details', {
              body: { playlistId }
            });
            
            if (data && !error) {
              videoCount = data.videoCount || 0;
            }
          }
        }
      } catch (e) {
        console.error("Error fetching video count for playlist:", e);
      }
      
      return {
        id: playlist.id,
        title: playlist.title,
        description: playlist.description || "",
        thumbnailUrl: playlist.thumbnail_url || "https://via.placeholder.com/640x360?text=Playlist",
        playlistUrl: playlist.playlist_url,
        videos: [],
        videoCount
      };
    }));
    
    return playlists;
  } catch (error) {
    throw error;
  }
};

// Get a single playlist by ID
export const getPlaylistById = async (id: string): Promise<Playlist | undefined> => {
  try {
    const { data: playlist, error } = await supabase
      .from('youtube_playlists')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !playlist) {
      throw new Error(`Error fetching playlist: ${error?.message || 'Playlist not found'}`);
    }

    // Fetch videos for this playlist
    const videos = await getPlaylistVideos(playlist.playlist_url);
    
    return {
      id: playlist.id,
      title: playlist.title,
      description: playlist.description || "",
      thumbnailUrl: playlist.thumbnail_url || "https://via.placeholder.com/640x360?text=Playlist",
      playlistUrl: playlist.playlist_url,
      videos,
      videoCount: videos.length
    };
  } catch (error) {
    throw error;
  }
};

// Get all videos for a playlist from YouTube
export const getPlaylistVideos = async (playlistUrl: string): Promise<Video[]> => {
  try {
    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
      throw new Error(`Invalid YouTube playlist URL: ${playlistUrl}`);
    }
    
    // Call our edge function to fetch YouTube data
    const { data, error } = await supabase.functions.invoke('fetch-youtube-playlist', {
      body: { playlistId }
    });
    
    if (error) {
      throw new Error(`Error fetching YouTube playlist: ${error.message}`);
    }
    
    // Parse YouTube API response to get video details
    const youtubeVideos = parseYouTubeVideoItems(data);
    
    // Convert YouTube data to our Video format
    const videos: Video[] = youtubeVideos.map(video => convertToVideoFormat(video));
    
    return videos;
  } catch (error) {
    throw error;
  }
};

// Get a single video by ID
export const getVideoById = (playlistVideos: Video[], videoId: string): Video | undefined => {
  return playlistVideos.find(video => video.id === videoId);
};
