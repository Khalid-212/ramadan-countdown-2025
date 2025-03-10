
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PlanGeneratorProps {
  loading: boolean;
  hasGenerated: boolean;
  responsesCount: number;
  totalQuestions: number;
  onViewPlan: () => void;
  onGeneratePlan: () => void;
}

export const PlanGenerator: React.FC<PlanGeneratorProps> = ({
  loading,
  hasGenerated,
  responsesCount,
  totalQuestions,
  onViewPlan,
  onGeneratePlan,
}) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {hasGenerated ? (
        <Button onClick={onViewPlan} className="px-8">
          View My Plan
        </Button>
      ) : (
        <Button
          onClick={onGeneratePlan}
          disabled={loading || responsesCount < totalQuestions}
          className="px-8"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </div>
          ) : (
            "Generate My Plan"
          )}
        </Button>
      )}
    </div>
  );
};
