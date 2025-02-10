export interface UserReq {
  email: string;
  password: string;
}

export interface LoginRes {
  id: number;
  email: string;
  name: string;
}

export interface SignupReq {
  email: string;
  phone: string;
  password: string;
  name: string;
}

export interface SignupRes {
  id: number;
}

export interface checkEmailReq {
  email: string;
}

export interface checkEmailRes {
  exists: boolean;
}
// export interface ErrorRes {
//   message?: string;
// }
