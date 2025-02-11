import React from 'react';
import { useParams } from 'react-router-dom';

import { IBankAccounts } from '@/model/bank-accounts/bank-accounts';
import { useFileTranslate } from '@/utility';
import { useShow } from '@refinedev/core';

import { BaseShow } from '@/components/show/show';
import Checkbox from 'antd/es/checkbox/Checkbox';
import Col from 'antd/es/col';
import notification from 'antd/es/notification';
import Row from 'antd/es/row';
import Space from 'antd/es/space';


export const BankAccountsShow: React.FC = () => {
  const resource = 'bank-accounts';
  const t = useFileTranslate(resource);

  const { id } = useParams<{ id: string }>();
  const { queryResult: detailResult } = useShow<IBankAccounts>({
    resource,
    id: id,
  });

  const { data, isLoading, isError } = detailResult || {};
  const bankAccountData = data?.data;

  if (isError) {
    notification.open({
      type: 'error',
      message: 'Oops terjadi kesalahan',
    });
  }

  return (
    <BaseShow
      isLoading={isLoading}
      title={<h3 style={{ textTransform: 'capitalize' }}>{bankAccountData?.bank_id} - {bankAccountData?.bank_account_number}</h3>}
    >
      <Row className='app-mb-15'>
        <Col span={24}>
          <div className='app-text-bold'>{t('label.bank')}</div>
          <div>{bankAccountData?.bank_id || '-'}</div>
        </Col>
      </Row>

      <Row className='app-mb-15'>
        <Col span={24}>
          <div className='app-text-bold'>{t('label.bank_account_number')}</div>
          <div>{bankAccountData?.bank_account_number || '-'}</div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Space align='baseline'>
            <Checkbox disabled checked={bankAccountData?.is_active} />
            <div>{t('label.is_active')}</div>
          </Space>
        </Col>
      </Row>
    </BaseShow>
  );
};
