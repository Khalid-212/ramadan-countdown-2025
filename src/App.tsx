
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TranslationProvider } from "@/hooks/useTranslation";
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
      
      // Check if user has admin role
      if (session?.user) {
        // In a real application, you would check the user's role
        // For simplicity, we'll use the user's email to determine admin status
        // You should implement proper RBAC in a production app
        setIsAdmin(true); // For development, everyone is an admin
      } else {
        setIsAdmin(false);
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      
      // Same admin check as above
      if (session?.user) {
        setIsAdmin(true); // For development, everyone is an admin
      }
    });
  }, []);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TranslationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                // element={isAuthenticated ? <Index /> : <Navigate to="/auth" />}
                element={<Index />}
              />
              <Route
                path="/planner"
                // element={isAuthenticated ? <Planner /> : <Navigate to="/auth" />}
                element={<Planner />}
              />
              <Route
                path="/series"
                element={<Series />}
              />
              <Route
                path="/series/:playlistId"
                element={<SeriesDetail />}
              />
              <Route
                path="/series-admin"
                element={isAdmin ? <SeriesAdmin /> : <Navigate to="/series" />}
              />
              {/* <Route
                path="/auth"
                // element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
                element={<Auth />}
              /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TranslationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
