import { useEffect, useState } from 'react';

import { FormField } from '@/components/forms/form-field/form-field';
import { useFileTranslate } from '@/utility';
import { BaseRecord, useApiUrl, useCustom } from '@refinedev/core';

import Form, { FormInstance, Rule } from 'antd/es/form';
import Space from 'antd/es/space';

export const BankAccountsForm = ({ form }: { form: FormInstance }) => {
  const resource = 'bank-accounts';

  const [banks, setBanks] = useState<any[]>([]);

  const rules: Rule[] = [{ required: true, message: 'Please fill in this field' }];
  const rulesNumString: Rule[] = [
    {
      type: 'method',
      required: true,
      validator: (_, value) => {
        const MIN = 3;
        const MAX = 30;
        const errMsg = 'Mohon isi kolom ini dengan angka';
        if (typeof value !== 'string' || value.length <= 0) {
          return Promise.reject(errMsg);
        } else if (value.length < MIN) {
          return Promise.reject(`Angka tidak boleh kurang dari ${MIN} karakter`);
        } else if (value.length > MAX) {
          return Promise.reject(`Angka tidak boleh lebih dari ${MAX} karakter`);
        } else {
          return !isNaN(+value) ? Promise.resolve() : Promise.reject(errMsg);
        }
      }
    }
  ];

  const t = useFileTranslate(resource);

  const apiUrl = useApiUrl();

  const banksResult = useCustom({
    url: `${apiUrl}/banks`,
    method: 'get',
  }).data as BaseRecord;

  useEffect(() => {
    if (banksResult?.data) {
      const optionsBanks = banksResult?.data?.data
        .filter((val: any) => val.bank_id != 'OTHER')
        .map((val: any) => {
          return { label: val.bank_name, value: val.bank_id };
        });

      setBanks(optionsBanks);
    }
  }, [banksResult?.data?.data]);

  return (
    <Form.Item shouldUpdate noStyle>
      {() => (
        <>
          <FormField
            id='bank_id'
            label={t('label.bank')}
            name="bank_id"
            rules={rules}
            component='select'
            componentProps={{
              options: banks,
              onChange: (values) => {
                form.setFieldsValue({ bank_id: values });
              }
            }}
          />
          <FormField
            id='bank_account_number'
            label={t('label.bank_account_number')}
            component='text'
            name="bank_account_number"
            rules={rulesNumString}
          />
          <Space align='baseline'>
            <FormField
              id='is_active'
              component='checkbox'
              name="is_active"
              componentProps={{
                onChange: (e) => form.setFieldsValue({
                  is_active: e.target.checked
                }),
                defaultChecked: form.getFieldValue('is_active'),
                children: <>{t('label.is_active')}</>
              }}
            />
          </Space>
        </>
      )}
    </Form.Item>
  );
};
