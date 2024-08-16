import { Student } from "./student";

export interface Justification{
 
  id: number;
  type: string;
  description: string;
  attachment: string;
  startDate: Date;
  endDate:Date;
  isDeleted:boolean
  student?: Student;
}

export interface createJustification{
    type: string;
    description: string;
    startDate: Date;
    endDate:Date;
    studentId: Student;
}