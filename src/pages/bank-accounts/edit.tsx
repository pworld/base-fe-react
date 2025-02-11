import React from 'react';

import { BaseForm } from '@/components/forms/base-form';
import { IBankAccounts } from '@/model/bank-accounts/bank-accounts';
import { Edit, useForm } from '@refinedev/antd';
import { useNavigation, useUpdate } from '@refinedev/core';

import { useParams } from 'react-router-dom';
import { BankAccountsForm } from './form';
import { useFileTranslate } from '@/utility';
import { CancelButton } from '@/components/cancel-button/cancel-button';

import message from 'antd/es/message';
import Spin from 'antd/es/spin';
import { BaseEdit } from '@/components/edit/edit';

export const BankAccountsEdit: React.FC = () => {
  const resource = 'bank-accounts';
  const t = useFileTranslate(resource);

  const { id } = useParams<{ id: string }>();
  const { formProps, saveButtonProps, form, formLoading } = useForm<IBankAccounts>();
  const { push } = useNavigation();
  const { mutate: update, isLoading } = useUpdate<IBankAccounts>();

  const handleFormSubmit = (values: any) => {
    if (!id) {
      message.error('No post ID provided');
      return;
    }

    const payload = {
      ...values
    };

    update(
      { resource: `${resource}/:id/update`, id, values: payload },
      {
        onSuccess: () => {
          push(`/${resource}/list`);
          form.resetFields();
        },
      }
    );
  };

  return (
    <BaseEdit
      title={<h3>{t('title.form_edit')}</h3>}
      saveButtonProps={saveButtonProps}
      isLoading={formLoading || isLoading}
    >
      <BaseForm
        {...formProps}
        layout='vertical'
        onFinish={handleFormSubmit}
        resource={resource}
        form={form}
      >
        <BankAccountsForm form={form} />
      </BaseForm>
    </BaseEdit>
  );
};
