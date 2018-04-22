class Experience {
  period: string;
  position: string;
  location: string;
  company: string;
  description: string;
}

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
  skills: string[];
  experiences: Experience[];
}

