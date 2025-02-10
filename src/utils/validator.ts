import { RuleObject } from 'antd/es/form';

export const emailValidator = (_: RuleObject, value: string) => {
  if (
    value &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  ) {
    return Promise.reject('이메일 형식이 올바르지 않습니다');
  }
  return Promise.resolve();
};

export const passwordValidator = (_: RuleObject, value: string) => {
  if (
    value &&
    !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]).{8,20}$/.test(
      value
    )
  ) {
    return Promise.reject('대소문자, 숫자, 특수문자를 포함한 8-20자 입력');
  }
  return Promise.resolve();
};

export const phoneNumberValidator = (_: RuleObject, value: string) => {
  if (value && (!/^[0-9]+$/.test(value) || value.length !== 11)) {
    return Promise.reject(
      new Error("'-'를 제외한 11자리의 번호를 입력해주세요")
    );
  }
  return Promise.resolve();
};
