
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface SeriesDetailErrorProps {
  error: string | null;
}

export const SeriesDetailError: React.FC<SeriesDetailErrorProps> = ({ error }) => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-10 text-center">
      <p className="text-destructive mb-4">{error || "Playlist not found"}</p>
      <Link to="/series">
        <Button variant="secondary">
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>
      </Link>
    </div>
  );
};
