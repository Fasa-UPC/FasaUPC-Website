export interface JwtPayload {
  sub: string;
  ssoID: string;
  firstName: string;
  lastName: string;
  role?: 'user' | 'admin' | 'developer';
}

export interface Pagination {
  page?: number;
  count?: number;
}
