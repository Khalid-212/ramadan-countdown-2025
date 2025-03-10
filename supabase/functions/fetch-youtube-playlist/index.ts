
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Define CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { playlistId } = await req.json();
    
    if (!playlistId) {
      return new Response(
        JSON.stringify({ error: "Playlist ID is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Get YouTube API key from environment variable
    const apiKey = Deno.env.get("YOUTUBE_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "YouTube API key not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    console.log(`Fetching playlist items for playlist ID: ${playlistId}`);

    // Fetch playlist items from YouTube API
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
    );
    
    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json();
      console.error("YouTube API error:", errorData);
      return new Response(
        JSON.stringify({ error: "YouTube API error", details: errorData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const playlistData = await playlistResponse.json();
    
    // Get video IDs to fetch duration information
    const videoIds = playlistData.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .filter(Boolean)
      .join(',');
    
    if (!videoIds) {
      console.log("No valid video IDs found in playlist");
      return new Response(
        JSON.stringify(playlistData),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Fetching video details for ${videoIds.split(',').length} videos`);
    
    // Fetch video details to get duration
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`
    );
    
    if (!videoDetailsResponse.ok) {
      console.error("Error fetching video details:", await videoDetailsResponse.text());
      // Continue with partial data rather than failing completely
      return new Response(
        JSON.stringify(playlistData),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const videoDetails = await videoDetailsResponse.json();
    
    // Add duration to each playlist item
    if (videoDetails.items && videoDetails.items.length > 0) {
      for (const item of playlistData.items) {
        if (!item.snippet || !item.snippet.resourceId || !item.snippet.resourceId.videoId) {
          continue;
        }
        
        const videoId = item.snippet.resourceId.videoId;
        const videoDetail = videoDetails.items.find((detail: any) => detail.id === videoId);
        
        if (videoDetail && videoDetail.contentDetails) {
          item.contentDetails = {
            duration: videoDetail.contentDetails.duration
          };
        }
      }
    }

    console.log(`Successfully fetched ${playlistData.items.length} videos from playlist`);
    
    return new Response(
      JSON.stringify(playlistData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in fetch-youtube-playlist function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
