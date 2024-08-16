import { Student } from './student';

export interface Career {
  id: number;
  name: string;
  key: string;
  semester: string;
  isActive: boolean;
  students: Student[];
}

export interface CareerDtoUpdate {
  id?: number;
  name?: string;
  key?: string;
  semester?: string;
  isActive?: boolean;
  students?: Student[];
}

export interface CareerDtoCreate {
 
  name?: string;
  key?: string;
  semester?: string;
}