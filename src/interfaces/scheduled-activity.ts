import { Activity } from "./activity";
import { Class } from "./class";

// src/interfaces/scheduled-activity.ts
export interface ScheduledActivity {
    id: number;

    activity : Activity
    class: Class
    startDate: string;
    endDate: string;
  }
  
  export interface CreateScheduledActivity {
    classId: number;
    activityId: number;
    startDate: string;
    endDate: string;
  }
  
  export interface UpdateScheduledActivity {
    id: number;
    classId?: number;
    activityId?: number;
    startDate?: string;
    endDate?: string;
  }