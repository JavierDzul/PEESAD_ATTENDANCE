import { Subject } from "./subject";

export interface CourseSection {
    id: number;
    name: string;
    content: string;
    position: number;
    subjectId: number;
    subject: Subject;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
    isActive?: boolean;
  }
  
  export interface CreateCourseSection {
    name: string;
    content: string;
    position?: number;
    subjectId: number;
  }
  
  export interface UpdateCourseSection {
    name?: string;
    content?: string;
    position?: number;
    subjectId?: number;
    isActive?: boolean
  }