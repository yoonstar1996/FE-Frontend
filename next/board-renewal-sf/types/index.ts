export interface Task {
  id: number;
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  boards: Board[];
}

export interface Board {
  id: string;
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  content: string;
  isCompleted: boolean;
}
