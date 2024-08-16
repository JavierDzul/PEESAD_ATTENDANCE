import { Career } from "./career";

export interface Subject {
  id: number;
  name: string;
  clave: string;
  isActive: boolean;
  semester: number;
  // classess: Class[];
  // //   TODO: confirm if subject-career relationship is necessary
  career: Career;
}
