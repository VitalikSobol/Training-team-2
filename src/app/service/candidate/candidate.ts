import {Experience} from './experience';
import {Skill} from './skill';

export class Candidate {
  name: string;
  lastName: string;
  position: string;
  payment: number;
  date: number;
  address: string;
  phone: string;
  status: string;
  email: string;
  skills: Skill[];
  experiences: Experience[];
  vacancies: string[];
  allVacancies: string[];
}

