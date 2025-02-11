import { ReactElement } from 'react';

import {
  AutoComplete,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
} from 'antd';

import type {
  AutoCompleteProps,
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  SwitchProps,
  TimePickerProps
} from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { PasswordProps, SearchProps, TextAreaProps } from 'antd/es/input';
import type { RadioButtonProps } from 'antd/es/radio/radioButton';
import { Queryfield, QueryfieldProps } from './queryfield';

import './form-field.scss';

export type InputFieldTypes = (
  | 'autocomplete'
  | 'checkbox-group'
  | 'checkbox'
  | 'date-picker'
  | 'number'
  | 'password'
  | 'queryfield'
  | 'radio-button'
  | 'radio-group'
  | 'radio'
  | 'range-picker'
  | 'search'
  | 'select'
  | 'switch'
  | 'text'
  | 'textarea'
  | 'time'
);

type ComponentPropsMap = {
  'autocomplete': AutoCompleteProps
  'checkbox-group': CheckboxGroupProps;
  'checkbox': CheckboxProps;
  'date-picker': DatePickerProps
  'number': InputNumberProps;
  'password': PasswordProps;
  'queryfield': QueryfieldProps,
  'radio-button': RadioButtonProps;
  'radio-group': RadioGroupProps;
  'radio': RadioProps;
  'range-picker': RangePickerProps;
  'search': SearchProps;
  'select': SelectProps;
  'switch': SwitchProps;
  'text': InputProps;
  'textarea': TextAreaProps;
  'time': TimePickerProps;
};

type ComponentProps<T extends InputFieldTypes> = ComponentPropsMap[T];

const ComponentsMap: { [key in InputFieldTypes]: (props: any) => ReactElement } = {
  'autocomplete': (props) => <AutoComplete {...props} />,
  'checkbox-group': (props) => <Checkbox.Group {...props} />,
  'checkbox': (props) => <Checkbox {...props} />,
  'date-picker': (props) => <DatePicker {...props} />,
  'number': (props) => <InputNumber {...props} />,
  'password': (props) => <Input.Password {...props} />,
  'queryfield': (props) => <Queryfield {...props} />,
  'radio-button': (props) => <Radio.Button  {...props} />,
  'radio-group': (props) => <Radio.Group  {...props} />,
  'radio': (props) => <Radio  {...props} />,
  'range-picker': (props) => <DatePicker.RangePicker {...props} />,
  'search': (props) => <Input.Search {...props} />,
  'select': (props) => <Select {...props} options={[
    {
      label: "No Select",
      value: null
    },
    ...props?.options
  ]} />,
  'switch': (props) => <Switch {...props} />,
  'text': (props) => <Input {...props} />,
  'textarea': (props) => <Input.TextArea rows={5} {...props} />,
  'time': (props) => <TimePicker {...props} />,
};

export interface FormFieldProps<T extends InputFieldTypes> extends FormItemProps {
  key?: string,
  component: T;
  componentProps?: ComponentProps<T>;
  id: string;
}

export const FormField = <T extends InputFieldTypes>(props: FormFieldProps<T>) => {
  const { component, componentProps, ...formItemProps } = props;
  const FieldComponent = ComponentsMap[component];

  return (
    <Form.Item className='app-form-field' {...formItemProps}>
      <FieldComponent {...componentProps as any} />
    </Form.Item>
  );
};
