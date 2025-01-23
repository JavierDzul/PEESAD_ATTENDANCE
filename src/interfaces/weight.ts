// src/interfaces/weight.ts
export interface Weight {
    id: number;
    name: string;
    percentage: number;
    isManual: boolean;
    activityWeights: ActivityWeight[];
    manualGrades: any[];
  }
  
  export interface SectionWeight {
    id: number;
    name: string;
    position: number;
    weights: Weight[];
    extraPoints: any[]; 
  }
  
  export interface ActivityWeight {
    id: number;
    percentage: number;
    scheduledActivity: {
      id: number;
      // otros campos necesarios
    };
    weight: {
      id: number;
      // otros campos necesarios
    };
  }
  
  export interface CreateSectionWeight {
    name: string;
    classId: number;
    position?: number;
  }
  
  export interface CreateWeight {
    name: string;
    percentage: number;
    sectionWeightId: number;
    isManual?: boolean;
  }
  
  export interface CreateActivityWeight {
    scheduledActivityId: number;
    weightId: number;
    percentage: number;
  }
  
  export interface UpdateSectionWeight {
    id: number;
    name?: string;
    position?: number;
  }
  
  export interface UpdateWeight {
    id: number;
    name?: string;
    percentage?: number;
    isManual?: boolean;
  }
  
  export interface UpdateActivityWeight {
    id: number;
    percentage?: number;
  }