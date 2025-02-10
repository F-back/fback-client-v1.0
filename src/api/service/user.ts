import { useMutation } from '@tanstack/react-query';
import { endPoints, instance } from '../endpoint';
import { LoginDto, UserReq } from '../type/user';

export const login = async ({
  email,
  password,
}: UserReq): Promise<LoginDto> => {
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
