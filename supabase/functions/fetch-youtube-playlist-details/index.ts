
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

    console.log(`Fetching playlist details for playlist ID: ${playlistId}`);

    // Fetch playlist details from YouTube API
    const playlistDetailResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${apiKey}`
    );
    
    if (!playlistDetailResponse.ok) {
      const errorData = await playlistDetailResponse.json();
      console.error("YouTube API error:", errorData);
      return new Response(
        JSON.stringify({ error: "YouTube API error", details: errorData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const playlistData = await playlistDetailResponse.json();
    
    if (!playlistData.items || playlistData.items.length === 0) {
      console.log("No playlist found with the provided ID");
      return new Response(
        JSON.stringify({ error: "Playlist not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }
    
    const playlistItem = playlistData.items[0];
    const videoCount = playlistItem.contentDetails?.itemCount || 0;
    const title = playlistItem.snippet?.title || "";
    const description = playlistItem.snippet?.description || "";
    
    // Get the best available thumbnail
    const thumbnails = playlistItem.snippet?.thumbnails || {};
    const thumbnailUrl = thumbnails.maxres?.url || 
                        thumbnails.high?.url || 
                        thumbnails.medium?.url || 
                        thumbnails.default?.url || 
                        "";

    console.log(`Successfully fetched playlist details. Title: ${title}, Video count: ${videoCount}`);
    
    return new Response(
      JSON.stringify({
        id: playlistId,
        title,
        description,
        thumbnailUrl,
        videoCount
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in fetch-youtube-playlist-details function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
