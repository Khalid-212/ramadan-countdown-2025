
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videos: Video[];
  playlistUrl?: string; // Add YouTube playlist URL
  videoCount?: number; // Add video count from YouTube API
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string | null;
  playlist_url: string;
  thumbnail_url: string | null;
  created_at: string;
  // TypeScript-friendly getter properties
  playlistUrl: string;
  thumbnailUrl: string | null;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoId: string;
  duration: string;
}
