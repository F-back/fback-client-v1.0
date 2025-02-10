import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, ModalProps } from 'antd';
import { ButtonTextType } from '@/types/enumTypes';

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

export interface BaseModalWrapperProps extends ModalProps {
  size?: 'small' | 'medium' | 'large';
  onOk?: () => void;
  onCancel?: () => void;
}

const BaseModalWrapper = forwardRef<ModalHandle, BaseModalWrapperProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { size = 'small', onOk, onCancel, ...otherProps } = props;

    const sizeOption = {
      small: '400px',
      medium: '600px',
      large: '800px',
    };

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    const handleOk = () => {
      onOk?.();
      setIsOpen(false);
    };

    const handleCancel = () => {
      onCancel?.();
      setIsOpen(false);
    };

    return (
      <Modal
        open={isOpen}
        width={sizeOption[size]}
        okText={ButtonTextType.OK}
        cancelText={ButtonTextType.CANCEL}
        onOk={handleOk}
        onCancel={handleCancel}
        {...otherProps}
      >
        {props.children}
        <br />
      </Modal>
    );
  }
);

export default BaseModalWrapper;
