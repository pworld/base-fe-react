import React from 'react';

import { useFileTranslate } from '@/utility';

import Form, { FormProps } from 'antd/es/form';
import notification from 'antd/es/notification';

interface BaseFormProps extends FormProps {
  children?: React.ReactNode,
}

export const BaseForm: React.FC<BaseFormProps> = (props) => {
  const t = useFileTranslate('common');

  const { children, ...formProps } = props;

  const RightRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => {
    function doesLabelExist(label: React.ReactNode) {
      if (typeof label === 'string') {
        const trimmed = label.trim();
        return trimmed && trimmed?.length;
      }
      return label;
    }

    return (
      <>
        {label} {(doesLabelExist(label) && required) && <span style={{ color: 'red' }}>&nbsp;*</span>}
      </>
    );
  };

  function onFinishFailed() {
    notification.open({
      message: 'Error',
      description: t('notifications.errorField'),
      type: 'error'
    })
  }

  return (
    <Form
      requiredMark={RightRequiredMark}
      onFinishFailed={onFinishFailed}
      {...formProps}
    >
      {children}
    </Form>
  );
};
