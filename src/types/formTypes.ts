import { SignupReq, UserReq } from '@/api/type/user';

export type LoginFormType = UserReq & {
  remember?: boolean;
};

export type SignupFormType = SignupReq & {
  passwordConfirm?: string;
};
