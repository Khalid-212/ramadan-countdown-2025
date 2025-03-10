
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Activity {
  id?: string;
  date: Date;
  type: "quran" | "nawafil" | "azkar" | "taraweeh" | "sadaqah";
  targetAmount: number;
  completed?: boolean;
  amountCompleted?: number;
}

export interface ActivityLog {
  id?: string;
  plannedActivityId: string;
  amountCompleted: number;
  completedAt: Date;
}
