// src/interfaces/activity.ts
export interface Activity {
  id: number;
  title: string;
  content: string;
  dueDate?: Date;
  points: number;
  subjectId: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface CreateActivity {
  title: string;
  content: string;
  dueDate?: Date;
  points?: number;
  sectionId: number;
}

export interface UpdateActivity {
  name?: string;
  description?: string;
  title?:string;
  content?: string;
  dueDate?: Date;
  points?: number;
  subjectId?: number;
}