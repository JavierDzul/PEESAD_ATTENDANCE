import { Package } from './package';
import { Student } from './student';

export interface UnitCampus {
  id: number;
  name: string;
  key: string;
  location: string;
  boss: string;
  isActive: boolean;
  students: Student[];
  packages: Package[];
}

export interface Unit {
  id?: number;
  name?: string;
  location?: string;
  boss?: string;
  isActive?: boolean;
  key?: string;
}
