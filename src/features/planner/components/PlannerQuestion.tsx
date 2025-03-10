
import React from "react";
import { Card } from "@/components/ui/card";
import { Question } from "../types/plannerTypes";

interface PlannerQuestionProps {
  question: Question;
  index: number;
  selectedValue: string | undefined;
  onOptionSelect: (questionIndex: number, value: string) => void;
}

export const PlannerQuestion: React.FC<PlannerQuestionProps> = ({
  question,
  index,
  selectedValue,
  onOptionSelect,
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-primary mb-4">
        {question.title}
      </h2>
      <p className="mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onOptionSelect(index, option.value)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedValue === option.value
                ? "bg-primary text-white"
                : "bg-primary/5 hover:bg-primary/10"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </Card>
  );
};
