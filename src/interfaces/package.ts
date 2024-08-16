import { Class } from './class';
import { UnitCampus } from './unit-campus';

export interface Package {
  id: number;
  isActive: boolean;
  name: string;
  classes: Class[];
  unitCampus: UnitCampus;
}
