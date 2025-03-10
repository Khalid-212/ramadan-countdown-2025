import { useState, useEffect } from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { TimeLeft } from "@/types/ramadan";
import { translations, Language } from "@/constants/translations";
import { RamadanCountdown } from "@/components/RamadanCountdown";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getAllPlaylists } from "@/features/series/utils/seriesUtils";
import { Playlist } from "@/features/series/types/seriesTypes";
import { PlaylistCard } from "@/features/series/components/PlaylistCard";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [language, setLanguage] = useState<Language>("en");
  const [countdownDate, setCountdownDate] = useState<Date | null>(null);
  const [isRamadan, setIsRamadan] = useState(false);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

  const fetchCountdownDate = async () => {
    try {
      const { data, error } = await supabase
        .from("countdown_dates")
        .select("countdown_date")
        .eq("name", "Ramadan 2024")
        .single();

      if (error) throw error;

      if (data) {
        setCountdownDate(new Date(data.countdown_date));
      }
    } catch (error) {
      console.error("Error fetching countdown date:", error);
      toast.error("Failed to fetch countdown date");
    }
  };

  const fetchFeaturedPlaylists = async () => {
    try {
      setIsLoadingPlaylists(true);
      const playlists = await getAllPlaylists();
      // Take the first 3 playlists as featured
      setFeaturedPlaylists(playlists.slice(0, 3));
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setIsLoadingPlaylists(false);
    }
  };

  const calculateTimeLeft = () => {
    if (!countdownDate) return;

    const difference = countdownDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      if (!isRamadan) {
        setIsRamadan(true);
      }
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    });
  };

  useEffect(() => {
    fetchCountdownDate();
    fetchFeaturedPlaylists();
  }, []);

  useEffect(() => {
    if (countdownDate) {
      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }
  }, [countdownDate]);

  const handleShare = async () => {
    const shareTitle = "🌙 Ramadan 2025 Countdown & Planner";
    const shareText = isRamadan
      ? "Ramadan Kareem! 🌙 Join me in making this Ramadan special with a beautiful digital planner for your ibadah ✨"
      : `✨ ${timeLeft.days} days until Ramadan 2025! Prepare for the blessed month with this beautiful countdown & digital planner. Let's make this Ramadan our best one yet! 🌙`;

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
      });
    } catch {
      toast.success(
        "URL copied to clipboard! Share the blessings with others 🌟"
      );
      navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/10 to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
            className="px-4 mr-12 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-primary/10 hover:bg-white transition-colors dark:bg-black/80 dark:hover:bg-black"
          >
            {language === "en" ? "Amharic" : "English"}
          </button>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-12 pt-12">
          <h1
            className={`text-4xl md:text-5xl font-bold text-primary ${
              language === "am" ? "font-amharic" : ""
            } animate-slide-up`}
          >
            {isRamadan
              ? "Ramadan Kareem! Ramadan كريم"
              : translations[language].title}
          </h1>

          {countdownDate && !isRamadan && (
            <RamadanCountdown timeLeft={timeLeft} language={language} />
          )}

          {isRamadan && (
            <div className="text-2xl md:text-3xl text-primary animate-fade-in">
              May Allah accept our fasts and prayers 🌙
            </div>
          )}

          <Link
            to="/planner"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl pulse-animation"
          >
            <span>{translations[language].planner}</span>
            <span className="text-xs opacity-75">→</span>
          </Link>

          <Button
            onClick={handleShare}
            className="mx-auto px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center hover:scale-105 transform duration-300 group"
          >
            <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className={language === "am" ? "font-amharic" : ""}>
              {translations[language].share}
            </span>
          </Button>

          {/* Featured Playlists Section */}
          {featuredPlaylists.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Featured Ramadan Series
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPlaylists.map((playlist) => (
                  <div key={playlist.id} className="animate-fade-in">
                    <PlaylistCard playlist={playlist} />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/series">
                  <Button
                    variant="outline"
                    className="bg-white/80 hover:bg-white shadow-sm dark:bg-black/80 dark:hover:bg-black"
                  >
                    View All Islamic Series
                    <span className="ml-2">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div
            className={`p-6 rounded-xl bg-primary/5 backdrop-blur-sm text-primary max-w-2xl mx-auto ${
              language === "am" ? "font-amharic" : ""
            }`}
          >
            {translations[language].blessing}
          </div>
        </div>
      </div>

      <footer className="bottom-0 left-0 right-0 p-4 text-center text-primary/80 bg-white/50 backdrop-blur-sm border-t border-primary/10 dark:bg-black/50 dark:text-primary/80">
        <p className="text-sm">
          Made with ❤️ by Khalid Ibrahim. Remember me in your precious duas this
          Ramadan 🤲
        </p>
      </footer>
    </div>
  );
};

export default Index;
