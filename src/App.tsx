import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TranslationProvider } from "@/hooks/useTranslation";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Index from "./pages/Index";
import Planner from "./pages/Planner";
import Series from "./pages/Series";
import SeriesDetail from "./pages/SeriesDetail";
import SeriesAdmin from "./pages/SeriesAdmin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);

      if (session?.user) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);

      if (session?.user) {
        setIsAdmin(true);
      }
    });
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <TranslationProvider>
            <div className="min-h-screen bg-background transition-colors">
              <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
              </div>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/planner" element={<Planner />} />
                  <Route path="/series" element={<Series />} />
                  <Route
                    path="/series/:playlistId"
                    element={<SeriesDetail />}
                  />
                  <Route
                    path="/series-admin"
                    element={
                      isAdmin ? <SeriesAdmin /> : <Navigate to="/series" />
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          </TranslationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
