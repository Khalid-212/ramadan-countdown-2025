
export interface StoredPlan {
  responses: Record<number, string>;
  aiSuggestion: string;
  hasGenerated: boolean;
}

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  title: string;
  question: string;
  options: QuestionOption[];
}
