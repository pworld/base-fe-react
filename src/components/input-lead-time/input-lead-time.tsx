import { useMemo } from 'react';


import { calculateLeadTime, fromLeadTime } from '@/utility/helper/calculateLeadTime';

import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Select from 'antd/es/select';
import InputNumber from 'antd/es/input-number';
import Form from 'antd/es/form';

import './style.scss';

export type LeadTimeInputProps = {
  label: string;
  name: string;
  initialValue?: number;
  disabled?: boolean;
  onChange?: (minutes: number) => void;
};

export type LeadTimeFieldsProps = Partial<{
  value: number;
  onChange: (value: number) => void;
}>;

const { Option } = Select;

const LeadTimeInput = ({
  label,
  name,
  initialValue,
  disabled,
  onChange,
}: LeadTimeInputProps) => {
  const {
    minutes: initM,
    hours: initH,
    days: initD
  } = fromLeadTime(initialValue || 0);

  const LeadTimeFields = ({ value, onChange }: LeadTimeFieldsProps) => {
    const lt = useMemo(() => fromLeadTime(value || 0), [value]);

    function handleChange(field: string) {
      return (val: any | number) => {
        const updatedValue = {
          ...lt,
          [field]: parseInt(val.toString(), 10)
        };

        const leadTime = calculateLeadTime(
          updatedValue.minutes,
          updatedValue.hours,
          updatedValue.days
        );

        onChange?.(leadTime);
      };
    }

    return (
      <Row gutter={[16, 16]} className='app-input-lead-time'>
        <Col span={6}>
          <InputNumber
            value={lt.days}
            defaultValue={initD || 0}
            onChange={handleChange('days')}
            disabled={disabled}
            min={0}
            max={31}
            style={{ width: '100%' }}
            suffix="Hari"
          />
        </Col>
        <Col span={6}>
          <Select
            value={lt.hours}
            defaultValue={initH || 0}
            onChange={handleChange('hours')}
            disabled={disabled}
            style={{ width: '100%' }}
            suffixIcon="Jam"
          >
            {[...Array(24).keys()].map(hour => (
              <Option key={hour} value={hour}>{hour}</Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={lt.minutes}
            defaultValue={initM || 0}
            onChange={handleChange('minutes')}
            disabled={disabled}
            style={{ width: '100%' }}
            suffixIcon="Menit"
          >
            {[...Array(6).keys()].map(minute => (
              <Option key={minute * 10} value={minute * 10}>{minute * 10}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    );
  };

  return (
    <Form.Item name={name} label={label} rules={[{ required: true, message: 'Please fill in this field' }]}>
      <LeadTimeFields value={initialValue} onChange={onChange} />
    </Form.Item>
  );
};

export default LeadTimeInput;