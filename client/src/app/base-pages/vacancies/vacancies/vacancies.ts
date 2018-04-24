 export class Vacancies{
  vacancy: string;
  description: string;
  salary: number;
  candidates: string;

  constructor(vacancy: string, description: string,  candidates: string ) {
    this.vacancy = vacancy;
    this.description = description;
    this.candidates = candidates;
  }
}
