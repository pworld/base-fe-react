import { calculateLeadTime, fromLeadTime } from '@/utility/helper/calculateLeadTime';
import { Form, InputNumber, Space } from 'antd';
import { InputNumberProps } from 'antd/lib';
import { useMemo } from 'react';

type CustomInputNumberProps = InputNumberProps<number> & LeadTimeFieldsProps;

export type LeadTimeInputProps = {
  label: string,
  name: string,
  initialValue?: number,
  disabled?: boolean,
  inputProps?: Partial<{
    inputMinutes: CustomInputNumberProps,
    inputHours: CustomInputNumberProps,
    inputDays: CustomInputNumberProps,
  }>,
  onChange?: (minutes: number) => void,
};

export type LeadTimeFieldTypes = 'minutes' | 'hours' | 'days'

export type LeadTimeFieldsProps = Partial<{
  value: number,
  onChange: (value: number) => void,
}>;

export const LeadTimeInput = ({
  label,
  name,
  initialValue,
  inputProps,
  disabled,
  ...restProps
}: LeadTimeInputProps) => {
  const {
    minutes: initM,
    hours: initH,
    days: initD
  } = fromLeadTime(initialValue || 0);
  const LeadTimeFields = ({ value, onChange }: LeadTimeFieldsProps) => {
    const lt = useMemo(() => fromLeadTime(value || 0), [value]);

    function handleChange(field: LeadTimeFieldTypes) {
      return (val: number | null) => {
        const minutes = field === 'minutes' ? (val || 0) : lt.minutes;
        const hours = field === 'hours' ? (val || 0) : lt.hours;
        const days = field === 'days' ? (val || 0) : lt.days;

        const leadTime = calculateLeadTime(minutes, hours, days);

        onChange?.(leadTime);
        restProps.onChange?.(leadTime);
      };
    }

    return (
      <Space size="small">
        <InputNumber
          value={lt.days}
          defaultValue={initD || 0}
          onChange={handleChange('days')}
          addonAfter="Hari"
          disabled={disabled}
          {...inputProps?.inputDays}
        />
        <InputNumber
          value={lt.hours}
          defaultValue={initH || 0}
          onChange={handleChange('hours')}
          addonAfter="Jam"
          disabled={disabled}
          {...inputProps?.inputHours}
        />
        <InputNumber
          value={lt.minutes}
          defaultValue={initM || 0}
          onChange={handleChange('minutes')}
          addonAfter="Menit"
          disabled={disabled}
          {...inputProps?.inputMinutes}
        />
      </Space>
    );
  };

  return (
    <Form.Item name={name} label={label}>
      <LeadTimeFields />
    </Form.Item>
  );
};
