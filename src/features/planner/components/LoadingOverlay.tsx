
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  loading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-white text-lg">
          Generating your personalized Ramadan plan...
        </p>
      </div>
    </div>
  );
};
