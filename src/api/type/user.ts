export interface UserReq {
  email: string;
  password: string;
}

export interface LoginRes {
  id: string;
  email: string;
  name: string;
}

export interface ErrorRes {
  message?: string;
}

export type LoginDto = LoginRes & ErrorRes;
