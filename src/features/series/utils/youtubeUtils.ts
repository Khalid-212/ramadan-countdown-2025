
import { Video, YouTubeVideo } from "../types/seriesTypes";

// Extract YouTube playlist ID from URL
export const extractPlaylistId = (playlistUrl: string): string | null => {
  if (!playlistUrl) return null;
  
  const regex = /(?:list=)([^&]+)/;
  const match = playlistUrl.match(regex);
  return match ? match[1] : null;
};

// Convert YouTube API response to our Video format
export const convertToVideoFormat = (youtubeVideo: YouTubeVideo): Video => {
  return {
    id: youtubeVideo.id,
    title: youtubeVideo.title,
    description: youtubeVideo.description,
    thumbnailUrl: youtubeVideo.thumbnailUrl,
    videoUrl: `https://www.youtube.com/watch?v=${youtubeVideo.videoId}`,
    duration: formatDuration(youtubeVideo.duration)
  };
};

// Format YouTube duration (PT1H20M30S) to readable format (1:20:30)
export const formatDuration = (duration: string): string => {
  if (!duration) return "0:00";
  
  // Handle ISO 8601 duration format from YouTube API
  try {
    // Remove PT from the beginning
    let formattedDuration = duration.replace("PT", "");
    
    // Extract hours, minutes, seconds
    const hours = formattedDuration.match(/(\d+)H/);
    const minutes = formattedDuration.match(/(\d+)M/);
    const seconds = formattedDuration.match(/(\d+)S/);
    
    // Format as HH:MM:SS or MM:SS
    let result = "";
    if (hours) {
      result += `${hours[1]}:`;
      result += minutes ? `${minutes[1].padStart(2, '0')}:` : "00:";
    } else {
      result += minutes ? `${minutes[1]}:` : "0:";
    }
    result += seconds ? seconds[1].padStart(2, '0') : "00";
    
    return result;
  } catch {
    return "0:00";
  }
};

// Parse YouTube API response to get video details
export const parseYouTubeVideoItems = (data: any): YouTubeVideo[] => {
  if (!data || !data.items || !Array.isArray(data.items)) {
    return [];
  }

  return data.items.map((item: any, index: number): YouTubeVideo => {
    // Handle potential missing data gracefully
    const snippet = item.snippet || {};
    const contentDetails = item.contentDetails || {};
    const thumbnails = snippet.thumbnails || {};
    const resourceId = snippet.resourceId || {};
    
    // Get the best available thumbnail
    const thumbnailUrl = thumbnails.maxres?.url || 
                          thumbnails.high?.url || 
                          thumbnails.medium?.url || 
                          thumbnails.default?.url || 
                          "";

    return {
      id: index.toString(), // Use index as id since YouTube doesn't provide a unique id for each video in a playlist
      title: snippet.title || "Untitled Video",
      description: snippet.description || "",
      thumbnailUrl: thumbnailUrl,
      videoId: resourceId.videoId || "",
      duration: contentDetails.duration || "PT0M0S"
    };
  });
};
