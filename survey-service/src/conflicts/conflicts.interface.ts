import { Observable } from 'rxjs';

export interface Conflict {
  surveyId: number;
  answerId: number;
  conflicts: string[];
}
export interface ConflictsService {
  create(data: Conflict): Observable<any>;
}
