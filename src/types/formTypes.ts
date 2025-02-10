import { UserReq } from '@/api/type/user';

export type UserFormType = UserReq & {
  remember?: boolean;
  passwordConfirm?: string;
};
