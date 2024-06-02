export interface User {
  id: number;
  surname: string;
  name: string;
  secondName: string | null;
  login: string;
  studyGroup: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}
