import BaseModalContext, { BaseModalContextProps } from '@/context/base-modal/base-modal';
import { useContext } from 'react';

const useBaseModal = <DataType>(): BaseModalContextProps<DataType> => useContext(BaseModalContext);

export default useBaseModal;