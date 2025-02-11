import React, { useEffect, useState } from 'react';

import { FormInstance } from 'antd/es/form';
import Col from 'antd/es/col';
import debounce from 'lodash/debounce';
import find from 'lodash/find';

import { FormField } from '@/components/forms/form-field/form-field';
import { useFileTranslate } from '@/utility';
import { useCustomMutation } from '@refinedev/core';

interface ICitySelect {
  city_id?: string
  city_name?: string
  country_id?: string
  country_name?: string
  province_id?: string
  province_name?: string
  subdistrict_id?: string
  subdistrict_name?: string
}

export const CitySelect: React.FC<{ form: FormInstance }> = ({ form }) => {
  const t = useFileTranslate('common');

  const [cityDatas, setCityDatas] = useState([]);
  const [subdistrictDatas, setSubdistrictDatas] = useState([]);

  const { mutate: getCity, data: cityQueryResult } = useCustomMutation();
  const { mutate: getSubdistrict, data: subdistrictQueryResult } = useCustomMutation();

  useEffect(() => {
    loadCity();
  }, []);

  useEffect(() => {
    if (cityQueryResult?.data) {
      const optionsCity = cityQueryResult?.data?.data?.data?.map((list: ICitySelect) => {
        return {
          ...list,
          label: list?.city_name,
          value: list?.city_id
        };
      });
      setCityDatas(optionsCity);
    }
  }, [cityQueryResult?.data?.data]);

  useEffect(() => {
    if (subdistrictQueryResult?.data) {
      const optionsSubdistrict = subdistrictQueryResult?.data?.data?.data?.map((list: ICitySelect) => {
        return {
          ...list,
          label: list?.subdistrict_name,
          value: list?.subdistrict_id
        };
      });
      setSubdistrictDatas(optionsSubdistrict);
    }
  }, [subdistrictQueryResult?.data?.data]);

  function loadCity(keyword = '') {
    getCity({
      url: '/cities',
      method: 'post',
      values: {
        queryops: {
          filter: {
            city_name: keyword
          },
          limit: 20,
          offset: 0,
          page: 1
        }
      }
    });
  }

  function loadSubdistrict(keyword = '') {
    getSubdistrict({
      url: '/subdistricts',
      method: 'post',
      values: {
        queryops: {
          filter: {
            city_id: form.getFieldValue('address_city_id'),
            subdistrict_name: keyword
          },
          limit: 20,
          offset: 0,
          page: 1
        }
      }
    });
  }

  return (
    <>
      <Col span={12}>
        <FormField
          id="address-city-id"
          label={t('form_city.city')}
          component='select'
          name="address_city_id"
          componentProps={{
            showSearch: true,
            allowClear: true,
            options: cityDatas,
            optionFilterProp: 'label',
            onSearch: debounce(loadCity, 1000),
            onSelect: (val: string, opt) => {
              const record: ICitySelect = find(cityDatas, { city_id: val }) as ICitySelect;
              form.setFieldsValue({
                address_city_id: opt?.value,
                address_city_name: opt?.label,
                address_province_id: record?.province_id,
                address_province_name: record?.province_name,
                address_country_id: record?.country_id,
                address_country_name: record?.country_name,
                address_subdistrict_id: '',
                address_subdistrict_name: ''
              });
              loadSubdistrict();
            },
            onClear: () => {
              form.setFieldsValue({
                address_city_id: '',
                address_city_name: '',
                address_subdistrict_id: '',
                address_subdistrict_name: '',
                address_province_id: '',
                address_province_name: '',
                address_country_id: '',
                address_country_name: '',
              });
              loadCity('');
            }
          }}
        />
      </Col>

      <Col span={12}>
        <FormField
          id="address-subdistrict-id"
          label={t('form_city.subdistrict')}
          component='select'
          name="address_subdistrict_id"
          componentProps={{
            showSearch: true,
            allowClear: true,
            disabled: !form.getFieldValue('address_city_id'),
            options: subdistrictDatas,
            optionFilterProp: 'label',
            onSearch: debounce(loadSubdistrict, 1000),
            onSelect: (val: string, opt) => {
              form.setFieldsValue({
                address_subdistrict_id: opt?.value,
                address_subdistrict_name: opt?.label
              });
              loadSubdistrict();
            },
            onClear: () => {
              loadSubdistrict('');
              form.setFieldsValue({
                address_city_id: '',
                address_city_name: '',
                address_subdistrict_id: '',
                address_subdistrict_name: '',
                address_province_id: '',
                address_province_name: '',
                address_country_id: '',
                address_country_name: '',
              });
            }
          }}
        />
      </Col>
    </>
  );
};