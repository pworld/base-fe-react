import { Modal } from 'antd';
import { ComponentProps, createContext } from 'react';

export type ModalValueProps = (Omit<ComponentProps<typeof Modal>, 'visible'> & { content: any }) | null

export interface BaseModalContextProps<DataType> {
  modal: ModalValueProps,
  setModal: (value: ModalValueProps) => void;
  hideModal: () => void;
  data: DataType,
  setData: (value: DataType) => void;
}

const BaseModalContext = createContext({} as BaseModalContextProps<any>);

export default BaseModalContext;