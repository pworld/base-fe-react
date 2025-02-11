import { Modal } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import BaseModalContext, { BaseModalContextProps, ModalValueProps } from './base-modal';

interface BaseModalProps {
  children?: React.ReactNode;
}

export const BaseModalProvider = (props: BaseModalProps) => {
  const [modal, setModal] = useState<ModalValueProps>(null);
  const [data, setData] = useState<any>(null);

  // Key is used to force react
  // unmount content component without losing animation
  const [key, setKey] = useState<number>(0);

  const hideModal = useCallback(() => {
    setKey(key + 1);
    setModal(null);
    setData(null);
  }, [key]);

  const modalContext: BaseModalContextProps<any> = useMemo(() => ({
    modal, setModal, hideModal,
    data, setData
  }), [modal, data, key]);

  return (
    <BaseModalContext.Provider value={modalContext}>
      {props?.children}
      <Modal centered onCancel={hideModal} footer={null} {...modal}>
        <div key={key}>
          {modal && modal?.content}
        </div>
      </Modal>
    </BaseModalContext.Provider>
  );
};