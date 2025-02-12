import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Form, FormProps, Input, Typography } from 'antd';
import { RuleObject } from 'antd/es/form';
import { useCheckEmail, useSignup } from '@/api/service/user';
import { ModalHandle } from '@/components/modal/BaseModalWrapper';
import LogoutModal from '@/components/modal/LogoutModal';
import { useGlobalContext } from '@/context/GlobalContext';
import { useAuthStore } from '@/store/authStore';
import { SignupFormType } from '@/types/formTypes';
import {
  emailValidator,
  passwordValidator,
  phoneNumberValidator,
} from '@/utils/validator';
import styles from './index.module.scss';

const SignupPage = () => {
  const { Link } = Typography;
  const navigate = useNavigate();
  const { mutate, isSuccess } = useSignup();
  const {
    mutate: checkEmailMutate,
    isSuccess: checkEmailIsSuccess,
    data: checkEmailData,
  } = useCheckEmail();
  const { user } = useAuthStore();
  const [form] = Form.useForm();

  const logoutModalRef = useRef<ModalHandle>(null);
  const { notification } = useGlobalContext();

  const handleSignup: FormProps<SignupFormType>['onFinish'] = (values) => {
    const { email, phone, password, name } = values;
    mutate({ email, phone, password, name });
  };

  const handleEmailCheck = () => {
    const email = form?.getFieldValue('email');
    if (email) {
      checkEmailMutate({ email });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      notification({ message: '회원가입 성공' });
      navigate('/login');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (checkEmailIsSuccess) {
      const { exists } = checkEmailData;
      if (exists) {
        notification({ message: '이미 사용중인 이메일 입니다' });
      } else {
        notification({ message: '사용 가능한 이메일 입니다' });
      }
    }
  }, [checkEmailIsSuccess]);

  useEffect(() => {
    if (user?.id) {
      logoutModalRef.current?.open();
    }
  }, []);

  return (
    <>
      <Flex vertical align="center" justify="center" className={styles.wrapper}>
        <p className={styles.logo}>Feedback Man</p>
        <Form
          form={form}
          onValuesChange={(changedValues, allValues) => {
            // console.log(form.getFieldError('email'));
          }}
          className={styles.form}
          size="large"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSignup}
          autoComplete="off"
        >
          <Form.Item<SignupFormType>
            name="name"
            rules={[{ required: true, message: '필수 입력 항목입니다' }]}
          >
            <Input placeholder="이름을 입력하세요" />
          </Form.Item>

          <Form.Item<SignupFormType>
            name="email"
            rules={[
              { required: true, message: '필수 입력 항목입니다' },
              { validator: emailValidator },
            ]}
          >
            <Flex gap={8}>
              <Input placeholder="이메일을 입력하세요" />
              <Button
                className={styles.email_check_button}
                type="primary"
                onClick={handleEmailCheck}
              >
                중복 확인
              </Button>
            </Flex>
          </Form.Item>

          <Form.Item<SignupFormType>
            name="password"
            rules={[
              { required: true, message: '필수 입력 항목입니다' },
              { validator: passwordValidator },
            ]}
          >
            <Input.Password placeholder="비밀번호를 입력하세요" />
          </Form.Item>

          <Form.Item<SignupFormType>
            name="passwordConfirm"
            rules={[
              { required: true, message: '필수 입력 항목입니다' },
              {
                validator: (_: RuleObject, value: string) => {
                  if (value && form?.getFieldValue('password') !== value) {
                    return Promise.reject(
                      new Error('비밀번호와 동일한 비밀번호 입력')
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password placeholder="비밀번호를 확인해주세요" />
          </Form.Item>

          <Form.Item<SignupFormType>
            name="phone"
            rules={[
              { required: true, message: '필수 입력 항목입니다' },
              {
                validator: phoneNumberValidator,
              },
            ]}
          >
            <Input
              className={styles.form_phone}
              type="number"
              placeholder="휴대전화 번호를 입력하세요"
            />
          </Form.Item>

          <Form.Item label={null} className={styles.form_item}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.login_btn}
            >
              회원가입
            </Button>
          </Form.Item>
        </Form>
        <Link href="./login">로그인 하러가기</Link>
      </Flex>
      <LogoutModal ref={logoutModalRef} />
    </>
  );
};

export default SignupPage;
