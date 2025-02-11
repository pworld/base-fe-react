import { CitySelect } from '@/components/city-select/city-select';
import { useFileTranslate } from '@/utility';
import { Col, Form, FormInstance, Row } from 'antd';
import { ComponentProps } from 'react';
import { FormField, FormFieldProps } from '../form-field/form-field';

type QueryFieldProps = Partial<{
  name: string,
  label: string,
  endpoint: string,
  keyQueryFilter: string,
  keyOptionValue: string,
  keyOptionLabel: string,
  otherQueryFilter: { [key: string]: string | number | boolean },
}>;
type TextAreaProps = Partial<{
  name: string,
  label: string,
  componentProps: Partial<FormFieldProps<'textarea'>['componentProps']>
}>;
type InputNumberProps = Partial<{
  name: string,
  label: string,
  componentProps: Partial<FormFieldProps<'number'>['componentProps']>
}>
type HiddenInputProps = Partial<{
  name: string
}>
type ColProps = ComponentProps<typeof Col>;
type RowProps = ComponentProps<typeof Row>;

type AddressFieldsProps = {
  onCitySelected: (value: any, option?: any, record?: any) => void,
  onSubdistrictSelected: (value: any, option?: any, record?: any) => void,
  form: FormInstance,
  withLongLat?: boolean,
  fields?: Partial<{
    fullAddress: TextAreaProps,
    city: QueryFieldProps,
    subdistrict: QueryFieldProps,
    zipCode: InputNumberProps,
    latitude: InputNumberProps,
    longitude: InputNumberProps,
    province: HiddenInputProps,
    country: HiddenInputProps,
  }>,
  rowProps?: RowProps,
  colProps?: Partial<{
    fullAddress: ColProps,
    city: ColProps,
    subdistrict: ColProps,
    zipCode: ColProps,
    latitude: ColProps,
    longitude: ColProps,
  }>,
};

export const AddressFields = ({
  form,
  fields,
  colProps,
  rowProps,
  onCitySelected,
  onSubdistrictSelected,
  withLongLat = false
}: AddressFieldsProps) => {
  const t = useFileTranslate('common');

  return (
    <Row gutter={8} {...(rowProps || {})}>
      <Form.Item id='address_country_id' name={fields?.country?.name || 'address_country_id'} hidden />
      <Form.Item id='address_province_id' name={fields?.province?.name || 'address_province_id'} hidden />
      <Col span={24} {...(colProps?.fullAddress || {})}>
        <FormField
          id='address_street'
          name={fields?.fullAddress?.name || 'address_street'}
          label={fields?.fullAddress?.label}
          componentProps={{
            rows: 5,
            ...(fields?.fullAddress?.componentProps || {})
          }}
          component="textarea"
        />
      </Col>
      <Col span={16}>
        <Row gutter={[8, 16]}>
          <CitySelect form={form} />
        </Row>
      </Col>
      <Col span={8} {...(colProps?.zipCode || {})}>
        <FormField
          id='address_zipcode'
          name={fields?.zipCode?.name || 'address_zipcode'}
          label={fields?.zipCode?.label || t('addressFields.zipcode')}
          componentProps={{
            style: { width: '100%' },
            ...(fields?.zipCode?.componentProps || {})
          }}
          component="number"
        />
      </Col>
      {withLongLat
        ? (
          <>
            <Col span={8} {...(colProps?.longitude || {})}>
              <FormField
                id='address_longitude'
                name={fields?.longitude?.name || 'address_longitude'}
                label={fields?.longitude?.label || t('addressFields.longitude')}
                componentProps={{
                  style: { width: '100%' },
                  ...(fields?.longitude?.componentProps || {})
                }}
                component="number"
              />
            </Col>
            <Col span={8} {...(colProps?.latitude || {})}>
              <FormField
                id='address_latitude'
                name={fields?.latitude?.name || 'address_latitude'}
                label={fields?.latitude?.label || t('addressFields.latitude')}
                componentProps={{
                  style: { width: '100%' },
                  ...(fields?.latitude?.componentProps || {})
                }}
                component="number"
              />
            </Col>
            <Col span={6} />
          </>
        )
        : <></>
      }
    </Row>
  );
};
