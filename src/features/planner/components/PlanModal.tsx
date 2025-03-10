
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RotateCw, Share2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/components/ui/use-toast";

interface PlanModalProps {
  aiSuggestion: string;
  showPlan: boolean;
  setShowPlan: (show: boolean) => void;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

export const PlanModal: React.FC<PlanModalProps> = ({
  aiSuggestion,
  showPlan,
  setShowPlan,
  isFlipped,
  setIsFlipped,
}) => {
  const { toast } = useToast();

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const downloadPlan = async () => {
    const element = document.getElementById("plan-content");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200,
        width: 816, // A4 width at 96 DPI
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [816, element.scrollHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 816, element.scrollHeight);
      pdf.save("my-ramadan-plan.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error downloading plan",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const sharePlan = async () => {
    try {
      const element = document.getElementById("plan-content");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const shareData = {
        title: "My Ramadan Plan",
        text: "📿 I just created my personalized Ramadan plan! Create yours at RamadanPlanner.com #Ramadan2024 #RamadanPlanner",
        url: window.location.origin + "/planner",
      };

      if (navigator.share && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          toast({
            title: "Shared successfully!",
            description: "Thank you for sharing your Ramadan plan.",
          });
        } catch (err) {
          console.error("Share error:", err);
          // Fallback to clipboard
          await copyToClipboard();
        }
      } else {
        // Fallback to clipboard
        await copyToClipboard();
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Error sharing plan",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    const text =
      "📿 I just created my personalized Ramadan plan! Create yours at RamadanPlanner.com #Ramadan2024 #RamadanPlanner\n\n" +
      window.location.origin +
      "/planner";

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Share text copied!",
        description: "You can now paste it anywhere.",
      });
    } catch (err) {
      console.error("Clipboard error:", err);
      toast({
        title: "Error copying to clipboard",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!showPlan) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div
        className={`card-flip w-full max-w-4xl h-[80vh] cursor-pointer ${
          isFlipped ? "is-flipped" : ""
        }`}
        onClick={handleCardClick}
        style={{ perspective: "1000px" }}
      >
        <div 
          className="card-flip-inner relative w-full h-full transition-transform duration-700"
          style={{ 
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
          }}
        >
          <div 
            className="card-front absolute w-full h-full bg-[#047857] rounded-lg p-8 text-white flex flex-col items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute top-2 right-2 flex gap-2 z-50">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlan(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img
              src="/uploads/3e845530-9f76-4f5f-a1ac-3cba6db9c791.png"
              alt="Ramadan Kareem"
              className="w-full max-w-md mb-6"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Your Ramadan Plan is Ready
              </h2>
              <p className="text-white/80">
                Click to view your personalized plan
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-white/10 hover:bg-white/20 border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Flip to View Plan
              </Button>
            </div>
          </div>

          <div 
            className="card-back absolute w-full h-full bg-white rounded-lg overflow-y-auto"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="absolute top-2 right-2 flex gap-2 z-50">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadPlan();
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  sharePlan();
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlan(false);
                  setIsFlipped(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-8">
              <div
                id="plan-content"
                className="prose prose-emerald max-w-none relative"
              >
                <div className="absolute inset-0 border-[16px] border-double border-primary/20 pointer-events-none rounded-lg" />
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-primary">
                      Your Personalized Ramadan Plan
                    </h2>
                  </div>
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-primary text-2xl font-bold mb-4"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-primary text-xl font-semibold mb-3"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-primary text-lg font-medium mb-2"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="mb-4 text-base leading-relaxed"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc pl-6 mb-4 space-y-2"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal pl-6 mb-4 space-y-2"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-2" {...props} />
                      ),
                      em: ({ node, ...props }) => (
                        <em
                          className="text-primary not-italic font-medium"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {aiSuggestion}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
