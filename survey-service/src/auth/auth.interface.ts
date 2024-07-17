import { Observable } from 'rxjs';

export interface ValidateJwtRequest {
  jwt: string;
}
export interface ValidateJwtResponse {
  isValid: boolean;
  userId: number;
}

export interface GRcpAuthService {
  validateJwt(data: ValidateJwtRequest): Observable<any>;
}
