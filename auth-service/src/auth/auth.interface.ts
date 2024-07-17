export interface JwtPayload {
  sub: number;
}

export interface GRcpValidateJwt {
  isValid: boolean;
  userId: number;
}
