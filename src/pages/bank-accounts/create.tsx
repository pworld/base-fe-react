import React from 'react';

import { BaseForm } from '@/components/forms/base-form';
import { useFileTranslate } from '@/utility';
import { Create, useForm } from '@refinedev/antd';
import { useCreate, useNavigation } from '@refinedev/core';
import { CancelButton } from '@/components/cancel-button/cancel-button';

import Spin from 'antd/es/spin';

import { BankAccountsForm } from './form';
import { BaseCreate } from '@/components/create/create';

export const BankAccountsCreate: React.FC = () => {
  const resource = 'bank-accounts';
  const t = useFileTranslate(resource);

  const { push } = useNavigation();
  const { formProps, saveButtonProps, form } = useForm();
  const { mutate: create, isLoading } = useCreate();


  const handleFormSubmit = (values: any) => {
    create(
      { resource: `${resource}/create`, values },
      {
        onSuccess: () => {
          form.resetFields();
          push(`/${resource}/list`);
        },
      }
    );
  };

  return (

    <BaseCreate
      title={<h3>{t('title.form_create')}</h3>}
      saveButtonProps={saveButtonProps}
      isLoading={isLoading}
    >
      <BaseForm
        {...formProps}
        layout="vertical"
        onFinish={handleFormSubmit}
        resource={resource}
        form={form}
        initialValues={{
          is_active: true,
        }}
      >
        <BankAccountsForm form={form} />
      </BaseForm>
    </BaseCreate>
  );
};
