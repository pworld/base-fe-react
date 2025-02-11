import { Form, FormInstance, Input, InputNumber, InputRef } from 'antd';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import './styles.scss';
import Select, { DefaultOptionType, OptionProps } from 'antd/es/select';

const EditableContext = createContext<FormInstance<any> | null>(null);

export interface EditableCellProps<RecordType> {
  title: React.ReactNode;
  editable: boolean;
  editableType: 'text' | 'number' | 'select';
  options: DefaultOptionType[];
  children: React.ReactNode;
  dataIndex: keyof RecordType;
  record: RecordType;
  handleSave: (value: string, record: RecordType) => void;
}

const EditableRow: React.FC<any> = (props: any) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell: React.FC<EditableCellProps<any>> = ({
  title,
  editable,
  editableType,
  options,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: EditableCellProps<any>) => {
  const [editing, setEditing] = useState(false);
  const inputRef: any = useRef<InputRef | HTMLInputElement>(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const save = async () => {
    const value = form?.getFieldValue(dataIndex);
    handleSave(value, record);
    setEditing(false);
  };

  let childNode = children;

  if (editable) {
    childNode = (
      <Form.Item
        initialValue={Array.from(children as any || []).join('')}
        style={{ margin: 0 }}
        name={dataIndex.toString()}
      >
        {editableType === "number" && (
          <InputNumber formatter={(value: any) => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} ref={inputRef} onPressEnter={save} onBlur={save} style={{ width: '100%' }} />
        )}

        {editableType === "select" && (
          <Select
            ref={inputRef}
            options={options || []}
            onSelect={save}
            onBlur={save}
          />
        )}

        {(editableType === "text" || !editableType) && (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}

        {/* {editableType === 'number'
          ? (
            <InputNumber formatter={(value: any) => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} ref={inputRef} onPressEnter={save} onBlur={save} style={{ width: '100%' }} />
          )
          : <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        } */}
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const EditableComponents = {
  body: {
    row: EditableRow,
    cell: EditableCell
  }
};
