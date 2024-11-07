import { Package } from './package';
import { Partial } from './partial';
import { Subject } from './subject';
import { Teacher } from './teacher';
import { Tutor } from './tutor';

export interface Class {
  id: number;
  isCurrent: boolean;
  isDeleted: boolean;
  teacher: Teacher;
  tutor?: Tutor;
  subject: Subject;
  package: Package;
  partial: Partial[];
  period: Period;
  subperiod:subperiod;
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
