import { Package } from './package';
import { Partial } from './partial';
import { Student } from './student';
import { Subject } from './subject';
import { Teacher } from './teacher';
import { Tutor } from './tutor';

export interface Class {
  id: number;
  isCurrent: boolean;
  isDeleted: boolean;
  semester:string;
  teacher: Teacher;
  tutor?: Tutor;
  subject: Subject;
  package: Package;
  partial: Partial[];
  period: Period;
  subperiod:subperiod;
  students?: Student[]
}

export interface subperiod {
  endDate: string;
  id: number;
  isCurrent: boolean;
  key: string;
  name: string;
  startDate:string;

}
export interface Period {
  endDate: string;
  id: number;
  isCurrent: boolean;
  key: string;
  name: string;
  startDate:string;

}


export interface CreateClass {
  teacher: Teacher;
  subject: Subject;
  package: Package;
}
