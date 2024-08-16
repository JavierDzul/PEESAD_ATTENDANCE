export enum JustificationType {
    MEDICAL = "Médico",
    FAMILY_ILLNESS = "Enfermedad Familiar",
    SCHOOL_ACTIVITY = "Actividad Escolar",
    PERSONAL = "Personal",
    LEGAL = "Legal",
    BEREAVEMENT = "Duelo",
    TRAVEL = "Viaje",
    RELIGIOUS = "Religioso"
  }
  export interface Student {
    id: number;
    name: string;
    lastName: string;
    motherLastName: string;
    noControl: string;
    semester: string;
    isActive: boolean;
    idUnitCampus: number;
    idCareer: number;
  }
  
  export interface Class {
    id: number;
    isCurrent: boolean;
    isDeleted: boolean;
  }
  
  export interface Justification {
    id: number;
    type: string;
    description: string;
    attachment: string | null;
    startDate: string;
    endDate:string;
    isDeleted: boolean;
    student: Student;
    class: Class;
  }
  