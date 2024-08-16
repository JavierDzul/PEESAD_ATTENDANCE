// src/interfaces/list.ts
import { Attendance } from './attendance';
import { UnitCampus } from './unit-campus';
import { Career } from './career';

export interface StudentList {
  id: number;
  name: string;
  lastName: string;
  motherLastName: string;
  isActive: boolean;
  noControl?: string;
  semester?: string;
  idUnitCampuse?: number;
  idCareer?: number;
  career?: Career;
unitCampuse?: UnitCampus;
attendances?: Attendance[];
fullName?: string;
}




export interface List {
  student: StudentList;
  attendances: Attendance[];
}