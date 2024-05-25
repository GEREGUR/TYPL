export interface User {
  id: number;
  surname: string;
  name: string;
  secondName: string | null;
  studyGroup: string;
  login: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}
