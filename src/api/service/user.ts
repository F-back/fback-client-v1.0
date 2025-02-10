import { useMutation } from '@tanstack/react-query';
import { endPoints, instance } from '../endpoint';
import {
  checkEmailReq,
  checkEmailRes,
  LoginRes,
  SignupReq,
  SignupRes,
  UserReq,
} from '../type/user';

export const login = async ({
  email,
  password,
}: UserReq): Promise<LoginRes> => {
  return instance
    .post(endPoints.login, {
      email,
      password,
    })
    .then((res) => res.data);
};

export const useLogin = () => {
  return useMutation({
    mutationKey: [endPoints.login],
    mutationFn: login,
  });
};

export const signup = async ({
  email,
  phone,
  password,
  name,
}: SignupReq): Promise<SignupRes> => {
  return instance
    .post(endPoints.signup, {
      email,
      phone,
      password,
      name,
    })
    .then((res) => res.data);
};

export const useSignup = () => {
  return useMutation({
    mutationKey: [endPoints.signup],
    mutationFn: signup,
  });
};

export const checkEmail = async ({
  email,
}: checkEmailReq): Promise<checkEmailRes> => {
  return instance
    .get(endPoints.checkEmail.replace('{email}', email))
    .then((res) => res.data);
};

export const useCheckEmail = () => {
  return useMutation({
    mutationKey: [endPoints.checkEmail],
    mutationFn: checkEmail,
  });
};
