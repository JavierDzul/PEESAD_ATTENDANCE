import { User } from './auth-response';
import { Class } from './class';

export interface Teacher {
  id: number;
  user: User;
  classes: Class[];
  isActive: boolean;
}
