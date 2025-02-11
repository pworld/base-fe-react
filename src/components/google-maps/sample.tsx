import { GoogleMaps } from '@/components/google-maps/google-maps';
import useBaseModal from '@/hooks/useBaseModal';
import React from 'react';

const SampleModalContent = () => {
  const { hideModal } = useBaseModal<any>();

  function onSubmitCallback(value: any) {
    console.log('onSubmitCallback', value);
  }

  function onCancelCallback() {
    hideModal();
  }

  return (
    <div>
      <GoogleMaps
        isEditable={true}
        onSubmit={onSubmitCallback}
        onCancel={onCancelCallback}
        initialQuery='surabaya'
      />
    </div>
  );
};

const ModalTestPage: React.FC = () => {
  const { setModal } = useBaseModal<any>();

  function onClick() {
    setModal({
      open: true,
      content: <SampleModalContent />
    });
  }

  return (
    <div>
      <h1>Modal Test Page</h1>
      <button onClick={onClick}>open modal</button>
    </div>
  );
};