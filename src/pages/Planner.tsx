
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { questions } from "@/features/planner/data/plannerQuestions";
import { StoredPlan } from "@/features/planner/types/plannerTypes";
import { PlannerQuestion } from "@/features/planner/components/PlannerQuestion";
import { PlanGenerator } from "@/features/planner/components/PlanGenerator";
import { LoadingOverlay } from "@/features/planner/components/LoadingOverlay";
import { PlanModal } from "@/features/planner/components/PlanModal";
import { getBrowser, getOS, triggerConfetti } from "@/features/planner/utils/plannerUtils";

const Planner = () => {
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedPlan = localStorage.getItem("ramadanPlan");
    if (storedPlan) {
      const plan: StoredPlan = JSON.parse(storedPlan);
      setResponses(plan.responses);
      setAiSuggestion(plan.aiSuggestion);
      setHasGenerated(plan.hasGenerated);
    }
  }, []);

  const handleOptionSelect = (questionIndex: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const generatePlan = async () => {
    if (Object.keys(responses).length < questions.length) {
      toast({
        title: "Please answer all questions",
        description:
          "We need your responses to all questions to generate a personalized plan.",
        variant: "destructive",
      });
      return;
    }

    if (hasGenerated) {
      toast({
        title: "Plan already generated",
        description:
          "You can only generate one plan. Your plan is saved and can be viewed again.",
        variant: "default",
      });
      setShowPlan(true);
      return;
    }

    setLoading(true);
    try {
      const ipResponse = await fetch('https://api.ipapi.com/api/check?access_key=21e51bac247e051c8f3d58c4f3923ec7');
      const ipData = await ipResponse.json();

      const userAgent = window.navigator.userAgent;
      const deviceType = /Mobile|Tablet|iPad|iPhone|Android/.test(userAgent) ? 'mobile' : 'desktop';
      const browser = getBrowser(userAgent);
      const os = getOS(userAgent);

      const startTime = Date.now();

      const { data: aiData, error: aiError } = await supabase.functions.invoke("generate-plan", {
        body: { responses },
      });

      if (aiError) throw aiError;

      const suggestion = aiData.suggestion;

      const timeSpent = Date.now() - startTime;

      const { error: dbError } = await supabase
        .from('anonymous_plans')
        .insert({
          responses,
          ai_suggestion: suggestion,
          time_spent: timeSpent,
          geographical_info: ipData,
          device_type: deviceType,
          operating_system: os,
          browser: browser,
          ip_address: ipData.ip || 'unknown',
          source: document.referrer || null
        });

      if (dbError) throw dbError;

      setAiSuggestion(suggestion);
      setHasGenerated(true);
      setShowPlan(true);
      setIsFlipped(false);
      triggerConfetti();

      localStorage.setItem(
        "ramadanPlan",
        JSON.stringify({
          responses,
          aiSuggestion: suggestion,
          hasGenerated: true,
        })
      );

      toast({
        title: "Plan generated!",
        description: "Your personalized Ramadan plan is ready.",
      });
    } catch (error) {
      console.error("Error generating plan:", error);
      toast({
        title: "Error generating plan",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-primary mb-8">
          Ramadan Planner
        </h1>

        <div className="space-y-8 mb-8">
          {questions.map((q, index) => (
            <PlannerQuestion
              key={index}
              question={q}
              index={index}
              selectedValue={responses[index]}
              onOptionSelect={handleOptionSelect}
            />
          ))}
        </div>

        <PlanGenerator
          loading={loading}
          hasGenerated={hasGenerated}
          responsesCount={Object.keys(responses).length}
          totalQuestions={questions.length}
          onViewPlan={() => setShowPlan(true)}
          onGeneratePlan={generatePlan}
        />

        <LoadingOverlay loading={loading} />

        <PlanModal
          aiSuggestion={aiSuggestion}
          showPlan={showPlan && hasGenerated}
          setShowPlan={setShowPlan}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      </div>
    </>
  );
};

export default Planner;
