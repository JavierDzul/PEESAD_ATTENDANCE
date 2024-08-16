import { Attendance } from './attendance';
import { Career } from './career';
import { UnitCampus } from './unit-campus';

export interface Student {
  id: number;
  name: string;
  lastName: string;
  motherLastName: string;
  noControl: string;
  semester: string;
  isActive: boolean;
  idUnitCampuse: number;
  idCareer: number;
  career: Career;
  unitCampuse: UnitCampus;
  attendances: Attendance[];
  fullName?: string;
}
