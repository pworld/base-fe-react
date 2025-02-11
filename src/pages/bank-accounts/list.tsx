import React from 'react';

import { IBaseColumns } from '@/model/apps/base-list';
import { useFileTranslate } from '@/utility';
import type { FormInstance } from 'antd/es/form/hooks/useForm';
import { useNavigation } from '@refinedev/core';
import BaseLists from '@/components/lists/base-lists';

import Tag from 'antd/es/tag';

export const BankAccountsList: React.FC = () => {
  const resource = 'bank-accounts';

  const { push } = useNavigation();

  const t = useFileTranslate(resource);

  const columns: IBaseColumns[] = [
    {
      title: t('label.bank_name'),
      dataIndex: 'bank_id',
      render: (value, record: { bank_account_id: string }) => (
        <a onClick={() => push(`/bank-accounts/show/${record?.bank_account_id}`)}>{value}</a>
      )
    },
    {
      title: t('label.bank_account_number'),
      dataIndex: 'bank_account_number',
    },
    {
      title: t('label.is_active'),
      dataIndex: 'is_active',
      render: (value) => (
        <Tag color={value ? 'green' : 'red'} >{value ? 'Aktif' : 'Tidak Aktif'}</Tag>
      )
    }
  ];

  return (
    <BaseLists
      columns={columns}
      resource={resource}
      initialSearchKey='bank_id'
      showActionTable
      recordIdField='bank_account_id'
      isShowSearchFilter={true}
      actionTableProps={{
        deleteUrl: `${resource}/:id/delete`
      }}
      additionalFilter={(form: FormInstance) => <></>}
    />
  );
};
