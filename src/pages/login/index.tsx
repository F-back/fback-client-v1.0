import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  Typography,
} from 'antd';
import { CheckboxRef } from 'antd/lib/checkbox';
import { InputRef } from 'antd/lib/input';
import { useLogin } from '@/api/service/user';
import { ModalHandle } from '@/components/modal/BaseModalWrapper';
import LogoutModal from '@/components/modal/LogoutModal';
import { useGlobalContext } from '@/context/GlobalContext';
import { useAuthStore } from '@/store/authStore';
import { LoginFormType } from '@/types/formTypes';
import { emailValidator, passwordValidator } from '@/utils/validator';
import styles from './index.module.scss';

const LoginPage = () => {
  const { Link } = Typography;
  const { mutate, data, isSuccess, isError, error } = useLogin();
  const emailRef = useRef<InputRef>(null);
  const rememberRef = useRef<CheckboxRef>(null);
  const navigate = useNavigate();
  const { user, addUser } = useAuthStore();
  const [form] = Form.useForm();
  const logoutModalRef = useRef<ModalHandle>(null);
  const { notification } = useGlobalContext();

  const handleLogin: FormProps<LoginFormType>['onFinish'] = (values) => {
    const { email, password } = values;
    mutate({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      const remember = rememberRef.current?.input?.checked || false;
      if (remember) {
        if (data.email) localStorage.setItem('email', data.email);
      } else {
        localStorage.removeItem('email');
      }
      addUser({ id: data.id, email: data.email, name: data.name });

      notification({ message: '로그인 성공' });
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      notification({ message: error?.message || '로그인 실패', type: 'error' });
    }
  }, [isError]);

  useEffect(() => {
    if (user?.id) {
      logoutModalRef.current?.open();
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      if (emailRef.current?.input) {
        form.setFieldsValue({ email });
      }
      if (rememberRef.current?.input) {
        form.setFieldsValue({ remember: true });
      }
    }
  }, []);

  return (
    <>
      <Flex vertical align="center" justify="center" className={styles.wrapper}>
        <p className={styles.logo}>Feedback Man</p>
        <Form
          form={form}
          className={styles.form}
          size="large"
          name="basic"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item<LoginFormType>
            name="email"
            rules={[
              { required: true, message: '필수 입력 항목입니다' },
              { validator: emailValidator },
            ]}
          >
            <Input placeholder="이메일을 입력하세요" ref={emailRef} />
          </Form.Item>

          <Form.Item<LoginFormType>
            name="password"
            rules={[
              { required: true, message: '필수 입력 항목입니다' },
              { validator: passwordValidator },
            ]}
          >
            <Input.Password placeholder="비밀번호를 입력하세요" />
          </Form.Item>

          <Form.Item<LoginFormType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox ref={rememberRef}>이메일 저장하기</Checkbox>
          </Form.Item>

          <Form.Item label={null} className={styles.form_item}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.login_btn}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
        <Link href="./signup">회원가입 하러가기</Link>
      </Flex>
      <LogoutModal ref={logoutModalRef} />
    </>
  );
};

export default LoginPage;
