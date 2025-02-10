import { useGlobalContext } from '@/context/GlobalContext';
import { ModalContentType, NotificationMessageType } from '@/types/enumTypes';
import { forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseModalWrapper, {
  BaseModalWrapperProps,
  ModalHandle,
} from './BaseModalWrapper';
import { useAuthStore } from '@/store/authStore';

interface LogoutModalProps extends BaseModalWrapperProps {
  isDelete?: boolean;
}

const LogoutModal = forwardRef<ModalHandle, LogoutModalProps>((props, ref) => {
  const { isDelete = false, ...otherProps } = props;
  const { notification } = useGlobalContext();
  const { deleteAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = ref as React.RefObject<ModalHandle>;

  const handleLogout = () => {
    deleteAccessToken();
    modalRef.current?.close();
    notification({ message: NotificationMessageType.LOGOUT, type: 'info' });
  };

  const handleLoginCancel = () => {
    const changeRoutes = ['/login', '/signup'];
    const isChange = changeRoutes.includes(location.pathname);
    if (isChange) navigate('/');
  };

  return (
    <BaseModalWrapper
      onOk={handleLogout}
      onCancel={handleLoginCancel}
      okButtonProps={{ danger: isDelete }}
      cancelButtonProps={{ danger: isDelete }}
      closable={false}
      maskClosable={false}
      {...otherProps}
      ref={ref}
    >
      <p>{ModalContentType.LOGOUT}</p>
    </BaseModalWrapper>
  );
});

export default LogoutModal;
